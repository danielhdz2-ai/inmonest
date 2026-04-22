import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
if (!SERVICE_KEY) { console.error('Falta SUPABASE_SERVICE_KEY en .env.local'); process.exit(1) }

const db = createClient(
  'https://ktsdxpmaljiyuwimcugx.supabase.co',
  SERVICE_KEY
)

// Verificar columnas faltantes y crearlas
const { error } = await (db as any).rpc('exec_sql', {
  sql: `
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '{}';
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS is_bank boolean DEFAULT false;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS bank_entity text;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS advertiser_name text;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS ranking_score numeric DEFAULT 0;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS turbo_until timestamptz;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS particular_confidence numeric DEFAULT 0;
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS views_count integer DEFAULT 0;
  `
})

if (error) {
  console.log('RPC no disponible, intentando query directa...')
  // Intentar via fetch directo a la Management API
  const res = await fetch('https://ktsdxpmaljiyuwimcugx.supabase.co/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY
    },
    body: JSON.stringify({ sql: "ALTER TABLE listings ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '{}';" })
  })
  console.log('RPC status:', res.status, await res.text())
} else {
  console.log('Columnas creadas OK')
}

// Verificar que features ahora existe
const { data, error: e2 } = await db.from('listings').select('features').limit(1)
if (e2) console.log('features AUN NO existe:', e2.message)
else console.log('features EXISTE ahora:', JSON.stringify(data))
