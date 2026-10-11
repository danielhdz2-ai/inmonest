import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadPortalSidebarProps } from '@/lib/portal-sidebar-data'
import { isNextRedirectError } from '@/lib/next-navigation'
import DashboardSidebar from '../DashboardSidebar'

export default async function PortalLayout({
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

    const sidebar = await loadPortalSidebarProps(supabase, user)

    return (
      <DashboardSidebar {...sidebar}>
        {children}
      </DashboardSidebar>
    )
  } catch (err) {
    if (isNextRedirectError(err)) throw err
    console.error('[portal/layout]', err)
    redirect('/login?next=/mi-cuenta/contratos')
  }
}
