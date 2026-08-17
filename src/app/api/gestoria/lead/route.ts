import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, baseLayout, getNotifyEmails } from '@/lib/email'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission } from '@/lib/verify-bot'
import {
  buildAuthRedirectUrl,
  buildGestoriaPanelUrl,
  getServiceDisplayName,
  getServicePrice,
} from '@/lib/gestoria-leads'
import { resolveServiceKeyFromLabel } from '@/lib/gestoria-service-docs'


export async function POST(req: NextRequest) {
  let body: {
    client_name?: string
    client_phone?: string
    client_email?: string
    service_key?: string
    service_name?: string
    ciudad?: string
    source?: string
    notes?: string
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
    if (botCheck.isHoneypot) return NextResponse.json({ ok: true, redirect: buildGestoriaPanelUrl() })
    return NextResponse.json({ error: botCheck.error }, { status: botCheck.status })
  }

  const name = body.client_name?.trim()
  const phone = body.client_phone?.trim()
  const email = body.client_email?.trim().toLowerCase()
  const ciudad = body.ciudad?.trim()

  if (!name) return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 422 })
  if (!phone || phone.replace(/\D/g, '').length < 9) {
    return NextResponse.json({ error: 'Indica un teléfono válido' }, { status: 422 })
  }
  if (!email) {
    return NextResponse.json(
      { error: 'Indica tu email para acceder a tu área de gestoría' },
      { status: 422 },
    )
  }

  const serviceKey =
    body.service_key?.trim() ||
    resolveServiceKeyFromLabel(body.service_name ?? '', ciudad)
  const serviceName = getServiceDisplayName(serviceKey, body.service_name?.trim())
  const price = getServicePrice(serviceKey)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const admin = createAdminClient()
  const { data: lead, error } = await admin.from('gestoria_requests').insert({
    service_key: serviceKey,
    service_name: serviceName,
    price_eur: price ?? 0,
    client_name: name.slice(0, 120),
    client_email: email.slice(0, 200),
    client_phone: phone.slice(0, 30),
    notes: body.notes?.trim().slice(0, 1000) ?? null,
    status: 'lead',
    step: 0,
    user_id: user?.id ?? null,
  }).select('id').single()

  if (error) {
    console.error('[gestoria/lead]', error.message)
    return NextResponse.json({ error: 'No se pudo registrar tu solicitud' }, { status: 500 })
  }

  // Vincular otros leads previos del mismo email
  if (user?.id) {
    await admin
      .from('gestoria_requests')
      .update({ user_id: user.id })
      .eq('client_email', email)
      .is('user_id', null)
  }

  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  sendEmail({
    to: getNotifyEmails(),
    subject: `Nuevo lead gestoría — ${serviceName}${ciudad ? ` · ${ciudad}` : ''}`,
    html: baseLayout(`
      <h2 style="margin:0 0 12px;color:#c9962a">Nuevo lead de gestoría</h2>
      <p style="color:#666;font-size:13px">Fuente: ${body.source ?? 'pide_info'} · ${fecha}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px;font-weight:600">Nombre</td><td style="padding:8px">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Teléfono</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px;font-weight:600">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:600">Servicio</td><td style="padding:8px">${serviceName}</td></tr>
        ${ciudad ? `<tr><td style="padding:8px;font-weight:600">Ciudad</td><td style="padding:8px">${ciudad}</td></tr>` : ''}
      </table>
      <p style="margin-top:16px;font-size:13px;color:#555">Contactar en menos de 24h para convertir el lead.</p>
    `),
    reply_to: email,
  }).catch(() => {})

  const redirect = user
    ? buildGestoriaPanelUrl({ lead: true })
    : buildAuthRedirectUrl('registro', { email, lead: true })

  return NextResponse.json({ ok: true, id: lead?.id, redirect })
}
