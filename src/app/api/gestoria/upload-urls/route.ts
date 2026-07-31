import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getStripeKey } from '@/lib/stripe-key'
import { resolveUploadMimeType, sanitizeExtension } from '@/lib/gestoria-upload'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

interface StripeSession {
  id: string
  payment_status: string
  customer_email: string | null
  customer_details?: { email?: string | null }
  error?: { message: string }
}

const DOCS = ['dni', 'dni-reverso', 'nota-simple', 'escrituras'] as const
type DocKey = (typeof DOCS)[number]

function isDocKey(v: string): v is DocKey {
  return (DOCS as readonly string[]).includes(v)
}

async function verifyPaidSession(session_id: string): Promise<
  | { ok: true; email: string }
  | { ok: false; status: number; error: string }
> {
  const key = getStripeKey()
  if (!key) {
    return { ok: false, status: 503, error: 'Pago no disponible temporalmente' }
  }

  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    const session = (await res.json()) as StripeSession
    if (!res.ok) {
      return { ok: false, status: 404, error: 'Sesión de pago no encontrada' }
    }
    if (session.payment_status !== 'paid') {
      return { ok: false, status: 402, error: 'pago_pendiente' }
    }
    const email = session.customer_details?.email ?? session.customer_email ?? ''
    return { ok: true, email }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error de red'
    return { ok: false, status: 502, error: msg }
  }
}

/** GET: verifica pago y devuelve email (URLs se piden por POST al subir cada archivo) */
export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')
  if (!session_id?.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }

  const verified = await verifyPaidSession(session_id)
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: verified.status })
  }

  // Compat: URLs PDF genéricas (clientes antiguos). El flujo nuevo usa POST.
  const supabase = getSupabaseAdmin()
  const urls: Record<string, { signedUrl: string; token: string; path: string }> = {}

  for (const doc of DOCS) {
    const path = `${session_id}/${doc}.pdf`
    const { data, error } = await supabase.storage
      .from('gestoria-docs')
      .createSignedUploadUrl(path, { upsert: true })

    if (error || !data) {
      console.error('[upload-urls] Error generando URL para', doc, ':', error?.message)
      return NextResponse.json({ error: `Error generando URL para ${doc}: ${error?.message}` }, { status: 500 })
    }
    urls[doc] = { signedUrl: data.signedUrl, token: data.token, path }
  }

  return NextResponse.json({ urls, customer_email: verified.email })
}

/** POST: URL firmada con la extensión real del archivo (PDF o foto del DNI) */
export async function POST(req: NextRequest) {
  let body: {
    session_id?: string
    doc_key?: string
    file_name?: string
    mime_type?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const session_id = body.session_id?.trim() ?? ''
  const doc_key = body.doc_key?.trim() ?? ''
  const file_name = body.file_name?.trim() ?? ''

  if (!session_id.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }
  if (!isDocKey(doc_key)) {
    return NextResponse.json({ error: 'doc_key inválido' }, { status: 400 })
  }

  const mime = resolveUploadMimeType(file_name, body.mime_type)
  if (!mime) {
    return NextResponse.json(
      { error: 'Formato no permitido. Usa PDF, JPG, PNG o WEBP.' },
      { status: 422 },
    )
  }

  const verified = await verifyPaidSession(session_id)
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: verified.status })
  }

  const ext = sanitizeExtension(file_name) || (mime === 'application/pdf' ? 'pdf' : 'jpg')
  const path = `${session_id}/${doc_key}.${ext}`

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.storage
    .from('gestoria-docs')
    .createSignedUploadUrl(path, { upsert: true })

  if (error || !data) {
    console.error('[upload-urls POST]', doc_key, error?.message)
    return NextResponse.json({ error: error?.message ?? 'No se pudo crear URL' }, { status: 500 })
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path,
    contentType: mime,
    customer_email: verified.email,
  })
}
