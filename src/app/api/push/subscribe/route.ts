/**
 * API Route: Suscribir usuario a notificaciones push
 * Guarda la suscripción en la base de datos
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const subscription = await req.json()
    
    // Validar formato de suscripción
    if (!subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: 'Suscripción inválida' },
        { status: 400 }
      )
    }

    // Verificar autenticación
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    // Guardar o actualizar suscripción
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert(
        {
          user_id: user.id,
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          user_agent: req.headers.get('user-agent') || null,
        },
        {
          onConflict: 'user_id,endpoint',
        }
      )

    if (error) {
      console.error('[Push Subscribe] Error guardando:', error)
      return NextResponse.json(
        { error: 'Error guardando suscripción' },
        { status: 500 }
      )
    }

    console.log(`✅ [Push] Usuario ${user.email} suscrito`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Push Subscribe] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
