import Link from 'next/link'

type Props = {
  servicio: 'rescision-alquiler' | 'contrato-compraventa'
}

export default function GestoriaServicioStrikeConversion({ servicio }: Props) {
  const isRescision = servicio === 'rescision-alquiler'
  return (
    <section className="border-b border-gray-100 bg-slate-50 py-8 px-4">
      <div className="mx-auto max-w-5xl text-center sm:text-left">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {isRescision ? '¿También compras o vendes piso?' : '¿Compraventa entre particulares?'}
        </h2>
        <p className="text-sm text-gray-600 mb-4 max-w-2xl">
          {isRescision
            ? 'Además de cerrar el alquiler, muchos clientes contratan venta o compra completa (687 €) o arras (145 €) con el mismo gestor.'
            : 'Para la mayoría de operaciones en España convienen las arras penitenciales. Si ya tienes comprador o vendedor, el pack 687 € incluye todo hasta escritura.'}
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
          {isRescision ? (
            <Link href="/gestoria/solicitar/contrato-alquiler" className="font-bold text-gold-800 hover:underline">
              Nuevo contrato LAU 145 €
            </Link>
          ) : (
            <Link href="/gestoria/solicitar/arras-penitenciales" className="font-bold text-gold-800 hover:underline">
              Arras penitenciales 145 €
            </Link>
          )}
          <Link href="/gestoria/venta-completa-reserva-escritura" className="font-semibold text-gold-700 hover:underline">
            Venta completa 687 €
          </Link>
          <Link href="/gestoria/compra-completa-reserva-escritura" className="font-semibold text-emerald-700 hover:underline">
            Compra completa 687 €
          </Link>
          <Link href="/gestoria/barcelona" className="font-semibold text-gray-700 hover:underline">
            Gestoría inmobiliaria Barcelona
          </Link>
        </div>
      </div>
    </section>
  )
}
