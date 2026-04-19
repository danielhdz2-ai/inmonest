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

// Datos de mercado orientativos por ciudad
const MERCADO: Record<string, { precio_m2: string; tiempo_venta: string; tendencia: string }> = {
  madrid:    { precio_m2: '4.200 €/m²', tiempo_venta: '45 días', tendencia: 'subiendo +8 % anual' },
  barcelona: { precio_m2: '4.500 €/m²', tiempo_venta: '50 días', tendencia: 'subiendo +10 % anual' },
  valencia:  { precio_m2: '2.400 €/m²', tiempo_venta: '55 días', tendencia: 'subiendo +12 % anual' },
  sevilla:   { precio_m2: '2.100 €/m²', tiempo_venta: '65 días', tendencia: 'estable +4 % anual' },
  malaga:    { precio_m2: '3.100 €/m²', tiempo_venta: '40 días', tendencia: 'subiendo +15 % anual' },
  bilbao:    { precio_m2: '3.300 €/m²', tiempo_venta: '60 días', tendencia: 'subiendo +6 % anual' },
  zaragoza:  { precio_m2: '1.900 €/m²', tiempo_venta: '70 días', tendencia: 'estable +3 % anual' },
  alicante:  { precio_m2: '2.200 €/m²', tiempo_venta: '50 días', tendencia: 'subiendo +9 % anual' },
}

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) return {}
  return {
    title: `Vender piso sin comisión en ${nombre} | Guía Completa — Inmonest`,
    description: `¿Quieres vender tu piso en ${nombre} sin pagar comisiones a agencias? Aprende cómo hacerlo paso a paso: documentación, precio, anuncio y firma. Gratis en Inmonest.`,
    keywords: `vender piso sin comision ${nombre.toLowerCase()}, vender casa sin agencia ${nombre.toLowerCase()}, como vender piso particular ${nombre.toLowerCase()}, vender inmueble ${nombre.toLowerCase()}`,
    alternates: { canonical: `/${ciudad}/vender-piso` },
    openGraph: {
      title: `Vender piso sin comisión en ${nombre} — Inmonest`,
      description: `Guía paso a paso para vender tu piso en ${nombre} sin agencia y sin pagar comisiones.`,
      url: `${BASE_URL}/${ciudad}/vender-piso`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function VenderPisoPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const nombre = CIUDADES[ciudad]
  if (!nombre) notFound()

  const mercado = MERCADO[ciudad]

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Vender piso sin comisión en ${nombre}: Guía Completa`,
    description: `Cómo vender tu piso en ${nombre} directamente, sin agencia y sin pagar comisiones.`,
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/${ciudad}/vender-piso` },
  })

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Vender Casa', item: `${BASE_URL}/vender-casa` },
      { '@type': 'ListItem', position: 3, name: `Vender piso sin comisión en ${nombre}`, item: `${BASE_URL}/${ciudad}/vender-piso` },
    ],
  })

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `¿Cuánto cobra una agencia por vender un piso en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Las agencias inmobiliarias en ${nombre} cobran habitualmente entre el 3 % y el 6 % del precio de venta. En un piso de 300.000 €, eso supone entre 9.000 € y 18.000 € que te ahorras vendiendo directamente.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué documentos necesito para vender mi piso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Título de propiedad (escritura), nota simple del Registro de la Propiedad, certificado de deuda pendiente (si hay hipoteca), certificado energético, último recibo del IBI, certificado de la comunidad de propietarios sin deudas y cédula de habitabilidad (en algunas comunidades).',
        },
      },
      {
        '@type': 'Question',
        name: `¿Cuánto tiempo tarda en venderse un piso en ${nombre}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `El tiempo medio para vender un piso en ${nombre} es de unos ${mercado?.tiempo_venta ?? '60 días'}, según datos de mercado actuales. Influye mucho el precio respecto al mercado y la calidad del anuncio.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Tengo que pagar impuestos al vender mi piso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El vendedor paga la Plusvalía Municipal (IIVTNU) al ayuntamiento y declara la ganancia patrimonial en la renta del año siguiente. Si vendes tu vivienda habitual y tienes más de 65 años, o reinviertes en otra vivienda habitual, puedes estar exento del IRPF.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo vender sin certificado energético?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El certificado de eficiencia energética es obligatorio para vender o alquilar cualquier inmueble en España desde 2013. Sin él, el notario no puede autorizar la escritura y te expones a sanciones.',
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
          <Link href="/vender-casa" className="hover:text-[#c9962a] transition-colors">Vender casa</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Sin comisión en {nombre}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
          Vender piso sin comisión en {nombre}:<br />
          <span className="text-[#c9962a]">Quédate con el 100 % de tu venta</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Las agencias en {nombre} cobran entre un 3 % y un 6 % del precio de venta.
          En un piso de 300.000 €, eso son hasta <strong>18.000 €</strong> que puedes ahorrar
          vendiéndolo tú mismo. Te explicamos cómo hacerlo paso a paso.
        </p>

        {/* Datos de mercado */}
        {mercado && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">Precio medio</p>
              <p className="text-lg font-black text-gray-900">{mercado.precio_m2}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">Tiempo medio venta</p>
              <p className="text-lg font-black text-gray-900">{mercado.tiempo_venta}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">Tendencia</p>
              <p className="text-sm font-bold text-[#c9962a]">{mercado.tendencia}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Publica tu anuncio gratis en {nombre}</h2>
          <p className="text-gray-600 text-sm mb-5">
            Miles de compradores buscan pisos en {nombre} directamente en Inmonest. Publica en minutos, sin comisiones.
          </p>
          <Link
            href="/publicar-anuncio"
            className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841f] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-md"
          >
            Publicar anuncio gratis →
          </Link>
        </div>

        <article className="prose prose-gray max-w-none">

          <h2>¿Cuánto cobra una agencia por vender en {nombre}?</h2>
          <p>
            Las agencias inmobiliarias en {nombre} cobran habitualmente entre el <strong>3 % y el 6 %</strong>
            del precio de venta final, más IVA. En algunos casos aplican una tarifa mínima independientemente
            del precio. Este coste lo asume el vendedor en la mayoría de las operaciones.
          </p>
          <p>
            Con el precio medio de {mercado?.precio_m2 ?? 'mercado'} en {nombre}, una vivienda típica
            puede costar entre 9.000 € y 25.000 € solo en comisiones de agencia. Vendiendo directamente,
            ese dinero se queda en tu bolsillo.
          </p>

          <h2>Paso a paso: cómo vender tu piso en {nombre} sin agencia</h2>

          <h3>1. Fija el precio correcto</h3>
          <p>
            El mayor error al vender sin agencia es fijar un precio incorrecto. Para valorar tu piso
            en {nombre} consulta:
          </p>
          <ul>
            <li>Portales como Inmonest, Idealista o Fotocasa — filtra por tu barrio exacto y compara pisos similares</li>
            <li>El valor catastral como referencia de mínimos</li>
            <li>Una tasación oficial (entre 200 € y 400 €) si necesitas precisión máxima</li>
          </ul>
          <p>
            Un precio ajustado al mercado acorta el tiempo de venta a la mitad. Con el precio medio en
            {nombre} de {mercado?.precio_m2 ?? 'mercado'}, un piso sobrevalorado en un 10 % puede
            tardar meses más en venderse.
          </p>

          <h3>2. Prepara la documentación obligatoria</h3>
          <ul>
            <li><strong>Escritura de propiedad</strong> (o nota simple actualizada del Registro)</li>
            <li><strong>Certificado energético</strong> — obligatorio, lo emite un técnico habilitado</li>
            <li><strong>Último recibo del IBI</strong></li>
            <li><strong>Certificado de deuda de la comunidad</strong> — emitido por el administrador</li>
            <li><strong>Certificado de saldo pendiente de hipoteca</strong> (si existe)</li>
            <li><strong>Cédula de habitabilidad</strong> (obligatoria en Cataluña, Valencia y otras CCAA)</li>
          </ul>

          <h3>3. Haz fotos profesionales y publica el anuncio</h3>
          <p>
            El anuncio es tu escaparate. Invierte en fotos de calidad: la diferencia entre fotos
            amateur y profesionales puede acelerar la venta hasta un 40 %. Incluye:
          </p>
          <ul>
            <li>Al menos 15 fotos de cada habitación con buena luz natural</li>
            <li>Plano de la vivienda si lo tienes</li>
            <li>Descripción detallada: m², habitaciones, planta, ascensor, garaje, trastero</li>
            <li>Barrio y accesos de transporte público en {nombre}</li>
          </ul>

          <h3>4. Gestiona las visitas</h3>
          <p>
            Organiza visitas en horarios de buena luz y ten la documentación preparada. Los compradores
            serios en {nombre} suelen pedir la nota simple y el certificado energético en la primera
            o segunda visita. Tenerlos listos genera confianza.
          </p>

          <h3>5. Firma el contrato de arras</h3>
          <p>
            Una vez acordado el precio, el comprador entregará una señal y firmaréis un contrato de
            arras. Este documento reserva la vivienda y compromete a ambas partes. Te recomendamos
            que un abogado lo revise antes de firmar.
          </p>

          <h3>6. Firma la escritura ante notario</h3>
          <p>
            La compraventa se formaliza ante notario. El comprador elige y paga el notario. El vendedor
            solo necesita llevar su DNI, el título de propiedad y los certificados de estar al corriente
            de IBI y comunidad.
          </p>

          <h2>Impuestos que paga el vendedor en {nombre}</h2>
          <ul>
            <li>
              <strong>Plusvalía Municipal (IIVTNU):</strong> tributo local calculado sobre el incremento
              del valor del suelo. Lo gestiona el Ayuntamiento de {nombre}. Puedes calcularlo en la web
              municipal.
            </li>
            <li>
              <strong>IRPF — Ganancia patrimonial:</strong> la diferencia entre el precio de compra y
              el de venta tributa en la declaración del año siguiente (entre 19 % y 28 % según el importe).
            </li>
            <li>
              <strong>Exenciones:</strong> mayores de 65 años en vivienda habitual, o reinversión en
              otra vivienda habitual dentro de 2 años.
            </li>
          </ul>

        </article>

        {/* CTA final */}
        <div className="mt-14 bg-[#0d1a0f] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">¿Listo para vender sin comisiones en {nombre}?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Publica tu anuncio gratis en Inmonest y llega a miles de compradores directos en {nombre}.
            Sin agencias, sin comisiones, sin permanencia.
          </p>
          <Link
            href="/publicar-anuncio"
            className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841f] text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-md"
          >
            Publicar anuncio gratis →
          </Link>
        </div>

        {/* Links internos */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-4">También te puede interesar:</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${ciudad}/contrato-arras`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Contrato de arras en {nombre} →
            </Link>
            <Link href={`/${ciudad}/alquiler-sin-agencia`} className="text-sm bg-gray-100 hover:bg-amber-50 px-4 py-2 rounded-full text-gray-700 hover:text-[#c9962a] transition-colors">
              Alquiler sin agencia en {nombre} →
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
