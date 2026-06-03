/**
 * Verifica y configura permisos del bucket 'listings' en Supabase Storage
 * Ejecutar: npx tsx scripts/verificar-permisos-storage.mts
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

async function verificarPermisos() {
  console.log('\n🔐 VERIFICANDO PERMISOS DEL BUCKET "listings"\n')
  
  // 1. Verificar que el bucket existe
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    console.error('❌ Error al listar buckets:', bucketsError.message)
    return
  }
  
  const bucket = buckets?.find(b => b.name === 'listings')
  if (!bucket) {
    console.error('❌ El bucket "listings" NO EXISTE')
    console.log('\n💡 Creando bucket...')
    
    const { error: createError } = await supabase.storage.createBucket('listings', {
      public: true,
      fileSizeLimit: 10485760, // 10 MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    })
    
    if (createError) {
      console.error('❌ Error al crear bucket:', createError.message)
      return
    }
    
    console.log('✅ Bucket "listings" creado exitosamente')
  } else {
    console.log(`✅ Bucket "listings" existe`)
    console.log(`   - Público: ${bucket.public ? 'SÍ ✅' : 'NO ❌'}`)
    
    if (!bucket.public) {
      console.log('\n⚠️ Actualizando bucket a público...')
      const { error: updateError } = await supabase.storage.updateBucket('listings', {
        public: true
      })
      
      if (updateError) {
        console.error('❌ Error al actualizar:', updateError.message)
      } else {
        console.log('✅ Bucket actualizado a PÚBLICO')
      }
    }
  }
  
  // 2. Probar subida de imagen de prueba
  console.log('\n📤 PROBANDO SUBIDA DE IMAGEN...')
  
  const testFileName = `test-${Date.now()}.jpg`
  // Crear un buffer de imagen de prueba (1x1 pixel JPEG)
  const testImageBuffer = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
    0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
    0x7F, 0xFF, 0xD9
  ])
  
  const { error: uploadError } = await supabase.storage
    .from('listings')
    .upload(testFileName, testImageBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    })
  
  if (uploadError) {
    console.error('❌ Error al subir archivo de prueba:', uploadError.message)
    console.log('\n💡 POSIBLES CAUSAS:')
    console.log('   1. Permisos RLS del bucket')
    console.log('   2. Bucket no permite escritura para usuarios autenticados')
    console.log('   3. Configuración de políticas incorrecta')
    console.log('\n💡 SOLUCIÓN:')
    console.log('   Ir a Supabase Dashboard > Storage > listings > Policies')
    console.log('   Y agregar política:')
    console.log('      Policy name: Allow authenticated uploads')
    console.log('      Allowed operations: INSERT')
    console.log('      Target roles: authenticated')
    return
  }
  
  console.log('✅ Subida exitosa')
  
  // 3. Obtener URL pública
  const { data: urlData } = supabase.storage.from('listings').getPublicUrl(testFileName)
  console.log(`   URL: ${urlData.publicUrl}`)
  
  // 4. Limpiar archivo de prueba
  await supabase.storage.from('listings').remove([testFileName])
  console.log('✅ Archivo de prueba eliminado')
  
  console.log('\n✅ TODO CONFIGURADO CORRECTAMENTE')
  console.log('   Las imágenes ahora deberían subirse sin problemas')
}

verificarPermisos().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
