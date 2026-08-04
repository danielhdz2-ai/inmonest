import Image from 'next/image'
import { cn } from '@/lib/cn'
import { Badge } from './Badge'

type PageHeroProps = {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
  /** @deprecated Todos los overlays usan negro mate */
  tone?: 'forest' | 'warm'
  minHeight?: string
  className?: string
  priority?: boolean
}

export function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  children,
  minHeight = 'min-h-0 py-14 sm:min-h-[480px] sm:py-20 lg:min-h-[560px]',
  className,
  priority = false,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden flex items-center', minHeight, className)}>
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority={priority} sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/25 sm:to-transparent" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        {eyebrow && (
          <Badge variant="dark" className="mb-5 normal-case tracking-wide">
            {eyebrow}
          </Badge>
        )}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-white/75 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-6 sm:mt-8">{children}</div>}
      </div>
    </section>
  )
}
