/**
 * /api/cron/scraper-indomio
 *
 * Cron job que ejecuta el scraper de Indomio.es de forma rotativa
 * Scraper alterna entre ciudades y operaciones (venta/alquiler)
 * Se ejecuta diariamente según vercel.json
 *
 * Seguridad: solo acepta llamadas con CRON_SECRET
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CITIES = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao', 'zaragoza']
const OPERATIONS = ['venta', 'alquiler'] as const
const MAX_PAGES = 3 // Páginas a scrapear por ejecución

// Función para ejecutar el scraper de Indomio
async function runIndomioScraper(
  operation: 'venta' | 'alquiler',
  city: string,
  maxPages: number
): Promise<{ scraped: number; inserted: number; updated: number }> {
  const { upsertListing } = await import('../../../../../scripts/scrapers/utils')
  
  const UA_POOL = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  ]
  const randomUA = () => UA_POOL[Math.floor(Math.random() * UA_POOL.length)]
  
  const CITY_MAP: Record<string, { province: string; city: string; slug: string }> = {
    madrid:    { province: 'Madrid',    city: 'Madrid',    slug: 'madrid' },
    barcelona: { province: 'Barcelona', city: 'Barcelona', slug: 'barcelona' },
    valencia:  { province: 'Valencia',  city: 'Valencia',  slug: 'valencia' },
    sevilla:   { province: 'Sevilla',   city: 'Sevilla',   slug: 'sevilla' },
    malaga:    { province: 'Málaga',    city: 'Málaga',    slug: 'malaga' },
    bilbao:    { province: 'Vizcaya',   city: 'Bilbao',    slug: 'bilbao' },
    zaragoza:  { province: 'Zaragoza',  city: 'Zaragoza',  slug: 'zaragoza' },
  }
  
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  const DELAY_MS = 1500
  
  const cityData = CITY_MAP[city]
  if (!cityData) {
    throw new Error(`Ciudad no soportada: ${city}`)
  }
  
  let totalScraped = 0
  let totalInserted = 0
  let totalUpdated = 0
  
  const operationSlug = operation === 'venta' ? 'comprar' : 'alquilar'
  
  for (let page = 1; page <= maxPages; page++) {
    const url = page === 1
      ? `https://www.indomio.es/${operationSlug}/pisos-${cityData.slug}`
      : `https://www.indomio.es/${operationSlug}/pisos-${cityData.slug}/pagina-${page}`
    
    console.log(`[Indomio] Scrapeando: ${url}`)
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': randomUA(),
        Accept: 'text/html',
        'Accept-Language': 'es-ES,es;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    })
    
    if (!res.ok) {
      console.warn(`[Indomio] HTTP ${res.status} para página ${page}`)
      await sleep(DELAY_MS)
      continue
    }
    
    const html = await res.text()
    
    // Extraer URLs de anuncios
    const regex = /href="(\/anuncios\/(\d+)\/[^"]*)"/g
    const seen = new Set<string>()
    const listings: Array<{ id: string; url: string }> = []
    
    let match: RegExpExecArray | null
    while ((match = regex.exec(html))) {
      const url = match[1]
      const id = match[2]
      
      if (!seen.has(id)) {
        seen.add(id)
        listings.push({
          id: `indomio-${id}`,
          url: `https://www.indomio.es${url}`,
        })
      }
    }
    
    console.log(`[Indomio] Encontrados ${listings.length} anuncios en página ${page}`)
    
    if (listings.length === 0) break
    
    // Procesar cada listing
    for (const listing of listings.slice(0, 10)) { // Límite de 10 por página para no exceder timeout
      await sleep(DELAY_MS)
      
      const detailRes = await fetch(listing.url, {
        headers: { 'User-Agent': randomUA() },
        signal: AbortSignal.timeout(15000),
      })
      
      if (!detailRes.ok) continue
      
      const detailHtml = await detailRes.text()
      
      // Extraer datos básicos
      const titleM = detailHtml.match(/<h1[^>]*>(.*?)<\/h1>/i)
      const priceM = detailHtml.match(/([\d.]+)\s*€/i)
      const areaM = detailHtml.match(/(\d+)\s*m[²2]/i)
      const bedM = detailHtml.match(/(\d+)\s*(?:habitaci|dormitori|hab\.?)/i)
      const bathM = detailHtml.match(/(\d+)\s*ba[ñn]os?/i)
      const descM = detailHtml.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      
      const title = titleM ? titleM[1].replace(/<[^>]*>/g, '').trim() : null
      const price = priceM ? parseInt(priceM[1].replace(/\./g, ''), 10) : null
      const area = areaM ? parseInt(areaM[1], 10) : null
      const bedrooms = bedM ? parseInt(bedM[1], 10) : null
      const bathrooms = bathM ? parseInt(bathM[1], 10) : null
      const description = descM ? descM[1].replace(/<[^>]*>/g, '').trim().slice(0, 2000) : null
      
      if (!title || !price) continue
      
      // Extraer imágenes
      const images: string[] = []
      const imgRegex = /(?:src|data-src)="(https?:\/\/[^"]*(?:jpg|jpeg|png|webp)[^"]*)"/gi
      let imgMatch: RegExpExecArray | null
      const seenImgs = new Set<string>()
      
      while ((imgMatch = imgRegex.exec(detailHtml))) {
        const imgUrl = imgMatch[1]
        if (!seenImgs.has(imgUrl) && imgUrl.includes('indomio')) {
          seenImgs.add(imgUrl)
          images.push(imgUrl)
        }
      }
      
      totalScraped++
      
      const result = await upsertListing({
        source_external_id: listing.id,
        source_portal: 'indomio',
        source_url: listing.url,
        title: title || 'Sin título',
        description: description || undefined,
        operation: operation === 'venta' ? 'sale' : 'rent',
        price_eur: price || undefined,
        area_m2: area || undefined,
        bedrooms: bedrooms || undefined,
        bathrooms: bathrooms || undefined,
        city: cityData.city,
        province: cityData.province,
        district: undefined,
        lat: undefined,
        lng: undefined,
        is_particular: false,
        advertiser_name: undefined,
        images,
      })
      
      if (result) totalInserted++
    }
    
    await sleep(DELAY_MS)
  }
  
  return { scraped: totalScraped, inserted: totalInserted, updated: totalUpdated }
}

export async function GET(req: NextRequest) {
  // ── Auth: CRON_SECRET ────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  }
  
  const sb = createClient(supabaseUrl, supabaseKey)
  
  // ── Obtener configuración de rotación ────────────────────────────────────
  // Cada ejecución rota: Madrid-venta → Madrid-alquiler → Barcelona-venta → etc.
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
  
  // Rotar cada ejecución
  const totalCombinations = CITIES.length * OPERATIONS.length
  const currentIndex = dayOfYear % totalCombinations
  
  const cityIndex = Math.floor(currentIndex / OPERATIONS.length)
  const operationIndex = currentIndex % OPERATIONS.length
  
  const city = CITIES[cityIndex]
  const operation = OPERATIONS[operationIndex]
  
  console.log(`[cron/scraper-indomio] Ejecutando: ${city} - ${operation}`)
  
  try {
    const result = await runIndomioScraper(operation, city, MAX_PAGES)
    
    console.log(`[cron/scraper-indomio] ✅ Scrapeados: ${result.scraped}, Insertados: ${result.inserted}, Actualizados: ${result.updated}`)
    
    return NextResponse.json({
      ok: true,
      city,
      operation,
      ...result,
    })
  } catch (error) {
    console.error('[cron/scraper-indomio] Error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
