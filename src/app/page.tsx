import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
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

const CIUDADES_GESTORIA = [
  { nombre: 'Madrid', slug: 'madrid' },
  { nombre: 'Barcelona', slug: 'barcelona' },
  { nombre: 'Valencia', slug: 'valencia' },
  { nombre: 'Sevilla', slug: 'sevilla' },
  { nombre: 'Málaga', slug: 'malaga' },
  { nombre: 'Bilbao', slug: 'bilbao' },
  { nombre: 'Zaragoza', slug: 'zaragoza' },
  { nombre: 'Alicante', slug: 'alicante' },
] as const

const FAQ = [
  {
    q: '¿Qué es Inmonest?',
    a: 'Inmonest es una gestoría inmobiliaria online en toda España. Redactamos contratos de alquiler LAU, arras y compraventa con precio cerrado, entrega en 48 h y panel de cliente para tus documentos.',
  },
  {
    q: '¿Cuánto cuesta un contrato de alquiler?',
    a: 'El contrato de alquiler de vivienda (LAU) cuesta 145 € IVA incluido. Incluye personalización, revisión legal y una ronda de cambios. Puedes solicitarlo online en minutos.',
  },
  {
    q: '¿Qué servicios ofrece Inmonest?',
    a: 'Contrato de alquiler LAU, arras penitenciales y confirmatorias, alquiler de habitación, revisión de contratos, packs de compraventa y due diligence. Todo online con gestor experto.',
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
    a: 'No. Somos gestoría digital: no intermediamos en la búsqueda de pisos ni cobramos comisiones por operaciones. Cobramos solo por servicios jurídicos concretos.',
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

      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[560px] flex items-center">
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
          <div className="max-w-2xl">
            <Badge variant="dark" className="mb-5 normal-case tracking-wide">
              Gestoría inmobiliaria digital
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              <span className="text-gold-300">Contrato de alquiler LAU</span>
              <br />
              <span className="text-white">y gestoría online en 48 h</span>
            </h1>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              Redactamos tu contrato de alquiler, arras o compraventa con experto. Precio cerrado desde 61 €,
              respuesta en 24 h y panel de cliente en toda España.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/gestoria/solicitar/contrato-alquiler" variant="primary" className="rounded-full">
                Solicitar contrato alquiler
              </Button>
              <Button href="/gestoria/contrato-alquiler" variant="ghost" className="rounded-full">
                Ver precio y qué incluye
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/60">
              También arras, habitación, revisión legal y packs compraventa →{' '}
              <Link href="/servicios" className="text-gold-300 hover:text-gold-200 underline underline-offset-2">
                todos los servicios
              </Link>
            </p>
          </div>
        </div>
      </section>

      <HomeTrustStrip />
      <CarruselServicios />
      <EnlacesInternosSeo variant="home" />

      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Contrato de alquiler por ciudad</h2>
          <p className="text-gray-500 text-sm mb-6">LAU personalizado con normativa local e IRAV cuando aplica</p>
          <div className="flex flex-wrap gap-2">
            {CIUDADES_GESTORIA.map((ciudad) => (
              <Link
                key={ciudad.slug}
                href={`/${ciudad.slug}/contrato-alquiler`}
                className="px-4 py-2 rounded-full border border-gold-400/40 bg-white text-sm font-medium text-gray-700 hover:border-gold-500 hover:text-gold-700 hover:bg-cream-100 transition-colors"
              >
                {ciudad.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Section
        className="py-16 sm:py-20 bg-white"
        eyebrow="Propuesta de valor"
        title="¿Por qué Inmonest?"
        description="Gestoría inmobiliaria online con contratos claros, plazos cortos y precio cerrado."
      >
        <BentoVentajas />
      </Section>

      <HomeTestimonials />

      <Section
        className="py-16 bg-white"
        containerClassName="max-w-3xl"
        eyebrow="Preguntas frecuentes"
        title="¿Tienes dudas?"
        description="Respuestas sobre contratos de alquiler, arras y gestoría online."
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

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CtaBand
          eyebrow="Propietarios e inquilinos"
          title={<>¿Vas a alquilar o firmar arras?</>}
          description="Contrato LAU blindado, fianza INCASÒL e IRAV cuando aplica. Online, con gestor y entrega en 48 h."
          primaryHref="/gestoria/solicitar/contrato-alquiler"
          primaryLabel="Contrato alquiler 145 €"
          secondaryHref="/gestoria"
          secondaryLabel="Ver todos los servicios"
          imageSrc={BRAND_IMAGES.familia.src}
          imageAlt={BRAND_IMAGES.familia.alt}
          tone="warm"
        />
      </section>
    </div>
  )
}
