import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isNextRedirectError } from '@/lib/next-navigation'

export const metadata: Metadata = {
  title: 'Mi cuenta',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Solo autenticación — cada sección elige su propio shell (portal vs gestoría cliente) */
export default async function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    if (isNextRedirectError(err)) throw err
    console.error('[mi-cuenta/layout] getUser falló', err)
  }

  if (!user) {
    redirect('/login?next=/mi-cuenta/contratos?v=servicios')
  }

  return <div className="min-h-screen bg-[#eef0f2]">{children}</div>
}
