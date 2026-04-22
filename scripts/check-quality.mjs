import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const KEY = process.env.SUPABASE_SERVICE_KEY
if (!KEY) { console.error('Falta SUPABASE_SERVICE_KEY en .env.local'); process.exit(1) }
const BASE = 'https://ktsdxpmaljiyuwimcugx.supabase.co';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

const listings = await fetch(
  BASE + '/rest/v1/listings?select=id,title,bedrooms,bathrooms,area_m2,description&source_portal=eq.pisos.com&order=created_at.desc&limit=3',
  { headers: H }
).then(r => r.json());

for (const l of listings) {
  console.log('\nTITLE:', l.title);
  console.log('ROOMS:', l.bedrooms, '| BATHS:', l.bathrooms, '| AREA:', l.area_m2);
  console.log('DESC len:', l.description ? l.description.length : 0, '|', (l.description || '–').slice(0, 150));
  const imgs = await fetch(
    BASE + '/rest/v1/listing_images?listing_id=eq.' + l.id + '&select=external_url',
    { headers: H }
  ).then(r => r.json());
  console.log('IMAGES:', imgs.length);
  imgs.slice(0, 3).forEach(img => console.log('  ', img.external_url.slice(0, 90)));
}
