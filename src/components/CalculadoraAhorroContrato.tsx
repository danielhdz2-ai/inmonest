'use client'

import { useState } from 'react'
import TrackedContactLink from '@/components/TrackedContactLink'

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

export default function CalculadoraAhorroContrato({ mode, ciudad, ciudadSlug, precioContrato }: Props) {
  const [valor, setValor] = useState(mode === 'alquiler' ? '900' : '250000')

  const num = Number(String(valor).replace(/\./g, '').replace(',', '.')) || 0

  const agencia =
    mode === 'alquiler'
      ? num // 1 mensualidad típica (aunque la ley la carga al propietario, el particular la evita)
      : num * 0.04 // ~4 % comisión venta

  const gestoria = precioContrato
  const ahorro = Math.max(0, agencia - gestoria)
  const pct = agencia > 0 ? Math.round((ahorro / agencia) * 100) : 0

  const labelInput = mode === 'alquiler' ? 'Renta mensual del piso (€)' : 'Precio de compraventa (€)'
  const labelAgencia =
    mode === 'alquiler'
      ? 'Comisión típica de agencia (≈ 1 mes de renta)'
      : 'Comisión típica de agencia (≈ 4 % del precio)'

  return (
    <section className="rounded-2xl border border-gold-300 bg-cream-100 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-2">Calculadora de ahorro</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {mode === 'alquiler'
          ? `¿Cuánto ahorras en ${ciudad} frente a una agencia?`
          : `¿Cuánto ahorras en la compraventa en ${ciudad}?`}
      </h2>
      <p className="text-gray-600 text-sm mb-6 max-w-2xl">
        {mode === 'alquiler'
          ? 'Con un gestor inmobiliario especializado redactas el contrato LAU (precio cerrado) y puedes alquilar entre particulares sin pagar intermediación de agencia. Prueba con tu renta:'
          : 'Una agencia suele cobrar un % sobre el precio. Con gestoría Inmonest pagas un fijo por el contrato de arras (y packs de acompañamiento si los necesitas), sin % sobre la operación:'}
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-2">{labelInput}</label>
      <input
        type="text"
        inputMode="numeric"
        value={valor}
        onChange={(e) => setValor(e.target.value.replace(/[^\d.,]/g, ''))}
        className="w-full sm:w-64 rounded-xl border border-gray-300 px-4 py-3 text-lg font-semibold focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-[#c9a84c]"
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">{labelAgencia}</p>
          <p className="text-2xl font-bold text-red-600">{formatEur(agencia)}</p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">
            {mode === 'alquiler' ? 'Contrato LAU Inmonest' : 'Contrato de arras Inmonest'}
          </p>
          <p className="text-2xl font-bold text-gold-500">{formatEur(gestoria)}</p>
        </div>
        <div className="rounded-xl bg-forest-900 p-4">
          <p className="text-xs text-white/60 mb-1">Ahorro orientativo</p>
          <p className="text-2xl font-bold text-gold-300">{formatEur(ahorro)}</p>
          <p className="text-xs text-white/50 mt-1">≈ {pct}% menos que la vía agencia</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        Cálculo orientativo. En alquiler, desde la Ley de Vivienda la comisión de agencia la paga el propietario; si
        operas entre particulares evitas ese coste. En venta, el % de agencia varía (suele 3–5 %). Habla con un gestor
        para tu caso en {ciudad}.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <TrackedContactLink
          event="click_phone"
          city={ciudadSlug}
          href="tel:+34745022862"
          className="inline-flex items-center justify-center rounded-xl bg-forest-900 hover:bg-neutral-900 text-white font-semibold px-5 py-3 text-sm"
        >
          Llamar al gestor — 745 022 862
        </TrackedContactLink>
        <TrackedContactLink
          event="click_whatsapp"
          city={ciudadSlug}
          href={`https://wa.me/34745022862?text=${encodeURIComponent(
            mode === 'alquiler'
              ? `Hola, quiero ahorrar en el contrato de alquiler en ${ciudad}. Renta aprox. ${valor}€`
              : `Hola, quiero info del contrato de arras en ${ciudad}. Precio aprox. ${valor}€`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-semibold px-5 py-3 text-sm"
        >
          WhatsApp
        </TrackedContactLink>
      </div>
    </section>
  )
}
