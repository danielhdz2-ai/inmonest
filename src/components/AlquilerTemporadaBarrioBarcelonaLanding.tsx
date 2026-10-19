import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import BarcelonaTemporadaBarriosHub from '@/components/BarcelonaTemporadaBarriosHub'
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
import { ALQUILER_TEMPORADA_ENRIQUECIMIENTO } from '@/lib/alquiler-temporada-ciudad-enriquecimiento'
import { getAlquilerTemporadaPrecio } from '@/lib/alquiler-temporada-ciudad-data'
import { precioLabel } from '@/lib/gestoria-precios-ui'
import type { BarcelonaTemporadaBarrioConfig } from '@/lib/barcelona-alquiler-temporada-barrios'
import { listBarcelonaTemporadaBarrios } from '@/lib/barcelona-alquiler-temporada-barrios'

const SOLICITAR_URL = '/gestoria/solicitar/alquiler-temporada'

type Props = {
  config: BarcelonaTemporadaBarrioConfig
}

function mergeFaqs(
  barrio: BarcelonaTemporadaBarrioConfig['faqs'],
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

function BarcelonaTemporadaBarrioContenidoSeo({ config }: { config: BarcelonaTemporadaBarrioConfig }) {
  const otrosBarrios = listBarcelonaTemporadaBarrios().filter((b) => b.slug !== config.slug)

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
          Distrito: <strong>{config.distrito}</strong> · Barcelona · Contrato de temporada personalizado
        </p>
      </section>

      <section className="rounded-2xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50 via-white to-cream-50 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Diferenciador · {config.nombre}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{config.destacados.titulo}</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {config.destacados.etiquetas.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-900"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Casos habituales en este barrio</h3>
            <ul className="space-y-2">
              {config.destacados.casos.map((c) => (
                <li key={c} className="text-sm text-gray-700 flex gap-2 leading-relaxed">
                  <span className="text-amber-600 shrink-0">●</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Riesgos si firmas a ciegas</h3>
            <div className="space-y-3">
              {config.destacados.riesgos.map((r) => (
                <div key={r.titulo} className="rounded-xl bg-white border border-red-100 p-4">
                  <p className="font-semibold text-gray-900 text-sm">{r.titulo}</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{r.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              <span className="text-gold-500 font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.normativa.titulo}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{config.normativa.intro}</p>
        <div className="space-y-6">
          {config.normativa.bloques.map((bloque) => (
            <div key={bloque.titulo} className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900 mb-2">{bloque.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{bloque.contenido}</p>
              {bloque.bullets?.length ? (
                <ul className="text-sm text-gray-600 space-y-1">
                  {bloque.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-gold-500">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.blindaje.titulo}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{config.blindaje.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.blindaje.puntos.map((p) => (
            <div key={p.titulo} className="rounded-xl bg-slate-50 border border-slate-200 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">{p.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {otrosBarrios.length > 0 ? (
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Otros barrios</p>
          <div className="flex flex-wrap gap-2">
            {otrosBarrios.slice(0, 12).map((b) => (
              <Link
                key={b.slug}
                href={`/barcelona/alquiler-temporada/${b.slug}`}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gold-400 text-gray-700"
              >
                {b.nombre}
              </Link>
            ))}
            {otrosBarrios.length > 12 ? (
              <span className="text-sm text-gray-500 self-center">+{otrosBarrios.length - 12} más abajo</span>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default function AlquilerTemporadaBarrioBarcelonaLanding({ config }: Props) {
  const precio = getAlquilerTemporadaPrecio()
  const ciudadLabel = 'Barcelona'
  const faqsAll = mergeFaqs(config.faqs, ALQUILER_TEMPORADA_ENRIQUECIMIENTO.barcelona.faqs)
  const pagePath = `/barcelona/alquiler-temporada/${config.slug}`

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.hero.h1}
        description={config.meta.description}
        servicioNombre="Contrato de alquiler de temporada"
        ciudadNombre={`${config.nombre}, Barcelona`}
        precioEuros={precio}
        faqs={faqsAll}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Alquiler temporada', path: '/gestoria/alquiler-temporada' },
          { name: 'Barcelona', path: '/barcelona/alquiler-temporada' },
          { name: config.nombre },
        )}
      />
      <Navbar />

      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src={getCiudadImage('barcelona').src}
          alt={`Contrato alquiler temporada en ${config.nombre}, Barcelona`}
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
            <Link href="/gestoria/alquiler-temporada" className="hover:text-white/80 transition-colors">
              Alquiler temporada
            </Link>
            <span>/</span>
            <Link href="/barcelona/alquiler-temporada" className="hover:text-white/80 transition-colors">
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
            <span className="text-3xl font-bold text-gold-500">{precioLabel('alquiler-temporada')}</span>
            <span className="text-white/50 text-xs">IVA incluido · 48h · Temporada</span>
          </div>
          <GestoriaContratarCtaPair
            variant="hero-dark"
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Pedir contrato temporada — ${precioLabel('alquiler-temporada')}`}
          />
        </div>
      </section>

      <GestoriaAlquilerTramiteOnlineSection
        ciudadNombre={`${config.nombre}, ${ciudadLabel}`}
        panelAnchorId="panel-gestoria-temporada"
        variant="temporada"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <BarcelonaTemporadaBarrioContenidoSeo config={config} />
        <BarcelonaTemporadaBarriosHub />
      </div>

      <GestoriaAlquilerModulosCompletos
        variant="temporada"
        ciudadNombre={ciudadLabel}
        ciudadSlug="barcelona"
        solicitarHref={SOLICITAR_URL}
        panelAnchorId="panel-gestoria-temporada"
        partes={{ tramiteOnline: false }}
      />

      <GestoriaLandingExtras
        servicio="alquiler-temporada"
        servicioNombre={`Alquiler temporada en ${config.nombre}, Barcelona`}
        ciudad="Barcelona"
        whatsappMessage={`Hola Daniel, necesito un contrato de alquiler por temporada en ${config.nombre} (Barcelona)`}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/barcelona/alquiler-temporada', label: 'Temporada Barcelona (ciudad)', desc: 'Hub + todos los barrios' },
            { href: `/barcelona/contrato-alquiler/${config.slug}`, label: `LAU en ${config.nombre}`, desc: 'Vivienda habitual larga duración' },
            { href: '/gestoria/contrato-alquiler-habitacion/barcelona', label: 'Habitación Barcelona', desc: 'Piso compartido' },
            { href: '/blog/regulacion-alquiler-temporada-habitaciones-2026', label: 'Blog temporada 2026', desc: 'Normativa y casos' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-gold-500/50 transition-all"
            >
              <span className="block text-sm font-semibold text-gray-900">{item.label}</span>
              <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      <GestoriaLandingExtras
        servicio="alquiler-temporada"
        servicioNombre={`Alquiler temporada en ${config.nombre}`}
        ciudad="Barcelona"
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
