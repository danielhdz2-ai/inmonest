import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  CONTRATO_ALQUILER_PREMIUM_INCLUDES,
  getContratoAlquilerPremiumPrecio,
} from '@/lib/contrato-alquiler-premium-config'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import type { BarcelonaAlquilerBarrioConfig } from '@/lib/barcelona-contrato-alquiler-barrios'
import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'

const SOLICITAR_HREF = '/gestoria/solicitar/contrato-alquiler-barcelona'

type Props = {
  config: BarcelonaAlquilerBarrioConfig
}

export default function ContratoAlquilerBarrioBarcelonaLanding({ config }: Props) {
  const precio = getContratoAlquilerPremiumPrecio('barcelona')
  const pagePath = `/barcelona/contrato-alquiler/${config.slug}`
  const otrosBarrios = listBarcelonaAlquilerBarrios().filter((b) => b.slug !== config.slug)

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.ogTitle}
        description={config.meta.description}
        servicioNombre="Contrato de alquiler LAU"
        ciudadNombre={`Barcelona (${config.nombre})`}
        precioEuros={Number(precio)}
        faqs={config.faqs}
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
          <p className="text-white/90 text-lg max-w-2xl mb-4 leading-relaxed">{config.hero.subtitulo}</p>
          <GestoriaTramiteOnlineNote variant="hero-dark" className="mb-5 max-w-xl" />
          <div className="flex flex-wrap gap-3">
            <Link
              href={SOLICITAR_HREF}
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Pedir contrato LAU — {precio}€
            </Link>
            <a
              href="#para-propietario"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Soy propietario
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
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
          <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Mercado local</p>
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
            Distrito: <strong>{config.distrito}</strong> · Barcelona capital · Servicio online en toda Cataluña
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
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-bold text-gold-600">{precio} €</p>
            <p className="text-sm text-gray-500">IVA incluido · Contrato personalizado · Entrega orientativa 48h</p>
            <Link
              href={SOLICITAR_HREF}
              className="inline-flex bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
            >
              Solicitar contrato blindado
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qué incluye tu contrato LAU en {config.nombre}</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes — {config.nombre}</h2>
          <div className="space-y-4">
            {config.faqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                <summary className="font-bold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Otros barrios de Barcelona con contrato LAU</h2>
          <p className="text-gray-600 text-sm mb-5">
            Mismo servicio personalizado ({precio}€) en otras zonas de la ciudad. Cada página describe mercado y
            normativa local.
          </p>
          <div className="flex flex-wrap gap-2">
            {otrosBarrios.map((b) => (
              <Link
                key={b.slug}
                href={`/barcelona/contrato-alquiler/${b.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gold-200 text-sm font-medium text-gold-800 hover:bg-cream-100 transition-colors"
              >
                {b.nombre}
                <span className="text-gold-500 text-xs">→</span>
              </Link>
            ))}
            <Link
              href="/barcelona/contrato-alquiler"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/15 border border-gold-400 text-sm font-semibold text-gold-900 hover:bg-gold-500/25 transition-colors"
            >
              Toda Barcelona
            </Link>
          </div>
        </section>

        <section className="text-sm text-gray-500 border-t border-gray-200 pt-8">
          <p>
            También disponible:{' '}
            <Link href="/gestoria/contrato-alquiler-habitacion/barcelona" className="text-gold-700 hover:underline">
              contrato de habitación en Barcelona
            </Link>
            ,{' '}
            <Link href="/gestoria/barcelona" className="text-gold-700 hover:underline">
              gestoría inmobiliaria Barcelona
            </Link>{' '}
            y{' '}
            <Link href="/blog/contrato-alquiler-vivienda-guia" className="text-gold-700 hover:underline">
              guía LAU
            </Link>
            .
          </p>
        </section>
      </div>

      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad={`${config.nombre}, Barcelona`}
        ciudadSlug="barcelona"
        servicio="alquiler"
        whatsappMessage={`Hola Daniel, quiero un contrato LAU en ${config.nombre} (Barcelona)`}
      />
    </>
  )
}
