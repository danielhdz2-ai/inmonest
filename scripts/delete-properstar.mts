import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

console.log('🔍 Buscando pisos de Properstar...')

const { data: listings, error } = await supabase
  .from('listings')
  .select('id, title, source_portal')
  .ilike('source_portal', '%properstar%')

if (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}

console.log(`📊 Encontrados: ${listings?.length || 0} pisos de Properstar`)

if (listings && listings.length > 0) {
  console.log('\n🗑️  Eliminando pisos...')
  
  // Primero eliminar imágenes
  const ids = listings.map(l => l.id)
  const { error: imgError } = await supabase
    .from('listing_images')
    .delete()
    .in('listing_id', ids)
  
  if (imgError) console.error('⚠️  Error eliminando imágenes:', imgError)
  else console.log(`✅ Imágenes eliminadas`)
  
  // Luego eliminar listings
  const { error: delError } = await supabase
    .from('listings')
    .delete()
    .in('id', ids)
  
  if (delError) console.error('❌ Error eliminando listings:', delError)
  else console.log(`✅ ${listings.length} pisos de Properstar eliminados`)
} else {
  console.log('✅ No hay pisos de Properstar en la base de datos')
}
