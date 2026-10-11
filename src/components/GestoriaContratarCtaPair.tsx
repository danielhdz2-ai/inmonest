import Link from 'next/link'
import {
  GESTORIA_NAV_SOLICITAR_LABEL_MOBILE,
  GESTORIA_SOLICITAR_HUB,
} from '@/lib/gestoria-nav'

type Variant = 'hero-dark' | 'hero-light' | 'stack' | 'inline'

type Props = {
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  variant?: Variant
  className?: string
}

const primaryClass: Record<Variant, string> = {
  'hero-dark':
    'inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm',
  'hero-light':
    'inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold text-forest-900 shadow-lg transition hover:bg-gold-400',
  stack:
    'block w-full text-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-4 rounded-xl transition-colors',
  inline:
    'inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-8 rounded-xl transition-colors text-sm',
}

const secondaryClass: Record<Variant, string> = {
  'hero-dark':
    'inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 font-semibold py-3 px-5 rounded-xl transition-colors text-sm',
  'hero-light':
    'inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15',
  stack:
    'block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm',
  inline:
    'inline-flex items-center justify-center border border-gold-400/60 text-gold-800 hover:bg-gold-50 font-semibold py-3 px-6 rounded-xl transition-colors text-sm bg-white',
}

export default function GestoriaContratarCtaPair({
  primaryHref,
  primaryLabel,
  secondaryHref = GESTORIA_SOLICITAR_HUB,
  secondaryLabel = GESTORIA_NAV_SOLICITAR_LABEL_MOBILE,
  variant = 'hero-dark',
  className = '',
}: Props) {
  const wrap =
    variant === 'stack'
      ? 'flex flex-col gap-2'
      : variant === 'inline'
        ? 'flex flex-wrap gap-3 justify-center'
        : 'flex flex-wrap gap-3'

  return (
    <div className={`${wrap} ${className}`}>
      <Link href={primaryHref} className={primaryClass[variant]}>
        {primaryLabel}
      </Link>
      <Link href={secondaryHref} className={secondaryClass[variant]}>
        {secondaryLabel}
      </Link>
    </div>
  )
}
