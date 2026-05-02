/**
 * Componente reutilizable para botones de OAuth Social
 * Soporta Google, Facebook y Apple
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Provider } from '@supabase/supabase-js'

interface SocialAuthButtonsProps {
  redirectTo?: string
  onError?: (error: string) => void
}

export default function SocialAuthButtons({ 
  redirectTo = '/auth/callback',
  onError 
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)

  async function handleOAuth(provider: Provider) {
    setLoadingProvider(provider)
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}${redirectTo}`,
        queryParams: provider === 'google' ? {
          access_type: 'offline',
          prompt: 'consent',
        } : undefined,
      },
    })

    if (error) {
      const msg = error.message?.includes('provider is not enabled')
        ? `El acceso con ${provider} no está disponible en este momento. Usa email y contraseña.`
        : `No se pudo conectar con ${provider}. Inténtalo de nuevo.`
      onError?.(msg)
      setLoadingProvider(null)
    }
    // No reseteamos loadingProvider si funciona porque se redirige
  }

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        onClick={() => handleOAuth('google')}
        disabled={loadingProvider !== null}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loadingProvider === 'google' ? (
          <div className="w-[18px] h-[18px] border-2 border-gray-300 border-t-[#4285F4] rounded-full animate-spin" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
        )}
        <span>{loadingProvider === 'google' ? 'Conectando...' : 'Continuar con Google'}</span>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleOAuth('facebook')}
        disabled={loadingProvider !== null}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loadingProvider === 'facebook' ? (
          <div className="w-[18px] h-[18px] border-2 border-gray-300 border-t-[#1877F2] rounded-full animate-spin" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )}
        <span>{loadingProvider === 'facebook' ? 'Conectando...' : 'Continuar con Facebook'}</span>
      </button>

      {/* Apple */}
      <button
        onClick={() => handleOAuth('apple')}
        disabled={loadingProvider !== null}
        className="w-full flex items-center justify-center gap-3 border border-gray-900 bg-black rounded-xl py-3 px-4 text-sm font-semibold text-white hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loadingProvider === 'apple' ? (
          <div className="w-[18px] h-[18px] border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        )}
        <span>{loadingProvider === 'apple' ? 'Conectando...' : 'Continuar con Apple'}</span>
      </button>
    </div>
  )
}
