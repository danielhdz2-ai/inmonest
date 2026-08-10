import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'
import {
  getBeneficiosServicio,
  getBlindajeContent,
} from '@/lib/gestoria-servicio-contexto'

type Props = {
  servicioSlug: string
}

export default function GestoriaBlindajeOperacion({ servicioSlug }: Props) {
  const blindaje = getBlindajeContent(servicioSlug)
  const beneficios = getBeneficiosServicio(servicioSlug)

  return (
    <div className="space-y-10">
      {/* Blindaje principal */}
      <section className="rounded-3xl bg-gradient-to-br from-black via-black to-[#1a1510] text-white p-8 sm:p-10 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">
          {blindaje.eyebrow}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug max-w-3xl">
          {blindaje.titulo}
        </h2>
        <p className="text-white/75 leading-relaxed max-w-3xl mb-8 text-[1.05rem]">
          {blindaje.intro}
        </p>

        {blindaje.partes && blindaje.partes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {blindaje.partes.map((parte) => (
              <div
                key={parte.rol}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-1">
                  {parte.rol}
                </p>
                <h3 className="text-lg font-bold mb-4">{parte.titulo}</h3>
                <ul className="space-y-2.5">
                  {parte.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                      <GestoriaCheckIcon className="mt-0.5 shrink-0 text-gold-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-4">
            Garantías Inmonest
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {blindaje.garantias.map((g) => (
              <div key={g} className="flex items-start gap-2.5 text-sm text-white/85">
                <GestoriaCheckIcon className="mt-0.5 shrink-0 text-gold-400" />
                {g}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
          Por qué contratar con Inmonest
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Más contexto, más seguridad para tu operación
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              className="rounded-2xl border border-gold-200/60 bg-cream-50 p-5"
            >
              <h3 className="font-bold text-gray-900 mb-2">{b.titulo}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
