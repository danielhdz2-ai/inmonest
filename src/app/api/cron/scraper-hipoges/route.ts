/**
 * /api/cron/scraper-hipoges
 *
 * Cron job que ejecuta el scraper de Hipoges (productos bancarios)
 * Scraper alterna entre ciudades
 * Se ejecuta diariamente según vercel.json
 *
 * Seguridad: solo acepta llamadas con CRON_SECRET
 */

import { NextRequest, NextResponse } from 'next/server'
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// @ts-ignore - puppeteer-extra-plugin-stealth types
chromium.use(StealthPlugin())

const CITIES = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao', 'zaragoza']
const MAX_LISTINGS = 10 // Listings por ejecución

const CITY_MAP: Record<string, { province: string; city: string; slug: string }> = {
  madrid:    { province: 'Madrid',    city: 'Madrid',    slug: 'madrid' },
  barcelona: { province: 'Barcelona', city: 'Barcelona', slug: 'barcelona' },
  valencia:  { province: 'Valencia',  city: 'Valencia',  slug: 'valencia' },
  sevilla:   { province: 'Sevilla',   city: 'Sevilla',   slug: 'sevilla' },
  zaragoza:  { province: 'Zaragoza',  city: 'Zaragoza',  slug: 'zaragoza' },
  bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'vizcaya' },
  malaga:    { province: 'Málaga',    city: 'Málaga',    slug: 'malaga' },
}

async function runHipogesScraper(city: string, maxListings: number) {
  const { upsertListing } = await import('../../../../scripts/scrapers/utils')
  
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
    const url = `https://realestate.hipoges.com/es/venta/pisos-y-casas/espana/${cityData.slug}`
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(3000)
    
    // Aceptar cookies
    try {
      const cookieBtn = page.locator('button:has-text("Permitir todas")')
      if (await cookieBtn.count() > 0) {
        await cookieBtn.first().click()
        await page.waitForTimeout(1500)
      }
    } catch (e) {
      // No cookies
    }
    
    // Scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1500)
    
    // Extraer tarjetas con precio
    const propertyCards = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'))
      const cardsWithPrice = allElements.filter((el) => {
        const text = el.textContent || ''
        return /\d+\.\d{3}\s*€/.test(text) && text.length < 500
      })
      
      return cardsWithPrice.map((card) => {
        const text = card.textContent || ''
        
        const priceMatch = text.match(/([\d.]+)\s*€/)
        const price = priceMatch ? parseInt(priceMatch[1].replace(/\./g, ''), 10) : null
        
        const areaMatch = text.match(/(\d+)\s*m/)
        const area = areaMatch ? parseInt(areaMatch[1], 10) : null
        
        const bedMatch = text.match(/(\d+)\s*hab/)
        const bedrooms = bedMatch ? parseInt(bedMatch[1], 10) : null
        
        const titleMatch = text.match(/([^\n]+?)\s+\d+\s*m/)
        const title = titleMatch ? titleMatch[1].trim() : text.split('\n')[0]?.trim() || ''
        
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        const location = lines[1] || ''
        
        const img = card.querySelector('img')
        const imgSrc = img ? (img.getAttribute('src') || img.getAttribute('data-src') || '') : ''
        
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
          hasValidData: title.length > 3 && price !== null && price > 10000
        }
      }).filter(card => card.hasValidData)
    })
    
    const cardsToProcess = propertyCards.slice(0, maxListings)
    
    for (const [index, card] of cardsToProcess.entries()) {
      const externalId = `hipoges-${Date.now()}-${index}`
      
      const scrapedListing = {
        source_external_id: externalId,
        source_portal: 'hipoges',
        source_url: card.href || url,
        title: card.title,
        description: undefined,
        operation: 'sale' as const,
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
      
      totalScraped++
      const result = await upsertListing(scrapedListing)
      
      if (result === 'inserted') totalInserted++
      else if (result === 'updated') totalUpdated++
      
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
  
  console.log(`[cron/scraper-hipoges] Ejecutando: ${city}`)
  
  try {
    const result = await runHipogesScraper(city, MAX_LISTINGS)
    
    console.log(`[cron/scraper-hipoges] ✅ Scrapeados: ${result.scraped}, Insertados: ${result.inserted}, Actualizados: ${result.updated}`)
    
    return NextResponse.json({
      ok: true,
      city,
      ...result,
    })
  } catch (error) {
    console.error('[cron/scraper-hipoges] Error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
