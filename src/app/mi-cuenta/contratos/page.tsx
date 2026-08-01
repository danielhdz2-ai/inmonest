import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  ensureOrderPaidFromStripe,
  fetchGestoriaOrdersForUser,
  fetchGestoriaOrdersForUserSafe,
} from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import GestoriaPortalClientSuspense from '@/components/gestoria-portal/GestoriaPortalClientSuspense'
import PortalContratosComprar from '@/components/gestoria-portal/PortalContratosComprar'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const maxDuration = 30
export const revalidate = 0

/**
 * Panel de gestoría del cliente.
 * Si no hay pedidos: catálogo + pago Stripe. Si hay pedidos: panel completo.
 */
export default async function ContratosPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; session_id?: string; v?: string }>
}) {
  let params: { pago?: string; session_id?: string; v?: string } = {}
  try {
    params = await searchParams
  } catch {
    params = {}
  }

  const supabase = await createClient()
  let user: { id: string; email?: string | null } | null = null

  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    console.error('[contratos/page] getUser falló', err)
  }

  if (!user?.email) {
    const q = new URLSearchParams()
    if (params.session_id) q.set('session_id', params.session_id)
    q.set('v', params.v || 'expediente')
    redirect(`/login?next=${encodeURIComponent(`/mi-cuenta/contratos?${q.toString()}`)}`)
  }

  const emailNorm = user.email.trim().toLowerCase()
  const sessionId = params.session_id?.startsWith('cs_') ? params.session_id : null

  let contratos: GestoriaContrato[] = []
  let userDocs: GestoriaUserDoc[] = []
  let displayName = user.email.split('@')[0] || 'Cliente'
  let phone = ''

  try {
    let profile: { full_name: string | null; phone: string | null } | null = null
    try {
      const res = await supabase
        .from('user_profiles')
        .select('full_name, phone')
        .eq('user_id', user.id)
        .maybeSingle()
      profile = res.data
    } catch {
      /* ok */
    }

    try {
      const admin = createAdminClient()
      if (sessionId) {
        await ensureOrderPaidFromStripe(admin, sessionId, user.id)
      }
      ;[contratos, userDocs] = await Promise.all([
        fetchGestoriaOrdersForUser(admin, user.id, emailNorm, sessionId),
        fetchUserDocsSafe(supabase, user.id),
      ])
    } catch (err) {
      console.error('[contratos/page] admin path falló, usando fallback RLS', err)
      try {
        contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
      } catch {
        contratos = []
      }
      try {
        userDocs = await fetchUserDocsSafe(supabase, user.id)
      } catch {
        userDocs = []
      }
    }

    displayName =
      profile?.full_name?.trim() ||
      contratos[0]?.client_name?.trim() ||
      displayName

    phone = profile?.phone?.trim() || contratos[0]?.client_phone?.trim() || ''
  } catch (err) {
    console.error('[contratos/page] error general, mostrando catálogo', err)
    contratos = []
    userDocs = []
  }

  // Sin pedidos: catálogo directo (un clic → Stripe)
  if (contratos.length === 0 && !sessionId) {
    return (
      <PortalContratosComprar
        userEmail={emailNorm}
        displayName={displayName}
        initialPhone={phone}
      />
    )
  }

  return (
    <GestoriaPortalClientSuspense
      contratos={contratos}
      userDocs={userDocs}
      userEmail={emailNorm}
      displayName={displayName}
      initialSessionId={sessionId}
      initialPhone={phone}
    />
  )
}

async function fetchUserDocsSafe(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<GestoriaUserDoc[]> {
  try {
    const { data, error } = await supabase
      .from('user_documents')
      .select(USER_DOCS_SELECT)
      .eq('user_id', userId)

    if (!error) return (data ?? []) as GestoriaUserDoc[]

    const { data: fallback } = await supabase
      .from('user_documents')
      .select(USER_DOCS_SELECT_CORE)
      .eq('user_id', userId)

    return (fallback ?? []) as GestoriaUserDoc[]
  } catch {
    return []
  }
}
