'use client'

import { useState } from 'react'
import { gtmPush } from '@/components/GTMProvider'
import HoneypotField from '@/components/HoneypotField'
import TurnstileWidget from '@/components/TurnstileWidget'
import { useBotProtection } from '@/hooks/useBotProtection'

type Props = {
  ciudad: string
  servicio?: string
  precioLabel?: string
}

export default function GestoriaPideInfoForm({
  ciudad,
  servicio = 'contrato de alquiler LAU',
  precioLabel,
}: Props) {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const {
    honeypot,
    setHoneypot,
    turnstileEnabled,
    turnstileSiteKey,
    setTurnstileToken,
    getProtectionPayload,
  } = useBotProtection()

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrMsg('')
    if (!form.nombre.trim()) {
      setErrMsg('Indica tu nombre.')
      setStatus('error')
      return
    }
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, '').length < 9) {
      setErrMsg('Indica un teléfono válido.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          email: form.email.trim() || undefined,
          telefono: form.telefono.trim(),
          asunto: `Pide info — ${servicio} en ${ciudad}`,
          mensaje: [
            `Solicitud de información (sin compromiso).`,
            `Servicio: ${servicio}`,
            `Ciudad: ${ciudad}`,
            precioLabel ? `Precio referencia: ${precioLabel}` : null,
            `Teléfono preferente: ${form.telefono.trim()}`,
            form.email.trim() ? `Email: ${form.email.trim()}` : 'Email: no facilitado',
            `Quiere que le llamemos / informemos sobre el servicio.`,
          ]
            .filter(Boolean)
            .join('\n'),
          ...getProtectionPayload(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'No se pudo enviar')
      }

      gtmPush({
        event: 'generate_lead',
        lead_type: 'pide_info',
        service: servicio,
        city: ciudad,
        value: 0,
        currency: 'EUR',
      })

      setStatus('ok')
      setForm({ nombre: '', telefono: '', email: '' })
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Error al enviar')
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
        <p className="font-semibold">Recibido. Te contactamos en breve.</p>
        <p className="mt-1 text-green-800/80">
          Si es urgente, llama o WhatsApp al{' '}
          <a href="tel:+34745022862" className="underline font-medium">
            745 022 862
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative">
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <p className="text-sm font-semibold text-gray-900">¿Dudas? Te llamamos gratis</p>
      <p className="text-xs text-gray-500 -mt-1">Sin compromiso. Solo nombre y teléfono.</p>
      <input
        type="text"
        name="nombre"
        autoComplete="name"
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={(e) => set('nombre', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />
      <input
        type="tel"
        name="telefono"
        autoComplete="tel"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={(e) => set('telefono', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email (opcional)"
        value={form.email}
        onChange={(e) => set('email', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />
      {errMsg && <p className="text-xs text-red-600">{errMsg}</p>}
      {turnstileEnabled && (
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          onVerify={setTurnstileToken}
          onExpire={() => setTurnstileToken('')}
        />
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-[#0d1a0f] hover:bg-[#1a2e1c] text-white font-semibold py-3 text-sm transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando…' : 'Que me llamen'}
      </button>
    </form>
  )
}
