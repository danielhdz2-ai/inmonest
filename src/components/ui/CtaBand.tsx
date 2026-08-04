import Image from 'next/image'
import { cn } from '@/lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'

type CtaBandProps = {
  eyebrow: string
  title: React.ReactNode
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  /** @deprecated Ambos tonos usan negro mate */
  tone?: 'warm' | 'forest'
  className?: string
}

export function CtaBand({
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
}: CtaBandProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-xl min-h-[280px] flex bg-black',
        className
      )}
    >
      {imagePosition === 'left' && (
        <div className="hidden lg:block relative w-[400px] shrink-0 order-first">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 py-12 flex-1">
        <Badge variant="dark" className="mb-5 w-fit normal-case tracking-wide">
          {eyebrow}
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">{title}</h2>
        <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed max-w-md">{description}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Button href={primaryHref} variant="primary" className="rounded-full">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button href={secondaryHref} variant="ghost" className="rounded-full">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>

      {imagePosition === 'right' && (
        <div className="hidden lg:block relative w-[400px] shrink-0">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>
      )}
    </div>
  )
}
