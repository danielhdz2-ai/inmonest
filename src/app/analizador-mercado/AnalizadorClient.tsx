'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ── Datos de mercado (abril 2026) ──────────────────────────────────────
// Fuentes: Fotocasa, Idealista, INE — actualizados trimestralmente
export const CIUDADES: CiudadData[] = [
  {
    id: 'madrid',
    nombre: 'Madrid',
    provincia: 'Madrid',
    emoji: '🏙️',
    temperatura: 'caliente',
    venta: {
      precio_m2: 5458,
      variacion_anual: 12.1,
      variacion_mes: -4.9,
      anuncios_activos: 31930,
      precio_1hab: 320000,
      precio_2hab: 420000,
      precio_3hab: 560000,
      precio_4hab: 820000,
    },
    alquiler: {
      precio_m2: 22,
      variacion_anual: 1.5,
      variacion_mes: -0.8,
      anuncios_activos: 19255,
      precio_1hab: 1326,
      precio_2hab: 1779,
      precio_3hab: 2196,
      precio_4hab: 2461,
    },
  },
  {
    id: 'barcelona',
    nombre: 'Barcelona',
    provincia: 'Barcelona',
    emoji: '🌊',
    temperatura: 'caliente',
    venta: {
      precio_m2: 4820,
      variacion_anual: 10.3,
      variacion_mes: -1.2,
      anuncios_activos: 24100,
      precio_1hab: 280000,
      precio_2hab: 375000,
      precio_3hab: 490000,
      precio_4hab: 720000,
    },
    alquiler: {
      precio_m2: 24,
      variacion_anual: 8.4,
      variacion_mes: 1.1,
      anuncios_activos: 14800,
      precio_1hab: 1450,
      precio_2hab: 1950,
      precio_3hab: 2400,
      precio_4hab: 3100,
    },
  },
  {
    id: 'valencia',
    nombre: 'Valencia',
    provincia: 'Valencia',
    emoji: '🌞',
    temperatura: 'caliente',
    venta: {
      precio_m2: 2520,
      variacion_anual: 15.3,
      variacion_mes: 2.1,
      anuncios_activos: 18400,
      precio_1hab: 130000,
      precio_2hab: 190000,
      precio_3hab: 260000,
      precio_4hab: 380000,
    },
    alquiler: {
      precio_m2: 13,
      variacion_anual: 12.5,
      variacion_mes: 1.8,
      anuncios_activos: 9600,
      precio_1hab: 850,
      precio_2hab: 1150,
      precio_3hab: 1450,
      precio_4hab: 1900,
    },
  },
  {
    id: 'sevilla',
    nombre: 'Sevilla',
    provincia: 'Sevilla',
    emoji: '🌸',
    temperatura: 'templado',
    venta: {
      precio_m2: 2280,
      variacion_anual: 8.7,
      variacion_mes: 0.4,
      anuncios_activos: 12300,
      precio_1hab: 120000,
      precio_2hab: 170000,
      precio_3hab: 230000,
      precio_4hab: 340000,
    },
    alquiler: {
      precio_m2: 11,
      variacion_anual: 6.2,
      variacion_mes: 0.9,
      anuncios_activos: 6800,
      precio_1hab: 720,
      precio_2hab: 950,
      precio_3hab: 1200,
      precio_4hab: 1650,
    },
  },
  {
    id: 'malaga',
    nombre: 'Málaga',
    provincia: 'Málaga',
    emoji: '🏖️',
    temperatura: 'caliente',
    venta: {
      precio_m2: 4644,
      variacion_anual: 18.2,
      variacion_mes: 3.1,
      anuncios_activos: 21600,
      precio_1hab: 250000,
      precio_2hab: 340000,
      precio_3hab: 450000,
      precio_4hab: 680000,
    },
    alquiler: {
      precio_m2: 18,
      variacion_anual: 14.3,
      variacion_mes: 2.2,
      anuncios_activos: 10400,
      precio_1hab: 1100,
      precio_2hab: 1450,
      precio_3hab: 1900,
      precio_4hab: 2600,
    },
  },
  {
    id: 'bilbao',
    nombre: 'Bilbao',
    provincia: 'Bizkaia',
    emoji: '🌧️',
    temperatura: 'templado',
    venta: {
      precio_m2: 3644,
      variacion_anual: 6.5,
      variacion_mes: 0.2,
      anuncios_activos: 8900,
      precio_1hab: 190000,
      precio_2hab: 260000,
      precio_3hab: 350000,
      precio_4hab: 510000,
    },
    alquiler: {
      precio_m2: 14,
      variacion_anual: 4.8,
      variacion_mes: 0.5,
      anuncios_activos: 4200,
      precio_1hab: 900,
      precio_2hab: 1200,
      precio_3hab: 1550,
      precio_4hab: 2000,
    },
  },
  {
    id: 'zaragoza',
    nombre: 'Zaragoza',
    provincia: 'Zaragoza',
    emoji: '🏛️',
    temperatura: 'frio',
    venta: {
      precio_m2: 2030,
      variacion_anual: 5.2,
      variacion_mes: -0.3,
      anuncios_activos: 10200,
      precio_1hab: 95000,
      precio_2hab: 140000,
      precio_3hab: 185000,
      precio_4hab: 270000,
    },
    alquiler: {
      precio_m2: 9,
      variacion_anual: 3.5,
      variacion_mes: 0.1,
      anuncios_activos: 4800,
      precio_1hab: 580,
      precio_2hab: 780,
      precio_3hab: 980,
      precio_4hab: 1300,
    },
  },
  {
    id: 'alicante',
    nombre: 'Alicante',
    provincia: 'Alicante',
    emoji: '🌴',
    temperatura: 'caliente',
    venta: {
      precio_m2: 2350,
      variacion_anual: 13.8,
      variacion_mes: 1.9,
      anuncios_activos: 14700,
      precio_1hab: 120000,
      precio_2hab: 175000,
      precio_3hab: 240000,
      precio_4hab: 360000,
    },
    alquiler: {
      precio_m2: 12,
      variacion_anual: 10.2,
      variacion_mes: 1.5,
      anuncios_activos: 7200,
      precio_1hab: 750,
      precio_2hab: 1000,
      precio_3hab: 1300,
      precio_4hab: 1800,
    },
  },
  {
    id: 'granada',
    nombre: 'Granada',
    provincia: 'Granada',
    emoji: '🏔️',
    temperatura: 'templado',
    venta: {
      precio_m2: 2507,
      variacion_anual: 7.4,
      variacion_mes: 0.6,
      anuncios_activos: 9100,
      precio_1hab: 130000,
      precio_2hab: 180000,
      precio_3hab: 240000,
      precio_4hab: 360000,
    },
    alquiler: {
      precio_m2: 11,
      variacion_anual: 5.5,
      variacion_mes: 0.7,
      anuncios_activos: 4600,
      precio_1hab: 680,
      precio_2hab: 900,
      precio_3hab: 1150,
      precio_4hab: 1550,
    },
  },
  {
    id: 'san-sebastian',
    nombre: 'San Sebastián',
    provincia: 'Gipuzkoa',
    emoji: '🎿',
    temperatura: 'caliente',
    venta: {
      precio_m2: 6200,
      variacion_anual: 9.1,
      variacion_mes: 0.3,
      anuncios_activos: 4500,
      precio_1hab: 340000,
      precio_2hab: 460000,
      precio_3hab: 620000,
      precio_4hab: 920000,
    },
    alquiler: {
      precio_m2: 21,
      variacion_anual: 6.3,
      variacion_mes: 0.4,
      anuncios_activos: 2100,
      precio_1hab: 1300,
      precio_2hab: 1700,
      precio_3hab: 2200,
      precio_4hab: 3000,
    },
  },
]

interface CiudadData {
  id: string
  nombre: string
  provincia: string
  emoji: string
  temperatura: 'caliente' | 'templado' | 'frio'
  venta: {
    precio_m2: number
    variacion_anual: number
    variacion_mes: number
    anuncios_activos: number
    precio_1hab: number
    precio_2hab: number
    precio_3hab: number
    precio_4hab: number
  }
  alquiler: {
    precio_m2: number
    variacion_anual: number
    variacion_mes: number
    anuncios_activos: number
    precio_1hab: number
    precio_2hab: number
    precio_3hab: number
    precio_4hab: number
  }
}

const TEMP_CONFIG = {
  caliente: { label: '🔥 Mercado caliente', color: 'bg-red-100 text-red-700 border-red-200', desc: 'Alta demanda, pisos que se venden rápido. Negociar a la baja es difícil.' },
  templado: { label: '🌡️ Mercado templado', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Equilibrio entre oferta y demanda. Buenos momentos para negociar.' },
  frio: { label: '🧊 Mercado frío', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'Más oferta que demanda. El comprador tiene más poder de negociación.' },
}

function fmt(n: number) {
  return n.toLocaleString('es-ES')
}

function Variacion({ v }: { v: number }) {
  const up = v >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-red-600' : 'text-emerald-600'}`}>
      {up ? '▲' : '▼'} {Math.abs(v).toFixed(1)}%
    </span>
  )
}

export default function AnalizadorClient() {
  const [ciudadId, setCiudadId] = useState('madrid')
  const [tab, setTab] = useState<'venta' | 'alquiler'>('venta')

  const ciudad = CIUDADES.find(c => c.id === ciudadId)!
  const datos = tab === 'venta' ? ciudad.venta : ciudad.alquiler
  const temp = TEMP_CONFIG[ciudad.temperatura]

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0d1a0f] min-h-[380px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/interior2-mercado.jpg"
            alt="Interior moderno vivienda España"
            fill
            className="object-cover object-center opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a0f]/60 via-transparent to-[#0d1a0f]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-20 w-full">
          <span className="inline-flex items-center gap-2 bg-[#c9962a]/20 border border-[#c9962a]/40 text-[#f4c94a] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            📊 Herramienta gratuita
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Analizador de<br /><span className="text-[#c9962a]">Mercado Inmobiliario</span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            Precio medio del m², temperatura del mercado y evolución de precios en las principales ciudades de España. Datos de abril 2026.
          </p>

          {/* Selector de ciudad */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <label className="text-white/60 text-sm font-medium">Ciudad:</label>
            <div className="relative">
              <select
                value={ciudadId}
                onChange={e => setCiudadId(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur border border-white/20 text-white font-semibold pl-4 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/60 cursor-pointer"
              >
                {CIUDADES.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#0d1a0f] text-white">
                    {c.emoji} {c.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-xs">▼</span>
            </div>

            {/* Tabs venta / alquiler */}
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
              {(['venta', 'alquiler'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    tab === t
                      ? 'bg-[#c9962a] text-white shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t === 'venta' ? 'Compra' : 'Alquiler'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Temperatura del mercado */}
        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-semibold ${temp.color}`}>
          <span className="text-lg">{ciudad.temperatura === 'caliente' ? '🔥' : ciudad.temperatura === 'templado' ? '🌡️' : '🧊'}</span>
          <div>
            <p className="font-bold">{temp.label.replace(/^[^ ]+ /, '')} en {ciudad.nombre}</p>
            <p className="font-normal opacity-80 text-xs mt-0.5">{temp.desc}</p>
          </div>
        </div>

        {/* ── KPIs principales ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Precio medio m²',
              value: `${fmt(datos.precio_m2)} €`,
              suffix: tab === 'alquiler' ? '/mes/m²' : '/m²',
              variacion: datos.variacion_anual,
              sub: 'variación anual',
            },
            {
              label: 'Variación mensual',
              value: `${datos.variacion_mes >= 0 ? '+' : ''}${datos.variacion_mes.toFixed(1)}%`,
              isTrend: true,
              up: datos.variacion_mes >= 0,
              sub: 'último mes',
            },
            {
              label: 'Anuncios activos',
              value: fmt(datos.anuncios_activos),
              sub: `en ${ciudad.provincia}`,
            },
            {
              label: tab === 'venta' ? 'Piso tipo (80m²)' : 'Alquiler tipo (60m²)',
              value: tab === 'venta'
                ? `${fmt(Math.round(datos.precio_m2 * 80))} €`
                : `${fmt(Math.round(datos.precio_m2 * 60))} €/mes`,
              sub: 'estimado',
            },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{k.label}</p>
              <p className={`text-2xl font-extrabold ${k.isTrend ? (k.up ? 'text-red-600' : 'text-emerald-600') : 'text-gray-900'}`}>
                {k.value}
              </p>
              {k.variacion !== undefined && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Variacion v={k.variacion} />
                  <span className="text-[10px] text-gray-400">{k.sub}</span>
                </div>
              )}
              {k.variacion === undefined && (
                <p className="text-[10px] text-gray-400 mt-1">{k.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Precio por habitaciones ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">
              {tab === 'venta' ? 'Precio de venta' : 'Precio de alquiler'} por nº de habitaciones en {ciudad.nombre}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Precios medios · {tab === 'venta' ? 'Compraventa' : 'Alquiler mensual'} · Abril 2026</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            {[
              { hab: '1 hab.', icon: '🛏️', precio: datos.precio_1hab },
              { hab: '2 hab.', icon: '🛏️🛏️', precio: datos.precio_2hab },
              { hab: '3 hab.', icon: '🏠', precio: datos.precio_3hab },
              { hab: '4+ hab.', icon: '🏡', precio: datos.precio_4hab },
            ].map(h => (
              <div key={h.hab} className="p-6 text-center">
                <p className="text-2xl mb-2">{h.icon}</p>
                <p className="text-xs text-gray-400 mb-1">{h.hab}</p>
                <p className="text-lg font-extrabold text-gray-900">
                  {fmt(h.precio)} €{tab === 'alquiler' ? '/mes' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Comparativa ciudades ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Comparativa nacional — precio m²</h2>
              <p className="text-xs text-gray-400 mt-1">{tab === 'venta' ? 'Precio de venta' : 'Precio de alquiler'} · Ordenado de mayor a menor</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Ciudad</th>
                  <th className="text-right px-4 py-3 font-medium">€/m²</th>
                  <th className="text-right px-4 py-3 font-medium">Var. anual</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Var. mes</th>
                  <th className="text-right px-6 py-3 font-medium hidden sm:table-cell">Anuncios</th>
                  <th className="text-center px-4 py-3 font-medium hidden md:table-cell">Temperatura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...CIUDADES]
                  .sort((a, b) =>
                    tab === 'venta'
                      ? b.venta.precio_m2 - a.venta.precio_m2
                      : b.alquiler.precio_m2 - a.alquiler.precio_m2
                  )
                  .map(c => {
                    const d = tab === 'venta' ? c.venta : c.alquiler
                    const isSelected = c.id === ciudadId
                    return (
                      <tr
                        key={c.id}
                        onClick={() => setCiudadId(c.id)}
                        className={`cursor-pointer transition-colors hover:bg-[#fef9e8] ${isSelected ? 'bg-[#fef0c7]' : ''}`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                          <span>{c.emoji}</span> {c.nombre}
                          {isSelected && <span className="text-[10px] bg-[#c9962a] text-white px-2 py-0.5 rounded-full font-bold ml-1">Seleccionada</span>}
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-gray-900">
                          {fmt(d.precio_m2)} €{tab === 'alquiler' ? '/m²' : ''}
                        </td>
                        <td className="px-4 py-4 text-right"><Variacion v={d.variacion_anual} /></td>
                        <td className="px-4 py-4 text-right hidden sm:table-cell"><Variacion v={d.variacion_mes} /></td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell text-gray-500">{fmt(d.anuncios_activos)}</td>
                        <td className="px-4 py-4 hidden md:table-cell text-center">
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${TEMP_CONFIG[c.temperatura].color}`}>
                            {c.temperatura === 'caliente' ? '🔥 Caliente' : c.temperatura === 'templado' ? '🌡️ Templado' : '🧊 Frío'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-[11px] text-gray-400">* Datos orientativos basados en Fotocasa, Idealista e INE. Actualizados abril 2026. Haz clic en una ciudad para ver su detalle.</p>
          </div>
        </div>

        {/* ── Explicación temperatura ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">¿Qué significa la temperatura del mercado?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(TEMP_CONFIG).map(([key, cfg]) => (
              <div key={key} className={`rounded-xl border p-4 ${cfg.color}`}>
                <p className="font-bold text-sm mb-1">{cfg.label}</p>
                <p className="text-xs opacity-80 leading-relaxed">{cfg.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            La temperatura se calcula en base a la duración media de los anuncios activos y la ratio oferta/demanda en cada zona.
          </p>
        </div>

        {/* ── CTAs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-[#0d1a0f] p-6">
            <div className="absolute inset-0 opacity-20">
              <Image src="/mercado1.jpg" alt="Hipoteca" fill className="object-cover" sizes="500px" />
            </div>
            <div className="relative z-10">
              <p className="text-[#f4c94a] text-xs font-bold uppercase tracking-widest mb-2">Financiación</p>
              <h3 className="text-white font-bold text-lg mb-2">¿Vas a comprar en {ciudad.nombre}?</h3>
              <p className="text-white/60 text-sm mb-4">Calcula tu cuota mensual y compara las mejores hipotecas del mercado.</p>
              <Link href="/hipoteca" className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841e] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors">
                Calcular hipoteca →
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="absolute inset-0 opacity-10">
              <Image src="/mercado2.jpg" alt="Contrato" fill className="object-cover" sizes="500px" />
            </div>
            <div className="relative z-10">
              <p className="text-[#c9962a] text-xs font-bold uppercase tracking-widest mb-2">Gestoría</p>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Cierra el trato con seguridad jurídica</h3>
              <p className="text-gray-500 text-sm mb-4">Contratos de arras, compraventa y alquiler redactados por abogados especializados.</p>
              <Link href="/gestoria" className="inline-flex items-center gap-2 bg-[#c9962a] hover:bg-[#b8841e] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors">
                Ver contratos →
              </Link>
            </div>
          </div>
        </div>

        {/* Nota legal */}
        <p className="text-center text-xs text-gray-400 pb-6">
          Los datos mostrados son orientativos y se actualizan trimestralmente. Fuentes: Fotocasa Research, Idealista, INE. Inmonest no garantiza la exactitud de los datos. Consulta siempre con un profesional antes de tomar decisiones de inversión.
        </p>
      </div>
    </main>
  )
}
