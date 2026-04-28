'use client'

import { useState, useMemo } from 'react'

interface Props {
  precioVivienda: number
  provincia?: string | null
}

/**
 * Calculadora de Gastos Totales de Compra
 * Calcula todos los gastos ocultos: ITP/IVA, notaría, registro, gestoría, tasación
 */
export default function TotalPurchaseCostCalculator({ precioVivienda, provincia }: Props) {
  const [precio, setPrecio] = useState(precioVivienda)
  const [esNuevo, setEsNuevo] = useState(false) // false = segunda mano (ITP), true = nuevo (IVA)
  
  // ITP varía por comunidad autónoma (6-10%)
  const getITP = (prov: string | null | undefined): number => {
    const p = prov?.toLowerCase() || ''
    if (p.includes('madrid')) return 6
    if (p.includes('cataluña') || p.includes('barcelona')) return 10
    if (p.includes('valencia') || p.includes('alicante') || p.includes('castellón')) return 10
    if (p.includes('andalucía') || p.includes('sevilla') || p.includes('málaga') || p.includes('granada')) return 8
    if (p.includes('murcia')) return 8
    if (p.includes('canarias')) return 6.5
    return 7 // Media España
  }

  const itp = getITP(provincia)
  
  // Cálculos
  const impuesto = esNuevo 
    ? Math.round(precio * 0.10) // IVA 10%
    : Math.round(precio * (itp / 100)) // ITP
  
  const notaria = Math.round(
    precio < 100000 ? 600 :
    precio < 200000 ? 850 :
    precio < 400000 ? 1200 :
    1500
  )
  
  const registro = Math.round(notaria * 0.75)
  const gestoria = 500
  const tasacion = Math.round(
    precio < 150000 ? 250 :
    precio < 300000 ? 350 :
    450
  )
  
  const totalGastos = impuesto + notaria + registro + gestoria + tasacion
  const totalReal = precio + totalGastos
  const porcentajeGastos = ((totalGastos / precio) * 100).toFixed(1)

  const fmt = (n: number) => n.toLocaleString('es-ES')

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-600 text-lg">🧮</span>
        <h3 className="font-bold text-gray-900 text-sm">Gastos totales de compra</h3>
      </div>

      {/* Control de precio */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-xs text-gray-600 font-medium">Precio de la vivienda</label>
          <span className="text-sm font-bold text-gray-900">{fmt(precio)} €</span>
        </div>
        <input
          type="range"
          min={Math.max(50000, precioVivienda * 0.5)}
          max={precioVivienda * 1.5}
          step={5000}
          value={precio}
          onChange={e => setPrecio(Number(e.target.value))}
          className="w-full accent-blue-600 h-2 rounded-lg"
        />
      </div>

      {/* Toggle nuevo/segunda mano */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setEsNuevo(false)}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            !esNuevo 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
          }`}
        >
          Segunda mano
        </button>
        <button
          onClick={() => setEsNuevo(true)}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            esNuevo 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
          }`}
        >
          Obra nueva
        </button>
      </div>

      {/* Desglose de gastos */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span className="text-xs">Precio vivienda</span>
          <span className="font-semibold">{fmt(precio)} €</span>
        </div>
        <div className="border-t border-blue-100 pt-2 space-y-1.5">
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">{esNuevo ? 'IVA (10%)' : `ITP (${itp}%)`}</span>
            <span className="font-medium text-blue-700">+{fmt(impuesto)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Notaría</span>
            <span className="font-medium text-blue-700">+{fmt(notaria)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Registro</span>
            <span className="font-medium text-blue-700">+{fmt(registro)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Gestoría</span>
            <span className="font-medium text-blue-700">+{fmt(gestoria)} €</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Tasación</span>
            <span className="font-medium text-blue-700">+{fmt(tasacion)} €</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="bg-white rounded-xl p-4 border-2 border-blue-600">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-600 uppercase">Total a pagar</span>
          <span className="text-xl font-extrabold text-blue-700">{fmt(totalReal)} €</span>
        </div>
        <p className="text-xs text-gray-500 text-right">
          Gastos: +{fmt(totalGastos)} € ({porcentajeGastos}%)
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        ℹ️ Cálculo orientativo. Los importes reales pueden variar según notario, registro y gestoría elegidos.
      </p>
    </div>
  )
}
