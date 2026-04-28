'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SERVICE_LABELS: Record<string, string> = {
  'arras-confirmatorias':  'Contrato de Arras Confirmatorias',
  'arras-penitenciales':   'Contrato de Arras Penitenciales',
  'alquiler-vivienda-lau': 'Alquiler Residencial (LAU)',
  'alquiler-temporada':    'Alquiler de Temporada',
  'opcion-compra':         'Opcion de Compra',
  'reserva-compra':        'Reserva de Compra',
  'rescision-alquiler':    'Rescision de Alquiler',
  'compraventa-privada':   'Compraventa Privada',
  'cesion-derechos':       'Cesion de Derechos',
  'alquiler-habitacion':   'Alquiler de Habitacion',
  'liquidacion-fianza':    'Liquidacion de Fianza',
}

const STEP_INFO = [
  { n: 1, label: 'Pago recibido',       desc: 'Tu pago ha sido procesado',          icon: '💳', color: 'bg-blue-100 text-blue-700'   },
  { n: 2, label: 'Docs recibidos',      desc: 'Documentacion recibida y revisada',   icon: '📋', color: 'bg-purple-100 text-purple-700' },
  { n: 3, label: 'En elaboracion',      desc: 'Tu contrato esta siendo preparado',   icon: '⚙️', color: 'bg-amber-100 text-amber-700'  },
  { n: 4, label: 'Entregado',           desc: 'Contrato listo para descargar',       icon: '✅', color: 'bg-green-100 text-green-700'  },
]

const DOC_DEFS = [
  { key: 'dni',                  label: 'DNI / CIF',                      desc: 'Ambas caras en un PDF o imagen',           icon: '🪪' },
  { key: 'nomina',               label: 'Nomina',                         desc: 'Ultimas 3 nominas (PDF)',                  icon: '💼' },
  { key: 'escrituras',           label: 'Escrituras',                     desc: 'Escritura de propiedad del inmueble',      icon: '📜' },
  { key: 'nota-simple',          label: 'Nota Simple',                    desc: 'Del Registro de la Propiedad',             icon: '🏛️' },
  { key: 'contrato-alquiler',    label: 'Contrato de Alquiler/Arras',     desc: 'Contrato firmado o borrador',              icon: '📋' },
  { key: 'cert-energetico',      label: 'Certificado Energetico',         desc: 'Certificado de eficiencia energetica',     icon: '⚡' },
  { key: 'cedula-habitabilidad', label: 'Cedula de Habitabilidad',        desc: 'Cedula de habitabilidad vigente',          icon: '🏠' },
  { key: 'facturas',             label: 'Facturas',                       desc: 'Facturas de suministros u otros',          icon: '🧾' },
  { key: 'otro',                 label: 'Otros contratos',                desc: 'Cualquier otro documento relevante',       icon: '📄' },
]

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  uploaded:  { label: 'Subido',     color: 'bg-blue-100 text-blue-700',   icon: '📤' },
  reviewing: { label: 'En revision', color: 'bg-amber-100 text-amber-700', icon: '🔍' },
  validated: { label: 'Validado',   color: 'bg-green-100 text-green-700', icon: '✅' },
  rejected:  { label: 'Rechazado',  color: 'bg-red-100 text-red-700',     icon: '❌' },
}

interface Contrato {
  id: string
  session_id: string | null
  service_key: string
  client_name: string | null
  amount_eur: number | null
  status: string
  step: number | null
  paid_at: string | null
  contract_path: string | null
}

interface UserDoc {
  id: string
  doc_key: string
  file_name: string
  status: string
  uploaded_at: string
  notes: string | null
}

interface Props {
  contratos: Contrato[]
  userDocs: UserDoc[]
  userId: string
}

type TabId = 'historial' | 'documentos'

export default function ContratosClient({ contratos, userDocs, userId }: Props) {
  const [tab, setTab] = useState<TabId>('historial')
  const [docs, setDocs] = useState<UserDoc[]>(userDocs)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [uploading, setUploading]     = useState<string | null>(null)
  const [paying, setPaying]           = useState<string | null>(null)

  async function handlePagar(contrato: Contrato) {
    setPaying(contrato.id)
    try {
      const res  = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key:  contrato.service_key,
          client_name:  contrato.client_name ?? '',
          client_email: '',
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setPaying(null)
    }
  }
  const [selectedDocType, setSelectedDocType] = useState(DOC_DEFS[0].key)
  const [pendingFile, setPendingFile]         = useState<File | null>(null)
  const newDocInputRef = useRef<HTMLInputElement | null>(null)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({}) // kept for potential future per-key inputs

  async function handleDownload(contrato: Contrato) {
    if (!contrato.contract_path) return
    setDownloading(contrato.id)
    try {
      const res  = await fetch(`/api/dashboard/download-contract?request_id=${contrato.id}`)
      const data = await res.json()
      if (data.url) window.open(data.url, '_blank')
    } finally {
      setDownloading(null)
    }
  }

  async function handleUploadDoc(docKey: string, file: File) {
    setUploading(docKey)
    try {
      // 1. Obtener signed upload URL
      const urlRes = await fetch('/api/documentos/upload-url', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ doc_key: docKey, file_name: file.name, mime_type: file.type }),
      })
      const { signedUrl, path, error } = await urlRes.json()
      if (error || !signedUrl) throw new Error(error ?? 'No se obtuvo URL')

      // 2. Upload directo
      const uploadRes = await fetch(signedUrl, {
        method:  'PUT',
        headers: { 'Content-Type': file.type },
        body:    file,
      })
      if (!uploadRes.ok) throw new Error('Error al subir')

      // 3. Registrar
      const regRes  = await fetch('/api/documentos/registrar', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ doc_key: docKey, file_name: file.name, storage_path: path }),
      })
      const regData = await regRes.json()
      if (regData.doc) {
        setDocs(prev => {
          const exists = prev.findIndex(d => d.doc_key === docKey)
          if (exists >= 0) { const n = [...prev]; n[exists] = regData.doc; return n }
          return [...prev, regData.doc]
        })
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al subir el documento')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {([
          { id: 'historial',   label: '📄 Historial de compras' },
          { id: 'documentos',  label: '📤 Mi documentacion' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? 'bg-white text-[#c9962a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── HISTORIAL ─────────────────────────────────────────────────── */}
      {tab === 'historial' && (
        <div>
          {/* Banner tras nueva solicitud */}
          {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('solicitud') === '1' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3 mb-4">
              <span className="text-xl flex-shrink-0">✅</span>
              <div className="text-sm text-green-800">
                <p className="font-semibold">¡Solicitud recibida!</p>
                <p className="text-green-700 mt-0.5">Tu solicitud ha sido registrada. Completa el pago para que nuestro equipo empiece a redactar tu contrato.</p>
              </div>
            </div>
          )}
          {contratos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
                <Image src="/interior3.jpg" alt="" fill className="object-cover opacity-40" />
              </div>
              <div className="text-4xl mb-3">📄</div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Sin contratos aun</h2>
              <p className="text-sm text-gray-400 mb-6">Contrata nuestros servicios de gestoria para redactar tus contratos legalmente.</p>
              <Link href="/gestoria" className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                Ver gestoria →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contratos.map(c => {
                const currentStep = c.step ?? 1
                return (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">
                          {SERVICE_LABELS[c.service_key] ?? c.service_key.replace(/-/g, ' ')}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {c.paid_at ? new Date(c.paid_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                          {c.client_name ? ` · ${c.client_name}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[#c9962a]">
                          {c.amount_eur ? `${c.amount_eur} EUR` : ''}
                        </span>
                        {/* Contrato entregado: descargar */}
                        {c.contract_path ? (
                          <button
                            onClick={() => handleDownload(c)}
                            disabled={downloading === c.id}
                            className="flex items-center gap-1.5 bg-[#c9962a] hover:bg-[#b8841e] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-60"
                          >
                            {downloading === c.id ? (
                              <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            )}
                            Descargar
                          </button>
                        ) : c.status === 'pending' && !c.paid_at ? (
                          /* Solicitud sin pago: mostrar botón Pagar ahora */
                          <button
                            onClick={() => handlePagar(c)}
                            disabled={paying === c.id}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-60"
                          >
                            {paying === c.id ? (
                              <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            )}
                            Pagar ahora
                          </button>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-400 px-3 py-2 rounded-lg">En preparacion</span>
                        )}
                      </div>
                    </div>
                    {/* Progress */}
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {STEP_INFO.map((s, i) => (
                          <div key={s.n} className="flex items-center gap-2 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-semibold transition-all ${
                              currentStep > s.n  ? 'bg-green-500 text-white' :
                              currentStep === s.n ? 'bg-[#c9962a] text-white shadow-md shadow-amber-200 ring-2 ring-amber-200' :
                              'bg-gray-100 text-gray-400'
                            }`}>
                              {currentStep > s.n ? '✓' : s.n}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium truncate ${currentStep >= s.n ? 'text-gray-800' : 'text-gray-400'}`}>
                                {s.label}
                              </p>
                            </div>
                            {i < STEP_INFO.length - 1 && (
                              <div className={`h-0.5 w-4 flex-shrink-0 rounded ${currentStep > s.n ? 'bg-green-400' : 'bg-gray-200'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                      {currentStep < 4 && (
                        <p className="text-xs text-gray-400 mt-2">
                          {STEP_INFO[currentStep - 1]?.desc}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── DOCUMENTACION ─────────────────────────────────────────────── */}
      {tab === 'documentos' && (
        <div className="space-y-5">
          {/* Banner informativo */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">ℹ️</span>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Zona segura de entrega de documentos</p>
              <p>Sube aqui tu documentacion para que nuestro equipo pueda revisar y validar tu identidad. Todos los archivos se almacenan de forma cifrada.</p>
            </div>
          </div>

          {/* ── Subir nuevo documento ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Subir nuevo documento</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Selector tipo */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Tipo de documento</label>
                <select
                  value={selectedDocType}
                  onChange={e => { setSelectedDocType(e.target.value); setPendingFile(null) }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9962a]/40"
                >
                  {DOC_DEFS.map(d => (
                    <option key={d.key} value={d.key}>{d.icon} {d.label}</option>
                  ))}
                </select>
              </div>

              {/* Selector archivo */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Archivo</label>
                <button
                  type="button"
                  onClick={() => newDocInputRef.current?.click()}
                  className="w-full border border-dashed border-gray-300 hover:border-[#c9962a] rounded-xl px-3 py-2.5 text-sm text-left transition-colors"
                >
                  {pendingFile
                    ? <span className="text-gray-800 truncate block">{pendingFile.name}</span>
                    : <span className="text-gray-400">Seleccionar PDF / imagen…</span>}
                </button>
                <input
                  ref={newDocInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={e => setPendingFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Botón subir */}
              <div className="flex items-end">
                <button
                  disabled={!pendingFile || uploading === selectedDocType}
                  onClick={async () => {
                    if (!pendingFile) return
                    await handleUploadDoc(selectedDocType, pendingFile)
                    setPendingFile(null)
                    if (newDocInputRef.current) newDocInputRef.current.value = ''
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#c9962a] hover:bg-[#b8841e] disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  {uploading === selectedDocType ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Subiendo…
                    </span>
                  ) : 'Subir'}
                </button>
              </div>
            </div>
            {/* Hint del tipo seleccionado */}
            {(() => { const def = DOC_DEFS.find(d => d.key === selectedDocType); return def ? <p className="text-xs text-gray-400 mt-2">{def.desc}</p> : null })()}
          </div>

          {/* ── Documentos ya subidos ── */}
          {docs.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Mis documentos</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {docs.map(doc => {
                  const def = DOC_DEFS.find(d => d.key === doc.doc_key)
                  const cfg = STATUS_CONFIG[doc.status] ?? STATUS_CONFIG.uploaded
                  return (
                    <div key={doc.id} className="flex items-center justify-between px-5 py-3 gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0">{def?.icon ?? '📄'}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800">{def?.label ?? doc.doc_key}</p>
                          <p className="text-xs text-gray-400 truncate">{doc.file_name}</p>
                          {doc.notes && <p className="text-xs text-gray-500 mt-0.5">{doc.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                          <span>{cfg.icon}</span>{cfg.label}
                        </span>
                        {doc.status !== 'validated' && (
                          <button
                            onClick={() => { setSelectedDocType(doc.doc_key); newDocInputRef.current?.click() }}
                            className="text-xs text-[#c9962a] hover:underline whitespace-nowrap"
                          >
                            Reemplazar
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Banner decorativo */}
          <div className="relative overflow-hidden rounded-2xl h-28">
            <Image src="/decorado1.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a0f]/80 to-transparent flex items-center pl-6">
              <div className="text-white">
                <p className="text-xs font-medium text-green-300 mb-1">Seguridad</p>
                <p className="font-semibold text-base">Tus archivos estan protegidos</p>
                <p className="text-xs text-gray-300">Cifrado en reposo y en transito</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
