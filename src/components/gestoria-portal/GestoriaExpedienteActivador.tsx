'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'

type Props = {
  onLoaded: (data: { contratos: GestoriaContrato[]; userDocs: GestoriaUserDoc[] }) => void
  userEmail: string
}

const MAX_ATTEMPTS = 5
const RETRY_MS = 700

/**
 * Tras el pago: confirma, vincula y carga el expediente en pocos intentos rápidos.
 */
export default function GestoriaExpedienteActivador({ onLoaded, userEmail }: Props) {
  const router = useRouter()
  const [attempt, setAttempt] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [doneStuck, setDoneStuck] = useState(false)
  const onLoadedRef = useRef(onLoaded)
  onLoadedRef.current = onLoaded

  useEffect(() => {
    let cancelled = false

    async function activate(n: number) {
      const params = new URLSearchParams(window.location.search)
      const sessionId = params.get('session_id')

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

      try {
        const qs = sessionId?.startsWith('cs_')
          ? `?session_id=${encodeURIComponent(sessionId)}`
          : ''
        const res = await fetch(`/api/gestoria/mis-pedidos${qs}`, { cache: 'no-store' })
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(body.error ?? `Error ${res.status}`)
        }
        const data = (await res.json()) as {
          contratos?: GestoriaContrato[]
          userDocs?: GestoriaUserDoc[]
        }
        if (!cancelled && data.contratos && data.contratos.length > 0) {
          onLoadedRef.current({
            contratos: data.contratos,
            userDocs: data.userDocs ?? [],
          })
          // Limpia query de carga para no volver a este estado
          const url = new URL(window.location.href)
          url.searchParams.delete('pago')
          url.searchParams.set('v', 'expediente')
          window.history.replaceState({}, '', url.toString())
          router.refresh()
          return
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'No se pudo cargar el expediente')
        }
      }

      if (cancelled) return

      if (n + 1 < MAX_ATTEMPTS) {
        setAttempt(n + 1)
        window.setTimeout(() => {
          if (!cancelled) void activate(n + 1)
        }, RETRY_MS)
      } else {
        setDoneStuck(true)
        setAttempt(MAX_ATTEMPTS)
      }
    }

    void activate(0)

    return () => {
      cancelled = true
    }
  }, [router, userEmail])

  return (
    <div className="bg-white rounded-2xl border border-[#e8d48a]/60 p-8 text-center space-y-4 shadow-lg">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef9e8] text-3xl animate-pulse">
        ⚡
      </div>
      <h2 className="text-lg font-bold text-gray-900">Preparando tu panel de gestoría</h2>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Vinculando tu pago a <strong className="text-gray-700">{userEmail}</strong>
        {!doneStuck && attempt > 0 && ` · ${attempt + 1}/${MAX_ATTEMPTS}`}
      </p>
      <div className="h-1.5 max-w-xs mx-auto rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#c9962a] to-[#f4d98a] transition-all duration-300"
          style={{ width: `${Math.min(100, ((attempt + 1) / MAX_ATTEMPTS) * 100)}%` }}
        />
      </div>
      {error && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{error}</p>
      )}
      {doneStuck && (
        <div className="space-y-3 pt-2">
          <p className="text-sm text-gray-600">
            Tu pago está registrado. Abre el expediente o escríbenos con el email{' '}
            <strong>{userEmail}</strong>.
          </p>
          <button
            type="button"
            onClick={() => {
              const url = new URL(window.location.href)
              url.searchParams.delete('pago')
              url.searchParams.set('v', 'expediente')
              window.location.href = url.toString()
            }}
            className="block w-full max-w-xs mx-auto bg-[#c9962a] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px]"
          >
            Entrar al panel
          </button>
          <a
            href="mailto:info@inmonest.com?subject=Activar%20mi%20expediente"
            className="inline-block text-sm font-bold text-[#c9962a] underline"
          >
            info@inmonest.com
          </a>
        </div>
      )}
    </div>
  )
}
