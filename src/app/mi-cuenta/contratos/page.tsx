import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import ContratosClient from './ContratosClient'
import GestoriaPanelBootstrap from '@/components/GestoriaPanelBootstrap'
import { Suspense } from 'react'

export default async function ContratosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Vincular leads anteriores (mismo email, sin user_id)
  if (user?.email) {
    try {
      const admin = createAdminClient()
      await admin
        .from('gestoria_requests')
        .update({ user_id: user.id })
        .eq('client_email', user.email.toLowerCase())
        .is('user_id', null)
    } catch {
      /* admin key opcional en dev */
    }
  }

  const [
    { data: contratos },
    { data: userDocs },
  ] = await Promise.all([
    supabase
      .from('gestoria_requests')
      .select('id,session_id,service_key,service_name,client_name,client_email,amount_eur,status,step,paid_at,contract_path,created_at')
      .or(`client_email.eq.${user!.email},user_id.eq.${user!.id}`)
      .order('created_at', { ascending: false }),
    supabase
      .from('user_documents')
      .select('id,doc_key,file_name,status,uploaded_at,notes')
      .eq('user_id', user!.id),
  ])

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <GestoriaPanelBootstrap />
      </Suspense>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#c9962a] mb-1">Gestoría Inmonest</p>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Tu panel de cliente</h1>
        <p className="text-sm text-gray-500 mt-1">
          Seguimiento, documentación y entrega de tu contrato
        </p>
      </div>
      <ContratosClient
        contratos={contratos ?? []}
        userDocs={userDocs ?? []}
        userId={user!.id}
        userEmail={user!.email ?? ''}
      />
    </div>
  )
}
