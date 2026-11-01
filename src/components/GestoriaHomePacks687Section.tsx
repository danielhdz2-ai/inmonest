import Link from 'next/link'
import { PISOS_SIN_COMISION_CIUDADES } from '@/lib/pisos-sin-comision-ciudad'

const PRECO = 687

const CIUDADES_TOP = [
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'bilbao', nombre: 'Bilbao' },
] as const

const sinComisionSet = new Set<string>(PISOS_SIN_COMISION_CIUDADES)

export default function GestoriaHomePacks687Section() {
  return (
    <section className="border-b border-gold-200/60 bg-gradient-to-b from-cream-50 to-white py-12 px-4">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-2">Sin comisión de agencia</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Vender o comprar piso entre particulares — {PRECO} € hasta escritura
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Ya tienes comprador o vendedor. Un gestor inmobiliario real redacta contratos, revisa documentación y coordina
          con notaría. <strong>0 % sobre el precio del inmueble</strong> — no captamos ni vendemos tu piso.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link
            href="/gestoria/solicitar/venta-completa-reserva-escritura"
            className="inline-flex rounded-full bg-gold-500 px-7 py-3 text-sm font-bold text-gray-900 hover:bg-gold-400"
          >
            Contratar venta completa
          </Link>
          <Link
            href="/gestoria/solicitar/compra-completa-reserva-escritura"
            className="inline-flex rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white hover:bg-emerald-500"
          >
            Contratar compra completa
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-left max-w-3xl mx-auto">
          {CIUDADES_TOP.map(({ slug, nombre }) => (
            <div
              key={slug}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm flex flex-wrap gap-x-3 gap-y-1"
            >
              <span className="font-semibold text-gray-900 w-full sm:w-auto">{nombre}</span>
              <Link href={`/gestoria/venta-completa-reserva-escritura/${slug}`} className="text-gold-700 hover:underline">
                Venta
              </Link>
              <Link
                href={`/gestoria/compra-completa-reserva-escritura/${slug}`}
                className="text-emerald-700 hover:underline"
              >
                Compra
              </Link>
              {sinComisionSet.has(slug) ? (
                <Link href={`/${slug}/pisos-particulares-sin-comision`} className="text-gray-600 hover:underline">
                  Sin comisión
                </Link>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-500">
          <Link href="/gestoria/venta-completa-reserva-escritura" className="text-gold-700 hover:underline">
            Venta completa España
          </Link>
          {' · '}
          <Link href="/gestoria/compra-completa-reserva-escritura" className="text-gold-700 hover:underline">
            Compra completa España
          </Link>
          {' · '}
          <Link href="/gestoria/barcelona" className="text-gold-700 hover:underline">
            Gestoría inmobiliaria Barcelona
          </Link>
        </p>
      </div>
    </section>
  )
}
