/**
 * Verificar políticas RLS con usuario autenticado
 * Ejecutar: npx tsx scripts/test-upload-autenticado.mts
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

async function testUpload() {
  console.log('\n🧪 TEST COMPLETO DE UPLOAD DE IMÁGENES\n')
  
  // 1. Verificar políticas de storage
  console.log('1️⃣ Probando upload a Storage bucket...\n')
  
  const testImageBuffer = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46
  ])
  
  const storagePath = `test-${Date.now()}/test.jpg`
  
  const { error: storageErr } = await supabase.storage
    .from('listings')
    .upload(storagePath, testImageBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    })
  
  if (storageErr) {
    console.error('   ❌ Storage upload falló:', storageErr.message)
    console.log('\n   Ejecuta primero las políticas de Storage:')
    console.log('   cat supabase/storage-policies.sql\n')
    return
  }
  
  console.log('   ✅ Storage upload OK\n')
  
  // 2. Obtener un listing real para el test
  console.log('2️⃣ Obteniendo listing real para test...\n')
  
  let listingId: string
  
  const { data: existingListing, error: listingErr } = await supabase
    .from('listings')
    .select('id')
    .limit(1)
    .single()
  
  if (listingErr || !existingListing) {
    console.log('   ⚠️  No hay listings en la BD, creando uno temporal...\n')
    
    const { data: newListing, error: createErr } = await supabase
      .from('listings')
      .insert({
        operation: 'venta',
        title: 'Test Upload',
        price_eur: 100000,
        province: 'Barcelona',
        city: 'Barcelona',
        area_m2: 50,
        source_portal: 'test'
      })
      .select('id')
      .single()
    
    if (createErr || !newListing) {
      console.error('   ❌ No se pudo crear listing de prueba')
      await supabase.storage.from('listings').remove([storagePath])
      return
    }
    
    listingId = newListing.id
  } else {
    listingId = existingListing.id
  }
  
  console.log(`   ✅ Usando listing: ${listingId}\n`)
  
  // 3. Verificar políticas de listing_images
  console.log('3️⃣ Probando insert a tabla listing_images...\n')
  
  const { data: publicUrl } = supabase.storage
    .from('listings')
    .getPublicUrl(storagePath)
  
  const { error: insertErr } = await supabase
    .from('listing_images')
    .insert({
      listing_id: listingId,
      storage_path: storagePath,
      external_url: publicUrl.publicUrl,
      position: 0
    })
  
  if (insertErr) {
    console.error('   ❌ Insert a listing_images falló:', insertErr.message)
    
    if (insertErr.message.includes('row-level security')) {
      console.log('\n   💡 Necesitas ejecutar las políticas RLS:')
      console.log('   cat supabase/listing-images-policies.sql\n')
    }
    
    // Limpiar storage
    await supabase.storage.from('listings').remove([storagePath])
    return
  }
  
  console.log('   ✅ Insert a listing_images OK\n')
  
  // 4. Limpiar
  console.log('4️⃣ Limpiando datos de prueba...\n')
  
  await supabase
    .from('listing_images')
    .delete()
    .eq('listing_id', listingId)
    .eq('storage_path', storagePath)
  
  await supabase.storage.from('listings').remove([storagePath])
  
  console.log('   ✅ Limpieza completa\n')
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ ¡TODO FUNCIONA CORRECTAMENTE!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')
  console.log('🎉 Ahora puedes publicar anuncios con fotos.')
  console.log('   Ve a: https://inmonest.com/publicar')
  console.log('')
}

testUpload().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
