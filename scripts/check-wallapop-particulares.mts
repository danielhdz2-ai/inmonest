import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  const { data } = await sb
    .from('listings')
    .select('id, title, city, operation, price_eur, source_portal, is_particular')
    .eq('source_portal', 'wallapop')
    .eq('is_particular', true)
    .order('created_at', { ascending: false })
    .limit(15)

  console.log('\n🏠 Pisos de PARTICULARES en Wallapop:\n')
  
  data?.forEach((l, i) => {
    const op = l.operation === 'sale' ? 'Venta' : 'Alquiler'
    const price = l.price_eur?.toLocaleString('es-ES') || '?'
    console.log(`${i+1}. ${l.title.slice(0,50)} | ${op} | ${price}€ | ${l.city}`)
  })
  
  console.log(`\nTotal: ${data?.length} pisos de particulares verificados`)
}

main()
