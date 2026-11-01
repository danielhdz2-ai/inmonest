import Link from 'next/link'

type Props = {
  modo: 'venta' | 'compra'
  precio: number
  solicitarHref: string
}

export default function GestoriaCompletaNacionalAboveFold({ modo, precio, solicitarHref }: Props) {
  const isVenta = modo === 'venta'
  return (
    <section className="border-b border-gold-200/50 bg-white py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-gold-300 bg-cream-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-2">
            {isVenta ? 'Vender sin comisión de agencia' : 'Comprar sin captación inmobiliaria'}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            {isVenta
              ? '¿Ya tienes comprador? Pack gestoría hasta escritura'
              : '¿Ya tienes piso y precio con un particular? Pack compra completa'}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
            <strong>{precio} € IVA incluido</strong> en toda España: gestor dedicado en 24 h, contratos, checklist
            documental, due diligence {isVenta ? 'para vendedor' : 'para comprador'} y coordinación con banco y
            notaría. <strong>0 % sobre el precio del inmueble</strong> — no somos agencia.
          </p>
          <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc pl-5">
            <li>Arras o reserva redactadas o corregidas por gestor</li>
            <li>Panel de cliente y WhatsApp con Daniel</li>
            <li>Online o cita en Barcelona (Les Corts) si lo necesitas</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href={solicitarHref}
              className="inline-flex rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-gray-900 hover:bg-gold-400"
            >
              Contratar — {precio} €
            </Link>
            <Link
              href={isVenta ? '/gestoria/compra-completa-reserva-escritura' : '/gestoria/venta-completa-reserva-escritura'}
              className="inline-flex rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold hover:border-gold-400"
            >
              Ver {isVenta ? 'compra' : 'venta'} completa
            </Link>
            <Link
              href="/gestoria/barcelona"
              className="inline-flex rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold hover:border-gold-400"
            >
              Gestoría inmobiliaria Barcelona
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
