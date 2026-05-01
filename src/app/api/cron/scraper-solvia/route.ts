/**
 * Cron específico: Solvia (Banco Sabadell)
 * 
 * Frecuencia: Semanal (miércoles 07:00 AM)
 * Consumo estimado: ~1-2 min CPU/semana
 * Optimización: Solo 2 páginas × 3 items = 6 pisos nuevos/semana
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 minutos máx.

// Límites reducidos para minimizar CPU
const MAX_ITEMS = 3  // Solo 3 pisos nuevos por operación
const MAX_PAGES = 2  // Solo 2 páginas

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

  const now = new Date()
  console.log(`[solvia-cron] 🏦 Ejecutando scraper Solvia (Banco Sabadell)`)

  const startedAt = Date.now()
  const results: Record<string, { inserted: number; skipped: number } | { error: string }> = {}

  // Importar scraper
  const { scrapeSolvia } = await import('../../../../../scripts/scrapers/solvia')

  async function run(
    label: string,
    fn: () => Promise<{ inserted: number; skipped: number }>
  ) {
    try {
      console.log(`[solvia-cron] ▶ ${label}`)
      const r = await fn()
      results[label] = r
      console.log(`[solvia-cron] ✅ ${label}: +${r.inserted}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      results[label] = { error: msg }
      console.error(`[solvia-cron] ❌ ${label}:`, msg)
    }
  }

  // Ejecutar solo venta (Solvia tiene pocos pisos en alquiler)
  await run('solvia venta', () => scrapeSolvia('venta', MAX_PAGES, MAX_ITEMS))
  
  // Alquiler solo si es necesario (comenta si no hay suficiente stock)
  await run('solvia alquiler', () => scrapeSolvia('alquiler', MAX_PAGES, MAX_ITEMS))

  const elapsed = Math.round((Date.now() - startedAt) / 1000)
  const totalInserted = Object.values(results).reduce(
    (sum, r) => sum + ('inserted' in r ? r.inserted : 0), 0
  )

  return NextResponse.json({
    ok: true,
    date: now.toISOString(),
    elapsed_s: elapsed,
    total_inserted: totalInserted,
    tasks: Object.keys(results).length,
    results,
  })
}
