import { createClient } from '@supabase/supabase-js'
import { searchListings } from '@/lib/listings'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key }, { status: 500 })
  }

  // Test 1: cliente directo
  const db = createClient(url, key)
  const { count: directCount, error: directError } = await db
    .from('listings')
    .select('id', { count: 'exact', head: true })

  // Test 2: via searchListings (lo mismo que usa /pisos)
  const { listings, total } = await searchListings({})

  // Test 3: via searchListings con operacion=rent
  const { listings: rentListings, total: rentTotal } = await searchListings({ operacion: 'rent' })

  return NextResponse.json({
    directQuery: { count: directCount, error: directError?.message },
    searchListings_sinFiltros: { total, count: listings.length },
    searchListings_rent: { total: rentTotal, count: rentListings.length },
    env: { url: url.slice(0, 30), keyOk: key.length > 50 },
  })
}

