import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser, fetchGestoriaOrdersForUserSafe } from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'
import GestoriaPortalClientSuspense from '@/components/gestoria-portal/GestoriaPortalClientSuspense'
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
  let userDocs: Awaited<ReturnType<typeof fetchUserDocsSafe>> = []

  try {
    const admin = createAdminClient()
    ;[contratos, userDocs] = await Promise.all([
      fetchGestoriaOrdersForUser(admin, user.id, emailNorm),
      fetchUserDocsSafe(supabase, user.id),
    ])
  } catch (err) {
    console.error('[contratos/page] fetch:', err)
    contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
    userDocs = await fetchUserDocsSafe(supabase, user.id)
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
      <GestoriaPortalClientSuspense
        contratos={contratos}
        userDocs={userDocs}
        userEmail={emailNorm}
        displayName={displayName}
      />
    </>
  )
}

async function fetchUserDocsSafe(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data, error } = await supabase
    .from('user_documents')
    .select(USER_DOCS_SELECT)
    .eq('user_id', userId)

  if (!error) return data ?? []

  const { data: fallback } = await supabase
    .from('user_documents')
    .select(USER_DOCS_SELECT_CORE)
    .eq('user_id', userId)

  return fallback ?? []
}
