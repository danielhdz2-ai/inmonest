'use client'

import { useMemo, useState } from 'react'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { getDocMeta } from '@/lib/gestoria-service-docs'

type Props = {
  contratos: GestoriaContrato[]
  userDocs: GestoriaUserDoc[]
  onDeleted: (docId: string) => void
}

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  validated: { label: 'Validado', className: 'bg-cream-100 text-gold-700' },
  rejected: { label: 'Rechazado', className: 'bg-red-100 text-red-700' },
  uploaded: { label: 'En revisión', className: 'bg-amber-100 text-amber-700' },
}

function statusInfo(status: string) {
  return STATUS_LABEL[status] ?? { label: 'En revisión', className: 'bg-amber-100 text-amber-700' }
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

function docIcon(docKey: string): string {
  return getDocMeta(docKey)?.icon ?? '📄'
}

function docLabel(docKey: string): string {
  return getDocMeta(docKey)?.label ?? docKey.replace(/-/g, ' ')
}

export default function GestoriaPortalDocumentos({ contratos, userDocs, onDeleted }: Props) {
  const [busyId, setBusyId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 'partes' sin archivo real subido es solo el formulario de datos (visible en "Mi inmueble")
  const files = useMemo(
    () =>
      userDocs
        .filter((d) => !(d.doc_key === 'partes' && d.file_name === 'datos-partes.json'))
        .sort((a, b) => (b.uploaded_at ?? '').localeCompare(a.uploaded_at ?? '')),
    [userDocs],
  )

  const serviceNameFor = (requestId: string | null | undefined): string => {
    if (!requestId) return 'General'
    const c = contratos.find((c) => c.id === requestId)
    return c?.service_name ?? c?.service_key.replace(/-/g, ' ') ?? 'General'
  }

  async function handleOpen(doc: GestoriaUserDoc, download: boolean) {
    setError(null)
    setBusyId(doc.id)
    try {
      const res = await fetch(`/api/documentos/${doc.id}${download ? '?download=1' : ''}`)
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'No se pudo abrir el documento')
      window.open(data.url, '_blank')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al abrir el documento')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(doc: GestoriaUserDoc) {
    setError(null)
    setBusyId(doc.id)
    try {
      const res = await fetch(`/api/documentos/${doc.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'No se pudo eliminar el documento')
      onDeleted(doc.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el documento')
    } finally {
      setBusyId(null)
      setConfirmId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Mis documentos</h2>
        <p className="text-sm text-gray-500 mt-1">
          Todos los archivos que has subido a tu expediente. Puedes verlos, descargarlos o eliminarlos.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {files.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-4xl mb-3">🗂️</p>
          <h3 className="text-base font-bold text-gray-900">Aún no has subido documentos</h3>
          <p className="text-sm text-gray-500 mt-2">Ve a la sección Expediente para añadir tu documentación.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {files.map((doc) => {
            const status = statusInfo(doc.status)
            const busy = busyId === doc.id
            const confirming = confirmId === doc.id
            return (
              <li
                key={doc.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 leading-none mt-0.5">{docIcon(doc.doc_key)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{docLabel(doc.doc_key)}</p>
                    <p className="text-xs text-gray-500 mt-0.5 break-all">{doc.file_name}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-gray-400">{serviceNameFor(doc.gestoria_request_id)}</span>
                      {doc.uploaded_at && (
                        <span className="text-[10px] text-gray-400">· {formatDate(doc.uploaded_at)}</span>
                      )}
                    </div>
                  </div>
                  <span className={`flex-shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${status.className}`}>
                    {status.label}
                  </span>
                </div>

                {confirming ? (
                  <div className="flex flex-wrap items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3">
                    <p className="text-xs text-red-800 flex-1 min-w-[140px]">¿Eliminar este documento? No se puede deshacer.</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete(doc)}
                        className="min-h-[40px] px-3 rounded-lg bg-red-600 text-white text-xs font-bold disabled:opacity-60 touch-manipulation"
                      >
                        {busy ? 'Eliminando…' : 'Sí, eliminar'}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setConfirmId(null)}
                        className="min-h-[40px] px-3 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold touch-manipulation"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleOpen(doc, false)}
                      className="min-h-[44px] rounded-xl border-2 border-[#0d1a0f] text-[#0d1a0f] text-xs font-bold disabled:opacity-60 touch-manipulation"
                    >
                      👁️ Ver
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleOpen(doc, true)}
                      className="min-h-[44px] rounded-xl bg-forest-900 text-white text-xs font-bold disabled:opacity-60 touch-manipulation"
                    >
                      {busy ? '…' : '⬇️ Descargar'}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setConfirmId(doc.id)}
                      className="min-h-[44px] rounded-xl border-2 border-red-200 text-red-600 text-xs font-bold disabled:opacity-60 touch-manipulation"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
