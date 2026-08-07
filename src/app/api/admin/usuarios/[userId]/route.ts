import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = [
  process.env.CONTACT_NOTIFY_EMAIL,
  'inmonest.admin@gmail.com',
].filter(Boolean) as string[]

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email) return { ok: false as const, user: null }
  const email = user.email.trim()
  if (!ADMIN_EMAILS.includes(email)) return { ok: false as const, user: null }
  return { ok: true as const, user }
}

/**
 * DELETE /api/admin/usuarios/[userId]
 * Baja completa de un usuario registrado (clientes particulares / propietarios sin gestoría pagada).
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const supabase = await createClient()
  const auth = await isAdmin(supabase)
  if (!auth.ok) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { userId } = await params
  if (!userId) {
    return NextResponse.json({ error: 'Falta id de usuario' }, { status: 400 })
  }

  if (auth.user.id === userId) {
    return NextResponse.json({ error: 'No puedes darte de baja a ti mismo desde el panel' }, { status: 400 })
  }

  const adminSb = createAdminClient()
  const { data: target, error: getError } = await adminSb.auth.admin.getUserById(userId)

  if (getError || !target.user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  const targetEmail = (target.user.email || '').trim().toLowerCase()
  if (ADMIN_EMAILS.some((e) => e.toLowerCase() === targetEmail)) {
    return NextResponse.json({ error: 'No se puede eliminar una cuenta de administrador' }, { status: 400 })
  }

  const emailNorm = targetEmail
  const { data: paidGestoria } = await adminSb
    .from('gestoria_requests')
    .select('id')
    .ilike('client_email', emailNorm)
    .eq('status', 'paid')
    .limit(1)

  if (paidGestoria && paidGestoria.length > 0) {
    return NextResponse.json(
      {
        error:
          'Este usuario tiene pedidos de gestoría pagados. Gestiona la baja desde Expedientes o contacta soporte.',
      },
      { status: 409 }
    )
  }

  await adminSb
    .from('listings')
    .update({ status: 'archived', owner_user_id: null })
    .eq('owner_user_id', userId)

  await adminSb.from('user_favorites').delete().eq('user_id', userId)
  await adminSb.from('user_profiles').delete().eq('user_id', userId)
  await adminSb.from('user_notification_preferences').delete().eq('user_id', userId)

  const { error: deleteError } = await adminSb.auth.admin.deleteUser(userId)
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    email: target.user.email,
  })
}
