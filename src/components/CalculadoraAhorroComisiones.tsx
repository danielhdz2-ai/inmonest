'use client'

import { useState } from 'react'
import HoneypotField from '@/components/HoneypotField'
import TurnstileWidget from '@/components/TurnstileWidget'
import { gtmPush } from '@/components/GTMProvider'
import { useBotProtection } from '@/hooks/useBotProtection'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'

interface ResultadoCalculo {
  precioVenta: number
  comisionAgencia: number
  costoInmonest: number
  ahorroTotal: number
  porcentajeAhorro: number
}

const FEATURES = [
  { label: 'Sin comisiones sobre el precio', desc: 'Tarifa fija, no porcentaje' },
  { label: 'Contratos con validez jurídica', desc: 'Redactados por gestoría' },
  { label: 'Gestor personal asignado', desc: 'Daniel Hernández te acompaña' },
  { label: 'Proceso hasta escritura', desc: 'Reserva, arras y firma' },
] as const

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPrecio(value: string) {
  const numeros = value.replace(/\D/g, '')
  return numeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function parsePrecio(value: string) {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'))
}

function ComparisonBar({
  label,
  amount,
  max,
  variant,
}: {
  label: string
  amount: number
  max: number
  variant: 'agency' | 'inmonest' | 'savings'
}) {
  const pct = max > 0 ? Math.min(100, (amount / max) * 100) : 0
  const barClass =
    variant === 'agency'
      ? 'bg-neutral-400'
      : variant === 'inmonest'
        ? 'bg-gold-500'
        : 'bg-gold-400'

  return (
    <div>
      <div className="flex justify-between items-baseline gap-3 mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span
          className={`font-bold tabular-nums ${
            variant === 'agency' ? 'text-neutral-700' : 'text-gold-700'
          }`}
        >
          {formatCurrency(amount)}
        </span>
      </div>
      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function CalculadoraAhorroComisiones() {
  const [precio, setPrecio] = useState<string>('250.000')
  const [email, setEmail] = useState<string>('')
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const {
    honeypot,
    setHoneypot,
    turnstileEnabled,
    turnstileSiteKey,
    setTurnstileToken,
    getProtectionPayload,
  } = useBotProtection()

  const calcularAhorro = () => {
    const precioVenta = parsePrecio(precio)

    if (!precioVenta || precioVenta < 10000) {
      setErrMsg('Introduce un precio de venta válido (mínimo 10.000 €)')
      return
    }

    setErrMsg('')
    const comisionAgencia = precioVenta * 0.04
    const costoInmonest = 687
    const ahorroTotal = comisionAgencia - costoInmonest
    const porcentajeAhorro = (ahorroTotal / comisionAgencia) * 100

    setResultado({
      precioVenta,
      comisionAgencia,
      costoInmonest,
      ahorroTotal,
      porcentajeAhorro,
    })
    setEmailEnviado(false)
  }

  const enviarResultado = async () => {
    if (!email || !email.includes('@')) {
      setErrMsg('Introduce un email válido')
      return
    }
    if (!resultado) return

    setLoading(true)
    setErrMsg('')

    try {
      const res = await fetch('/api/lead-magnet/calculadora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          precioVenta: resultado.precioVenta,
          ahorroCalculado: resultado.ahorroTotal,
          comisionAgencia: resultado.comisionAgencia,
          costoInmonest: resultado.costoInmonest,
          source: 'calculadora_ahorro_comisiones',
          ...getProtectionPayload(),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'No se pudo enviar el informe')
      }

      setEmailEnviado(true)

      gtmPush({
        event: 'lead_captured',
        lead_source: 'calculadora_ahorro',
        lead_value: resultado.ahorroTotal,
      })
    } catch (error) {
      setErrMsg(error instanceof Error ? error.message : 'Error al enviar. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecio(formatPrecio(e.target.value))
    setResultado(null)
    setEmailEnviado(false)
    setErrMsg('')
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value)
    setPrecio(formatPrecio(String(n)))
    setResultado(null)
    setEmailEnviado(false)
    setErrMsg('')
  }

  const sliderValue = parsePrecio(precio) || 250000

  return (
    <div className="rounded-2xl border border-gold-500/25 overflow-hidden shadow-2xl bg-white">
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      <div className="bg-black px-6 py-8 sm:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(201,150,42,0.15),transparent_55%)]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
            Comparativa de costes
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Calculadora de ahorro
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Compara la comisión de una agencia tradicional (4 %) frente al servicio fijo de
            gestoría Inmonest (687 €).
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {!emailEnviado && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Precio de venta de tu vivienda
              </label>
              <div className="relative mb-4">
                <input
                  type="text"
                  inputMode="numeric"
                  value={precio}
                  onChange={handlePrecioChange}
                  onKeyDown={(e) => e.key === 'Enter' && calcularAhorro()}
                  placeholder="250.000"
                  className="w-full px-4 py-4 text-xl font-semibold tabular-nums border border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  €
                </span>
              </div>

              <input
                type="range"
                min={50000}
                max={900000}
                step={5000}
                value={Math.min(900000, Math.max(50000, sliderValue))}
                onChange={handleSliderChange}
                className="w-full h-1.5 rounded-full appearance-none bg-gray-200 accent-gold-500 cursor-pointer mb-1"
                aria-label="Ajustar precio de venta"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mb-6">
                <span>50.000 €</span>
                <span>900.000 €</span>
              </div>

              {errMsg && !resultado && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                  {errMsg}
                </p>
              )}

              {!resultado && (
                <button
                  type="button"
                  onClick={calcularAhorro}
                  disabled={!precio}
                  className="w-full rounded-full bg-gold-500 text-white font-semibold py-4 hover:bg-gold-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Calcular ahorro
                </button>
              )}

              {!resultado && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-4">
                    Por qué Inmonest
                  </p>
                  <ul className="space-y-3">
                    {FEATURES.map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <GestoriaCheckIcon size="md" className="mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              {resultado ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 sm:p-6 space-y-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Desglose comparativo
                    </p>
                    <ComparisonBar
                      label="Comisión agencia (4 %)"
                      amount={resultado.comisionAgencia}
                      max={resultado.comisionAgencia}
                      variant="agency"
                    />
                    <ComparisonBar
                      label="Servicio Inmonest (fijo)"
                      amount={resultado.costoInmonest}
                      max={resultado.comisionAgencia}
                      variant="inmonest"
                    />
                    <ComparisonBar
                      label="Tu ahorro neto"
                      amount={resultado.ahorroTotal}
                      max={resultado.comisionAgencia}
                      variant="savings"
                    />
                  </div>

                  <div className="rounded-2xl bg-black p-6 sm:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,150,42,0.2),transparent_60%)]" />
                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
                        Ahorro estimado
                      </p>
                      <p className="text-4xl sm:text-5xl font-extrabold text-gold-400 tabular-nums mb-1">
                        {formatCurrency(resultado.ahorroTotal)}
                      </p>
                      <p className="text-white/60 text-sm">
                        {resultado.porcentajeAhorro.toFixed(0)} % menos que la vía agencia tradicional
                      </p>
                      <p className="text-white/45 text-xs mt-3">
                        Sobre un precio de venta de {formatCurrency(resultado.precioVenta)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gold-500/30 bg-cream-50 p-5 sm:p-6">
                    <p className="text-sm font-bold text-gray-900 mb-1">
                      Recibe el informe detallado por email
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                      Cálculo personalizado y guía para vender entre particulares con respaldo legal.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-sm"
                      />
                      {turnstileEnabled && (
                        <TurnstileWidget
                          siteKey={turnstileSiteKey}
                          onVerify={setTurnstileToken}
                          onExpire={() => setTurnstileToken('')}
                        />
                      )}
                      {errMsg && (
                        <p className="text-sm text-red-600">{errMsg}</p>
                      )}
                      <button
                        type="button"
                        onClick={enviarResultado}
                        disabled={loading}
                        className="w-full rounded-full bg-black text-white font-semibold py-3 hover:bg-neutral-900 transition-colors disabled:bg-gray-400 text-sm"
                      >
                        {loading ? 'Enviando…' : 'Enviar informe gratuito'}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 text-center mt-3">
                      Sin spam. Solo información útil sobre venta sin comisiones.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Acompañamiento legal completo por 687 €
                    </p>
                    <a
                      href="/gestoria/venta-completa-reserva-escritura"
                      className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
                    >
                      Ver servicio de venta completa
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-8 sm:p-10 h-full flex flex-col justify-center items-center text-center min-h-[280px]">
                  <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">Resultado comparativo</p>
                  <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                    Introduce el precio de venta y pulsa calcular para ver la diferencia entre agencia e Inmonest.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {emailEnviado && (
          <div className="text-center py-10 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-500/15 border-2 border-gold-500 flex items-center justify-center mx-auto mb-5">
              <GestoriaCheckIcon size="md" className="w-7 h-7 text-gold-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Informe enviado</h3>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Revisa tu bandeja de entrada ({email}). Te hemos enviado tu cálculo personalizado y la guía de venta.
            </p>
            <div className="space-y-3">
              <a
                href="/gestoria/venta-completa-reserva-escritura"
                className="block rounded-full bg-gold-500 text-white font-semibold py-3 hover:bg-gold-600 transition-colors text-sm"
              >
                Contratar acompañamiento legal (687 €)
              </a>
              <a
                href="/publicar-anuncio"
                className="block rounded-full border border-gold-500 text-gold-700 font-semibold py-3 hover:bg-gold-500 hover:text-white transition-colors text-sm"
              >
                Publicar mi piso gratis
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
