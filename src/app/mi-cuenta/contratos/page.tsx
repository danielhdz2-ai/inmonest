import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser, fetchGestoriaOrdersForUserSafe, linkGestoriaOrdersToUser } from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'
import GestoriaPortalClientSuspense from '@/components/gestoria-portal/GestoriaPortalClientSuspense'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

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

    // Si venimos del pago, forzar confirmación Stripe → status paid (antes de leer pedidos)
    if (sessionId) {
      try {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://inmonest.com'
        await fetch(
          `${base}/api/gestoria/confirmar-pago?session_id=${encodeURIComponent(sessionId)}`,
          { cache: 'no-store' },
        )
      } catch {
        /* no bloquear el panel */
      }
    }

    // Vincular pago a esta cuenta (email + session)
    await linkGestoriaOrdersToUser(admin, user.id, emailNorm, sessionId)

    ;[contratos, userDocs] = await Promise.all([
      fetchGestoriaOrdersForUser(admin, user.id, emailNorm, sessionId),
      fetchUserDocsSafe(supabase, user.id),
    ])
  } catch (err) {
    console.error('[contratos/page]', err)
    contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
    userDocs = await fetchUserDocsSafe(supabase, user.id)
  }

  // Nunca expulsar si venimos de un pago (session_id) o ya hay pedidos
  if (contratos.length === 0 && !sessionId) {
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
