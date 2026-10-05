import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaArrasModulosCompletos, {
  GestoriaArrasTramiteOnlineSection,
} from '@/components/GestoriaArrasModulosCompletos'
import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import BarcelonaArrasBarriosHub from '@/components/BarcelonaArrasBarriosHub'
import CalculadoraAhorroContrato from '@/components/CalculadoraAhorroContrato'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  CONTRATO_ARRAS_PREMIUM_INCLUDES,
  CONTRATO_ARRAS_PREMIUM_PRECIO,
  getContratoArrasPremiumConfig,
} from '@/lib/contrato-arras-premium-config'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios'
import { listBarcelonaArrasBarrios } from '@/lib/barcelona-contrato-arras-barrios'

type Props = { config: BarcelonaArrasBarrioConfig }

function mergeFaqs(barrio: BarcelonaArrasBarrioConfig['faqs'], ciudad: { q: string; a: string }[] | undefined) {
  const seen = new Set<string>()
  const out: { q: string; a: string }[] = []
  for (const faq of [...barrio, ...(ciudad ?? [])]) {
    if (seen.has(faq.q)) continue
    seen.add(faq.q)
    out.push(faq)
  }
  return out
}

function BarcelonaArrasBarrioContenidoSeo({ config }: { config: BarcelonaArrasBarrioConfig }) {
  const precio = CONTRATO_ARRAS_PREMIUM_PRECIO

  return (
    <div className="space-y-16">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gold-200 bg-cream-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Compradores</p>
          <p className="text-gray-800 font-medium leading-relaxed">{config.hero.anguloComprador}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">Vendedores</p>
          <p className="text-gray-800 font-medium leading-relaxed">{config.hero.anguloVendedor}</p>
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Mercado local</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{config.mercado.titulo}</h2>
        <p className="text-gray-600 leading-relaxed text-[1.05rem] mb-6">{config.mercado.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Precio / señal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.precioOrientativo}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Perfil comprador</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.perfilComprador}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Particularidad</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.particularidad}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Distrito: <strong>{config.distrito}</strong> · Barcelona · Arras penitenciales {precio} € IVA incl.
        </p>
      </section>

      <section id="para-comprador" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.paraComprador.titulo}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{config.paraComprador.intro}</p>
        <ul className="space-y-3">
          {config.paraComprador.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-700">
              <span className="text-gold-500 font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section id="para-vendedor" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.paraVendedor.titulo}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{config.paraVendedor.intro}</p>
        <ul className="space-y-3">
          {config.paraVendedor.bullets.map((b) => (
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
            <div key={bloque.titulo} className="rounded-2xl border border-gray-200 p-6 bg-white">
              <h3 className="font-bold text-gray-900 mb-2">{bloque.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{bloque.contenido}</p>
              {bloque.bullets && (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {bloque.bullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.blindaje.titulo}</h2>
        <p className="text-gray-600 mb-5">{config.blindaje.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {config.blindaje.puntos.map((p) => (
            <div key={p.titulo} className="rounded-xl bg-cream-50 border border-gold-200/60 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{p.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Otros barrios Barcelona</p>
        <div className="flex flex-wrap gap-2">
          {listBarcelonaArrasBarrios()
            .filter((b) => b.slug !== config.slug)
            .map((b) => (
              <Link
                key={b.slug}
                href={`/barcelona/contrato-arras/${b.slug}`}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-gold-500 text-gray-700 hover:text-gold-700 transition-colors"
              >
                Arras {b.nombre}
              </Link>
            ))}
          <Link
            href="/barcelona/contrato-arras"
            className="text-sm px-3 py-1.5 rounded-full border border-gold-300 bg-cream-50 text-gold-800 font-medium"
          >
            Hub arras Barcelona
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function ContratoArrasBarrioBarcelonaLanding({ config }: Props) {
  const precio = CONTRATO_ARRAS_PREMIUM_PRECIO
  const solicitarHref = '/gestoria/solicitar/arras-penitenciales'
  const ciudadCfg = getContratoArrasPremiumConfig('barcelona')
  const pagePath = `/barcelona/contrato-arras/${config.slug}`
  const ciudadLabel = `${config.nombre}, Barcelona`
  const faqsAll = mergeFaqs(config.faqs, ciudadCfg?.faqs)
  const waMessage = `Hola Daniel, quiero un contrato de arras en ${config.nombre} (Barcelona)`

  const alertaTitulo =
    ciudadCfg?.alertaTitulo.replace('Barcelona', `${config.nombre} (Barcelona)`) ??
    `Vas a dejar una señal en ${config.nombre}: ¿con un PDF genérico?`

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.ogTitle}
        description={config.meta.description}
        servicioNombre="Contrato de arras penitenciales"
        ciudadNombre={ciudadLabel}
        precioEuros={Number(precio)}
        faqs={faqsAll}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Contrato arras Barcelona', path: '/barcelona/contrato-arras' },
          { name: config.nombre },
        )}
      />
      <Navbar />

      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src={getCiudadImage('barcelona').src}
          alt={`Contrato de arras en ${config.nombre}, Barcelona`}
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
            <Link href="/barcelona/contrato-arras" className="hover:text-white/80 transition-colors">
              Arras Barcelona
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
            <span className="text-white/50 text-xs">IVA incluido · 48h · arras penitenciales</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={solicitarHref}
              className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Pedir arras — {precio}€
            </Link>
            <a
              href="#gestor-daniel"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Hablar con Daniel
            </a>
            <a
              href="#para-vendedor"
              className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
            >
              Soy vendedor
            </a>
          </div>
        </div>
      </section>

      <GestoriaArrasTramiteOnlineSection
        ciudadNombre={ciudadLabel}
        panelAnchorId="panel-gestoria-arras"
        variant="penitenciales"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-gold-500 p-5 rounded-r-lg shadow-sm">
              <p className="text-gray-900 font-bold text-xl leading-snug">{alertaTitulo}</p>
              <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                Unas arras mal redactadas en {config.nombre} pueden costarte{' '}
                <strong>perder la señal, litigios o meses sin escritura</strong>. Redacción personalizada:{' '}
                <strong>{precio} €</strong>, entrega en <strong>48 h</strong>.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Arras penitenciales en {config.nombre}</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              {ciudadCfg?.introLargo ?? config.hero.subtitulo}
            </p>
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
              <p className="text-sm text-gold-700 font-medium uppercase tracking-wide">Arras · {config.nombre}</p>
              <h3 className="text-xl font-bold text-gray-900">Tu contrato de señal</h3>
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
                Pedir contrato — {precio} €
              </Link>
              <Link
                href="/barcelona/contrato-arras"
                className="block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Ver Barcelona completa
              </Link>
            </div>
          </div>
        </section>
      </div>

      <GestoriaArrasModulosCompletos
        variant="penitenciales"
        ciudadNombre={ciudadLabel}
        ciudadSlug="barcelona"
        solicitarHref={solicitarHref}
        panelAnchorId="panel-gestoria-arras"
        partes={{ tramiteOnline: false }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <BarcelonaArrasBarrioContenidoSeo config={config} />
        <BarcelonaArrasBarriosHub />
        <CalculadoraAhorroContrato
          mode="arras"
          ciudad={`Barcelona (${config.nombre})`}
          ciudadSlug="barcelona"
          precioContrato={Number(precio) || 145}
        />
        <section className="bg-cream-100 border border-gold-300 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Gestoría inmobiliaria en {config.nombre}</h2>
          <p className="text-gray-600 mb-4">
            LAU por barrio, revisión de arras, due diligence y venta completa — mismo gestor online.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/gestoria/barcelona" className="text-gold-700 font-semibold hover:text-gold-500">
              Hub gestoría Barcelona →
            </Link>
            <Link href={`/barcelona/contrato-alquiler/${config.slug}`} className="text-gold-700 font-semibold hover:text-gold-500">
              Contrato alquiler {config.nombre} →
            </Link>
          </div>
        </section>
      </div>

      <GestoriaLandingExtras
        servicio="arras-penitenciales"
        servicioNombre={`Contrato de arras en ${config.nombre}, Barcelona`}
        ciudad="Barcelona"
        whatsappMessage={waMessage}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
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

      <CiudadHubServiciosGrid
        ciudad="Barcelona"
        ciudadSlug="barcelona"
        subtitulo={`Otros servicios en Barcelona además de las arras en ${config.nombre}.`}
        excluirServicios={['arras-penitenciales']}
      />

      <MobileDockSpacer />
      <StickyMobileContratoCta ciudad={ciudadLabel} ciudadSlug="barcelona" servicio="arras" />
    </>
  )
}
