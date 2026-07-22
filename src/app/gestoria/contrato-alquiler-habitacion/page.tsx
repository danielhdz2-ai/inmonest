import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import { GESTOR_CARMEN_VIDAL } from '@/lib/gestores-inmonest'
import {
  ALQUILER_HABITACION_CIUDADES_LIST,
  ALQUILER_HABITACION_PRECIO,
} from '@/lib/alquiler-habitacion-ciudad-data'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const PRECIO = ALQUILER_HABITACION_PRECIO
const SOLICITAR_URL = '/gestoria/solicitar/alquiler-habitaciones'
const PHONE = '+34745022862'
const WA = '34745022862'

export const metadata: Metadata = {
  title: `Contrato alquiler habitación desde ${PRECIO}€`,
  description:
    `¿Alquilas una habitación en tu piso? Contrato profesional redactado por gestoría inmobiliaria. Asesor experto, bases legales del Código Civil, normas de convivencia y protección ante impagos. ${PRECIO}€ IVA incluido.`,
  keywords:
    'contrato alquiler habitacion, alquilar habitacion piso compartido, contrato habitacion coliving, arrendamiento habitacion codigo civil, alquiler habitacion particular, normas convivencia alquiler habitacion, gestoria alquiler habitacion',
  alternates: {
    canonical: `${BASE_URL}/gestoria/contrato-alquiler-habitacion`,
  },
  openGraph: {
    title: `Contrato de Alquiler de Habitación — ${PRECIO}€ con asesor experto`,
    description:
      `Particulares que alquilan habitaciones en piso compartido. Contrato profesional, asesoramiento legal y entrega en 48h. ${PRECIO}€ IVA incluido.`,
    url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria6.jpg`, width: 1200, height: 630, alt: 'Contrato alquiler habitación' }],
  },
}

export const revalidate = 86400

const PASOS = [
  {
    titulo: 'Primera consulta con tu asesor',
    desc: 'En menos de 24 horas un gestor inmobiliario experto te contacta. Revisamos tu caso: número de habitaciones, convivencia, fianza, duración y situación del inmueble.',
  },
  {
    titulo: 'Contratas el servicio',
    desc: `Pago único de ${PRECIO}€ IVA incluido. Sin costes ocultos. Comenzamos la redacción personalizada del contrato de habitación.`,
  },
  {
    titulo: 'Recopilación de datos',
    desc: 'Tu asesor te guía para recopilar datos del inquilino, condiciones de la habitación, uso de zonas comunes y normas de convivencia que quieres pactar.',
  },
  {
    titulo: 'Redacción jurídica',
    desc: 'El contrato se redacta conforme al Código Civil y la práctica inmobiliaria: renta, fianza, duración, salida anticipada, impagos y resolución del contrato.',
  },
  {
    titulo: 'Entrega y asesoramiento',
    desc: 'Recibes el PDF firmable en 48h. Tu asesor resuelve dudas antes de la firma y te explica cómo actuar si surge un conflicto durante el arrendamiento.',
  },
] as const

const BASES_LEGALES = [
  {
    titulo: 'No aplica la LAU de vivienda habitual completa',
    desc: 'El alquiler de una habitación dentro de una vivienda no queda amparado por la Ley de Arrendamientos Urbanos como arrendamiento de vivienda íntegra. Se rige por el Código Civil (art. 1542 y ss.) y los pactos entre las partes.',
  },
  {
    titulo: 'Mayor libertad contractual, mayor riesgo sin contrato',
    desc: 'Sin un contrato bien redactado, cualquier disputa sobre renta, fianza, convivencia o desalojo depende de pruebas difíciles de acreditar. Un contrato profesional fija las reglas desde el primer día.',
  },
  {
    titulo: 'Normas de convivencia con validez jurídica',
    desc: 'Horarios, uso de cocina y baño, visitas, mascotas o limpieza de zonas comunes pueden pactarse si no vulneran derechos fundamentales. Tu asesor te indica qué cláusulas son válidas y cuáles serían nulas.',
  },
  {
    titulo: 'Fianza y garantías',
    desc: 'La fianza en alquiler de habitación no sigue exactamente el régimen de la LAU (un mes de renta en depósito oficial). El contrato debe regular importe, devolución y causas de retención con precisión.',
  },
] as const

const INCLUYE = [
  'Identificación de propietario, inquilino y habitación arrendada',
  'Renta mensual, forma de pago y actualización pactada',
  'Fianza, depósito y condiciones de devolución',
  'Duración, prórroga y preaviso de salida',
  'Uso de zonas comunes: cocina, baño, salón, terraza',
  'Normas de convivencia personalizadas',
  'Causas de resolución e impago de renta',
  'Procedimiento ante daños o incumplimiento',
  'PDF firmable · Entrega en 48 horas laborables',
] as const

const PARA_QUIEN = [
  'Propietarios que alquilan una o varias habitaciones en su vivienda habitual',
  'Inversores en pisos compartidos o coliving con varios inquilinos',
  'Particulares que buscan inquilino sin pasar por agencia inmobiliaria',
  'Quien ya tiene inquilino pero solo un acuerdo verbal o mensajes de WhatsApp',
  'Propietarios que quieren un contrato independiente por cada habitación',
] as const

const OTROS_SERVICIOS = [
  {
    titulo: 'Contrato de Alquiler LAU (vivienda completa)',
    desc: 'Para alquilar el piso íntegro con protección de la Ley de Arrendamientos Urbanos y Ley de Vivienda 2026.',
    href: '/gestoria/solicitar/contrato-alquiler',
    precio: precioLabel('contrato-alquiler'),
  },
  {
    titulo: 'Revisión de Contrato de Alquiler',
    desc: 'Si ya tienes un borrador o contrato del inquilino, lo revisamos antes de firmar.',
    href: '/gestoria/revision-contrato-alquiler',
    precio: precioLabel('revision-alquiler'),
  },
  {
    titulo: 'Rescisión de Alquiler',
    desc: 'Documenta la entrega de llaves y el estado del inmueble al finalizar el arrendamiento.',
    href: '/gestoria/solicitar/rescision-alquiler',
    precio: precioLabel('rescision-alquiler'),
  },
  {
    titulo: 'Liquidación de Fianza',
    desc: 'Desglose de conceptos descontados y devolución de fianza sin conflictos.',
    href: '/gestoria/solicitar/liquidacion-fianza',
    precio: precioLabel('liquidacion-fianza'),
  },
  {
    titulo: 'Contrato de Arras',
    desc: 'Si compras o vendes vivienda, arras penitenciales redactadas por gestoría.',
    href: '/gestoria/contrato-arras',
    precio: precioLabel('arras-penitenciales'),
  },
  {
    titulo: 'Due Diligence Pre-Compra',
    desc: 'Revisión documental completa antes de escriturar una compra entre particulares.',
    href: '/gestoria/due-diligence-precompra',
    precio: precioLabel('pack-due-diligence-precompra'),
  },
] as const

const FAQ = [
  {
    q: '¿Cuánto cuesta el contrato de alquiler de habitación?',
    a: `${PRECIO}€ IVA incluido. Tarifa plana por contrato personalizado, redacción jurídica y asesoramiento de un gestor inmobiliario experto. Entrega en 48 horas laborables.`,
  },
  {
    q: '¿Necesito un contrato distinto por cada habitación?',
    a: 'Sí, es lo recomendable. Si alquilas varias habitaciones a personas distintas, cada inquilino debe tener su propio contrato. Así gestionas entradas, salidas e impagos de forma independiente.',
  },
  {
    q: '¿Puedo incluir normas de convivencia en el contrato?',
    a: 'Sí. Horarios, limpieza, visitas o uso de electrodomésticos pueden pactarse siempre que no sean abusivas ni vulneren derechos fundamentales. Tu asesor te ayuda a redactarlas con validez jurídica.',
  },
  {
    q: '¿Qué pasa si el inquilino deja de pagar?',
    a: 'Un contrato profesional incluye causas de resolución por impago, preaviso y procedimiento a seguir. Sin contrato escrito, recuperar la habitación puede requerir un procedimiento judicial largo y costoso.',
  },
  {
    q: '¿El asesor me acompaña después de entregar el contrato?',
    a: 'Sí. Antes de la firma resolvemos tus dudas. Si surge una incidencia durante el arrendamiento, puedes consultarnos para saber cómo actuar conforme al contrato y la ley.',
  },
  {
    q: '¿Sirve para coliving o pisos de estudiantes?',
    a: 'Sí. Es uno de los casos más habituales. Adaptamos el contrato a convivencia compartida, estancias de varios meses y normas específicas del piso.',
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

export default function ContratoAlquilerHabitacionPage() {
  const waText = encodeURIComponent('Hola, necesito un contrato de alquiler de habitación')

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contrato de Alquiler de Habitación',
    description:
      'Redacción profesional de contratos de alquiler de habitación para particulares. Asesor experto, bases legales del Código Civil y entrega en 48h.',
    provider: { '@id': ORGANIZATION_SCHEMA_ID },
    offers: {
      '@type': 'Offer',
      price: String(PRECIO),
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
      { '@type': 'ListItem', position: 3, name: 'Contrato Alquiler Habitación', item: `${BASE_URL}/gestoria/contrato-alquiler-habitacion` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <JsonLd schema={[schemaJson, breadcrumbSchema, faqSchema]} />
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
            <span className="text-gray-900 font-medium">Contrato Alquiler Habitación</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#a87a20] bg-[#fdf8ee] border border-[#e8d48a] px-3 py-1 rounded-full mb-4">
                Particulares · Piso compartido y coliving
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Contrato de alquiler de <span className="text-[#c9962a]">habitación</span> para particulares
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ¿Alquilas una habitación en tu piso? Un <strong>asesor experto en derecho inmobiliario</strong> redacta
                tu contrato conforme al Código Civil, regula la convivencia y te protege ante impagos, conflictos
                y problemas de desalojo. <strong className="text-gray-900">{PRECIO}€ IVA incluido.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={SOLICITAR_URL}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Contratar — {PRECIO}€ IVA incluido
                </Link>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-[#c9962a] hover:text-[#a87a20] transition-colors"
                >
                  745 022 862
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckIcon /> Asesor asignado</li>
                <li className="flex items-center gap-2"><CheckIcon /> Entrega en 48h</li>
                <li className="flex items-center gap-2"><CheckIcon /> Código Civil</li>
              </ul>
            </div>
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/gestoria6.jpg"
                alt="Contrato de alquiler de habitación profesional"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Asesor */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Un asesor experto en todo el proceso</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Inmonest es una <strong className="text-gray-900">gestoría inmobiliaria digital</strong> para
              particulares. No somos una agencia: no cobramos comisiones sobre la renta ni sobre el precio del inmueble.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cuando contratas el contrato de habitación, se te asigna un <strong className="text-gray-900">gestor
              especializado en alquileres entre particulares</strong>. Te explica las bases legales, qué cláusulas
              necesitas según tu situación y cómo cubrirte ante los problemas más frecuentes: impagos, daños,
              convivencia conflictiva o salida anticipada del inquilino.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Muchos propietarios alquilan habitaciones con un mensaje de WhatsApp o una plantilla genérica de
              internet. Eso deja lagunas jurídicas que pueden costar miles de euros si el inquilino incumple.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Tu asesor asignado</p>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c9962a]/30">
                <Image src={GESTOR_CARMEN_VIDAL.foto} alt={GESTOR_CARMEN_VIDAL.nombre} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{GESTOR_CARMEN_VIDAL.nombre}</h3>
                <p className="text-sm text-[#a87a20] font-medium mb-3">Gestora inmobiliaria · Alquiler de habitaciones</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Acompaña a propietarios particulares que alquilan habitaciones en pisos compartidos. Conoce el
                  régimen del Código Civil, la redacción de normas de convivencia y la resolución de conflictos
                  habituales en coliving y alquiler entre particulares.
                </p>
                <ul className="space-y-1">
                  {['Contratos por habitación', 'Normas de convivencia válidas', 'Asesoramiento pre y post firma'].map((e) => (
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

      {/* Bases legales */}
      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Bases legales del alquiler de habitación</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Conocer el marco jurídico es el primer paso para alquilar con seguridad. Tu asesor te lo explica en lenguaje claro.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {BASES_LEGALES.map((block) => (
              <div key={block.titulo} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{block.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Qué incluye el contrato ({PRECIO}€)</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Redacción personalizada con tus datos reales. No es una plantilla genérica descargada de internet.
          </p>
          <ul className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {INCLUYE.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-gray-100 text-sm text-gray-700">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Cómo trabajamos contigo</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Proceso claro desde el primer contacto hasta la entrega del contrato firmable.
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
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Contrato profesional frente a no contratar o usar plantilla
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            El ahorro de no pagar un contrato profesional suele convertirse en gastos mucho mayores cuando surge un conflicto.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900 w-1/4">Aspecto</th>
                  <th className="p-4 text-center font-bold text-[#a87a20] bg-[#fdf8ee] border-b-2 border-[#c9962a]">
                    Inmonest — {PRECIO}€
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-600 border-b-2 border-gray-300">
                    Sin contrato / plantilla genérica
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste inicial', `${PRECIO}€ tarifa plana IVA incluido`, '0€ — riesgo elevado'],
                  ['Asesor experto asignado', 'Sí, durante todo el proceso', 'No'],
                  ['Normas de convivencia válidas', 'Redactadas y revisadas jurídicamente', 'Verbales o inexistentes'],
                  ['Resolución por impago', 'Cláusulas y procedimiento definidos', 'Procedimiento judicial largo'],
                  ['Recuperación de la habitación', 'Base contractual clara', '3-12 meses y costes legales'],
                  ['Disputa sobre fianza', 'Condiciones pactadas por escrito', '1.500€ - 4.000€ en abogado y tiempo'],
                  ['Coste estimado si hay conflicto grave', `Inversión preventiva de ${PRECIO}€`, '2.000€ - 8.000€ en abogado, procurador y meses sin cobrar renta'],
                ].map(([label, inmo, mal]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{label}</td>
                    <td className="p-4 text-center bg-green-50/50 font-medium text-gray-800">{inmo}</td>
                    <td className="p-4 text-center text-gray-600">{mal}</td>
                  </tr>
                ))}
                <tr className="bg-[#fdf8ee]">
                  <td className="p-4 font-bold text-gray-900">Conclusión</td>
                  <td colSpan={2} className="p-4 text-center font-bold text-[#a87a20]">
                    Un contrato profesional de {PRECIO}€ puede evitar gastos de miles de euros en impagos, desalojos y disputas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">¿Para quién es este servicio?</h2>
          <ul className="space-y-4">
            {PARA_QUIEN.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href={SOLICITAR_URL}
              className="inline-flex px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
            >
              Solicitar contrato — {PRECIO}€ IVA incluido
            </Link>
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Otros servicios de gestoría Inmonest</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Además del contrato de habitación, ofrecemos asesoramiento legal inmobiliario para comprar, vender y alquilar entre particulares.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTROS_SERVICIOS.map((s) => (
              <Link
                key={s.titulo}
                href={s.href}
                className="block p-6 bg-slate-50 border border-gray-200 rounded-xl hover:border-[#c9962a]/50 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-2">{s.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                <span className="text-sm font-semibold text-[#a87a20]">Desde {s.precio}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ciudades */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Contrato de alquiler de habitación también disponible en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {ALQUILER_HABITACION_CIUDADES_LIST.map((c, i) => (
              <span key={c.slug} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-gray-300">·</span>}
                <Link
                  href={`/gestoria/contrato-alquiler-habitacion/${c.slug}`}
                  className="text-sm font-semibold text-[#c9962a] hover:underline"
                >
                  {c.nombre}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white p-6 rounded-xl border border-gray-200">
                <summary className="font-bold text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-14 px-4 bg-[#1a2f1c] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Consulta con un asesor especializado</h2>
          <p className="text-white/80 mb-8">Primera consulta sin compromiso. Te explicamos el proceso y resolvemos tus dudas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${PHONE}`} className="px-8 py-3 rounded-lg bg-white text-[#1a2f1c] font-semibold hover:bg-gray-100 transition-colors">
              745 022 862
            </a>
            <a
              href={`https://wa.me/${WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-white/40 font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <TestimoniosSection landing="alquiler-habitacion" layout="stack" hideRating className="bg-white" />

      {/* CTA final */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Alquila tu habitación con respaldo jurídico</h2>
          <p className="text-lg text-white/85 mb-8">
            Contrato profesional por {PRECIO}€ IVA incluido. Asesor asignado y entrega en 48 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SOLICITAR_URL} className="px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors">
              Contratar ahora — {PRECIO}€
            </Link>
            <a href={`tel:${PHONE}`} className="px-8 py-4 rounded-lg border border-white/30 font-semibold hover:bg-white/10 transition-colors">
              745 022 862
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
