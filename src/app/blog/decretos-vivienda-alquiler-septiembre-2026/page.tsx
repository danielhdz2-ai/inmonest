import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'decretos-vivienda-alquiler-septiembre-2026'
const FECHA = '2026-09-29'
const DESCRIPTION =
  'Decretos de vivienda aprobados el 29 de septiembre de 2026: prórroga de alquileres LAU, desahucios, habitaciones y temporada. Qué cambia para inquilinos y propietarios y qué hacer con tu contrato.'

export const metadata: Metadata = {
  title: 'Decretos vivienda septiembre 2026 — prórroga alquiler LAU',
  description: DESCRIPTION,
  keywords:
    'decreto vivienda 2026, prórroga alquiler 2028, contrato alquiler LAU, alquiler habitación regulación, desahucios 2030, real decreto vivienda septiembre 2026, inquilinos propietarios España',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'Nuevos decretos de vivienda (29 sep 2026): alquiler, prórrogas y contratos',
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
    q: '¿Ya están en vigor los decretos de vivienda del 29 de septiembre de 2026?',
    a: 'El Consejo de Ministros los aprobó ese martes. El Gobierno pidió un pleno extraordinario en el Congreso (previsto el viernes) para su convalidación. Hasta que el Congreso los valide, conviene seguir la normativa LAU y Ley de Vivienda vigente y contrastar cualquier carta del casero con un profesional.',
  },
  {
    q: '¿Qué es la prórroga de dos años que se comenta en los decretos?',
    a: 'Según la información publicada por medios y el propio Ejecutivo, se plantea una prórroga extraordinaria para contratos de vivienda habitual que venzan antes del 31 de diciembre de 2028: el inquilino al corriente de pago podría solicitar hasta dos años adicionales, con condiciones y renta acordes al texto legal final. No sustituye las prórrogas ordinarias del art. 9 y 10 LAU, sino que añade una capa temporal negociada en el decreto.',
  },
  {
    q: '¿Afecta a mi contrato si alquilo una habitación en Barcelona?',
    a: 'Parte de la regulación estatal de habitaciones y temporadas puede no aplicarse en Cataluña, donde el alquiler de habitación en piso compartido sigue regido principalmente por el Código Civil. Para piso completo (LAU) sí aplican las reglas estatales y autonómicas habituales. Si no estás seguro, revisa si tu documento es LAU o contrato de habitación.',
  },
  {
    q: '¿Debo firmar o renovar un contrato antes de que salga el decreto?',
    a: 'No firmes a ciegas por la noticia. Si vas a alquilar o prorrogar, un contrato LAU personalizado (duración, renta, actualización, fianza, prórrogas) te protege sea cual sea el texto final convalidado. Las plantillas genéricas suelen quedar obsoletas en semanas como esta.',
  },
  {
    q: '¿Cómo encaja esto con el Real Decreto-ley 8/2026?',
    a: 'El RDL 8/2026 (marzo 2026) no fue convalidado y dejó de aplicarse en abril. El paquete de septiembre es distinto: nace de un nuevo acuerdo político. Para entender subidas de renta e IRAV, sigue siendo útil nuestra guía de actualización LAU 2026.',
  },
] as const

export default function DecretosViviendaAlquilerSeptiembre2026Page() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Decretos de vivienda septiembre 2026: prórroga de alquileres y estabilidad contractual',
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
      { '@type': 'ListItem', position: 3, name: 'Decretos vivienda 2026', item: `${BASE_URL}/blog/${SLUG}` },
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
              Decretos vivienda 2026
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-red-100 text-red-800 px-3 py-1 rounded-full">
              Actualidad · 29 sep 2026
            </span>
            <span className="text-xs text-gray-400">12 min lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Decretos de vivienda de septiembre 2026: prórroga de alquileres, desahucios y qué hacer con tu contrato LAU
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Este martes 29 de septiembre el <strong>Consejo de Ministros</strong> aprobó{' '}
            <strong>dos reales decretos-ley</strong> en materia de vivienda. En los medios destacan medidas sobre{' '}
            <strong>prórroga extraordinaria de contratos de alquiler</strong>, protección frente a desahucios,
            regulación de <strong>temporada y habitaciones</strong>, y un segundo texto centrado en la{' '}
            <strong>estabilidad de los arrendamientos</strong>. Te resumimos qué significa para inquilinos y
            propietarios — y por qué el contrato escrito importa más que nunca.
          </p>
        </header>

        <PageHeroImage
          src="/gestoria4.jpg"
          alt="Decretos de vivienda y contrato de alquiler LAU 2026"
          className="mb-12"
        />

        <article className="prose prose-gray max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Aviso importante</h2>
            <p className="text-sm text-gray-700 mb-0">
              Este artículo resume <strong>noticias y borradores publicados</strong> (Euronews, RTVE, EL PAÍS, elDiario,
              etc.) el 28–29 de septiembre de 2026. Los decretos deben ser{' '}
              <strong>convalidados por el Congreso</strong> para producir efectos plenos; el texto definitivo puede
              ajustarse en el trámite parlamentario. No es asesoramiento jurídico individual: ante duda, consulta con
              gestoría o abogado.
            </p>
          </div>

          <h2>Qué se aprobó y qué viene después</h2>
          <p>
            Tras semanas de negociación (y en un contexto de presión social por la vivienda), el Ejecutivo llevó al
            Consejo de Ministros <strong>dos decretos separados</strong>:
          </p>
          <ul>
            <li>
              <strong>Decreto “general”</strong>: desahucios, especulación (incluida limitación de compras por fondos
              en la información difundida), fraude en alquileres, temporada, habitaciones, fiscalidad y acceso a
              vivienda.
            </li>
            <li>
              <strong>Decreto de estabilidad en alquiler</strong>: refuerzo de la estabilidad contractual — en prensa
              se menciona la <strong>renovación / prórroga</strong> con causas justificadas para que el arrendador no
              renueve, e indemnización si no las acredita.
            </li>
          </ul>
          <p>
            El Gobierno solicitó un <strong>pleno extraordinario el viernes</strong> para la convalidación inmediata.
            Hasta entonces, tu referencia práctica sigue siendo el{' '}
            <strong>contrato firmado + LAU + Ley 12/2023</strong> (y normativa autonómica: fianza INCASÒL en Cataluña,
            etc.).
          </p>

          <h2>Prórroga de alquileres: la medida que más preguntas genera</h2>
          <p>
            Según EL PAÍS y otros medios con acceso al borrador, se plantea que los contratos de{' '}
            <strong>vivienda habitual</strong> vigentes que <strong>terminen antes del 31 de diciembre de 2028</strong>{' '}
            puedan prorrogarse hasta <strong>dos años adicionales</strong> si el inquilino lo solicita, está al
            corriente de pago (en la información publicada: ocho meses anteriores) y se mantienen condiciones y renta
            del contrato en vigor.
          </p>
          <p>
            No es lo mismo que la prórroga ordinaria de 5+5 o 7+3 años del art. 9 LAU: es un{' '}
            <strong>mecanismo extraordinario</strong> ligado al decreto. Para propietarios implica planificar
            recuperación de la vivienda; para inquilinos, seguridad de permanencia temporal extra — siempre que el
            texto final se convalide y cumplan requisitos.
          </p>
          <p>
            Si tu contrato vence en 2027 o 2028, conviene revisar ya las cláusulas de{' '}
            <strong>duración, preaviso y resolución</strong>. Un LAU mal redactado hoy puede generar litigios mañana,
            con o sin decreto.
          </p>

          <h2>Habitaciones, temporada y Cataluña</h2>
          <p>
            Varios medios indican que la regulación estatal de <strong>alquiler de habitaciones</strong> y{' '}
            <strong>temporada</strong> podría no aplicarse en <strong>Cataluña</strong>, donde las habitaciones en piso
            compartido se rigen por el <strong>Código Civil</strong> (no LAU de vivienda íntegra). En Barcelona esto
            choca con la realidad del mercado: coliving, pisos turísticos mal tipificados y contratos de “temporada”
            que en la práctica son vivienda habitual.
          </p>
          <ul>
            <li>
              <strong>Piso completo, larga duración</strong> → LAU (
              <Link href="/barcelona/contrato-alquiler" className="text-blue-600 hover:underline">
                contrato alquiler Barcelona
              </Link>
              ,{' '}
              <Link href="/barcelona/contrato-alquiler/eixample" className="text-blue-600 hover:underline">
                Eixample
              </Link>
              , etc.).
            </li>
            <li>
              <strong>Habitación suelta</strong> →{' '}
              <Link href="/gestoria/contrato-alquiler-habitacion/barcelona" className="text-blue-600 hover:underline">
                contrato de habitación
              </Link>{' '}
              (Código Civil + normas de convivencia).{' '}
              <Link href="/blog/regulacion-alquiler-temporada-habitaciones-2026" className="text-blue-600 hover:underline">
                Guía temporada y habitaciones 2026
              </Link>
              .
            </li>
            <li>
              <strong>Estancia temporal real</strong> → contrato de temporada con causa acreditada, no LAU de 5 años.
            </li>
          </ul>

          <h2>Desahucios y protección de personas vulnerables</h2>
          <p>
            En la información difundida se habla de ampliar la protección frente a desahucios hasta{' '}
            <strong>2030</strong> en determinados supuestos de vulnerabilidad. Es un eje político sensible: no cambia
            que, en contratos LAU, el <strong>impago reiterado</strong> y el incumplimiento grave sigan siendo vías de
            resolución — pero el marco social y los moratorios pueden afectar procedimientos. De nuevo: el contrato
            debe describir impago, requerimientos y plazos con claridad.
          </p>

          <h2>Qué hacer tú esta semana (checklist)</h2>
          <ol>
            <li>
              <strong>Inquilino</strong>: no aceptes prórrogas verbales; pide todo por escrito y contrasta con LAU.
            </li>
            <li>
              <strong>Propietario</strong>: si vas a alquilar antes del pleno del Congreso, usa un contrato actualizado
              a Ley de Vivienda 2026, no un modelo de 2019.
            </li>
            <li>
              <strong>Ambos</strong>: guarda comunicaciones de subidas de renta; revisa si citan decretos derogados (
              <Link href="/blog/lau-actualizacion-renta-irav-2026" className="text-blue-600 hover:underline">
                guía IRAV 2026
              </Link>
              ).
            </li>
            <li>
              <strong>Nuevo alquiler</strong>: redacción personalizada desde {precioLabel('contrato-alquiler')} (
              <Link href="/gestoria/solicitar/contrato-alquiler" className="text-blue-600 hover:underline">
                pedir contrato LAU
              </Link>
              ) o revisión si ya tienes borrador (
              <Link href="/gestoria/revision-alquiler" className="text-blue-600 hover:underline">
                revisión alquiler
              </Link>
              ).
            </li>
          </ol>

          <h2>Fuentes y seguimiento</h2>
          <p>
            Para contrastar el detalle legal cuando se publique el BOE: cobertura en{' '}
            <a
              href="https://es.euronews.com/2026/09/29/psoe-y-sumar-alcanzan-un-acuerdo-sobre-el-decreto-de-vivienda"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Euronews (29 sep 2026)
            </a>
            ,{' '}
            <a
              href="https://www.rtve.es/noticias/20260928/gobierno-negocia-contrarreloj-decreto-vivienda-contente-todos-claves/17243019.shtml"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              RTVE
            </a>{' '}
            y{' '}
            <a
              href="https://elpais.com/economia/vivienda/2026-09-28/el-gobierno-plantea-a-los-socios-prohibir-los-desahucios-a-personas-vulnerables-hasta-2028-y-prorrogar-dos-anos-los-alquileres.html"
              className="text-blue-600 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              EL PAÍS (28 sep 2026)
            </a>
            . Actualizaremos este post cuando exista texto convalidado.
          </p>

          <h2>Preguntas frecuentes</h2>
          <div className="not-prose space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white border border-gray-200 rounded-xl p-5">
                <summary className="font-bold text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}
