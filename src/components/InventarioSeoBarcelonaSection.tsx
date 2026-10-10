import Link from 'next/link'
import type { buildBarcelonaSeoInventario } from '@/lib/barcelona-seo-inventario'

type Inventario = ReturnType<typeof buildBarcelonaSeoInventario>

type Props = {
  inventario: Inventario
}

export default function InventarioSeoBarcelonaSection({ inventario }: Props) {
  const conBarrios = inventario.servicios.filter((s) => s.conteo.landingsBarrio > 0)

  return (
    <div className="mb-12 rounded-2xl border-2 border-gold-300/80 bg-gradient-to-br from-cream-50 via-white to-cream-50/50 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div>
          <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">
            Barcelona · desglose por barrio
          </p>
          <h3 className="text-2xl font-bold text-gray-900">Landings SEO en Barcelona</h3>
          <p className="text-gray-600 mt-2 max-w-2xl text-sm leading-relaxed">
            Por servicio: cuántas URLs hay en Barcelona (hub de ciudad + una landing por barrio cuando
            existe ruta). Canónica sin <strong className="font-semibold">www</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <span className="px-3 py-2 rounded-lg bg-white border border-gold-200 text-sm font-semibold text-gold-900">
            {inventario.totalUrls} URLs Barcelona
          </span>
          <span className="px-3 py-2 rounded-lg bg-white border border-gold-200 text-sm font-semibold text-gold-900">
            {inventario.totalLandingsBarrio} por barrio
          </span>
          <span className="px-3 py-2 rounded-lg bg-white border border-gold-200 text-sm text-gray-700">
            Arras: {inventario.barriosArras.length} barrios · LAU: {inventario.barriosAlquiler.length}{' '}
            barrios
          </span>
          <a
            href="#barcelona-gsc"
            className="px-3 py-2 rounded-lg bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
          >
            Copiar URLs GSC ↓
          </a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3 font-semibold">Servicio</th>
              <th className="px-4 py-3 font-semibold text-center">Hub ciudad</th>
              <th className="px-4 py-3 font-semibold text-center">Landings barrio</th>
              <th className="px-4 py-3 font-semibold text-center">Total BCN</th>
            </tr>
          </thead>
          <tbody>
            {inventario.servicios.map((s) => (
              <tr key={s.id} className="border-b border-gray-100 last:border-0 hover:bg-cream-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{s.nombre}</p>
                  {s.precio ? <p className="text-xs text-gray-500 mt-0.5">{s.precio}</p> : null}
                </td>
                <td className="px-4 py-3 text-center tabular-nums text-gray-800">
                  {s.conteo.landingsCiudad}
                </td>
                <td className="px-4 py-3 text-center tabular-nums">
                  {s.conteo.landingsBarrio > 0 ? (
                    <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-gold-500/15 text-[#8a6420] font-semibold">
                      {s.conteo.landingsBarrio}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center tabular-nums font-semibold text-gray-900">
                  {s.conteo.totalBarcelona}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {conBarrios.length > 0 ? (
        <div className="mt-8 space-y-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Enlaces por barrio (servicios con desglose)
          </p>
          {conBarrios.map((s) => (
            <div key={s.id} className="rounded-xl border border-gold-200/60 bg-white p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h4 className="font-bold text-gray-900">{s.nombre}</h4>
                <span className="text-xs text-gray-500">
                  {s.conteo.landingsBarrio} barrio{s.conteo.landingsBarrio !== 1 ? 's' : ''} + hub
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.enlaces.map((e) => (
                  <Link
                    key={e.path}
                    href={e.path}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      e.tipo === 'barrio'
                        ? 'border-gold-300 bg-cream-50 text-gold-900 hover:bg-gold-500/10'
                        : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-gold-400'
                    }`}
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
