import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'revision-contrato-arras-antes-firmar'
const FECHA = '2026-09-26'
const DESCRIPTION =
  'Guía para revisar un contrato de arras o señal antes de entregar dinero: cláusulas penitenciales, plazos, hipoteca, cargas registrales y errores típicos. Servicio de revisión online con gestor asignado.'

export const metadata: Metadata = {
  title: 'Revisión contrato de arras antes de firmar — Checklist legal 2026',
  description: DESCRIPTION,
  keywords:
    'revisión contrato arras, revisar contrato de señal compraventa, corrección cláusulas arras, gestoría revisión arras online, contrato arras penitenciales revisión, revisar arras antes de firmar, revisión contrato señal vivienda, gestor inmobiliario revisar arras',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'Revisión del contrato de arras antes de firmar — Checklist 2026',
    description:
      'Checklist legal para compradores entre particulares: qué revisar en las arras, cuándo pedir corrección y cómo no perder la señal.',
    url: `${BASE_URL}/blog/${SLUG}`,
    locale: 'es_ES',
    type: 'article',
    siteName: 'Inmonest',
    publishedTime: FECHA,
  },
}

const FAQ = [
  {
    q: '¿Puedo revisar un contrato de arras que me ha enviado la agencia del vendedor?',
    a: 'Sí, y es muy recomendable. Ese borrador suele proteger al vendedor. Una revisión independiente por gestoría comprueba penitenciales, plazos, cláusula de financiación y coherencia con la nota simple registral antes de que entregues la señal.',
  },
  {
    q: '¿Cuánto cuesta revisar un contrato de arras en una gestoría online?',
    a: 'En Inmonest el servicio de revisión y corrección de arras tiene precio cerrado publicado en la web (IVA incluido), con informe de riesgos y propuesta de cláusulas. Redactar arras desde cero suele costar menos que corregir un borrador muy defectuoso después de firmar.',
  },
  {
    q: '¿Qué diferencia hay entre revisar arras y hacer due diligence?',
    a: 'La revisión del contrato se centra en el texto que vas a firmar: tipo de arras, importes, plazos y penalizaciones. La due diligence pre-compra analiza toda la documentación del inmueble (registro, comunidad, IBI, certificados). Lo ideal es combinar ambos antes de entregar señal elevada.',
  },
  {
    q: '¿Las arras penitenciales se pueden negociar después de firmar?',
    a: 'Solo por acuerdo de ambas partes con un nuevo documento. Si firmas arras mal redactadas, perder la señal o litigar cuesta mucho más que revisar antes. Por eso conviene la revisión previa.',
  },
  {
    q: '¿Hace falta ir presencialmente para revisar las arras?',
    a: 'No. La gestoría inmobiliaria online trabaja por WhatsApp, email y panel: envías el PDF del borrador, el gestor analiza y te devuelve observaciones o un contrato corregido. Válido en toda España.',
  },
] as const

export default function RevisionContratoArrasAntesFirmarPage() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Revisión del contrato de arras antes de firmar: checklist legal para compradores 2026',
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
    image: `${BASE_URL}/gestoria1.jpg`,
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Revisión contrato arras', item: `${BASE_URL}/blog/${SLUG}` },
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
              Revisión contrato arras
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              Gestoría · Arras
            </span>
            <span className="text-xs text-gray-400">11 min lectura · 26 de septiembre de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Revisión del contrato de arras antes de firmar: checklist legal para no perder la señal
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vas a entregar miles de euros en concepto de señal y el vendedor (o su agencia) te ha pasado un borrador de{' '}
            <strong>contrato de arras penitenciales</strong>. Esta guía explica qué debe revisar un{' '}
            <strong>gestor inmobiliario</strong> antes de que firmes — y cuándo conviene un servicio profesional de{' '}
            <strong>revisión y corrección de arras online</strong>.
          </p>
        </header>

        <PageHeroImage
          src="/gestoria1.jpg"
          alt="Revisión de contrato de arras antes de firmar la señal de compraventa"
          className="mb-12"
        />

        <article className="prose prose-gray max-w-none">
          <div className="bg-slate-50 border-l-4 border-gold-500 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Resumen ejecutivo</h2>
            <ul className="text-sm space-y-2 mb-0 text-gray-700">
              <li>
                Revisa <strong>tipo de arras</strong>, importe, plazo a escritura y cláusula de{' '}
                <strong>hipoteca / financiación</strong> antes de pagar.
              </li>
              <li>
                Cruza el contrato con la <strong>nota simple registral</strong>: titular, cargas y referencia catastral.
              </li>
              <li>
                Si el borrador lo redactó el vendedor, una{' '}
                <Link href="/gestoria/revision-correccion-arras" className="text-gold-700 font-semibold hover:underline">
                  revisión independiente de arras
                </Link>{' '}
                evita cláusulas desequilibradas.
              </li>
              <li>
                Servicio desde {precioLabel('revision-correccion-arras')} con gestor asignado (Inmonest, 100 % online).
              </li>
            </ul>
          </div>

          <h2>¿Por qué revisar el contrato de arras antes de firmar?</h2>
          <p>
            El contrato de arras (o contrato de señal en compraventa de vivienda) no es un trámite menor: fija las
            reglas del juego hasta la escritura pública. En las{' '}
            <Link href="/blog/contrato-arras-diferencias" className="text-blue-600 hover:underline">
              arras penitenciales
            </Link>
            , si el comprador se echa atrás sin causa justificada, <strong>pierde la señal</strong>; si incumple el
            vendedor, debe devolver el <strong>doble</strong>. Un error de redacción — plazo imposible, referencia
            registral incorrecta, omisión de cargas — puede costarte más que cualquier honorario de gestoría.
          </p>
          <p>
            Muchos compradores entre particulares confían en el modelo que les envía la inmobiliaria del vendedor. Ese
            documento cumple la función de <em>cerrar la operación rápido</em>, no siempre la de <em>proteger al
            comprador</em>. Por eso crece la búsqueda de{' '}
            <strong>revisión de contrato de arras online</strong> y de gestorías que no cobran comisión sobre el precio
            del piso.
          </p>

          <h2>Checklist: 12 puntos que debe revisar tu gestor (o tú con esta guía)</h2>
          <ol>
            <li>
              <strong>Identificación de las partes</strong> — DNI/NIE, estado civil si afecta al régimen de gananciales,
              y capacidad para vender/comprar.
            </li>
            <li>
              <strong>Descripción del inmueble</strong> — Dirección, referencia catastral, finca registral y superficie
              coherente con escritura y catastro.
            </li>
            <li>
              <strong>Tipo de arras</strong> — Penitenciales vs confirmatorias; en penitenciales, que las penalizaciones
              estén expresamente previstas (art. 1454 CC).
            </li>
            <li>
              <strong>Importe de la señal</strong> — Porcentaje habitual (5-10 %), forma de pago trazable y recibo o
              justificante.
            </li>
            <li>
              <strong>Precio total y medios de pago</strong> — Resto a escritura, si hay entrega de efectivo o solo
              transferencia.
            </li>
            <li>
              <strong>Plazo para otorgar escritura pública</strong> — Fecha concreta o plazo máximo; prórrogas y causas
              de extensión.
            </li>
            <li>
              <strong>Cláusula de financiación / hipoteca</strong> — Arras condicionadas a concesión de préstamo en X
              días; importe máximo y qué pasa si el banco deniega.
            </li>
            <li>
              <strong>Cargas y gravámenes</strong> — Hipoteca pendiente, embargo, usufructo, servidumbres; obligación
              del vendedor de cancelar antes de escritura.
            </li>
            <li>
              <strong>Estado del inmueble y anexos</strong> — Garaje, trastero, muebles incluidos, licencias de obra.
            </li>
            <li>
              <strong>Gastos e impuestos</strong> — IBI, comunidad, plusvalía municipal, quién paga notaría y registro
              (según pacto).
            </li>
            <li>
              <strong>Incumplimiento y resolución</strong> — Plazos de cura, comunicaciones fehacientes, penalizaciones
              proporcionadas.
            </li>
            <li>
              <strong>Documentación anexa</strong> — Nota simple reciente, certificado energético, ITE si procede,
              acta de comunidad sin deudas relevantes.
            </li>
          </ol>

          <h2>Errores frecuentes en borradores de arras (long tail que vemos en consultas)</h2>
          <ul>
            <li>
              <strong>“Arras penitenciales” mal nombradas</strong> — Texto que en la práctica funciona como señal simple
              sin doble devolución.
            </li>
            <li>
              <strong>Plazo de escritura demasiado corto</strong> — Impide tramitar hipoteca o{' '}
              <Link href="/blog/due-diligence-compra-vivienda" className="text-blue-600 hover:underline">
                due diligence inmobiliaria
              </Link>
              .
            </li>
            <li>
              <strong>Sin cláusula de hipoteca</strong> — Comprador obligado aunque el banco no conceda el préstamo.
            </li>
            <li>
              <strong>Vendedor distinto del titular registral</strong> — Herencias sin adjudicación, proindiviso sin
              consentimiento de todos los copropietarios.
            </li>
            <li>
              <strong>Referencia a normativa autonómica incorrecta</strong> — Especialmente en Cataluña, Valencia o
              País Vasco (fianzas, idioma, plusvalía).
            </li>
          </ul>
          <p>
            Si detectas varios de estos puntos, no firmes “para no perder el piso”. Pide{' '}
            <strong>corrección de cláusulas de arras</strong> o encarga{' '}
            <Link href="/gestoria/solicitar/revision-correccion-arras" className="text-blue-600 hover:underline">
              revisión profesional
            </Link>{' '}
            antes de entregar la señal.
          </p>

          <h2>Revisión de arras vs redactar arras desde cero</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Situación</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Servicio recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Ya tienes borrador del vendedor o agencia</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/revision-correccion-arras" className="text-gold-700 font-medium hover:underline">
                      Revisión + corrección de arras
                    </Link>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Compráis entre particulares sin borrador</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/arras-penitenciales" className="text-gold-700 font-medium hover:underline">
                      Redacción arras penitenciales
                    </Link>{' '}
                    (
                    <Link href="/barcelona/contrato-arras" className="text-blue-600 hover:underline">
                      Barcelona
                    </Link>
                    ,{' '}
                    <Link href="/madrid/contrato-arras" className="text-blue-600 hover:underline">
                      Madrid
                    </Link>
                    ,{' '}
                    <Link href="/valencia/contrato-arras" className="text-blue-600 hover:underline">
                      Valencia
                    </Link>
                    …)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Señal alta y documentación compleja</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/pack-due-diligence-precompra" className="text-gold-700 font-medium hover:underline">
                      Due diligence pre-compra
                    </Link>{' '}
                    + revisión de arras
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Gestoría online: cómo funciona la revisión con Inmonest</h2>
          <p>
            Inmonest es <strong>gestoría inmobiliaria online</strong> para particulares en toda España: envías el PDF
            del borrador, un gestor (Daniel Hernández o el equipo asignado) analiza cláusulas y coherencia registral, y
            recibes informe con riesgos y propuesta de corrección. Trabajo por panel y WhatsApp, sin comisión sobre el
            precio de la vivienda.
          </p>
          <p>
            Landings por ciudad con el mismo servicio:{' '}
            <Link href="/gestoria/revision-correccion-arras/barcelona" className="text-blue-600 hover:underline">
              revisión arras Barcelona
            </Link>
            ,{' '}
            <Link href="/gestoria/revision-correccion-arras/madrid" className="text-blue-600 hover:underline">
              Madrid
            </Link>
            ,{' '}
            <Link href="/gestoria/revision-correccion-arras/valencia" className="text-blue-600 hover:underline">
              Valencia
            </Link>
            . También puedes leer{' '}
            <Link href="/blog/detectar-contrato-arras-fraudulento" className="text-blue-600 hover:underline">
              señales de fraude en arras
            </Link>{' '}
            y{' '}
            <Link href="/blog/cuanto-cuesta-contrato-arras" className="text-blue-600 hover:underline">
              precios de contrato de arras
            </Link>
            .
          </p>

          <h2>Preguntas frecuentes sobre revisar contrato de señal</h2>
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

          <div className="not-prose mt-12 p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2 text-white">¿Tienes un borrador de arras en la mano?</h2>
            <p className="text-white/80 text-sm mb-4">
              Revisión y corrección desde {precioLabel('revision-correccion-arras')} · Gestor asignado · 20 reseñas
              Google 5,0
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/revision-correccion-arras"
                className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm"
              >
                Solicitar revisión
              </Link>
              <Link
                href="/gestoria/revision-correccion-arras"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm"
              >
                Ver servicio
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
