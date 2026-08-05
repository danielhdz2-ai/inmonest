import Image from 'next/image'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import {
  GESTORIA_PHONE_DISPLAY,
  GESTORIA_PHONE_TEL,
  GESTORIA_PHONE_WA,
} from '@/lib/gestoria-contact'
import type { GestorServicioCopy } from '@/lib/gestoria-servicio-template'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'

type GestorDanielSectionProps = {
  copy: GestorServicioCopy
  whatsappMessage: string
}

export default function GestorDanielSection({ copy, whatsappMessage }: GestorDanielSectionProps) {
  const waHref = `https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section id="gestor-daniel" className="scroll-mt-24 rounded-2xl bg-black py-14 px-6 sm:px-10">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
            Atención personalizada
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Un asesor experto en todo el proceso
          </h2>
          {copy.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-white/70 mb-4 leading-relaxed text-[1.02rem] [&_strong]:text-white [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>

        <div className="bg-white/[0.04] border border-gold-500/30 rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-4">
            Tu asesor asignado
          </p>
          <div className="flex gap-5 items-start mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold-500/50 ring-2 ring-gold-500/20">
              <Image
                src={GESTOR_DANIEL_HERNANDEZ.foto}
                alt={GESTOR_DANIEL_HERNANDEZ.nombre}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{GESTOR_DANIEL_HERNANDEZ.nombre}</h3>
              <p className="text-sm text-gold-400 font-medium mb-3">{copy.rol}</p>
              <p className="text-sm text-white/65 leading-relaxed">{copy.bio}</p>
            </div>
          </div>
          <ul className="space-y-2.5 mb-6">
            {copy.bullets.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                <GestoriaCheckIcon />
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
              className="inline-flex items-center justify-center rounded-full border border-gold-500/60 text-gold-400 px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Llamar — {GESTORIA_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
