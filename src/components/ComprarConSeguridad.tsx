import Link from 'next/link'
import {
  getAsesoriaCompraHref,
  getDueDiligenceHref,
  hasAsesoriaCompraCiudad,
  hasDueDiligenceCiudad,
} from '@/lib/gestoria-compra-cross-sell'

type ComprarConSeguridadProps = {
  ciudad: string
  ciudadSlug: string
}

export default function ComprarConSeguridad({ ciudad, ciudadSlug }: ComprarConSeguridadProps) {
  const dueDiligenceHref = getDueDiligenceHref(ciudadSlug)
  const asesoriaHref = getAsesoriaCompraHref(ciudadSlug)
  const tieneDueDiligence = hasDueDiligenceCiudad(ciudadSlug)
  const tieneAsesoria = hasAsesoriaCompraCiudad(ciudadSlug)

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-forest-800 to-forest-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
            Comprar con seguridad
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Vas a comprar piso de particular en {ciudad}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Sin agencia no tienes quien revise la operación por ti. Estos dos servicios te protegen
            antes y durante la compra.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col">
            <p className="text-sm text-gold-300 font-semibold mb-1">Post-arras · Revisión documental</p>
            <h3 className="text-xl font-bold mb-2">Due Diligence Pre-Compra</h3>
            <p className="text-white/75 text-sm mb-4 flex-1">
              Revisamos nota simple, cargas, deudas de comunidad, cédula e informes técnicos antes de
              escriturar.
            </p>
            <p className="text-2xl font-bold text-gold-300 mb-4">
              350€ <span className="text-sm font-normal text-white/60">IVA incl.</span>
            </p>
            <Link
              href={dueDiligenceHref}
              className="inline-flex justify-center px-6 py-3 rounded-lg bg-gold-500 text-[#1a2f1c] font-semibold hover:bg-[#f4c94a] transition-colors"
            >
              {tieneDueDiligence ? `Ver en ${ciudad} →` : 'Ver Due Diligence →'}
            </Link>
          </div>

          <div className="bg-white/10 border border-gold-500/40 rounded-2xl p-6 flex flex-col ring-1 ring-[#c9962a]/30">
            <p className="text-sm text-gold-300 font-semibold mb-1">Reserva hasta escritura</p>
            <h3 className="text-xl font-bold mb-2">Asesoría Compra de Piso</h3>
            <p className="text-white/75 text-sm mb-4 flex-1">
              Gestor asignado desde la reserva hasta notaría. Sin comisión del 3-5% de una agencia.
            </p>
            <p className="text-2xl font-bold text-gold-300 mb-4">
              687€ <span className="text-sm font-normal text-white/60">IVA incl.</span>
            </p>
            <Link
              href={asesoriaHref}
              className="inline-flex justify-center px-6 py-3 rounded-lg bg-white text-[#1a2f1c] font-semibold hover:bg-gray-100 transition-colors"
            >
              {tieneAsesoria ? `Ver asesoría en ${ciudad} →` : 'Ver asesoría compra →'}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <a href="tel:+34745022862" className="text-white/80 hover:text-gold-300 transition-colors">
            745 022 862
          </a>
          <Link
            href="/gestoria/solicitar/compra-completa-reserva-escritura"
            className="text-gold-300 hover:underline font-medium"
          >
            Solicitar online →
          </Link>
        </div>
      </div>
    </section>
  )
}
