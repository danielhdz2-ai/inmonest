#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function debugMalagaStatus() {
  console.log('🔍 Verificando STATUS de pisos en Málaga...\n');
  
  // Sin filtro de status
  const { data: allMalaga, error } = await sb
    .from('listings')
    .select('id, title, city, status, has_images, operation')
    .ilike('city', '%malaga%')
    .limit(10);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  console.log(`Total pisos con ciudad "málaga" (sin filtro status): ${allMalaga?.length}\n`);
  
  if (allMalaga && allMalaga.length > 0) {
    console.log('Primeros 10:');
    allMalaga.forEach((p, i) => {
      console.log(`${i+1}. [${p.city}] ${p.title.substring(0, 50)}...`);
      console.log(`   Status: ${p.status} | has_images: ${p.has_images} | operation: ${p.operation}\n`);
    });
  }
  
  // Agrupar por status
  const { data: byStatus } = await sb
    .from('listings')
    .select('status')
    .ilike('city', '%malaga%');
  
  const statusCounts: Record<string, number> = {};
  byStatus?.forEach(p => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });
  
  console.log('\n📊 Distribución por STATUS:');
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`  ${status}: ${count} pisos`);
  });
  
  // Verificar has_images
  const { data: byImages } = await sb
    .from('listings')
    .select('has_images')
    .ilike('city', '%malaga%');
  
  const withImages = byImages?.filter(p => p.has_images).length || 0;
  const withoutImages = byImages?.filter(p => !p.has_images).length || 0;
  
  console.log('\n📸 Distribución por IMÁGENES:');
  console.log(`  ✅ Con imágenes (has_images=true): ${withImages}`);
  console.log(`  ❌ Sin imágenes (has_images=false): ${withoutImages}`);
}

debugMalagaStatus();
