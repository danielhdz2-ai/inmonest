import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_CTA_BANNERS } from '@/lib/gestoria-images'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const PRECIO = 295
const SOLICITAR_URL = '/gestoria/solicitar/compra-completa-parking-trastero'
const PHONE = '+34745022862'
const WA = '34745022862'

export const metadata: Metadata = {
  title: 'Compra parking o trastero desde 295€',
  description:
    '¿Compras plaza de parking o trastero? Gestoría inmobiliaria te acompaña desde la reserva hasta notaría: arras, negociación, ITP, registro y tramitación. 295€ IVA incluido.',
  keywords:
    'comprar parking particular, comprar trastero, gestoria compra garaje, compra plaza parking notaria, ITP parking trastero, arras parking garaje, compra trastero sin agencia',
  alternates: {
    canonical: `${BASE_URL}/gestoria/compra-parking-trastero`,
  },
  openGraph: {
    title: 'Compra Completa Parking o Trastero — 295€ con gestor asignado',
    description:
      'Servicio integral para compradores de parking o trastero entre particulares. Reserva, arras, notaría, ITP y registro. 295€ IVA incluido.',
    url: `${BASE_URL}/gestoria/compra-parking-trastero`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria9.jpg`, width: 1200, height: 630, alt: 'Compra parking trastero gestoría' }],
  },
}

export const revalidate = 86400

const INCLUYE = [
  'Gestor inmobiliario asignado durante todo el proceso',
  'Contrato de reserva de compra adaptado al inmueble',
  'Redacción y revisión de contrato de arras',
  'Asesoramiento en negociación con el vendedor',
  'Verificación de nota simple registral',
  'Comprobación de cargas, servidumbres y cuota de comunidad',
  'Revisión de estatutos y normas de la comunidad de propietarios',
  'Coordinación con notaría para la escritura pública',
  'Liquidación del ITP (Impuesto de Transmisiones Patrimoniales)',
  'Gestión de inscripción en el Registro de la Propiedad',
  'Asesoramiento telefónico y por WhatsApp hasta la firma',
] as const

const PASOS = [
  { titulo: 'Primera consulta', desc: 'Tu gestor te contacta en menos de 24 horas. Analizamos la operación: tipo de inmueble, precio, vendedor y documentación disponible.' },
  { titulo: 'Reserva de compra', desc: 'Redactamos el contrato de reserva para bloquear la plaza o trastero mientras verificamos la documentación registral.' },
  { titulo: 'Arras y negociación', desc: 'Preparamos el contrato de arras con cláusulas adaptadas a parkings y trasteros. Te asesoramos si hay que renegociar condiciones.' },
  { titulo: 'Tramitación', desc: 'Recopilamos documentación, verificamos cargas y coordinamos con comunidad, administrador y vendedor.' },
  { titulo: 'Notaría, ITP y registro', desc: 'Te acompañamos hasta la firma en notaría, liquidamos el ITP y gestionamos la inscripción registral del inmueble a tu nombre.' },
] as const

const FAQ = [
  {
    q: '¿Cuánto cuesta el servicio completo?',
    a: '295€ IVA incluido. Tarifa plana por acompañamiento integral desde la reserva hasta la inscripción registral. Sin comisiones sobre el precio del parking o trastero.',
  },
  {
    q: '¿Qué diferencia hay con comprar un piso completo?',
    a: 'El proceso es más ágil: menos documentación urbanística, plazos más cortos y un ITP calculado sobre el valor del anejo. Nuestro servicio está especializado en plazas de garaje, parkings y trasteros.',
  },
  {
    q: '¿Incluye la liquidación del ITP?',
    a: 'Sí. Te guiamos en el cálculo y presentación del Impuesto de Transmisiones Patrimoniales ante la administración tributaria correspondiente. El importe del impuesto lo abona el comprador aparte del precio de compra.',
  },
  {
    q: '¿Puedo contratar si ya he firmado las arras?',
    a: 'Sí. Podemos incorporarnos en la fase en que estés y acompañarte en los trámites restantes hasta notaría, ITP y registro.',
  },
  {
    q: '¿El gestor me acompaña el día de la notaría?',
    a: 'Resolvemos todas tus dudas antes de la firma y verificamos el borrador de escritura. Coordinamos la cita y confirmamos que la documentación está completa.',
  },
  {
    q: '¿Sirve para parking vinculado a un piso?',
    a: 'Sí. Tanto para plazas independientes como anejas a una vivienda. Verificamos la concordancia registral y la cuota de participación en la comunidad.',
  },
] as const

const OTROS = [
  { titulo: 'Arras Parking o Garaje', desc: 'Solo necesitas el contrato de arras para cerrar la operación.', href: '/gestoria/solicitar/arras-parking-garage', precio: precioLabel('arras-parking-garage') },
  { titulo: 'Compra Completa Vivienda', desc: 'Acompañamiento integral para comprar un piso entre particulares.', href: '/gestoria/asesoria-compra-piso', precio: precioLabel('compra-completa-reserva-escritura') },
  { titulo: 'Due Diligence Pre-Compra', desc: 'Revisión documental tras las arras antes de escriturar.', href: '/gestoria/due-diligence-precompra', precio: precioLabel('pack-due-diligence-precompra') },
  { titulo: 'Revisión Contrato Arras', desc: 'Si ya tienes borrador del vendedor, lo revisamos antes de firmar.', href: '/gestoria/revision-contrato-arras', precio: precioLabel('revision-arras') },
] as const

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

export default function CompraParkingTrasteroPage() {
  const waText = encodeURIComponent('Hola, quiero comprar un parking/trastero y necesito gestoría completa')

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Compra Completa Parking o Trastero',
      description: 'Acompañamiento integral en la compra de plaza de parking o trastero desde reserva hasta notaría, ITP y registro.',
      provider: { '@id': ORGANIZATION_SCHEMA_ID },
      offers: { '@type': 'Offer', price: String(PRECIO), priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
        { '@type': 'ListItem', position: 3, name: 'Compra Parking o Trastero', item: `${BASE_URL}/gestoria/compra-parking-trastero` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <>
      <JsonLd schema={schemas} />
      <Navbar />
      <WhatsAppButton />

      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gold-500">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-gold-500">Gestoría</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Compra Parking o Trastero</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gold-700 bg-cream-100 border border-gold-300 px-3 py-1 rounded-full mb-4">
                Compra entre particulares · Parking y trastero
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Compra de <span className="text-gold-500">parking o trastero</span> con gestor asignado
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Te acompañamos en todo el proceso: <strong>reserva, arras, negociación, tramitación, notaría,
                liquidación del ITP e inscripción registral</strong>. Un gestor inmobiliario de Inmonest a tu lado
                en cada paso. <strong className="text-gray-900">{PRECIO}€ IVA incluido.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={SOLICITAR_URL} className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors">
                  Contratar — {PRECIO}€ IVA incluido
                </Link>
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-gold-500 transition-colors">
                  745 022 862
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckIcon /> Gestor asignado</li>
                <li className="flex items-center gap-2"><CheckIcon /> Hasta registro</li>
                <li className="flex items-center gap-2"><CheckIcon /> ITP incluido en gestión</li>
              </ul>
            </div>
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image src="/gestoria9.jpg" alt="Compra parking o trastero con gestoría" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute top-4 right-4 bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border-2 border-gold-500/30">
                <span className="text-2xl font-bold text-[#1e3a5f]">{PRECIO}€</span>
                <span className="text-[10px] text-gray-500">IVA incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu gestor en todo el proceso de compra</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Comprar una plaza de parking o un trastero parece sencillo, pero los problemas aparecen cuando no se
              verifica la nota simple, las servidumbres de acceso, la deuda de comunidad o el ITP. Un error puede
              retrasar la escritura semanas o costarte miles de euros.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Con Inmonest tienes un <strong className="text-gray-900">gestor especializado en derecho inmobiliario</strong> que
              lleva la operación desde el primer contacto hasta que el parking o trastero queda inscrito a tu nombre en el Registro.
            </p>
          </div>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Tu gestor asignado</p>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold-500/30">
                <Image src={GESTOR_DANIEL_HERNANDEZ.foto} alt={GESTOR_DANIEL_HERNANDEZ.nombre} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{GESTOR_DANIEL_HERNANDEZ.nombre}</h3>
                <p className="text-sm text-gold-700 font-medium mb-3">Gestor inmobiliario · Compras de anejos</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Especialista en compraventas de parking, garaje y trastero entre particulares. Conoce la verificación
                  registral de anejos, la liquidación del ITP y la coordinación con notarías.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Qué incluye el servicio ({PRECIO}€)</h2>
          <ul className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {INCLUYE.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 text-sm text-gray-700">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Cómo trabajamos contigo</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {PASOS.map((paso, i) => (
              <div key={paso.titulo} className="text-center">
                <div className="w-12 h-12 bg-forest-800 text-gold-500 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{paso.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Gestoría frente a hacerlo solo</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900 w-1/3" />
                  <th className="p-4 text-center font-bold text-gold-700 bg-cream-100 border-b-2 border-gold-500">Inmonest — {PRECIO}€</th>
                  <th className="p-4 text-center font-semibold text-gray-600 border-b-2 border-gray-300">Sin gestoría</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste del servicio', `${PRECIO}€ tarifa plana`, '0€ + riesgo alto'],
                  ['Gestor asignado', 'Sí, todo el proceso', 'No'],
                  ['Verificación registral', 'Nota simple y cargas revisadas', 'A menudo no se hace'],
                  ['Liquidación ITP', 'Te guiamos paso a paso', 'Errores frecuentes en modelo 600'],
                  ['Inscripción registral', 'Coordinada y verificada', 'Gestión propia ante Registro'],
                  ['Coste estimado si hay problema', `Inversión de ${PRECIO}€`, '500€ - 3.000€ en abogado y retrasos'],
                ].map(([a, b, c]) => (
                  <tr key={a} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{a}</td>
                    <td className="p-4 text-center bg-green-50/50 font-medium">{b}</td>
                    <td className="p-4 text-center text-gray-600">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Servicios relacionados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OTROS.map((s) => (
              <Link key={s.titulo} href={s.href} className="block p-6 bg-slate-50 border border-gray-200 rounded-xl hover:border-gold-500/50 transition-all">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.titulo}</h3>
                <p className="text-xs text-gray-600 mb-3">{s.desc}</p>
                <span className="text-sm font-semibold text-gold-700">Desde {s.precio}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
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

      <TestimoniosSection landing="compra-parking-trastero" layout="stack" hideRating className="bg-white" />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow="Parking y trastero"
            title="Compra tu parking o trastero con seguridad"
            description={`Servicio completo por ${PRECIO}€. Gestor asignado hasta registro e ITP.`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar ahora — ${PRECIO}€`}
            secondaryHref={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`}
            secondaryLabel="WhatsApp"
            imageSrc={GESTORIA_CTA_BANNERS.parking.src}
            imageAlt={GESTORIA_CTA_BANNERS.parking.alt}
            imagePosition="left"
          />
        </div>
      </section>
    </>
  )
}
