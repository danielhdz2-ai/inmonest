import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  console.log('🔍 Verificando contenido real del campo images...\n')
  
  const { data, count } = await sb
    .from('listings')
    .select('id, title, images', { count: 'exact' })
    .ilike('source_portal', 'habitaclia%')
    .limit(50)
  
  if (!data || data.length === 0) {
    console.log('❌ No se encontraron pisos de Habitaclia')
    return
  }
  
  console.log(`📋 ${data.length} pisos de Habitaclia:\n`)
  
  data.forEach((l: any, i: number) => {
    const imgs = l.images
    const imgsType = typeof imgs
    const isNull = imgs === null
    const isUndefined = imgs === undefined
    const isArray = Array.isArray(imgs)
    const length = isArray ? imgs.length : 'N/A'
    
    console.log(`${i + 1}. ${l.id.slice(0, 8)}... | ${l.title.slice(0, 40)}`)
    console.log(`   Type: ${imgsType} | isNull: ${isNull} | isArray: ${isArray} | Length: ${length}`)
    
    if (isArray && imgs.length > 0) {
      console.log(`   First image: ${imgs[0]}`)
    } else if (isArray && imgs.length === 0) {
      console.log(`   ⚠️ Empty array []`)
    } else if (!isNull && !isArray) {
      console.log(`   ⚠️ Value: ${JSON.stringify(imgs).slice(0, 100)}`)
    }
    console.log()
  })
  
  // Contar por tipo
  const emptyArrays = data.filter((l: any) => Array.isArray(l.images) && l.images.length === 0).length
  const withImages = data.filter((l: any) => Array.isArray(l.images) && l.images.length > 0).length
  const nulls = data.filter((l: any) => l.images === null).length
  
  console.log('📊 DISTRIBUCIÓN:')
  console.log(`   Arrays vacíos []: ${emptyArrays}`)
  console.log(`   Con imágenes: ${withImages}`)
  console.log(`   Null: ${nulls}`)
}

main()
