import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loadPortalSidebarProps } from '@/lib/portal-sidebar-data'
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

    const sidebar = await loadPortalSidebarProps(supabase, user)

    return (
      <DashboardSidebar {...sidebar}>
        {children}
      </DashboardSidebar>
    )
  } catch (err) {
    console.error('[mi-cuenta/contratos/layout]', err)
    redirect('/login?next=/mi-cuenta/contratos')
  }
}
