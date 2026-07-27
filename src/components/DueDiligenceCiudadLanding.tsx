import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import JsonLd from '@/components/JsonLd'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import LlamaGestorBanner from '@/components/LlamaGestorBanner'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import TrackedContactLink from '@/components/TrackedContactLink'
import type { DueDiligenceCiudadConfig } from '@/lib/due-diligence-ciudad-data'
import {
  DUE_DILIGENCE_CIUDADES_LIST,
  DUE_DILIGENCE_PRECIO,
  comisionAgenciaMin,
  comisionAgenciaMax,
} from '@/lib/due-diligence-ciudad-data'
import { getDueDiligenceFaq } from '@/lib/due-diligence-ciudad-faq'
import { buildFaqSchema } from '@/lib/gestoria-ciudad-schema'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

const BASE_URL = 'https://inmonest.com'
const SOLICITAR_URL = '/gestoria/solicitar/pack-due-diligence-precompra'
const PHONE = '+34745022862'
const WA = '34745022862'

const PASOS = [
  {
    titulo: 'Primera llamada con tu gestor asignado',
    desc: 'En menos de 24 horas un gestor inmobiliario experto te contacta. Analizamos juntos la operación: precio, plazos, estado de las arras y documentación disponible.',
  },
  {
    titulo: 'Contratas el servicio',
    desc: 'Pago único de 350€ IVA incluido. Sin costes ocultos. Comenzamos de inmediato la revisión documental de la vivienda.',
  },
  {
    titulo: 'Recopilación de documentación',
    desc: 'Tu gestor solicita nota simple, certificados, actas de comunidad y toda la documentación oficial. Te guía si el vendedor no la tiene completa.',
  },
  {
    titulo: 'Análisis exhaustivo',
    desc: 'Revisión de cargas, hipotecas, deudas de comunidad, IBI, suministros, cédula de habitabilidad, certificado energético e informes técnicos obligatorios.',
  },
  {
    titulo: 'Informe y acompañamiento hasta escritura',
    desc: 'Recibes un informe con hallazgos y recomendaciones. Tu gestor resuelve dudas y verifica que todo esté en regla antes de firmar en notaría.',
  },
] as const

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#c9962a] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
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
  const { nombre, slug, region, gestor, precioEjemploPiso } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const ahorroMin = agenciaMin - DUE_DILIGENCE_PRECIO
  const waText = encodeURIComponent(`Hola, necesito Due Diligence pre-compra en ${nombre}`)
  const faq = getDueDiligenceFaq(nombre, region, config.faqPrioritarias)

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Pack Due Diligence Pre-Compra en ${nombre}`,
    description: `Revisión exhaustiva de documentación de vivienda para compradores de particular a particular en ${nombre}. Gestor asignado hasta escritura.`,
    areaServed: {
      '@type': 'City',
      name: nombre,
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: { '@id': ORGANIZATION_SCHEMA_ID },
    offers: {
      '@type': 'Offer',
      price: String(DUE_DILIGENCE_PRECIO),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: 'Due Diligence Pre-Compra', item: `${BASE_URL}/gestoria/due-diligence-precompra` },
      { '@type': 'ListItem', position: 4, name: nombre, item: `${BASE_URL}/gestoria/due-diligence-precompra/${slug}` },
    ],
  }

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
      <JsonLd schema={[schemaJson, breadcrumbSchema, buildFaqSchema(faq)]} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/due-diligence-precompra" className="hover:text-[#c9962a]">Due Diligence</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{nombre}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#a87a20] bg-[#fdf8ee] border border-[#e8d48a] px-3 py-1 rounded-full mb-4">
                {config.hero?.badge ?? `Compra entre particulares · ${region}`}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {config.hero?.h1 ?? (
                  <>
                    ¿Compras piso de particular en <span className="text-[#c9962a]">{nombre}</span>?
                  </>
                )}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {config.hero?.lead ?? (
                  <>
                    Un <strong>gestor inmobiliario asignado</strong> revisa toda la documentación de la vivienda
                    antes de la escritura: cargas registrales, deudas de comunidad, hipotecas, cédula de habitabilidad
                    e informes técnicos. <strong className="text-gray-900">Evita riesgos que pueden costarte miles de euros.</strong>
                  </>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={SOLICITAR_URL}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Contratar servicio — {DUE_DILIGENCE_PRECIO}€
                </Link>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-[#c9962a] hover:text-[#a87a20] transition-colors"
                >
                  745 022 862
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckIcon /> Gestor asignado</li>
                <li className="flex items-center gap-2"><CheckIcon /> Hasta escritura</li>
                <li className="flex items-center gap-2"><CheckIcon /> Informe completo</li>
              </ul>
            </div>
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image src={config.heroImage} alt={`Due Diligence compra vivienda ${nombre}`} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Qué es Inmonest + Gestor */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Qué es Inmonest</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Inmonest es una <strong className="text-gray-900">gestoría inmobiliaria digital</strong> especializada
              en ayudar a particulares a comprar y vender vivienda con todas las garantías jurídicas. No somos una
              agencia inmobiliaria: no cobramos comisiones sobre el precio del piso.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Nuestro equipo de gestores con experiencia en <strong className="text-gray-900">derecho inmobiliario</strong> te
              acompaña en operaciones de particular a particular: revisamos documentación, detectamos riesgos y te
              asesoramos hasta que firmas en notaría con seguridad.
            </p>
            <p className="text-gray-600 leading-relaxed">
              El Pack Due Diligence Pre-Compra está pensado para compradores que ya han encontrado piso y vendedor
              por su cuenta y necesitan un profesional que verifique que la operación es segura.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Tu gestor en {nombre}</p>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c9962a]/30">
                <Image src={gestor.foto} alt={gestor.nombre} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{gestor.nombre}</h3>
                <p className="text-sm text-[#a87a20] font-medium mb-3">{gestor.rol}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{gestor.bio}</p>
                <ul className="space-y-1">
                  {gestor.especialidades.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Cómo trabajamos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Cómo trabajamos contigo</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Proceso claro desde el primer contacto hasta la firma en notaría. Siempre con el mismo gestor asignado.
          </p>
          <div className="grid md:grid-cols-5 gap-6">
            {PASOS.map((paso, i) => (
              <div key={paso.titulo} className="text-center">
                <div className="w-12 h-12 bg-[#1a2f1c] text-[#c9a84c] rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{paso.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{paso.desc}</p>
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
                  <th className="p-4 text-center font-bold text-[#a87a20] bg-[#fdf8ee] border-b-2 border-[#c9962a]">
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
                <tr className="bg-[#fdf8ee]">
                  <td className="p-4 font-bold text-gray-900">Ahorro estimado</td>
                  <td colSpan={2} className="p-4 text-center font-bold text-[#a87a20] text-lg">
                    Hasta {ahorroMin.toLocaleString('es-ES')}€ menos que una agencia en esta operación
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">¿Para quién es este servicio?</h2>
          <ul className="space-y-4">
            {paraQuien.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-gray-100">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href={SOLICITAR_URL} className="inline-flex px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors">
              Contratar — {DUE_DILIGENCE_PRECIO}€ IVA incluido
            </Link>
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
                className="text-sm font-semibold text-[#c9962a] hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <LlamaGestorBanner
        variant="strip"
        ciudad={nombre}
        title={`¿Firmaste arras en ${nombre}? Habla con un gestor`}
        subtitle="Te explicamos la due diligence sin compromiso. Luego decides si contratas."
        whatsappMessage={`Hola, firmé arras y necesito due diligence pre-compra en ${nombre}`}
      />

      <section className="py-12 px-4 bg-[#fdf8ee] border-y border-[#e8d48a]">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#e8d48a] p-5 sm:p-6 shadow-sm">
          <GestoriaPideInfoForm
            ciudad={nombre}
            servicio="due diligence pre-compra"
            precioLabel={`${DUE_DILIGENCE_PRECIO}€`}
            serviceKey="pack-due-diligence-precompra"
          />
        </div>
      </section>

      <section className="py-14 px-4 bg-[#1a2f1c] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Habla con un gestor especializado</h2>
          <p className="text-white/80 mb-8">Primera consulta sin compromiso. Te explicamos el proceso y resolvemos tus dudas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedContactLink
              event="click_phone"
              city={slug}
              href={`tel:${PHONE}`}
              className="px-8 py-3 rounded-lg bg-white text-[#1a2f1c] font-semibold hover:bg-gray-100 transition-colors"
            >
              745 022 862
            </TrackedContactLink>
            <TrackedContactLink
              event="click_whatsapp"
              city={slug}
              href={`https://wa.me/${WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-white/40 font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </section>

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes sobre Due Diligence Pre-Compra en ${nombre}`}
        subtitulo="Resolvemos las dudas más habituales antes de contratar la revisión documental de tu compra."
      />

      <TestimoniosSection
        landing={config.testimoniosLanding}
        layout="stack"
        hideRating
        className="bg-slate-50"
      />

      {/* CTA final */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Compra en {nombre} con total seguridad jurídica</h2>
          <p className="text-lg text-white/85 mb-8">
            Revisión documental completa por {DUE_DILIGENCE_PRECIO}€. Gestor asignado hasta el día de la escritura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SOLICITAR_URL} className="px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors">
              Contratar ahora — {DUE_DILIGENCE_PRECIO}€
            </Link>
            <TrackedContactLink
              event="click_phone"
              city={slug}
              href={`tel:${PHONE}`}
              className="px-8 py-4 rounded-lg border border-white/30 font-semibold hover:bg-white/10 transition-colors"
            >
              745 022 862
            </TrackedContactLink>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileContratoCta ciudad={nombre} ciudadSlug={slug} servicio="due-diligence" />
    </>
  )
}
