'use client'

import { useEffect, useState } from 'react'
import type { AgenciaGestoriaPack } from '@/lib/agencias-gestoria-packs'

type Step = 'choice' | 'checkout' | 'info' | 'success'

type Props = {
  pack: AgenciaGestoriaPack
  onClose: () => void
}

const EMPTY_FORM = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  mensaje: '',
}

export default function AgenciaPackActionModal({ pack, onClose }: Props) {
  const [step, setStep] = useState<Step>('choice')
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/agencias/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pack_id: pack.id,
          client_name: form.nombre,
          client_email: form.email,
          client_phone: form.telefono,
          empresa: form.empresa,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'No se pudo iniciar el pago')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con Stripe')
      setLoading(false)
    }
  }

  async function handleInfoRequest(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/agencias/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          empresa: form.empresa,
          email: form.email,
          telefono: form.telefono,
          plan: `gestoria-${pack.id}`,
          mensaje: form.mensaje || `Solicitud de información — ${pack.nombre}`,
        }),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setStep('success')
    } catch {
      setError('Hubo un problema al enviar. Escríbenos a info@inmonest.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pack-modal-title"
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Pack gestoría B2B</p>
            <h2 id="pack-modal-title" className="text-lg font-bold text-gray-900 mt-1">
              {pack.nombre}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {pack.precioTotal.toLocaleString('es-ES')} €/año · {pack.contratosAnuales} contratos
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {step === 'choice' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Elige cómo quieres continuar con tu pack:
              </p>
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full text-left rounded-xl border-2 border-gold-400 bg-[#fdfbf5] p-4 hover:border-gold-500 transition-colors"
              >
                <p className="font-bold text-gray-900">1. Contratar y pagar anualidad</p>
                <p className="text-sm text-gray-600 mt-1">
                  Pago seguro con Stripe. Suscripción anual programada de{' '}
                  <strong>{pack.precioTotal.toLocaleString('es-ES')} €</strong> (IVA incl.).
                </p>
              </button>
              <button
                type="button"
                onClick={() => setStep('info')}
                className="w-full text-left rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <p className="font-bold text-gray-900">2. Solicitar información</p>
                <p className="text-sm text-gray-600 mt-1">
                  Te contactamos en 24 h para resolver dudas antes de activar el pack.
                </p>
              </button>
            </div>
          )}

          {step === 'checkout' && (
            <form onSubmit={(e) => void handleCheckout(e)} className="space-y-4">
              <p className="text-sm text-gray-600">
                Completa tus datos y serás redirigido a Stripe para pagar la anualidad de{' '}
                <strong>{pack.precioTotal.toLocaleString('es-ES')} €</strong>.
              </p>
              <Field label="Nombre *" value={form.nombre} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} required />
              <Field label="Agencia / Marca *" value={form.empresa} onChange={(v) => setForm((f) => ({ ...f, empresa: v }))} required />
              <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
              <Field label="Teléfono" type="tel" value={form.telefono} onChange={(v) => setForm((f) => ({ ...f, telefono: v }))} />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep('choice')} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900">
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gold-500 text-white font-bold rounded-full text-sm hover:bg-gold-600 disabled:opacity-60"
                >
                  {loading ? 'Redirigiendo a Stripe…' : 'Pagar anualidad en Stripe →'}
                </button>
              </div>
            </form>
          )}

          {step === 'info' && (
            <form onSubmit={(e) => void handleInfoRequest(e)} className="space-y-4">
              <p className="text-sm text-gray-600">
                Cuéntanos sobre tu agencia y te respondemos con la propuesta del {pack.nombre}.
              </p>
              <Field label="Nombre *" value={form.nombre} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} required />
              <Field label="Agencia / Marca *" value={form.empresa} onChange={(v) => setForm((f) => ({ ...f, empresa: v }))} required />
              <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
              <Field label="Teléfono" type="tel" value={form.telefono} onChange={(v) => setForm((f) => ({ ...f, telefono: v }))} />
              <label className="block">
                <span className="text-xs font-semibold text-gray-700">Mensaje (opcional)</span>
                <textarea
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
                  placeholder="Ej: operamos en Madrid y Valencia, 5 contratos al mes..."
                />
              </label>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep('choice')} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900">
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-full text-sm hover:bg-gray-700 disabled:opacity-60"
                >
                  {loading ? 'Enviando…' : 'Enviar solicitud de información'}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">Solicitud enviada</h3>
              <p className="text-sm text-gray-600 mb-6">Te contactaremos en menos de 24 horas.</p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-gold-500 text-white font-semibold rounded-full text-sm hover:bg-gold-600"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-700">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/30"
      />
    </label>
  )
}
