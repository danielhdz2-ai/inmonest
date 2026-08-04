'use client'

import { useEffect, useRef, useState } from 'react'
import {
  MAX_UPLOAD_BYTES,
  MOBILE_FILE_ACCEPT,
  buildStorageUploadForm,
  formatFileSize,
  isPdfFileName,
  storageUploadHeaders,
  validateUploadFile,
} from '@/lib/gestoria-upload'

type ExtraDocKey = 'nota-simple' | 'escrituras'
type UploadState = 'idle' | 'uploading' | 'done' | 'error'

interface FileState {
  file: File | null
  state: UploadState
  error?: string
}

const IDLE: FileState = { file: null, state: 'idle' }

const EXTRA_DOCS: { key: ExtraDocKey; label: string; hint: string }[] = [
  {
    key: 'nota-simple',
    label: 'Nota Simple registral',
    hint: 'PDF o imagen de la nota simple del Registro',
  },
  {
    key: 'escrituras',
    label: 'Otros',
    hint: 'PDF o imagen de cualquier otro documento útil',
  },
]

function DoneRedirect({ panelHref, email }: { panelHref: string; email: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.location.replace(panelHref)
    }, 1200)
    return () => window.clearTimeout(t)
  }, [panelHref])

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
          Abriendo tu panel de gestoría…
          {email ? <> Te contactaremos en <strong>{email}</strong>.</> : null}
        </p>
        <a
          href={panelHref}
          className="inline-block w-full px-6 py-3 bg-gold-500 text-white rounded-xl text-sm font-bold hover:bg-gold-600 transition-colors mb-3"
        >
          Ir ahora a mi panel
        </a>
      </div>
    </main>
  )
}

export default function CargaDocumentosContent({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(true)
  const [paymentError, setPaymentError] = useState(false)
  const [email, setEmail] = useState('')

  // DNI: PDF único, o foto anverso + reverso
  const [dniFront, setDniFront] = useState<FileState>(IDLE)
  const [dniBack, setDniBack] = useState<FileState>(IDLE)

  const [files, setFiles] = useState<Record<ExtraDocKey, FileState>>({
    'nota-simple': IDLE,
    escrituras: IDLE,
  })
  const [globalState, setGlobalState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [formHint, setFormHint] = useState('')
  const dniFrontRef = useRef<HTMLInputElement | null>(null)
  const dniBackRef = useRef<HTMLInputElement | null>(null)
  const inputRefs = useRef<Record<ExtraDocKey, HTMLInputElement | null>>({
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

  const dniFrontIsPdf = dniFront.file ? isPdfFileName(dniFront.file.name) : false
  // El reverso solo hace falta si el anverso es una foto (no PDF)
  const needsDniBack = Boolean(dniFront.file) && !dniFrontIsPdf
  const dniComplete = dniFrontIsPdf ? Boolean(dniFront.file) : Boolean(dniFront.file && dniBack.file)
  const dniMissing = !dniComplete

  const setDniFrontFile = (file: File | null) => {
    if (file) {
      const check = validateUploadFile(file.name, file.type, file.size)
      if (!check.ok) {
        setFormHint(check.error)
        return
      }
      // Si cambian el anverso a PDF, el reverso (si lo hubiera) ya no aplica
      if (isPdfFileName(file.name)) setDniBack(IDLE)
    }
    setFormHint('')
    setDniFront({ file, state: 'idle' })
  }

  const setDniBackFile = (file: File | null) => {
    if (file) {
      const check = validateUploadFile(file.name, file.type, file.size)
      if (!check.ok) {
        setFormHint(check.error)
        return
      }
    }
    setFormHint('')
    setDniBack({ file, state: 'idle' })
  }

  const setFile = (key: ExtraDocKey, file: File | null) => {
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

  const extraSelectedCount = EXTRA_DOCS.filter(d => files[d.key].file).length
  const selectedCount = (dniFront.file ? 1 : 0) + (dniBack.file ? 1 : 0) + extraSelectedCount
  const canSubmit = (Boolean(dniFront.file) || extraSelectedCount > 0) && globalState !== 'uploading'

  async function uploadOne(docKey: string, file: File): Promise<void> {
    const check = validateUploadFile(file.name, file.type, file.size)
    if (!check.ok) throw new Error(check.error)

    const urlRes = await fetch('/api/gestoria/upload-urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        doc_key: docKey,
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
      headers: storageUploadHeaders(),
      body: buildStorageUploadForm(file),
    })
    if (!putRes.ok) throw new Error(`Error al subir (${putRes.status})`)

    await fetch('/api/gestoria/register-doc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        doc_key: docKey,
        file_name: file.name,
        storage_path: urlData.path,
      }),
    }).then(async (r) => {
      if (!r.ok) {
        const err = await r.json().catch(() => ({})) as { error?: string }
        console.error('[register-doc]', err.error || r.status)
      }
    }).catch((e) => console.error('[register-doc]', e))
  }

  const handleUpload = async () => {
    if (!canSubmit) {
      setFormHint('Adjunta al menos un documento para continuar.')
      return
    }

    if (dniMissing && selectedCount > 0) {
      setFormHint(
        needsDniBack
          ? 'Vas a enviar sin el reverso del DNI. Si puedes, súbelo ahora.'
          : 'Vas a enviar sin el DNI. Si puedes, súbelo ahora.',
      )
    }

    setGlobalState('uploading')
    setFormHint('')

    // DNI (anverso, y reverso si aplica)
    if (dniFront.file) {
      setDniFront(prev => ({ ...prev, state: 'uploading' }))
      try {
        await uploadOne('dni', dniFront.file)
        setDniFront(prev => ({ ...prev, state: 'done' }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error al subir'
        setDniFront(prev => ({ ...prev, state: 'error', error: msg }))
        setGlobalState('error')
        setFormHint(msg)
        return
      }
    }
    if (dniBack.file) {
      setDniBack(prev => ({ ...prev, state: 'uploading' }))
      try {
        await uploadOne('dni-reverso', dniBack.file)
        setDniBack(prev => ({ ...prev, state: 'done' }))
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error al subir'
        setDniBack(prev => ({ ...prev, state: 'error', error: msg }))
        setGlobalState('error')
        setFormHint(msg)
        return
      }
    }

    // Nota simple / otros
    const toUpload = EXTRA_DOCS.filter(d => files[d.key].file)
    for (const doc of toUpload) {
      const { file } = files[doc.key]
      if (!file) continue
      setFiles(prev => ({ ...prev, [doc.key]: { ...prev[doc.key], state: 'uploading' } }))
      try {
        await uploadOne(doc.key, file)
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
          <svg className="animate-spin w-10 h-10 text-gold-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
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
            <a href="mailto:info@inmonest.com" className="text-gold-500 font-medium">info@inmonest.com</a>.
          </p>
          <a href="/gestoria" className="inline-block px-6 py-2.5 bg-gold-500 text-white rounded-full text-sm font-semibold">
            Volver a gestoría
          </a>
        </div>
      </main>
    )
  }

  if (globalState === 'done') {
    // session_id obligatorio: sin él el panel no encuentra el pago
    const panelHref = `/mi-cuenta/contratos?v=expediente&session_id=${encodeURIComponent(sessionId)}`
    return (
      <DoneRedirect panelHref={panelHref} email={email} />
    )
  }

  function renderDniCard() {
    const isDone = dniComplete && dniFront.state !== 'error' && dniBack.state !== 'error'
    const isError = dniFront.state === 'error' || dniBack.state === 'error'
    const isUploading = dniFront.state === 'uploading' || dniBack.state === 'uploading'

    return (
      <div
        className={`relative bg-white rounded-2xl border-2 transition-all duration-200 ${
          isDone ? 'border-green-400 bg-green-50/30' :
          isError ? 'border-red-400 bg-red-50/30' :
          dniMissing ? 'border-amber-300 bg-amber-50/40' :
          'border-dashed border-gray-200'
        }`}
      >
        <input
          ref={dniFrontRef}
          type="file"
          accept={MOBILE_FILE_ACCEPT}
          className="hidden"
          onChange={e => setDniFrontFile(e.target.files?.[0] ?? null)}
        />
        <input
          ref={dniBackRef}
          type="file"
          accept={MOBILE_FILE_ACCEPT}
          className="hidden"
          onChange={e => setDniBackFile(e.target.files?.[0] ?? null)}
        />

        <div className="p-5 flex items-center gap-4">
          <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
            isDone ? 'bg-green-100' : isError ? 'bg-red-100' : 'bg-amber-50'
          }`}>
            {isDone ? (
              <span className="text-green-600 font-bold">✓</span>
            ) : isUploading ? (
              <svg className="animate-spin w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
            ) : (
              <span className="text-gold-500 text-lg">🪪</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              DNI / NIE
              <span className="text-amber-700 text-xs font-bold ml-1">Obligatorio</span>
            </p>
            {dniFront.file ? (
              <p className="text-xs text-gray-500 truncate">
                {dniFront.file.name} · {formatFileSize(dniFront.file.size)}
                {dniFront.state === 'error' && <span className="text-red-500 ml-1">— {dniFront.error}</span>}
              </p>
            ) : (
              <p className="text-xs text-gray-400">PDF (ambas caras) o foto del anverso</p>
            )}
          </div>

          {dniFront.state !== 'uploading' && (
            <button
              type="button"
              onClick={() => dniFrontRef.current?.click()}
              className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-gold-500 border border-gold-500/40 rounded-lg hover:bg-amber-50 transition-colors min-h-[40px]"
            >
              {dniFront.file ? 'Cambiar' : 'Seleccionar'}
            </button>
          )}
        </div>

        {needsDniBack && (
          <div className="px-5 pb-5 -mt-1">
            <div className={`rounded-xl border-2 p-4 flex items-center gap-3 ${
              dniBack.file
                ? dniBack.state === 'error' ? 'border-red-300 bg-red-50/40' : 'border-gold-300 bg-cream-100/40'
                : 'border-amber-300 bg-amber-50/60'
            }`}>
              <span className="text-lg flex-shrink-0">
                {dniBack.file ? (dniBack.state === 'error' ? '⚠️' : '✓') : '📷'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900">Reverso del DNI · Obligatorio con foto</p>
                {dniBack.file ? (
                  <p className="text-xs text-gray-500 truncate">
                    {dniBack.file.name} · {formatFileSize(dniBack.file.size)}
                    {dniBack.state === 'error' && <span className="text-red-500 ml-1">— {dniBack.error}</span>}
                  </p>
                ) : (
                  <p className="text-xs text-amber-800">Sube también la parte de atrás del documento</p>
                )}
              </div>
              {dniBack.state !== 'uploading' && (
                <button
                  type="button"
                  onClick={() => dniBackRef.current?.click()}
                  className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-gold-500 border border-gold-500/40 rounded-lg bg-white hover:bg-amber-50 transition-colors min-h-[40px]"
                >
                  {dniBack.file ? 'Cambiar' : 'Añadir reverso'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
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
            Sube el DNI en PDF, o en foto (anverso y reverso). El DNI es el más importante.
            {email && <span className="block mt-1">Te contactaremos en <strong className="text-gray-700">{email}</strong>.</span>}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {selectedCount} archivo{selectedCount === 1 ? '' : 's'} listo{selectedCount === 1 ? '' : 's'}
            {dniMissing && (
              <span className="text-amber-700 font-semibold">
                {' '}· Falta: {needsDniBack ? 'reverso del DNI' : 'DNI'}
              </span>
            )}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {renderDniCard()}

          {EXTRA_DOCS.map(doc => {
            const state = files[doc.key]
            const isDone = state.state === 'done'
            const isError = state.state === 'error'
            const isUploading = state.state === 'uploading'

            return (
              <div
                key={doc.key}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-200 ${
                  isDone ? 'border-green-400 bg-green-50/30' :
                  isError ? 'border-red-400 bg-red-50/30' :
                  state.file ? 'border-gold-500/60' : 'border-dashed border-gray-200 hover:border-gold-500/50'
                }`}
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
                      <svg className="animate-spin w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                    ) : (
                      <span className="text-gold-500 text-lg">📄</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{doc.label}</p>
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
                      className="flex-shrink-0 px-3 py-2 text-xs font-semibold text-gold-500 border border-gold-500/40 rounded-lg hover:bg-amber-50 transition-colors min-h-[40px]"
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
          className="w-full py-4 bg-gradient-to-r from-gold-700 to-gold-500 text-white rounded-2xl font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-amber-200 min-h-[56px]"
        >
          {globalState === 'uploading' ? (
            <>Subiendo documentos…</>
          ) : selectedCount === 0 ? (
            <>Adjunta al menos un archivo</>
          ) : dniMissing ? (
            <>Enviar {selectedCount} documento{selectedCount === 1 ? '' : 's'} (falta el DNI)</>
          ) : (
            <>Enviar documentación ({selectedCount})</>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          PDF o foto · Hasta {formatFileSize(MAX_UPLOAD_BYTES)} por archivo · Cifrado en tránsito
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          ¿Prefieres enviarlos por email?{' '}
          <a href="mailto:info@inmonest.com" className="text-gold-500 font-semibold">info@inmonest.com</a>
        </p>
      </div>
    </main>
  )
}
