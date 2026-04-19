/**
 * scripts/maintenance/backfill-features.ts
 *
 * Lee todos los listings publicados con description en Supabase y les aplica
 * extractAmenities(description) para añadir las amenidades que falten
 * (ascensor, piscina, garaje, terraza…) SIN sobrescribir los datos ya existentes.
 *
 * ESTRATEGIA DE MERGE:
 *   - Los keys que ya existen en features → se respetan (datos de scraping HTML son más ricos)
 *   - Los keys nuevos extraídos de la descripción → se añaden
 *   - Solo se hace PATCH si hay al menos 1 key nuevo
 *
 * USO:
 *   npx tsx scripts/maintenance/backfill-features.ts           # actualiza BD
 *   npx tsx scripts/maintenance/backfill-features.ts --dry-run # solo muestra, no escribe
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { extractAmenities } from '../scrapers/utils'

const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY ?? ''
const BATCH_SIZE   = 500   // registros por petición GET
const PATCH_DELAY  = 25    // ms entre PATCHes (evitar rate-limit)

const DRY_RUN = process.argv.includes('--dry-run')

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

interface ListingRow {
  id: string
  description: string | null
  features: Record<string, string> | null
}

async function fetchBatch(offset: number): Promise<ListingRow[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/listings` +
    `?select=id,description,features` +
    `&description=not.is.null` +
    `&status=eq.published` +
    `&limit=${BATCH_SIZE}&offset=${offset}`

  const res = await fetch(url, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  })
  if (!res.ok) throw new Error(`GET error ${res.status}: ${await res.text()}`)
  return res.json() as Promise<ListingRow[]>
}

async function patchFeatures(id: string, features: Record<string, string>): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ features }),
  })
  return res.ok
}

async function main() {
  if (!SERVICE_KEY) {
    console.error('❌ SUPABASE_SERVICE_KEY no encontrada en .env.local')
    process.exit(1)
  }

  if (DRY_RUN) console.log('🧪 MODO DRY-RUN — no se escribirá nada en la BD\n')
  console.log('🔍 Leyendo listings con description desde Supabase…\n')

  let offset       = 0
  let totalRead    = 0
  let totalPatched = 0
  let totalSkipped = 0
  let totalErrors  = 0

  // Estadísticas de qué amenidades se añadieron más
  const keyCounts: Record<string, number> = {}

  while (true) {
    const batch = await fetchBatch(offset)
    if (batch.length === 0) break

    totalRead += batch.length
    console.log(
      `📦 Lote ${offset + 1}–${offset + batch.length}` +
      ` | leídos hasta ahora: ${totalRead}`
    )

    for (const row of batch) {
      if (!row.description?.trim()) { totalSkipped++; continue }

      const existing: Record<string, string> = row.features ?? {}

      // Extraer amenidades de la descripción (texto plano, no HTML)
      const extracted = extractAmenities(row.description)

      // Solo keys que NO están ya en features existentes
      const toAdd: Record<string, string> = {}
      for (const [k, v] of Object.entries(extracted)) {
        if (!(k in existing)) toAdd[k] = v
      }

      if (Object.keys(toAdd).length === 0) {
        totalSkipped++
        continue
      }

      // Acumular estadísticas
      for (const k of Object.keys(toAdd)) {
        keyCounts[k] = (keyCounts[k] ?? 0) + 1
      }

      const merged = { ...existing, ...toAdd }
      const newKeysList = Object.keys(toAdd).join(', ')

      if (DRY_RUN) {
        console.log(`  🔎 ${row.id.slice(0, 8)} → +${Object.keys(toAdd).length} [ ${newKeysList} ]`)
        totalPatched++
        continue
      }

      const ok = await patchFeatures(row.id, merged)
      if (ok) {
        totalPatched++
        console.log(
          `  ✅ [${totalPatched}] ${row.id.slice(0, 8)}` +
          ` → +${Object.keys(toAdd).length} [ ${newKeysList} ]`
        )
      } else {
        totalErrors++
        console.warn(`  ⚠️  PATCH falló: ${row.id}`)
      }

      await sleep(PATCH_DELAY)
    }

    // Última página → salir
    if (batch.length < BATCH_SIZE) break
    offset += BATCH_SIZE
  }

  // ── Resumen ────────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(55)}`)
  console.log(`📊 BACKFILL ${DRY_RUN ? '(DRY-RUN) ' : ''}COMPLETADO`)
  console.log(`${'─'.repeat(55)}`)
  console.log(`   📖 ${totalRead.toLocaleString()} listings leídos`)
  console.log(`   ✅ ${totalPatched.toLocaleString()} actualizados con nuevas amenidades`)
  console.log(`   ⏭️  ${totalSkipped.toLocaleString()} sin cambios (ya completos o sin desc.)`)
  if (totalErrors > 0) console.log(`   ❌ ${totalErrors} errores de PATCH`)

  if (Object.keys(keyCounts).length > 0) {
    console.log(`\n   🏷️  Amenidades añadidas (top):`)
    const sorted = Object.entries(keyCounts).sort((a, b) => b[1] - a[1]).slice(0, 10)
    for (const [key, count] of sorted) {
      console.log(`      ${key.padEnd(25)} ${count} pisos`)
    }
  }
}

main().catch(console.error)
