'use client'

import { useState } from 'react'

interface Service {
  key: string
  name: string
  price: number
}

interface Props {
  service: Service | null
  onClose: () => void
}

const BENEFITS = [
  {
    icon: '⚖️',
    title: 'Seguridad jurídica',
    desc: 'Contratos redactados por abogados especializados en derecho inmobiliario.',
  },
  {
    icon: '✍️',
    title: 'Redactado por expertos',
    desc: 'Adaptado a la normativa vigente y a las condiciones específicas de tu operación.',
  },
  {
    icon: '⚡',
    title: 'Entrega en 24 horas',
    desc: 'Recibes el contrato en tu email en menos de un día hábil tras la verificación.',
  },
  {
    icon: '🔒',
    title: 'Pago 100% seguro',
    desc: 'Procesado por Stripe. Tus datos bancarios nunca pasan por nuestros servidores.',
  },
]

export default function SolicitarModal({ service, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  if (!service) return null

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key:  service.key,
          client_email: form.email,
          client_name:  form.name,
          client_phone: form.phone,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al iniciar el pago')
      window.location.href = data.url
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : 'Error al enviar')
      setStatus('error')
    }
  }

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#c9962a] focus:border-[#c9962a]'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex overflow-hidden max-h-[90vh]">

        {/* ── Columna izquierda: confianza ─────────────────────────────── */}
        <div className="hidden md:flex flex-col w-[42%] bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] p-8 text-white flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Inmo</span><span className="text-[#f4c94a]">nest</span>
            </span>
          </div>

          {/* Servicio seleccionado */}
          <div className="bg-white/10 rounded-xl p-4 mb-8 border border-white/20">
            <p className="text-xs text-[#f4c94a] font-semibold uppercase tracking-wider mb-1">Servicio seleccionado</p>
            <p className="text-sm font-semibold leading-snug">{service.name}</p>
            <p className="text-3xl font-extrabold text-[#f4c94a] mt-2">{service.price} €</p>
            <p className="text-xs text-white/60 mt-1">Pago único · Sin suscripción</p>
          </div>

          {/* Beneficios */}
          <div className="space-y-5 flex-1">
            {BENEFITS.map(b => (
              <div key={b.title} className="flex gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#f4c94a]">{b.title}</p>
                  <p className="text-xs text-white/70 leading-relaxed mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Badges de confianza */}
          <div className="mt-8 pt-6 border-t border-white/20 space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#f4c94a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-white/70">Gestoría inmobiliaria profesional</p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#f4c94a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-white/70">+500 contratos tramitados</p>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: formulario ──────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7a5c1e] to-[#c9962a] px-6 py-5 text-white flex items-start justify-between gap-3 md:rounded-tr-2xl">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-80 mb-0.5">Completar pedido</p>
              <h3 className="text-base font-bold leading-tight">{service.name}</h3>
              <p className="text-2xl font-extrabold mt-1 md:hidden">{service.price} €</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white mt-1 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="María García López" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="maria@ejemplo.com" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="600 000 000" className={inp} />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{errMsg}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 bg-[#c9962a] text-white rounded-xl font-bold text-sm hover:bg-[#a87a20] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      Redirigiendo al pago…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pagar {service.price} € con tarjeta
                    </>
                  )}
                </button>

                {/* Beneficios en móvil */}
                <div className="md:hidden mt-5 space-y-3 border-t pt-4">
                  {BENEFITS.slice(0, 3).map(b => (
                    <div key={b.title} className="flex gap-2 text-xs text-gray-500">
                      <span className="flex-shrink-0">{b.icon}</span>
                      <span><strong className="text-gray-700">{b.title}:</strong> {b.desc}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Pago seguro con Stripe · Cifrado SSL
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

