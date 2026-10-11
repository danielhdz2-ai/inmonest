import Link from 'next/link'
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { Star } from '@/components/ui/Icons'
import {
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_REVIEW_SHORT_PATH,
  GOOGLE_REVIEWS_LIST_URL,
} from '@/lib/google-business'
import {
  getGoogleAggregateLabel,
  getGoogleReviewsForDisplay,
} from '@/lib/google-reviews-display'
import { GESTORIA_GOOGLE_AGGREGATE } from '@/lib/gestoria-reviews-schema'

type Props = {
  /** Cuántas reseñas mostrar en grid */
  limit?: number
  /** Título de sección */
  title?: string
  showAllLink?: boolean
  /** Carrusel estilo Google (home) o grid clásico */
  layout?: 'grid' | 'widget'
}

export default function GestoriaGoogleReviewsSection({
  limit = 4,
  title = 'Lo que dicen nuestros clientes',
  showAllLink = true,
  layout = 'grid',
}: Props) {
  const reviews = getGoogleReviewsForDisplay(limit)

  if (layout === 'widget') {
    return (
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleReviewsWidget reviews={reviews} title={title} />
        </div>
      </section>
    )
  }

  return (
    <Section
      className="py-16 bg-gray-50"
      eyebrow="Reseñas verificadas en Google"
      title={title}
      description={`Gestoría inmobiliaria para particulares · ${getGoogleAggregateLabel()}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 -mt-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
          ))}
        </div>
        <span className="text-lg font-bold text-gray-900">
          {GESTORIA_GOOGLE_AGGREGATE.ratingValue}
        </span>
        <span className="text-sm text-gray-500">
          · {GESTORIA_GOOGLE_AGGREGATE.reviewCount} opiniones en Google
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {reviews.map((r) => (
          <TestimonialCard key={`${r.author}-${r.time}`} {...r} />
        ))}
      </div>

      <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
        <Link
          href={GOOGLE_REVIEW_SHORT_PATH}
          className="text-sm font-semibold text-white bg-gold-500 hover:bg-gold-600 px-6 py-2.5 rounded-full transition-colors"
        >
          Dejar tu reseña en Google
        </Link>
        <Link
          href={GOOGLE_REVIEWS_LIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
        >
          Ver opiniones en Google
        </Link>
        {showAllLink && (
          <Link
            href="/opiniones"
            className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Todas las opiniones en Inmonest
          </Link>
        )}
        <Link
          href={GOOGLE_BUSINESS_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
        >
          Perfil de empresa Google
        </Link>
      </div>
    </Section>
  )
}
