import Link from 'next/link'

const PRECO = 687

type Props = {
  ciudadNombre: string
  ciudadSlug: string
  /** Barcelona tiene landings por barrio */
  showBarcelonaBarrios?: boolean
}

export default function GestoriaHubSinComisionSection({
  ciudadNombre,
  ciudadSlug,
  showBarcelonaBarrios = false,
}: Props) {
  const ventaHub = `/gestoria/venta-completa-reserva-escritura/${ciudadSlug}`
  const compraHub = `/gestoria/compra-completa-reserva-escritura/${ciudadSlug}`

  return (
    <section className="py-14 px-4 bg-cream-50 border-y border-gold-200/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
          Vender o comprar en {ciudadNombre} sin comisión de agencia
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
          Pack {PRECO} € IVA incluido: gestor inmobiliario real, contratos, documentación y coordinación con
          notaría. <strong>0 % sobre el precio del piso</strong> — no captamos compradores ni vendemos tu
          inmueble.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-gold-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Venta completa hasta escritura</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ya tienes comprador particular. Redactamos reserva y arras, checklist documental y seguimiento hasta
              firma en notaría en {ciudadNombre}.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={ventaHub}
                className="inline-flex rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gold-400"
              >
                Venta completa {ciudadNombre} →
              </Link>
              <Link
                href="/gestoria/solicitar/venta-completa-reserva-escritura"
                className="inline-flex rounded-full border border-gold-400 px-5 py-2.5 text-sm font-semibold text-gold-800 hover:bg-gold-50"
              >
                Contratar online
              </Link>
            </div>
            {showBarcelonaBarrios ? (
              <p className="mt-4 text-xs text-gray-500">
                Por barrio:{' '}
                <Link href="/barcelona/venta-completa/eixample" className="text-gold-700 font-semibold hover:underline">
                  Eixample
                </Link>
                {' · '}
                <Link href="/barcelona/venta-completa/gracia" className="text-gold-700 font-semibold hover:underline">
                  Gràcia
                </Link>
                {' · '}
                <Link href="/barcelona/venta-completa/sant-antoni" className="text-gold-700 font-semibold hover:underline">
                  Sant Antoni
                </Link>
                {' · '}
                <Link href="/barcelona/venta-completa/les-corts" className="text-gold-700 font-semibold hover:underline">
                  Les Corts
                </Link>
              </p>
            ) : null}
          </article>
          <article className="rounded-2xl border border-emerald-300 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Compra completa hasta escritura</h3>
            <p className="text-sm text-gray-600 mb-4">
              Compras a un particular. Due diligence, arras con cláusula de hipoteca y acompañamiento hasta escritura
              en {ciudadNombre}.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={compraHub}
                className="inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
              >
                Compra completa {ciudadNombre} →
              </Link>
              <Link
                href="/gestoria/solicitar/compra-completa-reserva-escritura"
                className="inline-flex rounded-full border border-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
              >
                Contratar online
              </Link>
            </div>
            {showBarcelonaBarrios ? (
              <p className="mt-4 text-xs text-gray-500">
                Por barrio:{' '}
                <Link href="/barcelona/compra-completa/eixample" className="text-emerald-800 font-semibold hover:underline">
                  Eixample
                </Link>
                {' · '}
                <Link href="/barcelona/compra-completa/gracia" className="text-emerald-800 font-semibold hover:underline">
                  Gràcia
                </Link>
                {' · '}
                <Link href="/barcelona/compra-completa/sants" className="text-emerald-800 font-semibold hover:underline">
                  Sants
                </Link>
              </p>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  )
}
