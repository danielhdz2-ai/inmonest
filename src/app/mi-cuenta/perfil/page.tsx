import { createClient } from '@/lib/supabase/server'
import PerfilClient from './PerfilClient'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name,phone,avatar_url')
    .eq('user_id', user!.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona tus datos personales y seguridad</p>
      </div>
      <PerfilClient
        userId={user!.id}
        email={user!.email ?? ''}
        initialName={profile?.full_name ?? ''}
        initialPhone={profile?.phone ?? ''}
        initialAvatar={profile?.avatar_url ?? null}
      />
    </div>
  )
}
