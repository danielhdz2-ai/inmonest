import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'lau-actualizacion-renta-irav-2026'
const FECHA = '2026-09-26'
const DESCRIPTION =
  'Actualización de renta en alquiler LAU 2026: qué pasó con el Real Decreto-ley 8/2026, cómo funciona el IRAV, límites en zonas tensionadas y gran tenedor. Guía para inquilinos y propietarios particulares.'

export const metadata: Metadata = {
  title: 'Actualización renta alquiler LAU 2026 — IRAV y fin del tope 2%',
  description: DESCRIPTION,
  keywords:
    'actualización renta alquiler 2026, IRAV alquiler vivienda, subida renta LAU, Real Decreto-ley 8/2026 derogado, índice referencia alquiler, gran tenedor subida alquiler, zona mercado tensionado renta, revisar contrato alquiler LAU, Ley vivienda 2023 alquiler',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'LAU 2026: actualización de renta con IRAV tras derogar el RDL 8/2026',
    description: DESCRIPTION,
    url: `${BASE_URL}/blog/${SLUG}`,
    locale: 'es_ES',
    type: 'article',
    siteName: 'Inmonest',
    publishedTime: FECHA,
  },
}

const FAQ = [
  {
    q: '¿Sigue vigente el tope del 2% para subir la renta en 2026?',
    a: 'No como medida general. El Real Decreto-ley 8/2026, que limitaba temporalmente la actualización al 2%, no fue convalidado por el Congreso y dejó de aplicarse en abril de 2026. En contratos posteriores al 26 de mayo de 2023 con cláusula de revisión, la referencia legal habitual es el IRAV, salvo pacto distinto válido y reglas especiales en zonas tensionadas o gran tenedor.',
  },
  {
    q: '¿Qué es el IRAV y quién lo publica?',
    a: 'El Índice de Referencia de Arrendamientos de Vivienda (IRAV) es el índice oficial usado para actualizar rentas en muchos contratos LAU firmados desde la reforma de 2023. Se publica periódicamente por el INE; conviene cruzar la cláusula del contrato con el último dato disponible antes de aplicar la subida.',
  },
  {
    q: '¿Puede un particular subir la renta sin límite en 2026?',
    a: 'Solo si el contrato lo permite expresamente (cláusula de actualización) y no choca con normativa de zonas de mercado residencial tensionado, límites por rotación de inquilino o condiciones de gran tenedor. Un propietario persona física con un piso fuera de zona tensionada y contrato antiguo puede tener reglas distintas a un fondo con diez viviendas en Barcelona o Madrid.',
  },
  {
    q: '¿Qué debo revisar antes de firmar o renovar un contrato de alquiler?',
    a: 'Cláusula de actualización (IRAV, IPC u otra), duración mínima y prórrogas LAU, fianza y depósito autonómico, gastos repercutidos, zona tensionada y, si aplica, índice SERPAVI. Un contrato redactado por gestoría evita sorpresas y cláusulas abusivas.',
  },
  {
    q: '¿Puedo pedir revisión si el casero me envía una subida incorrecta?',
    a: 'Sí. Si la notificación no respeta el contrato o la ley, puedes negociar o solicitar revisión profesional del contrato de alquiler antes de asumir el importe. Inmonest ofrece revisión LAU y redacción de contratos online en toda España.',
  },
] as const

export default function LauActualizacionRentaIrav2026Page() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Actualización de renta LAU 2026: IRAV, derogación del RDL 8/2026 y límites en alquiler',
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Daniel Hernández',
      jobTitle: 'Gestor inmobiliario',
      worksFor: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    datePublished: FECHA,
    dateModified: FECHA,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${SLUG}` },
    image: `${BASE_URL}/gestoria4.jpg`,
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'LAU actualización renta 2026', item: `${BASE_URL}/blog/${SLUG}` },
    ],
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <nav aria-label="Navegación" className="text-sm text-gray-500 mb-8">
          <ol className="flex flex-wrap gap-1">
            <li>
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="mx-1">
              /
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="mx-1">
              /
            </li>
            <li aria-current="page" className="text-gray-700">
              LAU renta IRAV 2026
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              LAU · Actualidad 2026
            </span>
            <span className="text-xs text-gray-400">10 min lectura · 26 de septiembre de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Actualización de renta en alquiler LAU 2026: IRAV, fin del RDL 8/2026 y qué puede subir tu casero
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Si eres inquilino o propietario que alquila entre particulares, en 2026 la pregunta recurrente es:{' '}
            <strong>¿cuánto puede subir la renta?</strong> Tras la polémica del Real Decreto-ley 8/2026 y su
            derogación, vuelve el marco clásico de la <strong>Ley de Arrendamientos Urbanos (LAU)</strong>, la{' '}
            <strong>Ley 12/2023 de vivienda</strong> y el <strong>IRAV</strong>. Te lo explicamos sin jerga innecesaria.
          </p>
        </header>

        <PageHeroImage
          src="/gestoria4.jpg"
          alt="Actualización de renta alquiler LAU 2026 e índice IRAV"
          className="mb-12"
        />

        <article className="prose prose-gray max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Lo esencial (septiembre 2026)</h2>
            <ul className="text-sm space-y-2 mb-0 text-gray-700">
              <li>
                El <strong>RDL 8/2026</strong> (prórroga extra y tope 2 %) <strong>no está vigente</strong>: el
                Congreso no lo convalidó (abril 2026).
              </li>
              <li>
                Duración mínima LAU: <strong>5 años</strong> (arrendador persona física) o <strong>7</strong> (persona
                jurídica), con prórrogas del art. 9 y 10 LAU.
              </li>
              <li>
                Muchos contratos desde mayo 2023 usan <strong>IRAV</strong> para la revisión anual si así se pactó.
              </li>
              <li>
                En <strong>zonas de mercado tensionado</strong> y con <strong>gran tenedor</strong>, hay límites
                adicionales al precio inicial y a la rotación.
              </li>
            </ul>
          </div>

          <h2>Qué era el Real Decreto-ley 8/2026 y por qué ya no aplica</h2>
          <p>
            En marzo de 2026 el Gobierno aprobó medidas urgentes en alquiler vinculadas al contexto económico
            internacional. El RDL 8/2026 proponía, entre otras cosas, una <strong>prórroga extraordinaria de hasta 2
            años</strong> en ciertos contratos que vencían antes de fin de 2027 y una <strong>limitación del 2 %</strong>{' '}
            en la actualización anual de la renta (con reglas especiales para gran tenedor).
          </p>
          <p>
            El Congreso <strong>no convalidó</strong> el decreto. Desde finales de abril de 2026 dejó de tener efectos
            la prórroga del RDL y el tope del 2 % como medida estatal general. Eso no elimina la LAU ni la Ley de
            Vivienda: simplemente vuelves al calendario normal de prórrogas y a las reglas de actualización que ya
            tenía tu contrato.
          </p>
          <p>
            Consecuencia práctica: si tu casero te envió una carta citando “el decreto de marzo”, conviene{' '}
            <strong>revisar si esa base legal sigue siendo aplicable</strong> y contrastar con la cláusula concreta de
            tu contrato de arrendamiento.
          </p>

          <h2>IRAV: el índice que marca muchas subidas de renta en 2026</h2>
          <p>
            La reforma de la LAU ligada a la Ley 12/2023 introdujo el{' '}
            <strong>Índice de Referencia de Arrendamientos de Vivienda (IRAV)</strong> como referencia para actualizar
            la renta en contratos de vivienda habitual celebrados a partir del <strong>26 de mayo de 2023</strong>,
            cuando las partes no pactan otra cosa válida.
          </p>
          <p>
            A diferencia del IPC general, el IRAV mide la evolución del mercado de alquiler de vivienda. En búsquedas
            long tail verás consultas del tipo “<em>subida alquiler IRAV 2026</em>” o “<em>cuánto puede subir mi
            alquiler según LAU</em>”: la respuesta siempre empieza por leer la{' '}
            <strong>cláusula de actualización</strong> de tu contrato y el último IRAV publicado por el INE.
          </p>
          <ul>
            <li>Si el contrato dice “IRAV”, la subida suele calcularse sobre ese índice (salvo norma más protectora).</li>
            <li>Si el contrato es anterior a 2023, puede regir IPC u otra fórmula pactada — no asumas IRAV automáticamente.</li>
            <li>Sin cláusula expresa de revisión, la renta <strong>no se actualiza sola</strong> por el mero paso del tiempo.</li>
          </ul>

          <h2>Zonas tensionadas, SERPAVI y gran tenedor</h2>
          <p>
            En municipios declarados <strong>zona de mercado residencial tensionado</strong>, la Ley de Vivienda impone
            límites al precio en <strong>nuevos contratos</strong> (última renta en 5 años, índices de referencia
            SERPAVI en gran tenedor, etc.). El Ministerio de Vivienda actualizó en <strong>abril de 2026</strong>{' '}
            metodologías del sistema de índices — relevante si alquilas o compras para alquilar en Barcelona, Madrid,
            Valencia, Palma o otras áreas declaradas.
          </p>
          <p>
            <strong>Gran tenedor</strong> (simplificado): quien concentra muchas viviendas en alquiler (umbrales de
            Ley 12/2023). No es lo mismo un propietario con un piso heredado que un fondo con decenas de unidades: las
            obligaciones de fijación y actualización de renta pueden ser más estrictas para el segundo.
          </p>

          <h2>Tabla rápida: ¿qué norma miro según mi caso?</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Situación</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Referencia principal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Contrato firmado desde 26/05/2023, cláusula IRAV</td>
                  <td className="border border-gray-300 px-3 py-2">Art. 18 LAU + IRAV INE</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Nuevo alquiler en zona tensionada</td>
                  <td className="border border-gray-300 px-3 py-2">Art. 17.6 y 17.7 LAU + SERPAVI si gran tenedor</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Prórroga al terminar 5 o 7 años</td>
                  <td className="border border-gray-300 px-3 py-2">Arts. 9 y 10 LAU (y prórrogas sociales art. 10.2-3 si aplican)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Carta del casero citando “decreto marzo 2026”</td>
                  <td className="border border-gray-300 px-3 py-2">Verificar derogación RDL 8/2026; revisar contrato</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Propietario e inquilino: errores que vemos en consultas de gestoría</h2>
          <ol>
            <li>
              <strong>Subir renta sin cláusula de actualización</strong> — no es automático cada año.
            </li>
            <li>
              <strong>Mezclar IPC e IRAV</strong> en un mismo contrato mal redactado.
            </li>
            <li>
              <strong>Olvidar el depósito/fianza autonómica</strong> (comunidad, Cataluña, Madrid, etc.).
            </li>
            <li>
              <strong>Cláusulas de gastos</strong> que repercuten IBI o derramas de forma abusiva (
              <Link href="/blog/clausulas-abusivas-contrato-alquiler" className="text-blue-600 hover:underline">
                ver guía
              </Link>
              ).
            </li>
            <li>
              <strong>Firmar prórroga verbal</strong> sin documentar plazos LAU.
            </li>
          </ol>
          <p>
            Un <strong>contrato de alquiler LAU</strong> bien redactado fija duración, revisión, fianza, inventario y
            comunicaciones. Inmonest lo hace online desde {precioLabel('contrato-alquiler')} con gestor asignado (
            <Link href="/gestoria/contrato-alquiler" className="text-blue-600 hover:underline">
              servicio
            </Link>
            , landings{' '}
            <Link href="/barcelona/contrato-alquiler" className="text-blue-600 hover:underline">
              Barcelona
            </Link>
            ,{' '}
            <Link href="/madrid/contrato-alquiler" className="text-blue-600 hover:underline">
              Madrid
            </Link>
            ,{' '}
            <Link href="/valencia/contrato-alquiler" className="text-blue-600 hover:underline">
              Valencia
            </Link>
            ). Si ya tienes borrador del casero o de la agencia, puedes pedir{' '}
            <Link href="/gestoria/revision-alquiler" className="text-blue-600 hover:underline">
              revisión de contrato de alquiler
            </Link>
            .
          </p>

          <h2>Relacionado en el blog</h2>
          <ul>
            <li>
              <Link href="/blog/contrato-arrendamiento-lau" className="text-blue-600 hover:underline">
                Guía completa contrato arrendamiento LAU
              </Link>
            </li>
            <li>
              <Link href="/blog/contrato-alquiler-vivienda-guia" className="text-blue-600 hover:underline">
                Contrato alquiler vivienda paso a paso
              </Link>
            </li>
            <li>
              <Link href="/blog/alquiler-habitacion-coliving" className="text-blue-600 hover:underline">
                Alquiler habitación y coliving (no siempre LAU vivienda)
              </Link>
            </li>
          </ul>

          <h2>Preguntas frecuentes — actualización renta LAU 2026</h2>
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

          <div className="not-prose mt-12 p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2 text-white">¿Nuevo contrato o subida que no cuadra?</h2>
            <p className="text-white/80 text-sm mb-4">
              Contrato LAU desde {precioLabel('contrato-alquiler')} · Revisión profesional · Gestoría online España
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm"
              >
                Pedir contrato LAU
              </Link>
              <Link
                href="/gestoria/revision-alquiler"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm"
              >
                Revisar mi contrato
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8 not-prose">
            Información general septiembre 2026, no asesoramiento jurídico individual. Consulta BOE, LAU y normativa
            autonómica para tu caso concreto.
          </p>
        </article>
      </main>
    </>
  )
}
