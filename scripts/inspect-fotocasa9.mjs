/**
 * Busca el endpoint de búsqueda en el bundle JS de Fotocasa y
 * luego lo llama directamente desde el contexto del navegador
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())

const br = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
const ctx = await br.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES', viewport: { width: 1366, height: 768 },
})

// Captura la URL del bundle SearchStandardPage para luego inspeccionarla
let bundleUrl = null
ctx.on('response', async (res) => {
  if (res.url().includes('SearchStandardPage') && res.url().endsWith('.js')) {
    bundleUrl = res.url()
  }
})

const pg = await ctx.newPage()
await pg.goto('https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?advertiserType=3', { waitUntil:'load', timeout:35000 })
await new Promise(r => setTimeout(r, 1000))

console.log('Bundle URL:', bundleUrl)

// Intenta llamar la API directamente — prueba varios endpoints comunes
const COMBINED_IDS = '724,14,28,173,0,28079,0,0,0'
const ENDPOINTS = [
  `https://web.gw.fotocasa.es/v2/propertysearch/search?combinedLocationIds=${COMBINED_IDS}&culture=es-ES&latitude=40.4096&longitude=-3.68624&page=1&pageSize=20&advertiserType=3&transactionTypeIds=1&propertyTypeIds=2`,
  `https://web.gw.fotocasa.es/v1/propertysearch/search?combinedLocationIds=${COMBINED_IDS}&culture=es-ES&page=1&advertiserType=3`,
  `https://web.gw.fotocasa.es/v2/propertysearch/realestate?combinedLocationIds=${COMBINED_IDS}&culture=es-ES&page=1&advertiserType=3`,
  `https://web.gw.fotocasa.es/v2/realestate/search?combinedLocationIds=${COMBINED_IDS}&culture=es-ES&page=1&advertiserType=3`,
]

for (const url of ENDPOINTS) {
  const result = await pg.evaluate(async (u) => {
    try {
      const r = await fetch(u, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'es-ES,es;q=0.9',
          'Referer': 'https://www.fotocasa.es/',
        }
      })
      const text = await r.text()
      return { status: r.status, len: text.length, snippet: text.slice(0, 400) }
    } catch (e) {
      return { error: e.message }
    }
  }, url)
  console.log(`\n[${result.status ?? 'ERR'}] ${result.len ?? 0}b`)
  console.log('URL:', url.slice(0, 100))
  console.log('Result:', JSON.stringify(result).slice(0, 400))
}

await br.close()
