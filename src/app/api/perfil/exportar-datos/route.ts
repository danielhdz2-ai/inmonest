import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const uid = user.id
  const email = user.email ?? ''

  const [
    profileRes,
    favoritesRes,
    listingsRes,
    docsRes,
    notifRes,
    gestoriaRes,
  ] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('user_id', uid).maybeSingle(),
    supabase.from('user_favorites').select('listing_id, created_at').eq('user_id', uid),
    supabase
      .from('listings')
      .select(
        'id, title, status, price, operation, property_type, city, created_at, updated_at',
      )
      .eq('owner_user_id', uid),
    supabase
      .from('user_documents')
      .select('doc_key, file_name, status, uploaded_at, reviewed_at')
      .eq('user_id', uid),
    supabase.from('user_notification_preferences').select('*').eq('user_id', uid).maybeSingle(),
    supabase
      .from('gestoria_requests')
      .select('id, service_key, status, created_at, client_name, client_email, client_phone')
      .eq('user_id', uid),
  ])

  const exportPayload = {
    exported_at: new Date().toISOString(),
    format: 'inmonest-rgpd-export-v1',
    account: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      user_metadata: user.user_metadata,
    },
    profile: profileRes.data ?? null,
    favorites: favoritesRes.data ?? [],
    listings: listingsRes.data ?? [],
    documents_metadata: docsRes.data ?? [],
    user_notification_preferences: notifRes.data ?? null,
    gestoria_requests: gestoriaRes.data ?? [],
    note:
      'Este archivo no incluye contenido binario de documentos subidos; solo metadatos. Para copias de archivos, solicítalo a info@inmonest.com.',
  }

  const filename = `inmonest-datos-${uid.slice(0, 8)}-${Date.now()}.json`

  return new NextResponse(JSON.stringify(exportPayload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
