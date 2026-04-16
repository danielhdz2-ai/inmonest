import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin())
const br = await chromium.launch({ headless: true })
const ctx = await br.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', locale:'es-ES' })
const pg = await ctx.newPage()
await pg.goto('https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?advertiserType=3', { waitUntil:'load', timeout:35000 })
await new Promise(r=>setTimeout(r,2000))
const res = await pg.evaluate(() => {
  const arts = [...document.querySelectorAll('article')]
  return arts.slice(2,10).map(a => {
    const text = a.innerText ?? ''
    const link = [...a.querySelectorAll('a')].map(x=>x.href).find(h=>h.includes('/vivienda/'))  ?? a.querySelector('a')?.href ?? ''
    const euros = text.match(/[\d.,]{3,10}\s*€/)
    return { text: text.replace(/\s+/g,' ').slice(0,600), euros: euros?.[0], link: link.slice(0,150) }
  })
})
for(const r of res) { console.log(JSON.stringify(r,null,2)); console.log('---') }
await br.close()
