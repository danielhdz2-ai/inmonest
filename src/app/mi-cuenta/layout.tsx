import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Mi cuenta',
}

/** Solo autenticación — cada sección elige su propio shell (portal vs gestoría cliente) */
export default async function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Middleware ya redirige con ?next=ruta-completa; este fallback no debe tirar session_id
  if (!user) redirect('/login?next=/mi-cuenta/contratos')

  return <div className="min-h-screen">{children}</div>
}
