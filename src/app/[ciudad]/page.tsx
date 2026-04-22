import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import ListingCard from '@/components/ListingCard'
import { searchListings } from '@/lib/listings'

const BASE_URL = 'https://inmonest.com'

const CIUDADES: Record<string, { nombre: string; precio: string; descripcion: string }> = {
  madrid:    { nombre: 'Madrid',    precio: '1.300 – 1.800 €/mes', descripcion: 'La mayor oferta de pisos entre particulares de España. Conecta directamente con propietarios en Madrid sin pagar comisión de agencia.' },
  barcelona: { nombre: 'Barcelona', precio: '1.400 – 2.000 €/mes', descripcion: 'Encuentra piso en Barcelona directamente del propietario. Sin intermediarios, sin honorarios de agencia.' },
  valencia:  { nombre: 'Valencia',  precio: '800 – 1.200 €/mes',   descripcion: 'Valencia, ciudad con mayor crecimiento de alquiler. Contacta propietarios directamente y ahorra en comisiones.' },
  sevilla:   { nombre: 'Sevilla',   precio: '700 – 1.100 €/mes',   descripcion: 'La mejor relación calidad-precio en alquiler de particulares. Alquila en Sevilla directamente del dueño.' },
  malaga:    { nombre: 'Málaga',    precio: '1.000 – 1.600 €/mes', descripcion: 'Málaga lidera el crecimiento inmobiliario. Ahorra hasta 2.000 € en comisiones alquilando directamente de particulares.' },
  bilbao:    { nombre: 'Bilbao',    precio: '900 – 1.400 €/mes',   descripcion: 'Mercado de alquiler sólido y estable. Encuentra tu piso en Bilbao sin agencias ni intermediarios.' },
  zaragoza:  { nombre: 'Zaragoza',  precio: '600 – 950 €/mes',     descripcion: 'La capital española con mejor relación calidad-precio. Alquila en Zaragoza directamente del propietario.' },
  alicante:  { nombre: 'Alicante',  precio: '700 – 1.100 €/mes',   descripcion: 'Pisos con vistas al mar y cerca de la playa. Alquila en Alicante sin comisiones de agencia.' },
}

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  const data = CIUDADES[ciudad]
  if (!data) return {}
  const { nombre } = data
  return {
    title: `Pisos en ${nombre} — Alquiler y venta entre particulares`,
    description: `${data.descripcion} Precio medio: ${data.precio}. Miles de anuncios reales de propietarios en ${nombre}.`,
    keywords: `pisos ${nombre.toLowerCase()}, alquiler ${nombre.toLowerCase()} particulares, comprar piso ${nombre.toLowerCase()}, inmuebles ${nombre.toLowerCase()} sin agencia`,
    alternates: { canonical: `${BASE_URL}/${ciudad}` },
    openGraph: {
      title: `Pisos en ${nombre} | Inmonest`,
      description: data.descripcion,
      url: `${BASE_URL}/${ciudad}`,
      locale: 'es_ES',
      type: 'website',
      siteName: 'Inmonest',
    },
  }
}

export default async function CiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const data = CIUDADES[ciudad]
  if (!data) notFound()

  const { nombre, precio, descripcion } = data

  const { listings } = await searchListings({ ciudad, pagina: 1 })

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: nombre, item: `${BASE_URL}/${ciudad}` },
    ],
  })

  const SECCIONES = [
    {
      href: `/${ciudad}/alquiler-particulares`,
      titulo: `Alquiler de particulares en ${nombre}`,
      desc: 'Pisos de alquiler publicados directamente por sus propietarios. Sin agencias.',
      tag: 'Alquiler · Particulares',
    },
    {
      href: `/${ciudad}/alquiler-sin-agencia`,
      titulo: `Alquiler sin agencia en ${nombre}`,
      desc: 'Cómo alquilar en esta ciudad sin pagar honorarios a intermediarios.',
      tag: 'Guía',
    },
    {
      href: `/${ciudad}/pisos`,
      titulo: `Pisos en ${nombre}`,
      desc: 'Todos los anuncios de pisos: alquiler y venta, particulares y agencias.',
      tag: 'Todos los anuncios',
    },
    {
      href: `/${ciudad}/vender-piso`,
      titulo: `Vender piso en ${nombre}`,
      desc: 'Guía para propietarios que quieren vender su piso sin comisiones.',
      tag: 'Venta',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1a0f] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70">{nombre}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Pisos en <span className="text-[#c9a84c]">{nombre}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-6">{descripcion}</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">
              Precio medio: {precio}
            </span>
            <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">
              {listings.length}+ anuncios activos
            </span>
          </div>
        </div>
      </section>

      {/* ── SECCIONES ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Explora en {nombre}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECCIONES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <span className="text-xs font-medium text-[#c9a84c] uppercase tracking-wide">{s.tag}</span>
              <h3 className="text-base font-semibold text-gray-800 mt-1 group-hover:text-[#c9a84c] transition-colors">
                {s.titulo}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LISTINGS RECIENTES ───────────────────────────────────────────── */}
      {listings.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">Anuncios recientes en {nombre}</h2>
            <Link
              href={`/${ciudad}/pisos`}
              className="text-sm text-[#c9a84c] hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.slice(0, 6).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
