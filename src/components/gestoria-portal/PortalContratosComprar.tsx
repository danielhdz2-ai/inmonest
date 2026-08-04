'use client'

import { useMemo, useState } from 'react'
import { getAllCatalogServices } from '@/lib/gestoria-upsell'

const FEATURED_KEYS = [
  'arras-penitenciales',
  'contrato-alquiler',
  'reserva-compra',
  'revision-arras',
  'alquiler-vivienda-lau',
  'pack-due-diligence-precompra',
] as const

type Props = {
  userEmail: string
  displayName: string
  initialPhone?: string
}

export default function PortalContratosComprar({
  userEmail,
  displayName,
  initialPhone = '',
}: Props) {
  const [paying, setPaying] = useState<string | null>(null)
  const [payError, setPayError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const allServices = useMemo(() => getAllCatalogServices(), [])

  const featured = useMemo(
    () =>
      FEATURED_KEYS.map((key) => allServices.find((s) => s.key === key)).filter(
        (s): s is NonNullable<typeof s> => Boolean(s),
      ),
    [allServices],
  )

  const displayed = showAll ? allServices : featured

  async function handleCheckout(serviceKey: string) {
    setPaying(serviceKey)
    setPayError(null)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: serviceKey,
          client_name: displayName,
          client_email: userEmail,
          client_phone: initialPhone || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setPayError(data.error || 'No se pudo abrir Stripe. Inténtalo de nuevo o escribe a info@inmonest.com')
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
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black to-black p-6 sm:p-8 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,150,42,0.25),transparent)]" />
          <div className="relative">
            <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-widest">Gestoría Inmonest</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">
              Hola {displayName.split(' ')[0]}, elige tu contrato
            </h1>
            <p className="text-sm text-white/65 mt-3 max-w-xl">
              Paga con tarjeta (Stripe). Tras el pago entrarás directamente a tu panel de gestoría.
              También puedes enviar documentación a{' '}
              <a href="mailto:info@inmonest.com" className="text-[#f4d98a] underline">
                info@inmonest.com
              </a>
              .
            </p>
            <p className="text-xs text-white/45 mt-2">Cuenta: {userEmail}</p>
          </div>
        </div>

        {payError && (
          <div className="rounded-xl px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-800" role="alert">
            {payError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((svc) => (
            <article
              key={svc.key}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
                {svc.categoria}
              </span>
              <h2 className="text-base font-bold text-gray-900 mt-1 leading-snug">{svc.nombre}</h2>
              <p className="text-2xl font-extrabold text-gold-500 mt-2">{svc.precio} €</p>
              <ul className="mt-3 space-y-1 flex-1">
                {svc.incluye.map((item) => (
                  <li key={item} className="text-xs text-gray-500 flex gap-2">
                    <span className="text-cream-1000 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleCheckout(svc.key)}
                disabled={paying === svc.key}
                className="mt-4 w-full rounded-xl bg-forest-900 text-[#f4d98a] text-sm font-bold py-3 min-h-[48px] touch-manipulation hover:bg-neutral-900 transition-colors disabled:opacity-60"
              >
                {paying === svc.key ? 'Abriendo Stripe…' : `Pagar ${svc.precio} €`}
              </button>
            </article>
          ))}
        </div>

        {!showAll && allServices.length > featured.length && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="w-full rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 py-3 min-h-[48px] touch-manipulation"
          >
            Ver catálogo completo ({allServices.length} servicios)
          </button>
        )}

        <p className="text-center text-xs text-gray-400 pb-4">
          ¿Dudas?{' '}
          <a href="tel:+34745022862" className="text-gold-500 underline">
            745 022 862
          </a>
          {' · '}
          <a href="mailto:info@inmonest.com" className="text-gold-500 underline">
            info@inmonest.com
          </a>
        </p>
    </div>
  )
}
