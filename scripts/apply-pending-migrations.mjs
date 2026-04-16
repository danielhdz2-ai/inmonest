// Aplica migraciones pendientes en la BD de producción
// Uso: node scripts/apply-pending-migrations.mjs

import https from 'https'

const PROJECT_REF = 'ktsdxpmaljiyuwimcugx'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8'

// SQL a ejecutar — columnas que faltan en producción
const SQL = `
ALTER TABLE listings ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '{}';
`

function post(url, data, headers) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)
    const opts = new URL(url)
    opts.method = 'POST'
    opts.headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), ...headers }
    const req = https.request(opts, res => {
      let raw = ''
      res.on('data', c => raw += c)
      res.on('end', () => resolve({ status: res.statusCode, body: raw }))
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

// Supabase tiene un endpoint admin para ejecutar SQL via Management API
// pero requiere access token de supabase.com/dashboard, no el service role key.
// En su lugar, vamos a usar la extensión pg_net o crear una función temporal.

// Intentar via endpoint exec (Supabase Cloud no expone esto directamente)
// Alternativa: crear una función SQL temporal y luego ejecutarla
const CREATE_FUNC_SQL = `
CREATE OR REPLACE FUNCTION _tmp_apply_migration()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  ALTER TABLE listings ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '{}';
END;
$$;
`

console.log('==========================================')
console.log('INSTRUCCIONES MANUALES (método más rápido)')
console.log('==========================================')
console.log('')
console.log('1. Ir a: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new')
console.log('')
console.log('2. Pegar y ejecutar este SQL:')
console.log('')
console.log(SQL)
console.log('')
console.log('==========================================')
console.log('Intentando también via API...')
console.log('==========================================')

// Intentar via Supabase REST RPC (necesita una función existente)
const res = await post(
  `https://${PROJECT_REF}.supabase.co/rest/v1/rpc/exec_sql`,
  { sql: SQL },
  {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`
  }
)
console.log('RPC exec_sql status:', res.status, res.body)

if (res.status === 404) {
  console.log('')
  console.log('La función exec_sql no existe. Para ejecutar SQL desde scripts:')
  console.log('Primero crea esta función en el SQL Editor de Supabase:')
  console.log('')
  console.log(`
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  EXECUTE sql;
END;
$$;
  `)
  console.log('Después podrás ejecutar SQL desde este script.')
}
