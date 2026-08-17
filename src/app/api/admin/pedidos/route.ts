import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  return isAdminEmail(user.email)
}

export async function GET() {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  // Usar el cliente admin (service role) para saltarnos la RLS, que solo
  // permite a cada usuario ver sus propios pedidos por email.
  const adminSb = createAdminClient()
  const { data, error } = await adminSb
    .from('gestoria_requests')
    .select('*')
    .neq('client_email', 'daniel.trading.sniper@gmail.com')
    .neq('service_key', 'prueba-pago-stripe')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ requests: data ?? [] })
}

const PAYMENT_METHODS = ['transferencia', 'bizum', 'efectivo', 'otro'] as const

/**
 * Registrar una venta manual (pago recibido fuera de Stripe: transferencia,
 * Bizum, efectivo...) para que quede contabilizada en el panel de ventas.
 */
export async function POST(req: Request) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })

  const client_name = String(body.client_name ?? '').trim().slice(0, 200)
  const client_email = String(body.client_email ?? '').trim().toLowerCase().slice(0, 200)
  const client_phone = String(body.client_phone ?? '').trim().slice(0, 40) || null
  const service_key = String(body.service_key ?? 'venta-manual').trim().slice(0, 120) || 'venta-manual'
  const service_name = String(body.service_name ?? service_key).trim().slice(0, 200)
  const amount_eur = Number(body.amount_eur)
  const paymentMethodRaw = String(body.payment_method ?? 'transferencia').trim().toLowerCase()
  const payment_method = (PAYMENT_METHODS as readonly string[]).includes(paymentMethodRaw)
    ? paymentMethodRaw
    : 'otro'
  const notes = String(body.notes ?? '').trim().slice(0, 1000) || null
  const paidAtRaw = String(body.paid_at ?? '').trim()
  const paid_at = paidAtRaw ? new Date(paidAtRaw).toISOString() : new Date().toISOString()

  if (!client_name) return NextResponse.json({ error: 'Falta el nombre del cliente' }, { status: 400 })
  if (!client_email || !client_email.includes('@')) {
    return NextResponse.json({ error: 'Email de cliente no válido' }, { status: 400 })
  }
  if (!Number.isFinite(amount_eur) || amount_eur <= 0) {
    return NextResponse.json({ error: 'Importe no válido' }, { status: 400 })
  }

  const adminSb = createAdminClient()
  const { data, error } = await adminSb
    .from('gestoria_requests')
    .insert({
      service_key,
      service_name,
      price_eur: Math.round(amount_eur),
      amount_eur,
      client_name,
      client_email,
      client_phone,
      status: 'paid',
      step: 1,
      paid_at,
      created_at: paid_at,
      payment_method,
      source: 'manual',
      internal_notes: notes,
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, request: data })
}
