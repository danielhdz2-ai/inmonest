import type { createAdminClient } from '@/lib/supabase/admin'
import type { createClient } from '@/lib/supabase/server'
import type { GestoriaContrato } from '@/lib/gestoria-portal-types'
import {
  GESTORIA_ORDER_SELECT,
  GESTORIA_ORDER_SELECT_CORE,
} from '@/lib/gestoria-portal-types'

type AdminClient = ReturnType<typeof createAdminClient>
type ServerClient = Awaited<ReturnType<typeof createClient>>

async function queryOrders(
  client: AdminClient | ServerClient,
  userId: string,
  emailNorm: string,
  select: string,
): Promise<GestoriaContrato[]> {
  const { data, error } = await client
    .from('gestoria_requests')
    .select(select)
    .or(`client_email.eq.${emailNorm},user_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) return []

  if ((data ?? []).length > 0) return (data ?? []) as unknown as GestoriaContrato[]

  const { data: byIlike, error: ilikeErr } = await client
    .from('gestoria_requests')
    .select(select)
    .ilike('client_email', emailNorm)
    .order('created_at', { ascending: false })

  if (ilikeErr) return []
  return (byIlike ?? []) as unknown as GestoriaContrato[]
}

/** Vincula todos los pedidos de gestoría del email al usuario autenticado */
export async function linkGestoriaOrdersToUser(
  admin: AdminClient,
  userId: string,
  email: string,
) {
  const emailNorm = email.trim().toLowerCase()
  return admin
    .from('gestoria_requests')
    .update({ user_id: userId })
    .ilike('client_email', emailNorm)
}

export async function fetchGestoriaOrdersForUser(
  admin: AdminClient,
  userId: string,
  email: string,
): Promise<GestoriaContrato[]> {
  const emailNorm = email.trim().toLowerCase()

  await linkGestoriaOrdersToUser(admin, userId, emailNorm)

  let rows = await queryOrders(admin, userId, emailNorm, GESTORIA_ORDER_SELECT)
  if (rows.length === 0) {
    rows = await queryOrders(admin, userId, emailNorm, GESTORIA_ORDER_SELECT_CORE)
  }

  return rows
}

export async function fetchGestoriaOrdersForUserSafe(
  client: AdminClient | ServerClient,
  userId: string,
  email: string,
  linkFirst?: AdminClient,
): Promise<GestoriaContrato[]> {
  const emailNorm = email.trim().toLowerCase()

  if (linkFirst) {
    try {
      await linkGestoriaOrdersToUser(linkFirst, userId, emailNorm)
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
