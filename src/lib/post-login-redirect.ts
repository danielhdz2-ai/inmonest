import { createAdminClient } from '@/lib/supabase/admin'
import { getRedirectUrl, isAdminEmail } from '@/lib/admin'
import { buildGestoriaPanelUrl, safeInternalPath } from '@/lib/gestoria-leads'
import { fetchGestoriaOrdersForUser } from '@/lib/gestoria-link-user'

/** Destino tras login OAuth/password cuando la sesión ya existe o acaba de crearse. */
export async function resolvePostLoginRedirect(
  userId: string,
  email: string,
  next?: string | null,
): Promise<string> {
  const nextPath = safeInternalPath(next ?? null)
  if (nextPath) return nextPath
  if (isAdminEmail(email)) return '/admin'

  try {
    const admin = createAdminClient()
    const contratos = await fetchGestoriaOrdersForUser(admin, userId, email)
    if (contratos.length > 0) return buildGestoriaPanelUrl()
  } catch (err) {
    console.error('[post-login-redirect]', err)
  }

  return getRedirectUrl(email)
}
