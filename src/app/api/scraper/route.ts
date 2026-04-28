/**
 * Vercel Cron endpoint — Scraper boutique diario
 *
 * Cron: cada día a las 7:00 AM UTC (configurado en vercel.json)
 * Seguridad: Vercel envía Authorization: Bearer <CRON_SECRET> automáticamente
 * Timeout: maxDuration = 300s (Vercel Pro)
 *
 * ── Rotación geográfica (día UTC, lunes=1 … domingo=7) ──────────────────────
 *   1 Lunes     → Levante        (Valencia, Alicante, Murcia)
 *   2 Martes    → Andalucía Sur  (Sevilla, Málaga, Granada)
 *   3 Miércoles → Norte          (Bilbao, Santander, Zaragoza)
 *   4 Jueves    → Centro/Murcia  (Madrid, Murcia)
 *   5 Viernes   → Barcelona
 *   6 Sábado    → Madrid (refuerzo + Valencia)
 *   7 Domingo   → Islas/Resto    (Valladolid, Córdoba, Pamplona)
 *
 * ── Calendario de bots ────────────────────────────────────────────────────────
 *   Lun / Mié / Vie  → Solo particulares (pisoscom_particulares, milanuncios, enalquiler)
 *   Mar / Jue / Sáb  → Solo agencias/volumen (pisoscom genérico, solvia)
 *   Dom              → Mixto (pisoscom_particulares + solvia)
 */

import { NextRequest, NextResponse } from 'next/server'

// ── Límites por tarea ────────────────────────────────────────────────────────
const MAX_ITEMS = 4  // anuncios nuevos máx. por tarea
const MAX_PAGES = 2  // páginas a inspeccionar por tarea

// ── Zonas geográficas ────────────────────────────────────────────────────────
// Prioridad: Barcelona (2 días), Valencia (2 días), Madrid (2 días), resto (1 día)
// dayNum: 1=Lun … 7=Dom  (getUTCDay() 0=Dom → mapeamos a 7)
const GEO_ZONES: Record<number, { name: string; cities: string[] }> = {
  1: { name: 'Barcelona',      cities: ['barcelona'] },
  2: { name: 'Valencia',       cities: ['valencia', 'alicante'] },
  3: { name: 'Madrid',         cities: ['madrid'] },
  4: { name: 'Barcelona+Valencia', cities: ['barcelona', 'valencia'] },
  5: { name: 'Madrid+Norte',   cities: ['madrid', 'bilbao', 'zaragoza'] },
  6: { name: 'Andalucía',      cities: ['sevilla', 'malaga', 'granada'] },
  7: { name: 'Resto',          cities: ['murcia', 'valladolid', 'cordoba'] },
}

// ── Ciudades soportadas por cada scraper ─────────────────────────────────────
const PART_CITIES = new Set([
  'madrid','barcelona','valencia','sevilla','zaragoza','bilbao','malaga',
  'granada','murcia','alicante','valladolid','pamplona','santander','cordoba',
])
const MILA_CITIES = new Set([
  'madrid','barcelona','valencia','sevilla','zaragoza','bilbao','malaga',
  'alicante','murcia','granada',
])
const ENAL_CITIES = new Set([
  'madrid','barcelona','valencia','sevilla','zaragoza','bilbao','malaga',
  'alicante','murcia','granada',
])
const GEN_CITIES = new Set([
  'madrid','barcelona','valencia','sevilla','zaragoza','bilbao','malaga',
])

export async function GET(request: NextRequest) {
  // ── Autenticación ────────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (!process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_KEY no configurado en Vercel' },
      { status: 500 },
    )
  }

  // ── Determinar día y zona ────────────────────────────────────────────────
  const now    = new Date()
  const utcDay = now.getUTCDay()               // 0=Dom … 6=Sáb
  const dayNum = utcDay === 0 ? 7 : utcDay     // 1=Lun … 7=Dom
  const zone   = GEO_ZONES[dayNum]

  const isParticulares = [1, 3, 5].includes(dayNum)  // Lun, Mié, Vie
  const isAgency       = [2, 4, 6].includes(dayNum)  // Mar, Jue, Sáb
  // Domingo (7) = mixto: ambas ramas se ejecutan

  console.log(`[cron] 📅 Día ${dayNum} | Zona: ${zone.name} | Ciudades: ${zone.cities.join(', ')}`)
  console.log(`[cron] 🤖 Modo: ${isParticulares ? 'PARTICULARES' : isAgency ? 'AGENCIAS' : 'MIXTO'}`)

  const startedAt = Date.now()
  const results: Record<string, { inserted: number; skipped: number } | { error: string }> = {}

  async function run(
    label: string,
    fn: () => Promise<{ inserted: number; skipped: number }>,
  ) {
    try {
      console.log(`[cron] ▶ ${label}`)
      const r = await fn()
      results[label] = r
      console.log(`[cron] ✅ ${label}: +${r.inserted}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      results[label] = { error: msg }
      console.error(`[cron] ❌ ${label}:`, msg)
    }
  }

  // ── Importaciones dinámicas ──────────────────────────────────────────────
  const { scrapeParticulares } = await import('../../../../scripts/scrapers/pisoscom_particulares')
  const { scrapeMilanuncios }  = await import('../../../../scripts/scrapers/milanuncios')
  const { scrapeSolvia }       = await import('../../../../scripts/scrapers/solvia')
  const { runEnalquiler }      = await import('../../../../scripts/scrapers/enalquiler')
  const { scrapePisoscom }     = await import('../../../../scripts/scrapers/pisoscom')

  type Stat = { inserted: number; skipped: number }

  // ── Rama PARTICULARES (Lun / Mié / Vie + Dom) ────────────────────────────
  if (isParticulares || (!isAgency)) {
    for (const city of zone.cities) {
      if (PART_CITIES.has(city)) {
        await run(`pisoscom_part alquiler ${city}`,
          () => scrapeParticulares('alquiler', city, MAX_PAGES, MAX_ITEMS) as Promise<Stat>)
        await run(`pisoscom_part venta ${city}`,
          () => scrapeParticulares('venta', city, MAX_PAGES, MAX_ITEMS) as Promise<Stat>)
      }
      if (MILA_CITIES.has(city)) {
        await run(`milanuncios alquiler ${city}`,
          () => scrapeMilanuncios('alquiler', city, MAX_PAGES, MAX_ITEMS) as Promise<Stat>)
      }
      if (ENAL_CITIES.has(city)) {
        await run(`enalquiler ${city}`,
          () => runEnalquiler(city, MAX_PAGES, MAX_ITEMS))
      }
    }
  }

  // ── Rama AGENCIAS (Mar / Jue / Sáb + Dom) ───────────────────────────────
  if (isAgency || (!isParticulares)) {
    for (const city of zone.cities) {
      if (GEN_CITIES.has(city)) {
        await run(`pisoscom alquiler ${city}`,
          () => scrapePisoscom('alquiler', city, MAX_PAGES, MAX_ITEMS))
        await run(`pisoscom venta ${city}`,
          () => scrapePisoscom('venta', city, MAX_PAGES, MAX_ITEMS))
      }
    }
    // Solvia: cobertura nacional, se ejecuta una vez por zona de agencia
    await run('solvia venta',    () => scrapeSolvia('venta',    MAX_PAGES, MAX_ITEMS) as Promise<Stat>)
    await run('solvia alquiler', () => scrapeSolvia('alquiler', MAX_PAGES, MAX_ITEMS) as Promise<Stat>)
  }

  const elapsed = Math.round((Date.now() - startedAt) / 1000)
  const totalInserted = Object.values(results).reduce(
    (sum, r) => sum + ('inserted' in r ? r.inserted : 0), 0,
  )

  // ── Notificación Resend ──────────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && totalInserted > 0) {
    const lines = Object.entries(results)
      .map(([k, v]) => `• ${k}: ${'inserted' in v ? `+${v.inserted}` : `ERROR: ${v.error}`}`)
      .join('\n')
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'cron@inmonest.com',
          to: 'admin@inmonest.com',
          subject: `[inmonest] Cron: +${totalInserted} anuncios — ${zone.name}`,
          text: `Zona: ${zone.name}\nModo: ${isParticulares ? 'Particulares' : isAgency ? 'Agencias' : 'Mixto'}\nTiempo: ${elapsed}s\n\n${lines}`,
        }),
      })
    } catch (e) {
      console.error('[cron] Email notification failed:', e)
    }
  }

  return NextResponse.json({
    ok: true,
    date: now.toISOString(),
    day: dayNum,
    zone: zone.name,
    mode: isParticulares ? 'particulares' : isAgency ? 'agencias' : 'mixto',
    elapsed_s: elapsed,
    total_inserted: totalInserted,
    tasks: Object.keys(results).length,
    results,
  })
}

