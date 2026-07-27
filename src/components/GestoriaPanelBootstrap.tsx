'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

/** Tras login/registro, vincula leads de gestoría por email y limpia query params */
export default function GestoriaPanelBootstrap() {
  const params = useSearchParams()

  useEffect(() => {
    fetch('/api/gestoria/vincular-leads', { method: 'POST' }).catch(() => {})
  }, [])

  return null
}
