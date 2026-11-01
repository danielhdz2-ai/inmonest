import Link from 'next/link'

/** GSC: /gestoria/contrato-alquiler ~80 imp., pos ~6,7, 0 clics */
export default function GestoriaContratoAlquilerStrikeConversion() {
  return (
    <section className="border-b border-gold-200/40 bg-cream-50 py-8 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Contrato LAU desde 145 € — entrega 48 h</h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Redactado por gestoría especializada. Ley de Vivienda 2026, fianza legal y PDF firmable. Sin plantillas
              genéricas.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm shrink-0">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="inline-flex rounded-full bg-gold-500 px-5 py-2.5 font-bold text-gray-900 hover:bg-gold-400"
            >
              Contratar LAU
            </Link>
            <Link href="/gestoria/cuanto-cuesta-contrato-alquiler" className="inline-flex rounded-full border border-gray-300 px-4 py-2.5 font-semibold hover:border-gold-400">
              Ver precios
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          <Link href="/gestoria/barcelona" className="text-gold-700 hover:underline">
            Gestoría inmobiliaria Barcelona
          </Link>
          {' · '}
          <Link href="/gestoria/rescision-alquiler" className="text-gold-700 hover:underline">
            Rescisión alquiler
          </Link>
          {' · '}
          <Link href="/gestoria/arras-penitenciales" className="text-gold-700 hover:underline">
            Arras penitenciales
          </Link>
        </p>
      </div>
    </section>
  )
}
