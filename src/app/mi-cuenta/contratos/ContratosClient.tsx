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
  { key: 'dni',        label: 'DNI / NIE',         desc: 'Ambas caras en un PDF o imagen',      icon: '🪪' },
  { key: 'nomina',     label: 'Nomina',             desc: 'Ultimas 3 nominas (PDF)',             icon: '💼' },
  { key: 'escrituras', label: 'Escrituras',         desc: 'Escritura de propiedad del inmueble', icon: '📜' },
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
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

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
        <div className="space-y-4">
          {/* Descripcion */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">ℹ️</span>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Zona segura de entrega de documentos</p>
              <p>Sube aqui tu documentacion para que nuestro equipo pueda revisar y validar tu identidad. Todos los archivos se almacenan de forma cifrada.</p>
            </div>
          </div>

          {/* Cards de documentos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DOC_DEFS.map(def => {
              const existing  = docs.find(d => d.doc_key === def.key)
              const isUploading = uploading === def.key
              const cfg = existing ? (STATUS_CONFIG[existing.status] ?? STATUS_CONFIG.uploaded) : null

              return (
                <div key={def.key} className={`bg-white rounded-2xl border-2 transition-all p-5 ${
                  existing?.status === 'validated' ? 'border-green-200' :
                  existing?.status === 'rejected'  ? 'border-red-200' :
                  existing                          ? 'border-amber-200' :
                  'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="text-3xl mb-3">{def.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{def.label}</h3>
                  <p className="text-xs text-gray-400 mb-4">{def.desc}</p>

                  {existing ? (
                    <div className="space-y-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg!.color}`}>
                        <span>{cfg!.icon}</span>
                        {cfg!.label}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{existing.file_name}</p>
                      {existing.notes && (
                        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">{existing.notes}</p>
                      )}
                      {existing.status !== 'validated' && (
                        <button
                          onClick={() => fileRefs.current[def.key]?.click()}
                          className="text-xs text-[#c9962a] hover:underline"
                        >
                          Reemplazar archivo
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRefs.current[def.key]?.click()}
                      disabled={isUploading}
                      className="w-full border-2 border-dashed border-gray-200 hover:border-[#c9962a] rounded-xl py-3 text-sm text-gray-400 hover:text-[#c9962a] transition-colors disabled:opacity-60"
                    >
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin w-4 h-4 border-2 border-[#c9962a] border-t-transparent rounded-full" />
                          Subiendo...
                        </span>
                      ) : (
                        '+ Subir archivo'
                      )}
                    </button>
                  )}

                  <input
                    ref={el => { fileRefs.current[def.key] = el }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleUploadDoc(def.key, file)
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Banner interior decorativo */}
          <div className="relative overflow-hidden rounded-2xl h-32">
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
