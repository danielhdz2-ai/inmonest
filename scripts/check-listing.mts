/**
 * Script para verificar listings recientes y sus imágenes
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Buscar últimos listings
const { data: listings } = await supabase
  .from('listings')
  .select('id, title, owner_user_id, source, created_at, status')
  .order('created_at', { ascending: false })
  .limit(10)

console.log('\n🏠 ÚLTIMOS 10 LISTINGS:\n')
if (!listings || listings.length === 0) {
  console.log('   No hay listings en la base de datos')
} else {
  for (const l of listings) {
    const origen = l.owner_user_id ? '👤 Manual' : '🤖 Scraper'
    console.log(`${l.id.substring(0, 8)}... | ${origen} | ${l.status} | ${l.title?.substring(0, 40)}`)
    
    // Buscar imágenes
    const { data: images } = await supabase
      .from('listing_images')
      .select('id, storage_path, external_url')
      .eq('listing_id', l.id)
      .limit(3)
    
    if (images && images.length > 0) {
      images.forEach((img, idx) => {
        console.log(`   📷 ${idx + 1}: storage=${img.storage_path ? '✅' : '❌'} | url=${img.external_url ? '✅' : '❌'}`)
      })
    } else {
      console.log('   📷 Sin imágenes')
    }
    console.log('')
  }
}
