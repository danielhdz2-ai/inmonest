'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCatalogServices, getRecommendedServices } from '@/lib/gestoria-upsell'
import { getServicioImages } from '@/lib/gestoria-images'

type Props = {
  activeServiceKey: string | null
  ownedServiceKeys: string[]
  userEmail: string
  clientName: string
  /** Usuario sin ningún servicio pagado: mostrar catálogo completo */
  catalogOnly?: boolean
}

export default function GestoriaPortalServicios({
  activeServiceKey,
  ownedServiceKeys,
  userEmail,
  clientName,
  catalogOnly = false,
}: Props) {
  const [paying, setPaying] = useState<string | null>(null)
  const [payError, setPayError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(catalogOnly || !activeServiceKey)

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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black to-black p-4 sm:p-6 text-white min-h-[120px] sm:min-h-[140px]">
        <Image
          src="/gestoria10.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="(max-width: 768px) 100vw, 800px"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="relative">
          <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-widest">Ampliar tu expediente</p>
          <h2 className="text-lg sm:text-xl font-bold mt-1">Contratar más servicios</h2>
          <p className="text-sm text-white/60 mt-2 max-w-lg">
            Elige contrato, revisión o pack: pago seguro con Stripe y seguimiento en este mismo panel.
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
        {displayed.map((svc) => {
          const img = getServicioImages(svc.key).hero
          return (
            <article
              key={svc.key}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
            >
              <div className="relative h-44 w-full bg-gray-200">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 z-10 max-w-[75%] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-gold-700 text-white border border-gold-400/50 shadow-md">
                  {svc.categoria}
                </span>
                <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5 shadow-sm">
                  <p className="text-xl font-extrabold text-gold-600 leading-none">{svc.precio} €</p>
                  <p className="text-[10px] text-gray-500 font-medium">IVA incl.</p>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 leading-snug">{svc.nombre}</h3>
                <ul className="mt-3 space-y-1 flex-1">
                  {svc.incluye.map((item) => (
                    <li key={item} className="text-xs text-gray-600 flex gap-2">
                      <span className="text-gold-600 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleCheckout(svc.key)}
                  disabled={paying === svc.key}
                  className="mt-4 w-full rounded-xl bg-forest-900 text-[#f4d98a] text-sm font-bold py-3 min-h-[48px] touch-manipulation disabled:opacity-60 hover:bg-black transition-colors"
                >
                  {paying === svc.key ? 'Abriendo Stripe…' : `Pagar ${svc.precio} €`}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {!showAll && allServices.length > recommended.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 py-3 min-h-[48px] touch-manipulation hover:border-gold-400"
        >
          Ver catálogo completo ({allServices.length} servicios)
        </button>
      )}

      <p className="text-center text-xs text-gray-400">
        También puedes explorar todos los servicios en{' '}
        <Link href="/gestoria/solicitar" className="text-gold-500 underline font-medium">
          solicitar contrato online
        </Link>
      </p>
    </div>
  )
}
