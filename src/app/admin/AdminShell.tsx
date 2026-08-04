'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IconDashboard, IconSales, IconFolder, IconUsers, IconDocuments, IconLogout, IconHome } from './AdminIcons'

export type AdminTab = 'dashboard' | 'ventas' | 'expedientes' | 'particulares' | 'documentos'

const NAV_ITEMS: { id: AdminTab; label: string; desc: string; icon: (p: { className?: string }) => React.ReactElement }[] = [
  { id: 'dashboard', label: 'Dashboard', desc: 'Visión general', icon: IconDashboard },
  { id: 'ventas', label: 'Ventas', desc: 'Ingresos y pedidos', icon: IconSales },
  { id: 'expedientes', label: 'Expedientes', desc: 'Clientes de gestoría', icon: IconFolder },
  { id: 'particulares', label: 'Base de datos', desc: 'Particulares e inmuebles', icon: IconUsers },
  { id: 'documentos', label: 'Documentos', desc: 'Archivos subidos', icon: IconDocuments },
]

type Props = {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  title: string
  subtitle?: string
  actions?: React.ReactNode
  adminEmail?: string
  children: React.ReactNode
}

export default function AdminShell({ activeTab, onTabChange, title, subtitle, actions, adminEmail, children }: Props) {
  return (
    <div className="min-h-screen bg-[#f4f5f7] flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-[#0a1410] text-white flex-shrink-0 sticky top-0 h-screen border-r border-[#1f3524]">
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Inmonest" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-sm font-extrabold tracking-tight">
                Inmo<span className="text-[#f4d98a]">nest</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/90">
                Administración
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = activeTab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                  active
                    ? 'bg-gold-500/20 border border-gold-500/40 text-[#f4d98a]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{item.label}</p>
                  <p className="text-[10px] text-white/40 truncate">{item.desc}</p>
                </div>
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          {adminEmail && (
            <div className="rounded-xl bg-white/5 px-3 py-2.5 mb-1">
              <p className="text-[10px] uppercase tracking-widest text-[#f4d98a]/80">Administrador</p>
              <p className="text-sm font-semibold truncate">{adminEmail}</p>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <IconHome className="w-4 h-4" />
            Volver al sitio
          </Link>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors text-sm"
            >
              <IconLogout className="w-4 h-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header móvil */}
        <header className="lg:hidden sticky top-0 z-40 bg-[#0a1410] text-white shadow-lg">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Inmonest" width={26} height={26} className="rounded-md" />
              <p className="text-xs font-extrabold">
                Inmo<span className="text-[#f4d98a]">nest</span> Admin
              </p>
            </Link>
          </div>
          <nav className="flex overflow-x-auto px-2 pb-2 gap-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    active ? 'bg-gold-500/20 text-[#f4d98a]' : 'text-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </header>

        {/* Topbar desktop */}
        <div className="hidden lg:flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-8 py-5 flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2.5 flex-shrink-0">{actions}</div>}
        </div>

        {/* Mobile title */}
        <div className="lg:hidden px-4 pt-4 pb-2">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          {actions && <div className="flex flex-wrap items-center gap-2 mt-3">{actions}</div>}
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
