'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'

type DemoSection = 'inicio' | 'expediente' | 'documentos' | 'contratos'

const DEMO_NAV: { id: DemoSection; label: string; icon: string; desc: string }[] = [
  { id: 'inicio', label: 'Panel', icon: '◉', desc: 'Resumen y próximos pasos' },
  { id: 'expediente', label: 'Expediente', icon: '📋', desc: 'Timeline y actividad' },
  { id: 'documentos', label: 'Documentos', icon: '🗂️', desc: 'Checklist por rol' },
  { id: 'contratos', label: 'Contratos', icon: '📄', desc: 'Pedidos y descargas PDF' },
]

const MOCK = {
  agencia: 'Agencia Sol Mar',
  usuario: 'Carlos Ruiz',
  ciudad: 'Valencia',
  servicio: 'Contrato de alquiler LAU',
  referencia: 'REF. A1B2C3D4',
  importe: 110,
  pasoActual: 2,
  progreso: 45,
  plazo: '4–5 h laborables',
}

const WORKFLOW = [
  { n: 1, label: 'Pago recibido', icon: '💳', done: true, date: '27 ago' },
  { n: 2, label: 'Documentación', icon: '📋', done: false, active: true, date: 'En curso' },
  { n: 3, label: 'En elaboración', icon: '⚙️', done: false, date: '—' },
  { n: 4, label: 'Entregado', icon: '✅', done: false, date: '—' },
]

const DOCS = [
  { key: 'partes', label: 'Datos de las partes', file: 'partes-alquiler-valencia.pdf', status: 'done' as const, fecha: '28 ago, 09:15' },
  { key: 'dni-arrendador', label: 'DNI arrendador', file: 'dni-propietario-anverso.jpg', status: 'done' as const, fecha: '28 ago, 10:02' },
  { key: 'dni-inquilino', label: 'DNI inquilino', file: 'dni-inquilino-anverso.jpg', status: 'done' as const, fecha: '28 ago, 10:05' },
  { key: 'nota-simple', label: 'Nota simple registral', file: 'nota-simple-calle-colon-12.pdf', status: 'reviewing' as const, fecha: '29 ago, 10:24' },
  { key: 'ite', label: 'Certificado ITE / habitabilidad', file: null, status: 'pending' as const, fecha: null },
]

const ACTIVIDAD = [
  { icon: 'D', titulo: 'Nota simple registral subida y en revisión', fecha: '29 ago, 10:24' },
  { icon: 'S', titulo: 'Expediente en fase de documentación (paso 2 de 4)', fecha: '28 ago, 09:15' },
  { icon: 'P', titulo: 'Pago confirmado — tarifa agencia 110 €', fecha: '27 ago, 16:42' },
]

const CONTRATOS_HIST = [
  {
    nombre: 'Contrato de alquiler LAU',
    ref: 'REF. A1B2C3D4',
    estado: 'Documentación',
    paso: 2,
    fecha: '27 ago 2026',
    activo: true,
  },
  {
    nombre: 'Arras penitenciales',
    ref: 'REF. F8E2A901',
    estado: 'Entregado',
    paso: 4,
    fecha: '12 ago 2026',
    activo: false,
  },
  {
    nombre: 'Alquiler de habitación',
    ref: 'REF. C3D7B112',
    estado: 'Entregado',
    paso: 4,
    fecha: '3 ago 2026',
    activo: false,
  },
]

function DocStatusBadge({ status }: { status: 'done' | 'reviewing' | 'pending' }) {
  if (status === 'done') {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wide text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
        Subido
      </span>
    )
  }
  if (status === 'reviewing') {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
        En revisión
      </span>
    )
  }
  return (
    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
      Pendiente
    </span>
  )
}

function DemoSidebar({
  active,
  onChange,
}: {
  active: DemoSection
  onChange: (s: DemoSection) => void
}) {
  return (
    <aside className="hidden md:flex md:w-52 lg:w-56 flex-col bg-[#0a1410] text-white flex-shrink-0 border-r border-[#1f3524]">
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <p className="text-sm font-extrabold tracking-tight">
          Inmo<span className="text-[#f4d98a]">nest</span>
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-500/90 mt-0.5">
          Portal gestoría
        </p>
      </div>
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {DEMO_NAV.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-all ${
                isActive
                  ? 'bg-gold-500/20 border border-gold-500/40 text-[#f4d98a]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{item.label}</p>
                <p className="text-[9px] text-white/40 truncate">{item.desc}</p>
              </div>
            </button>
          )
        })}
      </nav>
      <div className="px-3 py-3 border-t border-white/10">
        <p className="text-[9px] uppercase tracking-widest text-[#f4d98a]/80">Cliente</p>
        <p className="text-xs font-semibold truncate">{MOCK.usuario}</p>
        <p className="text-[10px] text-white/40 truncate">{MOCK.agencia}</p>
      </div>
    </aside>
  )
}

function DemoMobileTabs({
  active,
  onChange,
}: {
  active: DemoSection
  onChange: (s: DemoSection) => void
}) {
  return (
    <div className="md:hidden flex gap-1 p-2 bg-[#0a1410] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {DEMO_NAV.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
            active === item.id
              ? 'bg-gold-500/20 text-[#f4d98a] border border-gold-500/40'
              : 'text-white/60 border border-transparent'
          }`}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </div>
  )
}

function ExpedienteHero() {
  return (
    <div className="relative bg-gradient-to-br from-black via-black to-black px-4 py-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,42,0.18)_0%,_transparent_55%)]" />
      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gold-400 font-mono">
            {MOCK.referencia}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
            En elaboración
          </span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight uppercase">
            {MOCK.servicio}
          </h3>
          <p className="text-xs text-white/60 mt-1">
            Documentación · Paso {MOCK.pasoActual} de 4 · {MOCK.agencia}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {WORKFLOW.map((step) => (
            <div
              key={step.n}
              className={`rounded-lg px-1.5 py-2 text-center ${
                step.active
                  ? 'bg-white/15 border border-gold-500/50'
                  : step.done
                    ? 'bg-white/5 border border-gold-500/20'
                    : 'bg-white/5 border border-white/10 opacity-50'
              }`}
            >
              <p className="text-[10px] font-bold text-white/90">{step.n}</p>
              <p className="text-[8px] text-white/50 mt-0.5 leading-tight hidden sm:block">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InicioView() {
  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-2">
          Resumen del expediente
        </p>
        <p className="text-lg font-bold text-gray-900">Hola, {MOCK.usuario.split(' ')[0]}</p>
        <p className="text-sm text-gray-500 mt-0.5">{MOCK.servicio} · {MOCK.ciudad}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#fdfbf5] border border-gold-100 p-3 text-center">
            <p className="text-[9px] uppercase tracking-wider text-gray-400">Progreso</p>
            <p className="text-xl font-extrabold text-gold-600">{MOCK.progreso}%</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-[9px] uppercase tracking-wider text-gray-400">Documentos</p>
            <p className="text-xl font-extrabold text-gray-900">4/5</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-[9px] uppercase tracking-wider text-gray-400">Plazo</p>
            <p className="text-[11px] font-bold text-gray-800 leading-tight mt-1">{MOCK.plazo}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 flex gap-3 shadow-sm">
        <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#e8d48a]">
          <Image
            src={GESTOR_DANIEL_HERNANDEZ.foto}
            alt={GESTOR_DANIEL_HERNANDEZ.nombre}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Tu gestor</p>
          <p className="text-sm font-bold text-gray-900">{GESTOR_DANIEL_HERNANDEZ.nombre}</p>
          <p className="text-xs text-gray-500">{GESTOR_DANIEL_HERNANDEZ.rol}</p>
          <p className="text-[11px] text-gold-700 mt-1">Revisando nota simple · {MOCK.ciudad}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
        <p className="text-xs font-bold text-amber-900 mb-1">Próximo paso</p>
        <p className="text-sm text-amber-800 leading-relaxed">
          Sube el certificado ITE o envíalo a info@inmonest.com para que el gestor pueda finalizar la redacción.
        </p>
      </div>
    </div>
  )
}

function ExpedienteView() {
  return (
    <>
      <ExpedienteHero />
      <div className="border-b border-gray-100 px-4 py-3 bg-[#fafafa]">
        <div className="grid grid-cols-4 gap-2">
          {WORKFLOW.map((step) => (
            <div
              key={step.n}
              className={`rounded-xl px-2 py-2 text-center ${
                step.active
                  ? 'bg-white border-2 border-gold-500 shadow-sm'
                  : step.done
                    ? 'bg-cream-100 border border-gold-200'
                    : 'bg-white border border-gray-100 opacity-60'
              }`}
            >
              <div className="text-sm mb-0.5">{step.done ? '✓' : step.icon}</div>
              <p className={`text-[9px] font-bold leading-tight ${step.active ? 'text-gold-700' : step.done ? 'text-gold-800' : 'text-gray-500'}`}>
                {step.label}
              </p>
              {step.date && <p className="text-[8px] text-gray-400 mt-0.5">{step.date}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Plazo estimado</p>
            <p className="text-sm font-bold text-gray-900 mt-1">{MOCK.plazo}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Desde recepción de documentación</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Fecha de pago</p>
            <p className="text-sm font-bold text-gray-900 mt-1">27 ago 2026</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{MOCK.ciudad} · {MOCK.importe} €</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            Actividad reciente
          </p>
          <div className="space-y-2">
            {ACTIVIDAD.map((item) => (
              <div key={item.titulo} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0a1410] text-xs font-bold text-[#f4d98a]">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 leading-snug">{item.titulo}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function DocumentosView() {
  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-900">Tu documentación</h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Documentos subidos para {MOCK.servicio.toLowerCase()}. Datos ficticios de demostración.
        </p>
      </div>
      <ul className="space-y-2">
        {DOCS.map((doc) => (
          <li
            key={doc.key}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
              doc.status === 'done'
                ? 'border-gold-200 bg-cream-100/50'
                : doc.status === 'reviewing'
                  ? 'border-amber-200 bg-amber-50/50'
                  : 'border-gray-200 bg-white'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                doc.status === 'done'
                  ? 'bg-gold-500 text-white'
                  : doc.status === 'reviewing'
                    ? 'bg-amber-400 text-white'
                    : 'border-2 border-gray-300 bg-white text-gray-400'
              }`}
            >
              {doc.status === 'done' ? '✓' : doc.status === 'reviewing' ? '…' : ''}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900">{doc.label}</p>
              {doc.file ? (
                <p className="text-[10px] text-gray-500 truncate mt-0.5">📎 {doc.file}</p>
              ) : (
                <p className="text-[10px] text-gray-400 mt-0.5">Sin subir · opcional</p>
              )}
              {doc.fecha && <p className="text-[9px] text-gray-400 mt-0.5">{doc.fecha}</p>}
            </div>
            <DocStatusBadge status={doc.status} />
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-gray-400 text-center pt-2">
        También puedes enviar documentación a info@inmonest.com
      </p>
    </div>
  )
}

function ContratosView() {
  return (
    <div className="p-4 sm:p-5 space-y-3">
      <div>
        <h3 className="text-sm font-bold text-gray-900">Mis contratos</h3>
        <p className="text-xs text-gray-500 mt-1">Historial de servicios de {MOCK.agencia}</p>
      </div>
      {CONTRATOS_HIST.map((c) => (
        <div
          key={c.ref}
          className={`rounded-xl border p-4 transition-all ${
            c.activo
              ? 'border-gold-500 bg-white shadow-md shadow-amber-100/40'
              : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-sm font-bold text-gray-900">{c.nombre}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{c.ref}</p>
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                c.estado === 'Entregado'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {c.estado}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-[#f4d98a]"
                style={{ width: `${(c.paso / 4) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500">{c.paso}/4</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">{c.fecha}</p>
          {c.activo && (
            <button
              type="button"
              className="mt-3 w-full py-2 rounded-lg border border-gold-300 text-gold-700 text-xs font-bold bg-gold-50/50"
            >
              Ver expediente →
            </button>
          )}
          {!c.activo && c.estado === 'Entregado' && (
            <button
              type="button"
              className="mt-3 w-full py-2 rounded-lg bg-gold-500 text-white text-xs font-bold opacity-90"
            >
              Descargar PDF
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function DemoContent({ section }: { section: DemoSection }) {
  switch (section) {
    case 'inicio':
      return <InicioView />
    case 'expediente':
      return <ExpedienteView />
    case 'documentos':
      return <DocumentosView />
    case 'contratos':
      return <ContratosView />
  }
}

export default function AgenciaGestoriaPanelDemo() {
  const [section, setSection] = useState<DemoSection>('expediente')

  return (
    <section className="py-16 px-4 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
            Panel de gestoría
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            El mismo panel que usan tus clientes
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Tras contratar, la agencia accede al portal de gestoría: sube documentación, sigue el
            expediente en tiempo real y descarga el PDF firmable. Explora las secciones del panel.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-3 text-[10px] text-gray-400 font-mono truncate">
              inmonest.com/mi-cuenta/contratos
            </span>
          </div>

          <DemoMobileTabs active={section} onChange={setSection} />

          <div className="flex min-h-[420px] sm:min-h-[480px] bg-[#eef0f2]">
            <DemoSidebar active={section} onChange={setSection} />
            <div className="flex-1 min-w-0 overflow-y-auto max-h-[520px]">
              <DemoContent section={section} />
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Vista interactiva con datos ficticios. Tu panel real se activa al contratar un pack o contrato.
        </p>

        <div className="mt-10 grid sm:grid-cols-4 gap-4">
          {[
            { n: '01', titulo: 'Expediente trazable', desc: 'Timeline con cada hito del contrato' },
            { n: '02', titulo: 'Documentos seguros', desc: 'Subida por rol: arrendador, inquilino, inmueble' },
            { n: '03', titulo: 'Contratos PDF', desc: 'Descarga cuando el gestor entrega' },
            { n: '04', titulo: 'Firma FIRMACERT', desc: 'Firma electrónica certificada incluida' },
          ].map((item) => (
            <div key={item.n} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
              <p className="text-2xl font-black text-gray-200 mb-1">{item.n}</p>
              <p className="text-sm font-bold text-gray-900">{item.titulo}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
