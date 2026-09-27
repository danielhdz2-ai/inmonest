import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { RELACIONADOS_DUE_DILIGENCE } from '@/lib/gestoria-relacionados'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import type { DueDiligenceCiudadConfig } from '@/lib/due-diligence-ciudad-data'
import {
  DUE_DILIGENCE_CIUDADES_LIST,
  DUE_DILIGENCE_PRECIO,
  comisionAgenciaMin,
  comisionAgenciaMax,
} from '@/lib/due-diligence-ciudad-data'
import { getDueDiligenceFaq } from '@/lib/due-diligence-ciudad-faq'
import { GestoriaImageBanner, GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { DUE_DILIGENCE_LANDING, getCiudadCtaImage } from '@/lib/gestoria-images'
import { GESTORIA_TRAMITE_ONLINE_SHORT } from '@/lib/gestoria-tramite-online'
import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import GestoriaDueDiligenceModulosCompletos, {
  GestoriaDueDiligenceTramiteOnlineSection,
} from '@/components/GestoriaDueDiligenceModulosCompletos'

const SOLICITAR_URL = '/gestoria/solicitar/pack-due-diligence-precompra'
const PANEL_DUE_DILIGENCE_ID = 'panel-gestoria-due-diligence'

const DUE_DILIGENCE_INCLUDES = [
  'Adaptado a la normativa vigente y a la compraventa en tu comunidad autónoma.',
  'Revisión de título, cargas, hipotecas y situación registral.',
  'Actas de comunidad, derramas, ITE y documentación urbanística.',
  'Informe PDF con riesgos y recomendaciones (entrega en 3–5 días laborables).',
  'Gestor asignado hasta el día de la escritura en notaría.',
  'Trámite 100 % online: panel, videollamada y WhatsApp con tu gestor.',
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

type DueDiligenceCiudadLandingProps = {
  config: DueDiligenceCiudadConfig
}

export default function DueDiligenceCiudadLanding({ config }: DueDiligenceCiudadLandingProps) {
  const { nombre, slug, region, precioEjemploPiso } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const ahorroMin = agenciaMin - DUE_DILIGENCE_PRECIO
  const waText = encodeURIComponent(`Hola, necesito Due Diligence pre-compra en ${nombre}`)
  const faq = getDueDiligenceFaq(nombre, region, config.faqPrioritarias)

  const revisionBlocks = [
    {
      titulo: 'Nota simple registral',
      items: ['Verificación de titularidad', 'Cargas y gravámenes', 'Hipotecas y embargos', 'Anotaciones preventivas', 'Concordancia con catastro'],
    },
    {
      titulo: 'Comunidad de propietarios',
      items: ['Deudas pendientes', 'Derramas extraordinarias', 'Estatutos y normas', 'Actas de juntas recientes'],
    },
    {
      titulo: 'Impuestos y suministros',
      items: ['IBI al día', 'Suministros sin deudas', 'Plusvalía municipal si aplica', 'Tasa de basuras'],
    },
    {
      titulo: config.docTecnicaTitulo,
      items: config.docTecnicaItems,
    },
  ]

  const paraQuien = [
    'Compras de particular a particular sin agencia ni inmobiliaria',
    'Ya has firmado contrato de arras y quieres verificar antes de escriturar',
    'Quieres evitar sorpresas el día de la firma: deudas ocultas, cargas o documentación incompleta',
    'Es tu primera compra y no sabes qué documentación exigir al vendedor',
    'La vivienda tiene antigüedad y necesitas confirmar ITE, reformas y licencias',
  ]

  return (
    <>
      <GestoriaLandingSeo
        pagePath={`/gestoria/due-diligence-precompra/${slug}`}
        pageTitle={`Due diligence pre-compra en ${nombre}`}
        description={`Revisión exhaustiva de documentación para compradores entre particulares en ${nombre}. Gestor asignado hasta escritura.`}
        servicioNombre="Due diligence pre-compra"
        ciudadNombre={nombre}
        precioEuros={DUE_DILIGENCE_PRECIO}
        faqs={faq}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Due diligence', path: '/gestoria/pack-due-diligence-precompra' },
          { name: nombre },
        )}
      />
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <GestoriaImageBanner
          imageSrc={config.heroImage}
          imageAlt={`Due Diligence compra vivienda ${nombre}`}
          imagePosition="right"
          size="lg"
        >
          <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-gold-500/30 uppercase tracking-widest">
            {config.hero?.badge ?? `Compra entre particulares · ${region}`}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-snug max-w-2xl">
            {config.hero?.h1 ?? (
              <>¿Compras piso de particular en {nombre}?</>
            )}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">
            {config.hero?.lead ?? (
              <>
                Un gestor inmobiliario asignado revisa toda la documentación antes de la escritura:
                cargas registrales, deudas de comunidad, hipotecas e informes técnicos.
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="text-3xl font-bold text-gold-400">{DUE_DILIGENCE_PRECIO}€</span>
            <span className="text-white/50 text-xs">IVA incluido</span>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5">
            <Link
              href={SOLICITAR_URL}
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              Contratar servicio — {DUE_DILIGENCE_PRECIO}€
            </Link>
            <a
              href="#gestor-daniel"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Hablar con Daniel
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><CheckIcon /> Gestor asignado</li>
            <li className="flex items-center gap-2"><CheckIcon /> Hasta escritura</li>
            <li className="flex items-center gap-2"><CheckIcon /> Informe completo</li>
            <li className="flex items-center gap-2"><CheckIcon /> {GESTORIA_TRAMITE_ONLINE_SHORT}</li>
          </ul>
          <GestoriaTramiteOnlineNote variant="hero-dark" className="mt-4 max-w-xl" />
        </GestoriaImageBanner>
      </div>

      <GestoriaDueDiligenceTramiteOnlineSection
        ciudadNombre={nombre}
        panelAnchorId={PANEL_DUE_DILIGENCE_ID}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-gold-500/30 bg-amber-50/80 p-6 border-l-4 border-l-gold-500">
              <p className="font-semibold text-gray-900 mb-2">
                Vas a comprar en {nombre}: ¿firmas arras o escritura sin revisar la documentación?
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Cargas ocultas, deudas de comunidad o problemas urbanísticos pueden costarte miles de euros. Por{' '}
                <strong>{DUE_DILIGENCE_PRECIO} €</strong> (IVA incluido) un gestor inmobiliario revisa el expediente
                completo y te entrega informe en <strong>3–5 días laborables</strong>, sin comisión sobre el precio del
                piso.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Qué es el due diligence pre-compra en {nombre}?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {config.hero?.lead ?? config.gestor.bio}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Inmonest es una <strong className="text-gray-900">gestoría inmobiliaria digital</strong>: no somos
                agencia y no cobramos comisión sobre el precio. Revisamos documentación, detectamos riesgos y te
                acompañamos hasta notaría en {region}.
              </p>
              {config.zonasIntro ? (
                <p className="text-gray-600 leading-relaxed text-sm">{config.zonasIntro}</p>
              ) : null}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Para quién es este servicio en {nombre}?
              </h2>
              <ul className="space-y-2">
                {paraQuien.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border-2 border-gold-500/40 bg-white p-6 shadow-lg">
              <p className="text-xs font-semibold tracking-widest text-gold-600 uppercase mb-2">
                Compra · {nombre}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Due diligence, sin vueltas</h3>
              <p className="text-3xl font-bold text-gold-600 mb-1">
                {DUE_DILIGENCE_PRECIO} €
                <span className="text-sm font-normal text-gray-500 ml-1">IVA incluido</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {DUE_DILIGENCE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={SOLICITAR_URL}
                className="mt-6 block w-full text-center px-4 py-3 rounded-lg bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors"
              >
                Pedir revisión — {DUE_DILIGENCE_PRECIO} €
              </Link>
              <a
                href="#gestor-daniel"
                className="mt-3 block w-full text-center px-4 py-3 rounded-lg border border-gold-500 text-gold-700 font-semibold hover:bg-cream-50 transition-colors text-sm"
              >
                Hablar con Daniel
              </a>
              <Link
                href="/gestoria/pack-due-diligence-precompra"
                className="mt-3 block text-center text-sm font-semibold text-gold-600 hover:underline"
              >
                Ver pack nacional
              </Link>
            </div>
          </aside>
        </section>
      </div>

      <GestoriaDueDiligenceModulosCompletos
        ciudadNombre={nombre}
        ciudadSlug={slug}
        solicitarHref={SOLICITAR_URL}
        panelAnchorId={PANEL_DUE_DILIGENCE_ID}
        partes={{ tramiteOnline: false }}
      />

      {/* Qué revisamos */}
      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Qué revisamos en el Due Diligence</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Análisis documental completo antes de escriturar. Tu gestor verifica cada punto crítico de la operación.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {revisionBlocks.map((block) => (
              <div key={block.titulo} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{block.titulo}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Inmonest frente a agencia inmobiliaria
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            En una compra de {precioEjemploPiso.toLocaleString('es-ES')}€ en {nombre}, una agencia cobraría entre{' '}
            {agenciaMin.toLocaleString('es-ES')}€ y {agenciaMax.toLocaleString('es-ES')}€ de comisión.
            Con Inmonest pagas {DUE_DILIGENCE_PRECIO}€ por revisión documental completa.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900 w-1/3" />
                  <th className="p-4 text-center font-bold text-gold-700 bg-cream-100 border-b-2 border-gold-500">
                    Inmonest Gestoría
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-600 border-b-2 border-gray-300">
                    Agencia inmobiliaria
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste del servicio', `${DUE_DILIGENCE_PRECIO}€ tarifa plana`, `${agenciaMin.toLocaleString('es-ES')}€ – ${agenciaMax.toLocaleString('es-ES')}€ (3–5%)`],
                  ['Revisión documental exhaustiva', 'Sí, con informe', 'Parcial o inexistente'],
                  ['Gestor asignado hasta escritura', 'Sí', 'Agente comercial'],
                  ['Sin comisión sobre el precio', 'Sí', 'No'],
                  ['Conflicto de intereses', 'Solo trabajamos para ti', 'Cobran del vendedor'],
                  ['Conocimiento normativa local', `Sí, ${region}`, 'Variable'],
                ].map(([label, inmo, agencia]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{label}</td>
                    <td className="p-4 text-center bg-green-50/50 font-medium text-gray-800">{inmo}</td>
                    <td className="p-4 text-center text-gray-600">{agencia}</td>
                  </tr>
                ))}
                <tr className="bg-cream-100">
                  <td className="p-4 font-bold text-gray-900">Ahorro estimado</td>
                  <td colSpan={2} className="p-4 text-center font-bold text-gold-700 text-lg">
                    Hasta {ahorroMin.toLocaleString('es-ES')}€ menos que una agencia en esta operación
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section className="py-16 px-4 bg-slate-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cobertura en {nombre}</h2>
          <p className="text-gray-600 mb-8">{config.zonasIntro}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Otros contratos y servicios de gestoría disponibles en ${nombre}. Precios iguales que en nuestra gestoría online.`}
        excluirServicios={['pack-due-diligence-precompra', 'due-diligence-precompra']}
      />

      {/* Otras ciudades */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Due Diligence Pre-Compra también disponible en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {DUE_DILIGENCE_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/due-diligence-precompra/${c.slug}`}
                className="text-sm font-semibold text-gold-500 hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="pack-due-diligence-precompra"
        servicioNombre={`Due diligence pre-compra en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, firmé arras y necesito due diligence pre-compra en ${nombre}`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />


      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes sobre Due Diligence Pre-Compra en ${nombre}`}
        subtitulo="Resolvemos las dudas más habituales antes de contratar la revisión documental de tu compra."
      />

      <GestoriaLandingExtras
        servicio="pack-due-diligence-precompra"
        servicioNombre={`Due diligence pre-compra en ${nombre}`}
        ciudad={nombre}
        testimonioLanding={config.testimoniosLanding}
        relacionados={RELACIONADOS_DUE_DILIGENCE}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Due diligence · ${nombre}`}
            title={`Compra en ${nombre} con total seguridad jurídica`}
            description={`Revisión documental completa por ${DUE_DILIGENCE_PRECIO}€. Gestor asignado hasta el día de la escritura.`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar ahora — ${DUE_DILIGENCE_PRECIO}€`}
            imageSrc={getCiudadCtaImage(slug).src}
            imageAlt={`Due diligence pre-compra en ${nombre}`}
            imagePosition="right"
          />
        </div>
      </section>

      <MobileDockSpacer />
      <StickyMobileContratoCta ciudad={nombre} ciudadSlug={slug} servicio="due-diligence" />
    </>
  )
}
