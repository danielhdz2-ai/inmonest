import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import {
  buildGestoriaAggregateRatingSchema,
  buildGestoriaReviewSchema,
} from '@/lib/gestoria-reviews-schema'

const BASE_URL = 'https://inmonest.com'

/** Fecha visible y dateModified en schema (contenido legal YMYL). */
export const GESTORIA_LANDING_CONTENT_REVISED = '2026-03-01'

export type GestoriaLandingBreadcrumb = {
  name: string
  path?: string
}

export type GestoriaLandingSeoInput = {
  pagePath: string
  pageTitle: string
  description: string
  servicioNombre: string
  ciudadNombre: string
  precioEuros?: number
  faqs: ReadonlyArray<{ q: string; a: string }>
  breadcrumbs: ReadonlyArray<GestoriaLandingBreadcrumb>
  /** Por defecto incluye AggregateRating en el provider. */
  includeAggregateRating?: boolean
}

export function gestoriaLandingBreadcrumbs(
  ...tail: ReadonlyArray<GestoriaLandingBreadcrumb>
): GestoriaLandingBreadcrumb[] {
  return [{ name: 'Inicio', path: '/' }, { name: 'Gestoría', path: '/gestoria' }, ...tail]
}

export function buildGestorPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#daniel-hernandez`,
    name: GESTOR_DANIEL_HERNANDEZ.nombre,
    jobTitle: 'Gestor inmobiliario',
    worksFor: { '@id': ORGANIZATION_SCHEMA_ID },
    image: `${BASE_URL}${GESTOR_DANIEL_HERNANDEZ.foto}`,
    knowsAbout: [
      'Contratos de arras penitenciales',
      'Contratos de arrendamiento LAU',
      'Compraventa entre particulares',
      'Due diligence inmobiliaria',
    ],
  }
}

export function buildBreadcrumbListSchema(breadcrumbs: ReadonlyArray<GestoriaLandingBreadcrumb>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${BASE_URL}${crumb.path}` } : {}),
    })),
  }
}

/** Schema estándar oro: WebPage + Person + Service + FAQ + Breadcrumb. */
export function buildGestoriaLandingSchemas(input: GestoriaLandingSeoInput) {
  const pageUrl = `${BASE_URL}${input.pagePath}`
  const includeRating = input.includeAggregateRating !== false

  const provider: Record<string, unknown> = {
    '@type': 'LegalService',
    '@id': ORGANIZATION_SCHEMA_ID,
    name: 'Inmonest',
    url: BASE_URL,
    telephone: '+34745022862',
    employee: { '@id': `${BASE_URL}/#daniel-hernandez` },
  }
  if (includeRating) {
    provider.aggregateRating = buildGestoriaAggregateRatingSchema()
    provider.review = buildGestoriaReviewSchema()
  }

  const service: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${input.servicioNombre} en ${input.ciudadNombre}`,
    description: input.description,
    url: pageUrl,
    provider,
    areaServed: {
      '@type': 'City',
      name: input.ciudadNombre,
      containedInPlace: { '@type': 'Country', name: 'España' },
    },
  }
  if (input.precioEuros != null) {
    service.offers = {
      '@type': 'Offer',
      price: String(input.precioEuros),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      priceValidUntil: '2026-12-31',
    }
  }

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: input.pageTitle,
      description: input.description,
      dateModified: GESTORIA_LANDING_CONTENT_REVISED,
      inLanguage: 'es-ES',
      about: { '@id': `${pageUrl}#service` },
    },
    buildGestorPersonSchema(),
    service,
  ]

  if (input.faqs.length > 0) schemas.push(buildFaqSchema(input.faqs))
  if (input.breadcrumbs.length > 0) schemas.push(buildBreadcrumbListSchema(input.breadcrumbs))

  return schemas
}

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
