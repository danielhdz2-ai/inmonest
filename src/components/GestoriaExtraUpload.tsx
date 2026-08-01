'use client'

import GestoriaUploadActions from '@/components/GestoriaUploadActions'
import { EXTRA_UPLOAD_CATALOG } from '@/lib/gestoria-service-docs'
import type { UserDocRecord } from '@/lib/gestoria-client-progress'

type Props = {
  docsForRequest: UserDocRecord[]
  excludeKeys: string[]
  uploading: string | null
  uploadProgress?: number | null
  onPick: (docKey: string, file: File) => void
}

function docState(uploaded: UserDocRecord | null): 'done' | 'reviewing' | 'rejected' | 'pending' {
  if (!uploaded) return 'pending'
  if (uploaded.status === 'validated') return 'done'
  if (uploaded.status === 'rejected') return 'rejected'
  return 'reviewing'
}

/**
 * Catálogo libre de subida: nota simple, contratos, escrituras, nóminas,
 * facturas, cédula, certificado energético… independientemente de lo que
 * el checklist del servicio ya pida. Todo opcional.
 */
export default function GestoriaExtraUpload({
  docsForRequest,
  excludeKeys,
  uploading,
  uploadProgress,
  onPick,
}: Props) {
  const items = EXTRA_UPLOAD_CATALOG.filter((item) => !excludeKeys.includes(item.key))
  if (items.length === 0) return null

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900">Subir más documentación</h3>
      <p className="text-xs text-gray-500 mt-0.5 mb-4 leading-relaxed">
        Añade cualquier otro documento de tu caso, tengas o no ya algo subido arriba.
      </p>

      <div className="space-y-3">
        {items.map((item) => {
          const uploaded = docsForRequest.find((d) => d.doc_key === item.key) ?? null
          const state = docState(uploaded)
          return (
            <div
              key={item.key}
              className={`rounded-2xl border px-3 sm:px-4 py-3.5 space-y-3 ${
                state === 'done'
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : state === 'rejected'
                    ? 'border-red-200 bg-red-50/50'
                    : state === 'reviewing'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0 leading-none mt-0.5">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  {uploaded && (
                    <p className="text-xs text-gray-400 mt-1 break-all">
                      {uploaded.file_name}
                      {state === 'reviewing' && ' · En revisión'}
                      {state === 'rejected' && ' · Sube de nuevo'}
                      {state === 'done' && ' · Validado'}
                    </p>
                  )}
                </div>
                {state === 'done' && (
                  <span className="text-[10px] font-bold text-emerald-700 uppercase flex-shrink-0">OK</span>
                )}
              </div>

              <GestoriaUploadActions
                docKey={item.key}
                uploading={uploading === item.key}
                uploadProgress={uploading === item.key ? uploadProgress : null}
                variant={uploaded ? 'replace' : 'primary'}
                onPick={(file) => onPick(item.key, file)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
