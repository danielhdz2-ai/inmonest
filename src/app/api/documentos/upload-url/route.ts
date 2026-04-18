import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await req.json()
  const { doc_key, file_name, mime_type } = body

  const ALLOWED_KEYS  = ['dni', 'nomina', 'escrituras', 'otro']
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']

  if (!ALLOWED_KEYS.includes(doc_key)) {
    return NextResponse.json({ error: 'doc_key invalido' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(mime_type)) {
    return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }

  const ext  = file_name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? 'bin'
  const path = `${user.id}/${doc_key}.${ext}`

  const { data, error } = await supabase.storage
    .from('user-docs')
    .createSignedUploadUrl(path)

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Error al generar URL' }, { status: 500 })
  }

  return NextResponse.json({ signedUrl: data.signedUrl, path })
}
