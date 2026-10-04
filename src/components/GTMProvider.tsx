'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCookieConsent } from '@/components/CookieConsentProvider'
import { CONSENT_UPDATED_EVENT, readConsentFromDocument } from '@/lib/cookie-consent'

// ── Typed dataLayer helper ────────────────────────────────────────────────────
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function gtmPush(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const stored = readConsentFromDocument()
  if (!stored?.decided || !stored.analytics) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}

// ── Inner component (uses useSearchParams — must be inside Suspense) ──────────
function GTMPageTracker() {
  const pathname    = usePathname()
  const searchParams = useSearchParams()
  const { analyticsAllowed } = useCookieConsent()

  useEffect(() => {
    if (!analyticsAllowed) return
    const qs   = searchParams.toString()
    const page = pathname + (qs ? `?${qs}` : '')
    gtmPush({ event: 'page_view', page_path: page, page_title: document.title })
  }, [pathname, searchParams, analyticsAllowed])

  useEffect(() => {
    const onConsent = () => {
      if (!readConsentFromDocument()?.analytics) return
      const qs = searchParams.toString()
      const page = pathname + (qs ? `?${qs}` : '')
      gtmPush({ event: 'page_view', page_path: page, page_title: document.title })
    }
    window.addEventListener(CONSENT_UPDATED_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsent)
  }, [pathname, searchParams])

  return null
}

// ── Public component — wrap tracker in Suspense as required by Next.js ────────
export default function GTMProvider() {
  return (
    <Suspense fallback={null}>
      <GTMPageTracker />
    </Suspense>
  )
}
