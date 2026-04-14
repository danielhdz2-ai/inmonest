/**
 * 🔍 BOT POLICÍA — Auditor de Calidad de Particulares
 *
 * Recorre todos los listings con is_particular=true de pisos.com en Supabase,
 * visita la URL original, y comprueba si el portal tiene la palabra "Particular"
 * en el bloque de contacto.
 *
 * Si NO la tiene → actualiza is_particular=false en Supabase.
 *
 * Uso:
 *   npx tsx scripts/scrapers/auditor_calidad.ts [--portal pisos.com] [--limit 100] [--dry-run]
 *
 * Flags:
 *   --portal   Portal a auditar (default: pisos.com). Usa 'all' para todos.
 *   --limit    Máximo de listings a comprobar (default: 200)
 *   --dry-run  Solo muestra lo que haría, no actualiza nada
 */

import { createClient } from '@supabase/supabase-js'

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ''

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const DELAY_MS = 1200

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
        Referer: 'https://www.pisos.com/',
      },
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) return null
    return res.text()
  } catch {
    return null
  }
}

// ─── Lógica de verificación por portal ───────────────────────────────────────

/**
 * Devuelve true si el HTML del anuncio certifica que es particular.
 * Lógica binaria: si el bloque de contacto contiene "Particular" → true.
 */
function verificarParticular(html: string, portal: string): boolean {
  // Extraer bloque de contacto
  const blockRe = /class="[^"]*(?:owner-data|contact-block|advertiser-info|contact-form|id-anunciante|anunciante)[^"]*"[\s\S]{0,2000}?(?=<\/(?:div|section|aside|article)>)/i
  const blockMatch = html.match(blockRe)
  const textoContacto = blockMatch
    ? blockMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    : html.slice(0, 50000)

  switch (portal) {
    case 'pisos.com':
      // Si el bloque de contacto NO contiene "Particular" → es agencia
      return textoContacto.includes('Particular') || textoContacto.includes('particular')

    case 'fotocasa':
    case 'fotocasa.es':
      // Fotocasa usa commercialTypeId=1 en el JSON embebido
      return /"commercialTypeId"\s*:\s*1/.test(html)

    case 'habitaclia.com':
      // Badge en catalán o castellano
      return /anunci(?:o)?\s+de\s+particular|anunciante\s+particular/i.test(html)

    case 'milanuncios.com':
      // Milanuncios: sellerType en el JSON
      return /"sellerType"\s*:\s*"private"/.test(html)

    default:
      // Para portales desconocidos, buscar la palabra "particular" en todo el HTML
      return /anunciante\s+particular|propietario\s+particular/i.test(html)
  }
}

// ─── Auditoría principal ──────────────────────────────────────────────────────

async function auditarParticulares(
  portal: string,
  limit: number,
  dryRun: boolean,
): Promise<void> {
  if (!SUPABASE_KEY) {
    console.error('❌ SUPABASE_SERVICE_KEY no definida. Exporta la variable antes de ejecutar.')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log(`\n🔍 BOT POLICÍA — Auditor de Calidad`)
  console.log(`   Portal:  ${portal}`)
  console.log(`   Límite:  ${limit}`)
  console.log(`   Modo:    ${dryRun ? '⚠️  DRY RUN (sin cambios en BD)' : '🔴 REAL (actualizará BD)'}`)
  console.log('─'.repeat(60))

  // Consultar Supabase
  let query = supabase
    .from('listings')
    .select('id, source_url, source_portal, advertiser_name, title, city')
    .eq('is_particular', true)
    .eq('status', 'published')
    .limit(limit)

  if (portal !== 'all') {
    query = query.eq('source_portal', portal)
  }

  const { data: listings, error } = await query
  if (error) {
    console.error('❌ Error al consultar Supabase:', error.message)
    process.exit(1)
  }

  console.log(`\n📋 ${listings?.length ?? 0} listings a auditar\n`)

  let correctos  = 0
  let corregidos = 0
  let errores    = 0

  for (const listing of listings ?? []) {
    await sleep(DELAY_MS)

    const html = await fetchHtml(listing.source_url)
    if (!html) {
      console.log(`  ⚠️ [${listing.id.slice(0, 8)}] Sin respuesta: ${listing.source_url.slice(0, 70)}`)
      errores++
      continue
    }

    const esParticular = verificarParticular(html, listing.source_portal)

    if (esParticular) {
      correctos++
      console.log(`  ✅ CORRECTO    ${(listing.advertiser_name ?? 'sin nombre').slice(0, 30).padEnd(30)} | ${listing.city ?? ''}`)
    } else {
      corregidos++
      console.log(`  🏢 AGENCIA     ${(listing.advertiser_name ?? 'sin nombre').slice(0, 30).padEnd(30)} | ${listing.city ?? ''} → is_particular=false`)

      if (!dryRun) {
        const { error: updateError } = await supabase
          .from('listings')
          .update({
            is_particular:  false,
            ranking_score:  30,
            updated_at:     new Date().toISOString(),
          })
          .eq('id', listing.id)

        if (updateError) {
          console.error(`    ❌ Error al actualizar ${listing.id}: ${updateError.message}`)
        }
      }
    }
  }

  console.log('\n' + '─'.repeat(60))
  console.log(`📊 RESULTADO AUDITORÍA — ${portal}:`)
  console.log(`   ✅ ${correctos}  ya eran particulares correctos`)
  console.log(`   🏢 ${corregidos} agencias detectadas → marcadas is_particular=false${dryRun ? ' (DRY RUN)' : ''}`)
  console.log(`   ⚠️  ${errores}  sin respuesta (URL inaccesible)`)

  if (dryRun && corregidos > 0) {
    console.log(`\n⚠️  DRY RUN: vuelve a ejecutar SIN --dry-run para aplicar los ${corregidos} cambios.`)
  }
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args    = process.argv.slice(2)
  const portal  = args.includes('--portal') ? args[args.indexOf('--portal') + 1] : 'pisos.com'
  const limit   = args.includes('--limit')  ? parseInt(args[args.indexOf('--limit') + 1], 10) : 200
  const dryRun  = args.includes('--dry-run')

  await auditarParticulares(portal, limit, dryRun)
}

main().catch(console.error)
