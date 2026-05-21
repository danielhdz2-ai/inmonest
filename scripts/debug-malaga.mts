#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function debugMalaga() {
  console.log('🔍 Verificando pisos de Málaga con filtro "malaga" + "sale"...\n');
  
  // Simular búsqueda exacta como en el código
  const { data, error, count } = await sb
    .from('listings')
    .select('id, title, city, operation, price_eur, has_images', { count: 'exact' })
    .eq('status', 'published')
    .eq('has_images', true)
    .eq('operation', 'sale')
    .ilike('city', '%malaga%')
    .limit(10);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  console.log(`Total encontrados: ${count}`);
  console.log(`Primeros 10:\n`);
  
  data?.forEach((p, i) => {
    console.log(`${i+1}. [${p.city}] ${p.title} - ${p.price_eur}€ (has_images: ${p.has_images})`);
  });
  
  // Buscar TODAS las ciudades que incluyen "malaga"
  const { data: allCities } = await sb
    .from('listings')
    .select('city')
    .eq('status', 'published')
    .ilike('city', '%malaga%');
  
  const unique = [...new Set(allCities?.map(c => c.city))];
  console.log(`\n🏙️ Variaciones de ciudad con "malaga": ${unique.join(', ')}`);
  
  // Ver cuántos tienen/no tienen imágenes
  const { count: withImages } = await sb
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('has_images', true)
    .ilike('city', '%malaga%');
  
  const { count: withoutImages } = await sb
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('has_images', false)
    .ilike('city', '%malaga%');
  
  console.log(`\n📊 Málaga - Imágenes:`);
  console.log(`  ✅ Con imágenes: ${withImages}`);
  console.log(`  ❌ Sin imágenes: ${withoutImages}`);
}

debugMalaga();
