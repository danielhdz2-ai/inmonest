import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBacklog() {
  // Count total listings without AI description
  const { count: totalWithout, error: errorWithout } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .is('ai_description', null);

  if (errorWithout) {
    console.error('Error counting listings without description:', errorWithout);
    return;
  }

  // Count total active listings
  const { count: totalActive, error: errorActive } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true });

  if (errorActive) {
    console.error('Error counting active listings:', errorActive);
    return;
  }

  // Count with description
  const withDescription = (totalActive || 0) - (totalWithout || 0);

  console.log('\n📊 ESTADO DE DESCRIPCIONES IA:\n');
  console.log(`Total listings activos: ${totalActive}`);
  console.log(`Con descripción IA: ${withDescription} (${Math.round((withDescription / (totalActive || 1)) * 100)}%)`);
  console.log(`Sin descripción IA: ${totalWithout} (${Math.round(((totalWithout || 0) / (totalActive || 1)) * 100)}%)`);
  
  // Get breakdown by source
  console.log('\n📍 Por fuente:');
  const { data: sources } = await supabase
    .from('listings')
    .select('source_portal')
    .is('ai_description', null);

  if (sources) {
    const sourceCount: Record<string, number> = {};
    sources.forEach((s) => {
      const source = s.source_portal || 'sin fuente';
      sourceCount[source] = (sourceCount[source] || 0) + 1;
    });
    
    Object.entries(sourceCount)
      .sort(([, a], [, b]) => b - a)
      .forEach(([source, count]) => {
        console.log(`  ${source}: ${count}`);
      });
  }

  // Get breakdown by city
  console.log('\n🏙️ Por ciudad:');
  const { data: cities } = await supabase
    .from('listings')
    .select('city')
    .is('ai_description', null);

  if (cities) {
    const cityCount: Record<string, number> = {};
    cities.forEach((c) => {
      const city = c.city || 'sin ciudad';
      cityCount[city] = (cityCount[city] || 0) + 1;
    });
    
    Object.entries(cityCount)
      .sort(([, a], [, b]) => b - a)
      .forEach(([city, count]) => {
        console.log(`  ${city}: ${count}`);
      });
  }

  // Check recent listings (last 24h)
  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 24);
  
  const { count: recentTotal } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', yesterday.toISOString());

  const { count: recentWithout } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .is('ai_description', null)
    .gte('created_at', yesterday.toISOString());

  console.log('\n⏰ Últimas 24 horas:');
  console.log(`Total nuevos: ${recentTotal}`);
  console.log(`Sin descripción: ${recentWithout}`);
  console.log(`Con descripción: ${(recentTotal || 0) - (recentWithout || 0)}`);

  // Estimate time to complete at current rate
  if (totalWithout && totalWithout > 0) {
    const hoursNeeded = Math.ceil(totalWithout / 20); // 20 per hour
    const daysNeeded = Math.ceil(hoursNeeded / 24);
    console.log(`\n⏱️ Tiempo estimado para completar (20/hora): ${hoursNeeded} horas (${daysNeeded} días)`);
  }
}

checkBacklog();
