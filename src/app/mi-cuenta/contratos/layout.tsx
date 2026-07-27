import { createClient } from '@/lib/supabase/server'
import GestoriaClientShell from '@/components/GestoriaClientShell'

export default async function ContratosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name')
    .eq('user_id', user!.id)
    .maybeSingle()

  const displayName =
    profile?.full_name?.trim() ||
    user!.email?.split('@')[0] ||
    'Cliente'

  return (
    <GestoriaClientShell displayName={displayName}>
      {children}
    </GestoriaClientShell>
  )
}
