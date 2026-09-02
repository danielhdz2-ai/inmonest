import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import ContratosInmobiliariosCiudadContent from './ContratosInmobiliariosCiudadContent'
import {
  buildGestoriaAggregateRatingSchema,
  buildGestoriaReviewSchema,
} from '@/lib/gestoria-reviews-schema'
import {
  CONTRATOS_INMOBILIARIOS_CIUDAD_SLUGS,
  getContratosInmobiliariosCiudad,
  isContratosInmobiliariosCiudad,
} from '@/lib/contratos-inmobiliarios-ciudades'

const BASE_URL = 'https://inmonest.com'

export function generateStaticParams() {
  return CONTRATOS_INMOBILIARIOS_CIUDAD_SLUGS.map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad: slug } = await params
  const cfg = getContratosInmobiliariosCiudad(slug)
  if (!cfg) return {}

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    keywords: cfg.keywords,
    alternates: {
      canonical: `${BASE_URL}/contratos-inmobiliarios/${cfg.slug}`,
    },
    openGraph: {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      url: `${BASE_URL}/contratos-inmobiliarios/${cfg.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${cfg.heroImage.src}`,
          width: 1200,
          height: 630,
          alt: cfg.heroImage.alt,
        },
      ],
    },
  }
}

export default async function ContratosInmobiliariosCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad: slug } = await params
  if (!isContratosInmobiliariosCiudad(slug)) notFound()
  const cfg = getContratosInmobiliariosCiudad(slug)!

  const legalSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Inmonest — Contratos inmobiliarios en ${cfg.nombre}`,
    description: cfg.metaDescription,
    url: `${BASE_URL}/contratos-inmobiliarios/${cfg.slug}`,
    areaServed: { '@type': 'City', name: cfg.nombre },
    aggregateRating: buildGestoriaAggregateRatingSchema(),
    review: buildGestoriaReviewSchema(),
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contratos inmobiliarios',
        item: `${BASE_URL}/contratos-inmobiliarios`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cfg.nombre,
        item: `${BASE_URL}/contratos-inmobiliarios/${cfg.slug}`,
      },
    ],
  })

  return (
    <>
      <Script
        id={`schema-contratos-${cfg.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: legalSchema }}
      />
      <Script
        id={`schema-contratos-faq-${cfg.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <Script
        id={`schema-contratos-bc-${cfg.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Navbar />
      <ContratosInmobiliariosCiudadContent ciudad={cfg} />
      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad={cfg.nombre}
        ciudadSlug={cfg.slug}
        servicio="gestoria"
        whatsappMessage={`Hola, necesito redactar un contrato inmobiliario en ${cfg.nombre} con Inmonest`}
      />
      <WhatsAppButton />
    </>
  )
}
