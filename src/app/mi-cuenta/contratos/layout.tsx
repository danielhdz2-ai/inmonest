import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isNextRedirectError } from '@/lib/next-navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/** Panel gestoría a pantalla completa (sin sidebar legacy de mi-cuenta). */
export default async function ContratosLayout({
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
    console.error('[mi-cuenta/contratos/layout]', err)
    redirect('/login?next=/mi-cuenta/contratos')
  }
}
