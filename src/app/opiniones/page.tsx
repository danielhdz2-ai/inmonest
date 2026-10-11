import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaGoogleReviewsSection from '@/components/GestoriaGoogleReviewsSection'
import {
  buildGestoriaAggregateRatingSchema,
  buildGestoriaReviewSchema,
} from '@/lib/gestoria-reviews-schema'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import {
  getGoogleWriteReviewUrl,
  GOOGLE_BUSINESS_PHONE_DISPLAY,
  GBP_DESCRIPTION,
} from '@/lib/google-business'
import { getGoogleReviewsForDisplay } from '@/lib/google-reviews-display'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Opiniones de Inmonest — gestoría inmobiliaria 5.0 en Google',
  description:
    'Lee opiniones reales de clientes sobre Inmonest: contratos LAU, arras y gestoría inmobiliaria online para particulares. Valoración 5.0 en Google.',
  alternates: { canonical: `${BASE_URL}/opiniones` },
  openGraph: {
    title: 'Opiniones Inmonest — gestoría inmobiliaria',
    description: GBP_DESCRIPTION.slice(0, 160),
    url: `${BASE_URL}/opiniones`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function OpinionesPage() {
  const allReviews = getGoogleReviewsForDisplay()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Opiniones de Inmonest',
    description: metadata.description,
    url: `${BASE_URL}/opiniones`,
    mainEntity: {
      '@type': 'Organization',
      '@id': ORGANIZATION_SCHEMA_ID,
      name: 'Inmonest',
      aggregateRating: buildGestoriaAggregateRatingSchema(),
      review: buildGestoriaReviewSchema(),
    },
  }

  return (
    <>
      <Script
        id="schema-opiniones"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <section className="bg-forest-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-wide mb-3">
            Gestoría inmobiliaria · Particulares
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Opiniones de Inmonest</h1>
          <p className="text-white/70 leading-relaxed mb-6">
            Clientes reales valoran nuestros contratos de alquiler LAU, arras y acompañamiento en
            compraventa. No somos un portal de anuncios: somos gestoría online en toda España.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/resena"
              className="px-6 py-3 rounded-full bg-gold-500 text-gray-900 font-semibold hover:bg-gold-400 transition"
            >
              Escribir reseña en Google
            </Link>
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition font-semibold"
            >
              Solicitar contrato LAU
            </Link>
          </div>
          <p className="text-xs text-white/40 mt-6">
            Tel. gestoría: {GOOGLE_BUSINESS_PHONE_DISPLAY} ·{' '}
            <a href={getGoogleWriteReviewUrl()} className="underline hover:text-white/60">
              Enlace directo reseña Google
            </a>
          </p>
        </div>
      </section>

      <GestoriaGoogleReviewsSection layout="widget" limit={allReviews.length} showAllLink={false} />

      <section className="max-w-3xl mx-auto px-4 pb-16 text-center text-sm text-gray-500">
        <p>
          ¿Acabas de recibir tu contrato?{' '}
          <Link href="/resena" className="text-gold-600 font-semibold hover:underline">
            Tu opinión nos ayuda
          </Link>{' '}
          a que más particulares encuentren gestoría de confianza.
        </p>
      </section>
    </>
  )
}
