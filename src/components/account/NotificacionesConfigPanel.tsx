'use client'

import { useEffect, useState } from 'react'
import type { GestoriaNotificationPrefs } from '@/lib/notification-preferences'

const PREFS_META: {
  key: keyof GestoriaNotificationPrefs
  title: string
  desc: string
}[] = [
  {
    key: 'email_gestoria_pago',
    title: 'Confirmación de pago',
    desc: 'Te avisamos cuando tu pago se confirma y se abre el expediente.',
  },
  {
    key: 'email_gestoria_documentos',
    title: 'Documentos (recibido, validado o rechazado)',
    desc: 'Actualizaciones sobre la documentación que subes.',
  },
  {
    key: 'email_gestoria_expediente',
    title: 'Avance del expediente',
    desc: 'Cuando tu servicio pasa al siguiente paso (elaboración, revisión…).',
  },
  {
    key: 'email_gestoria_contrato',
    title: 'Contrato listo',
    desc: 'Te avisamos cuando puedes descargar tu contrato.',
  },
  {
    key: 'email_marketing',
    title: 'Novedades y ofertas de Inmonest',
    desc: 'Promociones y contenido comercial (opcional).',
  },
]

export default function NotificacionesConfigPanel() {
  const [prefs, setPrefs] = useState<GestoriaNotificationPrefs | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/perfil/notificaciones', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setPrefs(d.prefs ?? null))
      .catch(() => setPrefs(null))
  }, [])

  async function handleSave() {
    if (!prefs) return
    setSaving(true)
    setMsg(null)
    try {
      const res = await fetch('/api/perfil/notificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      })
      const data = await res.json()
      if (data.ok) {
        setPrefs(data.prefs)
        setMsg({ ok: true, text: 'Preferencias guardadas.' })
      } else {
        setMsg({ ok: false, text: data.error ?? 'Error al guardar.' })
      }
    } finally {
      setSaving(false)
    }
  }

  if (!prefs) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-gray-50 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black to-black p-5 sm:p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,150,42,0.2),transparent)]" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4d98a]">Inmonest</p>
          <h2 className="text-base sm:text-lg font-bold mt-1">Notificaciones por email</h2>
          <p className="text-sm text-white/70 mt-2">
            Elige qué avisos quieres recibir sobre tu expediente de gestoría.
            Los emails operativos importantes pueden seguir enviándose según la ley aplicable.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {PREFS_META.map((item) => (
          <label
            key={item.key}
            className="flex items-start gap-4 p-4 sm:p-5 cursor-pointer hover:bg-cream-100/30 transition-colors min-h-[72px] touch-manipulation"
          >
            <input
              type="checkbox"
              checked={prefs[item.key]}
              onChange={(e) =>
                setPrefs((p) => (p ? { ...p, [item.key]: e.target.checked } : p))
              }
              className="mt-1 h-5 w-5 rounded border-gray-300 text-gold-500 focus:ring-[#c9962a]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </label>
        ))}
      </div>

      {msg && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            msg.ok
              ? 'bg-cream-100 text-gold-700 border border-gold-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-gold-500 hover:bg-[#b8841e] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 min-h-[48px] touch-manipulation"
      >
        {saving ? 'Guardando…' : 'Guardar preferencias'}
      </button>
    </div>
  )
}
