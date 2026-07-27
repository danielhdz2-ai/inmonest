'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        },
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface Props {
  siteKey: string
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    return new Promise((resolve) => {
      if (window.turnstile) resolve()
      else existing.addEventListener('load', () => resolve(), { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar Turnstile'))
    document.head.appendChild(script)
  })
}

export default function TurnstileWidget({ siteKey, onVerify, onExpire, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onVerifyRef = useRef(onVerify)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onVerifyRef.current = onVerify
    onExpireRef.current = onExpire
    onErrorRef.current = onError
  })

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    let cancelled = false

    ;(async () => {
      try {
        await loadTurnstileScript()
        if (cancelled || !containerRef.current || !window.turnstile) return

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current?.(),
          'error-callback': () => onErrorRef.current?.(),
        })
      } catch {
        onErrorRef.current?.()
      }
    })()

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey])

  return <div ref={containerRef} className="flex justify-center min-h-[65px]" aria-hidden="false" />
}
