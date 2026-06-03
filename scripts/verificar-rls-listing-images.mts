/**
 * Verificar políticas RLS de la tabla listing_images
 * Ejecutar: npx tsx scripts/verificar-rls-listing-images.mts
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const supabaseAnon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function verificarRLS() {
  console.log('\n🔍 VERIFICANDO RLS DE TABLA listing_images\n')
  
  // 1. Verificar si RLS está habilitado
  console.log('📋 Consultando configuración RLS...\n')
  
  const { data: tables, error: tablesErr } = await supabaseAdmin
    .from('pg_tables')
    .select('schemaname, tablename, rowsecurity')
    .eq('tablename', 'listing_images')
  
  if (tablesErr) {
    console.log('⚠️  No se pudo verificar RLS:', tablesErr.message)
  } else {
    console.log('Tabla listing_images:')
    console.log('  - RLS habilitado:', tables?.[0]?.rowsecurity ? 'SÍ' : 'NO')
    console.log('')
  }
  
  // 2. Ver políticas actuales
  const { data: policies, error: policiesErr } = await supabaseAdmin.rpc('exec_sql', {
    query: `
      SELECT policyname, cmd, roles, qual, with_check
      FROM pg_policies 
      WHERE tablename = 'listing_images';
    `
  })
  
  if (policiesErr) {
    console.log('⚠️  No se pudo leer políticas:', policiesErr.message, '\n')
  } else if (policies && policies.length > 0) {
    console.log('✅ Políticas encontradas:', policies.length, '\n')
    policies.forEach((p: any) => {
      console.log(`   📋 ${p.policyname}`)
      console.log(`      Operación: ${p.cmd}`)
      console.log(`      Roles: ${p.roles?.join(', ')}`)
      console.log('')
    })
  } else {
    console.log('❌ NO HAY POLÍTICAS EN listing_images\n')
    console.log('   Este es el problema: RLS activado sin políticas bloquea todo.')
    console.log('')
  }
  
  // 3. Probar INSERT como usuario anónimo (simula frontend)
  console.log('🧪 PROBANDO INSERT COMO USUARIO ANÓNIMO...\n')
  
  const testImage = {
    listing_id: '00000000-0000-0000-0000-000000000000',
    storage_path: 'test/test.jpg',
    external_url: 'https://example.com/test.jpg',
    position: 0
  }
  
  const { error: insertErr } = await supabaseAnon
    .from('listing_images')
    .insert(testImage)
  
  if (insertErr) {
    console.error('❌ INSERT FALLÓ:', insertErr.message)
    
    if (insertErr.message.includes('row-level security')) {
      console.log('\n💡 PROBLEMA CONFIRMADO: RLS bloqueando inserts')
      console.log('   Necesitas crear políticas RLS para listing_images\n')
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ SOLUCIÓN: Ejecutar este SQL en Supabase SQL Editor')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
      
      console.log(`-- Permitir INSERT a usuarios autenticados
CREATE POLICY "Authenticated users can insert images"
ON listing_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir lectura pública
CREATE POLICY "Public can view images"
ON listing_images
FOR SELECT
TO public
USING (true);

-- Permitir UPDATE a dueños
CREATE POLICY "Users can update own listing images"
ON listing_images
FOR UPDATE
TO authenticated
USING (
  listing_id IN (
    SELECT id FROM listings WHERE user_id = auth.uid()
  )
);

-- Permitir DELETE a dueños
CREATE POLICY "Users can delete own listing images"
ON listing_images
FOR DELETE
TO authenticated
USING (
  listing_id IN (
    SELECT id FROM listings WHERE user_id = auth.uid()
  )
);
`)
      
      console.log('\n🔗 URL SQL Editor:')
      console.log('   https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/sql/new\n')
    } else {
      console.log('   Otro error:', insertErr.message, '\n')
    }
  } else {
    console.log('✅ INSERT EXITOSO\n')
    console.log('   Las políticas RLS están configuradas correctamente.')
    
    // Limpiar
    await supabaseAdmin
      .from('listing_images')
      .delete()
      .eq('listing_id', testImage.listing_id)
  }
}

verificarRLS().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
