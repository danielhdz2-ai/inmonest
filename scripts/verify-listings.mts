import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

console.log('📊 Contando pisos por portal...\n')

const { data: listings, error } = await supabase
  .from('listings')
  .select('source_portal')

if (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}

const counts: Record<string, number> = {}
listings?.forEach(l => {
  const portal = l.source_portal || 'desconocido'
  counts[portal] = (counts[portal] || 0) + 1
})

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

console.log('Portal                    | Pisos')
console.log('--------------------------|-------')
sorted.forEach(([portal, count]) => {
  console.log(`${portal.padEnd(25)} | ${count}`)
})

console.log('--------------------------|-------')
console.log(`${'TOTAL'.padEnd(25)} | ${listings?.length || 0}`)
