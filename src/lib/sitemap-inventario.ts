import type { MetadataRoute } from 'next'
import { LANDINGS_POR_CIUDAD } from '@/lib/gestoria-ciudades-inventario'
import { getGestoriaUrlsParaIndexar } from '@/lib/gestoria-indexar-urls'
import { isGestoriaPathIndexable } from '@/lib/gestoria-indexacion-tier'
import { CIUDADES_PORTAL_SLUGS } from '@/lib/ciudades-portal'
import { getBarcelonaAlquilerBarrioPaths } from '@/lib/barcelona-contrato-alquiler-barrios'
import { getBarcelonaArrasBarrioPaths } from '@/lib/barcelona-contrato-arras-barrios'
import { getBarcelonaHabitacionBarrioPaths } from '@/lib/barcelona-alquiler-habitacion-barrios'
import { getBarcelonaTemporadaBarrioPaths } from '@/lib/barcelona-alquiler-temporada-barrios'
import { getBarcelonaVentaCompletaBarrioPaths } from '@/lib/barcelona-venta-completa-barrios'
import { getBarcelonaCompraCompletaBarrioPaths } from '@/lib/barcelona-compra-completa-barrios'
import { getBarcelonaPackArrasDocumentalBarrioPaths } from '@/lib/barcelona-pack-arras-documental-barrios'
import { SITEMAP_LANDING_IDS, shouldIncludePathInSitemap } from '@/lib/sitemap-crawl-budget'
import {
  GESTORIA_INDEXAR_PRIORIDAD_ALTA,
  GESTORIA_INDEXAR_PRIORIDAD_MEDIA,
} from '@/lib/gestoria-indexar-urls'

/** Rutas de landings gestoría en sitemap (presupuesto de rastreo acotado). */
export function collectIndexableMarketingPaths(): string[] {
  const fromLandings = LANDINGS_POR_CIUDAD.filter((l) => SITEMAP_LANDING_IDS.has(l.id)).flatMap((landing) =>
    landing.ciudades.map((c) => landing.href(c)),
  )
  const fromGestoria = [
    ...GESTORIA_INDEXAR_PRIORIDAD_ALTA,
    ...GESTORIA_INDEXAR_PRIORIDAD_MEDIA,
    ...getGestoriaUrlsParaIndexar().filter((p) => p.startsWith('/contratos-inmobiliarios')),
  ]
  const portalHubs = CIUDADES_PORTAL_SLUGS.map((c) => `/${c}`)

  const barcelonaBarrios = [
    ...getBarcelonaAlquilerBarrioPaths(),
    ...getBarcelonaArrasBarrioPaths(),
    ...getBarcelonaHabitacionBarrioPaths(),
    ...getBarcelonaTemporadaBarrioPaths(),
    ...getBarcelonaVentaCompletaBarrioPaths(),
    ...getBarcelonaCompraCompletaBarrioPaths(),
    ...getBarcelonaPackArrasDocumentalBarrioPaths(),
  ]

  return [...new Set([...fromLandings, ...fromGestoria, ...portalHubs, ...barcelonaBarrios])].filter(
    (path) => isGestoriaPathIndexable(path) && shouldIncludePathInSitemap(path),
  )
}

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[0]['changeFrequency']>

function resolveChangeFrequency(path: string): ChangeFreq {
  if (path.endsWith('/contrato-alquiler') || path.endsWith('/contrato-arras')) {
    return 'weekly'
  }
  if (path.startsWith('/contratos-inmobiliarios')) {
    return 'weekly'
  }
  return 'monthly'
}

function resolvePriority(path: string): number {
  if (path.endsWith('/contrato-alquiler')) return 0.93
  if (path.startsWith('/contratos-inmobiliarios')) return path === '/contratos-inmobiliarios' ? 0.93 : 0.91
  if (path.endsWith('/contrato-arras') || path.endsWith('/contrato-alquiler')) return 0.85
  if (path.includes('/barcelona/contrato-arras/')) return 0.86
  if (path.includes('/barcelona/contrato-alquiler/')) return 0.86
  if (path.includes('/barcelona/contrato-alquiler-habitacion/')) return 0.86
  if (path.includes('/barcelona/alquiler-temporada/')) return 0.86
  if (path.endsWith('/alquiler-temporada')) return 0.86
  if (path.includes('/revision-correccion-arras/')) return 0.86
  if (path.match(/^\/gestoria\/[^/]+$/)) return 0.85
  if (path.includes('/pack-arras') || path.includes('/venta-completa') || path.includes('/asesoria-compra')) {
    return 0.87
  }
  if (path.startsWith('/gestoria/')) return 0.88
  if (CIUDADES_PORTAL_SLUGS.some((c) => path === `/${c}`)) return 0.92
  return 0.85
}

export function buildInventarioSitemapEntries(
  baseUrl: string,
  lastModified: Date,
): MetadataRoute.Sitemap {
  return collectIndexableMarketingPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: resolveChangeFrequency(path),
    priority: resolvePriority(path),
  }))
}

export function dedupeSitemapByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const byUrl = new Map<string, MetadataRoute.Sitemap[0]>()
  for (const entry of entries) {
    const prev = byUrl.get(entry.url)
    if (!prev || (entry.priority ?? 0) > (prev.priority ?? 0)) {
      byUrl.set(entry.url, entry)
    }
  }
  return [...byUrl.values()]
}
