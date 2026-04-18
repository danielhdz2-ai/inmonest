'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface Props {
  userId: string
  email: string
  initialName: string
  initialPhone: string
  initialAvatar: string | null
}

type Tab = 'datos' | 'seguridad' | 'baja'

export default function PerfilClient({ userId, email, initialName, initialPhone, initialAvatar }: Props) {
  const [tab, setTab] = useState<Tab>('datos')

  // ── Datos personales ──────────────────────────────────────────────
  const [name, setName]   = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [datosMsg, setDatosMsg]   = useState<{ ok: boolean; text: string } | null>(null)
  const [datosSaving, setDatosSaving] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(initialAvatar)
  const avatarRef = useRef<HTMLInputElement>(null)

  async function handleSaveDatos(e: React.FormEvent) {
    e.preventDefault()
    setDatosSaving(true)
    setDatosMsg(null)
    try {
      const res = await fetch('/api/perfil/actualizar', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ full_name: name.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      setDatosMsg(data.ok ? { ok: true, text: 'Perfil actualizado correctamente.' } : { ok: false, text: data.error ?? 'Error al guardar.' })
    } finally {
      setDatosSaving(false)
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setAvatarSrc(preview)
    const form = new FormData()
    form.append('file', file)
    const res  = await fetch('/api/perfil/avatar', { method: 'POST', body: form })
    const data = await res.json()
    if (data.url) setAvatarSrc(data.url)
  }

  // ── Cambio de contraseña ──────────────────────────────────────────
  const [pwCurrent, setPwCurrent] = useState('')
  const [pwNew, setPwNew]         = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [pwMsg, setPwMsg]   = useState<{ ok: boolean; text: string } | null>(null)
  const [pwSaving, setPwSaving] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (pwNew !== pwConfirm) { setPwMsg({ ok: false, text: 'Las nuevas contraseñas no coinciden.' }); return }
    if (pwNew.length < 8)    { setPwMsg({ ok: false, text: 'La contraseña debe tener al menos 8 caracteres.' }); return }
    setPwSaving(true)
    setPwMsg(null)
    try {
      const res  = await fetch('/api/perfil/cambiar-password', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ current_password: pwCurrent, new_password: pwNew }),
      })
      const data = await res.json()
      if (data.ok) {
        setPwMsg({ ok: true, text: 'Contraseña actualizada correctamente.' })
        setPwCurrent(''); setPwNew(''); setPwConfirm('')
      } else {
        setPwMsg({ ok: false, text: data.error ?? 'Error al cambiar contraseña.' })
      }
    } finally {
      setPwSaving(false)
    }
  }

  // ── Baja de cuenta ────────────────────────────────────────────────
  const [bajaConfirm, setBajaConfirm] = useState('')
  const [bajaMsg, setBajaMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [bajaSaving, setBajaSaving] = useState(false)

  async function handleDeleteAccount(e: React.FormEvent) {
    e.preventDefault()
    if (bajaConfirm !== 'ELIMINAR') { setBajaMsg({ ok: false, text: 'Debes escribir ELIMINAR para confirmar.' }); return }
    setBajaSaving(true)
    setBajaMsg(null)
    try {
      const res  = await fetch('/api/perfil/eliminar-cuenta', { method: 'DELETE' })
      const data = await res.json()
      if (data.ok) {
        window.location.href = '/?baja=1'
      } else {
        setBajaMsg({ ok: false, text: data.error ?? 'Error al eliminar la cuenta.' })
      }
    } finally {
      setBajaSaving(false)
    }
  }

  const initials = (name || email).slice(0, 2).toUpperCase()

  return (
    <div className="max-w-2xl space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {([
          { id: 'datos',    label: '👤 Datos personales' },
          { id: 'seguridad', label: '🔒 Seguridad' },
          { id: 'baja',     label: '🗑️ Dar de baja' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? 'bg-white text-[#c9962a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB DATOS ────────────────────────────────────────────────── */}
      {tab === 'datos' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Informacion personal</h2>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
            <div className="relative">
              {avatarSrc ? (
                <Image src={avatarSrc} alt="Avatar" width={72} height={72} className="rounded-full object-cover w-[72px] h-[72px]" />
              ) : (
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#c9962a] to-[#7a5c1e] flex items-center justify-center text-white font-bold text-xl">
                  {initials}
                </div>
              )}
              <button
                onClick={() => avatarRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#c9962a] rounded-full flex items-center justify-center text-white hover:bg-[#b8841e] transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div>
              <p className="font-medium text-gray-900">{name || email}</p>
              <p className="text-sm text-gray-400">{email}</p>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button onClick={() => avatarRef.current?.click()} className="text-xs text-[#c9962a] hover:underline mt-1">Cambiar foto</button>
            </div>
          </div>

          <form onSubmit={handleSaveDatos} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30 focus:border-[#c9962a] transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30 focus:border-[#c9962a] transition-colors"
                placeholder="+34 6XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            {datosMsg && (
              <div className={`rounded-xl px-4 py-3 text-sm ${datosMsg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {datosMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={datosSaving}
              className="w-full bg-[#c9962a] hover:bg-[#b8841e] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {datosSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      )}

      {/* ── TAB SEGURIDAD ────────────────────────────────────────────── */}
      {tab === 'seguridad' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Cambiar contrasena</h2>
          <p className="text-sm text-gray-400 mb-5">La contrasena debe tener minimo 8 caracteres.</p>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {[
              { label: 'Contrasena actual',    val: pwCurrent, set: setPwCurrent },
              { label: 'Nueva contrasena',     val: pwNew,     set: setPwNew },
              { label: 'Confirmar contrasena', val: pwConfirm, set: setPwConfirm },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30 focus:border-[#c9962a] transition-colors pr-10"
                    required
                    minLength={1}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPw ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {pwMsg && (
              <div className={`rounded-xl px-4 py-3 text-sm ${pwMsg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {pwMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={pwSaving}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {pwSaving ? 'Actualizando...' : 'Actualizar contrasena'}
            </button>
          </form>

          {/* Info adicional */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Si has iniciado sesion con Google no tienes contrasena asignada. Para acceder usa siempre el inicio de sesion con Google.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB BAJA ─────────────────────────────────────────────────── */}
      {tab === 'baja' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <h3 className="font-semibold text-red-800">Esta accion es irreversible</h3>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>• Se eliminaran todos tus anuncios publicados</li>
                  <li>• Se eliminaran todos tus favoritos y mensajes</li>
                  <li>• No podras recuperar el acceso a tus contratos</li>
                  <li>• Tu cuenta de acceso sera desactivada</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Eliminar mi cuenta</h2>
            <p className="text-sm text-gray-400 mb-5">
              Para confirmar, escribe <strong className="text-gray-700">ELIMINAR</strong> en el campo de texto.
            </p>
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                value={bajaConfirm}
                onChange={e => setBajaConfirm(e.target.value)}
                placeholder="Escribe ELIMINAR"
                className="w-full border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
              />
              {bajaMsg && (
                <div className={`rounded-xl px-4 py-3 text-sm ${bajaMsg.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {bajaMsg.text}
                </div>
              )}
              <button
                type="submit"
                disabled={bajaSaving || bajaConfirm !== 'ELIMINAR'}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {bajaSaving ? 'Procesando...' : 'Eliminar mi cuenta definitivamente'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
