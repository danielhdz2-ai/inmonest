'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  SERVICIOS_CATEGORIA_LABELS,
  SERVICIOS_LANDING_CARDS,
  type ServicioCategoria,
  type ServicioLandingCard,
} from '@/lib/gestoria-servicios-landings'
import { GESTORIA_SERVICIOS, GESTORIA_PRECIO_MIN } from '@/lib/gestoria-catalogo'
import { BRAND_IMAGES } from '@/lib/brand-images'
import { gtmPush } from '@/components/GTMProvider'

const CATEGORIES: Array<{ key: ServicioCategoria | 'todos'; label: string }> = [
  { key: 'todos', label: 'Todos los servicios' },
  { key: 'compraventa', label: 'Compraventa' },
  { key: 'alquiler', label: 'Alquiler' },
  { key: 'revision', label: 'Revisiones' },
  { key: 'packs', label: 'Packs y acompañamiento' },
  { key: 'otros', label: 'Otros' },
]

const CATEGORY_PILL: Record<ServicioCategoria, string> = {
  compraventa: 'bg-orange-100 text-orange-700',
  alquiler: 'bg-orange-50 text-orange-600',
  revision: 'bg-amber-100 text-amber-700',
  packs: 'bg-yellow-100 text-yellow-800',
  otros: 'bg-gray-100 text-gray-700',
}

function cardHref(s: ServicioLandingCard) {
  return s.landingHref
}

function incluye(s: ServicioLandingCard): string[] {
  if (s.incluye?.length) return s.incluye
  return GESTORIA_SERVICIOS[s.slug]?.incluye ?? [
    'Redacción personalizada',
    'PDF firmable digitalmente',
    'Entrega habitual en 48h',
  ]
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
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative min-h-0 py-12 sm:min-h-[420px] sm:py-0 sm:h-[520px] overflow-hidden">
        <Image
          src={BRAND_IMAGES.gestoria.src}
          alt={BRAND_IMAGES.gestoria.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/95 via-black/70 to-black/50 sm:to-transparent" />
        <div className="relative sm:absolute sm:inset-0 flex flex-col justify-center px-4 sm:px-12 lg:px-20 max-w-4xl mx-auto sm:mx-0">
          <span className="inline-block bg-gold-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 sm:mb-4 w-fit">
            Contratos · Arras · Alquiler LAU
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-3 sm:mb-4">
            Servicios de contratos
            <br />
            <span className="text-gold-300">inmobiliarios con precio cerrado</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">
            Elige el servicio, abre su página y contrata online. Arras, alquiler LAU, revisiones y packs
            de acompañamiento. Desde {GESTORIA_PRECIO_MIN}€ · entrega habitual en 48h.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              Redactados por expertos
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              Entrega en 48h
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm">
              Pago seguro Stripe
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-gold-700 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
          {[
            'Contratos personalizados, no plantillas',
            'Precio cerrado con IVA incluido',
            'Entrega habitual en 48h',
            'Catálogo completo de servicios',
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <span className="text-gold-300">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLICACIÓN */}
      <section className="bg-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            ¿Qué servicios de contrato ofrecemos?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            En Inmonest redactamos <strong>contratos inmobiliarios a medida</strong>: arras penitenciales y
            confirmatorias, alquiler LAU, reserva, rescisión, préstamos entre particulares y packs de
            acompañamiento hasta escritura. Consulta el <strong>catálogo de servicios</strong> y entra en
            cada uno para ver detalle, precios y contratación.
          </p>
          <div className="bg-cream-100 border-l-4 border-gold-500 p-5 rounded-r-lg">
            <p className="text-gray-800 text-base leading-relaxed">
              Usa las pestañas de abajo para filtrar por tipo. Pulsa <strong>Ver más información</strong> o
              la imagen de la tarjeta para abrir la página del servicio.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-cream-100 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Elige el servicio',
                desc: 'Filtra por compraventa, alquiler, revisión o packs y abre la tarjeta del contrato que necesitas.',
              },
              {
                step: '02',
                title: 'Lee el servicio',
                desc: 'Entras en la página del servicio: qué incluye, para quién es, precios y preguntas frecuentes.',
              },
              {
                step: '03',
                title: 'Contrata online',
                desc: 'Solicitas o pagas desde esa misma página. Recibes el PDF personalizado, listo para firmar.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white font-extrabold text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS + PESTAÑAS */}
      <section id="lista-servicios" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8 sm:mb-10 px-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Catálogo de servicios</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Desde {GESTORIA_PRECIO_MIN} €. Elige un servicio para ver imagen, precio e información completa.
          </p>
        </div>

        <div className="-mx-4 sm:mx-0 mb-8 sm:mb-10">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActive(cat.key)}
                className={`flex-shrink-0 snap-start px-4 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] touch-manipulation whitespace-nowrap ${
                  active === cat.key
                    ? 'bg-gold-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const href = cardHref(service)
            const items = incluye(service)
            return (
              <article
                key={service.slug}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href={href}
                  onClick={() =>
                    gtmPush({
                      event: 'view_item',
                      ecommerce: {
                        items: [
                          {
                            item_id: service.slug,
                            item_name: service.nombre,
                            item_category: service.categoria,
                            price: service.precio,
                            quantity: 1,
                          },
                        ],
                      },
                    })
                  }
                  className="relative h-52 overflow-hidden bg-gray-200 block group"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.04] transition-transform duration-300"
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
                    <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-gold-500 text-white">
                      {service.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5">
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-gold-500">{service.precio} €</div>
                      <div className="text-[10px] text-gray-500 font-medium -mt-0.5">IVA incluido</div>
                    </div>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                    <Link href={href} className="hover:text-gold-700 transition-colors">
                      {service.nombre}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.descripcion}</p>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {items.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className="block w-full text-center py-2.5 bg-gold-500 text-white rounded-xl font-bold text-sm hover:bg-gold-600 transition-colors"
                  >
                    Ver más información — {service.precio} €{' '}
                    <span className="font-normal text-xs opacity-90">(IVA incl.)</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-black text-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">¿No sabes qué contrato necesitas?</h2>
          <p className="text-white/80 mb-6">
            Ve a gestoría o escríbenos: te orientamos en menos de 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/gestoria"
              className="inline-flex rounded-full bg-gold-500 text-black font-semibold px-6 py-3 text-sm hover:bg-gold-600 transition"
            >
              Ir a gestoría
            </Link>
            <Link
              href="/contacto"
              className="inline-flex rounded-full border border-white/40 text-white font-medium px-6 py-3 text-sm hover:bg-white/10 transition"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
