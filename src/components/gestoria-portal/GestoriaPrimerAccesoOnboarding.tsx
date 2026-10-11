'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getServicioImages } from '@/lib/gestoria-images'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'

const STORAGE_KEY = 'gestoria_onboarding_v1'

export function isGestoriaOnboardingDone(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(STORAGE_KEY) === '1'
}

export function markGestoriaOnboardingDone() {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
}

type Intent = 'alquiler' | 'compra' | 'venta' | 'revision'

const INTENTS: { id: Intent; label: string; desc: string; slugs: string[] }[] = [
  {
    id: 'alquiler',
    label: 'Alquilar o alquilar mi piso',
    desc: 'Contrato LAU, temporada o habitación',
    slugs: ['contrato-alquiler', 'alquiler-temporada'],
  },
  {
    id: 'compra',
    label: 'Comprar entre particulares',
    desc: 'Arras, reserva o pack hasta escritura',
    slugs: ['arras-penitenciales', 'compra-completa-reserva-escritura'],
  },
  {
    id: 'venta',
    label: 'Vender mi vivienda',
    desc: 'Documentación y arras para vendedor',
    slugs: ['arras-penitenciales', 'venta-completa-reserva-escritura'],
  },
  {
    id: 'revision',
    label: 'Revisar un borrador',
    desc: 'Antes de firmar alquiler o arras',
    slugs: ['revision-correccion-arras', 'revision-alquiler'],
  },
]

type Props = {
  displayName: string
  initialPhone: string
  userEmail: string
  onComplete: (opts: { goServicios: boolean; checkoutSlug?: string }) => void
  onDismiss: () => void
}

export default function GestoriaPrimerAccesoOnboarding({
  displayName,
  initialPhone,
  userEmail,
  onComplete,
  onDismiss,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [name, setName] = useState(displayName)
  const [phone, setPhone] = useState(initialPhone)
  const [intent, setIntent] = useState<Intent | null>(null)
  const [saving, setSaving] = useState(false)
  const [paying, setPaying] = useState<string | null>(null)

  const firstName = (name || displayName).split(' ')[0]
  const selectedIntent = INTENTS.find((i) => i.id === intent)
  const recommended = selectedIntent?.slugs
    .map((slug) => {
      const svc = GESTORIA_SERVICIOS[slug]
      if (!svc || svc.interno) return null
      return { slug, nombre: svc.nombre, precio: svc.precio, img: getServicioImages(slug).hero }
    })
    .filter(Boolean) as Array<{
    slug: string
    nombre: string
    precio: number
    img: { src: string; alt: string }
  }>

  async function saveProfile() {
    setSaving(true)
    try {
      await fetch('/api/perfil/actualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name.trim(), phone: phone.trim() }),
      })
    } finally {
      setSaving(false)
    }
  }

  async function goCheckout(slug: string) {
    setPaying(slug)
    try {
      const res = await fetch('/api/gestoria/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_key: slug,
          client_name: name.trim() || displayName,
          client_email: userEmail,
          client_phone: phone.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (data.url) {
        markGestoriaOnboardingDone()
        window.location.href = data.url
        return
      }
    } finally {
      setPaying(null)
    }
  }

  function finishBrowse() {
    markGestoriaOnboardingDone()
    onComplete({ goServicios: true })
  }

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/55 touch-none sm:touch-auto">
      <button
        type="button"
        className="absolute inset-0 sm:hidden"
        aria-label="Cerrar"
        onClick={() => {
          markGestoriaOnboardingDone()
          onDismiss()
        }}
      />
      <div
        className="relative w-full sm:max-w-lg max-h-[min(92dvh,100%)] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 pb-[env(safe-area-inset-bottom,0px)] touch-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
              Paso {step} de 3
            </p>
            <h2 id="onboarding-title" className="text-lg font-bold text-gray-900">
              Bienvenido, {firstName}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              markGestoriaOnboardingDone()
              onDismiss()
            }}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 px-3 py-2 min-h-[44px] touch-manipulation"
          >
            Omitir
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
          {step === 1 && (
            <>
              <p className="text-sm text-gray-600">
                Cuéntanos cómo contactarte. Usaremos estos datos en tus contratos y en Stripe.
              </p>
              <label className="block text-sm font-semibold text-gray-700">
                Nombre completo
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-3 text-base sm:text-sm min-h-[48px]"
                />
              </label>
              <label className="block text-sm font-semibold text-gray-700">
                Teléfono (WhatsApp)
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-3 text-base sm:text-sm min-h-[48px]"
                  placeholder="600 000 000"
                />
              </label>
              <button
                type="button"
                disabled={!name.trim() || saving}
                onClick={async () => {
                  await saveProfile()
                  setStep(2)
                }}
                className="w-full rounded-xl bg-gold-500 text-white font-bold py-3.5 min-h-[52px] touch-manipulation disabled:opacity-50 active:scale-[0.99]"
              >
                {saving ? 'Guardando…' : 'Continuar'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-gray-600">¿Qué quieres formalizar primero?</p>
              <div className="grid gap-2">
                {INTENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntent(item.id)}
                    className={`text-left rounded-xl border px-4 py-3.5 min-h-[56px] touch-manipulation transition-colors active:scale-[0.99] ${
                      intent === item.id
                        ? 'border-gold-500 bg-cream-50'
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!intent}
                onClick={() => setStep(3)}
                className="w-full rounded-xl bg-gold-500 text-white font-bold py-3.5 min-h-[52px] touch-manipulation disabled:opacity-50 active:scale-[0.99]"
              >
                Ver recomendaciones
              </button>
            </>
          )}

          {step === 3 && recommended && (
            <>
              <p className="text-sm text-gray-600">
                Servicios recomendados para tu caso. Puedes contratar uno o ver el catálogo completo.
              </p>
              <div className="space-y-3">
                {recommended.map((svc) => (
                  <article
                    key={svc.slug}
                    className="rounded-xl border border-gray-200 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-36 w-full shrink-0 bg-gray-100">
                      <Image
                        src={svc.img.src}
                        alt={svc.img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                      <div className="absolute bottom-2 right-2 rounded-lg bg-white/95 px-2.5 py-1 shadow">
                        <p className="text-lg font-extrabold text-gold-600 leading-none">{svc.precio} €</p>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-3">
                      <p className="text-sm font-bold text-gray-900 leading-snug">{svc.nombre}</p>
                      <button
                        type="button"
                        disabled={paying === svc.slug}
                        onClick={() => void goCheckout(svc.slug)}
                        className="w-full rounded-xl bg-forest-900 text-[#f4d98a] text-sm font-bold py-3.5 min-h-[48px] touch-manipulation disabled:opacity-50 active:scale-[0.99]"
                      >
                        {paying === svc.slug ? 'Abriendo Stripe…' : `Contratar · ${svc.precio} €`}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                onClick={finishBrowse}
                className="w-full rounded-xl border border-gray-200 text-gray-800 font-semibold py-3.5 min-h-[48px] touch-manipulation"
              >
                Ver todos los servicios
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
