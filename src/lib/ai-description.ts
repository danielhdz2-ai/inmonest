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

Escribe 250 palabras: características del piso, ventajas del barrio, beneficios de la ubicación. Tono profesional, sin emojis, texto plano.

Responde SOLO con el texto de la descripción, sin comillas ni títulos de sección.`
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
