/** Re-lanzar redirects de next/navigation (no deben ir en catch genéricos). */
export function isNextRedirectError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('digest' in error)) return false
  const digest = String((error as { digest: unknown }).digest)
  return digest.startsWith('NEXT_REDIRECT') || digest.startsWith('NEXT_NOT_FOUND')
}
