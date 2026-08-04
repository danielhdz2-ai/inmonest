import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import Navbar from '@/components/NavbarServer'
import SearchForm from '@/components/SearchForm'
import BentoVentajas from '@/components/BentoVentajas'
import CarruselServicios from '@/components/CarruselServicios'
import EnlacesInternosSeo from '@/components/EnlacesInternosSeo'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeDiscoverGrid from '@/components/home/HomeDiscoverGrid'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { BRAND_IMAGES } from '@/lib/brand-images'
import { CtaBand } from '@/components/ui/CtaBand'

const CIUDADES_POPULARES = [
  { nombre: 'Madrid', slug: 'madrid' },
  { nombre: 'Barcelona', slug: 'barcelona' },
  { nombre: 'Valencia', slug: 'valencia' },
  { nombre: 'Sevilla', slug: 'sevilla' },
  { nombre: 'Málaga', slug: 'malaga' },
  { nombre: 'Bilbao', slug: 'bilbao' },
  { nombre: 'Zaragoza', slug: 'zaragoza' },
  { nombre: 'Alicante', slug: 'alicante' },
]

const FAQ = [
  {
    q: '¿Inmonest es gratis?',
    a: 'Publicar pisos entre particulares es 100% gratis, sin comisiones. Los servicios de gestoría inmobiliaria (contratos de arras, alquiler LAU, revisión legal) tienen precios desde 61€ según el tipo de contrato.',
  },
  {
    q: '¿Qué servicios ofrece Inmonest?',
    a: 'Inmonest es un portal de pisos entre particulares sin comisiones + gestoría inmobiliaria online. Ofrecemos publicación gratuita de anuncios, contratos redactados por expertos, revisión legal y asesoramiento en compra y alquiler.',
  },
  {
    q: '¿Puedo publicar mi piso sin registrarme?',
    a: 'Sí. Registrarte te permite gestionar anuncios, solicitar contratos con datos precargados y acceder a tu historial desde un solo panel.',
  },
  {
    q: '¿Los contratos tienen validez legal en toda España?',
    a: 'Sí. Redactados siguiendo LAU, Código Civil y Ley de Vivienda 2026, adaptados a cada comunidad autónoma cuando es necesario.',
  },
  {
    q: '¿Cuánto tardan en entregar un contrato?',
    a: 'Solicitas el servicio, te contactamos en 24 h y entregamos el PDF personalizado en 48 h. Incluye una ronda de revisiones gratuita en 7 días.',
  },
  {
    q: '¿Inmonest es una agencia inmobiliaria?',
    a: 'No. Somos portal entre particulares + gestoría digital. No cobramos comisiones por compra o alquiler; solo por servicios jurídicos específicos.',
  },
] as const

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[600px] flex items-center">
        <Image
          src={BRAND_IMAGES.portal.src}
          alt={BRAND_IMAGES.portal.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl mb-10">
            <Badge variant="dark" className="mb-5 normal-case tracking-wide">
              Gestoría inmobiliaria digital
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              <span className="text-gold-300">Contratos inmobiliarios</span>
              <br />
              <span className="text-white">desde 61 € en 48 h</span>
            </h1>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Arras, alquiler LAU y compraventa redactados por expertos. Portal de pisos entre particulares sin comisiones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/gestoria" variant="primary" className="rounded-full">
                Ver contratos
              </Button>
              <Button href="/pisos?solo_particulares=true" variant="ghost" className="rounded-full">
                Buscar pisos
              </Button>
            </div>
          </div>

          <div className="bg-white/97 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/20 border border-gold-400/20 p-4 sm:p-5 max-w-3xl">
            <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100 rounded-xl" />}>
              <SearchForm />
            </Suspense>
          </div>
        </div>
      </section>

      <HomeTrustStrip />
      <CarruselServicios />
      <EnlacesInternosSeo variant="home" />

      {/* Ciudades */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Buscar piso por ciudad</h2>
          <p className="text-gray-500 text-sm mb-6">Anuncios entre particulares, sin comisiones de agencia</p>
          <div className="flex flex-wrap gap-2">
            {CIUDADES_POPULARES.map((ciudad) => (
              <Link
                key={ciudad.slug}
                href={`/pisos?ciudad=${ciudad.slug}&solo_particulares=true`}
                className="px-4 py-2 rounded-full border border-gold-400/40 bg-white text-sm font-medium text-gray-700 hover:border-gold-500 hover:text-gold-700 hover:bg-cream-100 transition-colors"
              >
                {ciudad.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bento */}
      <Section
        className="py-16 sm:py-20 bg-white"
        eyebrow="Propuesta de valor"
        title="¿Por qué Inmonest?"
        description="Alquiler y compraventa entre particulares, con respaldo jurídico cuando lo necesitas."
      >
        <BentoVentajas />
      </Section>

      <HomeTestimonials />

      {/* FAQ */}
      <Section
        className="py-16 bg-white"
        containerClassName="max-w-3xl"
        eyebrow="Preguntas frecuentes"
        title="¿Tienes dudas?"
        description="Respuestas claras sobre el portal y la gestoría online."
      >
        <div className="space-y-3">
          {FAQ.map(({ q, a }) => (
            <details
              key={q}
              className="bg-gray-50 rounded-xl border border-gray-100 group hover:border-gold-400/30 transition-colors"
            >
              <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                {q}
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <HomeDiscoverGrid />

      {/* CTA principal — publicar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CtaBand
          eyebrow="Para propietarios"
          title={<>¿Tienes un piso para alquilar o vender?</>}
          description="Crea tu anuncio en minutos. Publicación gratuita entre particulares, sin comisiones."
          primaryHref="/publicar-anuncio"
          primaryLabel="Publicar anuncio gratis"
          secondaryHref="/vender-casa"
          secondaryLabel="Vender con asesoramiento"
          imageSrc={BRAND_IMAGES.familia.src}
          imageAlt={BRAND_IMAGES.familia.alt}
          tone="warm"
        />
      </section>
    </div>
  )
}
