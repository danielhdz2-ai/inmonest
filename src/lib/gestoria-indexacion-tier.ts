import type { Metadata } from 'next'
import { isGestoriaSolicitarPath } from '@/lib/gestoria-checkout-seo'
import { isMarketingPathIndexable, isPortalLegacyPath, PORTAL_LEGACY_ROBOTS } from '@/lib/portal-legacy-seo'

/**
 * Rutas gestoría con noindex explícito (excepciones puntuales).
 * Las landings ciudad × servicio se indexan por defecto; solo añade aquí páginas
 * que deban seguir accesibles pero fuera del índice.
 */
export const GESTORIA_NOINDEX_CITY_PATHS = new Set<string>([
  // Portal de acceso post-pago — noindex en metadata de la página; reservado por si se enlaza mal
])

/** Silo financiación: accesible y follow, fuera de índice gestoría (GSC canibaliza LAU/hubs). */
export function isPrestamoParticularesPath(path: string): boolean {
  return path === '/gestoria/prestamo-particulares' || path.startsWith('/gestoria/prestamo-particulares/')
}

/** Alias legacy → compra-completa (301 en next.config + redirect en page). */
export function isAsesoriaCompraLegacyPath(path: string): boolean {
  return path === '/gestoria/asesoria-compra-piso' || path.startsWith('/gestoria/asesoria-compra-piso/')
}

export function isGestoriaPathIndexable(path: string): boolean {
  if (isGestoriaSolicitarPath(path)) return false
  if (isPrestamoParticularesPath(path)) return false
  if (isAsesoriaCompraLegacyPath(path)) return false
  if (!isMarketingPathIndexable(path)) return false
  return !GESTORIA_NOINDEX_CITY_PATHS.has(path)
}

export function gestoriaRobotsForPath(path: string): Metadata['robots'] {
  if (isPortalLegacyPath(path)) return PORTAL_LEGACY_ROBOTS
  return isGestoriaPathIndexable(path)
    ? { index: true, follow: true }
    : { index: false, follow: true }
}

export function withGestoriaIndexRobots(path: string, metadata: Metadata): Metadata {
  return { ...metadata, robots: gestoriaRobotsForPath(path) }
}
