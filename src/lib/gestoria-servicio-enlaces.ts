import { LANDINGS_POR_CIUDAD } from './gestoria-ciudades-inventario'

export type EnlaceServicioCiudad = {
  href: string
  label: string
  esCiudadEspecifica: boolean
}

type ServicioEnlaceMeta = {
  landingId?: string
  generalHref: string
  labelConCiudad: (ciudad: string) => string
  labelGeneral: string
}

const SERVICIO_ENLACE_META: Record<string, ServicioEnlaceMeta> = {
  'contrato-alquiler': {
    landingId: 'contrato-alquiler',
    generalHref: '/gestoria/ayuda-propietarios',
    labelConCiudad: (ciudad) => `Ver contrato alquiler ${ciudad} →`,
    labelGeneral: 'Ver contrato alquiler →',
  },
  'arras-penitenciales': {
    landingId: 'contrato-arras',
    generalHref: '/gestoria/contrato-arras',
    labelConCiudad: (ciudad) => `Ver contrato arras ${ciudad} →`,
    labelGeneral: 'Ver contrato arras →',
  },
  'revision-arras': {
    generalHref: '/gestoria/revision-contrato-arras',
    labelConCiudad: (ciudad) => `Ver revisión arras ${ciudad} →`,
    labelGeneral: 'Ver revisión contrato arras →',
  },
  'rescision-alquiler': {
    generalHref: '/gestoria/rescision-alquiler',
    labelConCiudad: (ciudad) => `Ver rescisión alquiler ${ciudad} →`,
    labelGeneral: 'Ver rescisión de alquiler →',
  },
  'venta-completa-reserva-escritura': {
    landingId: 'venta-completa',
    generalHref: '/gestoria/venta-completa-reserva-escritura',
    labelConCiudad: (ciudad) => `Ver venta completa ${ciudad} →`,
    labelGeneral: 'Ver venta completa →',
  },
  'compra-completa-reserva-escritura': {
    generalHref: '/gestoria/asesoria-compra-piso',
    labelConCiudad: (ciudad) => `Ver compra completa ${ciudad} →`,
    labelGeneral: 'Ver asesoría compra de piso →',
  },
  'due-diligence-precompra': {
    landingId: 'due-diligence',
    generalHref: '/gestoria/due-diligence-precompra',
    labelConCiudad: (ciudad) => `Ver due diligence ${ciudad} →`,
    labelGeneral: 'Ver due diligence pre-compra →',
  },
  'pack-due-diligence-precompra': {
    landingId: 'due-diligence',
    generalHref: '/gestoria/due-diligence-precompra',
    labelConCiudad: (ciudad) => `Ver due diligence ${ciudad} →`,
    labelGeneral: 'Ver due diligence pre-compra →',
  },
  'alquiler-habitaciones': {
    landingId: 'contrato-alquiler-habitacion',
    generalHref: '/gestoria/contrato-alquiler-habitacion',
    labelConCiudad: (ciudad) => `Ver alquiler habitación ${ciudad} →`,
    labelGeneral: 'Ver contrato alquiler habitación →',
  },
}

function getLandingPorId(landingId: string) {
  return LANDINGS_POR_CIUDAD.find((landing) => landing.id === landingId)
}

export function getServicioLandingHref(
  servicioSlug: string,
  ciudadSlug: string,
  ciudadNombre: string
): EnlaceServicioCiudad | null {
  const meta = SERVICIO_ENLACE_META[servicioSlug]
  if (!meta) return null

  if (meta.landingId) {
    const landing = getLandingPorId(meta.landingId)
    if (landing?.ciudades.includes(ciudadSlug)) {
      return {
        href: landing.href(ciudadSlug),
        label: meta.labelConCiudad(ciudadNombre),
        esCiudadEspecifica: true,
      }
    }
  }

  return {
    href: meta.generalHref,
    label: meta.labelGeneral,
    esCiudadEspecifica: false,
  }
}

export function buildEnlaceServicioCiudad(
  servicioSlug: string,
  ciudadSlug: string,
  ciudadNombre: string
): { slug: string; href: string; label: string } | null {
  const enlace = getServicioLandingHref(servicioSlug, ciudadSlug, ciudadNombre)
  if (!enlace) return null

  return {
    slug: servicioSlug,
    href: enlace.href,
    label: enlace.label,
  }
}
