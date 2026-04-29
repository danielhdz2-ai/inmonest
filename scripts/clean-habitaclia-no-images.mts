import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  console.log('🔍 Buscando TODOS los pisos de Habitaclia...\n')
  
  const { data: allHab, count } = await sb
    .from('listings')
    .select('id, title, images, source_external_id', { count: 'exact' })
    .eq('source_portal', 'habitaclia.com')
    .order('created_at', { ascending: false })
  
  console.log(`📊 Total Habitaclia: ${count}\n`)
  
  if (!allHab || allHab.length === 0) {
    console.log('✅ No hay pisos de Habitaclia')
    return
  }
  
  // Clasificar por número de imágenes
  const noImages = allHab.filter((l: any) => !l.images || l.images.length === 0)
  const fewImages = allHab.filter((l: any) => l.images && l.images.length > 0 && l.images.length < 3)
  const goodImages = allHab.filter((l: any) => l.images && l.images.length >= 3)
  
  console.log(`📊 CLASIFICACIÓN POR IMÁGENES:`)
  console.log(`   Sin imágenes (0): ${noImages.length}`)
  console.log(`   Pocas imágenes (1-2): ${fewImages.length}`)
  console.log(`   Buenas (3+): ${goodImages.length}\n`)
  
  if (noImages.length > 0) {
    console.log(`❌ Pisos SIN imágenes (${noImages.length}):`)
    noImages.slice(0, 10).forEach((l: any, i: number) => {
      console.log(`   ${i+1}. ${l.id.slice(0,8)}... | ${l.title.slice(0,50)}`)
    })
    if (noImages.length > 10) {
      console.log(`   ... y ${noImages.length - 10} más`)
    }
  }
  
  console.log(`\n🗑️ ELIMINANDO ${noImages.length} pisos sin imágenes...`)
  
  if (noImages.length > 0) {
    const idsToDelete = noImages.map((l: any) => l.id)
    
    const { error } = await sb
      .from('listings')
      .delete()
      .in('id', idsToDelete)
    
    if (error) {
      console.log(`❌ Error: ${error.message}`)
    } else {
      console.log(`✅ ${noImages.length} pisos eliminados correctamente`)
    }
  }
  
  console.log(`\n📊 PISOS RESTANTES DE HABITACLIA:`)
  console.log(`   Con pocas imágenes (1-2): ${fewImages.length}`)
  console.log(`   Con buenas imágenes (3+): ${goodImages.length}`)
  console.log(`   TOTAL: ${fewImages.length + goodImages.length}`)
}

main()
