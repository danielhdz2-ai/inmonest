import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { notifyClientContractReady } from '@/lib/gestoria-client-emails'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmails = [process.env.CONTACT_NOTIFY_EMAIL, 'daniel.hdz.trader@gmail.com'].filter(Boolean)
  return adminEmails.includes(user.email)
}

// POST: subir contrato PDF y guardar ruta en gestoria_requests
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const formData  = await req.formData()
  const requestId = formData.get('request_id') as string
  const file      = formData.get('file') as File | null

  if (!requestId || !file) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const { data: record } = await supabase
    .from('gestoria_requests')
    .select('session_id')
    .eq('id', requestId)
    .single()

  if (!record) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })

  const path = `${record.session_id}/contrato.pdf`
  const arrayBuffer = await file.arrayBuffer()

  const { error: uploadErr } = await supabase
    .storage
    .from('gestoria-docs')
    .upload(path, arrayBuffer, { contentType: 'application/pdf', upsert: true })

  if (uploadErr) {
    return NextResponse.json({ error: uploadErr.message }, { status: 500 })
  }

  const deliveredAt = new Date().toISOString()
  const { error: updateErr } = await supabase
    .from('gestoria_requests')
    .update({ contract_path: path, step: 4, contract_delivered_at: deliveredAt })
    .eq('id', requestId)

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 })
  }

  const { data: fullRecord } = await supabase
    .from('gestoria_requests')
    .select('client_email, client_name, service_name, service_key')
    .eq('id', requestId)
    .single()

  if (fullRecord?.client_email) {
    const serviceName =
      fullRecord.service_name?.trim() ||
      fullRecord.service_key.replace(/-/g, ' ')
    void notifyClientContractReady({
      to: fullRecord.client_email,
      clientName: fullRecord.client_name,
      serviceName,
    })
  }

  return NextResponse.json({ ok: true, path })
}
