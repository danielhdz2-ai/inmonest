import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import GestorContactBanner from '@/components/GestorContactBanner'
import { BlogGestorExpedientePanel } from '@/components/blog/BlogGestorExpedientePanel'
import { BlogServiciosGrid } from '@/components/blog/BlogServiciosGrid'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'actualidad-vivienda-espana-octubre-2026'
const FECHA = '2026-10-28'
const DESCRIPTION =
  'Actualidad vivienda octubre 2026: decretos de alquiler, Euríbor, compraventa entre particulares y qué contratos revisar ahora. Análisis para propietarios e inquilinos con gestoría Inmonest.'

export const metadata: Metadata = {
  title: 'Actualidad vivienda España octubre 2026 — alquiler y compra',
  description: DESCRIPTION,
  keywords:
    'actualidad vivienda 2026, mercado inmobiliario España octubre 2026, decretos vivienda alquiler, compraventa particulares 2026, euribor hipoteca vivienda, gestoría inmobiliaria online',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'Actualidad de la vivienda en España (octubre 2026): qué cambia para ti',
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
    q: '¿Los decretos de vivienda de septiembre 2026 ya afectan a mi contrato de alquiler?',
    a: 'Depende de la convalidación parlamentaria y del texto definitivo. Mientras tanto, lo que manda es tu contrato firmado, la LAU y la Ley 12/2023. Si te llega una carta del casero citando “el nuevo decreto”, contrasta con un gestor antes de firmar nada.',
  },
  {
    q: '¿Es buen momento para comprar piso entre particulares en octubre de 2026?',
    a: 'No hay respuesta única: importa tu hipoteca preconcedida, la CCAA del ITP y la calidad documental del inmueble. Sí hay más conciencia de revisar arras y due diligence tras años de titulares sobre fraudes y cargas ocultas — eso juega a favor del comprador informado.',
  },
  {
    q: '¿La actualidad normativa obliga a cambiar contratos ya firmados?',
    a: 'En general, no retroactivamente sin base legal clara. Sí conviene revisar prórrogas, subidas de renta (IRAV en LAU) y contratos de temporada mal tipificados antes de que venzan.',
  },
  {
    q: '¿Qué servicios de Inmonest encajan con la actualidad de octubre?',
    a: 'Para alquiler: LAU, habitación y temporada personalizados. Para compraventa: revisión de arras, due diligence y venta completa hasta escritura. Todo online con gestor asignado y panel de cliente.',
  },
  {
    q: '¿Puedo hablar con un gestor antes de contratar?',
    a: 'Sí. Llamada o WhatsApp sin compromiso (L–V 9:00–19:00). Te indicamos si necesitas revisión, redacción nueva o pack documental según tu caso.',
  },
] as const

export default function ActualidadViviendaEspanaOctubre2026Page() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Actualidad de la vivienda en España — octubre 2026',
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
    image: `${BASE_URL}/olena-kholina-MhqUBTxQ3Hw-unsplash.jpg`,
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Actualidad vivienda octubre 2026', item: `${BASE_URL}/blog/${SLUG}` },
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
              Actualidad octubre 2026
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-red-100 text-red-900 px-3 py-1 rounded-full">
              Actualidad · 28 oct 2026
            </span>
            <span className="text-xs text-gray-400">16 min lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Actualidad de la vivienda en España (octubre 2026): alquiler, compraventa y qué hacer con tus contratos
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tras el intenso septiembre legislativo en alquiler, octubre trae preguntas prácticas: ¿afecta a mi LAU?, ¿cómo
            negociar una compra entre particulares con tipos de interés en movimiento?, ¿temporada o habitación siguen
            igual en Cataluña? Repasamos el contexto — sin alarmismo — y enlazamos acciones concretas con{' '}
            <strong>gestoría inmobiliaria online</strong>.
          </p>
        </header>

        <PageHeroImage
          src="/olena-kholina-MhqUBTxQ3Hw-unsplash.jpg"
          alt="Actualidad del mercado de vivienda en España 2026"
          className="mb-10"
          aspect="banner"
          priority
        />

        <article className="prose prose-gray max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Aviso editorial</h2>
            <p className="text-sm text-gray-700 mb-0">
              Este artículo sintetiza el clima normativo y de mercado a <strong>28 de octubre de 2026</strong>. No
              sustituye asesoramiento jurídico individual. Ante cartas, requerimientos o borradores nuevos del casero o
              vendedor, valida con un gestor antes de firmar.
            </p>
          </div>

          <h2>Mapa rápido: tres frentes que nos preguntáis cada día</h2>
          <ul>
            <li>
              <strong>Alquiler LAU:</strong> eco de los{' '}
              <Link href="/blog/decretos-vivienda-alquiler-septiembre-2026">decretos de septiembre</Link>, prórrogas
              extraordinarias en prensa y necesidad de contratos bien redactados (
              <Link href="/blog/lau-actualizacion-renta-irav-2026">IRAV y renta</Link>).
            </li>
            <li>
              <strong>Temporada y habitaciones:</strong> foco inspectores y tribunales; en Cataluña, Código Civil para
              habitación vs LAU de piso completo (
              <Link href="/blog/regulacion-alquiler-temporada-habitaciones-2026">guía 2026</Link>).
            </li>
            <li>
              <strong>Compraventa entre particulares:</strong> más operaciones sin agencia, más errores en arras (
              <Link href="/blog/errores-comprar-piso-entre-particulares-2026">10 errores típicos</Link>).
            </li>
          </ul>

          <PageHeroImage
            src="/gestoria-expertos-calle.jpg"
            alt="Gestoría inmobiliaria y mercado de vivienda en España"
            className="my-8"
            aspect="wide"
            objectPosition="center"
          />

          <h2>Alquiler: estabilidad contractual más allá del titular</h2>
          <p>
            El debate público se centra en prórrogas y desahucios, pero en consultas reales el dolor está en{' '}
            <strong>contratos desactualizados</strong>: fianzas incorrectas, cláusulas de subida prohibidas, “temporadas”
            de un año que en la práctica son vivienda habitual, o habitaciones sin normas de convivencia. Octubre es buen
            mes para auditar qué documento tienes en la mesilla antes de que el casero proponga una “actualización
            urgente” por el decreto.
          </p>
          <p>
            Si eres propietario, un LAU personalizado fija duración, renta, actualización, mascotas, obras menores y
            resolución por impago conforme a la normativa vigente. Si eres inquilino, revisar el borrador de prórroga evita
            ceder derechos que la LAU ya te reconoce.
          </p>

          <BlogGestorExpedientePanel
            whatsappMessage="Hola Daniel, sigo la actualidad de vivienda y necesito revisar mi contrato de alquiler o compraventa"
            title="¿La actualidad te ha pillado con un borrador en la mano?"
            body="Envíanos el PDF por WhatsApp o contrata revisión online. Te decimos si es LAU, habitación o temporada real — y qué cláusulas negociar antes de firmar."
          />

          <h2>Compraventa: el mercado entre particulares no se pausa</h2>
          <p>
            Los tipos de hipoteca y la Euríbor siguen marcando cuánto puede endeudarse cada comprador. Eso no elimina la
            compraventa directa: la desplaza hacia operaciones mejor documentadas. Vemos más búsquedas de{' '}
            <Link href="/blog/revision-contrato-arras-antes-firmar">revisión de arras</Link> y{' '}
            <Link href="/gestoria/pack-due-diligence-precompra">due diligence</Link> en ciudades donde el precio por m²
            hace que una deuda oculta de comunidad duela especialmente (Madrid, Barcelona, Valencia, Málaga, Baleares).
          </p>
          <p>
            Para vendedores, octubre es temporada de cerrar antes de fin de año fiscal: conviene tener{' '}
            <Link href="/gestoria/arras-penitenciales">arras</Link> coherentes con la realidad registral y certificados
            listos. Para compradores, es el momento de exigir documentación <em>antes</em> de la señal, no después.
          </p>

          <PageHeroImage
            src="/gestor-experto-oficina.jpg"
            alt="Gestor inmobiliario revisando contratos de vivienda"
            className="my-8 max-w-lg mx-auto"
            aspect="standard"
            objectPosition="center top"
          />

          <h2>Geografía: la norma cambia según dónde esté el piso</h2>
          <p>
            España autonómica implica que “actualidad vivienda” no es un solo titular. Ejemplos que tratamos a diario en
            Inmonest:
          </p>
          <ul>
            <li>
              <strong>Cataluña:</strong> fianza INCASÒL, cédula en compraventa, habitación bajo CC (
              <Link href="/gestoria/barcelona">hub Barcelona</Link>).
            </li>
            <li>
              <strong>Comunidad Valenciana:</strong> plusvalía, turismo y LAU en zonas costeras (
              <Link href="/gestoria/valencia">Valencia</Link>).
            </li>
            <li>
              <strong>Madrid:</strong> ITE en edificios antiguos, mercado de particulares muy líquido (
              <Link href="/gestoria/madrid">hub Madrid</Link>).
            </li>
            <li>
              <strong>Canarias y Baleares:</strong> matices turísticos vs arrendamiento habitual (
              <Link href="/blog/gestoria-online-ciudades-espana">gestoría por ciudades</Link>).
            </li>
          </ul>

          <h2>Qué hacer esta semana (checklist accionable)</h2>
          <ol>
            <li>
              <strong>Si alquilas o eres casero:</strong> localiza tu contrato firmado. ¿LAU, habitación o temporada?
              Compara con nuestras guías de actualidad.
            </li>
            <li>
              <strong>Si te envían un anexo “por el decreto”:</strong> no firmes el mismo día; pide revisión (
              {precioLabel('revision-alquiler')} en revisión LAU).
            </li>
            <li>
              <strong>Si compras entre particulares:</strong> pide nota simple y certificado de comunidad antes de
              transferir señal.
            </li>
            <li>
              <strong>Si vendes sin agencia:</strong> prepara certificado energético y arras con cláusulas equilibradas.
            </li>
            <li>
              <strong>Si no sabes por dónde empezar:</strong> habla con tu gestor (abajo) o explora{' '}
              <Link href="/gestoria">catálogo gestoría</Link>.
            </li>
          </ol>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Tu situación</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Primer paso recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Inquilino con contrato que vence en 2027–2028</td>
                  <td className="border border-gray-300 px-3 py-2">
                    Leer decretos + revisar cláusulas de prórroga (
                    <Link href="/blog/decretos-vivienda-alquiler-septiembre-2026" className="text-gold-700 underline">
                      resumen
                    </Link>
                    )
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Propietario con habitaciones en piso compartido</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/alquiler-habitaciones" className="text-gold-700 underline">
                      Contrato habitación
                    </Link>{' '}
                    por inquilino
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">Comprador con borrador de arras del vendedor</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/revision-correccion-arras" className="text-gold-700 underline">
                      Revisión arras
                    </Link>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">Comprador antes de señal alta</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link href="/gestoria/pack-due-diligence-precompra" className="text-gold-700 underline">
                      Due diligence
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <BlogServiciosGrid
            title="Módulos de servicio Inmonest (con imagen y precio cerrado)"
            intro="Cada tarjeta corresponde a un servicio real del catálogo: contratas online, subes documentos al panel y tu gestor entrega PDF o informe."
            items={[
              {
                slug: 'contrato-alquiler',
                descripcion:
                  'LAU 2026 personalizado: fianza, renta, IRAV, zona tensionada, inventario. Ideal si la actualidad te empuja a prorrogar o firmar de nuevo.',
              },
              {
                slug: 'alquiler-habitaciones',
                descripcion:
                  'Piso compartido y coliving con contrato CC, no LAU copiado. Muy demandado tras el foco en habitaciones en prensa.',
              },
              {
                slug: 'alquiler-temporada',
                descripcion:
                  'Solo si la causa de temporalidad es real. Plazo, causa acreditada y sin prórrogas automáticas de larga duración.',
              },
              {
                slug: 'revision-correccion-arras',
                descripcion:
                  'Compraventa entre particulares: revisión independiente del borrador del vendedor antes de entregar señal.',
              },
            ]}
          />

          <h2>Lecturas relacionadas en el blog</h2>
          <ul>
            <li>
              <Link href="/blog/decretos-vivienda-alquiler-septiembre-2026">Decretos vivienda septiembre 2026</Link>
            </li>
            <li>
              <Link href="/blog/regulacion-alquiler-temporada-habitaciones-2026">Temporada y habitaciones 2026</Link>
            </li>
            <li>
              <Link href="/blog/errores-comprar-piso-entre-particulares-2026">
                10 errores al comprar entre particulares
              </Link>
            </li>
            <li>
              <Link href="/blog/contrato-alquiler-vivienda-guia">Guía contrato alquiler vivienda</Link>
            </li>
          </ul>

          <h2>Preguntas frecuentes</h2>
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}

          <div className="not-prose mt-12 p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-bold mb-2 text-white">¿Quieres que un gestor lea tu caso?</h2>
            <p className="text-white/80 text-sm mb-4">
              LAU desde {precioLabel('contrato-alquiler')} · Revisión arras {precioLabel('revision-correccion-arras')} ·
              Panel de cliente tras contratar
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm"
              >
                Contratar LAU
              </Link>
              <Link
                href="/gestoria"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm"
              >
                Ver toda la gestoría
              </Link>
            </div>
          </div>
        </article>

        <GestorContactBanner
          title="Habla con tu gestoría — actualidad al día"
          subtitle="Te ayudamos a interpretar noticias y a revisar el contrato que tienes delante. Sin comisión sobre el precio del piso ni la renta."
          whatsappMessage="Hola Daniel, leo la actualidad de vivienda octubre 2026 y tengo dudas sobre mi contrato"
          imagePosition="left"
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
