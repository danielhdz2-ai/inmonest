/**
 * Script para crear el bucket "listings" en Supabase Storage
 * Ejecutar: npx tsx scripts/crear-bucket-listings.mts
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables de .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  console.log('   Verifica que .env.local tenga estas variables configuradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function crearBucket() {
  console.log('\n🚀 CREANDO BUCKET "listings" EN SUPABASE STORAGE\n')
  
  // 1. Verificar si ya existe
  console.log('📋 Verificando si el bucket ya existe...')
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  
  if (listError) {
    console.error('❌ Error al listar buckets:', listError.message)
    process.exit(1)
  }
  
  const existingBucket = buckets?.find(b => b.name === 'listings')
  if (existingBucket) {
    console.log('✅ El bucket "listings" ya existe')
    console.log(`   - Público: ${existingBucket.public ? 'SÍ' : 'NO'}`)
    
    if (!existingBucket.public) {
      console.log('\n⚠️ El bucket NO es público, actualizando...')
      const { error: updateError } = await supabase.storage.updateBucket('listings', {
        public: true
      })
      
      if (updateError) {
        console.error('❌ Error al actualizar bucket:', updateError.message)
      } else {
        console.log('✅ Bucket actualizado a PÚBLICO')
      }
    }
    
    console.log('\n✅ TODO LISTO')
    return
  }
  
  // 2. Crear bucket
  console.log('📦 Creando bucket "listings"...')
  const { data, error: createError } = await supabase.storage.createBucket('listings', {
    public: true,
    fileSizeLimit: 10485760, // 10 MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  })
  
  if (createError) {
    console.error('❌ Error al crear bucket:', createError.message)
    console.log('\n💡 SOLUCIÓN MANUAL:')
    console.log('   1. Ir a: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/buckets')
    console.log('   2. Click en "New bucket"')
    console.log('   3. Nombre: listings')
    console.log('   4. Activar: Public bucket')
    console.log('   5. File size limit: 10 MB')
    console.log('   6. Allowed MIME types: image/jpeg, image/png, image/webp')
    console.log('   7. Click "Create bucket"')
    process.exit(1)
  }
  
  console.log('✅ Bucket "listings" creado exitosamente')
  console.log(`   - ID: ${data}`)
  console.log('   - Público: SÍ')
  console.log('   - Tamaño máximo archivo: 10 MB')
  console.log('   - Tipos permitidos: JPEG, PNG, WebP')
  
  console.log('\n✅ TODO LISTO - Las imágenes ahora deberían funcionar')
  console.log('   Vuelve a publicar un piso para probar')
}

crearBucket().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
