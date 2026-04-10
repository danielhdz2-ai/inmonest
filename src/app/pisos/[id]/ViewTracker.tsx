'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ViewTracker({ listingId }: { listingId: string }) {
  useEffect(() => {
    const supabase = createClient()
    supabase.rpc('increment_views', { listing_id: listingId }).then(() => {})
  }, [listingId])

  return null
}
