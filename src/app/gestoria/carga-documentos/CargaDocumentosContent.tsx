'use client'

import { useEffect, useRef, useState } from 'react'
import {
  MAX_UPLOAD_BYTES,
  MOBILE_FILE_ACCEPT,
  formatFileSize,
  storageUploadHeaders,
  validateUploadFile,
} from '@/lib/gestoria-upload'

type DocKey = 'dni' | 'nota-simple' | 'escrituras'

interface DocDef {
  key: DocKey
  label: string
  hint: string
  required: boolean
}

const DOCS: DocDef[] = [
  {
    key: 'dni',
    label: 'DNI / NIE (ambas caras)',
    hint: 'PDF o foto (JPG/PNG) del anverso y reverso',
    required: true,
  },
  {
    key: 'nota-simple',
    label: 'Nota Simple registral',
    hint: 'PDF o imagen de la nota simple del Registro',
    required: false,
  },
  {
    key: 'escrituras',
    label: 'Otros',
    hint: 'PDF o imagen de cualquier otro documento útil',
    required: false,
  },
]

type UploadState = 'idle' | 'uploading' | 'done' | 'error'

interface FileState {
  file: File | null
  state: UploadState
  error?: string
}

export default function CargaDocumentosContent({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(true)
  const [paymentError, setPaymentError] = useState(false)
  const [email, setEmail] = useState('')
  const [files, setFiles] = useState<Record<DocKey, FileState>>({
    dni: { file: null, state: 'idle' },
    'nota-simple': { file: null, state: 'idle' },
    escrituras: { file: null, state: 'idle' },
  })
  const [globalState, setGlobalState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [formHint, setFormHint] = useState('')
  const [drag, setDrag] = useState<DocKey | null>(null)
  const inputRefs = useRef<Record<DocKey, HTMLInputElement | null>>({
    dni: null,
    'nota-simple': null,
    escrituras: null,
  })

  useEffect(() => {
    if (!sessionId) {
      setPaymentError(true)
      setLoading(false)
      return
    }
    Promise.all([
      fetch(`/api/gestoria/confirmar-pago?session_id=${sessionId}`).catch(() => null),
      fetch(`/api/gestoria/upload-urls?session_id=${sessionId}`),
    ])
      .then(async ([, uploadRes]) => {
        const data = await uploadRes.json() as { customer_email?: string; error?: string }
        if (data.error) {
          setPaymentError(true)
        } else {
          setEmail(data.customer_email ?? '')
        }
      })
      .catch(() => setPaymentError(true))
      .finally(() => setLoading(false))
  }, [sessionId])

  const setFile = (key: DocKey, file: File | null) => {
    if (file) {
      const check = validateUploadFile(file.name, file.type, file.size)
      if (!check.ok) {
        setFormHint(check.error)
        return
      }
    }
    setFormHint('')
    setFiles(prev => ({ ...prev, [key]: { file, state: 'idle' } }))
  }

  const handleDrop = (key: DocKey, e: React.DragEvent) => {
    e.preventDefault()
    setDrag(null)
    const f = e.dataTransfer.files[0]
    if (f) setFile(key, f)
  }

  const selectedCount = DOCS.filter(d => files[d.key].file).length
  const missingRequired = DOCS.filter(d => d.required && !files[d.key].file)
  const canSubmit = selectedCount >= 1 && globalState !== 'uploading'

  const handleUpload = async () => {
    if (!canSubmit) {
      if (missingRequired.length) {
        setFormHint(`Falta adjuntar: ${missingRequired.map(d => d.label).join(', ')}`)
      } else {
        setFormHint('Adjunta al menos un documento para continuar.')
      }
      return
    }

    // Si falta el DNI (recomendado), avisar pero permitir si hay otros
    if (missingRequired.length && selectedCount > 0) {
      setFormHint(`Vas a enviar sin: ${missingRequired.map(d => d.label).join(', ')}. Si puedes, súbelo ahora.`)
    }

    setGlobalState('uploading')
    setFormHint('')

    const toUpload = DOCS.filter(d => files[d.key].file)

    for (const doc of toUpload) {
      const { file } = files[doc.key]
      if (!file) continue
      setFiles(prev => ({ ...prev, [doc.key]: { ...prev[doc.key], state: 'uploading' } }))

      try {
        const check = validateUploadFile(file.name, file.type, file.size)
        if (!check.ok) throw new Error(check.error)

        const urlRes = await fetch('/api/gestoria/upload-urls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            doc_key: doc.key,
            file_name: file.name,
            mime_type: file.type,
          }),
        })
        const urlData = await urlRes.json() as {
          signedUrl?: string
          path?: string
          contentType?: string
          error?: string
        }
        if (!urlRes.ok || !urlData.signedUrl || !urlData.path) {
          throw new Error(urlData.error || 'No se obtuvo URL de subida')
        }

        const putRes = await fetch(urlData.signedUrl, {
          method: 'PUT',
          headers: storageUploadHeaders(urlData.contentType ?? check.mime),
          body: file,
        })
        if (!putRes.ok) throw new Error(`Error al subir (${putRes.status})`)

        await fetch('/api/gestoria/register-doc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            doc_key: doc.key,
            file_name: file.name,
            storage_path: urlData.path,
          }),
        }).catch(() => null)

        setFiles(prev => ({ ...prev, [doc.key]: { ...prev[doc.key], state: 'done' } }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error al subir'
        setFiles(prev => ({ ...prev, [doc.key]: { ...prev[doc.key], state: 'error', error: msg } }))
        setGlobalState('error')
        setFormHint(msg)
        return
      }
    }

    try {
      await fetch('/api/gestoria/notify-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      })
    } catch {
      /* non-critical */
    }

    setGlobalState('done')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-10 h-10 text-[#c9962a] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Verificando pago…</p>
        </div>
      </main>
    )
  }

  if (paymentError) {
    return (
      <main className="min-h-screen bg-[#faf8f4] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pago no completado</h2>
          <p className="text-sm text-gray-500 mb-6">
            No hemos podido verificar tu pago. Escríbenos a{' '}
            <a href="mailto:info@inmonest.com" className="text-[#c9962a] font-medium">info@inmonest.com</a>.
          </p>
          <a href="/gestoria" className="inline-block px-6 py-2.5 bg-[#c9962a] text-white rounded-full text-sm font-semibold">
            Volver a gestoría
          </a>
        </div>
      </main>
    )
  }

  if (globalState === 'done') {
    const panelHref = `/mi-cuenta/contratos?pago=1&session_id=${encodeURIComponent(sessionId)}&v=expediente`
    return (
      <main className="min-h-screen bg-[#faf8f4] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Documentos recibidos!</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Nuestro equipo los revisará y te contactará
            {email ? <> en <strong>{email}</strong></> : ''} en menos de <strong>24 horas</strong>.
          </p>
          <a
            href={panelHref}
            className="inline-block w-full px-6 py-3 bg-[#c9962a] text-white rounded-xl text-sm font-bold hover:bg-[#a87a20] transition-colors mb-3"
          >
            Ir a mi panel de documentos
          </a>
          <a href="/gestoria" className="inline-block text-sm text-gray-500 hover:text-[#c9962a]">
            Volver a gestoría
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Pago confirmado
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Carga tu documentación</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Adjunta los documentos (PDF o foto). El DNI es el más importante.
            {email && <span className="block mt-1">Te contactaremos en <strong className="text-gray-700">{email}</strong>.</span>}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {selectedCount}/3 archivos listos
            {missingRequired.length > 0 && (
              <span className="text-amber-700 font-semibold"> · Falta: {missingRequired.map(d => d.label).join(', ')}</span>
            )}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {DOCS.map(doc => {
            const state = files[doc.key]
            const isDragging = drag === doc.key
            const isDone = state.state === 'done'
            const isError = state.state === 'error'
            const isUploading = state.state === 'uploading'
            const isMissing = doc.required && !state.file

            return (
              <div
                key={doc.key}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-200 ${
                  isDone ? 'border-green-400 bg-green-50/30' :
                  isError ? 'border-red-400 bg-red-50/30' :
                  isMissing ? 'border-amber-300 bg-amber-50/40' :
                  isDragging ? 'border-[#c9962a] bg-amber-50/40 scale-[1.01]' :
                  state.file ? 'border-[#c9962a]/60' : 'border-dashed border-gray-200 hover:border-[#c9962a]/50'
                }`}
                onDragOver={e => { e.preventDefault(); setDrag(doc.key) }}
                onDragLeave={() => setDrag(null)}
                onDrop={e => handleDrop(doc.key, e)}
              >
                <input
                  ref={el => { inputRefs.current[doc.key] = el }}
                  type="file"
                  accept={MOBILE_FILE_ACCEPT}
                  className="hidden"
                  onChange={e => setFile(doc.key, e.target.files?.[0] ?? null)}
                />

                <div className="p-5 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                    isDone ? 'bg-green-100' : isError ? 'bg-red-100' : 'bg-amber-50'
                  }`}>
                    {isDone ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : isUploading ? (
                      <svg className="animate-spin w-5 h-5 text-[#c9962a]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                    ) : (
                      <span className="text-[#c9962a] text-lg">📄</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {doc.label}
                      {doc.required && <span className="text-amber-700 text-xs font-bold ml-1">Obligatorio</span>}
                    </p>
                    {state.file ? (
                      <p className="text-xs text-gray-500 truncate">
                        {state.file.name} · {formatFileSize(state.file.size)}
                        {isError && <span className="text-red-500 ml-1">— {state.error}</span>}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">{doc.hint}</p>
                    )}
                  </div>

                  {!isDone && !isUploading && (
                    <button
                      type="button"
                      onClick={() => inputRefs.current[doc.key]?.click()}
                      className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-[#c9962a] border border-[#c9962a]/40 rounded-lg hover:bg-amber-50 transition-colors min-h-[40px]"
                    >
                      {state.file ? 'Cambiar' : 'Seleccionar'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {(formHint || globalState === 'error') && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900 mb-4">
            {formHint || 'Hubo un error al subir. Inténtalo de nuevo o escribe a info@inmonest.com.'}
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={globalState === 'uploading'}
          className="w-full py-4 bg-gradient-to-r from-[#7a5c1e] to-[#c9962a] text-white rounded-2xl font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-amber-200 min-h-[56px]"
        >
          {globalState === 'uploading' ? (
            <>Subiendo documentos…</>
          ) : selectedCount === 0 ? (
            <>Adjunta al menos un archivo</>
          ) : missingRequired.length > 0 ? (
            <>Enviar {selectedCount} documento{selectedCount === 1 ? '' : 's'} (falta DNI)</>
          ) : (
            <>Enviar documentación ({selectedCount})</>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          PDF o foto · Hasta {formatFileSize(MAX_UPLOAD_BYTES)} por archivo · Cifrado en tránsito
        </p>
      </div>
    </main>
  )
}
