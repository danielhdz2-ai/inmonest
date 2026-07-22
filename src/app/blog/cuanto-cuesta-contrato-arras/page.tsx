import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeroImage from '@/components/PageHeroImage'

const BASE_URL = 'https://inmonest.com'
const FECHA = '2026-05-27'

export const metadata: Metadata = {
  title: 'Cuánto cuesta un contrato de arras 2026',
  description:
    'Descubre cuánto cobran las gestorías por hacer un contrato de arras en España: desde 145€ online hasta 600€ presencial. Comparativa completa de precios, qué incluye cada servicio y cuándo necesitas un abogado.',
  keywords: 'cuánto cuesta contrato arras, precio contrato arras, coste gestoría arras, cuánto cobran por arras, contrato arras precio, gestoría inmobiliaria precio',
  alternates: { canonical: '/blog/cuanto-cuesta-contrato-arras' },
  openGraph: {
    title: 'Cuánto cuesta un contrato de arras en 2026 — Precios reales',
    description: 'Desde 145€ online hasta 600€ presencial. Te contamos qué incluye cada opción y cómo elegir la mejor para tu compra.',
    url: `${BASE_URL}/blog/cuanto-cuesta-contrato-arras`,
    locale: 'es_ES',
    type: 'article',
    siteName: 'Inmonest',
    publishedTime: FECHA,
  },
}

export default function CuantoCuestaArrasPage() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cuánto cuesta un contrato de arras en 2026 — Precios reales de gestorías',
    description: 'Guía completa sobre precios de contratos de arras: desde 145€ en gestorías online hasta 600€ en despachos presenciales. Qué incluye cada servicio.',
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { 
      '@type': 'Organization', 
      name: 'Inmonest', 
      url: BASE_URL, 
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` } 
    },
    datePublished: FECHA,
    dateModified: FECHA,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/cuanto-cuesta-contrato-arras` },
    image: `${BASE_URL}/gestoria1.jpg`,
    wordCount: 2547,
  })

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Cuánto cuesta un contrato de arras', item: `${BASE_URL}/blog/cuanto-cuesta-contrato-arras` },
    ],
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta hacer un contrato de arras en una gestoría?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El precio varía entre 145€ y 600€ dependiendo del tipo de servicio. Gestorías online como Inmonest cobran desde 145€ con entrega en 48h. Despachos presenciales tradicionales cobran entre 300€ y 600€. La diferencia está en el modelo de negocio: las gestorías digitales tienen menos gastos de estructura.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué incluye un contrato de arras de 145€?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un contrato de arras profesional de 145€ incluye: redacción personalizada adaptada a las partes, revisión de datos registrales y nota simple, cláusulas de desistimiento y penalización según el tipo de arras (penitenciales o confirmatorias), entrega en PDF firmable digitalmente en 48-72h, y una ronda de revisiones gratuita si necesitas ajustes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo usar una plantilla gratuita en vez de contratar una gestoría?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes, pero es arriesgado en una operación de 200.000€-400.000€. Las plantillas gratuitas suelen ser genéricas, no se adaptan a tu situación específica, no incluyen revisión de nota simple registral, y pueden tener cláusulas mal redactadas que causen problemas legales después. El coste de un error (perder 20.000€ de señal, por ejemplo) es 100 veces superior al coste de un contrato profesional.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuándo necesito un abogado en vez de una gestoría?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Necesitas un abogado si: el vendedor no es el único propietario, hay deudas o cargas sobre la vivienda que no están claras, la compraventa es entre familiares con herencias de por medio, el inmueble tiene embargo, precinto o litigio judicial, o el vendedor pide condiciones especiales fuera de lo habitual. En casos complejos, un abogado especializado cobra entre 600€ y 1.200€.',
        },
      },
      {
        '@type': 'Question',
        name: '¿La señal de las arras es diferente del precio del contrato?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, son conceptos diferentes. La señal (normalmente 5-10% del precio de venta) es el dinero que entregas al vendedor. El precio del contrato (145€-600€) es lo que cobra la gestoría o abogado por redactar el documento. Ejemplo: compras un piso de 300.000€, das 15.000€ de señal al vendedor, y pagas 145€ a Inmonest por redactar el contrato de arras.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Merece la pena pagar por un contrato de arras si ya tengo la hipoteca aprobada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, es fundamental incluso con hipoteca aprobada. Un contrato de arras bien hecho protege tu señal (normalmente 15.000€-30.000€), regula qué pasa si aparecen problemas de última hora, establece plazos claros para firma de escritura, y define quién paga qué gastos (IBI, comunidad, suministros). Un error en el contrato puede costarte toda la señal o bloquearte la compra.',
        },
      },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <nav aria-label="Navegación" className="text-sm text-gray-500 mb-8">
          <ol className="flex flex-wrap gap-1">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
            <li aria-hidden="true" className="mx-1">/</li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li aria-hidden="true" className="mx-1">/</li>
            <li aria-current="page" className="text-gray-700">Cuánto cuesta contrato arras</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Precios</span>
            <span className="text-xs text-gray-400">9 min de lectura · 27 de mayo de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Cuánto cuesta un contrato de arras en 2026 — Precios reales de gestorías
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Estás a punto de dar una señal de 15.000€-30.000€ para reservar tu piso. Necesitas un contrato de arras que proteja ese dinero. ¿Cuánto te va a costar que lo redacte un profesional? Te lo contamos todo.
          </p>
        </header>
        <PageHeroImage
          src="/familia10.jpg"
          alt="Cuánto cuesta un contrato de arras en 2026 — Precios reales de gestorías"
          className="mb-12"
        />

        <article className="prose prose-gray max-w-none">
          {/* Resumen ejecutivo */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-8 rounded-r">
            <h3 className="text-base font-bold text-gray-900 mt-0 mb-3">💡 Resumen rápido</h3>
            <ul className="text-sm space-y-2 mb-0">
              <li><strong>Gestoría online:</strong> 145€-180€ (entrega 48-72h por email)</li>
              <li><strong>Despacho tradicional:</strong> 300€-600€ (cita presencial, más lento)</li>
              <li><strong>Abogado especializado:</strong> 600€-1.200€ (solo si hay problemas complejos)</li>
              <li><strong>Plantilla gratuita:</strong> 0€ (pero riesgo alto de errores que cuestan miles)</li>
            </ul>
          </div>

          <h2>¿Qué es exactamente un contrato de arras?</h2>
          <p>
            Un contrato de arras es el documento legal que firman comprador y vendedor cuando se decide cerrar la compraventa de una vivienda pero aún no se puede ir a la notaría (porque falta la hipoteca, el vendedor necesita tiempo para buscar otra casa, etc.).
          </p>
          <p>
            En ese contrato, el comprador entrega una <strong>señal</strong> (normalmente el 5-10% del precio de venta) al vendedor, y ambas partes se comprometen a firmar la escritura definitiva en una fecha determinada.
          </p>
          <p>
            El contrato regula <strong>qué pasa si una de las partes no cumple</strong>: en las <Link href="/blog/contrato-arras-diferencias" className="text-blue-600 hover:underline">arras penitenciales</Link>, el comprador pierde la señal si se echa atrás, y el vendedor debe devolver el doble si incumple él. Es la protección jurídica de tu dinero.
          </p>

          <h2>Tabla comparativa de precios de contratos de arras (2026)</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Tipo de servicio</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tiempo entrega</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Qué incluye</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Gestoría online</strong><br />(ej. Inmonest)</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-green-700">145€-180€</td>
                  <td className="border border-gray-300 px-4 py-2">48-72h</td>
                  <td className="border border-gray-300 px-4 py-2">Redacción personalizada, revisión nota simple, PDF firmable, 1 ronda revisiones</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><strong>Despacho tradicional</strong></td>
                  <td className="border border-gray-300 px-4 py-2">300€-450€</td>
                  <td className="border border-gray-300 px-4 py-2">5-7 días</td>
                  <td className="border border-gray-300 px-4 py-2">Redacción + cita presencial, impresión en papel</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Abogado especializado</strong></td>
                  <td className="border border-gray-300 px-4 py-2">600€-1.200€</td>
                  <td className="border border-gray-300 px-4 py-2">7-15 días</td>
                  <td className="border border-gray-300 px-4 py-2">Redacción + análisis jurídico completo + negociación con vendedor</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><strong>Plantilla Word/PDF gratis</strong></td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-red-700">0€</td>
                  <td className="border border-gray-300 px-4 py-2">Inmediato</td>
                  <td className="border border-gray-300 px-4 py-2">Solo texto genérico sin personalizar. ❌ Riesgo alto de errores</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>¿Por qué las gestorías online son más baratas?</h2>
          <p>
            Una gestoría digital como <Link href="/gestoria" className="text-blue-600 hover:underline">Inmonest</Link> cobra 145€ por un contrato de arras, mientras que un despacho tradicional cobra 400€-500€. ¿Es peor el servicio online?
          </p>
          <p>
            <strong>No. Es exactamente el mismo contrato,</strong> redactado por profesionales con la misma formación jurídica. La diferencia está en el modelo de negocio:
          </p>
          <ul>
            <li><strong>Sin oficina física:</strong> una gestoría online no paga alquiler de local en calle céntrica (1.500€-3.000€/mes en Madrid o Barcelona).</li>
            <li><strong>Sin secretaria ni recepcionista:</strong> todo se gestiona por email y formularios digitales.</li>
            <li><strong>Sin citas presenciales:</strong> el cliente no se desplaza, el gestor no pierde 1 hora de agenda por cada reunión.</li>
            <li><strong>Volumen:</strong> al ser más baratas, las gestorías online tramitan más contratos (economía de escala).</li>
          </ul>
          <p>
            El resultado: <strong>mismo contrato, 60% más barato.</strong> Y entrega más rápida, porque no hay colas de citas presenciales.
          </p>

          <h2>¿Qué incluye un contrato de arras de 145€?</h2>
          <p>
            Cuando contratas un <Link href="/gestoria/solicitar/arras-penitenciales" className="text-blue-600 hover:underline">contrato de arras con Inmonest por 145€</Link>, esto es lo que recibes:
          </p>
          <ol>
            <li>
              <strong>Redacción 100% personalizada:</strong> no es una plantilla con huecos rellenos. Se redacta según tus datos (nombres completos, DNI, direcciones, precio de venta, señal entregada, fecha de firma de escritura, etc.).
            </li>
            <li>
              <strong>Revisión de nota simple registral:</strong> antes de redactar, se verifica que el vendedor es realmente el propietario, que no hay cargas ocultas (hipotecas, embargos) y que los metros cuadrados coinciden.
            </li>
            <li>
              <strong>Cláusulas de desistimiento personalizadas:</strong> según si quieres arras penitenciales (puedes echarte atrás perdiendo la señal) o confirmatorias (compromiso total). Se especifica qué pasa en cada escenario.
            </li>
            <li>
              <strong>Entrega en 48-72h por email:</strong> PDF firmable digitalmente, listo para imprimir y firmar en presencia de ambas partes.
            </li>
            <li>
              <strong>Una ronda de revisiones gratis:</strong> si lees el contrato y quieres modificar alguna cláusula, el gestor lo ajusta sin coste adicional (dentro de los 7 días posteriores a la entrega).
            </li>
          </ol>

          <h2>¿Cuándo necesitas un abogado en vez de una gestoría?</h2>
          <p>
            Un contrato de arras estándar (comprador particular compra a vendedor particular, vivienda sin cargas ni problemas) lo puede redactar perfectamente una gestoría por 145€-180€.
          </p>
          <p>
            <strong>Necesitas un abogado especializado (600€-1.200€) si:</strong>
          </p>
          <ul>
            <li>El vendedor no es el único propietario (herencia sin liquidar, divorcio en trámite, cotitularidad conflictiva).</li>
            <li>Hay <strong>deudas o cargas</strong> sobre la vivienda que no están claras (hipotecas anteriores, embargos, derramas de comunidad impagadas).</li>
            <li>La compraventa es <strong>entre familiares</strong> con herencias o donaciones de por medio.</li>
            <li>El inmueble tiene <strong>embargo, precinto administrativo o litigio judicial</strong>.</li>
            <li>El vendedor te pide <strong>condiciones especiales</strong> fuera de lo habitual (por ejemplo, quedarse viviendo 6 meses después de firmar la escritura).</li>
            <li>Compras un <strong>local comercial</strong> o inmueble singular (nave industrial, terreno rústico) que requiere análisis urbanístico.</li>
          </ul>
          <p>
            En esos casos, un abogado no solo redacta el contrato, sino que investiga a fondo el Registro de la Propiedad, negocia directamente con el vendedor y su representante legal, y te asesora sobre si debes seguir adelante o no con la operación.
          </p>

          <h2>¿La señal de las arras cuenta como parte del precio del contrato?</h2>
          <p>
            <strong>No. Son dos conceptos totalmente diferentes:</strong>
          </p>
          <ul>
            <li><strong>La señal (arras):</strong> el dinero que tú entregas al vendedor (por ejemplo, 15.000€ si el piso cuesta 300.000€ y acordáis el 5%). Ese dinero va al vendedor, no a la gestoría.</li>
            <li><strong>El precio del contrato:</strong> lo que cobra la gestoría o abogado por redactar el documento legal (145€-600€). Ese dinero va al profesional que redacta, no al vendedor.</li>
          </ul>
          <p>
            <strong>Ejemplo real:</strong>
          </p>
          <p className="bg-gray-50 border-l-4 border-gray-300 pl-4 py-2">
            Compras un piso de 280.000€. Acordáis dar 14.000€ de señal (5%). Contratas a Inmonest para que redacte el contrato de arras por 145€.
            <br /><br />
            <strong>Total que pagas tú ese día:</strong> 14.000€ al vendedor + 145€ a Inmonest = 14.145€.
            <br /><br />
            Cuando firmes la escritura en la notaría (dentro de 2-3 meses), pagarás los 266.000€ restantes (280.000€ - 14.000€ ya entregados).
          </p>

          <h2>¿Merece la pena contratar revisión del contrato si lo hace el vendedor?</h2>
          <p>
            Imagina esta situación: el vendedor te dice "ya tengo el contrato de arras hecho por mi abogado, solo tienes que firmarlo". ¿Lo firmas directamente?
          </p>
          <p>
            <strong>Rotundamente NO.</strong> Ese contrato lo ha redactado el abogado del vendedor, que trabaja para proteger los intereses del vendedor, no los tuyos.
          </p>
          <p>
            Casos reales que hemos visto en <Link href="/gestoria/revision-contrato-arras" className="text-blue-600 hover:underline">revisiones de contratos de arras</Link> (servicio de 60€):
          </p>
          <ul>
            <li>Cláusula que obliga al comprador a pagar 20.000€ si no consigue la hipoteca (ilegal, pero ahí estaba).</li>
            <li>Fecha de firma de escritura "a determinar por el vendedor", sin plazo máximo (el vendedor puede retrasarlo indefinidamente).</li>
            <li>Los gastos de comunidad y suministros del año en curso los paga el comprador, cuando por ley corresponden al vendedor hasta la fecha de escritura.</li>
            <li>El IBI del año completo lo paga el comprador, aunque firme en noviembre (debería prorratearse).</li>
            <li>Metros cuadrados que no coinciden con el Registro: contrato dice 85m², la nota simple dice 68m² (diferencia de 17m²).</li>
          </ul>
          <p>
            <strong>Por 60€, un gestor especializado revisa el contrato en 24h</strong> y te dice exactamente qué cláusulas son abusivas, cuáles debes negociar y cuáles son un riesgo legal directo.
          </p>
          <p>
            Es la mejor inversión que puedes hacer antes de firmar. Si detecta 1 sola cláusula que te ahorr a 5.000€ de problemas futuros, ya has recuperado 83 veces el coste del servicio.
          </p>

          <h2>¿Puedo usar una plantilla gratuita de internet?</h2>
          <p>
            Técnicamente sí, legalmente es válido. Pero es como hacerte una operación de apendicitis mirando un vídeo de YouTube: <strong>puede salir bien, pero el riesgo es enorme.</strong>
          </p>
          <p>
            Los problemas de las plantillas gratuitas:
          </p>
          <ol>
            <li><strong>Son genéricas:</strong> no se adaptan a tu caso concreto (compra con obra pendiente, vendedor fallecido, herencia sin liquidar, etc.).</li>
            <li><strong>No incluyen revisión de nota simple:</strong> firmas sin saber si el vendedor es realmente el propietario, si hay cargas ocultas o si los metros cuadrados son los correctos.</li>
            <li><strong>Cláusulas mal redactadas:</strong> muchas plantillas tienen errores jurídicos o cláusulas nulas que un juez anularía si hubiera conflicto.</li>
            <li><strong>No están actualizadas:</strong> la Ley de Vivienda 2026 introdujo cambios importantes. Plantillas de 2023 pueden tener cláusulas ilegales hoy.</li>
            <li><strong>Sin soporte post-firma:</strong> si surge un problema, no tienes a quién preguntar.</li>
          </ol>
          <p>
            Piénsalo así: vas a dar una señal de 15.000€-30.000€ en una operación de 200.000€-400.000€. <strong>¿De verdad quieres ahorrarte 145€</strong> en el documento que protege ese dinero?
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-3">💼 ¿Necesitas un contrato de arras profesional?</h3>
            <p className="text-sm text-gray-700 mb-4">
              En <strong>Inmonest</strong> redactamos contratos de arras penitenciales y confirmatorias adaptados a tu caso específico. Entrega en 48-72h por email, PDF firmable, revisión de nota simple incluida.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/gestoria/solicitar/arras-penitenciales"
                className="inline-block bg-[#c9962a] hover:bg-[#b8872a] text-white font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Contratar contrato de arras (145€)
              </Link>
              <Link 
                href="/gestoria/revision-contrato-arras"
                className="inline-block bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-lg border-2 border-gray-300 transition"
              >
                Solo revisión (60€)
              </Link>
            </div>
          </div>

          <h2>¿Qué pasa si no hago contrato de arras y solo doy la señal?</h2>
          <p>
            Legalmente, dar dinero sin contrato escrito se considera un <strong>"acuerdo verbal"</strong>, que sí tiene validez en España. Pero es casi imposible de demostrar ante un juez si surge un conflicto.
          </p>
          <p>
            <strong>Escenario real sin contrato escrito:</strong>
          </p>
          <p className="bg-red-50 border-l-4 border-red-300 pl-4 py-2">
            Das 10.000€ en efectivo al vendedor como señal. Él te dice "tranquilo, en 2 meses firmamos en la notaría". Pasan 3 meses, le escribes por WhatsApp, no contesta. Vas a su casa, te dice "he cambiado de opinión, no vendo". Intentas recuperar tu dinero... pero no tienes ningún papel firmado que demuestre que diste esa cantidad ni en qué condiciones.
          </p>
          <p>
            Sin contrato de arras, <strong>no puedes demostrar</strong>:
          </p>
          <ul>
            <li>Cuánto dinero entregaste (¿10.000€? ¿5.000€? ¿Nada?)</li>
            <li>Qué se acordó (¿era señal para comprar? ¿préstamo? ¿regalo?)</li>
            <li>Cuándo debía firmarse la escritura</li>
            <li>Qué pasa si el vendedor incumple</li>
          </ul>
          <p>
            Resultado: pleito judicial de 2-3 años, abogado que cobra 3.000€-5.000€, y <strong>probablemente pierdas el caso</strong> por falta de pruebas documentales.
          </p>
          <p>
            <strong>Por 145€ evitas todo esto.</strong> El contrato de arras es la prueba documental firmada por ambas partes que un juez reconoce de inmediato.
          </p>

          <h2>Preguntas frecuentes (FAQ)</h2>
          
          <h3>¿Cuánto cuesta hacer un contrato de arras en una gestoría?</h3>
          <p>
            El precio varía entre <strong>145€ y 600€</strong> dependiendo del tipo de servicio. Gestorías online como Inmonest cobran desde 145€ con entrega en 48h. Despachos presenciales tradicionales cobran entre 300€ y 600€. La diferencia está en el modelo de negocio: las gestorías digitales tienen menos gastos de estructura (sin oficina física, sin citas presenciales).
          </p>

          <h3>¿Qué incluye un contrato de arras de 145€?</h3>
          <p>
            Un contrato de arras profesional de 145€ incluye:
          </p>
          <ul>
            <li>Redacción personalizada adaptada a las partes (no es plantilla)</li>
            <li>Revisión de datos registrales y nota simple del inmueble</li>
            <li>Cláusulas de desistimiento y penalización según el tipo de arras</li>
            <li>Entrega en PDF firmable digitalmente en 48-72h</li>
            <li>Una ronda de revisiones gratuita si necesitas ajustes</li>
          </ul>

          <h3>¿Puedo usar una plantilla gratuita en vez de contratar una gestoría?</h3>
          <p>
            Puedes, pero es arriesgado en una operación de 200.000€-400.000€. Las plantillas gratuitas:
          </p>
          <ul>
            <li>Son genéricas, no se adaptan a tu situación específica</li>
            <li>No incluyen revisión de nota simple registral</li>
            <li>Pueden tener cláusulas mal redactadas o ilegales</li>
            <li>No están actualizadas a la legislación vigente (Ley de Vivienda 2026)</li>
          </ul>
          <p>
            El coste de un error (perder 20.000€ de señal, por ejemplo) es 100 veces superior al coste de un contrato profesional.
          </p>

          <h3>¿Cuándo necesito un abogado en vez de una gestoría?</h3>
          <p>
            Necesitas un abogado (600€-1.200€) si:
          </p>
          <ul>
            <li>El vendedor no es el único propietario (herencia, divorcio, cotitularidad)</li>
            <li>Hay deudas o cargas sobre la vivienda que no están claras</li>
            <li>La compraventa es entre familiares con herencias de por medio</li>
            <li>El inmueble tiene embargo, precinto o litigio judicial</li>
            <li>El vendedor pide condiciones especiales fuera de lo habitual</li>
          </ul>
          <p>
            Para una compraventa estándar sin complicaciones, una gestoría por 145€ es suficiente.
          </p>

          <h3>¿La señal de las arras es diferente del precio del contrato?</h3>
          <p>
            Sí, son conceptos diferentes:
          </p>
          <ul>
            <li><strong>La señal</strong> (normalmente 5-10% del precio de venta) es el dinero que entregas al vendedor</li>
            <li><strong>El precio del contrato</strong> (145€-600€) es lo que cobra la gestoría o abogado por redactar el documento</li>
          </ul>
          <p>
            <strong>Ejemplo:</strong> Compras un piso de 300.000€, das 15.000€ de señal al vendedor, y pagas 145€ a Inmonest por redactar el contrato de arras. Total: 15.145€ ese día.
          </p>

          <h3>¿Merece la pena pagar por un contrato de arras si ya tengo la hipoteca aprobada?</h3>
          <p>
            <strong>Sí, es fundamental incluso con hipoteca aprobada.</strong> Un contrato de arras bien hecho:
          </p>
          <ul>
            <li>Protege tu señal (normalmente 15.000€-30.000€) si el vendedor incumple</li>
            <li>Regula qué pasa si aparecen problemas de última hora (cargas ocultas, metros incorrectos)</li>
            <li>Establece plazos claros para la firma de escritura</li>
            <li>Define quién paga qué gastos (IBI, comunidad, suministros)</li>
          </ul>
          <p>
            Un error en el contrato puede costarte toda la señal o bloquearte la compra. 145€ es un seguro muy barato para proteger 15.000€-30.000€.
          </p>

          <h2>Conclusión: ¿cuánto deberías pagar por tu contrato de arras?</h2>
          <p>
            <strong>Si es una compraventa estándar sin complicaciones:</strong> 145€-180€ en una gestoría online como Inmonest es el precio justo. Recibes un contrato profesional personalizado, revisión de nota simple, entrega rápida y soporte post-entrega.
          </p>
          <p>
            <strong>Si prefieres tratar presencialmente:</strong> 300€-450€ en un despacho tradicional. Mismo contrato, pero pagas la oficina física y las citas.
          </p>
          <p>
            <strong>Si tu caso es complejo (herencias, embargos, litigios):</strong> 600€-1.200€ en un abogado especializado que investigue a fondo y negocie por ti.
          </p>
          <p>
            <strong>Si usas plantilla gratuita:</strong> 0€ hoy, pero riesgo de perder 10.000€-30.000€ mañana si hay un error o conflicto.
          </p>
          <p className="text-lg font-semibold text-gray-900">
            En una operación de 200.000€-400.000€, gastarte 145€ en proteger jurídicamente tu señal de 15.000€-30.000€ no es un gasto, es sentido común.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-3">📋 ¿Listo para proteger tu señal?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Solicita tu <strong>contrato de arras personalizado</strong> en Inmonest. Lo redactamos en 48-72h y te lo enviamos por email listo para firmar. Revisión de nota simple incluida.
            </p>
            <Link 
              href="/gestoria"
              className="inline-block bg-[#c9962a] hover:bg-[#b8872a] text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Ver servicios de gestoría →
            </Link>
          </div>

        </article>

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Artículos relacionados:</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog/contrato-arras-diferencias" className="text-blue-600 hover:underline">
                → Diferencias entre arras penitenciales y confirmatorias
              </Link>
            </li>
            <li>
              <Link href="/blog/detectar-contrato-arras-fraudulento" className="text-blue-600 hover:underline">
                → Cómo detectar un contrato de arras fraudulento
              </Link>
            </li>
            <li>
              <Link href="/gestoria/revision-contrato-arras" className="text-blue-600 hover:underline">
                → Revisión de contrato de arras (60€)
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  )
}
