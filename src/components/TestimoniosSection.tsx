import TestimoniosCarousel from '@/components/TestimoniosCarousel'
import TestimoniosStack from '@/components/TestimoniosStack'

type TestimoniosSectionProps = {
  className?: string
  layout?: 'carousel' | 'stack'
  showGoogleReviews?: boolean
  /** Oculta estrellas numéricas para evitar fragmentos de reseñas inválidos en landings de servicio */
  hideRating?: boolean
  ciudad?: string
}

export default function TestimoniosSection({
  className = 'bg-white',
  layout = 'carousel',
  showGoogleReviews = false,
  hideRating = false,
  ciudad,
}: TestimoniosSectionProps) {
  return (
    <section className={`py-16 px-4 ${className}`} {...(hideRating ? { 'data-nosnippet': true } : {})}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {showGoogleReviews ? (
            <>
              <span className="text-xs font-bold text-[#c9962a] uppercase tracking-widest">
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
                <span className="text-sm text-gray-500">· 4 reseñas en Google</span>
              </div>
              <a
                href="https://www.google.com/search?q=inmonest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#c9962a] hover:underline font-medium"
              >
                Ver reseñas verificadas en Google →
              </a>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Familias que han comprado o vendido con asesoramiento legal de Inmonest.
                Experiencias reales con ciudad, servicio y fecha.
              </p>
            </>
          )}
        </div>
        {layout === 'stack' ? (
          <TestimoniosStack ciudad={ciudad} hideRating={hideRating} />
        ) : (
          <TestimoniosCarousel ciudad={ciudad} hideRating={hideRating} />
        )}
      </div>
    </section>
  )
}
