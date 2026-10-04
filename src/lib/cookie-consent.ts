/** Preferencias de cookies (RGPD / LSSI-CE). Cookie técnica, no requiere consentimiento previo. */
export const CONSENT_COOKIE_NAME = 'inmonest_consent_v1'
export const CONSENT_COOKIE_MAX_AGE_SEC = 365 * 24 * 60 * 60

export type CookieConsentState = {
  necessary: true
  analytics: boolean
  /** El usuario ya eligió (aceptar, rechazar o configurar). */
  decided: boolean
  updatedAt: string
}

export const DEFAULT_CONSENT: CookieConsentState = {
  necessary: true,
  analytics: false,
  decided: false,
  updatedAt: '',
}

export function parseConsentCookie(raw: string | undefined | null): CookieConsentState | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<CookieConsentState>
    if (typeof parsed.analytics !== 'boolean') return null
    return {
      necessary: true,
      analytics: parsed.analytics,
      decided: Boolean(parsed.decided),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    }
  } catch {
    return null
  }
}

export function serializeConsentCookie(state: CookieConsentState): string {
  return encodeURIComponent(JSON.stringify(state))
}

export function readConsentFromDocument(): CookieConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`))
  if (!match) return null
  const value = match.slice(CONSENT_COOKIE_NAME.length + 1)
  return parseConsentCookie(value)
}

export function writeConsentCookie(state: CookieConsentState): void {
  if (typeof document === 'undefined') return
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE_NAME}=${serializeConsentCookie(state)}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE_SEC}; SameSite=Lax${secure}`
}

export const CONSENT_UPDATED_EVENT = 'inmonest:consent-updated'
export const OPEN_COOKIE_SETTINGS_EVENT = 'inmonest:open-cookie-settings'

export function dispatchConsentUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT))
}
