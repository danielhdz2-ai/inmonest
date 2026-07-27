import { createClient } from '@/lib/supabase/server'
import DashboardSidebar from '../DashboardSidebar'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, avatar_url')
    .eq('user_id', user!.id)
    .maybeSingle()

  const { count: favCount } = await supabase
    .from('user_favorites')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)

  const { count: alertCount } = await supabase
    .from('search_alerts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('active', true)

  const { data: anuncios } = await supabase
    .from('listings')
    .select('id')
    .eq('owner_user_id', user!.id)

  const anuncioIds = (anuncios ?? []).map((a) => a.id)
  const { count: msgCount } = anuncioIds.length > 0
    ? await supabase
        .from('listing_contacts')
        .select('id', { count: 'exact', head: true })
        .in('listing_id', anuncioIds)
    : { count: 0 }

  const { data: convs, error: convErr } = await supabase
    .from('conversations')
    .select('buyer_id, unread_buyer, unread_seller')
    .or(`buyer_id.eq.${user!.id},seller_id.eq.${user!.id}`)

  if (convErr) {
    console.warn('[portal/layout] conversations:', convErr.message)
  }

  const unreadConvs = (convs ?? []).reduce((acc, c) => {
    return acc + (c.buyer_id === user!.id ? (c.unread_buyer ?? 0) : (c.unread_seller ?? 0))
  }, 0)

  const displayName = profile?.full_name ?? user!.email?.split('@')[0] ?? 'Usuario'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <DashboardSidebar
      email={user!.email ?? ''}
      displayName={displayName}
      initials={initials}
      avatarUrl={profile?.avatar_url ?? null}
      favCount={favCount ?? 0}
      msgCount={(msgCount ?? 0) + unreadConvs}
      alertCount={alertCount ?? 0}
    >
      {children}
    </DashboardSidebar>
  )
}
