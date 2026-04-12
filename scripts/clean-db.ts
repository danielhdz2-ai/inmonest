/**
 * Limpia la DB de listings corruptos/falsos:
 * - Sin precio (price_eur null), origen externo
 * - Título con "Arrow icon" (residuo de Mitula)
 * - source_portal = 'mitula'
 */
const KEY = process.env.SUPABASE_SERVICE_KEY ?? ''
const URL_BASE = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const HEADERS = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

if (!KEY) { console.error('❌ SUPABASE_SERVICE_KEY no configurada'); process.exit(1) }

async function deleteWhere(filter: string, reason: string) {
  const res = await fetch(`${URL_BASE}/rest/v1/listings?${filter}`, {
    method: 'DELETE',
    headers: { ...HEADERS, Prefer: 'return=representation' },
  })
  if (!res.ok) { console.error(`  ⚠️ Error: ${await res.text()}`); return }
  const deleted = await res.json() as unknown[]
  if (deleted.length > 0) console.log(`  🗑️  Eliminados ${deleted.length} — ${reason}`)
  else console.log(`  ✅ Nada que eliminar — ${reason}`)
}

async function main() {
  console.log('\n🔍 Auditando base de datos...\n')

  // Ver estado actual
  const r = await fetch(`${URL_BASE}/rest/v1/listings?select=source_portal,origin&limit=2000`, { headers: HEADERS })
  const rows = await r.json() as Array<{ source_portal: string; origin: string }>
  const counts: Record<string, number> = {}
  rows.forEach(x => {
    const k = `${x.source_portal ?? 'null'} (origin: ${x.origin})`
    counts[k] = (counts[k] ?? 0) + 1
  })
  console.log('📊 Estado antes de limpiar:')
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`))
  console.log(`  TOTAL: ${rows.length}\n`)

  // Ver los sin precio para confirmar
  const rNullPrice = await fetch(`${URL_BASE}/rest/v1/listings?select=id,source_portal,origin,title,price_eur&price_eur=is.null&limit=100`, { headers: HEADERS })
  const nullPriceRows = await rNullPrice.json() as Array<Record<string, unknown>>
  if (nullPriceRows.length > 0) {
    console.log(`⚠️  ${nullPriceRows.length} listing(s) sin precio:`)
    nullPriceRows.forEach(x => console.log(`  [${x.source_portal ?? x.origin}] "${String(x.title ?? '').slice(0, 60)}"`))
    console.log()
  } else {
    console.log('✅ Ningún listing sin precio\n')
  }

  console.log('🗑️  Eliminando corruptos...\n')

  // 1. Mitula (todos)
  await deleteWhere('source_portal=eq.mitula', 'source_portal = mitula')

  // 2. Título = "Arrow icon pointing to the right" (residuo mitula)
  await deleteWhere('title=eq.Arrow icon pointing to the right', 'título Arrow icon')

  // 3. Sin precio + origen externo (no son anuncios de usuarios)
  await deleteWhere('price_eur=is.null&origin=eq.external', 'sin precio (externos)')

  // 4. Sin precio + sin publicar (borradores externos sin datos)
  await deleteWhere('price_eur=is.null&status=eq.draft&origin=neq.direct', 'borrador sin precio')

  // Estado final
  console.log('\n📊 Estado final:')
  const r2 = await fetch(`${URL_BASE}/rest/v1/listings?select=source_portal,origin&limit=2000`, { headers: HEADERS })
  const rows2 = await r2.json() as Array<{ source_portal: string; origin: string }>
  const counts2: Record<string, number> = {}
  rows2.forEach(x => {
    const k = `${x.source_portal ?? 'null'} (origin: ${x.origin})`
    counts2[k] = (counts2[k] ?? 0) + 1
  })
  Object.entries(counts2).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`))
  console.log(`  TOTAL: ${rows2.length}`)
  console.log('\n✨ Limpieza completada\n')
}

main().catch(console.error)
