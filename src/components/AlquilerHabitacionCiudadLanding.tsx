import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import JsonLd from '@/components/JsonLd'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { RELACIONADOS_HABITACION } from '@/lib/gestoria-relacionados'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { AlquilerHabitacionCiudadConfig } from '@/lib/alquiler-habitacion-ciudad-data'
import {
  ALQUILER_HABITACION_CIUDADES_LIST,
  ALQUILER_HABITACION_PRECIO,
} from '@/lib/alquiler-habitacion-ciudad-data'
import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { getCiudadCtaImage } from '@/lib/gestoria-images'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'
import { getContratoAlquilerPrecio } from '@/lib/gestoria-catalogo'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SOLICITAR_URL = '/gestoria/solicitar/alquiler-habitaciones'
const DUE_DILIGENCE_CIUDADES = new Set(['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao'])

const PASOS = [
  {
    titulo: 'Primera consulta con tu asesor',
    desc: 'En menos de 24 horas un gestor inmobiliario experto te contacta. Revisamos tu caso: número de habitaciones, convivencia, fianza, duración y situación del inmueble.',
  },
  {
    titulo: 'Contratas el servicio',
    desc: `Pago único de ${ALQUILER_HABITACION_PRECIO}€ IVA incluido. Sin costes ocultos. Comenzamos la redacción personalizada del contrato de habitación.`,
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

const PARA_QUIEN_BASE = [
  'Propietarios que alquilan una o varias habitaciones en su vivienda habitual',
  'Inversores en pisos compartidos o coliving con varios inquilinos',
  'Particulares que buscan inquilino sin pasar por agencia inmobiliaria',
  'Quien ya tiene inquilino pero solo un acuerdo verbal o mensajes de WhatsApp',
  'Propietarios que quieren un contrato independiente por cada habitación',
] as const

const FAQ_BASE = [
  {
    q: '¿Cuánto cuesta el contrato de alquiler de habitación?',
    a: `${ALQUILER_HABITACION_PRECIO}€ IVA incluido. Tarifa plana por contrato personalizado, redacción jurídica y asesoramiento de un gestor inmobiliario experto. Entrega en 48 horas laborables.`,
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
] as const

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

type Props = {
  config: AlquilerHabitacionCiudadConfig
}

export default function AlquilerHabitacionCiudadLanding({ config }: Props) {
  const { nombre, slug, region } = config
  const waText = encodeURIComponent(`Hola, necesito un contrato de alquiler de habitación en ${nombre}`)
  const paraQuien = [...PARA_QUIEN_BASE, ...config.paraQuienExtra]
  const faq = [...FAQ_BASE, ...config.faqExtra]
  const precioLau = `${getContratoAlquilerPrecio(slug)}€`

  const otrosServicios = [
    {
      titulo: `Contrato de Alquiler LAU en ${nombre}`,
      desc: 'Para alquilar el piso íntegro con protección de la Ley de Arrendamientos Urbanos y Ley de Vivienda 2026.',
      href: config.enlaceContratoLau,
      precio: precioLau,
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
      href: `/gestoria/contrato-arras`,
      precio: precioLabel('arras-penitenciales'),
    },
    {
      titulo: `Due Diligence Pre-Compra ${nombre}`,
      desc: 'Revisión documental completa antes de escriturar una compra entre particulares.',
      href: DUE_DILIGENCE_CIUDADES.has(slug)
        ? `/gestoria/due-diligence-precompra/${slug}`
        : '/gestoria/due-diligence-precompra',
      precio: precioLabel('pack-due-diligence-precompra'),
    },
  ]

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Contrato de Alquiler de Habitación en ${nombre}`,
    description: `Redacción profesional de contratos de alquiler de habitación para particulares en ${nombre}. Asesor experto y entrega en 48h.`,
    areaServed: {
      '@type': 'City',
      name: nombre,
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: { '@id': ORGANIZATION_SCHEMA_ID },
    offers: {
      '@type': 'Offer',
      price: String(ALQUILER_HABITACION_PRECIO),
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
      { '@type': 'ListItem', position: 4, name: nombre, item: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/${slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
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
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-gold-500">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-gold-500">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/contrato-alquiler-habitacion" className="hover:text-gold-500">Alquiler Habitación</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{nombre}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gold-700 bg-cream-100 border border-gold-300 px-3 py-1 rounded-full mb-4">
                Particulares · {region}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Contrato de alquiler de habitación en <span className="text-gold-500">{nombre}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ¿Alquilas una habitación en {nombre}? Un <strong>asesor experto en derecho inmobiliario</strong> redacta
                tu contrato conforme al Código Civil, regula la convivencia y te protege ante impagos, conflictos
                y problemas de desalojo. <strong className="text-gray-900">{ALQUILER_HABITACION_PRECIO}€ IVA incluido.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={SOLICITAR_URL}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors"
                >
                  Contratar — {ALQUILER_HABITACION_PRECIO}€ IVA incluido
                </Link>
                <a
                  href="#gestor-daniel"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-gold-500 hover:text-gold-700 transition-colors"
                >
                  Hablar con Daniel
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
                src={config.heroImage}
                alt={`Contrato alquiler habitación ${nombre}`}
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Mercado de habitaciones en {nombre}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{config.mercadoIntro}</p>
          <p className="text-gray-600 leading-relaxed">
            Inmonest es una <strong className="text-gray-900">gestoría inmobiliaria digital</strong> para
            particulares. Cuando contratas, Daniel Hernández — tu gestor asignado — te explica las bases legales,
            qué cláusulas necesitas y cómo cubrirte ante impagos, daños o convivencia conflictiva.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Bases legales del alquiler de habitación</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            En {nombre} el marco jurídico es el mismo Código Civil, pero el mercado local tiene sus particularidades. Tu asesor te lo explica con claridad.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Qué incluye el contrato ({ALQUILER_HABITACION_PRECIO}€)</h2>
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
                <div className="w-12 h-12 bg-forest-800 text-gold-500 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
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
            Contrato profesional frente a no contratar o usar plantilla
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            En {nombre}, un conflicto por impago o convivencia sin contrato escrito puede costarte entre 2.000€ y 8.000€ en abogado, tiempo y rentas perdidas.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900 w-1/4">Aspecto</th>
                  <th className="p-4 text-center font-bold text-gold-700 bg-cream-100 border-b-2 border-gold-500">
                    Inmonest — {ALQUILER_HABITACION_PRECIO}€
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-600 border-b-2 border-gray-300">
                    Sin contrato / plantilla genérica
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste inicial', `${ALQUILER_HABITACION_PRECIO}€ tarifa plana IVA incluido`, '0€ — riesgo elevado'],
                  ['Asesor experto asignado', 'Sí, durante todo el proceso', 'No'],
                  ['Normas de convivencia válidas', 'Redactadas y revisadas jurídicamente', 'Verbales o inexistentes'],
                  ['Resolución por impago', 'Cláusulas y procedimiento definidos', 'Procedimiento judicial largo'],
                  ['Recuperación de la habitación', 'Base contractual clara', '3-12 meses y costes legales'],
                  ['Disputa sobre fianza', 'Condiciones pactadas por escrito', '1.500€ - 4.000€ en abogado y tiempo'],
                  ['Coste estimado si hay conflicto grave', `Inversión preventiva de ${ALQUILER_HABITACION_PRECIO}€`, '2.000€ - 8.000€ en abogado, procurador y meses sin cobrar renta'],
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
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">¿Para quién es este servicio en {nombre}?</h2>
          <ul className="space-y-4">
            {paraQuien.map((item) => (
              <li key={item} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Barrios y zonas en {nombre}</h2>
          <p className="text-gray-600 mb-8">{config.zonasIntro}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-4 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Otros servicios en {nombre}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otrosServicios.map((s) => (
              <Link
                key={s.titulo}
                href={s.href}
                className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-gold-500/50 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-2">{s.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                <span className="text-sm font-semibold text-gold-700">Desde {s.precio}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Contrato de alquiler de habitación también disponible en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/gestoria/contrato-alquiler-habitacion" className="text-sm font-semibold text-gold-500 hover:underline">
              España (general)
            </Link>
            {ALQUILER_HABITACION_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/contrato-alquiler-habitacion/${c.slug}`}
                className="text-sm font-semibold text-gold-500 hover:underline"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="alquiler-habitaciones"
        servicioNombre={`Alquiler de habitación en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, necesito un contrato de alquiler de habitación en ${nombre}`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Preguntas frecuentes en {nombre}</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="bg-white p-6 rounded-xl border border-gray-200">
                <summary className="font-bold text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="alquiler-habitaciones"
        servicioNombre={`Alquiler de habitación en ${nombre}`}
        ciudad={nombre}
        testimonioLanding={config.testimoniosLanding}
        relacionados={RELACIONADOS_HABITACION}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Habitación · ${nombre}`}
            title={`Alquila tu habitación en ${nombre} con respaldo jurídico`}
            description={`Contrato profesional por ${ALQUILER_HABITACION_PRECIO}€ IVA incluido. Asesor asignado y entrega en 48 horas.`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar ahora — ${ALQUILER_HABITACION_PRECIO}€`}
            imageSrc={getCiudadCtaImage(config.slug).src}
            imageAlt={`Contrato alquiler habitación en ${nombre}`}
            imagePosition="left"
          />
        </div>
      </section>
    </>
  )
}
