import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  // Buscar todos los listings de Habitaclia sin imágenes o con pocas imágenes
  console.log('🔍 Buscando pisos de Habitaclia sin imágenes...\n')
  
  const { data: noImages } = await sb
    .from('listings')
    .select('id, title, images, source_url')
    .eq('source_portal', 'habitaclia.com')
    .or('images.is.null,images.eq.{}')
    .limit(50)
  
  console.log(`❌ Pisos SIN imágenes: ${noImages?.length || 0}`)
  
  if (noImages && noImages.length > 0) {
    noImages.forEach((l: any, i: number) => {
      console.log(`${i + 1}. ${l.id} | ${l.title.slice(0, 60)}`)
    })
  }
  
  // Buscar pisos con pocas imágenes (< 3)
  const { data: fewImages } = await sb
    .from('listings')
    .select('id, title, images')
    .eq('source_portal', 'habitaclia.com')
    .not('images', 'is', null)
    .limit(100)
  
  const withFewImages = fewImages?.filter((l: any) => {
    const imgs = l.images || []
    return imgs.length > 0 && imgs.length < 3
  }) || []
  
  console.log(`\n⚠️ Pisos con POCAS imágenes (<3): ${withFewImages.length}`)
  
  if (withFewImages.length > 0) {
    withFewImages.forEach((l: any, i: number) => {
      console.log(`${i + 1}. ${l.id} | ${l.images.length} imgs | ${l.title.slice(0, 50)}`)
    })
  }
  
  // Estadísticas
  const { count: totalHab } = await sb
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('source_portal', 'habitaclia.com')
  
  const { count: withImgs } = await sb
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('source_portal', 'habitaclia.com')
    .not('images', 'is', null)
    .not('images', 'eq', '{}')
  
  console.log(`\n📊 ESTADÍSTICAS HABITACLIA:`)
  console.log(`   Total: ${totalHab}`)
  console.log(`   Con imágenes: ${withImgs}`)
  console.log(`   Sin imágenes: ${(totalHab || 0) - (withImgs || 0)}`)
  console.log(`   % con imágenes: ${((withImgs || 0) / (totalHab || 1) * 100).toFixed(1)}%`)
  
  // Preguntar si eliminar los que no tienen imágenes
  console.log(`\n🗑️ ¿Eliminar ${noImages?.length || 0} pisos sin imágenes?`)
  console.log(`   Comando: DELETE FROM listings WHERE source_portal = 'habitaclia.com' AND (images IS NULL OR images = '{}')`)
}

main()
