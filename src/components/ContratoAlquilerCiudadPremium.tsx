import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestorContactBanner from '@/components/GestorContactBanner'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import TrackedContactLink from '@/components/TrackedContactLink'
import LlamaGestorBanner from '@/components/LlamaGestorBanner'
import ComoTrabajamosContrato from '@/components/ComoTrabajamosContrato'
import BarriosCiudadContrato from '@/components/BarriosCiudadContrato'
import CalculadoraAhorroContrato from '@/components/CalculadoraAhorroContrato'
import TestimoniosSection from '@/components/TestimoniosSection'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import type { ContratoAlquilerPremiumConfig } from '@/lib/contrato-alquiler-premium-config'
import {
  CONTRATO_ALQUILER_PREMIUM_INCLUDES,
  CONTRATO_ALQUILER_PREMIUM_PASOS,
  getContratoAlquilerPremiumPrecio,
  getContratoAlquilerPremiumSolicitarHref,
} from '@/lib/contrato-alquiler-premium-config'

const BASE_URL = 'https://inmonest.com'
const WA = '34745022862'

const GESTORIA_HUB_POR_CIUDAD: Record<string, string> = {
  malaga: '/gestoria/malaga',
  bilbao: '/gestoria/bilbao',
  palma: '/gestoria/palma',
  zaragoza: '/gestoria/zaragoza',
  alicante: '/gestoria/alicante',
  valencia: '/gestoria/valencia',
  madrid: '/gestoria/madrid',
  barcelona: '/gestoria/barcelona',
  sevilla: '/gestoria/sevilla',
}

export default function ContratoAlquilerCiudadPremium({ config }: { config: ContratoAlquilerPremiumConfig }) {
  const precio = getContratoAlquilerPremiumPrecio(config.slug)
  const solicitarHref = getContratoAlquilerPremiumSolicitarHref(config.slug)
  const waText = encodeURIComponent(`Hola, necesito un contrato de alquiler en ${config.nombre}`)
  const gestoriaHubHref = GESTORIA_HUB_POR_CIUDAD[config.slug]

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
          src="/gestoria7.jpg"
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

          <span className="inline-block bg-gold-500 text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{config.badgeLine}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            Contrato de alquiler en {config.nombre} desde {precio}€
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-xl mb-5 font-medium">
            LAU + Ley de Vivienda 2026, personalizado, entrega en{' '}
            <strong className="text-gold-500">48 h</strong>. Precio cerrado{' '}
            <strong className="text-gold-500">{precio} €</strong> IVA incluido.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div>
              <span className="text-3xl font-bold text-gold-500">{precio} €</span>
              <span className="text-white/50 text-xs ml-2">IVA incluido · 48h</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={solicitarHref}
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Pedir contrato — {precio}€
            </Link>
            <TrackedContactLink
              event="click_whatsapp"
              city={config.slug}
              href={`https://wa.me/${WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              WhatsApp
            </TrackedContactLink>
            <TrackedContactLink
              event="click_phone"
              city={config.slug}
              href="tel:+34745022862"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Llamar 745 022 862
            </TrackedContactLink>
          </div>
        </div>
      </section>

      <LlamaGestorBanner
        variant="strip"
        ciudad={config.nombre}
        title={`¿Dudas sobre el contrato de alquiler en ${config.nombre}?`}
        subtitle="Llama a tu gestor Inmonest: te atendemos, resolvemos dudas y luego decides si contratas"
        whatsappMessage={`Hola, necesito información sobre el contrato de alquiler en ${config.nombre}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-gold-500 p-5 rounded-r-lg mb-6 shadow-sm">
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
                    <span className="text-gold-500 mt-0.5">✓</span>
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
                <p className="text-4xl font-bold text-gold-500">{precio} €</p>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
              <ul className="space-y-2">
                {CONTRATO_ALQUILER_PREMIUM_INCLUDES.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                    {inc}
                  </li>
                ))}
              </ul>
              <Link
                href={solicitarHref}
                className="block w-full text-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Pedir contrato ahora — {precio} €
              </Link>
              <TrackedContactLink
                event="click_whatsapp"
                city={config.slug}
                href={`https://wa.me/${WA}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                WhatsApp: 745 022 862
              </TrackedContactLink>
              <TrackedContactLink
                event="click_phone"
                city={config.slug}
                href="tel:+34745022862"
                className="block w-full text-center border border-gold-500 text-gold-500 hover:bg-[#fdf8ee] font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Llamar: 745 022 862
              </TrackedContactLink>
              <div className="border-t border-[#e8d48a] pt-4">
                <GestoriaPideInfoForm
                  ciudad={config.nombre}
                  servicio="contrato de alquiler LAU"
                  precioLabel={`${precio}€`}
                  serviceKey={config.slug === 'barcelona' ? 'contrato-alquiler-barcelona' : 'contrato-alquiler'}
                />
              </div>
              <Link
                href="/gestoria"
                className="block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Ver todos los contratos
              </Link>
            </div>
          </div>
        </section>

        <ComoTrabajamosContrato ciudad={config.nombre} ciudadSlug={config.slug} servicio="alquiler" />

        <BarriosCiudadContrato ciudad={config.nombre} ciudadSlug={config.slug} servicio="alquiler" />

        <CalculadoraAhorroContrato
          mode="alquiler"
          ciudad={config.nombre}
          ciudadSlug={config.slug}
          precioContrato={Number(precio) || 145}
        />

        {config.particularidadesRegionales && (
          <section className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">{config.particularidadesRegionales.titulo}</h2>
            {config.particularidadesRegionales.secciones.map((sec) => (
              <div key={sec.titulo}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{sec.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{sec.contenido}</p>
                {sec.bullets && (
                  <ul className="mt-3 space-y-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-gold-500 mt-0.5 shrink-0">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {gestoriaHubHref && (
          <section className="bg-[#fdf8ee] border border-[#e8d48a] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              ¿Necesitas más que un contrato de alquiler en {config.nombre}?
            </h2>
            <p className="text-gray-600 mb-4">
              Arras, compraventa, revisión de contratos y acompañamiento completo hasta escritura — todo desde nuestra
              gestoría inmobiliaria en {config.nombre}, sin comisiones de agencia.
            </p>
            <Link
              href={gestoriaHubHref}
              className="inline-flex items-center gap-2 text-[#7a5c1e] font-semibold hover:text-gold-500 transition-colors"
            >
              Ver gestoría inmobiliaria en {config.nombre} →
            </Link>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qué llevas exactamente (no &quot;un word en blanco&quot;)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTRATO_ALQUILER_PREMIUM_INCLUDES.map((inc) => (
              <div key={inc} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-gold-500 text-lg mt-0.5 shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{inc}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo funciona la redacción?</h2>
          <div className="space-y-6">
            {CONTRATO_ALQUILER_PREMIUM_PASOS.map((paso) => (
              <div key={paso.num} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-lg">{paso.num}</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{paso.titulo}</h3>
                  <p className="text-gray-600">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <LlamaGestorBanner
        variant="full"
        ciudad={config.nombre}
        title={`Llama a tu gestor en ${config.nombre}`}
        subtitle="Te explicamos el contrato LAU, la fianza y el precio. Sin compromiso: decides tú si contratas."
        whatsappMessage={`Hola, quiero hablar con un gestor sobre el contrato de alquiler en ${config.nombre}`}
      />

      <TestimoniosSection
        landing="contrato-alquiler"
        ciudad={config.nombre}
        layout="stack"
        hideRating
        className="bg-gray-50"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
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

      </div>

      <CiudadHubServiciosGrid
        ciudad={config.nombre}
        ciudadSlug={config.slug}
        subtitulo={`Otros contratos y servicios de gestoría disponibles en ${config.nombre}.`}
        excluirServicios={['contrato-alquiler']}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">También te puede interesar</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            {
              href: '/calculadora-gastos-alquiler',
              label: 'Calculadora de gastos de alquiler',
              desc: 'Coste mensual real gratis',
            },
            {
              href: `/${config.slug}/alquiler-particulares`,
              label: `Alquiler de particulares en ${config.nombre}`,
              desc: 'Sin comisión de agencia',
            },
            {
              href: '/gestoria/cuanto-cuesta-contrato-alquiler',
              label: '¿Cuánto cuesta el contrato?',
              desc: `Desde ${precio}€ online`,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-gold-500/50 hover:shadow-sm transition-all"
            >
              <span className="block text-sm font-semibold text-gray-900">{item.label}</span>
              <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <section className="bg-[#0d1a0f] rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">¿Sigues retrasando el contrato? Eso te expone a los dos lados</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
            Cada día sin un LAU bien hecho es una apuesta. Pide el tuyo ahora: <strong className="text-white">menos de 48 h</strong> en tu correo, firma
            digital y cláusulas al día (propietario e inquilino).
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={solicitarHref}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Lo quiero ya — {precio} € <span className="text-xs font-normal opacity-90">(IVA incl.)</span>
            </Link>
            <TrackedContactLink
              event="click_whatsapp"
              city={config.slug}
              href={`https://wa.me/${WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              WhatsApp: 745 022 862
            </TrackedContactLink>
            <TrackedContactLink
              event="click_phone"
              city={config.slug}
              href="tel:+34745022862"
              className="border border-white/20 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Llamar ahora
            </TrackedContactLink>
          </div>
        </section>
      </div>

      <GestorContactBanner
        whatsappMessage={`Hola, necesito información sobre el contrato de alquiler en ${config.nombre}`}
        title={`¿Listo para el contrato en ${config.nombre}?`}
        subtitle="Te llamamos, resolvemos dudas y te explicamos el proceso sin compromiso"
      />

      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileContratoCta
        ciudad={config.nombre}
        ciudadSlug={config.slug}
        servicio="alquiler"
      />
    </>
  )
}
