#!/usr/bin/env tsx
/**
 * Agregar manualmente la venta de Mónica Pérez
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
  console.log('📝 Agregando venta de Mónica Pérez Almazán...\n')

  // Datos de la venta según el email
  const venta = {
    session_id: 'cs_live_a1fwDalWH0gOGWEuOOMhJXOFwcNsUhrlbM13J7iuOxNMYWjV4EB5WH+vR',
    service_key: 'arras-penitenciales',
    service_name: 'Contrato de Arras Penitenciales',
    price_eur: 145.00,
    client_email: 'artegranada18@gmail.com',
    client_name: 'Mónica Pérez Almazán',
    client_phone: '659657451',
    amount_eur: 145.00,
    status: 'paid',
    paid_at: '2026-05-29T09:55:52.000Z', // 29/5/2026, 11:55:52
    created_at: '2026-05-29T09:55:52.000Z',
    step: 1, // Iniciado
  }

  console.log('Datos a insertar:')
  console.log('  Cliente:', venta.client_name)
  console.log('  Email:', venta.client_email)
  console.log('  Teléfono:', venta.client_phone)
  console.log('  Servicio:', venta.service_key)
  console.log('  Importe:', venta.amount_eur, '€')
  console.log('  Fecha:', new Date(venta.created_at).toLocaleString('es-ES'))
  console.log('')

  const { data, error } = await supabase
    .from('gestoria_requests')
    .insert(venta)
    .select()

  if (error) {
    console.error('❌ ERROR:', error.message)
    console.error('Detalles:', error.details)
    process.exit(1)
  }

  console.log('✅ Venta agregada exitosamente!')
  console.log('\nDatos guardados:', JSON.stringify(data, null, 2))
  console.log('\n🎉 Ahora deberías ver la venta en el panel de admin')
}

main().catch(console.error)
