'use client'

import type { GestoriaContrato } from '@/lib/gestoria-portal-types'
import { isPaidStatus, isLeadStatus } from '@/lib/gestoria-leads'
import { WORKFLOW_STEPS } from '@/lib/gestoria-client-progress'

type Props = {
  contratos: GestoriaContrato[]
  activeId: string | null
  onSelect: (id: string) => void
  onDownload: (contrato: GestoriaContrato) => void
  downloading: string | null
  onNavigateExpediente: (id: string) => void
}

function statusBadge(contrato: GestoriaContrato) {
  if (contrato.contract_path) {
    return { label: 'Entregado', className: 'bg-cream-100 text-gold-800' }
  }
  if (isPaidStatus(contrato.status, contrato.paid_at)) {
    const step = contrato.step ?? 1
    if (step >= 3) return { label: 'En elaboración', className: 'bg-blue-100 text-blue-800' }
    return { label: 'Documentación', className: 'bg-amber-100 text-amber-800' }
  }
  if (isLeadStatus(contrato.status, contrato.paid_at)) {
    return { label: 'Pendiente de pago', className: 'bg-gray-100 text-gray-600' }
  }
  return { label: contrato.status, className: 'bg-gray-100 text-gray-600' }
}

export default function GestoriaPortalContratos({
  contratos,
  activeId,
  onSelect,
  onDownload,
  downloading,
  onNavigateExpediente,
}: Props) {
  if (contratos.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-4xl mb-3">📄</p>
        <h2 className="text-lg font-bold text-gray-900">Sin contratos aún</h2>
        <p className="text-sm text-gray-500 mt-2">Tus servicios contratados aparecerán aquí.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Mis contratos y servicios</h2>
        <p className="text-sm text-gray-500 mt-1">
          Historial completo de gestoría contratada con Inmonest
        </p>
      </div>

      <div className="space-y-3">
        {contratos.map((c) => {
          const badge = statusBadge(c)
          const isActive = c.id === activeId
          const paid = isPaidStatus(c.status, c.paid_at)
          const step = Math.min(c.step ?? 1, 4)
          const stepInfo = WORKFLOW_STEPS[step - 1]

          return (
            <article
              key={c.id}
              className={`rounded-2xl border bg-white overflow-hidden transition-all ${
                isActive ? 'border-gold-500 shadow-lg shadow-amber-100/50' : 'border-gray-200 shadow-sm'
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${badge.className}`}>
                        {badge.label}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-forest-900 text-[#f4d98a]">
                          Activo
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {c.service_name ?? c.service_key.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {c.paid_at
                        ? `Pagado el ${new Date(c.paid_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`
                        : c.created_at
                          ? `Solicitado el ${new Date(c.created_at).toLocaleDateString('es-ES')}`
                          : ''}
                      {c.amount_eur != null && ` · ${c.amount_eur} €`}
                    </p>
                  </div>
                  {c.amount_eur != null && (
                    <p className="text-xl font-extrabold text-gold-500">{c.amount_eur} €</p>
                  )}
                </div>

                {paid && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-500 to-[#f4d98a] transition-all"
                        style={{ width: `${(step / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">
                      {stepInfo?.label ?? `Paso ${step}/4`}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {paid && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(c.id)
                        onNavigateExpediente(c.id)
                      }}
                      className="inline-flex items-center rounded-xl bg-forest-900 text-[#f4d98a] text-xs font-bold px-4 py-2.5 min-h-[44px] touch-manipulation"
                    >
                      Ver expediente
                    </button>
                  )}
                  {!isActive && paid && (
                    <button
                      type="button"
                      onClick={() => onSelect(c.id)}
                      className="inline-flex items-center rounded-xl border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2.5 min-h-[44px] touch-manipulation"
                    >
                      Seleccionar
                    </button>
                  )}
                  {c.contract_path && (
                    <button
                      type="button"
                      onClick={() => onDownload(c)}
                      disabled={downloading === c.id}
                      className="inline-flex items-center rounded-xl border-2 border-gold-500 text-gold-700 text-xs font-bold px-4 py-2.5 min-h-[44px] touch-manipulation disabled:opacity-60"
                    >
                      {downloading === c.id ? 'Descargando…' : 'Descargar PDF'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
