import Link from 'next/link'
import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-gold-600 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <GestoriaImageBanner imageSrc={imageSrc} imageAlt={imageAlt} imagePosition="right" size="lg">
        <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-gold-500/30 uppercase tracking-widest">
          {badge}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-snug max-w-2xl">
          {title}
        </h1>
        <p className="text-white/75 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">{lead}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          <span className="text-3xl font-bold text-gold-400">{precio}€</span>
          <span className="text-white/50 text-xs">{precioSuffix}</span>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
          <Link
            href={solicitarHref}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
          >
            {solicitarLabel ?? `Contratar — ${precio}€`}
          </Link>
          <a
            href="#gestor-daniel"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Hablar con Daniel
          </a>
        </div>
        {footnote && <div className="text-sm text-white/60">{footnote}</div>}
      </GestoriaImageBanner>
    </div>
  )
}
