#!/usr/bin/env tsx
/**
 * Verifica las ventas recientes de Stripe y compara con gestoria_requests
 * Para diagnosticar por qué las ventas nuevas no aparecen en el panel
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

// Decodificar la clave si está codificada
function decodeKey(key: string): string {
  if (key.startsWith('b64:')) {
    return Buffer.from(key.slice(4), 'base64').toString('utf-8')
  }
  return key
}

const stripe = new Stripe(decodeKey(STRIPE_SECRET), {
  apiVersion: '2024-11-20.acacia',
})

async function main() {
  console.log('🔍 Verificando ventas de Stripe vs gestoria_requests...\n')

  // 1. Obtener últimas 20 sesiones completadas de Stripe
  console.log('📊 Obteniendo últimas sesiones de Stripe...')
  const sessions = await stripe.checkout.sessions.list({
    limit: 20,
    expand: ['data.line_items', 'data.customer'],
  })

  const completedSessions = sessions.data.filter(s => s.status === 'complete')
  console.log(`✅ Encontradas ${completedSessions.length} sesiones completadas\n`)

  // 2. Obtener todas las ventas de gestoria_requests
  const { data: requests, error } = await supabase
    .from('gestoria_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('❌ Error al obtener gestoria_requests:', error.message)
    process.exit(1)
  }

  console.log(`💾 Encontradas ${requests.length} ventas en gestoria_requests\n`)

  // 3. Comparar
  console.log('🔎 ANÁLISIS DE DISCREPANCIAS:\n')
  console.log('=' .repeat(100))

  let missing = 0
  for (const session of completedSessions) {
    const sessionId = session.id
    const metadata = session.metadata || {}
    const serviceKey = metadata.service_key || 'N/A'
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
    const customerEmail = session.customer_details?.email || session.customer_email || metadata.client_email || 'N/A'
    const customerName = metadata.client_name || session.customer_details?.name || 'N/A'
    const createdAt = new Date(session.created * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

    // Buscar en gestoria_requests
    const found = requests.find(r => r.session_id === sessionId)

    if (!found) {
      missing++
      console.log(`❌ FALTA EN DB:`)
      console.log(`   Session ID: ${sessionId}`)
      console.log(`   Fecha: ${createdAt}`)
      console.log(`   Cliente: ${customerName} (${customerEmail})`)
      console.log(`   Servicio: ${serviceKey}`)
      console.log(`   Importe: ${amount} €`)
      console.log(`   Payment Intent: ${session.payment_intent || 'N/A'}`)
      console.log('')
    } else {
      console.log(`✅ OK: ${serviceKey} - ${amount}€ - ${customerEmail} (${createdAt})`)
    }
  }

  console.log('=' .repeat(100))
  console.log(`\n📊 RESUMEN:`)
  console.log(`   Total sesiones Stripe: ${completedSessions.length}`)
  console.log(`   Total en DB: ${requests.length}`)
  console.log(`   Faltantes en DB: ${missing}`)

  if (missing > 0) {
    console.log(`\n⚠️  HAY ${missing} VENTAS QUE NO ESTÁN EN LA BASE DE DATOS`)
    console.log(`\n🔧 POSIBLES CAUSAS:`)
    console.log(`   1. El webhook de Stripe no está configurado o no está funcionando`)
    console.log(`   2. El webhook está configurado pero hay errores en la inserción`)
    console.log(`   3. Las ventas son anteriores a la implementación del sistema`)
    console.log(`\n💡 SOLUCIONES:`)
    console.log(`   1. Verifica que el webhook está activo en Stripe Dashboard`)
    console.log(`   2. Verifica los logs del webhook en Vercel/Railway`)
    console.log(`   3. Ejecuta el script de sincronización manual`)
  } else {
    console.log(`\n✅ Todas las ventas de Stripe están sincronizadas correctamente`)
  }

  // 4. Mostrar eventos webhook recientes de Stripe
  console.log(`\n📡 EVENTOS WEBHOOK RECIENTES (últimos 10):\n`)
  const events = await stripe.events.list({ limit: 10, type: 'checkout.session.completed' })
  
  for (const event of events.data) {
    const session = event.data.object as Stripe.Checkout.Session
    const createdAt = new Date(event.created * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const delivered = event.request ? '✅ Entregado al webhook' : '⚠️  No entregado'
    console.log(`${delivered} - ${createdAt} - Session: ${session.id}`)
  }
}

main().catch(console.error)
