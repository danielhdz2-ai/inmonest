/**
 * test-seo-features.mts
 * 
 * Script para probar las nuevas funciones de SEO:
 * - Análisis de precios competitivo
 * - Información del barrio con IA
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const openrouterKey = process.env.OPENROUTER_API_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testPriceAnalysis() {
  console.log('\n📊 === TEST: ANÁLISIS DE PRECIOS ===\n')

  // Buscar un listing de Barcelona con precio y área
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, district, operation, price_eur, area_m2, bedrooms')
    .eq('city', 'Barcelona')
    .eq('operation', 'rent')
    .not('price_eur', 'is', null)
    .not('area_m2', 'is', null)
    .gt('price_eur', 0)
    .gt('area_m2', 0)
    .limit(1)

  if (error || !listings || listings.length === 0) {
    console.error('❌ No se encontró listing de prueba:', error)
    return
  }

  const listing = listings[0]
  console.log(`✅ Listing de prueba: ${listing.id}`)
  console.log(`   Título: ${listing.title}`)
  console.log(`   Ciudad: ${listing.city}, Barrio: ${listing.district}`)
  console.log(`   Precio: ${listing.price_eur}€, Área: ${listing.area_m2}m²`)
  console.log(`   Habitaciones: ${listing.bedrooms}`)

  const pricePerM2 = Math.round(listing.price_eur / listing.area_m2)

  // Calcular media en la ciudad
  const { data: cityData } = await supabase
    .from('listings')
    .select('price_eur, area_m2')
    .eq('city', listing.city)
    .eq('operation', listing.operation)
    .not('price_eur', 'is', null)
    .not('area_m2', 'is', null)
    .gt('price_eur', 0)
    .gt('area_m2', 0)
    .neq('id', listing.id)

  if (cityData && cityData.length > 0) {
    const avgCity = Math.round(cityData.reduce((sum, l) => sum + l.price_eur!, 0) / cityData.length)
    const avgM2City = Math.round(cityData.reduce((sum, l) => sum + (l.price_eur! / l.area_m2!), 0) / cityData.length)
    const percentageDiff = Math.round(((listing.price_eur - avgCity) / avgCity) * 100)

    console.log(`\n📈 Análisis de Ciudad (${listing.city}):`)
    console.log(`   Media ciudad: ${avgCity}€/mes`)
    console.log(`   Media €/m²: ${avgM2City}€/m²`)
    console.log(`   Este listing: ${pricePerM2}€/m²`)
    console.log(`   Diferencia: ${percentageDiff > 0 ? '+' : ''}${percentageDiff}%`)
    
    if (percentageDiff < -10) {
      console.log(`   🎯 Tendencia: OPORTUNIDAD (${percentageDiff}% más barato)`)
    } else if (percentageDiff > 10) {
      console.log(`   ⭐ Tendencia: PREMIUM (${percentageDiff}% más caro)`)
    } else {
      console.log(`   📈 Tendencia: PRECIO DE MERCADO`)
    }
  }

  // Calcular media en el barrio si existe
  if (listing.district) {
    const { data: districtData } = await supabase
      .from('listings')
      .select('price_eur, area_m2')
      .eq('city', listing.city)
      .eq('district', listing.district)
      .eq('operation', listing.operation)
      .not('price_eur', 'is', null)
      .not('area_m2', 'is', null)
      .gt('price_eur', 0)
      .gt('area_m2', 0)
      .neq('id', listing.id)

    if (districtData && districtData.length >= 3) {
      const avgDistrict = Math.round(districtData.reduce((sum, l) => sum + l.price_eur!, 0) / districtData.length)
      const avgM2District = Math.round(districtData.reduce((sum, l) => sum + (l.price_eur! / l.area_m2!), 0) / districtData.length)
      const percentageDiffDistrict = Math.round(((listing.price_eur - avgDistrict) / avgDistrict) * 100)

      console.log(`\n📍 Análisis de Barrio (${listing.district}):`)
      console.log(`   Media barrio: ${avgDistrict}€/mes`)
      console.log(`   Media €/m²: ${avgM2District}€/m²`)
      console.log(`   Diferencia: ${percentageDiffDistrict > 0 ? '+' : ''}${percentageDiffDistrict}%`)
      console.log(`   Total listings en barrio: ${districtData.length}`)
    }
  }

  // Contar pisos similares
  if (listing.bedrooms != null) {
    const { count } = await supabase
      .from('listings')
      .select('id', { count: 'exact', head: true })
      .eq('city', listing.city)
      .eq('operation', listing.operation)
      .gte('bedrooms', Math.max(0, listing.bedrooms - 1))
      .lte('bedrooms', listing.bedrooms + 1)
      .neq('id', listing.id)

    console.log(`\n🏠 Pisos similares:`)
    console.log(`   ${count ?? 0} listings con ${listing.bedrooms === 0 ? 'estudio' : `${listing.bedrooms} hab.`} en ${listing.city}`)
  }

  console.log('\n✅ TEST COMPLETADO: Análisis de precios\n')
}

async function testNeighborhoodInfo() {
  console.log('\n🏘️ === TEST: INFORMACIÓN DEL BARRIO ===\n')

  if (!openrouterKey) {
    console.warn('⚠️ No hay OPENROUTER_API_KEY, se saltará la generación con IA')
    return
  }

  const testLocation = {
    district: 'Eixample',
    city: 'Barcelona',
    province: 'Barcelona',
  }

  console.log(`📍 Generando info para: ${testLocation.district}, ${testLocation.city}`)

  const prompt = `Eres un experto en información inmobiliaria de España.

Escribe una descripción informativa y útil sobre el barrio/zona de "${testLocation.district}, ${testLocation.city}" para personas que buscan alquilar o comprar vivienda allí.

REQUISITOS:
- Entre 200-300 palabras
- Tono profesional pero cercano
- Información práctica y objetiva
- Enfocado en: transporte público, servicios cercanos, ambiente del barrio, comercios, zonas verdes
- NO menciones precios específicos de vivienda
- NO uses lenguaje promocional o exagerado
- NO inventes datos, usa información general y conocida
- Escribe en tercera persona

ESTRUCTURA:
1. Párrafo introductorio sobre la ubicación y características generales
2. Transporte y conexiones
3. Servicios y comercios
4. Ambiente y perfil del barrio

Responde SOLO con el texto de la descripción, sin título ni encabezados adicionales.`

  try {
    console.log('⏳ Llamando a OpenRouter API...')

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://inmonest.com',
        'X-Title': 'Inmonest',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-001',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      console.error(`❌ Error HTTP: ${response.status}`)
      return
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>
      usage?: { total_tokens?: number }
    }

    const content = data.choices?.[0]?.message?.content?.trim()
    
    if (!content) {
      console.error('❌ No se recibió contenido de la IA')
      return
    }

    console.log('\n✅ CONTENIDO GENERADO:\n')
    console.log('─'.repeat(80))
    console.log(content)
    console.log('─'.repeat(80))

    const wordCount = content.split(/\s+/).length
    console.log(`\n📝 Estadísticas:`)
    console.log(`   Palabras: ${wordCount}`)
    console.log(`   Caracteres: ${content.length}`)
    console.log(`   Tokens usados: ${data.usage?.total_tokens ?? 'N/A'}`)

    // Generar highlights
    const sentences = content.split(/[.!?]\s+/).filter(s => s.length > 20 && s.length < 120)
    const highlights = sentences.slice(0, 3).map(s => s + '.')

    console.log(`\n💡 Highlights generados:`)
    highlights.forEach((h, i) => {
      console.log(`   ${i + 1}. ${h}`)
    })

    console.log('\n✅ TEST COMPLETADO: Información del barrio\n')
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

async function main() {
  console.log('🚀 === PRUEBA DE CARACTERÍSTICAS SEO ===\n')

  await testPriceAnalysis()
  await testNeighborhoodInfo()

  console.log('🎉 === TODAS LAS PRUEBAS COMPLETADAS ===\n')
}

main()
