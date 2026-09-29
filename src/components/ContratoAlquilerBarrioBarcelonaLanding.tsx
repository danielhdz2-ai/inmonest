import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaAlquilerModulosCompletos, {
  GestoriaAlquilerTramiteOnlineSection,
} from '@/components/GestoriaAlquilerModulosCompletos'
import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import BarcelonaAlquilerBarriosHub from '@/components/BarcelonaAlquilerBarriosHub'
import CalculadoraAhorroContrato from '@/components/CalculadoraAhorroContrato'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  CONTRATO_ALQUILER_PREMIUM_INCLUDES,
  getContratoAlquilerPremiumConfig,
  getContratoAlquilerPremiumPrecio,
  getContratoAlquilerPremiumSolicitarHref,
} from '@/lib/contrato-alquiler-premium-config'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import type { BarcelonaAlquilerBarrioConfig } from '@/lib/barcelona-contrato-alquiler-barrios'
import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'

type Props = {
  config: BarcelonaAlquilerBarrioConfig
}

function mergeFaqs(
  barrio: BarcelonaAlquilerBarrioConfig['faqs'],
  ciudad: { q: string; a: string }[] | undefined,
) {
  const seen = new Set<string>()
  const out: { q: string; a: string }[] = []
  for (const faq of [...barrio, ...(ciudad ?? [])]) {
    if (seen.has(faq.q)) continue
    seen.add(faq.q)
    out.push(faq)
  }
  return out
}

function BarcelonaAlquilerBarrioContenidoSeo({ config }: { config: BarcelonaAlquilerBarrioConfig }) {
  const otrosBarrios = listBarcelonaAlquilerBarrios().filter((b) => b.slug !== config.slug)
  const precio = getContratoAlquilerPremiumPrecio('barcelona')

  return (
    <div className="space-y-16">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gold-200 bg-cream-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Propietarios</p>
          <p className="text-gray-800 font-medium leading-relaxed">{config.hero.anguloPropietario}</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">Inquilinos</p>
          <p className="text-gray-800 font-medium leading-relaxed">{config.hero.anguloInquilino}</p>
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Mercado local · SEO barrio</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{config.mercado.titulo}</h2>
        <p className="text-gray-600 leading-relaxed text-[1.05rem] mb-6">{config.mercado.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Renta orientativa</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.rentaOrientativa}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Quién alquila aquí</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.perfilDemanda}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Particularidad del barrio</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.particularidad}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Distrito: <strong>{config.distrito}</strong> · Barcelona · Contrato LAU personalizado y blindado
        </p>
      </section>

      <section id="para-propietario" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.paraPropietario.titulo}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{config.paraPropietario.intro}</p>
        <ul className="space-y-3">
          {config.paraPropietario.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-700">
              <span className="text-gold-500 font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section id="para-inquilino" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.paraInquilino.titulo}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{config.paraInquilino.intro}</p>
        <ul className="space-y-3">
          {config.paraInquilino.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-700">
              <span className="text-blue-600 font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Normativa</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.normativa.titulo}</h2>
          <p className="text-gray-600 leading-relaxed">{config.normativa.intro}</p>
        </div>
        {config.normativa.bloques.map((bloque) => (
          <div key={bloque.titulo} className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{bloque.titulo}</h3>
            <p className="text-gray-600 leading-relaxed">{bloque.contenido}</p>
            {bloque.bullets && (
              <ul className="mt-4 space-y-2">
                {bloque.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-gold-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-br from-cream-100 to-white border border-gold-300 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.blindaje.titulo}</h2>
        <p className="text-gray-600 leading-relaxed mb-8">{config.blindaje.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {config.blindaje.puntos.map((p) => (
            <div key={p.titulo} className="bg-white rounded-xl border border-gold-200/80 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{p.titulo}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Más barrios en Barcelona</h2>
        <div className="flex flex-wrap gap-2">
          {otrosBarrios.map((b) => (
            <Link
              key={b.slug}
              href={`/barcelona/contrato-alquiler/${b.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gold-200 text-sm font-medium text-gold-800 hover:bg-cream-100 transition-colors"
            >
              {b.nombre} →
            </Link>
          ))}
          <Link
            href="/barcelona/contrato-alquiler"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/15 border border-gold-400 text-sm font-semibold text-gold-900 hover:bg-gold-500/25 transition-colors"
          >
            Toda Barcelona
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Mismo precio cerrado ({precio}€ IVA incluido) en todos los barrios del piloto.
        </p>
      </section>
    </div>
  )
}

export default function ContratoAlquilerBarrioBarcelonaLanding({ config }: Props) {
  const precio = getContratoAlquilerPremiumPrecio('barcelona')
  const solicitarHref = getContratoAlquilerPremiumSolicitarHref('barcelona')
  const ciudadCfg = getContratoAlquilerPremiumConfig('barcelona')
  const pagePath = `/barcelona/contrato-alquiler/${config.slug}`
  const ciudadLabel = `${config.nombre}, Barcelona`
  const faqsAll = mergeFaqs(config.faqs, ciudadCfg?.faqs)
  const waMessage = `Hola Daniel, quiero un contrato LAU en ${config.nombre} (Barcelona)`

  const alertaTitulo =
    ciudadCfg?.alertaTitulo.replace('Barcelona', `${config.nombre} (Barcelona)`) ??
    `Vas a firmar un alquiler en ${config.nombre}: ¿con un PDF genérico?`

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.ogTitle}
        description={config.meta.description}
        servicioNombre="Contrato de alquiler LAU"
        ciudadNombre={ciudadLabel}
        precioEuros={Number(precio)}
        faqs={faqsAll}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Contrato alquiler Barcelona', path: '/barcelona/contrato-alquiler' },
          { name: config.nombre },
        )}
      />
      <Navbar />

      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src={getCiudadImage('barcelona').src}
          alt={`Contrato de alquiler LAU en ${config.nombre}, Barcelona`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/30" />
        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-white/80 transition-colors">
              Gestoría
            </Link>
            <span>/</span>
            <Link href="/barcelona/contrato-alquiler" className="hover:text-white/80 transition-colors">
              Alquiler Barcelona
            </Link>
            <span>/</span>
            <span className="text-white/80">{config.nombre}</span>
          </nav>
          <span className="inline-block bg-gold-500 text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
            {config.hero.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 max-w-3xl leading-tight">
            {config.hero.h1}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-3 font-medium">{config.hero.subtitulo}</p>
          <GestoriaTramiteOnlineNote variant="hero-dark" className="mb-5 max-w-xl" />
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gold-500">{precio} €</span>
            <span className="text-white/50 text-xs">IVA incluido · 48h · contrato blindado</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={solicitarHref}
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Pedir contrato LAU — {precio}€
            </Link>
            <a
              href="#gestor-daniel"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Hablar con Daniel
            </a>
            <a
              href="#para-inquilino"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Soy inquilino
            </a>
          </div>
        </div>
      </section>

      <GestoriaAlquilerTramiteOnlineSection
        ciudadNombre={ciudadLabel}
        panelAnchorId="panel-gestoria-lau"
        variant="lau"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-gold-500 p-5 rounded-r-lg shadow-sm">
              <p className="text-gray-900 font-bold text-xl leading-snug">{alertaTitulo}</p>
              <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                Un contrato mal redactado en {config.nombre} puede costarte{' '}
                <strong>fianzas retenidas, rentas mal actualizadas o cláusulas nulas</strong> (zona tensionada,
                INCASÒL). Lo redactamos personalizado: <strong>{precio} €</strong> cerrados, gestor asignado, entrega
                en <strong>48 h</strong>.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¿Qué es el contrato de alquiler LAU en {config.nombre}?</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              {ciudadCfg?.introLargo ?? config.hero.subtitulo}
            </p>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">{config.mercado.particularidad}</p>

            {ciudadCfg && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{ciudadCfg.paraQuienTitulo}</h3>
                <ul className="space-y-2">
                  {ciudadCfg.paraQuien.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-gold-500 mt-0.5">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-cream-100 border border-gold-300 rounded-2xl p-6 space-y-4">
              <p className="text-sm text-gold-700 font-medium uppercase tracking-wide">
                Alquiler · {config.nombre}
              </p>
              <h3 className="text-xl font-bold text-gray-900">Tu contrato LAU blindado</h3>
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
                Pedir contrato — {precio} €
              </Link>
              <a
                href="#gestor-daniel"
                className="block w-full text-center border border-gold-500/60 text-gold-600 hover:bg-cream-100 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                WhatsApp / teléfono con Daniel
              </a>
              <Link
                href="/barcelona/contrato-alquiler"
                className="block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Ver Barcelona completa
              </Link>
            </div>
          </div>
        </section>
      </div>

      <GestoriaAlquilerModulosCompletos
        variant="lau"
        ciudadNombre={ciudadLabel}
        ciudadSlug="barcelona"
        solicitarHref={solicitarHref}
        panelAnchorId="panel-gestoria-lau"
        partes={{ tramiteOnline: false }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <BarcelonaAlquilerBarrioContenidoSeo config={config} />

        <BarcelonaAlquilerBarriosHub />

        <CalculadoraAhorroContrato
          mode="alquiler"
          ciudad={`Barcelona (${config.nombre})`}
          ciudadSlug="barcelona"
          precioContrato={Number(precio) || 145}
        />

        <section className="bg-cream-100 border border-gold-300 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Más que un contrato en {config.nombre}: gestoría inmobiliaria Barcelona
          </h2>
          <p className="text-gray-600 mb-4">
            Arras, due diligence, habitación, venta completa y revisión de contratos — mismo gestor, trámite online.
          </p>
          <Link
            href="/gestoria/barcelona"
            className="inline-flex items-center gap-2 text-gold-700 font-semibold hover:text-gold-500 transition-colors"
          >
            Hub gestoría Barcelona →
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Qué llevas exactamente en {config.nombre} (no un Word en blanco)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTRATO_ALQUILER_PREMIUM_INCLUDES.map((inc) => (
              <div key={inc} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-gold-500 text-lg mt-0.5 shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{inc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <GestoriaLandingExtras
        servicio="contrato-alquiler"
        servicioNombre={`Contrato de alquiler LAU en ${config.nombre}, Barcelona`}
        ciudad="Barcelona"
        whatsappMessage={waMessage}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes — {config.nombre}</h2>
          <div className="space-y-4">
            {faqsAll.map((faq) => (
              <details key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                <summary className="font-bold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <GestoriaLandingExtras
        servicio="contrato-alquiler"
        servicioNombre={`Contrato LAU ${config.nombre}`}
        ciudad="Barcelona"
        testimonioLanding="contrato-alquiler"
        skipCiudades
        skipRelacionados
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <CiudadHubServiciosGrid
        ciudad="Barcelona"
        ciudadSlug="barcelona"
        subtitulo={`Otros servicios de gestoría en Barcelona además del LAU en ${config.nombre}.`}
        excluirServicios={['contrato-alquiler']}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">También te puede interesar</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {[
            {
              href: '/barcelona/contrato-alquiler',
              label: 'Contrato alquiler Barcelona (ciudad)',
              desc: 'Hub LAU + todos los barrios',
            },
            {
              href: '/gestoria/contrato-alquiler-habitacion/barcelona',
              label: 'Contrato habitación Barcelona',
              desc: 'Piso compartido · 120€',
            },
            {
              href: '/calculadora-gastos-alquiler',
              label: 'Calculadora gastos alquiler',
              desc: 'Coste mensual orientativo',
            },
            {
              href: '/barcelona/alquiler-particulares',
              label: 'Alquiler particulares Barcelona',
              desc: 'Sin comisión agencia',
            },
            {
              href: '/gestoria/cuanto-cuesta-contrato-alquiler',
              label: '¿Cuánto cuesta el LAU?',
              desc: `Desde ${precio}€ online`,
            },
            {
              href: '/blog/contrato-alquiler-vivienda-guia',
              label: 'Guía contrato alquiler LAU',
              desc: 'Blog Inmonest',
            },
            {
              href: '/blog/lau-actualizacion-renta-irav-2026',
              label: 'Actualización renta 2026',
              desc: 'Ley de Vivienda e IRAV',
            },
            {
              href: '/gestoria/due-diligence-precompra/barcelona',
              label: 'Due diligence Barcelona',
              desc: 'Antes de comprar o alquilar',
            },
            {
              href: '/contratos-inmobiliarios/barcelona',
              label: 'Contratos inmobiliarios BCN',
              desc: 'Arras + LAU + packs',
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
        <section className="bg-forest-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Contrato LAU en {config.nombre}: no firmes a ciegas
          </h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
            Gestor asignado, panel online, borrador personalizado y firma digital.{' '}
            <strong className="text-white">Menos de 48 h</strong> desde que nos pasas los datos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={solicitarHref}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Contratar — {precio} € <span className="text-xs font-normal opacity-90">(IVA incl.)</span>
            </Link>
            <a
              href="#gestor-daniel"
              className="border border-white/20 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-xl transition-colors"
            >
              WhatsApp con Daniel
            </a>
          </div>
        </section>
      </div>

      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad={ciudadLabel}
        ciudadSlug="barcelona"
        servicio="alquiler"
        whatsappMessage={waMessage}
      />
    </>
  )
}
