import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { ADMIN_EMAIL, getNotifyEmails } from '@/lib/email'
import { notifyClientPaymentConfirmed } from '@/lib/gestoria-client-emails'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'

const RESEND_API   = 'https://api.resend.com/emails'
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
}

async function sendEmail(payload: {
  from: string; to: string[]; subject: string; html: string; reply_to?: string
}) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.log('[webhook] RESEND_API_KEY no configurada — email omitido:', payload.subject)
    return
  }
  console.log('[webhook] Enviando email:', payload.subject, '→', payload.to.join(', '))
  const res = await fetch(RESEND_API, {
    method:  'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('[webhook] Resend error:', JSON.stringify(data))
  } else {
    console.log('[webhook] Email enviado OK. id:', data.id)
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Webhook error'
    console.error('[webhook] constructEvent error:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  console.log('[webhook] Evento recibido:', event.type)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta    = session.metadata ?? {}
    const amount  = ((session.amount_total ?? 0) / 100).toFixed(2)
    const clientEmail = session.customer_email ?? meta.client_email ?? ''
    const clientName  = meta.client_name  ?? 'Cliente'
    const clientPhone = meta.client_phone ?? '—'
    const serviceKey  = meta.service_key  ?? ''
    const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

    const FROM_EMAIL   = process.env.CONTACT_FROM_EMAIL   ?? 'Inmonest <info@inmonest.com>'
    const notifyEmails = getNotifyEmails()

    console.log('[webhook] checkout.session.completed — servicio:', serviceKey, '| cliente:', clientEmail, '| importe:', amount, '€')

    const supabase = createAdminClient()

    // ── 1. Marcar order como pagada ──────────────────────────────────────
    const { error: orderErr } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        stripe_payment_intent: session.payment_intent as string ?? null,
        paid_at: new Date().toISOString(),
      })
      .eq('stripe_checkout_id', session.id)

    if (orderErr) console.log('[webhook] orders update (puede no existir si es gestoría directa):', orderErr.message)

    // ── 2. Guardar compra en gestoria_requests ───────────────────────────
    await supabase.from('gestoria_requests').upsert({
      session_id:    session.id,
      service_key:   serviceKey,
      client_email:  clientEmail,
      client_name:   clientName,
      client_phone:  clientPhone,
      amount_eur:    parseFloat(amount),
      status:        'paid',
      paid_at:       new Date().toISOString(),
    }, { onConflict: 'session_id' }).then(({ error }) => {
      if (error) console.error('[webhook] gestoria_requests upsert error:', error.message)
      else console.log('[webhook] gestoria_requests guardado OK')
    })

    // ── 3. Email al ADMIN ────────────────────────────────────────────────
    await sendEmail({
      from:    FROM_EMAIL,
      to:      notifyEmails,
      subject: `💰 ¡Nueva venta! ${amount} € — ${serviceKey}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px">
          <h2 style="color:#c9962a;margin:0 0 8px">¡Nueva venta en Inmonest!</h2>
          <p style="color:#555;margin:0 0 20px;font-size:13px">${fecha}</p>
          <div style="background:#fff;border-radius:8px;padding:20px;border:1px solid #e5e7eb">
            <table style="width:100%;font-size:14px;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:700;color:#374151;width:140px">Servicio</td><td style="padding:8px;color:#111">${serviceKey}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:8px;font-weight:700;color:#374151">Importe</td><td style="padding:8px;color:#c9962a;font-weight:700;font-size:18px">${amount} €</td></tr>
              <tr><td style="padding:8px;font-weight:700;color:#374151">Cliente</td><td style="padding:8px">${clientName}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:8px;font-weight:700;color:#374151">Email</td><td style="padding:8px"><a href="mailto:${clientEmail}" style="color:#c9962a">${clientEmail}</a></td></tr>
              <tr><td style="padding:8px;font-weight:700;color:#374151">Teléfono</td><td style="padding:8px">${clientPhone}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:8px;font-weight:700;color:#374151">Sesión Stripe</td><td style="padding:8px;font-size:11px;color:#888">${session.id}</td></tr>
            </table>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#9ca3af;text-align:center">Inmonest — Panel de administración</p>
        </div>
      `,
    })

    // ── 4. Email al CLIENTE (panel + preferencias) ───────────────────────
    if (clientEmail) {
      const serviceName =
        GESTORIA_SERVICIOS[serviceKey]?.nombre ?? serviceKey.replace(/-/g, ' ')
      const sent = await notifyClientPaymentConfirmed({
        to: clientEmail,
        clientName,
        serviceName,
        amountEur: amount,
      })
      if (!sent) {
        console.log('[webhook] Email cliente omitido (preferencias o Resend)')
      }
    } else {
      console.log('[webhook] Sin email de cliente — email de confirmación omitido')
    }

    // ── 5. Turbo / Visibilidad (para compras desde mi-cuenta) ────────────
    if (meta.product_slug === 'turbo_7d' && meta.listing_id) {
      const until = new Date()
      until.setDate(until.getDate() + 7)
      await supabase
        .from('listings')
        .update({ turbo_until: until.toISOString() })
        .eq('id', meta.listing_id)
        .eq('owner_user_id', meta.user_id)
    }

    if (meta.product_slug === 'visibility_30d' && meta.listing_id) {
      const until = new Date()
      until.setDate(until.getDate() + 30)
      await supabase
        .from('listings')
        .update({ turbo_until: until.toISOString(), ranking_score: 100 })
        .eq('id', meta.listing_id)
        .eq('owner_user_id', meta.user_id)
    }
  }

  return NextResponse.json({ received: true })
}
