/**
 * Schema.org Organization
 * Marca estructurada para Google Knowledge Panel
 * Mejora credibilidad y visibilidad en resultados de búsqueda
 */

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Inmonest',
    url: 'https://inmonest.com',
    logo: 'https://inmonest.com/logo.png',
    description:
      'Portal inmobiliario para comprar, vender o alquilar pisos entre particulares sin comisiones de agencia. Gestión de contratos y servicios de gestoría incluidos.',
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://inmonest.com/pisos?ciudad={search_term_string}',
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
