'use client'

import { useEffect } from 'react'

export default function PwaServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      console.warn('[PWA] No se pudo registrar el service worker:', err)
    })
  }, [])

  return null
}
