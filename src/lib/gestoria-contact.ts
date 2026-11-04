export const GESTORIA_PHONE_DISPLAY = '745 022 862'
export const GESTORIA_PHONE_TEL = '+34745022862'
export const GESTORIA_PHONE_WA = '34745022862'

export function buildGestoriaWhatsAppHref(message: string): string {
  return `https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent(message)}`
}

/** Mensaje pre-rellenado hub ciudad (GSC «gestoría inmobiliaria [ciudad]»). */
export function gestoriaHubWhatsAppMessage(ciudadNombre: string): string {
  return `Hola Daniel, busco gestoría inmobiliaria en ${ciudadNombre} para particulares (LAU, arras o compraventa).`
}

const SERVICIO_WHATSAPP: Record<string, string> = {
  'contrato-alquiler':
    'Hola Daniel, quiero contratar un contrato de alquiler LAU (145€). ¿Me indicáis los datos que necesitáis?',
  'rescision-alquiler':
    'Hola Daniel, necesito ayuda con rescisión de alquiler o devolución de fianza (120€).',
  'contrato-compraventa':
    'Hola Daniel, necesito redactar un contrato de compraventa privado entre particulares.',
  'compra-completa-reserva-escritura':
    'Hola Daniel, me interesa el pack compra completa hasta escritura (687€).',
  'venta-completa-reserva-escritura':
    'Hola Daniel, ya tengo comprador y quiero el pack venta completa hasta escritura (687€).',
  'arras-penitenciales': 'Hola Daniel, quiero contratar arras penitenciales (145€).',
  'cuanto-cuesta-contrato-alquiler':
    'Hola Daniel, tengo dudas sobre el precio del contrato de alquiler en gestoría (145€).',
}

/** Mensajes WA por landing de servicio (CTR / conversión GSC). */
export function gestoriaServicioWhatsAppMessage(servicioSlug: string, servicioNombre: string): string {
  return SERVICIO_WHATSAPP[servicioSlug] ?? `Hola Daniel, tengo dudas sobre ${servicioNombre}.`
}

const ALLOWED_PREFIXES = [
  '/gestoria',
  '/blog',
  '/sobre-nosotros',
  '/servicios',
  '/vender-piso-sin-agencia',
  '/vender-casa',
]

const CONTRACT_LANDING_PATTERN = /\/contrato-(alquiler|arras)(\/|$)/
const BARCELONA_COMPLETA_PATTERN =
  /\/barcelona\/(venta-completa|compra-completa|pack-arras-comprador)(\/|$)/

/** Teléfono de gestoría solo en landings de gestoría, contratos, servicios, blog y sobre nosotros. */
export function shouldShowGestoriaPhone(pathname: string): boolean {
  if (pathname.startsWith('/pisos')) return false

  if (ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true
  }

  if (CONTRACT_LANDING_PATTERN.test(pathname)) return true

  if (BARCELONA_COMPLETA_PATTERN.test(pathname)) return true

  return false
}
