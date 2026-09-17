import { GESTORIA_TRAMITE_ONLINE_DESC, GESTORIA_TRAMITE_ONLINE_HERO } from '@/lib/gestoria-tramite-online'
import { cn } from '@/lib/cn'

type Props = {
  variant?: 'hero-dark' | 'hero-light' | 'banner' | 'section'
  className?: string
}

export default function GestoriaTramiteOnlineNote({ variant = 'section', className }: Props) {
  if (variant === 'hero-dark') {
    return (
      <p className={cn('text-sm text-white/70 leading-relaxed', className)}>
        <strong className="font-semibold text-white/90">Trámite 100% online</strong> — panel, gestor y firma digital
        desde casa. <strong className="font-semibold text-white/90">Sin desplazamientos</strong> a ninguna oficina.
      </p>
    )
  }

  if (variant === 'hero-light') {
    return <p className={cn('text-sm text-gray-600 leading-relaxed', className)}>{GESTORIA_TRAMITE_ONLINE_HERO}</p>
  }

  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'rounded-xl border border-gold-200/80 bg-cream-50/90 px-4 py-3 sm:px-5 sm:py-4 text-sm text-gray-700 leading-relaxed',
          className,
        )}
      >
        <strong className="text-gray-900">Trámite 100% online.</strong> {GESTORIA_TRAMITE_ONLINE_DESC}
      </div>
    )
  }

  return (
    <p className={cn('text-sm text-gray-600 leading-relaxed text-center max-w-2xl mx-auto', className)}>
      {GESTORIA_TRAMITE_ONLINE_DESC}
    </p>
  )
}
