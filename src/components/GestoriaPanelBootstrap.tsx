'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/** Al entrar al panel: vincula pedidos del email y refresca si hace falta */
export default function GestoriaPanelBootstrap() {
  const router = useRouter()
  const params = useSearchParams()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    let cancelled = false

    async function bootstrap() {
      const sessionId = params.get('session_id')

      if (sessionId?.startsWith('cs_')) {
        await Promise.allSettled([
          fetch(`/api/gestoria/confirmar-pago?session_id=${encodeURIComponent(sessionId)}`),
          fetch('/api/gestoria/vincular-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
          }),
        ])
      } else {
        await fetch('/api/gestoria/vincular-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        }).catch(() => null)
      }

      if (cancelled) return

      // Si venimos de pago, limpia la URL y refresca datos del servidor
      if (params.get('pago') === '1' || sessionId?.startsWith('cs_')) {
        const url = new URL(window.location.href)
        url.searchParams.delete('pago')
        url.searchParams.delete('session_id')
        if (!url.searchParams.get('v')) url.searchParams.set('v', 'expediente')
        window.history.replaceState({}, '', url.pathname + url.search)
        router.refresh()
      }
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [router, params])

  return null
}
