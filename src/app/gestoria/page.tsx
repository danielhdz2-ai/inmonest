import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/NavbarServer'
import GestoriaContent from './GestoriaContent'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria Online | Contratos Arras, Alquiler y Compraventa',
  description: 'Gestoría inmobiliaria especializada online. Contratos de arras, alquiler LAU, compraventa. Abogados expertos en derecho inmobiliario. Desde 29€. Servicio en toda España: Madrid, Barcelona, Valencia, Sevilla. Entrega 24-48h.',
  keywords: 'gestoría inmobiliaria, gestoría inmobiliaria online, contrato arras penitenciales, contrato alquiler LAU, gestoría compraventa vivienda, abogado inmobiliario, contratos inmobiliarios, gestoría barcelona, gestoría madrid, gestoría valencia',
  alternates: {
    canonical: `${BASE_URL}/gestoria`,
  },
  openGraph: {
    title: 'Gestoría Inmobiliaria Online — Inmonest',
    description: 'Gestoría especializada en contratos de alquiler y compraventa. Tramitamos LAU, arras, rescisión y más. Abogados especializados, sin plantillas genéricas. Desde 29€.',
    url: `${BASE_URL}/gestoria`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria — contratos redactados por abogados' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestoría Inmobiliaria Online | Contratos Arras, Alquiler y Compraventa',
    description:
      'Contratos de arras, alquiler LAU y compraventa redactados por abogados. Desde 29€. Entrega en 48h. Servicio en toda España.',
    images: [`${BASE_URL}/gestoria1.jpg`],
  },
}

const SCHEMA_ITEM_REVIEWED = {
  '@type': 'Organization',
  name: 'Inmonest',
  url: BASE_URL,
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Inmonest Gestoría Inmobiliaria Online',
  description: 'Gestoría inmobiliaria online especializada en contratos de alquiler LAU, arras penitenciales, compraventa, rescisión y revisión legal. Redactados por abogados expertos en derecho inmobiliario. Servicio en toda España. Entrega en 24-48h. Desde 29€.',
  url: `${BASE_URL}/gestoria`,
  image: `${BASE_URL}/logo.png`,
  priceRange: '€€',
  telephone: '+34641008847',
  email: 'hola@inmonest.com',
  
  // Proveedor
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    telephone: '+34641008847',
    email: 'hola@inmonest.com',
  },
  
  // Área de servicio
  areaServed: [
    { '@type': 'City', name: 'Madrid' },
    { '@type': 'City', name: 'Barcelona' },
    { '@type': 'City', name: 'Valencia' },
    { '@type': 'City', name: 'Sevilla' },
    { '@type': 'Country', name: 'España' }
  ],
  
  // Servicios ofrecidos
  serviceType: [
    'Contratos de arras penitenciales',
    'Contratos de alquiler LAU',
    'Contratos de compraventa',
    'Revisión legal de contratos',
    'Asesoría inmobiliaria',
    'Gestión documental inmobiliaria'
  ],
  
  // Catálogo de servicios
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de gestoría inmobiliaria',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Arras Penitenciales',
          description: 'Contrato de arras penitenciales redactado por abogados. Protege tu señal de compra con cláusulas de desistimiento.',
          url: `${BASE_URL}/gestoria/solicitar/arras-penitenciales`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '145',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Alquiler LAU',
          description: 'Contrato de arrendamiento de vivienda habitual según Ley 29/1994 actualizado a Ley de Vivienda 2026.',
          url: `${BASE_URL}/gestoria/solicitar/alquiler-vivienda-lau`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '120',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Alquiler Temporal',
          description: 'Contrato para alquileres temporales (vacaciones, estudios, trabajo). Exento de prórrogas LAU.',
          url: `${BASE_URL}/gestoria/solicitar/alquiler-temporada`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '97',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Reserva de Alquiler',
          description: 'Formaliza la reserva del inmueble mientras preparas la documentación. Bloqueo jurídico 48-72h.',
          url: `${BASE_URL}/gestoria/solicitar/reserva-alquiler`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '61',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Rescisión de Alquiler',
          description: 'Finaliza tu contrato de alquiler legalmente. Acta de entrega y liquidación de fianza.',
          url: `${BASE_URL}/gestoria/solicitar/rescision-alquiler`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '73',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pack Due Diligence Pre-Compra',
          description: 'Gestor inmobiliario experto revisa toda la documentación de tu futura vivienda: nota simple, cargas, deudas, hipotecas, comunidad, IBI, cédula de habitabilidad, ITE. Evita sorpresas de 10.000€+ antes de escriturar. Ideal para compras particular a particular con arras ya firmado.',
          url: `${BASE_URL}/gestoria/solicitar/pack-due-diligence-precompra`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '350',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          }
        }
      }
    ]
  },
  
  // Contacto
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'hola@inmonest.com',
    availableLanguage: 'Spanish'
  },
  
  // Reseñas agregadas (para mostrar estrellas ⭐⭐⭐⭐⭐ en Google)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '4',
    bestRating: '5',
    worstRating: '1'
  },
  
  // Reseñas individuales
  review: [
    {
      '@type': 'Review',
      itemReviewed: SCHEMA_ITEM_REVIEWED,
      author: {
        '@type': 'Person',
        name: 'zonetechonline'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Tramite el contrato de arras, me ayudaron en todo el proceso de documentación, lo recomiendo bastante, muy ágiles, muy rápidos y muy profesionales',
      datePublished: '2026-05-26'
    },
    {
      '@type': 'Review',
      itemReviewed: SCHEMA_ITEM_REVIEWED,
      author: {
        '@type': 'Person',
        name: 'Alicia Fernández'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Contraté servicio de acompañamiento de compra, y estoy super contenta, por el trato de Daniel y toda la ayuda con la documentación, super recomendable muchas gracias',
      datePublished: '2026-05-26'
    },
    {
      '@type': 'Review',
      itemReviewed: SCHEMA_ITEM_REVIEWED,
      author: {
        '@type': 'Person',
        name: 'Daniel Mercat'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Tramite un contrato de arras con inmonest, ya que no me fiaba de el que me daba la agencia, y me ayudaron en varios puntos importantes, a si que merece la pena',
      datePublished: '2026-05-20'
    },
    {
      '@type': 'Review',
      itemReviewed: SCHEMA_ITEM_REVIEWED,
      author: {
        '@type': 'Person',
        name: 'Wendy Bermudez'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      reviewBody: 'Necesitaba hacer un contrato de arras para el piso de mi madre, y el equipo jurídico de inmonest nos ayudo con la gestión, muchas gracias',
      datePublished: '2026-05-06'
    }
  ]
})

// Schema para breadcrumb (mejora SEO)
const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: BASE_URL
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Gestoría Inmobiliaria',
      item: `${BASE_URL}/gestoria`
    }
  ]
})

export default function GestoriaPage() {
  return (
    <>
      <Script
        id="schema-gestoria"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Navbar />
      <GestoriaContent />
      <WhatsAppButton />
    </>
  )
}
