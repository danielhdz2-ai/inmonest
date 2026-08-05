import Image from 'next/image'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import {
  GESTORIA_PHONE_DISPLAY,
  GESTORIA_PHONE_TEL,
  GESTORIA_PHONE_WA,
} from '@/lib/gestoria-contact'
import type { GestorServicioCopy } from '@/lib/gestoria-servicio-template'

type GestorDanielSectionProps = {
  copy: GestorServicioCopy
  whatsappMessage: string
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function GestorDanielSection({ copy, whatsappMessage }: GestorDanielSectionProps) {
  const waHref = `https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section className="py-4">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Un asesor experto en todo el proceso
          </h2>
          {copy.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-gray-600 mb-4 leading-relaxed text-[1.02rem]"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>

        <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Tu asesor asignado
          </p>
          <div className="flex gap-5 items-start mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold-500/30">
              <Image
                src={GESTOR_DANIEL_HERNANDEZ.foto}
                alt={GESTOR_DANIEL_HERNANDEZ.nombre}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{GESTOR_DANIEL_HERNANDEZ.nombre}</h3>
              <p className="text-sm text-gold-700 font-medium mb-3">{copy.rol}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{copy.bio}</p>
            </div>
          </div>
          <ul className="space-y-2 mb-6">
            {copy.bullets.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              WhatsApp con Daniel
            </a>
            <a
              href={GESTORIA_PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full border border-gold-500 text-gold-600 px-5 py-2.5 text-sm font-semibold hover:bg-cream-100 transition-colors"
            >
              Llamar — {GESTORIA_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
