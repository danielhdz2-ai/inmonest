const SUPABASE_URL = 'https://ktsdxpmaljiyuwimcugx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? ''

async function main() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/listings?source_portal=eq.mitula&select=id,title,price_eur,area_m2,bedrooms,source_url&limit=5',
    { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
  )
  const data = await res.json()
  console.log(JSON.stringify(data, null, 2))

  // Count total mitula
  const res2 = await fetch(
    SUPABASE_URL + '/rest/v1/listings?source_portal=eq.mitula&select=id',
    { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, Prefer: 'count=exact', 'Range-Unit': 'items', Range: '0-0' } }
  )
  const count = res2.headers.get('content-range')
  console.log('Total mitula:', count)
}
main()
