import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, baseLayout } from '@/lib/email'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission, validateHumanFields } from '@/lib/verify-bot'
import {
  buildAuthRedirectUrl,
  buildGestoriaPanelUrl,
} from '@/lib/gestoria-leads'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL ?? 'info@inmonest.com'
const DUPLICATE_WINDOW_MIN = 30

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const ip = getIP(req)
  const botCheck = await verifyBotSubmission(body, ip)
  if (!botCheck.allowed) {
    if (botCheck.isHoneypot) {
      return NextResponse.json({ ok: true, redirect: buildGestoriaPanelUrl({ lead: true }) })
    }
    return NextResponse.json({ error: botCheck.error }, { status: botCheck.status })
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

  const humanError = validateHumanFields({
    name: client_name,
    phone: client_phone ?? '',
    notes: notes ?? '',
  })
  if (humanError) {
    return NextResponse.json({ error: humanError }, { status: 422 })
  }

  const supabase = await createClient()
  const normalizedEmail = client_email.trim().toLowerCase()
  const serviceKey = service_key.trim()

  const since = new Date(Date.now() - DUPLICATE_WINDOW_MIN * 60_000).toISOString()
  const admin = createAdminClient()
  const { data: recent } = await admin
    .from('gestoria_requests')
    .select('id')
    .eq('client_email', normalizedEmail)
    .eq('service_key', serviceKey)
    .gte('created_at', since)
    .limit(1)

  const { data: { user } } = await supabase.auth.getUser()

  if (recent && recent.length > 0) {
    const redirect = user
      ? buildGestoriaPanelUrl({ lead: true })
      : buildAuthRedirectUrl('registro', { email: normalizedEmail, lead: true })
    return NextResponse.json({ ok: true, redirect, duplicate: true })
  }

  const { error } = await admin.from('gestoria_requests').insert({
    service_key: serviceKey,
    service_name: service_name.trim(),
    price_eur: parseInt(String(price_eur), 10),
    client_name: client_name.trim().slice(0, 120),
    client_email: normalizedEmail.slice(0, 200),
    client_phone: client_phone?.trim().slice(0, 30) || null,
    notes: notes?.trim().slice(0, 1000) || null,
    status: 'lead',
    step: 0,
    user_id: user?.id ?? null,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (user?.id) {
    await admin
      .from('gestoria_requests')
      .update({ user_id: user.id })
      .eq('client_email', normalizedEmail)
      .is('user_id', null)
  }

  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  sendEmail({
    to: NOTIFY_TO,
    subject: `📋 Nueva solicitud gestoría — ${service_name.trim()}`,
    html: baseLayout(`
      <h2 style="margin:0 0 12px;color:#c9962a">Nueva solicitud (lead)</h2>
      <p style="color:#666;font-size:13px">${fecha}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px;font-weight:600">Nombre</td><td style="padding:8px">${client_name.trim()}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Email</td><td style="padding:8px">${normalizedEmail}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Teléfono</td><td style="padding:8px">${client_phone ?? '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Servicio</td><td style="padding:8px">${service_name.trim()}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Precio</td><td style="padding:8px">${price_eur} €</td></tr>
      </table>
    `),
    reply_to: normalizedEmail,
  }).catch(() => {})

  const redirect = user
    ? buildGestoriaPanelUrl({ lead: true })
    : buildAuthRedirectUrl('registro', { email: normalizedEmail, lead: true })

  return NextResponse.json({ ok: true, redirect })
}
