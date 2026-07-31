import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  ensureOrderPaidFromStripe,
  fetchGestoriaOrdersForUser,
  fetchGestoriaOrdersForUserSafe,
} from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'
import GestoriaPortalClientSuspense from '@/components/gestoria-portal/GestoriaPortalClientSuspense'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

/**
 * Panel de gestoría del cliente.
 * Flujo simple: si hay session_id de Stripe, vincula el pedido y muestra el expediente.
 */
export default async function ContratosPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; session_id?: string; v?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    const q = new URLSearchParams()
    if (params.session_id) q.set('session_id', params.session_id)
    q.set('v', params.v || 'expediente')
    redirect(`/login?next=${encodeURIComponent(`/mi-cuenta/contratos?${q.toString()}`)}`)
  }

  const emailNorm = user.email.trim().toLowerCase()
  const sessionId = params.session_id?.startsWith('cs_') ? params.session_id : null

  let contratos: Awaited<ReturnType<typeof fetchGestoriaOrdersForUser>> = []
  let userDocs: Awaited<ReturnType<typeof fetchUserDocsSafe>> = []

  try {
    const admin = createAdminClient()

    // Si venimos del pago, verificar directo con Stripe (sin auto-llamada HTTP)
    if (sessionId) {
      await ensureOrderPaidFromStripe(admin, sessionId, user.id)
    }

    // fetchGestoriaOrdersForUser ya vincula el pedido (email + session) antes de leerlo
    ;[contratos, userDocs] = await Promise.all([
      fetchGestoriaOrdersForUser(admin, user.id, emailNorm, sessionId),
      fetchUserDocsSafe(supabase, user.id),
    ])
  } catch (err) {
    console.error('[contratos/page] fallo con admin client, usando fallback RLS', err)
    try {
      contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
    } catch (err2) {
      console.error('[contratos/page] fallback de contratos también falló', err2)
      contratos = []
    }
    try {
      userDocs = await fetchUserDocsSafe(supabase, user.id)
    } catch (err3) {
      console.error('[contratos/page] fallback de docs también falló', err3)
      userDocs = []
    }
  }

  // Nunca expulsar si venimos de un pago (session_id) o ya hay pedidos
  if (contratos.length === 0 && !sessionId) {
    redirect('/gestoria/acceso-cliente')
  }

  let profile: { full_name: string | null } | null = null
  try {
    const res = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .maybeSingle()
    profile = res.data
  } catch (err) {
    console.error('[contratos/page] fallo leyendo perfil', err)
  }

  const displayName =
    profile?.full_name?.trim() ||
    contratos[0]?.client_name?.trim() ||
    user.email.split('@')[0] ||
    'Cliente'

  return (
    <GestoriaPortalClientSuspense
      contratos={contratos}
      userDocs={userDocs}
      userEmail={emailNorm}
      displayName={displayName}
      initialSessionId={sessionId}
    />
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
