/**
 * Inspector de red de Fotocasa — captura todos los XHR/fetch relevantes
 * Uso: node scripts/inspect-fotocasa.mjs
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

chromium.use(StealthPlugin())

const URL_TEST = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?commercial=0'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})

// Capturar TODAS las respuestas para diagnóstico
const allResponses = []
context.on('response', async (response) => {
  const url = response.url()
  // Solo respuestas de fotocasa y su gateway
  if (!url.includes('fotocasa')) return
  const ct = response.headers()['content-type'] ?? ''
  const status = response.status()
  allResponses.push({ url, ct, status })
})

const page = await context.newPage()
console.log('Navegando a', URL_TEST)
await page.goto(URL_TEST, { waitUntil: 'load', timeout: 40_000 })
await page.evaluate(() => window.scrollBy(0, 800))
await new Promise(r => setTimeout(r, 4000))

// Inspeccionar variables globales del window
const globals = await page.evaluate(() => {
  const keys = Object.keys(window)
  const interesting = keys.filter(k => 
    /state|store|data|initial|props|listing|realestate|search|result|property/i.test(k) &&
    !/(webkit|chrome|performance|document|location|history|navigation)/i.test(k)
  )
  const result = {}
  for (const k of interesting.slice(0, 30)) {
    try {
      const val = JSON.stringify(window[k])
      if (val && val.length > 50) result[k] = val.slice(0, 300)
    } catch { result[k] = '[circular/error]' }
  }
  return result
})

// Buscar script tags con datos de listings
const scriptData = await page.evaluate(() => {
  const scripts = [...document.querySelectorAll('script')]
  return scripts
    .map(s => s.textContent ?? '')
    .filter(t => t.length > 200 && /realEstate|propertyId|priceInfo|municipality/i.test(t))
    .map(t => ({ len: t.length, snippet: t.slice(0, 500) }))
})

// Listar el título de la página y texto visible
const title = await page.title()
const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '')

console.log('\n══ TÍTULO:', title)
console.log('══ H1:', h1.slice(0, 100))

console.log('\n══ TODAS LAS RESPUESTAS DE FOTOCASA.ES (' + allResponses.length + ') ══')
for (const r of allResponses) {
  console.log(`[${r.status}] ${r.ct.slice(0,40).padEnd(40)} ${r.url.slice(0, 120)}`)
}

console.log('\n══ VARIABLES GLOBALES INTERESANTES ══')
for (const [k, v] of Object.entries(globals)) {
  console.log(`  ${k}: ${v}`)
}

console.log('\n══ SCRIPT TAGS CON DATOS (' + scriptData.length + ') ══')
for (const s of scriptData) {
  console.log(`  Bytes: ${s.len}`)
  console.log(`  Snippet: ${s.snippet.replace(/\s+/g,' ').slice(0,300)}`)
  console.log('  ─')
}

await browser.close()


console.log('\n══ RESPUESTAS JSON CAPTURADAS (' + captured.length + ') ══\n')
for (const c of captured) {
  console.log('URL    :', c.url)
  console.log('Status :', c.status, '  Bytes:', c.len)
  console.log('Snippet:', c.snippet.replace(/\n/g, ' ').slice(0, 200))
  console.log('─'.repeat(80))
}

await browser.close()
