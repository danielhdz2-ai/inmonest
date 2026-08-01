'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SolicitarModal from '@/app/gestoria/SolicitarModal'
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
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
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

  const selectedService = selectedKey
    ? allServices.find((s) => s.key === selectedKey) ?? null
    : null

  const modalService = selectedService
    ? { key: selectedService.key, name: selectedService.nombre, price: selectedService.precio }
    : null

  return (
    <>
      <div className="min-h-screen bg-[#eef0f2]">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <Link
              href="/mi-cuenta"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 min-h-[44px] touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Mi cuenta
            </Link>
            <p className="text-sm font-bold text-gray-900">Contratar gestoría</p>
            <div className="w-20" aria-hidden />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1008] to-[#0d1a0f] p-6 sm:p-8 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,150,42,0.25),transparent)]" />
            <div className="relative">
              <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-widest">Gestoría Inmonest</p>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                Hola {displayName.split(' ')[0]}, elige tu contrato
              </h1>
              <p className="text-sm text-white/65 mt-3 max-w-xl">
                Paga con tarjeta de forma segura (Stripe). Tras el pago accederás directamente a tu panel de
                gestoría para subir documentación o enviarla a{' '}
                <a href="mailto:info@inmonest.com" className="text-[#f4d98a] underline">
                  info@inmonest.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((svc) => (
              <article
                key={svc.key}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9962a]">
                  {svc.categoria}
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-1 leading-snug">{svc.nombre}</h2>
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
                  onClick={() => setSelectedKey(svc.key)}
                  className="mt-4 w-full rounded-xl bg-[#0d1a0f] text-[#f4d98a] text-sm font-bold py-3 min-h-[48px] touch-manipulation hover:bg-[#152318] transition-colors"
                >
                  Contratar · {svc.precio} €
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

          <p className="text-center text-xs text-gray-400 pb-8">
            ¿Dudas?{' '}
            <a href="tel:+34745022862" className="text-[#c9962a] underline">
              745 022 862
            </a>
            {' · '}
            <a href="mailto:info@inmonest.com" className="text-[#c9962a] underline">
              info@inmonest.com
            </a>
          </p>
        </main>
      </div>

      <SolicitarModal
        service={modalService}
        onClose={() => setSelectedKey(null)}
        initialForm={{
          name: displayName,
          email: userEmail,
          phone: initialPhone,
        }}
        lockEmail
        authenticated
      />
    </>
  )
}
