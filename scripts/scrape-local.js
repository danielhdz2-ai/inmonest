// ============================================================
// Mi Vivienda Libre — Scraper local
// Ejecutar DESDE TU PC (IP española) para que los portales no bloqueen
// Manda los resultados directamente a tu API en Vercel
//
// Uso: node scripts/scrape-local.js
// ============================================================

const API_URL = 'https://miviviendalibre.vercel.app/api/ingest'
const API_SECRET = 'scraper-secret-mvl-2026'

// ── Wallapop ──────────────────────────────────────────────────────────────────

const CITIES = [
  { name: 'Madrid',    lat: 40.4168, lng: -3.7038 },
  { name: 'Barcelona', lat: 41.3851, lng:  2.1734 },
  { name: 'Valencia',  lat: 39.4699, lng: -0.3763 },
  { name: 'Sevilla',   lat: 37.3891, lng: -5.9845 },
  { name: 'Málaga',    lat: 36.7213, lng: -4.4214 },
  { name: 'Bilbao',    lat: 43.2630, lng: -2.9350 },
  { name: 'Zaragoza',  lat: 41.6488, lng: -0.8891 },
  { name: 'Alicante',  lat: 38.3452, lng: -0.4810 },
  { name: 'Granada',   lat: 37.1773, lng: -3.5986 },
  { name: 'Murcia',    lat: 37.9922, lng: -1.1307 },
]

const SEARCHES_WALLAPOP = [
  'piso alquiler particular sin comision',
  'piso venta propietario sin agencia',
  'apartamento alquiler trato directo',
  'casa venta dueno directo',
  'piso reformado alquiler particular',
]

async function scrapeWallapop(city) {
  const results = []
  for (const keywords of SEARCHES_WALLAPOP) {
    try {
      const params = new URLSearchParams({
        keywords,
        filters_source: 'quick_filters',
        latitude: city.lat,
        longitude: city.lng,
        order_by: 'newest',
        category_ids: '200',
        items_count: '40',
        start: '0',
        language: 'es_ES',
      })
      const url = `https://api.wallapop.com/api/v3/general/search?${params}`
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'es-ES,es;q=0.9',
          'Referer': 'https://es.wallapop.com/',
          'Origin': 'https://es.wallapop.com',
        }
      })
      if (!res.ok) { console.log(`Wallapop ${city.name} [${keywords}]: ${res.status}`); continue }
      const data = await res.json()
      const items = data?.data?.section?.payload?.items ?? []
      for (const item of items) {
        const price = item.price?.amount ? parseFloat(item.price.amount) : null
        const title = item.title ?? ''
        const desc = item.description ?? ''
        const image = item.main_image?.urls?.['640'] ?? item.images?.[0]?.urls?.['640'] ?? null
        const op = /alquil|arriend|rent/i.test(`${title} ${desc}`) ? 'rent'
                  : /vend|venta|sale|compra/i.test(`${title} ${desc}`) ? 'sale'
                  : 'rent'
        results.push({
          source: 'wallapop',
          external_id: `wallapop-${item.id}`,
          url: `https://es.wallapop.com/item/${item.web_slug ?? item.id}`,
          title: title.slice(0, 200),
          description: desc.slice(0, 3000),
          price,
          city: city.name,
          operation: op,
          image_url: image,
        })
      }
      await sleep(400)
    } catch (e) { console.error(`Wallapop error ${city.name}:`, e.message) }
  }
  return results
}

// ── Milanuncios RSS ────────────────────────────────────────────────────────────

const CITY_SLUGS = {
  'Madrid':     'madrid',
  'Barcelona':  'barcelona',
  'Valencia':   'valencia-ciudad',
  'Sevilla':    'sevilla',
  'Málaga':     'malaga',
  'Bilbao':     'bilbao',
  'Zaragoza':   'zaragoza',
  'Alicante':   'alicante',
  'Granada':    'granada',
  'Murcia':     'murcia',
}

function extractRssTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return (m?.[1] ?? m?.[2] ?? '').trim()
}
function extractPrice(text) {
  const m = text.match(/(\d[\d.,]+)\s*€/)
  if (!m) return null
  return parseFloat(m[1].replace(/\./g, '').replace(',', '.'))
}
function extractImg(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/)
  return m?.[1] ?? null
}

async function scrapeMilanuncios(cityName, citySlug) {
  const results = []
  const ops = [
    { slug: 'pisos-en-alquiler', op: 'rent' },
    { slug: 'pisos-en-venta',    op: 'sale' },
    { slug: 'casas-en-alquiler', op: 'rent' },
    { slug: 'casas-en-venta',    op: 'sale' },
  ]
  for (const { slug, op } of ops) {
    try {
      const url = `https://www.milanuncios.com/rss/${slug}/?donde=${citySlug}&texto=particular`
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.9',
        }
      })
      if (!res.ok) { console.log(`Milanuncios ${cityName}/${slug}: ${res.status}`); continue }
      const xml = await res.text()
      if (!xml.includes('<item>')) { console.log(`Milanuncios ${cityName}/${slug}: no items`); continue }
      const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []
      for (const block of blocks) {
        const title = extractRssTag(block, 'title')
        const link  = extractRssTag(block, 'link')
        const desc  = extractRssTag(block, 'description')
        const guid  = extractRssTag(block, 'guid')
        if (!title || !link) continue
        const id = `milanuncios-${(guid || link).split('/').filter(Boolean).pop()}`
        results.push({
          source: 'milanuncios',
          external_id: id,
          url: link,
          title: title.replace(/\s+/g, ' ').slice(0, 200),
          description: desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3000),
          price: extractPrice(title) ?? extractPrice(desc),
          city: cityName,
          operation: op,
          image_url: extractImg(desc),
        })
      }
      await sleep(600)
    } catch(e) { console.error(`Milanuncios error ${cityName}/${slug}:`, e.message) }
  }
  return results
}

// ── Enviar a la API ────────────────────────────────────────────────────────────

async function ingest(listings) {
  if (listings.length === 0) return { inserted: 0, skipped: 0 }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-scraper-secret': API_SECRET },
    body: JSON.stringify({ listings }),
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`)
  return await res.json()
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── Main ───────────────────────────────────────────────────────────────────────

;(async () => {
  console.log('🏠 Mi Vivienda Libre — Scraper local iniciado')
  console.log('============================================================')

  const allListings = []

  for (const city of CITIES) {
    console.log(`\n📍 ${city.name}...`)

    // Wallapop
    const wp = await scrapeWallapop(city)
    console.log(`  Wallapop: ${wp.length} anuncios`)
    allListings.push(...wp)
    await sleep(1000)

    // Milanuncios
    const slug = CITY_SLUGS[city.name]
    if (slug) {
      const ma = await scrapeMilanuncios(city.name, slug)
      console.log(`  Milanuncios: ${ma.length} anuncios`)
      allListings.push(...ma)
      await sleep(1000)
    }
  }

  // Eliminar duplicados por external_id
  const unique = [...new Map(allListings.map(x => [x.external_id, x])).values()]
  console.log(`\n📦 Total únicos: ${unique.length}`)

  // Enviar en bloques de 50
  let inserted = 0, skipped = 0
  const BATCH = 50
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH)
    try {
      const r = await ingest(batch)
      inserted += r.inserted ?? 0
      skipped  += r.skipped ?? 0
      console.log(`  ✅ Bloque ${Math.floor(i/BATCH)+1}: +${r.inserted} nuevos, ${r.skipped} ya existían`)
    } catch(e) { console.error(`  ❌ Error en bloque ${Math.floor(i/BATCH)+1}:`, e.message) }
    await sleep(500)
  }

  console.log('\n============================================================')
  console.log(`✅ Finished. Insertados: ${inserted} | Ya existían: ${skipped}`)
})()
