/**
 * Muestra distribución de source_portal en la tabla listings
 * y borra los falsos (origin='mvl-gen' o source_portal='mvl-gen')
 * Uso: npx tsx scripts/check-db.ts [--delete-fake]
 */
const KEY = process.env.SUPABASE_SERVICE_KEY ?? ''
const URL_BASE = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const HEADERS = { apikey: KEY, Authorization: `Bearer ${KEY}` }

if (!KEY) { console.error('❌ SUPABASE_SERVICE_KEY no configurada'); process.exit(1) }

async function main() {
  // 1. Listar portales
  const r = await fetch(`${URL_BASE}/rest/v1/listings?select=source_portal,origin&limit=2000`, { headers: HEADERS })
  const rows = await r.json() as Array<{ source_portal: string; origin: string }>

  const counts: Record<string, number> = {}
  rows.forEach(x => {
    const k = `${x.source_portal ?? 'null'} (origin: ${x.origin ?? 'null'})`
    counts[k] = (counts[k] ?? 0) + 1
  })
  console.log('\n📊 Distribución de listings:\n')
  Object.entries(counts).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`))
  console.log(`\n  TOTAL: ${rows.length}`)

  // 2. Borrar falsos si se pide
  if (process.argv.includes('--delete-fake')) {
    const fakePortals = ['mvl-gen', 'seed', 'test']
    for (const portal of fakePortals) {
      const del = await fetch(
        `${URL_BASE}/rest/v1/listings?source_portal=eq.${portal}`,
        { method: 'DELETE', headers: { ...HEADERS, Prefer: 'return=representation' } }
      )
      if (del.ok) {
        const deleted = await del.json() as unknown[]
        if (deleted.length > 0) console.log(`🗑️  Borrados ${deleted.length} pisos de source_portal='${portal}'`)
        else console.log(`ℹ️  Ningún piso con source_portal='${portal}'`)
      } else {
        console.log(`⚠️  Error borrando '${portal}':`, await del.text())
      }
    }
    // También borrar por origin
    const del2 = await fetch(
      `${URL_BASE}/rest/v1/listings?origin=eq.mvl-gen`,
      { method: 'DELETE', headers: { ...HEADERS, Prefer: 'return=representation' } }
    )
    if (del2.ok) {
      const deleted2 = await del2.json() as unknown[]
      if (deleted2.length > 0) console.log(`🗑️  Borrados ${deleted2.length} pisos con origin='mvl-gen'`)
    }
  }
}

main().catch(console.error)
