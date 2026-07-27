'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import GestoriaLeadPanel from '@/components/GestoriaLeadPanel'
import GestoriaPaidPanel from '@/components/GestoriaPaidPanel'
import type { PartesFormData } from '@/components/GestoriaPartesForm'
import { isLeadStatus, isPaidStatus } from '@/lib/gestoria-leads'
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

export default function ContratosClient({ contratos, userDocs: initialDocs, userEmail }: Props) {
  const paidContratos = useMemo(
    () => contratos.filter((c) => isPaidStatus(c.status, c.paid_at)),
    [contratos],
  )
  const primaryLead = useMemo(
    () => contratos.find((c) => isLeadStatus(c.status, c.paid_at)) ?? null,
    [contratos],
  )
  const hasPaidService = paidContratos.length > 0

  const [docs, setDocs] = useState<UserDoc[]>(initialDocs)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [paying, setPaying] = useState<string | null>(null)
  const [activePaidId, setActivePaidId] = useState<string | null>(null)
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null)
  const { getProtectionPayload } = useBotProtection()

  const activePaid = paidContratos.find((c) => c.id === activePaidId) ?? paidContratos[0] ?? null

  const showPagoBanner =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('pago') === '1' || hasPaidService)

  useEffect(() => {
    setDocs(initialDocs)
  }, [initialDocs])

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
      setUploadFeedback({ type: 'error', message: 'No se encontró tu pedido activo' })
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
      setUploadFeedback({ type: 'error', message: 'No se encontró tu pedido activo' })
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

  /* ── Cliente con pago confirmado: solo checklist + subida ── */
  if (hasPaidService && activePaid) {
    return (
      <div className="space-y-4">
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
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white text-lg flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-emerald-900">¡Pago confirmado!</p>
                <p className="text-sm text-emerald-800/90 mt-1">
                  Sube los documentos del checklist para que empecemos a redactar tu contrato.
                </p>
              </div>
            </div>
          </div>
        )}

        {paidContratos.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {paidContratos.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActivePaidId(c.id)}
                className={`text-xs font-semibold px-3 py-2 rounded-full border min-h-[40px] touch-manipulation ${
                  c.id === activePaid.id
                    ? 'bg-[#0d1a0f] text-white border-[#0d1a0f]'
                    : 'bg-white text-gray-600 border-gray-200'
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
    )
  }

  /* ── Lead sin pago aún ── */
  if (primaryLead) {
    return (
      <div className="space-y-4">
        <GestoriaLeadPanel
          lead={primaryLead}
          paying={paying === primaryLead.id}
          onPay={() => handlePagar(primaryLead)}
        />
      </div>
    )
  }

  /* ── Sin pedidos: cargando o vincular pago ── */
  const awaitingPaymentLink =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pago') === '1'

  if (awaitingPaymentLink) {
    return (
      <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center space-y-4">
        <div className="text-4xl">⏳</div>
        <h2 className="text-lg font-bold text-gray-900">Vinculando tu pago…</h2>
        <p className="text-sm text-gray-500">
          Tu pago está confirmado. Recarga en unos segundos o contacta con nosotros si no aparece tu servicio.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-block bg-[#c9962a] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px] touch-manipulation"
        >
          Recargar
        </button>
        <p className="text-xs text-gray-400">
          <a href="mailto:info@inmonest.com" className="text-[#c9962a] underline">info@inmonest.com</a>
          {' · '}
          <a href="tel:+34745022862" className="text-[#c9962a] underline">745 022 862</a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
      <div className="text-4xl">📋</div>
      <h2 className="text-lg font-bold text-gray-900">Aún no tienes un contrato activo</h2>
      <p className="text-sm text-gray-500">
        Cuando completes el pago de gestoría, aquí verás tu checklist de documentos.
      </p>
      <Link
        href="/gestoria"
        className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px] touch-manipulation"
      >
        Ver servicios de gestoría
      </Link>
    </div>
  )
}
