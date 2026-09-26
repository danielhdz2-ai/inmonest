import type { Metadata } from 'next'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  LANDINGS_CIUDAD_PREMIUM_SLUGS,
  getLandingsCiudadPremiumNombre,
  type LandingsCiudadPremiumSlug,
} from '@/lib/landings-ciudad-premium'
import { REVISION_ARRAS_ENRIQUECIMIENTO } from '@/lib/revision-correccion-arras-ciudad-enriquecimiento'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'
export const REVISION_ARRAS_PRECIO = 120

export type RevisionCorreccionArrasCiudadConfig = {
  slug: LandingsCiudadPremiumSlug
  nombre: string
  region: string
  heroImage: string
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: { h1: string; lead: string; badge?: string }
  mercadoIntro: string
  alerta: { titulo: string; texto: string }
  riesgosLocales: string[]
  faqs: { q: string; a: string }[]
  gestorBio?: string
}

function regionForSlug(slug: LandingsCiudadPremiumSlug): string {
  if (slug === 'mallorca' || slug === 'palma') return 'Illes Balears'
  if (slug === 'castellon' || slug === 'valencia' || slug === 'alicante') return 'Comunitat Valenciana'
  if (slug === 'barcelona') return 'Cataluña'
  if (slug === 'sevilla' || slug === 'malaga' || slug === 'granada') return 'Andalucía'
  if (slug === 'bilbao' || slug === 'vitoria' || slug === 'san-sebastian') return 'País Vasco'
  if (slug === 'pamplona') return 'Navarra'
  if (slug === 'salamanca' || slug === 'valladolid') return 'Castilla y León'
  if (slug === 'coruna') return 'Galicia'
  if (slug === 'asturias') return 'Principado de Asturias'
  if (slug === 'santander') return 'Cantabria'
  if (slug === 'murcia') return 'Región de Murcia'
  if (slug === 'zaragoza') return 'Aragón'
  if (slug === 'madrid') return 'Comunidad de Madrid'
  return 'España'
}

function buildRevisionArrasConfig(slug: LandingsCiudadPremiumSlug): RevisionCorreccionArrasCiudadConfig {
  const nombre = getLandingsCiudadPremiumNombre(slug) ?? slug
  const e = REVISION_ARRAS_ENRIQUECIMIENTO[slug]
  return {
    slug,
    nombre,
    region: regionForSlug(slug),
    heroImage: getCiudadImage(slug === 'mallorca' ? 'palma' : slug).src,
    meta: e.meta,
    hero: e.hero,
    mercadoIntro: e.mercadoIntro,
    alerta: e.alerta,
    riesgosLocales: e.riesgosLocales,
    faqs: e.faqs,
    gestorBio: e.gestorBio,
  }
}

export const REVISION_CORRECCION_ARRAS_CIUDADES_LIST = LANDINGS_CIUDAD_PREMIUM_SLUGS.map((slug) => ({
  slug,
  nombre: getLandingsCiudadPremiumNombre(slug) ?? slug,
}))

export const REVISION_CORRECCION_ARRAS_CIUDADES: Record<
  LandingsCiudadPremiumSlug,
  RevisionCorreccionArrasCiudadConfig
> = Object.fromEntries(
  LANDINGS_CIUDAD_PREMIUM_SLUGS.map((slug) => [slug, buildRevisionArrasConfig(slug)]),
) as Record<LandingsCiudadPremiumSlug, RevisionCorreccionArrasCiudadConfig>

export function getRevisionCorreccionArrasCiudad(
  slug: string,
): RevisionCorreccionArrasCiudadConfig | undefined {
  return REVISION_CORRECCION_ARRAS_CIUDADES[slug as LandingsCiudadPremiumSlug]
}

export function buildRevisionCorreccionArrasMetadata(
  config: RevisionCorreccionArrasCiudadConfig,
): Metadata {
  const path = `/gestoria/revision-correccion-arras/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: { canonical: `${BASE_URL}${path}` },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}${path}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Revisión arras ${config.nombre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      images: [`${BASE_URL}${config.heroImage}`],
    },
  })
}

export const REVISION_ARRAS_GESTOR = {
  nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
  foto: GESTOR_DANIEL_HERNANDEZ.foto,
  rol: 'Gestor inmobiliario · Revisión de arras',
  bio: 'Revisa borradores de arras penitenciales y confirmatorias: importe de señal, plazo a escritura, cláusula de hipoteca, penalizaciones y datos registrales.',
}
