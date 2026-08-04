import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getNotificationPrefs,
  saveNotificationPrefs,
  type GestoriaNotificationPrefs,
} from '@/lib/notification-preferences'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.id) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const prefs = await getNotificationPrefs({ userId: user.id, email: user.email })
  return NextResponse.json({ prefs })
}

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.id) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await req.json() as Partial<GestoriaNotificationPrefs>
  const prefs = await saveNotificationPrefs(user.id, user.email, body)
  return NextResponse.json({ ok: true, prefs })
}
