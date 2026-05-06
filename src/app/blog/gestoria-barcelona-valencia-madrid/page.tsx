import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria: Barcelona, Valencia y Madrid | Diferencias Clave | Inmonest',
  description:
    'ITE en Barcelona, cédula en Valencia, IEE en Madrid... Cada ciudad tiene su normativa específica. Descubre qué necesitas según dónde compres.',
  alternates: { canonical: `${BASE_URL}/blog/gestoria-barcelona-valencia-madrid` },
  openGraph: {
    title: 'Gestoría Inmobiliaria en Barcelona, Valencia y Madrid: Diferencias Clave',
    description:
      'Cada ciudad tiene normativa específica en compraventa. Descubre qué documentación necesitas según dónde compres tu vivienda.',
    url: `${BASE_URL}/blog/gestoria-barcelona-valencia-madrid`,
    type: 'article',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function GestoriaCiudadesPost() {
  const schemaArticle = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Gestoría Inmobiliaria en Barcelona, Valencia y Madrid: Diferencias Clave',
    description:
      'Guía sobre las diferencias normativas en compraventa de viviendas según la ciudad: Barcelona, Valencia y Madrid.',
    author: { '@type': 'Organization', name: 'Inmonest' },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2026-05-05',
    dateModified: '2026-05-05',
    url: `${BASE_URL}/blog/gestoria-barcelona-valencia-madrid`,
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
          <span className="text-gray-700">Gestoría Barcelona, Valencia y Madrid</span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Gestoría
              </span>
              <time className="text-sm text-gray-500">5 de mayo de 2026</time>
              <span className="text-sm text-gray-400">· 8 min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Gestoría inmobiliaria en Barcelona, Valencia y Madrid: diferencias clave por ciudad
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              ITE en Barcelona, cédula en Valencia, IEE en Madrid... Cada ciudad tiene su normativa. Te explicamos qué debes revisar según dónde compres tu vivienda.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              Comprar una vivienda en Barcelona no es lo mismo que comprarla en Madrid o Valencia. Cada ciudad —y cada
              comunidad autónoma— tiene requisitos legales y documentación obligatoria diferentes.
            </p>
            <p>
              Un gestor inmobiliario especializado conoce estas diferencias y te ahorra problemas, multas y bloqueos en
              el proceso de compra. Vamos a ver las particularidades de las tres ciudades más importantes de España.
            </p>

            <h2>Barcelona: zona tensionada, ITE y cédula obligatorias</h2>

            <h3>1. Barcelona es zona tensionada</h3>
            <p>
              Desde 2022, Barcelona está declarada como <strong>zona de mercado residencial tensionado</strong>. Esto
              afecta principalmente al alquiler, pero también tiene consecuencias en compraventa:
            </p>
            <ul>
              <li>Límites en la actualización de rentas de alquileres (IPC + 2 % máximo para particulares).</li>
              <li>Prórrogas obligatorias más largas en contratos de alquiler (7 años para personas jurídicas).</li>
              <li>Si compras para alquilar, debes conocer estas limitaciones antes de cerrar la operación.</li>
            </ul>

            <h3>2. ITE (Inspección Técnica del Edificio)</h3>
            <p>
              En Barcelona, la ITE es <strong>obligatoria para edificios de más de 45 años</strong>. Este informe
              técnico evalúa el estado de conservación del edificio y detecta patologías estructurales, humedades o
              deficiencias en instalaciones.
            </p>
            <p>
              <strong>Consecuencias si falta la ITE:</strong>
            </p>
            <ul>
              <li>La compraventa no se puede inscribir en el Registro de la Propiedad.</li>
              <li>Multas de hasta 3.000 € para el propietario vendedor.</li>
              <li>Si hay obras pendientes detectadas en la ITE, pueden ser tu responsabilidad como comprador.</li>
            </ul>

            <h3>3. Cédula de habitabilidad</h3>
            <p>
              Obligatoria en toda Cataluña. Sin cédula vigente, no puedes formalizar la compraventa. La cédula certifica
              que la vivienda cumple con las condiciones mínimas de superficie, ventilación e instalaciones.
            </p>

            <h3>4. Mercado inmobiliario muy competitivo</h3>
            <p>
              Barcelona es uno de los mercados más caros y rápidos de España. Las agencias presionan para firmar
              contratos de reserva en 24-48h. Un gestor te ayuda a revisar los contratos sin frenar la operación.
            </p>

            <p className="mt-6">
              <Link href="/gestoria/barcelona" className="text-amber-600 hover:text-amber-700 font-semibold">
                Ver servicios de gestoría en Barcelona →
              </Link>
            </p>

            <h2>Valencia: cédula obligatoria y mercado en expansión</h2>

            <h3>1. Cédula de habitabilidad obligatoria</h3>
            <p>
              En la Comunidad Valenciana, la <strong>cédula de habitabilidad es obligatoria</strong> para cualquier
              compraventa. A diferencia de otras comunidades, aquí no hay excepciones.
            </p>
            <p>
              La cédula tiene una <strong>validez de 15 años</strong>. Si ha caducado, el vendedor debe renovarla antes
              de la compraventa. Sin cédula vigente:
            </p>
            <ul>
              <li>No puedes inscribir la compraventa en el Registro.</li>
              <li>Los bancos no conceden hipoteca.</li>
              <li>Multas de hasta 3.000 € para el propietario.</li>
            </ul>

            <h3>2. Mercado en expansión</h3>
            <p>
              Valencia vive un momento de crecimiento inmobiliario intenso. Los precios han subido un 15 % en los
              últimos dos años, y la demanda es muy alta.
            </p>
            <p>
              Esto genera:
            </p>
            <ul>
              <li><strong>Operaciones muy rápidas</strong>: las mejores viviendas se venden en días.</li>
              <li><strong>Mayor competencia entre compradores</strong>: necesitas revisar contratos ágilmente.</li>
              <li><strong>Agencias con comisiones elevadas</strong>: es crítico verificar que los honorarios son legales.</li>
            </ul>

            <h3>3. Zonas turísticas reguladas</h3>
            <p>
              Las zonas costeras y turísticas de Valencia tienen <strong>regulación específica sobre viviendas
              vacacionales</strong>. Si compras cerca de la playa o en zonas turísticas, verifica el uso permitido del
              inmueble:
            </p>
            <ul>
              <li>¿Está permitido el alquiler vacacional?</li>
              <li>¿Hay limitaciones de la comunidad de propietarios?</li>
              <li>¿Necesitas licencia turística?</li>
            </ul>

            <p className="mt-6">
              <Link href="/gestoria/valencia" className="text-amber-600 hover:text-amber-700 font-semibold">
                Ver servicios de gestoría en Valencia →
              </Link>
            </p>

            <h2>Madrid: IEE e ITE, el mercado más caro de España</h2>

            <h3>1. IEE (Inspección de Edificios) e ITE</h3>
            <p>
              En Madrid, los edificios de <strong>más de 50 años</strong> deben tener la Inspección de Edificios (IEE)
              y la ITE al día.
            </p>
            <p>
              Estos informes son similares a los de Barcelona pero con algunas particularidades:
            </p>
            <ul>
              <li>La IEE evalúa el estado de conservación general del edificio.</li>
              <li>La ITE revisa específicamente las instalaciones (electricidad, gas, ascensor, etc.).</li>
              <li>Son obligatorias cada 10 años a partir de los 50 años del edificio.</li>
            </ul>
            <p>
              <strong>Sin IEE/ITE vigentes:</strong>
            </p>
            <ul>
              <li>No puedes inscribir la compraventa en el Registro.</li>
              <li>Multas de hasta 3.000 € al propietario.</li>
              <li>Si el informe detecta obras pendientes, pueden ser responsabilidad tuya tras la compra.</li>
            </ul>

            <h3>2. El mercado más caro de España</h3>
            <p>
              Madrid tiene los <strong>precios inmobiliarios más altos del país</strong>. El precio medio por m² en
              barrios como Salamanca, Chamberí o Retiro supera los 5.000 € - 6.000 €.
            </p>
            <p>
              Esto significa que:
            </p>
            <ul>
              <li>Un error en la compra puede costarte decenas de miles de euros.</li>
              <li>Las agencias cobran comisiones muy elevadas (3 % - 5 % del precio de venta).</li>
              <li>Es fundamental verificar honorarios, notas de encargo y cláusulas de exclusividad.</li>
            </ul>

            <h3>3. Operaciones ultra-rápidas</h3>
            <p>
              En Madrid, las viviendas más atractivas se venden en <strong>días o incluso horas</strong>. Las agencias
              presionan para que firmes la reserva inmediatamente.
            </p>
            <p>
              Un gestor especializado revisa los contratos en menos de 24h sin frenar la operación, pero protegiéndote
              de cláusulas abusivas.
            </p>

            <p className="mt-6">
              <Link href="/gestoria/madrid" className="text-amber-600 hover:text-amber-700 font-semibold">
                Ver servicios de gestoría en Madrid →
              </Link>
            </p>

            <h2>Tabla comparativa: Barcelona vs Valencia vs Madrid</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mt-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Aspecto</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Barcelona</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Valencia</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Madrid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Cédula de habitabilidad</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Obligatoria</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Obligatoria</td>
                    <td className="border border-gray-300 px-4 py-2">❌ No obligatoria</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">ITE / IEE</td>
                    <td className="border border-gray-300 px-4 py-2">✅ ITE (+45 años)</td>
                    <td className="border border-gray-300 px-4 py-2">❌ No obligatoria</td>
                    <td className="border border-gray-300 px-4 py-2">✅ IEE + ITE (+50 años)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Zona tensionada</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Sí</td>
                    <td className="border border-gray-300 px-4 py-2">❌ No</td>
                    <td className="border border-gray-300 px-4 py-2">❌ No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Velocidad del mercado</td>
                    <td className="border border-gray-300 px-4 py-2">Muy rápido</td>
                    <td className="border border-gray-300 px-4 py-2">En expansión</td>
                    <td className="border border-gray-300 px-4 py-2">Ultra-rápido</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Precio medio m²</td>
                    <td className="border border-gray-300 px-4 py-2">4.000 € - 5.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">2.500 € - 3.500 €</td>
                    <td className="border border-gray-300 px-4 py-2">5.000 € - 6.000 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Conclusión: por qué necesitas un gestor local</h2>
            <p>
              Las diferencias entre ciudades son significativas. Un gestor generalista no conoce las particularidades de
              cada mercado local.
            </p>
            <p>
              Nuestro equipo trabaja específicamente en Barcelona, Valencia y Madrid. Conocemos la normativa local, los
              plazos de cada ayuntamiento, los registros de cada zona y las prácticas habituales de las agencias de cada
              ciudad.
            </p>
            <p>
              Esto nos permite ofrecerte un servicio ágil, preciso y adaptado a tu ciudad. No pierdes tiempo ni dinero
              en trámites innecesarios.
            </p>
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              ¿Necesitas gestoría especializada en tu ciudad?
            </h3>
            <p className="text-gray-700 mb-4">
              Servicios de asesoría jurídica adaptados a Barcelona, Valencia y Madrid. Desde 350 €.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/barcelona"
                className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition text-sm"
              >
                Barcelona
              </Link>
              <Link
                href="/gestoria/valencia"
                className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition text-sm"
              >
                Valencia
              </Link>
              <Link
                href="/gestoria/madrid"
                className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition text-sm"
              >
                Madrid
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
