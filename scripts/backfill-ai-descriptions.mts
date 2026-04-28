/**
 * Script para generar descripciones IA de forma masiva
 * Procesa listings sin ai_description en lotes
 * VERSIÓN 2.0: Descripciones extensas con análisis de precio y barrio
 * 
 * Uso: npx tsx scripts/backfill-ai-descriptions.mts [--batch-size=100] [--limit=500]
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

// ── FUNCIONES INLINE (evitar problemas de imports) ──────────────────

interface CityRef {
  city: string
  avgSale: number
  avgRent: number
}

const CITY_REFS: CityRef[] = [
  { city: 'Madrid', avgSale: 4200, avgRent: 17 },
  { city: 'Barcelona', avgSale: 4800, avgRent: 19 },
  { city: 'Valencia', avgSale: 2100, avgRent: 11 },
  { city: 'Sevilla', avgSale: 2300, avgRent: 10 },
  { city: 'Zaragoza', avgSale: 1700, avgRent: 8 },
  { city: 'Málaga', avgSale: 2800, avgRent: 12 },
  { city: 'Palma', avgSale: 3500, avgRent: 14 },
  { city: 'Bilbao', avgSale: 3800, avgRent: 15 },
  { city: 'Alicante', avgSale: 1900, avgRent: 9 },
  { city: 'San Sebastián', avgSale: 5200, avgRent: 18 },
]

function calculatePriceDeviation(price: number, area: number, city: string | null, op: 'sale' | 'rent') {
  const pricePerM2 = Math.round(price / area)
  const ref = CITY_REFS.find(r => r.city.toLowerCase() === city?.toLowerCase())
  
  if (!ref) return { pricePerM2, cityAvgPerM2: null, deviation: null, isOpportunity: false, isPremium: false }
  
  const cityAvgPerM2 = op === 'rent' ? ref.avgRent : ref.avgSale
  const deviation = Math.round(((pricePerM2 - cityAvgPerM2) / cityAvgPerM2) * 100)
  const isOpportunity = deviation < -10
  const isPremium = deviation > 20
  
  return { pricePerM2, cityAvgPerM2, deviation, isOpportunity, isPremium }
}

function calculateMonthlyExpenses(rent: number, area: number, bedrooms: number) {
  let utilities = area < 50 ? 80 : area < 80 ? 120 : area < 120 ? 160 : 200
  if (bedrooms >= 3) utilities += 30
  const internet = 35
  return { rent, utilities, internet, total: rent + utilities + internet }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY!
const openrouterKey = process.env.OPENROUTER_API_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const OR_MODEL = 'google/gemini-2.0-flash-lite-001'

interface ListingForAI {
  id: string
  title: string
  description: string | null
  operation: 'sale' | 'rent'
  city: string | null
  district: string | null
  province: string | null
  price_eur: number | null
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  is_particular: boolean
}

function buildPrompt(l: ListingForAI): string {
  const op = l.operation === 'rent' ? 'alquiler' : 'venta'
  const hab =
    l.bedrooms === 0
      ? 'estudio'
      : l.bedrooms === 1
        ? '1 habitación'
        : `${l.bedrooms} habitaciones`
  const ubicacion = [l.district, l.city, l.province].filter(Boolean).join(', ')
  const precio = l.price_eur
    ? `${l.price_eur.toLocaleString('es-ES')} €${l.operation === 'rent' ? '/mes' : ''}`
    : null

  // ── ANÁLISIS DE PRECIOS COMPETITIVO ──────────────────────────────
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

  // ── CONTEXTO DEL BARRIO ──────────────────────────────────────────
  let neighborhoodContext = ''
  if (l.district || l.city) {
    neighborhoodContext = `\n- CONTEXTO DEL BARRIO: Menciona brevemente 2-3 ventajas de vivir en ${l.district || l.city}: transporte (metro/bus/cercanías), servicios cercanos (supermercados, colegios, hospitales), o ambiente del barrio (tranquilo, familiar, comercial, etc.). Usa información general conocida, NO inventes datos específicos.`
  }

  // ── GASTOS MENSUALES (SOLO ALQUILER) ────────────────────────────
  let expensesInfo = ''
  if (l.operation === 'rent' && l.price_eur && l.area_m2 && l.bedrooms !== null) {
    const expenses = calculateMonthlyExpenses(l.price_eur, l.area_m2, l.bedrooms)
    expensesInfo = `\n- GASTOS ESTIMADOS: Coste mensual total estimado de ${expenses.total}€ (incluyendo alquiler ${l.price_eur}€ + suministros ~${expenses.utilities}€ + internet ~${expenses.internet}€). Menciona esto para dar transparencia.`
  }

  const isParticular = l.is_particular === true

  // ── PROMPTS DIFERENCIADOS: PARTICULAR vs AGENCIA ─────────────────
  if (isParticular) {
    return `Eres un propietario particular que alquila/vende su piso directamente.
Escribe una descripción COMPLETA Y OPTIMIZADA de 350-400 palabras para TU piso:

Datos del piso:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Tipo: ${hab}
${l.bathrooms ? `- Baños: ${l.bathrooms}` : ''}
${l.area_m2 ? `- Superficie: ${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}${priceAnalysis}${neighborhoodContext}${expensesInfo}

Instrucciones CRÍTICAS:
- Usa PRIMERA PERSONA: "Alquilo mi piso", "Tengo un piso", "Ofrezco"
- ESTRUCTURA EN 3 BLOQUES:
  
  BLOQUE 1 (100-120 palabras): Descripción del piso
  - Presenta el piso de forma atractiva y personal
  - Menciona características principales (luminosidad, reforma, distribución)
  - Tono cercano y entusiasta
  
  BLOQUE 2 (120-150 palabras): Análisis de precio + Barrio
  ${priceAnalysis ? '- MENCIONA EXPLÍCITAMENTE el análisis de precio (oportunidad/premium según corresponda)' : ''}
  - Habla del barrio: transporte, servicios, ambiente
  ${expensesInfo ? '- Menciona el coste mensual total estimado' : ''}
  - Conecta el precio con el valor que ofrece
  
  BLOQUE 3 (80-100 palabras): Ventaja de particular + Llamada a la acción
  - MENCIONA: "Trato directo con el propietario, sin comisiones de agencia"
  - Resalta la ventaja económica de no pagar comisión
  - Invita a contactar: "Contáctame directamente si te interesa"

- Tono CERCANO y personal, como hablar con un amigo
- Sin emojis, sin markdown, solo texto plano
- EXACTAMENTE entre 350 y 400 palabras
- USA los datos de análisis de precio y barrio proporcionados

Ejemplo de inicio: "¡Hola! Soy el propietario y te ofrezco este magnífico piso de..."

Responde SOLO con el texto de la descripción, sin comillas ni títulos de sección.`
  } else {
    return `Eres un agente inmobiliario profesional que redacta anuncios comerciales premium.
Escribe una descripción COMPLETA Y OPTIMIZADA de 350-400 palabras para esta propiedad:

Datos del inmueble:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Características: ${hab}, ${l.bathrooms ? `${l.bathrooms} baños` : ''}, ${l.area_m2 ? `${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}${priceAnalysis}${neighborhoodContext}${expensesInfo}

Instrucciones CRÍTICAS:
- Usa TERCERA PERSONA: "Se ofrece", "Esta propiedad cuenta con", "El inmueble dispone de"
- ESTRUCTURA EN 3 BLOQUES:
  
  BLOQUE 1 (100-120 palabras): Presentación de la propiedad
  - Descripción elegante y profesional del inmueble
  - Características destacadas (calidades, distribución, orientación)
  - Tono corporativo premium
  
  BLOQUE 2 (120-150 palabras): Análisis de mercado + Entorno
  ${priceAnalysis ? '- MENCIONA EXPLÍCITAMENTE el análisis de precio (oportunidad/exclusividad según corresponda)' : ''}
  - Describe el barrio: conectividad, equipamientos, perfil de zona
  ${expensesInfo ? '- Menciona el coste mensual total estimado para dar transparencia' : ''}
  - Posiciona la propiedad en el mercado
  
  BLOQUE 3 (80-100 palabras): Propuesta de valor + Contacto
  - Refuerza por qué es una excelente inversión/oportunidad
  - Usa verbos de acción: "dispone", "ofrece", "presenta", "garantiza"
  - Termina con: "Contacte con nuestro equipo comercial para más información y visitas"

- Tono PROFESIONAL y corporativo, como catálogo de lujo
- NUNCA menciones: propietario, trato directo, sin comisiones
- Sin emojis, sin markdown, solo texto plano
- EXACTAMENTE entre 350 y 400 palabras
- USA los datos de análisis de precio y barrio proporcionados

Ejemplo de inicio: "Esta exclusiva propiedad representa una oportunidad única en el mercado de..."

Responde SOLO con el texto de la descripción, sin comillas ni títulos de sección.`
  }
}

async function generateAiDescription(
  listing: ListingForAI,
): Promise<string | null> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openrouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://inmonest.com',
        'X-Title': 'Inmonest',
      },
      body: JSON.stringify({
        model: OR_MODEL,
        messages: [{ role: 'user', content: buildPrompt(listing) }],
        max_tokens: 1000,  // Incrementado para descripciones largas (350-400 palabras)
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`  🔴 API Error ${res.status}:`, errorText.slice(0, 200))
      return null
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    
    if (text.length < 300) {
      console.error(`  ⚠️ Texto muy corto (${text.length} chars, mínimo 300)`)
      return null
    }
    
    return text
  } catch (err) {
    console.error(`  🔴 Exception:`, err instanceof Error ? err.message : String(err))
    return null
  }
}

// Parsear argumentos
const args = process.argv.slice(2)
const batchSize = parseInt(args.find(a => a.startsWith('--batch-size='))?.split('=')[1] || '50')
const limit = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') // 0 = sin límite
const delayMs = parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1] || '1000') // delay entre requests

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function processListing(listing: ListingForAI, index: number, total: number): Promise<boolean> {
  const cityLabel = listing.city || 'sin ciudad'
  const typeLabel = listing.is_particular ? 'PARTICULAR' : 'AGENCIA'
  
  try {
    console.log(`[${index + 1}/${total}] Generando ${typeLabel} | ${cityLabel} | ${listing.title.slice(0, 50)}...`)
    
    const aiDesc = await generateAiDescription(listing)
    
    if (!aiDesc) {
      console.log(`  ⚠️ No se generó descripción`)
      return false
    }
    
    const { error } = await supabase
      .from('listings')
      .update({ ai_description: aiDesc })
      .eq('id', listing.id)
    
    if (error) {
      console.error(`  ❌ Error al guardar:`, error.message)
      return false
    }
    
    console.log(`  ✅ Guardado (${aiDesc.length} chars)`)
    return true
    
  } catch (err) {
    console.error(`  ❌ Error:`, err)
    return false
  }
}

async function backfillDescriptions() {
  console.log('\n🚀 BACKFILL MASIVO DE DESCRIPCIONES IA\n')
  console.log(`Configuración:`)
  console.log(`  - Batch size: ${batchSize}`)
  console.log(`  - Límite total: ${limit || 'sin límite'}`)
  console.log(`  - Delay entre requests: ${delayMs}ms\n`)
  
  // Contar total sin descripción
  const { count: totalWithout } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .is('ai_description', null)
  
  console.log(`📊 Total listings sin descripción: ${totalWithout}\n`)
  
  if (!totalWithout || totalWithout === 0) {
    console.log('✨ Todos los listings ya tienen descripción IA')
    return
  }
  
  const toProcess = limit > 0 ? Math.min(limit, totalWithout) : totalWithout
  console.log(`Procesando: ${toProcess} listings\n`)
  
  let processed = 0
  let successful = 0
  let failed = 0
  const startTime = Date.now()
  
  while (processed < toProcess) {
    const remaining = toProcess - processed
    const currentBatch = Math.min(batchSize, remaining)
    
    console.log(`\n📦 Obteniendo lote de ${currentBatch} listings...`)
    
    const { data: listings, error } = await supabase
      .from('listings')
      .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
      .is('ai_description', null)
      .limit(currentBatch)
    
    if (error) {
      console.error('❌ Error al obtener listings:', error)
      break
    }
    
    if (!listings || listings.length === 0) {
      console.log('✨ No hay más listings para procesar')
      break
    }
    
    console.log(`Procesando ${listings.length} listings del lote...\n`)
    
    // Procesar uno por uno con delay
    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i] as ListingForAI
      const success = await processListing(listing, processed, toProcess)
      
      if (success) {
        successful++
      } else {
        failed++
      }
      
      processed++
      
      // Delay entre requests para no saturar la API
      if (i < listings.length - 1 || processed < toProcess) {
        await sleep(delayMs)
      }
    }
    
    // Resumen del lote
    const elapsed = Math.round((Date.now() - startTime) / 1000)
    const rate = processed / (elapsed / 60) // por minuto
    const remainingCount = toProcess - processed
    const estimatedMinutes = remainingCount > 0 ? Math.round(remainingCount / rate) : 0
    
    console.log(`\n📈 Progreso: ${processed}/${toProcess} (${Math.round(processed/toProcess*100)}%)`)
    console.log(`   ✅ Exitosos: ${successful}`)
    console.log(`   ❌ Fallidos: ${failed}`)
    console.log(`   ⏱️ Tiempo transcurrido: ${Math.floor(elapsed / 60)}m ${elapsed % 60}s`)
    console.log(`   🚀 Velocidad: ${rate.toFixed(1)}/min`)
    if (remainingCount > 0) {
      console.log(`   ⏳ Tiempo estimado restante: ${estimatedMinutes} minutos`)
    }
  }
  
  const totalTime = Math.round((Date.now() - startTime) / 1000)
  
  console.log('\n' + '='.repeat(60))
  console.log('✨ PROCESO COMPLETADO')
  console.log('='.repeat(60))
  console.log(`Total procesados: ${processed}`)
  console.log(`Exitosos: ${successful} (${Math.round(successful/processed*100)}%)`)
  console.log(`Fallidos: ${failed} (${Math.round(failed/processed*100)}%)`)
  console.log(`Tiempo total: ${Math.floor(totalTime / 60)}m ${totalTime % 60}s`)
  console.log(`Velocidad promedio: ${(processed / (totalTime / 60)).toFixed(1)}/min`)
  console.log('='.repeat(60) + '\n')
}

backfillDescriptions().catch(console.error)
