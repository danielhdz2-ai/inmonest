import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { notifyClientDocReceived } from '@/lib/gestoria-client-emails'
import { ADMIN_EMAIL, sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

const PARTES_FIELDS = [
  'parte1_nombre',
  'parte1_dni',
  'parte1_email',
  'parte1_telefono',
  'parte2_nombre',
  'parte2_dni',
  'parte2_email',
  'parte2_telefono',
  'direccion_inmueble',
  'precio',
  'condiciones',
  'notas',
] as const

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const { gestoria_request_id, partes } = body as {
    gestoria_request_id?: string
    partes?: Record<string, string>
  }

  if (!gestoria_request_id || !partes || typeof partes !== 'object') {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  const cleaned: Record<string, string> = {}
  for (const key of PARTES_FIELDS) {
    const value = partes[key]?.trim()
    if (value) cleaned[key] = value
  }

  if (!cleaned.parte1_nombre?.trim() || !cleaned.parte2_nombre?.trim()) {
    return NextResponse.json({ error: 'Indica al menos el nombre de ambas partes' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data: paidRequest } = await admin
    .from('gestoria_requests')
    .select('id, step, service_name, client_name')
    .eq('id', gestoria_request_id)
    .or(`client_email.eq.${user.email},user_id.eq.${user.id}`)
    .not('paid_at', 'is', null)
    .maybeSingle()

  if (!paidRequest) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  }

  const { data: existing } = await supabase
    .from('user_documents')
    .select('id, storage_path')
    .eq('user_id', user.id)
    .eq('gestoria_request_id', gestoria_request_id)
    .eq('doc_key', 'partes')
    .maybeSingle()

  const docPayload = {
    file_name: existing?.storage_path ? existing.storage_path.split('/').pop() ?? 'datos-partes.json' : 'datos-partes.json',
    storage_path: existing?.storage_path ?? `${user.id}/${gestoria_request_id}/partes/datos-partes.json`,
    status: 'uploaded',
    uploaded_at: new Date().toISOString(),
    partes_data: cleaned,
  }

  let data
  let error
  if (existing?.id) {
    ;({ data, error } = await supabase
      .from('user_documents')
      .update(docPayload)
      .eq('id', existing.id)
      .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
      .single())
  } else {
    ;({ data, error } = await supabase
      .from('user_documents')
      .insert({
        user_id: user.id,
        gestoria_request_id,
        doc_key: 'partes',
        ...docPayload,
      })
      .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
      .single())
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if ((paidRequest.step ?? 1) < 2) {
    await admin.from('gestoria_requests').update({ step: 2 }).eq('id', paidRequest.id)
  }

  void notifyClientDocReceived({
    to: user.email,
    clientName: paidRequest.client_name,
    docKey: 'partes',
    serviceName: paidRequest.service_name,
  })

  void sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Inmonest] Datos de partes recibidos — ${user.email}`,
    html: `<p>El usuario <strong>${user.email}</strong> ha enviado los datos de las partes para el pedido <code>${gestoria_request_id}</code>.</p>`,
  })

  return NextResponse.json({ ok: true, doc: data })
}
