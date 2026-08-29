import { NextRequest, NextResponse } from 'next/server'
import { getStripeKey } from '@/lib/stripe-key'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission, validateHumanFields } from '@/lib/verify-bot'
import {
  agenciaContratoServiceKey,
  getAgenciaContratoBySlug,
} from '@/lib/agencias-gestoria-contratos'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://inmonest.com'

export async function POST(req: NextRequest) {
  const key = getStripeKey()
  if (!key) {
    return NextResponse.json(
      { error: 'Pago no disponible. Contacta con info@inmonest.com' },
      { status: 503 },
    )
  }

  let body: {
    service_slug?: string
    client_email?: string
    client_name?: string
    client_phone?: string
    empresa?: string
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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const botCheck = await verifyBotSubmission(body, ip)
    if (!botCheck.allowed) {
      if (botCheck.isHoneypot) return NextResponse.json({ url: `${BASE_URL}/gestoria/error` })
      return NextResponse.json({ error: botCheck.error }, { status: botCheck.status })
    }
  }

  const contrato = getAgenciaContratoBySlug(body.service_slug?.trim() ?? '')
  if (!contrato) {
    return NextResponse.json({ error: 'Contrato no encontrado' }, { status: 404 })
  }

  const safeName = (body.client_name?.trim() || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Cliente').slice(0, 120)
  const safeEmpresa = (body.empresa?.trim() ?? '').slice(0, 120)
  const safePhone = (body.client_phone?.trim() ?? '').slice(0, 30)

  const humanError = validateHumanFields({
    name: safeName,
    ...(safePhone ? { phone: safePhone } : {}),
  })
  if (humanError) {
    return NextResponse.json({ error: humanError }, { status: 422 })
  }

  const safeEmail =
    body.client_email?.trim().slice(0, 200) ||
    user?.email?.trim().slice(0, 200) ||
    undefined

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!safeEmail || !EMAIL_RE.test(safeEmail)) {
    return NextResponse.json({ error: 'Email válido requerido para el pago' }, { status: 400 })
  }

  const serviceKey = agenciaContratoServiceKey(contrato.slug)
  const productName = `${contrato.nombre} — Tarifa agencia`

  const params = new URLSearchParams()
  params.set('mode', 'payment')
  params.set('line_items[0][quantity]', '1')
  params.set('line_items[0][price_data][currency]', 'eur')
  params.set('line_items[0][price_data][unit_amount]', String(contrato.precioAgencia * 100))
  params.set('line_items[0][price_data][product_data][name]', productName)
  params.set('line_items[0][price_data][product_data][description]', `Inmonest B2B · entrega 4–5 h · FirmaCert incluida`)
  params.set('success_url', `${BASE_URL}/gestoria/confirmacion?session_id={CHECKOUT_SESSION_ID}&tipo=contrato-agencia`)
  params.set('cancel_url', `${BASE_URL}/agencias/gestoria?cancelado=1&contrato=${encodeURIComponent(contrato.slug)}`)
  params.set('locale', 'es')
  params.set('payment_method_types[0]', 'card')
  params.set('billing_address_collection', 'auto')
  params.set('phone_number_collection[enabled]', 'true')
  params.set('customer_email', safeEmail)
  params.set('metadata[service_key]', serviceKey)
  params.set('metadata[service_slug]', contrato.slug)
  params.set('metadata[service_name]', productName)
  params.set('metadata[client_name]', safeName)
  params.set('metadata[client_phone]', safePhone)
  params.set('metadata[empresa]', safeEmpresa)
  params.set('metadata[billing_type]', 'agencia_contrato_suelto')
  if (user?.id) params.set('metadata[user_id]', user.id)

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await res.json() as { id?: string; url?: string; error?: { message: string } }

    if (!res.ok) {
      console.error('[agencias/gestoria/contrato/checkout] Stripe error:', data.error)
      return NextResponse.json({ error: data.error?.message ?? 'Error en Stripe' }, { status: 500 })
    }

    if (data.id) {
      const adminSb = createAdminClient()
      const { error: grErr } = await adminSb.from('gestoria_requests').upsert(
        {
          session_id: data.id,
          service_key: serviceKey,
          client_email: safeEmail,
          client_name: safeEmpresa ? `${safeName} (${safeEmpresa})` : safeName,
          client_phone: safePhone || null,
          amount_eur: contrato.precioAgencia,
          status: 'pending',
          user_id: user?.id ?? null,
          internal_notes: `Contrato agencia suelto: ${contrato.nombre}`,
        },
        { onConflict: 'session_id' },
      )
      if (grErr) console.warn('[agencias/gestoria/contrato/checkout] gestoria_requests upsert:', grErr.message)
    }

    return NextResponse.json({ url: data.url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error de red'
    console.error('[agencias/gestoria/contrato/checkout] fetch error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
