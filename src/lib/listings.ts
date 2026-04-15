import { createClient as createClient_ } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import type { Listing, SearchParams } from '@/types/listings'

const PAGE_SIZE = 50

function getDb() {
  return createClient_(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function searchListings(params: SearchParams): Promise<{
  listings: Listing[]
  total: number
}> {
  const supabase = getDb()
  const pagina = params.pagina ?? 1
  const offset = (pagina - 1) * PAGE_SIZE

  let query = supabase
    .from('listings')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .range(offset, offset + PAGE_SIZE - 1)

  if (params.operacion) query = query.eq('operation', params.operacion)
  if (params.ciudad) query = query.ilike('city', `%${params.ciudad}%`)
  if (params.solo_particulares) query = query.eq('is_particular', true)
  if (params.solo_bancarias) query = query.eq('is_bank', true)
  if (params.habitaciones_min) query = query.gte('bedrooms', params.habitaciones_min)
  if (params.habitaciones) query = query.eq('bedrooms', params.habitaciones)
  if (params.precio_min) query = query.gte('price_eur', params.precio_min)
  if (params.precio_max) query = query.lte('price_eur', params.precio_max)
  if (params.area_min) query = query.gte('area_m2', params.area_min)
  if (params.area_max) query = query.lte('area_m2', params.area_max)

  switch (params.ordenar) {
    case 'precio_asc':  query = query.order('price_eur', { ascending: true, nullsFirst: false }); break
    case 'precio_desc': query = query.order('price_eur', { ascending: false, nullsFirst: false }); break
    case 'recientes':   query = query.order('published_at', { ascending: false }); break
    case 'superficie':  query = query.order('area_m2', { ascending: false, nullsFirst: false }); break
    default:
      query = query.order('ranking_score', { ascending: false }).order('published_at', { ascending: false })
  }

  const { data, error, count } = await query

  if (error) {
    console.error('[searchListings] ERROR:', error.message, '| code:', error.code)
    return { listings: [], total: 0 }
  }

  return { listings: (data ?? []) as Listing[], total: count ?? 0 }
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

  // Buscar imágenes en tabla separada (el join FK no está en schema PostgREST)
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

export async function recordView(listingId: string, sessionId: string) {
  const supabase = await createClient()
  await supabase
    .from('listing_views')
    .insert({ listing_id: listingId, session_id: sessionId })
}
