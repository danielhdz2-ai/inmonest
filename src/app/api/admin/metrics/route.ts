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

  // Métricas generales
  const { data: requests } = await adminSb
    .from('gestoria_requests')
    .select('*')

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

  // Métricas por día (últimos 30 días para gráfico)
  const dailyMetrics = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayRequests = requests?.filter(r => r.created_at.startsWith(dateStr)) || []
    const dayRevenue = dayRequests.filter(r => r.status === 'paid').reduce((sum, r) => sum + (Number(r.amount_eur) || 0), 0)
    
    dailyMetrics.push({
      date: dateStr,
      orders: dayRequests.length,
      revenue: dayRevenue,
      paid: dayRequests.filter(r => r.status === 'paid').length
    })
  }

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
