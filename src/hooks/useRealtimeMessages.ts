/**
 * Hook para mensajería en tiempo real con Supabase Realtime
 * Escucha nuevos mensajes en una conversación específica
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
  read: boolean
}

interface UseRealtimeMessagesOptions {
  conversationId: string
  userId: string
  onNewMessage?: (message: Message) => void
  onTyping?: (userId: string) => void
  enabled?: boolean
}

export function useRealtimeMessages({
  conversationId,
  userId,
  onNewMessage,
  onTyping,
  enabled = true,
}: UseRealtimeMessagesOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabaseRef = useRef(createClient())

  // ── Cleanup al desmontar ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe()
        channelRef.current = null
      }
    }
  }, [])

  // ── Suscripción a mensajes en tiempo real ─────────────────────────────────
  useEffect(() => {
    if (!enabled || !conversationId) return

    const supabase = supabaseRef.current

    // Canal único por conversación
    const channel = supabase.channel(`conversation:${conversationId}`, {
      config: {
        broadcast: { self: true }, // Recibir propios mensajes también
      },
    })

    // ── Escuchar INSERTS en tabla messages ────────────────────────────────────
    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message
          
          // Solo notificar si no es el remitente
          if (newMessage.sender_id !== userId) {
            onNewMessage?.(newMessage)
            
            // Marcar como leído automáticamente si estamos viendo la conversación
            supabase
              .from('messages')
              .update({ read: true })
              .eq('id', newMessage.id)
              .then(() => {
                // Actualizar contador de no leídos en conversations
                supabase.rpc('mark_conversation_as_read', {
                  p_conversation_id: conversationId,
                  p_user_id: userId,
                })
              })
          }
        }
      )
      // ── Escuchar evento "typing" (broadcast) ──────────────────────────────────
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.userId !== userId) {
          onTyping?.(payload.payload.userId)
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
          setError(null)
          console.log(`✅ [Realtime] Conectado a conversación ${conversationId}`)
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false)
          setError('Error de conexión en tiempo real')
          console.error(`❌ [Realtime] Error en conversación ${conversationId}`)
        } else if (status === 'TIMED_OUT') {
          setIsConnected(false)
          setError('Timeout de conexión')
          console.warn(`⏱️ [Realtime] Timeout en conversación ${conversationId}`)
        }
      })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
      channelRef.current = null
      setIsConnected(false)
    }
  }, [conversationId, userId, enabled, onNewMessage, onTyping])

  // ── Enviar señal "typing" ─────────────────────────────────────────────────
  const sendTypingSignal = useCallback(() => {
    if (!channelRef.current || !isConnected) return

    channelRef.current.send({
      type: 'broadcast',
      event: 'typing',
      payload: { userId, timestamp: Date.now() },
    })
  }, [userId, isConnected])

  return {
    isConnected,
    error,
    sendTypingSignal,
  }
}
