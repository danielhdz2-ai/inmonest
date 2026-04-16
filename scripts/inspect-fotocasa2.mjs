/**
 * Explorar la estructura de window.__INITIAL_DATA__ de Fotocasa
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
const page = await context.newPage()
await page.goto(URL_TEST, { waitUntil: 'load', timeout: 40_000 })

// Extraer __INITIAL_DATA__ del DOM (antes de que lo parsee JS, para evitar circular refs)
const rawJson = await page.evaluate(() => {
  // @ts-ignore
  if (window.__INITIAL_DATA__) return JSON.stringify(window.__INITIAL_DATA__)
  const scripts = [...document.querySelectorAll('script')]
  for (const s of scripts) {
    const t = s.textContent ?? ''
    if (t.includes('__INITIAL_DATA__')) {
      const m = t.match(/window\.__INITIAL_DATA__\s*=\s*JSON\.parse\("(.+?)"\);?\s*$/)
      if (m) return JSON.parse('"' + m[1].replace(/^"|"$/g,'') + '"')
    }
  }
  return null
})

if (!rawJson) { console.log('No se encontró __INITIAL_DATA__'); process.exit(1) }

const data = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson

// Guardar para inspección manual
writeFileSync('logs/fotocasa-initial.json', typeof rawJson === 'string' ? rawJson : JSON.stringify(data), 'utf-8')
console.log('Guardado en logs/fotocasa-initial.json')

// Explorar árbol de primer nivel
function printKeys(obj, prefix = '', depth = 0) {
  if (depth > 4) return
  if (!obj || typeof obj !== 'object') return
  for (const [k, v] of Object.entries(obj)) {
    const type = Array.isArray(v) ? `Array(${v.length})` : typeof v
    const snippet = type === 'string' ? v.slice(0,60) : (type === 'object' && v ? `{${Object.keys(v).slice(0,5).join(',')}}` : '')
    console.log(`${'  '.repeat(depth)}${prefix}${k}: ${type} ${snippet}`)
    if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object') {
      console.log(`${'  '.repeat(depth+1)}[0]: {${Object.keys(v[0]).slice(0,8).join(',')}}`)
    } else if (typeof v === 'object' && v && depth < 3) {
      printKeys(v, '', depth + 1)
    }
  }
}

printKeys(data)

await browser.close()
