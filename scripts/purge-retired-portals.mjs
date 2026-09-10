/**
 * Elimina del catálogo anuncios de portales retirados (pisos.com, particulares, agencias).
 * Conserva is_bank=true (Solvia, Aliseda, Hipoges…) y anuncios publicados por usuarios.
 *
 * Uso: node scripts/purge-retired-portals.mjs
 * Requiere SUPABASE_SERVICE_KEY en .env.local
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) {
  console.error('Falta SUPABASE_SERVICE_KEY en .env.local')
  process.exit(1)
}

const db = createClient('https://ktsdxpmaljiyuwimcugx.supabase.co', SERVICE_KEY)

const RETIRED_PORTALS = [
  'pisos.com',
  'milanuncios.com',
  'milanuncios',
  'fotocasa',
  'habitaclia.com',
  'habitaclia',
  'tecnocasa',
  'redpiso',
  'monapart',
  'gilmar.es',
  'gilmar',
  'indomio',
  'properstar',
  'enalquiler',
  'wallapop',
  'yaencontre',
]

async function count() {
  const { count } = await db.from('listings').select('id', { count: 'exact', head: true })
  return count ?? 0
}

async function deletePortal(portal) {
  const { data: rows, error: selErr } = await db
    .from('listings')
    .select('id')
    .eq('source_portal', portal)

  if (selErr) {
    console.error(`  ✗ ${portal}:`, selErr.message)
    return 0
  }

  const ids = (rows ?? []).map((r) => r.id)
  if (ids.length === 0) {
    console.log(`  · ${portal}: 0`)
    return 0
  }

  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100)
    await db.from('listing_images').delete().in('listing_id', chunk)
    const { error: delErr } = await db.from('listings').delete().in('id', chunk)
    if (delErr) {
      console.error(`  ✗ ${portal} delete (chunk ${i}):`, delErr.message)
      return i
    }
  }

  console.log(`  ✓ ${portal}: ${ids.length} eliminados`)
  return ids.length
}

async function deleteNonBankScraped() {
  const { data: rows, error: selErr } = await db
    .from('listings')
    .select('id')
    .eq('is_bank', false)
    .is('owner_user_id', null)

  if (selErr) {
    console.error('  ✗ non-bank scraped:', selErr.message)
    return 0
  }

  const ids = (rows ?? []).map((r) => r.id)
  if (ids.length === 0) {
    console.log('  · resto scrapeado no bancario: 0')
    return 0
  }

  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100)
    await db.from('listing_images').delete().in('listing_id', chunk)
    await db.from('listings').delete().in('id', chunk)
  }

  console.log(`  ✓ resto scrapeado no bancario: ${ids.length} eliminados`)
  return ids.length
}

console.log('=== PURGA CATÁLOGO (portales retirados) ===')
console.log('Antes:', await count())

let total = 0
console.log('\nPor portal:')
for (const portal of RETIRED_PORTALS) {
  total += await deletePortal(portal)
}

console.log('\nResto no bancario sin owner:')
total += await deleteNonBankScraped()

console.log('\nTotal eliminados:', total)
console.log('Después:', await count())
