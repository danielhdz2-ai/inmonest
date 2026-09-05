'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const DISMISS_KEY = 'inmonest-pwa-install-dismissed'
const DISMISS_DAYS = 7

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isMobileDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIosSafari() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent
  const isIos = /iPhone|iPad|iPod/i.test(ua)
  const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua)
  return isIos && isSafari
}

function wasDismissedRecently() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const dismissedAt = Number(raw)
    if (Number.isNaN(dismissedAt)) return false
    return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function dismissBanner() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    /* ignore */
  }
}

export default function PwaInstallBanner() {
  const pathname = usePathname() || ''
  const [visible, setVisible] = useState(false)
  const [iosHint, setIosHint] = useState(false)
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [installing, setInstalling] = useState(false)

  const hiddenRoute = pathname === '/admin' || pathname.startsWith('/admin/')

  useEffect(() => {
    if (hiddenRoute || !isMobileDevice() || isStandalone() || wasDismissedRecently()) return

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    const showTimer = window.setTimeout(() => {
      if (isStandalone()) return
      if (isIosSafari()) setIosHint(true)
      setVisible(true)
    }, 2000)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.clearTimeout(showTimer)
    }
  }, [hiddenRoute])

  const handleInstall = useCallback(async () => {
    if (!installEvent) return
    setInstalling(true)
    try {
      await installEvent.prompt()
      const choice = await installEvent.userChoice
      if (choice.outcome === 'accepted') {
        setVisible(false)
      } else {
        dismissBanner()
        setVisible(false)
      }
    } finally {
      setInstalling(false)
      setInstallEvent(null)
    }
  }, [installEvent])

  const handleDismiss = useCallback(() => {
    dismissBanner()
    setVisible(false)
  }, [])

  if (!visible || hiddenRoute) return null

  return (
    <div
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] px-3 md:hidden"
      role="dialog"
      aria-label="Instalar aplicación Inmonest"
    >
      <div className="mx-auto max-w-lg rounded-2xl border border-[#c9962a]/30 bg-[#1a0d00] p-4 text-white shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-lg font-black">
            <span className="text-white">I</span>
            <span className="text-[#c9962a]">N</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Instala Inmonest en tu móvil</p>
            {iosHint && !installEvent ? (
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                Pulsa <strong>Compartir</strong> y elige <strong>Añadir a pantalla de inicio</strong> para
                acceder como app.
              </p>
            ) : installEvent ? (
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                Accede más rápido a pisos y gestoría con la app en tu pantalla de inicio.
              </p>
            ) : (
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                Instala Inmonest desde el menú del navegador (<strong>⋮ Instalar app</strong> o{' '}
                <strong>Añadir a inicio</strong>).
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {installEvent && (
          <button
            type="button"
            onClick={handleInstall}
            disabled={installing}
            className="mt-3 w-full rounded-xl bg-[#c9962a] py-2.5 text-sm font-semibold text-black transition hover:bg-[#d4a83a] disabled:opacity-60"
          >
            {installing ? 'Instalando…' : 'Instalar app'}
          </button>
        )}
      </div>
    </div>
  )
}
