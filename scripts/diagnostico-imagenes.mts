/**
 * Script de diagnóstico para verificar configuración de Supabase Storage
 * Ejecutar: npx tsx scripts/diagnostico-imagenes.mts
 */

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function diagnostico() {
  console.log('\n🔍 DIAGNÓSTICO DE IMÁGENES - SUPABASE STORAGE\n')
  
  // 1. Verificar configuración básica
  console.log('📋 CONFIGURACIÓN:')
  console.log(`   URL: ${supabaseUrl}`)
  console.log(`   Bucket: listings`)
  console.log('')
  
  // 2. Verificar bucket existe
  console.log('🗂️ VERIFICANDO BUCKET...')
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    console.error('   ❌ Error al listar buckets:', bucketsError.message)
    return
  }
  
  const listingsBucket = buckets?.find(b => b.name === 'listings')
  if (!listingsBucket) {
    console.error('   ❌ El bucket "listings" NO EXISTE')
    console.log('   💡 Solución: Crear bucket "listings" en Supabase Dashboard > Storage')
    return
  }
  
  console.log('   ✅ Bucket "listings" existe')
  console.log(`   - Público: ${listingsBucket.public ? 'SÍ' : 'NO'}`)
  console.log(`   - ID: ${listingsBucket.id}`)
  console.log('')
  
  // 3. Verificar archivos en el bucket
  console.log('📂 VERIFICANDO ARCHIVOS EN EL BUCKET...')
  const { data: files, error: filesError } = await supabase.storage
    .from('listings')
    .list('', { limit: 10 })
  
  if (filesError) {
    console.error('   ❌ Error al listar archivos:', filesError.message)
    return
  }
  
  if (!files || files.length === 0) {
    console.log('   ⚠️ El bucket está vacío (no hay carpetas de usuarios)')
  } else {
    console.log(`   ✅ Encontradas ${files.length} carpetas/archivos`)
    files.slice(0, 5).forEach(f => {
      console.log(`   - ${f.name}`)
    })
  }
  console.log('')
  
  // 4. Verificar listing_images recientes
  console.log('🖼️ VERIFICANDO REGISTROS EN listing_images...')
  const { data: images, error: imagesError } = await supabase
    .from('listing_images')
    .select('id, listing_id, storage_path, external_url, created_at')
    .order('created_at', { ascending: false })
    .limit(5)
  
  if (imagesError) {
    console.error('   ❌ Error al consultar listing_images:', imagesError.message)
    return
  }
  
  if (!images || images.length === 0) {
    console.log('   ⚠️ No hay imágenes registradas en la base de datos')
  } else {
    console.log(`   ✅ Encontradas ${images.length} imágenes recientes:`)
    for (const img of images) {
      console.log(`\n   📷 ID: ${img.id}`)
      console.log(`      Listing: ${img.listing_id}`)
      console.log(`      storage_path: ${img.storage_path || 'NULL'}`)
      console.log(`      external_url: ${img.external_url || 'NULL'}`)
      
      // Verificar URL pública
      if (img.storage_path) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/listings/${img.storage_path}`
        console.log(`      URL pública: ${publicUrl}`)
        
        // Probar URL
        try {
          const response = await fetch(publicUrl, { method: 'HEAD' })
          if (response.ok) {
            console.log(`      ✅ URL accesible (${response.status})`)
          } else {
            console.log(`      ❌ URL NO accesible (${response.status})`)
            if (response.status === 404) {
              console.log('         → Archivo no existe en Storage')
            } else if (response.status === 400) {
              console.log('         → Bucket no es público o políticas RLS bloqueando')
            }
          }
        } catch (err) {
          console.error(`      ❌ Error al hacer fetch:`, err)
        }
      }
    }
  }
  console.log('')
  
  // 5. Verificar políticas RLS
  console.log('🔒 RECOMENDACIONES DE SEGURIDAD:')
  if (!listingsBucket?.public) {
    console.log('   ⚠️ El bucket NO es público')
    console.log('   💡 Solución:')
    console.log('      1. Ir a Supabase Dashboard > Storage > listings')
    console.log('      2. Click en "Public bucket" toggle para activarlo')
    console.log('      3. Esto permite acceso público de lectura sin autenticación')
  } else {
    console.log('   ✅ Bucket configurado como público (correcto)')
  }
  console.log('')
  
  // Resumen
  console.log('📊 RESUMEN:')
  console.log(`   - Bucket existe: ${listingsBucket ? 'SÍ' : 'NO'}`)
  console.log(`   - Bucket público: ${listingsBucket?.public ? 'SÍ' : 'NO'}`)
  console.log(`   - Imágenes en DB: ${images?.length || 0}`)
  console.log('')
  
  if (listingsBucket?.public && images && images.length > 0) {
    console.log('✅ TODO PARECE ESTAR BIEN')
    console.log('   Si las imágenes aún no se ven, verifica:')
    console.log('   - Que ListingCardGallery.tsx y ListingGallery.tsx estén usando getSupabaseStorageUrl')
    console.log('   - Que NEXT_PUBLIC_SUPABASE_URL esté en .env.local')
    console.log('   - Limpia cache del navegador (Ctrl+Shift+R)')
  } else {
    console.log('⚠️ ACCIÓN REQUERIDA: Revisa los puntos marcados arriba')
  }
}

diagnostico().catch(console.error)
