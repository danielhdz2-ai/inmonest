import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const MAX = parseInt(process.env.MAX_LISTINGS || '400', 10)
const STALE_DAYS = parseInt(process.env.STALE_DAYS || '30', 10)
const OPERATION = (process.env.OPERATION || 'rent').toLowerCase() as 'rent' | 'sale' | 'all'
const DRY_RUN = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true'
const BATCH_SIZE = 6
const BATCH_DELAY_MS = 800

type ListingRow = {
  id: string
  title: string
  source_url: string
  source_portal: string | null
  updated_at: string
  city: string | null
  operation: 'rent' | 'sale'
}

const DEAD_PATTERNS = [
  /anuncio\s+no\s+disponible/i,
  /este\s+anuncio\s+ya\s+no\s+est[aá]\s+disponible/i,
  /el\s+inmueble\s+ya\s+no\s+est[aá]\s+disponible/i,
  /ha\s+sido\s+eliminad/i,
  /ha\s+sido\s+retirad/i,
  /anuncio\s+eliminad/i,
  /anuncio\s+caducad/i,
  /no\s+encontramos\s+esta\s+p[aá]gina/i,
  /p[aá]gina\s+no\s+encontrada/i,
  /error\s+404/i,
  /vendido\s+o\s+alquilado/i,
  /ya\s+est[aá]\s+alquilad/i,
  /ya\s+est[aá]\s+vendid/i,
  /este\s+anuncio\s+no\s+existe/i,
]

/** pisos.com: URL …-62500413734_109800/ → el detalle vivo incluye ese id; la búsqueda de zona no. */
function extractPisosComId(url: string): string | null {
  const m = url.match(/-(\d{8,})_\d+\//)
  return m?.[1] ?? null
}

function looksLikePisosComSearchPage(pageTitle: string): boolean {
  return /^(Alquiler de (pisos|áticos|casas|chalets|estudios|duplex|dúplex|locales)|Pisos en |Casas en |Áticos en |Chalets en )/i.test(
    pageTitle.trim(),
  )
}

function staleCutoffIso(): string {
  const d = new Date()
  d.setDate(d.getDate() - STALE_DAYS)
  return d.toISOString()
}

async function fetchByOperation(operation: 'rent' | 'sale', limit: number): Promise<ListingRow[]> {
  if (limit <= 0) return []

  const { data, error } = await supabase
    .from('listings')
    .select('id, title, source_url, source_portal, updated_at, city, operation')
    .eq('status', 'published')
    .eq('operation', operation)
    .not('source_url', 'is', null)
    .lt('updated_at', staleCutoffIso())
    .order('updated_at', { ascending: true })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as ListingRow[]
}

async function fetchListings(): Promise<ListingRow[]> {
  if (OPERATION === 'rent' || OPERATION === 'sale') {
    return fetchByOperation(OPERATION, MAX)
  }

  const rentQuota = Math.ceil(MAX * 0.75)
  const rent = await fetchByOperation('rent', rentQuota)
  const sale = await fetchByOperation('sale', MAX - rent.length)
  return [...rent, ...sale]
}

async function isSourceDead(
  url: string,
  portal: string | null,
): Promise<{ dead: boolean; reason: string }> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(14000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'es-ES,es;q=0.9',
      },
      redirect: 'follow',
    })

    if (res.status === 404 || res.status === 410) {
      return { dead: true, reason: `HTTP ${res.status}` }
    }

    if (!(res.status >= 200 && res.status < 400)) {
      return { dead: false, reason: `HTTP ${res.status} (skip)` }
    }

    const html = await res.text()
    const pageTitle = (html.match(/<title[^>]*>([^<]+)/i) || [])[1]?.replace(/\s+/g, ' ').trim() || ''

    for (const re of DEAD_PATTERNS) {
      if (re.test(html) || re.test(pageTitle)) {
        return { dead: true, reason: `soft404` }
      }
    }

    if (portal === 'pisos.com' || url.includes('pisos.com')) {
      const id = extractPisosComId(url)
      if (id && !html.includes(id)) {
        return { dead: true, reason: `pisos.com:id-missing` }
      }
      if (looksLikePisosComSearchPage(pageTitle)) {
        return { dead: true, reason: `pisos.com:search-page` }
      }
    }

    if (portal === 'gilmar.es' || url.includes('gilmar.es')) {
      if (/404|no encontrado|error/i.test(pageTitle)) {
        return { dead: true, reason: `gilmar:title` }
      }
    }

    return { dead: false, reason: `OK` }
  } catch (err) {
    return { dead: false, reason: `error:${String(err).slice(0, 50)}` }
  }
}

async function checkAvailability() {
  const opLabel =
    OPERATION === 'rent' ? 'alquiler' : OPERATION === 'sale' ? 'venta' : 'alquiler (75%) + venta (25%)'

  console.log(`🔍 Detector orígenes muertos (pisos.com id + soft-404)`)
  console.log(
    `📊 Límite: ${MAX} | Operación: ${opLabel} | Stale: >${STALE_DAYS}d | DRY_RUN: ${DRY_RUN}\n`,
  )

  let listings: ListingRow[]
  try {
    listings = await fetchListings()
  } catch (err) {
    console.error('❌ Error al cargar listings:', err)
    process.exit(1)
  }

  if (!listings.length) {
    console.log(`✅ No hay anuncios ${opLabel} stale (>${STALE_DAYS}d) para verificar`)
    return
  }

  const rentCount = listings.filter((l) => l.operation === 'rent').length
  const saleCount = listings.filter((l) => l.operation === 'sale').length
  console.log(`📋 Verificando ${listings.length} anuncios (${rentCount} alquiler, ${saleCount} venta)...\n`)

  let removed = 0
  let available = 0
  let skipped = 0
  let touched = 0
  const reasonCounts: Record<string, number> = {}

  for (let i = 0; i < listings.length; i += BATCH_SIZE) {
    const batch = listings.slice(i, i + BATCH_SIZE)
    await Promise.all(
      batch.map(async (listing) => {
        const result = await isSourceDead(listing.source_url!, listing.source_portal)
        if (result.dead) {
          reasonCounts[result.reason] = (reasonCounts[result.reason] || 0) + 1
          console.log(
            `❌ [${result.reason}] ${listing.operation === 'rent' ? '🏠' : '🏷️'} ${listing.title.slice(0, 48)} — ${listing.source_portal}`,
          )
          if (!DRY_RUN) {
            await supabase.from('listings').update({ status: 'archived' }).eq('id', listing.id)
          }
          removed++
        } else if (result.reason.startsWith('error:') || result.reason.includes('skip')) {
          skipped++
        } else {
          available++
          if (!DRY_RUN) {
            await supabase
              .from('listings')
              .update({ updated_at: new Date().toISOString() })
              .eq('id', listing.id)
            touched++
          }
        }
      }),
    )
    await new Promise((r) => setTimeout(r, BATCH_DELAY_MS))
    if ((i + BATCH_SIZE) % 30 === 0 || i + BATCH_SIZE >= listings.length) {
      console.log(`… ${Math.min(i + BATCH_SIZE, listings.length)}/${listings.length} (archivados: ${removed})`)
    }
  }

  console.log(`\n📊 RESUMEN:`)
  console.log(`✅ Disponibles en origen: ${available}${touched ? ` (${touched} fecha actualizada)` : ''}`)
  console.log(`❌ Archivados: ${removed}${DRY_RUN ? ' (dry-run)' : ''}`)
  console.log(`⚠️  Skip/error: ${skipped}`)
  if (Object.keys(reasonCounts).length > 0) {
    console.log(`📌 Motivos de baja:`, reasonCounts)
  }
}

checkAvailability().catch((err) => {
  console.error(err)
  process.exit(1)
})
