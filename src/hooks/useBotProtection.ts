'use client'

import { useCallback, useRef, useState } from 'react'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export interface BotProtectionPayload {
  _hp: string
  _ts: number
  turnstile_token?: string
}

export function useBotProtection() {
  const formStartedAt = useRef(Date.now())
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY)

  const getProtectionPayload = useCallback((): BotProtectionPayload => ({
    _hp: honeypot,
    _ts: formStartedAt.current,
    ...(turnstileToken ? { turnstile_token: turnstileToken } : {}),
  }), [honeypot, turnstileToken])

  const resetProtection = useCallback(() => {
    formStartedAt.current = Date.now()
    setHoneypot('')
    setTurnstileToken('')
  }, [])

  return {
    honeypot,
    setHoneypot,
    turnstileToken,
    setTurnstileToken,
    turnstileEnabled,
    turnstileSiteKey: TURNSTILE_SITE_KEY ?? '',
    getProtectionPayload,
    resetProtection,
  }
}
