'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/** Tras pago Stripe: confirma sesión, vincula pedido y refresca el panel (rápido) */
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
          /* ok */
        }
        try {
          await fetch('/api/gestoria/vincular-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
          })
        } catch {
          /* ok */
        }
      } else {
        try {
          await fetch('/api/gestoria/vincular-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
          })
        } catch {
          /* ok */
        }
      }

      if (cancelled || !needsRefresh) return
      router.refresh()
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [router, params])

  return null
}
