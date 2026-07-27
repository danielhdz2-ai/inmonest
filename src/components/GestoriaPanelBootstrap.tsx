'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/** Tras login/registro o pago Stripe: confirma sesión, vincula pedidos y refresca el panel */
export default function GestoriaPanelBootstrap() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const sessionId = params.get('session_id')
      const needsRefresh = params.get('pago') === '1' || params.get('lead') === '1' || Boolean(sessionId)

      if (sessionId?.startsWith('cs_')) {
        try {
          await fetch(`/api/gestoria/confirmar-pago?session_id=${encodeURIComponent(sessionId)}`)
        } catch {
          /* webhook puede haberlo guardado ya */
        }
      }

      try {
        await fetch('/api/gestoria/vincular-leads', { method: 'POST' })
      } catch {
        /* reintento en refresh */
      }

      if (cancelled || !needsRefresh) return

      router.refresh()

      // Segundo intento por si el webhook tarda unos segundos
      window.setTimeout(() => {
        if (!cancelled) router.refresh()
      }, 2500)
    }

    bootstrap()

    return () => {
      cancelled = true
    }
  }, [router, params])

  return null
}
