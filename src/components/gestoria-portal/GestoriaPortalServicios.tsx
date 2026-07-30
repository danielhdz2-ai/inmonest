'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getAllCatalogServices, getRecommendedServices } from '@/lib/gestoria-upsell'

type Props = {
  activeServiceKey: string | null
  ownedServiceKeys: string[]
  userEmail: string
  clientName: string
}

export default function GestoriaPortalServicios({
  activeServiceKey,
  ownedServiceKeys,
  userEmail,
  clientName,
}: Props) {
  const [paying, setPaying] = useState<string | null>(null)
  const [payError, setPayError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const recommended = getRecommendedServices(activeServiceKey, ownedServiceKeys)
  const allServices = getAllCatalogServices()
  const displayed = showAll ? allServices : recommended

  async function handleCheckout(serviceKey: string) {
    setPaying(serviceKey)
    setPayError(null)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: serviceKey,
          client_name: clientName,
          client_email: userEmail,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setPayError(
          data.error || 'No se pudo abrir Stripe. Prueba de nuevo o escribe a info@inmonest.com',
        )
        return
      }
      window.location.href = data.url
    } catch {
      setPayError('Error de red al iniciar el pago. Revisa tu conexión e inténtalo de nuevo.')
    } finally {
      setPaying(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1008] to-[#0d1a0f] p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,150,42,0.3),transparent)]" />
        <div className="relative">
          <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-widest">Ampliar tu expediente</p>
          <h2 className="text-xl font-bold mt-1">Contratar más servicios</h2>
          <p className="text-sm text-white/60 mt-2 max-w-lg">
            Contratos adicionales, revisiones legales y packs premium con el mismo gestor y panel unificado.
          </p>
        </div>
      </div>

      {payError && (
        <div
          className="rounded-xl px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-800"
          role="alert"
        >
          {payError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayed.map((svc) => (
          <article
            key={svc.key}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9962a]">{svc.categoria}</span>
            <h3 className="text-base font-bold text-gray-900 mt-1 leading-snug">{svc.nombre}</h3>
            <p className="text-2xl font-extrabold text-[#c9962a] mt-2">{svc.precio} €</p>
            <ul className="mt-3 space-y-1 flex-1">
              {svc.incluye.map((item) => (
                <li key={item} className="text-xs text-gray-500 flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => handleCheckout(svc.key)}
              disabled={paying === svc.key}
              className="mt-4 w-full rounded-xl bg-[#0d1a0f] text-[#f4d98a] text-sm font-bold py-3 min-h-[48px] touch-manipulation disabled:opacity-60"
            >
              {paying === svc.key ? 'Abriendo Stripe…' : `Pagar ${svc.precio} €`}
            </button>
          </article>
        ))}
      </div>

      {!showAll && allServices.length > recommended.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 py-3 min-h-[48px] touch-manipulation"
        >
          Ver catálogo completo ({allServices.length} servicios)
        </button>
      )}

      <p className="text-center text-xs text-gray-400">
        También puedes explorar todos los servicios en{' '}
        <Link href="/gestoria" className="text-[#c9962a] underline font-medium">
          inmonest.com/gestoria
        </Link>
      </p>
    </div>
  )
}
