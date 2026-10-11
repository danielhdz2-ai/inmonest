'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Building2, Users, FileText, Shield } from '@/components/ui/Icons'

interface CardData {
  id: string
  titulo: string
  subtitulo: string
  imagen: string
  tag: string
  tagStyle: string
  desc: string
  features: string[]
  cta: string
  href: string
  Icon: typeof Users
}

const CARDS: CardData[] = [
  {
    id: 'gestoria',
    titulo: 'Gestoría\ninmobiliaria',
    subtitulo: 'Online en toda España · precio cerrado.',
    imagen: '/gestoria15.jpg',
    tag: 'Entrega 48 h',
    tagStyle: 'bg-gold-600/90',
    desc: 'Redactamos y revisamos contratos de alquiler, arras y compraventa entre particulares. Gestor asignado, panel de cliente y pago seguro.',
    features: [
      'Contratos LAU, arras y packs hasta escritura',
      'Gestores expertos en derecho inmobiliario',
      'Seguimiento en tu panel de cliente',
    ],
    cta: 'Ver servicios de gestoría',
    href: '/gestoria',
    Icon: Building2,
  },
  {
    id: 'expertos',
    titulo: 'Expertos\ngestores',
    subtitulo: 'Trato cercano y asesoramiento claro.',
    imagen: '/gestor-experto-oficina.jpg',
    tag: 'Equipo jurídico',
    tagStyle: 'bg-forest-800/90',
    desc: 'Te acompañamos en alquiler de larga duración, arras y documentación previa a la firma. Resolvemos dudas antes de que firmes nada.',
    features: [
      'Gestor asignado desde el primer día',
      'Una ronda de cambios incluida',
      'WhatsApp y panel para tu expediente',
    ],
    cta: 'Hablar con gestoría',
    href: '/gestoria/solicitar',
    Icon: Users,
  },
  {
    id: 'alquiler-lau',
    titulo: 'Alquiler\nlarga duración',
    subtitulo: 'Contrato LAU · vivienda habitual.',
    imagen: '/contratodealquiler.jpg',
    tag: 'Desde 145 €',
    tagStyle: 'bg-gold-700/90',
    desc: 'Contrato de alquiler de vivienda adaptado a la LAU y Ley de Vivienda 2026: fianza, renta, duración e inventario.',
    features: [
      'LAU y normativa autonómica',
      'Personalización según tu caso',
      'PDF listo para firmar en 48 h',
    ],
    cta: 'Contratar contrato LAU',
    href: '/gestoria/solicitar/contrato-alquiler',
    Icon: FileText,
  },
  {
    id: 'arras',
    titulo: 'Contratos\nde arras',
    subtitulo: 'Señal de compraventa segura.',
    imagen: '/contratodearras.jpg',
    tag: 'Desde 61 €',
    tagStyle: 'bg-forest-900/90',
    desc: 'Arras penitenciales o confirmatorias con cláusulas claras y revisión registral básica. Ideal antes de reservar o señalizar la compra.',
    features: [
      'Arras penitenciales y confirmatorias',
      'Revisión documental opcional en pack',
      'Redactado por gestores inmobiliarios',
    ],
    cta: 'Solicitar contrato de arras',
    href: '/gestoria/solicitar/arras-penitenciales',
    Icon: Shield,
  },
]

export default function BentoVentajas() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const card = CARDS.find((c) => c.id === activeId) ?? null

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeId])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4 lg:h-[580px]">
        <BentoCard card={CARDS[0]} className="h-64 lg:h-auto lg:col-span-2 lg:row-start-1" onOpen={() => setActiveId(CARDS[0].id)} />
        <BentoCard card={CARDS[1]} className="h-64 lg:h-auto lg:col-start-3 lg:row-start-1 lg:row-span-2" onOpen={() => setActiveId(CARDS[1].id)} />
        <BentoCard card={CARDS[2]} className="h-64 lg:h-auto lg:col-start-1 lg:row-start-2" onOpen={() => setActiveId(CARDS[2].id)} />
        <BentoCard card={CARDS[3]} className="h-64 lg:h-auto lg:col-start-2 lg:row-start-2" onOpen={() => setActiveId(CARDS[3].id)} />
      </div>

      {activeId && card && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveId(null)
          }}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col lg:flex-row"
            style={{ maxHeight: '90vh' }}
          >
            <div className="relative w-full lg:w-[42%] shrink-0 h-60 lg:h-auto">
              <Image
                src={card.imagen}
                alt={card.titulo.replace('\n', ' ')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <card.Icon className="w-4 h-4 text-white/90" />
                <span className={`${card.tagStyle} text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm`}>
                  {card.tag}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-8 lg:p-10 flex-1 overflow-y-auto">
              <button
                onClick={() => setActiveId(null)}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-gray-900 flex items-center justify-center shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight whitespace-pre-line">
                {card.titulo}
              </h2>
              <p className="text-base text-gray-500 font-medium mt-2">{card.subtitulo}</p>
              <p className="text-gray-600 leading-relaxed mt-5 text-[15px]">{card.desc}</p>

              <ul className="mt-6 space-y-3">
                {card.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-sm font-medium leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={card.href}
                onClick={() => setActiveId(null)}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors w-fit"
              >
                {card.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function BentoCard({
  card,
  className,
  onOpen,
}: {
  card: CardData
  className: string
  onOpen: () => void
}) {
  return (
    <div
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer select-none ${className}`}
    >
      <Image
        src={card.imagen}
        alt={card.titulo.replace('\n', ' ')}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <span className={`${card.tagStyle} text-white text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit mb-3 tracking-wide`}>
          {card.tag}
        </span>
        <h3 className="text-white font-extrabold leading-tight text-2xl sm:text-[26px] whitespace-pre-line">
          {card.titulo}
        </h3>
        <p className="text-white/75 text-sm mt-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
          {card.subtitulo}
        </p>
      </div>
    </div>
  )
}
