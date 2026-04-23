import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase con service_role — solo para uso server-side (API Routes, crons).
 * Bypasses Row Level Security. NUNCA importar desde Client Components.
 * Lee SUPABASE_SERVICE_ROLE_KEY con fallback a SUPABASE_SERVICE_KEY.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configuradas')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
