import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/NavbarServer'
import GestoriaContent from './GestoriaContent'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contratos Inmobiliarios desde 61€ — redactados por abogados en 48h | Inmonest',
  description: 'Gestoría especializada que tramita contratos de alquiler (LAU), arras, reserva y rescisión. Redactados por abogados. Desde 61€. Entrega en 24-48h.',
  alternates: {
    canonical: `${BASE_URL}/gestoria`,
  },
  openGraph: {
    title: 'Contratos inmobiliarios redactados por expertos — Inmonest',
    description: 'Gestoría especializada en contratos de alquiler y compraventa. Tramitamos LAU, arras, rescisión y más. Abogados especializados, sin plantillas genéricas. Desde 61€.',
    url: `${BASE_URL}/gestoria`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria — contratos redactados por abogados' }],
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Inmonest Gestoría Inmobiliaria',
  description: 'Gestoría especializada que tramita contratos de alquiler LAU, arras, temporada, rescisión y reserva. Redactados por abogados en derecho inmobiliario, sin plantillas genéricas. Entrega en 24-48h. Desde 61€.',
  url: `${BASE_URL}/gestoria`,
  image: `${BASE_URL}/logo.png`,
  priceRange: '€',
  
  // Proveedor
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
  },
  
  // Área de servicio
  areaServed: { 
    '@type': 'Country', 
    name: 'España' 
  },
  
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
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
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pack Due Diligence Pre-Compra',
          description: 'Verificación integral de actas de comunidad, derramas, ITE, nota registral e información urbanística tras firmar arras.',
          url: `${BASE_URL}/gestoria/solicitar/pack-due-diligence-precompra`,
          provider: {
            '@type': 'Organization',
            name: 'Inmonest'
          },
          offers: {
            '@type': 'Offer',
            price: '168',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            priceValidUntil: '2026-12-31',
            validFrom: '2026-01-01'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4'
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
    worstRating: '5'
  },
  
  // Reseñas individuales
  review: [
    {
      '@type': 'Review',
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

export default function GestoriaPage() {
  return (
    <>
      <Script
        id="schema-gestoria"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      <GestoriaContent />
      <WhatsAppButton />
    </>
  )
}
