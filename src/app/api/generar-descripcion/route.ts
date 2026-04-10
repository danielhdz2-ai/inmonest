import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? ''

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'IA no configurada' }, { status: 503 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { operation, city, district, bedrooms, bathrooms, area, price } = body

  const opLabel = operation === 'rent' ? 'alquiler' : 'venta'
  const habLabel = bedrooms === '0' ? 'estudio' : `${bedrooms} habitacion${Number(bedrooms) !== 1 ? 'es' : ''}`
  const ubicacion = [district, city].filter(Boolean).join(', ')
  const superficieLabel = area ? `${area} m²` : ''
  const precioLabel = price
    ? `${Number(price).toLocaleString('es-ES')} €${operation === 'rent' ? '/mes' : ''}`
    : ''

  const prompt = `Eres un experto redactor de anuncios inmobiliarios en España.
Genera un título atractivo (máximo 90 caracteres) y una descripción detallada (200-350 palabras) para este anuncio:

- Operación: ${opLabel}
- Ubicación: ${ubicacion || 'España'}
- Tipo: ${habLabel}
${bathrooms ? `- Baños: ${bathrooms}` : ''}
${superficieLabel ? `- Superficie: ${superficieLabel}` : ''}
${precioLabel ? `- Precio: ${precioLabel}` : ''}
- Publicado por: propietario directo (sin agencia, sin comisión)

Requisitos del título:
- Empieza por tipo de vivienda y habitaciones
- Incluye la ubicación
- Menciona "propietario directo" o "sin comisión"
- Sin emojis en el título

Requisitos de la descripción:
- Tono cercano y directo, como si lo escribiera el propio propietario
- Menciona lo atractivo de la zona, el ambiente del barrio
- Habla de características positivas genéricas (luminosidad, distribución, transporte)
- Termina con una llamada a la acción para contactar
- No inventes datos concretos que no se han proporcionado (ej. no pongas "cocina equipada" si no se indicó)
- Sin emojis en la descripción

Responde EXCLUSIVAMENTE con un objeto JSON válido, sin texto adicional:
{"title": "...", "description": "..."}`

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    // Strip markdown code fences if present
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

    let parsed: { title: string; description: string }
    try {
      parsed = JSON.parse(clean)
    } catch {
      return NextResponse.json({ error: 'Respuesta IA inválida' }, { status: 500 })
    }

    if (!parsed.title || !parsed.description) {
      return NextResponse.json({ error: 'IA devolvió campos incompletos' }, { status: 500 })
    }

    return NextResponse.json({ title: parsed.title, description: parsed.description })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error de IA'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
