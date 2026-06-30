import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Due Diligence Inmobiliaria: Qué Revisar Antes de Comprar [2026] | Desde 350€',
  description: 'Guía de due diligence inmobiliaria: nota simple, cargas, IBI, cédula e ITE. Evita sorpresas de 10.000€ al comprar. Pack de revisión profesional desde 350€ en Inmonest.',
  keywords: 'due diligence inmobiliaria, que revisar antes de comprar piso, documentacion compra vivienda, evitar estafa compra casa, comprar piso particular, nota simple registro, cedula habitabilidad',
  alternates: {
    canonical: `${BASE_URL}/blog/due-diligence-compra-vivienda`,
  },
  openGraph: {
    title: 'Due Diligence: Qué Revisar Antes de Comprar un Piso',
    description: 'Guía completa para evitar sorpresas al comprar una vivienda de particular. Documentación esencial que debes revisar.',
    url: `${BASE_URL}/blog/due-diligence-compra-vivienda`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function DueDiligenceBlogPage() {
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
          <span className="text-[#c9962a] font-semibold">Due Diligence compra vivienda</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Compra segura
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Due Diligence Inmobiliaria: Qué Revisar Antes de Comprar una Vivienda
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            <strong>¿Vas a comprar un piso de particular a particular?</strong> Antes de firmar la escritura, es fundamental revisar toda la documentación para evitar sorpresas que pueden costarte <strong className="text-red-600">10.000€ o más</strong>. En esta guía te explicamos paso a paso qué es el "due diligence" inmobiliario y qué documentos debes verificar.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>📅 Actualizado: Junio 2026</span>
            <span>⏱️ Lectura: 8 minutos</span>
          </div>
        </header>
        <PageHeroImage
          src="/inmonestexterior.png"
          alt="Due Diligence Inmobiliaria: Qué Revisar Antes de Comprar una Vivienda"
          className="mb-12"
        />

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          
          {/* Sección 1 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Qué es el Due Diligence Inmobiliario?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            El <strong>"due diligence"</strong> (diligencia debida en español) es el proceso de <strong>investigación y revisión exhaustiva de toda la documentación</strong> de una vivienda antes de comprarla. Su objetivo es detectar <strong>riesgos legales, técnicos o financieros ocultos</strong> que podrían convertir tu compra en una pesadilla.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cuando compras de <strong>particular a particular</strong> (sin agencia inmobiliaria), <strong className="text-red-600">tú eres el único responsable</strong> de verificar que la vivienda está libre de cargas, deudas y problemas legales. Si no lo haces, podrías encontrarte con:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Deudas de comunidad</strong> de 5.000€+ que heredas como nuevo propietario</li>
            <li><strong>Hipotecas no canceladas</strong> que bloquean la escritura</li>
            <li><strong>Embargos o cargas judiciales</strong> sobre la vivienda</li>
            <li><strong>Falta de cédula de habitabilidad</strong> (obligatoria por ley en muchas comunidades)</li>
            <li><strong>Deudas de IBI</strong> (Impuesto de Bienes Inmuebles) acumuladas</li>
            <li><strong>Reformas ilegales sin licencia</strong> que pueden obligarte a derribar</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <p className="text-amber-900 font-semibold mb-2">⚠️ Caso real</p>
            <p className="text-amber-800">
              Juan compró un piso en Madrid sin revisar la documentación. El día de la escritura descubrió una <strong>deuda de comunidad de 8.500€</strong> y un <strong>embargo por impago de IBI de 3.200€</strong>. Tuvo que pagar 11.700€ adicionales de su bolsillo para poder escriturar.
            </p>
          </div>

          {/* Sección 2 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Documentación que Debes Revisar (Checklist Completa)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Esta es la <strong>lista completa de documentos</strong> que debes solicitar al vendedor y verificar antes de comprar:
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            1. Nota Simple Registral ⭐ (Documento MÁS importante)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La <strong>nota simple</strong> es el documento oficial del Registro de la Propiedad que muestra la "vida jurídica" de la vivienda. Cuesta entre 9€ y 15€ y puedes solicitarla online o en el registro.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Qué debes verificar:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Titularidad:</strong> Que el vendedor sea realmente el propietario legal</li>
            <li><strong>Cargas y gravámenes:</strong> Hipotecas activas, embargos, servidumbres</li>
            <li><strong>Anotaciones preventivas:</strong> Demandas, herencias en litigio</li>
            <li><strong>Descripción física:</strong> Metros, distribución (debe coincidir con la realidad)</li>
            <li><strong>Referencia catastral:</strong> Debe coincidir con el catastro</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <p className="text-blue-900 font-semibold mb-2">💡 Consejo experto</p>
            <p className="text-blue-800">
              Pide la nota simple <strong>lo más cerca posible de la firma de arras</strong>. Es válida en el momento de emisión, así que si la solicitas con 3 meses de antelación, podría aparecer un embargo nuevo después.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            2. Certificado de Deudas de la Comunidad
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            El administrador de fincas debe emitir un <strong>certificado oficial</strong> que confirme que el piso <strong>no tiene deudas pendientes</strong> con la comunidad de propietarios.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong className="text-red-600">IMPORTANTE:</strong> Según la Ley de Propiedad Horizontal, <strong>el nuevo propietario hereda las deudas de comunidad del anterior</strong> (hasta un año antes de la venta). Por eso es crítico que este certificado diga "cero deudas".
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Qué debes verificar:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Cuota mensual ordinaria al día (últimos 12 meses)</li>
            <li>No hay derramas extraordinarias pendientes</li>
            <li>No hay derramas extraordinarias aprobadas pero no ejecutadas (pueden ser miles de euros)</li>
            <li>El certificado debe estar <strong>firmado y sellado</strong> por el administrador</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            3. IBI (Impuesto de Bienes Inmuebles) al Día
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            El <strong>IBI</strong> es el impuesto municipal que se paga cada año. Pide al vendedor el <strong>último recibo pagado</strong> (o los últimos 3 años para mayor seguridad).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>¿Por qué es importante?</strong> Si el vendedor tiene <strong>deudas de IBI acumuladas</strong>, el Ayuntamiento puede poner un <strong>embargo sobre la vivienda</strong> que impedirá la escritura. Tú, como comprador, NO heredas estas deudas, pero el proceso se bloqueará hasta que el vendedor las pague.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            4. Cédula de Habitabilidad (Obligatoria en muchas comunidades)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La <strong>cédula de habitabilidad</strong> es un certificado que acredita que la vivienda <strong>cumple las condiciones mínimas de habitabilidad</strong>. Es <strong>obligatoria por ley en:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Cataluña:</strong> Obligatoria para compraventa (vigencia 15 años)</li>
            <li><strong>País Vasco:</strong> Obligatoria (vigencia 10 años)</li>
            <li><strong>Navarra:</strong> Obligatoria (vigencia 25 años)</li>
            <li><strong>Extremadura:</strong> Obligatoria (vigencia 25 años)</li>
            <li><strong>Andalucía:</strong> Cédula de habitabilidad de primera ocupación (si es necesario)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong className="text-red-600">Sin cédula vigente, el notario puede negarse a hacer la escritura</strong> en estas comunidades. El coste de obtenerla es de 80€-150€ y puede tardar 2-4 semanas.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            5. Certificado de Eficiencia Energética
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            El <strong>certificado energético</strong> es <strong>obligatorio en toda España</strong> desde 2013 para vender o alquilar una vivienda. Indica la eficiencia energética del piso (de A a G).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sin este certificado, la venta es NULA por ley.</strong> El vendedor debe entregártelo antes de firmar arras. Coste: 80€-150€, vigencia: 10 años.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            6. ITE (Inspección Técnica del Edificio)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La <strong>ITE</strong> es obligatoria en edificios con <strong>más de 50 años</strong> en ciudades como Madrid y Barcelona. Es un informe técnico que evalúa el estado de conservación del edificio.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>¿Por qué importa?</strong> Si la ITE detecta <strong>deficiencias graves</strong>, el edificio puede ser obligado a hacer <strong>obras de rehabilitación urgente</strong>, lo que implica <strong>derramas extraordinarias</strong> de 10.000€-30.000€ por vivienda.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            7. Licencias de Obra (Si ha habido reformas)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si el piso ha tenido <strong>reformas importantes</strong> (ampliación, cambio de distribución, obras estructurales), el vendedor debe tener <strong>licencia de obra municipal</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong className="text-red-600">Reformas sin licencia = ilegales.</strong> El Ayuntamiento puede obligarte a <strong>deshacer las obras</strong> o multarte con 6.000€-30.000€.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            8. Suministros (Luz, Agua, Gas) Sin Deudas
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pide al vendedor los <strong>últimos recibos pagados</strong> de luz, agua y gas. Verifica que:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>No hay deudas acumuladas</li>
            <li>Los contratos están a nombre del propietario actual</li>
            <li>Los contadores funcionan correctamente</li>
          </ul>

          {/* Sección 3 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Errores Comunes que Debes Evitar
          </h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <p className="font-bold text-red-900 mb-2">❌ Error 1: Confiar solo en la palabra del vendedor</p>
              <p className="text-red-800">
                "El vendedor me dijo que no hay deudas" NO es suficiente. <strong>Exige documentación oficial y certificados sellados.</strong>
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <p className="font-bold text-red-900 mb-2">❌ Error 2: Firmar arras sin haber visto la nota simple</p>
              <p className="text-red-800">
                Muchos compradores firman el contrato de arras y <strong>después</strong> piden la nota simple. Si descubres un embargo, ya perdiste la señal (10-15% del precio).
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <p className="font-bold text-red-900 mb-2">❌ Error 3: No verificar las medidas reales</p>
              <p className="text-red-800">
                El vendedor dice "80m²" pero la nota simple dice "60m² útiles". Verifica que <strong>el registro, catastro y realidad coincidan</strong>.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <p className="font-bold text-red-900 mb-2">❌ Error 4: No preguntar por derramas extraordinarias aprobadas</p>
              <p className="text-red-800">
                La comunidad puede haber <strong>aprobado una derrama de 15.000€ por vivienda</strong> que aún no se ha ejecutado. Como nuevo propietario, <strong>tú la pagas</strong>.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <p className="font-bold text-red-900 mb-2">❌ Error 5: No contratar un gestor experto</p>
              <p className="text-red-800">
                Revisar toda esta documentación tú solo puede llevar <strong>20-30 horas</strong> y requiere conocimientos legales. Un error puede costarte <strong>10.000€+</strong>.
              </p>
            </div>
          </div>

          {/* Sección 4 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Cuándo Debes Hacer el Due Diligence?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            El momento ideal para hacer el <strong>due diligence</strong> es:
          </p>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
            <p className="font-bold text-green-900 mb-3">✅ Línea de tiempo recomendada:</p>
            <ol className="list-decimal list-inside text-green-800 space-y-2">
              <li><strong>Antes de firmar el contrato de arras:</strong> Solicita y revisa toda la documentación básica (nota simple, certificado comunidad, IBI)</li>
              <li><strong>Entre arras y escritura (1-3 meses):</strong> Verifica el resto de documentos (cédula, ITE, licencias de obra, suministros)</li>
              <li><strong>1 semana antes de escritura:</strong> Pide nota simple actualizada y certificado de comunidad actualizado (para verificar que no han aparecido cargas nuevas)</li>
            </ol>
          </div>

          {/* Sección 5 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            ¿Necesitas Ayuda Profesional?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si todo esto te parece abrumador (y lo es), puedes contratar un <strong>servicio de Due Diligence profesional</strong>. Un gestor inmobiliario experto:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Solicita y revisa TODA la documentación oficial</li>
            <li>Detecta riesgos ocultos que tú no verías</li>
            <li>Te entrega un informe completo con recomendaciones</li>
            <li>Te acompaña hasta el día de la escritura</li>
            <li>Te ahorra 20-30 horas de trabajo</li>
          </ul>

          <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] p-8 rounded-2xl text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">Pack Due Diligence Pre-Compra — 350€</h3>
            <p className="text-white/90 mb-6">
              Gestor inmobiliario experto revisa toda la documentación de tu futura vivienda. Detectamos problemas ANTES de firmar. Evita sorpresas de 10.000€+.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/gestoria/solicitar/pack-due-diligence-precompra"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
              >
                Contratar servicio (350€) →
              </Link>
              <Link
                href="/gestoria/due-diligence-precompra/barcelona"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Revisión compra Barcelona
              </Link>
              <Link
                href="/gestoria/due-diligence-precompra/zaragoza"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Revisión compra Zaragoza
              </Link>
              <Link
                href="/gestoria/due-diligence-precompra/coruna"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Revisión compra A Coruña
              </Link>
            </div>
          </div>

          {/* Conclusión */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conclusión
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Comprar una vivienda es la <strong>inversión más grande</strong> que harás en tu vida. No dejes que un error de 10.000€+ arruine tu sueño. El <strong>due diligence inmobiliario</strong> es tu <strong>seguro contra sorpresas desagradables</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Resumen de documentos críticos que debes revisar:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>✅ Nota simple registral (la más importante)</li>
            <li>✅ Certificado de deudas de comunidad</li>
            <li>✅ IBI pagado</li>
            <li>✅ Cédula de habitabilidad (si es obligatoria en tu comunidad)</li>
            <li>✅ Certificado energético</li>
            <li>✅ ITE (si el edificio tiene +50 años)</li>
            <li>✅ Licencias de obra (si ha habido reformas)</li>
            <li>✅ Suministros sin deudas</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Si compras de particular a particular sin agencia, tú eres el responsable de verificar todo esto.</strong> No confíes solo en la palabra del vendedor. Exige documentación oficial.
          </p>

        </div>

        {/* CTA Final */}
        <div className="mt-16 bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda con tu compra?
          </h3>
          <p className="text-gray-700 mb-6">
            Nuestros gestores expertos revisan toda la documentación por ti. Evita errores que pueden costarte miles de euros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/pack-due-diligence-precompra"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-bold hover:bg-[#a87a20] transition-colors shadow-lg"
            >
              Contratar Due Diligence (350€)
            </Link>
            <Link
              href="/gestoria"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#c9962a] text-[#c9962a] font-semibold hover:bg-[#c9962a] hover:text-white transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>

        {/* Artículos relacionados */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/asesoria-juridica-compra-vivienda"
              className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Asesoría Jurídica en la Compra de Vivienda
              </h4>
              <p className="text-gray-600 text-sm">
                Descubre qué revisa un gestor inmobiliario especializado y por qué es la mejor inversión.
              </p>
            </Link>
            <Link
              href="/blog/servicio-completo-compra-vivienda"
              className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
            >
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Servicio Completo de Compra: Reserva a Escritura
              </h4>
              <p className="text-gray-600 text-sm">
                El servicio integral que te acompaña desde la reserva hasta la firma ante notario.
              </p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
