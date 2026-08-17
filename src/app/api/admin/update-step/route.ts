import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { notifyClientStepChange } from '@/lib/gestoria-client-emails'
import { logGestoriaActivity } from '@/lib/gestoria-activity'
import { WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  return isAdminEmail(user.email)
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { data: { user: adminUser } } = await supabase.auth.getUser()
  const body = await req.json()
  const { request_id, step, admin_notes } = body

  if (!request_id || !step) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const { data: before } = await supabase
    .from('gestoria_requests')
    .select('step, client_email, client_name, service_name, service_key, user_id')
    .eq('id', request_id)
    .maybeSingle()

  const updateData: Record<string, unknown> = { step }
  if (admin_notes !== undefined) updateData.admin_notes = admin_notes

  const { error } = await supabase
    .from('gestoria_requests')
    .update(updateData)
    .eq('id', request_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const stepNum = Number(step)
  const stepLabel = WORKFLOW_STEPS.find((s) => s.n === stepNum)?.label ?? `Paso ${stepNum}`

  if (before && before.step !== stepNum && before.client_email) {
    const serviceName =
      before.service_name?.trim() ||
      before.service_key?.replace(/-/g, ' ') ||
      'Gestoría'

    void notifyClientStepChange({
      to: before.client_email,
      userId: before.user_id,
      clientName: before.client_name,
      serviceName,
      step: stepNum,
      stepLabel,
    })

    void logGestoriaActivity({
      requestId: request_id,
      activityType: 'status_change',
      description: `Expediente actualizado: ${stepLabel}`,
      metadata: { old_step: before.step, new_step: stepNum },
      createdBy: adminUser?.email ?? 'admin',
    })
  }

  return NextResponse.json({ ok: true })
}
