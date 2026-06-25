/**
 * Diagnosticar error "Too Many Requests"
 * Ejecutar: npx tsx scripts/diagnostico-rate-limit.mts
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

async function diagnosticar() {
  console.log('\n🔍 DIAGNOSTICANDO ERROR "Too Many Requests"\n')
  
  // 1. Verificar cuota de Storage
  console.log('📊 Verificando límites de Supabase Storage...\n')
  
  const { data: files, error } = await supabase.storage
    .from('listings')
    .list()
  
  if (error) {
    console.error('❌ Error al listar archivos:', error.message)
    
    if (error.message.includes('Too Many Requests') || error.message.includes('429')) {
      console.log('\n💡 PROBLEMA: Rate limiting de Supabase activado\n')
      console.log('Posibles causas:')
      console.log('  1. Demasiadas requests en poco tiempo')
      console.log('  2. Plan Free de Supabase tiene límites estrictos')
      console.log('  3. Múltiples usuarios subiendo fotos simultáneamente\n')
      
      console.log('🔧 SOLUCIONES:')
      console.log('  1. Esperar 1-2 minutos e intentar de nuevo')
      console.log('  2. Implementar retry con delay en el código')
      console.log('  3. Subir imágenes de 1 en 1 con delay entre cada una')
      console.log('  4. Upgrade a plan Pro de Supabase (más cuota)\n')
      
      return
    }
  }
  
  if (files) {
    console.log(`✅ Total de archivos en bucket: ${files.length}`)
    
    // Calcular tamaño total
    let totalSize = 0
    for (const file of files) {
      const { data: fileData } = await supabase.storage
        .from('listings')
        .download(file.name)
      
      if (fileData) {
        totalSize += fileData.size
      }
    }
    
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2)
    console.log(`📦 Tamaño total: ${sizeMB} MB`)
    console.log(`⚠️  Plan Free limita: 1 GB storage, 2 GB ancho de banda/mes\n`)
  }
  
  // 2. Verificar plan actual
  console.log('💳 RECOMENDACIÓN:')
  console.log('   - Espera 60 segundos')
  console.log('   - Intenta subir solo 3-4 fotos en lugar de 9')
  console.log('   - Si persiste, es límite del plan Free\n')
}

diagnosticar().catch(err => {
  console.error('❌ Error:', err.message)
})
