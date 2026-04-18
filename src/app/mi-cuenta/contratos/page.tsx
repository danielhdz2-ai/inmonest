import { createClient } from '@/lib/supabase/server'
import ContratosClient from './ContratosClient'

export default async function ContratosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: contratos },
    { data: userDocs },
  ] = await Promise.all([
    supabase
      .from('gestoria_requests')
      .select('id,session_id,service_key,client_name,amount_eur,status,step,paid_at,contract_path,created_at')
      .eq('client_email', user!.email)
      .order('paid_at', { ascending: false }),
    supabase
      .from('user_documents')
      .select('id,doc_key,file_name,status,uploaded_at,notes')
      .eq('user_id', user!.id),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contratos y documentacion</h1>
        <p className="text-sm text-gray-500 mt-0.5">Historial de contratos y zona de entrega de documentos</p>
      </div>
      <ContratosClient
        contratos={contratos ?? []}
        userDocs={userDocs ?? []}
        userId={user!.id}
      />
    </div>
  )
}
