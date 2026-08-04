'use client'

import type { PartesFormData } from '@/components/GestoriaPartesForm'
import GestoriaPartesForm from '@/components/GestoriaPartesForm'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { filterDocsForRequest } from '@/lib/gestoria-client-progress'

type Props = {
  activeContrato: GestoriaContrato | null
  userDocs: GestoriaUserDoc[]
  uploading: string | null
  uploadProgress: number | null
  onSubmitPartes: (data: PartesFormData) => Promise<void>
  onUploadPdf: (file: File) => Promise<void>
}

function extractPartesData(docs: GestoriaUserDoc[], requestId: string): Record<string, unknown> | null {
  const scoped = filterDocsForRequest(docs, requestId)
  const partesDoc = scoped.find((d) => d.doc_key === 'partes')
  return partesDoc?.partes_data ?? null
}

export default function GestoriaPortalInmueble({
  activeContrato,
  userDocs,
  uploading,
  uploadProgress,
  onSubmitPartes,
  onUploadPdf,
}: Props) {
  if (!activeContrato) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-4xl mb-3">🏠</p>
        <h2 className="text-lg font-bold text-gray-900">Sin expediente activo</h2>
        <p className="text-sm text-gray-500 mt-2">Contrata un servicio para registrar los datos de tu inmueble.</p>
      </div>
    )
  }

  const partesData = extractPartesData(userDocs, activeContrato.id)
  const hasData = partesData && Object.keys(partesData).length > 0

  const fields: { key: keyof PartesFormData; label: string }[] = [
    { key: 'direccion_inmueble', label: 'Dirección del inmueble' },
    { key: 'precio', label: 'Precio / Renta' },
    { key: 'condiciones', label: 'Condiciones acordadas' },
    { key: 'parte1_nombre', label: 'Parte 1 — Nombre' },
    { key: 'parte1_dni', label: 'Parte 1 — DNI/NIE' },
    { key: 'parte2_nombre', label: 'Parte 2 — Nombre' },
    { key: 'parte2_dni', label: 'Parte 2 — DNI/NIE' },
    { key: 'notas', label: 'Notas adicionales' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Datos del inmueble</h2>
        <p className="text-sm text-gray-500 mt-1">
          Información vinculada a tu expediente de{' '}
          <span className="font-medium text-gray-700">
            {activeContrato.service_name ?? activeContrato.service_key.replace(/-/g, ' ')}
          </span>
        </p>
      </div>

      {hasData && (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-3 bg-[#fafafa] border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Ficha del inmueble</p>
          </div>
          <dl className="divide-y divide-gray-100">
            {fields.map(({ key, label }) => {
              const val = (partesData as PartesFormData)[key]
              if (!val?.trim()) return null
              return (
                <div key={key} className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <dt className="text-xs font-semibold text-gray-500">{label}</dt>
                  <dd className="sm:col-span-2 text-sm text-gray-900 whitespace-pre-wrap">{val}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      )}

      <div className="rounded-2xl border border-gold-300/60 bg-gradient-to-br from-[#fdf8ee] to-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          {hasData ? 'Actualizar datos' : 'Completar ficha del inmueble'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Estos datos los usa tu gestor para redactar el contrato con precisión jurídica.
        </p>
        <GestoriaPartesForm
          requestId={activeContrato.id}
          initialData={partesData}
          uploading={uploading === 'partes'}
          uploadProgress={uploading === 'partes' ? uploadProgress : null}
          onSubmitForm={onSubmitPartes}
          onUploadPdf={onUploadPdf}
        />
      </div>
    </div>
  )
}
