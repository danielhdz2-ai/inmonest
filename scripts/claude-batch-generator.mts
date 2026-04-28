/**
 * Script para que Claude genere descripciones IA en lotes
 * 1. Obtiene lote de listings sin AI
 * 2. Muestra datos en formato para que Claude genere descripciones
 * 3. Lee archivo JSON con descripciones generadas por Claude
 * 4. Las guarda en Supabase
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFileSync, readFileSync, existsSync } from 'fs'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Referencia de precios
const CITY_REFS = [
  { city: 'Madrid', avgSale: 4200, avgRent: 17 },
  { city: 'Barcelona', avgSale: 4800, avgRent: 19 },
  { city: 'Valencia', avgSale: 2100, avgRent: 11 },
  { city: 'Sevilla', avgSale: 2300, avgRent: 10 },
  { city: 'Zaragoza', avgSale: 1700, avgRent: 8 },
  { city: 'Málaga', avgSale: 2800, avgRent: 12 },
  { city: 'Palma', avgSale: 3500, avgRent: 14 },
  { city: 'Bilbao', avgSale: 3800, avgRent: 15 },
  { city: 'Alicante', avgSale: 1900, avgRent: 9 },
  { city: 'San Sebastián', avgSale: 5200, avgRent: 18 },
  { city: 'Granada', avgSale: 1700, avgRent: 8 },
  { city: 'Marbella', avgSale: 4200, avgRent: 16 },
]

interface ListingData {
  id: string
  title: string
  description: string | null
  operation: 'sale' | 'rent'
  city: string | null
  district: string | null
  province: string | null
  price_eur: number | null
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  is_particular: boolean
}

const args = process.argv.slice(2)
const command = args[0] || 'fetch' // fetch | save
const batchSize = parseInt(args.find(a => a.startsWith('--batch='))?.split('=')[1] || '15')

async function fetchBatch() {
  console.log('\n📦 Obteniendo lote de', batchSize, 'listings sin AI...\n')
  
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
    .is('ai_description', null)
    .limit(batchSize)
  
  if (error) {
    console.error('❌ Error:', error)
    return
  }
  
  if (!listings || listings.length === 0) {
    console.log('✨ No hay listings pendientes')
    return
  }
  
  console.log(`✅ Obtenidos ${listings.length} listings\n`)
  
  // Guardar en archivo temporal para que Claude pueda leerlo
  writeFileSync(
    'claude-batch-input.json',
    JSON.stringify(listings, null, 2)
  )
  
  console.log('📄 Datos guardados en: claude-batch-input.json')
  console.log('\n🤖 Claude ahora generará las descripciones...\n')
}

async function saveBatch() {
  if (!existsSync('claude-batch-output.json')) {
    console.error('❌ No se encontró claude-batch-output.json')
    return
  }
  
  console.log('\n💾 Guardando descripciones generadas por Claude...\n')
  
  const output = JSON.parse(readFileSync('claude-batch-output.json', 'utf-8'))
  
  let saved = 0
  let failed = 0
  
  for (const item of output) {
    const { error } = await supabase
      .from('listings')
      .update({ ai_description: item.ai_description })
      .eq('id', item.id)
    
    if (error) {
      console.error(`❌ Error guardando ${item.id}:`, error.message)
      failed++
    } else {
      console.log(`✅ Guardado: ${item.title.slice(0, 50)}... (${item.ai_description.length} chars)`)
      saved++
    }
  }
  
  console.log(`\n📊 Resultado: ${saved} guardados, ${failed} fallidos\n`)
}

async function getStats() {
  const { count: withoutAI } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .is('ai_description', null)
  
  const { count: total } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
  
  console.log('\n📊 ESTADO ACTUAL:')
  console.log(`   Total listings: ${total}`)
  console.log(`   Con AI: ${(total || 0) - (withoutAI || 0)}`)
  console.log(`   Sin AI: ${withoutAI}`)
  console.log(`   Progreso: ${Math.round(((total || 1) - (withoutAI || 0)) / (total || 1) * 100)}%\n`)
}

if (command === 'fetch') {
  await fetchBatch()
  await getStats()
} else if (command === 'save') {
  await saveBatch()
  await getStats()
} else if (command === 'stats') {
  await getStats()
} else {
  console.log('Uso: npx tsx scripts/claude-batch-generator.mts [fetch|save|stats] [--batch=15]')
}
