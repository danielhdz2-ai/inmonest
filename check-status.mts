import { createClient } from '@supabase/supabase-js'

const url = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!anon) { console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY no definida'); process.exit(1) }

const s = createClient(url, anon)

const { data: grouped, error: e1 } = await s
  .from('listings')
  .select('status')
  .limit(5000)

if (e1) { console.error('Error RLS:', e1.message); process.exit(1) }

const counts: Record<string, number> = {}
for (const row of grouped ?? []) {
  counts[row.status ?? 'null'] = (counts[row.status ?? 'null'] ?? 0) + 1
}
console.log('Distribución de status:', counts)

// 2. Count total
const { count, error: e2 } = await s.from('listings').select('*', { count: 'exact', head: true })
console.log('Total accesible con anon key:', count, e2?.message ?? '')
