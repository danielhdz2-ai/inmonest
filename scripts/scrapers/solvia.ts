/**
 * Scraper Solvia / Haya Real Estate — Oportunidades Bancarias
 * ─────────────────────────────────────────────────────────────
 * NOTA: haya.es fue absorbida completamente por Solvia (Intrum) en 2023.
 *       haya.es redirige ahora a solvia.es → este scraper cubre ambas marcas.
 *
 * Portafolio: activos inmobiliarios de Banco Sabadell (servicer: Intrum/Solvia)
 * Entidad bancaria mostrada: 'Banco Sabadell (Solvia/Intrum)'
 *
 * IMPLEMENTACIÓN: Usa la API interna REST de Solvia (SPA Angular).
 *   Endpoint de búsqueda: POST https://www.solvia.es/api/inmuebles/v2/buscarInmuebles
 *   Endpoint de detalle:  GET  https://www.solvia.es/es/propiedades/{op}/{slug}-{idVivienda}-{promotionId}
 *
 * CDN imágenes: cdnsolvproep.solvia.es/uploaded/img_{UUID}.ORIGINAL.jpg
 *   Nota: la API devuelve barras invertidas en las URLs → se normalizan con replace(/\\/g, '/')
 *
 * USO:
 *   npx tsx scripts/scrapers/solvia.ts [operacion] [maxPaginas] [maxItems] [provincia] [precioMax] [minFotos]
 *   operacion:  venta | alquiler (default: venta)
 *   maxPaginas: páginas de API a consultar (default: 5, ~20 pisos/página)
 *   maxItems:   máximo de pisos a importar (default: 9999)
 *   provincia:  barcelona | madrid | valencia | … (default: todas)
 *   precioMax:  precio máximo en EUR (filtrado client-side)
 *   minFotos:   mínimo de fotos requerido (default: 1)
 */

import { upsertListing, extractAmenities, type ScrapedListing } from './utils'

const UA_POOL = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
]
const randomUA = () => UA_POOL[Math.floor(Math.random() * UA_POOL.length)]

const BANK_ENTITY    = 'Banco Sabadell (Solvia/Intrum)'
const DELAY_MS       = 1500
const SOLVIA_API_URL = 'https://www.solvia.es/api/inmuebles/v2/buscarInmuebles'

// Mapa de nombre de provincia normalizado → idProvincia en la API de Solvia
const PROVINCE_IDS: Record<string, number> = {
  alava: 1, albacete: 2, alicante: 3, almeria: 4, asturias: 33, avila: 5,
  badajoz: 6, barcelona: 8, burgos: 9, caceres: 10, cadiz: 11, cantabria: 39,
  castellon: 12, ceuta: 51, ciudad_real: 13, cordoba: 14, cuenca: 16,
  girona: 17, granada: 18, guadalajara: 19, guipuzcoa: 20, huelva: 21,
  huesca: 22, islas_baleares: 7, jaen: 23, la_rioja: 26, las_palmas: 35,
  leon: 24, lleida: 25, lugo: 27, madrid: 28, malaga: 29, melilla: 52,
  murcia: 30, navarra: 31, ourense: 32, palencia: 34, pontevedra: 36,
  salamanca: 37, santa_cruz_tenerife: 38, segovia: 40, sevilla: 41,
  soria: 42, tarragona: 43, teruel: 44, toledo: 45, valencia: 46,
  valladolid: 47, vizcaya: 48, zamora: 49, zaragoza: 50,
}

// Interfaz del ítem devuelto por la API de búsqueda de Solvia
interface SolviaSearchItem {
  id: string                    // "178548-142529-O"
  idVivienda: number
  tituloFicha: string
  precio: number
  dormitorios: number
  banyos: number
  m2: number
  provincia: { id: string; nombre: string }
  poblacion: { id: number; nombre: string }
  direccion: string
  tipoVivienda: { id: number; nombre: string }
  categoriaTipoVivienda: { id: number; nombre: string }
  promocion: { id: number; titulo: string }
  listaImagenesInmueble_vORIGINAL: string[]
  situacionEspecial: boolean
  novedad: boolean
  reformar: boolean
  idOrigenProducto: number
  barrio: string | null
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function resolveProvince(name: string): number | undefined {
  const key = name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
  return PROVINCE_IDS[key]
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': randomUA(),
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(20_000),
      redirect: 'follow',
    })
    if (!res.ok) {
      console.warn(`  ⚠️  HTTP ${res.status} para ${url}`)
      return null
    }
    return res.text()
  } catch (err) {
    console.warn(`  ⚠️  Fetch error: ${err}`)
    return null
  }
}

// ─── Extraer URLs de listado del HTML de la página ──────────────────────────
function extractListingUrls(html: string): Array<{ url: string; isBankBadge: boolean }> {
  const results: Array<{ url: string; isBankBadge: boolean }> = []
  const seen = new Set<string>()

  // Los hrefs de las tarjetas apuntan a /es/propiedades/{op}/{slug}-{id1}-{id2}
  const linkRe = /href="(https:\/\/www\.solvia\.es\/es\/propiedades\/[^"]+)"/g
  let m: RegExpExecArray | null

  // Extraer todos los links con contexto para detectar badge bancario
  // El texto "INMUEBLE DE BANCO" aparece en el bloque anterior al href
  while ((m = linkRe.exec(html))) {
    const url = m[1]
    if (seen.has(url)) continue
    seen.add(url)

    // Inspeccionar los ~400 chars antes del enlace para detectar el badge
    const before = html.slice(Math.max(0, m.index - 500), m.index)
    const isBankBadge = /INMUEBLE\s+DE\s+BANCO/i.test(before)

    results.push({ url, isBankBadge })
  }

  return results
}

// ─── Parsear datos de la página de detalle ──────────────────────────────────
function parseDetailPage(html: string, sourceUrl: string): {
  title: string | null
  description: string | null
  price: number | null
  area: number | null
  bedrooms: number | null
  bathrooms: number | null
  province: string | null
  city: string | null
  district: string | null
  postalCode: string | null
  lat: number | null
  lng: number | null
  images: string[]
  isBankProperty: boolean
  specialBadge: string | null
} {
  // ── Título ─────────────────────────────────────────────────────────────────
  let title: string | null = null
  const h1m = html.match(/<h1[^>]*>([^<]{10,200})<\/h1>/i)
  if (h1m) title = h1m[1].replace(/\s+/g, ' ').trim()
  if (!title) {
    const metaTitle = html.match(/<title>([^<]{10,200})<\/title>/i)
    if (metaTitle) title = metaTitle[1].split('|')[0].trim()
  }
  if (!title) {
    const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]{10,200})"/i)
    if (ogTitle) title = ogTitle[1].trim()
  }

  // ── Descripción ────────────────────────────────────────────────────────────
  let description: string | null = null
  // JSON-LD (común en Solvia)
  const ldBlocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) ?? []
  for (const block of ldBlocks) {
    const inner = block.replace(/<\/?script[^>]*>/gi, '')
    try {
      const obj = JSON.parse(inner)
      const candidate = obj.description ?? obj['@graph']?.[0]?.description
      if (typeof candidate === 'string' && candidate.length > 60) {
        description = candidate.trim()
        break
      }
    } catch { /* ignorar */ }
  }
  if (!description) {
    const metaDesc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]{40,}?)"/i)
    if (metaDesc) description = metaDesc[1].trim()
  }

  // ── Precio ─────────────────────────────────────────────────────────────────
  let price: number | null = null
  // Patrones: JSON embebido "precio":259000, "220.000 €", "Desde 50.000 €"
  const pricePats = [
    /"precio"\s*:\s*(\d{5,8})/,                                   // JSON inline: "precio":259000
    /(?:Desde\s+|Precio de salida\s*)?(\d{1,3}(?:\.\d{3})+)\s*€/, // formato ES: 264.000 €
    /[\s"'>](\d{4,7})\s*€/,                                        // fallback numérico
  ]
  for (const p of pricePats) {
    const pm = html.match(p)
    if (pm) {
      const parsed = parseInt(pm[1].replace(/\./g, ''), 10)
      // Filtrar precios absurdos (< 5.000€ o > 50.000.000€)
      if (parsed >= 5_000 && parsed <= 50_000_000) {
        price = parsed
        break
      }
    }
  }

  // ── Superficie ─────────────────────────────────────────────────────────────
  let area: number | null = null
  const areaPats = [
    /"floorSize"\s*:\s*\{[^}]*"value"\s*:\s*"?([\d.]+)/i,
    /(\d{2,4}(?:\.\d{1,2})?)\s*m[²2]/,
  ]
  for (const p of areaPats) {
    const am = html.match(p)
    if (am) { area = parseFloat(am[1].replace(',', '.')); break }
  }

  // ── Habitaciones ───────────────────────────────────────────────────────────
  let bedrooms: number | null = null
  // Desde URL: /{slug}-{N}-dormitorios-{id1}-{id2}
  const bedsFromUrl = sourceUrl.match(/-(\d+)-dormitorios-/)
  if (bedsFromUrl) bedrooms = parseInt(bedsFromUrl[1], 10)
  if (!bedrooms) {
    const bedPats = [
      /"numberOfRooms"\s*:\s*(\d+)/,
      /(\d+)\s*dormitori(?:os|o)/i,
      /(\d+)\s*habitaci(?:ones|ón)/i,
    ]
    for (const p of bedPats) {
      const bm = html.match(p)
      if (bm) { bedrooms = parseInt(bm[1], 10); break }
    }
  }

  // ── Baños ──────────────────────────────────────────────────────────────────
  let bathrooms: number | null = null
  const bathPats = [
    /"numberOfBathroomsTotal"\s*:\s*(\d+)/,
    /(\d+)\s*baño/i,
  ]
  for (const p of bathPats) {
    const bm = html.match(p)
    if (bm) { bathrooms = parseInt(bm[1], 10); break }
  }

  // ── Provincia + Ciudad ─────────────────────────────────────────────────────
  // Título de detalle: "Piso en venta, C/ Calle, Ciudad, Provincia M12345"
  let province: string | null = null
  let city: string | null = null
  let district: string | null = null

  // Desde JSON-LD address
  for (const block of ldBlocks) {
    const inner = block.replace(/<\/?script[^>]*>/gi, '')
    try {
      const obj = JSON.parse(inner)
      const addr = obj.address ?? obj['@graph']?.[0]?.address
      if (addr) {
        province = addr.addressRegion ?? province
        city     = addr.addressLocality ?? city
        break
      }
    } catch { /* ignorar */ }
  }
  // Fallback: desde el title "... Olot - Girona" o "Madrid , Escorial (El)"
  if (!province || !city) {
    // Formato de lista: "Girona , Olot - C/ X" → province = Girona, city = Olot
    const locM = html.match(/([A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ\s/()]+)\s*,\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ\s()]+)\s*-\s*/)
    if (locM) { province = locM[1].trim(); city = locM[2].trim() }
  }

  // ── Código postal ──────────────────────────────────────────────────────────
  let postalCode: string | null = null
  const pcm = html.match(/"postalCode"\s*:\s*"(\d{5})"/)
    ?? html.match(/\b(0[1-9]|[1-4]\d|5[0-2])\d{3}\b/)
  if (pcm) postalCode = pcm[1]

  // ── Coordenadas ────────────────────────────────────────────────────────────
  let lat: number | null = null
  let lng: number | null = null
  const latm = html.match(/"lat(?:itude)?"\s*:\s*"?([-\d.]+)"?/i)
  const lngm = html.match(/"l(?:ng|on|ongitude)"\s*:\s*"?([-\d.]+)"?/i)
  if (latm) lat = parseFloat(latm[1])
  if (lngm) lng = parseFloat(lngm[1])

  // ── Imágenes ───────────────────────────────────────────────────────────────
  const images: string[] = []
  const seenImgs = new Set<string>()

  function addImg(raw: string) {
    // Limpiar query string y anchors
    const clean = raw.split('?')[0].split('#')[0].trim()
    if (!clean.startsWith('https://')) return
    // Solo CDN de Solvia
    if (!clean.includes('cdnsolvproep.solvia.es')) return
    // Descartar thumbnails con dimensiones (imagen_1234.720x503.ORIGINAL.jpg)
    if (/\.\d+x\d+\./.test(clean)) return
    // Descartar URLs con ruta de fecha antigua (rotas en CDN)
    if (/\/uploaded\/20\d{2}\//.test(clean) || /\/NEWS_[A-F0-9-]+/i.test(clean)) return
    // Normalizar a .ORIGINAL.jpg
    const url = /\.ORIGINAL\.jpg$/i.test(clean)
      ? clean
      : clean.replace(/\.[a-z]{3,4}$/i, '.ORIGINAL.jpg')
    if (!seenImgs.has(url)) { seenImgs.add(url); images.push(url) }
  }

  // 1. CDN directo en atributos src, data-src, data-lazy, href, content
  const cdnRe = /https:\/\/cdnsolvproep\.solvia\.es\/uploaded\/[^\s"'<>\\]+/g
  let im: RegExpExecArray | null
  while ((im = cdnRe.exec(html))) addImg(im[0])

  // 2. JSON-LD image arrays
  const ldBlocksImg = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) ?? []
  for (const block of ldBlocksImg) {
    const inner = block.replace(/<\/?script[^>]*>/gi, '')
    try {
      const obj = JSON.parse(inner)
      const candidates = [
        obj.image, obj.photo,
        obj['@graph']?.[0]?.image,
        obj['@graph']?.[0]?.photo,
      ].flat().filter(Boolean)
      for (const c of candidates) {
        if (typeof c === 'string') addImg(c)
        else if (typeof c === 'object' && c?.url) addImg(c.url)
        else if (typeof c === 'object' && c?.contentUrl) addImg(c.contentUrl)
      }
    } catch { /* ignorar */ }
  }

  // 3. JSON embebido de React/Next (ventana.__NEXT_DATA__, window.__INITIAL_STATE__, etc.)
  const jsonDataRe = /(?:__NEXT_DATA__|initialProps|window\.__[A-Z_]+)\s*=\s*(\{[\s\S]{20,}?\})\s*;?\s*<\/script>/
  const jdm = html.match(jsonDataRe)
  if (jdm) {
    const allCdnInJson = jdm[1].match(/https:\/\/cdnsolvproep\.solvia\.es\/uploaded\/[^\s"'\\]+/g) ?? []
    allCdnInJson.forEach(addImg)
  }

  // 4. og:image como último recurso
  if (images.length === 0) {
    const ogImg = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)
    if (ogImg) addImg(ogImg[1])
  }

  // ── Badges bancarios y especiales ─────────────────────────────────────────
  const isBankProperty = /INMUEBLE\s+DE\s+BANCO/i.test(html)
  let specialBadge: string | null = null
  if (/EN\s+SITUACI[ÓO]N\s+ESPECIAL/i.test(html)) specialBadge = 'EN SITUACIÓN ESPECIAL'
  else if (/VENTA\s+FLASH/i.test(html)) specialBadge = 'VENTA FLASH'
  else if (/NOVEDAD/i.test(html)) specialBadge = 'NOVEDAD'

  return {
    title, description, price, area, bedrooms, bathrooms,
    province, city, district, postalCode, lat, lng, images,
    isBankProperty, specialBadge,
  }
}

// ─── Extraer características del detalle ─────────────────────────────────────


// ─── Scraper principal ───────────────────────────────────────────────────────
export async function scrapeSolvia(
  operation: 'venta' | 'alquiler',
  maxPages: number,
  maxItems: number = 9999,
  provincia?: string,     // ej. 'barcelona' → mapea a idProvincia en la API
  precioMax?: number,     // precio máximo (filtra client-side tras la búsqueda)
  minFotos: number = 1,   // mínimo de fotos exigido (default 1 — acepta todos)
) {
  const opLabel: 'sale' | 'rent' = operation === 'venta' ? 'sale' : 'rent'
  const tipoOperacion = operation === 'venta' ? 'COMPRA' : 'ALQUILER'
  const filtroTipo    = operation === 'venta' ? 'V' : 'A'
  const opSlug        = operation === 'venta' ? 'comprar' : 'alquilar'

  const idProvincia = provincia ? resolveProvince(provincia) : undefined
  if (provincia && !idProvincia) {
    console.warn(`⚠️  Provincia desconocida: '${provincia}'. Se usarán todas las provincias.`)
  }

  console.log(
    `\n🏦 Solvia — ${operation}${provincia ? ` en ${provincia}` : ''}` +
    `${precioMax ? ` (hasta ${precioMax.toLocaleString('es-ES')}€)` : ''} | ` +
    `hasta ${maxPages} págs API | max ${maxItems} pisos`
  )

  // ── Paso 1: Colectar resultados de la API de búsqueda ────────────────────
  const allItems: SolviaSearchItem[] = []

  for (let page = 1; page <= maxPages; page++) {
    const body: Record<string, unknown> = {
      numeroPagina: page,
      registrosPorPagina: 20,
      idCategoriaTipoVivienda: 1,   // 1 = Viviendas
      tipoOperacion,
      filtroTipo,
    }
    if (idProvincia) body.idProvincia = idProvincia

    console.log(`  📄 Página API ${page}…`)
    let res: Response
    try {
      res = await fetch(SOLVIA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': randomUA(),
          Origin: 'https://www.solvia.es',
          Referer: 'https://www.solvia.es/',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(30_000),
      })
    } catch (err) {
      console.warn(`  ⚠️  Fetch error en página ${page}: ${err}`)
      break
    }

    if (!res.ok) {
      console.warn(`  ⚠️  API HTTP ${res.status} en página ${page}`)
      break
    }

    const data = await res.json() as { inmuebles?: SolviaSearchItem[]; totalResultados?: number }
    const items = data.inmuebles ?? []

    if (items.length === 0) {
      console.log('  ✅ Sin más resultados en la API')
      break
    }

    console.log(`  → ${items.length} anuncios (totalResultados: ${data.totalResultados ?? '?'})`)
    allItems.push(...items)

    // Si ya tenemos suficientes para el filtrado no hace falta seguir
    if (allItems.length >= maxItems * 6) break
    await sleep(DELAY_MS)
  }

  // ── Paso 2: Filtrar pisos (tipo "Piso") y ordenar por precio ascendente ────
  let candidates = allItems
    .filter(it => it.tipoVivienda?.nombre === 'Piso')
    .sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0))

  if (precioMax) {
    candidates = candidates.filter(it => (it.precio ?? 0) <= precioMax)
  }

  console.log(
    `\n  🏠 Pisos filtrados: ${candidates.length}` +
    `${precioMax ? ` (≤ ${precioMax.toLocaleString('es-ES')}€)` : ''}` +
    ` de ${allItems.length} viviendas totales`
  )

  // ── Paso 3: Enriquecer con página de detalle e insertar ───────────────────
  let imported = 0; let skipped = 0
  const seenIds = new Set<string>()

  for (const item of candidates) {
    if (imported >= maxItems) break
    const externalId = `solvia_${item.idVivienda}`
    if (seenIds.has(externalId)) continue
    seenIds.add(externalId)

    await sleep(DELAY_MS)

    // Construcción de URL de detalle
    const slug      = slugify(item.tituloFicha)
    const detailUrl = `https://www.solvia.es/es/propiedades/${opSlug}/${slug}-${item.idVivienda}-${item.promocion?.id ?? 0}`

    // Imágenes desde la API (normalizar barras invertidas)
    const images = (item.listaImagenesInmueble_vORIGINAL ?? [])
      .map(img => img.replace(/\\/g, '/'))
      .filter(img => img.startsWith('https://'))

    if (images.length < minFotos) {
      skipped++
      console.log(`    ⚠️ Solo ${images.length} fotos (<${minFotos}): ${item.tituloFicha.slice(0, 55)}`)
      continue
    }

    // Obtener descripción, coords, features desde la página HTML de detalle
    let description: string | null = null
    let lat: number | null = null
    let lng: number | null = null
    let postalCode: string | null = null
    let feats: Record<string, string> = {}

    const detailHtml = await fetchHtml(detailUrl)
    if (detailHtml) {
      const d = parseDetailPage(detailHtml, detailUrl)
      feats     = extractAmenities(detailHtml)
      description = d.description
      lat         = d.lat
      lng         = d.lng
      postalCode  = d.postalCode
    }

    // Badges de la respuesta de búsqueda
    if (item.situacionEspecial) feats['situacion_especial'] = 'true'
    if (item.novedad)           feats['novedad']            = 'true'
    if (item.reformar)          feats['a_reformar']         = 'true'

    const listing: ScrapedListing = {
      title:              item.tituloFicha,
      description:        description ?? undefined,
      price_eur:          item.precio ?? undefined,
      operation:          opLabel,
      province:           item.provincia?.nombre ?? undefined,
      city:               item.poblacion?.nombre ?? undefined,
      postal_code:        postalCode ?? undefined,
      lat:                lat ?? undefined,
      lng:                lng ?? undefined,
      bedrooms:           item.dormitorios ?? undefined,
      bathrooms:          item.banyos ?? undefined,
      area_m2:            item.m2 ?? undefined,
      source_portal:      'solvia.es',
      source_url:         detailUrl,
      source_external_id: externalId,
      is_particular:      false,
      is_bank:            true,           // Todos los activos de Solvia son bancarios
      bank_entity:        BANK_ENTITY,
      images,
      external_link:      detailUrl,
      features:           Object.keys(feats).length > 0 ? feats : undefined,
    }

    const ok = await upsertListing(listing)
    if (ok) {
      imported++
      console.log(
        `    ✅ [${imported}/${maxItems}] ${item.tituloFicha.slice(0, 50)} | ` +
        `${item.precio?.toLocaleString('es-ES') ?? '?'}€ | ${item.m2 ?? '?'}m² | ${images.length} fotos`
      )
    } else {
      skipped++
    }
  }

  console.log(`\n✅ Solvia — TOTAL: ${imported} importados, ${skipped} saltados`)
  return { inserted: imported, skipped }
}

// ─── Entry point ─────────────────────────────────────────────────────────────
if (process.argv[1]?.includes('solvia')) {
  // USO: npx tsx scripts/scrapers/solvia.ts [op] [maxPags] [maxItems] [provincia] [precioMax] [minFotos]
  const [op = 'venta', maxPagesStr = '5', maxItemsStr = '9999', provinciaArg, precioMaxStr, minFotosStr] = process.argv.slice(2)
  if (op !== 'venta' && op !== 'alquiler') {
    console.error('❌ Operación inválida. Usa: venta | alquiler')
    process.exit(1)
  }
  scrapeSolvia(
    op as 'venta' | 'alquiler',
    parseInt(maxPagesStr, 10),
    parseInt(maxItemsStr, 10),
    provinciaArg || undefined,
    precioMaxStr ? parseInt(precioMaxStr, 10) : undefined,
    minFotosStr ? parseInt(minFotosStr, 10) : 1,
  )
}
