'use client'

import { useState, FormEvent } from 'react'

interface ContactFormProps {
  /** Asunto preseleccionado (p.ej. desde una página de producto) */
  defaultAsunto?: string
  /** Clase CSS extra para el wrapper */
  className?: string
  /** Callback al envío correcto */
  onSuccess?: () => void
}

interface FormState {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
}

const INITIAL: FormState = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
}

export default function ContactForm({ defaultAsunto = '', className = '', onSuccess }: ContactFormProps) {
  const [form, setForm]       = useState<FormState>({ ...INITIAL, asunto: defaultAsunto })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Error al enviar')
      }

      setSent(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado. Inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className={`rounded-2xl bg-green-50 border border-green-200 p-8 text-center ${className}`}>
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje recibido!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Te responderemos en menos de 24 horas en <strong>{form.email}</strong>.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ ...INITIAL, asunto: defaultAsunto }) }}
          className="mt-6 text-sm text-green-600 underline hover:text-green-800 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>

      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            maxLength={100}
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#c9962a] focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20 transition"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#c9962a] focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20 transition"
          />
        </div>
      </div>

      {/* Teléfono + Asunto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            maxLength={30}
            value={form.telefono}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#c9962a] focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20 transition"
          />
        </div>
        <div>
          <label htmlFor="cf-asunto" className="block text-sm font-medium text-gray-700 mb-1">
            Asunto
          </label>
          <select
            id="cf-asunto"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#c9962a] focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20 transition"
          >
            <option value="">Consulta general</option>
            <option value="Quiero publicar un inmueble">Quiero publicar un inmueble</option>
            <option value="Información sobre planes de agencia">Información sobre planes de agencia</option>
            <option value="Gestoría e trámites">Gestoría y trámites</option>
            <option value="Problema técnico">Problema técnico</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="cf-mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          required
          rows={5}
          maxLength={2000}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#c9962a] focus:outline-none focus:ring-2 focus:ring-[#c9962a]/20 transition resize-none"
        />
        <p className="text-right text-xs text-gray-400 mt-1">{form.mensaje.length}/2000</p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-[#c9962a] px-6 py-3 text-sm font-bold text-white hover:bg-[#a87a20] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {sending ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Respondemos en menos de 24 h ·{' '}
        <a href="mailto:info@inmonest.com" className="text-[#c9962a] hover:underline">
          info@inmonest.com
        </a>
      </p>
    </form>
  )
}
