import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'

export const dynamic = 'force-dynamic'

/** Pedidos de gestoría del usuario (vincula por email + bypass RLS) */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  try {
    const admin = createAdminClient()
    const contratos = await fetchGestoriaOrdersForUser(admin, user.id, user.email)

    const { data: userDocs } = await supabase
      .from('user_documents')
      .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
      .eq('user_id', user.id)

    return NextResponse.json({ contratos, userDocs: userDocs ?? [] })
  } catch (err) {
    console.error('[gestoria/mis-pedidos]', err)
    return NextResponse.json({ error: 'No se pudieron cargar los pedidos' }, { status: 500 })
  }
}
