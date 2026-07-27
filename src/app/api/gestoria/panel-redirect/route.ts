import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { buildGestoriaPanelUrl, isPaidStatus } from '@/lib/gestoria-leads'

export const dynamic = 'force-dynamic'

/** Tras login: lleva al panel de gestoría si hay un servicio pagado activo */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ url: null }, { status: 401 })
  }

  const { data: contratos } = await supabase
    .from('gestoria_requests')
    .select('id, status, paid_at, step, contract_path')
    .or(`client_email.eq.${user.email},user_id.eq.${user.id}`)
    .order('paid_at', { ascending: false })
    .limit(5)

  const activePaid = (contratos ?? []).find(
    (c) => isPaidStatus(c.status, c.paid_at) && !c.contract_path && (c.step ?? 1) < 4,
  )

  if (!activePaid) {
    return NextResponse.json({ url: null })
  }

  return NextResponse.json({
    url: buildGestoriaPanelUrl({ pago: true }),
  })
}
