/**
 * Cron específico: Pisos.com Particulares
 * 
 * Frecuencia: Semanal (lunes 07:00 AM)
 * Consumo estimado: ~2-3 min CPU/semana
 * Optimización: Solo 2 páginas × 3 items = 6 pisos nuevos/semana
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 180 // 3 minutos máx.

// Límites reducidos para minimizar CPU
const MAX_ITEMS = 3  // Solo 3 pisos nuevos por ciudad
const MAX_PAGES = 2  // Solo 2 páginas

// Ciudades prioritarias (rotación semanal)
const WEEKLY_ZONES: Record<number, string[]> = {
  1: ['madrid', 'barcelona'],           // Semana 1
  2: ['valencia', 'sevilla'],           // Semana 2
  3: ['malaga', 'bilbao'],             // Semana 3
  4: ['zaragoza', 'alicante'],         // Semana 4
}

export async function GET(request: NextRequest) {
  // Autenticación
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (!process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_KEY no configurado' },
      { status: 500 }
    )
  }

  // Determinar zona según semana del mes
  const now = new Date()
  const weekOfMonth = Math.ceil(now.getDate() / 7)
  const cities = WEEKLY_ZONES[weekOfMonth] || WEEKLY_ZONES[1]

  console.log(`[pisoscom-cron] 📅 Semana ${weekOfMonth} | Ciudades: ${cities.join(', ')}`)

  const startedAt = Date.now()
  const results: Record<string, { inserted: number; skipped: number } | { error: string }> = {}

  // Importar scraper
  const { scrapeParticulares } = await import('../../../../../scripts/scrapers/pisoscom_particulares')

  async function run(
    label: string,
    fn: () => Promise<{ inserted: number; skipped: number }>
  ) {
    try {
      console.log(`[pisoscom-cron] ▶ ${label}`)
      const r = await fn()
      results[label] = r
      console.log(`[pisoscom-cron] ✅ ${label}: +${r.inserted}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      results[label] = { error: msg }
      console.error(`[pisoscom-cron] ❌ ${label}:`, msg)
    }
  }

  // Ejecutar scraper solo para ciudades de la semana
  for (const city of cities) {
    await run(`pisoscom_part alquiler ${city}`,
      () => scrapeParticulares('alquiler', city, MAX_PAGES, MAX_ITEMS))
    await run(`pisoscom_part venta ${city}`,
      () => scrapeParticulares('venta', city, MAX_PAGES, MAX_ITEMS))
  }

  const elapsed = Math.round((Date.now() - startedAt) / 1000)
  const totalInserted = Object.values(results).reduce(
    (sum, r) => sum + ('inserted' in r ? r.inserted : 0), 0
  )

  return NextResponse.json({
    ok: true,
    date: now.toISOString(),
    week: weekOfMonth,
    cities,
    elapsed_s: elapsed,
    total_inserted: totalInserted,
    tasks: Object.keys(results).length,
    results,
  })
}
