import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import AgenciasGestoriaContent from '@/app/agencias/gestoria/AgenciasGestoriaContent'
import {
  AGENCIAS_GESTORIA_CIUDAD_SLUGS,
  getAgenciaGestoriaCiudad,
  gestoriaAgenciasCiudadUrl,
  isAgenciaGestoriaCiudadSlug,
} from '@/lib/agencias-gestoria-ciudades'

const BASE_URL = 'https://inmonest.com'

type Props = {
  params: Promise<{ ciudad: string }>
}

export function generateStaticParams() {
  return AGENCIAS_GESTORIA_CIUDAD_SLUGS.map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad: slug } = await params
  const ciudad = getAgenciaGestoriaCiudad(slug)
  if (!ciudad) return {}

  const url = gestoriaAgenciasCiudadUrl(ciudad.slug)

  return {
    title: ciudad.gestoriaAgenciasTitle,
    description: ciudad.gestoriaAgenciasDescription,
    alternates: { canonical: url },
    keywords: ciudad.gestoriaAgenciasKeywords.join(', '),
    openGraph: {
      title: ciudad.gestoriaAgenciasTitle,
      description: ciudad.gestoriaAgenciasDescription,
      url,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${ciudad.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Contratos para agencias inmobiliarias en ${ciudad.nombre}`,
        },
      ],
    },
  }
}

export default async function GestoriaCiudadAgenciasPage({ params }: Props) {
  const { ciudad: slug } = await params
  if (!isAgenciaGestoriaCiudadSlug(slug)) notFound()

  const ciudad = getAgenciaGestoriaCiudad(slug)!
  const url = gestoriaAgenciasCiudadUrl(ciudad.slug)

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: `Contratos para agencias inmobiliarias en ${ciudad.nombre}`,
          description: ciudad.gestoriaAgenciasDescription,
          url,
          areaServed: {
            '@type': 'City',
            name: ciudad.nombre,
            containedInPlace: { '@type': 'AdministrativeArea', name: ciudad.region },
          },
          provider: {
            '@type': 'Organization',
            name: 'Inmonest',
            url: BASE_URL,
          },
          offers: {
            '@type': 'Offer',
            price: '110',
            priceCurrency: 'EUR',
            description: 'Contratos inmobiliarios B2B para agencias — entrega 4–5 h',
          },
        }}
      />
      <Navbar />
      <AgenciasGestoriaContent ciudad={ciudad} urlTree="gestoria" />
    </>
  )
}
