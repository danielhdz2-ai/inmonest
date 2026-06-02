#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function analyzeUsers() {
  console.log('🔍 ANÁLISIS COMPLETO DE USUARIOS - INMONEST\n')
  console.log('═'.repeat(80))

  // 1. Usuarios registrados (auth.users)
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
  
  if (usersError) {
    console.log('❌ Error al obtener usuarios:', usersError.message)
  } else {
    console.log(`\n📊 USUARIOS REGISTRADOS: ${users.users.length}`)
    console.log('─'.repeat(80))
    
    if (users.users.length > 0) {
      users.users.forEach((user, idx) => {
        console.log(`\n${idx + 1}. ${user.email}`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Proveedor: ${user.app_metadata.provider || 'email'}`)
        console.log(`   Email confirmado: ${user.email_confirmed_at ? '✅' : '❌'}`)
        console.log(`   Registrado: ${new Date(user.created_at!).toLocaleString('es-ES')}`)
        console.log(`   Último login: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('es-ES') : 'Nunca'}`)
        console.log(`   Metadata: ${JSON.stringify(user.user_metadata || {}, null, 2)}`)
      })
    } else {
      console.log('\n❌ No hay usuarios registrados en auth.users')
    }
  }

  // 2. Favoritos
  const { data: favorites, error: favError } = await supabase
    .from('favorites')
    .select('*')
  
  console.log('\n\n📌 SISTEMA DE FAVORITOS')
  console.log('─'.repeat(80))
  if (favError) {
    console.log(`❌ Error: ${favError.message}`)
  } else {
    console.log(`Total favoritos guardados: ${favorites?.length || 0}`)
    if (favorites && favorites.length > 0) {
      const userFavs = new Map<string, number>()
      favorites.forEach(fav => {
        userFavs.set(fav.user_id, (userFavs.get(fav.user_id) || 0) + 1)
      })
      console.log(`Usuarios con favoritos: ${userFavs.size}`)
      console.log('\nDetalle por usuario:')
      userFavs.forEach((count, userId) => {
        console.log(`  - ${userId}: ${count} favoritos`)
      })
    }
  }

  // 3. Alertas
  const { data: alerts, error: alertError } = await supabase
    .from('search_alerts')
    .select('*')
  
  console.log('\n\n🔔 SISTEMA DE ALERTAS')
  console.log('─'.repeat(80))
  if (alertError) {
    console.log(`❌ Error: ${alertError.message}`)
  } else {
    console.log(`Total alertas configuradas: ${alerts?.length || 0}`)
    if (alerts && alerts.length > 0) {
      const activeAlerts = alerts.filter(a => a.is_active)
      console.log(`Alertas activas: ${activeAlerts.length}`)
      console.log(`Alertas inactivas: ${alerts.length - activeAlerts.length}`)
      
      console.log('\nDetalle de alertas:')
      alerts.forEach((alert, idx) => {
        console.log(`\n${idx + 1}. ${alert.name}`)
        console.log(`   Usuario: ${alert.user_id}`)
        console.log(`   Email: ${alert.email}`)
        console.log(`   Activa: ${alert.is_active ? '✅' : '❌'}`)
        console.log(`   Criterios: ${JSON.stringify(alert.criteria || {})}`)
        console.log(`   Creada: ${new Date(alert.created_at).toLocaleString('es-ES')}`)
      })
    }
  }

  // 4. Mensajes/Contactos de listings
  const { data: messages, error: msgError } = await supabase
    .from('listing_contacts')
    .select('*')
  
  console.log('\n\n💬 CONTACTOS/LEADS DE LISTINGS')
  console.log('─'.repeat(80))
  if (msgError) {
    console.log(`❌ Error: ${msgError.message}`)
  } else {
    console.log(`Total contactos recibidos: ${messages?.length || 0}`)
    if (messages && messages.length > 0) {
      console.log('\nÚltimos 5 contactos:')
      messages.slice(0, 5).forEach((msg, idx) => {
        console.log(`\n${idx + 1}. De: ${msg.from_name} (${msg.from_email})`)
        console.log(`   Listing ID: ${msg.listing_id}`)
        console.log(`   Fecha: ${new Date(msg.created_at).toLocaleString('es-ES')}`)
        console.log(`   Mensaje: ${msg.message?.substring(0, 100)}...`)
      })
    }
  }

  // 5. Ventas de gestoría (para contexto)
  const { data: sales, error: salesError } = await supabase
    .from('gestoria_requests')
    .select('*')
    .eq('status', 'paid')
  
  console.log('\n\n💰 VENTAS GESTORÍA (PAGADAS)')
  console.log('─'.repeat(80))
  if (salesError) {
    console.log(`❌ Error: ${salesError.message}`)
  } else {
    console.log(`Total ventas: ${sales?.length || 0}`)
    console.log(`Ingresos totales: ${sales?.reduce((sum, s) => sum + (s.amount_eur || 0), 0).toFixed(2)} €`)
    
    if (sales && sales.length > 0) {
      console.log('\nDetalle de ventas:')
      sales.forEach((sale, idx) => {
        console.log(`\n${idx + 1}. ${sale.client_name} (${sale.client_email})`)
        console.log(`   Servicio: ${sale.service_key}`)
        console.log(`   Importe: ${sale.amount_eur} €`)
        console.log(`   Fecha: ${new Date(sale.paid_at || sale.created_at).toLocaleString('es-ES')}`)
      })
    }
  }

  // 6. Verificar tablas relacionadas
  console.log('\n\n📋 VERIFICACIÓN DE TABLAS')
  console.log('─'.repeat(80))
  
  const tables = [
    'profiles',
    'user_settings',
    'notifications',
    'user_activity',
  ]
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.log(`❌ ${table}: No existe o error (${error.message})`)
    } else {
      console.log(`✅ ${table}: Existe`)
    }
  }

  console.log('\n' + '═'.repeat(80))
  console.log('✅ Análisis completado\n')
}

analyzeUsers().catch(console.error)
