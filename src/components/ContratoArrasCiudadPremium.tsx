import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import TrackedContactLink from '@/components/TrackedContactLink'
import ComoTrabajamosContrato from '@/components/ComoTrabajamosContrato'
import BarriosCiudadContrato from '@/components/BarriosCiudadContrato'
import CalculadoraAhorroContrato from '@/components/CalculadoraAhorroContrato'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import { getCiudadImage } from '@/lib/gestoria-images'
import type { ContratoArrasPremiumConfig } from '@/lib/contrato-arras-premium-config'
import {
  CONTRATO_ARRAS_PREMIUM_INCLUDES,
  CONTRATO_ARRAS_PREMIUM_PASOS,
  CONTRATO_ARRAS_PREMIUM_PRECIO,
} from '@/lib/contrato-arras-premium-config'

const BASE_URL = 'https://inmonest.com'
const WA = '34745022862'

export default function ContratoArrasCiudadPremium({ config }: { config: ContratoArrasPremiumConfig }) {
  const precio = CONTRATO_ARRAS_PREMIUM_PRECIO
  const solicitarHref = '/gestoria/solicitar/arras-penitenciales'
  const waText = encodeURIComponent(`Hola, necesito redactar un contrato de arras en ${config.nombre}`)

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
          src={getCiudadImage(config.slug).src}
          alt={config.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

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

          <span className="inline-block bg-gold-500 text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
            {config.badgeLine}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 max-w-2xl leading-tight">
            Contrato de arras en {config.nombre} desde {precio}€
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-xl mb-5 font-medium">
            Arras penitenciales personalizadas, entrega en <strong className="text-gold-500">48 h</strong>. Precio
            cerrado <strong className="text-gold-500">{precio} €</strong> IVA incluido. Habla primero con un gestor.
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
              className="inline-flex items-center justify-center bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-gold-500 p-5 rounded-r-lg mb-6 shadow-sm">
              <p className="text-gray-900 font-bold text-xl leading-snug">{config.alertaTitulo}</p>
              <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                Unas arras mal redactadas te pueden costar{' '}
                <strong>perder la señal, litigios o meses sin cerrar la escritura</strong>. Habla con un gestor, resuelve
                dudas y, si te encaja, redactamos por ti: <strong>precio cerrado {precio} €</strong>, entrega en{' '}
                <strong>48 h</strong>.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¿Qué es el contrato de arras penitenciales?</h2>
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
            <div className="sticky top-24 bg-cream-100 border border-gold-300 rounded-2xl p-6 space-y-4">
              <p className="text-sm text-gold-700 font-medium uppercase tracking-wide">{config.ctaStickyLabel}</p>
              <h3 className="text-xl font-bold text-gray-900">Tu contrato de arras, sin vueltas</h3>
              <div>
                <p className="text-4xl font-bold text-gold-500">{precio} €</p>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
              <ul className="space-y-2">
                {CONTRATO_ARRAS_PREMIUM_INCLUDES.map((inc) => (
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
                className="block w-full text-center bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                WhatsApp: 745 022 862
              </TrackedContactLink>
              <TrackedContactLink
                event="click_phone"
                city={config.slug}
                href="tel:+34745022862"
                className="block w-full text-center border border-gold-500 text-gold-500 hover:bg-cream-100 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Llamar: 745 022 862
              </TrackedContactLink>
              <div className="border-t border-gold-300 pt-4">
                <GestoriaPideInfoForm
                  ciudad={config.nombre}
                  servicio="contrato de arras penitenciales"
                  precioLabel={`${precio}€`}
                  serviceKey="contrato-arras"
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

        <ComoTrabajamosContrato ciudad={config.nombre} ciudadSlug={config.slug} servicio="arras" />

        <BarriosCiudadContrato ciudad={config.nombre} ciudadSlug={config.slug} servicio="arras" />

        <CalculadoraAhorroContrato
          mode="arras"
          ciudad={config.nombre}
          ciudadSlug={config.slug}
          precioContrato={Number(precio) || 145}
        />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qué llevas exactamente (no &quot;un word en blanco&quot;)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTRATO_ARRAS_PREMIUM_INCLUDES.map((inc) => (
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
            {CONTRATO_ARRAS_PREMIUM_PASOS.map((paso) => (
              <div key={paso.num} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-lg">
                    {paso.num}
                  </div>
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

      <GestoriaLandingExtras
        servicio="arras-penitenciales"
        servicioNombre={`Contrato de arras en ${config.nombre}`}
        ciudad={config.nombre}
        testimonioLanding="contrato-arras"
        whatsappMessage={`Hola Daniel, tengo dudas sobre el contrato de arras en ${config.nombre}`}
        skipCiudades
        skipRelacionados
        className="max-w-5xl mx-auto px-4 sm:px-6"
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
        excluirServicios={['arras-penitenciales']}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <section className="bg-forest-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            ¿Sigues retrasando las arras? Eso te expone a comprador y vendedor
          </h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
            Llama primero, resuelve dudas y, si te encaja, pide el contrato:{' '}
            <strong className="text-white">menos de 48 h</strong> en tu correo.
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
              className="bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
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

      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad={config.nombre}
        ciudadSlug={config.slug}
        servicio="arras"
      />
    </>
  )
}
