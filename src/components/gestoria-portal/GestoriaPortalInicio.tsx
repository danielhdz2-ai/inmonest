'use client'

import Image from 'next/image'
import type { GestoriaContrato, GestoriaUserDoc } from '@/lib/gestoria-portal-types'
import { computeGestoriaProgress, WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'
import { resolveGestorForRequest } from '@/lib/gestoria-gestor'
import { isPaidStatus } from '@/lib/gestoria-leads'
import type { GestoriaPortalSection } from '@/lib/gestoria-portal-types'

type Props = {
  displayName: string
  contratos: GestoriaContrato[]
  userDocs: GestoriaUserDoc[]
  activeContrato: GestoriaContrato | null
  showPagoBanner: boolean
  onNavigate: (section: GestoriaPortalSection) => void
}

export default function GestoriaPortalInicio({
  displayName,
  contratos,
  userDocs,
  activeContrato,
  showPagoBanner,
  onNavigate,
}: Props) {
  const paidCount = contratos.filter((c) => isPaidStatus(c.status, c.paid_at)).length
  const deliveredCount = contratos.filter((c) => c.contract_path).length
  const progress = activeContrato
    ? computeGestoriaProgress(activeContrato, userDocs)
    : null
  const gestor = resolveGestorForRequest(activeContrato?.assigned_to)
  const firstName = displayName.split(' ')[0]
  const totalDocs = progress?.checklist.length ?? 0
  const uploadedDocs = progress?.checklist.filter((c) => c.state !== 'pending' && c.state !== 'rejected').length ?? 0

  return (
    <div className="space-y-5">
      {showPagoBanner && (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300/50 bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">✓</span>
            <div>
              <p className="text-lg font-bold">Pago confirmado</p>
              <p className="text-sm text-emerald-100 mt-1">
                Tu expediente está activo. Si quieres, sube tu documentación aquí o envíala a info@inmonest.com.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('expediente')}
                className="mt-3 inline-flex items-center rounded-xl bg-white text-emerald-800 text-sm font-bold px-4 py-2.5 min-h-[44px] touch-manipulation"
              >
                Ir al expediente →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0a1410] via-[#152318] to-[#0d1a0f] p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,150,42,0.25),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9962a]/5 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-[#f4d98a] text-xs font-bold uppercase tracking-[0.25em] mb-2">
            Portal cliente · Gestoría inmobiliaria
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Hola, {firstName}
          </h1>
          <p className="text-white/60 text-sm mt-2 max-w-lg">
            Seguimiento en tiempo real de tu contrato, documentación y gestor asignado.
          </p>

          {progress && activeContrato && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/50">Progreso</p>
                <p className="text-3xl font-extrabold text-[#f4d98a] mt-1">{progress.progressPercent}%</p>
                <p className="text-xs text-white/60 mt-1">{progress.stepLabel}</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/50">Documentos</p>
                <p className="text-3xl font-extrabold text-white mt-1">
                  {uploadedDocs}/{totalDocs}
                </p>
                <p className="text-xs text-white/60 mt-1">Subidos (opcional)</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/50">Servicios</p>
                <p className="text-3xl font-extrabold text-white mt-1">{paidCount}</p>
                <p className="text-xs text-white/60 mt-1">{deliveredCount} entregados</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gestor */}
        <div className="lg:col-span-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9962a] mb-3">Tu gestor asignado</p>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-[#e8d48a] flex-shrink-0">
              <Image src={gestor.foto} alt={gestor.nombre} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{gestor.nombre}</p>
              <p className="text-xs text-gray-500">{gestor.rol}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a
              href={`tel:${gestor.telefonoTel}`}
              className="text-center rounded-xl border border-[#c9962a] text-[#7a5c1e] text-xs font-bold py-2.5 min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              📞 Llamar
            </a>
            <a
              href={`https://wa.me/${gestor.whatsapp}?text=${encodeURIComponent('Hola, consulta sobre mi expediente')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center rounded-xl bg-[#25D366] text-white text-xs font-bold py-2.5 min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Timeline resumido */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Seguimiento del trabajo</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {WORKFLOW_STEPS.map((step) => {
              const current = progress?.currentStep ?? 1
              const done = current > step.n
              const active = current === step.n
              return (
                <div
                  key={step.n}
                  className={`rounded-xl p-3 text-center border transition-all ${
                    active
                      ? 'border-[#c9962a] bg-[#fef9e8] shadow-md'
                      : done
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-xl mb-1">{done ? '✓' : step.icon}</div>
                  <p className={`text-[11px] font-bold leading-tight ${active ? 'text-[#7a5c1e]' : done ? 'text-emerald-800' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
          {activeContrato && (
            <p className="text-sm text-gray-600 mt-4">
              <span className="font-semibold text-gray-900">
                {activeContrato.service_name ?? activeContrato.service_key.replace(/-/g, ' ')}
              </span>
              {activeContrato.expected_delivery_date && (
                <span className="text-gray-400">
                  {' '}· Entrega prevista:{' '}
                  {new Date(activeContrato.expected_delivery_date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { id: 'expediente' as const, label: 'Subir documentos', icon: '📤', color: 'from-amber-50 to-amber-100/50 border-amber-200' },
          { id: 'documentos' as const, label: 'Mis documentos', icon: '🗂️', color: 'from-rose-50 to-rose-100/50 border-rose-200' },
          { id: 'inmueble' as const, label: 'Datos inmueble', icon: '🏠', color: 'from-blue-50 to-blue-100/50 border-blue-200' },
          { id: 'contratos' as const, label: 'Mis contratos', icon: '📄', color: 'from-emerald-50 to-emerald-100/50 border-emerald-200' },
          { id: 'servicios' as const, label: 'Contratar más', icon: '✦', color: 'from-violet-50 to-violet-100/50 border-violet-200' },
        ].map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onNavigate(action.id)}
            className={`rounded-2xl border bg-gradient-to-br ${action.color} p-4 text-left hover:shadow-md transition-shadow touch-manipulation min-h-[88px]`}
          >
            <span className="text-2xl">{action.icon}</span>
            <p className="text-sm font-bold text-gray-900 mt-2 leading-tight">{action.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
