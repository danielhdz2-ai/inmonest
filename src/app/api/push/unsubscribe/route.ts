/**
 * API Route: Desuscribir usuario de notificaciones push
 * Elimina la suscripción de la base de datos
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { endpoint } = await req.json()
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint requerido' },
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

    // Eliminar suscripción
    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', user.id)
      .eq('endpoint', endpoint)

    if (error) {
      console.error('[Push Unsubscribe] Error eliminando:', error)
      return NextResponse.json(
        { error: 'Error eliminando suscripción' },
        { status: 500 }
      )
    }

    console.log(`✅ [Push] Usuario ${user.email} desuscrito`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Push Unsubscribe] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
