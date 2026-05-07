import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Asesoría Legal Compra Piso 【DESDE 95€】 No confías en la agencia? | Inmonest',
  description: '¿Compras piso y no te fías de la agencia? Abogado independiente te asesora. Revisamos contratos, nota simple, hipoteca, escrituras. Desde 95€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/asesoria-compra-piso`,
  },
  openGraph: {
    title: 'Asesoría Legal para Compra de Piso — Inmonest',
    description: 'Abogado independiente que te asesora en tu compra. No dependas solo de la agencia. Revisamos todo: arras, nota simple, hipoteca. Desde 95€.',
    url: `${BASE_URL}/gestoria/asesoria-compra-piso`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/imagenes/gestoria6.jpg`, width: 1200, height: 630, alt: 'Asesoría legal compra piso' }],
  },
}

export const revalidate = 3600

export default function AsesoriaCompraPisoPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Asesoría Legal para Compra de Piso',
    description: 'Asesoramiento legal completo para compra de vivienda. Abogado independiente revisa contratos, nota simple, condiciones de hipoteca, y te acompaña en todo el proceso.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '95',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '156',
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🛡️ Protección legal independiente
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Compras piso y <span className="text-[#c9962a]">no te fías de la agencia</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un <strong>abogado independiente</strong> te asesora durante toda la compra. Revisamos arras, 
                nota simple, hipoteca, escrituras y te acompañamos hasta la firma. 
                <strong> Tu defensa legal frente a vendedor y agencia.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/asesoria-compra"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  Contratar asesoría (95€)
                </Link>
                <a
                  href="https://wa.me/34624177966?text=Hola,%20estoy%20comprando%20piso%20y%20necesito%20asesor%C3%ADa%20legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition text-center shadow-lg"
                >
                  💬 WhatsApp directo
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Abogado a tu lado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% independiente</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/imagenes/gestoria6.jpg"
                alt="Abogado asesorando compra de piso"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">compras asesoradas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué lo necesitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué necesitas un abogado independiente?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">La agencia NO te representa a ti</h3>
              <p className="text-gray-700">
                La agencia cobra comisión del vendedor. Su interés es que compres rápido, 
                no que compres bien. Necesitas alguien que defienda TUS intereses.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Evita errores de 10.000€+</h3>
              <p className="text-gray-700">
                Cláusulas abusivas, metros cuadrados incorrectos, cargas ocultas, hipotecas mal negociadas. 
                Un error te puede costar años de ahorros.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Negociación profesional</h3>
              <p className="text-gray-700">
                Un abogado sabe qué pedir, cómo negociar precio, condiciones de arras, 
                plazos de hipoteca. No vas solo contra vendedor y agencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye la asesoría completa?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Análisis inicial del piso</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión de anuncio, precio de mercado, fotos, documentación inicial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Solicitud y análisis de nota simple registral (incluida en precio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Verificación de propietario, cargas, hipotecas, embargos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Informe de riesgos detectados y recomendaciones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Revisión contrato de arras</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Análisis completo de cláusulas, condiciones, plazos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Detección de cláusulas abusivas o perjudiciales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Propuesta de modificaciones y mejoras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Negociación con vendedor/agencia en tu nombre</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Asesoramiento hipoteca</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión oferta vinculante del banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Análisis de comisiones, seguros obligatorios, vinculaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Comparativa con otras ofertas del mercado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Detección de cláusulas suelo, IRPH, comisiones abusivas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Acompañamiento hasta firma</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asesoramiento vía email/WhatsApp durante todo el proceso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión de escritura de compraventa antes de notario</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Checklist de verificaciones previas a la firma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Opcional: acompañamiento presencial en notaría (+150€)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Problemas que hemos detectado y solucionado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Ahorro de 8.500€ en hipoteca</h3>
              <p className="text-gray-700 text-sm mb-3">
                Cliente iba a firmar hipoteca con comisión de apertura del 1,5% + seguro de vida obligatorio caro. 
                Negociamos: 0% comisión + seguro externo. Ahorro: 8.500€.
              </p>
              <div className="text-green-700 font-semibold text-sm">Barcelona, marzo 2026</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="text-4xl mb-3">📐</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Detectamos 12m² menos</h3>
              <p className="text-gray-700 text-sm mb-3">
                Anuncio decía 78m². Nota simple registral: 66m². Diferencia: 12m² × 3.000€/m² = 36.000€ de sobreprecio. 
                Renegociamos precio o cancelación.
              </p>
              <div className="text-green-700 font-semibold text-sm">Madrid, abril 2026</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Evitamos compra con okupa</h3>
              <p className="text-gray-700 text-sm mb-3">
                Vendedor ocultaba que había inquilino moroso de hace 2 años (okupa de facto). 
                Cliente habría heredado el problema. Cancelamos compra a tiempo.
              </p>
              <div className="text-green-700 font-semibold text-sm">Valencia, mayo 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "La agencia me presionaba para firmar rápido. El abogado detectó que el piso 
                tenía una hipoteca de 120.000€ sin saldar. Me salvó de un desastre."
              </p>
              <div className="text-sm font-semibold text-gray-900">Roberto M.</div>
              <div className="text-xs text-gray-500">Compró piso en Madrid</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Iba a pagar 250.000€ por 85m². La nota simple decía 72m². Renegociamos a 220.000€. 
                La asesoría se pagó sola 300 veces."
              </p>
              <div className="text-sm font-semibold text-gray-900">Elena G.</div>
              <div className="text-xs text-gray-500">Compró piso en Barcelona</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-2xl mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Tener un abogado a mi lado me dio tranquilidad total. Revisó todo: arras, hipoteca, 
                escritura. Compré sabiendo exactamente en qué me metía."
              </p>
              <div className="text-sm font-semibold text-gray-900">Javier L.</div>
              <div className="text-xs text-gray-500">Compró piso en Valencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Asesoría completa desde 95€
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Mucho más barato que un error de 30.000€ en tu compra
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Asesoría Básica</h3>
              <div className="text-5xl font-bold text-[#c9962a] mb-2">95€</div>
              <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Nota simple + análisis completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revisión contrato arras</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Informe de riesgos en PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Asesoramiento vía email</span>
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/asesoria-compra-basica"
                className="block bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Contratar asesoría básica
              </Link>
            </div>
            <div className="border-2 border-purple-600 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#c9962a] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más completo
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Asesoría Premium</h3>
              <div className="text-5xl font-bold text-[#c9962a] mb-2">195€</div>
              <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>Todo lo anterior +</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revisión oferta hipoteca</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Negociación con vendedor/banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revisión escritura compraventa</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Soporte WhatsApp hasta firma</span>
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/asesoria-compra-premium"
                className="block bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Contratar asesoría premium
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
                q: '¿Cuándo debo contratar la asesoría?',
                a: 'Lo ideal es ANTES de firmar arras. Así revisamos todo desde el principio y evitamos problemas. Pero también asesoramos si ya firmaste arras y estás en proceso de hipoteca o escritura.',
              },
              {
                q: '¿El abogado negocia en mi nombre?',
                a: 'Sí, en la asesoría premium negociamos directamente con vendedor, agencia o banco. Te representamos legalmente y defendemos tus intereses.',
              },
              {
                q: '¿Incluye el acompañamiento a la notaría?',
                a: 'No está incluido en el precio base, pero podemos acompañarte presencialmente a la firma por +150€. Revisamos la escritura antes y durante la firma.',
              },
              {
                q: '¿Qué pasa si detectáis un problema grave?',
                a: 'Te damos informe detallado con opciones: 1) Renegociar condiciones, 2) Cancelar compra y recuperar arras si procede, 3) Continuar asumiendo el riesgo (con conocimiento).',
              },
              {
                q: '¿Trabajáis con hipotecas de cualquier banco?',
                a: 'Sí, revisamos ofertas de cualquier banco: BBVA, Santander, CaixaBank, Sabadell, ING, etc. Somos independientes, no cobramos comisión de bancos.',
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
            No compres solo. Compra con un abogado a tu lado.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Por 95€ evitas errores que pueden costarte 30.000€ o más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/asesoria-compra"
              className="bg-white text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar asesoría (95€)
            </Link>
            <a
              href="https://wa.me/34624177966?text=Hola,%20necesito%20asesoramiento%20para%20comprar%20un%20piso"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg border-2 border-white"
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
            <Link href="/gestoria/revision-contrato-arras" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Revisión contrato de arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si solo necesitas revisar el contrato de arras que te han dado, desde 45€.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 45€ →</span>
            </Link>
            <Link href="/gestoria/nota-simple" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Pedir nota simple</h3>
              <p className="text-gray-600 text-sm mb-3">
                Nota simple registral oficial en 24h. Imprescindible antes de cualquier compra.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 15€ →</span>
            </Link>
            <Link href="/gestoria/contrato-compraventa" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Redactar compraventa</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si compras de particular a particular sin agencia, te redactamos el contrato completo.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 195€ →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
