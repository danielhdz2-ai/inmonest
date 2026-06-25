import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripeKey } from '@/lib/stripe-key'

export const dynamic = 'force-dynamic'

interface StripeSession {
  payment_status: string
}

async function verifyPaidSession(session_id: string): Promise<boolean> {
  const key = getStripeKey()
  if (!key) return false

  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    const session = await res.json() as StripeSession
    return res.ok && session.payment_status === 'paid'
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  let body: { session_id?: string; doc_key?: string; file_name?: string; storage_path?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { session_id, doc_key, file_name, storage_path } = body

  if (!session_id?.startsWith('cs_') || !doc_key || !file_name || !storage_path) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  if (!(await verifyPaidSession(session_id))) {
    return NextResponse.json({ error: 'Pago no verificado' }, { status: 402 })
  }

  const supabase = createAdminClient()

  const { data: request } = await supabase
    .from('gestoria_requests')
    .select('id')
    .eq('session_id', session_id)
    .maybeSingle()

  if (!request) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  }

  const { data: existing } = await supabase
    .from('client_docs')
    .select('id')
    .eq('request_id', request.id)
    .eq('doc_key', doc_key)
    .maybeSingle()

  const docData = {
    request_id: request.id,
    session_id,
    doc_key,
    file_name,
    storage_path,
    uploaded_at: new Date().toISOString(),
  }

  const { error } = existing
    ? await supabase.from('client_docs').update(docData).eq('id', existing.id)
    : await supabase.from('client_docs').insert(docData)

  if (error) {
    console.error('[gestoria/register-doc] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await supabase
    .from('gestoria_requests')
    .update({ step: 2 })
    .eq('id', request.id)
    .lt('step', 2)

  return NextResponse.json({ ok: true })
}
