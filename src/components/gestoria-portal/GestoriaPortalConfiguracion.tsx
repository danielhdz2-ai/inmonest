'use client'

import { useState } from 'react'

type Tab = 'datos' | 'seguridad' | 'baja'

type Props = {
  email: string
  initialName: string
  initialPhone: string
}

export default function GestoriaPortalConfiguracion({ email, initialName, initialPhone }: Props) {
  const [tab, setTab] = useState<Tab>('datos')

  // ── Datos personales ──────────────────────────────────────────────
  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [datosMsg, setDatosMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [datosSaving, setDatosSaving] = useState(false)

  async function handleSaveDatos(e: React.FormEvent) {
    e.preventDefault()
    setDatosSaving(true)
    setDatosMsg(null)
    try {
      const res = await fetch('/api/perfil/actualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      setDatosMsg(
        data.ok
          ? { ok: true, text: 'Datos actualizados correctamente.' }
          : { ok: false, text: data.error ?? 'Error al guardar.' },
      )
    } finally {
      setDatosSaving(false)
    }
  }

  // ── Cambio de contraseña ──────────────────────────────────────────
  const [pwNew, setPwNew] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pwSaving, setPwSaving] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (pwNew !== pwConfirm) {
      setPwMsg({ ok: false, text: 'Las contraseñas no coinciden.' })
      return
    }
    if (pwNew.length < 8) {
      setPwMsg({ ok: false, text: 'La contraseña debe tener al menos 8 caracteres.' })
      return
    }
    setPwSaving(true)
    setPwMsg(null)
    try {
      const res = await fetch('/api/perfil/cambiar-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: pwNew }),
      })
      const data = await res.json()
      if (data.ok) {
        setPwMsg({ ok: true, text: 'Contraseña actualizada correctamente.' })
        setPwNew('')
        setPwConfirm('')
      } else {
        setPwMsg({ ok: false, text: data.error ?? 'Error al cambiar la contraseña.' })
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
    if (bajaConfirm !== 'ELIMINAR') {
      setBajaMsg({ ok: false, text: 'Debes escribir ELIMINAR para confirmar.' })
      return
    }
    setBajaSaving(true)
    setBajaMsg(null)
    try {
      const res = await fetch('/api/perfil/eliminar-cuenta', { method: 'DELETE' })
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

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500">Gestiona tus datos personales y tu cuenta</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 p-1 rounded-xl w-fit overflow-x-auto">
        {([
          { id: 'datos', label: 'Datos personales' },
          { id: 'seguridad', label: 'Seguridad' },
          { id: 'baja', label: 'Dar de baja' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-[#c9962a] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB DATOS ────────────────────────────────────────────────── */}
      {tab === 'datos' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Información personal</h2>

          <form onSubmit={handleSaveDatos} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30 focus:border-[#c9962a] transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  datosMsg.ok
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
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
          <h2 className="font-semibold text-gray-900 mb-1">Cambiar contraseña</h2>
          <p className="text-sm text-gray-400 mb-5">La contraseña debe tener mínimo 8 caracteres.</p>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {[
              { label: 'Nueva contraseña', val: pwNew, set: setPwNew },
              { label: 'Confirmar contraseña', val: pwConfirm, set: setPwConfirm },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30 focus:border-[#c9962a] transition-colors pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPw ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>
            ))}

            {pwMsg && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  pwMsg.ok
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {pwMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={pwSaving}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {pwSaving ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Si has iniciado sesión con Google no tienes contraseña asignada. Para acceder usa siempre el inicio de sesión con Google.
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
                <h3 className="font-semibold text-red-800">Esta acción es irreversible</h3>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>• Se eliminarán tus favoritos y tu perfil</li>
                  <li>• Perderás el acceso a este panel de gestoría</li>
                  <li>• Tu expediente y contratos quedan protegidos por ley y no se eliminan, pero dejarás de poder consultarlos aquí</li>
                  <li>• Tu cuenta de acceso será desactivada por el equipo de Inmonest</li>
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
                onChange={(e) => setBajaConfirm(e.target.value)}
                placeholder="Escribe ELIMINAR"
                className="w-full border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400"
              />
              {bajaMsg && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    bajaMsg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
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
