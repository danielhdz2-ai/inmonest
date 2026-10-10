'use client'

import { useMemo, useState } from 'react'
import type { buildBarcelonaSeoInventario } from '@/lib/barcelona-seo-inventario'

type Inventario = ReturnType<typeof buildBarcelonaSeoInventario>

type Props = {
  inventario: Inventario
}

export default function BarcelonaSeoInventarioPanel({ inventario }: Props) {
  const [copiado, setCopiado] = useState(false)
  const [filtro, setFiltro] = useState<'todas' | 'barrio' | 'ciudad'>('todas')

  const urlsFiltradas = useMemo(() => {
    if (filtro === 'todas') return inventario.todasLasUrls
    const tipo = filtro === 'barrio' ? 'barrio' : 'ciudad'
    return inventario.servicios.flatMap((s) =>
      s.enlaces.filter((e) => e.tipo === tipo).map((e) => e.url)
    )
  }, [filtro, inventario])

  async function copiar() {
    await navigator.clipboard.writeText(urlsFiltradas.join('\n'))
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-gold-400/50 bg-cream-50/80 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Copiar URLs para GSC</h2>
      <p className="text-sm text-gray-600 mb-4 max-w-2xl">
        Solo <code className="text-xs bg-white px-1 rounded">https://inmonest.com</code> (sin www). Usa
        &quot;Probar URL publicada&quot; o reenvía el sitemap; el botón &quot;Solicitar indexación&quot; a
        menudo falla por cuota de Google.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            ['todas', `Todas (${inventario.todasLasUrls.length})`],
            ['barrio', 'Solo barrios'],
            ['ciudad', 'Solo ciudad / hub'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFiltro(id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtro === id
                ? 'bg-gold-500 text-white border-gold-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gold-400'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => void copiar()}
          className="ml-auto px-4 py-1.5 rounded-full text-sm font-semibold bg-[#2b4c7e] text-white hover:bg-[#1e3a5f] transition-colors"
        >
          {copiado ? 'Copiado ✓' : `Copiar ${urlsFiltradas.length} URLs`}
        </button>
      </div>
      <textarea
        readOnly
        className="w-full h-40 text-xs font-mono p-3 rounded-lg border border-gray-200 bg-white text-gray-700"
        value={urlsFiltradas.join('\n')}
        aria-label="URLs Barcelona para indexar"
      />
    </div>
  )
}
