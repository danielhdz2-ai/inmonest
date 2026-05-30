import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría venta piso Madrid — acompañamiento completo',
  description: 'Vendes tu piso en Madrid? Gestor inmobiliario te acompaña desde reserva hasta escritura. Contratos, documentación, asesoramiento completo. 687€ IVA incluido.',
  keywords: 'vender piso Madrid, gestoría venta vivienda Madrid, acompañamiento venta Madrid, contratos venta particular Madrid, asesoría inmobiliaria Madrid',
  alternates: {
    canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/madrid`,
  },
  openGraph: {
    title: 'Gestoría venta piso Madrid — acompañamiento completo',
    description: 'Gestor inmobiliario personalizado en Madrid te acompaña desde reserva hasta escritura. Vende seguro entre particulares. 687€.',
    url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/madrid`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Venta piso Madrid' }],
  },
}

export const revalidate = 86400

export default function VentaCompletaMadridPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Venta en Madrid: Reserva a Escritura',
    description: 'Acompañamiento completo para propietarios que venden su piso en Madrid a particulares. Gestor inmobiliario personalizado, redacción de contratos y asesoramiento hasta escriturar.',
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '687',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: 'Venta Completa', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura` },
      { '@type': 'ListItem', position: 4, name: 'Madrid', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/madrid` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Madrid */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/venta-completa-reserva-escritura" className="hover:text-[#c9962a]">Venta Completa</Link>
            <span>/</span>
            <span className="text-[#c9962a] font-semibold">Madrid</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#c9962a]/20 text-[#a87a20] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#c9962a]/30">
                📍 Servicio en Madrid
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">Vende tu piso en Madrid</span> con acompañamiento completo
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un <strong>gestor inmobiliario especializado en Madrid</strong> te acompaña desde la reserva hasta la escritura. 
                Redactamos contratos, recabamos documentación y te asesoramos en cada paso. 
                <strong> Vende seguro sin agencia en Madrid.</strong>
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Especialistas en Madrid:</strong> Conocemos el mercado inmobiliario madrileño, 
                  la documentación específica de la Comunidad de Madrid y las principales notarías de la capital.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/venta-completa-reserva-escritura"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition text-center shadow-lg"
                >
                  Contratar servicio (687€)
                </Link>
                <a
                  href="tel:+34641008847"
                  className="bg-white border-2 border-[#c9962a] text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#fef9e8] transition text-center shadow flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  641 008 847
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestor en Madrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Conocemos el mercado MAD</span>
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
                src="/keys.jpg"
                alt="Venta piso Madrid con gestor"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-[#c9962a]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏡</div>
                  <div>
                    <div className="font-bold text-gray-900">42 ventas</div>
                    <div className="text-sm text-gray-600">acompañadas en Madrid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Madrid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué necesitas un gestor para vender en Madrid?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Documentación de la Comunidad</h3>
              <p className="text-gray-700">
                En Madrid necesitas certificado de eficiencia energética, cédula de habitabilidad (según municipio), 
                y conocer la normativa específica de la Comunidad de Madrid para transmisiones.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Mercado de alta competencia</h3>
              <p className="text-gray-700">
                Madrid es uno de los mercados más dinámicos de España con operaciones de alto valor. 
                Un error en documentación puede retrasar meses la venta o hacerte perder al comprador.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Plusvalía municipal compleja</h3>
              <p className="text-gray-700">
                La plusvalía municipal en Madrid tiene particularidades. Te asesoramos sobre cómo calcularla, 
                pagarla y si puedes aplicar exenciones o bonificaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Qué incluye el servicio en Madrid
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Todo lo necesario para vender tu piso en Madrid con todas las garantías legales
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Gestor inmobiliario en Madrid
              </h3>
              <p className="text-gray-700">
                Profesional con experiencia en el mercado madrileño que conoce las particularidades de la Comunidad, 
                notarías de todos los distritos y documentación específica de Madrid.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Contratos personalizados
              </h3>
              <p className="text-gray-700">
                Redacción de contratos de reserva y arras cumpliendo con la normativa vigente en Madrid 
                y adaptados a las particularidades de tu operación de venta.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Documentación completa Madrid
              </h3>
              <p className="text-gray-700">
                Te ayudamos con certificado energético, cédula de habitabilidad (si aplica), nota simple del Registro 
                de la Propiedad de Madrid y toda la documentación necesaria para escriturar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Coordinación con notarías MAD
              </h3>
              <p className="text-gray-700">
                Coordinación con notarías de todos los distritos de Madrid: Centro, Chamartín, Salamanca, 
                Chamberí, Retiro, Moncloa o cualquier otro distrito donde quieras escriturar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Asesoramiento fiscal Madrid
              </h3>
              <p className="text-gray-700">
                Información sobre plusvalía municipal del Ayuntamiento de Madrid, IRPF por ganancia patrimonial 
                y las bonificaciones fiscales aplicables en la Comunidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Seguimiento hasta escritura
              </h3>
              <p className="text-gray-700">
                Tu gestor te acompaña durante todo el proceso hasta la firma en notaría. Disponible por teléfono, 
                email y WhatsApp para resolver cualquier duda específica de tu venta en Madrid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Madrid */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vende tu piso en Madrid con todas las garantías
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Gestor inmobiliario en Madrid, contratos personalizados, documentación completa y asesoramiento 
            hasta escriturar. Todo por 687€ IVA incluido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="bg-white text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar ahora (666€)
            </Link>
            <a
              href="tel:+34641008847"
              className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              641 008 847
            </a>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            Sin pagos ocultos • Gestor en Madrid en 24h • IVA incluido
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Otros servicios en Madrid
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/gestoria/madrid"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Gestoría Madrid</h3>
              <p className="text-gray-600 text-sm mb-3">
                Todos los servicios de gestoría inmobiliaria en Madrid.
              </p>
              <div className="text-[#c9962a] font-bold">Ver servicios →</div>
            </Link>

            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Contrato de Arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Solo el contrato de arras penitenciales redactado.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 145€</div>
            </Link>

            <Link
              href="/gestoria/compra-completa-reserva-escritura"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Servicio de Compra</h3>
              <p className="text-gray-600 text-sm mb-3">
                Acompañamiento completo si estás comprando en Madrid.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 666€</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
