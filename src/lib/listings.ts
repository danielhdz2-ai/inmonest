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

export async function searchListings(_params: SearchParams): Promise<{
  listings: Listing[]
  total: number
}> {
  const supabase = getDb()

  const { data, error, count } = await supabase
    .from('listings')
    .select('*', { count: 'exact' })
    .limit(PAGE_SIZE)

  if (error) {
    console.error('[searchListings] ERROR:', error.message)
    return { listings: [], total: 0 }
  }

  console.log('[searchListings] OK total:', count)
  return { listings: (data ?? []) as Listing[], total: count ?? 0 }
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('listings')
    .select('*, listing_images(id, storage_path, external_url, position)')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  return {
    ...data,
    listing_images: (data.listing_images ?? []).sort(
      (a: { position: number }, b: { position: number }) => a.position - b.position
    ),
  } as Listing
}

export async function recordView(listingId: string, sessionId: string) {
  const supabase = await createClient()
  await supabase
    .from('listing_views')
    .insert({ listing_id: listingId, session_id: sessionId })
}
