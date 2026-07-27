import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'
import ContratosClient from './ContratosClient'
import GestoriaPanelBootstrap from '@/components/GestoriaPanelBootstrap'
import { Suspense } from 'react'

export default async function ContratosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return null
  }

  const emailNorm = user.email.trim().toLowerCase()
  let contratos: Awaited<ReturnType<typeof fetchGestoriaOrdersForUser>> = []
  let userDocs: Awaited<ReturnType<typeof fetchUserDocs>> = []

  try {
    const admin = createAdminClient()
    ;[contratos, userDocs] = await Promise.all([
      fetchGestoriaOrdersForUser(admin, user.id, emailNorm),
      fetchUserDocs(supabase, user.id),
    ])
  } catch (err) {
    console.error('[contratos/page] admin fetch:', err)
    const [{ data: fallbackContratos }, { data: fallbackDocs }] = await Promise.all([
      supabase
        .from('gestoria_requests')
        .select('id,session_id,service_key,service_name,client_name,client_email,amount_eur,status,step,paid_at,contract_path,created_at')
        .or(`client_email.eq.${emailNorm},user_id.eq.${user.id}`)
        .order('created_at', { ascending: false }),
      supabase
        .from('user_documents')
        .select('id,doc_key,file_name,status,uploaded_at,notes')
        .eq('user_id', user.id),
    ])
    contratos = fallbackContratos ?? []
    userDocs = fallbackDocs ?? []
  }

  return (
    <div className="space-y-4">
      <Suspense fallback={null}>
        <GestoriaPanelBootstrap />
      </Suspense>
      <ContratosClient
        contratos={contratos}
        userDocs={userDocs}
        userId={user.id}
        userEmail={emailNorm}
      />
    </div>
  )
}

async function fetchUserDocs(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data } = await supabase
    .from('user_documents')
    .select('id,doc_key,file_name,status,uploaded_at,notes')
    .eq('user_id', userId)
  return data ?? []
}
