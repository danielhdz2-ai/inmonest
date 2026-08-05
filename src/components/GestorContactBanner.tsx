import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_LLAMADA_BANNER } from '@/lib/gestoria-images'
import { GESTORIA_PHONE_DISPLAY, GESTORIA_PHONE_TEL } from '@/lib/gestoria-contact'

type GestorContactBannerProps = {
  whatsappMessage?: string
  title?: string
  subtitle?: string
  imagePosition?: 'left' | 'right'
}

const WA_NUMBER = '34745022862'

export default function GestorContactBanner({
  whatsappMessage = 'Hola, necesito información sobre gestoría inmobiliaria',
  title = 'Habla con tu gestoría inmobiliaria',
  subtitle = 'Te explicamos el proceso, resolvemos dudas y te informamos sin compromiso. Lunes a viernes 9:00–19:00.',
  imagePosition = 'left',
}: GestorContactBannerProps) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <GestoriaImageBanner
          imageSrc={GESTORIA_LLAMADA_BANNER.src}
          imageAlt={GESTORIA_LLAMADA_BANNER.alt}
          imagePosition={imagePosition}
          size="md"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            Gestoría Inmonest
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">{title}</h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">{subtitle}</p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={GESTORIA_PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              Llamar — {GESTORIA_PHONE_DISPLAY}
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
        </GestoriaImageBanner>
      </div>
    </section>
  )
}
