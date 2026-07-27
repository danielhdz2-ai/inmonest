import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAllowedDocKey } from '@/lib/gestoria-upload'
import { notifyClientDocReceived } from '@/lib/gestoria-client-emails'
import { ADMIN_EMAIL, sendEmail } from '@/lib/email'
import { getDocMeta } from '@/lib/gestoria-service-docs'

export const dynamic = 'force-dynamic'

async function upsertUserDocument(
  supabase: Awaited<ReturnType<typeof createClient>>,
  payload: Record<string, unknown>,
  userId: string,
  requestId: string,
  docKey: string,
) {
  const { data: existing } = await supabase
    .from('user_documents')
    .select('id')
    .eq('user_id', userId)
    .eq('gestoria_request_id', requestId)
    .eq('doc_key', docKey)
    .maybeSingle()

  if (existing?.id) {
    return supabase
      .from('user_documents')
      .update(payload)
      .eq('id', existing.id)
      .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
      .single()
  }

  return supabase
    .from('user_documents')
    .insert({ user_id: userId, gestoria_request_id: requestId, doc_key: docKey, ...payload })
    .select('id,doc_key,file_name,status,uploaded_at,notes,gestoria_request_id,partes_data')
    .single()
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const { doc_key, file_name, storage_path, gestoria_request_id } = body

  if (!doc_key || !file_name || !storage_path || !gestoria_request_id) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  if (!isAllowedDocKey(doc_key)) {
    return NextResponse.json({ error: 'Tipo de documento no válido' }, { status: 400 })
  }

  if (!storage_path.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: 'Ruta no autorizada' }, { status: 403 })
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

  const { data, error } = await upsertUserDocument(
    supabase,
    {
      file_name,
      storage_path,
      status: 'uploaded',
      uploaded_at: new Date().toISOString(),
      notes: null,
    },
    user.id,
    gestoria_request_id,
    doc_key,
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if ((paidRequest.step ?? 1) < 2) {
    await admin.from('gestoria_requests').update({ step: 2 }).eq('id', paidRequest.id)
  }

  const docLabel = getDocMeta(doc_key)?.label ?? doc_key
  void notifyClientDocReceived({
    to: user.email,
    clientName: paidRequest.client_name,
    docKey: doc_key,
    serviceName: paidRequest.service_name,
  })

  void sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Inmonest] Nuevo documento: ${docLabel} — ${user.email}`,
    html: `<p>El usuario <strong>${user.email}</strong> ha subido <strong>${docLabel}</strong> (${file_name}) para el pedido <code>${gestoria_request_id}</code>.</p>`,
  })

  return NextResponse.json({ ok: true, doc: data })
}
