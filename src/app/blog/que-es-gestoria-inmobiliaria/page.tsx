import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'
import Footer from '@/components/Footer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria: Qué Es, Servicios y Precios desde 61€ [2026]',
  description: '¿Qué es una gestoría inmobiliaria y para qué sirve? Contratos de arras, alquiler LAU y compraventa desde 61€. Comparativa con notaría y agencias. Guía completa 2026.',
  keywords: 'que es una gestoria inmobiliaria, gestoria inmobiliaria funciones, servicios gestoria inmobiliaria, cuanto cuesta gestoria inmobiliaria, para que sirve gestoria inmobiliaria',
  alternates: {
    canonical: `${BASE_URL}/blog/que-es-gestoria-inmobiliaria`,
  },
  openGraph: {
    title: '¿Qué es una Gestoría Inmobiliaria? — Guía Completa 2026',
    description: 'Todo lo que necesitas saber sobre gestorías inmobiliarias: funciones, servicios, precios y cuándo contratarlas.',
    url: `${BASE_URL}/blog/que-es-gestoria-inmobiliaria`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function QueEsGestoriaInmobiliariaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#c9962a]">Blog</Link>
          <span>/</span>
          <span className="text-[#c9962a] font-semibold">¿Qué es una gestoría inmobiliaria?</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Gestoría Inmobiliaria
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            ¿Qué es una Gestoría Inmobiliaria? Guía Completa 2026
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Una <strong>gestoría inmobiliaria</strong> es una empresa especializada en <strong>tramitar contratos, documentación legal y asesoría jurídica</strong> relacionada con la <strong>compra, venta o alquiler</strong> de propiedades. A diferencia de una agencia inmobiliaria (que vende pisos), una gestoría se enfoca en la <strong>parte legal y documental</strong>.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>📅 Actualizado: Junio 2026</span>
            <span>⏱️ Lectura: 7 minutos</span>
          </div>
        </header>
        <PageHeroImage
          src="/inmonestexterior.png"
          alt="¿Qué es una Gestoría Inmobiliaria? Guía Completa 2026"
          className="mb-12"
        />

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          
          {/* Sección 1 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Qué hace una Gestoría Inmobiliaria?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Una gestoría inmobiliaria se especializa en <strong>3 áreas principales</strong>:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-4 mb-6">
            <li>
              <strong>Redacción de contratos inmobiliarios</strong> — Contratos de arras, alquiler LAU, compraventa, rescisión, opción de compra, etc. Redactados por <strong>abogados expertos</strong>, no plantillas genéricas de internet.
            </li>
            <li>
              <strong>Revisión legal de documentación</strong> — Analizan contratos ya firmados para detectar cláusulas ilegales, errores, riesgos o trampas que puedan costarte dinero.
            </li>
            <li>
              <strong>Asesoría y acompañamiento</strong> — Te guían durante todo el proceso de compra/venta/alquiler, desde la reserva hasta la escritura ante notario.
            </li>
          </ol>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <p className="text-green-900 font-semibold mb-2">✅ Diferencia clave:</p>
            <p className="text-green-800">
              <strong>Agencia inmobiliaria:</strong> Te vende un piso (cobra 3-5% comisión sobre el precio).<br />
              <strong>Gestoría inmobiliaria:</strong> Te redacta los contratos legales (cobra tarifa fija, desde 29€).
            </p>
          </div>

          {/* Sección 2 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Servicios de una Gestoría Inmobiliaria (con precios)
          </h2>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            1. Contratos de Compraventa
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Contrato de arras penitenciales</strong> — 145€ (el más común)</li>
            <li><strong>Contrato de arras confirmatorias</strong> — 145€</li>
            <li><strong>Contrato de reserva de compra</strong> — 61€ (bloqueo 48-72h)</li>
            <li><strong>Contrato de compraventa</strong> — 80€</li>
            <li><strong>Pack Due Diligence pre-compra</strong> — 350€ (revisión completa antes de escriturar)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            2. Contratos de Alquiler
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Contrato de alquiler LAU</strong> (vivienda habitual) — 145€</li>
            <li><strong>Contrato de alquiler temporal</strong> — 165€</li>
            <li><strong>Contrato de alquiler de habitación</strong> — 121€</li>
            <li><strong>Contrato de rescisión de alquiler</strong> — 73€</li>
            <li><strong>Contrato de reserva de alquiler</strong> — 61€</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            3. Revisión Legal de Contratos
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Revisión de contrato de arras</strong> — 60€</li>
            <li><strong>Revisión de contrato de alquiler</strong> — 60€</li>
            <li><strong>Revisión + corrección (versión corregida incluida)</strong> — 120€</li>
            <li><strong>Análisis de fraude inmobiliario</strong> — 29€ (urgente en 12h)</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            4. Servicios Premium (Acompañamiento Completo)
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Servicio completo de venta</strong> — 687€ (desde reserva hasta escritura)</li>
            <li><strong>Servicio completo de compra</strong> — 687€ (desde reserva hasta escritura)</li>
            <li><strong>Asesoramiento arras hasta escritura</strong> — 166€ (solo para vendedores)</li>
          </ul>

          {/* Sección 3 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Cuándo necesitas una Gestoría Inmobiliaria?
          </h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">✓ Compras un piso de particular a particular (sin agencia)</p>
              <p className="text-blue-800">
                Necesitas un <strong>contrato de arras</strong> redactado por un profesional para proteger tu señal (10-15% del precio). Un error puede costarte 10.000€+.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">✓ Vas a alquilar tu piso y no confías en plantillas de internet</p>
              <p className="text-blue-800">
                Un <strong>contrato LAU profesional</strong> adaptado a la Ley de Vivienda 2026 evita que el inquilino se ampare en cláusulas ilegales para no pagar o no irse.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">✓ Te dan un contrato para firmar y quieres que un abogado lo revise</p>
              <p className="text-blue-800">
                Por <strong>60€</strong> un abogado especializado detecta cláusulas abusivas, errores o trampas que podrían costarte miles de euros.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">✓ Ya firmaste arras y quieres asegurarte antes de escriturar</p>
              <p className="text-blue-800">
                El <strong>Pack Due Diligence</strong> (350€) revisa TODO: deudas de comunidad, IBI, ITE, nota simple, cargas, hipotecas... Evita sorpresas el día de la escritura.
              </p>
            </div>
          </div>

          {/* Sección 4 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Gestoría Inmobiliaria vs Notario vs Agencia
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Servicio</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Gestoría</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Notario</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Agencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 border-b text-gray-700">Contrato de arras</td>
                  <td className="px-6 py-4 border-b text-green-700 font-semibold">✓ 145€</td>
                  <td className="px-6 py-4 border-b text-yellow-700">300-500€</td>
                  <td className="px-6 py-4 border-b text-red-700">No lo hace</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b text-gray-700">Contrato alquiler LAU</td>
                  <td className="px-6 py-4 border-b text-green-700 font-semibold">✓ 120€</td>
                  <td className="px-6 py-4 border-b text-yellow-700">300-500€</td>
                  <td className="px-6 py-4 border-b text-yellow-700">Plantilla gratis (genérica)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b text-gray-700">Revisión contrato</td>
                  <td className="px-6 py-4 border-b text-green-700 font-semibold">✓ 60€</td>
                  <td className="px-6 py-4 border-b text-red-700">No lo hace</td>
                  <td className="px-6 py-4 border-b text-red-700">No lo hace</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b text-gray-700">Escritura pública</td>
                  <td className="px-6 py-4 border-b text-red-700">No lo hace</td>
                  <td className="px-6 py-4 border-b text-green-700 font-semibold">✓ Obligatorio</td>
                  <td className="px-6 py-4 border-b text-red-700">No lo hace</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700">Buscar comprador/inquilino</td>
                  <td className="px-6 py-4 text-red-700">No lo hace</td>
                  <td className="px-6 py-4 text-red-700">No lo hace</td>
                  <td className="px-6 py-4 text-green-700 font-semibold">✓ Sí (3-5% comisión)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sección 5 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Cuánto cuesta una Gestoría Inmobiliaria en 2026?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Los precios varían según el servicio, pero en <strong>Inmonest</strong> (gestoría online) los rangos son:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>29€ - 61€</strong> — Servicios básicos (análisis de fraude, reservas)</li>
            <li><strong>145€</strong> — Contratos estándar (LAU, arras)</li>
            <li><strong>350€ - 424€</strong> — Servicios avanzados (Due Diligence, acompañamiento)</li>
            <li><strong>687€</strong> — Servicio completo premium (reserva a escritura)</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <p className="text-amber-900 font-semibold mb-2">💰 Comparativa de ahorro</p>
            <p className="text-amber-800">
              <strong>Agencia tradicional:</strong> 3% de 200.000€ = <span className="font-bold text-red-600">6.000€</span><br />
              <strong>Gestoría online (Inmonest):</strong> Servicio completo = <span className="font-bold text-green-600">687€</span><br />
              <strong>Ahorro:</strong> <span className="font-bold text-green-600">5.313€</span> (88% menos)
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] p-8 rounded-2xl text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas servicios de gestoría inmobiliaria?</h3>
            <p className="text-white/90 mb-6">
              En <strong>Inmonest</strong> somos una gestoría inmobiliaria online con abogados especializados. Contratos redactados a medida, revisión legal profesional y asesoría completa. <strong>Desde 29€</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gestoria"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
              >
                Ver todos los servicios →
              </Link>
              <a
                href="tel:+34745022862"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                📞 Llamar: 745 022 862
              </a>
            </div>
          </div>

          {/* Conclusión */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conclusión
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Una <strong>gestoría inmobiliaria</strong> es tu mejor aliado en operaciones de compra, venta o alquiler cuando quieres <strong>seguridad jurídica</strong> sin pagar las comisiones abusivas de una agencia (3-5% del precio).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Por menos de <strong>200€</strong> puedes tener contratos redactados por abogados expertos, revisión legal profesional y asesoría durante todo el proceso. Es una <strong>inversión mínima</strong> comparada con los riesgos de usar plantillas genéricas de internet o firmar contratos sin revisar.
          </p>

        </div>

      </article>
      <Footer />
    </div>
  )
}
