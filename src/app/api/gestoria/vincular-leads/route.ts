import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { linkGestoriaOrdersToUser } from '@/lib/gestoria-link-user'

/** Vincula gestoria_requests del email (y session_id opcional) al usuario autenticado */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  let sessionId: string | null = null
  try {
    const body = await req.json() as { session_id?: string }
    if (body.session_id?.startsWith('cs_')) sessionId = body.session_id
  } catch {
    /* body opcional */
  }

  const emailNorm = user.email.trim().toLowerCase()

  try {
    const admin = createAdminClient()
    const { error } = await linkGestoriaOrdersToUser(admin, user.id, emailNorm, sessionId)
    if (error) {
      console.error('[gestoria/vincular-leads]', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true, linked: true })
  } catch (err) {
    console.error('[gestoria/vincular-leads] sin admin:', err)
    return NextResponse.json({ ok: true, linked: false, fallback: true })
  }
}
