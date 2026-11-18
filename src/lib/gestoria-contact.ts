import { getCiudadPortalNombre, isCiudadPortalActiva } from '@/lib/ciudades-portal'

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
  '/calculadora-gastos-alquiler',
  '/contratos-inmobiliarios',
  '/opiniones',
  '/agencias/gestoria',
]

const CITY_LANDING_SEGMENTS = new Set([
  'alquiler-particulares',
  'alquiler-sin-agencia',
  'vender-piso',
  'pisos',
  'pisos-particulares-sin-comision',
  'contrato-alquiler',
  'contrato-arras',
])

const CONTRACT_LANDING_PATTERN = /\/contrato-(alquiler|arras)(\/|$)/
const BARCELONA_COMPLETA_PATTERN =
  /\/barcelona\/(venta-completa|compra-completa|pack-arras-comprador)(\/|$)/
const GESTORIA_HUB_CIUDAD_PATTERN =
  /^\/gestoria\/(madrid|barcelona|valencia|sevilla|malaga|bilbao|zaragoza|alicante|palma|mallorca)$/

const PRIVATE_PATH_PREFIXES = ['/admin', '/mi-cuenta', '/login', '/registro', '/auth', '/api']

function isCiudadLandingPath(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return false
  const [ciudad, segment] = parts
  if (!isCiudadPortalActiva(ciudad)) return false
  if (parts.length === 1) return true
  if (parts.length === 2 && segment) return CITY_LANDING_SEGMENTS.has(segment)
  return false
}

/** Teléfono / WhatsApp en landings comerciales (gestoría, blog, ciudades, calculadora, home). */
export function shouldShowGestoriaPhone(pathname: string): boolean {
  if (!pathname || pathname.startsWith('/pisos')) return false
  if (PRIVATE_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false
  }

  if (pathname === '/') return true

  if (ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true
  }

  if (CONTRACT_LANDING_PATTERN.test(pathname)) return true

  if (BARCELONA_COMPLETA_PATTERN.test(pathname)) return true

  if (isCiudadLandingPath(pathname)) return true

  return false
}

/** Mensaje WA contextual por ruta (más conversión que el genérico). */
export function gestoriaWhatsAppMessageForPath(pathname: string): string {
  const path = pathname || '/'

  if (path === '/') {
    return 'Hola Daniel, quiero información sobre la gestoría inmobiliaria Inmonest (contrato LAU, arras o compraventa).'
  }

  if (path.startsWith('/calculadora-gastos-alquiler')) {
    return 'Hola Daniel, he visto la calculadora de alquiler y quiero contratar el contrato LAU (145€). ¿Qué datos necesitáis?'
  }

  if (path.startsWith('/contratos-inmobiliarios')) {
    return 'Hola Daniel, busco redactar un contrato inmobiliario con Inmonest. ¿Me orientáis?'
  }

  const hubMatch = path.match(GESTORIA_HUB_CIUDAD_PATTERN)
  if (hubMatch) {
    const slug = hubMatch[1]
    const nombre =
      getCiudadPortalNombre(slug) ??
      (slug === 'mallorca' || slug === 'palma' ? 'Mallorca' : slug)
    return gestoriaHubWhatsAppMessage(nombre)
  }

  for (const [slug, message] of Object.entries(SERVICIO_WHATSAPP)) {
    if (path === `/gestoria/${slug}` || path.startsWith(`/gestoria/${slug}/`)) {
      return message
    }
  }

  const parts = path.split('/').filter(Boolean)
  if (parts.length >= 1 && isCiudadPortalActiva(parts[0])) {
    const nombre = getCiudadPortalNombre(parts[0]) ?? parts[0]
    const segment = parts[1]
    if (segment === 'vender-piso') {
      return `Hola Daniel, quiero vender en ${nombre} entre particulares (arras o pack venta 687€).`
    }
    if (segment === 'contrato-arras') {
      return `Hola Daniel, quiero contratar arras penitenciales en ${nombre} (145€).`
    }
    return `Hola Daniel, quiero contratar un contrato de alquiler LAU en ${nombre} (145€). ¿Me indicáis los datos?`
  }

  return 'Hola Daniel, busco gestoría inmobiliaria Inmonest para particulares (LAU, arras o compraventa).'
}
