import type { MetadataRoute } from 'next'
import { LANDINGS_POR_CIUDAD } from '@/lib/gestoria-ciudades-inventario'
import { getGestoriaUrlsParaIndexar } from '@/lib/gestoria-indexar-urls'
import { isGestoriaPathIndexable } from '@/lib/gestoria-indexacion-tier'
import { CIUDADES_PORTAL_SLUGS } from '@/lib/ciudades-portal'

/** Rutas de landings (portal + gestoría) alineadas con LANDINGS_POR_CIUDAD y listas GSC. */
export function collectIndexableMarketingPaths(): string[] {
  const fromLandings = LANDINGS_POR_CIUDAD.flatMap((landing) =>
    landing.ciudades.map((c) => landing.href(c)),
  )
  const fromGestoria = getGestoriaUrlsParaIndexar()
  const portalHubs = CIUDADES_PORTAL_SLUGS.map((c) => `/${c}`)

  return [...new Set([...fromLandings, ...fromGestoria, ...portalHubs])].filter((path) =>
    isGestoriaPathIndexable(path),
  )
}

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[0]['changeFrequency']>

function resolveChangeFrequency(path: string): ChangeFreq {
  if (path.endsWith('/alquiler-particulares') || path.endsWith('/pisos-particulares-sin-comision')) {
    return 'daily'
  }
  if (path.endsWith('/pisos') || path.startsWith('/contratos-inmobiliarios')) {
    return 'weekly'
  }
  return 'monthly'
}

function resolvePriority(path: string): number {
  if (path.endsWith('/pisos-particulares-sin-comision')) return 0.95
  if (path.endsWith('/alquiler-particulares')) return 0.92
  if (path.endsWith('/pisos')) return 0.9
  if (path.startsWith('/contratos-inmobiliarios')) return path === '/contratos-inmobiliarios' ? 0.93 : 0.91
  if (path.endsWith('/contrato-arras') || path.endsWith('/contrato-alquiler')) return 0.85
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
