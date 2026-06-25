export const GESTORIA_PHONE_DISPLAY = '745 022 862'
export const GESTORIA_PHONE_TEL = '+34745022862'
export const GESTORIA_PHONE_WA = '34745022862'

const ALLOWED_PREFIXES = [
  '/gestoria',
  '/blog',
  '/sobre-nosotros',
  '/servicios',
  '/vender-piso-sin-agencia',
  '/vender-casa',
]

const CONTRACT_LANDING_PATTERN = /\/contrato-(alquiler|arras)(\/|$)/

/** Teléfono de gestoría solo en landings de gestoría, contratos, servicios, blog y sobre nosotros. */
export function shouldShowGestoriaPhone(pathname: string): boolean {
  if (pathname.startsWith('/pisos')) return false

  if (ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true
  }

  if (CONTRACT_LANDING_PATTERN.test(pathname)) return true

  return false
}
