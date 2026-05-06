import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Asesoría Jurídica en la Compra de Vivienda: Por Qué la Necesitas | Inmonest',
  description:
    'Comprar una vivienda sin asesoramiento puede costarte miles de euros. Descubre qué revisa un gestor inmobiliario especializado y por qué es la mejor inversión.',
  alternates: { canonical: `${BASE_URL}/blog/asesoria-juridica-compra-vivienda` },
  openGraph: {
    title: 'Asesoría Jurídica en la Compra de Vivienda: Por Qué la Necesitas',
    description:
      'Descubre qué revisa un gestor especializado en compraventa de viviendas y por qué es fundamental para evitar errores costosos.',
    url: `${BASE_URL}/blog/asesoria-juridica-compra-vivienda`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function AsesoriaJuridicaCompraPost() {
  const schemaArticle = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Asesoría Jurídica en la Compra de Vivienda: Por Qué la Necesitas',
    description:
      'Guía completa sobre la importancia de contar con asesoramiento jurídico especializado al comprar una vivienda.',
    author: { '@type': 'Organization', name: 'Inmonest' },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2026-05-05',
    dateModified: '2026-05-05',
    url: `${BASE_URL}/blog/asesoria-juridica-compra-vivienda`,
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
          <span className="text-gray-700">Asesoría jurídica en la compra de vivienda</span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Gestoría
              </span>
              <time className="text-sm text-gray-500">5 de mayo de 2026</time>
              <span className="text-sm text-gray-400">· 7 min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Asesoría jurídica en la compra de vivienda: ¿por qué necesitas un gestor inmobiliario?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprar una vivienda sin asesoramiento puede costarte miles de euros en errores. Descubre qué revisa un gestor especializado y por qué es la mejor inversión que puedes hacer.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2>El problema: comprar sin asesoramiento</h2>
            <p>
              Comprar una vivienda es la inversión más importante de tu vida. Y sin embargo, la mayoría de compradores
              firman contratos de reserva, arras y escrituras sin entender realmente lo que están firmando.
            </p>
            <p>
              El resultado: cláusulas abusivas, cargas ocultas en el registro, problemas urbanísticos que impiden
              obtener la hipoteca, o agencias que cobran honorarios ilegales. Errores que pueden costarte entre 5.000 €
              y 50.000 € según el caso.
            </p>

            <h2>¿Qué revisa exactamente un gestor inmobiliario?</h2>
            <p>
              Un servicio de asesoría jurídica especializada en compraventa incluye:
            </p>

            <h3>1. Revisión del contrato de reserva</h3>
            <ul>
              <li><strong>Identificación de cláusulas abusivas</strong>: muchos contratos de reserva incluyen penalizaciones desproporcionadas si te echas atrás, incluso cuando aún no has firmado arras.</li>
              <li><strong>Verificación de plazos</strong>: te aseguras de que el plazo para conseguir financiación es razonable y está bien redactado.</li>
              <li><strong>Condiciones de devolución</strong>: si el banco te deniega la hipoteca, ¿recuperas la señal? Solo si el contrato lo dice expresamente.</li>
            </ul>

            <h3>2. Análisis de la nota simple registral</h3>
            <p>
              La nota simple del Registro de la Propiedad es el documento más importante antes de comprar. Un gestor revisa:
            </p>
            <ul>
              <li><strong>Titularidad real del inmueble</strong>: quién es el propietario y si tiene plena capacidad para vender.</li>
              <li><strong>Cargas y gravámenes</strong>: hipotecas, embargos, usufructos o servidumbres que puedan afectarte.</li>
              <li><strong>Discrepancias con el catastro</strong>: superficie registrada vs. superficie real.</li>
            </ul>

            <h3>3. Documentación urbanística</h3>
            <p>
              Según la ciudad, necesitas documentación específica:
            </p>
            <ul>
              <li><strong>Barcelona</strong>: ITE (Inspección Técnica del Edificio) y cédula de habitabilidad obligatorias.</li>
              <li><strong>Madrid</strong>: IEE (Inspección de Edificios) e ITE para edificios de más de 50 años.</li>
              <li><strong>Valencia</strong>: Cédula de habitabilidad obligatoria para cualquier compraventa.</li>
            </ul>
            <p>
              Sin estos documentos, la compraventa puede no inscribirse en el registro o generar multas de hasta 3.000 €.
            </p>

            <h3>4. Revisión de contratos con agencias</h3>
            <p>
              Si compras a través de agencia, el gestor verifica:
            </p>
            <ul>
              <li><strong>Notas de encargo</strong>: si están firmadas correctamente y respetan la normativa.</li>
              <li><strong>Honorarios</strong>: si son razonables según el mercado y cumplen con la legislación autonómica.</li>
              <li><strong>Cláusulas de exclusividad</strong>: si te obligan a pagar comisión incluso si compras por tu cuenta después.</li>
            </ul>

            <h2>Los dos servicios de asesoría más comunes</h2>

            <h3>Acompañamiento Reserva hasta Arras (350 €)</h3>
            <p>
              Para compradores que quieren seguridad jurídica en las primeras fases de la compra:
            </p>
            <ul>
              <li>Revisión completa del contrato de reserva</li>
              <li>Análisis exhaustivo de la nota registral</li>
              <li>Verificación de documentación urbanística (ITE, cédula, etc.)</li>
              <li>Redacción del contrato de arras personalizado</li>
              <li>Asesoramiento continuo hasta la firma de arras</li>
            </ul>
            <p>
              <Link href="/gestoria/acompanamiento-reserva-arras" className="text-amber-600 hover:text-amber-700 font-semibold">
                Ver servicio completo →
              </Link>
            </p>

            <h3>Servicio Completo: Reserva a Escritura (550 €)</h3>
            <p>
              El servicio más completo. Te acompaña desde la reserva hasta que firmas ante notario:
            </p>
            <ul>
              <li>Todo lo anterior + revisión de contratos con agencias</li>
              <li>Análisis de honorarios y notas de encargo</li>
              <li>Coordinación con la notaría para la escritura</li>
              <li>Atención prioritaria: email, teléfono y WhatsApp</li>
              <li>Seguimiento continuo hasta el día de la firma</li>
            </ul>
            <p>
              <Link href="/gestoria/compra-completa-reserva-escritura" className="text-amber-600 hover:text-amber-700 font-semibold">
                Ver servicio completo →
              </Link>
            </p>

            <h2>¿Cuánto te puede ahorrar una asesoría jurídica?</h2>
            <p>
              Un gestor especializado puede ahorrarte:
            </p>
            <ul>
              <li><strong>3.000 € - 10.000 €</strong> en honorarios abusivos de agencias que detecta antes de firmar.</li>
              <li><strong>5.000 € - 20.000 €</strong> si identifica cargas ocultas en el registro que te habrían obligado a asumir.</li>
              <li><strong>10.000 € - 50.000 €</strong> si detecta problemas urbanísticos graves que impiden la hipoteca.</li>
              <li><strong>100 % de la inversión</strong> si te evita comprar un inmueble con problemas legales insalvables.</li>
            </ul>

            <h2>¿Cuándo contratar el servicio?</h2>
            <p>
              <strong>Antes de firmar la reserva</strong>. Ese es el momento ideal. Una vez firmada la reserva con cláusulas
              abusivas, es difícil echarse atrás sin perder dinero.
            </p>
            <p>
              Si ya firmaste la reserva, aún estás a tiempo: un gestor puede revisar el contrato y asesorarte sobre los
              siguientes pasos hasta las arras y la escritura.
            </p>

            <h2>Conclusión</h2>
            <p>
              Comprar una vivienda sin asesoramiento jurídico es como conducir sin seguro: puedes tener suerte, pero si
              algo sale mal, las consecuencias son devastadoras.
            </p>
            <p>
              Invertir entre 350 € y 550 € en un gestor especializado te garantiza que cada paso de la compra está
              revisado por profesionales, que no firmas nada peligroso y que llegas a la escritura con todas las
              garantías.
            </p>
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Necesitas asesoramiento en tu compra?
            </h3>
            <p className="text-gray-700 mb-4">
              Nuestro equipo de abogados especializados en compraventa te acompaña en todo el proceso. Desde la reserva
              hasta la firma ante notario.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/acompanamiento-reserva-arras"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Ver servicios de gestoría
              </Link>
              <Link
                href="/gestoria"
                className="inline-block border border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
              >
                Ver todos los contratos
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
