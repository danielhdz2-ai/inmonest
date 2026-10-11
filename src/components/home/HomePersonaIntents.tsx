import Image from 'next/image'
import Link from 'next/link'
import { getServicioImages } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const INTENTS = [
  {
    eyebrow: 'Propietario o inquilino',
    title: 'Alquilo o alquilo mi piso',
    description:
      'Contrato LAU, temporada o habitación: cláusulas al día, fianza e inventario. Entrega en 48 h.',
    image: getServicioImages('contrato-alquiler').hero,
    infoHref: '/gestoria/contrato-alquiler',
    checkoutHref: '/gestoria/solicitar/contrato-alquiler',
    price: precioLabel('contrato-alquiler'),
  },
  {
    eyebrow: 'Comprador entre particulares',
    title: 'Compro vivienda, parking o trastero',
    description:
      'Reserva, arras, due diligence y camino a escritura con gestor asignado y documentación ordenada.',
    image: getServicioImages('compra-completa-reserva-escritura').hero,
    infoHref: '/gestoria/compra-completa-reserva-escritura',
    checkoutHref: '/gestoria/solicitar/compra-completa-reserva-escritura',
    price: 'Packs desde arras',
  },
  {
    eyebrow: 'Vendedor entre particulares',
    title: 'Vendo sin comisión de agencia',
    description:
      'Arras Plus, documentación del inmueble y seguimiento hasta firma en notaría.',
    image: getServicioImages('venta-completa-reserva-escritura').hero,
    infoHref: '/gestoria/venta-completa-reserva-escritura',
    checkoutHref: '/gestoria/solicitar/venta-completa-reserva-escritura',
    price: 'Servicio integral',
  },
  {
    eyebrow: 'Antes de firmar',
    title: 'Me han pasado un borrador',
    description:
      'Revisión y corrección de alquiler o arras. Detectamos cláusulas abusivas antes de pagar la señal.',
    image: getServicioImages('revision-correccion-arras').hero,
    infoHref: '/gestoria/revision-correccion-arras',
    checkoutHref: '/gestoria/solicitar/revision-correccion-arras',
    price: precioLabel('revision-correccion-arras'),
  },
] as const

export default function HomePersonaIntents() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
            Tu situación
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            ¿Qué necesitas formalizar?
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Elige tu caso: cada tarjeta lleva a la ficha del servicio o a contratar online con precio
            cerrado.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {INTENTS.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-gold-400/50 transition-all duration-300"
            >
              <div className="relative h-48 sm:h-52 w-full">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-black/45 text-white/95 backdrop-blur px-2.5 py-1 rounded-full border border-white/15">
                  {item.eyebrow}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-gold-600/90 px-2.5 py-1 rounded-full">
                  {item.price}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={item.checkoutHref}
                    className="inline-flex items-center justify-center rounded-full bg-gold-500 px-4 py-2 text-xs font-bold text-white hover:bg-gold-600 transition-colors"
                  >
                    Contratar online
                  </Link>
                  <Link
                    href={item.infoHref}
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gold-400 hover:text-gold-800 transition-colors"
                  >
                    Ver servicio
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
