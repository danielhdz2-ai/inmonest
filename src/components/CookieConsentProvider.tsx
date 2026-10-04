'use client'

import Link from 'next/link'
import Script from 'next/script'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  CONSENT_UPDATED_EVENT,
  DEFAULT_CONSENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  type CookieConsentState,
  dispatchConsentUpdated,
  readConsentFromDocument,
  writeConsentCookie,
} from '@/lib/cookie-consent'

type ConsentContextValue = {
  consent: CookieConsentState
  analyticsAllowed: boolean
  openSettings: () => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (analytics: boolean) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useCookieConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    return {
      consent: DEFAULT_CONSENT,
      analyticsAllowed: false,
      openSettings: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
      savePreferences: () => {},
    }
  }
  return ctx
}

function applyGoogleConsentMode(analytics: boolean) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  const gtag =
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag ??
    ((...args: unknown[]) => {
      window.dataLayer.push(args as unknown as Record<string, unknown>)
    })
  ;(window as Window & { gtag?: (...args: unknown[]) => void }).gtag = gtag
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

async function logConsentToServer(state: CookieConsentState, action: string) {
  try {
    await fetch('/api/consent/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consent_type: 'cookies',
        granted: state.analytics,
        action,
        preferences: { analytics: state.analytics },
      }),
    })
  } catch {
    // no bloquear UX
  }
}

function persistConsent(state: CookieConsentState, action: string) {
  writeConsentCookie(state)
  applyGoogleConsentMode(state.analytics)
  dispatchConsentUpdated()
  void logConsentToServer(state, action)
}

type Props = {
  gtmId: string
  children: React.ReactNode
}

export default function CookieConsentProvider({ gtmId, children }: Props) {
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_CONSENT)
  const [hydrated, setHydrated] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [draftAnalytics, setDraftAnalytics] = useState(false)

  useEffect(() => {
    const stored = readConsentFromDocument()
    if (stored?.decided) {
      setConsent(stored)
      applyGoogleConsentMode(stored.analytics)
    } else {
      setShowBanner(true)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onOpen = () => {
      setDraftAnalytics(consent.analytics)
      setShowSettings(true)
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen)
  }, [consent.analytics])

  const commit = useCallback((next: CookieConsentState, action: string) => {
    setConsent(next)
    setShowBanner(false)
    setShowSettings(false)
    persistConsent(next, action)
  }, [])

  const acceptAll = useCallback(() => {
    const next: CookieConsentState = {
      necessary: true,
      analytics: true,
      decided: true,
      updatedAt: new Date().toISOString(),
    }
    commit(next, 'accept_all')
  }, [commit])

  const rejectAll = useCallback(() => {
    const next: CookieConsentState = {
      necessary: true,
      analytics: false,
      decided: true,
      updatedAt: new Date().toISOString(),
    }
    commit(next, 'reject_all')
  }, [commit])

  const savePreferences = useCallback(
    (analytics: boolean) => {
      const next: CookieConsentState = {
        necessary: true,
        analytics,
        decided: true,
        updatedAt: new Date().toISOString(),
      }
      commit(next, 'save_preferences')
    },
    [commit],
  )

  const openSettings = useCallback(() => {
    setDraftAnalytics(consent.analytics)
    setShowSettings(true)
  }, [consent.analytics])

  const value = useMemo(
    (): ConsentContextValue => ({
      consent,
      analyticsAllowed: consent.decided && consent.analytics,
      openSettings,
      acceptAll,
      rejectAll,
      savePreferences,
    }),
    [consent, openSettings, acceptAll, rejectAll, savePreferences],
  )

  const loadGtm = hydrated && consent.decided && consent.analytics

  return (
    <ConsentContext.Provider value={value}>
      <Script
        id="gtm-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  wait_for_update:500
});`,
        }}
      />

      {loadGtm && (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        </>
      )}

      {children}

      {hydrated && showBanner && !showSettings && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p id="cookie-banner-title" className="text-sm font-semibold text-gray-900">
                Cookies y privacidad
              </p>
              <p id="cookie-banner-desc" className="text-xs text-gray-600 mt-1 leading-relaxed">
                Usamos cookies técnicas imprescindibles y, solo con tu permiso, analíticas (Google Tag Manager).
                Consulta la{' '}
                <Link href="/cookies" className="text-gold-600 underline">
                  política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col xs:flex-row flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setDraftAnalytics(false)
                  setShowSettings(true)
                }}
                className="px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 min-h-[44px]"
              >
                Configurar
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 min-h-[44px]"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-gold-500 text-white hover:bg-[#b8841f] min-h-[44px]"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      )}

      {hydrated && showSettings && (
        <div
          className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-labelledby="cookie-settings-title"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 id="cookie-settings-title" className="text-lg font-bold text-gray-900">
              Preferencias de cookies
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Las cookies técnicas son necesarias para iniciar sesión y usar el sitio. Puedes activar o desactivar
              las analíticas en cualquier momento.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between gap-3 items-start border border-gray-100 rounded-xl p-3">
                <div>
                  <p className="font-semibold text-gray-900">Técnicas (necesarias)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sesión, seguridad, Supabase Auth.</p>
                </div>
                <span className="text-xs font-medium text-gray-400 shrink-0">Siempre activas</span>
              </li>
              <li className="flex justify-between gap-3 items-center border border-gray-100 rounded-xl p-3">
                <div>
                  <p className="font-semibold text-gray-900">Analíticas</p>
                  <p className="text-xs text-gray-500 mt-0.5">Google Tag Manager / estadísticas de uso.</p>
                </div>
                <input
                  type="checkbox"
                  checked={draftAnalytics}
                  onChange={(e) => setDraftAnalytics(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                  aria-label="Activar cookies analíticas"
                />
              </li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowSettings(false)
                  if (!consent.decided) setShowBanner(true)
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => savePreferences(draftAnalytics)}
                className="flex-1 py-2.5 rounded-xl bg-gold-500 text-white text-sm font-semibold hover:bg-[#b8841f]"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  )
}

export { CONSENT_UPDATED_EVENT }
