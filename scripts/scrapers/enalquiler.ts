/**
 * Scraper DEDICADO a particulares de enalquiler.com
 *
 * enalquiler.com es un portal 100% de alquiler, con gran porcentaje de particulares.
 * Solo soporta operación 'alquiler' (la web es exclusivamente de alquiler).
 * Todos los anuncios de la sección /particular/ se marcan is_particular = true.
 *
 * URL base del listado:
 *   https://www.enalquiler.com/alquilar/alquiler-piso-particular-{city}_2_{cityId}_30.html
 *   Página 2+: ...{cityId}_30-{page}.html
 *
 * URL del detalle:
 *   https://www.enalquiler.com/alquiler_piso_{city}/alquiler-piso-{slug}_{id}.html
 *
 * Uso:
 *   npx tsx scripts/scrapers/enalquiler.ts [city] [maxPages]
 *   city: madrid | barcelona | valencia | sevilla | zaragoza | bilbao | malaga | alicante | murcia | granada
 *   maxPages: número máximo de páginas (defecto: 5)
 *
 * Ejemplo:
 *   npx tsx scripts/scrapers/enalquiler.ts madrid 5
 */

import { upsertListing, type ScrapedListing } from './utils'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const DELAY_MS = 1600

// ─────────────────────────────────────────────────────────────────────────────
// Mapa de ciudades → { cityId, province, city, detailSlug }
// cityId: obtenido de la URL de listado de enalquiler.com
// ─────────────────────────────────────────────────────────────────────────────
const CITY_MAP: Record<string, { cityId: number; province: string; city: string; detailSlug: string }> = {
  madrid:    { cityId: 27745, province: 'Madrid',    city: 'Madrid',    detailSlug: 'madrid' },
  barcelona: { cityId: 28012, province: 'Barcelona', city: 'Barcelona', detailSlug: 'barcelona' },
  valencia:  { cityId: 27744, province: 'Valencia',  city: 'Valencia',  detailSlug: 'valencia' },
  sevilla:   { cityId: 27767, province: 'Sevilla',   city: 'Sevilla',   detailSlug: 'sevilla' },
  zaragoza:  { cityId: 27750, province: 'Zaragoza',  city: 'Zaragoza',  detailSlug: 'zaragoza' },
  bilbao:    { cityId: 27755, province: 'Vizcaya',   city: 'Bilbao',    detailSlug: 'bizkaia' },
  malaga:    { cityId: 27762, province: 'Málaga',    city: 'Málaga',    detailSlug: 'malaga' },
  alicante:  { cityId: 27746, province: 'Alicante',  city: 'Alicante',  detailSlug: 'alicante' },
  murcia:    { cityId: 27763, province: 'Murcia',    city: 'Murcia',    detailSlug: 'murcia' },
  granada:   { cityId: 27759, province: 'Granada',   city: 'Granada',   detailSlug: 'granada' },
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP helper
// ─────────────────────────────────────────────────────────────────────────────
async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-cache',
        Referer: 'https://www.enalquiler.com/',
      },
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) {
      console.warn(`  ⚠️ HTTP ${res.status} → ${url}`)
      return null
    }
    return res.text()
  } catch (err) {
    console.warn(`  ⚠️ Fetch error: ${err}`)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// URL del listado de particulares de una ciudad + página
// ─────────────────────────────────────────────────────────────────────────────
function listingPageUrl(cityKey: string, page: number): string {
  const { cityId } = CITY_MAP[cityKey]
  const base = `https://www.enalquiler.com/alquilar/alquiler-piso-particular-${cityKey}_2_${cityId}_30`
  return page === 1 ? `${base}.html` : `${base}-${page}.html`
}

// ─────────────────────────────────────────────────────────────────────────────
// Extrae IDs/URLs de anuncios de la página de listado
// El patrón del href es: /alquiler_piso_{city}/alquiler-piso-{slug}_{id}.html
// ─────────────────────────────────────────────────────────────────────────────
interface ListingStub {
  id: string
  url: string
  title: string
  priceRaw: string | null
  area: number | null
  bedrooms: number | null
  bathrooms: number | null
  firstImage: string | null
  description: string | null
  address: string | null
}

function extractStubs(html: string): ListingStub[] {
  const stubs: ListingStub[] = []

  // Patrón de URL de detalle
  const detailRe = /href="(\/alquiler_piso_[^/]+\/alquiler-piso-[^"]+_(\d{5,})\.html)"/gi
  const seen = new Set<string>()
  let m: RegExpExecArray | null

  while ((m = detailRe.exec(html))) {
    const path = m[1]
    const id = m[2]
    if (seen.has(id)) continue
    seen.add(id)

    const url = `https://www.enalquiler.com${path}`
    stubs.push({ id, url, title: '', priceRaw: null, area: null, bedrooms: null, bathrooms: null, firstImage: null, description: null, address: null })
  }

  return stubs
}

// ─────────────────────────────────────────────────────────────────────────────
// Extrae datos completos de la PÁGINA DE DETALLE de un anuncio
// ─────────────────────────────────────────────────────────────────────────────
interface DetailData {
  title: string
  price: number | null
  area: number | null
  bedrooms: number | null
  bathrooms: number | null
  description: string | null
  images: string[]
  district: string | null
  city: string | null
  address: string | null
  lat: number | null
  lng: number | null
  isParticular: boolean
}

function parseDetail(html: string, fallbackCity: string): DetailData {
  // ── Verificar que es particular ──────────────────────────────
  const particularMarkers = [
    /particular/i,
    /propietario/i,
    /no\s+inmobiliaria/i,
    /abstenerse\s+agencia/i,
    /sin\s+agencia/i,
  ]
  const isParticular = particularMarkers.some((r) => r.test(html))

  // ── Título ───────────────────────────────────────────────────
  let title = ''
  const titleM = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (titleM) title = titleM[1].replace(/<[^>]+>/g, '').trim().slice(0, 200)
  if (!title) {
    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)
    if (ogTitle) title = ogTitle[1].trim()
  }

  // ── Precio ───────────────────────────────────────────────────
  let price: number | null = null
  const pricePats = [
    /"price"\s*:\s*"?([\d.,]+)"?/i,
    /(\d{1,3}(?:[.,]\d{3})*)\s*€\s*\/?\s*mes/i,
    /(\d{3,6})\s*€/,
  ]
  for (const p of pricePats) {
    const pm = html.match(p)
    if (pm) {
      const raw = pm[1].replace(/[.,]/g, '').replace(/\./g, '')
      const val = parseInt(raw, 10)
      if (!isNaN(val) && val > 50 && val < 100000) { price = val; break }
    }
  }

  // ── Superficie ───────────────────────────────────────────────
  let area: number | null = null
  const areaPats = [
    /"floorSize".*?"value"\s*:\s*"?(\d+)/i,
    /(\d{2,4})\s*m[²2]/i,
    /superficie[^:]*:\s*(\d+)/i,
  ]
  for (const p of areaPats) {
    const am = html.match(p)
    if (am) { area = parseInt(am[1], 10); break }
  }

  // ── Habitaciones ─────────────────────────────────────────────
  let bedrooms: number | null = null
  const bedPats = [
    /(\d+)\s*hab(?:itaci(?:ones|[oó]n))?/i,
    /(\d+)\s*dormitori(?:os|o)/i,
    /"numberOfRooms"\s*:\s*(\d+)/,
  ]
  for (const p of bedPats) {
    const bm = html.match(p)
    if (bm) { bedrooms = parseInt(bm[1], 10); break }
  }

  // ── Baños ────────────────────────────────────────────────────
  let bathrooms: number | null = null
  const bathPats = [
    /(\d+)\s*ba[ñn]o/i,
    /"numberOfBathroomsTotal"\s*:\s*(\d+)/,
  ]
  for (const p of bathPats) {
    const bm = html.match(p)
    if (bm) { bathrooms = parseInt(bm[1], 10); break }
  }

  // ── Descripción ──────────────────────────────────────────────
  let description: string | null = null
  const descPats = [
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="[^"]*descripcion[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<p[^>]*class="[^"]*descripcion[^"]*"[^>]*>([\s\S]*?)<\/p>/i,
    /class="[^"]*anuncio-descripcion[^"]*"[^>]*>([\s\S]*?)<\/(?:div|p|section)>/i,
    /<meta[^>]+name="description"[^>]+content="([^"]{80,})"/i,
  ]
  for (const p of descPats) {
    const dm = html.match(p)
    if (dm) {
      description = dm[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3000)
      if (description.length > 50) break
    }
  }
  // Fallback: og:description
  if (!description || description.length < 50) {
    const og = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i)
    if (og) description = og[1].trim()
  }

  // ── Imágenes ─────────────────────────────────────────────────
  const images: string[] = []
  // Patrón CDN enalquiler: https://images.enalquiler.com/viviendas/{a}/{b}/{id}-{abc}_no.jpg
  const imgRe = /https:\/\/images\.enalquiler\.com\/viviendas\/\d+\/\d+\/\d+-\d+_no\.jpg/gi
  const imgSeen = new Set<string>()
  let im: RegExpExecArray | null
  while ((im = imgRe.exec(html))) {
    if (!imgSeen.has(im[0])) {
      imgSeen.add(im[0])
      images.push(im[0])
    }
  }
  // También buscar og:image
  const ogImgM = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)
  if (ogImgM && !imgSeen.has(ogImgM[1])) images.unshift(ogImgM[1])

  // ── Localización ─────────────────────────────────────────────
  let lat: number | null = null
  let lng: number | null = null
  const latM = html.match(/"latitude"\s*:\s*"?([\d.-]+)"?/i) ?? html.match(/lat[itude]*["']?\s*[:=]\s*"?([\d.-]+)"?/i)
  const lngM = html.match(/"longitude"\s*:\s*"?([\d.-]+)"?/i) ?? html.match(/l(?:ng|ongitude)["']?\s*[:=]\s*"?([\d.-]+)"?/i)
  if (latM && lngM) {
    const latV = parseFloat(latM[1])
    const lngV = parseFloat(lngM[1])
    if (latV > 36 && latV < 44 && lngV > -10 && lngV < 5) {
      lat = latV; lng = lngV
    }
  }

  // ── Dirección y distrito ─────────────────────────────────────
  let address: string | null = null
  let district: string | null = null
  let cityResult = fallbackCity

  // JSON-LD address
  const addrM = html.match(/"streetAddress"\s*:\s*"([^"]+)"/i)
  if (addrM) address = addrM[1].trim()

  const districtM = html.match(/"addressLocality"\s*:\s*"([^"]+)"/i)
  if (districtM) {
    const parts = districtM[1].split(',').map(s => s.trim())
    if (parts.length >= 2) {
      district = parts[0]
      cityResult = parts[parts.length - 1]
    } else {
      cityResult = parts[0]
    }
  }

  // Fallback: dirección visible en la página (patrón: "Calle ..., Distrito, Ciudad")
  if (!address) {
    const visibleAddr = html.match(/(?:Calle|Avenida|Plaza|Paseo|Carrer|Via|Ronda|Travesía|Camino)[^<\n]{5,80}/i)
    if (visibleAddr) address = visibleAddr[0].replace(/\s+/g, ' ').trim()
  }

  return { title, price, area, bedrooms, bathrooms, description, images, district, city: cityResult, address, lat, lng, isParticular }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const cityKey = (args[0] ?? 'madrid').toLowerCase()
  const maxPages = parseInt(args[1] ?? '5', 10)

  if (!CITY_MAP[cityKey]) {
    console.error(`❌ Ciudad no soportada: "${cityKey}"\n   Disponibles: ${Object.keys(CITY_MAP).join(', ')}`)
    process.exit(1)
  }

  const cityData = CITY_MAP[cityKey]
  console.log(`\n🏠 enalquiler.com — Scraper Particulares`)
  console.log(`   Ciudad: ${cityData.city}  |  Operación: alquiler  |  Páginas: ${maxPages}\n`)

  let totalUpserted = 0
  let totalSkipped = 0

  for (let page = 1; page <= maxPages; page++) {
    const pageUrl = listingPageUrl(cityKey, page)
    console.log(`\n📄 Página ${page}/${maxPages} → ${pageUrl}`)

    const listHtml = await fetchHtml(pageUrl)
    if (!listHtml) {
      console.log(`  ⚠️ No se pudo cargar la página ${page}, saltando...`)
      break
    }

    // Verificar que hay resultados (si hay "No se han encontrado" o 0 resultados, parar)
    if (/no\s+se\s+han\s+encontrado|0\s+viviendas|sin\s+resultados/i.test(listHtml)) {
      console.log(`  ℹ️ Sin más resultados en página ${page}, finalizando.`)
      break
    }

    const stubs = extractStubs(listHtml)
    console.log(`  🔍 ${stubs.length} anuncios encontrados`)

    if (stubs.length === 0) {
      console.log(`  ℹ️ Página vacía, finalizando.`)
      break
    }

    for (const stub of stubs) {
      console.log(`  → Procesando anuncio #${stub.id} ...`)
      await sleep(DELAY_MS + Math.random() * 600)

      const detailHtml = await fetchHtml(stub.url)
      if (!detailHtml) {
        console.warn(`    ⚠️ No se pudo cargar el detalle, saltando`)
        totalSkipped++
        continue
      }

      const detail = parseDetail(detailHtml, cityData.city)

      if (!detail.price) {
        console.log(`    ⏭ Sin precio, saltando`)
        totalSkipped++
        continue
      }

      if (detail.images.length === 0) {
        console.log(`    ⏭ Sin imágenes, saltando`)
        totalSkipped++
        continue
      }

      const title = detail.title || `Piso en alquiler en ${cityData.city}`

      const listing: ScrapedListing = {
        title,
        description: detail.description ?? undefined,
        price_eur: detail.price,
        operation: 'rent',
        province: cityData.province,
        city: detail.city ?? cityData.city,
        district: detail.district ?? undefined,
        lat: detail.lat ?? undefined,
        lng: detail.lng ?? undefined,
        bedrooms: detail.bedrooms ?? undefined,
        bathrooms: detail.bathrooms ?? undefined,
        area_m2: detail.area ?? undefined,
        source_portal: 'enalquiler',
        source_url: stub.url,
        source_external_id: `enalquiler_${stub.id}`,
        is_particular: true, // La sección "/particular/" solo tiene particulares
        images: detail.images,
      }

      const ok = await upsertListing(listing)
      if (ok) {
        totalUpserted++
        console.log(`    ✅ ${detail.price.toLocaleString('es-ES')}€/mes — ${title.slice(0, 60)}`)
      } else {
        totalSkipped++
      }
    }

    // Pausa entre páginas para no sobrecargar
    if (page < maxPages) {
      console.log(`  ⏳ Pausa 3s entre páginas...`)
      await sleep(3000)
    }
  }

  console.log(`\n✨ enalquiler.com [${cityData.city}] — Completado`)
  console.log(`   ✅ Insertados/actualizados: ${totalUpserted}`)
  console.log(`   ⏭ Saltados: ${totalSkipped}\n`)
}

main().catch((err) => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
