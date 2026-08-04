import { createClient as createClient_ } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import type { Listing, SearchParams } from '@/types/listings'
import { applyProFilters, parseProParams } from '@/lib/search-filters'
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'

const PAGE_SIZE_DEFAULT = 24

/** Campos mínimos para tarjetas de listado (evita traer description, features, etc.) */
const LISTING_CARD_FIELDS =
  'id,origin,operation,title,price_eur,province,city,district,bedrooms,bathrooms,area_m2,is_particular,is_bank,bank_entity,turbo_until,status,published_at,created_at,ranking_score,views_count'

function getDb() {
  return createClient_(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

function normalizeCitySearch(city: string): string {
  return city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ListingsQuery = PostgrestFilterBuilder<any, any, any, any, any>

function applySearchFilters(
  query: ListingsQuery,
  params: SearchParams,
  pro: ReturnType<typeof parseProParams>,
): ListingsQuery {
  let q = query.eq('status', 'published').eq('has_images', true)

  if (params.operacion) q = q.eq('operation', params.operacion)
  if (params.ciudad) {
    const normalized = normalizeCitySearch(params.ciudad)
    q = q.or(`city.ilike.%${params.ciudad}%,city.ilike.%${normalized}%`)
  }
  if (params.solo_particulares) q = q.eq('is_particular', true)
  if (params.solo_bancarias) q = q.eq('is_bank', true)
  if (params.solo_agencias) q = q.eq('is_particular', false).eq('is_bank', false)
  if (params.habitaciones_min) q = q.gte('bedrooms', params.habitaciones_min)
  if (params.habitaciones) q = q.eq('bedrooms', params.habitaciones)
  if (params.precio_min) q = q.gte('price_eur', params.precio_min)
  if (params.precio_max) q = q.lte('price_eur', params.precio_max)
  if (params.area_min) q = q.gte('area_m2', params.area_min)
  if (params.area_max) q = q.lte('area_m2', params.area_max)

  return applyProFilters(q, pro)
}

function applySort(query: ListingsQuery, ordenar?: SearchParams['ordenar']): ListingsQuery {
  switch (ordenar) {
    case 'precio_asc':
      return query.order('price_eur', { ascending: true, nullsFirst: false })
    case 'precio_desc':
      return query.order('price_eur', { ascending: false, nullsFirst: false })
    case 'recientes':
      return query.order('published_at', { ascending: false })
    case 'superficie':
      return query.order('area_m2', { ascending: false, nullsFirst: false })
    default:
      return query
        .order('ranking_score', { ascending: false })
        .order('published_at', { ascending: false })
  }
}

export async function searchListings(params: SearchParams): Promise<{
  listings: Listing[]
  total: number
}> {
  const supabase = getDb()
  const pageSize = params.page_size ?? PAGE_SIZE_DEFAULT
  const pagina = params.pagina ?? 1
  const offset = (pagina - 1) * pageSize
  const pro = parseProParams(params)

  // Una sola query: datos + count (evita round-trip duplicado a Supabase)
  let dataQuery = supabase
    .from('listings')
    .select(LISTING_CARD_FIELDS, { count: 'exact' })

  dataQuery = applySearchFilters(dataQuery, params, pro)
  dataQuery = applySort(dataQuery, params.ordenar)
  dataQuery = dataQuery.range(offset, offset + pageSize - 1)

  const { data, count, error } = await dataQuery

  if (error) {
    console.error('[searchListings] error:', error.message, '| code:', error.code)
    return { listings: [], total: 0 }
  }

  const total = count ?? 0
  const rows = data ?? []
  if (rows.length === 0) {
    return { listings: [], total }
  }

  // Imagen principal por listing (position 0) en una sola query
  const ids = rows.map((l: { id: string }) => l.id)
  const { data: imgs } = await supabase
    .from('listing_images')
    .select('listing_id, id, external_url, storage_path, position')
    .in('listing_id', ids)
    .eq('position', 0)

  if (imgs?.length) {
    const imgMap = new Map(imgs.map((img) => [img.listing_id, [img]]))
    for (const listing of rows) {
      (listing as Record<string, unknown>).listing_images = imgMap.get(listing.id) ?? []
    }
  }

  return { listings: rows as Listing[], total }
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  const { data: images } = await supabase
    .from('listing_images')
    .select('id, storage_path, external_url, position')
    .eq('listing_id', id)
    .order('position', { ascending: true })

  return {
    ...data,
    listing_images: images ?? [],
  } as Listing
}

/** Hubs de ciudad con landing /{slug}/pisos — para redirigir anuncios dados de baja. */
const LISTING_CITY_HUBS = new Set([
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'bilbao',
  'zaragoza',
  'alicante',
  'granada',
  'murcia',
  'pamplona',
  'valladolid',
])

function cityToHubSlug(city: string | null | undefined): string | null {
  if (!city) return null
  const slug = city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
  if (slug === 'palma' || slug === 'palma-de-mallorca' || slug === 'mallorca') return null
  if (slug === 'a-coruna' || slug === 'coruna' || slug === 'la-coruna') return null
  return LISTING_CITY_HUBS.has(slug) ? slug : null
}

export async function getGoneListingRedirect(id: string): Promise<string | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('listings')
    .select('city, status')
    .eq('id', id)
    .maybeSingle()

  if (!data) return '/pisos'
  if (data.status === 'published') return null

  const hub = cityToHubSlug(data.city)
  if (hub) return `/${hub}/pisos`

  if (data.city) {
    return `/pisos?ciudad=${encodeURIComponent(data.city)}`
  }
  return '/pisos'
}

export async function recordView(listingId: string, sessionId: string) {
  const supabase = await createClient()
  await supabase
    .from('listing_views')
    .insert({ listing_id: listingId, session_id: sessionId })
}

const CAROUSEL_BLACKLIST = [
  'hipoteca', 'deuda', 'nuda propiedad', 'indiviso', 'embargo', 'subasta',
  'renta antigua', 'herencia', 'proindiviso', 'usufructo', 'uso fructo',
  'se busca', 'busco piso', 'busco casa', 'compro piso', 'compro casa',
]

export async function getSimilarListings(
  currentId: string,
  city: string | null,
  operation: string,
  price: number | null,
  limit = 12,
): Promise<Listing[]> {
  if (!city) return []

  const supabase = getDb()
  const normalized = normalizeCitySearch(city)

  let q = supabase
    .from('listings')
    .select('id, title, price_eur, operation, city, district, province, bedrooms, bathrooms, area_m2, is_particular, is_bank, bank_entity, turbo_until, status, published_at, created_at, ranking_score')
    .eq('status', 'published')
    .eq('has_images', true)
    .eq('operation', operation)
    .or(`city.ilike.%${city}%,city.ilike.%${normalized}%`)
    .neq('id', currentId)

  if (price) {
    q = q.gte('price_eur', Math.round(price * 0.8))
         .lte('price_eur', Math.round(price * 1.2))
  }

  q = q.order('ranking_score', { ascending: false })
       .order('published_at', { ascending: false })
       .limit(limit * 3)

  const { data } = await q
  if (!data?.length) return []

  const filtered = (data as Listing[]).filter(l => {
    const t = l.title.toLowerCase()
    return !CAROUSEL_BLACKLIST.some(term => t.includes(term))
  })

  const chosen = filtered.slice(0, limit)
  if (!chosen.length) return []

  const ids = chosen.map(l => l.id)
  const { data: imgs } = await supabase
    .from('listing_images')
    .select('listing_id, id, external_url, storage_path, position')
    .in('listing_id', ids)
    .eq('position', 0)

  if (imgs?.length) {
    const imgMap = new Map(imgs.map(i => [i.listing_id, [i]]))
    for (const l of chosen) {
      (l as unknown as Record<string, unknown>).listing_images = imgMap.get(l.id) ?? []
    }
  }

  return chosen
}
