/**
 * Script para configurar políticas RLS del bucket 'listings' via API
 * Ejecutar: npx tsx scripts/configurar-politicas-storage.mts
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function configurarPoliticas() {
  console.log('\n🔐 CONFIGURANDO POLÍTICAS RLS PARA BUCKET "listings"\n')
  
  console.log('⚠️  IMPORTANTE:')
  console.log('   Este script NO puede crear políticas RLS desde la API de Supabase.')
  console.log('   Las políticas RLS deben configurarse desde el Dashboard de Supabase.\n')
  
  console.log('📋 PASOS MANUALES:\n')
  console.log('1. Ir a: https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/policies')
  console.log('')
  console.log('2. Seleccionar bucket "listings"')
  console.log('')
  console.log('3. Click en "New Policy" y crear las siguientes políticas:\n')
  
  console.log('   ╔═══════════════════════════════════════════════════════════════╗')
  console.log('   ║ POLÍTICA 1: Allow authenticated uploads                      ║')
  console.log('   ╠═══════════════════════════════════════════════════════════════╣')
  console.log('   ║ Policy name: Authenticated users can upload                  ║')
  console.log('   ║ Allowed operation: INSERT                                    ║')
  console.log('   ║ Target roles: authenticated                                  ║')
  console.log('   ║ Policy definition: true                                      ║')
  console.log('   ╚═══════════════════════════════════════════════════════════════╝\n')
  
  console.log('   ╔═══════════════════════════════════════════════════════════════╗')
  console.log('   ║ POLÍTICA 2: Allow public reads                               ║')
  console.log('   ╠═══════════════════════════════════════════════════════════════╣')
  console.log('   ║ Policy name: Public can view                                 ║')
  console.log('   ║ Allowed operation: SELECT                                    ║')
  console.log('   ║ Target roles: public                                         ║')
  console.log('   ║ Policy definition: true                                      ║')
  console.log('   ╚═══════════════════════════════════════════════════════════════╝\n')
  
  console.log('   ╔═══════════════════════════════════════════════════════════════╗')
  console.log('   ║ POLÍTICA 3: Allow users to update their files                ║')
  console.log('   ╠═══════════════════════════════════════════════════════════════╣')
  console.log('   ║ Policy name: Users can update own files                      ║')
  console.log('   ║ Allowed operation: UPDATE                                    ║')
  console.log('   ║ Target roles: authenticated                                  ║')
  console.log('   ║ Policy definition:                                           ║')
  console.log('   ║   (storage.foldername(name))[1] = auth.uid()::text          ║')
  console.log('   ╚═══════════════════════════════════════════════════════════════╝\n')
  
  console.log('   ╔═══════════════════════════════════════════════════════════════╗')
  console.log('   ║ POLÍTICA 4: Allow users to delete their files                ║')
  console.log('   ╠═══════════════════════════════════════════════════════════════╣')
  console.log('   ║ Policy name: Users can delete own files                      ║')
  console.log('   ║ Allowed operation: DELETE                                    ║')
  console.log('   ║ Target roles: authenticated                                  ║')
  console.log('   ║ Policy definition:                                           ║')
  console.log('   ║   (storage.foldername(name))[1] = auth.uid()::text          ║')
  console.log('   ╚═══════════════════════════════════════════════════════════════╝\n')
  
  console.log('💡 ALTERNATIVA RÁPIDA (MODO DESARROLLO):')
  console.log('   Si quieres permitir TODO temporalmente:')
  console.log('   - Crear UNA política con operation: ALL')
  console.log('   - Target roles: public')
  console.log('   - Policy definition: true')
  console.log('   - ⚠️  ADVERTENCIA: Esto permite que cualquiera suba/elimine archivos\n')
  
  console.log('📄 También puedes ejecutar el SQL en:')
  console.log('   supabase/storage-policies.sql')
  console.log('   desde SQL Editor en Supabase Dashboard\n')
}

configurarPoliticas().catch(console.error)
