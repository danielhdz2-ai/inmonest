import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/** Vincula gestoria_requests del email del usuario autenticado (post-login/registro) */
export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('gestoria_requests')
    .update({ user_id: user.id })
    .eq('client_email', user.email.toLowerCase())
    .is('user_id', null)

  if (error) {
    console.error('[gestoria/vincular-leads]', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
