import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
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
  let contratos: Awaited<ReturnType<typeof fetchContratos>> = []
  let userDocs: Awaited<ReturnType<typeof fetchUserDocs>> = []

  try {
    const admin = createAdminClient()

    // Vincular pedidos del mismo email (pago Stripe sin sesión o email distinto en mayúsculas)
    await admin
      .from('gestoria_requests')
      .update({ user_id: user.id })
      .ilike('client_email', emailNorm)
      .is('user_id', null)

    ;[contratos, userDocs] = await Promise.all([
      fetchContratos(admin, user.id, emailNorm),
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
        contratos={contratos}
        userDocs={userDocs}
        userId={user.id}
        userEmail={emailNorm}
      />
    </div>
  )
}

async function fetchContratos(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  emailNorm: string,
) {
  const { data, error } = await admin
    .from('gestoria_requests')
    .select('id,session_id,service_key,service_name,client_name,client_email,amount_eur,status,step,paid_at,contract_path,created_at')
    .or(`client_email.eq.${emailNorm},user_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
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
