import type { createAdminClient } from '@/lib/supabase/admin'
import type { createClient } from '@/lib/supabase/server'
import type { GestoriaContrato } from '@/lib/gestoria-portal-types'
import {
  GESTORIA_ORDER_SELECT,
  GESTORIA_ORDER_SELECT_CORE,
} from '@/lib/gestoria-portal-types'
import { getStripeKey } from '@/lib/stripe-key'

type AdminClient = ReturnType<typeof createAdminClient>
type ServerClient = Awaited<ReturnType<typeof createClient>>

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/** PostgREST .or() rompe con @ si el valor no va entre comillas */
function quoteFilterValue(value: string): string {
  return `"${value.replace(/"/g, '')}"`
}

async function queryOrders(
  client: AdminClient | ServerClient,
  userId: string,
  emailNorm: string,
  select: string,
): Promise<GestoriaContrato[]> {
  const emailQ = quoteFilterValue(emailNorm)

  const { data, error } = await client
    .from('gestoria_requests')
    .select(select)
    .or(`client_email.eq.${emailQ},user_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (!error && (data ?? []).length > 0) {
    return (data ?? []) as unknown as GestoriaContrato[]
  }

  // Fallback por email (ilike exacto) y por user_id por separado
  const [{ data: byEmail }, { data: byUser }] = await Promise.all([
    client
      .from('gestoria_requests')
      .select(select)
      .ilike('client_email', emailNorm)
      .order('created_at', { ascending: false }),
    client
      .from('gestoria_requests')
      .select(select)
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
  ])

  const merged = new Map<string, GestoriaContrato>()
  const rows = [...(byEmail ?? []), ...(byUser ?? [])] as unknown as GestoriaContrato[]
  for (const row of rows) {
    if (row?.id) merged.set(row.id, row)
  }
  return Array.from(merged.values())
}

/** Vincula pedidos del email (y opcionalmente una session_id concreta) al usuario */
export async function linkGestoriaOrdersToUser(
  admin: AdminClient,
  userId: string,
  email: string,
  sessionId?: string | null,
) {
  const emailNorm = normalizeEmail(email)

  if (sessionId?.startsWith('cs_')) {
    const bySession = await admin
      .from('gestoria_requests')
      .update({ user_id: userId, client_email: emailNorm })
      .eq('session_id', sessionId)
    if (bySession.error) {
      return bySession
    }
  }

  return admin
    .from('gestoria_requests')
    .update({ user_id: userId })
    .ilike('client_email', emailNorm)
}

interface StripeSession {
  id: string
  payment_status: string
  customer_email: string | null
  customer_details?: { email?: string | null }
  metadata?: Record<string, string>
  amount_total?: number | null
  payment_intent?: string | null
}

/**
 * Verifica el pago directo contra la API de Stripe (sin pasar por nuestras
 * propias rutas HTTP, para evitar auto-llamadas frágiles en serverless) y
 * marca el pedido como pagado si corresponde. Nunca lanza: es best-effort.
 */
export async function ensureOrderPaidFromStripe(
  admin: AdminClient,
  sessionId: string,
  fallbackUserId?: string | null,
): Promise<void> {
  if (!sessionId?.startsWith('cs_')) return
  const key = getStripeKey()
  if (!key) return

  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(6000) },
    )
    if (!res.ok) return
    const session = (await res.json()) as StripeSession
    if (session.payment_status !== 'paid') return

    const meta = session.metadata ?? {}
    const client_email = (session.customer_details?.email ?? session.customer_email ?? '')
      .trim()
      .toLowerCase()

    await admin
      .from('gestoria_requests')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        stripe_payment_intent: session.payment_intent ?? null,
        ...(client_email ? { client_email } : {}),
        user_id: meta.user_id || fallbackUserId || null,
      })
      .eq('session_id', sessionId)
      .is('paid_at', null)
  } catch {
    /* best-effort: no bloquear el panel si Stripe tarda o falla */
  }
}

export async function fetchGestoriaOrdersForUser(
  admin: AdminClient,
  userId: string,
  email: string,
  sessionId?: string | null,
): Promise<GestoriaContrato[]> {
  const emailNorm = normalizeEmail(email)

  await linkGestoriaOrdersToUser(admin, userId, emailNorm, sessionId)

  let rows = await queryOrders(admin, userId, emailNorm, GESTORIA_ORDER_SELECT)
  if (rows.length === 0) {
    rows = await queryOrders(admin, userId, emailNorm, GESTORIA_ORDER_SELECT_CORE)
  }

  // Si aún vacío pero hay session_id, lee ese pedido directo (pago recién hecho)
  if (rows.length === 0 && sessionId?.startsWith('cs_')) {
    const { data } = await admin
      .from('gestoria_requests')
      .select(GESTORIA_ORDER_SELECT)
      .eq('session_id', sessionId)
      .maybeSingle()
    if (data) return [data as unknown as GestoriaContrato]
    const { data: core } = await admin
      .from('gestoria_requests')
      .select(GESTORIA_ORDER_SELECT_CORE)
      .eq('session_id', sessionId)
      .maybeSingle()
    if (core) return [core as unknown as GestoriaContrato]
  }

  return rows
}

export async function fetchGestoriaOrdersForUserSafe(
  client: AdminClient | ServerClient,
  userId: string,
  email: string,
  linkFirst?: AdminClient,
  sessionId?: string | null,
): Promise<GestoriaContrato[]> {
  const emailNorm = normalizeEmail(email)

  if (linkFirst) {
    try {
      await linkGestoriaOrdersToUser(linkFirst, userId, emailNorm, sessionId)
    } catch {
      /* ok */
    }
  }

  let rows = await queryOrders(client, userId, emailNorm, GESTORIA_ORDER_SELECT)
  if (rows.length === 0) {
    rows = await queryOrders(client, userId, emailNorm, GESTORIA_ORDER_SELECT_CORE)
  }
  return rows
}
