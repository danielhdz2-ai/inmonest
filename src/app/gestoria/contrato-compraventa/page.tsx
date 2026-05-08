import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contrato de Compraventa Vivienda【DESDE 80€】Legal con Abogado | Inmonest',
  description: 'Contrato de compraventa de vivienda redactado por abogados. Protege tu compra o venta. Arras, reserva, cláusulas especiales. Desde 80€. Entrega en 24-48h ✓',
  alternates: {
    canonical: `${BASE_URL}/gestoria/contrato-compraventa`,
  },
  openGraph: {
    title: 'Contrato de Compraventa - Desde 80€ | Inmonest',
    description: 'Contrato de compraventa profesional redactado por abogados. Protege tu inversión inmobiliaria.',
    url: `${BASE_URL}/gestoria/contrato-compraventa`,
    type: 'website',
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Contrato de Compraventa de Vivienda',
  description: 'Contrato de compraventa de inmueble redactado por abogados especializados en derecho inmobiliario. Incluye todas las cláusulas legales necesarias para proteger comprador y vendedor.',
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '80',
    priceCurrency: 'EUR',
  },

})

export default function ContratoCompraventaPage() {
  return (
    <>
      <Script
        id="schema-compraventa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-[#1a0d00] to-[#2e1900] text-white py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/gestoria/gestoria1.jpg"
              alt="Compraventa vivienda"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-xs font-semibold mb-4">
                🏘️ Compra-Venta Segura
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                Contrato de Compraventa de Vivienda
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                ¿Vas a comprar o vender un piso? Protege tu inversión con un contrato redactado por abogados. Con todas las cláusulas legales. <strong>Desde 80€.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gestoria/solicitar/contrato-compraventa"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white font-bold hover:bg-[#a87a20] transition-colors text-lg shadow-xl"
                >
                  Solicitar contrato desde 80€ →
                </Link>
                <a
                  href="#tipos-contrato"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Ver tipos de contrato
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
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-bold text-gray-900 mb-2">Redactado por abogados</h3>
                <p className="text-gray-600 text-sm">Especialistas en derecho inmobiliario</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold text-gray-900 mb-2">Protección legal</h3>
                <p className="text-gray-600 text-sm">Cláusulas para comprador y vendedor</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-bold text-gray-900 mb-2">100% personalizado</h3>
                <p className="text-gray-600 text-sm">Adaptado a tu situación específica</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">Entrega rápida</h3>
                <p className="text-gray-600 text-sm">24-48h con revisión incluida</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es un contrato de compraventa de vivienda?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El <strong>contrato de compraventa</strong> es el documento legal que formaliza la transmisión de propiedad de un inmueble del vendedor al comprador. Es el paso previo a la <strong>escritura pública ante notario</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Aunque NO es obligatorio (puedes ir directo a notaría), es <strong>altamente recomendable</strong> porque:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700">✓ Fija las condiciones de la venta (precio, fecha, forma de pago)</li>
              <li className="text-gray-700">✓ Protege al comprador si hay vicios ocultos</li>
              <li className="text-gray-700">✓ Incluye penalizaciones si alguna parte incumple</li>
              <li className="text-gray-700">✓ Permite firmar arras (anticipo) de forma segura</li>
            </ul>
            
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-6">
              <p className="text-amber-900 font-semibold mb-2">⚠️ ¿Contrato privado o escritura pública?</p>
              <p className="text-amber-800">
                El <strong>contrato privado</strong> NO transmite la propiedad (eso solo lo hace la escritura en notaría). Pero SÍ tiene validez legal y obliga a ambas partes a cumplir. Si una parte incumple, puedes reclamar ante un juez.
              </p>
            </div>
          </section>

          <section id="tipos-contrato" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tipos de contratos que ofrecemos</h2>
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">1. Contrato de Arras (Señal)</h3>
                <p className="text-gray-700 mb-3">
                  El comprador entrega un anticipo (normalmente <strong>10% del precio</strong>) para "reservar" la vivienda. Hay 3 tipos:
                </p>
                <div className="ml-4 space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Arras Confirmatorias (más común)</p>
                    <p className="text-sm text-gray-600">Si el comprador se arrepiente, pierde las arras. Si el vendedor se arrepiente, devuelve el doble.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Arras Penitenciales</p>
                    <p className="text-sm text-gray-600">Permiten desistir sin más consecuencias que perder las arras (comprador) o devolver el doble (vendedor).</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">Arras Penales</p>
                    <p className="text-sm text-gray-600">Menos frecuentes. No se puede desistir; si incumples, pagas las arras + daños y perjuicios.</p>
                  </div>
                </div>
                <p className="text-sm text-[#c9962a] font-semibold mt-4">Precio: 30€</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">2. Contrato de Compraventa Completo (con hipoteca)</h3>
                <p className="text-gray-700 mb-3">
                  Incluye todas las cláusulas necesarias cuando hay financiación bancaria:
                </p>
                <ul className="ml-4 space-y-1 text-gray-700 text-sm">
                  <li>✓ Condición suspensiva (si no aprueban hipoteca, se cancela)</li>
                  <li>✓ Plazo para obtener la hipoteca</li>
                  <li>✓ Reparto de gastos (notaría, registro, gestoría)</li>
                  <li>✓ Garantías del vendedor (sin cargas, certificado energético, IBI al día)</li>
                  <li>✓ Estado del inmueble y vicios ocultos</li>
                </ul>
                <p className="text-sm text-[#c9962a] font-semibold mt-4">Precio: 120€</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">3. Contrato de Compraventa Sin Hipoteca</h3>
                <p className="text-gray-700 mb-3">
                  Para compras al contado o con ahorros propios. Más sencillo pero igualmente vinculante.
                </p>
                <p className="text-sm text-[#c9962a] font-semibold mt-4">Precio: 80€</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">4. Contrato de Reserva (Pre-Arras)</h3>
                <p className="text-gray-700 mb-3">
                  Cuando aún no has decidido del todo pero quieres "bloquear" el piso. Anticipo más pequeño (500-2,000€) mientras revisas documentación.
                </p>
                <p className="text-sm text-[#c9962a] font-semibold mt-4">Precio: 25€</p>
              </div>
            </div>
          </section>

          {/* Imagen */}
          <div className="my-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/gestoria/gestoria3.jpg"
              alt="Firma de contrato de compraventa"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué incluye el contrato?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Identificación de las partes</h4>
                <p className="text-sm text-gray-700">DNI, nombre completo, estado civil de comprador y vendedor</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Descripción del inmueble</h4>
                <p className="text-sm text-gray-700">Dirección, referencia catastral, m², distribución, registro</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Precio y forma de pago</h4>
                <p className="text-sm text-gray-700">Precio total, arras, plazos, cuenta bancaria</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Garantías del vendedor</h4>
                <p className="text-sm text-gray-700">Sin cargas, IBI al día, sin okupas, certificado energético</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Estado del inmueble</h4>
                <p className="text-sm text-gray-700">Vicios ocultos, reformas, instalaciones</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Fecha de escritura</h4>
                <p className="text-sm text-gray-700">Cuándo se firmará ante notario</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Penalizaciones</h4>
                <p className="text-sm text-gray-700">Qué pasa si una parte incumple</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Jurisdicción</h4>
                <p className="text-sm text-gray-700">Tribunales competentes en caso de litigio</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo funciona el servicio?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Solicitas el contrato</h3>
                  <p className="text-gray-700">Completas un formulario con los datos del inmueble, comprador, vendedor, precio y condiciones especiales.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Abogado revisa y redacta</h3>
                  <p className="text-gray-700">Un abogado especializado redacta el contrato con todas las cláusulas necesarias según tu caso.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Recibes el contrato (24-48h)</h3>
                  <p className="text-gray-700">Te enviamos el contrato en PDF + DOCX por email. Puedes pedir modificaciones sin coste extra.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Firmáis el contrato</h3>
                  <p className="text-gray-700">Ambas partes firmáis (presencial o digital con certificado). El vendedor recibe las arras.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Es obligatorio el contrato privado antes de ir a notaría?</summary>
                <p className="text-gray-700 mt-3">
                  No es obligatorio, pero es <strong>muy recomendable</strong>. Te protege si hay problemas antes de la escritura (por ejemplo, si el vendedor se arrepiente o si descubres que tiene deudas).
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuánto debo dar de arras?</summary>
                <p className="text-gray-700 mt-3">
                  Lo habitual es entre <strong>10-20% del precio de venta</strong>. Por ejemplo, si el piso cuesta 200,000€, las arras suelen ser 20,000-40,000€.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué pasa si no me aprueban la hipoteca?</summary>
                <p className="text-gray-700 mt-3">
                  Si el contrato incluye <strong>condición suspensiva</strong> (la incluimos por defecto), recuperas las arras SIN penalización. Es fundamental incluir esta cláusula.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puedo comprar un piso heredado con este contrato?</summary>
                <p className="text-gray-700 mt-3">
                  Sí, pero el vendedor debe tener la <strong>escritura de aceptación de herencia</strong>. Si aún no la tiene, incluimos cláusulas especiales para protegerte.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Necesito un notario para firmar el contrato privado?</summary>
                <p className="text-gray-700 mt-3">
                  No. El contrato privado se firma entre las partes. Solo necesitas notario para la <strong>escritura pública</strong> (el paso final que transmite la propiedad).
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Incluye el Modelo 600 (impuesto de transmisiones)?</summary>
                <p className="text-gray-700 mt-3">
                  No, el Modelo 600 se paga después de la escritura en notaría. Nosotros podemos gestionarlo aparte por 25€.
                </p>
              </details>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para proteger tu compraventa?</h3>
            <p className="text-white/80 mb-6">
              Contrato redactado por abogados en 24-48h. Con todas las cláusulas legales necesarias.
            </p>
            <Link
              href="/gestoria/solicitar/contrato-compraventa"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] text-white font-bold hover:bg-[#a87a20] transition-colors"
            >
              Solicitar contrato desde 80€ →
            </Link>
          </div>

        </article>

        {/* Relacionados */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link href="/gestoria/solicitar/arras-penitenciales" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Contrato de Arras →
                </h3>
                <p className="text-sm text-gray-600">Desde 145€</p>
              </Link>
              <Link href="/gestoria/solicitar/revision-arras" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Revisión de Arras →
                </h3>
                <p className="text-sm text-gray-600">Desde 60€</p>
              </Link>
              <Link href="/gestoria" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Más Servicios →
                </h3>
                <p className="text-sm text-gray-600">Ver todos</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
