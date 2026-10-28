'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { INMONEST_NORMATIVA_BANNER_SLIDES } from '@/lib/inmonest-normativa-banner-slides'

const SLIDES = INMONEST_NORMATIVA_BANNER_SLIDES
const ROTATE_MS = 9000

const HIDE_ON_PREFIXES = ['/login', '/registro', '/actualizar-contrasena', '/admin', '/auth/']

function shouldHideBanner(pathname: string | null): boolean {
  if (!pathname) return false
  return HIDE_ON_PREFIXES.some((p) => pathname === p || pathname.startsWith(p))
}

export default function InmonestNormativaBannerCarousel() {
  const pathname = usePathname()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused || shouldHideBanner(pathname)) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, ROTATE_MS)
    return () => window.clearInterval(t)
  }, [paused, pathname])

  if (shouldHideBanner(pathname)) return null

  const slide = SLIDES[index]!

  return (
    <div
      className="border-b border-gold-500/25 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white"
      role="region"
      aria-label="Avisos de normativa y servicios Inmonest"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl items-stretch gap-2 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
        <div className="hidden sm:flex shrink-0 items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300">
            <svg className="h-3.5 w-3.5 text-gold-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {slide.badge}
          </span>
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gold-400/90 sm:hidden mb-0.5">
            {slide.badge}
          </p>
          <p className="text-sm font-bold text-white leading-snug truncate sm:whitespace-normal">{slide.title}</p>
          <p className="text-xs text-white/75 leading-relaxed line-clamp-2 sm:line-clamp-none mt-0.5">
            {slide.lines.join(' ')}{' '}
            <Link href={slide.href} className="text-gold-400 underline underline-offset-2 hover:text-gold-300">
              {slide.linkLabel}
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-gold-300 transition-colors"
            aria-label="Aviso anterior"
          >
            ‹
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-1" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir al aviso ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-gold-300 transition-colors"
            aria-label="Siguiente aviso"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
