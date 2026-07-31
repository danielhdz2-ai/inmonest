import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/NavbarServer'
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

  // Lista de emails con acceso admin
  const adminEmails = [
    (process.env.CONTACT_NOTIFY_EMAIL ?? '').trim(),
    'daniel.hdz.trader@gmail.com',
  ].filter(Boolean)

  if (!user || !adminEmails.includes((user.email || '').trim())) {
    redirect('/')
  }

  // Cargar todos los pedidos server-side (nunca debe tumbar el panel si falla)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any[] | null = null
  try {
    const res = await supabase
      .from('gestoria_requests')
      .select('*')
      .order('created_at', { ascending: false })
    data = res.data
  } catch (err) {
    console.error('[admin/page] fallo cargando pedidos', err)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4">
        <AdminPanelPremium initialRequests={data ?? []} />
      </main>
    </>
  )
}
