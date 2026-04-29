/**
 * Genera descripciones IA para pisos de Wallapop sin descripción
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import { generateAiDescription } from '../src/lib/ai-description.js'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const openrouterKey = process.env.OPENROUTER_API_KEY!

const sb = createClient(supabaseUrl, supabaseKey)

async function generateForWallapop() {
  console.log('🤖 Generando descripciones IA para pisos de Wallapop...\n')

  const { data: listings, error } = await sb
    .from('listings')
    .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
    .eq('source_portal', 'wallapop')
    .or('ai_description.is.null,ai_description.eq.')
    .limit(15)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!listings || listings.length === 0) {
    console.log('✅ Todos los pisos de Wallapop ya tienen descripción IA')
    return
  }

  console.log(`📋 ${listings.length} pisos a procesar\n`)

  let ok = 0
  let fail = 0

  for (const listing of listings) {
    process.stdout.write(`[${ok + fail + 1}/${listings.length}] Procesando ${listing.id.substring(0, 8)}... `)

    const aiDesc = await generateAiDescription(listing as any, openrouterKey)

    if (!aiDesc) {
      console.log('❌ Error')
      fail++
      await sleep(500)
      continue
    }

    const { error: updateErr } = await sb
      .from('listings')
      .update({ ai_description: aiDesc })
      .eq('id', listing.id)

    if (updateErr) {
      console.log(`❌ Error guardando: ${updateErr.message}`)
      fail++
    } else {
      console.log('✅')
      ok++
    }

    await sleep(500)
  }

  console.log(`\n📊 Resultado:`)
  console.log(`   ✅ Guardados: ${ok}`)
  console.log(`   ❌ Errores: ${fail}`)
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

generateForWallapop()
