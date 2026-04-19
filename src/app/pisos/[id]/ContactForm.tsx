'use client'

import { useState } from 'react'

interface ContactFormProps {
  listingId: string
  initialName?: string
  initialEmail?: string
}

export default function ContactForm({ listingId, initialName, initialEmail }: ContactFormProps) {
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
      <div className="rounded-2xl bg-gradient-to-br from-[#fef9e8] to-[#fffbf0] border border-[#f4c94a]/40 p-5 text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-[#c9962a] flex items-center justify-center mx-auto">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[#42300a] font-semibold text-sm">Mensaje enviado</p>
        <p className="text-[#a87a20] text-xs leading-relaxed">
          El anunciante recibirá tu solicitud y te responderá por email en breve.
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
        defaultValue={initialName}
        required
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a]"
      />
      <input
        name="from_email"
        type="email"
        placeholder="Tu email"
        defaultValue={initialEmail}
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
