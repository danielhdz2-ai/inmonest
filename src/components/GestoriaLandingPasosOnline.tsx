const PASOS = [
  {
    n: '1',
    titulo: 'Cuéntanos tu caso',
    desc: 'WhatsApp, llamada o formulario. Sin compromiso.',
  },
  {
    n: '2',
    titulo: 'Revisión y redacción',
    desc: 'Tu gestor analiza la operación y prepara el servicio (habitualmente 48 h).',
  },
  {
    n: '3',
    titulo: 'Entrega y firma',
    desc: 'PDF listo, panel online y acompañamiento hasta notaría si aplica.',
  },
] as const

export default function GestoriaLandingPasosOnline() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-8 sm:px-8" aria-labelledby="pasos-gestoria-titulo">
      <h2 id="pasos-gestoria-titulo" className="text-lg font-bold text-gray-900 mb-6 text-center">
        Cómo trabajamos (online)
      </h2>
      <ol className="grid sm:grid-cols-3 gap-6">
        {PASOS.map((paso) => (
          <li key={paso.n} className="text-center sm:text-left">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 font-bold text-sm mb-3">
              {paso.n}
            </span>
            <p className="font-semibold text-gray-900 text-sm mb-1">{paso.titulo}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{paso.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
