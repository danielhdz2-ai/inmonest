import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail, emailGestoriaCliente, ADMIN_EMAIL } from '@/lib/email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESEND_API = 'https://api.resend.com/emails'
const NOTIFY_TO = 'info@inmonest.com'

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { service_key, service_name, price_eur, client_name, client_email, client_phone, notes } = body

  if (!service_key?.trim() || !service_name?.trim() || !price_eur) {
    return NextResponse.json({ error: 'Servicio inválido' }, { status: 400 })
  }
  if (!client_name?.trim()) {
    return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 422 })
  }
  if (!client_email?.trim() || !EMAIL_RE.test(client_email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const supabase = await createClient()

  // Obtener usuario autenticado si existe
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('gestoria_requests').insert({
    service_key:  service_key.trim(),
    service_name: service_name.trim(),
    price_eur:    parseInt(String(price_eur), 10),
    client_name:  client_name.trim().slice(0, 120),
    client_email: client_email.trim().toLowerCase().slice(0, 200),
    client_phone: client_phone?.trim().slice(0, 30) || null,
    notes:        notes?.trim().slice(0, 1000) || null,
    status:       'pending',
    ...(user?.id ? { user_id: user.id } : {}),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // ── Email de confirmación al cliente ──────────────────────────────────────
  sendEmail({
    to: client_email.trim().toLowerCase(),
    subject: `✅ Solicitud recibida — ${service_name.trim()} · Inmonest`,
    html: emailGestoriaCliente(client_name.trim(), service_name.trim(), parseInt(String(price_eur), 10)),
  }).catch(() => { /* no crítico */ })

  // ── Enviar email de notificación a info@inmonest.com ──────────────────────
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (RESEND_KEY) {
    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const safeName   = client_name.trim().replace(/</g, '&lt;')
    const safeEmail  = client_email.trim().replace(/</g, '&lt;')
    const safePhone  = (client_phone ?? '—').replace(/</g, '&lt;')
    const safeNotes  = (notes ?? '—').replace(/</g, '&lt;')
    const safeService = service_name.trim().replace(/</g, '&lt;')

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;padding:24px">
        <div style="background:linear-gradient(to right,#7a5c1e,#c9962a);border-radius:12px;padding:20px 24px;margin-bottom:24px">
          <h2 style="color:#fff;margin:0">📋 Nueva solicitud de gestoría</h2>
          <p style="color:#ffedd5;margin:4px 0 0">${safeService} — Inmonest</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555;width:35%">Nombre</td>
            <td style="padding:10px 14px">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Email</td>
            <td style="padding:10px 14px"><a href="mailto:${safeEmail}" style="color:#c9962a">${safeEmail}</a></td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555">Teléfono</td>
            <td style="padding:10px 14px">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Servicio</td>
            <td style="padding:10px 14px">${safeService}</td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555">Precio</td>
            <td style="padding:10px 14px"><strong>${price_eur} €</strong></td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:600;color:#555">Notas</td>
            <td style="padding:10px 14px;white-space:pre-wrap">${safeNotes}</td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:10px 14px;font-weight:600;color:#555">Fecha</td>
            <td style="padding:10px 14px">${fecha}</td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#fffbeb;border-left:4px solid #c9962a;border-radius:0 8px 8px 0">
          <p style="margin:0;font-size:13px;color:#92400e">
            <strong>Acción requerida:</strong> Contactar al cliente en menos de 24 horas para confirmar detalles y proceder al pago.
          </p>
        </div>
        <p style="font-size:11px;color:#9ca3af;margin-top:20px">
          Solicitud recibida desde inmonest.com · ${fecha}
        </p>
      </div>
    `

    try {
      await fetch(RESEND_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? 'Inmonest Gestoría <info@inmonest.com>',
          to: [NOTIFY_TO],
          reply_to: safeEmail,
          subject: `📋 Nueva solicitud — ${safeService} · ${safeName}`,
          html,
        }),
      })
    } catch {
      // No crítico: la solicitud ya está guardada en BD
    }
  }

  return NextResponse.json({ ok: true })
}
