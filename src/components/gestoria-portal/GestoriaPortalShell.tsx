'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { GestoriaPortalSection } from '@/lib/gestoria-portal-types'
import { GESTORIA_PORTAL_SECTIONS } from '@/lib/gestoria-portal-types'
import { GESTORIA_PHONE_TEL, GESTORIA_PHONE_WA } from '@/lib/gestoria-contact'

type Props = {
  displayName: string
  activeSection: GestoriaPortalSection
  onSectionChange: (section: GestoriaPortalSection) => void
  pendingDocsCount?: number
  children: React.ReactNode
}

export default function GestoriaPortalShell({
  displayName,
  activeSection,
  onSectionChange,
  pendingDocsCount = 0,
  children,
}: Props) {
  const firstName = displayName.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#eef0f2] flex flex-col lg:flex-row">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col bg-[#0a1410] text-white flex-shrink-0 sticky top-0 h-screen border-r border-[#1f3524]">
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Inmonest" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-sm font-extrabold tracking-tight">
                Inmo<span className="text-[#f4d98a]">nest</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9962a]/90">
                Gestoría Digital
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {GESTORIA_PORTAL_SECTIONS.map((item) => {
            const active = activeSection === item.id
            const badge = item.id === 'expediente' && pendingDocsCount > 0 ? pendingDocsCount : null
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                  active
                    ? 'bg-[#c9962a]/20 border border-[#c9962a]/40 text-[#f4d98a]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{item.label}</p>
                  <p className="text-[10px] text-white/40 truncate">{item.desc}</p>
                </div>
                {badge != null && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c9962a] px-1.5 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-3">
          <div className="rounded-xl bg-white/5 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-widest text-[#f4d98a]/80">Cliente</p>
            <p className="text-sm font-semibold truncate">{displayName}</p>
          </div>
          <a
            href={`https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent('Hola, necesito ayuda con mi expediente de gestoría')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] py-2.5 text-sm font-bold text-white"
          >
            WhatsApp gestoría
          </a>
          <form action="/auth/signout" method="POST">
            <button type="submit" className="w-full text-xs text-white/40 hover:text-red-400 py-1">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header móvil + tablet */}
        <header className="lg:hidden sticky top-0 z-50 bg-[#0a1410] text-white shadow-lg">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/logo.png" alt="Inmonest" width={28} height={28} className="rounded-md" />
              <div>
                <p className="text-xs font-extrabold">
                  Inmo<span className="text-[#f4d98a]">nest</span>
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#c9962a]">Gestoría</p>
              </div>
            </Link>
            <div className="min-w-0 flex-1 text-center">
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Expediente de</p>
              <p className="text-sm font-semibold truncate">{firstName}</p>
            </div>
            <a
              href={`https://wa.me/${GESTORIA_PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 lg:py-8 pb-28 lg:pb-8">
          {children}
        </main>

        {/* Bottom nav móvil */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a1410] border-t border-white/10 px-0.5 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max justify-around max-w-none px-1">
            {GESTORIA_PORTAL_SECTIONS.map((item) => {
              const active = activeSection === item.id
              const badge = item.id === 'expediente' && pendingDocsCount > 0
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`relative flex flex-col items-center gap-0.5 min-w-[56px] py-2 px-1 rounded-xl touch-manipulation ${
                    active ? 'text-[#f4d98a]' : 'text-white/50'
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="text-[9px] font-semibold">{item.shortLabel}</span>
                  {badge && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#c9962a]" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer desktop */}
        <footer className="hidden lg:flex border-t border-gray-200 bg-white px-6 py-3 text-xs text-gray-500 justify-between">
          <a href={`tel:${GESTORIA_PHONE_TEL}`} className="font-semibold text-[#7a5c1e]">
            📞 745 022 862 · info@inmonest.com
          </a>
          <p>Gestoría inmobiliaria digital · Documentación protegida</p>
        </footer>
      </div>
    </div>
  )
}
