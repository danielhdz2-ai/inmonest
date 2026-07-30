'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  SERVICIOS_CATEGORIA_LABELS,
  SERVICIOS_LANDING_CARDS,
  type ServicioCategoria,
  type ServicioLandingCard,
} from '@/lib/gestoria-servicios-landings'

const CATEGORIES: Array<ServicioCategoria | 'todos'> = [
  'todos',
  'compraventa',
  'alquiler',
  'revision',
  'packs',
  'otros',
]

const CATEGORY_PILL: Record<ServicioCategoria, string> = {
  compraventa: 'bg-amber-100 text-amber-900',
  alquiler: 'bg-orange-100 text-orange-900',
  revision: 'bg-sky-100 text-sky-900',
  packs: 'bg-emerald-100 text-emerald-900',
  otros: 'bg-gray-100 text-gray-800',
}

function cardHref(s: ServicioLandingCard) {
  return s.landingHref ?? `/gestoria/solicitar/${s.slug}`
}

export default function ServiciosHubContent() {
  const [active, setActive] = useState<ServicioCategoria | 'todos'>('todos')

  const filtered = useMemo(
    () =>
      active === 'todos'
        ? SERVICIOS_LANDING_CARDS
        : SERVICIOS_LANDING_CARDS.filter((s) => s.categoria === active),
    [active],
  )

  return (
    <>
      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin snap-x">
        {CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`flex-shrink-0 snap-start px-4 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] whitespace-nowrap ${
              active === key
                ? 'bg-[#c9962a] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {SERVICIOS_CATEGORIA_LABELS[key]}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} servicio{filtered.length === 1 ? '' : 's'}
        {active !== 'todos' ? ` en ${SERVICIOS_CATEGORIA_LABELS[active].toLowerCase()}` : ''}
      </p>

      {/* Grid tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => {
          const href = cardHref(service)
          const hasLanding = Boolean(service.landingHref)
          return (
            <article
              key={service.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Link href={href} className="relative h-48 overflow-hidden bg-gray-200 block group">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-300"
                  style={{ backgroundImage: `url('${service.image}')` }}
                  role="img"
                  aria-label={service.nombre}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_PILL[service.categoria]}`}
                >
                  {SERVICIOS_CATEGORIA_LABELS[service.categoria]}
                </span>
                {service.badge && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-[#c9962a] text-white">
                    {service.badge}
                  </span>
                )}
                {!hasLanding && (
                  <span className="absolute top-12 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-700">
                    Contratar online
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-[#c9962a]">{service.precio} €</div>
                    <div className="text-[10px] text-gray-500 font-medium -mt-0.5">IVA incluido</div>
                  </div>
                </div>
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-bold text-gray-900 text-base leading-snug mb-2">
                  <Link href={href} className="hover:text-[#a87a20] transition-colors">
                    {service.nombre}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">{service.descripcion}</p>
                <Link
                  href={href}
                  className="block w-full text-center py-2.5 bg-[#c9962a] text-white rounded-xl font-bold text-sm hover:bg-[#a87a20] transition-colors"
                >
                  {hasLanding ? 'Ver servicio' : 'Solicitar'} — {service.precio} €
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
