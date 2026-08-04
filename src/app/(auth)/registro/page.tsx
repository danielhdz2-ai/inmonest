'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { safeInternalPath } from '@/lib/gestoria-leads'
import SocialAuthButtons from '@/components/SocialAuthButtons'

function RegistroForm() {
  const searchParams = useSearchParams()
  const nextParam = safeInternalPath(searchParams.get('next'))
  const emailParam = searchParams.get('email') ?? ''

  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (emailParam) setEmail(emailParam)
  }, [emailParam])

  const oauthRedirect = nextParam
    ? `/auth/callback?next=${encodeURIComponent(nextParam)}`
    : '/auth/callback'

  const loginHref = (() => {
    const q = new URLSearchParams()
    if (nextParam) q.set('next', nextParam)
    if (email.trim()) q.set('email', email.trim())
    const qs = q.toString()
    return qs ? `/login?${qs}` : '/login'
  })()

  const postAuthDest = nextParam ?? '/mi-cuenta/contratos?lead=1'

  async function handlePasswordRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !nombre.trim() || !password.trim()) return
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const callbackUrl = nextParam
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextParam)}`
        : `${window.location.origin}/auth/callback`

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password.trim(),
        options: {
          data: {
            full_name: nombre.trim(),
          },
          emailRedirectTo: callbackUrl,
        },
      })

      setLoading(false)

      if (error) {
        if (error.message.includes('already registered')) {
          setError('Este email ya está registrado. Inicia sesión.')
        } else if (error.message.includes('rate limit')) {
          setError('Demasiados intentos. Espera 1 minuto.')
        } else if (error.message.includes('Invalid email')) {
          setError('Email inválido.')
        } else if (error.message.includes('Password')) {
          setError('La contraseña debe tener al menos 8 caracteres.')
        } else if (error.message.includes('not allowed')) {
          setError('Registro temporalmente deshabilitado.')
        } else {
          setError('Error al crear cuenta. Usa Google para registrarte.')
        }
        return
      }

      if (data.user) {
        if (data.session) {
          window.location.href = postAuthDest
          return
        }
        setSent(true)
        return
      }

      setError('Error desconocido. Intenta con Google.')
    } catch {
      setLoading(false)
      setError('Error de conexión. Verifica tu internet.')
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="w-14 h-14 bg-[#fef0c0] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            ¡Cuenta creada!
          </h1>
          <p className="text-gray-500 text-sm mb-1">
            Confirma tu email para activar la cuenta:
          </p>
          <p className="font-semibold text-gray-800 mb-4">{email}</p>
          <p className="text-xs text-gray-400 mb-6">
            Te hemos enviado un email de confirmación. Haz clic en el enlace para acceder a tu panel de gestoría.
          </p>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Link
              href={postAuthDest}
              className="block w-full py-3 bg-gold-500 text-white rounded-xl text-sm font-bold hover:bg-gold-600 transition-colors"
            >
              Ir a mi panel de gestoría
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Crea tu cuenta</h1>
        <p className="text-sm text-gray-500 mb-6">
          {nextParam?.includes('contratos')
            ? 'Accede a tu área de gestoría Inmonest.'
            : 'Publica tu piso y llega a miles de particulares.'}
        </p>

        <SocialAuthButtons
          redirectTo={oauthRedirect}
          onError={setError}
        />

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">o con email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handlePasswordRegister} className="space-y-3">
          <div>
            <label htmlFor="nombre" className="block text-xs font-medium text-gray-600 mb-1">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9962a] focus:border-transparent"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9962a] focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-500 text-white rounded-xl text-sm font-bold hover:bg-gold-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta y continuar'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Al registrarte aceptas los{' '}
          <Link href="/terminos" className="underline">Términos de servicio</Link>
          {' '}y la{' '}
          <Link href="/privacidad" className="underline">Política de privacidad</Link>.
        </p>

        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link href={loginHref} className="text-gold-500 font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegistroPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-96 animate-pulse bg-gray-100 rounded-2xl" />}>
      <RegistroForm />
    </Suspense>
  )
}
