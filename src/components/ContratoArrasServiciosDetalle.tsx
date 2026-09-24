import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from '@/components/ui/Icons'
import {
  getArrasContratoServicioMeta,
  type ArrasContratoModuloVariant,
} from '@/lib/arras-contrato-servicio-registry'

type Props = {
  variant?: ArrasContratoModuloVariant
  ciudadNombre: string
  solicitarHref: string
}

export default function ContratoArrasServiciosDetalle({
  variant = 'penitenciales',
  ciudadNombre,
  solicitarHref,
}: Props) {
  const meta = getArrasContratoServicioMeta(variant)

  return (
    <section
      className="border-t border-gray-100 bg-white"
      aria-labelledby="arras-servicios-titulo"
      id={meta.sectionId}
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">{meta.eyebrow}</span>
          <h2 id="arras-servicios-titulo" className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {meta.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Mismo servicio en {ciudadNombre} y en toda España: {meta.precio} € IVA incluido, {meta.introSuffix}
          </p>
          <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border-2 border-gold-300 bg-[#fdfbf5] px-8 py-4 shadow-sm sm:flex-row sm:gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                Tarifa plana · IVA incluido
              </p>
              <p className="text-4xl font-extrabold text-gold-600">{meta.precio} €</p>
            </div>
            <p className="max-w-xs text-sm text-gray-600">
              Sin comisión sobre el precio del piso. Trámite 100 % online con gestor real.
            </p>
          </div>
        </div>

        <nav aria-label="Pasos del contrato de arras" className="mb-10 flex flex-wrap justify-center gap-2">
          {meta.nav.map((item) => (
            <a
              key={item.id}
              href={`#${meta.idPrefix}-${item.id}`}
              className="rounded-full border border-gold-200 bg-cream-50 px-3 py-1.5 text-xs font-semibold text-gold-800 transition hover:border-gold-400 hover:bg-gold-50 sm:px-4 sm:py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {meta.bloques.map((bloque, index) => (
        <article
          key={bloque.id}
          id={`${meta.idPrefix}-${bloque.id}`}
          className={`scroll-mt-24 border-t border-gray-200 px-4 py-16 sm:py-20 ${index % 2 === 1 ? 'bg-cream-50' : 'bg-white'}`}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className={bloque.invertido ? 'lg:order-2' : ''}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700">{bloque.kicker}</span>
              </div>
              <h3 className="mb-4 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl">{bloque.titulo}</h3>
              <p className="mb-6 leading-relaxed text-gray-600">{bloque.intro}</p>

              <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-600">Cómo lo hacemos</p>
                <ol className="space-y-3">
                  {bloque.pasos.map((paso, i) => (
                    <li key={paso} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="space-y-2.5">
                {bloque.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`relative lg:sticky lg:top-24 ${bloque.invertido ? 'lg:order-1' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                <Image
                  src={bloque.imagen}
                  alt={`${bloque.imagenAlt} — ${ciudadNombre}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
                <div className="absolute top-4 right-4 rounded-xl bg-gold-500 px-4 py-2 shadow-lg">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Incluido</p>
                  <p className="text-lg font-extrabold text-white">{meta.precio} €</p>
                </div>
                <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    {meta.overlayProductLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{bloque.kicker}</p>
                  <p className="mt-1 text-xs text-gray-600">{ciudadNombre} · 100 % online · gestor asignado</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      <div className="border-t border-gray-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-gray-600">
            ¿Listo para blindar las arras en {ciudadNombre}? Contrata online y tu gestor empieza en 24 h.
          </p>
          <Link
            href={solicitarHref}
            className="inline-block rounded-xl bg-gold-500 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold-600"
          >
            {meta.ctaLabel} — {meta.precio} € →
          </Link>
        </div>
      </div>
    </section>
  )
}
