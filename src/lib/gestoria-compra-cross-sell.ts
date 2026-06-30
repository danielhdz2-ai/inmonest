/** Ciudades con landing de asesoría compra (687€) */
export const ASESORIA_COMPRA_CIUDADES = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
] as const

/** Ciudades con landing de due diligence (350€) */
export const DUE_DILIGENCE_CIUDADES = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'bilbao',
  'zaragoza',
  'coruna',
] as const

const CITY_SLUG_ALIASES: Record<string, string> = {
  'a coruña': 'coruna',
  'la coruña': 'coruna',
  coruna: 'coruna',
  'coruña': 'coruna',
  málaga: 'malaga',
  malaga: 'malaga',
  'palma de mallorca': 'palma',
  palma: 'palma',
}

export function normalizeCiudadSlug(city: string | null | undefined): string | null {
  if (!city?.trim()) return null
  const key = city
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
  return CITY_SLUG_ALIASES[key] ?? key.replace(/\s+/g, '-')
}

export function getDueDiligenceHref(ciudadSlug: string | null | undefined): string {
  const slug = ciudadSlug?.toLowerCase()
  if (slug && (DUE_DILIGENCE_CIUDADES as readonly string[]).includes(slug)) {
    return `/gestoria/due-diligence-precompra/${slug}`
  }
  return '/gestoria/due-diligence-precompra'
}

export function getAsesoriaCompraHref(ciudadSlug: string | null | undefined): string {
  const slug = ciudadSlug?.toLowerCase()
  if (slug && (ASESORIA_COMPRA_CIUDADES as readonly string[]).includes(slug)) {
    return `/gestoria/asesoria-compra-piso/${slug}`
  }
  return '/gestoria/asesoria-compra-piso'
}

export function hasDueDiligenceCiudad(ciudadSlug: string): boolean {
  return (DUE_DILIGENCE_CIUDADES as readonly string[]).includes(ciudadSlug)
}

export function hasAsesoriaCompraCiudad(ciudadSlug: string): boolean {
  return (ASESORIA_COMPRA_CIUDADES as readonly string[]).includes(ciudadSlug)
}
