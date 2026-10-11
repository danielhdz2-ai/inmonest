import Image from 'next/image'
import Link from 'next/link'
import { getServicioImages } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'
import { GESTORIA_SOLICITAR_HUB } from '@/lib/gestoria-nav'

const SERVICIOS = [
  {
    slug: 'contrato-alquiler',
    title: 'Contrato alquiler LAU',
    desc: 'Vivienda habitual · Ley Vivienda 2026 · fianza e IRAV.',
    info: '/gestoria/contrato-alquiler',
    checkout: '/gestoria/solicitar/contrato-alquiler',
  },
  {
    slug: 'alquiler-temporada',
    title: 'Alquiler por temporada',
    desc: 'Estancia temporal con causa justificada, distinto al LAU habitual.',
    info: '/gestoria/alquiler-temporada',
    checkout: '/gestoria/solicitar/alquiler-temporada',
  },
  {
    slug: 'alquiler-habitaciones',
    title: 'Alquiler de habitación',
    desc: 'Piso compartido, coliving y normas de convivencia en contrato.',
    info: '/gestoria/alquiler-habitaciones',
    checkout: '/gestoria/solicitar/alquiler-habitaciones',
  },
  {
    slug: 'arras-penitenciales',
    title: 'Arras penitenciales',
    desc: 'Señal de compraventa con revisión registral básica.',
    info: '/gestoria/arras-penitenciales',
    checkout: '/gestoria/solicitar/arras-penitenciales',
  },
  {
    slug: 'compra-completa-reserva-escritura',
    title: 'Compra integral',
    desc: 'Reserva, arras, due diligence y camino a escritura.',
    info: '/gestoria/compra-completa-reserva-escritura',
    checkout: '/gestoria/solicitar/compra-completa-reserva-escritura',
  },
  {
    slug: 'venta-completa-reserva-escritura',
    title: 'Venta integral',
    desc: 'Documentación vendedor, arras Plus y seguimiento hasta firma.',
    info: '/gestoria/venta-completa-reserva-escritura',
    checkout: '/gestoria/solicitar/venta-completa-reserva-escritura',
  },
] as const

export default function HomeDiscoverGrid() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
              Catálogo con fotos reales
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Servicios más contratados
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
              Mismo estilo que nuestro panel de cliente: imagen, precio cerrado y contratación online.
            </p>
          </div>
          <Link
            href={GESTORIA_SOLICITAR_HUB}
            className="text-sm font-semibold text-gold-700 hover:text-gold-900 shrink-0"
          >
            Ver todos los contratos →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICIOS.map((s) => {
            const img = getServicioImages(s.slug).hero
            const price =
              s.slug === 'compra-completa-reserva-escritura' ||
              s.slug === 'venta-completa-reserva-escritura'
                ? 'Consultar pack'
                : precioLabel(s.slug)
            return (
              <article
                key={s.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gold-400/50 transition-all duration-300"
              >
                <Link href={s.info} className="relative block h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/45 backdrop-blur px-2.5 py-1 rounded-full">
                    {price}
                  </span>
                </Link>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-bold text-gray-900 leading-snug">
                    <Link href={s.info} className="hover:text-gold-800 transition-colors">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={s.checkout}
                      className="text-xs font-bold text-gold-700 hover:text-gold-900"
                    >
                      Contratar →
                    </Link>
                    <span className="text-gray-300">·</span>
                    <Link href={s.info} className="text-xs font-semibold text-gray-600 hover:text-gray-900">
                      Detalle del servicio
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/calculadora-gastos-alquiler"
            className="group relative block overflow-hidden rounded-2xl h-36 border border-gray-200"
          >
            <Image src="/interior2.jpg" alt="Calculadora de gastos de alquiler" fill className="object-cover group-hover:scale-[1.03] transition-transform" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30" />
            <div className="relative h-full flex flex-col justify-center px-6">
              <p className="text-white font-bold">Calculadora de alquiler</p>
              <p className="text-white/70 text-sm mt-1">Coste mensual real · gratis</p>
            </div>
          </Link>
          <Link
            href="/opiniones"
            className="group relative block overflow-hidden rounded-2xl h-36 border border-gray-200"
          >
            <Image src="/gestoria7.jpg" alt="Opiniones de clientes en Google" fill className="object-cover group-hover:scale-[1.03] transition-transform" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30" />
            <div className="relative h-full flex flex-col justify-center px-6">
              <p className="text-white font-bold">Opiniones verificadas</p>
              <p className="text-white/70 text-sm mt-1">5.0 en Google · clientes reales</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
