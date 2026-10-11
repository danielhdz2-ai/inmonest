import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import {
  CIUDADES_PORTAL_EXTENDIDAS_SLUGS,
  getCiudadPortalNombre,
  isCiudadPortalActiva,
} from '@/lib/ciudades-portal'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'

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
  const lau = precioLabel('contrato-alquiler', ciudad)
  return {
    title: `Alquiler sin agencia en ${nombre} — contrato LAU ${lau} | Inmonest`,
    description: `Alquila en ${nombre} sin comisión de agencia: tú eliges piso o inquilino e Inmonest redacta LAU, temporada o habitación. Sin portal de anuncios.`,
    alternates: { canonical: `${BASE_URL}/${ciudad}/alquiler-sin-agencia` },
    openGraph: {
      title: `Alquiler sin agencia ${nombre} — gestoría online`,
      description: `Contratos blindados para particulares en ${nombre}.`,
      url: `${BASE_URL}/${ciudad}/alquiler-sin-agencia`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function AlquilerSinAgenciaPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) notFound()
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  const datos = getAlquilerParticularesCiudadDatos(ciudad)
  const faqs = [
    {
      q: `¿Puedo alquilar sin agencia en ${nombre}?`,
      a: 'Sí: la búsqueda la haces tú; Inmonest cubre la parte jurídica con contrato LAU, temporada o habitación y panel de cliente.',
    },
    ...datos.faq,
  ]

  return (
    <ParticularesGestoriaCiudadLanding
      ciudad={ciudad}
      nombre={nombre}
      precioMedio={datos.precio_medio}
      barrios={datos.barrios}
      intro={datos.descripcion_seo}
      faqs={faqs}
      variant="alquiler-sin-agencia"
    />
  )
}
