'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GESTORIA_PHONE_WA } from '@/lib/gestoria-contact'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { isPaidStatus } from '@/lib/gestoria-leads'

const MAX_ATTEMPTS = 6
const RETRY_MS = 900

type StepId = 'vincular' | 'activar' | 'confirmar' | 'listo'

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'vincular', title: 'Vinculando pago', subtitle: 'Comprobando tu pago en Stripe…' },
  { id: 'activar', title: 'Activando expediente', subtitle: 'Creando tu servicio en el panel…' },
  { id: 'confirmar', title: 'Confirmación', subtitle: 'Enviando aviso a tu email…' },
  { id: 'listo', title: 'Listo', subtitle: 'Tu expediente ya está disponible.' },
]

function stepIndex(id: StepId): number {
  return STEPS.findIndex((s) => s.id === id)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type Props = {
  sessionId: string
  userEmail: string
  displayName: string
  onSuccess: (data: {
    contratos: GestoriaContrato[]
    userDocs: GestoriaUserDoc[]
    serviceName?: string
    emailSent?: boolean
  }) => void
}

export default function GestoriaPostPagoActivacion({
  sessionId,
  userEmail,
  displayName,
  onSuccess,
}: Props) {
  const [activeStep, setActiveStep] = useState<StepId>('vincular')
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState<boolean | null>(null)
  const finishedRef = useRef(false)
  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  const whatsappHref = `https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent(
    `Hola, acabo de pagar en Inmonest y mi expediente no se activa.\nEmail: ${userEmail}\nSesión Stripe: ${sessionId}`,
  )}`

  const run = useCallback(async () => {
    if (finishedRef.current) return
    setFailed(false)
    setErrorDetail(null)

    for (let n = 0; n < MAX_ATTEMPTS; n++) {
      if (finishedRef.current) return
      setAttempt(n + 1)

      try {
        setActiveStep('vincular')
        const confirmRes = await fetch(
          `/api/gestoria/confirmar-pago?session_id=${encodeURIComponent(sessionId)}&email=${n === 0 ? '1' : '0'}`,
          { cache: 'no-store' },
        )
        const confirmData = (await confirmRes.json().catch(() => ({}))) as {
          ok?: boolean
          error?: string
          service_name?: string
          email_sent?: boolean
        }

        if (!confirmRes.ok && confirmRes.status !== 402) {
          throw new Error(confirmData.error ?? `Error al confirmar (${confirmRes.status})`)
        }
        if (confirmRes.status === 402) {
          throw new Error('El pago aún no aparece como completado en Stripe. Espera unos segundos.')
        }

        if (typeof confirmData.email_sent === 'boolean') {
          setEmailSent(confirmData.email_sent)
        }

        setActiveStep('activar')
        await fetch('/api/gestoria/vincular-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        }).catch(() => null)

        setActiveStep('confirmar')

        const ordersRes = await fetch(
          `/api/gestoria/mis-pedidos?session_id=${encodeURIComponent(sessionId)}`,
          { cache: 'no-store', credentials: 'include' },
        )
        const ordersData = (await ordersRes.json().catch(() => ({}))) as {
          contratos?: GestoriaContrato[]
          userDocs?: GestoriaUserDoc[]
          error?: string
        }

        if (!ordersRes.ok) {
          throw new Error(ordersData.error ?? 'No se pudo cargar el expediente')
        }

        const contratos = ordersData.contratos ?? []
        const hasPaid = contratos.some((c) => isPaidStatus(c.status, c.paid_at))

        if (hasPaid) {
          finishedRef.current = true
          setActiveStep('listo')
          await sleep(400)
          onSuccessRef.current({
            contratos,
            userDocs: ordersData.userDocs ?? [],
            serviceName: confirmData.service_name,
            emailSent: confirmData.email_sent ?? undefined,
          })
          return
        }
      } catch (e) {
        setErrorDetail(e instanceof Error ? e.message : 'Error inesperado')
      }

      if (n + 1 < MAX_ATTEMPTS) {
        await sleep(RETRY_MS)
      }
    }

    setFailed(true)
  }, [sessionId, userEmail])

  useEffect(() => {
    finishedRef.current = false
    void run()
    return () => {
      finishedRef.current = true
    }
  }, [run])

  const currentIdx = stepIndex(activeStep)

  return (
    <div className="min-h-[min(70vh,520px)] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-black to-black px-6 py-5 text-white">
          <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-widest">Post-pago</p>
          <h2 className="text-xl font-bold mt-1">Activando tu gestoría</h2>
          <p className="text-sm text-white/60 mt-1">
            Hola {displayName.split(' ')[0]}, estamos vinculando tu pago con{' '}
            <span className="text-white/90">{userEmail}</span>
          </p>
        </div>

        <div className="p-6 space-y-5">
          <ol className="space-y-3">
            {STEPS.map((step, idx) => {
              const done = idx < currentIdx || (activeStep === 'listo' && idx <= currentIdx)
              const active = idx === currentIdx && activeStep !== 'listo'
              return (
                <li
                  key={step.id}
                  className={`flex gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    active
                      ? 'border-gold-400 bg-cream-50'
                      : done
                        ? 'border-gold-200/80 bg-cream-50/50'
                        : 'border-gray-100 bg-gray-50/80 opacity-70'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      done
                        ? 'bg-gold-500 text-white'
                        : active
                          ? 'bg-gold-500/20 text-gold-800 border border-gold-400'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {done ? '✓' : idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{step.subtitle}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          {!failed && activeStep !== 'listo' && (
            <div className="space-y-2">
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-[#f4d98a] transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((currentIdx + 1) / STEPS.length) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-center text-gray-400">
                Intento {attempt}/{MAX_ATTEMPTS}
                {errorDetail ? ` · ${errorDetail}` : ''}
              </p>
            </div>
          )}

          {emailSent === true && !failed && (
            <p className="text-xs text-center text-gold-800 bg-cream-100 border border-gold-200 rounded-lg px-3 py-2">
              Te hemos enviado un email de confirmación del pago (revisa spam si no lo ves).
            </p>
          )}

          {failed && (
            <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">No pudimos activar el expediente a tiempo</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Tu pago en Stripe suele estar confirmado igualmente. Guarda esta referencia para soporte:
              </p>
              <p className="text-[11px] font-mono bg-white/80 border border-amber-200 rounded-lg px-2 py-1.5 break-all text-gray-700">
                {sessionId}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-xl bg-[#25D366] text-white text-sm font-bold py-3 min-h-[48px] leading-[48px]"
                >
                  WhatsApp gestoría
                </a>
                <button
                  type="button"
                  onClick={() => {
                    finishedRef.current = false
                    void run()
                  }}
                  className="flex-1 rounded-xl border border-gray-300 bg-white text-sm font-semibold py-3 min-h-[48px]"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
