'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import PortalContratosComprar from '@/components/gestoria-portal/PortalContratosComprar'
import GestoriaPortalClientSuspense from '@/components/gestoria-portal/GestoriaPortalClientSuspense'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'

function ContratosLoadingState({ label }: { label: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}

function ContratosGateInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')?.startsWith('cs_')
    ? searchParams.get('session_id')
    : null

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contratos, setContratos] = useState<GestoriaContrato[]>([])
  const [userDocs, setUserDocs] = useState<GestoriaUserDoc[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [displayName, setDisplayName] = useState('Cliente')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const qs = sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : ''
        const res = await fetch(`/api/gestoria/mis-pedidos${qs}`, { cache: 'no-store' })

        if (res.status === 401) {
          const next = `/mi-cuenta/contratos${sessionId ? `?session_id=${sessionId}` : ''}`
          router.replace(`/login?next=${encodeURIComponent(next)}`)
          return
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || 'No se pudo cargar tu panel')
        }

        const data = await res.json()
        if (cancelled) return

        setContratos(data.contratos ?? [])
        setUserDocs(data.userDocs ?? [])
        setUserEmail(data.userEmail ?? '')
        setDisplayName(data.displayName ?? 'Cliente')
        setPhone(data.phone ?? '')
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar el panel')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [sessionId, router])

  if (loading) {
    return <ContratosLoadingState label="Cargando contratos…" />
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center space-y-4">
          <p className="text-lg font-bold text-gray-900">No se pudo cargar el panel</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full bg-gold-500 text-white font-bold py-3 rounded-xl min-h-[48px]"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (contratos.length === 0 && !sessionId) {
    return (
      <PortalContratosComprar
        userEmail={userEmail}
        displayName={displayName}
        initialPhone={phone}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-auto bg-[#eef0f2]">
      <GestoriaPortalClientSuspense
        contratos={contratos}
        userDocs={userDocs}
        userEmail={userEmail}
        displayName={displayName}
        initialSessionId={sessionId}
        initialPhone={phone}
      />
    </div>
  )
}

export default function ContratosGate() {
  return (
    <Suspense fallback={<ContratosLoadingState label="Cargando contratos…" />}>
      <ContratosGateInner />
    </Suspense>
  )
}
