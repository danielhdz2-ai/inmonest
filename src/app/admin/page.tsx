import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdminEmail } from '@/lib/admin'
import AdminPanelPremium from './AdminPanelPremium'

export const metadata: Metadata = {
  title: 'Admin Premium',
  description: 'Panel de administración avanzado con métricas, clientes y analytics'
}

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect('/')
  }

  // Cargar todos los pedidos server-side con el cliente admin (bypass RLS,
  // que solo deja ver a cada usuario sus propios pedidos por email).
  // Nunca debe tumbar el panel si falla.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any[] | null = null
  try {
    const adminSb = createAdminClient()
    const res = await adminSb
      .from('gestoria_requests')
      .select('*')
      .order('created_at', { ascending: false })
    data = res.data
  } catch (err) {
    console.error('[admin/page] fallo cargando pedidos', err)
  }

  return <AdminPanelPremium initialRequests={data ?? []} adminEmail={(user.email || '').trim()} />
}
