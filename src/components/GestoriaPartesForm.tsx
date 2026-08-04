'use client'

import { useState } from 'react'
import GestoriaUploadActions from '@/components/GestoriaUploadActions'

export type PartesFormData = {
  parte1_nombre: string
  parte1_dni: string
  parte1_email: string
  parte1_telefono: string
  parte2_nombre: string
  parte2_dni: string
  parte2_email: string
  parte2_telefono: string
  direccion_inmueble: string
  precio: string
  condiciones: string
  notas: string
}

const EMPTY: PartesFormData = {
  parte1_nombre: '',
  parte1_dni: '',
  parte1_email: '',
  parte1_telefono: '',
  parte2_nombre: '',
  parte2_dni: '',
  parte2_email: '',
  parte2_telefono: '',
  direccion_inmueble: '',
  precio: '',
  condiciones: '',
  notas: '',
}

type Props = {
  requestId: string
  initialData?: Record<string, unknown> | null
  uploading: boolean
  uploadProgress?: number | null
  onSubmitForm: (data: PartesFormData) => Promise<void>
  onUploadPdf: (file: File) => Promise<void>
}

function field(
  id: keyof PartesFormData,
  label: string,
  value: string,
  onChange: (id: keyof PartesFormData, value: string) => void,
  opts?: { required?: boolean; type?: string; placeholder?: string },
) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        id={id}
        type={opts?.type ?? 'text'}
        required={opts?.required}
        value={value}
        placeholder={opts?.placeholder}
        onChange={(e) => onChange(id, e.target.value)}
        className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base text-gray-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20"
      />
    </label>
  )
}

function hasAnyValue(form: PartesFormData, keys: (keyof PartesFormData)[]): boolean {
  return keys.some((k) => form[k]?.trim())
}

const PARTE2_KEYS: (keyof PartesFormData)[] = ['parte2_nombre', 'parte2_dni', 'parte2_email', 'parte2_telefono']

export default function GestoriaPartesForm({
  requestId,
  initialData,
  uploading,
  uploadProgress,
  onSubmitForm,
  onUploadPdf,
}: Props) {
  const [form, setForm] = useState<PartesFormData>(() => ({
    ...EMPTY,
    ...(initialData as Partial<PartesFormData> | undefined),
  }))
  const [showParte2, setShowParte2] = useState(() =>
    hasAnyValue({ ...EMPTY, ...(initialData as Partial<PartesFormData> | undefined) }, PARTE2_KEYS),
  )
  const [saving, setSaving] = useState(false)

  const update = (id: keyof PartesFormData, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const removeParte2 = () => {
    setShowParte2(false)
    setForm((prev) => ({ ...prev, parte2_nombre: '', parte2_dni: '', parte2_email: '', parte2_telefono: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmitForm(showParte2 ? form : { ...form, ...Object.fromEntries(PARTE2_KEYS.map((k) => [k, ''])) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-gold-300/60 bg-[#fdfbf5] p-3 sm:p-4 space-y-4">
      <p className="text-xs text-gray-600 leading-relaxed">
        Completa los datos de las partes. También puedes adjuntar un PDF con la misma información.
      </p>

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <p className="sm:col-span-2 text-xs font-bold uppercase tracking-wide text-gold-700">Parte 1</p>
          {field('parte1_nombre', 'Nombre completo *', form.parte1_nombre, update, { required: true })}
          {field('parte1_dni', 'DNI / NIE', form.parte1_dni, update)}
          {field('parte1_email', 'Email', form.parte1_email, update, { type: 'email' })}
          {field('parte1_telefono', 'Teléfono', form.parte1_telefono, update, { type: 'tel' })}
        </div>

        {showParte2 ? (
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-gold-700">Parte 2</p>
              <button
                type="button"
                onClick={removeParte2}
                className="text-xs font-semibold text-gray-400 hover:text-red-600"
              >
                Quitar
              </button>
            </div>
            {field('parte2_nombre', 'Nombre completo *', form.parte2_nombre, update, { required: true })}
            {field('parte2_dni', 'DNI / NIE', form.parte2_dni, update)}
            {field('parte2_email', 'Email', form.parte2_email, update, { type: 'email' })}
            {field('parte2_telefono', 'Teléfono', form.parte2_telefono, update, { type: 'tel' })}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowParte2(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gold-500/50 text-gold-700 text-sm font-semibold min-h-[44px] px-4 hover:bg-cream-100 touch-manipulation"
          >
            + Añadir Parte 2 (si aplica)
          </button>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          {field('direccion_inmueble', 'Dirección del inmueble', form.direccion_inmueble, update, {
            placeholder: 'Calle, número, ciudad',
          })}
          {field('precio', 'Precio / renta acordada', form.precio, update, { placeholder: 'Ej. 250.000 €' })}
        </div>

        {field('condiciones', 'Condiciones principales', form.condiciones, update, {
          placeholder: 'Plazos, señal, condiciones suspensivas…',
        })}
        {field('notas', 'Notas adicionales', form.notas, update)}

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-forest-900 text-white text-sm font-bold min-h-[48px] px-5 disabled:opacity-60 touch-manipulation"
        >
          {saving ? 'Guardando…' : 'Guardar datos de las partes'}
        </button>
      </form>

      <div className="border-t border-gold-300/40 pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-2">Opcional: subir PDF con los datos</p>
        <GestoriaUploadActions
          docKey={`partes-pdf-${requestId}`}
          uploading={uploading}
          uploadProgress={uploadProgress}
          variant="primary"
          onPick={(file) => void onUploadPdf(file)}
        />
      </div>
    </div>
  )
}
