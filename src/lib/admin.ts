/**
 * Verifica si un email tiene privilegios de administrador
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  
  const adminEmails = [
    process.env.NEXT_PUBLIC_CONTACT_NOTIFY_EMAIL,
    'daniel.hdz.trader@gmail.com',
  ].filter(Boolean)
  
  return adminEmails.includes(email)
}

/**
 * Obtiene la URL de redirección apropiada para un usuario
 * @param email Email del usuario
 * @returns URL de redirección (/admin o /mi-cuenta)
 */
export function getRedirectUrl(email: string | null | undefined): string {
  return isAdminEmail(email) ? '/admin' : '/mi-cuenta'
}
