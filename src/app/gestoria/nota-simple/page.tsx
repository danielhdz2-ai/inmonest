import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Nota Simple Registro Propiedad【DESDE 9€】Online en 24h | Inmonest',
  description: 'Nota simple del Registro de la Propiedad oficial. Comprueba cargas, hipotecas, propietario real. Online en 24h. Desde 9€. ✓ Válido legalmente',
  alternates: {
    canonical: `${BASE_URL}/gestoria/nota-simple`,
  },
  openGraph: {
    title: 'Nota Simple Registro - Desde 9€ | Inmonest',
    description: 'Nota simple oficial del Registro. Verifica propietario, cargas e hipotecas. Online en 24h.',
    url: `${BASE_URL}/gestoria/nota-simple`,
    type: 'website',
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Nota Simple del Registro de la Propiedad',
  description: 'Solicita la nota simple informativa del Registro de la Propiedad. Documento oficial que muestra propietario, cargas, hipotecas y situación legal del inmueble.',
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '9',
    priceCurrency: 'EUR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '312',
  },
})

export default function NotaSimplePage() {
  return (
    <>
      <Script
        id="schema-nota-simple"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-[#1a0d00] to-[#2e1900] text-white py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/gestoria/gestoria7.jpg"
              alt="Nota simple registro"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-semibold mb-4">
                📄 Información Registral Oficial
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                Nota Simple del Registro de la Propiedad
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                ¿Vas a comprar un piso? Comprueba que no tiene cargas, hipotecas o embargos. Nota simple oficial del Registro. Online en 24h. <strong>Desde 9€.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gestoria/solicitar/nota-simple"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors text-lg shadow-xl"
                >
                  Solicitar nota simple desde 9€ →
                </Link>
                <a
                  href="#que-incluye"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Qué incluye
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-bold text-gray-900 mb-2">100% oficial</h3>
                <p className="text-gray-600 text-sm">Directamente del Registro de la Propiedad</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-bold text-gray-900 mb-2">Información completa</h3>
                <p className="text-gray-600 text-sm">Propietario, cargas, hipotecas, embargos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="font-bold text-gray-900 mb-2">Entrega en 24h</h3>
                <p className="text-gray-600 text-sm">Por email en PDF oficial</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">Más barato</h3>
                <p className="text-gray-600 text-sm">9€ vs 15-30€ en gestoría tradicional</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es una nota simple?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La <strong>nota simple</strong> (o nota simple informativa) es un documento oficial que emite el <strong>Registro de la Propiedad</strong> con toda la información registral de un inmueble.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Es como el "DNI del piso". Te dice:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700">✓ Quién es el propietario legal</li>
              <li className="text-gray-700">✓ Si tiene hipotecas activas</li>
              <li className="text-gray-700">✓ Si tiene cargas (embargos, anotaciones preventivas)</li>
              <li className="text-gray-700">✓ Descripción exacta (m², linderos, finca registral)</li>
              <li className="text-gray-700">✓ Historial de transmisiones</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <p className="text-blue-900 font-semibold mb-2">💡 ¿Por qué la necesito?</p>
              <p className="text-blue-800">
                Si vas a <strong>comprar un piso</strong>, la nota simple te evita sorpresas desagradables. Imagina descubrir DESPUÉS de firmar que el piso tiene una hipoteca pendiente de 50,000€ o un embargo judicial. Con la nota simple lo sabes ANTES.
              </p>
            </div>
          </section>

          <section id="que-incluye" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué información incluye?</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">📍 Datos del inmueble</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• Dirección completa</li>
                  <li>• Número de finca registral</li>
                  <li>• Superficie (m² construidos + útiles)</li>
                  <li>• Descripción (piso, planta, puerta, linderos)</li>
                  <li>• Cuota de participación en la comunidad</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">👤 Titularidad (propietario)</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• Nombre completo del propietario actual</li>
                  <li>• DNI/NIE del titular</li>
                  <li>• Régimen de propiedad (individual, gananciales, etc.)</li>
                  <li>• Fecha de adquisición</li>
                  <li>• Título de adquisición (compra, herencia, donación)</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">💳 Cargas y gravámenes</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• Hipotecas activas (banco, capital pendiente, fecha vencimiento)</li>
                  <li>• Embargos judiciales</li>
                  <li>• Anotaciones preventivas (demandas, concursos)</li>
                  <li>• Condiciones especiales (usufructo, servidumbres)</li>
                  <li>• Derechos de terceros</li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">📜 Historial registral</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• Transmisiones anteriores</li>
                  <li>• Fecha de inscripción actual</li>
                  <li>• Tomo, libro y folio del registro</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Imagen */}
          <div className="my-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/gestoria/gestoria10.jpg"
              alt="Nota simple del registro"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cuándo necesito una nota simple?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">🏡</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Antes de comprar un piso</h4>
                  <p className="text-sm text-gray-700">Verifica que el vendedor es el propietario real y que no hay cargas ocultas.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Antes de dar las arras</h4>
                  <p className="text-sm text-gray-700">No entregues dinero sin comprobar la situación legal del inmueble.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">🏦</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Para solicitar una hipoteca</h4>
                  <p className="text-sm text-gray-700">El banco te la pedirá para valorar el inmueble.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">👴</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Herencias</h4>
                  <p className="text-sm text-gray-700">Para saber quién consta como propietario y si hay deudas asociadas.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Procesos legales (divorcios, ejecutivas)</h4>
                  <p className="text-sm text-gray-700">Para acreditar la titularidad en procedimientos judiciales.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">📋</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Comprobar tu propia propiedad</h4>
                  <p className="text-sm text-gray-700">Si heredaste o compraste hace años y quieres verificar que está todo en orden.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo funciona el servicio?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Solicitas la nota simple</h3>
                  <p className="text-gray-700">Completas un formulario con la dirección del inmueble o la referencia catastral. Pagas online 9€.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Consultamos el Registro</h3>
                  <p className="text-gray-700">Solicitamos la nota simple al Registro de la Propiedad correspondiente (Madrid, Barcelona, etc.).</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Recibes el documento (24h)</h3>
                  <p className="text-gray-700">Te enviamos la nota simple oficial en PDF por email. Tiene el sello del Registro y es válida legalmente.</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              * En algunos registros puede tardar hasta 48-72h si hay mucha carga de trabajo.
            </p>
          </section>

          {/* Precios */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Precios</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-2 border-indigo-600 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nota Simple Individual</h3>
                <p className="text-4xl font-extrabold text-indigo-600 mb-4">9€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ 1 inmueble</li>
                  <li>✓ Documento oficial PDF</li>
                  <li>✓ Entrega en 24-48h</li>
                  <li>✓ Validez legal total</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/nota-simple?tipo=individual"
                  className="block text-center px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Solicitar
                </Link>
              </div>
              
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pack 5 Notas Simples</h3>
                <p className="text-4xl font-extrabold text-indigo-600 mb-4">35€</p>
                <p className="text-sm text-gray-500 mb-4">(7€/nota - ahorra 10€)</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Hasta 5 inmuebles</li>
                  <li>✓ Documentos oficiales PDF</li>
                  <li>✓ Entrega en 48-72h</li>
                  <li>✓ Ideal para inversores/agencias</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/nota-simple?tipo=pack"
                  className="block text-center px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Solicitar pack
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuál es la diferencia entre nota simple y certificado?</summary>
                <p className="text-gray-700 mt-3">
                  La <strong>nota simple</strong> es informativa (sin validez jurídica plena). El <strong>certificado registral</strong> es oficial y se usa en juicios o trámites formales. Para comprar un piso, la nota simple es suficiente (y más barata, el certificado cuesta ~25€).
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué necesito para solicitar la nota simple?</summary>
                <p className="text-gray-700 mt-3">
                  Solo necesitas <strong>la dirección completa del inmueble</strong> o la <strong>referencia catastral</strong>. Si no tienes la referencia, la buscamos nosotros con la dirección.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puedo solicitarla de un piso que no es mío?</summary>
                <p className="text-gray-700 mt-3">
                  <strong>Sí</strong>. La nota simple es pública. Cualquiera puede solicitarla de cualquier inmueble (es información pública del Registro de la Propiedad).
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Incluye el precio de compra del piso?</summary>
                <p className="text-gray-700 mt-3">
                  No siempre. Desde 2015, el Registro NO publica el precio de compraventa por privacidad. Solo verás "por título de compra" sin la cifra exacta.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuánto tiempo es válida la nota simple?</summary>
                <p className="text-gray-700 mt-3">
                  La nota simple refleja la situación del Registro <strong>en el momento de emisión</strong>. Si necesitas información actualizada después de 2-3 meses, es recomendable solicitar una nueva.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué pasa si el inmueble no está inscrito en el Registro?</summary>
                <p className="text-gray-700 mt-3">
                  Si el piso NO aparece en el Registro (raro pero posible en zonas rurales antiguas), te devolvemos el 100% del pago y te informamos de la situación.
                </p>
              </details>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas comprobar la situación legal de un piso?</h3>
            <p className="text-white/90 mb-6">
              Nota simple oficial del Registro de la Propiedad. Online en 24h.
            </p>
            <Link
              href="/gestoria/solicitar/nota-simple"
              className="inline-block px-8 py-4 rounded-full bg-white text-indigo-700 font-bold hover:bg-gray-100 transition-colors"
            >
              Solicitar desde 9€ →
            </Link>
          </div>

        </article>

        {/* Relacionados */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link href="/gestoria/contrato-compraventa" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Contrato de Compraventa →
                </h3>
                <p className="text-sm text-gray-600">Desde 80€</p>
              </Link>
              <Link href="/gestoria/certificado-eficiencia-energetica" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Certificado Energético →
                </h3>
                <p className="text-sm text-gray-600">Desde 45€</p>
              </Link>
              <Link href="/gestoria/modelo-600" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Modelo 600 (ITP) →
                </h3>
                <p className="text-sm text-gray-600">Desde 25€</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
