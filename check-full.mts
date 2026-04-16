import { createClient } from '@supabase/supabase-js'
const s = createClient(
  'https://ktsdxpmaljiyuwimcugx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTQ4NTQsImV4cCI6MjA5MTIzMDg1NH0.P1qEC73XK9QCCcN7GH9RmBrE1e1oQbes5Nj061h5LLA'
)

// 1. Distribución por operation
const { data: ops } = await s.from('listings').select('operation').limit(5000)
const opCounts: Record<string, number> = {}
for (const r of ops ?? []) opCounts[r.operation ?? 'null'] = (opCounts[r.operation ?? 'null'] ?? 0) + 1
console.log('Distribución operation (muestra 1000):', opCounts)

// 2. Query exacta que hace _searchListings sin filtros
const { data, error, count } = await s
  .from('listings')
  .select('id, title, operation, status, source_portal', { count: 'exact' })
  .eq('status', 'published')
  .order('ranking_score', { ascending: false })
  .range(0, 4)
console.log('Query sin filtros — count:', count, 'error:', error?.message)
console.log('Primeros 5:', data?.map(d => `${d.operation} | ${d.source_portal} | ${d.title?.slice(0,40)}`))

// 3. Con listing_images join (como hace el scraper real)
const { data: withImages, error: e2 } = await s
  .from('listings')
  .select('id, title, listing_images(id, external_url)')
  .eq('status', 'published')
  .limit(3)
console.log('\nCon join listing_images — error:', e2?.message, 'data:', withImages?.map(d => ({ id: d.id, imgs: (d as any).listing_images?.length })))
