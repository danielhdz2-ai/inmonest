'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGERENCIAS = [
  'Contrato de alquiler LAU en Barcelona',
  'Arras penitenciales en Madrid',
  'Revisión de contrato de alquiler',
  'Alquiler de habitación en Valencia',
]

const CONTRACT_LANDING = /\/contrato-(alquiler|arras)(\/|$)/
const GESTORIA_HUB =
  /^\/gestoria(\/(madrid|barcelona|valencia|sevilla|malaga|bilbao|zaragoza|alicante|palma))?$/

function hideMobileSticky(pathname: string) {
  return (
    CONTRACT_LANDING.test(pathname) ||
    GESTORIA_HUB.test(pathname) ||
    pathname.includes('due-diligence-precompra') ||
    pathname.startsWith('/mi-cuenta/contratos')
  )
}

function hideChatWidget(pathname: string) {
  return pathname.startsWith('/mi-cuenta/contratos')
}

type ChatApiNavigation =
  | { href: string; label: string; mensaje?: string }
  | { error: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const hideOnMobileSticky = hideMobileSticky(pathname ?? '')
  const hideWidget = hideChatWidget(pathname ?? '')

  if (hideWidget) return null

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content:
          '¡Hola! Soy el asistente de gestoría de Inmonest. Dime qué necesitas — por ejemplo contrato de alquiler LAU, arras o revisión legal — y te llevo al servicio correcto.',
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

      const navigation = data.navigation as ChatApiNavigation

      if ('error' in navigation && navigation.error) {
        setMessages((prev) => [...prev, { role: 'assistant', content: navigation.error }])
        return
      }

      if (!('href' in navigation) || !navigation.href) {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: 'No he encontrado un servicio concreto. Prueba con «contrato alquiler» o «arras» y tu ciudad.',
        }])
        return
      }

      const reply =
        navigation.mensaje ??
        `Perfecto: ${navigation.label}. Te abro la página del servicio.`

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])

      setTimeout(() => {
        router.push(navigation.href)
        setOpen(false)
      }, 900)
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Error de conexión. Comprueba tu internet e inténtalo de nuevo.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gold-500 text-white shadow-lg hover:bg-gold-600 transition-all active:scale-95 max-lg:bottom-[calc(4.75rem+env(safe-area-inset-bottom))] max-lg:right-4 bottom-6 right-6 ${
          hideOnMobileSticky ? 'hidden lg:flex' : ''
        }`}
        aria-label="Abrir asistente de gestoría"
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
            <span className="text-sm font-semibold">Asistente gestoría</span>
          </>
        )}
      </button>

      {open && (
        <div
          className="fixed z-50 w-[min(360px,calc(100vw-24px))] rounded-2xl shadow-2xl border border-gray-200 bg-white flex flex-col overflow-hidden max-lg:bottom-[calc(5.5rem+env(safe-area-inset-bottom))] max-lg:right-4 max-lg:left-4 max-lg:w-auto bottom-20 right-6"
          style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}
        >
          <div className="bg-gold-500 px-4 py-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Asistente de gestoría</p>
              <p className="text-white/80 text-xs">Contratos, arras y revisión legal</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" type="button">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold-500 text-white rounded-br-sm'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 bg-gray-50 border-t border-gray-100">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white border border-gold-500/40 text-gold-700 hover:bg-cream-100 transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej.: contrato alquiler en Madrid…"
              disabled={loading}
              className="flex-1 px-3 py-2 text-base md:text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gold-500 text-white hover:bg-gold-600 disabled:opacity-40 transition-colors shrink-0"
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
