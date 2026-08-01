import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { decodeEnvKey } from '@/lib/stripe-key'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmails = [process.env.CONTACT_NOTIFY_EMAIL, 'inmonest.admin@gmail.com'].filter(Boolean)
  return adminEmails.includes(user.email)
}

/**
 * GET /api/admin/sync-stripe
 * Sincroniza ventas de Stripe LIVE a gestoria_requests
 * Solo admin puede ejecutarlo
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  try {
    const stripeSecretKey = decodeEnvKey(process.env.STRIPE_SECRET_KEY ?? '')
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY no configurada' }, { status: 500 })
    }

    // Verificar que sea clave LIVE
    if (!stripeSecretKey.startsWith('sk_live_')) {
      return NextResponse.json({ 
        error: 'Solo funciona con claves de producción (sk_live_)',
        currentKey: stripeSecretKey.substring(0, 10) + '...'
      }, { status: 400 })
    }

    const adminSb = createAdminClient()

    // Importar Stripe dinámicamente
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-03-25.dahlia',
    })

    // Obtener últimas 50 sesiones completadas
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ['data.customer'],
    })

    const completedSessions = sessions.data.filter(s => s.status === 'complete')

    // Email de prueba a excluir
    const TEST_EMAIL = 'daniel.trading.sniper@gmail.com'
    
    const realSessions = completedSessions.filter(s => {
      const email = s.customer_details?.email || (s.customer_email as string) || (s.metadata?.client_email as string) || ''
      return email !== TEST_EMAIL
    })

    // Obtener ventas existentes
    const { data: existingRequests } = await adminSb
      .from('gestoria_requests')
      .select('session_id')

    const existingSessionIds = new Set(existingRequests?.map(r => r.session_id) || [])

    const inserted = []
    const skipped = []
    const errors = []

    for (const session of realSessions) {
      const sessionId = session.id as string

      if (existingSessionIds.has(sessionId)) {
        skipped.push(sessionId)
        continue
      }

      const metadata = (session.metadata as Record<string, string>) || {}
      const serviceKey = metadata.service_key || 'unknown'
      const amount = typeof session.amount_total === 'number' ? (session.amount_total / 100) : 0
      const customerEmail = session.customer_details?.email || (session.customer_email as string) || metadata.client_email || ''
      const customerName = metadata.client_name || session.customer_details?.name || 'Cliente'
      const customerPhone = metadata.client_phone || session.customer_details?.phone || null
      const createdAt = new Date((session.created as number) * 1000).toISOString()
      const paymentIntent = session.payment_intent as string | null

      const { error } = await adminSb
        .from('gestoria_requests')
        .insert({
          session_id: sessionId,
          service_key: serviceKey,
          client_email: customerEmail,
          client_name: customerName,
          client_phone: customerPhone,
          amount_eur: amount,
          status: 'paid',
          paid_at: createdAt,
          created_at: createdAt,
          stripe_payment_intent: paymentIntent,
          user_id: metadata.user_id || null,
          step: 1,
        })

      if (error) {
        errors.push({
          sessionId,
          error: error.message,
          email: customerEmail
        })
      } else {
        inserted.push({
          sessionId,
          email: customerEmail,
          service: serviceKey,
          amount: amount
        })
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        total_stripe_sessions: completedSessions.length,
        real_sessions: realSessions.length,
        already_in_db: skipped.length,
        newly_inserted: inserted.length,
        errors: errors.length
      },
      inserted,
      skipped: skipped.slice(0, 5), // Solo primeros 5
      errors
    })

  } catch (error) {
    console.error('[sync-stripe] Error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }, { status: 500 })
  }
}
