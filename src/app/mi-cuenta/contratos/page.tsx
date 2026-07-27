import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'
import GestoriaPortalClient from '@/components/gestoria-portal/GestoriaPortalClient'
import GestoriaPanelBootstrap from '@/components/GestoriaPanelBootstrap'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'

export default async function ContratosPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; session_id?: string; v?: string }>
}) {
  const params = await searchParams
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
        .select('id,session_id,service_key,service_name,client_name,client_email,client_phone,amount_eur,status,step,paid_at,contract_path,contract_delivered_at,expected_delivery_date,assigned_to,notes,created_at')
        .or(`client_email.eq.${emailNorm},user_id.eq.${user.id}`)
        .order('created_at', { ascending: false }),
      supabase
        .from('user_documents')
        .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
        .eq('user_id', user.id),
    ])
    contratos = fallbackContratos ?? []
    userDocs = fallbackDocs ?? []
  }

  const isPostPayment =
    params.pago === '1' || (params.session_id?.startsWith('cs_') ?? false)

  if (contratos.length === 0 && !isPostPayment) {
    redirect('/gestoria/acceso-cliente')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name')
    .eq('user_id', user.id)
    .maybeSingle()

  const displayName =
    profile?.full_name?.trim() ||
    contratos[0]?.client_name?.trim() ||
    user.email.split('@')[0] ||
    'Cliente'

  return (
    <>
      <Suspense fallback={null}>
        <GestoriaPanelBootstrap />
      </Suspense>
      <GestoriaPortalClient
        contratos={contratos}
        userDocs={userDocs}
        userEmail={emailNorm}
        displayName={displayName}
      />
    </>
  )
}

async function fetchUserDocs(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data } = await supabase
    .from('user_documents')
    .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
    .eq('user_id', userId)
  return data ?? []
}
