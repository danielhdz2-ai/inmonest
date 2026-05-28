#!/usr/bin/env node --loader ts-node/esm
/**
 * clean-pedidos-prueba.mts
 * 
 * ELIMINA todos los pedidos de prueba (sin session_id de Stripe válido)
 * Deja la base de datos limpia para pedidos reales
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
  console.log('🔍 Buscando pedidos de prueba...\n')

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

  // Filtrar pedidos de prueba (sin session_id válido de Stripe)
  // EXCEPCIÓN: Mantener el pedido real de Wilson (manual_wilson_1779782333.548333)
  const pedidosPrueba = pedidos.filter(p => {
    const sessionId = p.session_id || ''
    const email = p.client_email || ''
    
    // Mantener pedido de Wilson (pagado y con documentación real)
    if (email === 'wilval7126@gmail.com' && sessionId.includes('manual_wilson')) {
      return false // NO eliminar
    }
    
    // Un session_id real de Stripe siempre empieza con cs_
    return !sessionId.startsWith('cs_')
  })

  if (pedidosPrueba.length === 0) {
    console.log('✅ No hay pedidos de prueba para eliminar')
    console.log(`   Todos los ${pedidos.length} pedidos tienen session_id válido de Stripe`)
    return
  }

  console.log(`📊 PEDIDOS A ELIMINAR: ${pedidosPrueba.length} de ${pedidos.length} totales\n`)
  console.log('═'.repeat(80))

  pedidosPrueba.forEach((p, idx) => {
    const num = `#${idx + 1}`.padEnd(4)
    const estado = p.status === 'paid' ? '✅ PAGADO' : '⏳ PENDIENTE'
    const cliente = p.client_name || p.client_email || 'Sin nombre'
    const servicio = p.service_key || 'Sin servicio'
    const sessionId = p.session_id || 'NO SESSION_ID'
    
    console.log(`${num} ${estado.padEnd(12)} | ${cliente.substring(0, 25).padEnd(25)} | ${servicio.substring(0, 25).padEnd(25)}`)
    console.log(`     Session: ${sessionId}`)
    console.log('─'.repeat(80))
  })

  console.log('\n⚠️  ¿CONFIRMAR ELIMINACIÓN?\n')
  console.log('   Se eliminarán TODOS los pedidos listados arriba')
  console.log('   Esta acción NO se puede deshacer')
  console.log('\n   Para CONFIRMAR: ejecuta el script con --confirm')
  console.log('   Ejemplo: node --import tsx scripts/clean-pedidos-prueba.mts --confirm\n')

  const confirmar = process.argv.includes('--confirm')
  
  if (!confirmar) {
    console.log('❌ Cancelado (no se proporcionó --confirm)')
    return
  }

  // Eliminar pedidos
  console.log('\n🗑️  ELIMINANDO pedidos...\n')

  const ids = pedidosPrueba.map(p => p.id)
  const { error: deleteError } = await sb
    .from('gestoria_requests')
    .delete()
    .in('id', ids)

  if (deleteError) {
    console.error('❌ Error al eliminar:', deleteError.message)
    process.exit(1)
  }

  console.log(`✅ ${pedidosPrueba.length} pedidos de prueba eliminados correctamente\n`)

  // Verificar base de datos limpia
  const { data: pedidosRestantes } = await sb
    .from('gestoria_requests')
    .select('*')

  console.log(`📊 ESTADO FINAL:`)
  console.log(`   Pedidos restantes: ${pedidosRestantes?.length || 0}`)
  
  if (pedidosRestantes && pedidosRestantes.length > 0) {
    console.log('\n✅ PEDIDOS REALES (con session_id válido):')
    pedidosRestantes.forEach(p => {
      console.log(`   - ${p.client_name} | ${p.service_key} | ${p.session_id}`)
    })
  } else {
    console.log('\n✅ Base de datos completamente limpia - lista para pedidos reales\n')
  }
}

main().catch(console.error)
