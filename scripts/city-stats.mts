#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getCityStats() {
  console.log('📊 Analizando distribución de pisos por ciudad...\n');
  
  // Obtener estadísticas por ciudad
  const { data, error } = await supabase
    .from('listings')
    .select('city, operation, status')
    .eq('status', 'published');
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  // Agrupar por ciudad y operación
  const cityStats: Record<string, { total: number, venta: number, alquiler: number }> = {};
  
  data.forEach(listing => {
    const city = (listing.city || 'Sin ciudad').toLowerCase();
    
    if (!cityStats[city]) {
      cityStats[city] = { total: 0, venta: 0, alquiler: 0 };
    }
    
    cityStats[city].total++;
    if (listing.operation === 'sale') cityStats[city].venta++;
    if (listing.operation === 'rent') cityStats[city].alquiler++;
  });
  
  // Ordenar por total descendente
  const sorted = Object.entries(cityStats)
    .sort(([, a], [, b]) => b.total - a.total);
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('Ciudad                      │ Total │ Venta │ Alquiler');
  console.log('═══════════════════════════════════════════════════════════════');
  
  sorted.forEach(([city, stats]) => {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const paddedCity = cityName.padEnd(27);
    const total = stats.total.toString().padStart(5);
    const venta = stats.venta.toString().padStart(5);
    const alquiler = stats.alquiler.toString().padStart(8);
    console.log(`${paddedCity} │ ${total} │ ${venta} │ ${alquiler}`);
  });
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\nTOTAL PISOS: ${data.length}`);
  
  // Buscar variaciones de Málaga
  console.log('\n🔍 Buscando variaciones de ciudad...\n');
  
  const uniqueCities = [...new Set(data.map(l => l.city))];
  const malagaVariations = uniqueCities.filter(c => 
    c && c.toLowerCase().includes('malaga')
  );
  
  if (malagaVariations.length > 0) {
    console.log('⚠️ Variaciones de Málaga encontradas:');
    malagaVariations.forEach(v => {
      const count = data.filter(l => l.city === v).length;
      console.log(`  - "${v}" → ${count} pisos`);
    });
  }
  
  // Top 10 ciudades
  console.log('\n🏆 TOP 10 CIUDADES:\n');
  sorted.slice(0, 10).forEach(([city, stats], i) => {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    console.log(`${i + 1}. ${cityName}: ${stats.total} pisos (${stats.venta} venta, ${stats.alquiler} alquiler)`);
  });
}

getCityStats();
