/** Ciudades gestoría fuera del cluster premium original — SEO geográfico */
export const GESTORIA_CIUDADES_EXPANSION_SLUGS = [
  'vigo',
  'cordoba',
  'las-palmas',
  'santa-cruz',
  'cadiz',
  'badajoz',
  'toledo',
  'tarragona',
  'almeria',
  'gijon',
] as const

export type GestoriaCiudadExpansionSlug = (typeof GESTORIA_CIUDADES_EXPANSION_SLUGS)[number]

export const GESTORIA_CIUDADES_EXPANSION_NOMBRES: Record<GestoriaCiudadExpansionSlug, string> = {
  vigo: 'Vigo',
  cordoba: 'Córdoba',
  'las-palmas': 'Las Palmas de Gran Canaria',
  'santa-cruz': 'Santa Cruz de Tenerife',
  cadiz: 'Cádiz',
  badajoz: 'Badajoz',
  toledo: 'Toledo',
  tarragona: 'Tarragona',
  almeria: 'Almería',
  gijon: 'Gijón',
}

export function getGestoriaCiudadExpansionNombre(slug: string): string | undefined {
  return GESTORIA_CIUDADES_EXPANSION_NOMBRES[slug as GestoriaCiudadExpansionSlug]
}

export function isGestoriaCiudadExpansion(slug: string): slug is GestoriaCiudadExpansionSlug {
  return (GESTORIA_CIUDADES_EXPANSION_SLUGS as readonly string[]).includes(slug)
}
