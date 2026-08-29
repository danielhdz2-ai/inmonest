import { AGENCIAS_AUDIENCIAS } from '@/lib/agencias-gestoria-trust'

export default function AgenciasAudienciasSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Para APIs, autónomos y empresas inmobiliarias
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
            Gestoría B2B con tarifa profesional, panel de seguimiento y firma electrónica certificada.
            Elige pack anual o contrato suelto sin compromiso.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {AGENCIAS_AUDIENCIAS.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 hover:border-gold-200 hover:bg-[#fdfbf5] transition-colors"
            >
              <span className="text-3xl mb-3 block">{a.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{a.titulo}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
