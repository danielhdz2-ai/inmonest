import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  const { count: total } = await sb
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: withAI } = await sb
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .not('ai_description', 'is', null)

  const { count: noAI } = await sb
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .or('ai_description.is.null,ai_description.eq.')

  console.log('\n📊 ESTADO FINAL:\n')
  console.log(`Total pisos publicados: ${total}`)
  console.log(`✅ Con descripción: ${withAI} (${Math.round((withAI! / total!) * 100)}%)`)
  console.log(`❌ Sin descripción: ${noAI}`)
}

main()
