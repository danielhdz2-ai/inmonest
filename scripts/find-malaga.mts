#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function findMalaga() {
  console.log('🔍 Buscando todas las variaciones de ciudad...\n');
  
  // Traer TODAS las ciudades únicas
  const { data: cities } = await sb
    .from('listings')
    .select('city');
  
  if (!cities) {
    console.error('No hay datos');
    return;
  }
  
  const uniqueCities = [...new Set(cities.map(c => c.city))].sort();
  
  // Buscar variaciones de "malaga" (case insensitive)
  const malagaVariations = uniqueCities.filter(c => 
    c && c.toLowerCase().includes('malaga')
  );
  
  console.log(`📋 Total ciudades únicas: ${uniqueCities.length}\n`);
  
  if (malagaVariations.length > 0) {
    console.log('🏙️ Ciudades que contienen "malaga":');
    malagaVariations.forEach(city => {
      const count = cities.filter(c => c.city === city).length;
      console.log(`  - "${city}" → ${count} pisos`);
    });
  } else {
    console.log('⚠️ No se encontró ninguna ciudad con "malaga"\n');
    
    // Buscar las primeras 20 ciudades para debug
    console.log('📍 Primeras 20 ciudades en la BD:');
    uniqueCities.slice(0, 20).forEach(city => {
      console.log(`  - "${city}"`);
    });
  }
  
  // Buscar con eq exacto "Málaga"
  console.log('\n🔎 Buscando con eq exacto "Málaga":');
  const { data: exactMalaga, count } = await sb
    .from('listings')
    .select('id, title, city', { count: 'exact' })
    .eq('city', 'Málaga')
    .limit(5);
  
  console.log(`  Total: ${count}`);
  if (exactMalaga && exactMalaga.length > 0) {
    exactMalaga.forEach(p => {
      console.log(`  - [${p.city}] ${p.title.substring(0, 50)}`);
    });
  }
}

findMalaga();
