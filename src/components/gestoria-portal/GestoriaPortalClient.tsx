'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import GestoriaLeadPanel from '@/components/GestoriaLeadPanel'
import GestoriaPaidPanel from '@/components/GestoriaPaidPanel'
import GestoriaPortalShell from '@/components/gestoria-portal/GestoriaPortalShell'
import GestoriaPortalInicio from '@/components/gestoria-portal/GestoriaPortalInicio'
import GestoriaPortalContratos from '@/components/gestoria-portal/GestoriaPortalContratos'
import GestoriaPortalInmueble from '@/components/gestoria-portal/GestoriaPortalInmueble'
import GestoriaPortalServicios from '@/components/gestoria-portal/GestoriaPortalServicios'
import GestoriaPortalPublicar from '@/components/gestoria-portal/GestoriaPortalPublicar'
import type { PartesFormData } from '@/components/GestoriaPartesForm'
import type { GestoriaContrato, GestoriaPortalSection, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { computeGestoriaProgress } from '@/lib/gestoria-client-progress'
import { isLeadStatus, isPaidStatus } from '@/lib/gestoria-leads'
import { validateUploadFile } from '@/lib/gestoria-upload'
import { uploadFileWithProgress } from '@/lib/gestoria-upload-client'
import { useBotProtection } from '@/hooks/useBotProtection'

const VALID_SECTIONS: GestoriaPortalSection[] = [
  'inicio', 'expediente', 'contratos', 'inmueble', 'servicios', 'publicar',
]

function parseSection(value: string | null): GestoriaPortalSection {
  if (value && VALID_SECTIONS.includes(value as GestoriaPortalSection)) {
    return value as GestoriaPortalSection
  }
  return 'inicio'
}

type Props = {
  contratos: GestoriaContrato[]
  userDocs: GestoriaUserDoc[]
  userEmail: string
  displayName: string
}

export default function GestoriaPortalClient({
  contratos: initialContratos,
  userDocs: initialDocs,
  userEmail,
  displayName,
}: Props) {
  const [contratos, setContratos] = useState(initialContratos)
  const [docs, setDocs] = useState(initialDocs)
  const [section, setSection] = useState<GestoriaPortalSection>('inicio')
  const [activePaidId, setActivePaidId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [paying, setPaying] = useState<string | null>(null)
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null)
  const { getProtectionPayload } = useBotProtection()

  const paidContratos = useMemo(
    () => contratos.filter((c) => isPaidStatus(c.status, c.paid_at)),
    [contratos],
  )
  const primaryLead = useMemo(
    () => contratos.find((c) => isLeadStatus(c.status, c.paid_at)) ?? null,
    [contratos],
  )
  const activePaid = paidContratos.find((c) => c.id === activePaidId) ?? paidContratos[0] ?? null
  const hasPaidService = paidContratos.length > 0

  const pendingDocsCount = useMemo(() => {
    if (!activePaid) return 0
    const p = computeGestoriaProgress(activePaid, docs)
    return p.checklist.filter((c) => c.required && (c.state === 'pending' || c.state === 'rejected')).length
  }, [activePaid, docs])

  const showPagoBanner =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('pago') === '1' || hasPaidService)

  const navigate = useCallback((next: GestoriaPortalSection) => {
    setSection(next)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('v', next)
      window.history.replaceState({}, '', url.toString())
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setSection(parseSection(params.get('v')))
    if (params.get('pago') === '1' && !params.get('v')) {
      setSection('expediente')
    }
  }, [])

  useEffect(() => {
    setContratos(initialContratos)
  }, [initialContratos])

  useEffect(() => {
    setDocs(initialDocs)
  }, [initialDocs])

  useEffect(() => {
    const hasPaid = initialContratos.some((c) => isPaidStatus(c.status, c.paid_at))
    if (hasPaid) return

    const params = new URLSearchParams(window.location.search)
    const awaitingLink =
      params.get('pago') === '1' || params.get('session_id')?.startsWith('cs_')
    if (!awaitingLink) return

    let cancelled = false

    async function refetchPedidos() {
      try {
        const res = await fetch('/api/gestoria/mis-pedidos')
        if (!res.ok || cancelled) return
        const data = await res.json() as { contratos?: GestoriaContrato[]; userDocs?: GestoriaUserDoc[] }
        if (data.contratos?.length) setContratos(data.contratos)
        if (data.userDocs) setDocs(data.userDocs)
      } catch {
        /* bootstrap */
      }
    }

    refetchPedidos()
    const timer = window.setTimeout(refetchPedidos, 3000)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [initialContratos])

  async function handlePagar(contrato: GestoriaContrato) {
    setPaying(contrato.id)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: contrato.service_key,
          client_name: contrato.client_name ?? displayName,
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

  async function handleDownload(contrato: GestoriaContrato) {
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
    const requestId = activePaid?.id
    if (!requestId) {
      setUploadFeedback({ type: 'error', message: 'No se encontró tu pedido activo' })
      return
    }

    setUploadFeedback(null)
    setUploading('partes')
    try {
      const res = await fetch('/api/documentos/partes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gestoria_request_id: requestId, partes: data }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'No se pudieron guardar los datos')

      if (result.doc) {
        setDocs((prev) => {
          const exists = prev.findIndex(
            (d) => d.doc_key === 'partes' && d.gestoria_request_id === requestId,
          )
          if (exists >= 0) {
            const n = [...prev]
            n[exists] = result.doc
            return n
          }
          return [...prev, result.doc]
        })
        setUploadFeedback({ type: 'success', message: 'Datos guardados correctamente' })
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

  /* ── Lead sin pago: panel simplificado ── */
  if (primaryLead && !hasPaidService) {
    return (
      <GestoriaPortalShell
        displayName={displayName}
        activeSection="expediente"
        onSectionChange={navigate}
      >
        <GestoriaLeadPanel
          lead={primaryLead}
          paying={paying === primaryLead.id}
          onPay={() => handlePagar(primaryLead)}
        />
      </GestoriaPortalShell>
    )
  }

  /* ── Vinculando pago ── */
  const awaitingPaymentLink =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pago') === '1'

  if (!hasPaidService && awaitingPaymentLink && contratos.length === 0) {
    return (
      <GestoriaPortalShell displayName={displayName} activeSection="inicio" onSectionChange={navigate}>
        <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center space-y-4">
          <div className="text-4xl animate-pulse">⏳</div>
          <h2 className="text-lg font-bold text-gray-900">Activando tu expediente…</h2>
          <p className="text-sm text-gray-500">
            Tu pago está confirmado. Estamos preparando tu panel de gestoría.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-block bg-[#c9962a] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px] touch-manipulation"
          >
            Recargar panel
          </button>
        </div>
      </GestoriaPortalShell>
    )
  }

  if (!hasPaidService && contratos.length === 0) {
    return (
      <div className="min-h-screen bg-[#eef0f2] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4 max-w-md">
          <div className="text-4xl">🔒</div>
          <h2 className="text-lg font-bold text-gray-900">Panel exclusivo para clientes</h2>
          <p className="text-sm text-gray-500">
            Este portal es solo para quienes han contratado un servicio de gestoría inmobiliaria.
          </p>
          <Link
            href="/gestoria"
            className="inline-block bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-bold px-6 py-3 rounded-xl min-h-[48px] touch-manipulation"
          >
            Ver servicios de gestoría
          </Link>
        </div>
      </div>
    )
  }

  const feedbackBanner = uploadFeedback && (
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
  )

  return (
    <GestoriaPortalShell
      displayName={displayName}
      activeSection={section}
      onSectionChange={navigate}
      pendingDocsCount={pendingDocsCount}
    >
      {feedbackBanner}

      {section === 'inicio' && (
        <GestoriaPortalInicio
          displayName={displayName}
          contratos={contratos}
          userDocs={docs}
          activeContrato={activePaid}
          showPagoBanner={showPagoBanner && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pago') === '1'}
          onNavigate={navigate}
        />
      )}

      {section === 'expediente' && activePaid && (
        <div className="space-y-4">
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
      )}

      {section === 'expediente' && !activePaid && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">No hay un expediente activo con pago confirmado.</p>
        </div>
      )}

      {section === 'contratos' && (
        <GestoriaPortalContratos
          contratos={contratos}
          activeId={activePaid?.id ?? null}
          onSelect={setActivePaidId}
          onDownload={handleDownload}
          downloading={downloading}
          onNavigateExpediente={(id) => {
            setActivePaidId(id)
            navigate('expediente')
          }}
        />
      )}

      {section === 'inmueble' && (
        <GestoriaPortalInmueble
          activeContrato={activePaid}
          userDocs={docs}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onSubmitPartes={handleSubmitPartes}
          onUploadPdf={(file) => activePaid && handleUploadDoc('partes', file, activePaid.id)}
        />
      )}

      {section === 'servicios' && (
        <GestoriaPortalServicios
          activeServiceKey={activePaid?.service_key ?? null}
          ownedServiceKeys={contratos.map((c) => c.service_key)}
          userEmail={userEmail}
          clientName={activePaid?.client_name ?? displayName}
        />
      )}

      {section === 'publicar' && <GestoriaPortalPublicar />}
    </GestoriaPortalShell>
  )
}
