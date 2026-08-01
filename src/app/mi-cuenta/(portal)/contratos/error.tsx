'use client'

import Link from 'next/link'

export default function ContratosError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h1 className="text-lg font-bold text-gray-900">No se pudo cargar Contratos</h1>
        <p className="text-sm text-gray-500">
          Ha ocurrido un error al abrir esta sección. Puedes reintentar o contratar un servicio directamente.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs text-red-600 break-all text-left">{error.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={reset}
            className="w-full bg-[#c9962a] text-white font-bold py-3 rounded-xl min-h-[48px]"
          >
            Reintentar
          </button>
          <Link
            href="/mi-cuenta/contratos"
            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl min-h-[48px] leading-[48px]"
          >
            Recargar página
          </Link>
          <Link href="/mi-cuenta" className="text-sm text-[#c9962a] underline">
            Volver a mi cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
