import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import HomeHeroBackground from '@/components/HomeHeroBackground'
import HeroVideoAutoplay from '@/components/HeroVideoAutoplay'
import BentoVentajas from '@/components/BentoVentajas'
import CarruselServicios from '@/components/CarruselServicios'
import EnlacesInternosSeo from '@/components/EnlacesInternosSeo'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import HomeHowItWorks from '@/components/home/HomeHowItWorks'
import HomeIntentSelector from '@/components/home/HomeIntentSelector'
import HomeHeroCtas from '@/components/home/HomeHeroCtas'
import HomeVideoPreload from '@/components/home/HomeVideoPreload'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeDiscoverGrid from '@/components/home/HomeDiscoverGrid'
import HomePersonaIntents from '@/components/home/HomePersonaIntents'
import HomeLocalPresencia from '@/components/home/HomeLocalPresencia'
import GestoriaPanelShowcase from '@/components/GestoriaPanelShowcase'
import { Badge } from '@/components/ui/Badge'
import { Section } from '@/components/ui/Section'
import { CtaBand } from '@/components/ui/CtaBand'

const BASE_URL = 'https://inmonest.com'
const HERO_VIDEO = `${BASE_URL}/video/gestoria-hero-walking.mp4`

export const metadata: Metadata = {
  title: 'Gestoría inmobiliaria online para particulares',
  description:
    'Contratos de alquiler LAU, arras y compraventa en toda España. Gestores expertos, precio cerrado desde 61 €, entrega en 48 h y panel de cliente.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Inmonest | Gestoría inmobiliaria online en 48 h',
    description:
      'Alquiler LAU, arras y compraventa entre particulares. Valoración 5.0 en Google. Contrata online con gestor asignado.',
    url: BASE_URL,
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/gestor-experto-oficina.jpg',
        width: 1200,
        height: 630,
        alt: 'Gestoría inmobiliaria online Inmonest',
      },
    ],
  },
}

const FAQ_ITEMS = [
  {
    q: '¿Qué es Inmonest?',
    schemaText:
      'Inmonest es una gestoría inmobiliaria online en toda España. Redactamos contratos de alquiler LAU, arras y compraventa con precio cerrado, entrega en 48 h y panel de cliente.',
    body: (
      <>
        Inmonest es una{' '}
        <Link href="/gestoria" className="text-gold-800 font-medium hover:underline">
          gestoría inmobiliaria online
        </Link>{' '}
        en toda España. Redactamos contratos con precio cerrado, entrega en 48 h y panel de cliente.
      </>
    ),
  },
  {
    q: '¿Cuánto cuesta un contrato de alquiler?',
    schemaText:
      'El contrato de alquiler LAU cuesta 145 € IVA incluido, con personalización, revisión legal y una ronda de cambios.',
    body: (
      <>
        El{' '}
        <Link href="/gestoria/contrato-alquiler" className="text-gold-800 font-medium hover:underline">
          contrato de alquiler LAU
        </Link>{' '}
        cuesta 145 € IVA incluido. Detalle en{' '}
        <Link
          href="/gestoria/cuanto-cuesta-contrato-alquiler"
          className="text-gold-800 font-medium hover:underline"
        >
          cuánto cuesta un contrato de alquiler
        </Link>
        .
      </>
    ),
  },
  {
    q: '¿Qué servicios ofrece Inmonest?',
    schemaText:
      'Contrato LAU, arras, habitación, revisión de contratos, packs de compraventa y due diligence, con gestor experto.',
    body: (
      <>
        Catálogo completo en{' '}
        <Link href="/servicios" className="text-gold-800 font-medium hover:underline">
          servicios de gestoría
        </Link>
        : LAU,{' '}
        <Link href="/gestoria/arras-penitenciales" className="text-gold-800 font-medium hover:underline">
          arras
        </Link>
        , habitación, revisiones y packs hasta escritura.
      </>
    ),
  },
  {
    q: '¿Los contratos tienen validez legal en toda España?',
    schemaText:
      'Sí. Redactados siguiendo LAU, Código Civil y Ley de Vivienda 2026, adaptados a cada comunidad autónoma cuando es necesario.',
    body: 'Sí. Redactados siguiendo LAU, Código Civil y Ley de Vivienda 2026, adaptados a cada comunidad autónoma cuando es necesario.',
  },
  {
    q: '¿Cuánto tardan en entregar un contrato?',
    schemaText:
      'Contacto en 24 h y entrega del PDF personalizado en 48 h, con una ronda de revisiones gratuita en 7 días.',
    body: (
      <>
        Solicitas en{' '}
        <Link href="/gestoria/solicitar" className="text-gold-800 font-medium hover:underline">
          contratar online
        </Link>
        , te contactamos en 24 h y entregamos el PDF en 48 h (una ronda de cambios incluida).
      </>
    ),
  },
  {
    q: '¿Inmonest es una agencia inmobiliaria?',
    schemaText:
      'No. Somos gestoría digital: no intermediamos en la búsqueda de pisos ni cobramos comisiones por operaciones.',
    body: 'No. Somos gestoría digital: no intermediamos en la búsqueda de pisos ni cobramos comisiones por operaciones. Solo servicios jurídicos concretos.',
  },
  {
    q: '¿Puedo contratar compra o venta integral entre particulares?',
    schemaText:
      'Sí. Packs desde reserva y arras hasta escritura, con gestor asignado, revisión registral y coordinación con notaría.',
    body: (
      <>
        Sí. Consulta{' '}
        <Link
          href="/gestoria/compra-completa-reserva-escritura"
          className="text-gold-800 font-medium hover:underline"
        >
          compra integral
        </Link>{' '}
        y{' '}
        <Link
          href="/gestoria/venta-completa-reserva-escritura"
          className="text-gold-800 font-medium hover:underline"
        >
          venta integral
        </Link>{' '}
        con gestor hasta escritura.
      </>
    ),
  },
] as const

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, schemaText }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: schemaText },
    })),
  }

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Gestoría inmobiliaria Inmonest — acompañamiento online',
    description:
      'Inmonest: gestoría inmobiliaria digital para contratos de alquiler, arras y compraventa entre particulares en España.',
    contentUrl: HERO_VIDEO,
    thumbnailUrl: `${BASE_URL}/gestor-experto-oficina.jpg`,
    uploadDate: '2026-10-11',
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeVideoPreload />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <Navbar />

      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center">
        <HeroVideoAutoplay />
        <div className="absolute inset-0 z-0">
          <HomeHeroBackground />
        </div>
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-r from-black/82 via-black/35 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl sm:max-w-lg lg:max-w-xl mr-auto text-left">
            <Badge variant="dark" className="mb-5 normal-case tracking-wide">
              Toda España · entrega en 48 h
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
              <span className="text-gold-300">Gestoría inmobiliaria para particulares</span>
              <br />
              <span className="text-white">
                Contratos de alquiler, de arras, servicios de compra y de venta
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/75 max-w-xl leading-relaxed">
              LAU, temporada, habitación, arras y packs hasta escritura: redactados por gestores, precio cerrado
              desde 61 € y panel de cliente online.
            </p>
            <HomeHeroCtas />
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
      <HomeHowItWorks />
      <HomeIntentSelector />
      <HomePersonaIntents />
      <HomeDiscoverGrid />
      <CarruselServicios />
      <EnlacesInternosSeo variant="home" />
      <HomeLocalPresencia />

      <Section
        className="py-16 sm:py-20 bg-white"
        eyebrow="Propuesta de valor"
        title="¿Por qué Inmonest?"
        description="Alquiler de larga duración, arras y compraventa con gestores expertos, plazos cortos y precio cerrado."
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
          {FAQ_ITEMS.map(({ q, body }) => (
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
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{body}</div>
            </details>
          ))}
        </div>
      </Section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <CtaBand
          eyebrow="Alquiler, arras y compraventa"
          title={<>¿Compras, vendes o alquilas entre particulares?</>}
          description="Precio cerrado, gestor experto, panel de cliente y entrega en 48 h en la mayoría de contratos. Pago seguro con Stripe."
          primaryHref="/gestoria/solicitar"
          primaryLabel="Contratar online"
          secondaryHref="/opiniones"
          secondaryLabel="Ver opiniones en Google"
          imageSrc="/gestor-experto-oficina.jpg"
          imageAlt="Gestor inmobiliario Inmonest en despacho profesional"
          tone="warm"
        />
      </section>

      <GestoriaPanelShowcase
        servicioLabel="tu contrato o pack de gestoría"
        className="bg-cream-100 border-t border-gold-300/25 border-b-0 py-8 sm:py-10 pb-6"
      />
    </div>
  )
}
