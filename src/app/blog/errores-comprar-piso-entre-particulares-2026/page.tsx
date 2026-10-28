import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import GestorContactBanner from '@/components/GestorContactBanner'
import { BlogGestorExpedientePanel } from '@/components/blog/BlogGestorExpedientePanel'
import { BlogServiciosGrid } from '@/components/blog/BlogServiciosGrid'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'errores-comprar-piso-entre-particulares-2026'
const FECHA = '2026-10-28'
const DESCRIPTION =
  '10 errores que cuestan miles de euros al comprar piso entre particulares: arras, nota simple, comunidad, hipoteca y escritura. Checklist, plazos y servicios de gestoría online Inmonest.'

export const metadata: Metadata = {
  title: '10 errores al comprar piso entre particulares [2026]',
  description: DESCRIPTION,
  keywords:
    'errores al comprar piso entre particulares, compraventa entre particulares, qué evitar al comprar piso de particular, contrato arras comprador, due diligence compra vivienda, gastos compraventa particular',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: '10 errores que cuestan miles de euros al comprar piso entre particulares',
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
    q: '¿Cuál es el error más caro al comprar de particular a particular?',
    a: 'Firmar arras penitenciales sin revisar la nota simple registral y el certificado de deudas de comunidad. Heredas cargas, embargos o derramas que pueden superar fácilmente 10.000 € y bloquear la escritura.',
  },
  {
    q: '¿Puedo comprar un piso entre particulares sin gestoría?',
    a: 'Legalmente sí, pero asumes todo el riesgo documental. Un notario comprueba formalidades el día de la firma, no sustituye una due diligence previa ni la revisión del contrato de arras. La gestoría online cierra el hueco entre “me fío” y escritura.',
  },
  {
    q: '¿Cuánto cuesta protegerse con gestoría antes de las arras?',
    a: `La revisión de arras parte de ${precioLabel('revision-correccion-arras')}; el pack due diligence pre-compra desde ${precioLabel('pack-due-diligence-precompra')}. Son cifras fijas con IVA incluido, muy inferiores a una señal perdida o una deuda oculta.`,
  },
  {
    q: '¿Qué documentos debe pedir el comprador al vendedor antes de la señal?',
    a: 'Nota simple registral reciente, certificado de deudas de comunidad, último IBI pagado, certificado energético, cédula de habitabilidad si la comunidad autónoma lo exige, ITE si el edificio la requiere, y justificantes de suministros sin deuda relevante.',
  },
  {
    q: '¿Las arras penitenciales obligan siempre a comprar?',
    a: 'No “obligar” en sentido penal, pero sí con consecuencias económicas: si te echas atrás sin causa pactada (p. ej. denegación de hipoteca con cláusula bien redactada), pierdes la señal. Por eso la cláusula de financiación y la revisión previa son críticas.',
  },
] as const

const INDICE = [
  { id: 'error-1', label: 'Firmar arras sin revisión' },
  { id: 'error-2', label: 'No pedir nota simple' },
  { id: 'error-3', label: 'Ignorar la comunidad' },
  { id: 'error-4', label: 'Sin cláusula de hipoteca' },
  { id: 'error-5', label: 'Confiar solo en fotos' },
  { id: 'error-6', label: 'Plazos imposibles' },
  { id: 'error-7', label: 'Olvidar cédula e ITE' },
  { id: 'error-8', label: 'Pagar señal en efectivo' },
  { id: 'error-9', label: 'No calcular gastos' },
  { id: 'error-10', label: 'Ir solos a escritura' },
  { id: 'servicios', label: 'Servicios Inmonest' },
  { id: 'faq', label: 'Preguntas frecuentes' },
] as const

export default function ErroresComprarPisoEntreParticulares2026Page() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '10 errores que cuestan miles de euros al comprar piso entre particulares',
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
    image: `${BASE_URL}/contratodearras.jpg`,
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Errores compraventa particulares', item: `${BASE_URL}/blog/${SLUG}` },
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
              Errores compraventa
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Compraventa · Guía 2026
            </span>
            <span className="text-xs text-gray-400">18 min lectura · 28 de octubre de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            10 errores que cuestan miles de euros al comprar piso entre particulares (y cómo evitarlos)
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Comprar <strong>de particular a particular</strong> ahorra comisiones de agencia, pero traslada todo el
            riesgo legal a tus hombros. Esta guía recorre los fallos que vemos cada semana en consultas de gestoría —
            desde las <strong>arras mal redactadas</strong> hasta deudas de comunidad que aparecen el día de la
            escritura — y qué hacer en cada fase con apoyo de <strong>Inmonest</strong>.
          </p>
        </header>

        <PageHeroImage
          src="/contratodearras.jpg"
          alt="Contrato de arras y compraventa entre particulares"
          className="mb-10"
          priority
        />

        <nav aria-label="Índice del artículo" className="not-prose mb-10 rounded-xl border border-gray-200 bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Índice</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {INDICE.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-gold-800 hover:underline font-medium">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose prose-gray max-w-none">
          <div className="bg-slate-50 border-l-4 border-gold-500 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Resumen ejecutivo</h2>
            <ul className="text-sm space-y-2 mb-0 text-gray-700">
              <li>
                No entregues señal hasta revisar <strong>nota simple</strong>, <strong>comunidad</strong> e{' '}
                <strong>hipoteca</strong> en el contrato de arras.
              </li>
              <li>
                La <Link href="/blog/due-diligence-compra-vivienda">due diligence</Link> y la{' '}
                <Link href="/blog/revision-contrato-arras-antes-firmar">revisión de arras</Link> cuestan menos que un
                solo error típico.
              </li>
              <li>
                Calcula <strong>ITP/IVA, notaría, registro y gestoría</strong> antes de negociar el precio final.
              </li>
            </ul>
          </div>

          <p>
            En España, miles de compraventas anuales se cierran sin agencia: anuncios en portales, visitas entre
            particulares, una negociación de precio y, en cuestión de semanas, <strong>arras + hipoteca + escritura</strong>.
            El problema no es el modelo — es creer que “como no hay comisión, no hay riesgo”. Abajo, cada error con
            contexto, señales de alerta y enlace a servicios concretos.
          </p>

          <BlogGestorExpedientePanel
            whatsappMessage="Hola Daniel, estoy comprando piso entre particulares y quiero evitar errores en arras y documentación"
            body="Cuéntanos en qué fase estás (visita, negociación, borrador de arras o pre-escritura). Te orientamos gratis y, si encaja, abrimos expediente con due diligence o revisión de contrato."
          />

          <h2 id="error-1">Error 1: Firmar arras el mismo día que visitas el piso</h2>
          <p>
            La presión del vendedor (“hay otro interesado”) empuja a firmar un borrador que no has leído. Las{' '}
            <Link href="/blog/contrato-arras-diferencias">arras penitenciales</Link> fijan penalizaciones duras: pierdes
            la señal o pagas el doble si alguien incumple. Un gestor debe comprobar que el texto dice lo que creéis
            haber pactado verbalmente.
          </p>
          <p>
            <strong>Qué hacer:</strong> pide 48–72 h para revisión. Encarga{' '}
            <Link href="/gestoria/revision-correccion-arras">revisión y corrección de arras</Link> (
            {precioLabel('revision-correccion-arras')}) o redacta desde cero con{' '}
            <Link href="/gestoria/arras-penitenciales">arras penitenciales</Link> (
            {precioLabel('arras-penitenciales')}).
          </p>

          <PageHeroImage
            src="/businessman-checking-documents-table.jpg"
            alt="Revisión de documentación antes de firmar arras de compraventa"
            className="my-8"
          />

          <h2 id="error-2">Error 2: No solicitar nota simple registral actualizada</h2>
          <p>
            La nota simple es la radiografía jurídica del piso: titular real, hipotecas, embargos, usufructos,
            discrepancias de metros. Cuesta pocos euros y se pide online. Sin ella, puedes estar pagando señal a quien
            no puede vender o sobre un inmueble con cargas que el vendedor prometió “cancelar luego”.
          </p>
          <ul>
            <li>Comprueba que el vendedor coincide con el titular registral (o todos los cotitulares autorizan).</li>
            <li>Detecta hipotecas pendientes: deben cancelarse antes o en el acto de escritura con provisión de fondos.</li>
            <li>Cruza referencia catastral con el Catastro y con la realidad de la visita.</li>
          </ul>
          <p>
            Más detalle en nuestra guía de{' '}
            <Link href="/blog/due-diligence-compra-vivienda">due diligence inmobiliaria</Link> y en el{' '}
            <Link href="/gestoria/pack-due-diligence-precompra">pack pre-compra</Link>.
          </p>

          <h2 id="error-3">Error 3: Ignorar deudas y derramas de la comunidad</h2>
          <p>
            Según la Ley de Propiedad Horizontal, el comprador puede responder de deudas de comunidad del vendedor hasta
            un año. Un certificado del administrador que diga “sin deuda” no es burocracia: es escudo. Peor aún son las{' '}
            <strong>derramas aprobadas y no pagadas</strong> (rehabilitación de fachada, ascensor, ITE global) que
            explotan justo después de entrar.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r not-prose my-6">
            <p className="text-sm text-red-900 mb-0">
              <strong>Señal roja:</strong> el vendedor “no encuentra” el contacto del administrador, o el certificado
              tiene más de 30 días. Pide actas de los últimos dos ejercicios — es parte del{' '}
              {precioLabel('pack-due-diligence-precompra')} en Inmonest.
            </p>
          </div>

          <h2 id="error-4">Error 4: Comprar con hipoteca sin cláusula de financiación</h2>
          <p>
            Si necesitas préstamo, el contrato debe decir expresamente qué ocurre si el banco deniega en X días: devolución
            íntegra de la señal, plazo para buscar otra entidad, documentación que debes aportar. Sin esa cláusula, un
            comprador puede perder miles porque “el tipo subió” o la tasación salió baja.
          </p>
          <p>
            Consulta también nuestra sección de{' '}
            <Link href="/hipoteca">hipoteca entre particulares</Link> para entender entrada, tasación y plazos realistas
            en 2026.
          </p>

          <PageHeroImage
            src="/scott-graham-5fNmWej4tAA-unsplash.jpg"
            alt="Documentos legales y compraventa de vivienda"
            className="my-8"
          />

          <h2 id="error-5">Error 5: Confiar en el anuncio y no verificar la realidad</h2>
          <p>
            Metros construidos vs útiles, estado de instalaciones, humedades encubiertas con pintura, terraza sin
            legalizar. Las fotos del portal no sustituyen una visita con checklist ni, en operaciones de cierta cuantía,
            un informe técnico. Si compras en edificio antiguo, pregunta por <strong>ITE</strong> y obras recientes.
          </p>
          <p>
            Para vendedores que quieren hacer las cosas bien, enlazamos{' '}
            <Link href="/blog/vender-piso-sin-comisiones">vender sin comisiones</Link>; para compradores, el foco es
            verificar antes de señal, no depender de la buena fe.
          </p>

          <h2 id="error-6">Error 6: Plazos de escritura imposibles</h2>
          <p>
            “Escritura en 15 días” con hipoteca, herencia pendiente o cancelación de hipoteca encadenada es una receta
            para penalizaciones. Los plazos deben alinear: concesión bancaria, cancelación registral, certificados
            municipales y agenda del notario. Un gestor recalibrará fechas en el contrato para evitar incumplimientos
            ficticios.
          </p>

          <h2 id="error-7">Error 7: Olvidar cédula de habitabilidad, certificado energético o ITE</h2>
          <p>
            El certificado energético es obligatorio en toda España para vender. La{' '}
            <strong>cédula de habitabilidad</strong> es exigida en varias comunidades (Cataluña, País Vasco, Navarra…)
            y su ausencia puede paralizar la operación. La ITE en edificios de cierta antigüedad anticipa derramas
            futuras. Pide copias <em>antes</em> de arras, no “el día antes del notario”.
          </p>
          <p>
            Ciudad a ciudad cambian matices: lee{' '}
            <Link href="/blog/gestoria-barcelona-valencia-madrid">gestoría Barcelona, Valencia y Madrid</Link>.
          </p>

          <h2 id="error-8">Error 8: Pagar señal en efectivo sin trazabilidad</h2>
          <p>
            Transferencia bancaria con concepto claro, recibo firmado y referencia al contrato. El efectivo dificulta
            pruebas en litigio y choca con normativa anti-blanqueo en operaciones inmobiliarias. Si el vendedor insiste
            en “solo efectivo”, es bandera roja — revisa{' '}
            <Link href="/blog/detectar-contrato-arras-fraudulento">señales de fraude en arras</Link>.
          </p>

          <h2 id="error-9">Error 9: No calcular todos los gastos de compraventa</h2>
          <p>
            El precio del anuncio no es lo que pagas al final. Suma impuesto (ITP en segunda mano, IVA en obra nueva),
            notaría, registro, gestoría de hipoteca, tasación, seguros y posibles reformas obligatorias. Negociar 5.000 €
            de rebaja pierde sentido si heredas 8.000 € de deuda oculta.
          </p>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Concepto</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Orden de magnitud (indicativo)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">ITP (segunda mano, varía por CCAA)</td>
                  <td className="border border-gray-300 px-3 py-2">6 % – 11 % del precio declarado</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Notaría + registro</td>
                  <td className="border border-gray-300 px-3 py-2">0,5 % – 1,5 % aprox. del precio</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Gestoría hipoteca (si aplica)</td>
                  <td className="border border-gray-300 px-3 py-2">800 € – 1.500 €</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Due diligence / revisión arras (Inmonest)</td>
                  <td className="border border-gray-300 px-3 py-2">
                    {precioLabel('revision-correccion-arras')} – {precioLabel('pack-due-diligence-precompra')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">
            Cifras orientativas; tu CCAA y el precio concreto cambian el total. Un gestor te ayuda a no dejar partidas
            fuera del presupuesto.
          </p>

          <h2 id="error-10">Error 10: Llegar a escritura sin haber leído la minuta</h2>
          <p>
            El notario lee y eleva a público, pero tú debes entender cargas, descripción registral, precio, forma de pago
            y si hay retenciones por cancelación de hipoteca. Quien ya ha hecho{' '}
            <Link href="/blog/servicio-completo-compra-vivienda">acompañamiento integral</Link> llega con menos
            sorpresas. Si compras lejos de tu ciudad, la gestoría online evita desplazarte para cada trámite previo.
          </p>

          <h2>Calendario tipo: compraventa entre particulares sin agencia</h2>
          <ol>
            <li>
              <strong>Semanas 1–2:</strong> búsqueda en <Link href="/pisos">portal Inmonest</Link>, visitas, negociación.
            </li>
            <li>
              <strong>Semana 3:</strong> solicitud documentación + revisión arras / due diligence.
            </li>
            <li>
              <strong>Semana 4:</strong> firma arras, transferencia señal, solicitud hipoteca si aplica.
            </li>
            <li>
              <strong>Semanas 5–10:</strong> tasación, provisión fondos vendedor, certificados finales, fecha notaría.
            </li>
            <li>
              <strong>Escritura:</strong> pago resto, ITP, registro, entrega llaves.
            </li>
          </ol>

          <div id="servicios">
            <BlogServiciosGrid
              title="Servicios Inmonest para comprar con garantías"
              intro="Precio cerrado, gestor asignado, imágenes reales de cada trámite y panel para subir PDFs. Sin comisión sobre el precio del piso."
              items={[
                {
                  slug: 'revision-correccion-arras',
                  descripcion:
                    'Analizamos el borrador del vendedor, detectamos cláusulas desequilibradas y proponemos corrección antes de que entregues la señal.',
                },
                {
                  slug: 'arras-penitenciales',
                  descripcion:
                    'Redacción desde cero entre particulares: penitenciales, hipoteca, plazos y coherencia registral.',
                },
                {
                  slug: 'pack-due-diligence-precompra',
                  descripcion:
                    'Informe PDF con comunidad, ITE, nota simple, urbanismo y riesgos documentales antes de comprometer sumas altas.',
                },
                {
                  slug: 'venta-completa-reserva-escritura',
                  href: '/gestoria/venta-completa-reserva-escritura',
                  descripcion:
                    'Acompañamiento del vendedor (o comprador que coordina) desde reserva hasta escritura con gestor personalizado.',
                },
              ]}
            />
          </div>

          <h2 id="faq">Preguntas frecuentes</h2>
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

          <div className="not-prose mt-12 p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2 text-white">¿Vas a entregar señal esta semana?</h2>
            <p className="text-white/80 text-sm mb-4">
              Revisión arras desde {precioLabel('revision-correccion-arras')} · Due diligence desde{' '}
              {precioLabel('pack-due-diligence-precompra')} · Gestor Daniel Hernández · Panel online
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/revision-correccion-arras"
                className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm"
              >
                Revisar mis arras
              </Link>
              <Link
                href="/gestoria/solicitar/pack-due-diligence-precompra"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm"
              >
                Due diligence pre-compra
              </Link>
            </div>
          </div>
        </article>

        <GestorContactBanner
          title="¿Necesitas hablar con tu gestor inmobiliario?"
          subtitle="Compraventa entre particulares: arras, documentación y plazos. Te orientamos por teléfono o WhatsApp antes de que firmes nada."
          whatsappMessage="Hola Daniel, compro piso entre particulares y quiero asesoramiento antes de firmar arras"
          imagePosition="right"
        />

        <p className="mt-8 text-center">
          <Link href="/blog" className="text-sm text-amber-600 hover:text-amber-700 font-semibold">
            ← Volver al blog
          </Link>
        </p>
      </main>
    </>
  )
}
