import Link from 'next/link'

/** CTA editorial al final de posts arras/compraventa → packs 687 € */
export default function GestoriaBlogCompraVenta687Cta() {
  return (
    <div className="mt-10 rounded-xl border-2 border-gold-300 bg-cream-50 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">¿Ya tienes piso y precio con un particular?</h3>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        Pack <strong>687 € IVA incluido</strong>: gestor dedicado, arras profesionales, revisión documental y
        coordinación con notaría. Sin comisión del 3–5 % de agencia.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          href="/gestoria/compra-completa-reserva-escritura"
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-emerald-500"
        >
          Compra completa hasta escritura
        </Link>
        <Link
          href="/gestoria/venta-completa-reserva-escritura"
          className="rounded-lg bg-gold-500 px-5 py-2.5 text-center text-sm font-bold text-gray-900 hover:bg-gold-400"
        >
          Venta completa hasta escritura
        </Link>
        <Link
          href="/gestoria/compra-completa-reserva-escritura/barcelona"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-semibold text-gray-800 hover:border-gold-400"
        >
          Compra Barcelona
        </Link>
      </div>
    </div>
  )
}
