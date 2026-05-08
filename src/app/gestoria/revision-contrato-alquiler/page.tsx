import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Revisión Contrato Alquiler 【39€】 Protege tus Derechos como Inquilino | Inmonest',
  description: '¿Tu casero te ha dado un contrato de alquiler? Abogado lo revisa en 24h. Detectamos cláusulas abusivas, abusos y condiciones ilegales. Desde 39€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/revision-contrato-alquiler`,
  },
  openGraph: {
    title: 'Revisión de Contrato de Alquiler para Inquilinos — Inmonest',
    description: 'No firmes sin saber tus derechos. Detectamos cláusulas abusivas, fianzas ilegales y abusos. 24h. Desde 39€.',
    url: `${BASE_URL}/gestoria/revision-contrato-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/familia2.jpg`, width: 1200, height: 630, alt: 'Revisión contrato alquiler inquilino' }],
  },
}

export const revalidate = 3600

export default function RevisionContratoAlquilerPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Revisión de Contrato de Alquiler para Inquilinos',
    description: 'Revisión legal de contratos de alquiler LAU por abogados especializados. Protegemos tus derechos como inquilino. Detectamos cláusulas abusivas, fianzas ilegales y condiciones contrarias a la Ley de Vivienda 2026.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '60',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },

  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Y si el propietario se niega a cambiar el contrato?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tienes dos opciones: 1) Firmas sabiendo qué cláusulas son nulas (no te afectarán aunque estén escritas), o 2) Buscas otro piso. Si un casero se niega a eliminar cláusulas ilegales, es mala señal.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Las cláusulas abusivas son nulas aunque las firme?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SÍ. Las cláusulas contrarias a la Ley de Vivienda o LAU son nulas de pleno derecho. Aunque las firmes, no tienen validez legal. Pero es mejor eliminarlas antes para evitar conflictos futuros.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo usar el informe si voy a juicio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El informe es un dictamen jurídico válido. Si el propietario incumple o intenta aplicar cláusulas abusivas, puedes usarlo como prueba en reclamación o juicio.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Revisáis contratos de alquiler temporal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, también revisamos temporales, turísticos, de habitación, etc. Los precios son los mismos. La Ley de Vivienda 2026 también aplica a temporales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tarda la revisión?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Entre 12 y 24 horas laborables. Si es urgente (firmas mañana), podemos hacerlo en 6 horas (consultar disponibilidad por WhatsApp).',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚠️ No firmes sin conocer tus derechos
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Tu casero te ha dado un <span className="text-[#c9962a]">contrato de alquiler</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un abogado especializado lo revisa en <strong>24 horas</strong>. Detectamos cláusulas abusivas, 
                fianzas ilegales y condiciones que violan la <strong>Ley de Vivienda 2026</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/revision-alquiler"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  Revisar mi contrato (39€)
                </Link>
                <a
                  href="https://wa.me/34624177966?text=Hola,%20necesito%20revisar%20mi%20contrato%20de%20alquiler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center shadow-lg"
                >
                  💬 WhatsApp directo
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Entrega en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ley Vivienda 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/familia2.jpg"
                alt="Abogado revisando contrato de alquiler"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">312 inquilinos protegidos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Cláusulas abusivas más comunes (y que son ILEGALES)
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fianza &gt; 2 meses</h3>
              <p className="text-gray-700 mb-3">
                La Ley de Vivienda 2026 prohíbe fianzas superiores a 2 meses de renta (antes era 1 mes para LAU).
              </p>
              <span className="text-red-700 font-semibold text-sm">ILEGAL desde mayo 2023</span>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Prohibición de mascotas</h3>
              <p className="text-gray-700 mb-3">
                No pueden prohibirte tener mascotas salvo razones sanitarias justificadas o estatutos de la comunidad.
              </p>
              <span className="text-red-700 font-semibold text-sm">Cláusula nula</span>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Gastos de gestoría al inquilino</h3>
              <p className="text-gray-700 mb-3">
                Intentan que pagues honorarios de la agencia o gestoría. Esto es abusivo y va contra la jurisprudencia.
              </p>
              <span className="text-red-700 font-semibold text-sm">Cláusula abusiva</span>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Subidas de renta arbitrarias</h3>
              <p className="text-gray-700 mb-3">
                Solo se puede subir según IPC y con límites. Algunas cláusulas ponen subidas del 5-10% anual sin justificar.
              </p>
              <span className="text-red-700 font-semibold text-sm">Fuera de la ley</span>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Renuncia a prórrogas legales</h3>
              <p className="text-gray-700 mb-3">
                Te hacen renunciar a los 5 años obligatorios o a la prórroga tácita. Esto es nulo de pleno derecho.
              </p>
              <span className="text-red-700 font-semibold text-sm">Nula por ley</span>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Penalizaciones por rescisión</h3>
              <p className="text-gray-700 mb-3">
                Intentan cobrarte 2-3 meses si te vas antes del año. Solo pueden pedirte lo que establece la LAU.
              </p>
              <span className="text-red-700 font-semibold text-sm">Ilegal si supera la ley</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qué revisamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            ¿Qué revisamos en tu contrato?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Verificamos <strong>cada cláusula</strong> contra la Ley de Vivienda 2026 y jurisprudencia
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '💰',
                title: 'Fianza y garantías',
                desc: 'Verificamos que la fianza no supere 2 meses y que no te pidan avales o garantías excesivas. Detectamos pagos "extra" ilegales.',
              },
              {
                icon: '📅',
                title: 'Duración y prórrogas',
                desc: 'Comprobamos que respeten los 5 años obligatorios y la prórroga tácita de 3 años. Detectamos renuncias nulas.',
              },
              {
                icon: '📈',
                title: 'Actualización de renta',
                desc: 'Revisamos las cláusulas de subida de renta: debe ser según IPC y con límites legales (no arbitrario).',
              },
              {
                icon: '🔧',
                title: 'Reparaciones y mantenimiento',
                desc: 'Verificamos qué gastos son tuyos y cuáles del propietario. Muchos contratos intentan cargarte reparaciones que no te corresponden.',
              },
              {
                icon: '🐕',
                title: 'Mascotas y restricciones',
                desc: 'Comprobamos si las prohibiciones de mascotas son legales o abusivas según normativa vigente.',
              },
              {
                icon: '🚪',
                title: 'Desistimiento y rescisión',
                desc: 'Analizamos las condiciones de salida: preaviso, penalizaciones, devolución de fianza. Detectamos abusos.',
              },
              {
                icon: '⚡',
                title: 'Suministros y gastos',
                desc: 'Verificamos cómo se reparten IBI, comunidad, suministros. Detectamos gastos que te cargan indebidamente.',
              },
              {
                icon: '📋',
                title: 'Inventario y estado del piso',
                desc: 'Comprobamos que haya inventario detallado con estado de conservación para evitar problemas al devolver el piso.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Inquilinos que han evitado abusos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Me querían cobrar 3 meses de fianza + 1 de gestoría (2.800€ en total). 
                Gracias a la revisión, solo pagué los 2 meses legales. Me ahorraron 1.400€."
              </p>
              <div className="text-sm font-semibold text-gray-900">Miguel S., Madrid</div>
              <div className="text-xs text-gray-500">Abril 2026</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "El contrato decía que si me iba antes de 3 años perdía la fianza completa. 
                Era ilegal. Negocié con el propietario y lo eliminamos."
              </p>
              <div className="text-sm font-semibold text-gray-900">Sara T., Barcelona</div>
              <div className="text-xs text-gray-500">Marzo 2026</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Me prohibían tener perro. El abogado me explicó que era abusivo salvo que los estatutos 
                lo prohibieran (y no lo hacían). Ahora vivo con mi golden retriever."
              </p>
              <div className="text-sm font-semibold text-gray-900">Laura G., Valencia</div>
              <div className="text-xs text-gray-500">Mayo 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona?
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Envías tu contrato',
                desc: 'Sube el PDF del contrato que te ha dado el propietario o la agencia.',
                time: '1 minuto',
              },
              {
                step: '2',
                title: 'Abogado lo analiza',
                desc: 'Revisamos cada cláusula contra la Ley de Vivienda 2026, LAU y jurisprudencia del Tribunal Supremo.',
                time: '12-24 horas',
              },
              {
                step: '3',
                title: 'Recibes informe detallado',
                desc: 'Te enviamos PDF con: cláusulas ilegales/abusivas detectadas, artículos de ley aplicables, y versión corregida del contrato.',
                time: 'Inmediato',
              },
              {
                step: '4',
                title: 'Negocias con seguridad',
                desc: 'Vas a la firma con argumentos legales sólidos para eliminar cláusulas abusivas o directamente rechazar el contrato.',
                time: 'Cuando quieras',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="bg-[#c9962a] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.time}</span>
                  </div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Revisión profesional desde 60€
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Mucho más barato que pagar 3 meses de fianza ilegal (1.500€+)
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Revisión Básica</h3>
              <div className="text-5xl font-bold text-[#c9962a] mb-2">60€</div>
              <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Verificación Ley Vivienda 2026</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detección de cláusulas ilegales</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Informe de conformidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Entrega en 24h</span>
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/revision-alquiler"
                className="block bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar revisión
              </Link>
            </div>
            <div className="border-2 border-[#c9962a] rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#c9962a] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recomendado
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Revisión + Corrección</h3>
              <div className="text-5xl font-bold text-[#c9962a] mb-2">120€</div>
              <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>Todo lo anterior +</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Versión corregida del contrato</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Argumentos legales para negociar</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Asesoramiento vía email</span>
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/revision-correccion"
                className="block bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar revisión completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Y si el propietario se niega a cambiar el contrato?',
                a: 'Tienes dos opciones: 1) Firmas sabiendo qué cláusulas son nulas (no te afectarán aunque estén escritas), o 2) Buscas otro piso. Si un casero se niega a eliminar cláusulas ilegales, es mala señal.',
              },
              {
                q: '¿Las cláusulas abusivas son nulas aunque las firme?',
                a: 'SÍ. Las cláusulas contrarias a la Ley de Vivienda o LAU son nulas de pleno derecho. Aunque las firmes, no tienen validez legal. Pero es mejor eliminarlas antes para evitar conflictos futuros.',
              },
              {
                q: '¿Puedo usar el informe si voy a juicio?',
                a: 'Sí. El informe es un dictamen jurídico válido. Si el propietario incumple o intenta aplicar cláusulas abusivas, puedes usarlo como prueba en reclamación o juicio.',
              },
              {
                q: '¿Revisáis contratos de alquiler temporal?',
                a: 'Sí, también revisamos temporales, turísticos, de habitación, etc. Los precios son los mismos. La Ley de Vivienda 2026 también aplica a temporales.',
              },
              {
                q: '¿Cuánto tarda la revisión?',
                a: 'Entre 12 y 24 horas laborables. Si es urgente (firmas mañana), podemos hacerlo en 6 horas (consultar disponibilidad por WhatsApp).',
              },
            ].map((item, i) => (
              <details key={i} className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-[#c9962a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Protege tus derechos como inquilino
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Por 39€ evitas pagar cláusulas abusivas que pueden costarte miles de euros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/revision-alquiler"
              className="bg-white text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Revisar mi contrato (39€)
            </Link>
            <a
              href="https://wa.me/34624177966?text=Tengo%20dudas%20sobre%20mi%20contrato%20de%20alquiler"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition shadow-lg border-2 border-white"
            >
              💬 Consulta gratuita (WhatsApp)
            </a>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Servicios relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/gestoria/solicitar/contrato-alquiler" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Redactar contrato LAU</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si eres propietario, te redactamos un contrato legal adaptado a la Ley de Vivienda 2026.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 120€ →</span>
            </Link>
            <Link href="/gestoria" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Más servicios de gestoría</h3>
              <p className="text-gray-600 text-sm mb-3">
                Contratos de arras, compraventa, rescisión y más servicios legales inmobiliarios.
              </p>
              <span className="text-[#c9962a] font-semibold">Ver todos →</span>
            </Link>
            <Link href="/gestoria/contrato-ilegal" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">¿Contrato ilegal?</h3>
              <p className="text-gray-600 text-sm mb-3">
                Te ayudamos a detectar si tu contrato es completamente ilegal o fraudulento.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 29€ →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


