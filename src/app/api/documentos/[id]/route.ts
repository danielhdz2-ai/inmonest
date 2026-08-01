import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function loadOwnedDoc(
  supabase: Awaited<ReturnType<typeof createClient>>,
  id: string,
  userId: string,
) {
  const { data } = await supabase
    .from('user_documents')
    .select('id, doc_key, file_name, storage_path')
    .eq('id', id)
    .eq('user_id', userId)
    .maybeSingle()
  return data
}

/** GET: URL firmada para ver (?download=0, por defecto) o forzar descarga (?download=1) */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { id } = await params
  const doc = await loadOwnedDoc(supabase, id, user.id)
  if (!doc?.storage_path) {
    return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 })
  }

  const forceDownload = req.nextUrl.searchParams.get('download') === '1'
  const admin = createAdminClient()
  const { data, error } = await admin.storage
    .from('user-docs')
    .createSignedUrl(
      doc.storage_path,
      300,
      forceDownload ? { download: doc.file_name } : undefined,
    )

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: error?.message ?? 'No se pudo generar el enlace' },
      { status: 500 },
    )
  }

  return NextResponse.json({ url: data.signedUrl, file_name: doc.file_name })
}

/** DELETE: elimina el archivo del storage y el registro de la base de datos */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { id } = await params
  const doc = await loadOwnedDoc(supabase, id, user.id)
  if (!doc) return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 })

  const admin = createAdminClient()

  if (doc.storage_path) {
    const { error: storageError } = await admin.storage.from('user-docs').remove([doc.storage_path])
    if (storageError) {
      console.error('[documentos DELETE] error borrando storage:', storageError.message)
    }
  }

  const { error } = await admin.from('user_documents').delete().eq('id', id).eq('user_id', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
