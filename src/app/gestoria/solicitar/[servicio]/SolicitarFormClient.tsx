'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  servicioSlug: string
  servicioNombre: string
  servicioPrecio: number
}

export default function SolicitarFormClient({ servicioSlug, servicioNombre, servicioPrecio }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-colors bg-white'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    try {
      const res = await fetch('/api/gestoria/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key:  servicioSlug,
          service_name: servicioNombre,
          price_eur:    String(servicioPrecio),
          client_name:  form.name,
          client_email: form.email,
          client_phone: form.phone,
          notes:        form.notes,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al enviar la solicitud')

      // Redirigir al panel de contratos donde aparece el método de pago
      router.push('/mi-cuenta/contratos?solicitud=1')
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : 'Error al enviar')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7a5c1e] to-[#c9962a] px-6 py-5 text-white">
        <p className="text-xs font-medium uppercase tracking-wider opacity-80 mb-0.5">Paso 1 de 2</p>
        <h2 className="text-lg font-bold">Tus datos de contacto</h2>
        <p className="text-white/70 text-sm mt-1">Rellena el formulario y te redirigimos al pago</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="María García López"
            className={inp}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="maria@ejemplo.com"
            className={inp}
          />
          <p className="text-xs text-gray-400 mt-1">Recibirás el contrato en este email</p>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="600 000 000"
            className={inp}
          />
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Detalles adicionales <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Ej: datos de las partes, dirección del inmueble, condiciones especiales…"
            className={`${inp} resize-none`}
          />
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            {errMsg}
          </div>
        )}

        {/* Resumen precio */}
        <div className="bg-[#fdf8ee] border border-[#e8d48a] rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-700 font-medium">{servicioNombre}</span>
          <div className="text-right">
            <div className="text-xl font-bold text-[#c9a84c]">{servicioPrecio} €</div>
            <div className="text-[10px] text-gray-500 -mt-0.5">IVA incluido</div>
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Guardando solicitud…
            </>
          ) : (
            <>
              Continuar al pago
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Pago seguro con Stripe · Tus datos no se almacenan en nuestros servidores
        </p>
      </form>
    </div>
  )
}
