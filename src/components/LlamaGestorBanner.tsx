type LlamaGestorBannerProps = {
  ciudad?: string
  gestorNombre?: string
  whatsappMessage?: string
  variant?: 'full' | 'strip' | 'dark'
  title?: string
  subtitle?: string
}

const PHONE_DISPLAY = '745 022 862'
const PHONE_HREF = 'tel:+34745022862'
const WA_NUMBER = '34745022862'

const PHONE_BTN =
  'inline-flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition shadow-lg'

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  )
}

export default function LlamaGestorBanner({
  ciudad,
  gestorNombre,
  whatsappMessage = 'Hola, necesito información sobre gestoría inmobiliaria',
  variant = 'full',
  title,
  subtitle,
}: LlamaGestorBannerProps) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
  const defaultTitle = gestorNombre
    ? `Llama a ${gestorNombre}, tu gestor${ciudad ? ` en ${ciudad}` : ''}`
    : `Llama a tu gestor inmobiliario${ciudad ? ` en ${ciudad}` : ''} ahora`
  const defaultSubtitle =
    'Te explicamos el proceso, resolvemos dudas y te informamos sin compromiso. Tú decides si contratas.'

  if (variant === 'strip') {
    return (
      <section className="py-6 px-4 bg-gradient-to-r from-[#c9962a] to-[#a87a20] shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25 backdrop-blur animate-pulse shrink-0">
              <PhoneIcon className="w-7 h-7 text-white" />
            </span>
            <div>
              <p className="font-bold text-lg md:text-xl">{title ?? '¿Dudas? Habla con un gestor ahora'}</p>
              <p className="text-white/85 text-sm">{subtitle ?? 'Respuesta en horario laboral · Asignación en 24h'}</p>
            </div>
          </div>
          <a
            href={PHONE_HREF}
            className={`${PHONE_BTN} gap-3 px-8 py-4 rounded-xl font-black text-2xl shadow-2xl shrink-0`}
          >
            <PhoneIcon className="w-7 h-7" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    )
  }

  if (variant === 'dark') {
    return (
      <section className="py-14 px-4 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            Gestores disponibles ahora
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title ?? defaultTitle}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtitle ?? defaultSubtitle}</p>
          <a
            href={PHONE_HREF}
            className={`${PHONE_BTN} gap-4 px-10 py-6 rounded-2xl font-black text-3xl md:text-4xl shadow-2xl hover:scale-[1.02] active:scale-[0.98]`}
          >
            <PhoneIcon className="w-10 h-10" />
            {PHONE_DISPLAY}
          </a>
          <p className="mt-4 text-white/80 text-sm">L-V 9:00–19:00 · S 10:00–14:00</p>
          <div className="mt-6">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
            >
              O escríbenos por WhatsApp →
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-[#c9962a] to-[#a87a20]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border-4 border-[#f4c94a]/50">
          <div className="text-center mb-6">
            <span className="inline-block text-5xl mb-3">📞</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              {title ?? defaultTitle}
            </h2>
            <p className="text-gray-600 text-lg">{subtitle ?? defaultSubtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_HREF}
              className={`${PHONE_BTN} gap-3 px-8 py-5 rounded-xl font-black text-2xl md:text-3xl shadow-xl flex-1 sm:flex-none`}
            >
              <PhoneIcon className="w-8 h-8" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-green-600 transition shadow-xl flex-1 sm:flex-none"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Lunes a Viernes 9:00–19:00 · Sábados 10:00–14:00
          </p>
        </div>
      </div>
    </section>
  )
}
