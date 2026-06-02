import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MAX = parseInt(process.env.MAX_LISTINGS || '100', 10)

async function checkAvailability() {
  console.log(`🔍 Verificando pisos más antiguos...`)
  console.log(`📊 Límite: ${MAX} pisos\n`)

  // Obtener pisos más antiguos (probable que ya no existan)
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, source_url, source_portal, scraped_at')
    .eq('status', 'published')
    .not('source_url', 'is', null)
    .order('scraped_at', { ascending: true })
    .limit(MAX)

  if (error) {
    console.error('❌ Error:', error)
    return
  }

  if (!listings || listings.length === 0) {
    console.log('✅ No hay pisos antiguos para verificar')
    return
  }

  console.log(`📋 Verificando ${listings.length} pisos...\n`)

  let removed = 0
  let available = 0
  let errors = 0

  // Verificar en lotes de 10 (concurrencia controlada)
  for (let i = 0; i < listings.length; i += 10) {
    const batch = listings.slice(i, i + 10)

    await Promise.all(batch.map(async (listing) => {
      try {
        const response = await fetch(listing.source_url!, {
          method: 'HEAD',
          signal: AbortSignal.timeout(8000),
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; InmonestBot/1.0; +https://inmonest.com)'
          }
        })

        // Códigos que indican que el piso ya no existe
        if (response.status === 404 || response.status === 410 || response.status === 403) {
          console.log(`❌ [${response.status}] ${listing.title} - ${listing.source_portal}`)

          // Eliminar de la BD
          await supabase
            .from('listings')
            .delete()
            .eq('id', listing.id)

          removed++
        } else if (response.status === 200) {
          available++
        }
      } catch (err) {
        // Timeout o error de red - no eliminar (podría ser transitorio)
        errors++
      }
    }))

    // Pausa entre lotes para no saturar
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  console.log(`\n📊 RESUMEN:`)
  console.log(`✅ Disponibles: ${available}`)
  console.log(`❌ Eliminados (404/410): ${removed}`)
  console.log(`⚠️  Errores/Timeout: ${errors}`)
}

checkAvailability().catch(console.error)
