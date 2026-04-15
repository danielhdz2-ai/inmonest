import { createClient } from '@supabase/supabase-js'
import { searchListings } from '@/lib/listings'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const db = createClient(url, key)

  // Query directa sin join
  const a = await db.from('listings').select('id', { count: 'exact', head: true })

  // Query directa con join (el que causaba 0)
  const b = await db
    .from('listings')
    .select('id, listing_images(id)', { count: 'exact', head: true })

  // Via searchListings (ahora sin join)
  const { listings, total } = await searchListings({})

  return NextResponse.json({
    directa_sin_join: { count: a.count, error: a.error?.message },
    directa_con_join: { count: b.count, error: b.error?.message },
    searchListings: { total, rows: listings.length, sample: listings[0]?.id ?? null },
  })
}



