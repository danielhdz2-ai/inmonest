import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmails = [process.env.CONTACT_NOTIFY_EMAIL, 'inmonest.admin@gmail.com'].filter(Boolean)
  return adminEmails.includes(user.email.trim())
}

const PAYMENT_METHODS = ['stripe', 'transferencia', 'bizum', 'efectivo', 'otro'] as const
const EDITABLE_FIELDS = [
  'client_name',
  'client_email',
  'client_phone',
  'service_key',
  'service_name',
  'amount_eur',
  'status',
  'payment_method',
  'paid_at',
  'internal_notes',
] as const

/**
 * PATCH /api/admin/pedidos/[id]
 * Editar los datos de una venta/pedido de gestoría desde el panel admin.
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!id || !body) return NextResponse.json({ error: 'Petición inválida' }, { status: 400 })

  const update: Record<string, unknown> = {}

  if ('client_name' in body) update.client_name = String(body.client_name ?? '').trim().slice(0, 200)
  if ('client_email' in body) {
    const email = String(body.client_email ?? '').trim().toLowerCase().slice(0, 200)
    if (!email.includes('@')) return NextResponse.json({ error: 'Email no válido' }, { status: 400 })
    update.client_email = email
  }
  if ('client_phone' in body) update.client_phone = String(body.client_phone ?? '').trim().slice(0, 40) || null
  if ('service_key' in body) update.service_key = String(body.service_key ?? '').trim().slice(0, 120)
  if ('service_name' in body) update.service_name = String(body.service_name ?? '').trim().slice(0, 200)
  if ('amount_eur' in body) {
    const amount = Number(body.amount_eur)
    if (!Number.isFinite(amount) || amount < 0) return NextResponse.json({ error: 'Importe no válido' }, { status: 400 })
    update.amount_eur = amount
  }
  if ('status' in body) {
    const status = String(body.status ?? '').trim()
    if (!['pending', 'lead', 'paid', 'in_progress', 'delivered', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Estado no válido' }, { status: 400 })
    }
    update.status = status
    // Si se marca como pagado y no tenía fecha de pago, ponerla ahora.
    if (status === 'paid' && !body.paid_at) update.paid_at = new Date().toISOString()
  }
  if ('payment_method' in body) {
    const pm = String(body.payment_method ?? '').trim().toLowerCase()
    update.payment_method = (PAYMENT_METHODS as readonly string[]).includes(pm) ? pm : null
  }
  if ('paid_at' in body) {
    const raw = String(body.paid_at ?? '').trim()
    update.paid_at = raw ? new Date(raw).toISOString() : null
  }
  if ('internal_notes' in body) update.internal_notes = String(body.internal_notes ?? '').trim().slice(0, 1000) || null

  const invalidKeys = Object.keys(update).filter((k) => !EDITABLE_FIELDS.includes(k as (typeof EDITABLE_FIELDS)[number]))
  if (invalidKeys.length > 0) {
    return NextResponse.json({ error: `Campos no editables: ${invalidKeys.join(', ')}` }, { status: 400 })
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 })
  }

  const adminSb = createAdminClient()
  const { data, error } = await adminSb
    .from('gestoria_requests')
    .update(update)
    .eq('id', id)
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, request: data })
}

/**
 * DELETE /api/admin/pedidos/[id]
 * Eliminar una venta/pedido (leads de bots, duplicados, pruebas...).
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  const adminSb = createAdminClient()
  const { error } = await adminSb.from('gestoria_requests').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
