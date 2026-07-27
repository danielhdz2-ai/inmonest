'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'

type Props = {
  onLoaded: (data: { contratos: GestoriaContrato[]; userDocs: GestoriaUserDoc[] }) => void
  userEmail: string
}

/**
 * Tras el pago, vincula el pedido al usuario y reintenta hasta cargar el expediente.
 * Evita quedarse bloqueado en "Vinculando tu pago…"
 */
export default function GestoriaExpedienteActivador({ onLoaded, userEmail }: Props) {
  const router = useRouter()
  const [attempt, setAttempt] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    async function activate() {
      const params = new URLSearchParams(window.location.search)
      const sessionId = params.get('session_id')

      if (sessionId?.startsWith('cs_')) {
        try {
          await fetch(`/api/gestoria/confirmar-pago?session_id=${encodeURIComponent(sessionId)}`)
        } catch {
          /* ok */
        }
      }

      try {
        await fetch('/api/gestoria/vincular-leads', { method: 'POST' })
      } catch {
        /* ok */
      }

      try {
        const res = await fetch('/api/gestoria/mis-pedidos', { cache: 'no-store' })
        if (!res.ok) {
          const body = await res.json().catch(() => ({})) as { error?: string }
          throw new Error(body.error ?? `Error ${res.status}`)
        }
        const data = await res.json() as { contratos?: GestoriaContrato[]; userDocs?: GestoriaUserDoc[] }
        if (!cancelled && data.contratos && data.contratos.length > 0) {
          onLoaded({ contratos: data.contratos, userDocs: data.userDocs ?? [] })
          router.refresh()
          return
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'No se pudo cargar el expediente')
        }
      }

      if (!cancelled && attempt < 12) {
        setAttempt((a) => a + 1)
        timer = setTimeout(() => {
          router.refresh()
        }, 2000)
      }
    }

    activate()

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [attempt, onLoaded, router, userEmail])

  return (
    <div className="bg-white rounded-2xl border border-[#e8d48a]/60 p-8 text-center space-y-4 shadow-lg">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef9e8] text-3xl animate-pulse">
        ⚡
      </div>
      <h2 className="text-lg font-bold text-gray-900">Preparando tu panel de gestoría</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Vinculando tu pago a <strong className="text-gray-700">{userEmail}</strong>
        {attempt > 0 && ` · intento ${attempt + 1}/13`}
      </p>
      <div className="h-1.5 max-w-xs mx-auto rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#c9962a] to-[#f4d98a] transition-all duration-500"
          style={{ width: `${Math.min(95, (attempt + 1) * 8)}%` }}
        />
      </div>
      {error && attempt >= 8 && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{error}</p>
      )}
      {attempt >= 12 && (
        <div className="space-y-3 pt-2">
          <p className="text-sm text-gray-600">
            Si el panel no carga, contacta con nosotros indicando tu email de pago.
          </p>
          <a
            href="mailto:info@inmonest.com?subject=Activar%20mi%20expediente%20gestor%C3%ADa"
            className="inline-block text-sm font-bold text-[#c9962a] underline"
          >
            info@inmonest.com
          </a>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="block w-full max-w-xs mx-auto bg-[#c9962a] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px] touch-manipulation"
          >
            Reintentar ahora
          </button>
        </div>
      )}
    </div>
  )
}
