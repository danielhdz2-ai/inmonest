import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

/** Reseñas reales de Google Business (visibles también en la web) */
export const GESTORIA_GOOGLE_REVIEWS = [
  {
    author: 'zonetechonline',
    datePublished: '2026-05-26',
    reviewBody:
      'Tramite el contrato de arras, me ayudaron en todo el proceso de documentación, lo recomiendo bastante, muy ágiles, muy rápidos y muy profesionales',
  },
  {
    author: 'Alicia Fernández',
    datePublished: '2026-05-26',
    reviewBody:
      'Contraté servicio de acompañamiento de compra, y estoy super contenta, por el trato de Daniel y toda la ayuda con la documentación, super recomendable muchas gracias',
  },
  {
    author: 'Daniel Mercat',
    datePublished: '2026-05-20',
    reviewBody:
      'Tramite un contrato de arras con inmonest, ya que no me fiaba de el que me daba la agencia, y me ayudaron en varios puntos importantes, a si que merece la pena',
  },
  {
    author: 'Wendy Bermudez',
    datePublished: '2026-05-06',
    reviewBody:
      'Necesitaba hacer un contrato de arras para el piso de mi madre, y el equipo jurídico de inmonest nos ayudo con la gestión, muchas gracias',
  },
] as const

const ITEM_REVIEWED = { '@id': ORGANIZATION_SCHEMA_ID }

export function buildGestoriaReviewSchema() {
  return GESTORIA_GOOGLE_REVIEWS.map((r) => ({
    '@type': 'Review' as const,
    itemReviewed: ITEM_REVIEWED,
    author: { '@type': 'Person' as const, name: r.author },
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: '5',
      bestRating: '5',
    },
    reviewBody: r.reviewBody,
    datePublished: r.datePublished,
  }))
}

export function buildGestoriaAggregateRatingSchema() {
  return {
    '@type': 'AggregateRating' as const,
    ratingValue: '5.0',
    reviewCount: String(GESTORIA_GOOGLE_REVIEWS.length),
    bestRating: '5',
    worstRating: '1',
  }
}
