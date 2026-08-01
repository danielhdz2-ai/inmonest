import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  ensureOrderPaidFromStripe,
  fetchGestoriaOrdersForUser,
  fetchGestoriaOrdersForUserSafe,
} from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'

export const dynamic = 'force-dynamic'

async function fetchUserDocsSafe(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  try {
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
  } catch {
    return []
  }
}

/** Pedidos de gestoría del usuario. ?session_id=cs_xxx fuerza vínculo de ese pago. */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  let user: { id: string; email?: string | null } | null = null

  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    console.error('[gestoria/mis-pedidos] getUser:', err)
    return NextResponse.json({ error: 'Error de sesión' }, { status: 500 })
  }

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const sessionId = req.nextUrl.searchParams.get('session_id')
  const emailNorm = user.email.trim().toLowerCase()
  let contratos: Awaited<ReturnType<typeof fetchGestoriaOrdersForUser>> = []

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
    if (sessionId?.startsWith('cs_')) {
      await ensureOrderPaidFromStripe(admin, sessionId, user.id)
    }
    contratos = await fetchGestoriaOrdersForUser(admin, user.id, emailNorm, sessionId)
  } catch (err) {
    console.error('[gestoria/mis-pedidos] admin fallback:', err)
    try {
      const admin = createAdminClient()
      contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm, admin, sessionId)
    } catch {
      try {
        contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
      } catch {
        contratos = []
      }
    }
  }

  const userDocs = await fetchUserDocsSafe(supabase, user.id)

  const displayName =
    profile?.full_name?.trim() ||
    contratos[0]?.client_name?.trim() ||
    user.email.split('@')[0] ||
    'Cliente'

  const phone = profile?.phone?.trim() || contratos[0]?.client_phone?.trim() || ''

  return NextResponse.json({
    contratos,
    userDocs,
    userEmail: emailNorm,
    displayName,
    phone,
  })
}
