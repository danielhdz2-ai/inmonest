'use client'

import { useEffect, useRef, useState } from 'react'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'

type Props = {
  onLoaded: (data: { contratos: GestoriaContrato[]; userDocs: GestoriaUserDoc[] }) => void
  userEmail: string
}

const MAX_ATTEMPTS = 4
const RETRY_MS = 500
const PANEL_URL = '/mi-cuenta/contratos?v=expediente'

function goToPanelClean() {
  window.location.replace(PANEL_URL)
}

/**
 * Tras Stripe (?pago=1): vincula el pedido y entra al panel.
 * Nunca deja al cliente atrapado en esta pantalla.
 */
export default function GestoriaExpedienteActivador({ onLoaded, userEmail }: Props) {
  const [attempt, setAttempt] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const onLoadedRef = useRef(onLoaded)
  onLoadedRef.current = onLoaded
  const finishedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function activate(n: number) {
      if (finishedRef.current || cancelled) return

      const params = new URLSearchParams(window.location.search)
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

      try {
        const qs = sessionId?.startsWith('cs_')
          ? `?session_id=${encodeURIComponent(sessionId)}`
          : ''
        const res = await fetch(`/api/gestoria/mis-pedidos${qs}`, { cache: 'no-store' })
        const data = (await res.json().catch(() => ({}))) as {
          contratos?: GestoriaContrato[]
          userDocs?: GestoriaUserDoc[]
          error?: string
        }

        if (!res.ok) {
          throw new Error(data.error ?? `Error ${res.status}`)
        }

        if (!cancelled && data.contratos && data.contratos.length > 0) {
          finishedRef.current = true
          onLoadedRef.current({
            contratos: data.contratos,
            userDocs: data.userDocs ?? [],
          })
          goToPanelClean()
          return
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'No se pudo cargar el expediente')
        }
      }

      if (cancelled || finishedRef.current) return

      if (n + 1 < MAX_ATTEMPTS) {
        setAttempt(n + 1)
        window.setTimeout(() => {
          if (!cancelled) void activate(n + 1)
        }, RETRY_MS)
      } else {
        // Último recurso: entrar al panel limpio (sin ?pago=1) para no ciclar
        finishedRef.current = true
        goToPanelClean()
      }
    }

    void activate(0)

    return () => {
      cancelled = true
    }
  }, [userEmail])

  return (
    <div className="bg-white rounded-2xl border border-gold-300/60 p-8 text-center space-y-4 shadow-lg">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-100 text-3xl animate-pulse">
        ⚡
      </div>
      <h2 className="text-lg font-bold text-gray-900">Abriendo tu panel…</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Un momento, estamos cargando el expediente de{' '}
        <strong className="text-gray-700">{userEmail}</strong>
        {attempt > 0 && ` · ${attempt + 1}/${MAX_ATTEMPTS}`}
      </p>
      <div className="h-1.5 max-w-xs mx-auto rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-[#f4d98a] transition-all duration-300"
          style={{ width: `${Math.min(100, ((attempt + 1) / MAX_ATTEMPTS) * 100)}%` }}
        />
      </div>
      {error && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <button
        type="button"
        onClick={goToPanelClean}
        className="block w-full max-w-xs mx-auto bg-gold-500 text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px]"
      >
        Ir al panel ahora
      </button>
    </div>
  )
}
