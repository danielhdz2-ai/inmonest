/**
 * Librería para enviar notificaciones push usando web-push
 * Utiliza VAPID keys para autenticación
 */

import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'

// Configurar VAPID keys
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn('⚠️ [Push] VAPID keys no configuradas. Notificaciones push deshabilitadas.')
} else {
  webpush.setVapidDetails(
    'mailto:alertas@inmonest.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

interface PushNotificationPayload {
  title: string
  body: string
  url?: string
  tag?: string
  requireInteraction?: boolean
  icon?: string
  badge?: string
}

/**
 * Enviar notificación push a un usuario específico
 */
export async function sendPushToUser(
  userId: string,
  payload: PushNotificationPayload
): Promise<{ success: number; failed: number }> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Push] Supabase no configurado')
    return { success: 0, failed: 0 }
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Obtener todas las suscripciones del usuario
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', userId)

  if (error || !subscriptions || subscriptions.length === 0) {
    console.log(`[Push] No hay suscripciones para usuario ${userId}`)
    return { success: 0, failed: 0 }
  }

  // Enviar notificación a cada dispositivo
  const results = await Promise.allSettled(
    subscriptions.map(async (sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      }

      try {
        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify(payload)
        )
        return { success: true }
      } catch (err) {
        console.error('[Push] Error enviando:', err)
        
        // Si la suscripción está expirada/inválida, eliminarla
        if (err && typeof err === 'object' && 'statusCode' in err) {
          const statusCode = (err as { statusCode: number }).statusCode
          if (statusCode === 404 || statusCode === 410) {
            await supabase
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint)
            console.log('[Push] Suscripción inválida eliminada')
          }
        }
        
        return { success: false }
      }
    })
  )

  const success = results.filter((r) => r.status === 'fulfilled' && r.value.success).length
  const failed = results.length - success

  return { success, failed }
}

/**
 * Enviar notificación push a múltiples usuarios
 */
export async function sendPushToUsers(
  userIds: string[],
  payload: PushNotificationPayload
): Promise<{ success: number; failed: number }> {
  const results = await Promise.allSettled(
    userIds.map((userId) => sendPushToUser(userId, payload))
  )

  const totals = results.reduce(
    (acc, r) => {
      if (r.status === 'fulfilled') {
        acc.success += r.value.success
        acc.failed += r.value.failed
      } else {
        acc.failed += 1
      }
      return acc
    },
    { success: 0, failed: 0 }
  )

  return totals
}

/**
 * Notificar nuevo mensaje en conversación
 */
export async function notifyNewMessage(
  recipientId: string,
  senderName: string,
  messagePreview: string,
  conversationId: string
) {
  return sendPushToUser(recipientId, {
    title: `Nuevo mensaje de ${senderName}`,
    body: messagePreview.substring(0, 100),
    url: `/mi-cuenta/mensajes?conv=${conversationId}`,
    tag: `message-${conversationId}`,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
  })
}

/**
 * Notificar nuevo favorito
 */
export async function notifyNewFavorite(
  ownerId: string,
  listingTitle: string,
  listingId: string
) {
  return sendPushToUser(ownerId, {
    title: '❤️ Alguien marcó tu piso como favorito',
    body: listingTitle,
    url: `/pisos/${listingId}`,
    tag: `favorite-${listingId}`,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
  })
}

/**
 * Notificar nueva alerta de búsqueda
 */
export async function notifyNewAlert(
  userId: string,
  matchCount: number,
  searchName: string
) {
  return sendPushToUser(userId, {
    title: `🔔 ${matchCount} nuevos pisos coinciden con tu búsqueda`,
    body: `"${searchName}"`,
    url: '/mi-cuenta/alertas',
    tag: 'alert-match',
    requireInteraction: true,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
  })
}
