'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import GestoriaLeadPanel from '@/components/GestoriaLeadPanel'
import GestoriaPaidPanel from '@/components/GestoriaPaidPanel'
import GestoriaPortalShell from '@/components/gestoria-portal/GestoriaPortalShell'
import GestoriaPortalInicio from '@/components/gestoria-portal/GestoriaPortalInicio'
import GestoriaPortalContratos from '@/components/gestoria-portal/GestoriaPortalContratos'
import GestoriaPortalDocumentos from '@/components/gestoria-portal/GestoriaPortalDocumentos'
import GestoriaPortalInmueble from '@/components/gestoria-portal/GestoriaPortalInmueble'
import GestoriaPortalServicios from '@/components/gestoria-portal/GestoriaPortalServicios'
import GestoriaPortalConfiguracion from '@/components/gestoria-portal/GestoriaPortalConfiguracion'
import GestoriaPostPagoActivacion from '@/components/gestoria-portal/GestoriaPostPagoActivacion'
import type { PartesFormData } from '@/components/GestoriaPartesForm'
import type { GestoriaContrato, GestoriaPortalSection, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { computeGestoriaProgress } from '@/lib/gestoria-client-progress'
import { isLeadStatus, isPaidStatus } from '@/lib/gestoria-leads'
import { validateUploadFile } from '@/lib/gestoria-upload'
import { uploadFileWithProgress } from '@/lib/gestoria-upload-client'

const VALID_SECTIONS: GestoriaPortalSection[] = [
  'inicio',
  'expediente',
  'documentos',
  'contratos',
  'inmueble',
  'servicios',
  'configuracion',
]

function parseSection(value: string | null): GestoriaPortalSection {
  if (value && VALID_SECTIONS.includes(value as GestoriaPortalSection)) {
    return value as GestoriaPortalSection
  }
  return 'expediente'
}

type Props = {
  contratos: GestoriaContrato[]
  userDocs: GestoriaUserDoc[]
  userEmail: string
  displayName: string
  initialSessionId?: string | null
  initialPhone?: string
}

export default function GestoriaPortalClient({
  contratos: initialContratos,
  userDocs: initialDocs,
  userEmail,
  displayName,
  initialSessionId = null,
  initialPhone = '',
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

  const searchParams = useSearchParams()
  const stripeSessionId = useMemo(() => {
    const fromProp = initialSessionId?.startsWith('cs_') ? initialSessionId : null
    const fromUrl = searchParams.get('session_id')
    return fromProp ?? (fromUrl?.startsWith('cs_') ? fromUrl : null)
  }, [initialSessionId, searchParams])

  const [postPagoOpen, setPostPagoOpen] = useState(
    () =>
      Boolean(initialSessionId?.startsWith('cs_')) &&
      !initialContratos.some((c) => isPaidStatus(c.status, c.paid_at)),
  )

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
    return p.checklist.filter((c) => c.state === 'pending' || c.state === 'rejected').length
  }, [activePaid, docs])

  const showPagoBanner = hasPaidService

  const navigate = useCallback((next: GestoriaPortalSection) => {
    setSection(next)
    const url = new URL(window.location.href)
    url.searchParams.set('v', next)
    url.searchParams.delete('pago')
    window.history.replaceState({}, '', url.toString())
  }, [])

  useEffect(() => {
    const v = parseSection(searchParams.get('v'))
    setSection(v)
  }, [searchParams])

  // Sin pago confirmado → abrir catálogo (Contratar más)
  useEffect(() => {
    if (hasPaidService || primaryLead) return
    const sid = searchParams.get('session_id')
    if (sid?.startsWith('cs_') || searchParams.get('pago') === '1') return
    if (searchParams.get('v')) return
    navigate('servicios')
  }, [hasPaidService, primaryLead, navigate, searchParams])

  useEffect(() => {
    setContratos(initialContratos)
  }, [initialContratos])

  useEffect(() => {
    setDocs(initialDocs)
  }, [initialDocs])

  useEffect(() => {
    if (hasPaidService) setPostPagoOpen(false)
    else if (stripeSessionId) setPostPagoOpen(true)
  }, [hasPaidService, stripeSessionId])

  async function handlePagar(contrato: GestoriaContrato) {
    setPaying(contrato.id)
    setUploadFeedback(null)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: contrato.service_key,
          client_name: contrato.client_name ?? displayName,
          client_email: userEmail || contrato.client_email || '',
          client_phone: contrato.client_phone ?? '',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setUploadFeedback({
          type: 'error',
          message: data.error || 'No se pudo abrir Stripe. Prueba de nuevo o escribe a info@inmonest.com',
        })
        return
      }
      window.location.href = data.url
    } catch {
      setUploadFeedback({
        type: 'error',
        message: 'Error de red al iniciar el pago. Revisa tu conexión e inténtalo de nuevo.',
      })
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

  if (postPagoOpen && stripeSessionId && !hasPaidService) {
    return (
      <GestoriaPortalShell
        displayName={displayName}
        activeSection="expediente"
        onSectionChange={navigate}
      >
        <GestoriaPostPagoActivacion
          sessionId={stripeSessionId}
          userEmail={userEmail}
          displayName={displayName}
          onSuccess={({ contratos: nextContratos, userDocs: nextDocs }) => {
            setContratos(nextContratos)
            setDocs(nextDocs)
            setPostPagoOpen(false)
            setSection('expediente')
            const url = new URL(window.location.href)
            url.searchParams.delete('session_id')
            url.searchParams.set('v', 'expediente')
            url.searchParams.set('pago', '1')
            window.history.replaceState({}, '', url.pathname + url.search)
          }}
        />
      </GestoriaPortalShell>
    )
  }

  const feedbackBanner = uploadFeedback && (
    <div
      className={`rounded-xl px-4 py-3 text-sm ${
        uploadFeedback.type === 'error'
          ? 'bg-red-50 border border-red-200 text-red-800'
          : 'bg-cream-100 border border-gold-200 text-gold-800'
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
          showPagoBanner={showPagoBanner && searchParams.get('pago') === '1'}
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
                      ? 'bg-forest-900 text-white border-black'
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

      {section === 'documentos' && (
        <GestoriaPortalDocumentos
          contratos={contratos}
          userDocs={docs}
          onDeleted={(docId) => setDocs((prev) => prev.filter((d) => d.id !== docId))}
        />
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
          catalogOnly={!hasPaidService}
        />
      )}

      {section === 'configuracion' && (
        <GestoriaPortalConfiguracion
          email={userEmail}
          initialName={displayName}
          initialPhone={initialPhone}
        />
      )}
    </GestoriaPortalShell>
  )
}
