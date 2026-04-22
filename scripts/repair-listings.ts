/**
 * Bot Reparador de Datos — repair-listings.ts
 *
 * 1. Busca en la BD todos los pisos publicados sin habitaciones o sin baños.
 * 2. Para cada piso:
 *    a) Si no tiene source_url → ELIMINAR (dato contaminado).
 *    b) Si la URL devuelve 404/403/410/timeout → ELIMINAR (ya no existe).
 *    c) Si devuelve 200 y se extraen habitaciones+baños → PATCH (reparado).
 *    d) Si devuelve 200 pero no se pueden extraer → ELIMINAR (incompleto).
 *
 * Uso:
 *   npx tsx scripts/repair-listings.ts           # modo real
 *   npx tsx scripts/repair-listings.ts --dry-run  # sin tocar la BD
 *   npx tsx scripts/repair-listings.ts --portal pisos.com  # filtrar portal
 */

const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY

const DRY_RUN     = process.argv.includes('--dry-run')
const PORTAL_FILTER = (() => {
  const idx = process.argv.indexOf('--portal')
  return idx !== -1 ? process.argv[idx + 1] : null
})()
const PAGE_SIZE   = 100
const DELAY_MS    = 1300

const HEADERS = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

interface DbListing {
  id: string
  source_url: string | null
  source_portal: string | null
  bedrooms: number | null
  bathrooms: number | null
}

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

// ─── HTTP helper ─────────────────────────────────────────────────────────────
async function fetchHtml(url: string): Promise<{ html: string | null; status: number }> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-cache',
        Referer: 'https://www.pisos.com/',
      },
      signal: AbortSignal.timeout(15000),
    })
    return { html: res.ok ? await res.text() : null, status: res.status }
  } catch {
    return { html: null, status: 0 }
  }
}

// ─── Búsqueda recursiva en árbol JSON (limitada por profundidad) ─────────────
function deepFindNum(obj: unknown, keys: string[], depth = 8): number | null {
  if (depth === 0 || obj === null || obj === undefined || typeof obj !== 'object') return null
  const o = obj as Record<string, unknown>
  for (const key of keys) {
    const v = o[key]
    if (v !== undefined && v !== null) {
      if (typeof v === 'number' && Number.isFinite(v) && v > 0) return Math.round(v)
      if (typeof v === 'string' && /^\d+$/.test(v.trim()) && parseInt(v, 10) > 0) return parseInt(v, 10)
    }
  }
  for (const k of Object.keys(o)) {
    const child = o[k]
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      const r = deepFindNum(child, keys, depth - 1)
      if (r !== null) return r
    }
  }
  return null
}

function deepFindStr(obj: unknown, keys: string[], depth = 8): string | null {
  if (depth === 0 || obj === null || obj === undefined || typeof obj !== 'object') return null
  const o = obj as Record<string, unknown>
  for (const key of keys) {
    const v = o[key]
    if (typeof v === 'string' && v.trim().length > 0 && !/^\d+$/.test(v.trim())) return v.trim()
  }
  for (const k of Object.keys(o)) {
    const child = o[k]
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      const r = deepFindStr(child, keys, depth - 1)
      if (r !== null) return r
    }
  }
  return null
}

// ─── Extractor de características desde HTML ─────────────────────────────────
interface Extracted {
  bedrooms: number | null
  bathrooms: number | null
  tipoCasa: string | null
  antiguedad: string | null
}

function extractCharacteristics(html: string): Extracted {
  // 1) __NEXT_DATA__ — fuente más fiable (Next.js)
  let nextData: unknown = null
  const nextM = html.match(/<script[^>]+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
  if (nextM) {
    try { nextData = JSON.parse(nextM[1]) } catch { /* ignorar */ }
  }

  const bedrooms = deepFindNum(nextData, [
    'habitaciones', 'dormitorios', 'numberOfRooms', 'rooms', 'numHabitaciones',
    'numDormitorios', 'bedrooms',
  ]) ?? (() => {
    const pats = [
      /(\d+)\s*habitaci(?:ones|[oó]n)/i,
      /(\d+)\s*dormitori(?:os|o)/i,
      /habitaci(?:ones|[oó]n)\s*[:\s><\/]+\s*(\d+)/i,
      /dormitori(?:os|o)\s*[:\s><\/]+\s*(\d+)/i,
      /(\d+)\s*hab\b/i,
      /"numberOfRooms"\s*:\s*(\d+)/,
      /"habitaciones"\s*:\s*"?(\d+)/i,
    ]
    for (const p of pats) { const m = html.match(p); if (m) return parseInt(m[1], 10) }
    return null
  })()

  const bathrooms = deepFindNum(nextData, [
    'banos', 'banios', 'numBanos', 'numberOfBathroomsTotal', 'bathrooms',
  ]) ?? (() => {
    const pats = [
      /(\d+)\s*ba[ñn]o/i,
      /ba[ñn]os?\s*[:\s><\/]+\s*(\d+)/i,
      /"numberOfBathroomsTotal"\s*:\s*(\d+)/,
      /"banos"\s*:\s*"?(\d+)/i,
    ]
    for (const p of pats) { const m = html.match(p); if (m) return parseInt(m[1], 10) }
    return null
  })()

  const tipoCasa = deepFindStr(nextData, [
    'tipoInmueble', 'tipo', 'tipoCasa', 'subtipo', 'propertyType', 'houseType',
  ]) ?? (() => {
    const pats = [
      /"tipo(?:InmuebleTexto|Casa|Inmueble)?"\s*:\s*"([^"]{2,40})"/i,
      /Tipo\s+de\s+(?:casa|inmueble|vivienda)\s*[:\s><\/]+\s*([^<\n"]{2,40}?)(?:\s*<|$)/i,
    ]
    for (const p of pats) { const m = html.match(p); if (m && !/^\d+$/.test(m[1])) return m[1].trim() }
    return null
  })()

  const antiguedad = deepFindStr(nextData, ['antiguedad', 'antiquity', 'antigüedad']) ?? (() => {
    const pats = [
      /"antig[üu]edad"\s*:\s*"([^"]{3,60})"/i,
      /[Aa]ntig[üu]edad\s*[:\s]+([^<\n"]{3,60}?)(?:\s*[<,]|$)/,
    ]
    for (const p of pats) { const m = html.match(p); if (m) return m[1].trim() }
    return null
  })()

  return { bedrooms, bathrooms, tipoCasa, antiguedad }
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────
async function fetchAffectedListings(offset: number): Promise<DbListing[]> {
  let url =
    `${SUPABASE_URL}/rest/v1/listings` +
    `?select=id,source_url,source_portal,bedrooms,bathrooms` +
    `&status=eq.published` +
    `&or=(bedrooms.is.null,bathrooms.is.null)` +
    `&order=created_at.asc` +
    `&limit=${PAGE_SIZE}&offset=${offset}`

  if (PORTAL_FILTER) {
    url += `&source_portal=eq.${encodeURIComponent(PORTAL_FILTER)}`
  }

  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    console.error(`❌ Error consultando DB: ${await res.text()}`)
    return []
  }
  return res.json() as Promise<DbListing[]>
}

async function patchListing(id: string, fields: Record<string, unknown>) {
  if (DRY_RUN) { console.log(`  [DRY] PATCH ${id.slice(0, 8)} →`, fields); return }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(fields),
  })
  if (!res.ok) console.error(`  ❌ PATCH fallido: ${await res.text()}`)
}

async function deleteListing(id: string, reason: string) {
  if (DRY_RUN) { console.log(`  [DRY] DELETE ${id.slice(0, 8)} — ${reason}`); return }
  // Borrar imágenes primero
  await fetch(`${SUPABASE_URL}/rest/v1/listing_images?listing_id=eq.${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  })
  // Borrar listing
  const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  })
  if (!res.ok) console.error(`  ❌ DELETE fallido: ${await res.text()}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🤖 Bot Reparador de Datos${DRY_RUN ? ' [DRY RUN]' : ''}`)
  if (PORTAL_FILTER) console.log(`   Filtrando portal: ${PORTAL_FILTER}`)
  console.log()

  let offset = 0
  let totalFixed = 0, totalDeleted = 0, totalProcessed = 0

  while (true) {
    const listings = await fetchAffectedListings(offset)
    if (listings.length === 0) break

    console.log(`📋 Lote ${offset / PAGE_SIZE + 1}: ${listings.length} pisos afectados`)

    for (const listing of listings) {
      totalProcessed++
      const tag = `[${totalProcessed}] ${listing.id.slice(0, 8)} (${listing.source_portal ?? 'desconocido'})`

      // ── Sin URL → eliminar directamente ──────────────────────────────────
      if (!listing.source_url) {
        console.log(`  🗑️  ${tag} sin source_url → ELIMINAR`)
        await deleteListing(listing.id, 'sin source_url')
        totalDeleted++
        continue
      }

      await sleep(DELAY_MS)
      const { html, status } = await fetchHtml(listing.source_url)

      // ── URL muerta (404, 410, 403) → eliminar ─────────────────────────────
      if (!html || status === 404 || status === 410 || status === 403 || status === 301) {
        console.log(`  🗑️  ${tag} HTTP ${status} → ELIMINAR`)
        await deleteListing(listing.id, `HTTP ${status}`)
        totalDeleted++
        continue
      }

      // ── Extraer características del HTML ──────────────────────────────────
      const extracted = extractCharacteristics(html)

      // Safety: si la página parece un bloqueo de bot (< 15 KB o sin __NEXT_DATA__)
      // no borramos para no perder datos legítimos por un ban temporal
      const isRealPage = html.length > 15_000 || html.includes('__NEXT_DATA__')
      if (!isRealPage) {
        console.log(`  ⚠️  ${tag} página sospechosa de bot-block (${html.length} chars) → OMITIR`)
        continue
      }

      if (!extracted.bedrooms) {
        // Tiene HTML real pero no se extraen habitaciones. Puede ser:
        // - Estudio / garaje / local (0 habs es válido)
        // - Bloqueo parcial de pisos.com
        // Estrategia segura: OMITIR en lugar de borrar precipitadamente
        console.log(`  ⚠️  ${tag} sin habitaciones (HTML ${html.length} chars) → OMITIR (revisar manual)`)
        continue
      }

      // ── Reparar: PATCH con los datos extraídos ────────────────────────────
      const patch: Record<string, unknown> = {
        bedrooms: extracted.bedrooms,
        bathrooms: extracted.bathrooms ?? listing.bathrooms ?? null,
      }

      // Añadir features si se extrajeron
      const newFeatures: Record<string, string> = {}
      if (extracted.tipoCasa)  newFeatures.tipo_casa = extracted.tipoCasa
      if (extracted.antiguedad) newFeatures.antiguedad = extracted.antiguedad
      if (Object.keys(newFeatures).length > 0) patch.features = newFeatures

      console.log(
        `  ✅ ${tag} → habs=${extracted.bedrooms} baños=${extracted.bathrooms ?? '?'}` +
        (extracted.tipoCasa ? ` tipo=${extracted.tipoCasa}` : '')
      )
      await patchListing(listing.id, patch)
      totalFixed++
    }

    if (listings.length < PAGE_SIZE) break
    offset += PAGE_SIZE
  }

  console.log(`\n📊 Resumen${DRY_RUN ? ' (DRY RUN — no se hicieron cambios)' : ''}:`)
  console.log(`   Procesados : ${totalProcessed}`)
  console.log(`   Reparados  : ${totalFixed}`)
  console.log(`   Eliminados : ${totalDeleted}`)
}

main().catch(console.error)
