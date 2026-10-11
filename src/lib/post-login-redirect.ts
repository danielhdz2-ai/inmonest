import { createAdminClient } from '@/lib/supabase/admin'
import { isAdminEmail } from '@/lib/admin'
import { sanitizeNextPathForUser } from '@/lib/auth-redirect'
import { buildGestoriaPanelUrl, isPaidStatus } from '@/lib/gestoria-leads'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'

/** Destino tras login OAuth/password cuando la sesión ya existe o acaba de crearse. */
export async function resolvePostLoginRedirect(
  userId: string,
  email: string,
  next?: string | null,
): Promise<string> {
  const nextPath = sanitizeNextPathForUser(email, next ?? null)
  if (nextPath) return nextPath
  if (isAdminEmail(email)) return '/admin'

  try {
    const admin = createAdminClient()
    const contratos = await fetchGestoriaOrdersForUser(admin, userId, email)
    const hasPaid = contratos.some((c) => isPaidStatus(c.status, c.paid_at))
    if (hasPaid) return buildGestoriaPanelUrl({ v: 'expediente' })
    return buildGestoriaPanelUrl({ v: 'servicios', onboarding: true })
  } catch (err) {
    console.error('[post-login-redirect]', err)
  }

  return buildGestoriaPanelUrl({ v: 'servicios' })
}
