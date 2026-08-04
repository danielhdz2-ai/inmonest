'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, Building2, FileText, Scale, Users } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'

type TabKey = 'inicio' | 'inmuebles' | 'servicios' | 'gestoria' | 'cuenta'

const TABS: Array<{
  key: TabKey
  label: string
  href: string
  Icon: typeof HomeIcon
}> = [
  { key: 'inicio', label: 'Inicio', href: '/', Icon: HomeIcon },
  { key: 'inmuebles', label: 'Inmuebles', href: '/pisos', Icon: Building2 },
  { key: 'servicios', label: 'Servicios', href: '/servicios', Icon: FileText },
  { key: 'gestoria', label: 'Gestoría', href: '/gestoria', Icon: Scale },
  { key: 'cuenta', label: 'Cuenta', href: '/mi-cuenta', Icon: Users },
]

function activeTab(pathname: string): TabKey {
  if (pathname.startsWith('/mi-cuenta') || pathname.startsWith('/login') || pathname.startsWith('/registro')) {
    return 'cuenta'
  }
  if (pathname.startsWith('/gestoria')) return 'gestoria'
  if (pathname.startsWith('/servicios')) return 'servicios'
  if (
    pathname.startsWith('/pisos') ||
    /^\/[^/]+\/(pisos|alquiler|vender-piso)/.test(pathname) ||
    pathname.includes('pisos-particulares')
  ) {
    return 'inmuebles'
  }
  if (pathname === '/') return 'inicio'
  return 'inicio'
}

export default function MobileBottomNav() {
  const pathname = usePathname() || '/'
  const current = activeTab(pathname)

  return (
    <nav
      aria-label="Navegación principal"
      className="app-mobile-bottom-nav lg:hidden fixed inset-x-0 bottom-0 z-[55] border-t border-white/10 bg-forest-950/95 backdrop-blur-xl supports-[backdrop-filter]:bg-forest-950/90"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1.5 pb-1">
        {TABS.map(({ key, label, href, Icon }) => {
          const active = current === key
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-2 transition-colors touch-manipulation',
                active ? 'text-gold-400' : 'text-white/45 hover:text-white/70',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl transition-all',
                  active && 'bg-gold-500/15 ring-1 ring-gold-500/30',
                )}
              >
                <Icon className={cn('h-[18px] w-[18px]', active && 'text-gold-400')} />
              </span>
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-wide leading-none',
                  active ? 'text-gold-400' : 'text-white/50',
                )}
              >
                {label}
              </span>
              {active && (
                <span className="mt-0.5 h-0.5 w-4 rounded-full bg-gold-400" aria-hidden />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
