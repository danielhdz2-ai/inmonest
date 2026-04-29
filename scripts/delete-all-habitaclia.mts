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
  .select('id')
  .eq('source_portal', 'habitaclia.com')

if (data && data.length > 0) {
  const ids = data.map(l => l.id)
  await sb.from('listings').delete().in('id', ids)
  console.log(`Eliminados ${ids.length} pisos de Habitaclia`)
} else {
  console.log('No hay pisos de Habitaclia para eliminar')
}
