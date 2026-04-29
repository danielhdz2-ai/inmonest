/**
 * Debug script para Milanuncios - ver qué HTML recibe
 */

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

async function test() {
  const url = 'https://www.milanuncios.com/pisos-en-alquiler-en-madrid/?pagina=1'
  
  console.log(`🔍 Fetching: ${url}\n`)
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Cache-Control': 'no-cache',
      'Referer': 'https://www.milanuncios.com/',
    },
    signal: AbortSignal.timeout(20000),
  })

  console.log(`📊 Status: ${res.status}`)
  console.log(`📋 Headers:`)
  console.log(`   Content-Type: ${res.headers.get('content-type')}`)
  console.log(`   Content-Length: ${res.headers.get('content-length')}`)
  
  const html = await res.text()
  
  console.log(`\n📄 HTML length: ${html.length} chars`)
  console.log(`\n🔍 First 1000 chars:`)
  console.log(html.slice(0, 1000))
  
  console.log(`\n🔍 Searching for listings...`)
  
  // Buscar patrones de anuncios
  const linkRe = /href="(\/(?:pisos-en-(?:venta|alquiler)-en-[^/]+)\/anuncio\/[^"]+)"/g
  let matches = 0
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(html))) {
    matches++
    if (matches <= 3) {
      console.log(`   ✅ Found: ${m[1].slice(0, 80)}`)
    }
  }
  console.log(`\n📊 Total matches: ${matches}`)
  
  // Buscar textos indicativos
  if (html.includes('robot') || html.includes('captcha')) console.log('⚠️ Possible bot detection')
  if (html.includes('No hemos encontrado')) console.log('⚠️ "No hemos encontrado" message found')
  if (html.includes('pisos-en-')) console.log('✅ "pisos-en-" pattern found')
}

test().catch(console.error)
