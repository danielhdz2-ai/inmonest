import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import {
  CIUDADES_PORTAL_EXTENDIDAS_SLUGS,
  getCiudadPortalNombre,
  isCiudadPortalActiva,
} from '@/lib/ciudades-portal'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'
import { getPortalMercadoGenerico } from '@/lib/portal-ciudad-generic'

export const revalidate = 43200

const BASE_URL = 'https://inmonest.com'

const MERCADO_LEGACY: Record<
  string,
  {
    precio_venta: string
    precio_alquiler: string
    precio_m2: string
    tendencia_venta: string
    tendencia_alquiler: string
    descripcion: string
  }
> = {
  madrid: {
    precio_venta: '380.000 €',
    precio_alquiler: '1.450 €/mes',
    precio_m2: '4.200 €/m²',
    tendencia_venta: '+8 % anual',
    tendencia_alquiler: '+12 % anual',
    descripcion:
      'Madrid concentra demanda de alquiler y compraventa. Inmonest ayuda a particulares con contrato LAU y arras, no con buscador de anuncios.',
  },
  barcelona: {
    precio_venta: '420.000 €',
    precio_alquiler: '1.600 €/mes',
    precio_m2: '4.500 €/m²',
    tendencia_venta: '+10 % anual',
    tendencia_alquiler: '+9 % anual',
    descripcion:
      'Barcelona: mercado tensionado y normativa catalana (INCASÒL, IRAV). Formaliza alquiler o compra con gestoría online.',
  },
}

export function generateStaticParams() {
  return CIUDADES_PORTAL_EXTENDIDAS_SLUGS.map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) return {}
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  return {
    title: `Pisos en ${nombre}: gestoría LAU y arras para particulares`,
    description: `Guía de mercado en ${nombre} y servicios de gestoría Inmonest: contrato alquiler, arras y revisión legal. Sin portal de anuncios.`,
    alternates: { canonical: `${BASE_URL}/${ciudad}/pisos` },
    openGraph: {
      title: `Particulares en ${nombre} — gestoría Inmonest`,
      description: `Contrato LAU y arras en ${nombre}. 145 € · 48 h.`,
      url: `${BASE_URL}/${ciudad}/pisos`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function PisosCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) notFound()
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  const datos = getAlquilerParticularesCiudadDatos(ciudad)
  const mercado = MERCADO_LEGACY[ciudad] ?? getPortalMercadoGenerico(ciudad)

  return (
    <ParticularesGestoriaCiudadLanding
      ciudad={ciudad}
      nombre={nombre}
      precioMedio={datos.precio_medio}
      barrios={datos.barrios}
      intro={
        mercado.descripcion ||
        `Contexto de vivienda en ${nombre} para particulares. Inmonest es gestoría: contratos de alquiler LAU y arras.`
      }
      faqs={datos.faq}
      variant="pisos"
      mercado={mercado}
    />
  )
}
