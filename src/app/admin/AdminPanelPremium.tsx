'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface GestoriaRequest {
  id: string
  session_id: string | null
  service_key: string
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  amount_eur: number | null
  status: string
  step: number | null
  paid_at: string | null
  created_at: string
  tags: string[] | null
  priority: string | null
  internal_notes: string | null
}

interface Client {
  email: string
  name: string
  phone: string | null
  first_purchase: string
  last_purchase: string
  total_orders: number
  total_paid: number
  total_revenue: number
  orders: GestoriaRequest[]
  tags: string[]
}

interface Metrics {
  overview: {
    totalOrders: number
    paidOrders: number
    pendingOrders: number
    totalRevenue: number
    avgOrderValue: number
    uniqueClients: number
    conversionRate: number
    avgProcessingTime: number
  }
  dailyMetrics: Array<{
    date: string
    orders: number
    revenue: number
    paid: number
  }>
  topServices: Array<{
    service: string
    count: number
    revenue: number
  }>
}

const SERVICE_LABELS: Record<string, string> = {
  'pack-due-diligence-precompra': 'Due Diligence Pre-Compra',
  'arras-confirmatorias': 'Arras Confirmatorias',
  'arras-penitenciales': 'Arras Penitenciales',
  'alquiler-vivienda-lau': 'Alquiler Residencial (LAU)',
  'revision-contrato-arras': 'Revisión Contrato Arras',
  'revision-contrato-alquiler': 'Revisión Contrato Alquiler',
}

export default function AdminPanelPremium({ initialRequests }: { initialRequests: GestoriaRequest[] }) {
  const [tab, setTab] = useState<'dashboard' | 'pedidos' | 'clientes' | 'documentos'>('dashboard')
  const [requests, setRequests] = useState<GestoriaRequest[]>(initialRequests)
  const [clients, setClients] = useState<Client[]>([])
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Cargar métricas y clientes al montar
  useEffect(() => {
    loadMetrics()
    loadClients()
  }, [])

  async function loadMetrics() {
    try {
      const res = await fetch('/api/admin/metrics')
      const data = await res.json()
      setMetrics(data)
    } catch (err) {
      console.error('Error loading metrics:', err)
    }
  }

  async function loadClients() {
    try {
      const res = await fetch('/api/admin/clients')
      const data = await res.json()
      setClients(data.clients || [])
    } catch (err) {
      console.error('Error loading clients:', err)
    }
  }

  async function exportToCSV() {
    const csv = [
      ['Email', 'Nombre', 'Teléfono', 'Total Pedidos', 'Pedidos Pagados', 'Ingresos Totales', 'Primera Compra', 'Última Compra'].join(','),
      ...clients.map(c => [
        c.email,
        c.name,
        c.phone || '',
        c.total_orders,
        c.total_paid,
        c.total_revenue.toFixed(2),
        new Date(c.first_purchase).toLocaleDateString(),
        new Date(c.last_purchase).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clientes-inmonest-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredClients = clients.filter(c =>
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRequests = requests.filter(r =>
    (r.client_email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (r.client_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración Premium</h1>
          <p className="text-gray-500 text-sm mt-1">Control total de Inmonest</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition"
          >
            📥 Exportar CSV
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl mb-8 w-fit">
        {([
          { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
          { id: 'pedidos', label: '📋 Pedidos', icon: '📋' },
          { id: 'clientes', label: '👥 Clientes', icon: '👥' },
          { id: 'documentos', label: '📂 Documentos', icon: '📂' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id
                ? 'bg-white text-[#c9962a] shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TAB 1: DASHBOARD - Métricas y Analytics
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'dashboard' && metrics && (
        <div className="space-y-6">
          {/* KPIs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Ingresos Totales', value: `${metrics.overview.totalRevenue.toFixed(2)} €`, color: 'bg-gradient-to-br from-green-500 to-emerald-600', icon: '💰' },
              { label: 'Pedidos Pagados', value: metrics.overview.paidOrders, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', icon: '✅' },
              { label: 'Clientes Únicos', value: metrics.overview.uniqueClients, color: 'bg-gradient-to-br from-purple-500 to-pink-600', icon: '👥' },
              { label: 'Ticket Promedio', value: `${metrics.overview.avgOrderValue.toFixed(2)} €`, color: 'bg-gradient-to-br from-amber-500 to-orange-600', icon: '🎯' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.color} rounded-2xl p-6 text-white shadow-xl`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-sm opacity-90 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Pedidos', value: metrics.overview.totalOrders },
              { label: 'Pendientes', value: metrics.overview.pendingOrders },
              { label: 'Tasa Conversión', value: `${metrics.overview.conversionRate.toFixed(1)}%` },
              { label: 'Tiempo Procesamiento', value: `${metrics.overview.avgProcessingTime.toFixed(1)} días` },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Servicios Más Vendidos</h3>
            <div className="space-y-3">
              {metrics.topServices.map((service, idx) => {
                const maxRevenue = metrics.topServices[0]?.revenue || 1
                const percentage = (service.revenue / maxRevenue) * 100
                return (
                  <div key={service.service} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {SERVICE_LABELS[service.service] || service.service}
                        </p>
                        <p className="text-sm font-bold text-[#c9962a]">{service.revenue.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-[#c9962a] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{service.count} ventas</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Daily Revenue Chart (Simple) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Ingresos Últimos 30 Días</h3>
            <div className="flex items-end justify-between gap-1 h-48">
              {metrics.dailyMetrics.slice(-30).map((day, idx) => {
                const maxRevenue = Math.max(...metrics.dailyMetrics.map(d => d.revenue), 1)
                const height = (day.revenue / maxRevenue) * 100
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-[#c9962a] to-amber-300 rounded-t-lg hover:opacity-80 cursor-pointer transition-opacity relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {new Date(day.date).toLocaleDateString('es', { day: '2-digit', month: 'short' })}
                        <br />
                        {day.revenue.toFixed(0)} € · {day.paid} ventas
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>{new Date(metrics.dailyMetrics[0]?.date).toLocaleDateString('es', { day: '2-digit', month: 'short' })}</span>
              <span>Hoy</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 2: CLIENTES - Base de Datos Completa
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'clientes' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar cliente por email o nombre..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
              />
            </div>
            <p className="text-sm text-gray-500">
              {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contacto</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Pedidos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Ingresos</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fechas</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map(client => (
                    <tr key={client.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9962a] to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{client.name}</p>
                            <p className="text-xs text-gray-500">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{client.phone || '—'}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-gray-900">{client.total_paid}</span>
                          <span className="text-xs text-gray-400">de {client.total_orders}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-lg font-bold text-[#c9962a]">{client.total_revenue.toFixed(2)} €</p>
                        <p className="text-xs text-gray-400">
                          {client.total_paid > 0 ? `${(client.total_revenue / client.total_paid).toFixed(0)} €/pedido` : '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-500">
                          Primera: {new Date(client.first_purchase).toLocaleDateString('es-ES')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Última: {new Date(client.last_purchase).toLocaleDateString('es-ES')}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => {
                            setSearchQuery(client.email)
                            setTab('pedidos')
                          }}
                          className="px-3 py-1.5 bg-[#c9962a] text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition"
                        >
                          Ver pedidos →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 3: PEDIDOS - Lista de pedidos
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'pedidos' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pedido por email o nombre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
            />
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map(req => (
              <div key={req.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {SERVICE_LABELS[req.service_key] || req.service_key}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status === 'paid' ? '✓ PAGADO' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Cliente</p>
                        <p className="text-sm font-semibold text-gray-900">{req.client_name || '—'}</p>
                        <p className="text-xs text-[#c9962a]">{req.client_email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Teléfono</p>
                        <p className="text-sm font-semibold text-gray-900">{req.client_phone || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <span>📅 {new Date(req.created_at).toLocaleString('es-ES')}</span>
                      {req.paid_at && <span>💰 Pagado: {new Date(req.paid_at).toLocaleString('es-ES')}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#c9962a] mb-2">{req.amount_eur || 0} €</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">Paso {req.step || 1}/4</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(step => (
                          <div
                            key={step}
                            className={`w-2 h-2 rounded-full ${
                              step <= (req.step || 1) ? 'bg-[#c9962a]' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {req.session_id && (
                      <a
                        href={`https://dashboard.stripe.com/payments/${req.session_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:underline"
                      >
                        Ver en Stripe ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TAB 4: DOCUMENTOS - Placeholder
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'documentos' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de Documentos</h3>
          <p className="text-gray-500">Funcionalidad en construcción...</p>
        </div>
      )}
    </div>
  )
}
