/**
 * Ciudades con landings de portal activas ({slug}/alquiler-particulares, /pisos, etc.).
 * Debe coincidir con src/app/[ciudad]/alquiler-particulares/page.tsx y Footer.
 */
export const CIUDADES_PORTAL_SLUGS = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'bilbao',
  'zaragoza',
  'alicante',
] as const

export type CiudadPortalSlug = (typeof CIUDADES_PORTAL_SLUGS)[number]

export function isCiudadPortal(slug: string): slug is CiudadPortalSlug {
  return (CIUDADES_PORTAL_SLUGS as readonly string[]).includes(slug)
}

/** Nombres para UI — alineado con alquiler-particulares */
export const CIUDADES_PORTAL_NOMBRES: Record<CiudadPortalSlug, string> = {
  madrid: 'Madrid',
  barcelona: 'Barcelona',
  valencia: 'Valencia',
  sevilla: 'Sevilla',
  malaga: 'Málaga',
  bilbao: 'Bilbao',
  zaragoza: 'Zaragoza',
  alicante: 'Alicante',
}
