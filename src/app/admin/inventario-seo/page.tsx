import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import AdminInventarioSidebar from '@/components/admin/AdminInventarioSidebar'
import InventarioSeoAdminContent from '@/components/admin/InventarioSeoAdminContent'

export const metadata: Metadata = {
  title: 'Inventario SEO | Admin Inmonest',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminInventarioSeoPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect('/login?next=/admin/inventario-seo')
  }

  const adminEmail = (user.email || '').trim()

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex">
      <AdminInventarioSidebar adminEmail={adminEmail} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-[#0a1410] text-white px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/admin" className="text-sm font-semibold text-[#f4d98a]">
            ← Admin
          </Link>
          <span className="text-sm font-bold">Inventario SEO</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <InventarioSeoAdminContent />
        </main>
      </div>
    </div>
  )
}
