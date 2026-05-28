#!/usr/bin/env node --loader ts-node/esm
/**
 * check-pedidos-reales.mts
 * 
 * Verifica todos los pedidos en gestoria_requests y muestra:
 * - Cuáles son reales (con session_id de Stripe válido)
 * - Cuáles son de prueba/debug
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY!

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Faltan variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})

async function main() {
  console.log('🔍 Consultando pedidos en gestoria_requests...\n')

  const { data: pedidos, error } = await sb
    .from('gestoria_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!pedidos || pedidos.length === 0) {
    console.log('✅ No hay pedidos en la base de datos')
    return
  }

  console.log(`📊 TOTAL PEDIDOS: ${pedidos.length}\n`)
  console.log('═'.repeat(100))

  let pagados = 0
  let pendientes = 0
  let prueba = 0

  pedidos.forEach((p, idx) => {
    const num = `#${idx + 1}`.padEnd(4)
    const estado = p.status === 'paid' ? '✅ PAGADO' : '⏳ PENDIENTE'
    const cliente = p.client_name || p.client_email || 'Sin nombre'
    const servicio = p.service_key || 'Sin servicio'
    const fecha = new Date(p.created_at).toLocaleString('es-ES')
    const monto = p.amount_eur || 0
    const sessionId = p.session_id || 'NO SESSION_ID'
    
    // Clasificar
    if (p.status === 'paid') pagados++
    else pendientes++
    
    // Detectar pedidos de prueba (sin session_id o session_id inválido)
    const esPrueba = !sessionId || sessionId === 'NO SESSION_ID' || !sessionId.startsWith('cs_')
    if (esPrueba) prueba++

    console.log(`${num} ${estado.padEnd(12)} | ${cliente.substring(0, 25).padEnd(25)} | ${servicio.substring(0, 30).padEnd(30)}`)
    console.log(`     💰 ${monto} €  |  📅 ${fecha}`)
    console.log(`     🔗 Session: ${sessionId}  ${esPrueba ? '⚠️ POSIBLE PRUEBA' : '✅ REAL'}`)
    console.log(`     📧 ${p.client_email || 'Sin email'}  |  📱 ${p.client_phone || 'Sin teléfono'}`)
    console.log('─'.repeat(100))
  })

  console.log('\n📈 RESUMEN:')
  console.log(`   Total:      ${pedidos.length}`)
  console.log(`   Pagados:    ${pagados}`)
  console.log(`   Pendientes: ${pendientes}`)
  console.log(`   Prueba/Debug: ${prueba} ⚠️`)

  if (prueba > 0) {
    console.log('\n⚠️  IMPORTANTE: Hay pedidos que parecen de prueba (sin session_id válido)')
    console.log('    Puedes eliminarlos manualmente desde Supabase Dashboard o crear un script de limpieza')
  }

  console.log('\n💡 Para ver solo pedidos REALES de Wilson u otros clientes:')
  console.log('   Busca los que tienen session_id válido (cs_xxxxx) y email/nombre real')
}

main().catch(console.error)
