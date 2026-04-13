/**
 * Repara los pisos de tucasa.com sin imágenes ni descripción.
 * Visita cada source_url, extrae datos del detalle y actualiza la BD.
 *
 * Uso:
 *   npx tsx scripts/scrapers/repair-tucasa.ts [limite] [offset]
 *   Por defecto: limite=200, empezando desde el más reciente.
 *
 * Variables de entorno:
 *   SUPABASE_SERVICE_KEY — clave service_role de Supabase
 */

import { scrapeDetail } from './tucasa_standalone'
import { sleep } from './utils'

const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ''

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Falta SUPABASE_SERVICE_KEY en variables de entorno')
  process.exit(1)
}

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_SERVICE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
}

const DELAY_MS = 1200  // respetuoso con tucasa.com

interface TucasaListing {
  id: string
  source_url: string
  description: string | null
  title: string
}

async function getListingsToRepair(limit: number, offset: number): Promise<TucasaListing[]> {
  // Pisos de tucasa sin imágenes (via LEFT JOIN con listing_images)
  // Usamos la función RPC o filtramos por listings que no tienen registros en listing_images
  // Estrategia: obtener IDs de tucasa, luego filtrar los que tienen 0 imágenes
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/listings` +
    `?source_portal=eq.tucasa` +
    `&select=id,source_url,description,title` +
    `&order=published_at.desc` +
    `&limit=${limit}` +
    `&offset=${offset}`,
    { headers: BASE_HEADERS }
  )
  if (!res.ok) throw new Error(`Supabase error: ${await res.text()}`)
  return res.json()
}

async function getImageCount(listingId: string): Promise<number> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/listing_images?listing_id=eq.${listingId}&select=id`,
    { headers: { ...BASE_HEADERS, 'Range-Unit': 'items', Range: '0-0', Prefer: 'count=exact' } }
  )
  const count = res.headers.get('Content-Range')?.split('/')[1]
  return count ? parseInt(count, 10) : 0
}

async function updateListing(id: string, data: { description?: string; phone?: string }) {
  await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...BASE_HEADERS, Prefer: 'return=minimal' },
    body: JSON.stringify(data),
  })
}

async function insertImages(listingId: string, images: string[]) {
  const rows = images.map((url, i) => ({
    listing_id: listingId,
    external_url: url,
    position: i,
  }))
  await fetch(`${SUPABASE_URL}/rest/v1/listing_images`, {
    method: 'POST',
    headers: { ...BASE_HEADERS, Prefer: 'resolution=ignore-duplicates' },
    body: JSON.stringify(rows),
  })
}

async function main() {
  const limit = parseInt(process.argv[2] ?? '200', 10)
  const offset = parseInt(process.argv[3] ?? '0', 10)

  console.log(`\n🔧 Reparando pisos de tucasa.com (limit=${limit}, offset=${offset})\n`)

  const all = await getListingsToRepair(limit, offset)
  console.log(`📋 Total candidatos: ${all.length}`)

  let fixed = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < all.length; i++) {
    const listing = all[i]
    const imgCount = await getImageCount(listing.id)
    const hasDesc = listing.description && listing.description.length > 30

    if (imgCount > 0 && hasDesc) {
      skipped++
      continue
    }

    console.log(`\n[${i + 1}/${all.length}] ${listing.title.slice(0, 60)}`)
    console.log(`  📌 ${listing.source_url}`)
    console.log(`  Imágenes: ${imgCount} | Descripción: ${hasDesc ? '✅' : '❌'}`)

    try {
      const detail = await scrapeDetail(listing.source_url)
      await sleep(500)

      console.log(`  → Detalle: ${detail.images.length} imgs, desc=${detail.description ? detail.description.slice(0, 60) + '...' : 'N/A'}, tel=${detail.phone ?? 'N/A'}`)

      // Insertar imágenes si no había
      if (imgCount === 0 && detail.images.length > 0) {
        await insertImages(listing.id, detail.images)
        console.log(`  ✅ Insertadas ${detail.images.length} imágenes`)
      }

      // Actualizar descripción y teléfono
      const updates: { description?: string; phone?: string } = {}
      if (!hasDesc && detail.description) updates.description = detail.description
      if (detail.phone) updates.phone = detail.phone

      if (Object.keys(updates).length > 0) {
        await updateListing(listing.id, updates)
        console.log(`  ✅ Actualizado: ${Object.keys(updates).join(', ')}`)
      }

      fixed++
    } catch (err) {
      console.error(`  ❌ Error: ${err}`)
      errors++
    }

    await sleep(DELAY_MS)
  }

  console.log(`\n✨ Completado: ${fixed} reparados, ${skipped} ya estaban OK, ${errors} errores\n`)
}

main().catch(console.error)
