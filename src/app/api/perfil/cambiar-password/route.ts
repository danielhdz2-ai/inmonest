import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { new_password } = await req.json()

  // Validaciones de seguridad
  if (!new_password || typeof new_password !== 'string') {
    return NextResponse.json({ error: 'Contrasena invalida' }, { status: 400 })
  }
  if (new_password.length < 8) {
    return NextResponse.json({ error: 'La contrasena debe tener al menos 8 caracteres' }, { status: 400 })
  }
  if (new_password.length > 128) {
    return NextResponse.json({ error: 'Contrasena demasiado larga' }, { status: 400 })
  }

  const { error } = await supabase.auth.updateUser({ password: new_password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
