/**
 * Script para generar descripciones manuales para pisos de Hipoges (fondo bancario)
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing Supabase credentials')
}

async function generateManualDescription(listing: any): Promise<string> {
  const { title, price_eur, area_m2, bedrooms, bathrooms, city, province, source_portal } = listing
  
  // Plantilla para fondos bancarios (Hipoges, Solvia, etc)
  const isBankFund = ['hipoges', 'solvia'].includes(source_portal)
  
  let description = ''
  
  if (isBankFund) {
    description = `🏦 **Oportunidad Bancaria** - ${title}\n\n`
    description += `Vivienda procedente de fondo bancario, excelente oportunidad de inversión. `
  } else {
    description += `${title}\n\n`
  }
  
  // Descripción de características
  const features = []
  if (area_m2) features.push(`${area_m2}m²`)
  if (bedrooms) features.push(`${bedrooms} habitación${bedrooms > 1 ? 'es' : ''}`)
  if (bathrooms) features.push(`${bathrooms} baño${bathrooms > 1 ? 's' : ''}`)
  
  if (features.length > 0) {
    description += `Esta propiedad cuenta con ${features.join(', ')}. `
  }
  
  // Ubicación
  if (city) {
    description += `Ubicada en ${city}`
    if (province && province !== city) {
      description += `, ${province}`
    }
    description += `. `
  }
  
  // Precio
  if (price_eur) {
    const priceFormatted = new Intl.NumberFormat('es-ES').format(price_eur)
    description += `\n\n💰 **Precio**: ${priceFormatted}€`
    
    if (area_m2) {
      const pricePerM2 = Math.round(price_eur / area_m2)
      description += ` (${new Intl.NumberFormat('es-ES').format(pricePerM2)}€/m²)`
    }
  }
  
  if (isBankFund) {
    description += `\n\n✅ **Ventajas de comprar a entidades bancarias:**
- Proceso de compra más rápido
- Documentación en regla
- Posibilidad de financiación preferente
- Visitas organizadas

📞 Contacta para más información sobre esta oportunidad.`
  } else {
    description += `\n\n📞 Contacta para más información y visitas.`
  }
  
  return description
}

async function main() {
  console.log('\n📝 Generando descripciones manuales para Hipoges...\n')
  
  // Buscar pisos de Hipoges sin descripción
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/listings?source_portal=eq.hipoges&ai_description=is.null&select=id,title,price_eur,area_m2,bedrooms,bathrooms,city,province,source_portal,source_url`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY!}`,
      },
    }
  )
  
  const listings = await res.json()
  
  if (!Array.isArray(listings) || listings.length === 0) {
    console.log('✅ No hay pisos de Hipoges sin descripción')
    return
  }
  
  console.log(`📋 Encontrados ${listings.length} pisos sin descripción:\n`)
  
  for (const listing of listings) {
    console.log(`\n━━━ ${listing.title} ━━━`)
    console.log(`ID: ${listing.id}`)
    console.log(`URL: ${listing.source_url}`)
    
    const description = await generateManualDescription(listing)
    
    console.log(`\nDescripción generada:`)
    console.log(description)
    console.log('')
    
    // Actualizar en BD
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${listing.id}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY!}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        ai_description: description,
        advertiser_name: 'Hipoges - Fondo Bancario',
      }),
    })
    
    if (updateRes.ok) {
      console.log('✅ Descripción guardada')
    } else {
      console.error('❌ Error al guardar:', await updateRes.text())
    }
  }
  
  console.log(`\n✨ Proceso completado: ${listings.length} descripciones generadas\n`)
}

main().catch(console.error)
