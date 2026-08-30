import type { AgenciaGestoriaCiudadConfig } from '@/lib/agencias-gestoria-ciudades'

type Props = {
  ciudad: AgenciaGestoriaCiudadConfig
}

export default function AgenciasGestoriaMercadoLocal({ ciudad }: Props) {
  const hasLocalExtra =
    (ciudad.zonasDetalle && ciudad.zonasDetalle.length > 0) ||
    (ciudad.perfilesLocales && ciudad.perfilesLocales.length > 0) ||
    ciudad.ayudaLocal

  return (
    <section className="py-16 px-4 bg-[#fdfbf5] border-y border-gold-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
              Mercado inmobiliario · {ciudad.region}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ciudad.mercadoLocalTitle}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{ciudad.mercadoLocal}</p>
            <div className="rounded-xl bg-white border border-gold-200 p-4 mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
                Desafío local
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{ciudad.desafioLocal}</p>
            </div>
            <p className="text-sm text-gray-700">
              <strong>Operativa habitual:</strong> {ciudad.operativaTipica}
            </p>
          </div>
          <div className="rounded-2xl border border-gold-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">
              Perfil de agencia en {ciudad.nombre}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-5">{ciudad.perfilAgencia}</p>
            {ciudad.zonasDetalle && ciudad.zonasDetalle.length > 0 ? (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">
                  Zonas y operativa en {ciudad.nombre}
                </p>
                <ul className="space-y-3 mb-5">
                  {ciudad.zonasDetalle.map((zona) => (
                    <li key={zona.nombre} className="text-sm">
                      <span className="font-semibold text-gray-900">{zona.nombre}</span>
                      <span className="text-gray-600"> — {zona.contexto}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">
                  Zonas donde operan nuestras agencias
                </p>
                <div className="flex flex-wrap gap-2">
                  {ciudad.zonas.map((zona) => (
                    <span
                      key={zona}
                      className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700"
                    >
                      {zona}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {ciudad.perfilesLocales && ciudad.perfilesLocales.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2 text-center">
              A quién ayudamos en {ciudad.nombre}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Agencias, autónomos, APIs y particulares con operativa local
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {ciudad.perfilesLocales.map((perfil) => (
                <article
                  key={perfil.titulo}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gold-600 mb-2">
                    {perfil.tipo}
                  </p>
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{perfil.titulo}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{perfil.desc}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {ciudad.ayudaLocal && (
          <div className="mb-12 rounded-2xl border border-gold-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
              Soporte B2B · {ciudad.nombre}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{ciudad.ayudaLocal.titulo}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{ciudad.ayudaLocal.intro}</p>
            <ul className="grid sm:grid-cols-3 gap-4">
              {ciudad.ayudaLocal.items.map((item) => (
                <li key={item.titulo} className="rounded-xl bg-[#fdfbf5] border border-gold-100 p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{item.titulo}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3 text-center">
            Contratos más demandados en {ciudad.nombre}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {ciudad.contratosDestacados.map((c) => (
              <article
                key={c.nombre}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-gold-600 mb-2">
                  {c.pct}
                </p>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{c.nombre}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {!hasLocalExtra && (
          <p className="mt-8 text-center text-xs text-gray-500">
            Operamos en {ciudad.zonas.join(', ')} y municipios del área metropolitana.
          </p>
        )}
      </div>
    </section>
  )
}
