import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CheckoutButton from './CheckoutButton'

const BASE_URL = 'https://inmonest.com'

const CIUDADES: Record<string, string> = {
  madrid:    'Madrid',
  barcelona: 'Barcelona',
  valencia:  'Valencia',
  sevilla:   'Sevilla',
  malaga:    'Málaga',
  bilbao:    'Bilbao',
  zaragoza:  'Zaragoza',
  alicante:  'Alicante',
}

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) return {}

  const isBarcelona = ciudad === 'barcelona'
  const isValencia  = ciudad === 'valencia'
  const title = isBarcelona
    ? `Contrato de Alquiler Barcelona | Zonas Tensionadas LAU 2026 — Inmonest`
    : isValencia
      ? `Contrato de Alquiler Valencia | Guía LAU 2026 desde 7 € — Inmonest`
      : `Contrato de Alquiler en ${nombre} | Guía LAU 2026 — Inmonest`
  const description = isBarcelona
    ? `Alquila en Barcelona con seguridad legal. Zonas tensionadas, índice de referencia de precios y cláusulas LAU 2026 explicadas. Contrato revisado por abogado desde 7 €.`
    : isValencia
      ? `Contrato de alquiler en Valencia adaptado a la LAU 2026. Incluye cláusulas de fianza, actualización de renta IPC y revisión legal. Descárgalo desde 7 €.`
      : `Contrato de alquiler en ${nombre} conforme a la LAU 2026. Cláusulas de fianza, duración, actualización IPC y rescisión. Revisado por abogado desde 7 €.`

  return {
    title,
    description,
    keywords: `contrato alquiler ${nombre.toLowerCase()}, contrato arrendamiento ${nombre.toLowerCase()}, alquiler piso ${nombre.toLowerCase()}, LAU 2026 ${nombre.toLowerCase()}, ley arrendamientos urbanos${isBarcelona ? ', zonas tensionadas barcelona, índice referencia precios barcelona' : ''}`,
    alternates: { canonical: `/${ciudad}/contrato-alquiler` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${ciudad}/contrato-alquiler`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function ContratoAlquilerPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) notFound()

  const isBarcelona = ciudad === 'barcelona'

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Contrato de Alquiler en ${nombre}: Guía Legal LAU 2026`,
    description: `Todo lo que necesitas saber sobre el contrato de alquiler en ${nombre} según la Ley de Arrendamientos Urbanos.`,
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${ciudad}/contrato-alquiler` },
  })

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: `Contrato de Alquiler en ${nombre}`, item: `${BASE_URL}/${ciudad}/contrato-alquiler` },
    ],
  })

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Cuánto dura mínimo un contrato de alquiler en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Según la LAU, el mínimo es de 5 años si el propietario es persona física, y de 7 años si es persona jurídica. El inquilino siempre puede irse antes con 30 días de preaviso una vez pasados 6 meses.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué fianza se paga al alquilar una vivienda?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La LAU establece una fianza obligatoria de una mensualidad para uso de vivienda. Además, el propietario puede exigir garantías adicionales de hasta dos mensualidades más.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puede el propietario subir el alquiler cada año?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, pero con límites. Desde 2024 la actualización anual se vincula al nuevo índice de alquileres del INE, no al IPC. La subida no puede superar el porcentaje marcado por dicho índice.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Quién paga los gastos de agencia al alquilar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Desde la Ley de Vivienda de 2023, los gastos de intermediación inmobiliaria corren siempre a cargo del propietario, nunca del inquilino. Si te los cobran, puedes reclamarlos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa si el casero no deposita la fianza?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El propietario está obligado a depositar la fianza en el organismo autónomico correspondiente. Si no lo hace, puede ser sancionado y el inquilino puede exigir la regularización o reclamar su devolución íntegra al finalizar el contrato.',
        },
      },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />

      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9962a] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/gestoria" className="hover:text-[#c9962a] transition-colors">Gestoría</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Contrato de Alquiler en {nombre}</span>
        </nav>

        {/* Cabecera */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          Contrato de Alquiler en {nombre}:<br />
          <span className="text-[#c9962a]">Guía Legal LAU 2026</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          La <strong>Ley de Arrendamientos Urbanos (LAU)</strong> regula todos los contratos de
          alquiler de vivienda en España. Conocer sus derechos y obligaciones antes de firmar
          en {nombre} puede evitarte conflictos costosos y meses de litigios.
        </p>

        {/* CTA principal */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-1">Servicio destacado</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Revisión legal de tu contrato de alquiler</h2>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Un abogado especialista en arrendamientos revisa tu contrato, detecta cláusulas nulas
            o abusivas y te envía un informe detallado en menos de 48 horas.
            {isBarcelona && ' Incluye análisis de cumplimiento del índice de referencia de precios en zonas tensionadas.'}
          </p>
          <CheckoutButton ciudad={nombre} />
        </div>

        {/* Contenido legal */}
        <article className="prose prose-gray max-w-none">

          <h2>La LAU 2026: qué ha cambiado</h2>
          <p>
            La <strong>Ley 29/1994 de Arrendamientos Urbanos</strong>, con las reformas introducidas
            por la <strong>Ley de Vivienda de 2023</strong> y sus desarrollos reglamentarios de 2025–2026,
            establece el marco vigente para los contratos de alquiler de vivienda habitual en España.
            Los cambios más relevantes afectan a la duración mínima, la actualización de renta y la
            regulación de precios en zonas tensionadas.
          </p>

          <h2>Duración del contrato</h2>
          <p>
            Según la LAU, el contrato de arrendamiento de vivienda habitual tiene una <strong>duración
            mínima de 5 años</strong> si el arrendador es persona física, y de <strong>7 años</strong>
            si es persona jurídica (empresa, fondo de inversión, etc.). Este plazo opera aunque el
            contrato escrito indique una duración inferior.
          </p>
          <p>
            En {nombre}, es frecuente que se pacten contratos anuales con prórrogas tácitas. Sin embargo,
            el inquilino siempre tiene derecho a permanecer hasta cumplir el plazo mínimo legal,
            independientemente de lo que diga el contrato.
          </p>

          <h2>Fianza y garantías adicionales</h2>
          <p>
            La LAU obliga a depositar una <strong>fianza equivalente a una mensualidad</strong> de
            renta para vivienda (dos mensualidades para uso distinto de vivienda). En {nombre}, esta
            fianza debe ser depositada por el arrendador en el organismo público correspondiente:
          </p>
          <ul>
            {ciudad === 'madrid' && <li><strong>Madrid:</strong> Agencia de Vivienda Social de la Comunidad de Madrid</li>}
            {ciudad === 'barcelona' && <li><strong>Cataluña:</strong> Institut Català del Sòl (INCASÒL)</li>}
            {ciudad === 'valencia' && <li><strong>Comunitat Valenciana:</strong> Generalitat Valenciana — Conselleria de Vivienda</li>}
            {ciudad === 'sevilla' && <li><strong>Andalucía:</strong> Agencia de Vivienda y Rehabilitación de Andalucía (AVRA)</li>}
            {ciudad === 'malaga' && <li><strong>Andalucía:</strong> Agencia de Vivienda y Rehabilitación de Andalucía (AVRA)</li>}
            {ciudad === 'bilbao' && <li><strong>País Vasco:</strong> Departamento de Vivienda del Gobierno Vasco</li>}
            {ciudad === 'zaragoza' && <li><strong>Aragón:</strong> Instituto Aragonés del Suelo (SUELO ARAGONÉS)</li>}
            {ciudad === 'alicante' && <li><strong>Comunitat Valenciana:</strong> Generalitat Valenciana — Conselleria de Vivienda</li>}
            <li>
              Además de la fianza legal, el arrendador puede exigir <strong>garantías adicionales</strong>
              (aval bancario, depósito adicional) de hasta dos mensualidades, salvo en contratos de
              larga duración superiores a 5 años.
            </li>
          </ul>

          <h2>Actualización de la renta</h2>
          <p>
            Desde 2024, la actualización anual de la renta ya <strong>no puede superar el
            Índice de Garantía de la Competitividad (IGC)</strong>, desvinculándose del IPC. A partir
            de 2025, el Gobierno aprobó un <strong>nuevo índice específico para alquileres</strong>
            publicado por el INE, con el objetivo de contener subidas abusivas.
          </p>
          <p>
            Si el contrato no especifica índice de actualización, se aplica de forma supletoria el
            índice oficial vigente en la fecha de actualización. Es importante que el contrato
            indique expresamente el mecanismo pactado.
          </p>

          <h2>Gastos y suministros: quién paga qué</h2>
          <p>
            La LAU permite pactar libremente la distribución de gastos de comunidad, IBI y suministros,
            siempre que quede reflejado por escrito en el contrato. Sin pacto expreso:
          </p>
          <ul>
            <li><strong>IBI y tasas municipales:</strong> corresponden al propietario salvo pacto</li>
            <li><strong>Gastos de comunidad:</strong> corresponden al propietario salvo pacto</li>
            <li><strong>Suministros (agua, luz, gas):</strong> habitualmente a cargo del inquilino</li>
            <li><strong>Reparaciones de mantenimiento ordinario:</strong> a cargo del inquilino</li>
            <li><strong>Reparaciones estructurales:</strong> siempre a cargo del propietario</li>
          </ul>

          <h2>Desahucio y recuperación de la vivienda</h2>
          <p>
            El arrendador solo puede recuperar la vivienda antes de los 5 años en casos tasados:
            necesidad acreditada de vivienda para sí mismo o familiares de primer grado, siempre
            que conste expresamente en el contrato. En {nombre}, los juzgados de primera instancia
            tramitan los procedimientos de desahucio, con plazos medios de 6 a 18 meses.
          </p>

          {/* Sección especial Barcelona */}
          {isBarcelona && (
            <>
              <h2 className="text-[#c9962a]">Barcelona: Zonas Tensionadas e Índice de Referencia de Precios</h2>
              <p>
                Barcelona fue declarada <strong>zona de mercado residencial tensionado</strong> en virtud
                de la Ley de Vivienda de 2023 y los decretos de la Generalitat de Cataluña. Esta
                declaración tiene consecuencias directas sobre los contratos de alquiler nuevos en la
                ciudad y en otros 140 municipios del área metropolitana.
              </p>

              <h3>¿Qué implica vivir en una zona tensionada?</h3>
              <ul>
                <li>
                  Si el propietario es un <strong>gran tenedor</strong> (más de 10 viviendas), la renta
                  del nuevo contrato <strong>no puede superar el índice de referencia</strong> publicado
                  por el Departament de Territori de la Generalitat.
                </li>
                <li>
                  Si el propietario es pequeño (menos de 10 viviendas), la renta del nuevo contrato
                  <strong> no puede superar la renta del contrato anterior</strong> incrementada en el
                  porcentaje oficial de actualización.
                </li>
                <li>
                  Si la vivienda lleva más de 5 años <strong>sin contrato de alquiler previo</strong>,
                  el precio máximo se establece según el índice de referencia, independientemente del
                  tipo de propietario.
                </li>
              </ul>

              <h3>El Índice de Referencia de Precios (IRP) de Cataluña</h3>
              <p>
                El IRP es una herramienta online del Departament de Territori que calcula el precio
                máximo de alquiler para cada vivienda según su ubicación, superficie, antigüedad y
                características. Para consultar el índice de tu vivienda:
              </p>
              <ol>
                <li>Accede al portal oficial de la Generalitat de Cataluña</li>
                <li>Introduce la dirección exacta y los metros cuadrados</li>
                <li>Obtén el rango de precio de referencia (mínimo y máximo)</li>
              </ol>
              <p>
                <strong>Consecuencias del incumplimiento:</strong> Si el arrendador fija una renta
                superior al índice en zona tensionada, el inquilino puede reclamar la devolución del
                exceso pagado con intereses, y el arrendador se expone a sanciones administrativas
                de hasta 90.000 €.
              </p>

              <h3>Cláusulas específicas para contratos en Barcelona</h3>
              <p>
                Todo contrato de alquiler en zona tensionada de Barcelona debe incluir:
              </p>
              <ul>
                <li>Mención expresa a la declaración de zona tensionada</li>
                <li>El valor del índice de referencia aplicable en la fecha del contrato</li>
                <li>La renta del contrato anterior (si existió en los últimos 5 años)</li>
                <li>La condición del arrendador (gran tenedor o pequeño propietario)</li>
              </ul>
              <p>
                La omisión de estas menciones no invalida el contrato, pero puede dar lugar a
                reclamaciones y procedimientos sancionadores. Nuestros abogados verifican el
                cumplimiento de todos estos requisitos en la revisión.
              </p>
            </>
          )}

          <h2>Cláusulas nulas más habituales en {nombre}</h2>
          <p>
            Son nulas de pleno derecho y no vinculan al inquilino, aunque figuren en el contrato:
          </p>
          <ul>
            <li>Renuncia anticipada a los plazos mínimos legales de duración</li>
            <li>Obligación del inquilino de pagar gastos de agencia inmobiliaria (desde 2019)</li>
            <li>Prohibición de tener mascotas (salvo casos muy específicos)</li>
            <li>Cláusulas de actualización de renta superiores al índice legal</li>
            <li>Renuncia a la prórroga obligatoria por causas no previstas en la LAU</li>
            <li>Penalizaciones desproporcionadas por resolución anticipada del contrato</li>
          </ul>

          <h2>Resolución anticipada por el inquilino</h2>
          <p>
            El inquilino puede resolver el contrato una vez transcurridos <strong>6 meses</strong>
            desde la firma, con un preaviso mínimo de 30 días. Si el contrato incluye una cláusula
            de penalización por desistimiento anticipado, la indemnización máxima es de{' '}
            <strong>una mensualidad por cada año que reste de contrato</strong>, prorrateada por meses.
          </p>

          <h2>Contenido mínimo del contrato de alquiler</h2>
          <ul>
            <li>Identificación completa de propietario e inquilino</li>
            <li>Descripción detallada del inmueble (dirección, referencia catastral, superficie)</li>
            <li>Duración pactada e inicio del arrendamiento</li>
            <li>Renta mensual, forma de pago y cuenta bancaria</li>
            <li>Importe de la fianza y garantías adicionales</li>
            <li>Distribución de gastos y suministros</li>
            <li>Inventario de mobiliario y estado de la vivienda</li>
            {isBarcelona && <li>Valor del índice de referencia de precios y condición del arrendador</li>}
          </ul>

        </article>

        {/* CTA final */}
        <div className="mt-14 bg-[#0d1a0f] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">
            ¿Tienes ya un contrato de alquiler en {nombre}?
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            No firmes sin una revisión legal. Por 90 € recibes un análisis completo: cláusulas
            nulas, riesgos económicos y recomendaciones para negociar antes de comprometerte.
            {isBarcelona && ' Incluye verificación del índice de referencia de precios.'}
          </p>
          <CheckoutButton ciudad={nombre} />
        </div>

        {/* Links internos */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-4">También te puede interesar:</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${ciudad}/contrato-arras`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Contrato de arras en {nombre} →
            </Link>
            <Link href="/gestoria" className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Todos los servicios de gestoría →
            </Link>
            <Link href="/pisos?operacion=rent" className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Pisos en alquiler en {nombre} →
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}
