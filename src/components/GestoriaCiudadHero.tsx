import Link from 'next/link'
import GestoriaHeroFullBleed from '@/components/GestoriaHeroFullBleed'

export type GestoriaBreadcrumb = {
  label: string
  href?: string
}

type GestoriaCiudadHeroProps = {
  breadcrumbs: GestoriaBreadcrumb[]
  badge: string
  title: string
  lead: string
  precio: number
  precioSuffix?: string
  imageSrc: string
  imageAlt: string
  solicitarHref: string
  solicitarLabel?: string
  footnote?: React.ReactNode
}

export default function GestoriaCiudadHero({
  breadcrumbs,
  badge,
  title,
  lead,
  precio,
  precioSuffix = 'IVA incluido',
  imageSrc,
  imageAlt,
  solicitarHref,
  solicitarLabel,
  footnote,
}: GestoriaCiudadHeroProps) {
  return (
    <GestoriaHeroFullBleed imageSrc={imageSrc} imageAlt={imageAlt} breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl">
        <span className="mb-5 inline-block rounded-full border border-gold-400/40 bg-gold-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-200">
          {badge}
        </span>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{lead}</p>
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-3xl font-bold text-gold-400 sm:text-4xl">{precio}€</span>
          <span className="text-xs text-white/55">{precioSuffix}</span>
        </div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={solicitarHref}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold text-forest-900 shadow-lg shadow-black/30 transition hover:bg-gold-400"
          >
            {solicitarLabel ?? `Contratar — ${precio}€`}
          </Link>
          <a
            href="#gestor-daniel"
            className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Hablar con Daniel
          </a>
        </div>
        {footnote && <div className="text-sm text-white/65">{footnote}</div>}
      </div>
    </GestoriaHeroFullBleed>
  )
}
