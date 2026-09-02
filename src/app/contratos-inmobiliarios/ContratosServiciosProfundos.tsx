import Image from 'next/image'
import Link from 'next/link'
import { CONTRATOS_SERVICIOS_PROFUNDOS } from '@/lib/contratos-inmobiliarios-secciones'
import { BadgeCheck, CheckCircle } from '@/components/ui/Icons'

export default function ContratosServiciosProfundos() {
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <div className="mb-4 text-center sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
            Servicios especializados
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Arras, alquiler y acompañamiento de compra
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
            Tres servicios pensados para particulares que operan sin agencia y quieren la misma
            seguridad jurídica que un despacho, con precio cerrado y panel de seguimiento.
          </p>
        </div>
      </div>

      {CONTRATOS_SERVICIOS_PROFUNDOS.map((s, index) => (
        <article
          key={s.id}
          className={`border-t border-gray-100 px-4 py-14 sm:py-16 ${index % 2 === 1 ? 'bg-cream-50' : 'bg-white'}`}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className={s.invertido ? 'lg:order-2' : ''}>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
                {s.kicker}
              </span>
              <h3 className="mt-2 mb-4 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl">
                {s.titulo}
              </h3>
              <p className="mb-5 leading-relaxed text-gray-600">{s.intro}</p>
              <ul className="mb-5 space-y-2.5">
                {s.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">{s.extra}</p>

              <div className="mb-6 inline-flex flex-col rounded-2xl border border-gold-200 bg-[#fdfbf5] px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    {s.precioNota ?? 'Precio cerrado'}
                  </p>
                  <p className="text-3xl font-extrabold text-gold-600">
                    {s.precio} €
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <BadgeCheck className="h-4 w-4 text-gold-600" />
                  Entrega habitual 48 h · revisiones incluidas
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={s.ctaHref}
                  className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-gold-600"
                >
                  {s.ctaLabel} →
                </Link>
                {s.ctaSecundarioHref && s.ctaSecundarioLabel && (
                  <Link
                    href={s.ctaSecundarioHref}
                    className="rounded-xl border border-gold-300 bg-white px-6 py-3 text-sm font-bold text-gold-700 transition hover:bg-gold-50"
                  >
                    {s.ctaSecundarioLabel}
                  </Link>
                )}
              </div>
            </div>

            <div className={`relative ${s.invertido ? 'lg:order-1' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={s.imagen}
                  alt={s.imagenAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    Inmonest Gestoría
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{s.kicker}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Redacción profesional · panel de seguimiento · toda España
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
