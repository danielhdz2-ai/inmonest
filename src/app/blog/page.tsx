import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Blog inmobiliario para propietarios | Guías y consejos — Inmonest',
  description:
    'Guías prácticas para vender o alquilar tu piso sin agencia en España. Documentación, precios, contratos, impuestos y más. Actualizado en 2026.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog de Inmonest — Guías para propietarios',
    description: 'Guías prácticas para vender o alquilar tu piso sin agencia en España.',
    url: `${BASE_URL}/blog`,
    locale: 'es_ES',
    type: 'website',
    siteName: 'Inmonest',
  },
}

// Páginas de recursos y oportunidades — se añaden aquí a medida que se crean
const RECURSOS = [
  {
    href: '/oportunidades-bancarias',
    titulo: 'Pisos de Banco Baratos — Oportunidades de Fondos Bancarios 2026',
    resumen: 'Accede al catálogo verificado de Solvia, Aliseda, Servihabitat y otros fondos. Pisos desde 40.000 €. Gestión legal y documentación incluida.',
    categoria: 'Oportunidades',
    etiqueta: 'Nuevo',
    imagen: '/mercado1.jpg',
  },
]

const ARTICULOS = [
  {
    slug: 'asesoria-juridica-compra-vivienda',
    titulo: 'Asesoría jurídica en la compra de vivienda: ¿por qué necesitas un gestor inmobiliario?',
    resumen:
      'Comprar una vivienda sin asesoramiento puede costarte miles de euros en errores. Descubre qué revisa un gestor especializado y por qué es la mejor inversión que puedes hacer.',
    fecha: '5 de mayo de 2026',
    categoria: 'Gestoría',
    lectura: '7 min',
  },
  {
    slug: 'gestoria-barcelona-valencia-madrid',
    titulo: 'Gestoría inmobiliaria en Barcelona, Valencia y Madrid: diferencias clave por ciudad',
    resumen:
      'ITE en Barcelona, cédula en Valencia, IEE en Madrid... Cada ciudad tiene su normativa. Te explicamos qué debes revisar según dónde compres tu vivienda.',
    fecha: '5 de mayo de 2026',
    categoria: 'Gestoría',
    lectura: '8 min',
  },
  {
    slug: 'servicio-completo-compra-vivienda',
    titulo: 'Servicio completo de compra: de la reserva a la escritura con todas las garantías',
    resumen:
      'Revisión de contratos con agencias, análisis de honorarios, coordinación con notaría... Descubre cómo funciona el servicio integral que te acompaña en todo el proceso.',
    fecha: '5 de mayo de 2026',
    categoria: 'Gestoría',
    lectura: '6 min',
  },
  {
    slug: 'vender-piso-sin-comisiones',
    titulo: 'Vender tu piso sin comisiones: guía completa para propietarios 2026',
    resumen:
      'Aprende a vender tu piso sin pagar entre 9.000 € y 18.000 € en comisiones. Documentación, precio, anuncio, negociación y firma paso a paso.',
    fecha: '21 de abril de 2026',
    categoria: 'Venta',
    lectura: '8 min',
  },
  {
    slug: 'contrato-arras-diferencias',
    titulo: 'Arras penitenciales vs confirmatorias: ¿cuál te conviene en tu compraventa?',
    resumen:
      'Descubre las diferencias clave entre los dos tipos de arras, cuándo usar cada uno y qué consecuencias tiene para comprador y vendedor si alguien se echa atrás.',
    fecha: '22 de abril de 2026',
    categoria: 'Compraventa',
    lectura: '6 min',
  },
  {
    slug: 'como-alquilar-piso-sin-agencia',
    titulo: 'Cómo alquilar tu piso sin agencia en 2026: guía paso a paso para propietarios',
    resumen:
      'Publicar, seleccionar inquilino, fijar precio, redactar el contrato y depositar la fianza. Todo lo que necesitas para alquilar sin pagar comisión a ninguna agencia.',
    fecha: '22 de abril de 2026',
    categoria: 'Alquiler',
    lectura: '7 min',
  },
  {
    slug: 'contrato-alquiler-vivienda-guia',
    titulo: 'Contrato de alquiler 2026: qué tiene que incluir para ser válido y protegerte',
    resumen:
      'La Ley de Vivienda 2023 cambió muchas reglas. Descubre qué cláusulas son obligatorias, cuáles están prohibidas y qué pasa si firmas un contrato con errores.',
    fecha: '22 de abril de 2026',
    categoria: 'Alquiler',
    lectura: '8 min',
  },
  {
    slug: 'alquiler-habitacion-coliving',
    titulo: 'Alquilar una habitación en 2026: contrato, fianza y derechos del propietario',
    resumen:
      'El alquiler de habitaciones no lo cubre la LAU. Aprende qué ley aplica, cómo redactar el contrato y qué normas de convivencia puedes incluir legalmente.',
    fecha: '22 de abril de 2026',
    categoria: 'Alquiler',
    lectura: '5 min',
  },
  {
    slug: 'alquiler-con-opcion-a-compra',
    titulo: 'Alquiler con opción a compra: ventajas, riesgos y cómo funciona en España',
    resumen:
      'Alquilas hoy, compras cuando quieras. Te explicamos cómo funciona, qué descuenta de la futura compra, cuándo te conviene y cómo redactar el contrato correctamente.',
    fecha: '22 de abril de 2026',
    categoria: 'Compraventa',
    lectura: '6 min',
  },
  {
    slug: 'prestamo-entre-particulares-hacienda',
    titulo: 'Préstamo entre familiares: cómo formalizarlo y declararlo ante Hacienda',
    resumen:
      'Un préstamo sin contrato entre familiares puede convertirse en una donación sujeta a impuestos. Aprende a hacerlo bien: ITP, modelo 600 y documentación mínima.',
    fecha: '22 de abril de 2026',
    categoria: 'Financiación',
    lectura: '7 min',
  },
  {
    slug: 'pisos-fondo-bancario-baratos',
    titulo: 'Pisos de fondo bancario baratos: cómo encontrarlos y qué tener en cuenta',
    resumen:
      'Solvia, Aliseda, Servihabitat... Los bancos tienen miles de pisos entre 40.000 € y 150.000 €. Te explicamos cómo acceder, negociar precio y qué revisar antes de comprar.',
    fecha: '22 de abril de 2026',
    categoria: 'Compra',
    lectura: '6 min',
  },
]

export default function BlogPage() {
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Navegación" className="text-sm text-gray-500 mb-8">
          <ol className="flex flex-wrap gap-1">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
            <li aria-hidden="true" className="mx-1">/</li>
            <li aria-current="page" className="text-gray-700">Blog</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Blog para propietarios
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Guías prácticas para vender o alquilar tu piso en España sin intermediarios.
            Sin tecnicismos, sin letra pequeña.
          </p>
        </header>

        {/* Recursos y landing pages destacadas */}
        {RECURSOS.length > 0 && (
          <section className="mb-14">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-500 rounded-full inline-block" />
              Oportunidades destacadas
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {RECURSOS.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    className="group flex flex-col bg-white border border-amber-200 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-md transition-all h-full"
                  >
                    <div className="relative h-36 bg-gray-100">
                      <img src={r.imagen} alt={r.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-xs font-semibold bg-amber-500 text-white px-2.5 py-1 rounded-full">
                          {r.categoria}
                        </span>
                        {r.etiqueta && (
                          <span className="text-xs font-semibold bg-white text-amber-600 border border-amber-300 px-2.5 py-1 rounded-full">
                            {r.etiqueta}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2 text-base leading-snug">
                        {r.titulo}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{r.resumen}</p>
                      <span className="mt-4 text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                        Ver oportunidades →
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Artículos */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-300 rounded-full inline-block" />
            Guías y artículos
          </h2>
          <ul className="space-y-8">
            {ARTICULOS.map((art) => (
              <li key={art.slug}>
                <article className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                      {art.categoria}
                    </span>
                    <span className="text-xs text-gray-400">{art.lectura} de lectura</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                    <Link href={`/blog/${art.slug}`} className="stretched-link">
                      {art.titulo}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {art.resumen}
                  </p>

                  <div className="flex items-center justify-between">
                    <time className="text-xs text-gray-400" dateTime="2026-04-21">
                      {art.fecha}
                    </time>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                      aria-label={`Leer artículo: ${art.titulo}`}
                    >
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ¿Quieres vender o alquilar sin agencia?
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Publica tu anuncio gratis en Inmonest y llega a compradores reales directamente.
          </p>
          <Link
            href="/vender-casa"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block"
          >
            Publicar anuncio gratis
          </Link>
        </section>
      </main>
    </>
  )
}
