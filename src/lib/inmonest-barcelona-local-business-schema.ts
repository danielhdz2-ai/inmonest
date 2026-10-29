import { INMONEST_OFICINA_BARCELONA } from '@/lib/inmonest-oficina-barcelona'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

const BASE_URL = 'https://inmonest.com'

/** LocalBusiness / LegalService del despacho Les Corts para landings Barcelona. */
export function buildInmonestBarcelonaLocalBusinessSchema(barrioNombre?: string) {
  const o = INMONEST_OFICINA_BARCELONA
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${BASE_URL}/#inmonest-despacho-barcelona`,
    name: 'Inmonest — Gestoría inmobiliaria Barcelona',
    description:
      barrioNombre != null
        ? `Gestoría inmobiliaria online y despacho en Les Corts para compraventa entre particulares en ${barrioNombre} y resto de Barcelona.`
        : 'Gestoría inmobiliaria online y despacho en Les Corts (Barcelona) para compraventa entre particulares.',
    url: `${BASE_URL}/gestoria/barcelona`,
    telephone: '+34745022862',
    priceRange: '€€',
    image: `${BASE_URL}/gestoria-expertos-calle.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.calle,
      addressLocality: o.ciudad,
      addressRegion: 'Cataluña',
      postalCode: o.cp,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.3852,
      longitude: 2.1229,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    parentOrganization: { '@id': ORGANIZATION_SCHEMA_ID },
    areaServed: [
      { '@type': 'City', name: 'Barcelona' },
      ...(barrioNombre ? [{ '@type': 'Place', name: barrioNombre }] : []),
    ],
  }
}
