import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'
import { LANDINGS_POR_CIUDAD } from '@/lib/gestoria-ciudades-inventario'

export const SITE_URL = 'https://inmonest.com'

/** Hubs gestoría por ciudad */
const GESTORIA_HUBS = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'bilbao',
  'zaragoza',
  'alicante',
  'palma',
] as const

/** Núcleo + landings genéricas premium (prioridad máxima en GSC) */
export const GESTORIA_INDEXAR_PRIORIDAD_ALTA = [
  '/gestoria',
  '/contratos-inmobiliarios',
  '/contratos-inmobiliarios/madrid',
  '/contratos-inmobiliarios/barcelona',
  '/contratos-inmobiliarios/valencia',
  '/contratos-inmobiliarios/sevilla',
  '/contratos-inmobiliarios/malaga',
  '/contratos-inmobiliarios/bilbao',
  '/gestoria/ciudades',
  '/servicios',
  '/gestoria/contrato-alquiler',
  '/gestoria/arras-penitenciales',
  '/gestoria/compra-completa-reserva-escritura',
  '/gestoria/venta-completa-reserva-escritura',
  '/gestoria/pack-due-diligence-precompra',
  '/gestoria/pack-arras-revision-documental',
  '/gestoria/pack-arras-plus-vendedor',
  '/gestoria/alquiler-habitaciones',
  '/gestoria/alquiler-local-comercial',
  '/gestoria/revision-alquiler',
  '/gestoria/revision-correccion-arras',
  '/gestoria/prestamo-particulares',
  '/gestoria/asesoramiento-arras-venta',
  '/gestoria/contrato-arras',
  '/gestoria/cuanto-cuesta-contrato-alquiler',
  '/gestoria/guia-arras-penitenciales',
] as const

/** Landings por ciudad recientes o con poca visibilidad en GSC */
export const GESTORIA_INDEXAR_PRIORIDAD_MEDIA = [
  '/gestoria/alquiler-local-comercial/madrid',
  '/gestoria/alquiler-local-comercial/barcelona',
  '/gestoria/alquiler-local-comercial/valencia',
  '/gestoria/alquiler-local-comercial/sevilla',
  '/gestoria/alquiler-local-comercial/malaga',
  '/gestoria/alquiler-local-comercial/bilbao',
  '/gestoria/alquiler-local-comercial/zaragoza',
  '/gestoria/alquiler-local-comercial/alicante',
  '/gestoria/asesoria-compra-piso/madrid',
  '/gestoria/asesoria-compra-piso/barcelona',
  '/gestoria/asesoria-compra-piso/valencia',
  '/gestoria/asesoria-compra-piso/sevilla',
  '/gestoria/asesoria-compra-piso/alicante',
  '/gestoria/due-diligence-precompra/madrid',
  '/gestoria/due-diligence-precompra/barcelona',
  '/gestoria/contrato-alquiler-habitacion/madrid',
  '/gestoria/contrato-alquiler-habitacion/barcelona',
  '/gestoria/prestamo-particulares/madrid',
  '/gestoria/prestamo-particulares/zaragoza',
  '/gestoria/venta-completa-reserva-escritura/madrid',
  '/gestoria/venta-completa-reserva-escritura/valencia',
  '/madrid/contrato-alquiler',
  '/madrid/contrato-arras',
  '/barcelona/contrato-alquiler',
  '/valencia/contrato-alquiler',
  '/sevilla/contrato-alquiler',
  '/bilbao/contrato-alquiler',
] as const

function gestoriaLandingsPorCiudad(): string[] {
  return LANDINGS_POR_CIUDAD.flatMap((landing) => {
    if (!landing.href('madrid').startsWith('/gestoria/')) return []
    return landing.ciudades.map((c) => landing.href(c))
  })
}

function gestoriaCatalogoPublico(): string[] {
  return Object.entries(GESTORIA_SERVICIOS)
    .filter(([, svc]) => !svc.interno)
    .map(([slug]) => `/gestoria/${slug}`)
    .filter((path) => path !== '/gestoria/contrato-alquiler-barcelona')
}

/** Todas las URLs gestoría indexables (sin duplicados) */
export function getGestoriaUrlsParaIndexar(): string[] {
  const paths = new Set<string>([
    ...GESTORIA_INDEXAR_PRIORIDAD_ALTA,
    ...GESTORIA_INDEXAR_PRIORIDAD_MEDIA,
    ...GESTORIA_HUBS.map((c) => `/gestoria/${c}`),
    ...gestoriaLandingsPorCiudad(),
    ...gestoriaCatalogoPublico(),
  ])
  return [...paths].sort()
}

export function getGestoriaUrlsCompletasParaIndexar(): string[] {
  return getGestoriaUrlsParaIndexar().map((path) => `${SITE_URL}${path}`)
}

export function getGestoriaPrioridadAltaCompletas(): string[] {
  return GESTORIA_INDEXAR_PRIORIDAD_ALTA.map((path) => `${SITE_URL}${path}`)
}

/** Enlaces internos destacados (home + /gestoria) */
export const GESTORIA_ENLACES_INDEXACION = [
  {
    href: '/gestoria/alquiler-local-comercial/madrid',
    title: 'Alquiler local comercial Madrid',
    description: 'Contrato LAU empresarial. Desde 145€. Entrega 48h.',
    badge: 'Nuevo',
  },
  {
    href: '/gestoria/alquiler-local-comercial/valencia',
    title: 'Alquiler local comercial Valencia',
    description: 'Locales en Ruzafa, centro y polígonos.',
    badge: 'Nuevo',
  },
  {
    href: '/gestoria/compra-completa-reserva-escritura',
    title: 'Asesoría compra de piso',
    description: '687€ fijos. Sin comisión de agencia.',
    badge: 'Premium',
  },
  {
    href: '/gestoria/asesoria-compra-piso/madrid',
    title: 'Compra piso Madrid',
    description: 'Reserva a escritura con gestor asignado.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/asesoria-compra-piso/barcelona',
    title: 'Compra piso Barcelona',
    description: 'Normativa catalana y documentación registral.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-due-diligence-precompra',
    title: 'Due diligence precompra',
    description: 'Revisión legal antes de firmar arras.',
    badge: 'Premium',
  },
  {
    href: '/gestoria/pack-arras-revision-documental',
    title: 'Pack Arras Plus + documentación',
    description: 'Arras penitenciales y revisión documental completa para particulares.',
    badge: 'Premium',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/madrid',
    title: 'Pack Arras Plus Madrid',
    description: 'Arras + documentación para compradores particulares en Madrid.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/barcelona',
    title: 'Pack Arras Plus Barcelona',
    description: 'Arras y revisión documental en compraventa entre particulares.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/valencia',
    title: 'Pack Arras Plus Valencia',
    description: 'Pack arras + auditoría documental en la Comunitat Valenciana.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/sevilla',
    title: 'Pack Arras Plus Sevilla',
    description: 'Arras + documentación para compradores particulares en Andalucía.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/malaga',
    title: 'Pack Arras Plus Málaga',
    description: 'Arras y revisión documental en la Costa del Sol.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/zaragoza',
    title: 'Pack Arras Plus Zaragoza',
    description: 'Pack arras + auditoría documental en Aragón.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/bilbao',
    title: 'Pack Arras Plus Bilbao',
    description: 'Arras + documentación para compradores particulares en Bizkaia.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/coruna',
    title: 'Pack Arras Plus A Coruña',
    description: 'Pack arras + auditoría documental en Galicia.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/valladolid',
    title: 'Pack Arras Plus Valladolid',
    description: 'Arras y revisión documental en Castilla y León.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/murcia',
    title: 'Pack Arras Plus Murcia',
    description: 'Pack arras + auditoría documental en la Región de Murcia.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/pack-arras-revision-documental/pamplona',
    title: 'Pack Arras Plus Pamplona',
    description: 'Arras + documentación para compradores particulares en Navarra.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/due-diligence-precompra/valencia',
    title: 'Due diligence Valencia',
    description: 'Compraventa en la Comunitat Valenciana.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/contrato-alquiler-habitacion/madrid',
    title: 'Alquiler habitación Madrid',
    description: 'Coliving y pisos compartidos. LAU 2026.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/ciudades',
    title: 'Gestoría por ciudad',
    description: 'Inventario completo de landings locales.',
    badge: 'Hub',
  },
] as const
