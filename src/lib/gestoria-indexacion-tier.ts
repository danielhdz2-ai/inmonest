import type { Metadata } from 'next'
import { isGestoriaSolicitarPath } from '@/lib/gestoria-checkout-seo'

/**
 * Rutas gestoría con noindex explícito (excepciones puntuales).
 * Las landings ciudad × servicio se indexan por defecto; solo añade aquí páginas
 * que deban seguir accesibles pero fuera del índice.
 */
export const GESTORIA_NOINDEX_CITY_PATHS = new Set<string>([
  // Portal de acceso post-pago — noindex en metadata de la página; reservado por si se enlaza mal
])

export function isGestoriaPathIndexable(path: string): boolean {
  if (isGestoriaSolicitarPath(path)) return false
  return !GESTORIA_NOINDEX_CITY_PATHS.has(path)
}

export function gestoriaRobotsForPath(path: string): Metadata['robots'] {
  return isGestoriaPathIndexable(path)
    ? { index: true, follow: true }
    : { index: false, follow: true }
}

export function withGestoriaIndexRobots(path: string, metadata: Metadata): Metadata {
  return { ...metadata, robots: gestoriaRobotsForPath(path) }
}
