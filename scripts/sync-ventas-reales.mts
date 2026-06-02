#!/usr/bin/env tsx
/**
 * Sincroniza SOLO las ventas reales faltantes de Stripe a gestoria_requests
 * Excluye automáticamente las ventas de prueba
 */

import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !STRIPE_SECRET) {
  console.error('❌ Variables de entorno no configuradas')
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
  apiVersion: '2024-11-20.acacia',
})

// Emails de prueba a excluir
const TEST_EMAILS = ['daniel.trading.sniper@gmail.com']

async function main() {
  console.log('🔄 Sincronizando ventas reales de Stripe...\n')

  // 1. Obtener todas las sesiones completadas
  console.log('📊 Obteniendo sesiones de Stripe...')
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ['data.line_items', 'data.customer'],
  })

  const completedSessions = sessions.data.filter(s => s.status === 'complete')
  console.log(`✅ ${completedSessions.length} sesiones completadas encontradas\n`)

  // 2. Filtrar solo sesiones reales (excluir pruebas)
  const realSessions = completedSessions.filter(s => {
    const email = s.customer_details?.email || s.customer_email || s.metadata?.client_email || ''
    return !TEST_EMAILS.includes(email)
  })

  console.log(`✨ ${realSessions.length} sesiones reales (después de excluir pruebas)\n`)

  // 3. Obtener ventas existentes en DB
  const { data: existingRequests } = await supabase
    .from('gestoria_requests')
    .select('session_id')

  const existingSessionIds = new Set(existingRequests?.map(r => r.session_id) || [])
  console.log(`💾 ${existingSessionIds.size} ventas ya en DB\n`)

  // 4. Sincronizar las faltantes
  let inserted = 0
  let skipped = 0

  console.log('🚀 Procesando ventas...\n')
  console.log('='.repeat(100))

  for (const session of realSessions) {
    const sessionId = session.id
    const metadata = session.metadata || {}
    const serviceKey = metadata.service_key || 'unknown'
    const amount = session.amount_total ? (session.amount_total / 100) : 0
    const customerEmail = session.customer_details?.email || session.customer_email || metadata.client_email || ''
    const customerName = metadata.client_name || session.customer_details?.name || 'Cliente'
    const customerPhone = metadata.client_phone || session.customer_details?.phone || null
    const createdAt = new Date(session.created * 1000)
    const createdAtStr = createdAt.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const createdAtISO = createdAt.toISOString()
    const paymentIntent = session.payment_intent as string | null

    // Saltar si ya existe
    if (existingSessionIds.has(sessionId)) {
      console.log(`✅ YA EXISTE: ${serviceKey} - ${amount}€ - ${customerName} (${createdAtStr})`)
      skipped++
      continue
    }

    console.log(`\n📝 NUEVA VENTA:`)
    console.log(`   Fecha: ${createdAtStr}`)
    console.log(`   Cliente: ${customerName}`)
    console.log(`   Email: ${customerEmail}`)
    console.log(`   Servicio: ${serviceKey}`)
    console.log(`   Importe: ${amount} €`)
    console.log(`   Session: ${sessionId.substring(0, 30)}...`)

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
        paid_at: createdAtISO,
        created_at: createdAtISO,
        stripe_payment_intent: paymentIntent,
        user_id: metadata.user_id || null,
        step: 1,
      })

    if (error) {
      console.log(`   ❌ ERROR: ${error.message}`)
    } else {
      console.log(`   ✅ INSERTADA CORRECTAMENTE`)
      inserted++
    }
  }

  console.log('\n' + '='.repeat(100))
  console.log(`\n📊 RESUMEN:`)
  console.log(`   Total sesiones Stripe: ${completedSessions.length}`)
  console.log(`   Sesiones reales: ${realSessions.length}`)
  console.log(`   Ya existentes: ${skipped}`)
  console.log(`   Nuevas insertadas: ${inserted}`)
  
  if (inserted > 0) {
    console.log(`\n✅ ¡${inserted} venta(s) importada(s) exitosamente!`)
    console.log(`\nRecarga el panel de admin para verlas.`)
  } else if (skipped === realSessions.length) {
    console.log(`\n✅ Todas las ventas reales ya están sincronizadas.`)
  }

  console.log(`\n💡 El webhook está activo, las futuras ventas se guardarán automáticamente.`)
}

main().catch(console.error)
