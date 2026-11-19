import {
  GESTORIA_INDEXAR_PRIORIDAD_ALTA,
  GESTORIA_INDEXAR_PRIORIDAD_MEDIA,
} from '@/lib/gestoria-indexar-urls'

/** Barrios BCN con contenido y prioridad GSC (roadmap); el resto sigue vivo pero fuera del sitemap. */
export const SITEMAP_BCN_BARRIOS = new Set([
  'eixample',
  'gracia',
  'sants',
  'les-corts',
  'sant-antoni',
  'poblenou',
  'sarria',
  'el-raval',
])

const PRIORIDAD_SITEMAP = new Set([
  ...GESTORIA_INDEXAR_PRIORIDAD_ALTA,
  ...GESTORIA_INDEXAR_PRIORIDAD_MEDIA,
])

/** IDs de LANDINGS_POR_CIUDAD que entran en sitemap (sin silos noindex ni cola infinita). */
export const SITEMAP_LANDING_IDS = new Set([
  'contrato-arras',
  'contrato-alquiler',
  'contratos-inmobiliarios',
  'gestoria-hub',
  'venta-completa',
  'compra-completa',
  'pack-arras-documental',
  'alquiler-temporada',
])

const BCN_BARRIO_PREFIX =
  /^\/barcelona\/(contrato-alquiler|contrato-arras|venta-completa|compra-completa|alquiler-temporada|contrato-alquiler-habitacion|pack-arras-comprador)\/([^/]+)/

export function shouldIncludeBarcelonaBarrioInSitemap(path: string): boolean {
  const match = path.match(BCN_BARRIO_PREFIX)
  if (!match) return true
  return SITEMAP_BCN_BARRIOS.has(match[2])
}

/** Landings profundas /gestoria/servicio/ciudad solo si están en lista prioridad explícita. */
export function shouldIncludeGestoriaDeepPathInSitemap(path: string): boolean {
  if (!path.startsWith('/gestoria/')) return true
  const depth = path.split('/').filter(Boolean).length
  if (depth <= 2) return true
  return PRIORIDAD_SITEMAP.has(path)
}

export function shouldIncludePathInSitemap(path: string): boolean {
  if (!shouldIncludeBarcelonaBarrioInSitemap(path)) return false
  if (!shouldIncludeGestoriaDeepPathInSitemap(path)) return false
  return true
}