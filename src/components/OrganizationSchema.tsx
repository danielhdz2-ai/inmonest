import { NUEVA_HABITAT_OFFICE } from '@/lib/business-location'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

/**
 * Schema.org Organization + LegalService
 * Marca estructurada para Google Knowledge Panel
 * Mejora credibilidad y visibilidad en resultados de búsqueda
 * Enfoque: Gestoría inmobiliaria digital
 */

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_SCHEMA_ID,
    name: 'Inmonest',
    alternateName: ['Inmonest Gestoría Inmobiliaria', NUEVA_HABITAT_OFFICE.name],
    url: 'https://inmonest.com',
    logo: 'https://inmonest.com/logo.png',
    description:
      'Gestoría inmobiliaria digital especializada en derecho inmobiliario. Redacción y revisión de contratos de arras, alquiler LAU, compraventa. Abogados especializados. También portal de pisos entre particulares sin comisiones.',
    slogan: 'Tu gestoría inmobiliaria digital',
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      streetAddress: NUEVA_HABITAT_OFFICE.streetAddress,
      addressLocality: NUEVA_HABITAT_OFFICE.addressLocality,
      addressRegion: NUEVA_HABITAT_OFFICE.addressRegion,
      postalCode: NUEVA_HABITAT_OFFICE.postalCode,
      addressCountry: NUEVA_HABITAT_OFFICE.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: NUEVA_HABITAT_OFFICE.geo.latitude,
      longitude: NUEVA_HABITAT_OFFICE.geo.longitude,
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: [
      'Gestoría inmobiliaria',
      'Redacción contrato de arras',
      'Redacción contrato de alquiler',
      'Revisión legal de contratos',
      'Asesoría jurídica inmobiliaria',
      'Contrato de compraventa',
    ],
    priceRange: '61€ - 687€',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hola@inmonest.com',
      availableLanguage: ['Spanish'],
      areaServed: 'ES',
    },
    sameAs: [
      'https://www.facebook.com/inmonest',
      'https://twitter.com/inmonest',
      'https://www.instagram.com/inmonest',
      'https://www.linkedin.com/company/inmonest',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Gestoría Inmobiliaria',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Contrato de Arras Penitenciales',
            description: 'Redacción personalizada de contrato de arras para compraventa de vivienda',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Contrato de Alquiler LAU',
            description: 'Contrato de alquiler adaptado a la Ley de Vivienda 2026',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revisión de Contratos',
            description: 'Revisión legal de contratos inmobiliarios por abogados especializados',
          },
        },
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://inmonest.com/gestoria?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
