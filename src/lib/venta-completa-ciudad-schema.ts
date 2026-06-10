import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

const BASE_URL = 'https://inmonest.com'

export function buildVentaCompletaServiceSchema(ciudad: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/gestoria/venta-completa-reserva-escritura/${slug}#service`,
    name: `Servicio Completo de Venta en ${ciudad}: Reserva a Escritura`,
    description: `Acompañamiento completo para propietarios que venden su piso en ${ciudad} sin agencia. Gestoría inmobiliaria experta en particulares vendedores. Contratos de arras, documentación y asesoramiento hasta escritura.`,
    areaServed: {
      '@type': 'City',
      name: ciudad,
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: { '@id': ORGANIZATION_SCHEMA_ID },
    offers: {
      '@type': 'Offer',
      price: '687',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
  }
}

export function buildVentaCompletaBreadcrumbSchema(ciudad: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Venta Completa',
        item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: ciudad,
        item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/${slug}`,
      },
    ],
  }
}
