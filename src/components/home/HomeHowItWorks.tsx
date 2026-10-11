import Link from 'next/link'
import { FileText, Phone, CheckCircle } from '@/components/ui/Icons'

const STEPS = [
  {
    icon: FileText,
    title: 'Solicitas online',
    desc: 'Elige servicio, datos básicos y pago seguro con Stripe. Desde 61 €, precio cerrado.',
  },
  {
    icon: Phone,
    title: 'Gestor te contacta',
    desc: 'En menos de 24 h un gestor experto revisa tu caso y aclara dudas por teléfono o email.',
  },
  {
    icon: CheckCircle,
    title: 'Entrega en 48 h',
    desc: 'PDF personalizado en tu panel de cliente, con una ronda de cambios incluida.',
  },
] as const

export default function HomeHowItWorks() {
  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700 mb-2">Proceso</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Cómo funciona Inmonest
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            Gestoría inmobiliaria 100 % online: sin desplazamientos y con trazabilidad en tu panel.
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative text-center md:text-left px-2">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gold-500/15 text-gold-700 mb-4">
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Paso {i + 1}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center text-sm text-gray-600">
          <Link
            href="/gestoria/solicitar"
            className="font-semibold text-gold-800 hover:text-gold-950 underline underline-offset-2"
          >
            Ver catálogo y contratar
          </Link>
          {' · '}
          <Link href="/servicios" className="text-gray-700 hover:text-gray-900 underline underline-offset-2">
            Qué incluye cada servicio
          </Link>
        </p>
      </div>
    </section>
  )
}
