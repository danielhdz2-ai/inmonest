/**
 * Service Worker para Notificaciones Push
 * Maneja push notifications en segundo plano
 */

/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

// ── Instalación del Service Worker ────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Instalado')
  self.skipWaiting()
})

// ── Activación del Service Worker ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activado')
  event.waitUntil(self.clients.claim())
})

// ── Recibir Push Notification ─────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  
  const options: NotificationOptions = {
    body: data.body || 'Tienes una nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: data.tag || 'inmonest-notification',
    data: {
      url: data.url || '/',
      ...data,
    },
    requireInteraction: data.requireInteraction || false,
    vibrate: [200, 100, 200],
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Inmonest', options)
  )
})

// ── Click en Notificación ──────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si ya hay una ventana abierta, enfocarla y navegar
      for (const client of clientList) {
        if (client.url === new URL(urlToOpen, self.location.origin).href && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Si no hay ventana abierta, abrir nueva
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen)
      }
    })
  )
})

// ── Push Subscription Change ───────────────────────────────────────────────
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[SW] Push subscription cambió')
  
  event.waitUntil(
    // Re-suscribirse con nuevas credenciales
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        // Enviar nueva suscripción al servidor
        return fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        })
      })
  )
})

export {}
