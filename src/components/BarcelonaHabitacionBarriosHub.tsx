import Link from 'next/link'
import { listBarcelonaHabitacionBarrios } from '@/lib/barcelona-alquiler-habitacion-barrios'

/** Enlaces desde landing Barcelona habitación hacia barrios SEO. */
export default function BarcelonaHabitacionBarriosHub() {
  const barrios = listBarcelonaHabitacionBarrios()

  return (
    <section className="bg-cream-50 border border-gold-200 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Contrato habitación por barrio en Barcelona</h2>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        Pisos compartidos y coliving con contenido local: mercado, convivencia y Código Civil (no LAU de piso entero).
      </p>
      <div className="flex flex-wrap gap-2">
        {barrios.map((b) => (
          <Link
            key={b.slug}
            href={`/barcelona/contrato-alquiler-habitacion/${b.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gold-200 text-sm font-medium text-gold-800 hover:bg-cream-100 transition-colors"
          >
            {b.nombre} →
          </Link>
        ))}
      </div>
    </section>
  )
}
