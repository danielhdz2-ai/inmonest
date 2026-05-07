import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Revisión de Contrato de Arras 【DESDE 45€】 Abogado Especializado | Inmonest',
  description: '¿Te han dado un contrato de arras y no te fías? Abogados inmobiliarios lo revisan en 24h. Detectamos cláusulas abusivas, errores y te protegemos. Desde 45€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/revision-contrato-arras`,
  },
  openGraph: {
    title: 'Revisión de Contrato de Arras por Abogados — Inmonest',
    description: 'No firmes sin revisión legal. Detectamos cláusulas abusivas, errores registrales y condiciones perjudiciales. 24h. Desde 45€.',
    url: `${BASE_URL}/gestoria/revision-contrato-arras`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630, alt: 'Revisión de contrato de arras por abogado' }],
  },
}

export const revalidate = 3600

export default function RevisionContratosArrasPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Revisión de Contrato de Arras',
    description: 'Revisión legal de contratos de arras por abogados especializados en derecho inmobiliario. Detectamos cláusulas abusivas y errores. Entrega en 24h.',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '187',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚠️ No firmes sin revisión legal
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Te han dado un <span className="text-[#c9962a]">contrato de arras</span> y no te fías?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un abogado especializado lo revisa en <strong>24 horas</strong>. Detectamos cláusulas abusivas, 
                errores registrales y condiciones que te perjudican.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/revision-arras"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  Revisar mi contrato ahora (45€)
                </Link>
                <a
                  href="https://wa.me/34624177966?text=Hola,%20necesito%20revisar%20un%20contrato%20de%20arras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
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
                  <span>Abogados especializados</span>
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
                src="/gestoria1.jpg"
                alt="Abogado revisando contrato de arras"
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
                    <div className="text-sm text-gray-600">187 revisiones</div>
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
            ¿Por qué necesitas revisar tu contrato de arras?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cláusulas abusivas</h3>
              <p className="text-gray-700">
                Muchos contratos incluyen cláusulas que favorecen solo al vendedor o a la agencia, 
                dejándote sin protección legal si algo sale mal.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Errores en datos registrales</h3>
              <p className="text-gray-700">
                Metros cuadrados incorrectos, cargas ocultas, o datos del vendedor equivocados 
                pueden invalidar tu compra o costarte miles de euros.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Penalizaciones desproporcionadas</h3>
              <p className="text-gray-700">
                Si no puedes seguir con la compra, algunas cláusulas te obligan a pagar 
                penalizaciones excesivas o perder toda tu señal sin justificación.
              </p>
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
            Nuestros abogados analizan <strong>cada cláusula</strong> para protegerte de problemas futuros
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '🏠',
                title: 'Identificación del inmueble',
                desc: 'Verificamos que los metros cuadrados, referencia catastral, linderos y datos registrales coincidan con la realidad y la nota simple.',
              },
              {
                icon: '👤',
                title: 'Legitimación del vendedor',
                desc: 'Comprobamos que quien firma tiene capacidad legal para vender y que no hay copropietarios o herederos que puedan reclamar.',
              },
              {
                icon: '💰',
                title: 'Precio y forma de pago',
                desc: 'Revisamos que el precio total, la señal, y los plazos estén correctamente especificados y sean justos para ambas partes.',
              },
              {
                icon: '📅',
                title: 'Plazos y condiciones',
                desc: 'Analizamos los plazos de firma de escritura, condiciones resolutorias, y si hay margen razonable para gestionar hipoteca.',
              },
              {
                icon: '⚖️',
                title: 'Cláusulas penales',
                desc: 'Verificamos que las penalizaciones por incumplimiento sean proporcionadas y no abusivas según jurisprudencia.',
              },
              {
                icon: '🔍',
                title: 'Cargas y gravámenes',
                desc: 'Comprobamos que el vendedor declare todas las cargas, hipotecas, embargos o servidumbres que afecten al inmueble.',
              },
              {
                icon: '📝',
                title: 'Tipo de arras',
                desc: 'Identificamos si son penitenciales, confirmatorias o penales, y si se ajustan a lo que realmente quieres pactar.',
              },
              {
                icon: '🛡️',
                title: 'Protección del comprador',
                desc: 'Añadimos cláusulas de protección: resolución si no se consigue hipoteca, vicios ocultos, IBI impagado, etc.',
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
                desc: 'Sube el PDF del contrato de arras que te han dado. También puedes enviar la nota simple del inmueble si la tienes.',
                time: '2 minutos',
              },
              {
                step: '2',
                title: 'Abogado especializado lo revisa',
                desc: 'Un abogado inmobiliario analiza cada cláusula, verifica datos registrales, y detecta riesgos o condiciones abusivas.',
                time: '12-24 horas',
              },
              {
                step: '3',
                title: 'Recibes informe detallado',
                desc: 'Te enviamos un informe en PDF con: errores detectados, cláusulas peligrosas, recomendaciones y versión corregida del contrato.',
                time: 'Inmediato',
              },
              {
                step: '4',
                title: 'Firmas con seguridad',
                desc: 'Vas a la firma sabiendo exactamente qué estás firmando, con propuestas de modificación y argumentos legales.',
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

      {/* Testimonios */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Casos reales que hemos evitado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "El contrato tenía los metros cuadrados mal (ponía 85m² y eran 68m²). 
                Me ahorraron un disgusto enorme. Cancelé la compra a tiempo."
              </p>
              <div className="text-sm font-semibold text-gray-900">Laura M., Barcelona</div>
              <div className="text-xs text-gray-500">Marzo 2026</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Detectaron una cláusula que me obligaba a pagar 20.000€ si no conseguía hipoteca. 
                La eliminamos antes de firmar. Servicio impecable."
              </p>
              <div className="text-sm font-semibold text-gray-900">Carlos R., Madrid</div>
              <div className="text-xs text-gray-500">Abril 2026</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "El vendedor no era el único propietario y no lo ponía en el contrato. 
                Gracias a la revisión evité un problema legal gravísimo."
              </p>
              <div className="text-sm font-semibold text-gray-900">Ana P., Valencia</div>
              <div className="text-xs text-gray-500">Mayo 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Revisión profesional desde 45€
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Mucho más barato que un error de 10.000€ en tu contrato
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Revisión Básica</h3>
              <div className="text-5xl font-bold text-[#c9962a] mb-2">45€</div>
              <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revisión de cláusulas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detección de errores</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Informe en PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Entrega en 24h</span>
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/revision-arras"
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
              <div className="text-5xl font-bold text-[#c9962a] mb-2">89€</div>
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
                href="/gestoria/solicitar/revision-correccion-arras"
                className="block bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar revisión completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Cuánto tarda la revisión?',
                a: 'Entre 12 y 24 horas laborables desde que subes el contrato. Si es urgente, podemos hacerlo en menos de 6 horas (consultar disponibilidad por WhatsApp).',
              },
              {
                q: '¿Qué pasa si encuentran errores graves?',
                a: 'Te enviamos un informe detallado explicando los errores, el riesgo que suponen, y recomendaciones concretas. Si contratas la revisión completa (89€), te damos la versión corregida y argumentos legales para negociar con el vendedor.',
              },
              {
                q: '¿Puedo usar el informe para cancelar la compra?',
                a: 'Sí. Si detectamos irregularidades graves (datos erróneos, cargas ocultas, vendedor sin legitimación), el informe es válido legalmente para justificar la no firma y recuperar cualquier señal entregada.',
              },
              {
                q: '¿Revisáis la nota simple del inmueble?',
                a: 'Sí, si la aportas. Verificamos que los datos del contrato coincidan con el Registro de la Propiedad. Si no la tienes, podemos pedirla nosotros por 15€ adicionales.',
              },
              {
                q: '¿Y si el vendedor se niega a cambiar el contrato?',
                a: 'Te damos argumentos legales y jurisprudencia para defender tus derechos. Si aún así se niega, es una señal de alerta: mejor no comprar un piso a alguien que no acepta condiciones justas.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white p-6 rounded-lg shadow-sm">
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
            No arriesgues tu dinero. Revisa tu contrato antes de firmar.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Desde 45€ puedes dormir tranquilo sabiendo que un abogado ha revisado cada cláusula.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/revision-arras"
              className="bg-white text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Revisar mi contrato (45€)
            </Link>
            <a
              href="https://wa.me/34624177966?text=Hola,%20necesito%20revisar%20un%20contrato%20de%20arras%20urgente"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition shadow-lg border-2 border-white"
            >
              💬 Consulta urgente (WhatsApp)
            </a>
          </div>
          <p className="mt-6 text-sm opacity-75">
            📧 También puedes escribirnos a: info@inmonest.com
          </p>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Servicios relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/gestoria/arras-penitenciales" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Redactar contrato de arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si necesitas un contrato desde cero, lo redactamos personalizado en 48h.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 145€ →</span>
            </Link>
            <Link href="/gestoria/nota-simple" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Pedir nota simple</h3>
              <p className="text-gray-600 text-sm mb-3">
                Nota simple registral oficial en 24h. Imprescindible antes de comprar.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 15€ →</span>
            </Link>
            <Link href="/gestoria/contrato-compraventa" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Contrato de compraventa</h3>
              <p className="text-gray-600 text-sm mb-3">
                Para la escritura definitiva ante notario. Redacción legal completa.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 195€ →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


