// Ejecuta la migración 021_has_images.sql en producción
// Uso: node scripts/run-migration-021.mjs

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import https from 'https'
import { config } from 'dotenv'
const __dir = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dir, '../.env.local') })

const SQL = readFileSync(join(__dir, '../supabase/migrations/021_has_images.sql'), 'utf8')

const PROJECT = 'ktsdxpmaljiyuwimcugx'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) { console.error('Falta SUPABASE_SERVICE_KEY en .env.local'); process.exit(1) }

function rpc(fn, args) {
  return new Promise((res, rej) => {
    const body = JSON.stringify(args)
    const req = https.request({
      hostname: `${PROJECT}.supabase.co`,
      path: `/rest/v1/rpc/${fn}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      }
    }, r => {
      let d = ''
      r.on('data', c => d += c)
      r.on('end', () => res({ status: r.statusCode, body: d }))
    })
    req.on('error', rej)
    req.write(body)
    req.end()
  })
}

// Intentar via exec_sql RPC (si existe)
console.log('Aplicando migración 021_has_images...')
const r = await rpc('exec_sql', { sql: SQL })

if (r.status === 200 || r.status === 204) {
  console.log('✅ Migración aplicada correctamente')
} else if (r.status === 404) {
  console.log('⚠️  RPC exec_sql no existe. Ejecuta este SQL en el SQL Editor de Supabase:')
  console.log('   https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new')
  console.log('\n--- SQL a pegar ---\n')
  console.log(SQL)
  console.log('\n--- Fin SQL ---')
} else {
  console.log(`❌ Error ${r.status}:`, r.body)
  console.log('\nEjecuta el SQL manualmente en:')
  console.log('   https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new')
  console.log('\n--- SQL a pegar ---\n')
  console.log(SQL)
}
