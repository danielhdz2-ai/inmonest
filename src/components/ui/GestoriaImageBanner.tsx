import Image from 'next/image'
import { cn } from '@/lib/cn'

type GestoriaImageBannerProps = {
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  /** lg = hero · md = CTA · sm = franja intermedia */
  size?: 'lg' | 'md' | 'sm'
  className?: string
  children: React.ReactNode
}

const SIZE = {
  lg: 'min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]',
  md: 'min-h-[280px] sm:min-h-[320px]',
  sm: 'min-h-[220px] sm:min-h-[260px]',
} as const

const IMAGE_WIDTH = {
  lg: 'lg:w-[44%] xl:w-[480px]',
  md: 'lg:w-[38%] xl:w-[400px]',
  sm: 'lg:w-[36%] xl:w-[360px]',
} as const

export function GestoriaImageBanner({
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  size = 'md',
  className,
  children,
}: GestoriaImageBannerProps) {
  const gradientToContent =
    imagePosition === 'right'
      ? 'bg-gradient-to-r from-black via-black/55 to-transparent'
      : 'bg-gradient-to-l from-black via-black/55 to-transparent'

  const mobileGradient = 'bg-gradient-to-t from-black via-black/40 to-black/20'

  const imageBlock = (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden',
        IMAGE_WIDTH[size],
        size === 'lg' ? 'h-52 sm:h-64 lg:h-auto lg:min-h-full' : 'h-40 sm:h-48 lg:h-auto lg:min-h-full',
        imagePosition === 'left' ? 'order-first lg:order-first' : 'order-first lg:order-last',
      )}
    >
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 440px" />
      <div className={cn('absolute inset-0 lg:hidden', mobileGradient)} />
      <div className={cn('absolute inset-0 hidden lg:block', gradientToContent)} />
    </div>
  )

  return (
    <div
      className={cn(
        'relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-black shadow-xl',
        SIZE[size],
        className,
      )}
    >
      {imageBlock}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-7 sm:px-10 lg:px-14 py-9 sm:py-11 lg:py-12">
        {children}
      </div>
    </div>
  )
}

type GestoriaCtaBannerProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  className?: string
}

/** Banner boutique con imagen para CTAs finales (sustituye bloques negro plano) */
export function GestoriaCtaBanner({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  className,
}: GestoriaCtaBannerProps) {
  return (
    <GestoriaImageBanner
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imagePosition={imagePosition}
      size="md"
      className={className}
    >
      {eyebrow && (
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">{title}</h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">{description}</p>
      )}
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
        <a
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
        >
          {primaryLabel}
        </a>
        {secondaryHref && secondaryLabel && (
          <a
            href={secondaryHref}
            target={secondaryHref.startsWith('http') ? '_blank' : undefined}
            rel={secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </GestoriaImageBanner>
  )
}
