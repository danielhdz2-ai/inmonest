// Configuración global de Supabase para componentes client
// Este archivo expone las variables de entorno NEXT_PUBLIC_* al cliente

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ktsdxpmaljiyuwimcugx.supabase.co'
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Helper para construir URLs de Storage
export function getSupabaseStorageUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}
