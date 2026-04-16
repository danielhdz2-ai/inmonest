import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())
const b = await chromium.launch({ headless: true })
const ctx = await b.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' })
const p = await ctx.newPage()
await p.goto('https://www.habitaclia.com/viviendas-particulares-madrid.htm', { waitUntil: 'domcontentloaded', timeout: 25000 })
const html = await p.content()
const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1].trim())
console.log('JSON-LD blocks:', blocks.length)
for (const b2 of blocks) {
  try {
    const obj = JSON.parse(b2)
    const url = obj.url ?? obj['@id'] ?? obj['@graph']?.[0]?.url ?? ''
    if (url) console.log('  JSON-LD url:', url.slice(0, 100))
  } catch {}
}
const ids = [...new Set([...html.matchAll(/href="(https?:\/\/www\.habitaclia\.com\/(?:comprar|alquiler)-[^"]*-i\d{8,}\.htm)/gi)].map(m=>m[1]))].slice(0,6)
console.log('IDs pattern count:', ids.length)
ids.forEach(u => console.log(' ', u.slice(0, 100)))
await b.close()
