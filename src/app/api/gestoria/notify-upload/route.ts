import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getStripeKey } from '@/lib/stripe-key'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

interface StripeSession {
  payment_status: string
  customer_email: string | null
  customer_details?: { email?: string | null }
}

const RESEND_API = 'https://api.resend.com/emails'
const DOCS = ['dni', 'nota-simple', 'escrituras'] as const
const DOC_NAMES: Record<string, string> = {
  'dni': 'DNI (ambas caras)',
  'nota-simple': 'Nota Simple',
  'escrituras': 'Escrituras',
}

export async function POST(req: NextRequest) {
  let body: { session_id?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { session_id } = body
  if (!session_id?.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }

  const key = getStripeKey()
  if (!key) {
    return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 })
  }

  // Verificar pago (fetch nativo, sin SDK)
  let session: StripeSession
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    session = await res.json() as StripeSession
    if (!res.ok) {
      return NextResponse.json({ error: 'Sesión de pago no encontrada' }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ error: 'Error de red al verificar pago' }, { status: 502 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Pago no completado' }, { status: 402 })
  }

  const supabase = getSupabaseAdmin()
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  const clientEmail = session.customer_details?.email ?? session.customer_email ?? 'Desconocido'

  // Registrar documentos en client_docs para que aparezcan en el panel admin
  const { data: request } = await supabase
    .from('gestoria_requests')
    .select('id')
    .eq('session_id', session_id)
    .maybeSingle()

  let registeredCount = 0

  // Generar signed download URLs (7 días) y registrar en BD
  const linkItems: string[] = []
  for (const doc of DOCS) {
    const path = `${session_id}/${doc}.pdf`
    const { data: fileList } = await supabase.storage
      .from('gestoria-docs')
      .list(session_id, { search: `${doc}.pdf` })

    const fileExists = (fileList ?? []).some(f => f.name === `${doc}.pdf`)

    if (request && fileExists) {
      const { data: existing } = await supabase
        .from('client_docs')
        .select('id')
        .eq('request_id', request.id)
        .eq('doc_key', doc)
        .maybeSingle()

      const docData = {
        request_id: request.id,
        session_id,
        doc_key: doc,
        file_name: `${doc}.pdf`,
        storage_path: path,
        uploaded_at: new Date().toISOString(),
      }

      const { error: regError } = existing
        ? await supabase.from('client_docs').update(docData).eq('id', existing.id)
        : await supabase.from('client_docs').insert(docData)

      if (!regError) registeredCount++
    }

    const { data } = await supabase.storage
      .from('gestoria-docs')
      .createSignedUrl(path, 60 * 60 * 24 * 7)
    if (data?.signedUrl) {
      linkItems.push(
        `<li style="margin-bottom:6px"><a href="${data.signedUrl}" style="color:#c9962a">${DOC_NAMES[doc]}</a></li>`
      )
    }
  }

  if (request && registeredCount > 0) {
    await supabase
      .from('gestoria_requests')
      .update({ step: 2 })
      .eq('id', request.id)
      .lt('step', 2)
  }

  const RESEND_KEY = process.env.RESEND_API_KEY
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Inmonest Gestoría <info@inmonest.com>'

  if (RESEND_KEY) {
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;padding:24px">
        <div style="background:linear-gradient(to right,#7a5c1e,#c9962a);border-radius:12px;padding:20px 24px;margin-bottom:24px">
          <h2 style="color:#fff;margin:0">📄 Nueva documentación recibida</h2>
          <p style="color:#ffedd5;margin:4px 0 0">Contrato de Reserva de Compra — Inmonest</p>
        </div>
        <p><strong>Email cliente:</strong> ${clientEmail}</p>
        <p><strong>Sesión Stripe:</strong> <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px">${session_id}</code></p>
        <p><strong>Fecha de subida:</strong> ${fecha}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
        <p style="font-weight:600;margin-bottom:8px">Documentos (enlace de descarga — válidos 7 días):</p>
        <ul style="padding-left:20px">${linkItems.join('')}</ul>
        <p style="font-size:11px;color:#9ca3af;margin-top:24px">
          Los enlaces caducan automáticamente en 7 días. Si necesitas acceso posterior, accede al panel de administración de Supabase Storage.
        </p>
      </div>
    `
    await fetch(RESEND_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ['info@inmonest.com'],
        reply_to: clientEmail !== 'Desconocido' ? clientEmail : undefined,
        subject: `📄 Nueva documentación — Reserva de Compra · ${clientEmail}`,
        html,
      }),
    })
  }

  return NextResponse.json({ ok: true })
}
