'use client'

import Link from 'next/link'
import { gtmPush } from '@/components/GTMProvider'

const INTENTS = [
  {
    id: 'alquiler',
    label: 'Alquilar o soy propietario',
    href: '/gestoria/contrato-alquiler',
    checkout: '/gestoria/solicitar/contrato-alquiler',
  },
  {
    id: 'arras',
    label: 'Comprar — necesito arras',
    href: '/gestoria/arras-penitenciales',
    checkout: '/gestoria/solicitar/arras-penitenciales',
  },
  {
    id: 'venta',
    label: 'Vender con acompañamiento',
    href: '/gestoria/venta-completa-reserva-escritura',
    checkout: '/gestoria/solicitar/venta-completa-reserva-escritura',
  },
  {
    id: 'revision',
    label: 'Revisar un contrato',
    href: '/gestoria/revision-correccion-arras',
    checkout: '/gestoria/solicitar/revision-correccion-arras',
  },
] as const

function track(intentId: string, action: 'info' | 'checkout') {
  gtmPush({
    event: 'home_intent_click',
    intent_id: intentId,
    intent_action: action,
  })
}

export default function HomeIntentSelector() {
  return (
    <section className="py-12 sm:py-14 bg-cream-50 border-y border-gold-300/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-800 mb-2">Empieza aquí</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          ¿Qué necesitas formalizar?
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {INTENTS.map(({ id, label, href, checkout }) => (
            <div
              key={id}
              className="rounded-xl border border-gray-200 bg-white p-4 hover:border-gold-400/50 transition-colors"
            >
              <p className="font-semibold text-gray-900 text-sm">{label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={href}
                  onClick={() => track(id, 'info')}
                  className="text-xs font-semibold text-gold-800 hover:text-gold-950 underline underline-offset-2"
                >
                  Qué incluye
                </Link>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <Link
                  href={checkout}
                  onClick={() => track(id, 'checkout')}
                  className="text-xs font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-2"
                >
                  Contratar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
