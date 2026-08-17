import { NextRequest, NextResponse } from 'next/server'
import { getNotifyEmails } from '@/lib/email'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission, validateHumanFields } from '@/lib/verify-bot'

const RESEND_API = 'https://api.resend.com/emails'

interface ContactBody {
  nombre?: string
  email?: string
  telefono?: string
  asunto?: string
  mensaje?: string
  _hp?: string
  _ts?: number | string
  turnstile_token?: string
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { nombre, email, telefono, asunto, mensaje } = body

  const ip = getIP(req)
  const botCheck = await verifyBotSubmission(body, ip)
  if (!botCheck.allowed) {
    if (botCheck.isHoneypot) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: botCheck.error }, { status: botCheck.status })
  }

  if (!nombre || !mensaje) {
    return NextResponse.json({ error: 'nombre y mensaje son obligatorios' }, { status: 400 })
  }
  if (!email && !telefono) {
    return NextResponse.json({ error: 'Indica email o teléfono' }, { status: 400 })
  }
  if (email && !validateEmail(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const humanError = validateHumanFields({
    name: nombre,
    phone: telefono ?? '',
    notes: mensaje,
  })
  if (humanError) {
    return NextResponse.json({ error: humanError }, { status: 422 })
  }

  // Truncar entradas para evitar payloads excesivos
  const safeNombre  = nombre.slice(0, 100)
  const safeEmail   = email?.slice(0, 200) ?? ''
  const safeTel     = telefono?.slice(0, 30) ?? '—'
  const safeAsunto  = (asunto ?? 'Consulta general').slice(0, 200)
  const safeMensaje = mensaje.slice(0, 2000)

  const RESEND_KEY   = process.env.RESEND_API_KEY
  const FROM_EMAIL   = process.env.CONTACT_FROM_EMAIL   ?? 'Inmonest <info@inmonest.com>'
  const notifyEmails = getNotifyEmails()

  if (!RESEND_KEY) {
    // Sin clave → solo log (útil en desarrollo)
    console.log('[contact] Nuevo mensaje de contacto:', { nombre: safeNombre, email: safeEmail, asunto: safeAsunto })
    return NextResponse.json({ ok: true })
  }

  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

  // ── Email de notificación interno ─────────────────────────────────────
  const notifyPayload = {
    from: FROM_EMAIL,
    to:   notifyEmails,
    ...(safeEmail ? { reply_to: safeEmail } : {}),
    subject: `📩 Nuevo contacto: ${safeAsunto}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#c9962a;margin-bottom:4px">Nuevo mensaje de contacto</h2>
        <p style="color:#888;font-size:13px;margin-top:0">${fecha}</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:16px">
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9;width:120px">Nombre</td>
            <td style="padding:8px 12px">${safeNombre}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#555">Email</td>
            <td style="padding:8px 12px">${safeEmail ? `<a href="mailto:${safeEmail}" style="color:#c9962a">${safeEmail}</a>` : '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9">Teléfono</td>
            <td style="padding:8px 12px;background:#f9f9f9">${safeTel !== '—' ? `<a href="tel:${safeTel}">${safeTel}</a>` : '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#555">Asunto</td>
            <td style="padding:8px 12px">${safeAsunto}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9;vertical-align:top">Mensaje</td>
            <td style="padding:8px 12px;background:#f9f9f9;white-space:pre-wrap">${safeMensaje}</td>
          </tr>
        </table>
        <p style="margin-top:24px;font-size:12px;color:#aaa">
          Recibido a través del formulario de contacto de <a href="https://inmonest.com" style="color:#c9962a">inmonest.com</a>
        </p>
      </div>
    `,
  }

  // ── Auto-respuesta al remitente (solo si hay email real) ───────────────
  const autoReplyPayload = safeEmail
    ? {
        from: FROM_EMAIL,
        to:   [safeEmail],
        subject: 'Hemos recibido tu mensaje — Inmonest',
        html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#c9962a">Hola, ${safeNombre}</h2>
        <p style="font-size:15px;color:#333;line-height:1.6">
          Hemos recibido tu mensaje y te responderemos en menos de <strong>24 horas</strong>.
        </p>
        <div style="background:#f9f9f9;border-left:4px solid #c9962a;padding:12px 16px;margin:24px 0;font-size:14px;color:#555">
          <strong>Tu consulta:</strong><br/>
          <span style="white-space:pre-wrap">${safeMensaje}</span>
        </div>
        <p style="font-size:13px;color:#888">
          Si tienes alguna urgencia puedes responder directamente a este correo o escribirnos a
          <a href="mailto:info@inmonest.com" style="color:#c9962a">info@inmonest.com</a>
          o al <a href="tel:+34745022862" style="color:#c9962a">745 022 862</a>.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:32px 0"/>
        <p style="font-size:12px;color:#aaa;text-align:center">
          <a href="https://inmonest.com" style="color:#c9962a;text-decoration:none">inmonest.com</a>
        </p>
      </div>
    `,
      }
    : null

  try {
    const jobs: Promise<Response>[] = [
      fetch(RESEND_API, {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyPayload),
      }),
    ]
    if (autoReplyPayload) {
      jobs.push(
        fetch(RESEND_API, {
          method: 'POST',
          headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(autoReplyPayload),
        }),
      )
    }
    const results = await Promise.all(jobs)
    if (!results[0].ok) {
      const err = await results[0].text()
      console.error('[contact] Resend notificación error:', err)
    }
    if (results[1] && !results[1].ok) {
      const err = await results[1].text()
      console.error('[contact] Resend auto-reply error:', err)
    }
  } catch (err) {
    console.error('[contact] Error enviando emails:', err)
    // No fallar la respuesta al usuario por un error de email
  }

  return NextResponse.json({ ok: true })
}
