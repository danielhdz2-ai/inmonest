import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Servicio Completo de Compra de Vivienda: Reserva a Escritura | Inmonest',
  description:
    'Revisión de contratos con agencias, análisis de honorarios, coordinación con notaría... Descubre el servicio integral que te acompaña en todo el proceso de compra.',
  alternates: { canonical: `${BASE_URL}/blog/servicio-completo-compra-vivienda` },
  openGraph: {
    title: 'Servicio Completo de Compra: De la Reserva a la Escritura con Todas las Garantías',
    description:
      'El servicio integral de gestoría inmobiliaria que te acompaña desde la reserva hasta la firma ante notario. Desde 550 €.',
    url: `${BASE_URL}/blog/servicio-completo-compra-vivienda`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function ServicioCompletoCompraPost() {
  const schemaArticle = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Servicio Completo de Compra: De la Reserva a la Escritura con Todas las Garantías',
    description:
      'Guía completa sobre el servicio integral de gestoría inmobiliaria en la compraventa de viviendas.',
    author: { '@type': 'Organization', name: 'Inmonest' },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2026-05-05',
    dateModified: '2026-05-05',
    url: `${BASE_URL}/blog/servicio-completo-compra-vivienda`,
    inLanguage: 'es-ES',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaArticle }} />
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Servicio completo de compra</span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Gestoría
              </span>
              <time className="text-sm text-gray-500">5 de mayo de 2026</time>
              <span className="text-sm text-gray-400">· 6 min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Servicio completo de compra: de la reserva a la escritura con todas las garantías
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Revisión de contratos con agencias, análisis de honorarios, coordinación con notaría... Descubre cómo funciona el servicio integral que te acompaña en todo el proceso.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              Comprar una vivienda es un proceso largo que puede durar entre 2 y 4 meses desde la reserva hasta la firma
              ante notario. Son muchos los pasos, documentos y trámites. Y en cada uno de ellos puedes cometer errores
              costosos.
            </p>
            <p>
              El <strong>Servicio Completo de Compra: Reserva a Escritura</strong> es el servicio más completo de
              gestoría inmobiliaria. Te acompaña en todo el proceso con asesoramiento jurídico continuo, revisión de
              todos los contratos y coordinación con agencias y notaría.
            </p>

            <h2>¿Qué incluye exactamente el servicio completo?</h2>

            <h3>1. Revisión del contrato de reserva</h3>
            <p>
              El primer documento que firmas. Aquí empiezan los problemas si no está bien redactado:
            </p>
            <ul>
              <li><strong>Cláusulas de penalización abusivas</strong>: si te echas atrás, ¿pierdes toda la señal incluso antes de firmar arras?</li>
              <li><strong>Plazos para financiación</strong>: si el banco tarda más de lo previsto, ¿pierdes la reserva?</li>
              <li><strong>Condiciones suspensivas</strong>: ¿recuperas la señal si el banco te deniega la hipoteca?</li>
            </ul>
            <p>
              Revisamos el contrato antes de que lo firmes y te asesoramos sobre las cláusulas problemáticas.
            </p>

            <h3>2. Análisis exhaustivo de la nota registral</h3>
            <p>
              La nota simple del Registro de la Propiedad es el documento más importante. Revisamos:
            </p>
            <ul>
              <li><strong>Titularidad real del inmueble</strong>: confirmamos que el vendedor es el propietario legítimo.</li>
              <li><strong>Cargas y gravámenes</strong>: hipotecas, embargos, usufructos, servidumbres.</li>
              <li><strong>Superficie registrada vs. catastral</strong>: discrepancias que pueden afectar al valor y a la hipoteca.</li>
              <li><strong>Situación urbanística</strong>: si la vivienda está en suelo protegido, rústico o con limitaciones.</li>
            </ul>

            <h3>3. Verificación de documentación urbanística</h3>
            <p>
              Según la ciudad, necesitas documentación específica. Verificamos que todo está en orden:
            </p>
            <ul>
              <li><strong>Barcelona</strong>: ITE (Inspección Técnica del Edificio) y cédula de habitabilidad.</li>
              <li><strong>Madrid</strong>: IEE (Inspección de Edificios) e ITE para edificios de más de 50 años.</li>
              <li><strong>Valencia</strong>: Cédula de habitabilidad obligatoria para cualquier compraventa.</li>
            </ul>
            <p>
              Sin estos documentos, la compraventa puede no inscribirse o generarte multas de hasta 3.000 €.
            </p>

            <h3>4. Redacción del contrato de arras</h3>
            <p>
              El contrato de arras formaliza la intención de compraventa. Puede ser:
            </p>
            <ul>
              <li><strong>Arras penitenciales</strong>: permiten el desistimiento con penalización económica.</li>
              <li><strong>Arras confirmatorias</strong>: obligan al cumplimiento forzoso del contrato.</li>
            </ul>
            <p>
              Redactamos el contrato personalizado según tu caso concreto, con todas las cláusulas de protección
              necesarias (condiciones suspensivas por financiación, plazos, penalizaciones, etc.).
            </p>

            <h3>5. Revisión de contratos con agencias inmobiliarias</h3>
            <p>
              Si compras a través de agencia, revisamos:
            </p>
            <ul>
              <li><strong>Nota de encargo</strong>: el documento que firmas con la agencia al reservar la vivienda.</li>
              <li><strong>Honorarios</strong>: verificamos que cumplen con la normativa autonómica y son razonables.</li>
              <li><strong>Cláusulas de exclusividad</strong>: si te obligan a pagar comisión incluso si compras por tu cuenta después.</li>
              <li><strong>Servicios incluidos</strong>: qué hace exactamente la agencia a cambio de su comisión.</li>
            </ul>
            <p>
              <strong>Ejemplo real:</strong> Un cliente iba a pagar 12.000 € de comisión a la agencia por una vivienda
              de 300.000 €. Revisamos el contrato y detectamos que la nota de encargo no estaba firmada correctamente.
              Negociamos y redujimos la comisión a 6.000 €. Ahorro: 6.000 €.
            </p>

            <h3>6. Análisis de honorarios y notas de encargo</h3>
            <p>
              Muchas agencias cobran honorarios abusivos o incluyen conceptos no permitidos:
            </p>
            <ul>
              <li>Comisiones superiores al 5 % del precio de venta (el máximo razonable).</li>
              <li>Cobro de "gastos de gestión" no especificados en la nota de encargo.</li>
              <li>Cobro al comprador cuando solo el vendedor contrató a la agencia.</li>
            </ul>
            <p>
              Revisamos todos los conceptos y te asesoramos sobre qué puedes negociar o reclamar.
            </p>

            <h3>7. Coordinación con la notaría para la escritura</h3>
            <p>
              Cuando llega el momento de firmar la escritura ante notario:
            </p>
            <ul>
              <li><strong>Coordinamos con la notaría</strong>: nos aseguramos de que el borrador de escritura está listo a tiempo.</li>
              <li><strong>Revisamos el borrador de escritura</strong>: verificamos que los datos son correctos (superficie, precio, condiciones).</li>
              <li><strong>Verificamos la documentación necesaria</strong>: certificado de eficiencia energética, ITE, cédula, etc.</li>
              <li><strong>Te acompañamos hasta el día de la firma</strong>: resolvemos cualquier duda o problema de última hora.</li>
            </ul>

            <h3>8. Atención prioritaria durante todo el proceso</h3>
            <p>
              Con el servicio completo tienes acceso directo al equipo jurídico:
            </p>
            <ul>
              <li><strong>Email</strong>: respuestas en menos de 24h.</li>
              <li><strong>Teléfono</strong>: llamadas para resolver dudas urgentes.</li>
              <li><strong>WhatsApp</strong>: comunicación ágil durante todo el proceso.</li>
            </ul>
            <p>
              No estás solo en ningún momento. Desde la reserva hasta la firma ante notario, tienes un equipo de abogados
              especializados a tu disposición.
            </p>

            <h2>¿Cuánto cuesta y qué incluye?</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Servicio Completo: Reserva a Escritura
              </h3>
              <p className="text-3xl font-bold text-amber-600 mb-4">550 €</p>
              <p className="text-gray-700 mb-4">Pago único. Sin costes ocultos.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Incluye:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Revisión completa del contrato de reserva</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Análisis exhaustivo de nota simple registral</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Verificación de documentación urbanística (ITE, cédula, IEE...)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Redacción del contrato de arras personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Revisión de contratos con agencias inmobiliarias</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Análisis de honorarios y notas de encargo</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coordinación con notaría para preparación de escritura</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Atención prioritaria: email, teléfono y WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Acompañamiento continuo hasta firma ante notario</span>
                </li>
              </ul>

              <Link
                href="/gestoria/compra-completa-reserva-escritura"
                className="mt-6 inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Contratar servicio completo
              </Link>
            </div>

            <h2>¿Para quién es este servicio?</h2>
            <p>
              El servicio completo es ideal para:
            </p>
            <ul>
              <li><strong>Compradores de primera vivienda</strong>: si nunca has comprado, necesitas orientación en cada paso.</li>
              <li><strong>Compras a través de agencia</strong>: quieres verificar que los contratos y honorarios son correctos.</li>
              <li><strong>Operaciones complejas</strong>: viviendas con hipoteca pendiente, obras, problemas registrales, etc.</li>
              <li><strong>Personas que valoran su tiempo</strong>: prefieres delegar la gestión legal a profesionales.</li>
              <li><strong>Compras en Barcelona, Valencia o Madrid</strong>: ciudades con normativa específica compleja.</li>
            </ul>

            <h2>¿Cuándo contratar el servicio?</h2>
            <p>
              <strong>Antes de firmar la reserva</strong>. Ese es el momento ideal. Así revisamos el contrato de reserva
              antes de que te comprometas.
            </p>
            <p>
              Pero si ya firmaste la reserva o incluso las arras, aún estás a tiempo: te incorporamos al servicio en la
              fase en que estés y te acompañamos en los pasos restantes hasta escritura.
            </p>

            <h2>Conclusión</h2>
            <p>
              Comprar una vivienda sin asesoramiento jurídico es asumir riesgos innecesarios. Por 550 € tienes un equipo
              de abogados especializados que revisan cada paso, te protegen de errores costosos y te acompañan hasta que
              firmes la escritura.
            </p>
            <p>
              Es la mejor inversión que puedes hacer en el proceso de compra. Te ahorra tiempo, dinero y te da la
              tranquilidad de saber que todo está bajo control.
            </p>
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Listo para comprar con todas las garantías?
            </h3>
            <p className="text-gray-700 mb-4">
              Contrata el servicio completo y deja que nuestro equipo se encargue de toda la parte legal. Tú solo
              preocúpate de encontrar tu vivienda ideal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/compra-completa-reserva-escritura"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Contratar servicio (550 €)
              </Link>
              <Link
                href="/gestoria/acompanamiento-reserva-arras"
                className="inline-block border border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
              >
                Ver servicio básico (350 €)
              </Link>
            </div>
          </div>
        </article>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2"
          >
            ← Volver al blog
          </Link>
        </nav>
      </main>
    </>
  )
}
