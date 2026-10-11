import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isNextRedirectError } from '@/lib/next-navigation'

/** Rutas legacy del portal: el middleware redirige a /mi-cuenta/contratos; aquí solo auth de respaldo. */
export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      redirect('/login?next=/mi-cuenta/contratos')
    }
    return <>{children}</>
  } catch (err) {
    if (isNextRedirectError(err)) throw err
    redirect('/login?next=/mi-cuenta/contratos')
  }
}
