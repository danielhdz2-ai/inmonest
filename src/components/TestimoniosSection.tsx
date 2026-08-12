import TestimoniosCarousel from '@/components/TestimoniosCarousel'
import TestimoniosStack from '@/components/TestimoniosStack'
import { GESTORIA_GOOGLE_REVIEWS } from '@/lib/gestoria-reviews-schema'
import {
  GOOGLE_REVIEWS_LIST_URL,
  GOOGLE_REVIEW_SHORT_PATH,
} from '@/lib/google-business'

type TestimoniosSectionProps = {
  className?: string
  layout?: 'carousel' | 'stack'
  showGoogleReviews?: boolean
  /** Oculta estrellas numéricas para evitar fragmentos de reseñas inválidos en landings de servicio */
  hideRating?: boolean
  ciudad?: string
  landing?: string
}

export default function TestimoniosSection({
  className = 'bg-white',
  layout = 'carousel',
  showGoogleReviews = false,
  hideRating = false,
  ciudad,
  landing,
}: TestimoniosSectionProps) {
  const nosnippetProps = hideRating ? ({ 'data-nosnippet': true } as const) : {}

  return (
    <section className={`py-16 px-4 ${className}`} {...nosnippetProps}>
      <div className="max-w-6xl mx-auto" {...nosnippetProps}>
        <div className="text-center mb-12">
          {showGoogleReviews ? (
            <>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                Reseñas verificadas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
                Lo que dicen nuestros clientes
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">5.0</span>
                <span className="text-sm text-gray-500">
                  · {GESTORIA_GOOGLE_REVIEWS.length} reseñas en Google
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <a
                  href={GOOGLE_REVIEW_SHORT_PATH}
                  className="text-sm font-semibold text-gold-600 hover:text-gold-700"
                >
                  Dejar tu reseña en Google →
                </a>
                <a
                  href={GOOGLE_REVIEWS_LIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gold-500 hover:underline font-medium"
                >
                  Ver reseñas verificadas
                </a>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {hideRating ? 'Experiencias con nuestro servicio' : 'Lo que dicen nuestros clientes'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {hideRating
                  ? 'Casos reales de particulares que vendieron o compraron con acompañamiento de gestoría Inmonest.'
                  : 'Familias que han comprado o vendido con asesoramiento legal de Inmonest. Experiencias reales con ciudad, servicio y fecha.'}
              </p>
            </>
          )}
        </div>
        {layout === 'stack' ? (
          <TestimoniosStack ciudad={ciudad} landing={landing} hideRating={hideRating} />
        ) : (
          <TestimoniosCarousel ciudad={ciudad} landing={landing} hideRating={hideRating} />
        )}
      </div>
    </section>
  )
}
