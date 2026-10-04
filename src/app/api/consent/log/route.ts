import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getIP } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

type Body = {
  consent_type?: string
  granted?: boolean
  action?: string
  preferences?: Record<string, unknown>
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const consentType = body.consent_type?.trim() || 'cookies'
  if (consentType.length > 64) {
    return NextResponse.json({ error: 'consent_type demasiado largo' }, { status: 400 })
  }

  const granted = Boolean(body.granted)
  const ip = getIP(request)
  const userAgent = request.headers.get('user-agent')?.slice(0, 512) ?? null

  let userId: string | null = null
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    userId = user?.id ?? null
  } catch {
    userId = null
  }

  try {
    const admin = createAdminClient()
    const { error } = await admin.from('consent_log').insert({
      user_id: userId,
      consent_type: consentType,
      granted,
      action: body.action?.slice(0, 64) ?? null,
      preferences: body.preferences ?? null,
      ip_address: ip === 'anonymous' ? null : ip,
      user_agent: userAgent,
    })
    if (error) {
      console.error('[consent/log]', error.message)
    }
  } catch (e) {
    console.error('[consent/log]', e)
  }

  return NextResponse.json({ ok: true })
}
