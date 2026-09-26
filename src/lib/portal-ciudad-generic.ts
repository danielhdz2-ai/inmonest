import {
  CIUDADES_PORTAL_EXTENDIDAS_SLUGS,
  getLandingsCiudadPremiumNombre,
  isLandingsCiudadPremium,
  type LandingsCiudadPremiumSlug,
} from '@/lib/landings-ciudad-premium'
import { getPortalCiudadEnriquecimiento } from '@/lib/portal-ciudad-enriquecimiento'

export type PortalCiudadDatos = {
  precio_medio: string
  barrios: string[]
  descripcion_seo: string
  faq: Array<{ q: string; a: string }>
}

export function isCiudadPortalExtendida(slug: string): slug is LandingsCiudadPremiumSlug {
  return (CIUDADES_PORTAL_EXTENDIDAS_SLUGS as readonly string[]).includes(slug)
}

export function getPortalCiudadDatos(slug: string, custom?: Partial<PortalCiudadDatos>): PortalCiudadDatos {
  const enriched = getPortalCiudadEnriquecimiento(slug)
  if (enriched) {
    const { metaTitle: _t, metaDescription: _d, ...datos } = enriched
    return { ...datos, ...custom }
  }
  const nombre = getLandingsCiudadPremiumNombre(slug) ?? slug
  const base: PortalCiudadDatos = {
    precio_medio: 'Consultar según barrio',
    barrios: ['Centro', 'Ensanche', 'Periferia'],
    descripcion_seo: `Pisos de alquiler de particulares en ${nombre} sin comisión de agencia. Inmonest conecta inquilinos y propietarios con trato directo. Contrato LAU desde 145€ con gestoría online.`,
    faq: [
      {
        q: `¿Cuánto cuesta alquilar un piso de particular en ${nombre}?`,
        a: `El precio depende del barrio y del tipo de vivienda. En ${nombre} puedes comparar anuncios de particulares en Inmonest y ahorrar la comisión de agencia (habitualmente una mensualidad o más).`,
      },
      {
        q: `¿Necesito contrato de alquiler en ${nombre}?`,
        a: 'Sí. Un contrato LAU bien redactado protege a propietario e inquilino. En Inmonest lo redactamos desde 145€ IVA incluido, 100% online.',
      },
      {
        q: '¿Cómo sé si el anuncio es de un particular?',
        a: 'En Inmonest priorizamos anuncios de particulares verificados para que el trato sea directo, sin intermediarios.',
      },
    ],
  }
  return { ...base, ...custom }
}

export function getPortalAlquilerParticularesMeta(slug: string): { title: string; description: string } | undefined {
  const e = getPortalCiudadEnriquecimiento(slug)
  if (!e) return undefined
  const nombre = getLandingsCiudadPremiumNombre(slug) ?? slug
  return {
    title: e.metaTitle,
    description:
      e.metaDescription ??
      `Pisos de alquiler de particulares en ${nombre} sin comisión. ${e.descripcion_seo.slice(0, 140)}…`,
  }
}

export function getPortalMercadoGenerico(slug: string) {
  const enriched = getPortalCiudadEnriquecimiento(slug)
  const nombre = getLandingsCiudadPremiumNombre(slug) ?? slug
  if (enriched) {
    return {
      precio_venta: 'Consultar',
      precio_alquiler: enriched.precio_medio,
      precio_m2: 'Consultar',
      tendencia_venta: 'Consultar',
      tendencia_alquiler: 'Estable',
      barrios: enriched.barrios,
      descripcion: enriched.descripcion_seo,
    }
  }
  return {
    precio_venta: 'Consultar',
    precio_alquiler: 'Consultar',
    precio_m2: 'Consultar',
    tendencia_venta: 'Estable',
    tendencia_alquiler: 'Estable',
    barrios: ['Centro', 'Ensanche', 'Periferia'],
    descripcion: `Mercado inmobiliario en ${nombre}: compra, venta y alquiler entre particulares con apoyo de gestoría Inmonest.`,
  }
}

export { CIUDADES_PORTAL_EXTENDIDAS_SLUGS, isLandingsCiudadPremium }
