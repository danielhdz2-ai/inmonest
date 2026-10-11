import type { Metadata } from 'next'
import { SERVICIOS_LANDING_CARDS } from '@/lib/gestoria-servicios-landings'
import { GESTORIA_SERVICIOS_CATALOGO } from '@/lib/gestoria-nav'

/** Checkout accesible pero fuera del índice (canonical hacia landing o catálogo). */
export const GESTORIA_CHECKOUT_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
}

const LANDING_BY_SOLICITAR_SLUG = Object.fromEntries(
  SERVICIOS_LANDING_CARDS.map((c) => [c.slug, c.landingHref]),
) as Record<string, string>

/** Slugs de checkout sin landing propia en /gestoria/{slug}. */
const LANDING_OVERRIDES: Record<string, string> = {
  'contrato-alquiler-barcelona': '/gestoria/contrato-alquiler',
}

export function isGestoriaSolicitarPath(path: string): boolean {
  return path === '/gestoria/solicitar' || path.startsWith('/gestoria/solicitar/')
}

/** Ruta indexable hacia la que apunta el canonical del checkout. */
export function getLandingPathForSolicitarSlug(slug: string): string {
  return LANDING_OVERRIDES[slug] ?? LANDING_BY_SOLICITAR_SLUG[slug] ?? `/gestoria/${slug}`
}

export function getSolicitarHubCanonicalPath(): string {
  return GESTORIA_SERVICIOS_CATALOGO
}
