import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// PUT: actualizar datos del perfil
export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const full_name = String(body.full_name ?? '').slice(0, 120).trim()
  const phone     = String(body.phone ?? '').slice(0, 30).replace(/[^\d\s+\-().]/g, '').trim()

  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: user.id,
      full_name,
      phone,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
