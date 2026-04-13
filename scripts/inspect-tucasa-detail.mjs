// Inspecciona el HTML de detalle de tucasa.com para entender la estructura
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'es-ES,es;q=0.9' }, signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function htmlToText(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Paso 1: coger la primera URL de detalle del listado
const listHtml = await fetchHtml('https://www.tucasa.com/compra-venta/viviendas/madrid/')
const mList = listHtml.match(/href="([^"]*\?i=&id=(\d+))"/)
if (!mList) { console.log('No se encontró URL de detalle'); process.exit(1) }
const detailUrl = mList[1].startsWith('http') ? mList[1] : `https://www.tucasa.com${mList[1]}`
console.log('\n=== URL de detalle ===')
console.log(detailUrl)

// Paso 2: cargar la página de detalle
console.log('\nCargando página de detalle...')
const html = await fetchHtml(detailUrl)
console.log(`HTML size: ${html.length} chars`)

// Paso 3: buscar imágenes
console.log('\n=== IMÁGENES ===')
const imgPatterns = [
  /(?:src|data-src|data-lazy|data-original|data-url|content)="(https?:\/\/[^"]*tucasa[^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
  /(?:src|data-src|data-lazy|data-original|data-url|content)="(https?:\/\/[^"]*cacheimg[^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
  /"url":\s*"([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
  /background-image:\s*url\(['"](https?:\/\/[^'"]+)['"]\)/gi,
]
const foundImgs = new Set()
for (const re of imgPatterns) {
  for (const m of html.matchAll(re)) {
    foundImgs.add(m[1])
  }
}
console.log(`Encontradas ${foundImgs.size} imágenes:`)
;[...foundImgs].slice(0, 10).forEach(u => console.log(' ', u))

// Paso 4: buscar teléfono
console.log('\n=== TELÉFONO ===')
const phoneMatterns = [
  /\b([6-9]\d{8})\b/g,
  /\b(9\d{8})\b/g,
  /"phone"[:\s]+"([^"]+)"/gi,
  /tel[éeó]fono[^:]*:\s*([\d\s+-]{9,15})/gi,
  /data-phone\s*=\s*"([^"]+)"/gi,
]
const phones = new Set()
for (const re of phoneMatterns) {
  for (const m of html.matchAll(re)) {
    phones.add(m[1].trim())
  }
}
console.log(`Encontrados ${phones.size} teléfonos:`, [...phones].slice(0, 5))

// Paso 5: buscar descripción
console.log('\n=== DESCRIPCIÓN ===')
// Buscar divs con descripciones largas
const descPatterns = [
  /<div[^>]*(?:class|id)[^>]*(?:descrip|detail-text|property-desc|obs|comment)[^>]*>([\s\S]{50,3000}?)<\/div>/gi,
  /<p[^>]*(?:class|id)[^>]*(?:descrip|detail-text|obs)[^>]*>([\s\S]{50,2000}?)<\/p>/gi,
  /id="observaciones"[^>]*>([\s\S]{20,3000}?)<\/(?:div|p|section)>/gi,
  /<section[^>]*descrip[^>]*>([\s\S]{50,2000}?)<\/section>/gi,
  // JSON-LD description
  /"description":\s*"([^"]{50,2000})"/gi,
]
for (const re of descPatterns) {
  const ms = [...html.matchAll(re)]
  if (ms.length > 0) {
    const text = htmlToText(ms[0][1]).slice(0, 300)
    console.log(`Patrón encontrado [${re.source.slice(0,40)}...]: "${text}"`)
  }
}

// Paso 6: buscar nombre/anunciante
console.log('\n=== ANUNCIANTE ===')
const namePatterns = [
  /anunciante[^<]*<[^>]+>([^<]{3,60})</gi,
  /propietario[^<]*<[^>]+>([^<]{3,60})</gi,
  /"name":\s*"([^"]{3,60})"/gi,
  /class="[^"]*(?:contact|owner|anunc)[^"]*"[^>]*>[\s\S]{0,200}?<[^>]+>([^<]{3,60})</gi,
]
for (const re of namePatterns) {
  const ms = [...html.matchAll(re)]
  if (ms.length > 0) console.log(`  [${re.source.slice(0,40)}]: ${ms[0][1].trim()}`)
}

// Paso 7: dump de un chunk del HTML alrededor de "Descripción" o "Observaciones"
console.log('\n=== RAW AROUND DESCRIPCION ===')
const idx = html.toLowerCase().indexOf('descripci')
if (idx > -1) console.log(html.slice(Math.max(0, idx-100), idx+800).replace(/\s+/g,' ').slice(0,500))
