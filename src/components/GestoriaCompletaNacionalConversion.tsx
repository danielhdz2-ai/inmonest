import Link from 'next/link'

type Props = {
  modo: 'venta' | 'compra'
}

const PRECO = 687

export default function GestoriaCompletaNacionalConversion({ modo }: Props) {
  const isVenta = modo === 'venta'
  const servicio = isVenta ? 'venta-completa-reserva-escritura' : 'compra-completa-reserva-escritura'
  const solicitar = `/gestoria/solicitar/${servicio}`

  return (
    <>
      <section className="py-14 px-4 bg-cream-50 border-t border-gold-200/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {isVenta ? 'Vender' : 'Comprar'} piso entre particulares sin pagar comisión de agencia
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-2xl mx-auto">
            Tarifa plana {PRECO} € IVA incluido en toda España. Gestor asignado en 24 h, panel de cliente y
            coordinación con notaría. Ideal si buscas «{isVenta ? 'vender piso sin comisiones' : 'comprar con gestoría'}»
            con garantías profesionales.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={solicitar}
              className="inline-flex rounded-full bg-gold-500 px-8 py-3 text-sm font-bold text-gray-900 hover:bg-gold-400"
            >
              Contratar {isVenta ? 'venta' : 'compra'} completa — {PRECO}€
            </Link>
            <Link
              href={
                isVenta
                  ? '/gestoria/venta-completa-reserva-escritura/barcelona'
                  : '/gestoria/compra-completa-reserva-escritura/barcelona'
              }
              className="inline-flex rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gold-400"
            >
              Hub Barcelona
            </Link>
            <Link
              href={
                isVenta
                  ? '/gestoria/compra-completa-reserva-escritura/barcelona'
                  : '/gestoria/venta-completa-reserva-escritura/barcelona'
              }
              className="inline-flex rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gold-400"
            >
              {isVenta ? 'Compra Barcelona' : 'Venta Barcelona'}
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-500">
            También en{' '}
            <Link href="/gestoria/venta-completa-reserva-escritura/madrid" className="text-gold-700 hover:underline">
              Madrid
            </Link>
            ,{' '}
            <Link href="/gestoria/compra-completa-reserva-escritura/madrid" className="text-gold-700 hover:underline">
              compra Madrid
            </Link>
            ,{' '}
            <Link href="/gestoria/venta-completa-reserva-escritura/valencia" className="text-gold-700 hover:underline">
              Valencia
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
