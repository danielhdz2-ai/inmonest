import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

// Siempre www — Google Search Console considera www y no-www dominios distintos
const BASE_URL = 'https://www.inmonest.com'

// Límite de Google por fichero sitemap: 50.000 URLs / 50 MB
const MAX_LISTINGS = 49_000

// Ciudades con páginas de búsqueda SEO-friendly
const CIUDADES: Array<{ slug: string; label: string }> = [
  { slug: 'madrid',    label: 'Madrid'    },
  { slug: 'barcelona', label: 'Barcelona' },
  { slug: 'valencia',  label: 'Valencia'  },
  { slug: 'sevilla',   label: 'Sevilla'   },
  { slug: 'zaragoza',  label: 'Zaragoza'  },
  { slug: 'malaga',    label: 'Málaga'    },
  { slug: 'murcia',    label: 'Murcia'    },
  { slug: 'bilbao',    label: 'Bilbao'    },
  { slug: 'alicante',  label: 'Alicante'  },
  { slug: 'granada',   label: 'Granada'   },
]

// Revalidar cada hora para reflejar anuncios nuevos sin rebuilds
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // ── Anuncios publicados ────────────────────────────────────────────────
  // Traer en lotes de 1000 hasta MAX_LISTINGS para no saturar la memoria
  let listings: Array<{ id: string; updated_at: string | null; published_at: string | null }> = []
  let from = 0
  const batchSize = 1000

  while (listings.length < MAX_LISTINGS) {
    const { data, error } = await supabase
      .from('listings')
      .select('id, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(from, from + batchSize - 1)

    if (error || !data || data.length === 0) break
    listings = listings.concat(data)
    if (data.length < batchSize) break
    from += batchSize
  }

  const listingUrls: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${BASE_URL}/pisos/${l.id}`,
    lastModified: new Date(l.updated_at ?? l.published_at ?? Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // ── URLs de búsqueda por ciudad (sin query params — más indexables) ─────
  const ciudadUrls: MetadataRoute.Sitemap = CIUDADES.flatMap(({ slug }) => [
    {
      url: `${BASE_URL}/pisos?ciudad=${slug}&operacion=rent`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pisos?ciudad=${slug}&operacion=sale`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
  ])

  // ── Páginas estáticas ──────────────────────────────────────────────────
  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          changeFrequency: 'daily',   priority: 1.0  },
    { url: `${BASE_URL}/pisos`,               changeFrequency: 'hourly',  priority: 0.95 },
    { url: `${BASE_URL}/pisos?operacion=rent`,changeFrequency: 'daily',   priority: 0.9  },
    { url: `${BASE_URL}/pisos?operacion=sale`,changeFrequency: 'daily',   priority: 0.9  },
    { url: `${BASE_URL}/publicar`,            changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/publicar-anuncio`,    changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/vender-casa`,         changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE_URL}/gestoria`,            changeFrequency: 'monthly', priority: 0.6  },
    { url: `${BASE_URL}/agencias`,            changeFrequency: 'monthly', priority: 0.55 },
    { url: `${BASE_URL}/contacto`,            changeFrequency: 'monthly', priority: 0.5  },
  ]

  return [
    ...staticUrls,
    ...ciudadUrls,
    ...listingUrls,
  ]
}

}
