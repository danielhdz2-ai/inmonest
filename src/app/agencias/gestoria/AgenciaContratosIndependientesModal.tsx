'use client'

import { useEffect, useState } from 'react'
import {
  AGENCIA_CONTRATOS_INDEPENDIENTES,
  agenciaContratoAhorroPct,
  type AgenciaContratoIndependiente,
} from '@/lib/agencias-gestoria-contratos'
import { AGENCIA_CONTRATO_PRECIO_REF } from '@/lib/agencias-gestoria-packs'

type Step = 'catalog' | 'checkout'

type Props = {
  onClose: () => void
}

const CATEGORY_PILL: Record<AgenciaContratoIndependiente['categoria'], string> = {
  Compraventa: 'bg-orange-100 text-orange-700',
  Alquiler: 'bg-orange-50 text-orange-600',
}

const EMPTY_FORM = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
}

export default function AgenciaContratosIndependientesModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>('catalog')
  const [selected, setSelected] = useState<AgenciaContratoIndependiente | null>(null)
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

  function handleComprar(contrato: AgenciaContratoIndependiente) {
    setSelected(contrato)
    setStep('checkout')
    setError('')
  }

  function handleBack() {
    setStep('catalog')
    setSelected(null)
    setError('')
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/agencias/gestoria/contrato/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_slug: selected.slug,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contratos-modal-title"
    >
      <div
        className={`bg-white w-full rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[94vh] overflow-y-auto ${
          step === 'catalog' ? 'sm:max-w-6xl' : 'sm:max-w-lg'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
              Contratos independientes B2B
            </p>
            <h2 id="contratos-modal-title" className="text-lg font-bold text-gray-900 mt-1">
              {step === 'catalog'
                ? 'Contrata contratos sueltos a tarifa agencia'
                : selected?.nombre}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {step === 'catalog'
                ? `110 €/contrato · entrega 4–5 h · FirmaCert incluida (vs ${AGENCIA_CONTRATO_PRECIO_REF} € retail)`
                : `${selected?.precioAgencia} € (IVA incl.) · entrega 4–5 h`}
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

        <div className="p-4 sm:p-6">
          {step === 'catalog' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AGENCIA_CONTRATOS_INDEPENDIENTES.map((contrato) => (
                <article
                  key={contrato.slug}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-200">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${contrato.image}')` }}
                      role="img"
                      aria-label={contrato.nombre}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_PILL[contrato.categoria]}`}
                    >
                      {contrato.categoria}
                    </span>
                    {contrato.badge && (
                      <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-gold-500 text-white">
                        {contrato.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5">
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-gold-500">
                          {contrato.precioAgencia} €
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium -mt-0.5">IVA incluido</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5">
                      {contrato.nombre}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-3">
                      {contrato.descripcion}
                    </p>
                    <p className="text-[11px] text-green-700 font-medium mb-3">
                      Ahorras {agenciaContratoAhorroPct(contrato)} % vs precio público ({contrato.precioRetail} €)
                    </p>
                    <ul className="space-y-1 mb-4">
                      {contrato.incluye.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                          <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleComprar(contrato)}
                      className="w-full py-2.5 bg-gold-500 text-white rounded-xl font-bold text-sm hover:bg-gold-600 transition-colors"
                    >
                      Comprar por {contrato.precioAgencia} €{' '}
                      <span className="font-normal text-xs opacity-90">(IVA incl.)</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {step === 'checkout' && selected && (
            <form onSubmit={(e) => void handleCheckout(e)} className="space-y-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600">
                Completa tus datos y serás redirigido a Stripe para pagar{' '}
                <strong>{selected.precioAgencia} €</strong> por el {selected.nombre}.
              </p>
              <Field
                label="Nombre *"
                value={form.nombre}
                onChange={(v) => setForm((f) => ({ ...f, nombre: v }))}
                required
              />
              <Field
                label="Agencia / Marca *"
                value={form.empresa}
                onChange={(v) => setForm((f) => ({ ...f, empresa: v }))}
                required
              />
              <Field
                label="Email *"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
              <Field
                label="Teléfono"
                type="tel"
                value={form.telefono}
                onChange={(v) => setForm((f) => ({ ...f, telefono: v }))}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gold-500 text-white font-bold rounded-full text-sm hover:bg-gold-600 disabled:opacity-60"
                >
                  {loading ? 'Redirigiendo a Stripe…' : 'Pagar en Stripe →'}
                </button>
              </div>
            </form>
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
