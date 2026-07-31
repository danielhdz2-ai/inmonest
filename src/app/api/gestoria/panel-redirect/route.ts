import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildGestoriaPanelUrl } from '@/lib/gestoria-leads'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'

export const dynamic = 'force-dynamic'

/**
 * Tras login: si este email tiene algún pedido de gestoría (pagado, pendiente
 * o lead), siempre lleva a su panel de gestoría — nunca al portal de anuncios.
 */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ url: null }, { status: 401 })
  }

  try {
    const admin = createAdminClient()
    const contratos = await fetchGestoriaOrdersForUser(admin, user.id, user.email)

    if (contratos.length === 0) {
      return NextResponse.json({ url: null })
    }

    return NextResponse.json({
      url: buildGestoriaPanelUrl(),
    })
  } catch (err) {
    console.error('[gestoria/panel-redirect]', err)
    return NextResponse.json({ url: null })
  }
}
