import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import AgenciasGestoriaContent from '../AgenciasGestoriaContent'
import {
  AGENCIAS_GESTORIA_CIUDAD_SLUGS,
  getAgenciaGestoriaCiudad,
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

  const url = `${BASE_URL}/agencias/gestoria/${ciudad.slug}`

  return {
    title: ciudad.metaTitle,
    description: ciudad.metaDescription,
    alternates: { canonical: url },
    keywords: ciudad.keywords.join(', '),
    openGraph: {
      title: ciudad.metaTitle,
      description: ciudad.metaDescription,
      url,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${ciudad.heroImage}`,
          width: 1200,
          height: 630,
          alt: ciudad.heroImageAlt,
        },
      ],
    },
  }
}

export default async function AgenciasGestoriaCiudadPage({ params }: Props) {
  const { ciudad: slug } = await params
  if (!isAgenciaGestoriaCiudadSlug(slug)) notFound()

  const ciudad = getAgenciaGestoriaCiudad(slug)!
  const url = `${BASE_URL}/agencias/gestoria/${ciudad.slug}`

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: `Gestoría inmobiliaria B2B para agencias en ${ciudad.nombre}`,
          description: ciudad.metaDescription,
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
            description: 'Contrato inmobiliario B2B con entrega en 4–5 horas',
          },
        }}
      />
      <Navbar />
      <AgenciasGestoriaContent ciudad={ciudad} />
    </>
  )
}
