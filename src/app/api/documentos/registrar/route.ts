import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const { doc_key, file_name, storage_path } = body

  if (!doc_key || !file_name || !storage_path) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  // Verificar que el storage_path pertenece al usuario
  if (!storage_path.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: 'Ruta no autorizada' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('user_documents')
    .upsert({
      user_id:      user.id,
      doc_key,
      file_name,
      storage_path,
      status:       'uploaded',
      uploaded_at:  new Date().toISOString(),
    }, { onConflict: 'user_id,doc_key' })
    .select('id,doc_key,file_name,status,uploaded_at,notes')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Notificar al admin
  const adminEmail = process.env.CONTACT_NOTIFY_EMAIL
  if (adminEmail) {
    const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({
        from:    'Inmonest <noreply@inmonest.com>',
        to:      adminEmail,
        subject: `[Inmonest] Nuevo documento: ${doc_key} - ${user.email}`,
        html:    `<p>El usuario <strong>${user.email}</strong> ha subido el documento <strong>${doc_key}</strong> (${file_name}).</p><p>Revisa en el panel de admin.</p>`,
      }),
    }).catch(() => null)
  }

  return NextResponse.json({ ok: true, doc: data })
}
