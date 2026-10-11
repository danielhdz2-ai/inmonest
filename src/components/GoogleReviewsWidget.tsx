'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Star } from '@/components/ui/Icons'
import type { GoogleReviewCard } from '@/lib/google-reviews-display'
import { GESTORIA_GOOGLE_AGGREGATE } from '@/lib/gestoria-reviews-schema'
import { GOOGLE_REVIEWS_LIST_URL } from '@/lib/google-business'

const AVATAR_COLORS = [
  'bg-orange-500',
  'bg-emerald-600',
  'bg-sky-600',
  'bg-violet-600',
  'bg-rose-500',
  'bg-amber-600',
  'bg-teal-600',
]

function avatarColor(initial: string): string {
  const code = initial.charCodeAt(0) + (initial.charCodeAt(1) ?? 0)
  return AVATAR_COLORS[code % AVATAR_COLORS.length]!
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

type Props = {
  reviews: GoogleReviewCard[]
  title?: string
}

export default function GoogleReviewsWidget({
  reviews,
  title = 'Opiniones de nuestros clientes',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(dir: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-review-card]')
    const step = card ? card.offsetWidth + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center tracking-tight mb-10">
        {title}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
        <div className="lg:w-52 shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left lg:pt-2">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-900">EXCELENTE</p>
          <div className="flex gap-0.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-7 h-7 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-600">
            A base de{' '}
            <span className="font-semibold text-gray-900 underline decoration-gray-300 underline-offset-2">
              {GESTORIA_GOOGLE_AGGREGATE.reviewCount} reseñas
            </span>
          </p>
          <GoogleG className="w-20 h-20 mt-4 mx-auto lg:mx-0" />
          <Link
            href={GOOGLE_REVIEWS_LIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs font-semibold text-gold-700 hover:text-gold-900"
          >
            Ver en Google →
          </Link>
        </div>

        <div className="relative flex-1 min-w-0">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <article
                key={`${r.author}-${r.dateLabel}`}
                data-review-card
                className="snap-start shrink-0 w-[min(100%,320px)] sm:w-[300px] rounded-xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${avatarColor(r.initial)}`}
                    >
                      {r.initial.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{r.author}</p>
                      <p className="text-xs text-gray-500">{r.dateLabel || r.time}</p>
                    </div>
                  </div>
                  <GoogleG className="w-5 h-5 shrink-0 opacity-90" />
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="ml-1 text-blue-500" title="Reseña en Google" aria-hidden>
                    ✓
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">&ldquo;{r.text}&rdquo;</p>
                <Link
                  href="/opiniones"
                  className="inline-block mt-3 text-xs font-medium text-gray-500 hover:text-gray-900"
                >
                  Leer más
                </Link>
              </article>
            ))}
          </div>

          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Reseña anterior"
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:bg-gray-50"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Siguiente reseña"
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:bg-gray-50"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
        <Link
          href="/opiniones"
          className="font-semibold text-gold-700 hover:text-gold-900 underline underline-offset-2"
        >
          Todas las opiniones en Inmonest
        </Link>
        <Link
          href="/gestoria/solicitar"
          className="rounded-full bg-gold-500 text-white font-semibold px-5 py-2.5 hover:bg-gold-600 transition-colors"
        >
          Contratar gestoría
        </Link>
      </div>
    </div>
  )
}
