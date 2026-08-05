import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_CUENTANOS_BANNER } from '@/lib/gestoria-images'
import { GESTORIA_PHONE_DISPLAY, GESTORIA_PHONE_TEL } from '@/lib/gestoria-contact'

type LlamaGestorBannerProps = {
  ciudad?: string
  gestorNombre?: string
  whatsappMessage?: string
  /** @deprecated Todos los variantes usan el banner boutique negro */
  variant?: 'full' | 'strip' | 'dark'
  title?: string
  subtitle?: string
  imagePosition?: 'left' | 'right'
  imageSrc?: string
  imageAlt?: string
  eyebrow?: string
  /** Sin botones cuando ya hay GestorDanielSection arriba (evita CTAs duplicados) */
  hideActions?: boolean
}

const WA_NUMBER = '34745022862'

export default function LlamaGestorBanner({
  ciudad,
  gestorNombre,
  whatsappMessage = 'Hola, necesito información sobre gestoría inmobiliaria',
  title,
  subtitle,
  imagePosition = 'right',
  imageSrc = GESTORIA_CUENTANOS_BANNER.src,
  imageAlt = GESTORIA_CUENTANOS_BANNER.alt,
  eyebrow,
  hideActions = false,
}: LlamaGestorBannerProps) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
  const defaultTitle = gestorNombre
    ? `Llama a ${gestorNombre}, tu gestor${ciudad ? ` en ${ciudad}` : ''}`
    : `Llama a tu gestor inmobiliario${ciudad ? ` en ${ciudad}` : ''}`
  const defaultSubtitle =
    'Te explicamos el proceso, resolvemos dudas y te informamos sin compromiso. Tú decides si contratas.'

  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <GestoriaImageBanner
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          imagePosition={imagePosition}
          size="md"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            {eyebrow ?? (ciudad ? `Gestoría · ${ciudad}` : 'Gestoría Inmonest')}
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug">
            {title ?? defaultTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
            {subtitle ?? defaultSubtitle}
          </p>
          {!hideActions && (
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={GESTORIA_PHONE_TEL}
                className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
              >
                Llamar a la gestoría — {GESTORIA_PHONE_DISPLAY}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          )}
        </GestoriaImageBanner>
      </div>
    </section>
  )
}
