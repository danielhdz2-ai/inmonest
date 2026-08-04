'use client'

import { useRef } from 'react'
import { MOBILE_CAMERA_ACCEPT, MOBILE_FILE_ACCEPT } from '@/lib/gestoria-upload'

type Props = {
  docKey: string
  uploading: boolean
  uploadProgress?: number | null
  variant: 'primary' | 'replace'
  onPick: (file: File) => void
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full space-y-1">
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

/** Botones de subida optimizados para móvil: cámara + archivos, targets táctiles 48px */
export default function GestoriaUploadActions({
  docKey,
  uploading,
  uploadProgress,
  variant,
  onPick,
}: Props) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined, reset: () => void) => {
    if (!file) return
    onPick(file)
    reset()
  }

  const primaryClass =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-forest-900 active:bg-[#1a2e1c] text-white text-sm font-bold min-h-[48px] px-4 transition-colors disabled:opacity-60 touch-manipulation'
  const secondaryClass =
    'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0d1a0f] bg-white active:bg-gray-50 text-[#0d1a0f] text-sm font-bold min-h-[48px] px-4 transition-colors disabled:opacity-60 touch-manipulation'

  if (variant === 'replace') {
    return (
      <div className="space-y-2 sm:ml-auto">
        <input
          ref={fileRef}
          type="file"
          accept={MOBILE_FILE_ACCEPT}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0], () => { e.target.value = '' })}
        />
        {uploading && uploadProgress != null && <ProgressBar percent={uploadProgress} />}
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="text-sm text-gold-500 font-semibold min-h-[44px] px-2 touch-manipulation"
        >
          {uploading ? 'Subiendo…' : 'Reemplazar'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full sm:w-auto sm:min-w-[200px] sm:ml-auto">
      <input
        ref={cameraRef}
        id={`cam-${docKey}`}
        type="file"
        accept={MOBILE_CAMERA_ACCEPT}
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], () => { e.target.value = '' })}
      />
      <input
        ref={fileRef}
        id={`file-${docKey}`}
        type="file"
        accept={MOBILE_FILE_ACCEPT}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0], () => { e.target.value = '' })}
      />
      {uploading && uploadProgress != null && <ProgressBar percent={uploadProgress} />}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        <button
          type="button"
          disabled={uploading}
          onClick={() => cameraRef.current?.click()}
          className={secondaryClass}
        >
          {uploading ? '…' : '📷 Foto'}
        </button>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className={primaryClass}
        >
          {uploading ? 'Subiendo…' : '📁 Archivo'}
        </button>
      </div>
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
        className={`${primaryClass} hidden sm:inline-flex w-full`}
      >
        {uploading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Subiendo…
          </>
        ) : (
          'Subir archivo'
        )}
      </button>
    </div>
  )
}
