import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import {
  CIUDADES_PORTAL_EXTENDIDAS_SLUGS,
  getCiudadPortalNombre,
  isCiudadPortalActiva,
} from '@/lib/ciudades-portal'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'
import { getPortalAlquilerParticularesMeta } from '@/lib/portal-ciudad-generic'

export const revalidate = 43200

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
  const datos = getAlquilerParticularesCiudadDatos(ciudad)
  const portalMeta = getPortalAlquilerParticularesMeta(ciudad)
  return {
    title:
      portalMeta?.title ??
      `Alquiler entre particulares en ${nombre}: contrato LAU con gestoría`,
    description:
      portalMeta?.description ??
      `Gestoría para particulares en ${nombre}. Contrato de alquiler LAU 145 €, 48 h. Sin portal de anuncios. Renta orientativa: ${datos.precio_medio}.`,
    keywords: `contrato alquiler ${nombre.toLowerCase()} particulares, LAU ${nombre.toLowerCase()}, gestoría alquiler ${nombre.toLowerCase()}`,
    alternates: { canonical: `${BASE_URL}/${ciudad}/alquiler-particulares` },
    openGraph: {
      title: `Alquiler particulares ${nombre} — contrato LAU | Inmonest`,
      description: datos.descripcion_seo.slice(0, 160),
      url: `${BASE_URL}/${ciudad}/alquiler-particulares`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function AlquilerParticularesPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) notFound()
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  const datos = getAlquilerParticularesCiudadDatos(ciudad)

  return (
    <ParticularesGestoriaCiudadLanding
      ciudad={ciudad}
      nombre={nombre}
      precioMedio={datos.precio_medio}
      barrios={datos.barrios}
      intro={datos.descripcion_seo}
      faqs={datos.faq}
      variant="alquiler-particulares"
    />
  )
}
