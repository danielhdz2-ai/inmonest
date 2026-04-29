/**
 * Debug Fotocasa - ver qué HTML recibe
 */

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

async function test() {
  // Probar SIN filtro commercial=0
  const url1 = 'https://www.fotocasa.es/es/alquiler/viviendas/madrid-capital/todas-las-zonas/l'
  const url2 = 'https://www.fotocasa.es/es/alquiler/viviendas/madrid-capital/todas-las-zonas/l?commercial=0'
  
  console.log(`🔍 Test 1: SIN filtro commercial`)
  console.log(`   URL: ${url1}\n`)
  
  const res1 = await fetch(url1, {
    headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'es-ES' },
    signal: AbortSignal.timeout(15000),
  })
  
  const html1 = await res1.text()
  console.log(`   Status: ${res1.status}`)
  console.log(`   Length: ${html1.length} chars`)
  console.log(`   Has __NEXT_DATA__: ${html1.includes('__NEXT_DATA__')}`)
  console.log(`   Has "realEstateResults": ${html1.includes('realEstateResults')}`)
  
  console.log(`\n🔍 Test 2: CON filtro commercial=0`)
  console.log(`   URL: ${url2}\n`)
  
  const res2 = await fetch(url2, {
    headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'es-ES' },
    signal: AbortSignal.timeout(15000),
  })
  
  const html2 = await res2.text()
  console.log(`   Status: ${res2.status}`)
  console.log(`   Length: ${html2.length} chars`)
  console.log(`   Has __NEXT_DATA__: ${html2.includes('__NEXT_DATA__')}`)
  console.log(`   Has "realEstateResults": ${html2.includes('realEstateResults')}`)
  
  // Ver si hay un mensaje de "sin resultados"
  if (html2.includes('No hemos encontrado') || html2.includes('no hay resultados')) {
    console.log(`   ⚠️ Mensaje "sin resultados" detectado`)
  }
  
  // Buscar __NEXT_DATA__ y ver primeros chars
  if (html2.includes('__NEXT_DATA__')) {
    const match = html2.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s)
    if (match) {
      console.log(`\n   📄 __NEXT_DATA__ found (${match[1].length} chars)`)
      try {
        const data = JSON.parse(match[1])
        console.log(`   ✅ Valid JSON`)
        console.log(`   Keys:`, Object.keys(data).join(', '))
      } catch {
        console.log(`   ❌ Invalid JSON`)
      }
    }
  }
}

test().catch(console.error)
