import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { linkGestoriaOrdersToUser } from '@/lib/gestoria-link-user'

/** Vincula gestoria_requests del email del usuario autenticado (post-login/registro/pago) */
export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const emailNorm = user.email.trim().toLowerCase()

  try {
    const admin = createAdminClient()
    const { error } = await linkGestoriaOrdersToUser(admin, user.id, emailNorm)
    if (error) {
      console.error('[gestoria/vincular-leads]', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true, linked: true })
  } catch (err) {
    console.error('[gestoria/vincular-leads] sin admin:', err)
    // Sin service role: el cliente puede leer por RLS si user_id o email coinciden
    return NextResponse.json({ ok: true, linked: false, fallback: true })
  }
}
