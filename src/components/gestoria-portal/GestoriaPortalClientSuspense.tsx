'use client'

import { Suspense } from 'react'
import GestoriaPortalClient from '@/components/gestoria-portal/GestoriaPortalClient'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'

type Props = {
  contratos: GestoriaContrato[]
  userDocs: GestoriaUserDoc[]
  userEmail: string
  displayName: string
  initialSessionId?: string | null
  initialPhone?: string
}

function PortalLoading() {
  return (
    <div className="min-h-screen bg-[#eef0f2] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
        <p className="text-sm text-gray-500">Cargando tu panel de gestoría…</p>
      </div>
    </div>
  )
}

export default function GestoriaPortalClientSuspense(props: Props) {
  return (
    <Suspense fallback={<PortalLoading />}>
      <GestoriaPortalClient {...props} />
    </Suspense>
  )
}
