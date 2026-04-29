import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  const problematicId = '486cbb4e-0c2f-42f2-9879-ee4d92671cda'
  
  console.log(`🔍 Buscando listing ${problematicId}...\n`)
  
  const { data: listing } = await sb
    .from('listings')
    .select('*')
    .eq('id', problematicId)
    .single()
  
  if (!listing) {
    console.log('❌ No existe ese listing. Puede que ya se haya borrado.\n')
    
    // Buscar todos los de Habitaclia importados recientemente
    console.log('🔍 Buscando pisos recientes de Habitaclia...\n')
    
    const { data: recent, count } = await sb
      .from('listings')
      .select('id, title, source_portal, images, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(50)
    
    console.log(`Total pisos recientes: ${count}`)
    
    const habitacliaRecent = recent?.filter((l: any) => 
      l.source_portal && l.source_portal.toLowerCase().includes('habitaclia')
    ) || []
    
    console.log(`\nHabitaclia recientes: ${habitacliaRecent.length}`)
    
    if (habitacliaRecent.length > 0) {
      habitacliaRecent.forEach((l: any, i: number) => {
        const imgCount = Array.isArray(l.images) ? l.images.length : 0
        console.log(`${i+1}. ${l.id.slice(0,8)}... | ${l.title.slice(0,50)} | ${imgCount} imgs | ${l.source_portal}`)
      })
    }
    
    return
  }
  
  console.log(`✅ Listing encontrado:`)
  console.log(`   Title: ${listing.title}`)
  console.log(`   Portal: ${listing.source_portal}`)
  console.log(`   Created: ${listing.created_at}`)
  console.log(`   Images: ${listing.images ? listing.images.length : 0}`)
  console.log(`   URL: ${listing.source_url}`)
  
  if (listing.images && listing.images.length > 0) {
    console.log(`\n📸 Imágenes (${listing.images.length}):`)
    listing.images.forEach((img: string, i: number) => {
      console.log(`   ${i+1}. ${img}`)
    })
  }
  
  console.log(`\n🗑️ ¿Eliminar este listing? Tiene 0 imágenes y puede estar mal importado.`)
}

main()
