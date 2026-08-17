import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdminEmail } from '@/lib/admin'

export const dynamic = 'force-dynamic'

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return false
  return isAdminEmail(user.email)
}

/**
 * GET /api/admin/metrics
 * Obtiene métricas agregadas y KPIs
 */
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const adminSb = createAdminClient()
  const searchParams = req.nextUrl.searchParams
  const period = searchParams.get('period') || '30' // días

  // Métricas generales (excluir ventas de prueba)
  const { data: requests } = await adminSb
    .from('gestoria_requests')
    .select('*')
    .neq('client_email', 'daniel.trading.sniper@gmail.com')
    .neq('service_key', 'prueba-pago-stripe')

  const totalOrders = requests?.length || 0
  const paidOrders = requests?.filter(r => r.status === 'paid').length || 0
  const pendingOrders = totalOrders - paidOrders
  const totalRevenue = requests?.filter(r => r.status === 'paid').reduce((sum, r) => sum + (Number(r.amount_eur) || 0), 0) || 0
  const avgOrderValue = paidOrders > 0 ? totalRevenue / paidOrders : 0

  // Clientes únicos
  const uniqueClients = new Set(requests?.map(r => r.client_email).filter(Boolean)).size

  // Métricas por período (últimos X días)
  const periodDays = parseInt(period)
  const periodStart = new Date()
  periodStart.setDate(periodStart.getDate() - periodDays)

  const periodRequests = requests?.filter(r => new Date(r.created_at) >= periodStart) || []
  const periodRevenue = periodRequests.filter(r => r.status === 'paid').reduce((sum, r) => sum + (Number(r.amount_eur) || 0), 0)
  const periodOrders = periodRequests.length

  // Servicios más vendidos
  const serviceStats = new Map<string, { count: number; revenue: number }>()
  requests?.forEach(r => {
    if (r.status === 'paid') {
      const current = serviceStats.get(r.service_key) || { count: 0, revenue: 0 }
      current.count++
      current.revenue += Number(r.amount_eur) || 0
      serviceStats.set(r.service_key, current)
    }
  })

  const topServices = Array.from(serviceStats.entries())
    .map(([service, stats]) => ({ service, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Métricas por día (histórico completo, agrupado por fecha real de pago)
  const dailyMap = new Map<string, { orders: number; revenue: number; paid: number }>()
  requests?.forEach(r => {
    const source = r.paid_at || r.created_at
    if (!source) return
    const d = new Date(source)
    if (Number.isNaN(d.getTime())) return
    const dateStr = d.toISOString().split('T')[0]
    const entry = dailyMap.get(dateStr) || { orders: 0, revenue: 0, paid: 0 }
    entry.orders += 1
    if (r.status === 'paid') {
      entry.revenue += Number(r.amount_eur) || 0
      entry.paid += 1
    }
    dailyMap.set(dateStr, entry)
  })
  const dailyMetrics = Array.from(dailyMap.entries())
    .map(([date, v]) => ({ date, ...v }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Tasa de conversión (pedidos pagados / total)
  const conversionRate = totalOrders > 0 ? (paidOrders / totalOrders) * 100 : 0

  // Tiempo promedio de procesamiento (de creación a entregado)
  const deliveredOrders = requests?.filter(r => r.step === 4) || []
  const avgProcessingTime = deliveredOrders.length > 0 
    ? deliveredOrders.reduce((sum, r) => {
        const created = new Date(r.created_at).getTime()
        const delivered = new Date(r.updated_at || r.created_at).getTime()
        return sum + (delivered - created)
      }, 0) / deliveredOrders.length / (1000 * 60 * 60 * 24) // días
    : 0

  return NextResponse.json({
    overview: {
      totalOrders,
      paidOrders,
      pendingOrders,
      totalRevenue,
      avgOrderValue,
      uniqueClients,
      conversionRate,
      avgProcessingTime
    },
    period: {
      days: periodDays,
      orders: periodOrders,
      revenue: periodRevenue
    },
    topServices,
    dailyMetrics
  })
}
