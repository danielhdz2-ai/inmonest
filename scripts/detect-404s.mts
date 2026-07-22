import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const MAX = parseInt(process.env.MAX_LISTINGS || '300', 10)
const DRY_RUN = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true'

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
      if (/no\s+encontr|no\s+disponible|404/i.test(pageTitle) || !/referencia|inmueble/i.test(html.slice(0, 5000))) {
        // solo si title sugiere error
        if (/404|no encontrado|error/i.test(pageTitle)) {
          return { dead: true, reason: `gilmar:title` }
        }
      }
    }

    return { dead: false, reason: `OK` }
  } catch (err) {
    return { dead: false, reason: `error:${String(err).slice(0, 50)}` }
  }
}

async function checkAvailability() {
  console.log(`🔍 Detector orígenes muertos (pisos.com id + soft-404)`)
  console.log(`📊 Límite: ${MAX} | DRY_RUN: ${DRY_RUN}\n`)

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, source_url, source_portal, updated_at, city')
    .eq('status', 'published')
    .not('source_url', 'is', null)
    .order('updated_at', { ascending: true })
    .limit(MAX)

  if (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }

  if (!listings?.length) {
    console.log('✅ No hay pisos para verificar')
    return
  }

  console.log(`📋 Verificando ${listings.length} pisos...\n`)

  let removed = 0
  let available = 0
  let skipped = 0
  const dead: { id: string; title: string; reason: string; portal: string | null }[] = []

  for (let i = 0; i < listings.length; i += 8) {
    const batch = listings.slice(i, i + 8)
    await Promise.all(
      batch.map(async (listing) => {
        const result = await isSourceDead(listing.source_url!, listing.source_portal)
        if (result.dead) {
          console.log(`❌ [${result.reason}] ${listing.title.slice(0, 50)} — ${listing.source_portal}`)
          dead.push({
            id: listing.id,
            title: listing.title,
            reason: result.reason,
            portal: listing.source_portal,
          })
          if (!DRY_RUN) {
            await supabase.from('listings').update({ status: 'archived' }).eq('id', listing.id)
          }
          removed++
        } else if (result.reason.startsWith('error:') || result.reason.includes('skip')) {
          skipped++
        } else {
          available++
        }
      }),
    )
    await new Promise((r) => setTimeout(r, 1000))
    if ((i + 8) % 40 === 0 || i + 8 >= listings.length) {
      console.log(`… ${Math.min(i + 8, listings.length)}/${listings.length} (bajas: ${removed})`)
    }
  }

  console.log(`\n📊 RESUMEN:`)
  console.log(`✅ Disponibles: ${available}`)
  console.log(`❌ Archivados: ${removed}${DRY_RUN ? ' (dry-run)' : ''}`)
  console.log(`⚠️  Skip/error: ${skipped}`)
}

checkAvailability().catch((err) => {
  console.error(err)
  process.exit(1)
})
