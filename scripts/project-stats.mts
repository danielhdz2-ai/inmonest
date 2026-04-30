import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

console.log('📊 ESTADÍSTICAS DEL PROYECTO INMONEST\n')
console.log('=' .repeat(70))

const tables = [
  'listings',
  'gestoria_requests', 
  'agency_leads',
  'owner_leads',
  'listing_contacts',
  'users'
]

for (const table of tables) {
  const { count } = await sb.from(table).select('*', { count: 'exact', head: true })
  console.log(`${table.padEnd(25)} ${count || 0}`)
}

console.log('\n' + '='.repeat(70))

// Desglose de listings
const { count: totalListings } = await sb.from('listings').select('*', { count: 'exact', head: true })
const { count: particulares } = await sb.from('listings').select('*', { count: 'exact', head: true }).eq('is_particular', true)
const { count: agencias } = await sb.from('listings').select('*', { count: 'exact', head: true }).eq('is_particular', false)
const { count: conImagenes } = await sb.from('listings').select('*', { count: 'exact', head: true }).not('id', 'in', '(select listing_id from listing_images)')
const { count: conDescripcion } = await sb.from('listings').select('*', { count: 'exact', head: true }).not('ai_description', 'is', null)

console.log('\n📋 DESGLOSE DE LISTINGS:')
console.log(`   Total: ${totalListings}`)
console.log(`   Particulares: ${particulares} (${Math.round((particulares || 0) / (totalListings || 1) * 100)}%)`)
console.log(`   Agencias: ${agencias} (${Math.round((agencias || 0) / (totalListings || 1) * 100)}%)`)
console.log(`   Con imágenes: ${(totalListings || 0) - (conImagenes || 0)} (${Math.round(((totalListings || 0) - (conImagenes || 0)) / (totalListings || 1) * 100)}%)`)
console.log(`   Con descripción AI: ${conDescripcion} (${Math.round((conDescripcion || 0) / (totalListings || 1) * 100)}%)`)

// Por portal
console.log('\n🌐 LISTINGS POR PORTAL:')
const portals = ['habitaclia.com', 'wallapop.com', 'milanuncios.com', 'fotocasa.es', 'idealista.com', 'pisos.com']
for (const portal of portals) {
  const { count } = await sb.from('listings').select('*', { count: 'exact', head: true }).eq('source_portal', portal)
  if (count && count > 0) {
    console.log(`   ${portal.padEnd(20)} ${count}`)
  }
}

console.log('\n' + '='.repeat(70))
