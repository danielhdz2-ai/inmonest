import type { Metadata } from 'next'
import { PORTAL_LEGACY_ROBOTS } from '@/lib/portal-legacy-seo'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'
import { getLandingsCiudadPremiumNombre } from '@/lib/landings-ciudad-premium'

const BASE_URL = 'https://inmonest.com'

export const PISOS_SIN_COMISION_CIUDADES = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
] as const

export type PisosSinComisionCiudad = (typeof PISOS_SIN_COMISION_CIUDADES)[number]

export function isPisosSinComisionCiudad(slug: string): slug is PisosSinComisionCiudad {
  return (PISOS_SIN_COMISION_CIUDADES as readonly string[]).includes(slug)
}

export function buildPisosSinComisionMetadata(ciudad: PisosSinComisionCiudad): Metadata {
  const nombre = getLandingsCiudadPremiumNombre(ciudad) ?? ciudad
  return {
    title: `Pisos particulares ${nombre} sin comisión — gestoría LAU | Inmonest`,
    description: `Ya no buscamos anuncios en ${nombre}: gestoría para alquiler LAU, temporada, habitación y compraventa entre particulares. Contratos desde 145 €, 48 h.`,
    alternates: { canonical: `${BASE_URL}/${ciudad}/pisos-particulares-sin-comision` },
    robots: PORTAL_LEGACY_ROBOTS,
    openGraph: {
      title: `Particulares en ${nombre} — contratos, no comisiones de agencia`,
      description: `Transición a servicio de gestoría inmobiliaria online en ${nombre}.`,
      url: `${BASE_URL}/${ciudad}/pisos-particulares-sin-comision`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export function getPisosSinComisionLandingProps(ciudad: PisosSinComisionCiudad) {
  const nombre = getLandingsCiudadPremiumNombre(ciudad) ?? ciudad
  const datos = getAlquilerParticularesCiudadDatos(ciudad)
  const faqExtra = {
    q: '¿Dónde veo pisos sin comisión ahora?',
    a: 'Inmonest ya no publica anuncios. Puedes buscar piso por tu cuenta y nosotros redactamos el contrato LAU, temporada o habitación, o te acompañamos en compra/venta con arras e integral.',
  }
  return {
    ciudad,
    nombre,
    precioMedio: datos.precio_medio,
    barrios: datos.barrios,
    intro: datos.descripcion_seo,
    faqs: [faqExtra, ...datos.faq],
  }
}
