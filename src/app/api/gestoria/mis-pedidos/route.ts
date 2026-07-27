import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'
import { GESTORIA_ORDER_SELECT } from '@/lib/gestoria-portal-types'

export const dynamic = 'force-dynamic'

async function fetchWithUserClient(
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

/** Pedidos de gestoría del usuario (vincula por email + bypass RLS si hay service role) */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const emailNorm = user.email.trim().toLowerCase()
  let contratos: Awaited<ReturnType<typeof fetchGestoriaOrdersForUser>> = []

  try {
    const admin = createAdminClient()
    contratos = await fetchGestoriaOrdersForUser(admin, user.id, emailNorm)
  } catch (err) {
    console.error('[gestoria/mis-pedidos] admin fallback:', err)
    contratos = await fetchWithUserClient(supabase, user.id, emailNorm)
  }

  const { data: userDocs } = await supabase
    .from('user_documents')
    .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
    .eq('user_id', user.id)

  return NextResponse.json({ contratos, userDocs: userDocs ?? [] })
}
