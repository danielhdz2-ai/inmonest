/**
 * repair-tucasa-images.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Repara (o elimina) los anuncios de tucasa.com que tienen imágenes rotas.
 *
 * Estrategia: las imágenes se sirven a través del proxy /api/img-proxy que ya
 * añade el Referer correcto → no se necesita subir nada a Supabase Storage
 * (cero egress de Storage, cero coste de objeto).
 *
 * Proceso por anuncio:
 *   1. Re-scraping de la página de detalle para obtener URLs frescas.
 *   2. Reemplaza listing_images con las nuevas URLs (el proxy las servirá OK).
 *   3. Si el anuncio ya no existe en tucasa.com O tiene <5 fotos → lo elimina.
 *
 * Uso:
 *   npx tsx scripts/repair-tucasa-images.ts            # ejecución real
 *   npx tsx scripts/repair-tucasa-images.ts --dry-run  # solo muestra qué haría
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { scrapeDetail } from './scrapers/tucasa_standalone'
import { sleep } from './scrapers/utils'

const SUPABASE_URL  = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_KEY ?? ''
const DRY_RUN       = process.argv.includes('--dry-run')
const MIN_PHOTOS    = 5
const BATCH_SIZE    = 50   // log por lotes
const DELAY_LIST_MS = 1500 // entre anuncios

// ── Tipos ──────────────────────────────────────────────────────────────────
interface ListingRow {
  id: string
  source_url: string
  source_external_id: string
  title: string
}
interface ImageRow {
  listing_id: string
  external_url: string
}

// ── Helpers REST ───────────────────────────────────────────────────────────
function baseHeaders(): Record<string, string> {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function getTucasaListings(offset = 0, limit = 1000): Promise<ListingRow[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/listings` +
    `?source_portal=eq.tucasa&status=eq.published` +
    `&select=id,source_url,source_external_id,title` +
    `&order=id.asc&limit=${limit}&offset=${offset}`
  const res = await fetch(url, { headers: baseHeaders() })
  if (!res.ok) throw new Error(`Listings fetch ${res.status}: ${await res.text()}`)
  return res.json() as Promise<ListingRow[]>
}

async function getListingImages(listingId: string): Promise<ImageRow[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/listing_images` +
    `?listing_id=eq.${listingId}&select=listing_id,external_url&order=position.asc`
  const res = await fetch(url, { headers: baseHeaders() })
  if (!res.ok) return []
  return res.json() as Promise<ImageRow[]>
}

function isHotlinkBlocked(url: string): boolean {
  return url.includes('tucasa.com/cacheimg') ||
         url.includes('apinmo.com') ||
         url.includes('fotos.apinmo')
}

async function replaceImages(listingId: string, storedUrls: string[]) {
  const h = baseHeaders()
  // Borrar las actuales
  await fetch(
    `${SUPABASE_URL}/rest/v1/listing_images?listing_id=eq.${listingId}`,
    { method: 'DELETE', headers: { ...h, Prefer: 'return=minimal' } },
  )
  // Insertar las nuevas
  const rows = storedUrls.slice(0, 15).map((url, i) => ({
    listing_id: listingId,
    external_url: url,
    position: i,
  }))
  await fetch(`${SUPABASE_URL}/rest/v1/listing_images`, {
    method: 'POST',
    headers: { ...h, Prefer: 'resolution=ignore-duplicates' },
    body: JSON.stringify(rows),
  })
}

async function deleteListing(listingId: string) {
  const h = baseHeaders()
  await fetch(
    `${SUPABASE_URL}/rest/v1/listing_images?listing_id=eq.${listingId}`,
    { method: 'DELETE', headers: { ...h, Prefer: 'return=minimal' } },
  )
  await fetch(
    `${SUPABASE_URL}/rest/v1/listings?id=eq.${listingId}`,
    { method: 'DELETE', headers: { ...h, Prefer: 'return=minimal' } },
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  if (!SERVICE_KEY) {
    console.error('❌ Falta SUPABASE_SERVICE_KEY en .env.local')
    process.exit(1)
  }

  console.log(`\n🔧 repair-tucasa-images.ts${DRY_RUN ? '  [DRY RUN — sin cambios reales]' : ''}`)
  console.log('═'.repeat(60))

  // Cargar todos los anuncios en lotes de 1000
  let allListings: ListingRow[] = []
  let offset = 0
  while (true) {
    const batch = await getTucasaListings(offset, 1000)
    allListings = allListings.concat(batch)
    if (batch.length < 1000) break
    offset += 1000
  }
  console.log(`📦 ${allListings.length} anuncios tucasa en la BD\n`)

  let repaired = 0
  let deleted  = 0
  let skipped  = 0

  for (let i = 0; i < allListings.length; i++) {
    const listing = allListings[i]
    const shortId = listing.source_external_id ?? listing.id.slice(0, 8)

    if ((i + 1) % BATCH_SIZE === 0) {
      console.log(`\n── Progreso: ${i + 1}/${allListings.length} (rep=${repaired} del=${deleted} skip=${skipped}) ──\n`)
    }

    // ── 1. Comprobar imágenes actuales ─────────────────────────────────────
    const images = await getListingImages(listing.id)
    const brokenCount = images.filter(img => isHotlinkBlocked(img.external_url)).length
    const alreadyInStorage = images.length > 0 && brokenCount === 0

    if (alreadyInStorage) {
      skipped++
      continue  // ya está bien, no tocar
    }

    process.stdout.write(`[${i + 1}/${allListings.length}] ${listing.title?.slice(0, 50).padEnd(50)} `)

    // ── 2. Re-scraping del detalle ─────────────────────────────────────────
    const detail = await scrapeDetail(listing.source_url)
    await sleep(DELAY_LIST_MS)

    if (detail.images.length === 0) {
      console.log(`→ sin imágenes → ELIMINAR`)
      if (!DRY_RUN) await deleteListing(listing.id)
      deleted++
      continue
    }

    if (detail.images.length < MIN_PHOTOS) {
      console.log(`→ solo ${detail.images.length} foto(s) (<${MIN_PHOTOS}) → ELIMINAR`)
      if (!DRY_RUN) await deleteListing(listing.id)
      deleted++
      continue
    }

    // ── 3. Actualizar listing_images con URLs frescas ──────────────────────
    // El proxy /api/img-proxy añade Referer automáticamente → no hace falta Storage
    const newUrls = detail.images.slice(0, 15)
    console.log(`→ actualizando ${newUrls.length} URLs ✓`)
    if (!DRY_RUN) {
      await replaceImages(listing.id, newUrls)
    }
    repaired++
  }

  console.log('\n' + '═'.repeat(60))
  console.log(`📊 Resultado final${DRY_RUN ? ' (DRY RUN)' : ''}:`)
  console.log(`  ✅  Reparados con Storage : ${repaired}`)
  console.log(`  🗑️   Eliminados (sin fotos): ${deleted}`)
  console.log(`  ⏭️   Saltados (ya OK)      : ${skipped}`)
  console.log('═'.repeat(60) + '\n')
}

main().catch(console.error)
