'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import GestoriaUploadActions from '@/components/GestoriaUploadActions'
import GestoriaPartesForm, { type PartesFormData } from '@/components/GestoriaPartesForm'
import { MAX_UPLOAD_BYTES, formatFileSize, validateUploadFile } from '@/lib/gestoria-upload'
import { resolveGestorForRequest } from '@/lib/gestoria-gestor'
import {
  WORKFLOW_STEPS,
  buildTimelineDates,
  computeGestoriaProgress,
  getServiceShortTitle,
  type UserDocRecord,
} from '@/lib/gestoria-client-progress'

export type PaidContrato = {
  id: string
  service_key: string
  service_name: string | null
  client_name: string | null
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

type Props = {
  contrato: PaidContrato
  userDocs: UserDocRecord[]
  uploading: string | null
  uploadProgress?: number | null
  downloading: boolean
  onUpload: (docKey: string, file: File) => Promise<void>
  onSubmitPartes: (data: PartesFormData) => Promise<void>
  onDownload: () => void
  onUploadError?: (message: string) => void
}

function CheckIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <span className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm flex-shrink-0">
        ✓
      </span>
    )
  }
  return (
    <span className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 border-gray-300 bg-white flex-shrink-0" />
  )
}

function formatShortDate(iso: string | null | undefined): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function GestoriaPaidPanel({
  contrato,
  userDocs,
  uploading,
  uploadProgress,
  downloading,
  onUpload,
  onSubmitPartes,
  onDownload,
  onUploadError,
}: Props) {
  const progress = useMemo(
    () => computeGestoriaProgress(contrato, userDocs),
    [contrato, userDocs],
  )

  const timelineDates = useMemo(
    () => buildTimelineDates(contrato, userDocs),
    [contrato, userDocs],
  )

  const gestor = useMemo(
    () => resolveGestorForRequest(contrato.assigned_to),
    [contrato.assigned_to],
  )

  const title = getServiceShortTitle(contrato.service_key, contrato.service_name)
  const maxSizeLabel = formatFileSize(MAX_UPLOAD_BYTES)
  const paidDate = contrato.paid_at
    ? new Date(contrato.paid_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  const requiredChecklist = progress.checklist.filter((c) => c.required)
  const optionalChecklist = progress.checklist.filter((c) => !c.required)
  const pendingCount = requiredChecklist.filter((c) => c.state === 'pending' || c.state === 'rejected').length

  const handleFilePick = async (docKey: string, file: File) => {
    const check = validateUploadFile(file.name, file.type, file.size)
    if (!check.ok) {
      onUploadError?.(check.error)
      return
    }
    await onUpload(docKey, file)
  }

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e8d48a]/40 bg-white shadow-xl shadow-[#c9962a]/5 -mx-1 sm:mx-0">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0d1a0f] via-[#1a2f1c] to-[#0d1a0f] px-4 sm:px-8 py-5 sm:py-7 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,42,0.18)_0%,_transparent_55%)]" />
        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9962a]/40 bg-[#c9962a]/10 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#f4d98a]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Activo
            </span>
            {contrato.amount_eur != null && (
              <p className="text-xl sm:text-2xl font-extrabold text-[#f4d98a] flex-shrink-0">
                {contrato.amount_eur} €
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight leading-tight">{title}</h2>
            <p className="mt-1 text-sm text-white/70 line-clamp-2">
              {contrato.client_name ? `Hola, ${contrato.client_name}` : 'Tu servicio de gestoría'}
              {paidDate ? ` · ${paidDate}` : ''}
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-sm sm:text-base font-semibold text-[#f4d98a]">
              Paso {progress.currentStep}/4 · {progress.stepLabel}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-white/60">
              <span>Progreso</span>
              <span className="font-bold text-[#f4d98a]">{progress.progressPercent}%</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c9962a] to-[#f4d98a] transition-all duration-700"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
          </div>

          {contrato.contract_path && (
            <button
              type="button"
              onClick={onDownload}
              disabled={downloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9962a] min-h-[48px] px-5 text-sm font-bold text-white active:bg-[#b8841e] transition-colors disabled:opacity-60 touch-manipulation"
            >
              {downloading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              Descargar contrato
            </button>
          )}
        </div>
      </div>

      {/* Timeline — scroll horizontal en móvil */}
      <div className="border-b border-gray-100 px-4 sm:px-8 py-4 bg-[#fafafa]">
        <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4 sm:overflow-visible sm:gap-3">
          {WORKFLOW_STEPS.map((step) => {
            const done = progress.currentStep > step.n
            const active = progress.currentStep === step.n
            const stepDate = formatShortDate(timelineDates.find((t) => t.step === step.n)?.date)
            return (
              <div
                key={step.n}
                className={`min-w-[118px] sm:min-w-0 snap-center flex-shrink-0 rounded-xl px-3 py-2.5 text-center transition-all ${
                  active
                    ? 'bg-white border-2 border-[#c9962a] shadow-md shadow-amber-100'
                    : done
                      ? 'bg-emerald-50 border border-emerald-200'
                      : 'bg-white border border-gray-100 opacity-60'
                }`}
              >
                <div className="text-base mb-0.5">{done ? '✓' : step.icon}</div>
                <p className={`text-[10px] sm:text-[11px] font-bold leading-tight ${active ? 'text-[#7a5c1e]' : done ? 'text-emerald-800' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                {stepDate && (
                  <p className="text-[9px] text-gray-400 mt-0.5">{stepDate}</p>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center px-2">{progress.stepDesc}</p>
      </div>

      <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 pb-24 sm:pb-8">
        {/* Tu gestor */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex gap-4 items-start shadow-sm">
          <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#e8d48a]">
            <Image src={gestor.foto} alt={gestor.nombre} fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9962a]">Tu gestor</p>
            <p className="text-base font-bold text-gray-900">{gestor.nombre}</p>
            <p className="text-xs text-gray-500 mt-0.5">{gestor.rol}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href={`tel:${gestor.telefonoTel}`}
                className="inline-flex items-center justify-center rounded-lg border border-[#c9962a] text-[#7a5c1e] text-xs font-bold min-h-[40px] px-3 touch-manipulation"
              >
                📞 {gestor.telefono}
              </a>
              <a
                href={`https://wa.me/${gestor.whatsapp}?text=${encodeURIComponent('Hola, necesito ayuda con mi servicio de gestoría')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white text-xs font-bold min-h-[40px] px-3 touch-manipulation"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Tu checklist</h3>
            {progress.requiredTotal > 0 && (
              <span className="self-start text-xs font-semibold text-[#7a5c1e] bg-[#fef9e8] border border-[#e8d48a] px-2.5 py-1 rounded-full">
                {progress.requiredUploaded}/{progress.requiredTotal} obligatorios
              </span>
            )}
          </div>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-3 sm:px-4 py-3.5">
              <CheckIcon done />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900">Pago recibido</p>
                <p className="text-xs text-emerald-700/80">Confirmado</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase">OK</span>
            </li>

            {requiredChecklist.map((item) => (
              <li
                key={item.key}
                className={`rounded-2xl border px-3 sm:px-4 py-3.5 space-y-3 ${
                  item.state === 'done'
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : item.state === 'rejected'
                      ? 'border-red-200 bg-red-50/50'
                      : item.state === 'reviewing'
                        ? 'border-amber-200 bg-amber-50/50'
                        : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckIcon done={item.state === 'done'} />
                  <span className="text-xl flex-shrink-0 leading-none mt-0.5">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    {item.uploaded && (
                      <p className="text-xs text-gray-400 mt-1 break-all">
                        {item.uploaded.file_name}
                        {item.state === 'reviewing' && ' · En revisión'}
                        {item.state === 'rejected' && ' · Sube de nuevo'}
                      </p>
                    )}
                  </div>
                  {item.state === 'done' && (
                    <span className="text-[10px] font-bold text-emerald-700 uppercase flex-shrink-0 pt-1">OK</span>
                  )}
                </div>

                {(item.state === 'pending' || item.state === 'rejected' || item.state === 'reviewing') && (
                  item.key === 'partes' ? (
                    <GestoriaPartesForm
                      requestId={contrato.id}
                      initialData={item.uploaded?.partes_data ?? null}
                      uploading={uploading === item.key}
                      uploadProgress={uploading === item.key ? uploadProgress : null}
                      onSubmitForm={onSubmitPartes}
                      onUploadPdf={(file) => handleFilePick(item.key, file)}
                    />
                  ) : (
                    <GestoriaUploadActions
                      docKey={item.key}
                      uploading={uploading === item.key}
                      uploadProgress={uploading === item.key ? uploadProgress : null}
                      variant={item.state === 'reviewing' ? 'replace' : 'primary'}
                      onPick={(file) => void handleFilePick(item.key, file)}
                    />
                  )
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            En móvil puedes fotografiar el DNI o subir PDF · Hasta {maxSizeLabel}
          </p>
        </div>

        {optionalChecklist.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">Opcionales</h4>
            <ul className="space-y-2">
              {optionalChecklist.map((item) => (
                <li key={item.key} className="rounded-xl border border-dashed border-gray-200 px-3 py-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-600 flex-1">{item.label}</span>
                  </div>
                  <GestoriaUploadActions
                    docKey={`opt-${item.key}`}
                    uploading={uploading === item.key}
                    uploadProgress={uploading === item.key ? uploadProgress : null}
                    variant={item.uploaded ? 'replace' : 'primary'}
                    onPick={(file) => void handleFilePick(item.key, file)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#fdf8ee] to-white p-4 space-y-3">
          <p className="text-sm font-bold text-gray-900">¿Prefieres enviar por email?</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            <a href="mailto:info@inmonest.com" className="text-[#c9962a] font-medium underline">
              info@inmonest.com
            </a>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
            <a
              href="tel:+34745022862"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#c9962a] text-[#7a5c1e] text-sm font-bold min-h-[48px] px-4 active:bg-[#fef9e8] touch-manipulation"
            >
              📞 Llamar
            </a>
            <a
              href="https://wa.me/34745022862?text=Hola,%20necesito%20ayuda%20con%20mi%20documentación%20de%20gestoría"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white text-sm font-bold min-h-[48px] px-4 active:opacity-90 touch-manipulation"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Barra fija móvil — ayuda rápida si faltan docs */}
      {pendingCount > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <p className="text-xs text-gray-600 flex-1 leading-snug">
              <span className="font-bold text-gray-900">{pendingCount}</span> doc{pendingCount > 1 ? 's' : ''} pendiente{pendingCount > 1 ? 's' : ''}
            </p>
            <a
              href="https://wa.me/34745022862?text=Hola,%20necesito%20ayuda%20subiendo%20documentos%20en%20mi%20panel%20de%20gestoría"
              className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white text-xs font-bold min-h-[44px] px-4 touch-manipulation"
            >
              Ayuda WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
