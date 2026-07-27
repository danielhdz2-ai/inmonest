import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  buildUserDocStoragePath,
  isAllowedDocKey,
  validateUploadFile,
} from '@/lib/gestoria-upload'

export const dynamic = 'force-dynamic'

async function verifyRequestOwnership(
  admin: ReturnType<typeof createAdminClient>,
  requestId: string,
  userId: string,
  userEmail: string,
) {
  const { data } = await admin
    .from('gestoria_requests')
    .select('id')
    .eq('id', requestId)
    .or(`client_email.eq.${userEmail},user_id.eq.${userId}`)
    .maybeSingle()
  return Boolean(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  let body: {
    doc_key?: string
    file_name?: string
    mime_type?: string
    file_size?: number
    gestoria_request_id?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { doc_key, file_name, mime_type, file_size, gestoria_request_id } = body

  if (!doc_key || !isAllowedDocKey(doc_key)) {
    return NextResponse.json({ error: 'Tipo de documento no válido' }, { status: 400 })
  }

  if (!gestoria_request_id) {
    return NextResponse.json({ error: 'gestoria_request_id requerido' }, { status: 400 })
  }

  const admin = createAdminClient()
  const ownsRequest = await verifyRequestOwnership(
    admin,
    gestoria_request_id,
    user.id,
    user.email,
  )
  if (!ownsRequest) {
    return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
  }

  const fileCheck = validateUploadFile(file_name ?? '', mime_type, file_size)
  if (!fileCheck.ok) {
    return NextResponse.json({ error: fileCheck.error }, { status: 422 })
  }

  const path = buildUserDocStoragePath(user.id, doc_key, file_name!, gestoria_request_id)

  const { data, error } = await supabase.storage
    .from('user-docs')
    .createSignedUploadUrl(path, { upsert: true })

  if (error || !data) {
    console.error('[documentos/upload-url]', error?.message)
    return NextResponse.json({ error: error?.message ?? 'Error al generar URL de subida' }, { status: 500 })
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    path,
    contentType: fileCheck.mime,
    maxBytes: 50 * 1024 * 1024,
  })
}
