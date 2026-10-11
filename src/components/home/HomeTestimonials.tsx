import Image from 'next/image'
import Link from 'next/link'
import GestoriaGoogleReviewsSection from '@/components/GestoriaGoogleReviewsSection'
import { GESTORIA_GOOGLE_AGGREGATE } from '@/lib/gestoria-reviews-schema'

export default function HomeTestimonials() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-44 sm:h-56 w-full">
          <Image
            src="/gestoria8.jpg"
            alt="Clientes satisfechos con la gestoría inmobiliaria Inmonest"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-300 mb-2">
              Confianza verificada
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-xl">
              {GESTORIA_GOOGLE_AGGREGATE.ratingValue} en Google · clientes reales
            </h2>
            <Link
              href="/opiniones"
              className="mt-4 inline-flex w-fit rounded-full bg-white/95 text-gray-900 text-sm font-semibold px-5 py-2.5 hover:bg-gold-100 transition-colors"
            >
              Leer todas las opiniones
            </Link>
          </div>
        </div>
      </section>
      <GestoriaGoogleReviewsSection limit={4} />
    </>
  )
}
