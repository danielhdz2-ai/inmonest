'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getRedirectUrl, isAdminEmail } from '@/lib/admin'
import { safeInternalPath } from '@/lib/gestoria-leads'
import SocialAuthButtons from '@/components/SocialAuthButtons'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const nextParam = safeInternalPath(searchParams.get('next'))
  const emailParam = searchParams.get('email') ?? ''
  const signedOut = searchParams.get('signed_out') === '1'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (emailParam) setEmail(emailParam)
  }, [emailParam])

  const oauthRedirect = nextParam
    ? `/auth/callback?next=${encodeURIComponent(nextParam)}`
    : '/auth/callback'

  const registroHref = (() => {
    const q = new URLSearchParams()
    if (nextParam) q.set('next', nextParam)
    if (email.trim()) q.set('email', email.trim())
    const qs = q.toString()
    return qs ? `/registro?${qs}` : '/registro'
  })()

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    } else {
      const userEmail = data.user?.email
      if (isAdminEmail(userEmail)) {
        window.location.replace('/admin')
        return
      }
      if (nextParam) {
        window.location.replace(nextParam)
        return
      }
      try {
        const r = await fetch('/api/gestoria/panel-redirect', { cache: 'no-store' })
        if (r.ok) {
          const { url } = await r.json() as { url?: string | null }
          if (url) {
            window.location.replace(url)
            return
          }
        }
      } catch {
        /* fallback */
      }
      window.location.replace(getRedirectUrl(userEmail))
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-1">
            Inicia sesión
          </h1>
          <p className="text-sm text-gray-500">
            Bienvenido a <span className="font-bold text-[#c9962a]">Inmonest</span>
          </p>
        </div>

        {signedOut && (
          <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-4">
            Sesión cerrada correctamente. Puedes iniciar sesión con otra cuenta.
          </p>
        )}

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {[
            { icon: '📢', text: '2 anuncios gratis' },
            { icon: '🚀', text: 'Visibilidad Turbo' },
            { icon: '🔓', text: 'Sin intermediarios' },
          ].map((b) => (
            <span key={b.text} className="flex items-center gap-1 bg-[#fef9e8] border border-[#f0dfa0] text-[#7a5c10] text-xs font-semibold px-2.5 py-1 rounded-full">
              {b.icon} {b.text}
            </span>
          ))}
        </div>

        <SocialAuthButtons
          redirectTo={oauthRedirect}
          onError={setError}
        />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">o con email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handlePasswordLogin} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9962a] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9962a] focus:border-transparent"
            />
            <div className="mt-1 text-right">
              <Link href="/recuperar-contrasena" className="text-xs text-[#c9962a] hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c9962a] text-white rounded-xl text-sm font-bold hover:bg-[#a87a20] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Al continuar aceptas nuestros{' '}
          <Link href="/terminos" className="underline hover:text-gray-600">términos</Link>
          {' '}y{' '}
          <Link href="/privacidad" className="underline hover:text-gray-600">privacidad</Link>.
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            ¿Primera vez?{' '}
            <Link href={registroHref} className="text-[#c9962a] font-semibold hover:underline">
              Crea tu cuenta gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
