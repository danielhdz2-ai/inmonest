import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/NavbarServer'
import AdminPanelPremium from './AdminPanelPremium'

export const metadata: Metadata = {
  title: 'Admin Premium - Inmonest',
  description: 'Panel de administración avanzado con métricas, clientes y analytics'
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Lista de emails con acceso admin
  const adminEmails = [
    process.env.CONTACT_NOTIFY_EMAIL,
    'daniel.hdz.trader@gmail.com',
  ].filter(Boolean)
  
  if (!user || !adminEmails.includes(user.email || '')) {
    redirect('/')
  }

  // Cargar todos los pedidos server-side
  const { data } = await supabase
    .from('gestoria_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4">
        <AdminPanelPremium initialRequests={data ?? []} />
      </main>
    </>
  )
}
