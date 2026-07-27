'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gtmPush } from '@/components/GTMProvider'
import HoneypotField from '@/components/HoneypotField'
import TurnstileWidget from '@/components/TurnstileWidget'
import { useBotProtection } from '@/hooks/useBotProtection'
import { resolveServiceKeyFromLabel } from '@/lib/gestoria-service-docs'

type Props = {
  ciudad: string
  servicio?: string
  precioLabel?: string
  serviceKey?: string
}

export default function GestoriaPideInfoForm({
  ciudad,
  servicio = 'contrato de alquiler LAU',
  precioLabel,
  serviceKey: serviceKeyProp,
}: Props) {
  const router = useRouter()
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

  const serviceKey = serviceKeyProp ?? resolveServiceKeyFromLabel(servicio, ciudad)

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
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrMsg('Indica tu email para acceder a tu área de gestoría.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/gestoria/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: form.nombre.trim(),
          client_email: form.email.trim(),
          client_phone: form.telefono.trim(),
          service_key: serviceKey,
          service_name: servicio,
          ciudad,
          source: 'pide_info',
          notes: precioLabel ? `Precio referencia: ${precioLabel}` : undefined,
          ...getProtectionPayload(),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo enviar')

      gtmPush({
        event: 'generate_lead',
        lead_type: 'pide_info',
        service: servicio,
        city: ciudad,
        value: 0,
        currency: 'EUR',
      })

      if (data.redirect) {
        router.push(data.redirect)
        return
      }

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
      <p className="text-xs text-gray-500 -mt-1">Accede a tu panel de gestoría al enviar el formulario.</p>
      <input
        type="text"
        name="nombre"
        autoComplete="name"
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={(e) => set('nombre', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />
      <input
        type="tel"
        name="telefono"
        autoComplete="tel"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={(e) => set('telefono', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />
      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="Email (para tu panel de gestoría)"
        value={form.email}
        onChange={(e) => set('email', e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
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
        className="w-full rounded-xl bg-[#0d1a0f] hover:bg-[#1a2e1c] text-white font-semibold py-3.5 min-h-[52px] text-base transition-colors disabled:opacity-60 touch-manipulation"
      >
        {status === 'sending' ? 'Accediendo a tu panel…' : 'Ver mi área de gestoría'}
      </button>
    </form>
  )
}
