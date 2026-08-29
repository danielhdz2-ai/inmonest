import { NextRequest, NextResponse } from 'next/server'
import { getStripeKey } from '@/lib/stripe-key'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getIP } from '@/lib/rate-limit'
import { verifyBotSubmission, validateHumanFields } from '@/lib/verify-bot'
import { getAgenciaPackById, packGestoriaServiceKey } from '@/lib/agencias-gestoria-packs'

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
    pack_id?: string
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

  const pack = getAgenciaPackById(body.pack_id?.trim() ?? '')
  if (!pack) {
    return NextResponse.json({ error: 'Pack no encontrado' }, { status: 404 })
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

  const serviceKey = packGestoriaServiceKey(pack.id)
  const productName = `${pack.nombre} — Anualidad gestoría B2B`
  const description = `${pack.contratosAnuales} contratos/año · entrega 4–5 h · FirmaCert incluida`

  const params = new URLSearchParams()
  params.set('mode', 'subscription')
  params.set('line_items[0][quantity]', '1')
  params.set('line_items[0][price_data][currency]', 'eur')
  params.set('line_items[0][price_data][unit_amount]', String(pack.precioTotal * 100))
  params.set('line_items[0][price_data][recurring][interval]', 'year')
  params.set('line_items[0][price_data][product_data][name]', productName)
  params.set('line_items[0][price_data][product_data][description]', description)
  params.set('success_url', `${BASE_URL}/gestoria/confirmacion?session_id={CHECKOUT_SESSION_ID}&tipo=pack-agencia`)
  params.set('cancel_url', `${BASE_URL}/agencias/gestoria?cancelado=1&pack=${encodeURIComponent(pack.id)}`)
  params.set('locale', 'es')
  params.set('payment_method_types[0]', 'card')
  params.set('billing_address_collection', 'auto')
  params.set('phone_number_collection[enabled]', 'true')
  params.set('customer_email', safeEmail)
  params.set('metadata[service_key]', serviceKey)
  params.set('metadata[service_name]', productName)
  params.set('metadata[pack_id]', pack.id)
  params.set('metadata[client_name]', safeName)
  params.set('metadata[client_phone]', safePhone)
  params.set('metadata[empresa]', safeEmpresa)
  params.set('metadata[billing_type]', 'annual_subscription')
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
      console.error('[agencias/gestoria/checkout] Stripe error:', data.error)
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
          amount_eur: pack.precioTotal,
          status: 'pending',
          user_id: user?.id ?? null,
          internal_notes: `Pack agencia: ${pack.nombre} · ${pack.contratosAnuales} créditos/año`,
        },
        { onConflict: 'session_id' },
      )
      if (grErr) console.warn('[agencias/gestoria/checkout] gestoria_requests upsert:', grErr.message)
    }

    return NextResponse.json({ url: data.url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error de red'
    console.error('[agencias/gestoria/checkout] fetch error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
