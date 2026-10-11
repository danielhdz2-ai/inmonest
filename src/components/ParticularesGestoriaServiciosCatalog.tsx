import Image from 'next/image'
import Link from 'next/link'
import { GESTORIA_CTA_BANNERS, getServicioImages } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'
import { LANDINGS_CIUDAD_PREMIUM_SLUGS } from '@/lib/landings-ciudad-premium'

type Props = {
  ciudad: string
  nombre: string
}

const VENTA_CIUDADES = new Set([
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'granada',
  'salamanca',
  'valladolid',
])

export default function ParticularesGestoriaServiciosCatalog({ ciudad, nombre }: Props) {
  const lauImg = getServicioImages('contrato-alquiler')
  const tempImg = { src: '/contrato4.jpg', alt: 'Contrato de alquiler por temporada' }
  const habImg = getServicioImages('alquiler-habitaciones')
  const compraImg = getServicioImages('compra-completa-reserva-escritura')
  const temporadaCiudad = (LANDINGS_CIUDAD_PREMIUM_SLUGS as readonly string[]).includes(ciudad)
  const ventaHref = VENTA_CIUDADES.has(ciudad)
    ? `/gestoria/venta-completa-reserva-escritura/${ciudad}`
    : '/gestoria/venta-completa-reserva-escritura'

  const servicios = [
    {
      title: 'Contrato alquiler LAU',
      price: precioLabel('contrato-alquiler'),
      desc: 'Vivienda habitual, fianza, IRAV y Ley de Vivienda 2026.',
      href: `/${ciudad}/contrato-alquiler`,
      solicitar: '/gestoria/solicitar/contrato-alquiler',
      image: lauImg.hero,
    },
    {
      title: 'Alquiler por temporada',
      price: precioLabel('alquiler-temporada'),
      desc: 'Estudiantes, obra, traslado: régimen distinto al LAU habitual.',
      href: temporadaCiudad ? `/${ciudad}/alquiler-temporada` : '/gestoria/alquiler-temporada',
      solicitar: '/gestoria/solicitar/alquiler-temporada',
      image: tempImg,
    },
    {
      title: 'Alquiler de habitación',
      price: precioLabel('alquiler-habitaciones'),
      desc: 'Piso compartido, coliving y normas de convivencia en contrato.',
      href: `/gestoria/contrato-alquiler-habitacion/${ciudad}`,
      solicitar: '/gestoria/solicitar/alquiler-habitaciones',
      image: habImg.hero,
    },
    {
      title: 'Compra integral',
      price: 'Consultar pack',
      desc: 'Reserva, arras, due diligence y camino a escritura.',
      href: `/gestoria/asesoria-compra-piso/${ciudad}`,
      solicitar: '/gestoria/solicitar/compra-completa-reserva-escritura',
      image: compraImg.hero,
    },
    {
      title: 'Venta entre particulares',
      price: 'Servicio integral',
      desc: 'Documentación vendedor, arras Plus y seguimiento hasta firma.',
      href: ventaHref,
      solicitar: '/gestoria/solicitar/venta-completa-reserva-escritura',
      image: GESTORIA_CTA_BANNERS.ventaCompleta,
    },
    {
      title: 'Arras penitenciales',
      price: precioLabel('arras-penitenciales'),
      desc: 'Señal de compraventa con revisión registral básica.',
      href: `/${ciudad}/contrato-arras`,
      solicitar: '/gestoria/solicitar/arras-penitenciales',
      image: getServicioImages('arras-penitenciales').hero,
    },
  ]

  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contratos y gestoría en {nombre}
        </h2>
        <p className="text-gray-500 text-sm mb-10 max-w-2xl">
          LAU, temporada, habitación, compra y venta entre particulares: mismo modelo online con gestor
          asignado, imágenes reales de nuestro trabajo y panel de seguimiento.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-gray-200 overflow-hidden hover:border-gold-400/60 hover:shadow-lg transition-all bg-white flex flex-col"
            >
              <div className="relative h-40 w-full bg-gray-100">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur px-2 py-1 rounded-full">
                  {s.price}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={s.href}
                    className="text-sm font-semibold text-gold-700 hover:text-gold-900"
                  >
                    Ver servicio →
                  </Link>
                  <Link
                    href={s.solicitar}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Solicitar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
