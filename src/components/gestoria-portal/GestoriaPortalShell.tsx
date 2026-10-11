'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { GestoriaPortalSection } from '@/lib/gestoria-portal-types'
import {
  GESTORIA_PORTAL_MOBILE_MORE_SECTIONS,
  GESTORIA_PORTAL_MOBILE_SECTIONS,
  GESTORIA_PORTAL_SECTIONS,
  GESTORIA_PORTAL_SECTION_TITLES,
} from '@/lib/gestoria-portal-types'
import { GESTORIA_SOLICITAR_HUB } from '@/lib/gestoria-nav'
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
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const moreActive = GESTORIA_PORTAL_MOBILE_MORE_SECTIONS.some((s) => s.id === activeSection)

  function goSection(id: GestoriaPortalSection) {
    setMobileMoreOpen(false)
    onSectionChange(id)
  }

  const mobileSectionTitle = GESTORIA_PORTAL_SECTION_TITLES[activeSection]

  useEffect(() => {
    if (!mobileMoreOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMoreOpen])

  return (
    <div className="min-h-screen bg-[#eef0f2]">
      {/* Sidebar desktop — fijo; solo el contenido principal hace scroll */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 xl:w-72 flex-col bg-[#0a1410] text-white border-r border-[#1f3524]">
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Inmonest" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-sm font-extrabold tracking-tight">
                Inmo<span className="text-[#f4d98a]">nest</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/90">
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
                    ? 'bg-gold-500/20 border border-gold-500/40 text-[#f4d98a]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{item.label}</p>
                  <p className="text-[10px] text-white/40 truncate">{item.desc}</p>
                </div>
                {badge != null && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-500 px-1.5 text-[10px] font-bold text-white">
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
          <Link
            href={GESTORIA_SOLICITAR_HUB}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gold-500 py-2.5 text-sm font-bold text-[#0a1410] hover:bg-gold-400 transition-colors"
          >
            + Nuevo contrato
          </Link>
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

      <div className="flex flex-col min-w-0 min-h-screen lg:pl-64 xl:pl-72">
        {/* Header móvil + tablet */}
        <header className="lg:hidden sticky top-0 z-50 bg-[#0a1410] text-white shadow-lg">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/logo.png" alt="Inmonest" width={28} height={28} className="rounded-md" />
              <div>
                <p className="text-xs font-extrabold">
                  Inmo<span className="text-[#f4d98a]">nest</span>
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gold-500">Gestoría</p>
              </div>
            </Link>
            <div className="min-w-0 flex-1 text-center px-1">
              <p className="text-sm font-bold truncate text-white">{mobileSectionTitle}</p>
              <p className="text-[10px] text-white/50 truncate">{firstName}</p>
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

        <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-8 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:pb-8">
          {children}
        </main>

        {/* Bottom nav móvil */}
        {mobileMoreOpen && (
          <button
            type="button"
            aria-label="Cerrar menú"
            className="lg:hidden fixed inset-0 z-[55] bg-black/40"
            onClick={() => setMobileMoreOpen(false)}
          />
        )}
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#0a1410]/98 backdrop-blur-md border-t border-white/10 px-0.5 pt-1.5 pb-[max(0.35rem,env(safe-area-inset-bottom))]"
          aria-label="Navegación del panel"
        >
          <div className="flex justify-between gap-0.5 px-0.5 max-w-lg mx-auto">
            {GESTORIA_PORTAL_MOBILE_SECTIONS.map((item) => {
              const active = activeSection === item.id
              const badge = item.id === 'expediente' && pendingDocsCount > 0
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goSection(item.id)}
                  className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 min-h-[52px] py-1.5 px-0.5 rounded-xl touch-manipulation active:scale-[0.98] ${
                    active ? 'text-[#f4d98a]' : 'text-white/50'
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold truncate w-full text-center leading-tight">
                    {item.shortLabel}
                  </span>
                  {badge && (
                    <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-gold-500" />
                  )}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setMobileMoreOpen((o) => !o)}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 min-h-[52px] py-1.5 px-0.5 rounded-xl touch-manipulation active:scale-[0.98] ${
                moreActive || mobileMoreOpen ? 'text-[#f4d98a]' : 'text-white/50'
              }`}
              aria-expanded={mobileMoreOpen}
              aria-haspopup="true"
              aria-label="Más secciones"
            >
              <span className="text-lg leading-none font-bold">⋯</span>
              <span className="text-[9px] sm:text-[10px] font-semibold truncate w-full text-center">Más</span>
              {moreActive && !mobileMoreOpen && (
                <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-gold-500" />
              )}
            </button>
          </div>
          {mobileMoreOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 px-3 pb-1 max-h-[min(50vh,320px)]">
              <div className="rounded-2xl border border-white/10 bg-[#0f1a14] shadow-2xl overflow-y-auto overscroll-contain max-h-[inherit]">
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Más secciones
                </p>
                {GESTORIA_PORTAL_MOBILE_MORE_SECTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 min-h-[56px] text-left border-b border-white/5 last:border-0 touch-manipulation active:bg-white/5 ${
                      activeSection === item.id ? 'bg-gold-500/15 text-[#f4d98a]' : 'text-white/80'
                    }`}
                  >
                    <span className="text-lg w-6 text-center">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-[10px] text-white/40">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Footer desktop */}
        <footer className="hidden lg:flex border-t border-gray-200 bg-white px-6 py-3 text-xs text-gray-500 justify-between">
          <a href={`tel:${GESTORIA_PHONE_TEL}`} className="font-semibold text-gold-700">
            745 022 862 · info@inmonest.com
          </a>
          <p>Gestoría inmobiliaria digital · Documentación protegida</p>
        </footer>
      </div>
    </div>
  )
}
