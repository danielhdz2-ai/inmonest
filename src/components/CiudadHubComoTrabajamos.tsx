const PASOS = [
  {
    title: 'Solicita una primera llamada con nuestro experto',
    desc: 'Cuéntanos tu caso. Coordinamos una llamada inicial con tu asesor asignado para analizar el caso en detalle.',
  },
  {
    title: 'Solicitas el servicio',
    desc: 'Contratas online de forma segura y nos envías los detalles de tu operación.',
  },
  {
    title: 'Análisis completo',
    desc: 'Tu gestor revisa toda la documentación, identifica riesgos y te informa de cada detalle.',
  },
  {
    title: 'Te acompañamos hasta el final, siempre,',
    desc: 'Estamos contigo en cada consulta o paso: negociaciones, firma de arras y coordinación hasta escritura.',
  },
] as const

type CiudadHubComoTrabajamosProps = {
  ciudad: string
}

export default function CiudadHubComoTrabajamos({ ciudad }: CiudadHubComoTrabajamosProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Cómo trabajamos en {ciudad}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PASOS.map((paso, i) => (
            <div key={paso.title} className="text-center">
              <div className="w-16 h-16 bg-gold-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{paso.title}</h3>
              <p className="text-gray-600">{paso.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
