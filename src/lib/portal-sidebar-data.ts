import type { User } from '@supabase/supabase-js'
import type { createClient } from '@/lib/supabase/server'

type SupabaseServer = Awaited<ReturnType<typeof createClient>>

export type PortalSidebarProps = {
  email: string
  displayName: string
  initials: string
  avatarUrl: string | null
  favCount: number
  msgCount: number
  alertCount: number
}

export async function loadPortalSidebarProps(
  supabase: SupabaseServer,
  user: User,
): Promise<PortalSidebarProps> {
  const userId = user.id
  const email = user.email ?? ''

  let profile: { full_name: string | null; avatar_url: string | null } | null = null
  let favCount = 0
  let alertCount = 0
  let msgCount = 0
  let unreadConvs = 0

  try {
    const { data } = await supabase
      .from('user_profiles')
      .select('full_name, avatar_url')
      .eq('user_id', userId)
      .maybeSingle()
    profile = data
  } catch (err) {
    console.warn('[portal-sidebar] user_profiles:', err)
  }

  try {
    const { count } = await supabase
      .from('user_favorites')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
    favCount = count ?? 0
  } catch (err) {
    console.warn('[portal-sidebar] user_favorites:', err)
  }

  try {
    const { count } = await supabase
      .from('search_alerts')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('active', true)
    alertCount = count ?? 0
  } catch (err) {
    console.warn('[portal-sidebar] search_alerts:', err)
  }

  try {
    const { data: anuncios } = await supabase
      .from('listings')
      .select('id')
      .eq('owner_user_id', userId)

    const anuncioIds = (anuncios ?? []).map((a) => a.id)
    if (anuncioIds.length > 0) {
      const { count } = await supabase
        .from('listing_contacts')
        .select('id', { count: 'exact', head: true })
        .in('listing_id', anuncioIds)
      msgCount = count ?? 0
    }
  } catch (err) {
    console.warn('[portal-sidebar] listing_contacts:', err)
  }

  try {
    const { data: convs, error: convErr } = await supabase
      .from('conversations')
      .select('buyer_id, unread_buyer, unread_seller')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)

    if (convErr) {
      console.warn('[portal-sidebar] conversations:', convErr.message)
    } else {
      unreadConvs = (convs ?? []).reduce((acc, c) => {
        return acc + (c.buyer_id === userId ? (c.unread_buyer ?? 0) : (c.unread_seller ?? 0))
      }, 0)
    }
  } catch (err) {
    console.warn('[portal-sidebar] conversations:', err)
  }

  const displayName = profile?.full_name?.trim() || email.split('@')[0] || 'Usuario'
  const initials = displayName.slice(0, 2).toUpperCase()

  return {
    email,
    displayName,
    initials,
    avatarUrl: profile?.avatar_url ?? null,
    favCount,
    msgCount: msgCount + unreadConvs,
    alertCount,
  }
}
