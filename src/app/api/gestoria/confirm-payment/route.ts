import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
}

// Map de service_key → nombre legible (igual que en checkout/route.ts)
const SERVICE_NAMES: Record<string, string> = {
  'arras-penitenciales':  'Contrato de Arras Penitenciales',
  'arras-confirmatorias': 'Contrato de Arras Confirmatorias',
  'reserva-compra':       'Contrato de Reserva de Compra',
  'alquiler-vivienda-lau':'Contrato de Alquiler de Vivienda (LAU)',
  'alquiler-temporada':   'Contrato de Alquiler por Temporada',
  'alquiler-habitacion':  'Contrato de Alquiler de Habitación',
  'reserva-alquiler':     'Contrato de Reserva de Alquiler',
  'rescision-alquiler':   'Contrato de Rescisión de Alquiler',
  'liquidacion-fianza':   'Liquidación de Fianza',
  'devolucion-fianzas':   'Solicitud de Devolución de Fianzas',
}

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get('session_id')
  if (!session_id?.startsWith('cs_')) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 })
  }

  const stripe = getStripe()
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id)
  } catch {
    return NextResponse.json({ error: 'Sesión de pago no encontrada' }, { status: 404 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'pago_pendiente' }, { status: 402 })
  }

  const service_key = session.metadata?.service_key ?? ''
  const service_name = SERVICE_NAMES[service_key] ?? service_key
  const customer_email = session.customer_details?.email ?? session.customer_email ?? ''

  return NextResponse.json({ ok: true, service_name, customer_email })
}
