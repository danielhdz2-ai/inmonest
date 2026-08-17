import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  return isAdminEmail(user.email)
}

/**
 * GET /api/admin/activity?request_id=xxx
 * Obtiene el timeline de actividad de un pedido
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const requestId = req.nextUrl.searchParams.get('request_id')
  if (!requestId) {
    return NextResponse.json({ error: 'Falta request_id' }, { status: 400 })
  }

  const adminSb = createAdminClient()

  const { data: activity, error } = await adminSb
    .from('gestoria_activity')
    .select('*')
    .eq('request_id', requestId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ activity: activity || [] })
}

/**
 * POST /api/admin/activity
 * Agregar una actividad manual al timeline
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { data: { user } } = await supabase.auth.getUser()
  const body = await req.json()
  const { request_id, activity_type, description, metadata } = body

  if (!request_id || !activity_type || !description) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const adminSb = createAdminClient()

  const { data, error } = await adminSb
    .from('gestoria_activity')
    .insert({
      request_id,
      activity_type,
      description,
      metadata: metadata || {},
      created_by: user?.email || 'admin'
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ activity: data })
}
