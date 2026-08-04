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
  tone = 'forest',
  minHeight = 'min-h-[480px] sm:min-h-[560px]',
  className,
  priority = false,
}: PageHeroProps) {
  const overlay =
    tone === 'forest'
      ? 'from-forest-950/92 via-forest-950/75 to-forest-950/40'
      : 'from-forest-950/90 via-gold-900/30 to-transparent'

  return (
    <section className={cn('relative overflow-hidden flex items-center', minHeight, className)}>
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority={priority} sizes="100vw" />
      <div className={cn('absolute inset-0 bg-gradient-to-r', overlay)} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        {eyebrow && (
          <Badge variant="dark" className="mb-5 normal-case tracking-wide">
            {eyebrow}
          </Badge>
        )}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
