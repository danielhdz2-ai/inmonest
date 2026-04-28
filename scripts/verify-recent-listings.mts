#!/usr/bin/env node
/**
 * verify-recent-listings.mts
 * 
 * Verifica los últimos listings agregados y la calidad de sus AI descriptions
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function verify() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🔍 VERIFICACIÓN DE LISTINGS RECIENTES')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const { data: recent, error } = await supabase
    .from('listings')
    .select('id, title, operation, city, price_eur, bedrooms, area_m2, is_particular, ai_description, meta_description, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }

  recent?.forEach((listing, i) => {
    const num = i + 1
    const aiLength = listing.ai_description?.length || 0
    const metaLength = listing.meta_description?.length || 0
    const wordCount = listing.ai_description ? listing.ai_description.split(/\s+/).length : 0
    const tipo = listing.is_particular ? 'PARTICULAR' : 'AGENCIA'
    
    console.log(`\n[${num}] ${listing.title}`)
    console.log('─'.repeat(60))
    console.log(`📍 ${listing.city} | ${listing.operation} | ${listing.price_eur}€ | ${listing.bedrooms}h | ${listing.area_m2}m²`)
    console.log(`👤 Tipo: ${tipo}`)
    console.log(`📝 AI description: ${aiLength} chars | ~${wordCount} palabras`)
    console.log(`🏷️  Meta description: ${metaLength} chars`)
    console.log(`📅 Creado: ${new Date(listing.created_at).toLocaleString('es-ES')}`)
    
    // Verificar calidad v2.0
    const isV2Quality = aiLength >= 1500 && wordCount >= 200
    console.log(`✅ Calidad v2.0: ${isV2Quality ? '✓ SÍ' : '✗ NO (muy corta)'}`)
    
    if (listing.ai_description) {
      console.log(`\n📄 Preview (primeras 200 chars):`)
      console.log(`   "${listing.ai_description.substring(0, 200)}..."`)
    }
  })

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

verify()
