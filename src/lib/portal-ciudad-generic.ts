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
    descripcion_seo: `Alquiler entre particulares en ${nombre}: Inmonest es gestoría online (contrato LAU, arras, revisión). Sin portal de anuncios. Desde 145 € IVA incl., entrega 48 h.`,
    faq: [
      {
        q: `¿Cuánto cuesta el contrato LAU en ${nombre}?`,
        a: '145 € IVA incluido en Inmonest, con gestor y entrega en 48 h.',
      },
      {
        q: `¿Necesito contrato de alquiler en ${nombre}?`,
        a: 'Sí. Un contrato LAU bien redactado protege a propietario e inquilino. Lo redactamos 100 % online.',
      },
      {
        q: '¿Inmonest busca pisos por mí?',
        a: 'No. Somos gestoría: tú encuentras piso o inquilino y nosotros formalizamos el contrato con seguridad jurídica.',
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
