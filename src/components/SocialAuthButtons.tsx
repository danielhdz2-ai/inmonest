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
    </div>
  )
}
