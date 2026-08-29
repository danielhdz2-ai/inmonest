import Image from 'next/image'
import { AGENCIAS_CONFIAN } from '@/lib/agencias-gestoria-trust'

export default function AgenciasConfianSection() {
  return (
    <section className="py-14 px-4 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-8">
          Agencias que confían en Inmonest Gestoría
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
          {AGENCIAS_CONFIAN.map((agencia) => (
            <div
              key={agencia.id}
              className="flex flex-col items-center justify-center min-w-[120px] max-w-[160px] opacity-80 hover:opacity-100 transition-opacity"
            >
              {agencia.logo ? (
                <Image
                  src={agencia.logo}
                  alt={agencia.logoAlt ?? agencia.nombre}
                  width={140}
                  height={48}
                  className="h-10 sm:h-12 w-auto max-w-[140px] object-contain"
                />
              ) : (
                <span
                  className={`text-lg sm:text-xl text-gray-700 ${agencia.textClass ?? 'font-bold'}`}
                >
                  {agencia.textLogo}
                </span>
              )}
              {agencia.subtitulo && (
                <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider text-center">
                  {agencia.subtitulo}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
