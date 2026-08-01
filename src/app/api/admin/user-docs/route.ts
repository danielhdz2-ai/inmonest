import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  notifyClientDocRejected,
  notifyClientDocValidated,
} from '@/lib/gestoria-client-emails'

export const dynamic = 'force-dynamic'

function getAdminClient() {
  return createAdminClient()
}

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmails = [process.env.CONTACT_NOTIFY_EMAIL, 'inmonest.admin@gmail.com'].filter(Boolean)
  return adminEmails.includes(user.email)
}

// GET: listar todos los documentos personales de usuarios
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const adminSb = getAdminClient()

  const { data: docs, error } = await adminSb
    .from('user_documents')
    .select('id, user_id, doc_key, file_name, status, uploaded_at, notes, storage_path, gestoria_request_id, partes_data')
    .order('uploaded_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const uniqueUserIds = [...new Set((docs ?? []).map(d => d.user_id))]
  const emailMap: Record<string, string> = {}
  const nameMap:  Record<string, string> = {}

  if (uniqueUserIds.length > 0) {
    const { data: profiles } = await adminSb
      .from('user_profiles')
      .select('user_id, full_name')
      .in('user_id', uniqueUserIds)
    ;(profiles ?? []).forEach(p => { nameMap[p.user_id] = p.full_name ?? '' })

    await Promise.all(uniqueUserIds.map(async (uid) => {
      const { data } = await adminSb.auth.admin.getUserById(uid)
      if (data?.user?.email) emailMap[uid] = data.user.email
    }))
  }

  const enriched = (docs ?? []).map(d => ({
    ...d,
    user_email: emailMap[d.user_id] ?? d.user_id,
    user_name:  nameMap[d.user_id]  ?? '',
  }))

  return NextResponse.json({ docs: enriched })
}

// POST: generar URL firmada de descarga
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { storage_path } = await req.json()
  if (!storage_path) return NextResponse.json({ error: 'storage_path requerido' }, { status: 400 })

  const adminSb = getAdminClient()
  const { data, error } = await adminSb.storage
    .from('user-docs')
    .createSignedUrl(storage_path, 3600)

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message ?? 'Error' }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}

// PATCH: actualizar estado / notas de un documento
export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { doc_id, status, notes } = await req.json()
  if (!doc_id) return NextResponse.json({ error: 'doc_id requerido' }, { status: 400 })

  const adminSb = getAdminClient()

  const { data: before } = await adminSb
    .from('user_documents')
    .select('id, doc_key, status, user_id, gestoria_request_id')
    .eq('id', doc_id)
    .maybeSingle()

  const { data, error } = await adminSb
    .from('user_documents')
    .update({
      status,
      notes,
      reviewed_at: status === 'validated' || status === 'rejected' ? new Date().toISOString() : null,
    })
    .eq('id', doc_id)
    .select('id, status, notes')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (before && status && status !== before.status && before.user_id) {
    const { data: authUser } = await adminSb.auth.admin.getUserById(before.user_id)
    const clientEmail = authUser?.user?.email

    let clientName: string | null = null
    if (before.gestoria_request_id) {
      const { data: requestRow } = await adminSb
        .from('gestoria_requests')
        .select('client_name')
        .eq('id', before.gestoria_request_id)
        .maybeSingle()
      clientName = requestRow?.client_name ?? null
    }

    if (clientEmail) {
      if (status === 'validated') {
        void notifyClientDocValidated({
          to: clientEmail,
          clientName,
          docKey: before.doc_key,
        })
      } else if (status === 'rejected') {
        void notifyClientDocRejected({
          to: clientEmail,
          clientName,
          docKey: before.doc_key,
          reason: notes,
        })
      }
    }
  }

  return NextResponse.json({ ok: true, doc: data })
}
