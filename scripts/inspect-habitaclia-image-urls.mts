import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data } = await sb
  .from('listings')
  .select(`
    id, 
    title, 
    source_url,
    listing_images (external_url, position)
  `)
  .eq('source_portal', 'habitaclia.com')
  .order('created_at', { ascending: false })
  .limit(3)

if (data && data.length > 0) {
  for (const listing of data) {
    console.log(`\n${'='.repeat(80)}`)
    console.log(`📍 ${listing.title}`)
    console.log(`🔗 ${listing.source_url}`)
    console.log(`\n🖼️ IMÁGENES (${(listing as any).listing_images?.length || 0}):`)
    
    const images = (listing as any).listing_images || []
    
    // Extraer códigos de propiedad de las URLs
    const imageCodes = images.map((img: any) => {
      const match = img.external_url.match(/\/imgh\/(\d+-\d+)\//)
      return {
        url: img.external_url,
        code: match ? match[1] : 'NO_CODE',
        position: img.position
      }
    })
    
    // Agrupar por código
    const byCode = imageCodes.reduce((acc: any, img: any) => {
      if (!acc[img.code]) acc[img.code] = []
      acc[img.code].push(img)
      return acc
    }, {})
    
    console.log(`\n📊 Códigos de propiedad encontrados:`)
    Object.entries(byCode).forEach(([code, imgs]: [string, any]) => {
      console.log(`   ${code}: ${imgs.length} imágenes`)
    })
    
    if (Object.keys(byCode).length > 1) {
      console.log(`\n⚠️ PROBLEMA: Imágenes de ${Object.keys(byCode).length} propiedades diferentes mezcladas!`)
    } else {
      console.log(`\n✅ OK: Todas las imágenes pertenecen a la misma propiedad`)
    }
    
    // Mostrar primeras 3 URLs
    console.log(`\nPrimeras 3 URLs:`)
    images.slice(0, 3).forEach((img: any, i: number) => {
      console.log(`   ${i+1}. ${img.external_url.slice(0, 100)}...`)
    })
  }
}
