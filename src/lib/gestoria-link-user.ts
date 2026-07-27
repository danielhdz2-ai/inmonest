import type { createAdminClient } from '@/lib/supabase/admin'
import { GESTORIA_ORDER_SELECT } from '@/lib/gestoria-portal-types'

type AdminClient = ReturnType<typeof createAdminClient>

const ORDER_FIELDS = GESTORIA_ORDER_SELECT

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
) {
  const emailNorm = email.trim().toLowerCase()

  await linkGestoriaOrdersToUser(admin, userId, emailNorm)

  const { data, error } = await admin
    .from('gestoria_requests')
    .select(ORDER_FIELDS)
    .or(`client_email.eq.${emailNorm},user_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) throw error
  if ((data ?? []).length > 0) return data ?? []

  const { data: byIlike } = await admin
    .from('gestoria_requests')
    .select(ORDER_FIELDS)
    .ilike('client_email', emailNorm)
    .order('created_at', { ascending: false })

  return byIlike ?? []
}
