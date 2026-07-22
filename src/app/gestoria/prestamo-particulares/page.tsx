import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import {
  PRESTAMO_PARTICULARES_CIUDADES_LIST,
  PRESTAMO_PARTICULARES_PRECIO,
} from '@/lib/prestamo-particulares-ciudad-data'
import { precioLabel } from '@/lib/gestoria-precios-ui'
import {
  GESTORIA_PHONE_DISPLAY,
  GESTORIA_PHONE_TEL,
  GESTORIA_PHONE_WA,
} from '@/lib/gestoria-contact'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

const BASE_URL = 'https://inmonest.com'
const PRECIO = PRESTAMO_PARTICULARES_PRECIO
const SOLICITAR_URL = '/gestoria/solicitar/prestamo-particulares'

export const metadata: Metadata = {
  title: `Préstamo entre particulares desde ${PRECIO}€`,
  description:
    `¿Prestas o recibes dinero entre particulares? Contrato profesional redactado por gestoría inmobiliaria. Asesor experto, nota fiscal, Modelo 600 y protección ante Hacienda. ${PRECIO}€ IVA incluido.`,
  keywords:
    'contrato prestamo entre particulares, prestamo entre familiares, prestamo privado hacienda, modelo 600 prestamo, prestamo sin intereses contrato, formalizar prestamo familiar, prestamo entre amigos contrato, donacion encubierta hacienda, contrato prestamo privado',
  alternates: {
    canonical: `${BASE_URL}/gestoria/prestamo-particulares`,
  },
  openGraph: {
    title: `Contrato de Préstamo entre Particulares — ${PRECIO}€ con asesor experto`,
    description:
      `Formaliza préstamos privados entre familiares, amigos o socios. Contrato profesional, orientación fiscal y entrega en 48h. ${PRECIO}€ IVA incluido.`,
    url: `${BASE_URL}/gestoria/prestamo-particulares`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria3.jpg`, width: 1200, height: 630, alt: 'Contrato préstamo entre particulares' }],
  },
}

export const revalidate = 86400

const PASOS = [
  {
    titulo: 'Primera consulta con tu asesor',
    desc: 'En menos de 24 horas un gestor inmobiliario experto te contacta. Revisamos importe, plazo, interés (o 0 %), relación entre las partes y si necesitas garantías.',
  },
  {
    titulo: 'Contratas el servicio',
    desc: `Pago único de ${PRECIO}€ IVA incluido. Sin costes ocultos. Comenzamos la redacción personalizada del contrato de préstamo.`,
  },
  {
    titulo: 'Recopilación de datos',
    desc: 'Tu asesor te guía para recopilar datos del prestamista, prestatario, importe exacto, calendario de devolución, intereses y garantías opcionales.',
  },
  {
    titulo: 'Redacción jurídica y nota fiscal',
    desc: 'El contrato se redacta conforme al Código Civil: importe, plazos, impago, vencimiento anticipado e intereses de demora. Incluye orientación sobre Modelo 600 y AEAT.',
  },
  {
    titulo: 'Entrega y asesoramiento',
    desc: 'Recibes el PDF firmable en 48h. Tu asesor resuelve dudas antes de la firma y te explica cómo declarar el préstamo correctamente.',
  },
] as const

const BASES_LEGALES = [
  {
    titulo: 'Evita la donación encubierta ante Hacienda',
    desc: 'Si prestas o recibes dinero sin contrato, la AEAT puede interpretar la transferencia como una donación y liquidar el Impuesto de Donaciones con recargos. Un contrato escrito demuestra que existe obligación de devolución.',
  },
  {
    titulo: 'Modelo 600 e ITP: declaración obligatoria',
    desc: 'El préstamo entre particulares tributa por el Impuesto de Transmisiones Patrimoniales (ITP). Aunque la cuota sea cero en préstamos sin interés, debe declararse mediante el Modelo 600 en tu comunidad autónoma.',
  },
  {
    titulo: 'Título ejecutivo para reclamar impago',
    desc: 'Con contrato firmado puedes iniciar un juicio monitorio para reclamar el capital impagado. Sin documento escrito, probar el préstamo ante un juzgado es extremadamente difícil aunque exista transferencia bancaria.',
  },
  {
    titulo: 'Intereses, IRPF y préstamo a tipo 0 %',
    desc: 'Un préstamo sin intereses es válido jurídicamente, pero debe pactarse expresamente. Si devenga intereses, el prestamista los declara como rendimiento de capital mobiliario en el IRPF.',
  },
] as const

const INCLUYE = [
  'Identificación completa de prestamista y prestatario',
  'Importe exacto del préstamo y forma de entrega',
  'Plazo de devolución y calendario de cuotas',
  'Tipo de interés remuneratorio o préstamo sin interés (0 %)',
  'Cláusulas de vencimiento anticipado por impago',
  'Intereses de demora y procedimiento de reclamación',
  'Garantías opcionales (aval personal, prenda)',
  'Nota fiscal: orientación sobre Modelo 600 y AEAT',
  'PDF firmable · Entrega en 48 horas laborables',
] as const

const PARA_QUIEN = [
  'Familiares o amigos que prestan o reciben dinero de forma privada',
  'Padres que financian la entrada de vivienda a hijos',
  'Inversores privados que financian proyectos o negocios',
  'Particulares que ya hicieron una transferencia y quieren regularizarla',
  'Quien necesita reclamar judicialmente un préstamo impagado',
] as const

const OTROS_SERVICIOS = [
  {
    titulo: 'Contrato de Arras Penitenciales',
    desc: 'Si el préstamo financia la compra de vivienda, las arras formalizan el compromiso de compraventa.',
    href: '/gestoria/contrato-arras',
    precio: precioLabel('arras-penitenciales'),
  },
  {
    titulo: 'Due Diligence Pre-Compra',
    desc: 'Revisión documental completa antes de escriturar una compra entre particulares.',
    href: '/gestoria/due-diligence-precompra',
    precio: precioLabel('pack-due-diligence-precompra'),
  },
  {
    titulo: 'Asesoría Compra de Piso',
    desc: 'Acompañamiento integral si el préstamo va destinado a comprar vivienda.',
    href: '/gestoria/asesoria-compra-piso',
    precio: precioLabel('compra-completa-reserva-escritura'),
  },
  {
    titulo: 'Contrato de Alquiler LAU',
    desc: 'Para alquilar el piso íntegro con protección de la Ley de Arrendamientos Urbanos.',
    href: '/gestoria/solicitar/contrato-alquiler',
    precio: precioLabel('contrato-alquiler'),
  },
  {
    titulo: 'Alquiler con Opción a Compra',
    desc: 'Arrendamiento con opción de compra integrada en un solo contrato.',
    href: '/gestoria/solicitar/alquiler-opcion-compra',
    precio: precioLabel('alquiler-opcion-compra'),
  },
  {
    titulo: 'Revisión Contrato Arras',
    desc: 'Si ya tienes borrador del vendedor, lo revisamos antes de firmar.',
    href: '/gestoria/revision-contrato-arras',
    precio: precioLabel('revision-arras'),
  },
] as const

const FAQ = [
  {
    q: '¿Cuánto cuesta el contrato de préstamo entre particulares?',
    a: `${PRECIO}€ IVA incluido. Tarifa plana por contrato personalizado, redacción jurídica, nota fiscal y asesoramiento de un gestor inmobiliario experto. Entrega en 48 horas laborables.`,
  },
  {
    q: '¿Un préstamo entre familiares tiene que tributar?',
    a: 'Sí. Debe declararse mediante el Modelo 600 (ITP). Si es sin intereses, la cuota suele ser cero, pero la declaración crea el rastro documental que protege ante Hacienda. Sin contrato, puede interpretarse como donación.',
  },
  {
    q: '¿Puede ser un préstamo sin intereses?',
    a: 'Sí, un préstamo a tipo 0 % es perfectamente válido. Debe indicarse expresamente en el contrato para que Hacienda no cuestione la operación ni la califique como donación encubierta.',
  },
  {
    q: '¿Qué pasa si el prestatario no devuelve el dinero?',
    a: 'Con el contrato firmado tienes título para reclamar judicialmente mediante juicio monitorio. El documento incluye cláusulas de vencimiento anticipado e intereses de demora.',
  },
  {
    q: '¿Necesito notario?',
    a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
  },
  {
    q: '¿Puedo regularizar un préstamo ya hecho por transferencia?',
    a: 'Sí. Muchos clientes contratan el servicio después de haber transferido el dinero. El contrato puede documentar la operación con fecha retroactiva al acuerdo original, siempre que ambas partes lo confirmen.',
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

export default function PrestamoParticularesPage() {
  const waText = encodeURIComponent('Hola, necesito un contrato de préstamo entre particulares')

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contrato de Préstamo entre Particulares',
    description:
      'Redacción profesional de contratos de préstamo privado para particulares. Asesor experto, nota fiscal y entrega en 48h.',
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
      { '@type': 'ListItem', position: 3, name: 'Préstamo entre Particulares', item: `${BASE_URL}/gestoria/prestamo-particulares` },
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

      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Préstamo entre Particulares</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#a87a20] bg-[#fdf8ee] border border-[#e8d48a] px-3 py-1 rounded-full mb-4">
                Financiación · Particulares
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Contrato de préstamo entre <span className="text-[#c9962a]">particulares</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ¿Prestas o recibes dinero entre particulares? Un <strong>asesor experto en derecho inmobiliario y fiscal</strong> redacta
                tu contrato con importe, plazos, intereses y protección ante Hacienda. Evita donaciones encubiertas y reclama impagos con título ejecutivo.{' '}
                <strong className="text-gray-900">{PRECIO}€ IVA incluido.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={SOLICITAR_URL}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Contratar — {PRECIO}€ IVA incluido
                </Link>
                <a
                  href={GESTORIA_PHONE_TEL}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-[#c9962a] hover:text-[#a87a20] transition-colors"
                >
                  {GESTORIA_PHONE_DISPLAY}
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckIcon /> Asesor asignado</li>
                <li className="flex items-center gap-2"><CheckIcon /> Nota fiscal incluida</li>
                <li className="flex items-center gap-2"><CheckIcon /> Entrega en 48h</li>
              </ul>
            </div>
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/gestoria3.jpg"
                alt="Contrato de préstamo entre particulares profesional"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Un asesor experto en todo el proceso</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Inmonest es una <strong className="text-gray-900">gestoría inmobiliaria digital</strong> para
              particulares. No somos un banco ni una agencia: te ayudamos a formalizar préstamos privados con validez jurídica y fiscal.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cuando contratas, se te asigna un <strong className="text-gray-900">gestor especializado en financiación
              entre particulares</strong>. Te explica el Modelo 600, cómo evitar que Hacienda califique la operación como donación
              y qué hacer si el prestatario deja de pagar.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Miles de préstamos entre familiares se hacen por transferencia bancaria sin contrato. Eso deja a ambas partes expuestas
              a liquidaciones de Hacienda, imposibilidad de reclamar judicialmente y conflictos familiares difíciles de resolver.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Tu asesor asignado</p>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c9962a]/30">
                <Image src={GESTOR_DANIEL_HERNANDEZ.foto} alt={GESTOR_DANIEL_HERNANDEZ.nombre} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{GESTOR_DANIEL_HERNANDEZ.nombre}</h3>
                <p className="text-sm text-[#a87a20] font-medium mb-3">Gestor inmobiliario · Préstamos entre particulares</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Acompaña a particulares que formalizan préstamos privados entre familiares, amigos o inversores.
                  Conoce la tributación del Modelo 600, los préstamos sin interés y la reclamación judicial por impago.
                </p>
                <ul className="space-y-1">
                  {['Préstamos familiares e inversores', 'Orientación fiscal Modelo 600', 'Asesoramiento pre y post firma'].map((e) => (
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

      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Bases legales y fiscales del préstamo privado</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Conocer el marco jurídico es el primer paso para prestar o recibir dinero con seguridad. Tu asesor te lo explica en lenguaje claro.
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

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Qué incluye el contrato ({PRECIO}€)</h2>
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

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Cómo trabajamos contigo</h2>
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

      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Contrato profesional frente a no formalizar el préstamo
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Un préstamo sin contrato puede costarte una liquidación de Hacienda, imposibilidad de reclamar judicialmente o pérdida total del capital prestado.
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
                    Sin contrato / transferencia sin documentar
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste inicial', `${PRECIO}€ tarifa plana IVA incluido`, '0€ — riesgo fiscal y legal elevado'],
                  ['Protección ante Hacienda', 'Contrato + orientación Modelo 600', 'Riesgo de donación encubierta'],
                  ['Reclamación judicial por impago', 'Título ejecutivo (juicio monitorio)', 'Prueba muy difícil sin contrato'],
                  ['Intereses y plazos', 'Pactados por escrito con validez', 'Disputas verbales sin prueba'],
                  ['Nota fiscal incluida', 'Sí, orientación AEAT', 'No'],
                  ['Coste estimado si hay conflicto grave', `Inversión preventiva de ${PRECIO}€`, 'Liquidación ISD, abogado y capital perdido'],
                ].map(([label, inmo, mal]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{label}</td>
                    <td className="p-4 text-center bg-green-50/50 font-medium text-gray-800">{inmo}</td>
                    <td className="p-4 text-center text-gray-600">{mal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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

      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Otros servicios de gestoría Inmonest</h2>
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

      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Contrato de préstamo entre particulares también disponible en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PRESTAMO_PARTICULARES_CIUDADES_LIST.map((c, i) => (
              <span key={c.slug} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-gray-300">·</span>}
                <Link
                  href={`/gestoria/prestamo-particulares/${c.slug}`}
                  className="text-sm font-semibold text-[#c9962a] hover:underline"
                >
                  {c.nombre}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-14 px-4 bg-[#1a2f1c] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Consulta con un asesor especializado</h2>
          <p className="text-white/80 mb-8">Primera consulta sin compromiso. Te explicamos el proceso fiscal y resolvemos tus dudas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={GESTORIA_PHONE_TEL} className="px-8 py-3 rounded-lg bg-white text-[#1a2f1c] font-semibold hover:bg-gray-100 transition-colors">
              {GESTORIA_PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${GESTORIA_PHONE_WA}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-white/40 font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <TestimoniosSection landing="prestamo-particulares" layout="stack" hideRating className="bg-white" />

      <section className="py-16 px-4 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Formaliza tu préstamo privado hoy</h2>
          <p className="text-lg text-white/85 mb-8">
            Contrato profesional por {PRECIO}€ IVA incluido. Asesor asignado, nota fiscal y entrega en 48 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SOLICITAR_URL} className="px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors">
              Contratar ahora — {PRECIO}€
            </Link>
            <a href={GESTORIA_PHONE_TEL} className="px-8 py-4 rounded-lg border border-white/30 font-semibold hover:bg-white/10 transition-colors">
              {GESTORIA_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
