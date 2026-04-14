/**
 * ════════════════════════════════════════════════════════════════════════════
 *  AUDITOR DE DATOS — Inmonest / is_particular=true
 *  Detecta anuncios de AGENCIAS incorrectamente clasificados como particulares
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Produce 5 secciones de informe:
 *   1. Patrones de agencia en texto (title + description)
 *   2. Teléfonos repetidos (>3 anuncios con el mismo número → probable gestor/agencia)
 *   3. advertiser_name que aparecen ≥3 veces como "particular"
 *   4. Top-20 anuncios más sospechosos (mayor puntuación de riesgo)
 *   5. Tasa de contaminación estimada
 *
 * Uso:
 *   $env:SUPABASE_SERVICE_KEY="tu-clave" ; npx tsx scripts/audit-particulares.ts
 *
 * Opcional: exportar a JSON
 *   npx tsx scripts/audit-particulares.ts --json > informe.json
 */

const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ''
const JSON_MODE = process.argv.includes('--json')

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Falta SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const BASE_HEADERS = {
  apikey: SUPABASE_SERVICE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
}

// ─────────────────────────────────────────────────────────────────────────────
// PATRONES DE SOSPECHA — cada uno tiene peso (0.5 = baja, 1 = media, 2 = alta)
// ─────────────────────────────────────────────────────────────────────────────
const SUSPICION_PATTERNS: Array<{
  label: string
  pattern: RegExp
  weight: number
  category: 'text_hard' | 'text_soft' | 'text_subtle'
}> = [
  // ── Señales DURAS (claros indicios de agencia) ────────────────────────────
  { label: 'Honorarios / comisión de agencia',      pattern: /\bhonorarios\b|\bcomisi[oó]n de (?:agencia|intermediaci[oó]n)\b/i,           weight: 3, category: 'text_hard' },
  { label: 'Gastos de gestión/agencia',             pattern: /gastos de (?:gesti[oó]n|agencia)/i,                                          weight: 3, category: 'text_hard' },
  { label: 'Franquicia / marca inmobiliaria',       pattern: /\btuksa\b|\bgilmar\b|\btecnocasa\b|\bredpiso\b|\bmonapart\b|\bdonpiso\b|\bhousell\b|\bre\/?max\b|\bcentury\s*21\b|\bkeller\s+williams\b|\beras?\s+inmobiliaria\b|\blucas\s+fox\b|\bbcn\s+advisors\b|\bamat\s+inmobiliaris\b|\bengel\s*&\s*v[oö]lkers\b|\bcoldwell\s+banker\b|\baliseda\b|\bservihabitat\b|\bsolvia\b/i, weight: 3, category: 'text_hard' },
  { label: 'Email corporativo en texto',            pattern: /\b(?:info|ventas|contacto|alquiler|pisos|arrendamiento)@[\w\-]+\.\w{2,}/i,  weight: 3, category: 'text_hard' },
  { label: 'Anunciante profesional (badge)',        pattern: /anunciante profesional/i,                                                    weight: 3, category: 'text_hard' },
  { label: 'Registro agentes inmobiliarios',        pattern: /registr(?:o|e) de? agents? inmobiliaris?/i,                                  weight: 3, category: 'text_hard' },
  { label: 'Sufijo societario S.L./S.A. en texto', pattern: /\bs\.?\s*[lL]\.?\s*[uU]?\.?\b|\bs\.?\s*[aA]\.?\b/,                          weight: 3, category: 'text_hard' },

  // ── Señales MEDIAS (probables agencias) ──────────────────────────────────
  { label: 'Cartera / nuestros inmuebles',          pattern: /nuestra\s+cartera|nuestros?\s+inmuebles|nuestra\s+oferta\s+inmobiliaria/i,   weight: 2, category: 'text_soft' },
  { label: 'Visite nuestra web / oficina',          pattern: /visite?\s+(?:nuestra|nuestras?)\s+(?:web|p[aá]gina|oficina|agencia)/i,       weight: 2, category: 'text_soft' },
  { label: 'Gestión integral / asesoramiento',      pattern: /gesti[oó]n\s+integral|asesoramiento\s+inmobiliario|servicio\s+integral/i,    weight: 2, category: 'text_soft' },
  { label: 'Lenguaje corporativo plural (ofrecemos/gestionamos)', pattern: /(?:te\s+)?(?:ofrecemos|presentamos|gestionamos|disponemos)\b/i, weight: 2, category: 'text_soft' },
  { label: 'Piso de obra nueva / promotora',        pattern: /\bobra\s+nueva\b.*\b(?:promotor|constructor|developer)/i,                   weight: 2, category: 'text_soft' },

  // ── Señales SUTILES (contexto necesario) ────────────────────────────────
  { label: 'Disponibilidad inmediata (formulaic)',  pattern: /disponibilidad\s+inmediata/i,                                               weight: 1, category: 'text_subtle' },
  { label: 'Ref. interna (ej. REF-12345)',          pattern: /\bref(?:erencia)?\s*[.:\-]\s*[A-Z0-9]{4,}/i,                               weight: 1, category: 'text_subtle' },
  { label: 'Zona / ubicación por agencia',          pattern: /zona\s+prime\b|ubicaci[oó]n\s+privilegiada|zona\s+exclusiva/i,             weight: 1, category: 'text_subtle' },
  { label: 'URL en descripción',                    pattern: /https?:\/\/[\w\-.]+\.[a-z]{2,}/i,                                           weight: 1, category: 'text_subtle' },
  { label: 'Descripción idéntica pattern (boilerplate)', pattern: /no\s+dude\s+en\s+contactar|estamos\s+a\s+su\s+disposici[oó]n|llama(?:nos)?|escr[ií]ba(?:nos)?/i, weight: 1, category: 'text_subtle' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpers Supabase
// ─────────────────────────────────────────────────────────────────────────────
async function supabaseGet<T>(path: string): Promise<T[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { ...BASE_HEADERS, Prefer: 'count=none' },
  })
  if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T[]>
}

// Descarga en batches de N para no saturar la API
async function fetchAllParticulares(): Promise<Listing[]> {
  const BATCH = 1000
  const results: Listing[] = []
  let from = 0
  process.stderr.write('📥 Descargando listings particulares...')

  while (true) {
    const batch = await supabaseGet<Listing>(
      `listings?is_particular=eq.true&status=eq.published` +
      `&select=id,title,description,advertiser_name,phone,source_portal,source_url,price_eur,city,operation,created_at` +
      `&order=id.asc&limit=${BATCH}&offset=${from}`
    )
    results.push(...batch)
    process.stderr.write(`.`)
    if (batch.length < BATCH) break
    from += BATCH
  }
  process.stderr.write(` ${results.length} cargados\n`)
  return results
}

interface Listing {
  id: string
  title: string
  description: string | null
  advertiser_name: string | null
  phone: string | null
  source_portal: string
  source_url: string
  price_eur: number | null
  city: string | null
  operation: string
  created_at: string
}

interface SuspiciousListing {
  id: string
  title: string
  city: string | null
  price_eur: number | null
  operation: string
  source_portal: string
  source_url: string
  advertiser_name: string | null
  phone: string | null
  score: number
  reasons: string[]
}

// ── Normaliza un número de teléfono para deduplicación ──────────────────────
function normalizePhone(raw: string | null): string | null {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 9) return null
  // Quitar prefijo internacional +34 o 0034
  return digits.replace(/^(?:0034|34)/, '').slice(0, 9)
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const listings = await fetchAllParticulares()
  const total = listings.length

  if (total === 0) {
    console.log('⚠️  No hay listings con is_particular=true en la base de datos.')
    return
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 1 — Scoring de sospecha por texto
  // ══════════════════════════════════════════════════════════════════════════
  const scored: SuspiciousListing[] = []
  const patternHitCount: Record<string, number> = {}

  for (const l of listings) {
    const text = `${l.title ?? ''} ${l.description ?? ''}`.toLowerCase()
    const reasons: string[] = []
    let score = 0

    for (const p of SUSPICION_PATTERNS) {
      if (p.pattern.test(text)) {
        score += p.weight
        reasons.push(`[${p.category.toUpperCase()}+${p.weight}] ${p.label}`)
        patternHitCount[p.label] = (patternHitCount[p.label] ?? 0) + 1
      }
    }

    scored.push({
      id: l.id,
      title: l.title,
      city: l.city,
      price_eur: l.price_eur,
      operation: l.operation,
      source_portal: l.source_portal,
      source_url: l.source_url,
      advertiser_name: l.advertiser_name,
      phone: l.phone,
      score,
      reasons,
    })
  }

  const contaminated_text = scored.filter(s => s.score > 0)

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 2 — Análisis de teléfonos repetidos
  // ══════════════════════════════════════════════════════════════════════════
  const phoneMap = new Map<string, string[]>() // phone → [listing_id]
  for (const l of listings) {
    const phone = normalizePhone(l.phone)
    if (!phone) continue
    const arr = phoneMap.get(phone) ?? []
    arr.push(l.id)
    phoneMap.set(phone, arr)
  }

  const repeatedPhones = [...phoneMap.entries()]
    .filter(([, ids]) => ids.length > 3)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([phone, ids]) => {
      // Buscar nombre del anunciante del primer anuncio con ese teléfono
      const sample = listings.find(l => ids.includes(l.id))
      return {
        phone,
        count: ids.length,
        advertiser_name: sample?.advertiser_name ?? '(desconocido)',
        sample_city: sample?.city ?? '?',
        listing_ids: ids,
      }
    })

  // Añadir puntos de sospecha por teléfono repetido
  const phoneScoreBonus = new Map<string, number>()
  for (const rp of repeatedPhones) {
    const bonus = rp.count >= 10 ? 3 : rp.count >= 6 ? 2 : 1
    for (const id of rp.listing_ids) phoneScoreBonus.set(id, bonus)
  }
  for (const s of scored) {
    const bonus = phoneScoreBonus.get(s.id)
    if (bonus) {
      s.score += bonus
      const existing = repeatedPhones.find(rp => rp.listing_ids.includes(s.id))
      s.reasons.push(`[PHONE+${bonus}] Teléfono compartido con ${existing?.count} anuncios (${existing?.phone})`)
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 3 — Nombres repetidos
  // ══════════════════════════════════════════════════════════════════════════
  const nameMap = new Map<string, { count: number; cities: string[]; portals: string[] }>()
  for (const l of listings) {
    if (!l.advertiser_name) continue
    const key = l.advertiser_name.trim().toLowerCase()
    const current = nameMap.get(key) ?? { count: 0, cities: [], portals: [] }
    current.count++
    if (l.city && !current.cities.includes(l.city)) current.cities.push(l.city)
    if (!current.portals.includes(l.source_portal)) current.portals.push(l.source_portal)
    nameMap.set(key, current)
  }

  const repeatedNames = [...nameMap.entries()]
    .filter(([, v]) => v.count >= 3)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, v]) => ({
      advertiser_name: name,
      count: v.count,
      cities: v.cities.slice(0, 5),
      portals: v.portals,
    }))

  // Añadir puntos por nombre repetido
  const nameScoreBonus = new Map<string, number>()
  for (const rn of repeatedNames) {
    const bonus = rn.count >= 20 ? 3 : rn.count >= 10 ? 2 : 1
    for (const l of listings) {
      if (l.advertiser_name?.toLowerCase().trim() === rn.advertiser_name) {
        nameScoreBonus.set(l.id, (nameScoreBonus.get(l.id) ?? 0) + bonus)
      }
    }
  }
  for (const s of scored) {
    const bonus = nameScoreBonus.get(s.id)
    if (bonus) {
      s.score += bonus
      const rn = repeatedNames.find(r => r.advertiser_name === s.advertiser_name?.toLowerCase().trim())
      if (rn) s.reasons.push(`[NAME+${bonus}] Nombre aparece en ${rn.count} anuncios`)
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 4 — Top 20 más sospechosos
  // ══════════════════════════════════════════════════════════════════════════
  const top20 = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 5 — Tasa de contaminación estimada
  // ══════════════════════════════════════════════════════════════════════════
  const contaminated_high   = scored.filter(s => s.score >= 4).length  // casi seguro agencia
  const contaminated_medium = scored.filter(s => s.score >= 2 && s.score < 4).length  // probable
  const contaminated_low    = scored.filter(s => s.score >= 1 && s.score < 2).length  // sospechoso
  const clean               = scored.filter(s => s.score === 0).length

  const estimatedContaminated = contaminated_high + Math.round(contaminated_medium * 0.7) + Math.round(contaminated_low * 0.2)
  const errorRate = ((estimatedContaminated / total) * 100).toFixed(1)

  // ══════════════════════════════════════════════════════════════════════════
  // SALIDA
  // ══════════════════════════════════════════════════════════════════════════

  if (JSON_MODE) {
    console.log(JSON.stringify({
      meta: { total_particulares: total, generated_at: new Date().toISOString() },
      contamination: {
        estimated_contaminated: estimatedContaminated,
        error_rate_percent: parseFloat(errorRate),
        high_confidence:   contaminated_high,
        medium_confidence: contaminated_medium,
        low_confidence:    contaminated_low,
        clean,
      },
      pattern_hits: patternHitCount,
      repeated_phones: repeatedPhones.slice(0, 50),
      repeated_names:  repeatedNames.slice(0, 100),
      top_20_suspicious: top20,
    }, null, 2))
    return
  }

  // ── Modo texto (consola) ──────────────────────────────────────────────────
  const hr = '═'.repeat(72)
  const hr2 = '─'.repeat(72)

  console.log(`\n${hr}`)
  console.log(`  🔍 AUDITOR DE DATOS — Inmonest Particulares`)
  console.log(`  Fecha: ${new Date().toLocaleString('es-ES')}`)
  console.log(`  Total anuncios is_particular=true: ${total.toLocaleString('es-ES')}`)
  console.log(hr)

  // ── SECCIÓN 1: Patrones de texto ─────────────────────────────────────────
  console.log(`\n${'─'.repeat(72)}`)
  console.log(`  📋 SECCIÓN 1 — DETECCIÓN DE PATRONES DE AGENCIA EN TEXTO`)
  console.log(`${'─'.repeat(72)}`)
  console.log(`  Anuncios con al menos 1 patrón sospechoso: ${contaminated_text.length} (${((contaminated_text.length/total)*100).toFixed(1)}%)`)
  console.log()
  console.log('  Frecuencia de cada patrón:')
  console.log(`  ${'─'.repeat(64)}`)
  const sortedPatterns = Object.entries(patternHitCount).sort((a, b) => b[1] - a[1])
  for (const [label, count] of sortedPatterns) {
    const pct = ((count / total) * 100).toFixed(2)
    const barLen = Math.round(count / total * 40)
    const bar = '█'.repeat(barLen) + '░'.repeat(40 - barLen)
    const p = SUSPICION_PATTERNS.find(p => p.label === label)
    const catIcon = p?.category === 'text_hard' ? '🔴' : p?.category === 'text_soft' ? '🟡' : '🟢'
    console.log(`  ${catIcon} ${label.padEnd(45)} ${String(count).padStart(5)} (${pct}%)`)
    console.log(`     ${bar}`)
  }
  console.log(`\n  🔴 = señal dura (peso 3) | 🟡 = señal media (peso 2) | 🟢 = señal sutil (peso 1)`)

  // ── SECCIÓN 2: Teléfonos repetidos ────────────────────────────────────────
  console.log(`\n${hr2}`)
  console.log(`  📞 SECCIÓN 2 — TELÉFONOS CON MÁS DE 3 ANUNCIOS DISTINTOS`)
  console.log(hr2)
  if (repeatedPhones.length === 0) {
    console.log('  ✅ Ningún número de teléfono aparece en más de 3 anuncios.')
  } else {
    console.log(`  ⚠️  ${repeatedPhones.length} teléfonos sospechosos encontrados\n`)
    console.log(`  ${'Teléfono'.padEnd(14)} ${'Anuncios'.padStart(8)}  ${'Anunciante'.padEnd(30)}  Ciudad`)
    console.log(`  ${'─'.repeat(14)} ${'─'.repeat(8)}  ${'─'.repeat(30)}  ${'─'.repeat(20)}`)
    for (const rp of repeatedPhones.slice(0, 40)) {
      const badge = rp.count >= 10 ? '🚨' : '⚠️ '
      console.log(`  ${badge} ${rp.phone.padEnd(12)} ${String(rp.count).padStart(8)}  ${(rp.advertiser_name ?? '?').slice(0, 30).padEnd(30)}  ${rp.sample_city ?? '?'}`)
    }
    if (repeatedPhones.length > 40) console.log(`  ... y ${repeatedPhones.length - 40} más`)
  }

  // ── SECCIÓN 3: Nombres repetidos ──────────────────────────────────────────
  console.log(`\n${hr2}`)
  console.log(`  👤 SECCIÓN 3 — ADVERTISER_NAME CON ≥3 ANUNCIOS "PARTICULARES"`)
  console.log(hr2)
  if (repeatedNames.length === 0) {
    console.log('  ✅ Ningún nombre de anunciante aparece 3 o más veces.')
  } else {
    console.log(`  ⚠️  ${repeatedNames.length} nombres sospechosos\n`)
    console.log(`  ${'Nombre'.padEnd(35)} ${'#'.padStart(5)}  ${'Portales'.padEnd(35)}  Ciudades`)
    console.log(`  ${'─'.repeat(35)} ${'─'.repeat(5)}  ${'─'.repeat(35)}  ${'─'.repeat(30)}`)
    for (const rn of repeatedNames.slice(0, 50)) {
      const badge = rn.count >= 15 ? '🚨' : rn.count >= 7 ? '⚠️ ' : '❓ '
      console.log(
        `  ${badge} ${rn.advertiser_name.slice(0, 33).padEnd(33)} ${String(rn.count).padStart(7)}  ` +
        `${rn.portals.join(', ').slice(0, 33).padEnd(33)}  ${rn.cities.slice(0, 3).join(', ')}`
      )
    }
    if (repeatedNames.length > 50) console.log(`  ... y ${repeatedNames.length - 50} más`)
  }

  // ── SECCIÓN 4: Top 20 sospechosos ─────────────────────────────────────────
  console.log(`\n${hr2}`)
  console.log(`  🎯 SECCIÓN 4 — TOP 20 ANUNCIOS MÁS SOSPECHOSOS (para revisión manual)`)
  console.log(hr2)
  console.log()
  for (let i = 0; i < top20.length; i++) {
    const s = top20[i]
    const badge = s.score >= 7 ? '🚨🚨' : s.score >= 4 ? '🚨' : '⚠️ '
    console.log(`  ${String(i + 1).padStart(2)}. ${badge} [Score: ${s.score}] ${s.title.slice(0, 55)}`)
    console.log(`      ID: ${s.id}`)
    console.log(`      Portal: ${s.source_portal} | Ciudad: ${s.city ?? '?'} | ${s.operation} | ${s.price_eur?.toLocaleString('es-ES') ?? '?'}€`)
    if (s.advertiser_name) console.log(`      Anunciante: ${s.advertiser_name}`)
    if (s.phone)           console.log(`      Teléfono: ${s.phone}`)
    console.log(`      URL: ${s.source_url.slice(0, 70)}`)
    console.log(`      Razones:`)
    for (const r of s.reasons) console.log(`        • ${r}`)
    console.log()
  }

  // ── SECCIÓN 5: Tasa de contaminación ──────────────────────────────────────
  console.log(hr)
  console.log(`  📊 SECCIÓN 5 — TASA DE CONTAMINACIÓN ESTIMADA`)
  console.log(hr)
  console.log()
  const barTotal = 40
  const cleanBar   = Math.round((clean / total) * barTotal)
  const lowBar     = Math.round((contaminated_low / total) * barTotal)
  const medBar     = Math.round((contaminated_medium / total) * barTotal)
  const highBar    = barTotal - cleanBar - lowBar - medBar

  console.log(`  Distribución de riesgo (n=${total.toLocaleString('es-ES')} anuncios):`)
  console.log()
  console.log(`  ✅ Limpios           ${String(clean).padStart(6)} (${((clean/total)*100).toFixed(1)}%)`)
  console.log(`  🟢 Sospecha baja     ${String(contaminated_low).padStart(6)} (${((contaminated_low/total)*100).toFixed(1)}%)  → score 1`)
  console.log(`  🟡 Sospecha media    ${String(contaminated_medium).padStart(6)} (${((contaminated_medium/total)*100).toFixed(1)}%)  → score 2–3`)
  console.log(`  🔴 Agencia probable  ${String(contaminated_high).padStart(6)} (${((contaminated_high/total)*100).toFixed(1)}%)  → score ≥4`)
  console.log()

  const barStr =
    '✅'.repeat(Math.max(0, cleanBar)) +
    '🟢'.repeat(Math.max(0, lowBar)) +
    '🟡'.repeat(Math.max(0, medBar)) +
    '🔴'.repeat(Math.max(0, highBar))
  console.log(`  [${barStr}]`)
  console.log()
  console.log(`  ┌─────────────────────────────────────────────────────────────┐`)
  console.log(`  │  TASA DE CONTAMINACIÓN ESTIMADA: ${errorRate.padStart(5)}%                     │`)
  console.log(`  │  (~${String(estimatedContaminated).padStart(5)} agencias disfrazadas de particular de ${total.toLocaleString('es-ES').padStart(7)} total) │`)
  console.log(`  └─────────────────────────────────────────────────────────────┘`)
  console.log()

  // ── Recomendaciones ───────────────────────────────────────────────────────
  console.log(`  📌 ACCIONES RECOMENDADAS:`)
  console.log()
  if (contaminated_high > 0) {
    console.log(`  1. Ejecutar migración 015 en Supabase SQL Editor (ya preparada)`)
    console.log(`     → Corregirá ~${contaminated_high} anuncios con señales duras de agencia`)
  }
  if (repeatedPhones.length > 0) {
    console.log(`  2. Revisar los ${repeatedPhones.length} teléfonos con >3 anuncios`)
    console.log(`     Puedes marcarlos con:`)
    console.log(`     UPDATE listings SET is_particular=false, ranking_score=30`)
    console.log(`     WHERE phone IN ('${repeatedPhones.slice(0,3).map(r=>r.phone).join("','")}', ...)`)
    console.log(`     AND is_particular=true;`)
  }
  if (repeatedNames.length > 0) {
    const topName = repeatedNames[0]
    console.log(`  3. El anunciante más repetido es "${topName.advertiser_name}" con ${topName.count} anuncios.`)
    console.log(`     Revisar manualmente si es particular o gestor profesional.`)
  }
  console.log(`\n  💡 Ejecutar con --json para exportar datos completos a JSON.`)
  console.log(`     Ej: npx tsx scripts/audit-particulares.ts --json > informe-$(date +%Y%m%d).json`)
  console.log(`\n${hr}\n`)
}

main().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
