'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'alquiler' | 'arras'

type Props = {
  mode: Mode
  ciudad: string
  ciudadSlug: string
  precioContrato: number
}

function formatEur(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
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
        <span className="text-xs text-gray-500">{label}</span>
        <span
          className={`font-bold tabular-nums text-sm ${
            variant === 'agency' ? 'text-neutral-700' : 'text-gold-700'
          }`}
        >
          {formatEur(amount)}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function CalculadoraAhorroContrato({ mode, ciudad, ciudadSlug, precioContrato }: Props) {
  const [valor, setValor] = useState(mode === 'alquiler' ? '900' : '250000')

  const num = Number(String(valor).replace(/\./g, '').replace(',', '.')) || 0

  const agencia =
    mode === 'alquiler'
      ? num
      : num * 0.04

  const gestoria = precioContrato
  const ahorro = Math.max(0, agencia - gestoria)
  const pct = agencia > 0 ? Math.round((ahorro / agencia) * 100) : 0

  const labelInput = mode === 'alquiler' ? 'Renta mensual (€)' : 'Precio de compraventa (€)'
  const labelAgencia =
    mode === 'alquiler'
      ? 'Comisión típica de agencia (≈ 1 mes de renta)'
      : 'Comisión típica de agencia (≈ 4 % del precio)'

  const solicitarHref =
    mode === 'alquiler'
      ? `/gestoria/solicitar/contrato-alquiler?ciudad=${ciudadSlug}`
      : `/gestoria/solicitar/arras-penitenciales?ciudad=${ciudadSlug}`

  return (
    <section className="rounded-2xl border border-gold-500/25 overflow-hidden shadow-xl bg-white">
      <div className="bg-black px-6 py-7 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(201,150,42,0.12),transparent_55%)]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
            Comparativa de costes · {ciudad}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {mode === 'alquiler'
              ? '¿Cuánto ahorras frente a una agencia?'
              : '¿Cuánto ahorras en la compraventa?'}
          </h2>
          <p className="text-white/55 text-sm max-w-2xl leading-relaxed">
            {mode === 'alquiler'
              ? 'Contrato LAU con gestoría a precio fijo. Sin intermediación de agencia sobre tu renta.'
              : 'Contrato de arras con gestoría a precio fijo. Sin porcentaje sobre el precio de venta.'}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">{labelInput}</label>
            <input
              type="text"
              inputMode="numeric"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^\d.,]/g, ''))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-semibold tabular-nums focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            />
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Cálculo orientativo. En alquiler, la comisión de agencia la paga el propietario; entre particulares
              evitas ese coste. En venta, el % varía (suele 3–5 %).
            </p>
          </div>

          <div className="space-y-4">
            <ComparisonBar label={labelAgencia} amount={agencia} max={agencia || gestoria} variant="agency" />
            <ComparisonBar
              label={mode === 'alquiler' ? 'Contrato LAU Inmonest' : 'Contrato de arras Inmonest'}
              amount={gestoria}
              max={agencia || gestoria}
              variant="inmonest"
            />
            <div className="rounded-xl bg-black p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">
                Ahorro orientativo
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-gold-400 tabular-nums">{formatEur(ahorro)}</p>
              <p className="text-white/50 text-xs mt-1">≈ {pct} % menos que la vía agencia</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-gray-100">
          <Link
            href={solicitarHref}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Contratar — {formatEur(gestoria)}
          </Link>
          <Link
            href="#gestor-daniel"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-800 font-semibold px-6 py-3 text-sm hover:border-gold-500 hover:text-gold-700 transition-colors"
          >
            Hablar con Daniel
          </Link>
        </div>
      </div>
    </section>
  )
}
