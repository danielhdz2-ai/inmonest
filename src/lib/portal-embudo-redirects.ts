import { isCiudadPortalActiva } from '@/lib/ciudades-portal'
import { getContratoAlquilerPremiumConfig } from '@/lib/contrato-alquiler-premium-config'
import { getContratoArrasPremiumConfig } from '@/lib/contrato-arras-premium-config'
import { GESTORIA_ALQUILER_HUB } from '@/lib/portal-closed'

/** Rutas históricas del portal de pisos → landing de servicio gestoría (misma ciudad). */
export const PORTAL_EMBUDO_SEGMENTS = {
  'alquiler-particulares': 'contrato-alquiler',
  'alquiler-sin-agencia': 'contrato-alquiler',
  pisos: 'contrato-alquiler',
  'pisos-particulares-sin-comision': 'contrato-alquiler',
  'vender-piso': 'contrato-arras',
} as const

export type PortalEmbudoSegment = keyof typeof PORTAL_EMBUDO_SEGMENTS

const SEGMENT_PATTERN = Object.keys(PORTAL_EMBUDO_SEGMENTS).join('|')

function ciudadTieneServicio(ciudad: string, servicioPath: string): boolean {
  if (servicioPath === 'contrato-alquiler') {
    return Boolean(getContratoAlquilerPremiumConfig(ciudad))
  }
  if (servicioPath === 'contrato-arras') {
    return Boolean(getContratoArrasPremiumConfig(ciudad))
  }
  return false
}

/**
 * Si la URL es embudo portal legacy, devuelve la ruta 301 de gestoría.
 * Ej.: /bilbao/alquiler-particulares → /bilbao/contrato-alquiler
 */
export function resolvePortalEmbudoRedirect(pathname: string): string | null {
  const match = pathname.match(new RegExp(`^/([a-z0-9-]+)/(${SEGMENT_PATTERN})/?$`))
  if (!match) return null

  const ciudad = match[1]
  const segment = match[2] as PortalEmbudoSegment
  if (!isCiudadPortalActiva(ciudad)) return null

  const servicio = PORTAL_EMBUDO_SEGMENTS[segment]
  if (ciudadTieneServicio(ciudad, servicio)) {
    return `/${ciudad}/${servicio}`
  }

  if (servicio === 'contrato-alquiler') {
    return `/contratos-inmobiliarios/${ciudad}`
  }
  return GESTORIA_ALQUILER_HUB
}