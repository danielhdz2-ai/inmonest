#!/usr/bin/env tsx
/**
 * Verifica TODAS las ventas en gestoria_requests (sin filtros de Stripe)
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variables de entorno no configuradas')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function main() {
  console.log('📊 Verificando ventas en gestoria_requests...\n')

  // Obtener TODAS las ventas
  const { data: allRequests, error } = await supabase
    .from('gestoria_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  console.log(`Total de ventas en DB: ${allRequests.length}\n`)
  console.log('='.repeat(120))

  if (allRequests.length === 0) {
    console.log('\n⚠️  No hay ventas en la base de datos')
    console.log('\nPosibles causas:')
    console.log('1. El webhook no está guardando las ventas')
    console.log('2. Las ventas están en una tabla diferente')
    console.log('3. Hay un problema de permisos con Supabase')
    return
  }

  // Emails de prueba
  const TEST_EMAILS = ['daniel.trading.sniper@gmail.com']

  // Separar ventas reales y de prueba
  const realSales = allRequests.filter(r => !TEST_EMAILS.includes(r.client_email || ''))
  const testSales = allRequests.filter(r => TEST_EMAILS.includes(r.client_email || ''))

  console.log(`\n📦 VENTAS REALES (${realSales.length}):\n`)
  console.log('-'.repeat(120))

  for (const sale of realSales) {
    const fecha = new Date(sale.created_at).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
    const paidAt = sale.paid_at ? new Date(sale.paid_at).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }) : 'No pagado'
    const sessionType = sale.session_id?.startsWith('cs_live_') ? '🟢 PRODUCCIÓN' : sale.session_id?.startsWith('cs_test_') ? '🔵 TEST' : '❓'
    
    console.log(`${sessionType}`)
    console.log(`  Fecha creación: ${fecha}`)
    console.log(`  Fecha pago: ${paidAt}`)
    console.log(`  Cliente: ${sale.client_name} (${sale.client_email})`)
    console.log(`  Servicio: ${sale.service_key}`)
    console.log(`  Importe: ${sale.amount_eur} €`)
    console.log(`  Estado: ${sale.status}`)
    console.log(`  Step: ${sale.step || 0}`)
    console.log(`  Session ID: ${sale.session_id || 'N/A'}`)
    console.log('-'.repeat(120))
  }

  if (testSales.length > 0) {
    console.log(`\n🧪 VENTAS DE PRUEBA (${testSales.length}):\n`)
    console.log('-'.repeat(120))
    for (const sale of testSales) {
      const fecha = new Date(sale.created_at).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
      console.log(`  ${fecha} - ${sale.client_name} - ${sale.service_key} - ${sale.amount_eur}€`)
    }
  }

  console.log('\n' + '='.repeat(120))
  console.log('\n📊 RESUMEN:')
  console.log(`  Total ventas: ${allRequests.length}`)
  console.log(`  Ventas reales: ${realSales.length}`)
  console.log(`  Ventas de prueba: ${testSales.length}`)
  console.log(`  Ventas en producción: ${allRequests.filter(r => r.session_id?.startsWith('cs_live_')).length}`)
  console.log(`  Ventas en test: ${allRequests.filter(r => r.session_id?.startsWith('cs_test_')).length}`)
}

main().catch(console.error)
