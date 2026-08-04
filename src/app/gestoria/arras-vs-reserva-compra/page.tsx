import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Diferencia entre Arras y Reserva de Compra: ¿Cuál Elegir en 2026?',
  description: 'Aprende las diferencias clave entre arras penitenciales y contrato de reserva. Cuándo usar cada uno, qué pasa si incumples, precios y ejemplos reales. Guía completa 2026.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/arras-vs-reserva-compra`,
  },
  openGraph: {
    title: 'Arras vs Reserva de Compra: Diferencias, Cuándo Usar Cada Una y Precios',
    description: 'Comparativa completa: arras (señal vinculante) vs reserva (bloqueo temporal). Descubre cuál usar según tu situación y evita errores costosos.',
    url: `${BASE_URL}/gestoria/arras-vs-reserva-compra`,
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre arras y reserva de compra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las arras son una señal que compromete a ambas partes a comprar/vender con penalización si incumples. La reserva es un documento temporal (24-72h) para bloquear el piso mientras verificas documentos, sin compromiso firme de compra.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué firmo primero: arras o reserva?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Primero reserva (para comprobar nota simple, cédula, ITE), después arras (cuando todo está verificado), y finalmente escritura en notaría. Nunca firmes arras sin antes verificar que el piso es legal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo recuperar el dinero de la reserva?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, si aparece un problema en la documentación (cargas, licencias, etc.). No, si desistes voluntariamente sin causa justificada. Depende de las cláusulas del contrato de reserva.',
      },
    },
  ],
}

export default function ArrasVsReservaPage() {
  return (
    <>
      <Navbar />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm mb-4">
              Guía Comparativa 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Arras vs Reserva de Compra: ¿Cuál Necesitas Firmar Primero?
            </h1>
            <p className="text-xl text-white/90 mb-6">
              La confusión más común en compraventa: ¿cuándo firmar reserva? ¿cuándo arras? 
              Te explicamos las diferencias, cuándo usar cada una y cómo evitar perder tu dinero.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/gestoria/solicitar/reserva-compra"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition"
              >
                Contratar Reserva (61€)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Contratar Arras (145€)
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <PageHeroImage
            src="/promo1.png"
            alt="Comparativa entre arras y reserva de compra"
            className="mb-0"
          />
        </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Comparativa visual */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Diferencias Principales: Tabla Comparativa
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Característica</th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-700">Reserva</th>
                    <th className="px-6 py-4 text-left font-semibold text-purple-700">Arras</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Propósito</td>
                    <td className="px-6 py-4 text-gray-700">Bloquear piso temporalmente (24-72h)</td>
                    <td className="px-6 py-4 text-gray-700">Compromiso firme de compra/venta</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Duración</td>
                    <td className="px-6 py-4 text-gray-700">24-72 horas</td>
                    <td className="px-6 py-4 text-gray-700">Hasta firma escritura (1-3 meses)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Cantidad habitual</td>
                    <td className="px-6 py-4 text-gray-700">500€ - 3.000€</td>
                    <td className="px-6 py-4 text-gray-700">5-10% del precio (10.000€ - 30.000€)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">¿Puedo desistir?</td>
                    <td className="px-6 py-4 text-green-700">Sí, si hay problemas documentales</td>
                    <td className="px-6 py-4 text-red-700">Sí, pero pierdes la señal (100%)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Penalización vendedor</td>
                    <td className="px-6 py-4 text-gray-700">Devuelve reserva (100%)</td>
                    <td className="px-6 py-4 text-gray-700">Devuelve doble (200%)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Compromiso legal</td>
                    <td className="px-6 py-4 text-gray-700">Bajo (solo bloqueo)</td>
                    <td className="px-6 py-4 text-gray-700">Alto (vinculante)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Cuándo firmarla</td>
                    <td className="px-6 py-4 text-gray-700">PRIMERO (antes de verificar)</td>
                    <td className="px-6 py-4 text-gray-700">DESPUÉS (cuando todo OK)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Precio contrato</td>
                    <td className="px-6 py-4 text-gray-700">61€</td>
                    <td className="px-6 py-4 text-gray-700">145€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-green-900 mb-2">✅ Orden correcto de firma:</h3>
              <ol className="text-green-800 space-y-2 text-sm">
                <li><strong>1. Reserva (61€)</strong> → Bloqueas el piso 48-72h para verificar documentos</li>
                <li><strong>2. Verificación</strong> → Compruebas nota simple, cédula habitabilidad, ITE, licencias</li>
                <li><strong>3. Arras (145€)</strong> → Si todo OK, firmas compromiso firme de compra</li>
                <li><strong>4. Escritura</strong> → Firmas ante notario y pagas el resto del precio</li>
              </ol>
            </div>
          </section>

          {/* ¿Qué es la reserva? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué es un Contrato de Reserva de Compra?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                La <strong>reserva de compra</strong> es un documento que <strong>retira el piso del mercado 
                durante 24-72 horas</strong> para que puedas comprobar que todo está en orden antes de firmar 
                las arras definitivas.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Para qué sirve:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Bloquear el piso para que el vendedor no lo enseñe a otros</li>
                  <li>✓ Tener tiempo (48-72h) para pedir la nota simple del Registro</li>
                  <li>✓ Verificar que no hay cargas, hipotecas o embargos ocultos</li>
                  <li>✓ Comprobar cédula de habitabilidad, ITE y licencias</li>
                  <li>✓ Evitar sorpresas de última hora que te hagan perder las arras</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Cantidad habitual:</strong> entre 500€ y 3.000€ (depende del precio del piso). 
                Si todo está bien, esa cantidad se suma a las arras que firmarás después. 
                Si aparece un problema grave (hipoteca no declarada, licencia irregular), 
                <strong> recuperas el dinero y cancelas sin penalización</strong>.
              </p>
            </div>

            {/* Ejemplo visual */}
            <div className="mt-8 bg-white border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Ejemplo Práctico: Reserva Salva la Compra</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2"><strong>Situación:</strong></p>
                  <p className="text-sm text-gray-700">
                    Encuentras un piso de 250.000€. Te encanta y hay otros interesados. 
                    El vendedor te presiona: "Firma las arras hoy o lo vendo a otro".
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-900 font-semibold mb-2">❌ Si firmas ARRAS directamente:</p>
                  <ul className="text-sm text-yellow-800 space-y-1 ml-4">
                    <li>• Entregas 15.000€ (6%) en señal</li>
                    <li>• Al día siguiente pides la nota simple → aparece hipoteca de 80.000€ no declarada</li>
                    <li>• No puedes comprar (el banco no financia con cargas pendientes)</li>
                    <li>• <strong className="text-red-700">Pierdes los 15.000€ completos</strong></li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-900 font-semibold mb-2">✅ Si firmas RESERVA primero:</p>
                  <ul className="text-sm text-green-800 space-y-1 ml-4">
                    <li>• Entregas 2.000€ de reserva (bloqueo 72h)</li>
                    <li>• Pides nota simple → aparece la hipoteca oculta</li>
                    <li>• Activas cláusula "problema documental" del contrato</li>
                    <li>• <strong>Recuperas los 2.000€ íntegros y cancelas sin perder nada</strong></li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/gestoria/solicitar/reserva-compra"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Contratar Reserva de Compra - 61€
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ¿Qué son las arras? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué son las Arras Penitenciales?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Las <strong>arras penitenciales</strong> son una <strong>señal vinculante</strong> que firmas 
                DESPUÉS de verificar que todo está correcto. Comprometen a ambas partes a cerrar la compraventa 
                con penalización económica si alguien incumple.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Para qué sirven:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Formalizar el compromiso de compra/venta</li>
                  <li>✓ Dar tiempo al comprador para obtener la hipoteca (1-3 meses)</li>
                  <li>✓ Garantizar al vendedor que el comprador va en serio</li>
                  <li>✓ Establecer penalizaciones claras si alguien incumple</li>
                  <li>✓ Bloquear el precio acordado (evita subidas de última hora)</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Cantidad habitual:</strong> 5-10% del precio total (10.000€ - 30.000€ en pisos de 
                150.000€ - 300.000€). Se descuentan del precio final en la escritura.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>⚠️ Importante:</strong> Solo firmes arras cuando:
              </p>
              <ul className="list-disc ml-8 text-gray-700 space-y-1 mb-4">
                <li>Ya hayas verificado la nota simple (sin cargas ocultas)</li>
                <li>Hayas comprobado cédula habitabilidad e ITE vigentes</li>
                <li>Hayas visitado el piso y visto su estado real</li>
                <li>Tengas claro que vas a pedir hipoteca (o ya tengas preaprobación)</li>
                <li>Estés 100% seguro de que quieres ese piso</li>
              </ul>
            </div>

            <div className="mt-8 bg-white border-2 border-purple-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Qué pasa si incumples las Arras</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-900 mb-2">❌ Comprador se arrepiente:</h4>
                  <p className="text-sm text-red-800 mb-2">
                    Pierdes el <strong>100% de la señal</strong> entregada.
                  </p>
                  <p className="text-xs text-red-700">
                    Ejemplo: Entregas 15.000€ → te arrepientes → pierdes 15.000€ completos.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">✅ Vendedor incumple:</h4>
                  <p className="text-sm text-green-800 mb-2">
                    Debe devolver el <strong>doble (200%)</strong> de la señal.
                  </p>
                  <p className="text-xs text-green-700">
                    Ejemplo: Entregas 15.000€ → vendedor incumple → te devuelve 30.000€.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/gestoria/solicitar/arras-penitenciales"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                >
                  Contratar Arras Penitenciales - 145€
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Intermedio */}
          <div className="bg-gradient-to-br from-gold-500 to-gold-700 text-white rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold mb-3">
              ¿Necesitas Ayuda para Decidir Cuál Contratar?
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Nuestros abogados redactan ambos contratos adaptados a tu situación. 
              Te asesoramos sobre cuál usar en cada momento del proceso de compra.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/gestoria/solicitar/reserva-compra"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-gold-500 font-bold hover:bg-gray-100 transition text-lg"
              >
                Reserva - 61€
              </Link>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition text-lg"
              >
                Arras - 145€
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-4">✓ Redacción 48h • ✓ Cláusulas personalizadas • ✓ Asesoría incluida</p>
          </div>

          {/* Errores comunes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              5 Errores Comunes que Cuestan Miles de Euros
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 1. Firmar arras sin comprobar la nota simple</h3>
                <p className="text-red-800 text-sm">
                  Aparecen hipotecas, embargos o el vendedor ni siquiera es el dueño. 
                  Resultado: <strong>pierdes las arras (10.000€ - 30.000€)</strong> aunque no sea culpa tuya. 
                  Siempre pide nota simple ANTES de firmar arras.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 2. Confundir reserva con arras y firmar la incorrecta</h3>
                <p className="text-red-800 text-sm">
                  El vendedor te dice "firma la reserva" pero es un contrato de arras disfrazado. 
                  Entregas 15.000€ pensando que es temporal y <strong>ya no puedes echarte atrás sin perder todo</strong>. 
                  Lee SIEMPRE el documento antes de firmar.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 3. No incluir condiciones suspensivas en las arras</h3>
                <p className="text-red-800 text-sm">
                  Firmas arras sin cláusula "si deniegan hipoteca, se devuelven sin penalización". 
                  El banco dice que no → <strong>pierdes las arras igualmente</strong>. Esta cláusula 
                  es OBLIGATORIA si vas a pedir financiación.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 4. Entregar dinero sin contrato firmado</h3>
                <p className="text-red-800 text-sm">
                  "Dame 5.000€ ahora y mañana hacemos el contrato" = estafa casi segura. 
                  <strong>Primero contrato firmado por ambos, DESPUÉS transferencia</strong>. Nunca al revés.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">❌ 5. Usar plantillas genéricas de internet</h3>
                <p className="text-red-800 text-sm">
                  Plantilla gratis sin personalizar → cláusulas genéricas o ilegales → 
                  un juez puede anular el contrato → <strong>pierdes el dinero y el piso</strong>. 
                  Por ahorrar 61€ arriesgas 10.000€+.
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
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Puedo firmar arras sin haber firmado reserva antes?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Sí, legalmente puedes. Pero NO es recomendable. La reserva te protege de sorpresas 
                  (cargas ocultas, licencias irregulares). Si firmas arras directamente y luego aparece 
                  un problema, pierdes la señal aunque no sea culpa tuya. El orden correcto: reserva → 
                  verificación → arras.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Cuánto dinero se entrega en cada documento?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  <strong>Reserva:</strong> 500€ - 3.000€ (bloqueo temporal). 
                  <strong>Arras:</strong> 5-10% del precio total (10.000€ - 30.000€ en pisos de 200.000€ - 300.000€). 
                  La reserva se suma a las arras si todo va bien, así que solo pagas una vez.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Qué pasa si firmo reserva y me arrepiento sin causa justificada?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Depende del contrato. Lo habitual: si desistes por capricho (sin problema documental), 
                  pierdes la reserva. Si hay causa justificada (hipoteca no declarada, licencia irregular, 
                  ITE caducada), la recuperas íntegra. Por eso es CLAVE que el contrato de reserva incluya 
                  cláusulas de protección.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Es obligatorio hacer estos contratos ante notario?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  No. Un contrato privado firmado por ambas partes es 100% válido. El notario solo es 
                  obligatorio para la ESCRITURA final (compraventa definitiva), no para reserva ni arras. 
                  Un contrato privado profesional (redactado por abogados) cuesta mucho menos (61€ - 145€ 
                  vs 300€ del notario) y tiene la misma validez legal.
                </p>
              </details>
            </div>
          </section>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Contratos Profesionales Adaptados a tu Situación
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Redactados por abogados especializados en derecho inmobiliario. 
              Cláusulas de protección, condiciones suspensivas y garantía legal total.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Link
                href="/gestoria/solicitar/reserva-compra"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition text-lg"
              >
                Reserva - 61€
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition text-lg"
              >
                Arras - 145€
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-1">48h</div>
                <div>Entrega garantizada</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-1">+2.000</div>
                <div>Contratos redactados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-500 mb-1">100%</div>
                <div>Garantía legal</div>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-12 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold-500">Inicio</Link></li>
              <li>›</li>
              <li><Link href="/gestoria" className="hover:text-gold-500">Gestoría</Link></li>
              <li>›</li>
              <li className="text-gray-900 font-medium">Arras vs Reserva</li>
            </ol>
          </nav>
        </div>
      </article>

      <WhatsAppButton />
    </>
  )
}
