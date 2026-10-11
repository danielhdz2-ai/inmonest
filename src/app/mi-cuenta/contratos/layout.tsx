import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadPortalSidebarProps } from '@/lib/portal-sidebar-data'
import { isNextRedirectError } from '@/lib/next-navigation'
import DashboardSidebar from '../DashboardSidebar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Layout propio: carga el sidebar de forma segura sin depender del layout (portal) */
export default async function ContratosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      redirect('/login?next=/mi-cuenta/contratos')
    }

    let sidebar
    try {
      sidebar = await loadPortalSidebarProps(supabase, user)
    } catch (sidebarErr) {
      console.error('[mi-cuenta/contratos/layout] sidebar:', sidebarErr)
      const email = user.email ?? ''
      sidebar = {
        email,
        displayName: email.split('@')[0] || 'Usuario',
        initials: (email.slice(0, 2) || 'IN').toUpperCase(),
        avatarUrl: null,
        favCount: 0,
        msgCount: 0,
        alertCount: 0,
      }
    }

    return (
      <DashboardSidebar {...sidebar}>
        {children}
      </DashboardSidebar>
    )
  } catch (err) {
    if (isNextRedirectError(err)) throw err
    console.error('[mi-cuenta/contratos/layout]', err)
    redirect('/login?next=/mi-cuenta/contratos')
  }
}
