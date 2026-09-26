/** Ciudades del cluster premium gestoría (arras/LAU + servicios locales). */
export const LANDINGS_CIUDAD_PREMIUM_SLUGS = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'bilbao',
  'zaragoza',
  'alicante',
  'castellon',
  'murcia',
  'palma',
  'mallorca',
  'pamplona',
  'granada',
  'salamanca',
  'valladolid',
  'coruna',
  'asturias',
  'santander',
  'vitoria',
  'san-sebastian',
] as const

export type LandingsCiudadPremiumSlug = (typeof LANDINGS_CIUDAD_PREMIUM_SLUGS)[number]

export const LANDINGS_CIUDAD_PREMIUM_NOMBRES: Record<LandingsCiudadPremiumSlug, string> = {
  madrid: 'Madrid',
  barcelona: 'Barcelona',
  valencia: 'Valencia',
  sevilla: 'Sevilla',
  malaga: 'Málaga',
  bilbao: 'Bilbao',
  zaragoza: 'Zaragoza',
  alicante: 'Alicante',
  castellon: 'Castellón',
  murcia: 'Murcia',
  palma: 'Palma de Mallorca',
  mallorca: 'Mallorca',
  pamplona: 'Pamplona',
  granada: 'Granada',
  salamanca: 'Salamanca',
  valladolid: 'Valladolid',
  coruna: 'A Coruña',
  asturias: 'Asturias',
  santander: 'Santander',
  vitoria: 'Vitoria-Gasteiz',
  'san-sebastian': 'San Sebastián',
}

export function isLandingsCiudadPremium(slug: string): slug is LandingsCiudadPremiumSlug {
  return (LANDINGS_CIUDAD_PREMIUM_SLUGS as readonly string[]).includes(slug)
}

export function getLandingsCiudadPremiumNombre(slug: string): string | undefined {
  if (!isLandingsCiudadPremium(slug)) return undefined
  return LANDINGS_CIUDAD_PREMIUM_NOMBRES[slug]
}

/** Ciudades con portal ampliado (premium menos duplicado palma/mallorca → una entrada por slug). */
export const CIUDADES_PORTAL_EXTENDIDAS_SLUGS = LANDINGS_CIUDAD_PREMIUM_SLUGS.filter(
  (s) => s !== 'palma',
) as Exclude<LandingsCiudadPremiumSlug, 'palma'>[]
