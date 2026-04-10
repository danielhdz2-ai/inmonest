'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGERENCIAS = [
  'Piso de alquiler en Madrid menos de 900€',
  'Casa en venta en Barcelona 3 habitaciones',
  'Alquiler Valencia de particular, 2 hab',
  'Piso barato Sevilla menos de 600€',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '¡Hola! Cuéntame qué tipo de piso o casa buscas y te ayudo a encontrarlo. Por ejemplo: "alquiler en Madrid menos de 900€".',
      }])
    }
  }, [open, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.error ?? 'Lo siento, ha habido un error. Inténtalo de nuevo.',
        }])
        return
      }

      const filters = data.filters as Record<string, unknown>

      if (filters.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: filters.error as string }])
        return
      }

      // Construir URL de búsqueda
      const params = new URLSearchParams()
      if (filters.operation) params.set('operacion', filters.operation as string)
      if (filters.ciudad)    params.set('ciudad', (filters.ciudad as string).toLowerCase())
      if (filters.max_precio) params.set('max_precio', String(filters.max_precio))
      if (filters.min_precio) params.set('min_precio', String(filters.min_precio))
      if (filters.habitaciones) params.set('habitaciones', String(filters.habitaciones))
      if (filters.solo_particulares) params.set('solo_particulares', '1')

      const resumen = buildResumen(filters)
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `Perfecto, te muestro ${resumen}. ¡Buscando ahora!`,
      }])

      setTimeout(() => {
        router.push(`/pisos?${params.toString()}`)
        setOpen(false)
      }, 800)
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Error de conexión. Comprueba tu internet e inténtalo de nuevo.',
      }])
    } finally {
      setLoading(false)
    }
  }

  function buildResumen(f: Record<string, unknown>) {
    const parts: string[] = []
    if (f.operation === 'rent') parts.push('pisos en alquiler')
    else if (f.operation === 'sale') parts.push('pisos en venta')
    else parts.push('pisos')
    if (f.ciudad) parts.push(`en ${f.ciudad}`)
    if (f.habitaciones) parts.push(`de ${f.habitaciones}+ hab.`)
    if (f.max_precio) parts.push(`hasta ${f.max_precio}€`)
    if (f.solo_particulares) parts.push('de particular')
    return parts.join(' ')
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#c9962a] text-white shadow-lg hover:bg-[#a87a20] transition-all active:scale-95"
        aria-label="Abrir asistente de búsqueda"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-sm font-semibold">Buscar con IA</span>
          </>
        )}
      </button>

      {/* Panel del chat */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[min(360px,calc(100vw-24px))] rounded-2xl shadow-2xl border border-gray-200 bg-white flex flex-col overflow-hidden"
          style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}>
          {/* Cabecera */}
          <div className="bg-[#c9962a] px-4 py-3 flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Asistente de búsqueda</p>
              <p className="text-white/80 text-xs">Cuéntame qué buscas</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#c9962a] text-white rounded-br-sm'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#c9962a] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#c9962a] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#c9962a] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Sugerencias (solo al inicio) */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 bg-gray-50 border-t border-gray-100">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#c9962a]/40 text-[#a87a20] hover:bg-[#fef9e8] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
            className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe qué buscas..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9962a] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c9962a] text-white hover:bg-[#a87a20] disabled:opacity-40 transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
