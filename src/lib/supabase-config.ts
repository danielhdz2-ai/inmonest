// Configuración global de Supabase para componentes client
// Este archivo expone las variables de entorno NEXT_PUBLIC_* al cliente
// Con fallbacks hardcodeados para garantizar disponibilidad

const SUPABASE_URL_ENV = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY_ENV = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const SUPABASE_URL = SUPABASE_URL_ENV || 'https://ktsdxpmaljiyuwimcugx.supabase.co'
export const SUPABASE_ANON_KEY = SUPABASE_ANON_KEY_ENV || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c2R4cG1hbGppeXV3aW1jdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTQ4NTQsImV4cCI6MjA5MTIzMDg1NH0.P1qEC73XK9QCCcN7GH9RmBrE1e1oQbes5Nj061h5LLA'

// Helper para construir URLs de Storage
export function getSupabaseStorageUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}
