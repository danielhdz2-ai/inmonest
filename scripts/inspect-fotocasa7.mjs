/**
 * Inspector v7 — monkey-patch fetch() para capturar TODAS las llamadas API del SPA
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())

const URL_TEST = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?advertiserType=3'

const br = await chromium.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled',
    // Forzar un UA Data sin HeadlessChrome
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  ],
})

const ctx = await br.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})

// Inyectar ANTES de cargar la página — sobreescribe userAgentData y captura fetch
await ctx.addInitScript(() => {
  // 1. Ocultar HeadlessChrome de userAgentData
  if (navigator.userAgentData) {
    const origGetHigh = navigator.userAgentData.getHighEntropyValues.bind(navigator.userAgentData)
    Object.defineProperty(navigator, 'userAgentData', {
      value: {
        brands: [
          { brand: 'Google Chrome', version: '124' },
          { brand: 'Not-A.Brand', version: '99' },
          { brand: 'Chromium', version: '124' },
        ],
        mobile: false,
        platform: 'Windows',
        getHighEntropyValues: async (hints) => {
          const data = await origGetHigh(hints)
          return {
            ...data,
            brands: [
              { brand: 'Google Chrome', version: '124' },
              { brand: 'Not-A.Brand', version: '99' },
              { brand: 'Chromium', version: '124' },
            ],
            fullVersionList: [
              { brand: 'Google Chrome', version: '124.0.0.0' },
              { brand: 'Not-A.Brand', version: '99.0.0.0' },
              { brand: 'Chromium', version: '124.0.0.0' },
            ],
          }
        },
      },
      configurable: true,
      writable: false,
    })
  }

  // 2. Monkey-patch fetch para capturar todas las llamadas API
  window.__capturedFetches = []
  const origFetch = window.fetch
  window.fetch = async function(input, init) {
    const url = typeof input === 'string' ? input : input.url
    const resp = await origFetch.call(this, input, init)
    if (url.includes('fotocasa') || url.includes('gw.fotoca')) {
      try {
        const clone = resp.clone()
        const text = await clone.text()
        if (text.length > 100) {
          window.__capturedFetches.push({ url, status: resp.status, bodyLen: text.length, snippet: text.slice(0, 600) })
        }
      } catch {}
    }
    return resp
  }
})

const pg = await ctx.newPage()

// Log JS errors
pg.on('pageerror', e => console.error('JS ERROR:', e.message.slice(0,200)))

console.log('Navegando...')
await pg.goto(URL_TEST, { waitUntil: 'load', timeout: 40_000 })

// Aceptar GDPR
try {
  const btn = await pg.waitForSelector('#didomi-notice-agree-button, .didomi-notice-agree-button, button[id*="agree"]', { timeout: 5000 })
  await btn.click()
  console.log('✅ GDPR aceptado')
} catch { console.log('Sin GDPR') }

// Scroll y esperar
await pg.evaluate(() => window.scrollBy(0, 600))
await new Promise(r => setTimeout(r, 8000))

// Recuperar fetches capturados
const fetches = await pg.evaluate(() => window.__capturedFetches ?? [])
console.log(`\n══ FETCH CALLS INTERCEPTADOS (${fetches.length}) ══`)
for (const f of fetches) {
  console.log(`\n[${f.status}] ${f.bodyLen}b`)
  console.log('URL:', f.url)
  console.log('Data:', f.snippet.replace(/\s+/g, ' ').slice(0, 400))
}

// Estado de userAgentData
const uad = await pg.evaluate(() => {
  try { return JSON.stringify(navigator.userAgentData?.brands ?? 'no-uad') } catch { return 'error' }
})
console.log('\n══ userAgentData.brands:', uad)

// Artículos reales
const artCount = await pg.evaluate(() => {
  return [...document.querySelectorAll('article')]
    .filter(a => a.innerText && !a.innerText.includes('\u200c')).length
})
console.log('══ Artículos reales en DOM:', artCount)

await br.close()
