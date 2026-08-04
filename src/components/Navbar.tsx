'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface NavbarProps {
  isLoggedIn?: boolean
}

const NAV_ITEMS = [
  { label: 'Alquiler',             href: '/pisos?operacion=rent' },
  { label: 'Pisos de Particulares', href: '/pisos?operacion=rent&solo_particulares=true' },
  { label: 'Compra',               href: '/pisos?operacion=sale' },
  { label: 'Publicar gratis',      href: '/publicar-anuncio' },
  { label: 'Vender casa',          href: '/vender-casa' },
  { label: 'Gestoría',             href: '/gestoria' },
  { label: 'Servicios',            href: '/servicios' },
  { label: 'Agencias',             href: '/agencias' },
  { label: 'Hipotecas',            href: '/hipoteca' },
  { label: 'Analizador de Mercado', href: '/analizador-mercado' },
  { label: 'Blog',                 href: '/blog' },
  { label: 'Ciudades',             href: '/gestoria/ciudades' },
]

/** Accesos rápidos del menú desplegable Servicios */
const SERVICIOS_QUICK: Array<{ label: string; href: string; highlight?: boolean }> = [
  { label: 'Arras penitenciales', href: '/gestoria/arras-penitenciales' },
  { label: 'Contrato de alquiler', href: '/gestoria/contrato-alquiler' },
  { label: 'Préstamo particulares', href: '/gestoria/prestamo-particulares' },
  { label: 'Due diligence', href: '/gestoria/due-diligence-precompra' },
  { label: 'Venta completa', href: '/gestoria/venta-completa-reserva-escritura' },
  { label: 'Ver todos los servicios', href: '/servicios', highlight: true },
]

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [sideOpen, setSideOpen] = useState(false)
  const [serviciosOpen, setServiciosOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const serviciosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user)
    })
  }, [])

  // Bloquear scroll del body cuando el panel está abierto
  useEffect(() => {
    document.body.style.overflow = sideOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sideOpen])

  useEffect(() => {
    if (!serviciosOpen) return
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (serviciosRef.current && !serviciosRef.current.contains(e.target as Node)) {
        setServiciosOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServiciosOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [serviciosOpen])

  const close = () => setSideOpen(false)
  const accountHref = loggedIn ? '/mi-cuenta' : '/login'
  const accountLabelMobile = loggedIn ? 'Cuenta' : 'Acceder'
  const accountLabelDesktop = loggedIn ? 'Mi cuenta' : 'Entrar'

  return (
    <>
      <header className="sticky top-0 z-50 border-b shadow-sm bg-black border-white/10 lg:bg-white lg:border-gray-100 lg:shadow-sm">
        <div className="relative flex items-center h-14 lg:h-16 px-3 lg:px-5 gap-2 lg:gap-3 min-w-0">

          {/* Hamburger */}
          <button
            onClick={() => setSideOpen(true)}
            className="relative z-10 flex-shrink-0 p-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-gold-300 transition-colors lg:text-gray-500 lg:hover:bg-cream-100 lg:hover:text-gold-500"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo — centrado en móvil, izquierda en desktop */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center flex-shrink-0"
          >
            <span className="text-xl lg:text-3xl font-extrabold tracking-tight leading-none whitespace-nowrap">
              <span className="text-white lg:text-black">Inmo</span>
              <span className="text-gold-400 lg:text-gold-500">nest</span>
            </span>
          </Link>

          <div className="flex-1 min-w-0 hidden lg:block" />

          {/* CTAs desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/gestoria"
              className="inline-flex items-center rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap px-4 py-2 text-sm touch-manipulation"
            >
              Gestoría
            </Link>

            <div
              ref={serviciosRef}
              className="relative"
              onMouseEnter={() => setServiciosOpen(true)}
              onMouseLeave={() => setServiciosOpen(false)}
            >
              <div className="inline-flex items-stretch rounded-full border-2 border-gold-500 overflow-hidden">
                <Link
                  href="/servicios"
                  className="inline-flex items-center text-gold-500 font-semibold hover:bg-cream-100 transition-colors whitespace-nowrap px-4 py-2 text-sm touch-manipulation"
                >
                  Servicios
                </Link>
                <button
                  type="button"
                  onClick={() => setServiciosOpen((v) => !v)}
                  aria-expanded={serviciosOpen}
                  aria-haspopup="menu"
                  aria-label="Abrir accesos rápidos de servicios"
                  className="inline-flex items-center border-l border-gold-500/40 text-gold-500 hover:bg-cream-100 px-2 touch-manipulation"
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${serviciosOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {serviciosOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full pt-2 z-[80] w-[min(100vw-1.5rem,18rem)]"
                >
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden py-2">
                    <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Accesos rápidos
                    </p>
                    {SERVICIOS_QUICK.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setServiciosOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          item.highlight
                            ? 'font-bold text-gold-500 bg-cream-100 hover:bg-cream-200 mt-1 border-t border-gray-50'
                            : 'text-gray-800 hover:bg-gray-50 hover:text-gold-500'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/publicar-anuncio"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors whitespace-nowrap"
            >
              Publicar anuncio
            </Link>

            <Link
              href={accountHref}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors whitespace-nowrap min-h-[40px] px-4 py-2 text-sm touch-manipulation"
            >
              {accountLabelDesktop}
            </Link>
          </div>

          {/* Acceder — solo móvil (derecha) */}
          <Link
            href={accountHref}
            className="relative z-10 ml-auto lg:hidden inline-flex items-center justify-center rounded-full border border-gold-500/50 text-gold-300 font-semibold hover:bg-gold-500/10 transition-colors whitespace-nowrap min-h-[36px] px-3.5 py-1.5 text-xs touch-manipulation"
          >
            {accountLabelMobile}
          </Link>
        </div>
      </header>

      {/* ── Panel lateral ── */}

      {sideOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          sideOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={close} className="flex items-center gap-2">
            <Image src="/logo.png" alt="Inmonest" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="text-xl font-extrabold tracking-tight leading-none">
              <span className="text-black">Inmo</span><span className="text-gold-500">nest</span>
            </span>
          </Link>
          <button
            onClick={close}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-gray-800 hover:bg-cream-100 hover:text-gold-500 transition-colors border-b border-gray-50 last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-5 border-t border-gray-100 space-y-2">
          <Link
            href="/publicar-anuncio"
            onClick={close}
            className="block text-center py-2.5 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
          >
            Publicar anuncio gratis
          </Link>
          <Link
            href={accountHref}
            onClick={close}
            className="block text-center py-2.5 rounded-full border border-gold-500/40 text-gold-500 text-sm font-medium hover:bg-cream-100 transition-colors"
          >
            {isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
          </Link>
        </div>
      </div>
    </>
  )
}
