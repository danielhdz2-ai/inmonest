import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripeKey } from '@/lib/stripe-key'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'
import { linkGestoriaOrdersToUser } from '@/lib/gestoria-link-user'

export const dynamic = 'force-dynamic'

interface StripeSession {
  id: string
  payment_status: string
  customer_email: string | null
  customer_details?: { email?: string | null }
  metadata?: Record<string, string>
  amount_total?: number | null
  payment_intent?: string | null
  error?: { message: string }
}

/**
 * GET /api/gestoria/confirmar-pago?session_id=cs_xxx
 * Verifica Stripe, guarda pedido paid y lo vincula al usuario si está logueado.
 */
export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')

  if (!session_id?.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }

  const key = getStripeKey()
  if (!key) {
    return NextResponse.json({ error: 'Pago no disponible temporalmente' }, { status: 503 })
  }

  let session: StripeSession
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    session = (await res.json()) as StripeSession
    if (!res.ok) {
      return NextResponse.json(
        { error: session.error?.message ?? 'Sesión de pago no encontrada' },
        { status: 404 },
      )
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error de red'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'pago_pendiente' }, { status: 402 })
  }

  const meta = session.metadata ?? {}
  const service_key = meta.service_key ?? ''
  const service_name =
    GESTORIA_SERVICIOS[service_key]?.nombre ??
    (service_key ? service_key.replace(/-/g, ' ') : 'Servicio de gestoría')
  const client_email = (
    session.customer_details?.email ??
    session.customer_email ??
    ''
  )
    .trim()
    .toLowerCase()
  const client_name = meta.client_name ?? ''
  const client_phone = meta.client_phone ?? ''
  const amount_eur = session.amount_total != null ? session.amount_total / 100 : null
  const metaUserId = meta.user_id || null

  // Usuario logueado (panel) → vincular ya
  const supabaseAuth = await createClient()
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser()
  const userId = user?.id ?? metaUserId

  try {
    const admin = createAdminClient()
    const { error: dbErr } = await admin.from('gestoria_requests').upsert(
      {
        session_id: session.id,
        service_key,
        service_name,
        client_email: client_email || user?.email?.toLowerCase() || null,
        client_name,
        client_phone,
        amount_eur,
        status: 'paid',
        paid_at: new Date().toISOString(),
        stripe_payment_intent: session.payment_intent ?? null,
        step: 1,
        user_id: userId,
      },
      { onConflict: 'session_id' },
    )
    if (dbErr) {
      console.error('[confirmar-pago] upsert:', dbErr.message)
    }

    if (user?.id && user.email) {
      await linkGestoriaOrdersToUser(admin, user.id, user.email, session.id)
    }
  } catch (err) {
    console.error('[confirmar-pago] Supabase:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({
    ok: true,
    service_name,
    customer_email: client_email || user?.email || '',
    service_key,
    amount_eur,
  })
}
