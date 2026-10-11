import Image from 'next/image'
import Link from 'next/link'
import { getServicioImages } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'

type IntentCard = {
  id: string
  eyebrow: string
  title: string
  lead: string
  bullets: string[]
  image: { src: string; alt: string }
  price: string
  primaryHref: string
  primaryLabel: string
  infoHref: string
  infoLabel: string
  extraHref?: string
  extraLabel?: string
}

const INTENTS: IntentCard[] = [
  {
    id: 'alquiler',
    eyebrow: 'Alquiler de vivienda',
    title: 'Alquilo o alquilo mi piso',
    lead: 'Contrato de larga duración (LAU), temporada o habitación con cláusulas al día.',
    bullets: [
      'LAU y Ley de Vivienda 2026',
      'Fianza, renta e inventario',
      'Entrega habitual en 48 h',
    ],
    image: getServicioImages('contrato-alquiler').hero,
    price: precioLabel('contrato-alquiler'),
    primaryHref: '/gestoria/solicitar/contrato-alquiler',
    primaryLabel: 'Contratar contrato LAU',
    infoHref: '/gestoria/contrato-alquiler',
    infoLabel: 'Qué incluye el LAU',
  },
  {
    id: 'comprador-arras',
    eyebrow: 'Eres comprador',
    title: 'Necesito un contrato de arras',
    lead:
      'Vas a reservar o señalizar una compra entre particulares. En Inmonest redactamos tu arras con un gestor experto y te asesoramos antes de firmar.',
    bullets: [
      'Arras penitenciales o confirmatorias',
      'Cláusulas claras y precio cerrado',
      'Gestor asignado en todo el proceso',
    ],
    image: getServicioImages('arras-penitenciales').hero,
    price: precioLabel('arras-penitenciales'),
    primaryHref: '/gestoria/solicitar/arras-penitenciales',
    primaryLabel: 'Contratar arras',
    infoHref: '/gestoria/arras-penitenciales',
    infoLabel: 'Cómo funciona la arras',
    extraHref: '/gestoria/compra-completa-reserva-escritura',
    extraLabel: 'Pack compra hasta escritura',
  },
  {
    id: 'vendedor',
    eyebrow: 'Eres vendedor',
    title: 'Vendo sin comisión de agencia',
    lead:
      'Vende tu vivienda entre particulares con tarifa fija de gestoría: sin el 3 % de una inmobiliaria. Contrato de arras, documentación y seguimiento con gestor hasta la firma.',
    bullets: [
      'Precio fijo · sin comisión por la venta',
      'Arras y documentación del inmueble',
      'Asesoramiento hasta notaría',
    ],
    image: getServicioImages('pack-arras-plus-vendedor').hero,
    price: precioLabel('pack-arras-plus-vendedor'),
    primaryHref: '/gestoria/solicitar/pack-arras-plus-vendedor',
    primaryLabel: 'Contratar gestoría venta',
    infoHref: '/gestoria/pack-arras-plus-vendedor',
    infoLabel: 'Servicio para vendedores',
    extraHref: '/gestoria/solicitar/arras-penitenciales',
    extraLabel: 'Solo contrato de arras',
  },
  {
    id: 'revision',
    eyebrow: 'Antes de firmar',
    title: 'Me han pasado un borrador',
    lead: '¿Te han enviado un contrato de alquiler o arras y no lo tienes claro? Lo revisamos y corregimos antes de que entregues dinero.',
    bullets: [
      'Detectamos cláusulas abusivas o ilegales',
      'Informe claro en lenguaje sencillo',
      'Ideal antes de pagar la señal',
    ],
    image: getServicioImages('revision-correccion-arras').hero,
    price: precioLabel('revision-correccion-arras'),
    primaryHref: '/gestoria/solicitar/revision-correccion-arras',
    primaryLabel: 'Revisar mi borrador',
    infoHref: '/gestoria/revision-correccion-arras',
    infoLabel: 'Ver revisión de arras',
  },
]

export default function HomePersonaIntents() {
  return (
    <section className="bg-cream-50/80 py-16 sm:py-20 border-y border-gold-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
            Gestoría inmobiliaria · Expertos gestores
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            ¿Qué necesitas formalizar?
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Alquiler de larga duración, contrato de arras o revisión de un borrador: elige tu situación.
            Precio cerrado, gestor experto y contratación online.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {INTENTS.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm hover:shadow-lg hover:border-gold-400/50 transition-all duration-300"
            >
              <div className="relative h-44 sm:h-48 w-full shrink-0">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-black/50 text-white backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15 max-w-[85%]">
                  {item.eyebrow}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-gray-900 bg-gold-300 px-2.5 py-1 rounded-full shadow-sm">
                  {item.price}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.lead}</p>
                <ul className="mt-3 space-y-1.5 flex-1">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-xs text-gray-700">
                      <span className="text-gold-600 font-bold shrink-0" aria-hidden>
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={item.primaryHref}
                    className="inline-flex items-center justify-center rounded-full bg-gold-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-gold-600 transition-colors"
                  >
                    {item.primaryLabel}
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <Link
                      href={item.infoHref}
                      className="font-semibold text-gray-700 hover:text-gold-800 underline-offset-2 hover:underline"
                    >
                      {item.infoLabel}
                    </Link>
                    {item.extraHref && item.extraLabel && (
                      <>
                        <span className="text-gray-300" aria-hidden>
                          ·
                        </span>
                        <Link
                          href={item.extraHref}
                          className="font-medium text-gray-500 hover:text-gold-700"
                        >
                          {item.extraLabel}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
