/**
 * ai-description.ts
 *
 * Utilidad compartida para generar descripciones con IA usando OpenRouter.
 * Usada por:
 *  - src/app/api/publicar/route.ts   → al publicar un anuncio nuevo
 *  - src/app/api/cron/generate-descriptions/route.ts → backfill batch
 */

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
    ? `${l.price_eur.toLocaleString('es-ES')} €${l.operation === 'rent' ? '/mes' : ''}`
    : null

  // Solo es particular si está EXPLÍCITAMENTE marcado como true
  const isParticular = l.is_particular === true

  // Prompts completamente diferentes según el tipo
  if (isParticular) {
    return `Eres un propietario particular que alquila/vende su piso directamente.
Escribe una descripción atractiva de 120-150 palabras para TU piso:

Datos del piso:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Tipo: ${hab}
${l.bathrooms ? `- Baños: ${l.bathrooms}` : ''}
${l.area_m2 ? `- Superficie: ${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}

Instrucciones CRÍTICAS:
- Usa PRIMERA PERSONA: "Alquilo mi piso", "Tengo un piso", "Ofrezco"
- Menciona EXPLÍCITAMENTE: "Trato directo con el propietario, sin comisiones de agencia"
- Tono CERCANO y personal, como si hablaras con un amigo
- Cuenta por qué es especial PARA TI vivir ahí o por qué lo ofreces
- Termina con: "Contáctame directamente si te interesa"
- Sin emojis, sin markdown, solo texto plano
- EXACTAMENTE entre 120 y 150 palabras

Ejemplo de inicio: "¡Hola! Soy el propietario y alquilo mi precioso piso de..."

Responde SOLO con el texto de la descripción, sin comillas.`
  } else {
    return `Eres un agente inmobiliario profesional que redacta anuncios comerciales.
Escribe una descripción profesional de 120-150 palabras para esta propiedad:

Datos del inmueble:
- Operación: ${op}
- Ubicación: ${ubicacion || 'España'}
- Características: ${hab}, ${l.bathrooms ? `${l.bathrooms} baños` : ''}, ${l.area_m2 ? `${l.area_m2} m²` : ''}
${precio ? `- Precio: ${precio}` : ''}

Instrucciones CRÍTICAS:
- Usa TERCERA PERSONA: "Se ofrece", "Esta propiedad cuenta con", "El inmueble dispone de"
- NUNCA menciones: propietario, trato directo, sin comisiones, sin agencia
- Tono PROFESIONAL y corporativo, como catálogo de agencia premium
- Enfatiza: calidad, ubicación estratégica, servicios, rentabilidad
- Usa verbos formales: "dispone", "ofrece", "presenta", "cuenta con"
- Termina con: "Contacte con nuestro equipo comercial para más información"
- Sin emojis, sin markdown, solo texto plano
- EXACTAMENTE entre 120 y 150 palabras

Ejemplo de inicio: "Esta exclusiva propiedad se encuentra ubicada en..."

Responde SOLO con el texto de la descripción, sin comillas.`
  }
}

/**
 * Genera una descripción IA para un listing.
 * Devuelve null si la API falla o la respuesta es inválida.
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
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!res.ok) return null

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    return text.length >= 50 ? text : null
  } catch {
    return null
  }
}
