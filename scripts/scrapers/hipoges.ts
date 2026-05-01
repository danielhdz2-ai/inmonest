/**
 * Scraper para Hipoges.com - Portal Inmobiliario
 * - Extrae pisos de subastas/ventas bancarias
 * - Usa Playwright + Stealth para bypass anti-bot
 * - Compatible con cron job de rotación de ciudades
 * 
 * Uso: npx tsx scripts/scrapers/hipoges.ts [operation] [city] [maxListings]
 *   operation: venta (default: venta)
 *   city: madrid | barcelona | valencia | sevilla | zaragoza | bilbao | malaga (default: madrid)
 *   maxListings: número máximo de pisos a scrapear (default: 10)
 */

import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { upsertListing, type ScrapedListing } from './utils'

chromium.use(StealthPlugin())

const CITY_MAP: Record<string, { province: string; city: string; slug: string }> = {
  madrid:    { province: 'Madrid',    city: 'Madrid',    slug: 'madrid' },
  barcelona: { province: 'Barcelona', city: 'Barcelona', slug: 'barcelona' },
  valencia:  { province: 'Valencia',  city: 'Valencia',  slug: 'valencia' },
  sevilla:   { province: 'Sevilla',   city: 'Sevilla',   slug: 'sevilla' },
  zaragoza:  { province: 'Zaragoza',  city: 'Zaragoza',  slug: 'zaragoza' },
  bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'vizcaya' },
  malaga:    { province: 'Málaga',    city: 'Málaga',    slug: 'malaga' },
}

const DELAY_MS = 2000

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function scrapeCity(operation: 'venta' | 'alquiler', cityKey: string, maxListings: number) {
  const cityData = CITY_MAP[cityKey]
  if (!cityData) {
    console.error(`❌ Ciudad no soportada: ${cityKey}`)
    return
  }
  
  console.log(`\n🏦 Scrapeando Hipoges - ${cityData.city} (${operation})`)
  console.log(`📋 Pisos a scrapear: ${maxListings}`)
  
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'es-ES',
  })
  
  const page = await context.newPage()
  
  let totalScraped = 0
  let totalInserted = 0
  let totalUpdated = 0
  
  try {
    // URL del portal inmobiliario de Hipoges
    const url = `https://realestate.hipoges.com/es/venta/pisos-y-casas/espana/${cityData.slug}`
    
    console.log(`\n🔗 Navegando a: ${url}`)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await sleep(3000)
    
    // Aceptar cookies si aparece
    try {
      const cookieBtn = page.locator('button:has-text("Permitir todas")')
      if (await cookieBtn.count() > 0) {
        await cookieBtn.first().click()
        await sleep(1500)
      }
    } catch (e) {
      // No hay banner de cookies
    }
    
    // Esperar a que las tarjetas de propiedades se carguen
    console.log(`⏳ Esperando carga de propiedades...`)
    await page.waitForSelector('img[alt*="Piso"]', { timeout: 10000 }).catch(() => {
      console.log(`⚠️ No se encontró el selector de imágenes de pisos`)
    })
    await sleep(2000)
    
    // Scroll para cargar lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await sleep(2000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(1500)
    
    // Screenshot
    await page.screenshot({ path: 'logs/hipoges-listings.png', fullPage: true })
    console.log(`📸 Screenshot guardado en logs/hipoges-listings.png`)
    
    // Extraer tarjetas de propiedades - buscar elementos que contengan precios en EUR
    const propertyCards = await page.evaluate(() => {
      // Buscar todos los elementos que contengan un precio
      const allElements = Array.from(document.querySelectorAll('*'))
      const cardsWithPrice = allElements.filter((el) => {
        const text = el.textContent || ''
        return /\d+\.\d{3}\s*€/.test(text) && text.length < 500 // Filtrar textos largos
      })
      
      return cardsWithPrice.map((card) => {
        const text = card.textContent || ''
        
        // Extraer precio
        const priceMatch = text.match(/([\d.]+)\s*€/)
        const price = priceMatch ? parseInt(priceMatch[1].replace(/\./g, ''), 10) : null
        
        // Extraer m²
        const areaMatch = text.match(/(\d+)\s*m/)
        const area = areaMatch ? parseInt(areaMatch[1], 10) : null
        
        // Extraer habitaciones
        const bedMatch = text.match(/(\d+)\s*hab/)
        const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : null
        
        // Buscar título (texto antes del precio)
        const titleMatch = text.match(/([^\n]+?)\s+\d+\s*m/)
        const title = titleMatch ? titleMatch[1].trim() : text.split('\n')[0]?.trim() || ''
        
        // Buscar ubicación (después del título)
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        const location = lines[1] || ''
        
        // Buscar imagen dentro de la tarjeta
        const img = card.querySelector('img')
        const imgSrc = img ? (img.getAttribute('src') || img.getAttribute('data-src') || '') : ''
        
        // Buscar enlace
        const link = card.querySelector('a') || card.closest('a')
        const href = link ? (link as HTMLAnchorElement).href : null
        
        return {
          title: title.replace(/[\n\r]+/g, ' ').replace(/\.cls-.*?}/g, '').trim().slice(0, 200),
          location,
          price,
          area,
          bedrooms,
          imgSrc,
          href,
          text: text.slice(0, 300),
          hasValidData: title.length > 3 && price !== null && price > 10000
        }
      }).filter(card => card.hasValidData)
    })
    
    console.log(`📋 Encontradas ${propertyCards.length} tarjetas con precio válido`)
    
    if (propertyCards.length === 0) {
      console.error(`❌ No se encontraron propiedades con precio`)
      console.log(`💡 Revisa el screenshot en logs/hipoges-listings.png`)
      return
    }
    
    // Debug: mostrar primeras tarjetas
    console.log(`📋 Primeras 3 tarjetas:`)
    propertyCards.slice(0, 3).forEach((card, i) => {
      console.log(`   ${i + 1}. ${card.title} - ${card.price}€ - ${card.area}m² - ${card.bedrooms}hab`)
    })
    
    const cardsToProcess = propertyCards.slice(0, maxListings)
    
    for (const [index, card] of cardsToProcess.entries()) {
      await sleep(DELAY_MS)
      
      const externalId = `hipoges-${Date.now()}-${index}`
      console.log(`\n🔍 Scrapeando ${index + 1}/${cardsToProcess.length}:`)
      console.log(`   ${card.title}`)
      console.log(`   ${card.price}€ - ${card.area}m² - ${card.bedrooms}hab`)
      
      // Todos los datos están en la tarjeta, no necesitamos navegar
      const scrapedListing: ScrapedListing = {
        source_external_id: externalId,
        source_portal: 'hipoges',
        source_url: card.href || url,
        title: card.title,
        description: undefined,
        operation: 'sale',
        price_eur: card.price || undefined,
        area_m2: card.area || undefined,
        bedrooms: card.bedrooms || undefined,
        bathrooms: undefined,
        city: cityData.city,
        province: cityData.province,
        district: undefined,
        lat: undefined,
        lng: undefined,
        is_particular: false,
        advertiser_name: 'Hipoges',
        images: card.imgSrc ? [card.imgSrc] : [],
      }
      
      try {
        totalScraped++
        const result = await upsertListing(scrapedListing)
        
        if (result) {
          totalInserted++
          console.log(`   ✅ Insertado/Actualizado`)
        } else {
          console.log(`   ⏭️  Omitido`)
        }
      } catch (err) {
        console.error(`   ❌ Error: ${err}`)
      }
    }
  } finally {
    await browser.close()
  }
  
  console.log(`\n✨ Resumen:`)
  console.log(`   Total scrapeados: ${totalScraped}`)
  console.log(`   Insertados: ${totalInserted}`)
  console.log(`   Actualizados: ${totalUpdated}`)
}

async function main() {
  const args = process.argv.slice(2)
  const operation = (args[0] as 'venta' | 'alquiler') || 'venta'
  const city = args[1] || 'madrid'
  const maxListings = parseInt(args[2] || '10', 10)
  
  await scrapeCity(operation, city, maxListings)
}

main().catch(console.error)