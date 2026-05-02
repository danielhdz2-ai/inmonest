import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail, emailAcuseRecibo } from '@/lib/email'

const RESEND_API = 'https://api.resend.com/emails'

export async function POST(req: NextRequest) {
  let body: { nombre?: string; empresa?: string; email?: string; telefono?: string; mensaje?: string; plan?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { nombre, empresa, email, plan, telefono, mensaje } = body

  if (!nombre || !empresa || !email) {
    return NextResponse.json({ error: 'nombre, empresa y email son obligatorios' }, { status: 400 })
  }

  // Validación básica de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const safeNombre  = nombre.slice(0, 100)
  const safeEmpresa = empresa.slice(0, 100)
  const safeEmail   = email.slice(0, 200)
  const safeTel     = telefono?.slice(0, 20) ?? '—'
  const safePlan    = plan ?? 'premium'
  const safeMensaje = mensaje?.slice(0, 1000) ?? ''

  const supabase = await createClient()

  const { error } = await supabase.from('agency_leads').insert({
    nombre: safeNombre,
    empresa: safeEmpresa,
    email: safeEmail,
    telefono: telefono?.slice(0, 20) ?? null,
    plan: safePlan,
    mensaje: safeMensaje || null,
  })

  if (error) {
    // Si la tabla no existe aún, responder de todas formas con éxito
    // para no romper el UX (la tabla se crea con la migración)
    console.error('agency_leads insert error:', error.message)
  }

  // ── Notificación por email ─────────────────────────────────────────────
  const RESEND_KEY   = process.env.RESEND_API_KEY
  const FROM_EMAIL   = process.env.CONTACT_FROM_EMAIL   ?? 'Inmonest <info@inmonest.com>'
  const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? 'info@inmonest.com'

  if (RESEND_KEY) {
    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const planLabel = safePlan === 'premium' ? 'Premium' : safePlan === 'basico' ? 'Básico' : safePlan

    const notifyPayload = {
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      reply_to: safeEmail,
      subject: `🏢 Nueva agencia interesada — ${safeEmpresa} (${planLabel})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#c9962a;margin-bottom:4px">Nueva agencia interesada</h2>
          <p style="color:#888;font-size:13px;margin-top:0">${fecha}</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:16px">
            <tr><td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9;width:120px">Nombre</td><td style="padding:8px 12px;background:#f9f9f9">${safeNombre}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#555">Empresa</td><td style="padding:8px 12px">${safeEmpresa}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9">Email</td><td style="padding:8px 12px;background:#f9f9f9"><a href="mailto:${safeEmail}" style="color:#c9962a">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#555">Teléfono</td><td style="padding:8px 12px">${safeTel}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9">Plan</td><td style="padding:8px 12px;background:#f9f9f9"><strong>${planLabel}</strong></td></tr>
            ${safeMensaje ? `<tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top">Mensaje</td><td style="padding:8px 12px;white-space:pre-wrap">${safeMensaje}</td></tr>` : ''}
          </table>
          <p style="margin-top:24px;font-size:12px;color:#aaa">Formulario de agencias — <a href="https://inmonest.com/agencias" style="color:#c9962a">inmonest.com/agencias</a></p>
        </div>
      `,
    }

    fetch(RESEND_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(notifyPayload),
    }).catch(err => console.error('[agencias/contacto] Resend error:', err))
  }

  // Acuse de recibo a la agencia
  sendEmail({
    to: safeEmail,
    subject: '✅ Hemos recibido tu solicitud — Inmonest para Agencias',
    html: emailAcuseRecibo(safeNombre, 'agencia'),
  }).catch(() => { /* no crítico */ })

  return NextResponse.json({ ok: true })
}
