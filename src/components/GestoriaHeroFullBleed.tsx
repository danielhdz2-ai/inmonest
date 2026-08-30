import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export type GestoriaHeroBreadcrumb = {
  label: string
  href?: string
}

type GestoriaHeroFullBleedProps = {
  imageSrc: string
  imageAlt: string
  breadcrumbs?: GestoriaHeroBreadcrumb[]
  className?: string
  children: React.ReactNode
}

export default function GestoriaHeroFullBleed({
  imageSrc,
  imageAlt,
  breadcrumbs,
  className,
  children,
}: GestoriaHeroFullBleedProps) {
  return (
    <section className={cn('relative overflow-hidden text-white', className)}>
      <div className="relative flex min-h-[520px] items-center sm:min-h-[580px] lg:min-h-[640px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:mb-8"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
