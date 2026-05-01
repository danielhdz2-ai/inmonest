import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import Image from 'next/image'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contrato de Arrendamiento LAU 2026 【Guía Completa + Plantilla Gratis】',
  description: '¿Qué es un contrato de arrendamiento LAU? Guía completa 2026: cláusulas obligatorias, duración, fianza, subida de renta. Plantilla gratis + Revisión legal desde 7€. ✓',
  alternates: {
    canonical: `${BASE_URL}/blog/contrato-arrendamiento-lau`,
  },
  openGraph: {
    title: 'Contrato de Arrendamiento LAU 2026 - Guía Completa',
    description: 'Todo sobre contratos de arrendamiento LAU: cláusulas, duración, fianza, derechos. Plantilla gratis.',
    url: `${BASE_URL}/blog/contrato-arrendamiento-lau`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function ContratoArrendamientoLAUPage() {
  return (
    <>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/blog" className="hover:text-[#c9962a]">Blog</Link>
            <span>→</span>
            <span>Contratos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Contrato de Arrendamiento LAU 2026:<br />Guía Completa + Plantilla Gratis
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Todo lo que necesitas saber sobre el contrato de arrendamiento de vivienda según la Ley 29/1994 (LAU). Cláusulas obligatorias, duración, fianza y derechos.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span>📅 Actualizado: 1 mayo 2026</span>
            <span>⏱ Lectura: 8 min</span>
          </div>
        </header>

        {/* Índice */}
        <nav className="bg-gray-50 rounded-xl p-6 mb-10 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">📋 Índice de contenidos</h2>
          <ol className="space-y-2 text-gray-700">
            <li><a href="#que-es" className="hover:text-[#c9962a]">1. ¿Qué es un contrato de arrendamiento LAU?</a></li>
            <li><a href="#clausulas" className="hover:text-[#c9962a]">2. Cláusulas obligatorias del contrato LAU</a></li>
            <li><a href="#duracion" className="hover:text-[#c9962a]">3. Duración del contrato de arrendamiento</a></li>
            <li><a href="#fianza" className="hover:text-[#c9962a]">4. Fianza y depósitos</a></li>
            <li><a href="#subida-renta" className="hover:text-[#c9962a]">5. Subida de renta anual</a></li>
            <li><a href="#rescision" className="hover:text-[#c9962a]">6. Cómo rescindir el contrato</a></li>
            <li><a href="#plantilla" className="hover:text-[#c9962a]">7. Plantilla gratis de contrato LAU</a></li>
          </ol>
        </nav>

        {/* Contenido principal */}
        <div className="prose prose-lg max-w-none">
          
          {/* Sección 1 */}
          <section id="que-es" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué es un contrato de arrendamiento LAU?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El <strong>contrato de arrendamiento LAU</strong> (Ley de Arrendamientos Urbanos) es el documento legal que regula el alquiler de viviendas habituales en España según la <strong>Ley 29/1994</strong>, modificada en 2019.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este contrato protege tanto al <strong>propietario</strong> como al <strong>inquilino</strong>, estableciendo derechos y obligaciones para ambas partes.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <p className="text-blue-900 font-semibold mb-2">📌 Dato importante</p>
              <p className="text-blue-800">
                El 90% de los contratos de alquiler en España se rigen por la LAU. Solo quedan fuera los alquileres turísticos y de temporada (menos de 5 meses).
              </p>
            </div>
          </section>

          {/* Sección 2 */}
          <section id="clausulas" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cláusulas obligatorias del contrato LAU</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Un contrato de arrendamiento LAU válido debe incluir obligatoriamente:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Identificación de las partes</h3>
                <p className="text-gray-700">Nombre completo, DNI y domicilio del propietario e inquilino.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Descripción del inmueble</h3>
                <p className="text-gray-700">Dirección completa, superficie, número de habitaciones, referencia catastral.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Duración del contrato</h3>
                <p className="text-gray-700">Fecha de inicio y finalización. Mínimo 5 años para personas físicas, 7 años para personas jurídicas.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Renta mensual</h3>
                <p className="text-gray-700">Cantidad exacta, forma de pago (transferencia, domiciliación), día de pago.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Fianza</h3>
                <p className="text-gray-700">Equivalente a 1 mes de renta (2 meses si es local comercial). Debe depositarse en el organismo autonómico.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Gastos y suministros</h3>
                <p className="text-gray-700">Quién paga IBI, comunidad, agua, luz, gas. El IBI siempre es del propietario salvo pacto.</p>
              </div>
            </div>
          </section>

          {/* Sección 3 */}
          <section id="duracion" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Duración del contrato de arrendamiento</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Desde la reforma de 2019, la duración del contrato LAU es:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-gradient-to-br from-[#c9962a]/10 to-[#f4c94a]/10 border border-[#c9962a]/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">👤 Propietario persona física</h3>
                <p className="text-3xl font-extrabold text-[#c9962a] mb-2">5 años</p>
                <p className="text-gray-700 text-sm">Duración mínima obligatoria. Prorrogable hasta 3 años más.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏢 Propietario persona jurídica</h3>
                <p className="text-3xl font-extrabold text-gray-700 mb-2">7 años</p>
                <p className="text-gray-700 text-sm">Duración mínima obligatoria. Prorrogable hasta 3 años más.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-6">
              <p className="text-yellow-900 font-semibold mb-2">⚠️ Importante para inquilinos</p>
              <p className="text-yellow-800">
                El inquilino puede marcharse a partir de los <strong>6 meses</strong> sin penalización, avisando con <strong>30 días de antelación</strong>. El propietario NO puede desahuciar antes de los 5 años (salvo impago).
              </p>
            </div>
          </section>

          {/* Sección 4 */}
          <section id="fianza" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fianza y depósitos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La <strong>fianza legal</strong> es obligatoria y equivale a:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">•</span>
                <span className="text-gray-700"><strong>1 mes de renta</strong> para viviendas habituales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">•</span>
                <span className="text-gray-700"><strong>2 meses de renta</strong> para locales comerciales</span>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              Esta fianza debe depositarse en el <strong>organismo autonómico</strong> correspondiente (IVIMA en Madrid, INCASOL en Cataluña, etc.) en un plazo de <strong>30 días</strong> desde la firma.
            </p>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6">
              <p className="text-red-900 font-semibold mb-2">❌ Cuidado con fianzas abusivas</p>
              <p className="text-red-800">
                Es <strong>ilegal</strong> pedir más de 1 mes de fianza para viviendas. Algunos propietarios piden "2 meses de fianza" o "1 mes de depósito extra". Esto NO es legal según la LAU.
              </p>
            </div>
          </section>

          {/* Sección 5 */}
          <section id="subida-renta" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subida de renta anual</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El propietario puede subir la renta <strong>una vez al año</strong> según el índice que se haya pactado en el contrato:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">IPC (Índice de Precios al Consumo)</h3>
                <p className="text-gray-700">Es el más común. En 2026, el IPC anual es del 3.2%.</p>
                <p className="text-sm text-gray-500 mt-2">Ejemplo: Renta de 800€ → Subida de 25.60€ → Nueva renta: 825.60€</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">Porcentaje fijo</h3>
                <p className="text-gray-700">Se puede pactar un % fijo (ej: 2% anual).</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">Sin actualización</h3>
                <p className="text-gray-700">Se puede renunciar a la actualización si el inquilino y propietario están de acuerdo.</p>
              </div>
            </div>
          </section>

          {/* Sección 6 */}
          <section id="rescision" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo rescindir el contrato</h2>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Por parte del inquilino:</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              El inquilino puede rescindir el contrato a partir de los <strong>6 meses</strong> avisando con <strong>30 días de antelación</strong> por escrito (burofax recomendado).
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Por parte del propietario:</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              El propietario solo puede rescindir antes de los 5 años si:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✗</span>
                <span className="text-gray-700">El inquilino no paga la renta (3 meses de impago)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✗</span>
                <span className="text-gray-700">El inquilino subarrienda sin permiso</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✗</span>
                <span className="text-gray-700">El inquilino causa daños en la vivienda</span>
              </li>
            </ul>
          </section>

          {/* Sección 7 - CTA principal */}
          <section id="plantilla" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plantilla gratis de contrato LAU</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Puedes descargar una <strong>plantilla básica</strong> de contrato de arrendamiento LAU, pero recuerda que cada situación es única y es recomendable una <strong>revisión legal</strong> para evitar problemas futuros.
            </p>

            <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] rounded-2xl p-8 text-white mb-6">
              <h3 className="text-2xl font-bold mb-3">¿Necesitas un contrato profesional?</h3>
              <p className="text-white/80 mb-6">
                Nuestros abogados especializados redactan tu contrato de arrendamiento LAU personalizado con cláusulas adaptadas a tu situación. <strong>Desde 7€.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/gestoria/contrato-alquiler"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Ver servicio de gestoría →
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Descargar plantilla gratis
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas frecuentes (FAQ)</h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Es obligatorio firmar un contrato de arrendamiento?</summary>
                <p className="text-gray-700 mt-3">
                  Sí, aunque sea verbal, existe un contrato. Pero es <strong>altamente recomendable</strong> firmarlo por escrito para tener pruebas legales.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puedo subarrendar mi piso con un contrato LAU?</summary>
                <p className="text-gray-700 mt-3">
                  Solo si el propietario te da <strong>permiso expreso</strong> por escrito. Sin permiso, el subarriendo es motivo de desahucio.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué pasa si no deposito la fianza?</summary>
                <p className="text-gray-700 mt-3">
                  El propietario puede recibir <strong>multas de hasta 3 veces</strong> el importe de la fianza. El inquilino puede denunciarlo a la Comunidad Autónoma.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puede el propietario entrar en mi piso sin avisar?</summary>
                <p className="text-gray-700 mt-3">
                  <strong>No.</strong> El propietario debe pedir permiso y avisar con antelación. La vivienda es tu domicilio privado.
                </p>
              </details>
            </div>
          </section>

          {/* Conclusión */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusión</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El <strong>contrato de arrendamiento LAU</strong> es el pilar fundamental del alquiler de viviendas en España. Conocer tus derechos y obligaciones te protege de problemas legales y económicos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si tienes dudas o quieres un contrato personalizado, <Link href="/gestoria" className="text-[#c9962a] font-semibold hover:underline">nuestros abogados te ayudan desde 7€</Link>.
            </p>
          </section>

        </div>

        {/* Relacionados */}
        <aside className="border-t border-gray-200 pt-8 mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Artículos relacionados</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/vender-piso-sin-comisiones" className="group p-4 border border-gray-200 rounded-lg hover:border-[#c9962a] transition-colors">
              <h4 className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-2">
                Vender Piso Sin Comisiones →
              </h4>
              <p className="text-sm text-gray-600">Guía completa para vender sin agencia</p>
            </Link>
            <Link href="/gestoria/contrato-arras" className="group p-4 border border-gray-200 rounded-lg hover:border-[#c9962a] transition-colors">
              <h4 className="font-semibold text-gray-900 group-hover:text-[#c9962a] mb-2">
                Contrato de Arras →
              </h4>
              <p className="text-sm text-gray-600">Protege tu señal de compra</p>
            </Link>
          </div>
        </aside>

      </article>
    </>
  )
}
