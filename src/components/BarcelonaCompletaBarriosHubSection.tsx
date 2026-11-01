import Link from 'next/link'
import { listBarcelonaVentaCompletaBarrios } from '@/lib/barcelona-venta-completa-barrios'
import { listBarcelonaCompraCompletaBarrios } from '@/lib/barcelona-compra-completa-barrios'

type Modo = 'venta' | 'compra' | 'ambos'

type Props = {
  modo?: Modo
  /** Texto SEO sobre URL canónica por barrio */
  showCanonicalNote?: boolean
}

const PRECO = 687

export default function BarcelonaCompletaBarriosHubSection({
  modo = 'ambos',
  showCanonicalNote = false,
}: Props) {
  const venta = listBarcelonaVentaCompletaBarrios()
  const compra = listBarcelonaCompraCompletaBarrios()

  return (
    <section className="py-14 px-4 bg-cream-50 border-t border-gold-200/40">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          {modo === 'venta'
            ? `Venta completa por barrios (${venta.length} zonas)`
            : modo === 'compra'
              ? `Compra completa por barrios (${compra.length} zonas)`
              : `Compra y venta completa por barrios en Barcelona`}
        </h2>
        <p className="text-gray-600 text-sm mb-4 max-w-2xl mx-auto text-center">
          Landings con mercado local, guía editorial, FAQ, testimonios y schema HowTo. Pack {PRECO} € IVA incl. · gestor
          asignado · online o despacho Les Corts.
        </p>
        {showCanonicalNote ? (
          <p className="text-gray-500 text-xs mb-8 max-w-2xl mx-auto text-center">
            URL canónica por zona:{' '}
            <code className="text-[11px] bg-white px-1 rounded">/barcelona/venta-completa/[barrio]</code> y{' '}
            <code className="text-[11px] bg-white px-1 rounded">/barcelona/compra-completa/[barrio]</code>. Este hub
            enlaza al detalle sin duplicar el contenido principal.
          </p>
        ) : (
          <div className="mb-8" />
        )}

        <div className={`grid gap-8 ${modo === 'ambos' ? 'md:grid-cols-2' : ''}`}>
          {(modo === 'venta' || modo === 'ambos') && (
            <div>
              {modo === 'ambos' ? (
                <h3 className="text-sm font-bold uppercase tracking-widest text-gold-700 mb-3">Venta completa</h3>
              ) : null}
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {venta.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/barcelona/venta-completa/${b.slug}`}
                      className="block rounded-xl border border-gold-200 bg-white px-3 py-3 text-sm font-semibold text-gold-900 hover:bg-gold-50 transition-colors"
                    >
                      {b.nombre}
                      <span className="block text-[10px] font-normal text-gray-500 mt-0.5">{b.distrito}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(modo === 'compra' || modo === 'ambos') && (
            <div>
              {modo === 'ambos' ? (
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-3">Compra completa</h3>
              ) : null}
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {compra.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/barcelona/compra-completa/${b.slug}`}
                      className="block rounded-xl border border-emerald-200 bg-white px-3 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors"
                    >
                      {b.nombre}
                      <span className="block text-[10px] font-normal text-gray-500 mt-0.5">{b.distrito}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          {modo !== 'compra' ? (
            <Link href="/gestoria/venta-completa-reserva-escritura/barcelona" className="text-gold-700 font-semibold hover:underline">
              Hub venta completa Barcelona (gestoría) →
            </Link>
          ) : null}
          {modo !== 'venta' ? (
            <Link href="/gestoria/compra-completa-reserva-escritura/barcelona" className="text-emerald-800 font-semibold hover:underline">
              Hub compra completa Barcelona (gestoría) →
            </Link>
          ) : null}
          {modo === 'venta' ? (
            <Link href="/barcelona/compra-completa/eixample" className="text-gray-600 hover:underline">
              ¿Comprador? Compra completa por barrios →
            </Link>
          ) : null}
          {modo === 'compra' ? (
            <Link href="/barcelona/venta-completa/eixample" className="text-gray-600 hover:underline">
              ¿Vendedor? Venta completa por barrios →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
