#!/usr/bin/env tsx
/**
 * Script para probar el sistema de alertas manualmente
 * Verifica que el cron /api/cron/alertas funciona correctamente
 */

import { config } from 'dotenv'

// Cargar .env.local
config({ path: '.env.local' })

console.log('🔔 Probando sistema de alertas...\n')

const CRON_URL = process.env.NEXT_PUBLIC_SITE_URL 
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/cron/alertas`
  : 'http://localhost:3000/api/cron/alertas'

const CRON_SECRET = process.env.CRON_SECRET

console.log(`📍 URL: ${CRON_URL}`)
console.log(`🔐 Secret: ${CRON_SECRET ? '✅ Configurado' : '⚠️ No configurado'}\n`)

try {
  console.log('📤 Llamando al cron de alertas...')
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (CRON_SECRET) {
    headers['x-cron-secret'] = CRON_SECRET
  }
  
  const response = await fetch(CRON_URL, {
    method: 'POST',
    headers,
  })
  
  const data = await response.json()
  
  console.log('\n📊 Respuesta del servidor:')
  console.log(`   Status: ${response.status}`)
  console.log(`   Processed: ${data.processed ?? 0} alertas`)
  console.log(`   Emailed: ${data.emailed ?? 0} emails enviados`)
  
  if (!response.ok) {
    console.log(`   ❌ Error: ${data.error}`)
  } else if (data.emailed === 0) {
    console.log('\n⚠️ No se enviaron emails porque:')
    console.log('   - No hay alertas activas')
    console.log('   - Las alertas no tienen nuevos pisos')
    console.log('   - Las alertas ya se enviaron recientemente')
  } else {
    console.log(`\n✅ Éxito: ${data.emailed} email(s) enviado(s)`)
  }
  
} catch (error) {
  console.error('\n❌ Error al probar alertas:', error)
  process.exit(1)
}

console.log('\n✅ Test completado')
