import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
  return {
    title: `Alquiler sin agencia en ${nombre} | Pisos de particulares — Inmonest`,
    description: `Encuentra pisos de alquiler en ${nombre} directamente de particulares. Sin intermediarios, sin comisiones de agencia. Miles de anuncios reales y actualizados.`,
    keywords: `alquiler sin agencia ${nombre.toLowerCase()}, pisos alquiler particulares ${nombre.toLowerCase()}, alquiler directo propietario ${nombre.toLowerCase()}, piso alquiler sin comision ${nombre.toLowerCase()}`,
    alternates: { canonical: `/${ciudad}/alquiler-sin-agencia` },
    openGraph: {
      title: `Alquiler sin agencia en ${nombre} — Inmonest`,
      description: `Pisos de alquiler en ${nombre} directamente de sus propietarios. Sin comisiones.`,
      url: `${BASE_URL}/${ciudad}/alquiler-sin-agencia`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function AlquilerSinAgenciaPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) notFound()

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Alquiler sin agencia en ${nombre}: Guía Completa`,
    description: `Cómo encontrar piso de alquiler en ${nombre} sin pagar comisiones a agencias.`,
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${ciudad}/alquiler-sin-agencia` },
  })

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Alquiler', item: `${BASE_URL}/pisos?operacion=rent` },
      { '@type': 'ListItem', position: 3, name: `Alquiler sin agencia en ${nombre}`, item: `${BASE_URL}/${ciudad}/alquiler-sin-agencia` },
    ],
  })

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Es legal alquilar sin agencia en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Completamente legal. Propietario e inquilino pueden firmar un contrato de alquiler directamente sin necesidad de ningún intermediario. La LAU regula los derechos y obligaciones de ambas partes independientemente de si hay agencia o no.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto ahorra un inquilino alquilando sin agencia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En ${nombre}, las agencias cobran habitualmente entre una y dos mensualidades al inquilino. Desde la Ley de Vivienda 2023, este coste debe pagarlo el propietario, pero muchas agencias aún intentan trasladarlo. Alquilando directamente te ahorras esa negociación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo encuentro pisos de particulares en ${nombre}?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En Inmonest todos los anuncios son de propietarios particulares verificados. Filtra por ciudad, precio y características y contacta directamente con el propietario sin intermediarios.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué documentos necesito para alquilar sin agencia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DNI o NIE, últimas 3 nóminas o declaración de IRPF, y en ocasiones un aval o garantía adicional. El propietario puede pedirte lo que considere razonable para verificar tu solvencia.',
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
          <Link href="/pisos?operacion=rent" className="hover:text-[#c9962a] transition-colors">Alquiler</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Sin agencia en {nombre}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          Alquiler sin agencia en {nombre}:<br />
          <span className="text-[#c9962a]">Ahorra hasta 2 meses de renta</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          En {nombre}, alquilar a través de una agencia puede costarte entre una y dos mensualidades en
          comisiones. Inmonest te conecta directamente con propietarios particulares. Sin intermediarios,
          sin comisiones, sin sorpresas.
        </p>

        {/* CTA principal */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Busca pisos de particulares en {nombre}</h2>
          <p className="text-gray-600 text-sm mb-5">
            Miles de anuncios reales de propietarios directos. Contacta sin intermediarios.
          </p>
          <Link
            href={`/pisos?operacion=rent&ciudad=${ciudad}`}
            className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841f] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-md"
          >
            Ver pisos en alquiler en {nombre} →
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">

          <h2>¿Por qué alquilar sin agencia en {nombre}?</h2>
          <p>
            El mercado de alquiler en {nombre} es uno de los más competidos de España. Las agencias
            inmobiliarias cobran habitualmente entre una y dos mensualidades al arrendatario, lo que
            en una ciudad como {nombre} puede suponer entre 800 € y 3.000 € de coste inicial adicional.
          </p>
          <p>
            Desde la <strong>Ley de Vivienda de 2023</strong>, los gastos de intermediación deben
            correr a cargo del propietario. Sin embargo, en la práctica muchos arrendadores los
            trasladan al precio del alquiler. Alquilar directamente de un particular elimina este
            coste de raíz.
          </p>

          <h2>Ventajas de alquilar directamente del propietario</h2>
          <ul>
            <li><strong>Sin comisiones de agencia</strong> — ahorras entre 1 y 2 mensualidades</li>
            <li><strong>Negociación directa</strong> — hablas con quien toma las decisiones</li>
            <li><strong>Mayor flexibilidad</strong> — más margen para acordar condiciones especiales</li>
            <li><strong>Respuesta más rápida</strong> — sin esperas a que el agente transmita mensajes</li>
            <li><strong>Mejor conocimiento del inmueble</strong> — el propietario conoce su propia vivienda</li>
          </ul>

          <h2>Cómo encontrar alquiler sin agencia en {nombre}</h2>
          <ol>
            <li>
              <strong>Busca en portales de particulares</strong> como Inmonest, donde todos los
              anuncios son de propietarios directos, no de agencias.
            </li>
            <li>
              <strong>Filtra bien tu búsqueda</strong> — barrio, precio máximo, número de habitaciones
              y si se admiten mascotas o se acepta garantía de alquiler.
            </li>
            <li>
              <strong>Visita siempre antes de firmar</strong> — nunca entregues dinero sin ver el
              piso en persona y verificar que el arrendador es realmente el propietario (pídele
              el título de propiedad o nota simple).
            </li>
            <li>
              <strong>Firma un contrato legal</strong> — puedes usar los modelos de contrato de
              alquiler de Inmonest o solicitar una revisión legal por 90 €.
            </li>
          </ol>

          <h2>Zonas con más oferta de alquiler sin agencia en {nombre}</h2>
          <p>
            Las zonas donde más propietarios particulares publican directamente en {nombre} suelen
            coincidir con barrios con alta rotación de inquilinos: zonas universitarias, áreas
            bien comunicadas con transporte público y barrios en proceso de renovación. En Inmonest
            puedes filtrar por barrio exacto para encontrar las mejores opciones.
          </p>

          <h2>¿Es seguro alquilar sin agencia?</h2>
          <p>
            Sí, siempre que sigas estas precauciones:
          </p>
          <ul>
            <li>Verifica la identidad del propietario con DNI y nota simple del Registro de la Propiedad</li>
            <li>Firma siempre un contrato escrito con todos los datos del inmueble</li>
            <li>Paga la fianza y el primer mes solo al firmar, nunca antes</li>
            <li>Exige recibo de cada pago o realiza transferencias bancarias (nunca en efectivo)</li>
            <li>Haz un inventario fotográfico del estado de la vivienda el día de entrada</li>
          </ul>

          <h2>Preguntas frecuentes sobre alquiler sin agencia en {nombre}</h2>

          <h3>¿Es legal alquilar sin agencia en {nombre}?</h3>
          <p>
            Completamente legal. Propietario e inquilino pueden firmar directamente. La LAU regula
            sus derechos y obligaciones independientemente de la presencia de un intermediario.
          </p>

          <h3>¿Quién paga los gastos de agencia si el propietario usa una?</h3>
          <p>
            Desde la Ley de Vivienda 2023, siempre el propietario. Si una agencia te cobra a ti como
            inquilino sus honorarios, puedes reclamarlos judicialmente.
          </p>

          <h3>¿Qué contrato debo firmar?</h3>
          <p>
            Un contrato de arrendamiento de vivienda habitual sujeto a la LAU, con duración mínima de
            5 años (7 si el propietario es empresa), fianza de una mensualidad y las cláusulas legales
            vigentes. Puedes generarlo en Inmonest o solicitar revisión legal.
          </p>

        </article>

        {/* CTA final */}
        <div className="mt-14 bg-[#0d1a0f] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">¿Necesitas revisar tu contrato de alquiler?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Un abogado especialista revisa tu contrato antes de firmar. Detecta cláusulas nulas,
            riesgos y te da recomendaciones concretas en menos de 48 horas. Desde 90 €.
          </p>
          <Link
            href={`/${ciudad}/contrato-alquiler`}
            className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841f] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-md"
          >
            Ver revisión legal de contrato →
          </Link>
        </div>

        {/* Links internos */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-4">También te puede interesar:</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${ciudad}/contrato-alquiler`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Guía legal del contrato de alquiler en {nombre} →
            </Link>
            <Link href={`/${ciudad}/contrato-arras`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Contrato de arras en {nombre} →
            </Link>
            <Link href="/gestoria" className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Gestoría online →
            </Link>
          </div>
        </div>

      </main>
    </>
  )
}
