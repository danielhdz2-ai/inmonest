'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  IconClose,
  IconMail,
  IconDownload,
  IconEye,
  IconFolder,
  IconClock,
  IconExternalLink,
} from '@/app/admin/AdminIcons'
import { WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'
import { activityIcon } from '@/lib/gestoria-activity'

export type ExpedienteOrder = {
  id: string
  session_id: string | null
  service_key: string
  client_name: string | null
  client_email: string | null
  amount_eur: number | null
  price_eur?: number | null
  status: string
  step: number | null
  paid_at: string | null
  created_at: string
  internal_notes: string | null
  contract_path?: string | null
}

export type ExpedienteClient = {
  email: string
  name: string
  phone: string | null
  first_purchase: string
  last_purchase: string
  total_orders: number
  total_paid: number
  total_revenue: number
  orders: ExpedienteOrder[]
}

export type ExpedienteDocument = {
  id: string
  doc_key: string
  file_name: string
  uploaded_at: string
  storage_path?: string
  bucket?: string
  source?: string
  client_name?: string | null
  client_email?: string | null
  service_key?: string | null
}

type ActivityRow = {
  id: string
  activity_type: string
  description: string
  created_at: string
  created_by: string | null
}

type Props = {
  client: ExpedienteClient
  documents: ExpedienteDocument[]
  serviceLabels: Record<string, string>
  onClose: () => void
  onRefreshDocuments: () => void
  onRefreshOrders: () => void
  onViewDoc: (doc: ExpedienteDocument) => void | Promise<void>
  onDownloadDoc: (doc: ExpedienteDocument) => void | Promise<void>
  formatDate: (value: string, opts?: Intl.DateTimeFormatOptions) => string
}

function orderAmount(o: ExpedienteOrder): number {
  return Number(o.amount_eur) || Number(o.price_eur) || 0
}

function StatusBadge({ status }: { status: string }) {
  const paid = status === 'paid'
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${paid ? 'bg-cream-100 text-gold-700' : 'bg-amber-100 text-amber-700'}`}>
      {paid ? 'Pagado' : status}
    </span>
  )
}

export default function AdminExpedienteModal({
  client,
  documents,
  serviceLabels,
  onClose,
  onRefreshDocuments,
  onRefreshOrders,
  onViewDoc,
  onDownloadDoc,
  formatDate,
}: Props) {
  const paidOrders = useMemo(
    () => client.orders.filter((o) => o.status === 'paid'),
    [client.orders],
  )

  const [activeOrderId, setActiveOrderId] = useState<string>(
    paidOrders[0]?.id ?? client.orders[0]?.id ?? '',
  )
  const [activity, setActivity] = useState<ActivityRow[]>([])
  const [activityLoading, setActivityLoading] = useState(false)
  const [stepSaving, setStepSaving] = useState(false)
  const [notesDraft, setNotesDraft] = useState('')
  const [notesSaving, setNotesSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const activeOrder = client.orders.find((o) => o.id === activeOrderId) ?? client.orders[0]

  const loadActivity = useCallback(async (requestId: string) => {
    if (!requestId) return
    setActivityLoading(true)
    try {
      const res = await fetch(`/api/admin/activity?request_id=${encodeURIComponent(requestId)}`)
      const data = await res.json()
      setActivity(data.activity ?? [])
    } catch {
      setActivity([])
    } finally {
      setActivityLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeOrder?.id) {
      setNotesDraft(activeOrder.internal_notes ?? '')
      void loadActivity(activeOrder.id)
    }
  }, [activeOrder?.id, activeOrder?.internal_notes, loadActivity])

  async function handleStepChange(step: number) {
    if (!activeOrder) return
    setStepSaving(true)
    try {
      const res = await fetch('/api/admin/update-step', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: activeOrder.id, step }),
      })
      if (res.ok) {
        onRefreshOrders()
        void loadActivity(activeOrder.id)
      } else {
        alert('No se pudo actualizar el paso')
      }
    } finally {
      setStepSaving(false)
    }
  }

  async function handleSaveNotes() {
    if (!activeOrder) return
    setNotesSaving(true)
    try {
      const res = await fetch(`/api/admin/pedidos/${activeOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: notesDraft }),
      })
      if (res.ok) onRefreshOrders()
      else alert('No se pudieron guardar las notas')
    } finally {
      setNotesSaving(false)
    }
  }

  async function handleContractUpload(file: File) {
    if (!activeOrder) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('request_id', activeOrder.id)
      fd.append('file', file)
      const res = await fetch('/api/admin/upload-contract', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        onRefreshOrders()
        void loadActivity(activeOrder.id)
        alert('Contrato subido. El cliente recibirá un email.')
      } else {
        alert(data.error ?? 'Error al subir contrato')
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      <div className="bg-[#0a1410] p-6 text-white flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-[#f4d98a]">
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gold-500">Expediente unificado · Inmonest</p>
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p className="text-sm text-white/60">{client.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
        >
          <IconClose className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-5 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Ingresos', value: `${client.total_revenue.toFixed(2)} €` },
              { label: 'Pedidos pagados', value: String(client.total_paid) },
              { label: 'Documentos', value: String(documents.length) },
              { label: 'Teléfono', value: client.phone || '—' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{s.label}</p>
                <p className="text-lg font-bold text-gray-900 mt-1 truncate">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Selector pedido activo */}
          {client.orders.length > 1 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Pedido activo</p>
              <select
                value={activeOrderId}
                onChange={(e) => setActiveOrderId(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium min-h-[48px]"
              >
                {client.orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {serviceLabels[o.service_key] || o.service_key} — {orderAmount(o)} € — paso {o.step ?? 1}/4
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeOrder && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna principal: gestión del pedido */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {serviceLabels[activeOrder.service_key] || activeOrder.service_key}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
                        <StatusBadge status={activeOrder.status} />
                        <span className="flex items-center gap-1">
                          <IconClock className="w-3.5 h-3.5" />
                          {formatDate(activeOrder.paid_at || activeOrder.created_at)}
                        </span>
                        <span className="font-bold text-gray-900">{orderAmount(activeOrder)} €</span>
                      </p>
                    </div>
                    {activeOrder.session_id && (
                      <a
                        href={`https://dashboard.stripe.com/payments/${activeOrder.session_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 flex-shrink-0"
                      >
                        Stripe <IconExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Steps */}
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Progreso del expediente</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {WORKFLOW_STEPS.map((s) => {
                      const current = activeOrder.step ?? 1
                      const done = current > s.n
                      const active = current === s.n
                      return (
                        <button
                          key={s.n}
                          type="button"
                          disabled={stepSaving}
                          onClick={() => handleStepChange(s.n)}
                          className={`rounded-xl p-2 text-center border transition-all min-h-[64px] touch-manipulation ${
                            active
                              ? 'border-gold-500 bg-cream-100 shadow-sm'
                              : done
                                ? 'border-gold-200 bg-cream-100'
                                : 'border-gray-100 bg-gray-50 opacity-70 hover:opacity-100'
                          }`}
                          title={`Marcar paso ${s.n}`}
                        >
                          <div className="text-base">{done ? '✓' : s.icon}</div>
                          <p className="text-[9px] font-bold leading-tight mt-0.5">{s.label}</p>
                        </button>
                      )
                    })}
                  </div>

                  {/* Subir contrato */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Entregar contrato PDF</p>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) void handleContractUpload(f)
                        e.target.value = ''
                      }}
                    />
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileRef.current?.click()}
                      className="w-full sm:w-auto px-5 py-3 bg-gold-500 hover:bg-[#b8841e] text-white text-sm font-bold rounded-xl disabled:opacity-60 min-h-[48px]"
                    >
                      {uploading ? 'Subiendo…' : activeOrder.contract_path ? 'Reemplazar contrato PDF' : 'Subir contrato PDF → email al cliente'}
                    </button>
                    {activeOrder.contract_path && (
                      <p className="text-xs text-gold-600 mt-2">✓ Contrato entregado en el panel del cliente</p>
                    )}
                  </div>

                  {/* Notas internas */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Notas internas</p>
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none"
                      placeholder="Notas visibles solo para el equipo admin…"
                    />
                    <button
                      type="button"
                      disabled={notesSaving}
                      onClick={handleSaveNotes}
                      className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg disabled:opacity-60"
                    >
                      {notesSaving ? 'Guardando…' : 'Guardar notas'}
                    </button>
                  </div>
                </div>

                {/* Documentos */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      Documentos ({documents.length})
                    </h3>
                    <button type="button" onClick={onRefreshDocuments} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                      Actualizar
                    </button>
                  </div>
                  {documents.length === 0 ? (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center">
                      Sin documentos registrados para este cliente.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <IconFolder className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">{doc.file_name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded font-semibold mr-1">{doc.doc_key}</span>
                                {formatDate(doc.uploaded_at)}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <button type="button" onClick={() => onViewDoc(doc)} className="text-xs font-semibold text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                                  <IconEye className="w-3.5 h-3.5" /> Ver
                                </button>
                                <button type="button" onClick={() => onDownloadDoc(doc)} className="text-xs font-semibold text-[#8a6a1e] hover:text-[#6b5117] inline-flex items-center gap-1">
                                  <IconDownload className="w-3.5 h-3.5" /> Descargar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna lateral: timeline + otros pedidos */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Historial del expediente</h3>
                  {activityLoading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-10 bg-gray-50 rounded-lg" />
                      <div className="h-10 bg-gray-50 rounded-lg" />
                    </div>
                  ) : activity.length === 0 ? (
                    <p className="text-sm text-gray-500">Sin actividad registrada aún.</p>
                  ) : (
                    <ol className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                      {activity.map((a) => (
                        <li key={a.id} className="flex gap-3">
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cream-100 border border-[#f0dfa0] text-sm">
                            {activityIcon(a.activity_type)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 leading-snug">{a.description}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {formatDate(a.created_at, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              {a.created_by ? ` · ${a.created_by}` : ''}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Todos los pedidos</h3>
                  <ul className="space-y-2">
                    {client.orders.map((o) => (
                      <li key={o.id}>
                        <button
                          type="button"
                          onClick={() => setActiveOrderId(o.id)}
                          className={`w-full text-left rounded-xl px-3 py-2.5 border text-sm transition-colors ${
                            o.id === activeOrderId
                              ? 'border-gold-500 bg-cream-100'
                              : 'border-gray-100 hover:bg-gray-50'
                          }`}
                        >
                          <p className="font-semibold text-gray-900 truncate">
                            {serviceLabels[o.service_key] || o.service_key}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {orderAmount(o)} € · Paso {o.step ?? 1}/4
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-5 sm:p-6 flex justify-between items-center shadow-lg flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm"
        >
          Volver a expedientes
        </button>
        <a
          href={`mailto:${client.email}`}
          className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition inline-flex items-center gap-2 text-sm"
        >
          <IconMail className="w-4 h-4" />
          Enviar email
        </a>
      </div>
    </div>
  )
}
