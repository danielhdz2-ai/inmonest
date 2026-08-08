import Image from 'next/image'
import Link from 'next/link'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'

type ClausulaMock = {
  titulo: string
  estado: string
  nota: string
}

type TimelineStep = {
  label: string
  fecha: string
  done: boolean
  active?: boolean
}

type GestoriaPanelShowcaseProps = {
  /** Ej: "contrato de alquiler", "due diligence pre-compra" */
  servicioLabel?: string
  /** Ciudad mostrada en el mock del panel (ej. Zaragoza) */
  ciudadNombre?: string
  /** Título del servicio en el mock del portal */
  panelServicio?: string
  clausulas?: readonly ClausulaMock[]
  timeline?: readonly TimelineStep[]
  className?: string
}

const MOCK_CLIENT = {
  nombre: 'María López',
  ciudad: 'Madrid',
  servicio: 'Contrato de alquiler LAU',
  referencia: 'INV-2026-0847',
  progreso: 65,
  paso: 'En elaboración',
  docs: '3/5',
}

const MOCK_CLAUSULAS = [
  {
    titulo: 'Fianza y garantías',
    estado: 'Revisada',
    nota: 'Depósito legal conforme a LAU. Sin cláusulas abusivas detectadas.',
  },
  {
    titulo: 'Duración y prórroga',
    estado: 'Asesorada',
    nota: 'Plazo de 5 años con prórroga automática explicada al cliente.',
  },
  {
    titulo: 'Gastos de comunidad',
    estado: 'Ajustada',
    nota: 'Reparto ITE y derramas acordado por escrito entre las partes.',
  },
] as const

const MOCK_TIMELINE: TimelineStep[] = [
  { label: 'Pago confirmado', fecha: '12 mar 2026', done: true },
  { label: 'Documentación recibida', fecha: '13 mar 2026', done: true },
  { label: 'Redacción del contrato', fecha: 'En curso', done: false, active: true },
  { label: 'Entrega PDF firmable', fecha: 'Estimado 15 mar', done: false },
]

export const PRESTAMO_PANEL_CLAUSULAS: ClausulaMock[] = [
  {
    titulo: 'Importe y calendario de devolución',
    estado: 'Revisada',
    nota: 'Capital, cuotas y forma de entrega documentados conforme al Código Civil.',
  },
  {
    titulo: 'Intereses y Modelo 600',
    estado: 'Asesorada',
    nota: 'Tipo 0 % o remuneratorio pactado. Orientación fiscal para evitar donación encubierta.',
  },
  {
    titulo: 'Impago y vencimiento anticipado',
    estado: 'Ajustada',
    nota: 'Cláusulas de demora y reclamación judicial explicadas al cliente.',
  },
]

export const PRESTAMO_PANEL_TIMELINE: TimelineStep[] = [
  { label: 'Pago confirmado', fecha: '12 mar 2026', done: true },
  { label: 'Datos prestamista y prestatario', fecha: '13 mar 2026', done: true },
  { label: 'Redacción del contrato', fecha: 'En curso', done: false, active: true },
  { label: 'Entrega PDF + nota fiscal', fecha: 'Estimado 15 mar', done: false },
]

function CheckMark({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MockPortalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[10px] text-gray-400 font-mono truncate">
          inmonest.com/mi-cuenta/contratos
        </span>
      </div>
      {children}
    </div>
  )
}

export default function GestoriaPanelShowcase({
  servicioLabel = 'tu operación inmobiliaria',
  ciudadNombre = 'Madrid',
  panelServicio = 'Contrato de alquiler LAU',
  clausulas = MOCK_CLAUSULAS,
  timeline = MOCK_TIMELINE,
  className = '',
}: GestoriaPanelShowcaseProps) {
  return (
    <section className={`py-16 px-4 bg-cream-50 border-y border-gold-300/30 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">
              Panel de cliente
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
              Así funciona tu gestoría: seguimiento real y gestor especializado
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Tras contratar, accedes a tu área privada. Un gestor inmobiliario se asigna a{' '}
              {servicioLabel} y te acompaña en cada fase: documentación, redacción, revisión de
              cláusulas críticas y entrega del contrato.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Gestor asignado en menos de 24 horas con teléfono directo',
                'Timeline del expediente: pagos, documentos, redacción y entrega',
                'Asesoramiento en cláusulas clave antes de firmar',
                'Contrato PDF personalizado, no plantilla genérica',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckMark className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/gestoria/acceso-cliente"
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              Ver acceso al panel de gestoría
            </Link>
          </div>

          <div className="space-y-4">
            <MockPortalFrame>
              <div className="relative bg-black p-5 sm:p-6 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(201,150,42,0.2),transparent_55%)]" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">
                    Portal cliente · Gestoría
                  </p>
                  <p className="text-lg font-bold">Hola, {MOCK_CLIENT.nombre.split(' ')[0]}</p>
                  <p className="text-white/55 text-xs mt-1">{panelServicio}</p>
                  <p className="text-white/40 text-[10px] mt-0.5 font-mono">{MOCK_CLIENT.referencia}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                      <p className="text-[9px] uppercase tracking-wider text-white/45">Progreso</p>
                      <p className="text-xl font-extrabold text-gold-400">{MOCK_CLIENT.progreso}%</p>
                    </div>
                    <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                      <p className="text-[9px] uppercase tracking-wider text-white/45">Documentos</p>
                      <p className="text-xl font-extrabold text-white">{MOCK_CLIENT.docs}</p>
                    </div>
                    <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                      <p className="text-[9px] uppercase tracking-wider text-white/45">Estado</p>
                      <p className="text-[11px] font-semibold text-white leading-tight mt-1">
                        {MOCK_CLIENT.paso}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-3">
                  Tu gestor asignado
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden ring-2 ring-gold-300/50 shrink-0">
                    <Image
                      src={GESTOR_DANIEL_HERNANDEZ.foto}
                      alt={GESTOR_DANIEL_HERNANDEZ.nombre}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{GESTOR_DANIEL_HERNANDEZ.nombre}</p>
                    <p className="text-xs text-gray-500">{GESTOR_DANIEL_HERNANDEZ.rol}</p>
                    <p className="text-xs text-gold-700 mt-1">
                      Asesora en cláusulas de {ciudadNombre}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-b border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Expediente
                </p>
                <div className="space-y-2">
                  {timeline.map((step) => (
                    <div
                      key={step.label}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs ${
                        step.active
                          ? 'bg-gold-500/10 border border-gold-300/40'
                          : 'bg-gray-50'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          step.done
                            ? 'bg-gold-500 text-white'
                            : step.active
                              ? 'bg-gold-500/20 text-gold-700 ring-2 ring-gold-400'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step.done ? (
                          <CheckMark className="w-3.5 h-3.5" />
                        ) : step.active ? (
                          <span className="block h-1.5 w-1.5 rounded-full bg-gold-600 animate-pulse" />
                        ) : (
                          <span className="block h-1.5 w-1.5 rounded-full bg-gray-400" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{step.label}</p>
                        <p className="text-gray-500">{step.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Cláusulas revisadas por tu gestor
                </p>
                <div className="space-y-2">
                  {clausulas.map((c) => (
                    <div
                      key={c.titulo}
                      className="rounded-lg border border-gray-100 bg-gray-50/80 p-3"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-gray-900">{c.titulo}</p>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded-full">
                          {c.estado}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">{c.nota}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MockPortalFrame>

            <p className="text-center text-[11px] text-gray-400">
              Vista de ejemplo con datos ficticios. Tu panel real se activa al contratar el servicio.
            </p>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            {
              src: '/familia3.jpg',
              alt: 'Familia en proceso de compraventa',
              titulo: 'Gestor dedicado',
              desc: 'Un profesional conoce tu caso y responde por teléfono o WhatsApp.',
            },
            {
              src: '/gestoria7.jpg',
              alt: 'Entrega de contrato inmobiliario',
              titulo: 'Contrato personalizado',
              desc: 'PDF adaptado a tu operación, con cláusulas revisadas una a una.',
            },
            {
              src: '/gestora6.jpg',
              alt: 'Equipo de gestoría revisando documentación',
              titulo: 'Proceso transparente',
              desc: 'Cada hito visible en tu panel: pago, docs, redacción y entrega.',
            },
          ].map((item) => (
            <div
              key={item.titulo}
              className="group relative overflow-hidden rounded-2xl bg-black min-h-[200px] shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-bold text-white text-sm">{item.titulo}</p>
                <p className="text-white/70 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
