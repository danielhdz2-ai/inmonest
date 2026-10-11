import Link from 'next/link'
import Image from 'next/image'
import {
  GESTORIA_ARRAS_CHECKOUT,
  GESTORIA_LAU_CHECKOUT,
  GESTORIA_SERVICIOS_CATALOGO,
  GESTORIA_SOLICITAR_HUB,
} from '@/lib/gestoria-nav'
import { getServicioImages } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const FEATURED: Array<{
  title: string
  desc: string
  href: string
  price: () => string
  image: { src: string; alt: string }
  badge?: string
}> = [
  {
    title: 'Contrato alquiler LAU',
    desc: 'Vivienda habitual · Ley Vivienda 2026 · 48 h',
    href: GESTORIA_LAU_CHECKOUT,
    price: () => precioLabel('contrato-alquiler'),
    image: getServicioImages('contrato-alquiler').hero,
    badge: 'Más buscado',
  },
  {
    title: 'Arras penitenciales',
    desc: 'Señal de compraventa entre particulares',
    href: GESTORIA_ARRAS_CHECKOUT,
    price: () => precioLabel('arras-penitenciales'),
    image: getServicioImages('arras-penitenciales').hero,
  },
  {
    title: 'Alquiler temporada',
    desc: 'Estancia temporal · régimen distinto al LAU',
    href: '/gestoria/solicitar/alquiler-temporada',
    price: () => precioLabel('alquiler-temporada'),
    image: { src: '/contrato4.jpg', alt: 'Contrato alquiler temporada' },
  },
  {
    title: 'Alquiler habitación',
    desc: 'Piso compartido y normas de convivencia',
    href: '/gestoria/solicitar/alquiler-habitaciones',
    price: () => precioLabel('alquiler-habitaciones'),
    image: getServicioImages('alquiler-habitaciones').hero,
  },
  {
    title: 'Compra integral',
    desc: 'Reserva, arras y camino a escritura',
    href: '/gestoria/solicitar/compra-completa-reserva-escritura',
    price: () => 'Desde pack integral',
    image: getServicioImages('compra-completa-reserva-escritura').hero,
  },
  {
    title: 'Venta integral',
    desc: 'Documentación vendedor hasta firma',
    href: '/gestoria/solicitar/venta-completa-reserva-escritura',
    price: () => 'Servicio completo',
    image: { src: '/familia2.jpg', alt: 'Venta entre particulares' },
  },
]

export default function SolicitarContratosFeatured() {
  return (
    <section className="py-12 px-6 -mt-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Elige tu contrato</h2>
            <p className="text-sm text-gray-500 mt-1">
              Pago único · Stripe seguro · Gestor asignado. ¿Dudas?{' '}
              <Link href={GESTORIA_SERVICIOS_CATALOGO} className="text-gold-600 font-semibold hover:underline">
                Comparar servicios
              </Link>
            </p>
          </div>
          <Link
            href={GESTORIA_SOLICITAR_HUB}
            className="text-sm font-semibold text-gold-700 hover:text-gold-900"
          >
            Ver listado completo ↓
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-gold-400 hover:shadow-md transition-all"
            >
              <div className="relative h-36 bg-gray-100">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-gold-500 text-white px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 text-xs font-bold bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur">
                  {item.price()}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 group-hover:text-gold-700">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1 flex-1">{item.desc}</p>
                <span className="mt-3 text-sm font-semibold text-gold-600">Contratar online →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
