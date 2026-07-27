'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GestoriaLeadPanel from '@/components/GestoriaLeadPanel'
import GestoriaPaidPanel from '@/components/GestoriaPaidPanel'
import type { PartesFormData } from '@/components/GestoriaPartesForm'
import { isLeadStatus, isPaidStatus } from '@/lib/gestoria-leads'
import { WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'
import { validateUploadFile } from '@/lib/gestoria-upload'
import { uploadFileWithProgress } from '@/lib/gestoria-upload-client'
import { useBotProtection } from '@/hooks/useBotProtection'

interface Contrato {
  id: string
  session_id: string | null
  service_key: string
  service_name: string | null
  client_name: string | null
  client_email?: string | null
  amount_eur: number | null
  status: string
  step: number | null
  paid_at: string | null
  contract_path: string | null
  contract_delivered_at?: string | null
  expected_delivery_date?: string | null
  assigned_to?: string | null
  created_at?: string | null
}

interface UserDoc {
  id: string
  doc_key: string
  file_name: string
  status: string
  uploaded_at: string
  notes: string | null
  gestoria_request_id?: string | null
  partes_data?: Record<string, unknown> | null
}

interface Props {
  contratos: Contrato[]
  userDocs: UserDoc[]
  userId: string
  userEmail: string
}

type TabId = 'servicio' | 'historial'

export default function ContratosClient({ contratos, userDocs: initialDocs, userEmail }: Props) {
  const hasPaidService = contratos.some((c) => isPaidStatus(c.status, c.paid_at))
  const [tab, setTab] = useState<TabId>(hasPaidService ? 'servicio' : 'historial')
  const [docs, setDocs] = useState<UserDoc[]>(initialDocs)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [paying, setPaying] = useState<string | null>(null)
  const [activePaidId, setActivePaidId] = useState<string | null>(null)
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null)
  const { getProtectionPayload } = useBotProtection()

  const leads = useMemo(
    () => contratos.filter((c) => isLeadStatus(c.status, c.paid_at)),
    [contratos],
  )
  const paidContratos = useMemo(
    () => contratos.filter((c) => isPaidStatus(c.status, c.paid_at)),
    [contratos],
  )
  const primaryLead = leads[0] ?? null
  const activePaid = paidContratos.find((c) => c.id === activePaidId) ?? paidContratos[0] ?? null

  const showPagoBanner =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pago') === '1'
  const showLeadBanner =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lead') === '1'

  useEffect(() => {
    if (hasPaidService && tab === 'historial' && showPagoBanner) {
      setTab('servicio')
    }
  }, [hasPaidService, showPagoBanner, tab])

  async function handlePagar(contrato: Contrato) {
    setPaying(contrato.id)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: contrato.service_key,
          client_name: contrato.client_name ?? '',
          client_email: userEmail || contrato.client_email || '',
          ...getProtectionPayload(),
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setPaying(null)
    }
  }

  async function handleDownload(contrato: Contrato) {
    if (!contrato.contract_path) return
    setDownloading(contrato.id)
    try {
      const res = await fetch(`/api/dashboard/download-contract?request_id=${contrato.id}`)
      const data = await res.json()
      if (data.url) window.open(data.url, '_blank')
    } finally {
      setDownloading(null)
    }
  }

  async function handleUploadDoc(docKey: string, file: File, requestId?: string) {
    const targetRequestId = requestId ?? activePaid?.id
    if (!targetRequestId) {
      setUploadFeedback({ type: 'error', message: 'Selecciona un servicio activo' })
      return
    }

    const check = validateUploadFile(file.name, file.type, file.size)
    if (!check.ok) {
      setUploadFeedback({ type: 'error', message: check.error })
      return
    }

    setUploadFeedback(null)
    setUploading(docKey)
    setUploadProgress(0)
    try {
      const urlRes = await fetch('/api/documentos/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doc_key: docKey,
          file_name: file.name,
          mime_type: file.type,
          file_size: file.size,
          gestoria_request_id: targetRequestId,
        }),
      })
      const { signedUrl, path, contentType, error } = await urlRes.json()
      if (error || !signedUrl) throw new Error(error ?? 'No se obtuvo URL de subida')

      await uploadFileWithProgress(
        signedUrl,
        file,
        contentType ?? check.mime,
        (state) => setUploadProgress(state.percent),
      )

      const regRes = await fetch('/api/documentos/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doc_key: docKey,
          file_name: file.name,
          storage_path: path,
          gestoria_request_id: targetRequestId,
        }),
      })
      const regData = await regRes.json()
      if (!regRes.ok) throw new Error(regData.error ?? 'No se pudo registrar el documento')

      if (regData.doc) {
        setDocs((prev) => {
          const exists = prev.findIndex(
            (d) => d.doc_key === docKey && d.gestoria_request_id === targetRequestId,
          )
          if (exists >= 0) {
            const n = [...prev]
            n[exists] = regData.doc
            return n
          }
          return [...prev, regData.doc]
        })
        setUploadFeedback({ type: 'success', message: 'Documento subido correctamente' })
      }
    } catch (err) {
      setUploadFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Error al subir el documento',
      })
    } finally {
      setUploading(null)
      setUploadProgress(null)
    }
  }

  async function handleSubmitPartes(data: PartesFormData) {
    if (!activePaid?.id) {
      setUploadFeedback({ type: 'error', message: 'Selecciona un servicio activo' })
      return
    }

    setUploadFeedback(null)
    setUploading('partes')
    try {
      const res = await fetch('/api/documentos/partes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gestoria_request_id: activePaid.id,
          partes: data,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'No se pudieron guardar los datos')

      if (result.doc) {
        setDocs((prev) => {
          const exists = prev.findIndex(
            (d) => d.doc_key === 'partes' && d.gestoria_request_id === activePaid.id,
          )
          if (exists >= 0) {
            const n = [...prev]
            n[exists] = result.doc
            return n
          }
          return [...prev, result.doc]
        })
        setUploadFeedback({ type: 'success', message: 'Datos de las partes guardados' })
      }
    } catch (err) {
      setUploadFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Error al guardar',
      })
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {uploadFeedback && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            uploadFeedback.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          }`}
          role="alert"
        >
          {uploadFeedback.message}
        </div>
      )}
      {showPagoBanner && (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative flex items-start gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white text-lg flex-shrink-0">✓</span>
            <div>
              <p className="font-bold text-emerald-900 text-base">¡Pago confirmado!</p>
              <p className="text-sm text-emerald-800/90 mt-1">
                Tu servicio está activo. Completa el checklist de documentos abajo para que empecemos a redactar tu contrato.
              </p>
            </div>
          </div>
        </div>
      )}

      {showLeadBanner && primaryLead && (
        <div className="bg-[#fdf8ee] border border-[#e8d48a] rounded-2xl p-4 text-sm text-[#5c4a1a]">
          <p className="font-semibold">Bienvenido a tu área de gestoría</p>
          <p className="mt-0.5 opacity-90">
            Hemos registrado tu interés. Contrata cuando quieras o espera nuestra llamada.
          </p>
        </div>
      )}

      {primaryLead && !hasPaidService && (
        <GestoriaLeadPanel
          lead={primaryLead}
          paying={paying === primaryLead.id}
          onPay={() => handlePagar(primaryLead)}
        />
      )}

      {(hasPaidService || paidContratos.length > 0 || primaryLead) && (
        <div className={`gap-1 bg-gray-100/80 p-1 rounded-xl w-full sm:w-fit ${hasPaidService ? 'grid grid-cols-2 sm:flex' : 'flex'}`}>
          {hasPaidService && (
            <button
              type="button"
              onClick={() => setTab('servicio')}
              className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] touch-manipulation ${
                tab === 'servicio'
                  ? 'bg-white text-[#c9962a] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mi servicio activo
            </button>
          )}
          <button
            type="button"
            onClick={() => setTab('historial')}
            className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] touch-manipulation ${
              tab === 'historial'
                ? 'bg-white text-[#c9962a] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Historial
          </button>
        </div>
      )}

      {tab === 'servicio' && activePaid && (
        <div className="space-y-4">
          {paidContratos.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {paidContratos.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActivePaidId(c.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    c.id === activePaid.id
                      ? 'bg-[#0d1a0f] text-white border-[#0d1a0f]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#c9962a]'
                  }`}
                >
                  {c.service_name ?? c.service_key.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          )}
          <GestoriaPaidPanel
            contrato={activePaid}
            userDocs={docs}
            uploading={uploading}
            uploadProgress={uploadProgress}
            downloading={downloading === activePaid.id}
            onUpload={(docKey, file) => handleUploadDoc(docKey, file, activePaid.id)}
            onSubmitPartes={handleSubmitPartes}
            onDownload={() => handleDownload(activePaid)}
            onUploadError={(message) => setUploadFeedback({ type: 'error', message })}
          />
        </div>
      )}

      {tab === 'historial' && (
        <div>
          {showPagoBanner && paidContratos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center">
              <div className="text-4xl mb-3">⏳</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Vinculando tu pago…</h2>
              <p className="text-sm text-gray-500 mb-4">
                Estamos cargando tu servicio. Si no aparece en unos segundos, recarga la página.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Recargar panel
              </button>
            </div>
          ) : paidContratos.length === 0 && !primaryLead ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-16 text-center">
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
                <Image src="/interior3.jpg" alt="" fill className="object-cover opacity-40" />
              </div>
              <div className="text-4xl mb-3">📄</div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Sin contratos aún</h2>
              <p className="text-sm text-gray-400 mb-6">
                Contrata nuestros servicios de gestoría para redactar tus contratos legalmente.
              </p>
              <Link
                href="/gestoria"
                className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Ver gestoría →
              </Link>
            </div>
          ) : paidContratos.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Cuando completes el pago, tu servicio aparecerá en &quot;Mi servicio activo&quot;.
            </p>
          ) : (
            <div className="space-y-3">
              {paidContratos.map((c) => {
                const step = Math.min(c.step ?? 1, 4)
                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3 hover:shadow-sm transition-shadow"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {c.service_name ?? c.service_key.replace(/-/g, ' ')}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {c.paid_at
                          ? new Date(c.paid_at).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : ''}
                        {' · '}
                        Paso {step} de 4 — {WORKFLOW_STEPS[step - 1]?.label}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.amount_eur != null && (
                        <span className="text-sm font-bold text-[#c9962a]">{c.amount_eur} €</span>
                      )}
                      {c.contract_path ? (
                        <button
                          type="button"
                          onClick={() => handleDownload(c)}
                          disabled={downloading === c.id}
                          className="text-xs font-semibold text-[#c9962a] hover:underline"
                        >
                          Descargar
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActivePaidId(c.id)
                            setTab('servicio')
                          }}
                          className="text-xs font-semibold bg-[#0d1a0f] text-white px-3 py-1.5 rounded-lg hover:bg-[#1a2e1c]"
                        >
                          Ver checklist
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
