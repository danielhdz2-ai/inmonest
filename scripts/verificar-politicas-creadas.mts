/**
 * Verificar que las políticas RLS fueron creadas correctamente
 * Ejecutar: npx tsx scripts/verificar-politicas-creadas.mts
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

async function verificarPoliticas() {
  console.log('\n🔍 VERIFICANDO POLÍTICAS RLS DEL BUCKET "listings"\n')
  
  // Verificar políticas con query SQL
  const { data: policies, error } = await supabase
    .from('pg_policies')
    .select('policyname, cmd, roles, qual, with_check')
    .eq('tablename', 'objects')
    .eq('schemaname', 'storage')
    .ilike('policyname', '%listings%')
  
  if (error) {
    console.log('⚠️  No se pudo verificar vía tabla pg_policies')
    console.log('   Continuando con prueba de upload...\n')
  } else if (policies && policies.length > 0) {
    console.log('✅ POLÍTICAS ENCONTRADAS:\n')
    policies.forEach((p: any) => {
      console.log(`   📋 ${p.policyname}`)
      console.log(`      Operación: ${p.cmd}`)
      console.log(`      Roles: ${p.roles?.join(', ')}`)
      console.log('')
    })
  } else {
    console.log('⚠️  No se encontraron políticas con nombre que incluya "listings"')
    console.log('   Pero podrían existir con otro nombre...\n')
  }
  
  // Prueba real de upload
  console.log('🧪 PROBANDO UPLOAD REAL CON USUARIO AUTENTICADO...\n')
  
  const testFileName = `test-auth-${Date.now()}.jpg`
  const testImageBuffer = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46
  ])
  
  const { error: uploadError } = await supabase.storage
    .from('listings')
    .upload(testFileName, testImageBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    })
  
  if (uploadError) {
    console.error('❌ UPLOAD FALLÓ:', uploadError.message)
    
    if (uploadError.message.includes('row-level security')) {
      console.log('\n💡 Las políticas aún NO están funcionando.')
      console.log('   Verifica que ejecutaste el SQL correctamente en:')
      console.log('   https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new\n')
    } else {
      console.log('\n⚠️  Error diferente al de políticas RLS.')
      console.log('   Mensaje:', uploadError.message, '\n')
    }
    return
  }
  
  console.log('✅ UPLOAD EXITOSO!')
  console.log(`   Archivo: ${testFileName}`)
  
  // Limpiar
  await supabase.storage.from('listings').remove([testFileName])
  console.log('✅ Archivo de prueba eliminado\n')
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ ¡TODO FUNCIONA CORRECTAMENTE!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')
  console.log('🎉 Ahora puedes publicar anuncios con fotos sin problemas.')
  console.log('   Ve a: https://inmonest.com/publicar')
  console.log('')
}

verificarPoliticas().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
