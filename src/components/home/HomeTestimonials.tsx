import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { Star } from '@/components/ui/Icons'
import { GOOGLE_REVIEWS } from '@/lib/google-reviews'
import {
  GOOGLE_REVIEWS_LIST_URL,
  GOOGLE_REVIEW_SHORT_PATH,
} from '@/lib/google-business'

export default function HomeTestimonials() {
  return (
    <Section
      className="py-16 bg-gray-50"
      eyebrow="Reseñas verificadas"
      title="Lo que dicen nuestros clientes"
      description="Valoración 5.0 en Google · casos reales de gestoría y compraventa."
    >
      <div className="flex items-center justify-center gap-2 mb-10 -mt-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
          ))}
        </div>
        <span className="text-lg font-bold text-gray-900">5.0</span>
        <span className="text-sm text-gray-500">· Google</span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {GOOGLE_REVIEWS.map((r) => (
          <TestimonialCard key={r.author} {...r} />
        ))}
      </div>

      <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          Ver reseñas en Google
        </Link>
        <Link
          href="/gestoria"
          className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Ver servicios de gestoría
        </Link>
      </div>
    </Section>
  )
}
