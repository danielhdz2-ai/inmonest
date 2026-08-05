import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import JsonLd from '@/components/JsonLd'
import GestoriaPanelShowcase from '@/components/GestoriaPanelShowcase'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaCiudadHero from '@/components/GestoriaCiudadHero'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'
import { RELACIONADOS_VENTA } from '@/lib/gestoria-relacionados'
import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_CTA_BANNERS } from '@/lib/gestoria-images'
import LocalRegulationsBlock from '@/components/LocalRegulationsBlock'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { VentaCompletaCiudadConfig } from '@/lib/venta-completa-ciudad-data'
import {
  VENTA_COMPLETA_CIUDADES_LIST,
  VENTA_COMPLETA_PRECIO,
  comisionAgenciaMax,
  comisionAgenciaMin,
} from '@/lib/venta-completa-ciudad-data'
import { getVentaCompletaFaq } from '@/lib/venta-completa-ciudad-faq'
import {
  VENTA_COMPLETA_BLOQUES_SERVICIO,
  VENTA_COMPLETA_COMPARATIVA,
  VENTA_COMPLETA_DOCUMENTOS_CHECKLIST,
  VENTA_COMPLETA_PASOS_PROCESO,
} from '@/lib/venta-completa-servicio-content'
import { buildFaqSchema, buildServiceOfferSchema } from '@/lib/gestoria-ciudad-schema'
import {
  buildVentaCompletaBreadcrumbSchema,
  buildVentaCompletaServiceSchema,
} from '@/lib/venta-completa-ciudad-schema'

const SOLICITAR_URL = '/gestoria/solicitar/venta-completa-reserva-escritura'
const SERVICIO_SLUG = 'venta-completa-reserva-escritura'

type VentaCompletaCiudadLandingProps = {
  config: VentaCompletaCiudadConfig
}

export default function VentaCompletaCiudadLanding({ config }: VentaCompletaCiudadLandingProps) {
  const { nombre, slug, region, precioEjemploPiso, ventasAcompanadas } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const ahorroMin = agenciaMin - VENTA_COMPLETA_PRECIO
  const faq = getVentaCompletaFaq(nombre, region, precioEjemploPiso, config.faqPrioritarias)

  return (
    <>
      <JsonLd
        schema={[
          buildVentaCompletaServiceSchema(nombre, slug),
          buildVentaCompletaBreadcrumbSchema(nombre, slug),
          buildServiceOfferSchema('Venta Completa hasta Escritura', nombre, VENTA_COMPLETA_PRECIO),
          buildFaqSchema(faq),
        ]}
      />
      <Navbar />
      <WhatsAppButton />

      <GestoriaCiudadHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Gestoría', href: '/gestoria' },
          { label: 'Venta completa', href: '/gestoria/venta-completa-reserva-escritura' },
          { label: nombre },
        ]}
        badge={`Vendedor particular · ${region}`}
        title={config.hero.h1}
        lead={config.hero.lead}
        precio={VENTA_COMPLETA_PRECIO}
        imageSrc={config.heroImage}
        imageAlt={`Venta piso particular ${nombre}`}
        solicitarHref={SOLICITAR_URL}
        footnote={`${ventasAcompanadas} ventas acompañadas en ${nombre} · Gestor en 24h · Sin comisión sobre el precio`}
      />

      <GestoriaPanelShowcase servicioLabel={`venta completa en ${nombre}`} />

      {/* Para quién es */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            Este servicio es para ti si…
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', titulo: 'Ya tienes comprador', desc: 'Has llegado a un acuerdo de precio con un particular, sin agencia.' },
              { num: '02', titulo: 'Necesitas contratos', desc: 'Quieres reserva y arras redactados por profesionales, no plantillas de internet.' },
              { num: '03', titulo: 'Te falta documentación', desc: 'No sabes qué papeles necesita la notaría ni cómo conseguirlos.' },
              { num: '04', titulo: 'Quieres cerrar sin sustos', desc: 'Buscas coordinación con notaría y alguien que responda el teléfono.' },
            ].map((item) => (
              <div key={item.titulo} className="bg-cream-50 border border-gold-300/40 rounded-xl p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold text-sm mb-3">
                  {item.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicio detallado — 6 bloques */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Qué hace tu gestor — al detalle
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Todo lo incluido en los {VENTA_COMPLETA_PRECIO}€: desde la primera llamada hasta el día que firmas en notaría.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {VENTA_COMPLETA_BLOQUES_SERVICIO.map((bloque) => (
              <div key={bloque.numero} className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-gold-500">
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

      {/* Checklist documentos */}
      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Documentación que preparamos para notaría
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Tu gestor te indica cómo conseguir cada documento y verifica que esté correcto antes de enviarlo.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {VENTA_COMPLETA_DOCUMENTOS_CHECKLIST.map((doc) => (
              <div key={doc} className="flex items-start gap-3 bg-slate-50 border border-gray-200 rounded-lg p-4">
                <span className="text-gold-500 font-bold shrink-0">✓</span>
                <span className="text-sm text-gray-800">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso 6 pasos */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Proceso completo de venta en {nombre}
          </h2>
          <div className="space-y-6">
            {VENTA_COMPLETA_PASOS_PROCESO.map((item) => (
              <div key={item.paso} className="flex gap-4 items-start">
                <div className="bg-gold-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0">
                  {item.paso}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.titulo}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalRegulationsBlock ciudad={nombre} region={region} servicio="venta" />

      {/* Tabla precios */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Cuánto ahorras en {nombre}</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-semibold">Opción</th>
                  <th className="p-4 text-center font-semibold text-gold-700">Inmonest</th>
                  <th className="p-4 text-center font-semibold text-gray-500">Agencia tradicional</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Venta completa ({nombre})</td>
                  <td className="p-4 text-center font-bold text-green-700">{VENTA_COMPLETA_PRECIO}€</td>
                  <td className="p-4 text-center text-red-600">
                    {agenciaMin.toLocaleString('es-ES')}–{agenciaMax.toLocaleString('es-ES')}€ (3-5%)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Tu ahorro estimado</td>
                  <td className="p-4 text-center font-bold text-gold-700" colSpan={2}>
                    Hasta {ahorroMin.toLocaleString('es-ES')}€ en un piso de {precioEjemploPiso.toLocaleString('es-ES')}€
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Vender con Inmonest vs. por tu cuenta</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left">Aspecto</th>
                  <th className="p-4 text-center text-gold-700">Con Inmonest</th>
                  <th className="p-4 text-center text-gray-500">Por tu cuenta</th>
                </tr>
              </thead>
              <tbody>
                {VENTA_COMPLETA_COMPARATIVA.map((row, i) => (
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

      <section className="py-10 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Zonas con cobertura en {nombre}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Otros servicios de gestoría en ${nombre} para propietarios.`}
        excluirServicios={['venta-completa-reserva-escritura']}
      />

      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-3">Venta completa también en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {VENTA_COMPLETA_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/venta-completa-reserva-escritura/${c.slug}`}
                className="text-sm font-semibold text-gold-500 hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="venta-completa-reserva-escritura"
        servicioNombre={`Venta completa en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, quiero vender mi piso en ${nombre} a particular`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes — Vender piso en ${nombre}`}
        subtitulo="Resolvemos las dudas más habituales de vendedores particulares."
      />

      <GestoriaLandingExtras
        servicio="venta-completa-reserva-escritura"
        servicioNombre={`Venta completa en ${nombre}`}
        ciudad={nombre}
        testimonioLanding={config.testimoniosLanding}
        relacionados={RELACIONADOS_VENTA}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Venta completa · ${nombre}`}
            title={`Vende en ${nombre} con total seguridad`}
            description={`${VENTA_COMPLETA_PRECIO}€ fijos · Gestor asignado · Sin comisión de agencia · Respuesta en 24h`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar online — ${VENTA_COMPLETA_PRECIO}€`}
            imageSrc={GESTORIA_CTA_BANNERS.ventaCompleta.src}
            imageAlt={GESTORIA_CTA_BANNERS.ventaCompleta.alt}
            imagePosition="right"
          />
        </div>
      </section>
    </>
  )
}
