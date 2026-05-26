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

interface ClientDocument {
  id: string
  request_id: string
  session_id: string
  doc_key: string
  file_name: string
  storage_path: string
  uploaded_at: string
  gestoria_requests: {
    id: string
    client_name: string
    client_email: string
    service_key: string
    created_at: string
  }
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
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientDocuments, setClientDocuments] = useState<ClientDocument[]>([])
  const [allDocuments, setAllDocuments] = useState<ClientDocument[]>([])

  // Cargar métricas y clientes al montar
  useEffect(() => {
    loadAllDocuments()
  }, [])
  
  // Recargar datos cuando cambian las requests
  useEffect(() => {
    setRequests(initialRequests)
    loadClients()
  }, [initialRequests])

  // Cargar documentos del cliente seleccionado
  useEffect(() => {
    if (selectedClient) {
      loadClientDocuments(selectedClient.email)
    }
  }, [selectedClientalRequests)
    loadClients()
  }, [initialRequests])

  async function loadMetrics() {
    try {
      const res = await fetch('/api/admin/metrics')
      const data = await res.json()
      setMetrics(data)
    } catch (err) {
      console.error('Error loading metrics:', err)
    }
  }

  a

  async function loadAllDocuments() {
    try {
      const res = await fetch('/api/admin/documents')
      const data = await res.json()
      setAllDocuments(data.documents || [])
    } catch (err) {
      console.error('Error loading all documents:', err)
    }
  }

  async function loadClientDocuments(email: string) {
    try {
      const res = await fetch(`/api/admin/documents?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      setClientDocuments(data.documents || [])
    } catch (err) {
      console.error('Error loading client documents:', err)
      setClientDocuments([])
    }
  }sync function loadClients() {
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

  // Filtrar solo clientes que han pagado (total_paid > 0)
  const paidClients = clients.filter(c => c.total_paid > 0)
  
  const filteredClients = paidClients.filter(c =>
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
                          onClick={() => setSelectedClient(client)}
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
          TAB 4: DOCUMENTOS - Gestión de Archivos
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'documentos' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar documento por nombre o cliente..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
              />
            </div>
            <p className="text-sm text-gray-500">
              {allDocuments.length} documento{allDocuments.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Documents Grid */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Archivo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Servicio</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Subido</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allDocuments
                    .filter(doc =>
                      doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.gestoria_requests.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.gestoria_requests.client_email?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{doc.file_name}</p>
                              <p className="text-xs text-gray-500">{doc.storage_path}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-gray-900">{doc.gestoria_requests.client_name}</p>
                          <p className="text-xs text-gray-500">{doc.gestoria_requests.client_email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                            {doc.doc_key}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {SERVICE_LABELS[doc.gestoria_requests.service_key] || doc.gestoria_requests.service_key}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {new Date(doc.uploaded_at).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gestoria-docs/${doc.storage_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#c9962a] text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Descargar
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {allDocuments.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No hay documentos</h3>
                <p className="text-gray-500">Los documentos subidos por los clientes aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: DETALLE DEL CLIENTE (PANTALLA COMPLETA)
      ═══════════════════════════════════════════════════════════════ */}
      {selectedClient && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#c9962a] to-amber-600 p-6 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
                {selectedClient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                <p className="text-sm opacity-90">{selectedClient.email}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedClient(null)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-sm opacity-90 mb-2">💰 Total Ingresos</p>
                  <p className="text-4xl font-bold">{selectedClient.total_revenue.toFixed(2)} €</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-sm opacity-90 mb-2">✅ Pedidos Pagados</p>
                  <p className="text-4xl font-bold">{selectedClient.total_paid}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-sm opacity-90 mb-2">🎯 Ticket Promedio</p>
                  <p className="text-4xl font-bold">
                    {selectedClient.total_paid > 0 ? (selectedClient.total_revenue / selectedClient.total_paid).toFixed(0) : '0'} €
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📞 Información de Contacto
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Teléfono</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedClient.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Primera Compra</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(selectedClient.first_purchase).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Última Compra</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(selectedClient.last_purchase).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documentos del Cliente */}
              {clientDocuments.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    📂 Documentos Aportados ({clientDocuments.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clientDocuments.map((doc) => (
                      <div key={doc.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{doc.file_name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-semibold mr-2">
                                {doc.doc_key}
                              </span>
                              {new Date(doc.uploaded_at).toLocaleDateString('es-ES')}
                            </p>
                            <a
                              href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gestoria-docs/${doc.storage_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs text-[#c9962a] hover:text-amber-700 font-semibold"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Descargar
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders List */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  📋 Historial de Pedidos ({selectedClient.total_orders})
                </h3>
                <div className="space-y-4">
                  {selectedClient.orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="text-base font-bold text-gray-900">
                              {SERVICE_LABELS[order.service_key] || order.service_key}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status === 'paid' ? '✓ Pagado' : 'Pendiente'}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              📅 {new Date(order.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                            {order.paid_at && (
                              <span className="flex items-center gap-1">
                                💰 Pagado: {new Date(order.paid_at).toLocaleDateString('es-ES')}
                              </span>
                            )}
                          </div>
                          
                          {/* Notas internas si existen */}
                          {order.internal_notes && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                              <p className="text-xs font-semibold text-amber-800 mb-1">📝 Notas Internas:</p>
                              <p className="text-xs text-amber-700">{order.internal_notes}</p>
                            </div>
                          )}

                          {/* Progreso */}
                          <div className="mt-4 flex items-center gap-3">
                            <span className="text-xs text-gray-600 font-semibold">Progreso:</span>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4].map(step => (
                                <div
                                  key={step}
                                  className={`w-4 h-4 rounded-full ${
                                    step <= (order.step || 1) ? 'bg-[#c9962a]' : 'bg-gray-300'
                                  }`}
                                  title={`Paso ${step}/4`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">Paso {order.step || 1}/4</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#c9962a] mb-3">{order.amount_eur || 0} €</p>
                          {order.session_id && (
                            <a
                              href={`https://dashboard.stripe.com/payments/${order.session_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1"
                            >
                              Ver en Stripe
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="border-t border-gray-200 bg-white p-6 flex justify-between items-center shadow-lg">
            <button
              onClick={() => setSelectedClient(null)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              ← Volver a Clientes
            </button>
            <a
              href={`mailto:${selectedClient.email}`}
              className="px-6 py-3 bg-[#c9962a] text-white rounded-xl font-semibold hover:bg-amber-700 transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Email
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
