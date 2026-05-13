import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { ContratoAlquilerPremiumConfig } from '@/lib/contrato-alquiler-premium-config'
import {
  CONTRATO_ALQUILER_PREMIUM_INCLUDES,
  CONTRATO_ALQUILER_PREMIUM_PASOS,
  CONTRATO_ALQUILER_PREMIUM_PRECIO,
} from '@/lib/contrato-alquiler-premium-config'

const BASE_URL = 'https://inmonest.com'
const WA = '34641009947'

export default function ContratoAlquilerCiudadPremium({ config }: { config: ContratoAlquilerPremiumConfig }) {
  const precio = CONTRATO_ALQUILER_PREMIUM_PRECIO
  const waText = encodeURIComponent(`Hola, necesito un contrato de alquiler en ${config.nombre}`)

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.schema.serviceName,
    description: config.schema.serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    areaServed: {
      '@type': config.schema.areaType,
      name: config.schema.areaName,
      containedIn: { '@type': 'Country', name: 'España' },
    },
    offers: {
      '@type': 'Offer',
      price: precio,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <WhatsAppButton />

      <section className="relative h-[400px] sm:h-[480px] overflow-hidden">
        <Image
          src="/gestoria/gestoria7.jpg"
          alt={config.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3d2a05]/90 via-[#7a5c1e]/70 to-transparent" />

        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12">
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-white/80 transition-colors">
              Gestoría
            </Link>
            <span>/</span>
            <span className="text-white/80">{config.breadcrumbFinal}</span>
          </nav>

          <span className="inline-block bg-[#c9a84c] text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{config.badgeLine}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            ¿Necesitas redactar un contrato de alquiler en {config.nombre}?
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-xl mb-5 font-medium">
            Olvídate de plantillas descargables: aquí va tu contrato{' '}
            <strong className="text-white">LAU + Ley de Vivienda 2026</strong>, personalizado, en{' '}
            <strong className="text-[#c9a84c]">48 h</strong> y por <strong className="text-[#c9a84c]">{precio} €</strong> todo incluido.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-3xl font-bold text-[#c9a84c]">{precio} €</span>
              <span className="text-white/50 text-xs ml-2">IVA incluido</span>
            </div>
            <span className="text-white/60 text-sm">· Entrega en 48h · PDF firmable</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-[#c9a84c] p-5 rounded-r-lg mb-6 shadow-sm">
              <p className="text-gray-900 font-bold text-xl leading-snug">{config.alertaTitulo}</p>
              <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                Un contrato mal redactado te puede costar{' '}
                <strong>fianzas retenidas, rentas mal actualizadas o años de conflicto</strong>. Nosotros lo redactamos por
                ti: <strong>precio cerrado {precio} €</strong>, gestoría que sabe de inmuebles, entrega en{' '}
                <strong>48 h</strong>. Pulsa &quot;Pedir contrato&quot; y lo movemos hoy.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¿Qué es el contrato de alquiler LAU?</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">{config.introLargo}</p>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">{config.paraQuienTitulo}</h3>
              <ul className="space-y-2">
                {config.paraQuien.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-[#c9a84c] mt-0.5">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#fdf8ee] border border-[#e8d48a] rounded-2xl p-6 space-y-4">
              <p className="text-sm text-[#7a5c1e] font-medium uppercase tracking-wide">{config.ctaStickyLabel}</p>
              <h3 className="text-xl font-bold text-gray-900">Tu contrato LAU, sin vueltas</h3>
              <div>
                <p className="text-4xl font-bold text-[#c9a84c]">{precio} €</p>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
              <ul className="space-y-2">
                {CONTRATO_ALQUILER_PREMIUM_INCLUDES.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                    {inc}
                  </li>
                ))}
              </ul>
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Pedir contrato ahora — {precio} €
              </Link>
              <a
                href={`https://wa.me/${WA}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                💬 WhatsApp: 641 009 947
              </a>
              <a
                href="tel:+34641009947"
                className="block w-full text-center border border-[#c9a84c] text-[#c9a84c] hover:bg-[#fdf8ee] font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                📞 Llamar: 641 009 947
              </a>
              <Link
                href="/gestoria"
                className="block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Ver todos los contratos
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qué llevas exactamente (no &quot;un word en blanco&quot;)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTRATO_ALQUILER_PREMIUM_INCLUDES.map((inc) => (
              <div key={inc} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-[#c9a84c] text-lg mt-0.5 shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{inc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo funciona?</h2>
          <div className="space-y-6">
            {CONTRATO_ALQUILER_PREMIUM_PASOS.map((paso) => (
              <div key={paso.num} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c] flex items-center justify-center text-white font-bold text-lg">{paso.num}</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{paso.titulo}</h3>
                  <p className="text-gray-600">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                <summary className="font-bold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Otros contratos que pueden interesarte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/gestoria/arras-penitenciales"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Contrato</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">Arras Penitenciales</h3>
              <p className="text-[#c9a84c] font-bold">145 €</p>
            </Link>
            <Link
              href="/gestoria/rescision-alquiler"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Rescisión</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">Rescisión de Alquiler</h3>
              <p className="text-[#c9a84c] font-bold">73 €</p>
            </Link>
            <Link
              href="/gestoria/revision-contrato-alquiler"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Revisión</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">Revisión de Contrato de Alquiler</h3>
              <p className="text-[#c9a84c] font-bold">60 €</p>
            </Link>
          </div>
        </section>

        <section className="bg-[#0d1a0f] rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">¿Sigues retrasando el contrato? Eso te expone a los dos lados</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
            Cada día sin un LAU bien hecho es una apuesta. Pide el tuyo ahora: <strong className="text-white">menos de 48 h</strong> en tu correo, firma
            digital y cláusulas al día (propietario e inquilino).
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Lo quiero ya — {precio} € <span className="text-xs font-normal opacity-90">(IVA incl.)</span>
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              💬 WhatsApp: 641 009 947
            </a>
            <a href="tel:+34641009947" className="border border-white/20 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-xl transition-colors">
              📞 Llamar ahora
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
