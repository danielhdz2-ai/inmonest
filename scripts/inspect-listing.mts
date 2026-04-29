import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function main() {
  const id = '486cbb4e-0c2f-42f2-9879-ee4d92671cda'
  
  const { data, error } = await sb
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.log('❌ Listing no encontrado:', error)
    return
  }

  console.log('\n📋 LISTING DETAILS:\n')
  console.log(`ID: ${data.id}`)
  console.log(`Title: ${data.title}`)
  console.log(`Source: ${data.source_portal}`)
  console.log(`External ID: ${data.source_external_id}`)
  console.log(`URL: ${data.source_url}`)
  console.log(`Is Particular: ${data.is_particular}`)
  console.log(`Images Count: ${data.images?.length || 0}`)
  
  if (data.images && data.images.length > 0) {
    console.log('\n🖼️ IMAGES:')
    data.images.forEach((img: string, i: number) => {
      console.log(`${i + 1}. ${img}`)
    })
  }
  
  console.log(`\n📝 Description preview:`)
  console.log(data.description?.slice(0, 300))
  
  // Ver si hay duplicados con mismo external_id
  console.log('\n🔍 Checking for duplicates...')
  const { data: dups } = await sb
    .from('listings')
    .select('id, title, created_at')
    .eq('source_external_id', data.source_external_id)
    .neq('id', id)
  
  if (dups && dups.length > 0) {
    console.log(`\n⚠️ ${dups.length} duplicate(s) found:`)
    dups.forEach((d: any) => {
      console.log(`   - ${d.id} | ${d.title.slice(0, 50)} | ${d.created_at}`)
    })
  } else {
    console.log('✅ No duplicates found')
  }
}

main()
