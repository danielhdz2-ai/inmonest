'use client'

import { useState, useMemo } from 'react'

interface Props {
  alquilerMensual: number
  areaM2?: number | null
  bedrooms?: number | null
}

/**
 * Calculadora de Gastos Mensuales Totales de Alquiler
 * Calcula: alquiler + suministros + internet + otros gastos
 */
export default function TotalRentalCostCalculator({ alquilerMensual, areaM2, bedrooms }: Props) {
  const [alquiler, setAlquiler] = useState(alquilerMensual)
  
  // Estimación de suministros según tamaño
  const getUtilitiesEstimate = (): number => {
    if (!areaM2) return 100
    if (areaM2 < 50) return 80
    if (areaM2 < 80) return 120
    if (areaM2 < 120) return 160
    return 200
  }
  
  let utilities = getUtilitiesEstimate()
  
  // Ajuste si hay 3+ habitaciones (más consumo)
  if (bedrooms && bedrooms >= 3) {
    utilities += 30
  }

  const [suministros, setSuministros] = useState(utilities)
  const [internet, setInternet] = useState(35)
  const [comunidad, setComunidad] = useState(50) // Comunidad de propietarios (si aplica)
  const [seguro, setSeguro] = useState(15) // Seguro hogar
  const [otros, setOtros] = useState(0)

  const totalMensual = alquiler + suministros + internet + comunidad + seguro + otros
  const totalAnual = totalMensual * 12

  const fmt = (n: number) => n.toLocaleString('es-ES')

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-emerald-600 text-lg">💰</span>
        <h3 className="font-bold text-gray-900 text-sm">Gastos mensuales totales</h3>
      </div>

      {/* Control de alquiler */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-xs text-gray-600 font-medium">Alquiler mensual</label>
          <span className="text-sm font-bold text-gray-900">{fmt(alquiler)} €</span>
        </div>
        <input
          type="range"
          min={Math.max(200, alquilerMensual * 0.5)}
          max={alquilerMensual * 1.5}
          step={50}
          value={alquiler}
          onChange={e => setAlquiler(Number(e.target.value))}
          className="w-full accent-emerald-600 h-2 rounded-lg"
        />
      </div>

      {/* Controles de gastos adicionales */}
      <div className="space-y-3 mb-4">
        {/* Suministros */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600 font-medium">Suministros (luz, agua, gas)</label>
            <span className="text-xs font-bold text-emerald-700">{fmt(suministros)} €</span>
          </div>
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={suministros}
            onChange={e => setSuministros(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5"
          />
        </div>

        {/* Internet */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600 font-medium">Internet/Fibra</label>
            <span className="text-xs font-bold text-emerald-700">{fmt(internet)} €</span>
          </div>
          <input
            type="range"
            min={20}
            max={80}
            step={5}
            value={internet}
            onChange={e => setInternet(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5"
          />
        </div>

        {/* Comunidad */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600 font-medium">Comunidad (si aplica)</label>
            <span className="text-xs font-bold text-emerald-700">{fmt(comunidad)} €</span>
          </div>
          <input
            type="range"
            min={0}
            max={150}
            step={10}
            value={comunidad}
            onChange={e => setComunidad(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5"
          />
        </div>

        {/* Seguro hogar */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600 font-medium">Seguro hogar</label>
            <span className="text-xs font-bold text-emerald-700">{fmt(seguro)} €</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={seguro}
            onChange={e => setSeguro(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5"
          />
        </div>

        {/* Otros gastos */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs text-gray-600 font-medium">Otros gastos</label>
            <span className="text-xs font-bold text-emerald-700">{fmt(otros)} €</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            step={10}
            value={otros}
            onChange={e => setOtros(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5"
          />
        </div>
      </div>

      {/* Desglose visual */}
      <div className="bg-white rounded-xl p-4 mb-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span className="text-xs">Alquiler</span>
          <span className="font-semibold">{fmt(alquiler)} €</span>
        </div>
        <div className="border-t border-emerald-100 pt-2 space-y-1">
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Suministros</span>
            <span className="font-medium text-emerald-700">+{fmt(suministros)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Internet</span>
            <span className="font-medium text-emerald-700">+{fmt(internet)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Comunidad</span>
            <span className="font-medium text-emerald-700">+{fmt(comunidad)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Seguro</span>
            <span className="font-medium text-emerald-700">+{fmt(seguro)} €</span>
          </div>
          {otros > 0 && (
            <div className="flex justify-between text-gray-600">
              <span className="text-xs">Otros</span>
              <span className="font-medium text-emerald-700">+{fmt(otros)} €</span>
            </div>
          )}
        </div>
      </div>

      {/* Total mensual */}
      <div className="bg-white rounded-xl p-4 border-2 border-emerald-600 mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-600 uppercase">Total mensual</span>
          <span className="text-xl font-extrabold text-emerald-700">{fmt(totalMensual)} €</span>
        </div>
        <p className="text-xs text-gray-500 text-right">
          Coste anual: {fmt(totalAnual)} €
        </p>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        ℹ️ Estimación orientativa. Los gastos reales dependen del consumo, tarifas contratadas y condiciones del contrato.
      </p>
    </div>
  )
}
