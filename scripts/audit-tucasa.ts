/**
 * audit-tucasa.ts
 * 1) Cuenta y muestra pisos de tucasa.com
 * 2) Los elimina (cascade borra listing_images automáticamente)
 * 3) Análisis completo de pisos SIN fotos en el sistema
 */
const KEY = process.env.SUPABASE_SERVICE_KEY ?? ''
const BASE = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

if (!KEY) { console.error('❌ SUPABASE_SERVICE_KEY no configurada'); process.exit(1) }

async function get<T>(path: string): Promise<T> {
  const r = await fetch(BASE + path, { headers: H })
  if (!r.ok) throw new Error(await r.text())
  return r.json() as Promise<T>
}

async function del(path: string): Promise<number> {
  const r = await fetch(BASE + path, {
    method: 'DELETE',
    headers: { ...H, Prefer: 'return=representation' }
  })
  if (!r.ok) { console.error('  ⚠️  Error:', await r.text()); return 0 }
  const rows = await r.json() as unknown[]
  return rows.length
}

async function main() {
  // ─── 1. TUCASA ───────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════')
  console.log('  TUCASA.COM — Auditoría y limpieza')
  console.log('══════════════════════════════════════\n')

  type Listing = { id: string; title: string; city: string; source_portal: string; source_url: string }
  const tucasaRows = await get<Listing[]>(
    '/rest/v1/listings?source_portal=eq.tucasa.com&select=id,title,city,source_portal,source_url&limit=2000'
  )

  console.log(`📊 Pisos de tucasa.com encontrados: ${tucasaRows.length}`)
  if (tucasaRows.length > 0) {
    const byCityMap: Record<string, number> = {}
    tucasaRows.forEach(r => { byCityMap[r.city ?? 'Sin ciudad'] = (byCityMap[r.city ?? 'Sin ciudad'] ?? 0) + 1 })
    const byCitySorted = Object.entries(byCityMap).sort((a, b) => b[1] - a[1]).slice(0, 10)
    console.log('\nTop ciudades:')
    byCitySorted.forEach(([city, n]) => console.log(`  ${String(n).padStart(4)}  ${city}`))
    console.log('\nPrimeros 5 ejemplos:')
    tucasaRows.slice(0, 5).forEach(r => console.log(`  [${r.city}] ${r.title?.slice(0, 60)}`))

    console.log('\n🗑️  Eliminando pisos de tucasa.com...')
    const deleted = await del('/rest/v1/listings?source_portal=eq.tucasa.com')
    console.log(`✅ Eliminados: ${deleted} pisos de tucasa.com\n`)
  } else {
    console.log('✅ No hay pisos de tucasa.com en el sistema\n')
  }

  // ─── 2. ANÁLISIS PISOS SIN FOTOS ─────────────────────────────────────────
  console.log('══════════════════════════════════════')
  console.log('  PISOS SIN FOTOS — Análisis completo')
  console.log('══════════════════════════════════════\n')

  // Listamos todos los listing_ids que SÍ tienen imágenes
  type ImgRow = { listing_id: string }
  const withImgRows = await get<ImgRow[]>('/rest/v1/listing_images?select=listing_id&limit=100000')
  const withImgSet = new Set(withImgRows.map(r => r.listing_id))

  // Todos los pisos publicados
  type ListingFull = {
    id: string; title: string; city: string; source_portal: string | null
    origin: string; status: string; price_eur: number | null; created_at: string
  }
  const allPublished = await get<ListingFull[]>(
    '/rest/v1/listings?status=eq.published&select=id,title,city,source_portal,origin,price_eur,created_at&limit=10000'
  )

  const noPhotos = allPublished.filter(r => !withImgSet.has(r.id))

  console.log(`📊 Total pisos publicados: ${allPublished.length}`)
  console.log(`🚫 Sin fotos: ${noPhotos.length} (${((noPhotos.length / allPublished.length) * 100).toFixed(1)}%)\n`)

  // Por portal
  const byPortal: Record<string, number> = {}
  noPhotos.forEach(r => {
    const k = r.source_portal ?? `[directo - ${r.origin}]`
    byPortal[k] = (byPortal[k] ?? 0) + 1
  })
  console.log('Sin fotos por portal:')
  Object.entries(byPortal).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    const pct = ((v / noPhotos.length) * 100).toFixed(1)
    console.log(`  ${String(v).padStart(5)}  ${pct.padStart(5)}%  ${k}`)
  })

  // Por ciudad (top 10)
  const byCity: Record<string, number> = {}
  noPhotos.forEach(r => { byCity[r.city ?? 'Sin ciudad'] = (byCity[r.city ?? 'Sin ciudad'] ?? 0) + 1 })
  console.log('\nTop 10 ciudades sin fotos:')
  Object.entries(byCity).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([city, n]) => {
    console.log(`  ${String(n).padStart(5)}  ${city}`)
  })

  // Antigüedad (% de hace más de 30 días)
  const now = Date.now()
  const old30 = noPhotos.filter(r => now - new Date(r.created_at).getTime() > 30 * 86400_000)
  const old90 = noPhotos.filter(r => now - new Date(r.created_at).getTime() > 90 * 86400_000)
  console.log(`\nAntiguedad de los sin fotos:`)
  console.log(`  > 30 días: ${old30.length} (${((old30.length / noPhotos.length) * 100).toFixed(1)}%)`)
  console.log(`  > 90 días: ${old90.length} (${((old90.length / noPhotos.length) * 100).toFixed(1)}%)`)

  // Sin precio además de sin fotos
  const noPriceNoPhoto = noPhotos.filter(r => !r.price_eur)
  console.log(`  Sin precio también: ${noPriceNoPhoto.length}`)

  console.log('\n✨ Análisis completado\n')
}

main().catch(console.error)
