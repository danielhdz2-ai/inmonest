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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {precio ? (
                  <span className="absolute top-3 right-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-gray-900">
                    {precio}
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{nombre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.descripcion ??
                    (catalog?.incluye.slice(0, 2).join('. ') + (catalog?.incluye[2] ? '…' : ''))}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={solicitar}
                    className="inline-flex rounded-lg bg-gold-500 px-4 py-2 text-xs font-bold text-gray-900 hover:bg-gold-600 transition-colors"
                  >
                    Contratar online
                  </Link>
                  <Link
                    href={href}
                    className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
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
