'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGERENCIAS = [
  'Alquiler Madrid < 900€',
  'Casa venta Barcelona 3 hab',
  'Particular Sevilla < 600€',
  'Valencia 2 hab entre 600 y 1000€',
]

interface Props {
  /** Params actuales del buscador para mostrar contexto si se quiere */
  currentParams?: URLSearchParams
}

export default function IASearchSidebar({ currentParams: _currentParams }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Cuéntame qué tipo de piso o casa buscas y te ayudo a encontrarlo.\n\nPor ejemplo: "alquiler en Madrid menos de 900€".',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.error ?? 'Lo siento, ha habido un error. Inténtalo de nuevo.' },
        ])
        return
      }

      const filters = data.filters as Record<string, unknown>

      if (filters.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: filters.error as string }])
        return
      }

      // Construir params usando los nombres correctos de /pisos
      const params = new URLSearchParams()
      if (filters.operation)         params.set('operacion', filters.operation as string)
      if (filters.ciudad)            params.set('ciudad', (filters.ciudad as string).toLowerCase())
      if (filters.max_precio)        params.set('precio_max', String(filters.max_precio))
      if (filters.min_precio)        params.set('precio_min', String(filters.min_precio))
      if (filters.habitaciones)      params.set('hab', String(filters.habitaciones))
      if (filters.solo_particulares) params.set('solo_particulares', 'true')
      params.set('vista', 'mapa')

      const resumen = buildResumen(filters)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `¡Perfecto! Buscando ${resumen}... ✨` },
      ])

      setTimeout(() => {
        router.push(`/pisos?${params.toString()}`)
      }, 600)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error de conexión. Comprueba tu internet e inténtalo de nuevo.' },
      ])
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
    if (f.habitaciones) parts.push(`${f.habitaciones}+ hab.`)
    if (f.max_precio) parts.push(`hasta ${f.max_precio}€`)
    if (f.solo_particulares) parts.push('de particular')
    return parts.join(' ')
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Cabecera */}
      <div className="bg-[#c9962a] px-4 py-3 flex items-center gap-2.5 shrink-0">
        <span className="text-xl leading-none">🏠</span>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Buscador IA</p>
          <p className="text-white/75 text-xs">Cuéntame qué buscas</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-0 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-[#c9962a] text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
              <span className="flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 bg-[#c9962a] rounded-full animate-bounce"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sugerencias (solo al inicio) */}
      {messages.length <= 1 && (
        <div className="px-3 py-2.5 flex flex-col gap-1.5 bg-gray-50 border-t border-gray-100 shrink-0">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Ejemplos</p>
          {SUGERENCIAS.map((s) => (
            <button
              key={s}
              onClick={() => { setInput(s); inputRef.current?.focus() }}
              className="text-xs text-left px-3 py-1.5 rounded-lg bg-white border border-[#c9962a]/30 text-[#a87a20] hover:bg-[#fef9e8] hover:border-[#c9962a]/60 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
        className="flex items-center gap-2 px-3 py-3 border-t border-gray-200 bg-white shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe qué buscas..."
          disabled={loading}
          className="flex-1 text-sm bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#c9962a] focus:ring-1 focus:ring-[#c9962a]/30 disabled:opacity-50 min-w-0"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-full bg-[#c9962a] text-white flex items-center justify-center hover:bg-[#a87a20] disabled:opacity-40 transition-colors shrink-0"
          aria-label="Enviar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  )
}
