/**
 * Verificar estructura de tabla listings
 * Ejecutar: npx tsx scripts/verificar-estructura-listings.mts
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

async function verificarEstructura() {
  console.log('\n🔍 VERIFICANDO ESTRUCTURA DE TABLA listings\n')
  
  // Obtener un listing de ejemplo para ver sus columnas
  const { data: sample, error } = await supabase
    .from('listings')
    .select('*')
    .limit(1)
    .single()
  
  if (error) {
    console.error('❌ Error:', error.message)
    return
  }
  
  if (!sample) {
    console.log('⚠️  No hay listings en la base de datos')
    return
  }
  
  console.log('📋 Columnas encontradas en listings:\n')
  const columns = Object.keys(sample)
  columns.forEach(col => {
    console.log(`   - ${col}`)
  })
  
  console.log('\n🔍 Buscando columna de usuario...\n')
  
  const userCols = columns.filter(c => 
    c.includes('user') || c.includes('owner') || c.includes('author')
  )
  
  if (userCols.length > 0) {
    console.log('✅ Columnas relacionadas con usuario:')
    userCols.forEach(col => {
      console.log(`   - ${col}: ${typeof sample[col]} = ${sample[col]}`)
    })
  } else {
    console.log('❌ No se encontró columna de usuario')
    console.log('   Los listings no tienen relación con usuarios')
    console.log('   Esto significa que CUALQUIER usuario autenticado puede modificar imágenes')
  }
}

verificarEstructura().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
