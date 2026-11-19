import type { Metadata } from 'next'

import { PORTAL_EMBUDO_SEGMENTS } from '@/lib/portal-embudo-redirects'

/** Rutas legacy del portal de anuncios: accesibles pero fuera del índice. */
const PORTAL_LEGACY_NOINDEX_SUFFIXES = [
  '/pisos-particulares-sin-comision',
  '/publicar-anuncio',
  '/pisos',
] as const

const EMBUDO_SEGMENT_PATTERN = new RegExp(
  `/(${Object.keys(PORTAL_EMBUDO_SEGMENTS).join('|')})$`,
)

export function isPortalLegacyPath(path: string): boolean {
  if (PORTAL_LEGACY_NOINDEX_SUFFIXES.some((suffix) => path === suffix || path.endsWith(suffix))) {
    return true
  }
  if (path === '/pisos' || path.startsWith('/pisos/')) return true
  return EMBUDO_SEGMENT_PATTERN.test(path)
}

export function isMarketingPathIndexable(path: string): boolean {
  if (isPortalLegacyPath(path)) return false
  return true
}

export const PORTAL_LEGACY_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
}
