import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchGestoriaActivity, activityIcon } from '@/lib/gestoria-activity'
import { buildTimelineDates, WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const requestId = req.nextUrl.searchParams.get('request_id')
  if (!requestId) {
    return NextResponse.json({ error: 'Falta request_id' }, { status: 400 })
  }

  const admin = createAdminClient()
  const emailNorm = user.email.trim().toLowerCase()

  const { data: order } = await admin
    .from('gestoria_requests')
    .select('id, service_key, service_name, paid_at, step, contract_path, contract_delivered_at, expected_delivery_date, client_email, user_id')
    .eq('id', requestId)
    .maybeSingle()

  if (!order) {
    return NextResponse.json({ error: 'Expediente no encontrado' }, { status: 404 })
  }

  const ownsOrder =
    order.user_id === user.id ||
    (order.client_email?.trim().toLowerCase() === emailNorm)

  if (!ownsOrder) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { data: userDocs } = await supabase
    .from('user_documents')
    .select('doc_key, file_name, status, uploaded_at, gestoria_request_id, partes_data')
    .eq('user_id', user.id)
    .eq('gestoria_request_id', requestId)

  const workflow = buildTimelineDates(order, userDocs ?? []).map((t) => ({
    kind: 'workflow' as const,
    step: t.step,
    label: t.label,
    date: t.date,
    icon: WORKFLOW_STEPS.find((s) => s.n === t.step)?.icon ?? '•',
  }))

  const activity = await fetchGestoriaActivity(requestId)
  const events = activity.map((a) => ({
    kind: 'activity' as const,
    id: a.id,
    type: a.activity_type,
    description: a.description,
    date: a.created_at,
    icon: activityIcon(a.activity_type),
    createdBy: a.created_by,
  }))

  const merged = [
    ...workflow.filter((w) => w.date).map((w) => ({
      id: `step-${w.step}`,
      kind: 'workflow' as const,
      label: w.label,
      description: `Paso ${w.step}/4 completado`,
      date: w.date!,
      icon: w.icon,
    })),
    ...events.map((e) => ({
      id: e.id,
      kind: 'activity' as const,
      label: e.description,
      description: e.type,
      date: e.date,
      icon: e.icon,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return NextResponse.json({ timeline: merged })
}
