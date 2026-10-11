import type { Metadata } from 'next'

/** Rutas legacy del portal de anuncios: accesibles pero fuera del índice. */
const PORTAL_LEGACY_NOINDEX_SUFFIXES = [
  '/pisos-particulares-sin-comision',
  '/publicar-anuncio',
] as const

export function isPortalLegacyPath(path: string): boolean {
  return PORTAL_LEGACY_NOINDEX_SUFFIXES.some(
    (suffix) => path === suffix || path.endsWith(suffix),
  )
}

export function isMarketingPathIndexable(path: string): boolean {
  if (isPortalLegacyPath(path)) return false
  return true
}

export const PORTAL_LEGACY_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
}
