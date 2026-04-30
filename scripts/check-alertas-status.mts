#!/usr/bin/env tsx
/**
 * Verificar alertas configuradas y simular envío
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🔍 Verificando sistema de alertas...\n')

try {
  // 1. Obtener todas las alertas
  const { data: alerts, error } = await supabase
    .from('search_alerts')
    .select('*')
  
  if (error) {
    console.error('❌ Error al obtener alertas:', error.message)
    process.exit(1)
  }
  
  console.log(`📊 Total alertas en BD: ${alerts?.length ?? 0}`)
  
  if (!alerts || alerts.length === 0) {
    console.log('\n⚠️ No hay alertas creadas.')
    console.log('   Crea una alerta desde https://inmonest.com/pisos')
    console.log('   1. Haz una búsqueda')
    console.log('   2. Click "Guardar búsqueda"')
    console.log('   3. Configura frecuencia "Diaria"')
    process.exit(0)
  }
  
  // 2. Analizar cada alerta
  console.log('\n📋 Alertas configuradas:\n')
  
  for (const alert of alerts) {
    const active = alert.active ? '✅ Activa' : '❌ Inactiva'
    const lastSent = alert.last_sent_at 
      ? new Date(alert.last_sent_at).toLocaleString('es-ES')
      : 'Nunca'
    
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`Alerta: ${alert.label ?? 'Sin nombre'}`)
    console.log(`Estado: ${active}`)
    console.log(`Frecuencia: ${alert.frequency}`)
    console.log(`Último envío: ${lastSent}`)
    console.log(`Total enviados: ${alert.total_sent ?? 0}`)
    console.log(`Filtros: ${JSON.stringify(alert.filters)}`)
    
    // 3. Obtener el email del usuario
    const { data: { user }, error: userErr } = await supabase.auth.admin.getUserById(alert.user_id)
    
    if (userErr || !user) {
      console.log(`⚠️ Usuario no encontrado (${alert.user_id})`)
      continue
    }
    
    console.log(`Email destino: ${user.email}`)
    
    // 4. Simular búsqueda de nuevos listings
    const filters = alert.filters as Record<string, unknown>
    const since = alert.last_sent_at 
      ? new Date(alert.last_sent_at)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // últimos 7 días
    
    let query = supabase
      .from('listings')
      .select('id, title, price_eur, city, operation, created_at')
      .eq('status', 'published')
      .gt('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (filters.ciudad) query = query.ilike('city', `%${filters.ciudad}%`)
    if (filters.operacion) query = query.eq('operation', filters.operacion)
    if (filters.precio_min) query = query.gte('price_eur', filters.precio_min)
    if (filters.precio_max) query = query.lte('price_eur', filters.precio_max)
    if (filters.habitaciones) query = query.gte('bedrooms', filters.habitaciones)
    if (filters.solo_particulares) query = query.eq('is_particular', true)
    
    const { data: matches, error: matchErr } = await query
    
    if (matchErr) {
      console.log(`❌ Error al buscar matches: ${matchErr.message}`)
      continue
    }
    
    console.log(`\n🏠 Pisos nuevos que coinciden: ${matches?.length ?? 0}`)
    
    if (matches && matches.length > 0) {
      console.log(`   Primeros resultados:`)
      matches.slice(0, 3).forEach(m => {
        const price = m.price_eur 
          ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(m.price_eur)
          : 'Consultar'
        console.log(`   - ${m.title} | ${m.city} | ${price}`)
      })
      
      if (alert.active) {
        console.log(`\n✉️ Se enviaría email a ${user.email}`)
      } else {
        console.log(`\n⚠️ Alerta inactiva, NO se enviaría email`)
      }
    } else {
      console.log(`   ℹ️ No hay pisos nuevos desde ${since.toLocaleString('es-ES')}`)
    }
  }
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
  
  // 5. Verificar configuración de Resend
  const resendKey = process.env.RESEND_API_KEY
  
  if (!resendKey) {
    console.log('⚠️ RESEND_API_KEY no configurada')
    console.log('   Los emails NO se pueden enviar')
  } else {
    console.log('✅ RESEND_API_KEY configurada')
    
    // Verificar que el dominio está verificado
    console.log('\n📧 Verificando configuración de Resend...')
    const res = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${resendKey}` }
    })
    
    if (res.ok) {
      const domains = await res.json()
      console.log(`   Dominios verificados: ${domains.data?.length ?? 0}`)
      domains.data?.forEach((d: { name: string; status: string }) => {
        console.log(`   - ${d.name} (${d.status})`)
      })
    }
  }
  
  console.log('\n✅ Verificación completada\n')
  
  // 6. Recomendaciones
  const activeAlerts = alerts.filter(a => a.active).length
  const withMatches = alerts.filter(a => a.active && a.total_sent && a.total_sent > 0).length
  
  if (activeAlerts === 0) {
    console.log('⚠️ No hay alertas activas. Activa al menos una para recibir emails.')
  } else if (withMatches === 0) {
    console.log('ℹ️ Las alertas están activas pero aún no se ha enviado ningún email.')
    console.log('   Esto es normal si recién las creaste o no hay pisos nuevos.')
  } else {
    console.log(`✅ Sistema funcionando: ${withMatches} alerta(s) han enviado emails.`)
  }
  
} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
