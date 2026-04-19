import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CheckoutButton from './CheckoutButton'

const BASE_URL = 'https://inmonest.com'

// Ciudades soportadas: slug → nombre para mostrar
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
  return {
    title: `Contrato de Arras en ${nombre} | Guía Legal + Revisión Profesional — Inmonest`,
    description: `¿Vas a firmar un contrato de arras en ${nombre}? Conoce tus derechos, los plazos legales y protégete con una revisión por gestoría especializada. Desde 120 €.`,
    keywords: `contrato arras ${nombre.toLowerCase()}, arras penitenciales ${nombre.toLowerCase()}, modelo contrato arras, gestoría ${nombre.toLowerCase()}`,
    alternates: { canonical: `/${ciudad}/contrato-arras` },
    openGraph: {
      title: `Contrato de Arras en ${nombre} — Guía Legal`,
      description: `Guía completa sobre contratos de arras en ${nombre}: tipos, plazos, riesgos y revisión profesional.`,
      url: `${BASE_URL}/${ciudad}/contrato-arras`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function ContratoArrasPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) notFound()

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Contrato de Arras en ${nombre}: Guía Legal Completa`,
    description: `Todo lo que necesitas saber sobre el contrato de arras en ${nombre}.`,
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${ciudad}/contrato-arras` },
  })

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: `Contrato de Arras en ${nombre}`, item: `${BASE_URL}/${ciudad}/contrato-arras` },
    ],
  })

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Qué pasa si el vendedor no quiere devolver las arras en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Si el vendedor desiste del contrato de arras penitenciales, está obligado a devolver el doble de la cantidad recibida según el artículo 1454 del Código Civil. Si se niega, el comprador puede reclamar judicialmente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto suelen ser las arras en una compraventa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lo habitual en España es entregar entre el 5 % y el 10 % del precio de compraventa como arras. No existe un importe fijo por ley, por lo que es negociable entre las partes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es obligatorio hacer un contrato de arras?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No es obligatorio por ley, pero es muy recomendable. Sin contrato de arras, el comprador no tiene garantía de que el vendedor no venda a otra persona mientras se tramita la hipoteca o la escritura.',
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuánto tiempo tengo para firmar la escritura después de las arras en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El plazo lo acuerdan libremente comprador y vendedor en el contrato. Lo habitual es entre 60 y 90 días, tiempo suficiente para tramitar la hipoteca y preparar la documentación notarial.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Las arras se descuentan del precio final?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. En las arras penitenciales y confirmatorias, la cantidad entregada se descuenta del precio total en el momento de firmar la escritura pública ante notario.',
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
          <span className="text-gray-800 font-medium">Contrato de Arras en {nombre}</span>
        </nav>

        {/* Cabecera */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          Contrato de Arras en {nombre}:<br />
          <span className="text-[#c9962a]">Guía Legal Completa</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Si estás comprando o vendiendo una vivienda en {nombre}, el contrato de arras es el primer
          acuerdo vinculante que firmarás. Entender su alcance puede ahorrarte decenas de miles de euros.
        </p>

        {/* CTA principal */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-1">Servicio destacado</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Revisión profesional de tu contrato</h2>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Un abogado especialista en derecho inmobiliario revisa tu contrato de arras, identifica
            cláusulas abusivas y te envía un informe detallado en menos de 48 horas.
          </p>
          <CheckoutButton ciudad={nombre} />
        </div>

        {/* Contenido legal */}
        <article className="prose prose-gray max-w-none">

          <h2>¿Qué es un contrato de arras?</h2>
          <p>
            El contrato de arras es un precontrato de compraventa regulado por el <strong>artículo 1454
            del Código Civil español</strong>. En él, comprador y vendedor acuerdan reservar la
            propiedad a cambio de una cantidad de dinero (las arras), con consecuencias específicas
            en caso de incumplimiento.
          </p>
          <p>
            En el mercado inmobiliario de {nombre}, es habitual entregar entre el <strong>5 % y el 10 %
            del precio de compraventa</strong> como señal en el momento de la firma.
          </p>

          <h2>Tipos de arras en España</h2>

          <h3>Arras penitenciales (art. 1454 CC) — Las más comunes</h3>
          <p>
            Son las más utilizadas en {nombre}. Si el <strong>comprador desiste</strong>, pierde las arras
            entregadas. Si desiste el <strong>vendedor</strong>, debe devolver el doble de lo recibido.
            Este tipo actúa como cláusula de desistimiento y permite a ambas partes salir del acuerdo
            pagando una penalización.
          </p>

          <h3>Arras confirmatorias</h3>
          <p>
            Refuerzan el contrato de compraventa. Si cualquiera de las partes incumple, la otra puede
            exigir el <strong>cumplimiento forzoso o la resolución con indemnización de daños</strong>
            (art. 1101 CC). Son más vinculantes y menos habituales en operaciones residenciales.
          </p>

          <h3>Arras penales</h3>
          <p>
            Fijan una penalización de antemano. A diferencia de las confirmatorias, la parte perjudicada
            no puede reclamar más allá de la penalización pactada, salvo pacto expreso en contrario.
          </p>

          <h2>Contenido obligatorio del contrato</h2>
          <p>Para que el contrato sea válido y te proteja en {nombre}, debe incluir:</p>
          <ul>
            <li><strong>Identificación completa</strong> de comprador y vendedor (DNI/NIE, domicilio)</li>
            <li><strong>Descripción registral</strong> del inmueble (referencia catastral, nota simple del Registro de la Propiedad)</li>
            <li><strong>Precio total</strong> de compraventa acordado</li>
            <li><strong>Cantidad entregada</strong> como arras y forma de pago</li>
            <li><strong>Plazo</strong> para formalizar la escritura pública ante notario</li>
            <li><strong>Tipo de arras</strong> pactado (penitenciales, confirmatorias o penales)</li>
            <li><strong>Estado de cargas</strong>: hipotecas, embargos, servidumbres</li>
            <li><strong>Distribución de gastos</strong>: notaría, registro, impuestos</li>
          </ul>

          <h2>Riesgos más habituales en {nombre}</h2>

          <h3>1. Cargas ocultas sobre la vivienda</h3>
          <p>
            Solicita siempre una <strong>nota simple del Registro de la Propiedad</strong> antes de
            firmar. En {nombre}, es frecuente encontrar hipotecas no canceladas registralmente aunque
            el préstamo ya esté pagado.
          </p>

          <h3>2. Plazo insuficiente para conseguir financiación</h3>
          <p>
            Los plazos medios de aprobación hipotecaria en entidades de {nombre} oscilan entre
            30 y 60 días. Pacta un plazo mínimo de <strong>60–90 días</strong> para la firma de
            escritura y añade una cláusula de condición suspensiva vinculada a la obtención del préstamo.
          </p>

          <h3>3. Confusión entre tipos de arras</h3>
          <p>
            Si el contrato no especifica el tipo, los tribunales suelen interpretar que se trata de
            arras confirmatorias, lo que puede impedirte desistir sin afrontar una demanda. Especifica
            siempre <em>«arras penitenciales al amparo del artículo 1454 del Código Civil»</em>.
          </p>

          <h3>4. IBI y comunidad impagados</h3>
          <p>
            El comprador hereda las deudas de IBI de los últimos cuatro años y posibles deudas con la
            comunidad de propietarios. Pide los recibos al vendedor y verifica el estado en el
            Ayuntamiento de {nombre}.
          </p>

          <h2>Pasos tras firmar las arras</h2>
          <ol>
            <li>Solicitar tasación hipotecaria (si necesitas financiación)</li>
            <li>Entregar documentación al banco para la aprobación del préstamo</li>
            <li>Elegir notario (en España, el comprador tiene derecho a elegirlo)</li>
            <li>Revisar el borrador de escritura antes de la firma</li>
            <li>Preparar los fondos: precio pendiente + gastos de notaría, registro e impuestos</li>
          </ol>

          <h2>Impuestos aplicables en {nombre}</h2>
          <p>
            Si compras una vivienda de segunda mano en {nombre}, pagarás el <strong>Impuesto de
            Transmisiones Patrimoniales (ITP)</strong>. El tipo varía según la comunidad autónoma:
          </p>
          <ul>
            {ciudad === 'madrid' && <li><strong>Madrid:</strong> 6 % (con bonificaciones para jóvenes menores de 35 años hasta el 4 %)</li>}
            {ciudad === 'barcelona' && <li><strong>Cataluña:</strong> 10 % con carácter general</li>}
            {ciudad === 'valencia' && <li><strong>Comunitat Valenciana:</strong> 10 % con carácter general</li>}
            {ciudad === 'sevilla' && <li><strong>Andalucía:</strong> 7 % con carácter general</li>}
            {ciudad === 'malaga' && <li><strong>Andalucía:</strong> 7 % con carácter general</li>}
            {!['madrid','barcelona','valencia','sevilla','malaga'].includes(ciudad) && (
              <li>Consulta el tipo vigente en tu comunidad autónoma, ya que el ITP es un tributo cedido.</li>
            )}
          </ul>
          <p>
            Para vivienda nueva, se paga <strong>IVA (10 %)</strong> en lugar de ITP,
            más Actos Jurídicos Documentados (AJD).
          </p>

        </article>

        {/* CTA final */}
        <div className="mt-14 bg-[#0d1a0f] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">
            ¿Tienes ya un contrato de arras en {nombre}?
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            No firmes sin que un abogado lo revise. Por 120 € recibes un informe completo con
            todos los riesgos identificados y las cláusulas que deberías modificar antes de comprometerte.
          </p>
          <CheckoutButton ciudad={nombre} />
        </div>

        {/* Links internos */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-4">También te puede interesar:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/gestoria" className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Todos los servicios de gestoría →
            </Link>
            <Link href={`/pisos?operacion=sale&ciudad=${ciudad}`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Pisos en venta en {nombre} →
            </Link>
            <Link href="/vender-casa" className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Vender sin comisión →
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}
