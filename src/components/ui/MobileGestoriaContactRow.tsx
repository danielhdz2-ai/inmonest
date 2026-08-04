import TrackedContactLink from '@/components/TrackedContactLink'

const WA = '34745022862'

type Props = {
  ciudadSlug?: string
  whatsappMessage?: string
  className?: string
}

export function MobileGestoriaContactRow({
  ciudadSlug = 'gestoria',
  whatsappMessage = 'Hola, necesito información sobre gestoría inmobiliaria',
  className = '',
}: Props) {
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className={`flex gap-2 lg:hidden ${className}`}>
      <TrackedContactLink
        event="click_phone"
        city={ciudadSlug}
        href="tel:+34745022862"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-semibold py-3 text-sm touch-manipulation min-h-[44px]"
      >
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Llamar
      </TrackedContactLink>
      <TrackedContactLink
        event="click_whatsapp"
        city={ciudadSlug}
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gold-400/60 bg-white/10 text-white font-semibold py-3 text-sm touch-manipulation min-h-[44px] backdrop-blur-sm"
      >
        WhatsApp
      </TrackedContactLink>
    </div>
  )
}
