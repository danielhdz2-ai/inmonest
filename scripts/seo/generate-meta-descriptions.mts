/**
 * 📝 Generador de Meta Descriptions Magnéticas
 * 
 * Genera meta descriptions únicas para cada listing (155 caracteres max)
 * Incluye: ubicación, precio, características clave, call-to-action
 * 
 * Ejemplos:
 * - "Piso 3 hab en Eixample, Barcelona. 1.200€/mes. Alquiler directo sin comisión. 
 *    Calcula gastos totales con nuestra calculadora ✓"
 * 
 * Uso: npx tsx scripts/seo/generate-meta-descriptions.mts [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface Listing {
  id: string
  title: string
  price_eur: number | null
  operation: 'sale' | 'rent'
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  district: string | null
  city: string
  is_particular: boolean
  ai_description: string | null
}

function generateMetaDescription(listing: Listing): string {
  const parts: string[] = []
  
  // 1. Ubicación completa
  const ubicacion = listing.district 
    ? `${listing.district}, ${listing.city}`
    : listing.city
  parts.push(ubicacion)
  
  // 2. Características clave
  const caracteristicas: string[] = []
  if (listing.bedrooms) caracteristicas.push(`${listing.bedrooms} hab`)
  if (listing.bathrooms) caracteristicas.push(`${listing.bathrooms} baños`)
  if (listing.area_m2) caracteristicas.push(`${listing.area_m2}m²`)
  
  if (caracteristicas.length > 0) {
    parts.push(caracteristicas.join(', '))
  }
  
  // 3. Precio
  if (listing.price_eur) {
    const formatted = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(listing.price_eur)
    const precioTexto = listing.operation === 'rent' ? `${formatted}/mes` : formatted
    parts.push(precioTexto)
  }
  
  // 4. USP (Unique Selling Proposition)
  let usp = ''
  if (listing.is_particular) {
    usp = listing.operation === 'rent'
      ? 'Alquiler directo sin comisión'
      : 'Venta de particular sin comisión'
  } else {
    usp = 'Calcula gastos totales con nuestra calculadora'
  }
  parts.push(usp)
  
  // 5. Call to action
  const cta = listing.operation === 'rent' 
    ? 'Ver piso ✓'
    : 'Más info ✓'
  parts.push(cta)
  
  // Construir descripción
  let description = parts.join('. ')
  
  // Limitar a 155 caracteres (óptimo para Google)
  if (description.length > 155) {
    // Recortar sin CTA si es necesario
    const sinCta = parts.slice(0, -1).join('. ')
    description = sinCta.slice(0, 152) + '...'
  }
  
  return description
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  
  console.log('📝 Generador de Meta Descriptions Magnéticas')
  console.log('============================================')
  console.log(`Modo: ${dryRun ? '🔍 DRY RUN' : '💾 ACTUALIZACIÓN REAL'}\n`)
  
  // Obtener listings premium
  const { data: listings, error } = await supabase
    .from('listings')
    .select(`
      id, title, price_eur, operation, bedrooms, bathrooms, area_m2, 
      district, city, is_particular, ai_description
    `)
    .eq('status', 'published')
    .not('ai_description', 'is', null)
  
  if (error || !listings) {
    console.error('❌ Error:', error)
    return
  }
  
  console.log(`📊 Total: ${listings.length} listings\n`)
  
  let updated = 0
  
  for (const listing of listings) {
    const metaDescription = generateMetaDescription(listing)
    
    if (!dryRun) {
      const { error: updateError } = await supabase
        .from('listings')
        .update({ meta_description: metaDescription })
        .eq('id', listing.id)
      
      if (updateError) {
        console.error(`❌ Error ${listing.id}:`, updateError.message)
      } else {
        updated++
        console.log(`✅ ${listing.id}: ${metaDescription}`)
      }
      
      if (updated % 50 === 0) {
        await new Promise(r => setTimeout(r, 1000))
      }
    } else {
      console.log(`🔍 ${listing.id}`)
      console.log(`   ${metaDescription}\n`)
    }
  }
  
  console.log(`\n✅ ${dryRun ? 'Vista previa' : 'Completado'}: ${dryRun ? listings.length : updated} meta descriptions`)
}

main().catch(console.error)
