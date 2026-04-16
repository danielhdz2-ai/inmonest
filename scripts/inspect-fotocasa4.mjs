/**
 * Extrae la estructura HTML de los artículos de Fotocasa para diseñar el parser
 */
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { writeFileSync } from 'fs'

chromium.use(StealthPlugin())

const URL_TEST = 'https://www.fotocasa.es/es/comprar/viviendas/madrid-capital/todas-las-zonas/l?commercial=0&commercial=0'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'es-ES',
  viewport: { width: 1366, height: 768 },
})
const page = await context.newPage()
await page.goto(URL_TEST, { waitUntil: 'load', timeout: 40_000 })
await new Promise(r => setTimeout(r, 2000))

// 1. Extraer HTML de los primeros 2 artículos para diseñar el parser
const articleHtml = await page.evaluate(() => {
  const articles = document.querySelectorAll('article')
  return Array.from(articles).slice(0, 2).map(a => ({
    outerHTML: a.outerHTML.slice(0, 4000),
    attrs: [...a.attributes].map(at => `${at.name}="${at.value}"`)
  }))
})

writeFileSync('logs/fc-article-samples.json', JSON.stringify(articleHtml, null, 2))
console.log('Saved logs/fc-article-samples.json')

// 2. Extraer datos estructurados de todos los artículos
const listings = await page.evaluate(() => {
  const articles = document.querySelectorAll('article')
  return Array.from(articles).map(art => {
    const getText = sel => art.querySelector(sel)?.textContent?.trim() ?? null
    const getAttr = (sel, attr) => art.querySelector(sel)?.getAttribute(attr) ?? null
    
    // Título del anuncio
    const title = getText('[class*="re-CardTitle"]') ||
                  getText('h2') || getText('h3') ||
                  getText('[class*="Title"]')
    
    // Precio
    const priceText = getText('[class*="re-CardPrice"]') ||
                      getText('[class*="Price"]')
    const price = priceText ? parseInt(priceText.replace(/[^\d]/g,''), 10) || null : null
    
    // Enlace al detalle
    const link = getAttr('a[href*="/es/comprar/"], a[href*="/es/alquiler/"]', 'href') ||
                 getAttr('a[href*="fotocasa"]', 'href') ||
                 getAttr('a', 'href')
    
    // Imágenes
    const imgs = [...art.querySelectorAll('img[src*="fotocasa"], img[src*="static.foto"]')]
      .map(img => img.getAttribute('src') || img.getAttribute('data-src'))
      .filter(Boolean)
    // srcset también
    const srcsets = [...art.querySelectorAll('source[srcset*="fotocasa"], source[srcset*="static.foto"]')]
      .map(s => s.getAttribute('srcset')?.split(',')[0]?.split(' ')[0])
      .filter(Boolean)
    
    // Habitaciones / baños / m²
    const featureTexts = [...art.querySelectorAll('[class*="Feature"], [class*="feature"], [class*="Tag"], li')]
      .map(el => el.textContent?.trim()).filter(Boolean)
    
    // Particular badge
    const isParticular = art.innerHTML.includes('articular') || 
                         art.innerHTML.includes('Particular') ||
                         !!art.querySelector('[class*="articular"], [data-testid*="particular"]')
    
    // ID del anuncio (suele estar en un data-attr o en el href)
    const idAttr = art.getAttribute('data-id') || art.getAttribute('id') ||
                   art.getAttribute('data-element-id')
    
    // Datos de location en data-attrs
    const allAttrs = [...art.attributes].map(a => `${a.name}=${a.value.slice(0,80)}`)
    
    // JSON-LD dentro del artículo
    const jsonLd = art.querySelector('script[type="application/ld+json"]')?.textContent ?? null
    
    return { title, price, link, imgs: imgs.slice(0,3), srcsets: srcsets.slice(0,2), 
             featureTexts: featureTexts.slice(0,8), isParticular, idAttr, allAttrs, 
             jsonLd: jsonLd?.slice(0,500) }
  })
})

console.log(`\n║ ${listings.length} artículos encontrados ║\n`)
for (const [i, l] of listings.slice(0, 4).entries()) {
  console.log(`── Artículo ${i+1} ──`)
  console.log('  title      :', l.title)
  console.log('  price      :', l.price)
  console.log('  link       :', l.link?.slice(0, 100))
  console.log('  imgs       :', l.imgs)
  console.log('  srcsets    :', l.srcsets)
  console.log('  features   :', l.featureTexts)
  console.log('  particular :', l.isParticular)
  console.log('  idAttr     :', l.idAttr)
  console.log('  attrs      :', l.allAttrs.slice(0, 5))
  console.log('  jsonLd     :', l.jsonLd?.slice(0, 200))
  console.log()
}

await browser.close()
