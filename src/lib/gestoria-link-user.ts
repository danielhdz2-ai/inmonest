import type { createAdminClient } from '@/lib/supabase/admin'
import type { createClient } from '@/lib/supabase/server'
import type { GestoriaContrato } from '@/lib/gestoria-portal-types'
import {
  GESTORIA_ORDER_SELECT,
  GESTORIA_ORDER_SELECT_CORE,
} from '@/lib/gestoria-portal-types'

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
