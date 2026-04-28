/**
 * Script para verificar descripciones IA en listings recientes
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDescriptions() {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, is_particular, ai_description, city, source_portal, created_at')
    .eq('source_portal', 'pisos.com')
    .eq('city', 'Barcelona')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n📋 Últimos 10 pisos de Barcelona (pisos.com):\n')
  
  for (const listing of data) {
    const hasAi = listing.ai_description ? '✅' : '❌'
    const tipo = listing.is_particular ? 'PARTICULAR' : 'AGENCIA   '
    const desc = listing.ai_description 
      ? listing.ai_description.slice(0, 80) + '...'
      : 'Sin descripción IA'
    
    console.log(`${hasAi} [${tipo}] ${listing.title.slice(0, 50)}`)
    console.log(`   ${desc}`)
    console.log(`   ID: ${listing.id.slice(0, 8)}... | Creado: ${new Date(listing.created_at).toLocaleString('es-ES')}`)
    console.log()
  }

  const withAi = data.filter(l => l.ai_description).length
  console.log(`📊 Total: ${withAi}/${data.length} con descripción IA`)
}

checkDescriptions().catch(console.error)
