'use client'

import { useEffect, useMemo, useState } from 'react'

type Informe = {
  generadoEn: string
  fuenteGsc: string | null
  totalInventario: number
  sinIndexar: Array<{ url: string; path: string; issue: string }>
  pendientesVerificar: Array<{ url: string; path: string; motivo: string }>
  problemasGsc: Array<{ url: string; path: string; estado: string; issue: string }>
  probablementeIndexadas: number
}

export default function GestoriaUrlsIndexacion() {
  const [informe, setInforme] = useState<Informe | null>(null)
  const [copiado, setCopiado] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/gestoria-indexacion-report.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Informe no generado')
        return r.json()
      })
      .then(setInforme)
      .catch(() =>
        setError(
          'Ejecuta: npx tsx scripts/seo/comprobar-indexacion-gestoria.ts (con export GSC actualizado)'
        )
      )
  }, [])

  const pendientes = useMemo(() => {
    if (!informe) return []
    return [...informe.sinIndexar.map((r) => r.url), ...informe.pendientesVerificar.map((r) => r.url)]
  }, [informe])

  async function copiar() {
    await navigator.clipboard.writeText(pendientes.join('\n'))
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const fecha = informe?.generadoEn
    ? new Date(informe.generadoEn).toLocaleDateString('es-ES')
    : null

  return (
    <details className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80">
      <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-700 select-none">
        URLs pendientes de indexar
        {informe ? ` (${pendientes.length} de ${informe.totalInventario})` : ''}
      </summary>
      <div className="px-5 pb-5 space-y-4 border-t border-gray-200">
        {error && <p className="text-xs text-amber-700 pt-3">{error}</p>}

        {informe && (
          <>
            <p className="text-xs text-gray-500 pt-3">
              Informe del {fecha}
              {informe.fuenteGsc ? ` · GSC: ${informe.fuenteGsc}` : ''}.{' '}
              <strong>{informe.probablementeIndexadas}</strong> URLs no aparecen en problemas GSC
              (probablemente ya indexadas).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="rounded-lg bg-white border p-2">
                <p className="font-bold text-red-600">{informe.sinIndexar.length}</p>
                <p className="text-gray-500">Sin indexar GSC</p>
              </div>
              <div className="rounded-lg bg-white border p-2">
                <p className="font-bold text-amber-600">{informe.pendientesVerificar.length}</p>
                <p className="text-gray-500">Nuevas / verificar</p>
              </div>
              <div className="rounded-lg bg-white border p-2">
                <p className="font-bold text-green-600">{informe.probablementeIndexadas}</p>
                <p className="text-gray-500">Prob. indexadas</p>
              </div>
              <div className="rounded-lg bg-white border p-2">
                <p className="font-bold text-gray-600">{informe.problemasGsc.length}</p>
                <p className="text-gray-500">404 / redirect</p>
              </div>
            </div>

            {pendientes.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={copiar}
                  className="px-4 py-2 rounded-lg bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
                >
                  {copiado ? '¡Copiado!' : `Copiar pendientes (${pendientes.length})`}
                </button>
                <textarea
                  readOnly
                  rows={Math.min(14, pendientes.length + 2)}
                  value={pendientes.join('\n')}
                  className="w-full text-xs font-mono text-gray-700 bg-white border border-gray-200 rounded-lg p-3 resize-y"
                  aria-label="URLs pendientes de indexar"
                />
              </>
            ) : (
              <p className="text-sm text-green-700 font-medium">
                No hay gestoría pendiente según el último export GSC. Vuelve a exportar desde
                Search Console para refrescar.
              </p>
            )}

            <p className="text-[11px] text-gray-400">
              Actualizar: GSC → Indexación → Páginas → exportar CSV →{' '}
              <code className="bg-gray-100 px-1 rounded">scripts/gsc-coverage-urls.csv</code> →{' '}
              <code className="bg-gray-100 px-1 rounded">
                npx tsx scripts/seo/comprobar-indexacion-gestoria.ts
              </code>
            </p>
          </>
        )}
      </div>
    </details>
  )
}
