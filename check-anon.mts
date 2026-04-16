import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Leer .env.local manualmente
const env: Record<string,string> = {}
for (const line of readFileSync('.env.local','utf8').split('\n')) {
  const m = line.match(/^([^#=]+)=(.+)$/)
  if (m) env[m[1].trim()] = m[2].trim().replace(/^"|"$/g,'')
}
const url = env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
console.log('URL:', url.slice(0, 40))
console.log('KEY length:', key.length)

const sb = createClient(url, key)
const LIST_SELECT = 'id, origin, operation, title, price_eur, province, city, district, postal_code, lat, lng, bedrooms, bathrooms, area_m2, source_portal, is_particular, particular_confidence, ranking_score, turbo_until, status, views_count, published_at, created_at, is_bank, bank_entity, features, advertiser_name, source_external_id, listing_images(id, storage_path, external_url, position)'

// Test 1: sin join
const { data: d1, error: e1, count: c1 } = await sb
  .from('listings')
  .select('id, status, operation', { count: 'exact', head: false })
  .eq('status', 'published')
  .limit(3)
console.log('Test1 (sin join) - error:', e1, '| count:', c1, '| rows:', d1?.length)

// Test 2: con LIST_SELECT completo
const { data: d2, error: e2, count: c2 } = await sb
  .from('listings')
  .select(LIST_SELECT, { count: 'exact' })
  .eq('status', 'published')
  .order('ranking_score', { ascending: false })
  .order('published_at', { ascending: false })
  .range(0, 2)
console.log('Test2 (LIST_SELECT) - error:', e2, '| count:', c2, '| rows:', d2?.length)
if (e2) console.log('  error detail:', JSON.stringify(e2))

// Test 3: con operation filter
const { data: d3, error: e3, count: c3 } = await sb
  .from('listings')
  .select(LIST_SELECT, { count: 'exact' })
  .eq('status', 'published')
  .eq('operation', 'sale')
  .range(0, 2)
console.log('Test3 (sale) - error:', e3, '| count:', c3, '| rows:', d3?.length)
