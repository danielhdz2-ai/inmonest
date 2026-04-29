import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data } = await sb
  .from('listings')
  .select('id, title, description, ai_description, source_portal')
  .eq('source_portal', 'habitaclia.com')
  .order('created_at', { ascending: false })

console.log(`📊 Total pisos Habitaclia: ${data?.length || 0}\n`)

if (data && data.length > 0) {
  const withOriginal = data.filter(l => l.description && l.description.length > 50)
  const withAI = data.filter(l => l.ai_description && l.ai_description.length > 50)
  const withAny = data.filter(l => 
    (l.description && l.description.length > 50) || 
    (l.ai_description && l.ai_description.length > 50)
  )
  
  console.log('📝 DESCRIPCIONES:')
  console.log(`   Descripción original: ${withOriginal.length}/${data.length}`)
  console.log(`   Descripción AI: ${withAI.length}/${data.length}`)
  console.log(`   Con alguna descripción: ${withAny.length}/${data.length}`)
  
  const missing = data.filter(l => 
    (!l.description || l.description.length <= 50) && 
    (!l.ai_description || l.ai_description.length <= 50)
  )
  
  if (missing.length > 0) {
    console.log(`\n⚠️ SIN DESCRIPCIÓN (${missing.length}):`)
    missing.forEach((l, i) => {
      console.log(`   ${i+1}. ${l.title.slice(0,60)}`)
      console.log(`      Original: ${l.description?.length || 0} chars, AI: ${l.ai_description?.length || 0} chars`)
    })
  } else {
    console.log('\n✅ Todos los pisos tienen descripción')
  }
}
