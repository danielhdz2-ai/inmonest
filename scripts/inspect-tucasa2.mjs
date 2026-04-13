const url = 'https://www.tucasa.com/compra-venta/casas-y-chalets/madrid/cercedilla/dehesas/?i=&id=17384011'
const res = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}})
const html = await res.text()

// JSON-LD
const jldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
console.log('JSON-LD bloques:', jldBlocks.length)
for (const b of jldBlocks) {
  try {
    const j = JSON.parse(b[1])
    console.log('  Keys:', Object.keys(j))
    if (j.image) console.log('  image:', JSON.stringify(j.image).slice(0,500))
    if (j.description) console.log('  desc:', j.description.slice(0,200))
  } catch(e) { console.log('  parse error') }
}

// Todas las cacheimg
const cacheImgs = [...new Set([...html.matchAll(/cacheimg\/[^"'\s<>]+/g)].map(m=>`https://www.tucasa.com/${m[0]}`))]
console.log('\ncacheimg urls encontrados:', cacheImgs.length)
cacheImgs.slice(0, 15).forEach(u => console.log(' ', u))

// Buscar data-src / data-lazy
const lazys = [...html.matchAll(/data-(?:src|lazy|original|url)="([^"]+tucasa[^"]+)"/gi)].map(m=>m[1])
console.log('\ndata-lazy/src tucasa:', lazys.slice(0,10))

// Buscar JSON inline con fotos
const jsonFotos = html.match(/"fotos"\s*:\s*\[([\s\S]{10,500}?)\]/)
if (jsonFotos) console.log('\nfotos JSON:', jsonFotos[0].slice(0,300))

const jsonImgs = html.match(/"imagenes?"\s*:\s*\[([\s\S]{10,500}?)\]/)
if (jsonImgs) console.log('\nimagenes JSON:', jsonImgs[0].slice(0,300))

// Var JS con fotos o galeria
const varFotos = html.match(/var\s+(?:fotos|galeria|photos|imagenes)\s*=\s*([\s\S]{10,500}?);/)
if (varFotos) console.log('\nvar fotos:', varFotos[0].slice(0,300))

// idfoto pattern
const idFoto = [...html.matchAll(/idfoto[=:]["']?(\d+)/gi)].map(m=>m[1])
console.log('\nidfoto:', idFoto.slice(0,10))
