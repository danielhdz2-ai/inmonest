import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

chromium.use(StealthPlugin())

const browser = await chromium.launch({ headless: false })
const context = await browser.newContext()
const page = await context.newPage()

await page.goto('https://realestate.hipoges.com/es/venta/pisos-y-casas/espana/madrid')
await page.waitForTimeout(3000)

// Aceptar cookies
try {
  await page.locator('button:has-text("Permitir")').first().click()
  await page.waitForTimeout(1500)
} catch (e) {}

await page.waitForTimeout(2000)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(2000)

// Extraer HTML de las primeras 3 tarjetas que contengan precio
const cardsHTML = await page.evaluate(() => {
  const allElements = Array.from(document.querySelectorAll('*'))
  const withPrice = allElements.filter(el => {
    const text = el.textContent || ''
    return /\d+\.\d{3}\s*€/.test(text) && text.length < 500
  })
  
  // Buscar los elementos más pequeños (más específicos)
  const sorted = withPrice.sort((a, b) => {
    const aText = a.textContent?.length || 0
    const bText = b.textContent?.length || 0
    return aText - bText
  })
  
  // Tomar los primeros 5 únicos
  const unique = []
  const seen = new Set()
  
  for (const el of sorted) {
    const text = el.textContent || ''
    if (!seen.has(text) && text.length > 30) {
      unique.push({
        tag: el.tagName,
        className: el.className,
        id: el.id,
        text: text.slice(0, 200),
        html: el.outerHTML.slice(0, 500),
        hasImage: el.querySelector('img') !== null,
        hasLink: el.querySelector('a') !== null || el.tagName === 'A'
      })
      seen.add(text)
      
      if (unique.length >= 5) break
    }
  }
  
  return unique
})

console.log('\n📋 Primeras 5 tarjetas con precio:\n')
cardsHTML.forEach((card, i) => {
  console.log(`\n━━━ Tarjeta ${i + 1} ━━━`)
  console.log(`Tag: <${card.tag}> | Clase: "${card.className}"`)
  console.log(`Tiene imagen: ${card.hasImage} | Tiene link: ${card.hasLink}`)
  console.log(`Texto: ${card.text}`)
  console.log(`HTML: ${card.html}`)
})

console.log('\n\n🔍 Esperando 10 segundos para revisar...')
await page.waitForTimeout(10000)

await browser.close()
