/**
 * 🎯 Generador de Títulos SEO Optimizados
 * 
 * Genera títulos magnéticos para los 206 listings premium
 * Formato: {Tipo} en {Barrio} — {Precio} | {Diferenciador}
 * 
 * Ejemplos:
 * - "Piso 3 hab en Eixample — 1.200€/mes | Sin comisión"
 * - "Ático 2 hab en Malasaña — 350.000€ | Calculadora gastos incluida"
 * - "Piso de particular en Gràcia — 950€/mes | Alquiler directo"
 * 
 * Uso: npx tsx scripts/seo/generate-optimized-titles.mts [--dry-run] [--batch=N]
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
  district: string | null
  city: string
  is_particular: boolean
}

function generateSeoTitle(listing: Listing): string {
  // 1. Tipo de propiedad (siempre "Piso" por defecto)
  const tipo = 'Piso'
  
  // 2. Habitaciones (si tiene)
  const habitaciones = listing.bedrooms ? ` ${listing.bedrooms} hab` : ''
  
  // 3. Ubicación (barrio o ciudad)
  const ubicacion = listing.district || listing.city
  
  // 4. Precio
  let precio = ''
  if (listing.price_eur) {
    const formatted = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(listing.price_eur)
    precio = listing.operation === 'rent' ? `${formatted}/mes` : formatted
  } else {
    precio = 'Precio a consultar'
  }
  
  // 5. Diferenciador (USP - Unique Selling Proposition)
  let diferenciador = ''
  if (listing.is_particular) {
    diferenciador = listing.operation === 'rent' 
      ? 'Sin comisión' 
      : 'Particular, sin comisión'
  } else {
    // Para agencias, destacar las calculadoras interactivas
    diferenciador = listing.operation === 'rent'
      ? 'Calculadora gastos total'
      : 'Calculadora gastos compra'
  }
  
  // Construir título final
  const titulo = `${tipo}${habitaciones} en ${ubicacion} — ${precio} | ${diferenciador}`
  
  // Limitar a 60 caracteres (óptimo para Google)
  if (titulo.length > 60) {
    // Versión corta sin diferenciador si es muy largo
    return `${tipo}${habitaciones} en ${ubicacion} — ${precio}`.slice(0, 60)
  }
  
  return titulo
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const batchArg = args.find(a => a.startsWith('--batch='))
  const batchSize = batchArg ? parseInt(batchArg.split('=')[1]) : 50
  
  console.log('🎯 Generador de Títulos SEO Optimizados')
  console.log('=====================================')
  console.log(`Modo: ${dryRun ? '🔍 DRY RUN (no actualiza DB)' : '💾 ACTUALIZACIÓN REAL'}`)
  console.log(`Batch size: ${batchSize}\n`)
  
  // Obtener listings premium (solo con AI description)
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, price_eur, operation, bedrooms, district, city, is_particular')
    .eq('status', 'published')
    .not('ai_description', 'is', null)
    .order('updated_at', { ascending: false })
  
  if (error || !listings) {
    console.error('❌ Error obteniendo listings:', error)
    return
  }
  
  console.log(`📊 Total listings premium: ${listings.length}\n`)
  
  let updated = 0
  let skipped = 0
  const updates: { id: string; old: string; new: string }[] = []
  
  for (const listing of listings) {
    const newTitle = generateSeoTitle(listing)
    
    // Si el título ya está optimizado, skip
    if (listing.title === newTitle) {
      skipped++
      continue
    }
    
    updates.push({
      id: listing.id,
      old: listing.title,
      new: newTitle,
    })
    
    if (!dryRun) {
      const { error: updateError } = await supabase
        .from('listings')
        .update({ title: newTitle })
        .eq('id', listing.id)
      
      if (updateError) {
        console.error(`❌ Error actualizando ${listing.id}:`, updateError.message)
      } else {
        updated++
        console.log(`✅ ${listing.id}`)
        console.log(`   OLD: ${listing.title}`)
        console.log(`   NEW: ${newTitle}\n`)
      }
      
      // Batch control para evitar rate limits
      if (updated % batchSize === 0) {
        console.log(`⏸️  Batch de ${batchSize} completado, esperando 2s...\n`)
        await new Promise(r => setTimeout(r, 2000))
      }
    } else {
      // Dry run: solo mostrar
      console.log(`🔍 ${listing.id}`)
      console.log(`   OLD: ${listing.title}`)
      console.log(`   NEW: ${newTitle}\n`)
    }
  }
  
  // Resumen
  console.log('\n📈 RESUMEN')
  console.log('===========')
  console.log(`Total procesados: ${listings.length}`)
  console.log(`Actualizados: ${dryRun ? updates.length : updated}`)
  console.log(`Sin cambios: ${skipped}`)
  
  if (dryRun) {
    console.log('\n💡 Ejecuta sin --dry-run para aplicar cambios')
  } else {
    console.log('\n✅ Actualización completada')
    console.log('🔄 Próximo paso: Enviar sitemap actualizado a Google Search Console')
  }
}

main().catch(console.error)
