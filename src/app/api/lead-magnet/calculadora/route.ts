import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, baseLayout, getNotifyEmails } from '@/lib/email'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission } from '@/lib/verify-bot'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatEur(value: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export async function POST(req: NextRequest) {
  let body: {
    email?: string
    precioVenta?: number
    ahorroCalculado?: number
    comisionAgencia?: number
    costoInmonest?: number
    source?: string
    _hp?: string
    _ts?: number | string
    turnstile_token?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const ip = getIP(req)
  const botCheck = await verifyBotSubmission(body, ip)
  if (!botCheck.allowed) {
    if (botCheck.isHoneypot) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: botCheck.error }, { status: botCheck.status })
  }

  const email = body.email?.trim().toLowerCase() ?? ''
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const precioVenta = Number(body.precioVenta)
  const ahorroCalculado = Number(body.ahorroCalculado)
  const comisionAgencia = Number(body.comisionAgencia)
  const costoInmonest = Number(body.costoInmonest)

  if (!Number.isFinite(precioVenta) || precioVenta < 10_000) {
    return NextResponse.json({ error: 'Precio de venta inválido' }, { status: 422 })
  }
  if (!Number.isFinite(ahorroCalculado) || ahorroCalculado < 0) {
    return NextResponse.json({ error: 'Cálculo inválido' }, { status: 422 })
  }

  const source = body.source?.trim().slice(0, 80) || 'calculadora_ahorro'
  const comision = Number.isFinite(comisionAgencia) ? comisionAgencia : precioVenta * 0.04
  const costo = Number.isFinite(costoInmonest) ? costoInmonest : 687
  const pct = comision > 0 ? Math.round((ahorroCalculado / comision) * 100) : 0

  const userHtml = baseLayout(`
    <h1 style="margin:0 0 16px;font-size:22px;color:#111">Tu informe de ahorro al vender sin agencia</h1>
    <p style="color:#444;line-height:1.6;margin:0 0 20px">
      Has calculado cuánto puedes ahorrar vendiendo tu piso sin pagar comisión de agencia inmobiliaria.
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
      <tr>
        <td style="padding:10px 12px;background:#f9fafb;font-weight:600;color:#555">Precio de venta</td>
        <td style="padding:10px 12px">${formatEur(precioVenta)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;font-weight:600;color:#555">Comisión agencia (~4%)</td>
        <td style="padding:10px 12px;color:#dc2626">${formatEur(comision)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#f9fafb;font-weight:600;color:#555">Servicio Inmonest (venta completa)</td>
        <td style="padding:10px 12px;color:#16a34a">${formatEur(costo)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;font-weight:700;color:#111">Ahorro estimado</td>
        <td style="padding:10px 12px;font-weight:700;color:#c9962a;font-size:18px">${formatEur(ahorroCalculado)} (${pct}%)</td>
      </tr>
    </table>
    <p style="color:#444;line-height:1.6;margin:0 0 16px">
      <strong>Próximo paso:</strong> publica tu piso gratis en Inmonest y, si quieres acompañamiento legal de reserva a escritura,
      nuestro servicio completo cuesta ${formatEur(costo)} — sin comisión sobre el precio de venta.
    </p>
    <p style="margin:0">
      <a href="https://inmonest.com/gestoria/venta-completa-reserva-escritura"
         style="display:inline-block;background:#c9962a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700">
        Ver servicio de venta completa
      </a>
    </p>
  `)

  const adminHtml = baseLayout(`
    <h2 style="margin:0 0 12px;color:#c9962a">Nuevo lead — Calculadora de ahorro</h2>
    <p style="color:#666;font-size:13px;margin:0 0 16px">Fuente: ${source}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 12px;font-weight:600;color:#555">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#555">Precio venta</td><td style="padding:8px 12px">${formatEur(precioVenta)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#555">Ahorro calculado</td><td style="padding:8px 12px"><strong>${formatEur(ahorroCalculado)}</strong></td></tr>
    </table>
  `)

  const [userSent, adminSent] = await Promise.all([
    sendEmail({
      to: email,
      subject: `Tu ahorro estimado: ${formatEur(ahorroCalculado)} — Inmonest`,
      html: userHtml,
    }),
    sendEmail({
      to: getNotifyEmails(),
      subject: `💰 Lead calculadora — ${formatEur(ahorroCalculado)} · ${email}`,
      html: adminHtml,
      reply_to: email,
    }),
  ])

  if (!userSent && !adminSent && process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'No se pudo enviar el informe' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
