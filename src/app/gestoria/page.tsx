import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/NavbarServer'
import GestoriaContent from './GestoriaContent'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contratos inmobiliarios — Gestoría experta',
  description: 'Contratos de arras, alquiler, reserva y rescisión redactados por abogados especializados en derecho inmobiliario. Desde 30 €. Entrega en 48h.',
  alternates: {
    canonical: `${BASE_URL}/gestoria`,
  },
  openGraph: {
    title: 'Contratos inmobiliarios redactados por expertos — Inmonest',
    description: 'Arras, alquiler LAU, temporada, rescisión y más. Abogados especializados, sin plantillas genéricas. Desde 30 €.',
    url: `${BASE_URL}/gestoria`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Inmonest Gestoría Inmobiliaria',
  description: 'Contratos de arras, alquiler LAU, temporada, rescisión y reserva redactados por abogados especializados en derecho inmobiliario. Sin plantillas genéricas. Entrega en 48h.',
  url: `${BASE_URL}/gestoria`,
  image: `${BASE_URL}/logo.png`,
  priceRange: '€€',
  
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
          name: 'Contrato de Arras',
          description: 'Contrato de arras penitenciales redactado por abogados. Protege tu señal de compra.',
          price: '30',
          priceCurrency: 'EUR'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Alquiler LAU',
          description: 'Contrato de arrendamiento de vivienda habitual según Ley 29/1994.',
          price: '35',
          priceCurrency: 'EUR'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Alquiler Temporal',
          description: 'Contrato para alquileres temporales (vacaciones, estudios, trabajo).',
          price: '35',
          priceCurrency: 'EUR'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Contrato de Reserva',
          description: 'Formaliza la reserva del inmueble mientras preparas la documentación.',
          price: '30',
          priceCurrency: 'EUR'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Rescisión de Contrato',
          description: 'Finaliza tu contrato de alquiler legalmente y sin problemas.',
          price: '40',
          priceCurrency: 'EUR'
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
  }
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
