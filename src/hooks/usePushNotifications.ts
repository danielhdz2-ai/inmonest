/**
 * Hook para gestionar suscripciones a notificaciones push
 * Solicita permiso, registra Service Worker y gestiona suscripciones
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

export type PushPermission = 'default' | 'granted' | 'denied'

export interface UsePushNotificationsReturn {
  permission: PushPermission
  isSupported: boolean
  isSubscribed: boolean
  isLoading: boolean
  error: string | null
  requestPermission: () => Promise<boolean>
  subscribe: () => Promise<boolean>
  unsubscribe: () => Promise<boolean>
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const [permission, setPermission] = useState<PushPermission>('default')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verificar si el navegador soporta Push Notifications
  const isSupported =
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window

  // ── Inicialización: verificar estado actual ───────────────────────────────
  useEffect(() => {
    if (!isSupported) return

    // Obtener permiso actual
    setPermission(Notification.permission)

    // Verificar si ya está suscrito
    navigator.serviceWorker.ready
      .then((registration) => registration.pushManager.getSubscription())
      .then((subscription) => {
        setIsSubscribed(!!subscription)
      })
      .catch((err) => {
        console.error('[Push] Error verificando suscripción:', err)
      })
  }, [isSupported])

  // ── Solicitar permiso de notificaciones ───────────────────────────────────
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Las notificaciones push no están soportadas')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (err) {
      setError('Error solicitando permiso')
      console.error('[Push] Error:', err)
      return false
    }
  }, [isSupported])

  // ── Suscribirse a notificaciones push ─────────────────────────────────────
  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Las notificaciones push no están soportadas')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      // 1. Solicitar permiso si no está granted
      if (permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) {
          setError('Permiso denegado')
          return false
        }
      }

      // 2. Registrar Service Worker
      const registration = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      // 3. Obtener VAPID public key del env
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        throw new Error('VAPID public key no configurada')
      }

      // 4. Suscribirse a Push Manager
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      })

      // 5. Enviar suscripción al servidor
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      })

      if (!res.ok) {
        throw new Error('Error guardando suscripción en servidor')
      }

      setIsSubscribed(true)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      console.error('[Push] Error suscribiéndose:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isSupported, permission, requestPermission])

  // ── Desuscribirse de notificaciones push ──────────────────────────────────
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false

    setIsLoading(true)
    setError(null)

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (!subscription) {
        setIsSubscribed(false)
        return true
      }

      // 1. Desuscribir del navegador
      await subscription.unsubscribe()

      // 2. Eliminar del servidor
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      })

      setIsSubscribed(false)
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      console.error('[Push] Error desuscribiéndose:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isSupported])

  return {
    permission,
    isSupported,
    isSubscribed,
    isLoading,
    error,
    requestPermission,
    subscribe,
    unsubscribe,
  }
}

// ── Utilidades ─────────────────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}
