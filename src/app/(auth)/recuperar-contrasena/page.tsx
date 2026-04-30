'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleRecuperacion(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${location.origin}/auth/actualizar-contrasena`,
    })
    
    setLoading(false)
    if (error) {
      setError('No se pudo enviar el email. Verifica que sea correcto.')
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="w-14 h-14 bg-[#fef0c0] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#c9962a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Email enviado</h1>
          <p className="text-gray-500 text-sm mb-1">
            Hemos enviado un enlace de recuperación a:
          </p>
          <p className="font-semibold text-gray-800 mb-6">{email}</p>
          <p className="text-xs text-gray-400 mb-6">
            Haz clic en el enlace del email para crear una nueva contraseña. 
            El enlace es válido durante 1 hora.
          </p>
          <button
            onClick={() => { setSent(false); setEmail('') }}
            className="text-sm text-[#c9962a] hover:underline font-medium"
          >
            Usar otro email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#fef0c0] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#c9962a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Recuperar contraseña
          </h1>
          <p className="text-sm text-gray-500">
            Te enviaremos un enlace para crear una nueva contraseña
          </p>
        </div>

        <form onSubmit={handleRecuperacion} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tu email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9962a] focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c9962a] text-white rounded-xl text-sm font-bold hover:bg-[#a87a20] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/login" className="text-[#c9962a] font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
