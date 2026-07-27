import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildGestoriaPanelUrl, isPaidStatus } from '@/lib/gestoria-leads'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'

export const dynamic = 'force-dynamic'

/** Tras login: lleva al panel de gestoría si hay un servicio pagado activo */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ url: null }, { status: 401 })
  }

  try {
    const admin = createAdminClient()
    const contratos = await fetchGestoriaOrdersForUser(admin, user.id, user.email)

    const activePaid = contratos.find(
      (c) => isPaidStatus(c.status, c.paid_at) && !c.contract_path && (c.step ?? 1) < 4,
    )

    if (!activePaid) {
      return NextResponse.json({ url: null })
    }

    return NextResponse.json({
      url: buildGestoriaPanelUrl({ pago: true }),
    })
  } catch (err) {
    console.error('[gestoria/panel-redirect]', err)
    return NextResponse.json({ url: null })
  }
}
