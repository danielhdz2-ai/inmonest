'use client'

import { useState } from 'react'

export default function ContactForm({ listingId }: { listingId: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const body = {
      from_name:  fd.get('from_name')  as string,
      from_email: fd.get('from_email') as string,
      from_phone: fd.get('from_phone') as string,
      message:    fd.get('message')    as string,
    }

    try {
      const res = await fetch(`/api/listings/${listingId}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error al enviar')
      }
      setStatus('sent')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar el mensaje')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
        <p className="text-green-800 font-semibold text-sm">✓ Mensaje enviado</p>
        <p className="text-green-600 text-xs mt-1">
          El propietario recibirá tu solicitud y te responderá pronto.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="from_name"
        type="text"
        placeholder="Tu nombre"
        required
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
      />
      <input
        name="from_email"
        type="email"
        placeholder="Tu email"
        required
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
      />
      <input
        name="from_phone"
        type="tel"
        placeholder="Tu teléfono (opcional)"
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
      />
      <textarea
        name="message"
        placeholder="Escribe tu mensaje..."
        rows={3}
        required
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a] resize-none"
      />
      {status === 'error' && (
        <p className="text-xs text-red-600">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-2.5 rounded-full bg-[#c9962a] text-white text-sm font-semibold hover:bg-[#a87a20] transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
