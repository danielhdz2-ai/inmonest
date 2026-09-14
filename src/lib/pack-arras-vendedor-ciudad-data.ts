import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { withGestoriaIndexRobots } from './gestoria-indexacion-tier'
import {
  VENTA_COMPLETA_CIUDADES,
  VENTA_COMPLETA_CIUDADES_LIST,
  type VentaCompletaCiudadConfig,
} from './venta-completa-ciudad-data'

const BASE_URL = 'https://inmonest.com'

export const PACK_ARRAS_VENDEDOR_PRECIO = 450
export const PACK_ARRAS_VENDEDOR_SERVICIO_SLUG = 'pack-arras-plus-vendedor'

export type PackArrasVendedorCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  gestor: {
    nombre: string
    rol: string
    foto: string
    bio: string
  }
  zonas: string[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    h1: string
    lead: string
  }
  faqPrioritarias?: DueDiligenceFaqItem[]
}

function fromVenta(v: VentaCompletaCiudadConfig): PackArrasVendedorCiudadConfig {
  return {
    slug: v.slug,
    nombre: v.nombre,
    region: v.region,
    testimoniosLanding: `pack-arras-vendedor-${v.slug}`,
    heroImage: v.heroImage,
    precioEjemploPiso: v.precioEjemploPiso,
    gestor: {
      nombre: v.gestor.nombre,
      rol: `Gestor inmobiliario · Pack vendedor ${v.nombre}`,
      foto: v.gestor.foto,
      bio: v.gestor.bio.replace(/687€|687 €/g, '450€ en el pack vendedor'),
    },
    zonas: v.zonas,
    meta: {
      title: `Pack Arras Plus Vendedor ${v.nombre} desde 450€`,
      description: `¿Vendes piso a particular en ${v.nombre}? Arras penitenciales redactadas + revisión documental. ${PACK_ARRAS_VENDEDOR_PRECIO}€ sin comisión de agencia.`,
      keywords: `pack arras vendedor ${v.slug}, vender piso particular ${v.nombre}, gestoria venta ${v.nombre}, arras penitenciales vendedor ${v.nombre}, vender sin agencia ${v.nombre}`,
      ogTitle: `Pack Arras Vendedor ${v.nombre} — 450€`,
      ogDescription: `Arras + documentación para vendedores particulares en ${v.nombre}.`,
    },
    hero: {
      h1: `Vende en ${v.nombre} con arras redactadas y documentación lista — 450€`,
      lead: `Ya tienes comprador. Redactamos arras penitenciales, revisamos nota simple, comunidad e ITE, y te orientamos hacia notaría. Gestoría para vendedores particulares en ${v.nombre}, no agencia.`,
    },
    faqPrioritarias: v.faqPrioritarias,
  }
}

export const PACK_ARRAS_VENDEDOR_CIUDADES_LIST = VENTA_COMPLETA_CIUDADES_LIST

export const PACK_ARRAS_VENDEDOR_CIUDADES: Record<string, PackArrasVendedorCiudadConfig> =
  Object.fromEntries(Object.values(VENTA_COMPLETA_CIUDADES).map((v) => [v.slug, fromVenta(v)]))

export function buildPackArrasVendedorMetadata(config: PackArrasVendedorCiudadConfig): Metadata {
  const path = `/gestoria/pack-arras-plus-vendedor/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/pack-arras-plus-vendedor/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/pack-arras-plus-vendedor/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Pack Arras Vendedor ${config.nombre}`,
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

export { comisionAgenciaMin, comisionAgenciaMax } from './venta-completa-ciudad-data'
