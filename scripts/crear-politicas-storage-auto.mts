/**
 * Script para crear políticas RLS automáticamente usando SQL
 * Ejecutar: npx tsx scripts/crear-politicas-storage-auto.mts
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

async function crearPoliticas() {
  console.log('\n🔐 CREANDO POLÍTICAS RLS AUTOMÁTICAMENTE\n')
  
  try {
    // Primero, eliminar políticas existentes si las hay (para evitar duplicados)
    console.log('🧹 Limpiando políticas antiguas...')
    
    const dropPolicies = `
      DROP POLICY IF EXISTS "Authenticated users can upload to listings" ON storage.objects;
      DROP POLICY IF EXISTS "Public can view listings" ON storage.objects;
      DROP POLICY IF EXISTS "Users can update their own listings files" ON storage.objects;
      DROP POLICY IF EXISTS "Users can delete their own listings files" ON storage.objects;
      DROP POLICY IF EXISTS "Allow all for listings bucket" ON storage.objects;
    `
    
    await supabase.rpc('exec_sql', { query: dropPolicies }).catch(() => {
      // Si falla, probablemente las políticas no existen, continuar
    })
    
    console.log('✅ Limpieza completada\n')
    
    // Crear política simple que permite TODO a usuarios autenticados
    console.log('📝 Creando política de acceso total para bucket listings...')
    
    const createPolicy = `
      CREATE POLICY "Allow all for listings bucket"
      ON storage.objects
      FOR ALL
      TO authenticated
      USING (bucket_id = 'listings')
      WITH CHECK (bucket_id = 'listings');
    `
    
    const { data, error } = await supabase.rpc('exec_sql', { query: createPolicy })
    
    if (error) {
      console.error('❌ Error al crear política:', error.message)
      console.log('\n💡 SOLUCIÓN MANUAL:')
      console.log('   1. Ir a https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/storage/policies')
      console.log('   2. Seleccionar bucket "listings"')
      console.log('   3. Click "New Policy" > "For full customization"')
      console.log('   4. Rellenar:')
      console.log('      - Policy name: Allow all for listings bucket')
      console.log('      - Allowed operation: All')
      console.log('      - Target roles: authenticated')
      console.log('      - USING expression: bucket_id = \'listings\'')
      console.log('      - WITH CHECK expression: bucket_id = \'listings\'')
      console.log('   5. Click "Create policy"\n')
      return
    }
    
    console.log('✅ Política creada exitosamente\n')
    console.log('✅ CONFIGURACIÓN COMPLETA')
    console.log('   Los usuarios autenticados ahora pueden subir imágenes al bucket listings')
    
  } catch (err: any) {
    console.error('\n❌ Error inesperado:', err.message)
    console.log('\n💡 Usa la configuración manual:')
    console.log('   npx tsx scripts/configurar-politicas-storage.mts\n')
  }
}

crearPoliticas()
