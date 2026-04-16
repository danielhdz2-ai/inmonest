/**
 * Test: usar Chrome del sistema en lugar de Chromium para Fotocasa
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())

const URL = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?advertiserType=3'

const br = await chromium.launch({
  channel: 'chrome',   // Google Chrome del sistema (menos detectable)
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-blink-features=AutomationControlled',
    '--disable-features=IsolateOrigins',
  ],
})

const ctx = await br.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})

// Monkey-patch fetch
await ctx.addInitScript(() => {
  window.__fc_fetches = []
  const orig = window.fetch
  window.fetch = async function(input, init) {
    const url = typeof input === 'string' ? input : input.url
    const resp = await orig.call(this, input, init)
    if (url && !url.includes('google') && !url.includes('ad') && !url.includes('track')) {
      try {
        const t = await resp.clone().text()
        if (t.length > 200) window.__fc_fetches.push({ url, status: resp.status, len: t.length, snippet: t.slice(0, 400) })
      } catch {}
    }
    return resp
  }
})

const pg = await ctx.newPage()
pg.on('pageerror', e => console.error('JSError:', e.message.slice(0, 150)))
console.log('Navegando con Chrome del sistema...')
await pg.goto(URL, { waitUntil: 'load', timeout: 40_000 })

// Aceptar GDPR
try {
  const btn = await pg.waitForSelector('#didomi-notice-agree-button', { timeout: 4000 })
  await btn.click()
  console.log('✅ GDPR aceptado')
} catch { console.log('Sin GDPR') }

await pg.evaluate(() => window.scrollBy(0, 600))
await new Promise(r => setTimeout(r, 10000))  // esperar 10s

// Recuperar fetches capturados
const fetches = await pg.evaluate(() => window.__fc_fetches ?? [])
const artCount = await pg.evaluate(() => {
  return [...document.querySelectorAll('article')]
    .filter(a => a.innerText && !a.innerText.includes('\u200c') && a.innerText.trim().length > 50).length
})

console.log(`\nArtículos reales: ${artCount}`)
console.log(`Fetches capturados: ${fetches.length}`)
for (const f of fetches) {
  console.log(`  [${f.status}] ${f.len}b  ${f.url.slice(0,100)}`)
  console.log(`  ${f.snippet.slice(0,200)}`)
}

await br.close()
