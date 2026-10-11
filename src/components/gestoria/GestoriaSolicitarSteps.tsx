const STEPS = [
  { n: '1', title: 'Completa el formulario', desc: 'Datos de la operación y pago seguro con Stripe.' },
  { n: '2', title: 'Gestor te contacta', desc: 'En menos de 24 h revisamos tu caso y pedimos documentación si hace falta.' },
  { n: '3', title: 'Contrato en tu panel', desc: 'PDF personalizado en 48 h y acceso a mi-cuenta/contratos.' },
] as const

export default function GestoriaSolicitarSteps() {
  return (
    <div className="mb-8 rounded-2xl border border-gold-300/40 bg-cream-50 px-5 py-5 sm:px-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gold-700 mb-4">
        Cómo funciona
      </p>
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STEPS.map(({ n, title, desc }) => (
          <li key={n} className="flex gap-3 sm:flex-col sm:gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-gold-300 text-sm font-bold">
              {n}
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
