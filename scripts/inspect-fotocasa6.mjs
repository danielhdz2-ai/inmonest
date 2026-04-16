/**
 * Inspector final: acepta GDPR, espera hydrate completo y captura artículos filtrados
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())

const URL = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?advertiserType=3'

const br = await chromium.launch({ headless: true })
const ctx = await br.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})

// Capturar TODAS las llamadas JSON de web.gw.fotocasa.es
const apiCalls = []
ctx.on('response', async (res) => {
  const url = res.url()
  if (!url.includes('gw.fotocasa.es')) return
  const ct = res.headers()['content-type'] ?? ''
  if (!ct.includes('json')) return
  try {
    const body = await res.text()
    if (body.length > 200) apiCalls.push({ url, len: body.length, snippet: body.slice(0, 600) })
  } catch {}
})

const pg = await br.newPage()
console.log('Navegando...')
await pg.goto(URL, { waitUntil: 'load', timeout: 40_000 })

// ── Aceptar GDPR (Didomi) ─────────────────────────────────────────────────────
try {
  const gdprBtn = await pg.waitForSelector(
    '#didomi-notice-agree-button, .didomi-notice-agree-button, button[data-testid*="agree"], button[id*="agree"]',
    { timeout: 5000 }
  )
  if (gdprBtn) {
    await gdprBtn.click()
    console.log('✅ GDPR aceptado')
    await new Promise(r => setTimeout(r, 2000))
  }
} catch {
  console.log('ℹ️  Sin banner GDPR visible')
}

// ── Esperar a que las tarjetas se hidraten ────────────────────────────────────
console.log('Esperando hydrate...')
let hydrated = false
for (let i = 0; i < 12; i++) {
  await new Promise(r => setTimeout(r, 1500))
  const count = await pg.evaluate(() => {
    const arts = [...document.querySelectorAll('article')]
    return arts.filter(a => a.innerText && !a.innerText.includes('\u200c')).length
  })
  console.log(`  [${i+1}] artículos reales: ${count}`)
  if (count >= 3) { hydrated = true; break }
}

// ── Extraer artículos ─────────────────────────────────────────────────────────
const articles = await pg.evaluate(() => {
  const arts = [...document.querySelectorAll('article')]
    .filter(a => a.innerText && !a.innerText.includes('\u200c') && a.innerText.trim().length > 20)
  return arts.slice(0, 8).map(a => {
    const text = (a.innerText ?? '').replace(/\s+/g, ' ')
    const link = [...a.querySelectorAll('a')].map(x=>x.href).find(h=>h.includes('/vivienda/')) ?? ''
    const euros = text.match(/[\d.,]{3,10}\s*€/)?.[0]
    return { text: text.slice(0, 500), euros, link: link.slice(0, 150) }
  })
})

console.log(`\nHydrated: ${hydrated} | Real articles: ${articles.length}`)
for (const [i, a] of articles.entries()) {
  console.log(`\n── Art.${i+1} ──`)
  console.log('  euros:', a.euros)
  console.log('  link:', a.link)
  console.log('  text:', a.text.slice(0, 300))
}

console.log(`\n══ API CALLS (${apiCalls.length}) ══`)
for (const c of apiCalls) {
  console.log(`  [${c.len}b] ${c.url}`)
  console.log('  snippet:', c.snippet.slice(0, 300))
}

await br.close()
