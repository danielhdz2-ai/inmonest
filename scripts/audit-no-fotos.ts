import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://ktsdxpmaljiyuwimcugx.supabase.co', process.env.SUPABASE_SERVICE_KEY!)

async function main() {
  const portals = ['pisos.com','gilmar.es','solvia.es','fotocasa','habitaclia.com','milanuncios.com','enalquiler','monapart','alisedainmobiliaria.com','redpiso']
  console.log('\n=== PISOS SIN FOTOS POR PORTAL ===\n')

  for (const p of portals) {
    const { count: total } = await sb.from('listings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published').eq('source_portal', p)
    if (!total) continue

    // Distinct listing_ids que tienen al menos 1 imagen, usando RPC sería mejor
    // pero usamos: listings que NO tienen ninguna fila en listing_images
    // Approach: total - count(listings que tienen imagen)
    // listing_images tiene listing_id, hacemos count distinct via join
    const { count: conFotos } = await sb
      .from('listings')
      .select('listing_images!inner(listing_id)', { count: 'exact', head: true })
      .eq('status', 'published')
      .eq('source_portal', p)

    const sinFotos = (total ?? 0) - (conFotos ?? 0)
    const pct = ((sinFotos / (total || 1)) * 100).toFixed(0)
    console.log(`${p.padEnd(32)} total:${String(total).padStart(5)}  sin fotos:${String(sinFotos).padStart(5)}  (${pct}%)`)
  }

  // Usuarios directos
  const { count: directTotal } = await sb.from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published').eq('origin', 'direct')
  const { count: directCon } = await sb.from('listings')
    .select('listing_images!inner(listing_id)', { count: 'exact', head: true })
    .eq('status', 'published').eq('origin', 'direct')
  const directSin = (directTotal ?? 0) - (directCon ?? 0)
  console.log(`${'directo (usuarios)'.padEnd(32)} total:${String(directTotal).padStart(5)}  sin fotos:${String(directSin).padStart(5)}  (${((directSin / (directTotal || 1)) * 100).toFixed(0)}%)`)

  // Total global
  const { count: grand } = await sb.from('listings')
    .select('id', { count: 'exact', head: true }).eq('status', 'published')
  const { count: grandCon } = await sb.from('listings')
    .select('listing_images!inner(listing_id)', { count: 'exact', head: true }).eq('status', 'published')
  console.log(`\nGLOBAL: ${grand} pisos, ${(grand??0)-(grandCon??0)} sin fotos (${(((grand??0)-(grandCon??0))/(grand||1)*100).toFixed(1)}%)`)
}

main().catch(console.error)
