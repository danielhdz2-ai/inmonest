import { isAdminEmail } from '@/lib/admin'
import { safeInternalPath } from '@/lib/gestoria-leads'

/** Rutas reservadas al equipo admin (evita bucles login ↔ admin). */
export function isAdminOnlyPath(path: string): boolean {
  return path === '/admin' || path.startsWith('/admin/')
}

/**
 * Valida `next` tras login/registro/OAuth. Usuarios no admin nunca vuelven a /admin/*.
 */
export function sanitizeNextPathForUser(
  email: string | null | undefined,
  next: string | null | undefined,
): string | null {
  const path = safeInternalPath(next ?? null)
  if (!path) return null
  if (isAdminOnlyPath(path) && !isAdminEmail(email)) {
    return '/mi-cuenta/contratos'
  }
  return path
}
