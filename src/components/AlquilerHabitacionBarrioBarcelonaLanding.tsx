import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import BarcelonaHabitacionBarriosHub from '@/components/BarcelonaHabitacionBarriosHub'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import GestoriaContratarCtaPair from '@/components/GestoriaContratarCtaPair'
import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import GestoriaAlquilerModulosCompletos, {
  GestoriaAlquilerTramiteOnlineSection,
} from '@/components/GestoriaAlquilerModulosCompletos'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import { getCiudadImage } from '@/lib/gestoria-images'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import {
  ALQUILER_HABITACION_CIUDADES,
  ALQUILER_HABITACION_PRECIO,
} from '@/lib/alquiler-habitacion-ciudad-data'
import type { BarcelonaHabitacionBarrioConfig } from '@/lib/barcelona-alquiler-habitacion-barrios'
import { listBarcelonaHabitacionBarrios } from '@/lib/barcelona-alquiler-habitacion-barrios'
import { RELACIONADOS_HABITACION } from '@/lib/gestoria-relacionados'

const SOLICITAR_URL = '/gestoria/solicitar/alquiler-habitaciones'

type Props = {
  config: BarcelonaHabitacionBarrioConfig
}

function mergeFaqs(
  barrio: BarcelonaHabitacionBarrioConfig['faqs'],
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

function BarcelonaHabitacionBarrioContenidoSeo({ config }: { config: BarcelonaHabitacionBarrioConfig }) {
  const otrosBarrios = listBarcelonaHabitacionBarrios().filter((b) => b.slug !== config.slug)

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
        <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Mercado local · barrio</p>
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
          Distrito: <strong>{config.distrito}</strong> · Barcelona · Contrato de habitación (Código Civil)
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Más barrios habitación en Barcelona</h2>
        <div className="flex flex-wrap gap-2">
          {otrosBarrios.map((b) => (
            <Link
              key={b.slug}
              href={`/barcelona/contrato-alquiler-habitacion/${b.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gold-200 text-sm font-medium text-gold-800 hover:bg-cream-100 transition-colors"
            >
              {b.nombre} →
            </Link>
          ))}
          <Link
            href="/gestoria/contrato-alquiler-habitacion/barcelona"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/15 border border-gold-400 text-sm font-semibold text-gold-900 hover:bg-gold-500/25 transition-colors"
          >
            Barcelona (ciudad)
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Mismo precio ({ALQUILER_HABITACION_PRECIO}€ IVA incluido) en todos los barrios del piloto.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          ¿Alquilas el piso entero?{' '}
          <Link href={`/barcelona/contrato-alquiler/${config.slug}`} className="text-gold-700 font-semibold hover:underline">
            Contrato LAU en {config.nombre}
          </Link>
        </p>
      </section>
    </div>
  )
}

export default function AlquilerHabitacionBarrioBarcelonaLanding({ config }: Props) {
  const ciudadCfg = ALQUILER_HABITACION_CIUDADES.barcelona
  const pagePath = `/barcelona/contrato-alquiler-habitacion/${config.slug}`
  const ciudadLabel = `${config.nombre}, Barcelona`
  const faqsAll = mergeFaqs(config.faqs, [...ciudadCfg.faqExtra])

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.ogTitle}
        description={config.meta.description}
        servicioNombre="Contrato alquiler de habitación"
        ciudadNombre={ciudadLabel}
        precioEuros={ALQUILER_HABITACION_PRECIO}
        faqs={faqsAll}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Alquiler habitación Barcelona', path: '/gestoria/contrato-alquiler-habitacion/barcelona' },
          { name: config.nombre },
        )}
      />
      <Navbar />

      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src={getCiudadImage('barcelona').src}
          alt={`Contrato alquiler habitación en ${config.nombre}, Barcelona`}
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
            <Link href="/gestoria/alquiler-habitaciones" className="hover:text-white/80 transition-colors">
              Alquiler habitación
            </Link>
            <span>/</span>
            <Link
              href="/gestoria/contrato-alquiler-habitacion/barcelona"
              className="hover:text-white/80 transition-colors"
            >
              Barcelona
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
            <span className="text-3xl font-bold text-gold-500">{ALQUILER_HABITACION_PRECIO} €</span>
            <span className="text-white/50 text-xs">IVA incluido · 48h · Código Civil</span>
          </div>
          <GestoriaContratarCtaPair
            variant="hero-dark"
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Pedir contrato habitación — ${ALQUILER_HABITACION_PRECIO}€`}
          />
        </div>
      </section>

      <GestoriaAlquilerTramiteOnlineSection
        ciudadNombre={ciudadLabel}
        panelAnchorId="panel-gestoria-habitacion"
        variant="habitacion"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <BarcelonaHabitacionBarrioContenidoSeo config={config} />
        <BarcelonaHabitacionBarriosHub />
      </div>

      <GestoriaAlquilerModulosCompletos
        variant="habitacion"
        ciudadNombre={ciudadLabel}
        ciudadSlug="barcelona"
        solicitarHref={SOLICITAR_URL}
        panelAnchorId="panel-gestoria-habitacion"
        partes={{ tramiteOnline: false }}
      />

      <GestoriaLandingExtras
        servicio="alquiler-habitaciones"
        servicioNombre={`Alquiler de habitación en ${config.nombre}, Barcelona`}
        ciudad="Barcelona"
        whatsappMessage={`Hola Daniel, necesito un contrato de alquiler de habitación en ${config.nombre} (Barcelona)`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Preguntas frecuentes — {config.nombre}
          </h2>
          <div className="space-y-4">
            {faqsAll.map((item) => (
              <details key={item.q} className="bg-white p-6 rounded-xl border border-gray-200">
                <summary className="font-bold text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="alquiler-habitaciones"
        servicioNombre={`Alquiler de habitación en ${config.nombre}`}
        ciudad="Barcelona"
        testimonioLanding={ciudadCfg.testimoniosLanding}
        relacionados={RELACIONADOS_HABITACION}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />
      <MobileDockSpacer />
    </>
  )
}
