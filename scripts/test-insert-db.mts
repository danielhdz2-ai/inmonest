#!/usr/bin/env tsx
/**
 * Verifica la estructura de la tabla gestoria_requests
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variables no configuradas')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function main() {
  console.log('🔍 Probando inserción en gestoria_requests...\n')

  const testData = {
    session_id: `test_${Date.now()}`,
    service_key: 'arras-penitenciales',
    client_email: 'test@test.com',
    client_name: 'Test Cliente',
    client_phone: '123456789',
    amount_eur: 145.00,
    status: 'paid',
    paid_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    stripe_payment_intent: 'pi_test_123',
    user_id: null,
    step: 1,
  }

  console.log('Intentando insertar:', JSON.stringify(testData, null, 2))
  console.log('')

  const { data, error } = await supabase
    .from('gestoria_requests')
    .insert(testData)
    .select()

  if (error) {
    console.error('❌ ERROR AL INSERTAR:')
    console.error('  Mensaje:', error.message)
    console.error('  Código:', error.code)
    console.error('  Detalles:', error.details)
    console.error('  Hint:', error.hint)
    
    if (error.message.includes('column')) {
      console.error('\n⚠️  PROBLEMA: Columna faltante en la tabla')
      console.error('Solución: Ejecuta la migración de base de datos')
    }
  } else {
    console.log('✅ Inserción exitosa!')
    console.log('Datos insertados:', data)
    
    // Eliminar el registro de prueba
    await supabase
      .from('gestoria_requests')
      .delete()
      .eq('session_id', testData.session_id)
    
    console.log('\n✅ Registro de prueba eliminado')
    console.log('\n✅ La tabla gestoria_requests está funcionando correctamente')
  }
}

main().catch(console.error)
