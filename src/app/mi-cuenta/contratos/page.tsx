import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'
import { GESTORIA_ORDER_SELECT } from '@/lib/gestoria-portal-types'
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
    contratos = await fetchContratosFallback(supabase, user.id, emailNorm)
    const { data: fallbackDocs } = await supabase
      .from('user_documents')
      .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
      .eq('user_id', user.id)
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

async function fetchContratosFallback(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  emailNorm: string,
) {
  const { data: byUser } = await supabase
    .from('gestoria_requests')
    .select(GESTORIA_ORDER_SELECT)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if ((byUser ?? []).length > 0) return byUser ?? []

  const { data: byEmail } = await supabase
    .from('gestoria_requests')
    .select(GESTORIA_ORDER_SELECT)
    .ilike('client_email', emailNorm)
    .order('created_at', { ascending: false })

  return byEmail ?? []
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
