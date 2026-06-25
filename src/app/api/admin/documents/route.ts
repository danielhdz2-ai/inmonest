import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const GESTORIA_DOC_KEYS = ['dni', 'nota-simple', 'escrituras'] as const

async function syncStorageDocs(supabase: ReturnType<typeof createAdminClient>) {
  const { data: requests } = await supabase
    .from('gestoria_requests')
    .select('id, session_id')
    .not('session_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(50)

  if (!requests?.length) return

  for (const req of requests) {
    if (!req.session_id) continue

    const { count } = await supabase
      .from('client_docs')
      .select('id', { count: 'exact', head: true })
      .eq('request_id', req.id)

    if (count && count >= GESTORIA_DOC_KEYS.length) continue

    for (const docKey of GESTORIA_DOC_KEYS) {
      const path = `${req.session_id}/${docKey}.pdf`
      const { data: fileList } = await supabase.storage
        .from('gestoria-docs')
        .list(req.session_id, { search: `${docKey}.pdf` })

      const exists = (fileList ?? []).some(f => f.name === `${docKey}.pdf`)
      if (!exists) continue

      const { data: existing } = await supabase
        .from('client_docs')
        .select('id')
        .eq('request_id', req.id)
        .eq('doc_key', docKey)
        .maybeSingle()

      if (existing) continue

      await supabase.from('client_docs').insert({
        request_id: req.id,
        session_id: req.session_id,
        doc_key: docKey,
        file_name: `${docKey}.pdf`,
        storage_path: path,
      })
    }
  }
}

interface UnifiedDocument {
  id: string
  source: 'gestoria' | 'usuario'
  doc_key: string
  file_name: string
  storage_path: string
  uploaded_at: string
  bucket: 'gestoria-docs' | 'user-docs'
  client_name: string | null
  client_email: string | null
  service_key: string | null
}

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const clientEmail = searchParams.get('email')

    // Sincronizar documentos en Storage que no estén registrados en BD
    await syncStorageDocs(supabase).catch(err =>
      console.error('[admin/documents] sync error:', err)
    )

    // ── Documentos de gestoría (client_docs) ──────────────────────────────
    let gestoriaQuery = supabase
      .from('client_docs')
      .select(`
        *,
        gestoria_requests(
          id,
          client_name,
          client_email,
          service_key,
          created_at
        )
      `)
      .order('uploaded_at', { ascending: false })

    if (clientEmail) {
      gestoriaQuery = gestoriaQuery.eq('gestoria_requests.client_email', clientEmail)
    }

    const { data: gestoriaDocs, error: gestoriaError } = await gestoriaQuery

    if (gestoriaError) {
      console.error('Error fetching gestoria documents:', gestoriaError)
      return NextResponse.json({ error: gestoriaError.message }, { status: 500 })
    }

    const gestoriaUnified: UnifiedDocument[] = (gestoriaDocs ?? []).map(doc => {
      const req = Array.isArray(doc.gestoria_requests)
        ? doc.gestoria_requests[0]
        : doc.gestoria_requests
      return {
        id: doc.id,
        source: 'gestoria' as const,
        doc_key: doc.doc_key,
        file_name: doc.file_name,
        storage_path: doc.storage_path,
        uploaded_at: doc.uploaded_at,
        bucket: 'gestoria-docs' as const,
        client_name: req?.client_name ?? null,
        client_email: req?.client_email ?? null,
        service_key: req?.service_key ?? null,
      }
    })

    // ── Documentos personales de usuarios (user_documents) ────────────────
    const { data: userDocs, error: userError } = await supabase
      .from('user_documents')
      .select('id, user_id, doc_key, file_name, storage_path, uploaded_at')
      .order('uploaded_at', { ascending: false })

    if (userError) {
      console.error('Error fetching user documents:', userError)
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    const uniqueUserIds = [...new Set((userDocs ?? []).map(d => d.user_id))]
    const emailMap: Record<string, string> = {}
    const nameMap: Record<string, string> = {}

    if (uniqueUserIds.length > 0) {
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('user_id, full_name')
        .in('user_id', uniqueUserIds)
      ;(profiles ?? []).forEach(p => { nameMap[p.user_id] = p.full_name ?? '' })

      await Promise.all(uniqueUserIds.map(async (uid) => {
        const { data } = await supabase.auth.admin.getUserById(uid)
        if (data?.user?.email) emailMap[uid] = data.user.email
      }))
    }

    let userUnified: UnifiedDocument[] = (userDocs ?? []).map(doc => ({
      id: doc.id,
      source: 'usuario' as const,
      doc_key: doc.doc_key,
      file_name: doc.file_name,
      storage_path: doc.storage_path,
      uploaded_at: doc.uploaded_at,
      bucket: 'user-docs' as const,
      client_name: nameMap[doc.user_id] ?? null,
      client_email: emailMap[doc.user_id] ?? null,
      service_key: null,
    }))

    if (clientEmail) {
      userUnified = userUnified.filter(
        d => d.client_email?.toLowerCase() === clientEmail.toLowerCase()
      )
    }

    const documents = [...gestoriaUnified, ...userUnified]
      .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())

    return NextResponse.json({ documents })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: generar URL firmada de descarga
export async function POST(request: Request) {
  try {
    const { storage_path, bucket } = await request.json()
    if (!storage_path) {
      return NextResponse.json({ error: 'storage_path requerido' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const bucketName = bucket === 'user-docs' ? 'user-docs' : 'gestoria-docs'

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(storage_path, 3600)

    if (error || !data?.signedUrl) {
      return NextResponse.json({ error: error?.message ?? 'Error' }, { status: 500 })
    }

    return NextResponse.json({ url: data.signedUrl })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
