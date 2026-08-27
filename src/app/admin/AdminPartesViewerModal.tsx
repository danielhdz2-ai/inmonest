'use client'

import { IconClose } from '@/app/admin/AdminIcons'
import { PARTES_FIELD_LABELS } from '@/lib/partes-data-labels'

type Props = {
  fileName: string
  clientName: string | null
  clientEmail: string | null
  uploadedAt: string
  partesData: Record<string, unknown>
  formatDate: (value: string, opts?: Intl.DateTimeFormatOptions) => string
  onClose: () => void
}

export default function AdminPartesViewerModal({
  fileName,
  clientName,
  clientEmail,
  uploadedAt,
  partesData,
  formatDate,
  onClose,
}: Props) {
  const jsonPretty = JSON.stringify(partesData, null, 2)

  const groups = PARTES_FIELD_LABELS.reduce<Record<string, typeof PARTES_FIELD_LABELS>>((acc, field) => {
    const group = field.group ?? 'Datos'
    if (!acc[group]) acc[group] = []
    acc[group].push(field)
    return acc
  }, {})

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-200 bg-[#fafafa]">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Datos de partes</p>
            <h2 className="text-lg font-bold text-gray-900 truncate">{fileName}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {clientName || 'Cliente'} · {clientEmail || '—'} · {formatDate(uploadedAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0"
            aria-label="Cerrar"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            Este archivo no es un PDF subido: son los datos del formulario de partes guardados en la base de datos.
          </p>

          {Object.entries(groups).map(([group, fields]) => {
            const visible = fields.filter(({ key }) => {
              const val = partesData[key]
              return typeof val === 'string' && val.trim()
            })
            if (visible.length === 0) return null

            return (
              <section key={group}>
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">{group}</h3>
                <dl className="rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                  {visible.map(({ key, label }) => (
                    <div key={key} className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-white">
                      <dt className="text-xs font-semibold text-gray-500">{label}</dt>
                      <dd className="sm:col-span-2 text-sm text-gray-900 whitespace-pre-wrap">
                        {String(partesData[key])}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )
          })}

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">JSON completo</h3>
            <pre className="text-xs sm:text-sm bg-gray-900 text-emerald-300 rounded-xl p-4 overflow-x-auto leading-relaxed">
              {jsonPretty}
            </pre>
          </section>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
