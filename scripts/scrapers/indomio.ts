/**
 * Scraper para Indomio.es
 * - Extrae pisos de agencias (alquiler y venta)
 * - Usa Playwright + Stealth para bypass anti-bot
 * - Compatible con cron job de rotación de ciudades
 * 
 * Uso: npx tsx scripts/scrapers/indomio.ts [operation] [city] [maxListings]
 *   operation: venta | alquiler (default: venta)
 *   city: madrid | barcelona | valencia | sevilla | zaragoza | bilbao | malaga (default: madrid)
 *   maxListings: número máximo de pisos a scrapear (default: 5)
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
  bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'bilbao' },
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
  
  console.log(`\n🏠 Scrapeando Indomio - ${cityData.city} (${operation})`)
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
    // Primero navegar a la home para investigar la estructura
    console.log(`\n🔗 Investigando estructura de Indomio...`)
    await page.goto('https://www.indomio.es/', { waitUntil: 'networkidle', timeout: 30000 })
    await sleep(2000)
    
    // Buscar enlaces de "Casas en venta" o similares
    const searchLinks = await page.$$eval('a', (links) =>
      links
        .filter((a) => {
          const text = a.textContent?.toLowerCase() || ''
          const href = (a as HTMLAnchorElement).href
          return (
            (text.includes('venta') || text.includes('alquiler') || text.includes('buscar')) &&
            href.length > 20
          )
        })
        .map((a) => ({
          text: a.textContent?.trim(),
          href: (a as HTMLAnchorElement).href,
        }))
    )
    
    console.log(`📋 Enlaces de búsqueda encontrados:`)
    searchLinks.slice(0, 10).forEach((link) => console.log(`   - ${link.text}: ${link.href}`))
    
    // Intentar URLs alternativas basadas en el ejemplo del usuario
    const testUrls = [
      `https://www.indomio.es/venta/pisos-${cityData.slug}`,
      `https://www.indomio.es/venta/pisos/${cityData.slug}`,
      `https://www.indomio.es/inmuebles/${cityData.slug}/venta`,
      `https://www.indomio.es/buscar?operation=venta&city=${cityData.slug}`,
      `https://www.indomio.es/buscar?q=${cityData.slug}&op=venta`,
    ]
    
    let workingUrl: string | null = null
    for (const testUrl of testUrls) {
      console.log(`\n🧪 Probando: ${testUrl}`)
      const response = await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await sleep(1500)
      
      const title = await page.title()
      const status = response?.status() || 0
      console.log(`   Status: ${status}, Título: ${title}`)
      
      if (status === 200 && !title.includes('404')) {
        // Buscar anuncios en esta URL
        const anuncios = await page.$$eval('a', (links) =>
          links.filter((a) => (a as HTMLAnchorElement).href.includes('/anuncios/'))
        )
        
        if (anuncios.length > 0) {
          workingUrl = testUrl
          console.log(`   ✅ ¡Encontrados ${anuncios.length} anuncios!`)
          break
        }
      }
    }
    
    if (!workingUrl) {
      console.error(`❌ No se pudo encontrar una URL válida de listados para ${cityData.city}`)
      return
    }
    
    const url = workingUrl
    
    console.log(`\n🔗 Navegando a: ${url}`)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await sleep(3000)
    
    // Scroll para activar lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await sleep(2000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(1000)
    
    // Screenshot para debugging
    await page.screenshot({ path: 'logs/indomio-debug.png', fullPage: false })
    console.log(`📸 Screenshot guardado en logs/indomio-debug.png`)
    
    // Debug: guardar HTML
    const html = await page.content()
    const hasAnuncios = html.includes('/anuncios/')
    console.log(`📊 HTML contiene "/anuncios/": ${hasAnuncios}`)
    console.log(`📊 Longitud del HTML: ${html.length} caracteres`)
    
    // Verificar si es una página de error
    const pageTitle = await page.title()
    console.log(`📄 Título de la página: ${pageTitle}`)
    
    // Intentar diferentes selectores
    const selectors = [
      'a[href*="/anuncios/"]',
      'a[href*="/comprar/"]',
      'a.property-card',
      'a.listing-link',
      '[data-testid*="listing"]',
      'article a',
      '.property a',
      '.listing a',
    ]
    
    let listingUrls: string[] = []
    for (const selector of selectors) {
      try {
        const urls = await page.$$eval(selector, (links) =>
          Array.from(new Set(
            links.map((a) => (a as HTMLAnchorElement).href)
          ))
        )
        if (urls.length > 0) {
          console.log(`✅ Selector "${selector}" encontró ${urls.length} enlaces`)
          // Filtrar solo URLs de anuncios
          listingUrls = urls.filter((href) => /\/anuncios\/\d+\//.test(href))
          if (listingUrls.length > 0) break
        }
      } catch (e) {
        // Selector no válido, continuar
      }
    }
    
    // Si aún no hay URLs, extraer todas las que contengan "/anuncios/"
    if (listingUrls.length === 0) {
      const allLinks = await page.$$eval('a', (links) =>
        links.map((a) => (a as HTMLAnchorElement).href)
      )
      listingUrls = Array.from(new Set(
        allLinks.filter((href) => /\/anuncios\/\d+\//.test(href))
      ))
      console.log(`📋 Extracción de todos los <a>: ${listingUrls.length} anuncios`)
      
      // Debug: mostrar algunos enlaces encontrados
      if (allLinks.length > 0) {
        console.log(`📋 Primeros 10 enlaces encontrados:`)
        allLinks.slice(0, 10).forEach(link => console.log(`   - ${link}`))
      }
    }
    
    console.log(`📋 Encontrados ${listingUrls.length} anuncios`)
    
    const urlsToProcess = listingUrls.slice(0, maxListings)
    
    for (const listingUrl of urlsToProcess) {
      await sleep(DELAY_MS)
      
      const externalId = `indomio-${listingUrl.match(/\/anuncios\/(\d+)\//)?.[1]}`
      console.log(`\n🔍 Scrapeando: ${externalId}`)
      console.log(`   ${listingUrl}`)
      
      try {
        await page.goto(listingUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
        await sleep(1500)
        
        const data = await page.evaluate(() => {
          // Título
          const titleEl = document.querySelector('h1')
          const title = titleEl?.textContent?.trim() || null
          
          // Precio
          let price: number | null = null
          const priceText = document.body.innerHTML.match(/([\d.]+)\s*€/)
          if (priceText) {
            price = parseInt(priceText[1].replace(/\./g, ''), 10)
          }
          
          // Superficie
          let area: number | null = null
          const areaMatch = document.body.textContent?.match(/(\d+)\s*m[²2]/)
          if (areaMatch) {
            area = parseInt(areaMatch[1], 10)
          }
          
          // Habitaciones
          let bedrooms: number | null = null
          const bedMatch = document.body.textContent?.match(/(\d+)\s*(?:habitaci|dormitori|hab\b)/)
          if (bedMatch) {
            bedrooms = parseInt(bedMatch[1], 10)
          }
          
          // Baños
          let bathrooms: number | null = null
          const bathMatch = document.body.textContent?.match(/(\d+)\s*ba[ñn]os?/)
          if (bathMatch) {
            bathrooms = parseInt(bathMatch[1], 10)
          }
          
          // Descripción
          const descEl = document.querySelector('[class*="description"]') || document.querySelector('[class*="Description"]')
          const description = descEl?.textContent?.trim().slice(0, 2000) || null
          
          // Imágenes
          const images = Array.from(document.querySelectorAll('img[src*="indomio"]'))
            .map((img) => (img as HTMLImageElement).src)
            .filter((src) => /\.(jpg|jpeg|png|webp)/i.test(src))
            .slice(0, 20)
          
          return { title, price, area, bedrooms, bathrooms, description, images }
        })
        
        if (!data.title || !data.price) {
          console.warn(`   ⚠️ Datos incompletos`)
          continue
        }
        
        const scrapedListing: ScrapedListing = {
          external_id: externalId,
          portal: 'indomio',
          url: listingUrl,
          title: data.title,
          description: data.description,
          operation,
          price_eur: data.price,
          area_m2: data.area,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          city: cityData.city,
          province: cityData.province,
          district: null,
          address: null,
          lat: null,
          lng: null,
          floor: null,
          property_type: 'piso',
          energy_cert: null,
          is_particular: false,
          agency_name: null,
          photos: data.images,
        }
        
        totalScraped++
        const result = await upsertListing(scrapedListing)
        
        if (result === 'inserted') {
          totalInserted++
          console.log(`   ✅ Insertado`)
        } else if (result === 'updated') {
          totalUpdated++
          console.log(`   🔄 Actualizado`)
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
  const maxListings = parseInt(args[2] || '5', 10)
  
  await scrapeCity(operation, city, maxListings)
}

main().catch(console.error)
