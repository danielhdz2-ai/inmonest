import { createClient } from '@/lib/supabase/server'

// ✅ OPTIMIZACIÓN: Cachear API sitemap 24 horas (reducido de 6h por alto consumo CPU)
export const revalidate = 86400  // 24 horas (antes: 6h - consumía CPU excesivo)
// export const dynamic = 'force-dynamic'  // ❌ DESACTIVADO

const BASE_URL = 'https://inmonest.com'
// Reducido de 49k a 10k para optimizar CPU (Google sitemap limit = 50k URLs)
const MAX_LISTINGS = 5_000  // Top por ranking — reduce "descubierta sin indexar" en GSC

// ✅ IMPORTANTE: Estas ciudades DEBEN coincidir con las de src/app/[ciudad]/page.tsx
const CIUDADES = [
  'madrid', 'barcelona', 'valencia', 'sevilla', 'zaragoza',
  'malaga', 'bilbao', 'alicante',
]

/** Escapa los caracteres reservados de XML excepto &
 *  El & se trata en un único pase final sobre todo el XML */
function xe(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Concatena BASE_URL + path, elimina espacios y escapa para XML */
function u(path: string): string {
  return xe(`${BASE_URL}${path}`.replace(/\s+/g, ''))
}

interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq: string
  priority: number
}

function xmlEntry({ loc, lastmod, changefreq, priority }: SitemapEntry): string {
  const lm = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  return (
    `  <url>\n` +
    `    <loc>${loc}</loc>${lm}\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority.toFixed(1)}</priority>\n` +
    `  </url>`
  )
}

export async function GET() {
  const supabase = await createClient()

  let listings: Array<{ id: string; updated_at: string | null; published_at: string | null }> = []
  let from = 0
  const PAGE = 1000

  while (listings.length < MAX_LISTINGS) {
    const { data, error } = await supabase
      .from('listings')
      .select('id, updated_at, published_at')
      .eq('status', 'published')
      .eq('has_images', true)
      .order('ranking_score', { ascending: false })
      .order('published_at', { ascending: false })
      .range(from, from + PAGE - 1)

    if (error || !data || data.length === 0) break
    listings = listings.concat(data)
    if (data.length < PAGE) break
    from += PAGE
  }

  const today = new Date().toISOString().slice(0, 10)

  const staticEntries = [
    xmlEntry({ loc: xe(BASE_URL),               lastmod: today, changefreq: 'daily',   priority: 1.0 }),
    xmlEntry({ loc: u('/pisos'),                lastmod: today, changefreq: 'hourly',  priority: 1.0 }),
    xmlEntry({ loc: u('/publicar'),                             changefreq: 'monthly', priority: 0.7 }),
    xmlEntry({ loc: u('/publicar-anuncio'),                     changefreq: 'monthly', priority: 0.7 }),
    xmlEntry({ loc: u('/vender-casa'),                          changefreq: 'monthly', priority: 0.7 }),
    xmlEntry({ loc: u('/gestoria'),             lastmod: today, changefreq: 'weekly',  priority: 0.9 }),
    xmlEntry({ loc: u('/gestoria/barcelona'),                   changefreq: 'monthly', priority: 0.8 }),
    xmlEntry({ loc: u('/gestoria/madrid'),                      changefreq: 'monthly', priority: 0.8 }),
    xmlEntry({ loc: u('/gestoria/valencia'),                    changefreq: 'monthly', priority: 0.8 }),
    xmlEntry({ loc: u('/agencias'),                             changefreq: 'monthly', priority: 0.6 }),
    xmlEntry({ loc: u('/contacto'),                             changefreq: 'monthly', priority: 0.5 }),
    xmlEntry({ loc: u('/blog'),                                 changefreq: 'weekly',  priority: 0.7 }),
  ]

  // ✅ URLs REALES de ciudades (sin query params que causan 404)
  const ciudadEntries = CIUDADES.flatMap((slug) => [
    xmlEntry({ loc: u(`/${slug}`),                      lastmod: today, changefreq: 'daily', priority: 0.9 }),
    xmlEntry({ loc: u(`/${slug}/pisos`),                lastmod: today, changefreq: 'daily', priority: 0.8 }),
    xmlEntry({ loc: u(`/${slug}/alquiler-particulares`),lastmod: today, changefreq: 'daily', priority: 0.8 }),
    xmlEntry({ loc: u(`/${slug}/alquiler-sin-agencia`), lastmod: today, changefreq: 'daily', priority: 0.8 }),
    xmlEntry({ loc: u(`/${slug}/vender-piso`),                          changefreq: 'monthly', priority: 0.7 }),
    xmlEntry({ loc: u(`/${slug}/contrato-alquiler`),                    changefreq: 'monthly', priority: 0.7 }),
    xmlEntry({ loc: u(`/${slug}/contrato-arras`),                       changefreq: 'monthly', priority: 0.7 }),
  ])

  const listingEntries = listings.map((l) => {
    const lm = new Date(l.updated_at ?? l.published_at ?? Date.now())
      .toISOString()
      .slice(0, 10)
    return xmlEntry({ loc: u(`/pisos/${l.id}`), lastmod: lm, changefreq: 'weekly', priority: 0.7 })
  })

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [...staticEntries, ...ciudadEntries, ...listingEntries].join('\n') +
    '\n</urlset>'

  // Único pase final: convierte TODOS los & en &amp;
  // Al llegar aquí no hay ningún & ya escapado porque xe() no toca el &
  const safeXml = xml.split('&').join('&amp;')

  return new Response(safeXml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
