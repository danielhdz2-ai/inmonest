import type { Metadata } from 'next'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  LANDINGS_CIUDAD_PREMIUM_SLUGS,
  getLandingsCiudadPremiumNombre,
  type LandingsCiudadPremiumSlug,
} from '@/lib/landings-ciudad-premium'
import { ALQUILER_TEMPORADA_ENRIQUECIMIENTO } from '@/lib/alquiler-temporada-ciudad-enriquecimiento'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

const BASE_URL = 'https://inmonest.com'

export type AlquilerTemporadaCiudadConfig = {
  slug: LandingsCiudadPremiumSlug
  nombre: string
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
  casosUso: string[]
  normativaBullets: string[]
  faqs: { q: string; a: string }[]
}

function buildTemporadaConfig(slug: LandingsCiudadPremiumSlug): AlquilerTemporadaCiudadConfig {
  const nombre = getLandingsCiudadPremiumNombre(slug) ?? slug
  const imageSlug = slug === 'mallorca' ? 'palma' : slug
  const e = ALQUILER_TEMPORADA_ENRIQUECIMIENTO[slug]
  return {
    slug,
    nombre,
    heroImage: getCiudadImage(imageSlug).src,
    meta: e.meta,
    hero: e.hero,
    mercadoIntro: e.mercadoIntro,
    casosUso: e.casosUso,
    normativaBullets: e.normativaBullets,
    faqs: e.faqs,
  }
}

export const ALQUILER_TEMPORADA_CIUDADES_LIST = LANDINGS_CIUDAD_PREMIUM_SLUGS.map((slug) => ({
  slug,
  nombre: getLandingsCiudadPremiumNombre(slug) ?? slug,
}))

export const ALQUILER_TEMPORADA_CIUDADES: Record<
  LandingsCiudadPremiumSlug,
  AlquilerTemporadaCiudadConfig
> = Object.fromEntries(
  LANDINGS_CIUDAD_PREMIUM_SLUGS.map((slug) => [slug, buildTemporadaConfig(slug)]),
) as Record<LandingsCiudadPremiumSlug, AlquilerTemporadaCiudadConfig>

export function getAlquilerTemporadaCiudad(slug: string): AlquilerTemporadaCiudadConfig | undefined {
  return ALQUILER_TEMPORADA_CIUDADES[slug as LandingsCiudadPremiumSlug]
}

export function getAlquilerTemporadaPrecio(): number {
  return getPrecioServicio('alquiler-temporada') ?? 145
}

export function buildAlquilerTemporadaCiudadMetadata(config: AlquilerTemporadaCiudadConfig): Metadata {
  const path = `/${config.slug}/alquiler-temporada`
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
          alt: `Alquiler temporada ${config.nombre}`,
        },
      ],
    },
  })
}
