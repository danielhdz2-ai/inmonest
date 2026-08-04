'use client'

import TrackedContactLink from '@/components/TrackedContactLink'

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

export default function StickyMobileContratoCta({
  ciudad,
  ciudadSlug,
  servicio,
  whatsappMessage,
}: Props) {
  const waText = encodeURIComponent(whatsappMessage ?? defaultWa(servicio, ciudad))

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      role="navigation"
      aria-label="Contactar gestor"
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <TrackedContactLink
          event="click_phone"
          city={ciudadSlug}
          href="tel:+34745022862"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 hover:bg-gold-700 active:bg-green-800 text-white font-bold py-3.5 text-sm"
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
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] hover:bg-[#1ebe5d] active:bg-[#1aae54] text-white font-bold py-3.5 text-sm"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          WhatsApp
        </TrackedContactLink>
      </div>
    </div>
  )
}
