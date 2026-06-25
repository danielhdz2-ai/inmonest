import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'
import PageHeroImage from '@/components/PageHeroImage'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'
const PHONE = '745022862'
const PHONE_DISPLAY = '745 022 862'

export const metadata: Metadata = {
  title: 'Vender Piso Sin Inmobiliaria | Gestoría Digital Alternativa 687€',
  description: 'Alternativa legal a las inmobiliarias tradicionales. Vende tu piso de particular a particular con gestor experto online: contratos, legalidad y trámites por 687€. Sin comisiones ni exclusivas.',
  alternates: { canonical: `${BASE_URL}/servicios/vender-piso-sin-inmobiliaria` },
  keywords: 'vender piso sin inmobiliaria, alternativa a las agencias inmobiliarias, gestoria para vender piso particular, como vender una casa sin agencia, venta particular a particular, evitar comisiones inmobiliaria',
  openGraph: {
    title: 'Alternativa Digital a las Inmobiliarias | Inmonest Gestoría',
    description: 'Vende 100% de particular a particular sin comisiones. Gestoría inmobiliaria digital te asigna un experto que se encarga de la legalidad por 687€. Tú controlas la venta, nosotros aseguramos el proceso.',
    url: `${BASE_URL}/servicios/vender-piso-sin-inmobiliaria`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630 }],
  },
}

export default function VenderSinInmobiliariaPage() {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Inmonest Gestoría Inmobiliaria Digital',
    description: 'Alternativa digital a las inmobiliarias tradicionales. Gestoría especializada en ventas de particular a particular con seguridad jurídica total por 687€.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
      telephone: `+34${PHONE}`,
    },
    offers: {
      '@type': 'Offer',
      price: '687',
      priceCurrency: 'EUR',
      description: 'Servicio completo de gestoría para venta sin inmobiliaria: gestor asignado, contratos legales, tramitación y acompañamiento hasta escritura',
      priceValidUntil: '2027-12-31',
    },
    areaServed: {
      '@type': 'Country',
      name: 'España'
    }
  })

  const comparisonSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ComparisonTable',
    about: {
      '@type': 'Product',
      name: 'Servicio de venta de vivienda'
    },
    items: [
      {
        '@type': 'Product',
        name: 'Inmobiliaria Tradicional',
        offers: {
          '@type': 'Offer',
          price: '18150',
          priceCurrency: 'EUR',
          description: 'Comisión 5% + IVA sobre 300.000€'
        }
      },
      {
        '@type': 'Product',
        name: 'Inmonest Gestoría Digital',
        offers: {
          '@type': 'Offer',
          price: '687',
          priceCurrency: 'EUR',
          description: 'Tarifa plana todo incluido'
        }
      }
    ]
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo vender una casa sin agencia inmobiliaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes vender de particular a particular contratando una gestoría inmobiliaria como Inmonest. Por 687€ te asignan un gestor experto que redacta contratos, tramita documentación y te acompaña hasta la escritura, dándote la misma seguridad jurídica que una inmobiliaria pero sin comisiones abusivas.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué es una gestoría inmobiliaria digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es la alternativa moderna a las inmobiliarias tradicionales. En lugar de un local físico y comisiones altas, trabajas online con un gestor asignado que se encarga solo de lo legal (contratos, documentación, coordinación notaría) por una tarifa plana. Tú buscas comprador y controlas la venta, nosotros aseguramos que todo sea legal.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Es seguro vender sin inmobiliaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, con asesoramiento legal adecuado. El riesgo no está en prescindir de la inmobiliaria, sino en hacerlo sin contratos profesionales. Con Inmonest tienes la seguridad jurídica de un experto revisando cada documento por solo 687€, ahorrando más de 17.000€ en comisiones.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuánto cobran las inmobiliarias por vender un piso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Entre 5% y 6% + IVA del precio de venta. En un piso de 300.000€ pagas entre 15.000€ y 18.150€. Con Inmonest pagas solo 687€ por el mismo servicio legal, ahorrando más de 17.000€.'
        }
      }
    ]
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <PageHeroImage
          src="/inmonestexterior.png"
          alt="Vende tu piso{' '} 100% de particular a particular Sin comisiones. Sin exclusivas."
          className="mb-12"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: comparisonSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            HERO - Copy Transaccional Core
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative bg-gradient-to-br from-[#0f0a05] via-[#1f1410] to-[#0f0a05] pt-32 pb-24 px-4 overflow-hidden">
          {/* Geometric background */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Badge destacado */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a84c]/20 to-[#f4c94a]/20 border border-[#c9a84c]/60 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl">
                <span className="text-2xl">⚖️</span>
                <span className="font-bold text-sm uppercase tracking-wide">Alternativa Legal a las Inmobiliarias</span>
              </div>
            </div>

            {/* H1 Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white text-center mb-8 leading-[1.1]">
              Vende tu piso{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#f4c94a]">
                100% de particular a particular
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-white/90">
                Sin comisiones. Sin exclusivas.
              </span>
            </h1>

            {/* Copy Core */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-white/90 text-center leading-relaxed font-medium">
                <strong className="text-[#c9a84c] font-bold">Inmonest Gestoría Inmobiliaria</strong> es la alternativa digital 
                a las inmobiliarias tradicionales: <strong className="text-white">te asignamos un gestor experto online</strong> que 
                se encarga de la legalidad, contratos y trámites de tu venta por una{' '}
                <strong className="text-[#f4c94a]">tarifa plana de 687€</strong>.
              </p>
              <p className="text-lg text-white/70 text-center mt-4 italic">
                Tú controlas la venta, nosotros aseguramos el proceso.
              </p>
            </div>

            {/* CTA doble */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:+34${PHONE}`}
                className="group inline-flex items-center justify-center gap-3 bg-[#c9a84c] hover:bg-[#f4c94a] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105 hover:shadow-[#c9a84c]/50 border-2 border-[#f4c94a]/30"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Consulta Gratuita: {PHONE_DISPLAY}</span>
              </a>
              <a
                href="#comparativa"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-5 rounded-2xl font-semibold text-lg transition-all"
              >
                Ver comparativa con inmobiliarias →
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { icon: '✓', title: 'Contratos Legales', desc: 'Redactados por expertos' },
                { icon: '🛡️', title: 'Seguridad Jurídica', desc: 'Misma protección, 96% más barato' },
                { icon: '⚡', title: 'Sin Exclusivas', desc: 'Libertad total de venta' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            COMPARATIVA: Inmobiliaria vs Gestoría Digital
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="comparativa" className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                ¿Por qué pagar <span className="text-red-600">18.150€</span> a una inmobiliaria<br />
                cuando puedes tener <span className="text-[#c9a84c]">lo mismo por 687€</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comparativa real para un piso de <strong>300.000€</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Inmobiliaria Tradicional */}
              <div className="bg-white border-4 border-red-200 rounded-3xl p-8 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                  MODELO OBSOLETO
                </div>
                <div className="text-center mt-4 mb-6">
                  <div className="text-5xl mb-3">🏢</div>
                  <h3 className="text-2xl font-bold text-gray-900">Inmobiliaria Tradicional</h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Comisión 5% + IVA</p>
                      <p className="text-sm text-gray-600">= 18.150€ en piso de 300k</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Contrato de exclusiva obligatorio</p>
                      <p className="text-sm text-gray-600">No puedes vender por tu cuenta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-xl">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900">Costes operativos inflados</p>
                      <p className="text-sm text-gray-600">Local físico, comisiones vendedores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold text-xl">~</span>
                    <div>
                      <p className="font-semibold text-gray-900">Búsqueda de comprador</p>
                      <p className="text-sm text-gray-600">Servicio principal que pagas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Contratos y legalidad</p>
                      <p className="text-sm text-gray-600">Incluido en la comisión</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Coste total</p>
                  <p className="text-4xl font-black text-red-600">18.150€</p>
                </div>
              </div>

              {/* Gestoría Digital Inmonest */}
              <div className="bg-gradient-to-br from-[#c9a84c] to-[#a87a20] border-4 border-[#f4c94a] rounded-3xl p-8 relative shadow-2xl transform scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  RECOMENDADO ⭐
                </div>
                <div className="text-center mt-4 mb-6">
                  <div className="text-5xl mb-3">💻</div>
                  <h3 className="text-2xl font-bold text-white">Inmonest Gestoría Digital</h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-green-300 font-bold text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-white">Tarifa plana 687€</p>
                      <p className="text-sm text-white/80">Sin sorpresas, todo incluido</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-300 font-bold text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-white">Sin exclusivas ni ataduras</p>
                      <p className="text-sm text-white/80">Libertad total para vender</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-300 font-bold text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-white">Modelo digital eficiente</p>
                      <p className="text-sm text-white/80">Sin costes de local ni intermediarios</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white/50 font-bold text-xl">○</span>
                    <div>
                      <p className="font-semibold text-white">Búsqueda de comprador</p>
                      <p className="text-sm text-white/80">La haces tú (portales, contactos)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-300 font-bold text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-white">Contratos y legalidad profesional</p>
                      <p className="text-sm text-white/80">Gestor experto asignado</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 text-center shadow-xl">
                  <p className="text-sm text-gray-600 mb-1">Coste total</p>
                  <p className="text-4xl font-black text-[#c9a84c]">687€</p>
                  <p className="text-xs text-green-600 font-bold mt-2">↓ AHORRO: 17.484€</p>
                </div>
              </div>
            </div>

            {/* Insight clave */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="text-4xl shrink-0">💡</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">La verdad que las inmobiliarias no quieren que sepas</h3>
                    <p className="text-lg leading-relaxed text-white/90">
                      Si <strong>ya tienes comprador</strong> (familiar, conocido, portal inmobiliario), 
                      <strong> no necesitas pagar 18.000€ por captación</strong>. Solo necesitas 
                      <strong> seguridad jurídica en contratos y tramitación</strong>, que cuesta 687€.
                      El resto es <span className="underline decoration-yellow-300">margen puro</span> de la inmobiliaria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            QUÉ INCLUYE EL SERVICIO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Qué incluye el servicio de 687€
              </h2>
              <p className="text-xl text-gray-600">
                Tu gestor personal se encarga de todo lo legal
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '👤',
                  title: 'Gestor Inmobiliario Asignado',
                  desc: 'Un experto en derecho inmobiliario te acompaña durante todo el proceso. Consultas ilimitadas por email/teléfono.'
                },
                {
                  icon: '📝',
                  title: 'Contrato de Reserva + Arras',
                  desc: 'Redacción profesional de contrato de reserva y arras penitenciales. Protegemos tu señal legalmente.'
                },
                {
                  icon: '📄',
                  title: 'Documentación Completa',
                  desc: 'Te ayudamos a recabar: nota simple, IBI, certificado energético, cédula de habitabilidad, estatutos comunidad.'
                },
                {
                  icon: '⚖️',
                  title: 'Asesoramiento Legal Continuo',
                  desc: 'Revisión de documentación del comprador, resolución de dudas, detección de problemas antes de firmar.'
                },
                {
                  icon: '🏛️',
                  title: 'Coordinación con Notaría',
                  desc: 'Gestionamos cita, preparamos documentación y revisamos borrador de escritura pública.'
                },
                {
                  icon: '🤝',
                  title: 'Acompañamiento hasta Escritura',
                  desc: 'Estamos contigo hasta el final. Aseguramos que la compraventa sea 100% legal y sin sorpresas.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#c9a84c] hover:shadow-xl transition-all">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`tel:+34${PHONE}`}
                className="inline-flex items-center gap-3 bg-[#c9a84c] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#a87a20] transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Consulta Gratuita: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            PROCESO PASO A PASO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Cómo funciona el proceso
              </h2>
              <p className="text-xl text-white/80">
                Simple, transparente y sin letra pequeña
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Tú encuentras al comprador',
                  desc: 'Publica en Idealista, Fotocasa, redes sociales o contactos directos. Nosotros NO buscamos comprador (por eso no cobramos comisión).',
                  bg: 'from-blue-600 to-indigo-700'
                },
                {
                  step: '2',
                  title: 'Contactas con nosotros',
                  desc: 'Llamada o WhatsApp gratuito. Te explicamos el proceso y resolvemos tus dudas sin compromiso.',
                  bg: 'from-purple-600 to-pink-600'
                },
                {
                  step: '3',
                  title: 'Contratas el servicio (687€)',
                  desc: 'Pago seguro online. Se te asigna un gestor personal que te contacta en menos de 24h.',
                  bg: 'from-[#c9a84c] to-[#a87a20]'
                },
                {
                  step: '4',
                  title: 'Redacción de contrato de reserva',
                  desc: 'Tu gestor prepara el contrato de reserva y arras adaptado a tu caso. Lo firmas con el comprador para asegurar la operación.',
                  bg: 'from-green-600 to-emerald-700'
                },
                {
                  step: '5',
                  title: 'Tramitación y documentación',
                  desc: 'Te ayudamos a reunir toda la documentación necesaria y revisamos los papeles del comprador.',
                  bg: 'from-orange-600 to-red-600'
                },
                {
                  step: '6',
                  title: 'Escritura pública en notaría',
                  desc: 'Coordinamos la cita, preparamos documentación y te acompañamos hasta la firma. Cobras y entregamos llaves.',
                  bg: 'from-teal-600 to-cyan-700'
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-black text-2xl">{item.step}</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FAQs
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: '¿Cómo vender una casa sin agencia inmobiliaria?',
                  a: 'Puedes vender de particular a particular contratando una gestoría inmobiliaria como Inmonest. Por 687€ te asignan un gestor experto que redacta contratos, tramita documentación y te acompaña hasta la escritura, dándote la misma seguridad jurídica que una inmobiliaria pero sin comisiones abusivas.'
                },
                {
                  q: '¿Qué es una gestoría inmobiliaria digital?',
                  a: 'Es la alternativa moderna a las inmobiliarias tradicionales. En lugar de un local físico y comisiones altas, trabajas online con un gestor asignado que se encarga solo de lo legal (contratos, documentación, coordinación notaría) por una tarifa plana. Tú buscas comprador y controlas la venta, nosotros aseguramos que todo sea legal.'
                },
                {
                  q: '¿Es seguro vender sin inmobiliaria?',
                  a: 'Sí, con asesoramiento legal adecuado. El riesgo no está en prescindir de la inmobiliaria, sino en hacerlo sin contratos profesionales. Con Inmonest tienes la seguridad jurídica de un experto revisando cada documento por solo 687€, ahorrando más de 17.000€ en comisiones.'
                },
                {
                  q: '¿Cuánto cobran las inmobiliarias por vender un piso?',
                  a: 'Entre 5% y 6% + IVA del precio de venta. En un piso de 300.000€ pagas entre 15.000€ y 18.150€. Con Inmonest pagas solo 687€ por el mismo servicio legal, ahorrando más de 17.000€.'
                },
                {
                  q: '¿Necesito tener comprador antes de contratar?',
                  a: 'No necesariamente. Puedes contratar en cualquier momento: antes de publicar (para tener asesoramiento desde el inicio), cuando tengas visitas serias o cuando ya tengas comprador confirmado. El gestor te acompaña en la fase que necesites.'
                },
                {
                  q: '¿El servicio incluye publicar el anuncio?',
                  a: 'No. Nosotros nos encargamos SOLO de la parte legal y tramitación. Tú publicas en Idealista, Fotocasa o donde quieras (cuesta 30-50€/mes). Nuestra misión es asegurar que la venta sea 100% legal, no buscar comprador.'
                },
                {
                  q: '¿Trabajan en toda España?',
                  a: 'Sí, al ser gestoría digital trabajamos en toda España. Contratos, tramitación y coordinación con notarías locales sin importar dónde esté tu piso.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#c9a84c] hover:shadow-xl transition-all">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GestorContactBanner whatsappMessage="Hola, quiero vender mi piso sin inmobiliaria y necesito información" />
        <TestimoniosSection landing="vender-sin-inmobiliaria" />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            CTA FINAL
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="py-24 px-4 bg-gradient-to-br from-[#c9a84c] via-[#a87a20] to-[#8b6518]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿Listo para ahorrarte más de 17.000€?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Consulta gratuita sin compromiso. Te explicamos cómo vender de particular a particular 
              con total seguridad jurídica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+34${PHONE}`}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#c9a84c] px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar Ahora: {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/34${PHONE}?text=${encodeURIComponent('Hola, quiero información sobre cómo vender mi piso sin inmobiliaria con Inmonest Gestoría')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-green-700 transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <p className="text-white/70 text-sm mt-8">
              No compartimos tu información. Sin spam. Sin compromiso.
            </p>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  )
}
