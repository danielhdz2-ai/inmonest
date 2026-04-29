import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data, error } = await supabase
  .from('listings')
  .select(`
    id, 
    title, 
    source_portal, 
    created_at,
    listing_images (external_url)
  `)
  .eq('source_portal', 'habitaclia.com')
  .order('created_at', { ascending: false })
  .limit(15)

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log('Total resultados:', data?.length)
console.log('Últimos 15 Habitaclia importados:\n')
data?.forEach((l: any, i) => {
  const imgs = l.listing_images?.length || 0
  console.log(`${i+1}. ${l.title.slice(0,50)} - ${imgs} imágenes`)
})

const withImages = data?.filter((l: any) => l.listing_images && l.listing_images.length > 0).length || 0
const total = data?.length || 0
console.log(`\n📊 Con imágenes: ${withImages}/${total} (${total > 0 ? Math.round(withImages/total*100) : 0}%)`)
