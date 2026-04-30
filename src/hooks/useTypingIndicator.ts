/**
 * Hook para gestionar el estado de "escribiendo..." en conversaciones
 * Detecta cuando el usuario está escribiendo y envía señales periódicas
 */

'use client'

import { useEffect, useRef, useCallback } from 'react'

interface UseTypingIndicatorOptions {
  onTyping: () => void
  debounceMs?: number
  throttleMs?: number
}

export function useTypingIndicator({
  onTyping,
  debounceMs = 1000,
  throttleMs = 3000,
}: UseTypingIndicatorOptions) {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastTypingSignalRef = useRef<number>(0)

  const handleTyping = useCallback(() => {
    const now = Date.now()
    
    // Throttle: no enviar señal si fue hace menos de throttleMs
    if (now - lastTypingSignalRef.current < throttleMs) {
      return
    }

    // Enviar señal de "typing"
    onTyping()
    lastTypingSignalRef.current = now

    // Cancelar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Después de debounceMs sin actividad, enviar señal de "stopped typing"
    typingTimeoutRef.current = setTimeout(() => {
      // Aquí podrías enviar una señal de "stopped typing" si quisieras
      // Por ahora simplemente dejamos que se desvanezca por timeout
    }, debounceMs)
  }, [onTyping, debounceMs, throttleMs])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return { handleTyping }
}
