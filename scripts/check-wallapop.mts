import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const sb = createClient(supabaseUrl, supabaseKey)

async function checkWallapop() {
  const { data, error } = await sb
    .from('listings')
    .select('id, title, ai_description, source_portal, operation, price_eur')
    .eq('source_portal', 'wallapop')
    .order('created_at', { ascending: false })
    .limit(15)

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  console.log(`\n🟠 WALLAPOP - ${data.length} pisos encontrados:\n`)
  
  data.forEach((p, i) => {
    const hasAI = p.ai_description ? '✅' : '❌ SIN IA'
    const op = p.operation === 'sale' ? 'VENTA' : 'ALQUILER'
    console.log(`${i + 1}. ${hasAI} [${op}] ${p.price_eur}€ - ${p.title.substring(0, 50)}...`)
  })

  const sinIA = data.filter(p => !p.ai_description).length
  console.log(`\n📊 Resumen:`)
  console.log(`   Total: ${data.length}`)
  console.log(`   Sin descripción IA: ${sinIA}`)
  console.log(`   Con descripción IA: ${data.length - sinIA}`)
}

checkWallapop()
