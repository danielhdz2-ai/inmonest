/**
 * Script de prueba para regenerar descripciones IA con el nuevo prompt
 */
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY!
const openrouterKey = process.env.OPENROUTER_API_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const OR_MODEL = 'google/gemini-2.0-flash-lite-001'

function buildPrompt(l: any): string {
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

  const isParticular = l.is_particular === true

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

async function generateAiDescription(listing: any, openrouterKey: string): Promise<string | null> {
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

async function testDescriptions() {
  console.log('🧪 Probando generación de descripciones IA con nuevo prompt...\n')

  // Buscar 1 listing de PARTICULAR y 1 de AGENCIA de Barcelona
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, description, operation, city, district, province, price_eur, bedrooms, bathrooms, area_m2, is_particular')
    .eq('source_portal', 'pisos.com')
    .eq('city', 'Barcelona')
    .in('is_particular', [true, false])
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('Error:', error)
    return
  }

  // Filtrar: 1 particular y 1 agencia
  const particular = listings.find(l => l.is_particular === true)
  const agencia = listings.find(l => l.is_particular === false)

  if (particular) {
    console.log('📝 Generando descripción para PARTICULAR:')
    console.log(`   ${particular.title}`)
    console.log()
    
    const desc = await generateAiDescription(particular, openrouterKey)
    if (desc) {
      console.log('✅ Descripción generada:')
      console.log(`   "${desc}"`)
      console.log()
      
      // Guardar
      await supabase
        .from('listings')
        .update({ ai_description: desc })
        .eq('id', particular.id)
      console.log('💾 Guardada en BD\n')
    } else {
      console.log('❌ No se pudo generar\n')
    }
  }

  if (agencia) {
    console.log('📝 Generando descripción para AGENCIA:')
    console.log(`   ${agencia.title}`)
    console.log()
    
    const desc = await generateAiDescription(agencia, openrouterKey)
    if (desc) {
      console.log('✅ Descripción generada:')
      console.log(`   "${desc}"`)
      console.log()
      
      // Guardar
      await supabase
        .from('listings')
        .update({ ai_description: desc })
        .eq('id', agencia.id)
      console.log('💾 Guardada en BD\n')
    } else {
      console.log('❌ No se pudo generar\n')
    }
  }

  console.log('✅ Prueba completada')
}

testDescriptions().catch(console.error)
