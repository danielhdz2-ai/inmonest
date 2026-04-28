#!/usr/bin/env node
/**
 * github-ai-generator.mts
 * 
 * Script para GitHub Actions que genera descripciones AI v2.0
 * Usa OpenRouter con modelo sin rate limits (llama-3.3-70b)
 * 
 * Comandos:
 *   npx tsx scripts/github-ai-generator.mts --batch=15
 *   npx tsx scripts/github-ai-generator.mts --stats
 */

import { createClient } from '@supabase/supabase-js'

// ══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ══════════════════════════════════════════════════════════════════

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

// Modelo sin rate limits (Llama 3.3 70B - excelente calidad)
const MODEL = 'meta-llama/llama-3.3-70b-instruct'

// Delay entre requests (ms) - conservador para evitar problemas
const DELAY_MS = 2000

// ══════════════════════════════════════════════════════════════════
// UTILIDADES INLINE (evitar imports complejos)
// ══════════════════════════════════════════════════════════════════

const CITY_PRICE_REFERENCE = [
  { city: 'Madrid', avgPricePerM2Sale: 4500, avgPricePerM2Rent: 17 },
  { city: 'Barcelona', avgPricePerM2Sale: 5200, avgPricePerM2Rent: 19 },
  { city: 'Valencia', avgPricePerM2Sale: 2800, avgPricePerM2Rent: 12 },
  { city: 'Sevilla', avgPricePerM2Sale: 2500, avgPricePerM2Rent: 10 },
  { city: 'Málaga', avgPricePerM2Sale: 3200, avgPricePerM2Rent: 12 },
  { city: 'Zaragoza', avgPricePerM2Sale: 1800, avgPricePerM2Rent: 9 },
  { city: 'Bilbao', avgPricePerM2Sale: 3800, avgPricePerM2Rent: 14 },
  { city: 'Alicante', avgPricePerM2Sale: 2200, avgPricePerM2Rent: 10 },
  { city: 'Granada', avgPricePerM2Sale: 1600, avgPricePerM2Rent: 8 },
  { city: 'Murcia', avgPricePerM2Sale: 1500, avgPricePerM2Rent: 7 },
]

function calculatePriceDeviation(
  price: number,
  area: number,
  city: string,
  operation: 'sale' | 'rent'
) {
  const ref = CITY_PRICE_REFERENCE.find(c => c.city === city)
  if (!ref) return { deviation: null, isOpportunity: false, isPremium: false, cityAvgPerM2: null }
  
  const pricePerM2 = price / area
  const cityAvg = operation === 'sale' ? ref.avgPricePerM2Sale : ref.avgPricePerM2Rent
  const deviation = Math.round(((pricePerM2 - cityAvg) / cityAvg) * 100)
  
  return {
    deviation,
    isOpportunity: deviation <= -15,
    isPremium: deviation >= 20,
    cityAvgPerM2: cityAvg,
  }
}

function calculateMonthlyExpenses(input: { rent: number; area_m2: number; bedrooms: number }) {
  let utilities = 80
  if (input.area_m2 >= 50 && input.area_m2 < 80) utilities = 120
  else if (input.area_m2 >= 80 && input.area_m2 < 120) utilities = 160
  else if (input.area_m2 >= 120) utilities = 200
  
  if (input.bedrooms >= 3) utilities += 30
  
  const internet = 35
  const total = input.rent + utilities + internet
  
  return { total, utilities, internet }
}

// ══════════════════════════════════════════════════════════════════
// PROMPT BUILDER (v2.0)
// ══════════════════════════════════════════════════════════════════

interface ListingInput {
  id: string
  title: string
  description: string | null
  operation: string
  city: string | null
  district: string | null
  province: string | null
  price_eur: number | null
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  is_particular?: boolean | null
}

function buildPrompt(l: ListingInput): string {
  const op = l.operation === 'rent' ? 'alquiler' : 'venta'
  const hab =
    l.bedrooms === 0 ? 'estudio' :
    l.bedrooms === 1 ? '1 habitación' :
    `${l.bedrooms} habitaciones`
  
  const ubicacion = [l.district, l.city, l.province]
    .filter(Boolean)
    .join(', ')
  
  const precio = l.price_eur
    ? l.operation === 'rent'
      ? `${l.price_eur}€/mes`
      : `${l.price_eur.toLocaleString('es-ES')}€`
    : null

  // ANÁLISIS DE PRECIOS
  let priceAnalysis = ''
  if (l.price_eur && l.area_m2 && l.city) {
    const analysis = calculatePriceDeviation(
      l.price_eur,
      l.area_m2,
      l.city,
      l.operation as 'sale' | 'rent'
    )
    
    if (analysis.deviation !== null) {
      if (analysis.isOpportunity) {
        priceAnalysis = `\n- ANÁLISIS DE PRECIO: Este inmueble está un ${Math.abs(analysis.deviation)}% por DEBAJO de la media de ${l.city} (${analysis.cityAvgPerM2}€/m²). ¡OPORTUNIDAD ÚNICA! Menciona esto como ventaja competitiva.`
      } else if (analysis.isPremium) {
        priceAnalysis = `\n- ANÁLISIS DE PRECIO: Este inmueble está un ${analysis.deviation}% por ENCIMA de la media de ${l.city} (${analysis.cityAvgPerM2}€/m²). Es una propiedad PREMIUM/EXCLUSIVA. Justifica el precio con calidades superiores, ubicación privilegiada o características únicas.`
      } else {
        priceAnalysis = `\n- ANÁLISIS DE PRECIO: Precio competitivo, ${Math.abs(analysis.deviation)}% ${analysis.deviation < 0 ? 'por debajo' : 'por encima'} de la media de ${l.city} (${analysis.cityAvgPerM2}€/m²).`
      }
    }
  }

  // CONTEXTO DEL BARRIO
  let neighborhoodContext = ''
  if (l.district || l.city) {
    neighborhoodContext = `\n- CONTEXTO DEL BARRIO: Menciona brevemente 2-3 ventajas de vivir en ${l.district || l.city}: transporte (metro/bus/cercanías), servicios cercanos (supermercados, colegios, hospitales), o ambiente del barrio (tranquilo, familiar, comercial, etc.). Usa información general conocida, NO inventes datos específicos.`
  }

  // GASTOS MENSUALES (SOLO ALQUILER)
  let expensesInfo = ''
  if (l.operation === 'rent' && l.price_eur && l.area_m2 && l.bedrooms !== null) {
    const expenses = calculateMonthlyExpenses({
      rent: l.price_eur,
      area_m2: l.area_m2,
      bedrooms: l.bedrooms,
    })
    expensesInfo = `\n- GASTOS ESTIMADOS: Coste mensual total estimado de ${expenses.total}€ (incluyendo alquiler ${l.price_eur}€ + suministros ~${expenses.utilities}€ + internet ~${expenses.internet}€). Menciona esto para dar transparencia.`
  }

  const isParticular = l.is_particular === true

  if (isParticular) {
    return `Eres un propietario particular que ${op === 'alquiler' ? 'alquila' : 'vende'} su piso directamente.
Escribe una descripción COMPLETA Y OPTIMIZADA de 350-400 palabras para TU piso:

Datos del piso:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Tipo: ${hab}
${l.bathrooms ? `- Baños: ${l.bathrooms}` : ''}
${l.area_m2 ? `- Superficie: ${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}${priceAnalysis}${neighborhoodContext}${expensesInfo}

Instrucciones CRÍTICAS:
- Usa PRIMERA PERSONA: "${op === 'alquiler' ? 'Alquilo' : 'Vendo'} mi piso", "Tengo un piso", "Ofrezco"
- ESTRUCTURA EN 3 BLOQUES:
  
  BLOQUE 1 (100-120 palabras): Descripción del piso
  - Presenta el piso de forma atractiva y personal
  - Menciona características principales (luminosidad, reforma, distribución)
  - Destaca elementos únicos o especiales
  
  BLOQUE 2 (150-180 palabras): Análisis de precio + Contexto del barrio
  - Integra el ANÁLISIS DE PRECIO de arriba (si aplica)
  - Añade el CONTEXTO DEL BARRIO de arriba
  - Menciona los GASTOS ESTIMADOS (si es alquiler)
  
  BLOQUE 3 (80-100 palabras): Call-to-action personal
  - Invita a contactar directamente (sin intermediarios)
  - Menciona "Sin comisiones de agencia" como ventaja
  - Cierra con tono cálido y accesible

- TONO: Cercano, honesto, directo (como hablaría un propietario real)
- NO uses lenguaje de marketing agresivo
- NO inventes datos técnicos específicos
- SÍ menciona que es "Alquiler/Venta de particular a particular. Sin comisiones."

Genera SOLO el texto de la descripción (sin títulos de secciones ni bullets). Longitud: 350-400 palabras.`
  } else {
    // AGENCIA
    return `Eres una agencia inmobiliaria profesional presentando una propiedad.
Escribe una descripción COMPLETA Y OPTIMIZADA de 350-400 palabras:

Datos del inmueble:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Tipo: ${hab}
${l.bathrooms ? `- Baños: ${l.bathrooms}` : ''}
${l.area_m2 ? `- Superficie: ${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}${priceAnalysis}${neighborhoodContext}${expensesInfo}

Instrucciones CRÍTICAS:
- Usa TERCERA PERSONA profesional: "Este inmueble", "La propiedad ofrece"
- ESTRUCTURA EN 3 BLOQUES:
  
  BLOQUE 1 (100-120 palabras): Presentación profesional
  - Descripción atractiva del inmueble
  - Características principales (distribución, estado, luminosidad)
  - Elementos diferenciadores
  
  BLOQUE 2 (150-180 palabras): Valor añadido + Ubicación
  - Integra el ANÁLISIS DE PRECIO de arriba (como valor añadido)
  - Desarrolla el CONTEXTO DEL BARRIO de arriba
  - Menciona los GASTOS ESTIMADOS si es alquiler
  - Conecta características con beneficios
  
  BLOQUE 3 (80-100 palabras): Llamada a la acción profesional
  - Invita a visitar la propiedad
  - Menciona asesoramiento profesional
  - Cierra con tono confiable y experto

- TONO: Profesional, confiable, orientado a valor
- USA datos de ANÁLISIS DE PRECIO y CONTEXTO DEL BARRIO
- NO inventes características técnicas no mencionadas
- SÍ enfatiza servicios de asesoramiento y gestión profesional

Genera SOLO el texto de la descripción (sin títulos ni bullets). Longitud: 350-400 palabras.`
  }
}

// ══════════════════════════════════════════════════════════════════
// OPENROUTER API
// ══════════════════════════════════════════════════════════════════

async function generateWithRetry(
  listing: ListingInput,
  maxRetries = 3
): Promise<string | null> {
  const prompt = buildPrompt(listing)
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://inmonest.com',
          'X-Title': 'Inmonest AI Descriptions',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Error HTTP ${response.status} en intento ${attempt}/${maxRetries}:`, errorText)
        
        // Si es rate limit, esperar más tiempo
        if (response.status === 429) {
          await sleep(5000 * attempt) // Backoff exponencial
          continue
        }
        
        // Otros errores
        if (attempt === maxRetries) return null
        await sleep(DELAY_MS)
        continue
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content?.trim()

      if (!text || text.length < 300) {
        console.error(`❌ Respuesta demasiado corta en intento ${attempt}/${maxRetries}`)
        if (attempt === maxRetries) return null
        await sleep(DELAY_MS)
        continue
      }

      return text
    } catch (error) {
      console.error(`❌ Error en intento ${attempt}/${maxRetries}:`, error)
      if (attempt === maxRetries) return null
      await sleep(DELAY_MS)
    }
  }

  return null
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ══════════════════════════════════════════════════════════════════
// MAIN LOGIC
// ══════════════════════════════════════════════════════════════════

async function generateBatch(batchSize: number) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log(`🔍 Buscando hasta ${batchSize} listings sin AI description...`)

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
    .is('ai_description', null)
    .limit(batchSize)

  if (error) {
    console.error('❌ Error obteniendo listings:', error)
    process.exit(1)
  }

  if (!listings || listings.length === 0) {
    console.log('✅ ¡Todos los listings ya tienen AI description!')
    process.exit(0)
  }

  console.log(`📋 Encontrados ${listings.length} listings pendientes`)
  console.log(`🤖 Modelo: ${MODEL}`)
  console.log(`⏱️  Delay: ${DELAY_MS}ms entre requests\n`)

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i]
    const num = i + 1

    console.log(`\n[${num}/${listings.length}] Procesando: ${listing.title.substring(0, 50)}...`)

    const aiDescription = await generateWithRetry(listing)

    if (!aiDescription) {
      console.error(`❌ [${num}/${listings.length}] FALLO después de reintentos`)
      failCount++
      continue
    }

    // Guardar en DB
    const { error: updateError } = await supabase
      .from('listings')
      .update({ ai_description: aiDescription })
      .eq('id', listing.id)

    if (updateError) {
      console.error(`❌ [${num}/${listings.length}] Error guardando:`, updateError)
      failCount++
      continue
    }

    successCount++
    console.log(`✅ [${num}/${listings.length}] Guardado (${aiDescription.length} chars)`)

    // Delay entre requests
    if (i < listings.length - 1) {
      await sleep(DELAY_MS)
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📊 RESUMEN DEL BATCH`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Éxitos: ${successCount}`)
  console.log(`❌ Fallos: ${failCount}`)
  console.log(`📈 Tasa de éxito: ${Math.round((successCount / listings.length) * 100)}%`)
  
  if (failCount > 0) {
    console.log(`\n⚠️  Hubo ${failCount} fallos. Se reintentarán en la próxima ejecución.`)
  }
}

async function showStats() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  const { count: total } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })

  const { count: withAI } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .not('ai_description', 'is', null)

  const pending = (total || 0) - (withAI || 0)
  const percentage = total ? Math.round(((withAI || 0) / total) * 100) : 0

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📊 ESTADÍSTICAS GLOBALES`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📝 Total listings: ${total}`)
  console.log(`✅ Con AI v2.0: ${withAI} (${percentage}%)`)
  console.log(`⏳ Pendientes: ${pending}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

// ══════════════════════════════════════════════════════════════════
// CLI
// ══════════════════════════════════════════════════════════════════

const args = process.argv.slice(2)

if (args.includes('--stats')) {
  showStats()
} else {
  const batchArg = args.find(a => a.startsWith('--batch='))
  const batchSize = batchArg ? parseInt(batchArg.split('=')[1]) : 15
  
  generateBatch(batchSize)
}
