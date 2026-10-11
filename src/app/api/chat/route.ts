import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  gestoriaChatServiciosParaPrompt,
  resolveGestoriaChatNavigation,
  type GestoriaChatParsed,
} from '@/lib/gestoria-chat-assistant'

function getGeminiKey(): string {
  return (
    process.env.CLAVE_API_IA_GOOGLE ??
    process.env.GOOGLE_AI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    ''
  ).trim()
}

function getOpenRouterKey(): string {
  return (process.env.OPENROUTER_API_KEY ?? '').trim()
}

const SYSTEM_PROMPT = `Eres el asistente de gestoría inmobiliaria de Inmonest (inmonest.com).
Inmonest NO es un portal de anuncios: ayudas al usuario a encontrar el SERVICIO DE GESTORÍA adecuado (contratos redactados por expertos, entrega ~48h, pago online).

Interpreta la intención y responde EXCLUSIVAMENTE con un JSON válido, sin markdown ni texto extra.

Campos del JSON:
- servicio: string (slug del catálogo, obligatorio si no hay error)
- ciudad: string (opcional, ciudad española si la menciona)
- mensaje: string (opcional, una frase amable en español antes de redirigir)
- error: string (si no es una petición de gestoría/contratos)

Servicios disponibles (slug → nombre):
${gestoriaChatServiciosParaPrompt()}

Prioriza contrato-alquiler cuando hablen de alquilar piso, LAU, contrato de arrendamiento o ser propietario/inquilino.
Usa arras-penitenciales o arras-confirmatorias para compraventa/señal.
Usa alquiler-habitaciones para piso compartido o habitación.

Ejemplos:

Usuario: "necesito contrato de alquiler en Barcelona"
{"servicio":"contrato-alquiler","ciudad":"Barcelona","mensaje":"Contrato LAU personalizado para Barcelona, 145 € IVA incl."}

Usuario: "voy a firmar arras en Madrid"
{"servicio":"arras-penitenciales","ciudad":"Madrid"}

Usuario: "revisar un contrato de alquiler que me han pasado"
{"servicio":"revision-alquiler"}

Usuario: "alquiler de habitación en Valencia"
{"servicio":"alquiler-habitaciones","ciudad":"Valencia"}

Usuario: "busco piso barato en Madrid"
{"error":"Inmonest ya no busca pisos en venta o alquiler. ¿Necesitas un contrato LAU o arras? Dime ciudad y si eres propietario o comprador."}`

function parseGestoriaIntent(raw: string): GestoriaChatParsed {
  try {
    const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
    return JSON.parse(clean) as GestoriaChatParsed
  } catch {
    return { error: 'No he podido interpretar la petición. Prueba a decir el servicio y la ciudad.' }
  }
}

async function callGemini(apiKey: string, lastUserMsg: string, recent: Array<{ role: string; content: string }>): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
    systemInstruction: SYSTEM_PROMPT,
  })

  const rawHistory = recent.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
  while (rawHistory.length > 0 && rawHistory[0].role === 'model') rawHistory.shift()

  const chat = model.startChat({ history: rawHistory })
  const result = await chat.sendMessage(lastUserMsg)
  return result.response.text().trim()
}

async function callOpenRouter(apiKey: string, lastUserMsg: string): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://inmonest.com',
      'X-Title': 'Inmonest',
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: lastUserMsg },
      ],
      temperature: 0.1,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`OpenRouter ${res.status}: ${errText}`)
  }

  const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
  return data.choices?.[0]?.message?.content?.trim() ?? ''
}

// Verificar que la petición viene del propio portal (evitar abuso externo de la IA)
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? ''
  const host = req.headers.get('host') ?? ''
  // En desarrollo local siempre permitir
  if (process.env.NODE_ENV !== 'production') return true
  // En producción solo aceptar desde el mismo dominio
  const allowed = ['https://inmonest.com', 'https://www.inmonest.com']
  return allowed.some((o) => origin.startsWith(o)) || host.includes('inmonest.com')
}

export async function POST(req: NextRequest) {
  // Bloquear peticiones externas (bots, scrapers, abuso de IA)
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  let body: { messages?: Array<{ role: string; content: string }> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const messages = body.messages ?? []
  if (!messages.length) return NextResponse.json({ error: 'Sin mensajes' }, { status: 422 })

  // Limitar longitud de cada mensaje para evitar tokens excesivos
  const MAX_MSG_LEN = 500
  const sanitized = messages.map((m) => ({
    ...m,
    content: typeof m.content === 'string' ? m.content.slice(0, MAX_MSG_LEN) : '',
  }))

  const lastUser = [...sanitized].reverse().find((m) => m.role === 'user')
  if (!lastUser) return NextResponse.json({ error: 'Sin mensaje de usuario' }, { status: 422 })

  const recent = sanitized.slice(-6)
  const geminiKey = getGeminiKey()
  const openrouterKey = getOpenRouterKey()

  // ── Intento 1: Gemini ──────────────────────────────────────
  if (geminiKey) {
    try {
      const raw = await callGemini(geminiKey, lastUser.content, recent)
      const parsed = parseGestoriaIntent(raw)
      const navigation = resolveGestoriaChatNavigation(parsed)
      return NextResponse.json({ ok: true, parsed, navigation, raw })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.warn('[chat/route] Gemini falló, probando fallback OpenRouter:', msg)
    }
  }

  // ── Intento 2: OpenRouter (fallback) ───────────────────────
  if (openrouterKey) {
    try {
      const raw = await callOpenRouter(openrouterKey, lastUser.content)
      const parsed = parseGestoriaIntent(raw)
      const navigation = resolveGestoriaChatNavigation(parsed)
      return NextResponse.json({ ok: true, parsed, navigation, raw })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[chat/route] OpenRouter también falló:', msg)
    }
  }

  // ── Sin opciones disponibles ───────────────────────────────
  if (!geminiKey && !openrouterKey) {
    console.error('[chat/route] No hay ninguna API key configurada (GOOGLE_AI_API_KEY, OPENROUTER_API_KEY)')
  }

  return NextResponse.json(
    { error: 'El asistente IA no está disponible ahora mismo. Inténtalo de nuevo.' },
    { status: 503 }
  )
}


