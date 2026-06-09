type CiudadHubVentajasOnlineProps = {
  ciudad: string
}

const VENTAJAS = [
  {
    id: 'ahorro',
    titulo: 'Ahorra hasta el 60%',
    desc: 'Sin comisiones de agencia (3-5% del precio). Gestoría fija desde 687€ frente a miles de euros en honorarios de inmobiliaria tradicional.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    id: 'rapidez',
    titulo: 'Rapidez garantizada',
    desc: 'Sin citas ni esperas. Recibes tu contrato en 48h por email. Servicio express en 24h disponible.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    id: 'online',
    titulo: 'Sin moverte de casa',
    desc: 'Todo online: solicitud, pago, asesoría y entrega. Gestoría 100% digital adaptada a tu ciudad.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
] as const

export default function CiudadHubVentajasOnline({ ciudad }: CiudadHubVentajasOnlineProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
        ¿Por qué elegir una gestoría <span className="text-[#c9962a]">online</span> en {ciudad}?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {VENTAJAS.map((v) => (
          <div key={v.id} className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#c9962a]/10 text-[#a87a20] flex items-center justify-center border border-[#c9962a]/20">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{v.titulo}</h3>
            <p className="text-gray-600 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
