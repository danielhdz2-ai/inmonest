import { createClient } from '@supabase/supabase-js'
import { decodeEnvKey } from '@/lib/stripe-key'

/**
 * Cliente Supabase con service_role — solo para uso server-side (API Routes, crons).
 * Bypasses Row Level Security. NUNCA importar desde Client Components.
 * Lee SUPABASE_SERVICE_ROLE_KEY con fallback a SUPABASE_SERVICE_KEY.
 *
 * Las variables se limpian con decodeEnvKey por si Vercel guardó el valor con
 * un salto de línea o carácter invisible al final (rompe las cabeceras HTTP
 * y provoca errores silenciosos o crashes de conexión).
 */
export function createAdminClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
  const key = decodeEnvKey(
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? '',
  )

  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configuradas')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
