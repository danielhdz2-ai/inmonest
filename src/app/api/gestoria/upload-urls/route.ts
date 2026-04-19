import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getStripeKey } from '@/lib/stripe-key'

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

const DOCS = ['dni', 'nota-simple', 'escrituras'] as const

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')
  if (!session_id?.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }

  const key = getStripeKey()
  if (!key) {
    console.error('[upload-urls] STRIPE_SECRET_KEY no configurada')
    return NextResponse.json({ error: 'Pago no disponible temporalmente' }, { status: 503 })
  }

  // Verificar pago con Stripe (fetch nativo — sin SDK, consistente con el resto del proyecto)
  let session: StripeSession
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    session = await res.json() as StripeSession
    if (!res.ok) {
      console.error('[upload-urls] Stripe API error:', session.error?.message, '| key starts with:', key.substring(0, 12))
      return NextResponse.json({ error: 'Sesión de pago no encontrada' }, { status: 404 })
    }
  } catch (err) {
    console.error('[upload-urls] fetch error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Error de red al verificar pago' }, { status: 502 })
  }

  console.log('[upload-urls] session_id:', session_id, '| payment_status:', session.payment_status)

  if (session.payment_status !== 'paid') {
    console.warn('[upload-urls] Pago no completado. Status:', session.payment_status)
    return NextResponse.json({ error: 'pago_pendiente' }, { status: 402 })
  }

  // Generar signed upload URLs (una por documento)
  const supabase = getSupabaseAdmin()
  const urls: Record<string, { signedUrl: string; token: string; path: string }> = {}

  for (const doc of DOCS) {
    const path = `${session_id}/${doc}.pdf`
    const { data, error } = await supabase.storage
      .from('gestoria-docs')
      .createSignedUploadUrl(path)

    if (error || !data) {
      console.error('[upload-urls] Error generando URL para', doc, ':', error?.message)
      return NextResponse.json({ error: `Error generando URL para ${doc}: ${error?.message}` }, { status: 500 })
    }
    urls[doc] = { signedUrl: data.signedUrl, token: data.token, path }
  }

  const customerEmail = session.customer_details?.email ?? session.customer_email ?? ''
  console.log('[upload-urls] URLs generadas OK para:', customerEmail)
  return NextResponse.json({ urls, customer_email: customerEmail })
}
