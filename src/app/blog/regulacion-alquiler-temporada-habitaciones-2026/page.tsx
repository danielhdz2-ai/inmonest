import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'regulacion-alquiler-temporada-habitaciones-2026'
const FECHA = '2026-09-29'
const PRECIO_LAU = precioLabel('contrato-alquiler')
const PRECIO_HABITACION = precioLabel('alquiler-habitaciones')
const PRECIO_TEMPORADA = precioLabel('alquiler-temporada')

const DESCRIPTION =
  'Regulación 2026 de alquiler por temporada y de habitaciones tras los decretos de vivienda: LAU vs Código Civil en Cataluña, multas por abuso y cómo contratar un contrato blindado con Inmonest.'

export const metadata: Metadata = {
  title: 'Temporada y habitaciones 2026 — regulación y contratos',
  description: DESCRIPTION,
  keywords:
    'regulacion alquiler habitacion 2026, alquiler temporada España, contrato habitacion Cataluña Código Civil, LAU vs temporada, decreto vivienda habitaciones, contrato alquiler habitacion online, gestoria inmobiliaria contrato alquiler',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'Alquiler temporada y habitaciones 2026: qué cambia y qué contrato necesitas',
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
    q: '¿El alquiler de habitación en Barcelona entra en la LAU?',
    a: 'En la práctica, el alquiler de una habitación dentro de una vivienda (piso compartido, coliving, propietario residente o varios inquilinos) no se trata como arrendamiento de vivienda habitual íntegra al amparo de la LAU, sino bajo el Código Civil y lo pactado entre las partes. En Cataluña los decretos estatales de septiembre 2026 pueden no regular las habitaciones igual que en el resto de España. Necesitas un contrato de habitación específico, no un LAU de piso completo.',
  },
  {
    q: '¿Cuándo es alquiler por temporada y no vivienda habitual?',
    a: 'Cuando existe una causa real y temporal de la estancia (obra en tu vivienda, traslado laboral acotado, estudios de duración definida, etc.) y el contrato refleja plazo, causa y que no es residencia habitual indefinida. Si la ocupación es tu hogar principal de forma estable, suele ser LAU con duración mínima legal, no “temporada” disfrazada.',
  },
  {
    q: '¿Qué riesgo hay si uso un contrato de temporada para un inquilino de larga duración?',
    a: 'Alto. Los tribunales pueden calificar el arrendamiento como vivienda habitual LAU, aplicando prórrogas, fianza legal y límites de renta. El propietario pierde la “flexibilidad” que creía tener y el inquilino queda mal protegido en aspectos que solo cubre un LAU bien redactado.',
  },
  {
    q: '¿Qué incluye un contrato de habitación “blindado” con gestoría?',
    a: 'Identificación de las partes, habitación y zonas comunes, renta y gastos, fianza y devolución, normas de convivencia, duración y preaviso, obras, mascotas, subarrendamiento prohibido si procede, inventario del mobiliario compartido y vías de resolución por impago. Inmonest lo redacta personalizado (desde 120€ IVA incluido) con gestor asignado y entrega en un plazo orientativo de 48 horas.',
  },
  {
    q: '¿Puedo contratar online el contrato LAU y el de habitación a la vez?',
    a: 'Sí, son servicios distintos: vivienda completa (LAU, desde 145€) y habitación (Código Civil, desde 120€). Si alquilas varias habitaciones a inquilinos distintos, conviene un contrato por cada inquilino. Desde el panel de Inmonest contratas, subes datos y un gestor inmobiliario revisa el caso antes de entregarte el PDF firmable.',
  },
] as const

export default function RegulacionTemporadaHabitaciones2026Page() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Regulación alquiler temporada y habitaciones 2026 en España y Cataluña',
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
      { '@type': 'ListItem', position: 3, name: 'Temporada y habitaciones 2026', item: `${BASE_URL}/blog/${SLUG}` },
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
              Temporada y habitaciones
            </li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Alquiler · Actualidad 2026
            </span>
            <span className="text-xs text-gray-400">14 min lectura · 29 de septiembre de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Regulación de alquiler por temporada y de habitaciones en 2026: LAU, Código Civil y qué contrato contratar
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Los decretos de vivienda de septiembre ponen el foco en abusos de <strong>temporada</strong>, pisos
            turísticos y <strong>habitaciones</strong>. En Cataluña el matiz es clave: la habitación en piso compartido
            no es un LAU de vivienda completa. Te explicamos las diferencias y cómo{' '}
            <strong>Inmonest</strong> — gestoría inmobiliaria online — te acompaña con contratos personalizados y
            seguridad jurídica.
          </p>
        </header>

        <PageHeroImage
          src="/gestoria1.jpg"
          alt="Regulación alquiler temporada y habitaciones 2026"
          className="mb-12"
        />

        <article className="prose prose-gray max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-8 rounded-r not-prose">
            <h2 className="text-base font-bold text-gray-900 mt-0 mb-3">Tres tipos de alquiler, tres documentos distintos</h2>
            <ul className="text-sm space-y-2 mb-0 text-gray-700">
              <li>
                <strong>Vivienda habitual (LAU)</strong> — piso o casa entero, larga duración. Contrato LAU desde{' '}
                {PRECIO_LAU}.
              </li>
              <li>
                <strong>Habitación</strong> — piso compartido / coliving. Código Civil + convivencia. Desde{' '}
                {PRECIO_HABITACION}.
              </li>
              <li>
                <strong>Temporada</strong> — estancia temporal con causa. Desde {PRECIO_TEMPORADA}.
              </li>
            </ul>
          </div>

          <h2>Qué dicen los decretos de vivienda sobre temporada y habitaciones</h2>
          <p>
            El paquete aprobado el 29 de septiembre de 2026 (pendiente de convalidación en el Congreso) incluye, según
            la información publicada, un bloque contra el <strong>fraude en alquileres</strong> y el control de usos
            especulativos: <strong>vivienda de temporada mal tipificada</strong>, pisos turísticos y, en el ámbito
            estatal, <strong>alquiler de habitaciones</strong>. El objetivo político es claro: que no se eluda la
            protección del inquilino de vivienda habitual usando etiquetas incorrectas.
          </p>
          <p>
            Varios medios señalan que la regulación estatal de habitaciones{' '}
            <strong>podría no aplicarse en Cataluña</strong>, donde conviven competencias autonómicas y un mercado muy
            intensivo de pisos compartidos en Barcelona y área metropolitana. Eso no significa “lawless zone”: significa
            que el contrato de habitación sigue apoyándose en el <strong>Código Civil</strong> y en un documento bien
            redactado, no en la LAU de vivienda íntegra.
          </p>
          <p>
            Para el contexto completo del decreto (prórrogas LAU, desahucios, etc.), lee{' '}
            <Link href="/blog/decretos-vivienda-alquiler-septiembre-2026" className="text-blue-600 hover:underline">
              decretos de vivienda septiembre 2026
            </Link>
            .
          </p>

          <h2>Tabla comparativa: LAU vs temporada vs habitación</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Concepto</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">LAU vivienda habitual</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Temporada</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Habitación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Norma base</td>
                  <td className="border border-gray-300 px-3 py-2">LAU + Ley 12/2023</td>
                  <td className="border border-gray-300 px-3 py-2">LAU (uso temporal) con causa</td>
                  <td className="border border-gray-300 px-3 py-2">Código Civil</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Duración típica</td>
                  <td className="border border-gray-300 px-3 py-2">5/7 años + prórrogas</td>
                  <td className="border border-gray-300 px-3 py-2">Meses o &lt; 1 año (según causa)</td>
                  <td className="border border-gray-300 px-3 py-2">La pactada (sin mínimo LAU)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Fianza</td>
                  <td className="border border-gray-300 px-3 py-2">1 mes + depósito autonómico</td>
                  <td className="border border-gray-300 px-3 py-2">Según LAU temporal</td>
                  <td className="border border-gray-300 px-3 py-2">La pactada (con límites de abusividad)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">Zona tensionada / IRAV</td>
                  <td className="border border-gray-300 px-3 py-2">Sí, cuando aplica</td>
                  <td className="border border-gray-300 px-3 py-2">Según tipificación real</td>
                  <td className="border border-gray-300 px-3 py-2">No como vivienda LAU íntegra</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 font-medium">Error frecuente</td>
                  <td className="border border-gray-300 px-3 py-2">Plantilla antigua / sin IRAV</td>
                  <td className="border border-gray-300 px-3 py-2">“Temporada” sin causa</td>
                  <td className="border border-gray-300 px-3 py-2">Usar LAU para una habitación</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cataluña y Barcelona: habitación y Código Civil</h2>
          <p>
            En Barcelona, Gràcia, Eixample o Poblenou es habitual alquilar <strong>habitaciones sueltas</strong> a
            estudiantes, jóvenes profesionales o perfiles internacionales. El inquilino no alquila la vivienda entera
            como hogar LAU único, sino una estancia en piso compartido. Ahí entran:
          </p>
          <ul>
            <li>Delimitación de la habitación y del uso de cocina, baño y salón.</li>
            <li>Normas de convivencia (ruidos, visitas, limpieza, consumos).</li>
            <li>Fianza, preaviso y estado de la habitación al entrar y salir.</li>
            <li>Prohibición de subarrendar o ceder la habitación si no se pacta.</li>
          </ul>
          <p>
            La LAU de vivienda completa sigue siendo la herramienta correcta cuando alquilas{' '}
            <strong>el piso entero</strong> (con fianza INCASÒL, duración mínima catalana, zona tensionada si procede).{' '}
            <Link href="/barcelona/contrato-alquiler" className="text-blue-600 hover:underline">
              Contrato LAU Barcelona
            </Link>{' '}
            y landings por barrio como{' '}
            <Link href="/barcelona/contrato-alquiler/gracia" className="text-blue-600 hover:underline">
              Gràcia
            </Link>{' '}
            cubren ese caso.
          </p>

          <h2>Alquiler por temporada: cuándo es legal y cuándo es trampa</h2>
          <p>
            El arrendamiento de <strong>temporada</strong> exige una <strong>causa real</strong> de temporalidad:
            desplazamiento laboral acotado, necesidad de vivienda transitoria mientras vendes tu piso, etc. El contrato
            debe dejar claro plazo, causa, renta y que <strong>no</strong> se trata de residencia habitual indefinida.
          </p>
          <p>
            Con los decretos de 2026, usar “temporada” para inquilinos que viven todo el año en el mismo piso es uno de
            los focos de la Administración. Si eres propietario, te expones a reclasificación como LAU; si eres
            inquilino, pierdes estabilidad y topes de renta que tendrías con un LAU bien hecho.
          </p>

          <h2 id="contratar-lau">Contratar tu contrato de alquiler LAU (vivienda completa)</h2>
          <div className="bg-cream-50 border border-amber-200 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-2">
              Inmonest: gestoría inmobiliaria online para tu LAU blindado
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              <strong>Inmonest</strong> no vende plantillas genéricas. Somos una{' '}
              <strong>gestoría inmobiliaria digital</strong> para particulares: un <strong>gestor asignado</strong> revisa
              tu caso (propietario o inquilino, amueblado, renta, fianza, mascotas, zona tensionada) y redacta un{' '}
              <strong>contrato LAU personalizado</strong> conforme a la Ley de Vivienda 2026, con anexo de inventario y
              PDF firmable digitalmente. Trámite 100 % online, panel de seguimiento y entrega orientativa en{' '}
              <strong>48 horas</strong>.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>✓ Desde {PRECIO_LAU} IVA incluido — sin comisión sobre la renta mensual</li>
              <li>✓ Barcelona, Madrid, Valencia, Sevilla y resto de España</li>
              <li>✓ Cláusulas de actualización de renta, INCASÒL en Cataluña, prórrogas LAU</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="inline-flex bg-gold-500 hover:bg-gold-600 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
              >
                Contratar contrato LAU — {PRECIO_LAU}
              </Link>
              <Link
                href="/gestoria/contrato-alquiler"
                className="inline-flex border border-gold-500 text-gold-800 font-semibold py-2.5 px-5 rounded-lg text-sm hover:bg-white transition-colors"
              >
                Ver servicio LAU
              </Link>
            </div>
          </div>

          <h2 id="contratar-habitacion">Contratar tu contrato de alquiler de habitación</h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-2">
              Contrato de habitación con todas las seguridades jurídicas
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Si alquilas o alquilas <strong>una habitación</strong> en piso compartido, necesitas un contrato al amparo
              del <strong>Código Civil</strong>, no un LAU copiado de internet. En Inmonest redactamos{' '}
              <strong>contratos de habitación personalizados</strong>: convivencia, zonas comunes, fianza, duración,
              resolución por impago y entrega de llaves. Ideal para propietarios con varios inquilinos (un contrato por
              persona) y para inquilinos que quieren saber qué firman antes de pagar la fianza.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Particulares en toda España usan Inmonest para cerrar alquileres sin agencia: mismo gestor de principio a
              fin, WhatsApp directo y documentación revisada por especialistas inmobiliarios — no un call center.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>✓ Desde {PRECIO_HABITACION} IVA incluido · entrega orientativa 48h</li>
              <li>✓ Landings locales:{' '}
                <Link href="/gestoria/contrato-alquiler-habitacion/barcelona" className="text-purple-800 underline">
                  Barcelona
                </Link>
                , Madrid, Valencia y más
              </li>
              <li>✓ Normas de coliving, inventario y devolución de fianza documentada</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria/solicitar/alquiler-habitaciones"
                className="inline-flex bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
              >
                Contratar habitación — {PRECIO_HABITACION}
              </Link>
              <Link
                href="/gestoria/alquiler-habitaciones"
                className="inline-flex border border-purple-600 text-purple-900 font-semibold py-2.5 px-5 rounded-lg text-sm hover:bg-white transition-colors"
              >
                Ver servicio habitación
              </Link>
            </div>
          </div>

          <h2>¿Y si necesitas temporada?</h2>
          <p>
            Si tu caso es genuinamente temporal (vivienda entera por meses, con causa), el producto es el{' '}
            <strong>contrato de alquiler por temporada</strong> desde {PRECIO_TEMPORADA}: plazo, causa, sin prórrogas
            automáticas de larga duración.{' '}
            <Link href="/gestoria/solicitar/alquiler-temporada" className="text-blue-600 hover:underline">
              Contratar temporada online
            </Link>
            .
          </p>

          <h2>Proceso Inmonest en 4 pasos</h2>
          <ol>
            <li>
              <strong>Consulta</strong> con gestor (WhatsApp, llamada o videollamada) para confirmar si tu caso es LAU,
              habitación o temporada.
            </li>
            <li>
              <strong>Contratación</strong> en el panel — precio cerrado, IVA incluido.
            </li>
            <li>
              <strong>Documentación</strong> de propietario, inquilino, inmueble, renta y condiciones.
            </li>
            <li>
              <strong>Entrega</strong> del PDF personalizado, listo para firma digital FIRMACERT (eIDAS).
            </li>
          </ol>

          <h2>Lecturas relacionadas</h2>
          <ul>
            <li>
              <Link href="/blog/alquiler-habitacion-coliving" className="text-blue-600 hover:underline">
                Derechos al alquilar una habitación
              </Link>
            </li>
            <li>
              <Link href="/blog/contrato-alquiler-vivienda-guia" className="text-blue-600 hover:underline">
                Guía contrato alquiler vivienda 2026
              </Link>
            </li>
            <li>
              <Link href="/blog/lau-actualizacion-renta-irav-2026" className="text-blue-600 hover:underline">
                Actualización renta LAU e IRAV
              </Link>
            </li>
            <li>
              <Link href="/gestoria" className="text-blue-600 hover:underline">
                Todos los servicios de gestoría Inmonest
              </Link>
            </li>
          </ul>

          <h2>Preguntas frecuentes</h2>
          <div className="not-prose space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white border border-gray-200 rounded-xl p-5">
                <summary className="font-bold text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-10">
            Información general actualizada a septiembre de 2026. Para tu caso concreto,{' '}
            <Link href="/contacto" className="text-blue-600 hover:underline">
              contacta
            </Link>{' '}
            con Inmonest o contrata el servicio online con gestor asignado.
          </p>
        </article>
      </main>
    </>
  )
}
