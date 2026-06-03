import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Due Diligence Pre-Compra Madrid | Gestor Revisa Todo Antes de Comprar',
  description: '¿Compras piso en Madrid de particular? Gestor experto revisa toda la documentación hasta escritura: cargas, deudas, hipotecas, cédula habitabilidad. Evita sorpresas. 350€.',
  keywords: 'due diligence inmobiliaria madrid, revisar documentacion compra piso, gestor compra vivienda madrid, evitar estafa compra piso, comprar piso particular madrid, revision juridica vivienda',
  alternates: {
    canonical: `${BASE_URL}/gestoria/due-diligence-precompra/madrid`,
  },
  openGraph: {
    title: 'Due Diligence Pre-Compra Madrid — Gestor Experto Revisa Todo',
    description: 'Gestor inmobiliario experto revisa toda la documentación de la vivienda que vas a comprar en Madrid. Evita sorpresas y riesgos. 350€.',
    url: `${BASE_URL}/gestoria/due-diligence-precompra/madrid`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Due Diligence Pre-Compra Madrid' }],
  },
}

export const revalidate = 86400

export default function DueDiligenceMadridPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pack Due Diligence Pre-Compra en Madrid',
    description: 'Servicio de revisión exhaustiva de documentación de vivienda antes de la compra. Gestor inmobiliario experto analiza cargas, deudas, hipotecas, nota simple, cédula de habitabilidad y documentación técnica hasta el día de escritura pública.',
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
      price: '350',
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
      { '@type': 'ListItem', position: 4, name: 'Madrid', item: `${BASE_URL}/gestoria/due-diligence-precompra/madrid` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <span className="text-[#c9962a] font-semibold">Due Diligence Madrid</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-red-200">
                ⚠️ Evita sorpresas en tu compra
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Compras piso de <span className="text-[#c9962a]">particular a particular en Madrid</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                <strong>Un gestor inmobiliario experto revisa TODA la documentación</strong> de la vivienda que vas a comprar: cargas, deudas, hipotecas, IBI, comunidad, cédula de habitabilidad, ITE, certificado energético... <strong className="text-red-600">Evita sorpresas de 10.000€+ el día de la escritura.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/gestoria/solicitar/pack-due-diligence-precompra"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
                >
                  Contratar servicio (350€) →
                </Link>
                <a
                  href="tel:+34641008847"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#c9962a] text-[#c9962a] font-semibold hover:bg-[#c9962a] hover:text-white transition-colors"
                >
                  📞 Llamar: 641 008 847
                </a>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Gestor asignado
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Hasta escritura
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Informe completo
                </span>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/keys.jpg"
                alt="Due Diligence compra piso Madrid"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            ¿Qué revisamos en el Due Diligence?
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Nuestro gestor experto analiza <strong>TODOS los documentos clave</strong> para que compres con total seguridad
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-sm">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nota Simple Registral</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Verificación de titularidad real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Cargas y gravámenes (hipotecas, embargos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Anotaciones preventivas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Concordancia con catastro</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 shadow-sm">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidad de Propietarios</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Deudas pendientes con la comunidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Derramas extraordinarias aprobadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Estatutos y normas internas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Actas de juntas recientes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impuestos y Suministros</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>IBI (Impuesto Bienes Inmuebles) al día</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Suministros (luz, agua, gas) sin deudas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Plusvalía municipal (si aplica)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Tasa de basuras</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-sm">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Documentación Técnica</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Cédula de habitabilidad vigente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Certificado energético (obligatorio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>ITE (Inspección Técnica del Edificio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Licencias de obra (si ha habido reformas)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ¿Cómo funciona el servicio?
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9962a] text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contratas el servicio</h3>
                <p className="text-gray-600">
                  Pagas 350€ y te asignamos un <strong>gestor inmobiliario experto en Madrid</strong>. Te contactará en menos de 24h.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9962a] text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recopilamos documentación</h3>
                <p className="text-gray-600">
                  Tu gestor te pide la documentación que tenga el vendedor y solicita él mismo <strong>nota simple, certificados y toda la documentación oficial</strong> necesaria.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9962a] text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Análisis exhaustivo</h3>
                <p className="text-gray-600">
                  El gestor <strong>revisa TODO</strong>: cargas, deudas, hipotecas, comunidad, IBI, suministros, cédula, ITE, certificado energético... Detecta cualquier problema ANTES de firmar.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9962a] text-white flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Informe completo + Acompañamiento</h3>
                <p className="text-gray-600">
                  Recibes un <strong>informe detallado</strong> con todos los hallazgos y recomendaciones. Tu gestor te acompaña hasta el día de la escritura resolviendo dudas y verificando que todo esté correcto.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-blue-900 font-semibold mb-2">💡 Tranquilidad absoluta</p>
            <p className="text-blue-800">
              Compras con total seguridad sabiendo que <strong>un profesional experto ha verificado que no hay sorpresas ocultas</strong> que puedan costarte miles de euros después.
            </p>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ¿Para quién es este servicio?
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
              <p className="text-lg">
                ✅ <strong>Compras de particular a particular</strong> sin agencia ni inmobiliaria
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
              <p className="text-lg">
                ✅ <strong>Ya tienes contrato de arras firmado</strong> y quieres asegurarte antes de escriturar
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
              <p className="text-lg">
                ✅ <strong>Quieres evitar sorpresas</strong> el día de la escritura (deudas, cargas ocultas, problemas legales)
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
              <p className="text-lg">
                ✅ <strong>Primera vez que compras</strong> y no sabes qué documentación revisar
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
              <p className="text-lg">
                ✅ <strong>Compras una vivienda con muchos años</strong> y quieres verificar que todo esté en regla (ITE, reformas, licencias...)
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gestoria/solicitar/pack-due-diligence-precompra"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
            >
              Contratar servicio (350€) →
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Pago seguro con Stripe · Gestor asignado en 24h
            </p>
          </div>
        </div>
      </section>

      {/* Zonas de Madrid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Servicio en toda la Comunidad de Madrid
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Nuestros gestores conocen las <strong>particularidades de cada ayuntamiento y registro</strong> de Madrid
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-center text-gray-700">
            <div className="bg-white p-4 rounded-lg shadow-sm">Centro</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Chamberí</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Salamanca</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Retiro</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Chamartín</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Moncloa</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Getafe</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Móstoles</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Alcalá de Henares</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Fuenlabrada</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Leganés</div>
            <div className="bg-white p-4 rounded-lg shadow-sm">Alcorcón</div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#1a0d00] to-[#2e1900] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Compra tu piso en Madrid con total seguridad
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Un gestor experto revisa toda la documentación por solo <strong className="text-[#c9962a]">350€</strong>. Evita sorpresas que pueden costarte <strong>10.000€+</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/pack-due-diligence-precompra"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
            >
              Contratar ahora (350€) →
            </Link>
            <a
              href="tel:+34641008847"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#1a0d00] transition-colors"
            >
              📞 Llamar: 641 008 847
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
