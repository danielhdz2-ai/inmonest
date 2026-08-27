'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import AdminExpedienteModal from './AdminExpedienteModal'
import AdminPartesViewerModal from './AdminPartesViewerModal'
import AdminShell, { type AdminTab } from './AdminShell'
import SalesCalendar from './SalesCalendar'
import {
  IconRefresh,
  IconExport,
  IconAudit,
  IconSearch,
  IconEye,
  IconDownload,
  IconClose,
  IconMail,
  IconExternalLink,
  IconWallet,
  IconCheck,
  IconUsers,
  IconTarget,
  IconClock,
  IconFolder,
  IconSales,
  IconHome,
  IconEdit,
  IconTrash,
} from './AdminIcons'

interface GestoriaRequest {
  id: string
  session_id: string | null
  service_key: string
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  amount_eur: number | null
  price_eur?: number | null
  status: string
  step: number | null
  paid_at: string | null
  created_at: string
  tags: string[] | null
  priority: string | null
  internal_notes: string | null
  payment_method?: string | null
  source?: string | null
  contract_path?: string | null
}

type VentasPeriod = 'todo' | 'semana' | 'mes'

function isWithinPeriod(dateStr: string | null | undefined, period: VentasPeriod): boolean {
  if (period === 'todo') return true
  if (!dateStr) return false
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return false
  const now = new Date()
  if (period === 'semana') {
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    return d >= weekAgo && d <= now
  }
  // mes: mes natural en curso
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  stripe: 'Tarjeta (Stripe)',
  transferencia: 'Transferencia',
  bizum: 'Bizum',
  efectivo: 'Efectivo',
  otro: 'Otro',
}

function orderRevenue(r: GestoriaRequest): number {
  return Number(r.amount_eur) || Number(r.price_eur) || 0
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
  source: 'gestoria' | 'usuario'
  doc_key: string
  file_name: string
  storage_path: string
  uploaded_at: string
  bucket: 'gestoria-docs' | 'user-docs'
  client_name: string | null
  client_email: string | null
  service_key: string | null
  partes_data?: Record<string, unknown> | null
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
  'pack-arras-revision-documental': 'Pack Arras Plus — Revisión Documental',
  'arras-confirmatorias': 'Arras Confirmatorias',
  'arras-penitenciales': 'Arras Penitenciales',
  'alquiler-vivienda-lau': 'Alquiler Residencial (LAU)',
  'revision-contrato-arras': 'Revisión Contrato Arras',
  'revision-contrato-alquiler': 'Revisión Contrato Alquiler',
  'compra-completa-parking-trastero': 'Compra Parking/Trastero',
}

interface ClienteGestoria {
  userId: string
  email: string
  name: string
  phone: string | null
  registeredAt: string
  lastSignIn: string
  totalOrders: number
  paidOrders: number
  totalRevenue: number
  orders: Array<{
    id: string
    service_key: string
    amount_eur: number | null
    status: string
    created_at: string
    paid_at: string | null
  }>
  lastOrder: string | null
}

interface ClienteParticular {
  userId: string
  email: string
  name: string
  phone: string | null
  metadata: Record<string, unknown>
  provider: string
  emailConfirmed: boolean
  registeredAt: string
  lastSignIn: string
  favoritos: number
  alertas: number
}

interface PropietarioParticular {
  userId: string
  email: string
  name: string
  phone: string | null
  registeredAt: string
  lastSignIn: string
  totalListings: number
  activeListings: number
  listings: Array<{
    id: string
    title: string
    price_eur: number | null
    operation: string
    city: string | null
    district: string | null
    bedrooms: number | null
    area_m2: number | null
    status: string
    created_at: string
  }>
  contacts: Array<{
    id: string
    listingId: string
    listingTitle: string
    fromName: string
    fromEmail: string
    fromPhone: string | null
    message: string
    createdAt: string
  }>
  firstListing: string | null
  lastListing: string | null
}

interface LeadContacto {
  email: string
  name: string
  phone: string | null
  isRegistered: boolean
  firstContact: string
  lastContact: string
  totalMessages: number
  messages: Array<{
    id: string
    listingId: string
    listingTitle: string
    listingCity: string
    listingPrice: number
    listingOperation: string
    message: string
    createdAt: string
  }>
}

interface BulkEmailTemplateMeta {
  id: string
  name: string
  subject: string
  previewHtml: string
}

function formatDate(value: string, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }) {
  return new Date(value).toLocaleDateString('es-ES', opts)
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'default',
}: {
  label: string
  value: string | number
  icon: (p: { className?: string }) => React.ReactElement
  tone?: 'default' | 'accent'
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
          tone === 'accent' ? 'bg-gold-500/15 text-[#8a6a1e]' : 'bg-gray-100 text-gray-500'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
      </div>
    </div>
  )
}

function ModuleCard({
  title,
  action,
  children,
  className = '',
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-5 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
        {action}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isPaid = status === 'paid'
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
        isPaid ? 'bg-cream-100 text-gold-700 border border-gold-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}
    >
      {isPaid && <IconCheck className="w-3 h-3" />}
      {isPaid ? 'Pagado' : 'Pendiente'}
    </span>
  )
}

export default function AdminPanelPremium({
  initialRequests,
  adminEmail,
}: {
  initialRequests: GestoriaRequest[]
  adminEmail?: string
}) {
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [particularesTab, setParticularesTab] = useState<'gestoria' | 'clientes' | 'propietarios' | 'leads'>('gestoria')
  const [requests, setRequests] = useState<GestoriaRequest[]>(initialRequests)
  const [clients, setClients] = useState<Client[]>([])
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [ventasFilter, setVentasFilter] = useState<'todas' | 'pagadas' | 'pendientes'>('todas')
  const [ventasPeriod, setVentasPeriod] = useState<VentasPeriod>('todo')
  const [manualSaleOpen, setManualSaleOpen] = useState(false)
  const [manualSaleSaving, setManualSaleSaving] = useState(false)
  const [manualSaleError, setManualSaleError] = useState<string | null>(null)
  const [manualSaleForm, setManualSaleForm] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_key: '',
    amount_eur: '',
    payment_method: 'transferencia',
    paid_at: new Date().toISOString().slice(0, 10),
    notes: '',
  })
  const [editSaleTarget, setEditSaleTarget] = useState<GestoriaRequest | null>(null)
  const [editSaleForm, setEditSaleForm] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_key: '',
    amount_eur: '',
    status: 'paid',
    payment_method: 'otro',
    paid_at: '',
    internal_notes: '',
  })
  const [editSaleSaving, setEditSaleSaving] = useState(false)
  const [editSaleError, setEditSaleError] = useState<string | null>(null)
  const [deletingSaleId, setDeletingSaleId] = useState<string | null>(null)
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientDocuments, setClientDocuments] = useState<ClientDocument[]>([])
  const [allDocuments, setAllDocuments] = useState<ClientDocument[]>([])
  const [viewingPartesDoc, setViewingPartesDoc] = useState<ClientDocument | null>(null)

  const [clientesGestoria, setClientesGestoria] = useState<ClienteGestoria[]>([])
  const [clientesParticulares, setClientesParticulares] = useState<ClienteParticular[]>([])
  const [propietariosParticulares, setPropietariosParticulares] = useState<PropietarioParticular[]>([])
  const [leadsContactos, setLeadsContactos] = useState<LeadContacto[]>([])
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<Set<string>>(new Set())
  const [bulkEmailOpen, setBulkEmailOpen] = useState(false)
  const [bulkTemplates, setBulkTemplates] = useState<BulkEmailTemplateMeta[]>([])
  const [bulkTemplateId, setBulkTemplateId] = useState('')
  const [bulkSending, setBulkSending] = useState(false)
  const [bulkResult, setBulkResult] = useState<{ sent: string[]; failed: string[] } | null>(null)
  const [bulkError, setBulkError] = useState<string | null>(null)
  const [selectedPropietario, setSelectedPropietario] = useState<PropietarioParticular | null>(null)
  const [particularesStats, setParticularesStats] = useState({
    totalUsers: 0,
    totalGestoria: 0,
    totalParticulares: 0,
    totalPropietarios: 0,
    totalLeads: 0,
    totalLeadsNoRegistrados: 0,
  })

  const filteredLeads = leadsContactos.filter(
    (lead) =>
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery))
  )

  const allFilteredSelected =
    filteredLeads.length > 0 && filteredLeads.every((l) => selectedLeadEmails.has(l.email))

  function toggleLeadEmail(email: string) {
    setSelectedLeadEmails((prev) => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email)
      else next.add(email)
      return next
    })
  }

  function toggleSelectAllFilteredLeads() {
    setSelectedLeadEmails((prev) => {
      const next = new Set(prev)
      if (allFilteredSelected) {
        filteredLeads.forEach((l) => next.delete(l.email))
      } else {
        filteredLeads.forEach((l) => next.add(l.email))
      }
      return next
    })
  }

  async function openBulkEmailModal() {
    setBulkResult(null)
    setBulkError(null)
    setBulkEmailOpen(true)
    try {
      const res = await fetch('/api/admin/bulk-email')
      const data = await res.json()
      if (!res.ok) {
        setBulkError(data.error || 'No se pudieron cargar las plantillas')
        return
      }
      const templates: BulkEmailTemplateMeta[] = data.templates || []
      setBulkTemplates(templates)
      if (templates.length > 0) {
        setBulkTemplateId((current) =>
          templates.some((t) => t.id === current) ? current : templates[0].id
        )
      }
    } catch {
      setBulkError('Error al cargar plantillas')
    }
  }

  async function sendBulkEmail() {
    if (!bulkTemplateId || selectedLeadEmails.size === 0) return
    setBulkSending(true)
    setBulkError(null)
    setBulkResult(null)
    try {
      const recipients = leadsContactos
        .filter((l) => selectedLeadEmails.has(l.email))
        .map((l) => ({ email: l.email, name: l.name }))

      const res = await fetch('/api/admin/bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: bulkTemplateId, recipients }),
      })
      const data = await res.json()
      if (!res.ok) {
        setBulkError(data.error || 'Error al enviar')
        return
      }
      setBulkResult({ sent: data.sent || [], failed: data.failed || [] })
    } catch {
      setBulkError('Error de red al enviar')
    } finally {
      setBulkSending(false)
    }
  }

  const selectedBulkTemplate = bulkTemplates.find((t) => t.id === bulkTemplateId)

  useEffect(() => {
    loadMetrics()
    loadAllDocuments()
    loadParticulares()
  }, [])

  useEffect(() => {
    setRequests(initialRequests)
    loadClients()
  }, [initialRequests])

  useEffect(() => {
    if (selectedClient) {
      loadClientDocuments(selectedClient.email)
    }
  }, [selectedClient])

  async function loadMetrics() {
    try {
      const res = await fetch('/api/admin/metrics')
      const data = await res.json()
      setMetrics(data)
    } catch (err) {
      console.error('Error loading metrics:', err)
    }
  }

  async function loadAllDocuments() {
    try {
      const res = await fetch('/api/admin/documents')
      const data = await res.json()
      setAllDocuments(data.documents || [])
    } catch (err) {
      console.error('Error loading all documents:', err)
    }
  }

  async function getDocUrl(doc: ClientDocument, mode: 'view' | 'download') {
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storage_path: doc.storage_path,
        bucket: doc.bucket,
        mode,
        file_name: doc.file_name,
      }),
    })
    const data = await res.json()
    return data.url as string | undefined
  }

  function hasPartesData(doc: ClientDocument): doc is ClientDocument & { partes_data: Record<string, unknown> } {
    return Boolean(doc.partes_data && Object.keys(doc.partes_data).length > 0)
  }

  async function handleViewDoc(doc: ClientDocument) {
    if (doc.doc_key === 'partes' && hasPartesData(doc)) {
      setViewingPartesDoc(doc)
      return
    }

    try {
      const url = await getDocUrl(doc, 'view')
      if (url) window.open(url, '_blank')
      else if (doc.doc_key === 'partes') {
        alert('Este documento son datos de partes del formulario, pero aún no hay información guardada.')
      } else {
        alert('No se pudo generar el enlace del documento.')
      }
    } catch {
      alert('Error al abrir el documento.')
    }
  }

  async function handleDownloadDoc(doc: ClientDocument) {
    if (doc.doc_key === 'partes' && hasPartesData(doc)) {
      const blob = new Blob([JSON.stringify(doc.partes_data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.file_name || 'datos-partes.json'
      a.click()
      URL.revokeObjectURL(url)
      return
    }

    try {
      const url = await getDocUrl(doc, 'download')
      if (url) window.open(url, '_blank')
      else alert('No se pudo generar el enlace de descarga.')
    } catch {
      alert('Error al descargar el documento.')
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

  async function loadParticulares() {
    try {
      const res = await fetch('/api/admin/particulares')
      const data = await res.json()
      setClientesGestoria(data.clientesGestoria || [])
      setClientesParticulares(data.clientesParticulares || [])
      setPropietariosParticulares(data.propietariosParticulares || [])
      setLeadsContactos(data.leadsContactos || [])
      setParticularesStats(data.stats || {
        totalUsers: 0,
        totalGestoria: 0,
        totalParticulares: 0,
        totalPropietarios: 0,
        totalLeads: 0,
        totalLeadsNoRegistrados: 0,
      })
    } catch (err) {
      console.error('Error loading particulares:', err)
    }
  }

  async function refreshPedidos() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/pedidos')
      const data = await res.json()
      setRequests(data.requests || [])
      await Promise.all([
        loadMetrics(),
        loadClients(),
        loadAllDocuments(),
      ])
    } catch (err) {
      console.error('Error refreshing pedidos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshPedidos()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

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

  const paidClients = clients.filter(c => c.total_paid > 0)

  const filteredClients = paidClients.filter(c =>
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRequests = requests
    .filter(r =>
      (r.client_email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (r.client_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    )
    .filter(r => {
      if (ventasFilter === 'pagadas') return r.status === 'paid'
      if (ventasFilter === 'pendientes') return r.status !== 'paid'
      return true
    })
    .filter(r => isWithinPeriod(r.paid_at || r.created_at, ventasPeriod))

  const periodTotal = filteredRequests
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + orderRevenue(r), 0)

  // Calendario: se calcula directamente de "requests" (todo el histórico, sin
  // límite de 30 días) usando la fecha real de pago (paid_at, con fallback a
  // created_at) para que coincida exactamente con la tabla de Ventas y con
  // cualquier mes al que se navegue (mayo, junio...).
  const calendarDailyMetrics = useMemo(() => {
    const map = new Map<
      string,
      { revenue: number; paid: number; orders: number; items: Array<{ id: string; name: string; email: string | null; service: string; amount: number; time: string }> }
    >()

    requests.forEach(r => {
      if (r.status !== 'paid') return
      const source = r.paid_at || r.created_at
      if (!source) return
      const d = new Date(source)
      if (Number.isNaN(d.getTime())) return
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

      const entry = map.get(dateStr) || { revenue: 0, paid: 0, orders: 0, items: [] }
      entry.revenue += orderRevenue(r)
      entry.paid += 1
      entry.orders += 1
      entry.items.push({
        id: r.id,
        name: r.client_name || r.client_email || 'Cliente',
        email: r.client_email,
        service: SERVICE_LABELS[r.service_key] || r.service_key,
        amount: orderRevenue(r),
        time: d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      })
      map.set(dateStr, entry)
    })

    return Array.from(map.entries())
      .map(([date, v]) => ({
        date,
        ...v,
        items: v.items.sort((a, b) => a.time.localeCompare(b.time)),
      }))
  }, [requests])

  async function handleCreateManualSale(e: React.FormEvent) {
    e.preventDefault()
    setManualSaleError(null)
    const amount = Number(manualSaleForm.amount_eur)
    if (!manualSaleForm.client_name.trim()) {
      setManualSaleError('Falta el nombre del cliente')
      return
    }
    if (!manualSaleForm.client_email.trim().includes('@')) {
      setManualSaleError('Email no válido')
      return
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setManualSaleError('Importe no válido')
      return
    }
    setManualSaleSaving(true)
    try {
      const res = await fetch('/api/admin/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manualSaleForm,
          service_name: manualSaleForm.service_key
            ? (SERVICE_LABELS[manualSaleForm.service_key] || manualSaleForm.service_key)
            : 'Venta manual',
          amount_eur: amount,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setManualSaleError(data.error || 'No se pudo registrar la venta')
        return
      }
      setManualSaleOpen(false)
      setManualSaleForm({
        client_name: '',
        client_email: '',
        client_phone: '',
        service_key: '',
        amount_eur: '',
        payment_method: 'transferencia',
        paid_at: new Date().toISOString().slice(0, 10),
        notes: '',
      })
      await refreshPedidos()
    } catch {
      setManualSaleError('Error de red al registrar la venta')
    } finally {
      setManualSaleSaving(false)
    }
  }

  function openEditSale(req: GestoriaRequest) {
    setEditSaleError(null)
    setEditSaleTarget(req)
    setEditSaleForm({
      client_name: req.client_name || '',
      client_email: req.client_email || '',
      client_phone: req.client_phone || '',
      service_key: req.service_key || '',
      amount_eur: req.amount_eur != null ? String(req.amount_eur) : '',
      status: req.status || 'paid',
      payment_method: req.payment_method || (req.session_id ? 'stripe' : 'otro'),
      paid_at: req.paid_at ? req.paid_at.slice(0, 10) : '',
      internal_notes: req.internal_notes || '',
    })
  }

  async function handleUpdateSale(e: React.FormEvent) {
    e.preventDefault()
    if (!editSaleTarget) return
    setEditSaleError(null)
    const amount = Number(editSaleForm.amount_eur)
    if (!editSaleForm.client_name.trim()) {
      setEditSaleError('Falta el nombre del cliente')
      return
    }
    if (!editSaleForm.client_email.trim().includes('@')) {
      setEditSaleError('Email no válido')
      return
    }
    if (!Number.isFinite(amount) || amount < 0) {
      setEditSaleError('Importe no válido')
      return
    }
    setEditSaleSaving(true)
    try {
      const res = await fetch(`/api/admin/pedidos/${editSaleTarget.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: editSaleForm.client_name,
          client_email: editSaleForm.client_email,
          client_phone: editSaleForm.client_phone,
          service_key: editSaleForm.service_key,
          service_name: SERVICE_LABELS[editSaleForm.service_key] || editSaleForm.service_key,
          amount_eur: amount,
          status: editSaleForm.status,
          payment_method: editSaleForm.payment_method,
          paid_at: editSaleForm.paid_at,
          internal_notes: editSaleForm.internal_notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setEditSaleError(data.error || 'No se pudo actualizar la venta')
        return
      }
      setEditSaleTarget(null)
      await refreshPedidos()
    } catch {
      setEditSaleError('Error de red al actualizar la venta')
    } finally {
      setEditSaleSaving(false)
    }
  }

  async function handleDeleteParticular(cliente: ClienteParticular) {
    const label = cliente.name || cliente.email
    if (
      !window.confirm(
        `¿Dar de baja a "${label}" (${cliente.email})?\n\nSe eliminará la cuenta, favoritos y perfil. Esta acción no se puede deshacer.`
      )
    ) {
      return
    }
    setDeletingUserId(cliente.userId)
    try {
      const res = await fetch(`/api/admin/usuarios/${cliente.userId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'No se pudo dar de baja al usuario')
        return
      }
      setClientesParticulares((prev) => prev.filter((c) => c.userId !== cliente.userId))
      await loadParticulares()
    } catch {
      alert('Error de red al dar de baja al usuario')
    } finally {
      setDeletingUserId(null)
    }
  }

  async function handleDeleteSale(req: GestoriaRequest) {
    const label = req.client_name || req.client_email || 'esta venta'
    if (!window.confirm(`¿Eliminar definitivamente el pedido de "${label}"? Esta acción no se puede deshacer.`)) {
      return
    }
    setDeletingSaleId(req.id)
    try {
      const res = await fetch(`/api/admin/pedidos/${req.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'No se pudo eliminar la venta')
        return
      }
      setRequests((prev) => prev.filter((r) => r.id !== req.id))
      await Promise.all([loadMetrics(), loadClients(), loadParticulares()])
    } catch {
      alert('Error de red al eliminar la venta')
    } finally {
      setDeletingSaleId(null)
    }
  }

  const topbarActions = (
    <>
      <button
        onClick={refreshPedidos}
        disabled={loading}
        className="px-3.5 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
      >
        <IconRefresh className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Actualizando…' : 'Actualizar'}
      </button>
      <Link
        href="/gestoria/ciudades"
        className="px-3.5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1.5"
      >
        <IconAudit className="w-3.5 h-3.5" />
        Auditoría SEO
      </Link>
      <button
        onClick={exportToCSV}
        className="px-3.5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1.5"
      >
        <IconExport className="w-3.5 h-3.5" />
        Exportar CSV
      </button>
      <div className="hidden xl:flex items-center gap-1.5 pl-1">
        <span className="w-1.5 h-1.5 rounded-full bg-cream-1000 animate-pulse" />
        <span className="text-[11px] text-gray-400">Auto-refresh 30s</span>
      </div>
    </>
  )

  const TAB_META: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard', subtitle: 'Control total de Inmonest' },
    ventas: { title: 'Ventas', subtitle: 'Seguimiento de ingresos y pedidos' },
    expedientes: { title: 'Expedientes', subtitle: 'Clientes de gestoría inmobiliaria' },
    particulares: { title: 'Base de datos de particulares', subtitle: 'Compradores, propietarios y leads' },
    documentos: { title: 'Documentos', subtitle: 'Archivos subidos por los clientes' },
  }

  return (
    <AdminShell
      activeTab={tab}
      onTabChange={setTab}
      title={TAB_META[tab].title}
      subtitle={TAB_META[tab].subtitle}
      actions={topbarActions}
      adminEmail={adminEmail}
    >
      {/* ═══════════════════════════════════════════════════════════════
          DASHBOARD
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'dashboard' && metrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Ingresos totales" value={`${metrics.overview.totalRevenue.toFixed(2)} €`} icon={IconWallet} tone="accent" />
            <StatCard label="Pedidos pagados" value={metrics.overview.paidOrders} icon={IconCheck} />
            <StatCard label="Clientes únicos" value={metrics.overview.uniqueClients} icon={IconUsers} />
            <StatCard label="Ticket promedio" value={`${metrics.overview.avgOrderValue.toFixed(2)} €`} icon={IconTarget} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <ModuleCard title="Resumen operativo">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total pedidos', value: metrics.overview.totalOrders },
                  { label: 'Pendientes', value: metrics.overview.pendingOrders },
                  { label: 'Tasa conversión', value: `${metrics.overview.conversionRate.toFixed(1)}%` },
                  { label: 'Tiempo proceso', value: `${metrics.overview.avgProcessingTime.toFixed(1)} días` },
                ].map(stat => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl border border-gray-100 p-3.5">
                    <p className="text-[11px] text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </ModuleCard>

            <ModuleCard title="Servicios más vendidos">
              <div className="space-y-3">
                {metrics.topServices.length === 0 && (
                  <p className="text-sm text-gray-400 py-6 text-center">Sin ventas registradas todavía.</p>
                )}
                {metrics.topServices.map((service, idx) => {
                  const maxRevenue = metrics.topServices[0]?.revenue || 1
                  const percentage = (service.revenue / maxRevenue) * 100
                  return (
                    <div key={service.service} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {SERVICE_LABELS[service.service] || service.service}
                          </p>
                          <p className="text-xs font-bold text-[#8a6a1e] flex-shrink-0">{service.revenue.toFixed(2)} €</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className="bg-gold-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-400 flex-shrink-0">{service.count} ventas</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ModuleCard>

            <ModuleCard title="Calendario">
              <SalesCalendar dailyMetrics={calendarDailyMetrics} compact />
            </ModuleCard>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          EXPEDIENTES (antes "Clientes Gestoría")
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'expedientes' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar expediente por email o nombre..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
              />
            </div>
            <p className="text-sm text-gray-500 flex-shrink-0">
              {filteredClients.length} expediente{filteredClients.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Cliente</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                    <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Pedidos</th>
                    <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Ingresos</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Fechas</th>
                    <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Expediente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map(client => (
                    <tr key={client.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{client.name}</p>
                            <p className="text-xs text-gray-500 truncate">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{client.phone || '—'}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-0.5">
                          <span className="text-base font-bold text-gray-900">{client.total_paid}</span>
                          <span className="text-[11px] text-gray-400">de {client.total_orders}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-base font-bold text-[#8a6a1e]">{client.total_revenue.toFixed(2)} €</p>
                        <p className="text-[11px] text-gray-400">
                          {client.total_paid > 0 ? `${(client.total_revenue / client.total_paid).toFixed(0)} €/pedido` : '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-500">Primera: {formatDate(client.first_purchase)}</p>
                        <p className="text-xs text-gray-500">Última: {formatDate(client.last_purchase)}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition"
                        >
                          Ver expediente
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredClients.length === 0 && (
              <div className="p-14 text-center">
                <IconFolder className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">No hay expedientes</h3>
                <p className="text-sm text-gray-500">Los clientes que contraten servicios aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          VENTAS (antes "Pedidos")
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'ventas' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 relative">
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar venta por email o nombre..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                />
              </div>
              <button
                type="button"
                onClick={() => setManualSaleOpen(true)}
                className="px-3.5 py-2.5 bg-gold-500 text-white rounded-lg text-xs font-semibold hover:bg-[#b8841e] transition flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                + Venta manual
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg flex-shrink-0">
                {([
                  { id: 'todas', label: 'Todas' },
                  { id: 'pagadas', label: 'Pagadas' },
                  { id: 'pendientes', label: 'Pendientes' },
                ] as const).map(f => (
                  <button
                    key={f.id}
                    onClick={() => setVentasFilter(f.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      ventasFilter === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg flex-shrink-0">
                {([
                  { id: 'semana', label: 'Esta semana' },
                  { id: 'mes', label: 'Este mes' },
                  { id: 'todo', label: 'Todo' },
                ] as const).map(f => (
                  <button
                    key={f.id}
                    onClick={() => setVentasPeriod(f.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      ventasPeriod === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 sm:ml-auto">
                {filteredRequests.length} venta{filteredRequests.length !== 1 ? 's' : ''} ·{' '}
                <span className="font-bold text-[#8a6a1e]">{periodTotal.toFixed(2)} €</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Cliente</th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Servicio</th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
                      <th className="px-5 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                      <th className="px-5 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Importe</th>
                      <th className="px-5 py-3 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.map(req => (
                      <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-semibold text-gray-900">{req.client_name || '—'}</p>
                          <p className="text-xs text-gray-500">{req.client_email}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm text-gray-700">{SERVICE_LABELS[req.service_key] || req.service_key}</p>
                          {req.session_id && (
                            <a
                              href={`https://dashboard.stripe.com/payments/${req.session_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-1"
                            >
                              Ver en Stripe
                              <IconExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {!req.session_id && req.payment_method && (
                            <span className="text-[11px] text-gray-400">
                              {PAYMENT_METHOD_LABELS[req.payment_method] || req.payment_method}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-xs text-gray-500">{new Date(req.created_at).toLocaleString('es-ES')}</p>
                          {req.paid_at && (
                            <p className="text-[11px] text-gold-600">Pagado: {new Date(req.paid_at).toLocaleDateString('es-ES')}</p>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <p className="text-sm font-bold text-gray-900">{req.amount_eur || 0} €</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditSale(req)}
                              className="p-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                              title="Editar"
                            >
                              <IconEdit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSale(req)}
                              disabled={deletingSaleId === req.id}
                              className="p-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                              title="Eliminar"
                            >
                              <IconTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredRequests.length === 0 && (
                <div className="p-14 text-center">
                  <IconSales className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-1">No hay ventas</h3>
                  <p className="text-sm text-gray-500">Los pedidos realizados aparecerán aquí.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <SalesCalendar dailyMetrics={calendarDailyMetrics} compact />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DOCUMENTOS
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'documentos' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar documento por nombre o cliente..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
              />
            </div>
            <p className="text-sm text-gray-500 flex-shrink-0">
              {allDocuments.length} documento{allDocuments.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Archivo</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Cliente</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Tipo</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Servicio</th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Subido</th>
                    <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allDocuments
                    .filter(doc =>
                      doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.client_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.doc_key.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(doc => (
                      <tr key={`${doc.source}-${doc.id}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <IconFolder className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate max-w-[220px]">{doc.file_name}</p>
                              <p className="text-[11px] text-gray-400 truncate max-w-[220px]">{doc.storage_path}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <p className="text-sm font-semibold text-gray-900">{doc.client_name || '—'}</p>
                          <p className="text-xs text-gray-500">{doc.client_email || '—'}</p>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-semibold rounded">
                            {doc.doc_key}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <p className="text-sm text-gray-600">
                            {doc.service_key
                              ? (SERVICE_LABELS[doc.service_key] || doc.service_key)
                              : doc.source === 'usuario' ? 'Documento personal' : '—'}
                          </p>
                        </td>
                        <td className="px-6 py-3.5">
                          <p className="text-sm text-gray-600">{formatDate(doc.uploaded_at)}</p>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleViewDoc(doc)}
                              className="p-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                              title="Ver"
                            >
                              <IconEye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadDoc(doc)}
                              className="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
                              title="Descargar"
                            >
                              <IconDownload className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {allDocuments.length === 0 && (
              <div className="p-14 text-center">
                <IconFolder className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">No hay documentos</h3>
                <p className="text-sm text-gray-500">Los documentos subidos por los clientes aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PARTICULARES
      ═══════════════════════════════════════════════════════════════ */}
      {tab === 'particulares' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Total usuarios" value={particularesStats.totalUsers} icon={IconUsers} tone="accent" />
            <StatCard label="Clientes gestoría" value={particularesStats.totalGestoria} icon={IconFolder} />
            <StatCard label="Clientes particulares" value={particularesStats.totalParticulares} icon={IconUsers} />
            <StatCard label="Propietarios" value={particularesStats.totalPropietarios} icon={IconHome} />
          </div>

          <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl w-fit overflow-x-auto">
            {([
              { id: 'gestoria', label: 'Clientes gestoría', count: clientesGestoria.length },
              { id: 'clientes', label: 'Clientes particulares', count: clientesParticulares.length },
              { id: 'propietarios', label: 'Propietarios', count: propietariosParticulares.length },
              { id: 'leads', label: 'Leads / Contactos', count: leadsContactos.length },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setParticularesTab(t.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  particularesTab === t.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t.label} <span className="ml-1 opacity-60">({t.count})</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por email, nombre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
            />
          </div>

          {particularesTab === 'gestoria' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Cliente</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Pedidos</th>
                      <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Ingresos</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Registrado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clientesGestoria
                      .filter(c =>
                        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(cliente => (
                        <tr key={cliente.userId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                                {cliente.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{cliente.name}</p>
                                <p className="text-xs text-gray-500">{cliente.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{cliente.phone || '—'}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <div className="inline-flex flex-col items-center gap-0.5">
                              <span className="text-base font-bold text-gray-900">{cliente.paidOrders}</span>
                              <span className="text-[11px] text-gray-400">de {cliente.totalOrders}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <p className="text-base font-bold text-[#8a6a1e]">{cliente.totalRevenue.toFixed(2)} €</p>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-xs text-gray-500">{formatDate(cliente.registeredAt)}</p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {clientesGestoria.length === 0 && (
                <div className="p-14 text-center">
                  <IconFolder className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-1">No hay clientes de gestoría</h3>
                  <p className="text-sm text-gray-500">Los clientes que contraten servicios aparecerán aquí.</p>
                </div>
              )}
            </div>
          )}

          {particularesTab === 'clientes' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Usuario</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Teléfono</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Proveedor</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Email verificado</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Registrado</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Último acceso</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clientesParticulares
                      .filter(c =>
                        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(cliente => (
                        <tr key={cliente.userId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                                {cliente.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{cliente.name}</p>
                                <p className="text-xs text-gray-500">{cliente.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-900 font-mono">{cliente.phone || '—'}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600">
                              {cliente.provider === 'google' ? 'Google' : 'Email'}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            {cliente.emailConfirmed ? (
                              <IconCheck className="w-4 h-4 text-gold-600 mx-auto" />
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{formatDate(cliente.registeredAt)}</p>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{formatDate(cliente.lastSignIn)}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteParticular(cliente)}
                              disabled={deletingUserId === cliente.userId}
                              className="px-3.5 py-1.5 bg-white border border-red-200 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deletingUserId === cliente.userId ? 'Eliminando…' : 'Dar de baja'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {clientesParticulares.length === 0 && (
                <div className="p-14 text-center">
                  <IconUsers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-1">No hay clientes particulares</h3>
                  <p className="text-sm text-gray-500">Los usuarios registrados aparecerán aquí.</p>
                </div>
              )}
            </div>
          )}

          {particularesTab === 'propietarios' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Propietario</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Anuncios</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contactos</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Registrado</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {propietariosParticulares
                      .filter(p =>
                        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(propietario => (
                        <tr key={propietario.userId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                                {propietario.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{propietario.name}</p>
                                <p className="text-xs text-gray-500">{propietario.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{propietario.phone || '—'}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <div className="inline-flex flex-col items-center gap-0.5">
                              <span className="text-base font-bold text-gray-900">{propietario.activeListings}</span>
                              <span className="text-[11px] text-gray-400">de {propietario.totalListings}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              propietario.contacts.length > 0 ? 'bg-cream-100 text-gold-700' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {propietario.contacts.length}
                            </span>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-xs text-gray-500">{formatDate(propietario.registeredAt)}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <button
                              onClick={() => setSelectedPropietario(propietario)}
                              className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition"
                            >
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {propietariosParticulares.length === 0 && (
                <div className="p-14 text-center">
                  <IconHome className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-1">No hay propietarios</h3>
                  <p className="text-sm text-gray-500">Los propietarios que publiquen pisos aparecerán aquí.</p>
                </div>
              )}
            </div>
          )}

          {particularesTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={toggleSelectAllFilteredLeads}
                      className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-[#c9962a]"
                    />
                    Seleccionar todos ({filteredLeads.length})
                  </label>
                  {selectedLeadEmails.size > 0 && (
                    <span className="text-sm font-semibold text-[#8a6a1e]">
                      {selectedLeadEmails.size} seleccionados
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  disabled={selectedLeadEmails.size === 0}
                  onClick={openBulkEmailModal}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Enviar email ({selectedLeadEmails.size})
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3.5 w-12" />
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Teléfono</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Mensajes</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Primer contacto</th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Último contacto</th>
                      <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLeads.map(lead => (
                        <tr key={lead.email} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3.5">
                            <input
                              type="checkbox"
                              checked={selectedLeadEmails.has(lead.email)}
                              onChange={() => toggleLeadEmail(lead.email)}
                              className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-[#c9962a]"
                            />
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                                lead.isRegistered ? 'bg-gold-600' : 'bg-gray-400'
                              }`}>
                                {lead.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                                <p className="text-xs text-gray-500">{lead.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-900 font-mono">{lead.phone || '—'}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold text-xs">
                              {lead.totalMessages}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            {lead.isRegistered ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cream-100 text-gold-700 border border-gold-200">
                                Registrado
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                No registrado
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{formatDate(lead.firstContact)}</p>
                          </td>
                          <td className="px-6 py-3.5">
                            <p className="text-sm text-gray-600">{formatDate(lead.lastContact)}</p>
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <button
                              onClick={() => {
                                alert(`Mensajes de ${lead.name}:\n\n${lead.messages.map(m =>
                                  `${m.listingTitle} (${m.listingCity})\n${m.message}\n${new Date(m.createdAt).toLocaleString('es-ES')}`
                                ).join('\n\n───────────\n\n')}`)
                              }}
                              className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition"
                            >
                              Ver mensajes
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {leadsContactos.length === 0 && (
                <div className="p-14 text-center">
                  <IconMail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-1">No hay leads / contactos</h3>
                  <p className="text-sm text-gray-500">Los contactos que envíen mensajes aparecerán aquí.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: NUEVA VENTA MANUAL (transferencia, Bizum, efectivo...)
      ═══════════════════════════════════════════════════════════════ */}
      {manualSaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Registrar venta manual</h2>
                <p className="text-sm text-gray-500">Para pagos por transferencia, Bizum o efectivo</p>
              </div>
              <button
                type="button"
                onClick={() => !manualSaleSaving && setManualSaleOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
                aria-label="Cerrar"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualSale} className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Nombre del cliente</label>
                  <input
                    type="text"
                    required
                    value={manualSaleForm.client_name}
                    onChange={e => setManualSaleForm(f => ({ ...f, client_name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                    placeholder="Nombre y apellidos"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={manualSaleForm.client_email}
                    onChange={e => setManualSaleForm(f => ({ ...f, client_email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                    placeholder="cliente@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    value={manualSaleForm.client_phone}
                    onChange={e => setManualSaleForm(f => ({ ...f, client_phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                    placeholder="+34 6XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Servicio</label>
                  <select
                    value={manualSaleForm.service_key}
                    onChange={e => setManualSaleForm(f => ({ ...f, service_key: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  >
                    <option value="">Otro / no listado</option>
                    {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Importe (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={manualSaleForm.amount_eur}
                    onChange={e => setManualSaleForm(f => ({ ...f, amount_eur: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                    placeholder="61"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Fecha de pago</label>
                  <input
                    type="date"
                    value={manualSaleForm.paid_at}
                    onChange={e => setManualSaleForm(f => ({ ...f, paid_at: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Método de pago</label>
                <div className="flex gap-2 flex-wrap">
                  {(['transferencia', 'bizum', 'efectivo', 'otro'] as const).map(pm => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setManualSaleForm(f => ({ ...f, payment_method: pm }))}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
                        manualSaleForm.payment_method === pm
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {PAYMENT_METHOD_LABELS[pm]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Notas (opcional)</label>
                <textarea
                  value={manualSaleForm.notes}
                  onChange={e => setManualSaleForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a] resize-none"
                  placeholder="Referencia de la transferencia, contexto, etc."
                />
              </div>

              {manualSaleError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {manualSaleError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={manualSaleSaving}
                  onClick={() => setManualSaleOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={manualSaleSaving}
                  className="px-5 py-2 bg-gold-500 text-white text-sm font-semibold rounded-lg hover:bg-[#b8841e] transition disabled:opacity-50"
                >
                  {manualSaleSaving ? 'Guardando…' : 'Registrar venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: EDITAR VENTA / PEDIDO
      ═══════════════════════════════════════════════════════════════ */}
      {editSaleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Editar venta</h2>
                <p className="text-sm text-gray-500">{editSaleTarget.client_email}</p>
              </div>
              <button
                type="button"
                onClick={() => !editSaleSaving && setEditSaleTarget(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
                aria-label="Cerrar"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSale} className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Nombre del cliente</label>
                  <input
                    type="text"
                    required
                    value={editSaleForm.client_name}
                    onChange={e => setEditSaleForm(f => ({ ...f, client_name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={editSaleForm.client_email}
                    onChange={e => setEditSaleForm(f => ({ ...f, client_email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    value={editSaleForm.client_phone}
                    onChange={e => setEditSaleForm(f => ({ ...f, client_phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Servicio</label>
                  <select
                    value={editSaleForm.service_key}
                    onChange={e => setEditSaleForm(f => ({ ...f, service_key: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  >
                    <option value={editSaleForm.service_key}>
                      {SERVICE_LABELS[editSaleForm.service_key] || editSaleForm.service_key || 'Otro'}
                    </option>
                    {Object.entries(SERVICE_LABELS)
                      .filter(([key]) => key !== editSaleForm.service_key)
                      .map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Importe (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={editSaleForm.amount_eur}
                    onChange={e => setEditSaleForm(f => ({ ...f, amount_eur: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Fecha de pago</label>
                  <input
                    type="date"
                    value={editSaleForm.paid_at}
                    onChange={e => setEditSaleForm(f => ({ ...f, paid_at: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Estado</label>
                  <div className="flex gap-2 flex-wrap">
                    {(['paid', 'pending', 'lead'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setEditSaleForm(f => ({ ...f, status: st }))}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
                          editSaleForm.status === st
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {st === 'paid' ? 'Pagado' : st === 'pending' ? 'Pendiente' : 'Lead'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Método de pago</label>
                  <select
                    value={editSaleForm.payment_method}
                    onChange={e => setEditSaleForm(f => ({ ...f, payment_method: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                  >
                    {Object.entries(PAYMENT_METHOD_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">Notas internas</label>
                <textarea
                  value={editSaleForm.internal_notes}
                  onChange={e => setEditSaleForm(f => ({ ...f, internal_notes: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a] resize-none"
                />
              </div>

              {editSaleError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {editSaleError}
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  disabled={editSaleSaving}
                  onClick={() => {
                    setEditSaleTarget(null)
                    handleDeleteSale(editSaleTarget)
                  }}
                  className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1.5"
                >
                  <IconTrash className="w-4 h-4" />
                  Eliminar
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={editSaleSaving}
                    onClick={() => setEditSaleTarget(null)}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={editSaleSaving}
                    className="px-5 py-2 bg-gold-500 text-white text-sm font-semibold rounded-lg hover:bg-[#b8841e] transition disabled:opacity-50"
                  >
                    {editSaleSaving ? 'Guardando…' : 'Guardar cambios'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: ENVÍO MASIVO EMAIL A LEADS
      ═══════════════════════════════════════════════════════════════ */}
      {bulkEmailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Enviar email a leads</h2>
                <p className="text-sm text-gray-500">
                  {selectedLeadEmails.size} destinatario{selectedLeadEmails.size === 1 ? '' : 's'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => !bulkSending && setBulkEmailOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
                aria-label="Cerrar"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Plantilla</label>
                <select
                  value={bulkTemplateId}
                  onChange={(e) => {
                    setBulkTemplateId(e.target.value)
                    setBulkResult(null)
                  }}
                  disabled={bulkSending}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
                >
                  {bulkTemplates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                {selectedBulkTemplate && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Asunto:</span> {selectedBulkTemplate.subject}
                  </p>
                )}
              </div>

              {selectedBulkTemplate && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Vista previa</p>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 max-h-72 overflow-y-auto">
                    <iframe
                      title="Vista previa email"
                      srcDoc={selectedBulkTemplate.previewHtml}
                      className="w-full h-72 bg-white"
                      sandbox=""
                    />
                  </div>
                </div>
              )}

              {bulkError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {bulkError}
                </div>
              )}

              {bulkResult && (
                <div className="rounded-lg bg-cream-100 border border-gold-200 px-4 py-3 text-sm text-gold-800 space-y-1">
                  <p className="font-semibold">Envío completado</p>
                  <p>Enviados: {bulkResult.sent.length}</p>
                  <p>Fallidos: {bulkResult.failed.length}</p>
                  {bulkResult.failed.length > 0 && (
                    <p className="text-xs text-red-600 break-all">
                      Fallidos: {bulkResult.failed.join(', ')}
                    </p>
                  )}
                </div>
              )}

              {bulkSending && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  Enviando emails… puede tardar unos segundos (unos {selectedLeadEmails.size} destinatarios).
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                disabled={bulkSending}
                onClick={() => setBulkEmailOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition"
              >
                {bulkResult ? 'Cerrar' : 'Cancelar'}
              </button>
              {!bulkResult && (
                <button
                  type="button"
                  disabled={bulkSending || !bulkTemplateId || selectedLeadEmails.size === 0}
                  onClick={sendBulkEmail}
                  className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {bulkSending ? 'Enviando…' : `Confirmar envío (${selectedLeadEmails.size})`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL: EXPEDIENTE DEL CLIENTE (PANTALLA COMPLETA)
      ═══════════════════════════════════════════════════════════════ */}
      {selectedClient && (
        <AdminExpedienteModal
          client={selectedClient}
          documents={clientDocuments}
          serviceLabels={SERVICE_LABELS}
          onClose={() => setSelectedClient(null)}
          onRefreshDocuments={() => loadClientDocuments(selectedClient.email)}
          onRefreshOrders={refreshPedidos}
          onViewDoc={(doc) => void handleViewDoc(doc as ClientDocument)}
          onDownloadDoc={(doc) => void handleDownloadDoc(doc as ClientDocument)}
          formatDate={formatDate}
        />
      )}

      {viewingPartesDoc && hasPartesData(viewingPartesDoc) && (
        <AdminPartesViewerModal
          fileName={viewingPartesDoc.file_name}
          clientName={viewingPartesDoc.client_name}
          clientEmail={viewingPartesDoc.client_email}
          uploadedAt={viewingPartesDoc.uploaded_at}
          partesData={viewingPartesDoc.partes_data}
          formatDate={formatDate}
          onClose={() => setViewingPartesDoc(null)}
        />
      )}

      {/* MODAL PROPIETARIO — placeholder removed expediente inline modal */}
      {selectedPropietario && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
          <div className="bg-[#0a1410] p-6 text-white flex items-center justify-between shadow-lg flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-[#f4d98a]">
                {selectedPropietario.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gold-500">Propietario particular</p>
                <h2 className="text-xl font-bold">{selectedPropietario.name}</h2>
                <p className="text-sm text-white/60">{selectedPropietario.email}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedPropietario(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-5 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Total anuncios" value={selectedPropietario.totalListings} icon={IconHome} tone="accent" />
                <StatCard label="Anuncios activos" value={selectedPropietario.activeListings} icon={IconCheck} />
                <StatCard label="Contactos recibidos" value={selectedPropietario.contacts.length} icon={IconMail} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Información de contacto</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] text-gray-500 mb-1 font-semibold uppercase">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedPropietario.email}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 mb-1 font-semibold uppercase">Teléfono</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedPropietario.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 mb-1 font-semibold uppercase">Fecha de registro</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(selectedPropietario.registeredAt, { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  {selectedPropietario.firstListing && (
                    <div>
                      <p className="text-[11px] text-gray-500 mb-1 font-semibold uppercase">Primer anuncio</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatDate(selectedPropietario.firstListing, { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {selectedPropietario.contacts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Mensajes de contacto ({selectedPropietario.contacts.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedPropietario.contacts.map((contact) => (
                      <div key={contact.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                {contact.fromName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{contact.fromName}</p>
                                <p className="text-xs text-gray-500">{contact.fromEmail}</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                              Anuncio: <span className="font-semibold text-gray-700">{contact.listingTitle}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                            {contact.fromPhone && (
                              <p className="text-xs font-semibold text-gray-700 mt-1">{contact.fromPhone}</p>
                            )}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 mb-2">Mensaje</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">
                  Anuncios publicados ({selectedPropietario.totalListings})
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedPropietario.listings.map((listing) => (
                    <div key={listing.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-sm font-bold text-gray-900">{listing.title}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              listing.status === 'published' ? 'bg-cream-100 text-gold-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {listing.status === 'published' ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-[11px] text-gray-500">Ubicación</p>
                              <p className="text-sm font-semibold text-gray-900">{listing.city || '—'}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-gray-500">Operación</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {listing.operation === 'rent' ? 'Alquiler' : 'Venta'}
                              </p>
                            </div>
                            {listing.bedrooms && (
                              <div>
                                <p className="text-[11px] text-gray-500">Habitaciones</p>
                                <p className="text-sm font-semibold text-gray-900">{listing.bedrooms}</p>
                              </div>
                            )}
                            {listing.area_m2 && (
                              <div>
                                <p className="text-[11px] text-gray-500">Superficie</p>
                                <p className="text-sm font-semibold text-gray-900">{listing.area_m2} m²</p>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            Publicado: {formatDate(listing.created_at, { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold text-gray-900 mb-2">
                            {listing.price_eur ? `${listing.price_eur.toLocaleString('es-ES')} €` : 'Consultar'}
                          </p>
                          <a
                            href={`https://inmonest.com/pisos/${listing.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1"
                          >
                            Ver anuncio
                            <IconExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white p-5 sm:p-6 flex justify-between items-center shadow-lg flex-shrink-0">
            <button
              onClick={() => setSelectedPropietario(null)}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm"
            >
              Volver a particulares
            </button>
            <a
              href={`mailto:${selectedPropietario.email}`}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition inline-flex items-center gap-2 text-sm"
            >
              <IconMail className="w-4 h-4" />
              Enviar email
            </a>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
