#!/usr/bin/env tsx
/**
 * Sincroniza ventas de Stripe a gestoria_requests
 * Este script importa todas las ventas faltantes
 */

import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configuradas')
  process.exit(1)
}

if (!STRIPE_SECRET) {
  console.error('❌ STRIPE_SECRET_KEY no configurada')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

function decodeKey(key: string): string {
  if (key.startsWith('b64:')) {
    return Buffer.from(key.slice(4), 'base64').toString('utf-8')
  }
  return key
}

const stripe = new Stripe(decodeKey(STRIPE_SECRET), {
  apiVersion: '2026-03-25.dahlia',
})

async function main() {
  console.log('🔄 Sincronizando ventas de Stripe a gestoria_requests...\n')

  // 1. Obtener todas las sesiones completadas (últimas 100)
  console.log('📊 Obteniendo sesiones de Stripe...')
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ['data.line_items', 'data.customer'],
  })

  const completedSessions = sessions.data.filter(s => s.status === 'complete')
  console.log(`✅ Encontradas ${completedSessions.length} sesiones completadas\n`)

  // 2. Obtener ventas existentes en DB
  const { data: existingRequests } = await supabase
    .from('gestoria_requests')
    .select('session_id')

  const existingSessionIds = new Set(existingRequests?.map(r => r.session_id) || [])
  console.log(`💾 Ventas ya existentes en DB: ${existingSessionIds.size}\n`)

  // 3. Sincronizar las faltantes
  let inserted = 0
  let skipped = 0
  let errors = 0

  console.log('🚀 Insertando ventas faltantes...\n')

  for (const session of completedSessions) {
    const sessionId = session.id
    
    // Saltar si ya existe
    if (existingSessionIds.has(sessionId)) {
      skipped++
      continue
    }

    const metadata = session.metadata || {}
    const serviceKey = metadata.service_key || 'unknown'
    const amount = session.amount_total ? (session.amount_total / 100) : 0
    const customerEmail = session.customer_details?.email || session.customer_email || metadata.client_email || ''
    const customerName = metadata.client_name || session.customer_details?.name || 'Cliente'
    const customerPhone = metadata.client_phone || session.customer_details?.phone || null
    const createdAt = new Date(session.created * 1000).toISOString()
    const paymentIntent = session.payment_intent as string | null

    console.log(`  ⏳ Insertando: ${serviceKey} - ${amount}€ - ${customerEmail}`)

    const { error } = await supabase
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
        step: 1, // Iniciado
      })

    if (error) {
      console.error(`  ❌ Error: ${error.message}`)
      errors++
    } else {
      console.log(`  ✅ Insertado correctamente`)
      inserted++
    }
  }

  console.log('\n' + '='.repeat(80))
  console.log(`\n📊 RESUMEN DE SINCRONIZACIÓN:`)
  console.log(`   Total sesiones Stripe: ${completedSessions.length}`)
  console.log(`   Ya existentes (omitidas): ${skipped}`)
  console.log(`   Nuevas insertadas: ${inserted}`)
  console.log(`   Errores: ${errors}`)
  
  if (inserted > 0) {
    console.log(`\n✅ Sincronización completada. ${inserted} ventas importadas exitosamente.`)
    console.log(`\n💡 PRÓXIMOS PASOS:`)
    console.log(`   1. Verifica que las ventas aparezcan en el panel de admin`)
    console.log(`   2. Configura el webhook de Stripe para que las futuras ventas se guarden automáticamente`)
    console.log(`   3. URL del webhook: https://inmonest.com/api/webhooks/stripe`)
  } else if (errors === 0) {
    console.log(`\n✅ Todas las ventas ya están sincronizadas.`)
  }
}

main().catch(console.error)
