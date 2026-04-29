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

// Modelo económico con buen balance calidad/precio
// $0.02 por 1M tokens (50x más barato que GPT-4)
const OR_MODEL = 'google/gemini-flash-1.5'

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
  const hab = l.bedrooms === 0 ? 'estudio' : l.bedrooms === 1 ? '1 hab' : `${l.bedrooms} habs`
  const ubicacion = [l.district, l.city].filter(Boolean).join(', ')
  const precio = l.price_eur ? (l.operation === 'rent' ? `${l.price_eur}€/mes` : `${l.price_eur.toLocaleString('es-ES')}€`) : null
  const isParticular = l.is_particular === true

  // Prompt optimizado (menos tokens)
  if (isParticular) {
    return `Eres propietario. Describe TU piso en ${op} en ${ubicacion} (${hab}${l.bathrooms ? `, ${l.bathrooms} baños` : ''}${l.area_m2 ? `, ${l.area_m2}m²` : ''}${precio ? `, ${precio}` : ''}).

Estructura (250 palabras):
1. Descripción atractiva del piso (luminosidad, reforma, distribución)
2. Barrio: transporte, servicios, ambiente
3. Ventaja: "Sin comisión, trato directo con propietario"

Primera persona, tono cercano, sin emojis, texto plano.`
  }

  // Agencia - prompt corto
  return `Describe piso en ${op} en ${ubicacion} (${hab}${l.bathrooms ? `, ${l.bathrooms} baños` : ''}${l.area_m2 ? `, ${l.area_m2}m²` : ''}${precio ? `, ${precio}` : ''}).

Escribe 250 palabras: características del piso, ventajas del barrio, beneficios de la ubicación. Tono profesional, sin emojis, texto plano.`
}

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
        max_tokens: 500,  // Optimizado: descripciones concisas (200-250 palabras)
        temperature: 0.7,
      }),
    })

    if (!res.ok) return null

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    
    // Validar longitud mínima (esperamos 200-250 palabras ≈ 1200-1500 chars)
    return text.length >= 200 ? text : null
  } catch {
    return null
  }
}
