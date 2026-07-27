'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/** Tras login/registro, vincula leads de gestoría por email y refresca si viene de pago */
export default function GestoriaPanelBootstrap() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    fetch('/api/gestoria/vincular-leads', { method: 'POST' })
      .then((res) => {
        if (!res.ok) return
        if (params.get('pago') === '1' || params.get('lead') === '1') {
          router.refresh()
        }
      })
      .catch(() => {})
  }, [router, params])

  return null
}
