/**
 * Crea usuario de prueba + pedido pagado de gestoría (simula webhook Stripe).
 * Uso: npx tsx scripts/seed-test-gestoria-user.ts
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i <= 0) continue
      const key = t.slice(0, i).trim()
      let val = t.slice(i + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    /* optional */
  }
}

loadEnvLocal()

const EMAIL = 'danielgestordebanca@gmail.com'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'GestoriaTest2026!'
const CLIENT_NAME = 'Daniel Gestor'
const SERVICE_KEY = 'contrato-alquiler'
const SERVICE_NAME = 'Contrato de Alquiler de Vivienda (LAU)'
const AMOUNT = 145
const SESSION_ID = `cs_test_sim_${EMAIL.split('@')[0]}_alquiler_145`

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')

  const admin = createClient(url, key, { auth: { persistSession: false } })

  let userId: string | null = null

  const { data: listed } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const existing = listed?.users?.find((u) => u.email?.toLowerCase() === EMAIL.toLowerCase())

  if (existing) {
    userId = existing.id
    console.log('Usuario existente:', userId)
    await admin.auth.admin.updateUserById(userId, {
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: CLIENT_NAME },
    })
    console.log('Contraseña actualizada y email confirmado')
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: CLIENT_NAME },
    })
    if (error) throw error
    userId = data.user.id
    console.log('Usuario creado:', userId)
  }

  const now = new Date().toISOString()
  const payload: Record<string, unknown> = {
    session_id: SESSION_ID,
    service_key: SERVICE_KEY,
    service_name: SERVICE_NAME,
    price_eur: AMOUNT,
    client_name: CLIENT_NAME,
    client_email: EMAIL.toLowerCase(),
    amount_eur: AMOUNT,
    status: 'paid',
    paid_at: now,
    step: 1,
    user_id: userId,
    created_at: now,
  }

  const { data: row, error: grErr } = await admin
    .from('gestoria_requests')
    .upsert(payload, { onConflict: 'session_id' })
    .select('id, session_id, status, paid_at, amount_eur, step')
    .single()

  if (grErr) throw grErr

  console.log('\n✅ Pedido de gestoría simulado:')
  console.log(JSON.stringify(row, null, 2))
  console.log('\n📧 Email:', EMAIL)
  console.log('🔑 Contraseña:', PASSWORD)
  console.log('\n🔗 Login directo al panel post-pago:')
  console.log(`https://inmonest.com/login?email=${encodeURIComponent(EMAIL)}&next=${encodeURIComponent('/mi-cuenta/contratos?pago=1')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
