const r = await fetch('https://www.milanuncios.com/pisos/?donde=madrid&tipo=venta&demandante=par', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9',
  }
})
const h = await r.text()
console.log('STATUS:', r.status, '| FINAL URL:', r.url, '| LENGTH:', h.length)

// NEXT_DATA
const ndm = h.match(/id="__NEXT_DATA__"[^>]*>([\s\S]{1,8000})/)
if (ndm) {
  console.log('\n=== __NEXT_DATA__ snippet ===')
  console.log(ndm[1].slice(0, 2000))
} else {
  console.log('NO __NEXT_DATA__')
}

// API references
const apis = [...h.matchAll(/https?:\/\/[a-z0-9.-]*milanuncios[a-z0-9.-]*\/api\/[^"'\s)]{0,120}/g)]
if (apis.length) {
  console.log('\n=== API URLs found ===')
  apis.slice(0, 10).forEach(m => console.log(m[0]))
}

// Links a anuncios
const links = [...h.matchAll(/href="(\/[^"]*anuncio[^"]{0,100})"/g)]
console.log('\n=== Anuncio links found:', links.length)
links.slice(0, 5).forEach(m => console.log(m[1]))

// HTML snippet
console.log('\n=== HTML snippet ===')
console.log(h.slice(0, 800).replace(/\n/g, ' '))
