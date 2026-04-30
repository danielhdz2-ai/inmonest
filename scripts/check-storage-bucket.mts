#!/usr/bin/env tsx
/**
 * Verificar que el bucket 'listings' existe en Supabase Storage
 * y que las políticas RLS permiten uploads
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Cargar .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🗂️ Verificando bucket de Storage...\n')

try {
  // Listar todos los buckets
  const { data: buckets, error } = await supabase.storage.listBuckets()
  
  if (error) {
    console.error('❌ Error al listar buckets:', error.message)
    process.exit(1)
  }
  
  console.log(`📦 Buckets encontrados: ${buckets.length}`)
  buckets.forEach(b => {
    console.log(`   - ${b.name} (${b.public ? 'público' : 'privado'})`)
  })
  
  const listingsBucket = buckets.find(b => b.name === 'listings')
  
  if (!listingsBucket) {
    console.log('\n❌ El bucket "listings" NO EXISTE')
    console.log('\n🔧 Solución: Crear el bucket "listings" en Supabase Storage:')
    console.log('   1. Ve a https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/buckets')
    console.log('   2. Click "New bucket"')
    console.log('   3. Nombre: listings')
    console.log('   4. Public: ✅ Sí')
    console.log('   5. File size limit: 15 MB')
    console.log('\n📝 También necesitas agregar estas políticas RLS:')
    console.log('   - SELECT: Público (para leer imágenes)')
    console.log('   - INSERT: Usuarios autenticados (para subir fotos)')
    console.log('   - UPDATE: Solo propietario')
    console.log('   - DELETE: Solo propietario')
    process.exit(1)
  }
  
  console.log(`\n✅ Bucket "listings" existe (${listingsBucket.public ? 'público' : 'privado'})`)
  
  // Intentar listar archivos (test de permisos)
  const { data: files, error: listError } = await supabase.storage
    .from('listings')
    .list('', { limit: 5 })
  
  if (listError) {
    console.log(`⚠️ Error al listar archivos: ${listError.message}`)
  } else {
    console.log(`📄 Archivos en el bucket: ${files?.length ?? 0}`)
    if (files && files.length > 0) {
      console.log('   Primeros archivos:')
      files.slice(0, 3).forEach(f => {
        console.log(`   - ${f.name}`)
      })
    }
  }
  
  console.log('\n✅ Verificación completada')
  
} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
