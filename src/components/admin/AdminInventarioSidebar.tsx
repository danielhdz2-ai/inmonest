import Image from 'next/image'
import Link from 'next/link'
import { IconHome, IconLogout } from '@/app/admin/AdminIcons'

type Props = {
  adminEmail?: string
}

export default function AdminInventarioSidebar({ adminEmail }: Props) {
  return (
    <aside className="hidden lg:flex lg:w-64 flex-col bg-[#0a1410] text-white flex-shrink-0 sticky top-0 h-screen border-r border-[#1f3524]">
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5">
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

      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link
          href="/admin"
          className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white border border-transparent transition-all"
        >
          Panel principal
        </Link>
        <Link
          href="/admin/inventario-seo"
          className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm bg-gold-500/20 border border-gold-500/40 text-[#f4d98a] font-semibold"
        >
          Inventario SEO
        </Link>
      </nav>

      <div className="px-4 py-4 border-t border-white/10 space-y-2">
        {adminEmail ? (
          <div className="rounded-xl bg-white/5 px-3 py-2.5 mb-1">
            <p className="text-[10px] uppercase tracking-widest text-[#f4d98a]/80">Administrador</p>
            <p className="text-sm font-semibold truncate">{adminEmail}</p>
          </div>
        ) : null}
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
  )
}
