import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getNotifyEmails } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const { session_id, doc_key, file_name, storage_path } = body

  if (!session_id || !doc_key || !file_name || !storage_path) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  // Verificar que la sesión pertenece al usuario (por email o user_id)
  const { data: record } = await supabase
    .from('gestoria_requests')
    .select('id')
    .eq('session_id', session_id)
    .or(`client_email.eq.${user.email},user_id.eq.${user.id}`)
    .single()

  if (!record) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const adminSupabase = createAdminClient()

  const { data: existing } = await adminSupabase
    .from('client_docs')
    .select('id')
    .eq('request_id', record.id)
    .eq('doc_key', doc_key)
    .maybeSingle()

  const docData = {
    request_id: record.id,
    session_id,
    doc_key,
    file_name,
    storage_path,
    uploaded_at: new Date().toISOString(),
  }

  const { error } = existing
    ? await adminSupabase.from('client_docs').update(docData).eq('id', existing.id)
    : await adminSupabase.from('client_docs').insert(docData)

  if (error) {
    console.error('[register-doc] error:', error)
  } else {
    await adminSupabase
      .from('gestoria_requests')
      .update({ step: 2 })
      .eq('id', record.id)
      .lt('step', 2)
  }

  // Notificar al admin
  const notifyEmails = getNotifyEmails()
  const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
  if (RESEND_KEY) {
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({
        from:    'Inmonest <noreply@inmonest.com>',
        to:      notifyEmails,
        subject: `[Inmonest] Nuevo documento subido: ${doc_key}`,
        html:    `<p><strong>${user.email}</strong> ha subido el documento <strong>${doc_key}</strong> (${file_name}) para la sesión <code>${session_id}</code>.</p>`,
      }),
    }).catch(() => null)
  }

  return NextResponse.json({ ok: true })
}
