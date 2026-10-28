import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import GestoriaCiudadHero from '@/components/GestoriaCiudadHero'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import InmonestOficinaBarcelonaSection from '@/components/InmonestOficinaBarcelonaSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import TestimoniosSection from '@/components/TestimoniosSection'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import { VENTA_COMPLETA_PRECIO, VENTA_COMPLETA_CIUDADES_LIST } from '@/lib/venta-completa-ciudad-data'
import CompletaServiciosDetalle from '@/components/CompletaServiciosDetalle'
import GestoriaCompletaModalidadSections from '@/components/GestoriaCompletaModalidadSections'
import {
  VENTA_COMPLETA_BLOQUES_SERVICIO,
  VENTA_COMPLETA_COMPARATIVA,
  VENTA_COMPLETA_DOCUMENTOS_CHECKLIST,
} from '@/lib/venta-completa-servicio-content'
import {
  barrioCompletaTestimoniosLanding,
  getBarcelonaCompraCompletaFaq,
  getBarcelonaVentaCompletaFaq,
} from '@/lib/barcelona-completa-faq'
import type { BarcelonaCompletaBarrioConfig } from '@/lib/barcelona-completa-barrio-types'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'
import { listBarcelonaVentaCompletaBarrios } from '@/lib/barcelona-venta-completa-barrios'
import { listBarcelonaCompraCompletaBarrios } from '@/lib/barcelona-compra-completa-barrios'

export type BarcelonaCompletaModo = 'venta' | 'compra'

type Props = {
  modo: BarcelonaCompletaModo
  config: BarcelonaCompletaBarrioConfig
  /** Enlaces a otras landings del mismo modo */
  otrosBarrios: { slug: string; nombre: string; href: string }[]
}

const PRECO = getPrecioServicio('venta-completa-reserva-escritura') ?? VENTA_COMPLETA_PRECIO

const COMPRA_COMPARATIVA = [
  { aspecto: 'Revisión registral antes de arras', inmonest: 'Incluida y explicada', solo: 'Confías en el vendedor' },
  { aspecto: 'Cláusula de hipoteca', inmonest: 'Redactada a tu favor', solo: 'Copiada de internet' },
  { aspecto: 'Gestor dedicado', inmonest: 'Asignado en 24 h', solo: 'No tienes' },
  { aspecto: 'Coordinación notaría', inmonest: 'Incluida', solo: 'Improvisas el día' },
  { aspecto: 'Coste gestoría', inmonest: '687 € fijos', solo: '0 € hasta el problema' },
  { aspecto: 'Comisión agencia', inmonest: '0 % — no somos agencia', solo: '3–5 % si usas inmobiliaria' },
] as const

const ENLACES_SERVICIOS = [
  { href: '/gestoria/arras-penitenciales', label: 'Arras penitenciales', precio: '145 €' },
  { href: '/gestoria/pack-due-diligence-precompra', label: 'Due diligence pre-compra', precio: '350 €' },
  { href: '/gestoria/asesoramiento-arras-venta', label: 'Asesoramiento arras-venta', precio: '350 €' },
  { href: '/gestoria/barcelona', label: 'Gestoría Barcelona (hub)', precio: '—' },
] as const

export default function BarcelonaCompletaBarrioLanding({ modo, config, otrosBarrios }: Props) {
  const isVenta = modo === 'venta'
  const servicioSlug = isVenta ? 'venta-completa-reserva-escritura' : 'compra-completa-reserva-escritura'
  const servicioNombre = isVenta ? 'Venta completa hasta escritura' : 'Compra completa hasta escritura'
  const basePath = isVenta ? '/barcelona/venta-completa' : '/barcelona/compra-completa'
  const pagePath = `${basePath}/${config.slug}`
  const solicitarHref = `/gestoria/solicitar/${servicioSlug}`
  const faqItems = isVenta
    ? getBarcelonaVentaCompletaFaq(config.nombre, config.faqs)
    : getBarcelonaCompraCompletaFaq(config.nombre, config.faqs)
  const testimoniosLanding = barrioCompletaTestimoniosLanding(modo, config.slug)
  const hubBarcelonaPath = `/gestoria/${servicioSlug}/barcelona`
  const allBarrios = isVenta ? listBarcelonaVentaCompletaBarrios() : listBarcelonaCompraCompletaBarrios()
  const comparativa = isVenta ? VENTA_COMPLETA_COMPARATIVA : COMPRA_COMPARATIVA

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={config.meta.title}
        description={config.meta.description}
        servicioNombre={servicioNombre}
        ciudadNombre={`${config.nombre}, Barcelona`}
        precioEuros={PRECO}
        faqs={faqItems}
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
          { label: isVenta ? 'Venta completa' : 'Compra completa', href: hubBarcelonaPath },
          { label: config.nombre },
        ]}
        badge={`${servicioNombre} · ${config.distrito} · ${PRECO} € IVA incl.`}
        title={config.hero.h1}
        lead={config.hero.lead}
        precio={PRECO}
        imageSrc={config.heroImage}
        imageAlt={`${servicioNombre} en ${config.nombre}, Barcelona`}
        solicitarHref={solicitarHref}
        solicitarLabel={`Contratar online — ${PRECO}€`}
        footnote={`Gestor asignado · Panel de cliente · Trámite 100 % online o despacho Les Corts (Mejía Lequerica 44)`}
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
          <p className="mt-8 text-sm text-gray-600 leading-relaxed">
            {isVenta
              ? `Vender en ${config.nombre} entre particulares no implica renunciar a asesoramiento profesional. Inmonest no capta compradores: cuando ya tienes uno, un gestor inmobiliario real redacta contratos, verifica documentación catalana y te acompaña hasta notaría por una tarifa plana, sin comisión sobre el precio del piso.`
              : `Comprar en ${config.nombre} a un particular exige la misma rigurosidad que con agencia, pero sin pagar comisión de intermediación. Revisamos registros, comunidad y arras antes de que entregues una señal que luego no puedas recuperar.`}
          </p>
        </div>
      </section>

      <GestoriaCompletaModalidadSections
        modo={isVenta ? 'venta' : 'compra'}
        lugarNombre={`${config.nombre}, Barcelona`}
        solicitarHref={solicitarHref}
      />

      <CompletaServiciosDetalle
        modo={isVenta ? 'venta' : 'compra'}
        lugarNombre={`${config.nombre}, Barcelona`}
        solicitarHref={solicitarHref}
        headingOverride={
          isVenta
            ? `Cómo funciona la venta completa en ${config.nombre} — 5 pasos con gestor`
            : `Cómo funciona la compra completa en ${config.nombre} — 5 pasos con gestor`
        }
        modalidadOverlay={`${allBarrios.length} barrios · panel online · Les Corts presencial`}
      />

      <div id="panel-gestoria-demo" className="scroll-mt-24">
        <AgenciaGestoriaPanelDemo
          audience="particular"
          particularRole={isVenta ? 'vendedor' : 'comprador'}
          ciudadNombre={config.nombre}
        />
      </div>

      {isVenta ? (
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
              Qué hace tu gestor en la venta — al detalle
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Todo lo incluido en los {PRECO} € desde la primera llamada hasta el día que firmas en notaría en{' '}
              {config.nombre}.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {VENTA_COMPLETA_BLOQUES_SERVICIO.map((bloque) => (
                <div key={bloque.numero} className="bg-slate-50 rounded-xl p-6 shadow-sm border-t-4 border-gold-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gold-500/20 text-gold-700 w-10 h-10 rounded-full flex items-center justify-center font-black">
                      {bloque.numero}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg">{bloque.titulo}</h3>
                  </div>
                  <ul className="space-y-2">
                    {bloque.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <GestoriaCheckIcon className="mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-14 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            {isVenta ? 'Documentación que preparamos para notaría' : 'Documentación que revisamos antes de escritura'}
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu gestor indica cómo conseguir cada certificado en Barcelona y verifica que esté correcto antes de fijar
            fecha en notaría.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {VENTA_COMPLETA_DOCUMENTOS_CHECKLIST.map((doc) => (
              <div key={doc} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                <span className="text-gold-500 font-bold shrink-0">✓</span>
                <span className="text-sm text-gray-800">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {isVenta ? 'Vender con Inmonest vs. por tu cuenta' : 'Comprar con Inmonest vs. confiar solo en el vendedor'}
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-semibold">Aspecto</th>
                  <th className="p-4 text-center font-semibold text-gold-700">Con Inmonest</th>
                  <th className="p-4 text-center font-semibold text-gray-500">{isVenta ? 'Por tu cuenta' : 'Sin gestor'}</th>
                </tr>
              </thead>
              <tbody>
                {comparativa.map((row, i) => (
                  <tr key={row.aspecto} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-medium text-gray-900">{row.aspecto}</td>
                    <td className="p-4 text-center text-green-700 font-semibold">{row.inmonest}</td>
                    <td className="p-4 text-center text-gray-600">{row.solo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <TestimoniosSection
        landing={testimoniosLanding}
        ciudad="Barcelona"
        layout="carousel"
        className="bg-cream-50 border-t border-gold-200/40"
      />

      <InmonestOficinaBarcelonaSection
        backHref={hubBarcelonaPath}
        backLabel={isVenta ? '← Venta completa Barcelona (hub)' : '← Compra completa Barcelona (hub)'}
      />

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
            {isVenta ? 'Venta' : 'Compra'} completa en Barcelona — todos los barrios
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
            {allBarrios.length} landings con contexto de mercado por zona. Mismo pack {PRECO} € · gestor asignado · sin
            comisión sobre el inmueble.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {allBarrios.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`${basePath}/${b.slug}`}
                  className={`block rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                    b.slug === config.slug
                      ? 'bg-gold-500 text-gray-900 border-gold-500'
                      : 'bg-slate-50 text-gray-800 border-gray-200 hover:border-gold-400'
                  }`}
                >
                  {b.nombre}
                  <span className="block text-[10px] font-normal text-gray-500 mt-0.5">{b.distrito}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <Link href={hubBarcelonaPath} className="text-gold-700 font-semibold hover:underline">
              Hub {isVenta ? 'venta' : 'compra'} completa Barcelona →
            </Link>
            <Link href={`/gestoria/${servicioSlug}`} className="text-gold-700 font-semibold hover:underline">
              Servicio en toda España →
            </Link>
            {isVenta ? (
              <Link href="/barcelona/compra-completa/eixample" className="text-gray-600 hover:underline">
                ¿Comprador? Compra completa Barcelona →
              </Link>
            ) : (
              <Link href="/barcelona/venta-completa/eixample" className="text-gray-600 hover:underline">
                ¿Vendedor? Venta completa Barcelona →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Otros servicios relacionados</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {ENLACES_SERVICIOS.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gold-400"
              >
                {e.label} {e.precio !== '—' ? `· ${e.precio}` : ''}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            {isVenta ? 'Venta' : 'Compra'} completa también en otras ciudades:{' '}
            {VENTA_COMPLETA_CIUDADES_LIST.filter((c) => c.slug !== 'barcelona')
              .slice(0, 6)
              .map((c, i, arr) => (
                <span key={c.slug}>
                  <Link
                    href={`/gestoria/${servicioSlug}/${c.slug}`}
                    className="text-gold-600 hover:underline"
                  >
                    {c.nombre}
                  </Link>
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Explora otros barrios ({otrosBarrios.length})</h2>
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

      <CiudadHubFaq
        ciudad={config.nombre}
        items={faqItems}
        titulo={`Preguntas frecuentes — ${isVenta ? 'Vender' : 'Comprar'} en ${config.nombre}`}
        subtitulo={`${faqItems.length} respuestas sobre el pack ${PRECO} €, documentación catalana, hipoteca y despacho Les Corts.`}
      />

      <GestoriaLandingExtras
        servicio={servicioSlug}
        servicioNombre={`${servicioNombre} · ${config.nombre}`}
        ciudad="Barcelona"
        whatsappMessage={`Hola Daniel, quiero ${isVenta ? 'vender' : 'comprar'} en ${config.nombre} (Barcelona)`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

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
