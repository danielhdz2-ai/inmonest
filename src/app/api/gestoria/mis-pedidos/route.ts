import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser, fetchGestoriaOrdersForUserSafe } from '@/lib/gestoria-link-user'
import { USER_DOCS_SELECT, USER_DOCS_SELECT_CORE } from '@/lib/gestoria-portal-types'

export const dynamic = 'force-dynamic'

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

/** Pedidos de gestoría del usuario. ?session_id=cs_xxx fuerza vínculo de ese pago. */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const sessionId = req.nextUrl.searchParams.get('session_id')
  const emailNorm = user.email.trim().toLowerCase()
  let contratos: Awaited<ReturnType<typeof fetchGestoriaOrdersForUser>> = []

  try {
    const admin = createAdminClient()
    contratos = await fetchGestoriaOrdersForUser(admin, user.id, emailNorm, sessionId)
  } catch (err) {
    console.error('[gestoria/mis-pedidos] admin fallback:', err)
    try {
      const admin = createAdminClient()
      contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm, admin, sessionId)
    } catch {
      contratos = await fetchGestoriaOrdersForUserSafe(supabase, user.id, emailNorm)
    }
  }

  const userDocs = await fetchUserDocsSafe(supabase, user.id)

  return NextResponse.json({ contratos, userDocs })
}
