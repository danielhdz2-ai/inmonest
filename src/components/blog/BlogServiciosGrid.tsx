import Image from 'next/image'
import Link from 'next/link'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'
import { getContractHero } from '@/lib/gestoria-images'
import { precioLabel } from '@/lib/gestoria-precios-ui'

export type BlogServicioGridItem = {
  slug: string
  href?: string
  solicitarHref?: string
  descripcion?: string
}

type BlogServiciosGridProps = {
  title?: string
  intro?: string
  items: BlogServicioGridItem[]
}

export function BlogServiciosGrid({
  title = 'Servicios Inmonest para tu operación',
  intro,
  items,
}: BlogServiciosGridProps) {
  return (
    <div className="not-prose my-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      {intro ? <p className="text-gray-600 text-sm leading-relaxed mb-6">{intro}</p> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        {items.map((item) => {
          const catalog = GESTORIA_SERVICIOS[item.slug as keyof typeof GESTORIA_SERVICIOS]
          const nombre = catalog?.nombre ?? item.slug
          const img = getContractHero(item.slug)
          const href = item.href ?? `/gestoria/${item.slug}`
          const solicitar = item.solicitarHref ?? `/gestoria/solicitar/${item.slug}`
          const precio = catalog ? precioLabel(item.slug) : null

          return (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gold-400/40 transition-all duration-300"
            >
              <Link href={href} className="relative block h-44 sm:h-48 shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
                {precio ? (
                  <span className="absolute top-3 right-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm">
                    {precio}
                  </span>
                ) : null}
              </Link>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">
                  <Link href={href} className="hover:text-gold-800 transition-colors">
                    {nombre}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                  {item.descripcion ??
                    (catalog?.incluye.slice(0, 2).join('. ') + (catalog?.incluye[2] ? '…' : ''))}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Link
                    href={solicitar}
                    className="inline-flex rounded-lg bg-gold-500 px-4 py-2.5 text-xs font-bold text-gray-900 hover:bg-gold-600 transition-colors"
                  >
                    Contratar online
                  </Link>
                  <Link
                    href={href}
                    className="inline-flex rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Ver servicio
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
