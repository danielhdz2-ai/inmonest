import {
  GESTORIA_GOOGLE_AGGREGATE,
  GESTORIA_GOOGLE_REVIEWS,
} from '@/lib/gestoria-reviews-schema'

export type GoogleReviewCard = {
  author: string
  time: string
  text: string
  tag: string
}

function inferTag(body: string): string {
  const b = body.toLowerCase()
  if (b.includes('contrato de alquiler') || b.includes('lau')) return 'Contrato alquiler LAU'
  if (b.includes('arras')) return 'Contrato de arras'
  if (b.includes('acompañamiento') || b.includes('compra')) return 'Compra / acompañamiento'
  if (b.includes('profesional') || b.includes('recomiendo')) return 'Gestoría inmobiliaria'
  return 'Gestoría Inmonest'
}

function formatRelativeEs(isoDate: string): string {
  const then = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - then.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Esta semana'
  if (days === 1) return 'Hace 1 día'
  if (days < 7) return `Hace ${days} días`
  if (days < 14) return 'Hace 1 semana'
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  if (days < 60) return 'Hace 1 mes'
  return `Hace ${Math.floor(days / 30)} meses`
}

/** Reseñas Google para UI (sincronizadas con schema en gestoria-reviews-schema). */
export function getGoogleReviewsForDisplay(limit?: number): GoogleReviewCard[] {
  const list = GESTORIA_GOOGLE_REVIEWS.map((r) => ({
    author: r.author,
    time: formatRelativeEs(r.datePublished),
    text: r.reviewBody,
    tag: inferTag(r.reviewBody),
  }))
  return limit ? list.slice(0, limit) : [...list]
}

export function getGoogleAggregateLabel(): string {
  return `${GESTORIA_GOOGLE_AGGREGATE.ratingValue} · ${GESTORIA_GOOGLE_AGGREGATE.reviewCount} reseñas en Google`
}
