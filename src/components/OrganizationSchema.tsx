import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import { getLegalEntity } from '@/lib/legal-entity'
import { GOOGLE_BUSINESS_PHONE_E164 } from '@/lib/google-business'

/**
 * Schema.org Organization — gestoría inmobiliaria online (marca Inmonest).
 * Sin Review/AggregateRating aquí (autopromoción + duplicados GSC). Ver /opiniones.
 */

export default function OrganizationSchema() {
  const legal = getLegalEntity()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_SCHEMA_ID,
    name: 'Inmonest',
    alternateName: ['Inmonest Gestoría Inmobiliaria', 'Inmonest gestoría online'],
    url: 'https://inmonest.com',
    logo: 'https://inmonest.com/logo.png',
    description:
      'Gestoría inmobiliaria online para particulares en España. Contrato de alquiler LAU, arras, alquiler temporada y habitación, revisión legal y compraventa integral. Precio cerrado desde 61 €, entrega en 48 h.',
    slogan: 'Gestoría inmobiliaria online para particulares',
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      streetAddress: legal.address,
      addressLocality: 'Barcelona',
      addressRegion: 'Cataluña',
      addressCountry: 'ES',
    },
    taxID: legal.nif,
    telephone: GOOGLE_BUSINESS_PHONE_E164,
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: [
      'Gestoría inmobiliaria',
      'Redacción contrato de arras',
      'Redacción contrato de alquiler LAU',
      'Revisión legal de contratos',
      'Asesoría jurídica inmobiliaria',
      'Contrato de compraventa',
    ],
    priceRange: '61€ - 687€',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: GOOGLE_BUSINESS_PHONE_E164,
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
            description: 'Revisión legal de contratos inmobiliarios por gestores especializados',
          },
        },
      ],
    },
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORGANIZATION_SCHEMA_ID}#website`,
    url: 'https://inmonest.com',
    name: 'Inmonest',
    description:
      'Gestoría inmobiliaria online: contratos LAU, arras y compraventa para particulares en España.',
    publisher: { '@id': ORGANIZATION_SCHEMA_ID },
    inLanguage: 'es-ES',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
    </>
  )
}
