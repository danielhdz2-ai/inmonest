import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import ContratosInmobiliariosContent from './ContratosInmobiliariosContent'
import {
  buildGestoriaAggregateRatingSchema,
  buildGestoriaReviewSchema,
} from '@/lib/gestoria-reviews-schema'
import { GESTORIA_PRECIO_MIN } from '@/lib/gestoria-catalogo'
import { CONTRATOS_INMOBILIARIOS_FAQ } from '@/lib/contratos-inmobiliarios-config'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contratos inmobiliarios para particulares | Redacción profesional',
  description: `Redactamos contratos inmobiliarios para particulares: arras, alquiler LAU y compraventa. Expertos en derecho inmobiliario. Desde ${GESTORIA_PRECIO_MIN} € en 48 h. Sin plantillas genéricas.`,
  keywords:
    'contratos inmobiliarios, contratos inmobiliarios particulares, redactamos contratos inmobiliarios, redacción contratos inmobiliarios, contrato arras particulares, contrato alquiler LAU, gestoría contratos inmobiliarios',
  alternates: {
    canonical: `${BASE_URL}/contratos-inmobiliarios`,
  },
  openGraph: {
    title: 'Contratos inmobiliarios redactados por profesionales',
    description: `Expertos en contratos inmobiliarios para particulares. Arras, alquiler LAU y compraventa desde ${GESTORIA_PRECIO_MIN} €. Entrega 48 h.`,
    url: `${BASE_URL}/contratos-inmobiliarios`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [
      {
        url: `${BASE_URL}/gestoria1.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contratos inmobiliarios Inmonest — redacción profesional para particulares',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contratos inmobiliarios para particulares | Inmonest',
    description: `Redacción profesional de contratos inmobiliarios. Desde ${GESTORIA_PRECIO_MIN} € en 48 h.`,
    images: [`${BASE_URL}/gestoria1.jpg`],
  },
}

const legalServiceSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Inmonest — Contratos inmobiliarios para particulares',
  description:
    'Redacción profesional de contratos inmobiliarios para particulares: arras penitenciales, alquiler LAU, reserva de compra, préstamos entre particulares y packs documentales. Portal inmobiliario + gestoría online en toda España.',
  url: `${BASE_URL}/contratos-inmobiliarios`,
  image: `${BASE_URL}/logo.png`,
  priceRange: '€',
  telephone: '+34745022862',
  email: 'hola@inmonest.com',
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
  },
  areaServed: { '@type': 'Country', name: 'España' },
  serviceType: [
    'Redacción de contratos inmobiliarios',
    'Contratos de arras penitenciales',
    'Contratos de alquiler LAU',
    'Contratos de compraventa entre particulares',
  ],
  aggregateRating: buildGestoriaAggregateRatingSchema(),
  review: buildGestoriaReviewSchema(),
})

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTRATOS_INMOBILIARIOS_FAQ.map(({ q, a }) => ({
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
  ],
})

export default function ContratosInmobiliariosPage() {
  return (
    <>
      <Script
        id="schema-contratos-legal"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: legalServiceSchema }}
      />
      <Script
        id="schema-contratos-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <Script
        id="schema-contratos-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Navbar />
      <ContratosInmobiliariosContent />
      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad="España"
        ciudadSlug="contratos-inmobiliarios"
        servicio="gestoria"
        whatsappMessage="Hola, necesito redactar un contrato inmobiliario con Inmonest"
      />
      <WhatsAppButton />
    </>
  )
}
