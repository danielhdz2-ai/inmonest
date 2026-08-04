'use client'

import TrackedContactLink from '@/components/TrackedContactLink'
import { mobileNavBottom } from '@/lib/mobile-app-layout'

type Servicio = 'alquiler' | 'arras' | 'gestoria' | 'due-diligence'

type Props = {
  ciudad: string
  ciudadSlug: string
  servicio: Servicio
  whatsappMessage?: string
}

const WA = '34745022862'

function defaultWa(servicio: Servicio, ciudad: string) {
  switch (servicio) {
    case 'alquiler':
      return `Hola, necesito info sobre el contrato de alquiler en ${ciudad}`
    case 'arras':
      return `Hola, necesito info sobre el contrato de arras en ${ciudad}`
    case 'due-diligence':
      return `Hola, firmé arras y necesito due diligence pre-compra en ${ciudad}`
    default:
      return `Hola, necesito gestoría inmobiliaria en ${ciudad}`
  }
}

/** Barra fija encima del nav inferior tipo app (no lo tapa). */
export default function StickyMobileContratoCta({
  ciudad,
  ciudadSlug,
  servicio,
  whatsappMessage,
}: Props) {
  const waText = encodeURIComponent(whatsappMessage ?? defaultWa(servicio, ciudad))

  return (
    <div
      className="lg:hidden fixed inset-x-0 z-[54] border-t border-gold-500/20 bg-forest-950/95 backdrop-blur-md px-3 pt-2 pb-2 shadow-[0_-4px_24px_rgba(0,0,0,0.25)]"
      style={{ bottom: mobileNavBottom }}
      role="navigation"
      aria-label="Contactar gestor"
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <TrackedContactLink
          event="click_phone"
          city={ciudadSlug}
          href="tel:+34745022862"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 hover:bg-gold-700 active:bg-gold-800 text-white font-bold py-3 text-sm min-h-[44px] touch-manipulation"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Llamar
        </TrackedContactLink>
        <TrackedContactLink
          event="click_whatsapp"
          city={ciudadSlug}
          href={`https://wa.me/${WA}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500/20 border border-gold-400/50 hover:bg-gold-500/30 text-gold-200 font-bold py-3 text-sm min-h-[44px] touch-manipulation"
        >
          WhatsApp
        </TrackedContactLink>
      </div>
    </div>
  )
}
