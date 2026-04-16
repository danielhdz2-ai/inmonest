/**
 * Inspector v4 — espera hydrate completo + captura API gateway
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { writeFileSync } from 'fs'

chromium.use(StealthPlugin())

const URL_TEST = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?commercial=0'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})

const apiHits = []

// Capturar CUALQUIER respuesta JSON de dominios de Fotocasa/gateway
context.on('response', async (response) => {
  const url = response.url()
  const ct  = response.headers()['content-type'] ?? ''
  if (!ct.includes('json')) return
  if (!/fotocasa|frtassets/i.test(url)) return
  if (/amazon|adtraff|prebid|relibrary/i.test(url)) return
  try {
    const body = await response.text()
    if (body.length < 200) return
    apiHits.push({ url, status: response.status(), len: body.length, body })
  } catch { /* ignore */ }
})

const page = await context.newPage()
console.log('Navegando...')
await page.goto(URL_TEST, { waitUntil: 'load', timeout: 40_000 })

// Esperar hydrate React
await page.waitForFunction(() => {
  const cards = document.querySelectorAll('[class*="re-CardPackMain"], [class*="re-Card"], article[data-testid]')
  return cards.length > 2
}, { timeout: 20_000 }).catch(() => console.log('Timeout esperando cards'))

await page.evaluate(() => window.scrollBy(0, 1000))
await new Promise(r => setTimeout(r, 3000))

console.log(`\n══ LLAMADAS API JSON (${apiHits.length}) ══`)
for (const h of apiHits) {
  console.log(`\n[${h.status}] ${h.len}b  ${h.url}`)
  console.log('  snippet:', h.body.slice(0, 500).replace(/\s+/g,' '))
  
  // Guardar las respuestas grandes (candidatos a datos de listings)
  if (h.len > 5000) {
    const fname = `logs/fc-api-${Date.now()}-${encodeURIComponent(h.url.split('/').slice(-2).join('-')).slice(0,40)}.json`
    writeFileSync(fname, h.body, 'utf-8')
    console.log(`  → Guardado: ${fname}`)
  }
}

// Último recurso: ver si hay listados en el DOM
const cardCount = await page.evaluate(() => {
  const selectors = [
    '[class*="re-CardPackMain"]',
    '[class*="re-Card"]',
    'article',
    '[data-testid*="property"]',
    '[data-testid*="card"]',
  ]
  for (const s of selectors) {
    const els = document.querySelectorAll(s)
    if (els.length > 2) return { selector: s, count: els.length }
  }
  return null
})
console.log('\n══ CARDS EN DOM:', cardCount)

// Test: ¿hay datos en window.__FOTOCASA_STATE__ o similar?
const windowKeys = await page.evaluate(() => {
  return Object.keys(window)
    .filter(k => /state|store|redux|apollo|listing|property|search|result/i.test(k))
    .map(k => {
      try {
        const v = window[k]
        const s = JSON.stringify(v)
        return `${k}: ${s?.slice(0,200)}`
      } catch {
        return `${k}: [no-serializable]`
      }
    })
})
console.log('\n══ WINDOW KEYS CON STATE:', windowKeys.join('\n'))

await browser.close()
