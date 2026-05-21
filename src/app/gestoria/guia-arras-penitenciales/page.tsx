import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Arras Penitenciales: Qué Son, Cómo Funcionan y Precio 2026 | Guía Completa',
  description: 'Todo sobre arras penitenciales: diferencias con confirmatorias, qué pasa si el comprador o vendedor incumple, ejemplos reales y cómo redactar un contrato seguro. Desde 145€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/guia-arras-penitenciales`,
  },
  openGraph: {
    title: 'Arras Penitenciales 2026: Guía Completa para Comprador y Vendedor',
    description: 'Aprende qué son las arras penitenciales, cuándo usarlas, qué pasa si incumples y cuánto cuesta un contrato profesional. Ejemplos y casos reales.',
    url: `${BASE_URL}/gestoria/guia-arras-penitenciales`,
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué son las arras penitenciales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las arras penitenciales son una señal que permite al comprador desistir perdiendo la cantidad entregada, o al vendedor devolver el doble si es él quien incumple. Son el tipo de arras más usado en compraventa inmobiliaria.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto se pierde con arras penitenciales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El comprador pierde el 100% de la señal si desiste. El vendedor debe devolver el doble (200%) si es él quien incumple. Por ejemplo, con 10.000€ de señal: el comprador pierde 10.000€, el vendedor debe devolver 20.000€.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta un contrato de arras penitenciales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un contrato de arras penitenciales profesional redactado por abogados cuesta desde 145€. Incluye cláusulas personalizadas, plazos, condiciones suspensivas y protección legal para ambas partes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuándo usar arras penitenciales en vez de confirmatorias?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usa arras penitenciales cuando quieras flexibilidad para desistir, cuando no estés 100% seguro de la operación, o cuando necesites tiempo para obtener hipoteca. Son más seguras que las confirmatorias para operaciones con incertidumbre.',
      },
    },
  ],
}

export default function GuiaArrasPenitencialesPage() {
  return (
    <>
      <Navbar />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#c9962a] to-[#a87a20] text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm mb-4">
              Guía Completa 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Arras Penitenciales: Todo lo que Necesitas Saber Antes de Firmar
            </h1>
            <p className="text-xl text-white/90 mb-6">
              La guía más completa sobre arras penitenciales en España. Qué son, cómo funcionan, 
              cuánto se pierde si incumples, ejemplos reales y cómo protegerte legalmente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#c9962a] font-semibold hover:bg-gray-100 transition"
              >
                Contratar Arras Penitenciales (145€)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/gestoria/solicitar/revision-arras"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Revisar Contrato Existente (60€)
              </Link>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Tabla de contenidos */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-3">📋 Contenido de esta guía</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Qué son las arras penitenciales y cómo funcionan</li>
              <li>✓ Diferencias con arras confirmatorias (comparativa completa)</li>
              <li>✓ Qué pasa si el comprador se arrepiente</li>
              <li>✓ Qué pasa si el vendedor incumple</li>
              <li>✓ Ejemplos reales con cifras</li>
              <li>✓ Cláusulas imprescindibles en el contrato</li>
              <li>✓ Errores comunes que pueden costarte miles de euros</li>
              <li>✓ Cuánto cuesta un contrato profesional</li>
            </ul>
          </div>

          {/* Sección 1 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué son las Arras Penitenciales?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Las <strong>arras penitenciales</strong> son una señal que se entrega al firmar un contrato de 
                compraventa inmobiliaria y que <strong>permiten a cualquiera de las dos partes desistir de la 
                operación</strong> pagando una penalización económica.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 En resumen:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Comprador se arrepiente:</strong> Pierde el 100% de la señal entregada</li>
                  <li><strong>Vendedor se arrepiente:</strong> Debe devolver el doble (200%) de la señal</li>
                  <li><strong>Ambas partes cumplen:</strong> La señal se descuenta del precio final en la escritura</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Son el <strong>tipo de arras más utilizado en España</strong> porque ofrecen un equilibrio 
                entre compromiso y flexibilidad. Te permiten "cerrar" el piso mientras gestionas la hipoteca, 
                pero con una vía de escape si surge algún imprevisto.
              </p>
            </div>
          </section>

          {/* Sección 2: Comparativa */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Arras Penitenciales vs Confirmatorias: ¿Cuál Elegir?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Característica</th>
                    <th className="px-6 py-4 text-left font-semibold text-green-700">Penitenciales ✓</th>
                    <th className="px-6 py-4 text-left font-semibold text-red-700">Confirmatorias ✗</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">¿Puedo desistir?</td>
                    <td className="px-6 py-4 text-green-700">Sí, perdiendo la señal</td>
                    <td className="px-6 py-4 text-red-700">No sin juicio</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Penalización vendedor</td>
                    <td className="px-6 py-4 text-green-700">Devuelve el doble (200%)</td>
                    <td className="px-6 py-4 text-red-700">Ejecución forzosa + daños</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Penalización comprador</td>
                    <td className="px-6 py-4 text-green-700">Pierde el 100%</td>
                    <td className="px-6 py-4 text-red-700">Debe comprar sí o sí</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Uso recomendado</td>
                    <td className="px-6 py-4 text-green-700">Operaciones con hipoteca</td>
                    <td className="px-6 py-4 text-red-700">100% certeza de compra</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Riesgo legal</td>
                    <td className="px-6 py-4 text-green-700">Bajo (penalización clara)</td>
                    <td className="px-6 py-4 text-red-700">Alto (juicio probable)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Precio contrato</td>
                    <td className="px-6 py-4 text-gray-700">145€</td>
                    <td className="px-6 py-4 text-gray-700">145€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <p className="text-gray-800">
                <strong>⚠️ Recomendación:</strong> Si vas a pedir hipoteca o no estás 100% seguro, 
                elige <strong>arras penitenciales</strong>. Te dan flexibilidad y evitan juicios. 
                Solo usa confirmatorias si tienes todo el dinero en efectivo y certeza absoluta.
              </p>
            </div>
          </section>

          {/* Sección 3: Ejemplos reales */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ejemplos Reales: ¿Cuánto Pierdes si Incumples?
            </h2>
            
            <div className="space-y-6">
              {/* Ejemplo 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  📌 Ejemplo 1: El comprador se arrepiente
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Situación:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Precio piso: 250.000€</li>
                    <li>• Arras entregadas: 15.000€ (6%)</li>
                    <li>• El banco deniega la hipoteca al comprador</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-red-900 mb-2">Consecuencias:</p>
                  <ul className="text-sm text-red-800 space-y-1 ml-4">
                    <li>✗ El comprador <strong>pierde los 15.000€</strong></li>
                    <li>✓ El vendedor se queda con los 15.000€ y puede revender</li>
                    <li>✓ No hay juicio ni reclamaciones adicionales</li>
                  </ul>
                </div>
              </div>

              {/* Ejemplo 2 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  📌 Ejemplo 2: El vendedor vende a otro por más dinero
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Situación:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Precio acordado: 300.000€</li>
                    <li>• Arras entregadas: 20.000€ (6,6%)</li>
                    <li>• El vendedor recibe oferta de 320.000€ y vende a otro</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">Consecuencias:</p>
                  <ul className="text-sm text-green-800 space-y-1 ml-4">
                    <li>✓ El vendedor debe devolver <strong>40.000€</strong> (el doble)</li>
                    <li>✓ El comprador gana 20.000€ netos</li>
                    <li>✓ No hay juicio (la penalización es automática)</li>
                  </ul>
                </div>
              </div>

              {/* Ejemplo 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  📌 Ejemplo 3: Todo sale bien
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2"><strong>Situación:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Precio acordado: 180.000€</li>
                    <li>• Arras entregadas: 10.000€ (5,5%)</li>
                    <li>• La hipoteca se aprueba y se firma la escritura</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Consecuencias:</p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li>✓ Los 10.000€ se descuentan del precio final</li>
                    <li>✓ En escritura se pagan: 180.000€ - 10.000€ = <strong>170.000€</strong></li>
                    <li>✓ Ambas partes cumplen y la operación se cierra</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Intermedio */}
          <div className="bg-gradient-to-br from-[#c9962a] to-[#a87a20] text-white rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold mb-3">
              ¿Necesitas un Contrato de Arras Penitenciales Profesional?
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Redactado por abogados especializados en derecho inmobiliario. 
              Cláusulas personalizadas, condiciones suspensivas y protección total.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#c9962a] font-bold hover:bg-gray-100 transition text-lg"
              >
                Contratar Ahora - 145€
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/gestoria/solicitar/revision-arras"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition text-lg"
              >
                Revisar Contrato Existente - 60€
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-4">✓ Entrega en 48h • ✓ Garantía legal • ✓ +2.000 contratos redactados</p>
          </div>

          {/* Sección 4: Cláusulas imprescindibles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cláusulas Imprescindibles en un Contrato de Arras Penitenciales
            </h2>
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">1. Identificación completa del inmueble</h3>
                <p className="text-gray-700 text-sm">
                  Dirección exacta, referencia catastral, metros cuadrados, número de registro. 
                  Evita problemas de identificación que puedan anular el contrato.
                </p>
              </div>
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">2. Precio total y forma de pago</h3>
                <p className="text-gray-700 text-sm">
                  Precio final, cantidad de arras, si es con o sin hipoteca, fecha límite de escritura. 
                  Todo debe quedar por escrito para evitar malentendidos.
                </p>
              </div>
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">3. Condiciones suspensivas (MUY IMPORTANTE)</h3>
                <p className="text-gray-700 text-sm">
                  "Si el banco deniega la hipoteca, se devuelven las arras sin penalización". Esta cláusula 
                  te protege si la financiación no sale. <strong>Sin ella, perderías las arras aunque el banco diga que no.</strong>
                </p>
              </div>
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">4. Cargas y gravámenes</h3>
                <p className="text-gray-700 text-sm">
                  El vendedor debe declarar si hay hipotecas, embargos o deudas pendientes. 
                  Si aparece algo no declarado, puedes recuperar las arras.
                </p>
              </div>
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">5. Estado de conservación y licencias</h3>
                <p className="text-gray-700 text-sm">
                  Cédula de habitabilidad, ITE, licencias de reformas. Si falta algo, debe constar 
                  quién lo arregla y en qué plazo.
                </p>
              </div>
              <div className="bg-white border-l-4 border-[#c9962a] p-6 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">6. Penalizaciones claras</h3>
                <p className="text-gray-700 text-sm">
                  Debe especificar: "Si el comprador desiste, pierde X€. Si el vendedor incumple, devuelve 2X€". 
                  Sin ambigüedades.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 5: Errores comunes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              7 Errores que Pueden Costarte Miles de Euros
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 1. Usar una plantilla de internet sin personalizar</h3>
                <p className="text-red-800 text-sm">
                  Cada operación es única. Una plantilla genérica no incluye condiciones suspensivas, 
                  no contempla tu situación específica y puede ser inválida ante un juez.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 2. No incluir condición suspensiva por denegación de hipoteca</h3>
                <p className="text-red-800 text-sm">
                  Si el banco te dice que no y no está en el contrato, <strong>pierdes las arras igualmente</strong>. 
                  Esta cláusula es OBLIGATORIA si pides financiación.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 3. Entregar dinero sin contrato firmado</h3>
                <p className="text-red-800 text-sm">
                  "Págame ahora y mañana firmamos" = estafa casi segura. <strong>Primero contrato, después dinero</strong>. 
                  Nunca al revés.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 4. No verificar la nota simple antes de firmar</h3>
                <p className="text-red-800 text-sm">
                  Puede haber hipotecas, embargos o el vendedor ni siquiera ser el dueño. 
                  Pide la nota simple del Registro de la Propiedad ANTES de entregar dinero.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 5. Confundir arras penitenciales con confirmatorias</h3>
                <p className="text-red-800 text-sm">
                  Si firmas confirmatorias pensando que son penitenciales, no podrás desistir sin juicio. 
                  Lee bien el contrato o que lo revise un abogado.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 6. No establecer plazo máximo para la escritura</h3>
                <p className="text-red-800 text-sm">
                  Si no hay fecha límite, el vendedor puede alargar indefinidamente. 
                  Establece plazo claro: "Escritura antes del 31/12/2026 o se devuelven las arras".
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 7. Pagar en efectivo sin justificante</h3>
                <p className="text-red-800 text-sm">
                  Siempre por transferencia bancaria. Si pagas cash y no hay recibí firmado, 
                  el vendedor puede negar haberlo recibido.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#c9962a] transition">
                <summary className="font-bold text-gray-900">
                  ¿Puedo recuperar las arras penitenciales si me arrepiento?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  No. Si eres el comprador y desistes voluntariamente, pierdes el 100% de las arras. 
                  Solo las recuperas si hay condición suspensiva cumplida (ej: denegación hipoteca) 
                  o si el vendedor incumple (entonces te devuelve el doble).
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#c9962a] transition">
                <summary className="font-bold text-gray-900">
                  ¿Cuánto dinero se entrega normalmente de arras?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Entre el 5% y el 10% del precio total. Lo habitual es 6-8%. Por ejemplo: 
                  piso de 200.000€ → arras de 12.000€ a 16.000€. Cuanto más entregas, más compromiso demuestras.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#c9962a] transition">
                <summary className="font-bold text-gray-900">
                  ¿Es obligatorio hacer las arras ante notario?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  No, pero SÍ es obligatorio que sea un contrato escrito firmado por ambas partes. 
                  Puede ser privado (redactado por abogados) o público (ante notario). El privado es válido 
                  y mucho más económico (145€ vs 300-500€ del notario).
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#c9962a] transition">
                <summary className="font-bold text-gray-900">
                  ¿Qué pasa si el vendedor no tiene escrituras del piso?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  🚨 NO FIRMES. Sin escrituras no hay compraventa legal. Puede ser herencia no tramitada, 
                  ocupación ilegal o estafa directa. Exige siempre ver las escrituras originales antes de entregar dinero.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#c9962a] transition">
                <summary className="font-bold text-gray-900">
                  ¿Cuánto tarda en redactarse un contrato profesional?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  48 horas laborables. Nos envías los datos del piso y de las partes, nuestros abogados 
                  redactan el contrato personalizado con todas las cláusulas de protección, y lo recibes 
                  en PDF listo para firmar.
                </p>
              </details>
            </div>
          </section>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Protege tu Compra con un Contrato Profesional
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              No arriesgues miles de euros por ahorrar 145€ en el contrato. Nuestros abogados especializados 
              redactan tu contrato de arras penitenciales con todas las protecciones legales.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#c9962a] text-white font-bold hover:bg-[#a87a20] transition text-lg"
              >
                Contratar Ahora - 145€
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/gestoria"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition text-lg"
              >
                Ver Todos los Servicios
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <div className="text-2xl font-bold text-[#c9962a] mb-1">48h</div>
                <div>Entrega garantizada</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#c9962a] mb-1">+2.000</div>
                <div>Contratos redactados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#c9962a] mb-1">100%</div>
                <div>Garantía legal</div>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-12 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#c9962a]">Inicio</Link></li>
              <li>›</li>
              <li><Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link></li>
              <li>›</li>
              <li className="text-gray-900 font-medium">Guía Arras Penitenciales</li>
            </ol>
          </nav>
        </div>
      </article>

      <WhatsAppButton />
    </>
  )
}
