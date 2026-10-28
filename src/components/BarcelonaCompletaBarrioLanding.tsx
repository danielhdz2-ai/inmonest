import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import GestoriaCiudadHero from '@/components/GestoriaCiudadHero'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import InmonestOficinaBarcelonaSection from '@/components/InmonestOficinaBarcelonaSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import { VENTA_COMPLETA_PRECIO } from '@/lib/venta-completa-ciudad-data'
import {
  COMPRA_COMPLETA_CINCO_PASOS,
  VENTA_COMPLETA_CINCO_PASOS,
} from '@/lib/completa-cinco-pasos-content'
import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type BarcelonaCompletaModo = 'venta' | 'compra'

type Props = {
  modo: BarcelonaCompletaModo
  config: BarcelonaCompletaBarrioConfig
  /** Enlaces a otras landings del mismo modo */
  otrosBarrios: { slug: string; nombre: string; href: string }[]
}

const PRECO = getPrecioServicio('venta-completa-reserva-escritura') ?? VENTA_COMPLETA_PRECIO

export default function BarcelonaCompletaBarrioLanding({ modo, config, otrosBarrios }: Props) {
  const isVenta = modo === 'venta'
  const servicioSlug = isVenta ? 'venta-completa-reserva-escritura' : 'compra-completa-reserva-escritura'
  const servicioNombre = isVenta ? 'Venta completa hasta escritura' : 'Compra completa hasta escritura'
  const basePath = isVenta ? '/barcelona/venta-completa' : '/barcelona/compra-completa'
  const pagePath = `${basePath}/${config.slug}`
  const solicitarHref = `/gestoria/solicitar/${servicioSlug}`
  const pasos = isVenta ? VENTA_COMPLETA_CINCO_PASOS : COMPRA_COMPLETA_CINCO_PASOS

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.title}
        description={config.meta.description}
        servicioNombre={servicioNombre}
        ciudadNombre={`${config.nombre}, Barcelona`}
        precioEuros={PRECO}
        faqs={config.faqs}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: servicioNombre, path: `/gestoria/${servicioSlug}` },
          { name: `Barcelona · ${config.nombre}` },
        )}
      />
      <Navbar />
      <WhatsAppButton />

      <GestoriaCiudadHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Barcelona', href: '/gestoria/barcelona' },
          { label: isVenta ? 'Venta completa' : 'Compra completa', href: `/gestoria/${servicioSlug}/barcelona` },
          { label: config.nombre },
        ]}
        badge={`${servicioNombre} · ${config.distrito} · 687 € IVA incl.`}
        title={config.hero.h1}
        lead={config.hero.lead}
        precio={PRECO}
        imageSrc={config.heroImage}
        imageAlt={`${servicioNombre} en ${config.nombre}, Barcelona`}
        solicitarHref={solicitarHref}
        solicitarLabel={`Contratar online — ${PRECO}€`}
        footnote={`Gestor asignado · Panel de cliente · Despacho Les Corts (Mejía Lequerica 44)`}
      />

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{config.mercado.titulo}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{config.mercado.intro}</p>
          <ul className="space-y-3">
            {config.mercado.puntos.map((p) => (
              <li key={p} className="flex items-start gap-3 text-gray-700">
                <span className="text-gold-500 font-bold shrink-0">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AgenciaGestoriaPanelDemo
        audience="particular"
        particularRole={isVenta ? 'vendedor' : 'comprador'}
        ciudadNombre={config.nombre}
      />

      <section className="py-16 px-4 bg-slate-50 border-t border-gray-100" id="como-funciona">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-700 text-center mb-2">Proceso</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Cómo funciona el pack en {config.nombre} — 5 pasos
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Mismo flujo en toda Barcelona: online con panel; presencial en Les Corts cuando lo pidas.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pasos.map((item) => (
              <article
                key={item.paso}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-full"
              >
                <span className="text-3xl font-black text-gold-500/40 mb-2">{item.paso}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{item.titulo}</h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">{item.desc}</p>
              </article>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link
              href={solicitarHref}
              className="inline-flex rounded-full bg-gold-500 px-8 py-3 text-sm font-bold text-gray-900 hover:bg-gold-600 transition-colors"
            >
              Empezar pack {PRECO}€ →
            </Link>
          </p>
        </div>
      </section>

      <InmonestOficinaBarcelonaSection
        backHref={isVenta ? '/gestoria/venta-completa-reserva-escritura/barcelona' : '/gestoria/compra-completa-reserva-escritura'}
        backLabel={
          isVenta
            ? '← Venta completa Barcelona (hub)'
            : '← Compra completa Barcelona'
        }
      />

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Otros barrios — {isVenta ? 'venta' : 'compra'} completa en Barcelona
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {otrosBarrios.map((b) => (
              <li key={b.slug}>
                <Link
                  href={b.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                    b.slug === config.slug
                      ? 'bg-gold-500 text-gray-900 border-gold-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gold-400'
                  }`}
                >
                  {b.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CiudadHubFaq ciudad={config.nombre} items={config.faqs} titulo={`Preguntas frecuentes — ${config.nombre}`} />

      <section className="py-12 px-4 bg-gray-900 text-center">
        <p className="text-white/80 text-sm mb-4 max-w-xl mx-auto">
          {isVenta ? '¿Ya tienes comprador' : '¿Ya tienes piso y precio'} en {config.nombre}? Pack {PRECO}€ sin comisión
          sobre el inmueble.
        </p>
        <Link
          href={solicitarHref}
          className="inline-flex rounded-full bg-gold-500 px-8 py-3 text-sm font-bold text-gray-900 hover:bg-gold-400"
        >
          Contratar {isVenta ? 'venta' : 'compra'} completa
        </Link>
      </section>
    </>
  )
}
