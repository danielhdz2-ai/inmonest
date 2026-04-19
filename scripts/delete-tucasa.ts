const KEY = process.env.SUPABASE_SERVICE_KEY ?? ''
const BASE = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

if (!KEY) { console.error('❌ KEY no configurada'); process.exit(1) }

async function main() {
  type Row = { id: string; title: string; city: string; source_portal: string }

  // Ver los de tucasa (sin .com)
  const r = await fetch(BASE + '/rest/v1/listings?source_portal=eq.tucasa&select=id,title,city,source_portal', { headers: H })
  const rows = await r.json() as Row[]
  console.log('Pisos source_portal=tucasa:', rows.length)
  rows.forEach(x => console.log(`  [${x.city}] ${x.title?.slice(0, 60)}`))

  if (rows.length > 0) {
    const d = await fetch(BASE + '/rest/v1/listings?source_portal=eq.tucasa', {
      method: 'DELETE', headers: { ...H, Prefer: 'return=representation' }
    })
    const deleted = await d.json() as unknown[]
    console.log(`✅ Eliminados: ${deleted.length}`)
  }

  // Verificar que no queda ninguna variante
  const r2 = await fetch(BASE + '/rest/v1/listings?source_portal=like.*tucasa*&select=id,source_portal&limit=20', { headers: H })
  const rest = await r2.json() as Row[]
  if (rest.length === 0) {
    console.log('✅ Ningún piso de tucasa queda en el sistema')
  } else {
    console.log('⚠️  Aún quedan:', rest.map(x => x.source_portal))
  }
}

main().catch(console.error)
