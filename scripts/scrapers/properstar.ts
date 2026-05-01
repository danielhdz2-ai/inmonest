/**
 * Scraper de Properstar.es
 * 
 * Properstar es un agregador internacional con volumen masivo de anuncios.
 * 7,734+ pisos solo en Barcelona, mix de particulares y agencias.
 * 
 * Ejecutar con:
 * npx tsx scripts/scrapers/properstar.ts venta madrid 10
 */

import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { ScrapedListing, upsertListing } from './utils'

// @ts-ignore - puppeteer-extra-plugin-stealth types
chromium.use(StealthPlugin())

const DELAY_MS = 2000

const CITY_MAP: Record<string, { province: string; city: string; slug: string }> = {
  madrid:    { province: 'Madrid',    city: 'Madrid',    slug: 'madrid' },
  barcelona: { province: 'Barcelona', city: 'Barcelona', slug: 'barcelona' },
  valencia:  { province: 'Valencia',  city: 'Valencia',  slug: 'valencia' },
  sevilla:   { province: 'Sevilla',   city: 'Sevilla',   slug: 'sevilla' },
  zaragoza:  { province: 'Zaragoza',  city: 'Zaragoza',  slug: 'zaragoza' },
  bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'bilbao' },
  malaga:    { province: 'Málaga',    city: 'Málaga',    slug: 'malaga' },
}

type Operation = 'venta' | 'alquiler'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrapeCity(
  operation: Operation,
  city: string,
  maxListings: number
) {
  const cityData = CITY_MAP[city.toLowerCase()]
  if (!cityData) {
    throw new Error(`Ciudad no soportada: ${city}`)
  }

  console.log(`\n🏘️  Scrapeando Properstar - ${cityData.city} (${operation})`)
  console.log(`📋 Pisos a scrapear: ${maxListings}`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'es-ES',
  })

  const page = await context.newPage()

  let totalScraped = 0
  let totalInserted = 0
  let totalUpdated = 0

  try {
    // URL: comprar = venta, alquiler = alquiler
    const operationType = operation === 'venta' ? 'comprar' : 'alquiler'
    const url = `https://www.properstar.es/espana/${cityData.slug}/${operationType}/piso`

    console.log(`\n🔗 Navegando a: ${url}`)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await sleep(3000)

    // Aceptar cookies
    try {
      const cookieBtn = page.locator('button:has-text("Acepto"), button:has-text("Aceptar")')
      if (await cookieBtn.count() > 0) {
        await cookieBtn.first().click()
        await sleep(1500)
      }
    } catch (e) {
      console.log(`⚠️  No se encontraron cookies`)
    }

    console.log(`⏳ Esperando carga de propiedades...`)
    await sleep(2000)

    // Scroll para activar lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await sleep(2000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await sleep(1500)

    // Screenshot
    await page.screenshot({ path: 'logs/properstar-listings.png', fullPage: true })
    console.log(`📸 Screenshot guardado en logs/properstar-listings.png`)

    // Extraer anuncios - Properstar usa una estructura de cards
    const propertyCards = await page.evaluate(() => {
      // Buscar todas las tarjetas de propiedades
      const cards = Array.from(document.querySelectorAll('article, [data-testid*="listing"], [class*="property"], a[href*="/vivienda/"]'))
        .filter((card) => {
          const text = card.textContent || ''
          // Filtrar solo elementos que tengan precio en EUR
          return /\d+[\.,]?\d*\s*€/.test(text)
        })

      return cards.map((card) => {
        const text = card.textContent || ''

        // Extraer enlace
        let href = ''
        if (card.tagName === 'A') {
          href = (card as HTMLAnchorElement).href
        } else {
          const link = card.querySelector('a[href*="/vivienda/"]')
          href = link ? (link as HTMLAnchorElement).href : ''
        }

        // Extraer precio - puede ser "120.000 €" o "120000 €"
        const priceMatch = text.match(/([\d.,]+)\s*€/)
        let price: number | null = null
        if (priceMatch) {
          const priceStr = priceMatch[1].replace(/\./g, '').replace(',', '.')
          price = parseFloat(priceStr)
        }

        // Extraer área en m²
        const areaMatch = text.match(/(\d+)\s*m[²2]/)
        const area = areaMatch ? parseInt(areaMatch[1], 10) : null

        // Extraer habitaciones - puede ser "3 habitaciónes" o "3 dormitorios"
        const bedMatch = text.match(/(\d+)\s*(?:habitaci[oó]n|dormitorio|hab\b)/i)
        const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : null

        // Extraer baños
        const bathMatch = text.match(/(\d+)\s*ba[ñn]os?/i)
        const bathrooms = bathMatch ? parseInt(bathMatch[1], 10) : null

        // Extraer título - buscar headings o primer texto relevante
        let title = ''
        const titleEl = card.querySelector('h2, h3, h4, [class*="title"]')
        if (titleEl) {
          title = titleEl.textContent?.trim() || ''
        } else {
          // Fallback: primera línea no vacía
          const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 10)
          title = lines[0] || ''
        }

        // Extraer imagen
        const img = card.querySelector('img')
        const imgSrc = img ? (img.getAttribute('src') || img.getAttribute('data-src') || '') : ''

        return {
          href,
          title: title.replace(/[\n\r]+/g, ' ').trim().slice(0, 200),
          price,
          area,
          bedrooms,
          bathrooms,
          imgSrc,
          text: text.slice(0, 300),
          hasValidData: href.length > 0 && price !== null && price > 1000
        }
      }).filter(card => card.hasValidData)
    })

    console.log(`📋 Encontradas ${propertyCards.length} propiedades`)

    if (propertyCards.length === 0) {
      console.error(`❌ No se encontraron propiedades`)
      console.log(`💡 Revisa el screenshot en logs/properstar-listings.png`)
      return
    }

    // Debug: mostrar primeras
    console.log(`📋 Primeras 3 propiedades:`)
    propertyCards.slice(0, 3).forEach((card, i) => {
      console.log(`   ${i + 1}. ${card.title}`)
      console.log(`      ${card.price}€ - ${card.area}m² - ${card.bedrooms}hab`)
    })

    const cardsToProcess = propertyCards.slice(0, maxListings)

    for (const [index, card] of cardsToProcess.entries()) {
      await sleep(DELAY_MS)

      // Generar external_id del URL
      const urlMatch = card.href.match(/\/vivienda\/(\d+)/)
      const externalId = urlMatch ? `properstar-${urlMatch[1]}` : `properstar-${Date.now()}-${index}`

      console.log(`\n🔍 Scrapeando ${index + 1}/${cardsToProcess.length}:`)
      console.log(`   ${card.title}`)
      console.log(`   ${card.price}€ - ${card.area}m² - ${card.bedrooms}hab`)

      // Determinar si es particular - Properstar no siempre lo indica en listing
      // Lo detectaremos en utils.ts con looksLikeAgency()
      const isParticular = card.title.toLowerCase().includes('particular') ||
                          card.text.toLowerCase().includes('particular')

      const scrapedListing: ScrapedListing = {
        source_external_id: externalId,
        source_portal: 'properstar',
        source_url: card.href,
        title: card.title,
        description: undefined,
        operation: operation === 'venta' ? 'sale' : 'rent',
        price_eur: card.price || undefined,
        area_m2: card.area || undefined,
        bedrooms: card.bedrooms || undefined,
        bathrooms: card.bathrooms || undefined,
        city: cityData.city,
        province: cityData.province,
        district: undefined,
        lat: undefined,
        lng: undefined,
        is_particular: isParticular,
        advertiser_name: undefined, // Se extraerá de la página de detalle si navegamos
        images: card.imgSrc ? [card.imgSrc] : [],
      }

      try {
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

  return { scraped: totalScraped, inserted: totalInserted, updated: totalUpdated }
}

// ── CLI ─────────────────────────────────────────────────────────────────────

async function main() {
  const [operationArg, cityArg, maxArg] = process.argv.slice(2)

  if (!operationArg || !cityArg) {
    console.error('Uso: npx tsx scripts/scrapers/properstar.ts <venta|alquiler> <ciudad> [max]')
    console.error('Ejemplo: npx tsx scripts/scrapers/properstar.ts venta madrid 10')
    console.error('Ciudades: madrid, barcelona, valencia, sevilla, malaga, bilbao, zaragoza')
    process.exit(1)
  }

  const operation = operationArg.toLowerCase() as Operation
  if (operation !== 'venta' && operation !== 'alquiler') {
    console.error('Operación debe ser "venta" o "alquiler"')
    process.exit(1)
  }

  const city = cityArg.toLowerCase()
  const maxListings = maxArg ? parseInt(maxArg, 10) : 10

  await scrapeCity(operation, city, maxListings)
}

main().catch(console.error)
