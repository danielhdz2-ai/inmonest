import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import HomeHeroBackground from '@/components/HomeHeroBackground'
import HeroVideoAutoplay from '@/components/HeroVideoAutoplay'
import BentoVentajas from '@/components/BentoVentajas'
import CarruselServicios from '@/components/CarruselServicios'
import EnlacesInternosSeo from '@/components/EnlacesInternosSeo'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeDiscoverGrid from '@/components/home/HomeDiscoverGrid'
import HomePersonaIntents from '@/components/home/HomePersonaIntents'
import HomeLocalPresencia from '@/components/home/HomeLocalPresencia'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { CtaBand } from '@/components/ui/CtaBand'

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
  {
    q: '¿Puedo contratar compra o venta integral entre particulares?',
    a: 'Sí. Ofrecemos packs desde reserva y arras hasta escritura, con gestor asignado, revisión registral y coordinación con notaría. También parking y trastero.',
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/gestoria/solicitar" variant="primary" className="rounded-full">
                Solicitar contrato
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

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CtaBand
          eyebrow="Alquiler, arras y compraventa"
          title={<>¿Compras, vendes o alquilas entre particulares?</>}
          description="Precio cerrado, gestor experto, panel de cliente y entrega en 48 h en la mayoría de contratos. Pago seguro con Stripe."
          primaryHref="/gestoria/solicitar"
          primaryLabel="Contratar online"
          secondaryHref="/opiniones"
          secondaryLabel="Ver opiniones en Google"
          imageSrc="/gestoria10.jpg"
          imageAlt="Familia firmando documentación inmobiliaria con gestoría Inmonest"
          tone="warm"
        />
      </section>
    </div>
  )
}
