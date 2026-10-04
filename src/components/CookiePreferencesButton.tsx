'use client'

import { OPEN_COOKIE_SETTINGS_EVENT } from '@/lib/cookie-consent'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function CookiePreferencesButton({
  className = 'hover:text-gold-300 transition-colors text-left',
  children = 'Configurar cookies',
}: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {children}
    </button>
  )
}
