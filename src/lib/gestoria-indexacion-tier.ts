import type { Metadata } from 'next'

/**
 * Landings gestoría ciudad × servicio de baja prioridad SEO.
 * Siguen accesibles y enlazadas; no van al sitemap y llevan noindex,follow.
 */
export const GESTORIA_NOINDEX_CITY_PATHS = new Set<string>([
  '/gestoria/asesoria-compra-piso/zaragoza',
  '/gestoria/asesoria-compra-piso/valladolid',
  '/gestoria/asesoria-compra-piso/mallorca',
  '/gestoria/asesoria-compra-piso/bilbao',
  '/gestoria/asesoria-compra-piso/coruna',
  '/gestoria/asesoria-compra-piso/murcia',
  '/gestoria/asesoria-compra-piso/pamplona',
  '/gestoria/contrato-alquiler-habitacion/asturias',
  '/gestoria/prestamo-particulares/sevilla',
  '/gestoria/prestamo-particulares/malaga',
  '/gestoria/prestamo-particulares/bilbao',
  '/gestoria/prestamo-particulares/mallorca',
  '/gestoria/prestamo-particulares/valladolid',
  '/gestoria/due-diligence-precompra/bilbao',
  '/gestoria/due-diligence-precompra/zaragoza',
  '/gestoria/due-diligence-precompra/coruna',
  '/gestoria/venta-completa-reserva-escritura/salamanca',
  '/gestoria/venta-completa-reserva-escritura/valladolid',
])

export function isGestoriaPathIndexable(path: string): boolean {
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
