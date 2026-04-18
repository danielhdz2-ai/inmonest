import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function DELETE() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  // 1. Desactivar/anonimizar anuncios del usuario (no borrar para preservar historial)
  await supabase
    .from('listings')
    .update({ status: 'archived', owner_user_id: null })
    .eq('owner_user_id', user.id)

  // 2. Borrar favoritos
  await supabase.from('user_favorites').delete().eq('user_id', user.id)

  // 3. Borrar perfil
  await supabase.from('user_profiles').delete().eq('user_id', user.id)

  // 4. Cerrar sesion
  await supabase.auth.signOut()

  // 5. Nota: el borrado real de auth.users requiere service_role.
  //    Para un flujo de baja completo, enviar email al admin para que lo procese manualmente.
  const adminEmail = process.env.CONTACT_NOTIFY_EMAIL
  if (adminEmail) {
    const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({
        from:    'Inmonest <noreply@inmonest.com>',
        to:      adminEmail,
        subject: '[Inmonest] Solicitud de baja de cuenta',
        html:    `<p>El usuario <strong>${user.email}</strong> (id: ${user.id}) ha solicitado la baja de su cuenta. Por favor, elimina el usuario en el panel de Supabase Authentication.</p>`,
      }),
    }).catch(() => null)
  }

  return NextResponse.json({ ok: true })
}
