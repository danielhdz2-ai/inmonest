'use client'

import { useEffect } from 'react'

/**
 * Elimina service workers legacy que cacheaban HTML/_next y rompían login y /mi-cuenta.
 * Push PWA queda desactivado hasta reimplementar sin interceptar navegación.
 */
export default function PwaServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    void (async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations()
        await Promise.all(regs.map((reg) => reg.unregister()))
        if ('caches' in window) {
          const keys = await caches.keys()
          await Promise.all(keys.map((key) => caches.delete(key)))
        }
      } catch (err) {
        console.warn('[PWA] Limpieza de service worker:', err)
      }
    })()
  }, [])

  return null
}
