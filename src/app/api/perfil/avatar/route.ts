import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const formData = await req.formData()
  const file     = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No se recibio archivo' }, { status: 400 })

  // Solo imágenes
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Formato no permitido. Usa JPG, PNG o WebP.' }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'La imagen no puede superar 5 MB' }, { status: 400 })
  }

  const ext  = file.type.split('/')[1]
  const path = `${user.id}/avatar.${ext}`
  const buffer = await file.arrayBuffer()

  const { error: uploadErr } = await supabase.storage
    .from('user-docs')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 })

  // URL publica firmada (1 año)
  const { data: signed } = await supabase.storage.from('user-docs').createSignedUrl(path, 31536000)

  if (signed?.signedUrl) {
    await supabase
      .from('user_profiles')
      .upsert({ user_id: user.id, avatar_url: signed.signedUrl, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  }

  return NextResponse.json({ ok: true, url: signed?.signedUrl })
}
