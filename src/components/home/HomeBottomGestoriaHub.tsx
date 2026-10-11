import Link from 'next/link'
import {
  Building2,
  Gift,
  LineChart,
  Scale,
  FileText,
  Shield,
  BadgeCheck,
} from '@/components/ui/Icons'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const MODULES = [
  {
    icon: Building2,
    title: 'Alquiler',
    desc: 'LAU, temporada, habitación y locales. Cláusulas al día y entrega en 48 h.',
    price: precioLabel('contrato-alquiler'),
    href: '/gestoria/contrato-alquiler',
    cta: 'Ver alquiler LAU',
  },
  {
    icon: Gift,
    title: 'Arras y reserva',
    desc: 'Penitenciales, confirmatorias y acompañamiento antes de firmar la compraventa.',
    price: precioLabel('arras-penitenciales'),
    href: '/gestoria/arras-penitenciales',
    cta: 'Ver contrato de arras',
  },
  {
    icon: LineChart,
    title: 'Compra y venta',
    desc: 'Packs desde señal hasta escritura: due diligence, notaría y documentación vendedor.',
    price: `Desde ${precioLabel('compra-completa-reserva-escritura')}`,
    href: '/gestoria/compra-completa-reserva-escritura',
    cta: 'Ver packs compraventa',
  },
  {
    icon: Scale,
    title: 'Revisiones legales',
    desc: 'Revisión de borradores de alquiler o arras antes de pagar señal o firmar.',
    price: precioLabel('revision-correccion-arras'),
    href: '/gestoria/revision-correccion-arras',
    cta: 'Ver revisiones',
  },
] as const

const PLATFORM = [
  { icon: BadgeCheck, label: 'Gestor experto asignado' },
  { icon: FileText, label: 'Panel de cliente online' },
  { icon: Shield, label: 'Firma electrónica FIRMACERT' },
] as const

const STEPS = [
  { n: '1', title: 'Eliges módulo', desc: 'Catálogo con precio cerrado y qué incluye cada servicio.' },
  { n: '2', title: 'Pagas y subes datos', desc: 'Stripe seguro. Documentación desde el panel o por email.' },
  { n: '3', title: 'Recibes tu contrato', desc: 'PDF personalizado y una ronda de cambios incluida.' },
] as const

/** Bloque bajo el CTA final: módulos de gestoría + cómo es la plataforma. */
export default function HomeBottomGestoriaHub() {
  return (
    <section className="bg-cream-100 border-t border-gold-300/25 py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-800 mb-2">Catálogo modular</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Elige el módulo que necesitas
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            Misma plataforma para todos los servicios: un gestor, un panel y plazos claros. Sin comisiones por
            operación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {MODULES.map(({ icon: Icon, title, desc, price, href, cta }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm p-5 hover:border-gold-400/40 hover:shadow-md transition-all"
            >
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-800 mb-4">
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{desc}</p>
              <p className="mt-3 text-sm font-semibold text-gold-800">{price}</p>
              <Link
                href={href}
                className="mt-4 text-sm font-semibold text-gray-900 hover:text-gold-800 inline-flex items-center gap-1"
              >
                {cta}
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="lg:max-w-xs shrink-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700 mb-2">La plataforma</p>
              <h3 className="text-xl font-extrabold text-gray-900">Cómo trabajamos contigo</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                No es solo un PDF: acompañamiento humano y trazabilidad en tu expediente digital.
              </p>
              <ul className="mt-5 space-y-2.5">
                {PLATFORM.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Icon className="w-4 h-4 text-gold-600 shrink-0" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <ol className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {STEPS.map(({ n, title, desc }) => (
                <li key={n} className="relative sm:pl-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-gold-300 text-sm font-bold mb-3">
                    {n}
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{title}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-snug">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
            <Link href="/gestoria/solicitar" className="font-semibold text-gold-800 hover:text-gold-950 underline-offset-2 hover:underline">
              Contratar online ahora
            </Link>
            {' · '}
            <Link href="/servicios" className="hover:text-gray-900 underline-offset-2 hover:underline">
              Comparar todos los servicios
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
