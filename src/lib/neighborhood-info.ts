/**
 * neighborhood-info.ts
 * 
 * Genera información del barrio usando IA
 * Contenido único y evergreen para SEO
 */

import { decodeHtml } from '@/lib/html'

export interface NeighborhoodInfo {
  title: string
  content: string
  highlights: string[]
}

/**
 * Genera información del barrio usando IA (OpenRouter)
 */
export async function generateNeighborhoodInfo(
  district: string | null,
  city: string | null,
  province: string | null,
): Promise<NeighborhoodInfo | null> {
  if (!district && !city) return null

  const openrouterKey = process.env.OPENROUTER_API_KEY
  if (!openrouterKey) return null

  const location = [district, city, province].filter(Boolean).join(', ')

  const prompt = `Eres un experto en información inmobiliaria de España.

Escribe una descripción informativa y útil sobre el barrio/zona de "${location}" para personas que buscan alquilar o comprar vivienda allí.

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
      console.error('[generateNeighborhoodInfo] OpenRouter error:', response.status)
      return null
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const content = data.choices?.[0]?.message?.content?.trim()
    if (!content) return null

    // Generar highlights (primeras 3 frases cortas)
    const sentences = content.split(/[.!?]\s+/).filter(s => s.length > 20 && s.length < 120)
    const highlights = sentences.slice(0, 3).map(s => s + '.')

    return {
      title: `Por qué vivir en ${district ?? city}`,
      content: decodeHtml(content) ?? content,
      highlights,
    }
  } catch (error) {
    console.error('[generateNeighborhoodInfo] Error:', error)
    return null
  }
}

/**
 * Template de fallback si falla la generación con IA
 */
export function getNeighborhoodFallback(
  district: string | null,
  city: string | null,
): NeighborhoodInfo | null {
  if (!city) return null

  const location = district ?? city
  const locationFull = district ? `${district}, ${city}` : city

  return {
    title: `Por qué vivir en ${location}`,
    content: `${locationFull} es una zona que ofrece diversos servicios y comercios para el día a día. La ubicación cuenta con buenas conexiones de transporte público que facilitan el desplazamiento a otras partes de la ciudad.

En la zona encontrarás supermercados, farmacias, centros educativos y espacios de ocio que cubren las necesidades básicas. El barrio dispone de diferentes opciones de restauración y comercios de proximidad.

La red de transporte público incluye conexiones mediante autobús y, en muchos casos, acceso a metro o cercanías que conectan con el centro de ${city} y otras zonas metropolitanas.

Es un área residencial que combina oferta de servicios con zonas de uso cotidiano, apropiada tanto para familias como para jóvenes profesionales o estudiantes que buscan establecerse en ${city}.`,
    highlights: [
      `Buenas conexiones de transporte público en ${location}.`,
      `Zona residencial con servicios y comercios de proximidad.`,
      `Apropiada para familias y profesionales en ${city}.`,
    ],
  }
}
