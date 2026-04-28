/**
 * ai-description.ts
 *
 * Utilidad compartida para generar descripciones con IA usando OpenRouter.
 * VERSIÓN 2.0: Incluye análisis de precios competitivo y contexto del barrio
 * 
 * Usada por:
 *  - src/app/api/publicar/route.ts   → al publicar un anuncio nuevo
 *  - src/app/api/cron/generate-descriptions/route.ts → backfill batch
 *  - scripts/backfill-ai-descriptions.mts → procesamiento masivo
 */

import { calculatePriceDeviation } from './city-price-reference'
import { calculateMonthlyExpenses } from './monthly-cost-calculator'

const OR_MODEL = 'google/gemini-2.0-flash-lite-001'

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
    l.bedrooms === 0
      ? 'estudio'
      : l.bedrooms === 1
        ? '1 habitación'
        : `${l.bedrooms} habitaciones`
  
  const ubicacion = [l.district, l.city, l.province].filter(Boolean).join(', ')
  const precio = l.price_eur
    ? l.operation === 'rent'
      ? `${l.price_eur}€/mes`
      : `${l.price_eur.toLocaleString('es-ES')}€`
    : null

  // ANÁLISIS DE PRECIOS COMPETITIVO
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
    const expenses = calculateMonthlyExpenses({
      rent: l.price_eur,
      area_m2: l.area_m2,
      bedrooms: l.bedrooms,
    })
    expensesInfo = `\n- GASTOS ESTIMADOS: Coste mensual total estimado de ${expenses.total}€ (incluyendo alquiler ${l.price_eur}€ + suministros ~${expenses.utilities}€ + internet ~${expenses.internet}€). Menciona esto para dar transparencia.`
  }

  // Solo es particular si está EXPLÍCITAMENTE marcado como true
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

/**
 * Genera una descripción IA para un listing.
 * Devuelve null si la API falla o la respuesta es inválida.
 * 
 * VERSIÓN 2.0: Descripciones extensas (350-400 palabras) con análisis de precio y barrio
 */
export async function generateAiDescription(
  listing: ListingInput,
  openrouterKey: string,
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
        max_tokens: 1000,  // Incrementado para descripciones largas
        temperature: 0.7,
      }),
    })

    if (!res.ok) return null

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    
    // Validar longitud mínima (ahora esperamos 350-400 palabras ≈ 2000-2400 chars)
    return text.length >= 300 ? text : null
  } catch {
    return null
  }
}
