import { createClient } from '@supabase/supabase-js'

const db = createClient(
  'https://ktsdxpmaljiyuwimcugx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8'
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
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY1NDg1NCwiZXhwIjoyMDkxMjMwODU0fQ.0VuUqRsrb2kNgLfoqyduMC7weRc9JJKtg1r14mOEbi8'
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
