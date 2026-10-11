'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[global-error]', error)
  }, [error])

  return (
    <html lang="es">
      <body className="min-h-screen bg-[#fef9e8] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center space-y-4">
          <h1 className="text-lg font-bold text-gray-900">No se pudo cargar la página</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Suele deberse a una sesión caducada o a caché del navegador. Prueba de nuevo o accede al login.
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full bg-gold-500 text-white font-bold py-3 rounded-xl"
            >
              Reintentar
            </button>
            <a
              href="/login?signed_out=1"
              className="w-full border border-gold-400 text-gold-700 font-semibold py-3 rounded-xl"
            >
              Ir a iniciar sesión
            </a>
            <a href="/gestoria/solicitar" className="text-sm text-gray-500 underline">
              Contratar sin cuenta
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
