import {
  buildGestoriaAggregateRatingSchema,
  buildGestoriaReviewSchema,
} from '@/lib/gestoria-reviews-schema'

const BASE_URL = 'https://inmonest.com'

export function buildLegalServiceSchema(
  ciudad: string,
  slug: string,
  options?: { path?: string; name?: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: options?.name ?? `Inmonest Gestoría Inmobiliaria ${ciudad}`,
    url: options?.path ?? `${BASE_URL}/gestoria/${slug}`,
    telephone: '+34745022862',
    priceRange: '€€',
    aggregateRating: buildGestoriaAggregateRatingSchema(),
    review: buildGestoriaReviewSchema(),
    address: {
      '@type': 'PostalAddress',
      addressLocality: ciudad,
      addressCountry: 'ES',
    },
    areaServed: {
      '@type': 'City',
      name: ciudad,
    },
  }
}

export function buildServiceOfferSchema(
  nombre: string,
  ciudad: string,
  precio: number,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${nombre} ${ciudad}`,
    provider: { '@type': 'Organization', name: 'Inmonest' },
    areaServed: ciudad,
    offers: {
      '@type': 'Offer',
      price: String(precio),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function buildFaqSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}
