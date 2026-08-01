import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  const adminEmails = [process.env.CONTACT_NOTIFY_EMAIL, 'daniel.hdz.trader@gmail.com'].filter(Boolean)
  return adminEmails.includes(user.email)
}

/**
 * GET /api/admin/clients
 * Obtiene la base de datos completa de clientes con estadísticas
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const adminSb = createAdminClient()
  
  // Obtener todos los clientes únicos con sus estadísticas (excluir pruebas)
  const { data: requests, error } = await adminSb
    .from('gestoria_requests')
    .select('*')
    .neq('client_email', 'daniel.trading.sniper@gmail.com')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Agrupar por cliente (email) y calcular estadísticas
  const clientsMap = new Map<string, {
    email: string
    name: string
    phone: string | null
    first_purchase: string
    last_purchase: string
    total_orders: number
    total_paid: number
    total_revenue: number
    orders: typeof requests
    tags: string[]
  }>()

  requests?.forEach(req => {
    // Normalizar email (trim + lowercase) para agrupar correctamente aunque
    // el mismo cliente tenga pedidos guardados con distinta capitalización
    // o espacios — si no, un mismo cliente aparecía duplicado con datos
    // incompletos en cada "duplicado".
    const email = (req.client_email || '').trim().toLowerCase() || 'sin-email'

    if (!clientsMap.has(email)) {
      clientsMap.set(email, {
        email: req.client_email?.trim() || 'Sin email',
        name: req.client_name || 'Sin nombre',
        phone: req.client_phone,
        first_purchase: req.created_at,
        last_purchase: req.created_at,
        total_orders: 0,
        total_paid: 0,
        total_revenue: 0,
        orders: [],
        tags: req.tags || []
      })
    }

    const client = clientsMap.get(email)!
    client.total_orders++
    if (req.status === 'paid') {
      client.total_paid++
      client.total_revenue += Number(req.amount_eur) || 0
    }
    client.orders.push(req)
    
    // Actualizar fechas
    if (new Date(req.created_at) > new Date(client.last_purchase)) {
      client.last_purchase = req.created_at
    }
    if (new Date(req.created_at) < new Date(client.first_purchase)) {
      client.first_purchase = req.created_at
    }
  })

  const clients = Array.from(clientsMap.values())

  return NextResponse.json({ 
    clients,
    total: clients.length
  })
}

/**
 * POST /api/admin/clients
 * Agregar tags o notas a un cliente
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const body = await req.json()
  const { client_email, tags, priority, internal_notes } = body

  if (!client_email) {
    return NextResponse.json({ error: 'Falta client_email' }, { status: 400 })
  }

  const adminSb = createAdminClient()

  // Actualizar todos los pedidos de este cliente
  const updateData: Record<string, unknown> = {}
  if (tags !== undefined) updateData.tags = tags
  if (priority !== undefined) updateData.priority = priority
  if (internal_notes !== undefined) updateData.internal_notes = internal_notes

  const { error } = await adminSb
    .from('gestoria_requests')
    .update(updateData)
    .eq('client_email', client_email)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
