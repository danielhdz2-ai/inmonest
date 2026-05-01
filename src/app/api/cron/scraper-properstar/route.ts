/**
 * /api/cron/scraper-properstar
 *
 * Cron job que ejecuta el scraper de Properstar.es
 * Properstar es un agregador masivo con 7,734+ anuncios (solo Barcelona)
 * Alterna entre ciudades españolas
 *
 * Seguridad: solo acepta llamadas con CRON_SECRET
 */

import { NextRequest, NextResponse } from 'next/server'

const CITIES = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao', 'zaragoza']
const MAX_LISTINGS = 2 // DESACTIVADO - Calidad insuficiente

const CITY_MAP: Record<string, { province: string; city: string; slug: string }> = {
  madrid:    { province: 'Madrid',    city: 'Madrid',    slug: 'madrid' },
  barcelona: { province: 'Barcelona', city: 'Barcelona', slug: 'barcelona' },
  valencia:  { province: 'Valencia',  city: 'Valencia',  slug: 'valencia' },
  sevilla:   { province: 'Sevilla',   city: 'Sevilla',   slug: 'sevilla' },
  zaragoza:  { province: 'Zaragoza',  city: 'Zaragoza',  slug: 'zaragoza' },
  bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'bilbao' },
  malaga:    { province: 'Málaga',    city: 'Málaga',    slug: 'malaga' },
}

async function runProperstarScraper(city: string, maxListings: number) {
  const { upsertListing } = await import('../../../../../scripts/scrapers/utils')
  const { chromium } = await import('playwright-extra')
  const StealthPlugin = (await import('puppeteer-extra-plugin-stealth')).default
  
  // @ts-ignore - puppeteer-extra-plugin-stealth types
  chromium.use(StealthPlugin())

  const cityData = CITY_MAP[city]
  if (!cityData) {
    throw new Error(`Ciudad no soportada: ${city}`)
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'es-ES',
  })

  const page = await context.newPage()

  let totalScraped = 0
  let totalInserted = 0
  let totalUpdated = 0

  try {
    const url = `https://www.properstar.es/espana/${cityData.slug}/comprar/piso`

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(3000)

    // Aceptar cookies
    try {
      const cookieBtn = page.locator('button:has-text("Acepto"), button:has-text("Aceptar")')
      if (await cookieBtn.count() > 0) {
        await cookieBtn.first().click()
        await page.waitForTimeout(1500)
      }
    } catch (e) {
      // No cookies
    }

    // Scroll para cargar lazy images
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1500)

    // Extraer propiedades
    const propertyCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('article, [data-testid*="listing"], [class*="property"], a[href*="/vivienda/"]'))
        .filter((card) => {
          const text = card.textContent || ''
          return /\d+[\.,]?\d*\s*€/.test(text)
        })

      return cards.map((card) => {
        const text = card.textContent || ''

        let href = ''
        if (card.tagName === 'A') {
          href = (card as HTMLAnchorElement).href
        } else {
          const link = card.querySelector('a[href*="/vivienda/"]')
          href = link ? (link as HTMLAnchorElement).href : ''
        }

        const priceMatch = text.match(/([\d.,]+)\s*€/)
        let price: number | null = null
        if (priceMatch) {
          const priceStr = priceMatch[1].replace(/\./g, '').replace(',', '.')
          price = parseFloat(priceStr)
        }

        const areaMatch = text.match(/(\d+)\s*m[²2]/)
        const area = areaMatch ? parseInt(areaMatch[1], 10) : null

        const bedMatch = text.match(/(\d+)\s*(?:habitaci[oó]n|dormitorio|hab\b)/i)
        const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : null

        const bathMatch = text.match(/(\d+)\s*ba[ñn]os?/i)
        const bathrooms = bathMatch ? parseInt(bathMatch[1], 10) : null

        let title = ''
        const titleEl = card.querySelector('h2, h3, h4, [class*="title"]')
        if (titleEl) {
          title = titleEl.textContent?.trim() || ''
        } else {
          const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 10)
          title = lines[0] || ''
        }

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

    const cardsToProcess = propertyCards.slice(0, maxListings)

    for (const [index, card] of cardsToProcess.entries()) {
      const urlMatch = card.href.match(/\/vivienda\/(\d+)/)
      const externalId = urlMatch ? `properstar-${urlMatch[1]}` : `properstar-${Date.now()}-${index}`

      const isParticular = card.title.toLowerCase().includes('particular') ||
                          card.text.toLowerCase().includes('particular')

      const scrapedListing = {
        source_external_id: externalId,
        source_portal: 'properstar',
        source_url: card.href,
        title: card.title,
        description: undefined,
        operation: 'sale' as const,
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
        advertiser_name: undefined,
        images: card.imgSrc ? [card.imgSrc] : [],
      }

      totalScraped++
      const result = await upsertListing(scrapedListing)

      if (result) totalInserted++

      await page.waitForTimeout(1000)
    }
  } finally {
    await browser.close()
  }

  return { scraped: totalScraped, inserted: totalInserted, updated: totalUpdated }
}

export async function GET(req: NextRequest) {
  // Auth: CRON_SECRET
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Rotación de ciudades
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
  const cityIndex = dayOfYear % CITIES.length
  const city = CITIES[cityIndex]

  console.log(`[cron/scraper-properstar] Ejecutando: ${city}`)

  try {
    const result = await runProperstarScraper(city, MAX_LISTINGS)

    console.log(`[cron/scraper-properstar] ✅ Scrapeados: ${result.scraped}, Insertados: ${result.inserted}, Actualizados: ${result.updated}`)

    return NextResponse.json({
      ok: true,
      city,
      ...result,
    })
  } catch (error) {
    console.error('[cron/scraper-properstar] Error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
