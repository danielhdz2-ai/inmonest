'use client'

import Link from 'next/link'

export default function MiCuentaError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#eef0f2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 shadow-lg p-8 text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h1 className="text-lg font-bold text-gray-900">No se pudo cargar tu cuenta</h1>
        <p className="text-sm text-gray-500">
          Ha ocurrido un error temporal. Prueba de nuevo o accede al panel de gestoría directamente.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs text-red-600 break-all">{error.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={reset}
            className="w-full bg-gold-500 text-white font-bold py-3 rounded-xl min-h-[48px]"
          >
            Reintentar
          </button>
          <Link
            href="/mi-cuenta/contratos?v=inicio"
            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl min-h-[48px] leading-[48px]"
          >
            Panel de gestoría
          </Link>
          <Link href="/mi-cuenta" className="text-sm text-gold-500 underline">
            Ir a mi cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
