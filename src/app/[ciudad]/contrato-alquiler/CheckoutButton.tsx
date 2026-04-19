'use client'

import { useState } from 'react'

export default function CheckoutButton({ ciudad }: { ciudad: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_key: 'alquiler-vivienda-lau' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error al iniciar el pago')
      if (data.url) window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841f] disabled:opacity-60 text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors shadow-md"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Procesando...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Revisión legal del contrato — 90 €
          </>
        )}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-xs text-gray-500">Pago seguro con Stripe · Revisión en 48h · Abogado especialista en arrendamientos en {ciudad}</p>
    </div>
  )
}
