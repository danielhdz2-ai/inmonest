import Link from 'next/link'
import GestoriaHeroFullBleed from '@/components/GestoriaHeroFullBleed'
import type { CiudadHubConfig } from '@/lib/gestoria-ciudad-hub-data'

type GestoriaCiudadHubHeroProps = {
  config: CiudadHubConfig
  imageSrc: string
  imageAlt: string
  precioLau: number
  solicitarLauHref: string
}

export default function GestoriaCiudadHubHero({
  config,
  imageSrc,
  imageAlt,
  precioLau,
  solicitarLauHref,
}: GestoriaCiudadHubHeroProps) {
  const { nombre } = config

  return (
    <GestoriaHeroFullBleed
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      breadcrumbs={[
        { label: 'Inicio', href: '/' },
        { label: 'Gestoría', href: '/gestoria' },
        { label: nombre },
      ]}
    >
      <div className="max-w-3xl">
        <span className="mb-5 inline-block rounded-full border border-gold-400/40 bg-gold-500/20 px-4 py-1.5 text-xs font-semibold text-gold-200">
          {config.heroBadge}
        </span>
        <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
          Gestoría Inmobiliaria{' '}
          <span className="text-gold-300">{nombre}</span>
          <span className="block text-2xl font-bold text-white/90 sm:mt-2 sm:text-3xl">
            para Particulares
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
          {config.heroSubtitulo}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={solicitarLauHref}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold text-forest-900 shadow-lg shadow-black/30 transition hover:bg-gold-400"
          >
            Contrato alquiler desde {precioLau}€ →
          </Link>
          <Link
            href="/gestoria/solicitar/arras-penitenciales"
            className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Arras desde 145€
          </Link>
          <Link
            href="#servicios"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </GestoriaHeroFullBleed>
  )
}
