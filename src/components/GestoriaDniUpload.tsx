'use client'

import { useRef } from 'react'
import { MOBILE_CAMERA_ACCEPT, MOBILE_FILE_ACCEPT, isPdfFileName } from '@/lib/gestoria-upload'
import type { UserDocRecord } from '@/lib/gestoria-client-progress'

type Props = {
  front: UserDocRecord | null
  back: UserDocRecord | null
  uploadingKey: string | null // 'dni' | 'dni-reverso' | null
  uploadProgress?: number | null
  onPick: (docKey: 'dni' | 'dni-reverso', file: File) => void
}

function MiniProgress({ percent }: { percent: number }) {
  return (
    <div className="w-full space-y-1 mt-2">
      <div className="flex justify-between text-[10px] font-semibold text-gray-500">
        <span>Subiendo…</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-[#f4d98a] transition-all duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Subida del DNI: admite PDF único (ambas caras) o foto de anverso + reverso.
 * Si el anverso subido es PDF, no se pide reverso. Si es foto, se exige reverso.
 */
export default function GestoriaDniUpload({ front, back, uploadingKey, uploadProgress, onPick }: Props) {
  const frontCameraRef = useRef<HTMLInputElement>(null)
  const frontFileRef = useRef<HTMLInputElement>(null)
  const backCameraRef = useRef<HTMLInputElement>(null)
  const backFileRef = useRef<HTMLInputElement>(null)

  const frontIsPdf = isPdfFileName(front?.file_name)
  const needsBack = Boolean(front) && !frontIsPdf
  const uploadingFront = uploadingKey === 'dni'
  const uploadingBack = uploadingKey === 'dni-reverso'

  const pick = (docKey: 'dni' | 'dni-reverso', file: File | undefined, reset: () => void) => {
    if (!file) return
    onPick(docKey, file)
    reset()
  }

  const primaryClass =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-forest-900 active:bg-[#1a2e1c] text-white text-sm font-bold min-h-[48px] px-4 transition-colors disabled:opacity-60 touch-manipulation'
  const secondaryClass =
    'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0d1a0f] bg-white active:bg-gray-50 text-[#0d1a0f] text-sm font-bold min-h-[48px] px-4 transition-colors disabled:opacity-60 touch-manipulation'
  const replaceClass = 'text-sm text-gold-500 font-semibold min-h-[44px] px-2 touch-manipulation'

  return (
    <div className="w-full space-y-3">
      {/* Anverso / PDF completo */}
      <input
        ref={frontCameraRef}
        type="file"
        accept={MOBILE_CAMERA_ACCEPT}
        capture="environment"
        className="hidden"
        onChange={(e) => pick('dni', e.target.files?.[0], () => { e.target.value = '' })}
      />
      <input
        ref={frontFileRef}
        type="file"
        accept={MOBILE_FILE_ACCEPT}
        className="hidden"
        onChange={(e) => pick('dni', e.target.files?.[0], () => { e.target.value = '' })}
      />

      {front ? (
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-500 flex-1 min-w-0 truncate">
            {frontIsPdf ? 'PDF: ' : 'Anverso: '}
            <span className="font-medium text-gray-700">{front.file_name}</span>
          </p>
          {uploadingFront ? (
            <span className="text-xs text-gray-400">Subiendo…</span>
          ) : (
            <button type="button" onClick={() => frontFileRef.current?.click()} className={replaceClass}>
              Reemplazar
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:min-w-[240px] sm:ml-auto">
          {uploadingFront && uploadProgress != null && <MiniProgress percent={uploadProgress} />}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            <button type="button" disabled={uploadingFront} onClick={() => frontCameraRef.current?.click()} className={secondaryClass}>
              📷 Foto
            </button>
            <button type="button" disabled={uploadingFront} onClick={() => frontFileRef.current?.click()} className={primaryClass}>
              📁 PDF/Archivo
            </button>
          </div>
          <button
            type="button"
            disabled={uploadingFront}
            onClick={() => frontFileRef.current?.click()}
            className={`${primaryClass} hidden sm:inline-flex w-full`}
          >
            {uploadingFront ? 'Subiendo…' : 'Subir DNI (PDF o foto)'}
          </button>
        </div>
      )}

      {/* Reverso — solo si el anverso es una foto */}
      {needsBack && (
        <div
          className={`rounded-xl border-2 p-3.5 flex items-center gap-3 ${
            back ? 'border-gold-200 bg-cream-100/50' : 'border-gray-200 bg-gray-50/60'
          }`}
        >
          <input
            ref={backCameraRef}
            type="file"
            accept={MOBILE_CAMERA_ACCEPT}
            capture="environment"
            className="hidden"
            onChange={(e) => pick('dni-reverso', e.target.files?.[0], () => { e.target.value = '' })}
          />
          <input
            ref={backFileRef}
            type="file"
            accept={MOBILE_FILE_ACCEPT}
            className="hidden"
            onChange={(e) => pick('dni-reverso', e.target.files?.[0], () => { e.target.value = '' })}
          />
          <span className="text-lg flex-shrink-0">{back ? '✓' : '📷'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900">Reverso del DNI</p>
            {back ? (
              <p className="text-xs text-gray-500 truncate">{back.file_name}</p>
            ) : (
              <p className="text-xs text-gray-500">Si quieres, añade también la parte de atrás</p>
            )}
            {uploadingBack && uploadProgress != null && <MiniProgress percent={uploadProgress} />}
          </div>
          {!uploadingBack && (
            <button
              type="button"
              onClick={() => backCameraRef.current?.click()}
              className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-gold-500 border border-gold-500/40 rounded-lg bg-white hover:bg-amber-50 transition-colors min-h-[40px]"
            >
              {back ? 'Cambiar' : 'Añadir'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
