'use client'

import { useEffect, useState } from 'react'

type TimelineItem = {
  id: string
  kind: 'workflow' | 'activity'
  label: string
  description?: string
  date: string
  icon: string
}

type Props = {
  requestId: string
  compact?: boolean
}

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function GestoriaExpedienteTimeline({ requestId, compact = false }: Props) {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/gestoria/expediente-timeline?request_id=${encodeURIComponent(requestId)}`,
          { cache: 'no-store' },
        )
        if (!res.ok) throw new Error('No se pudo cargar el historial')
        const data = await res.json()
        if (!cancelled) setItems(data.timeline ?? [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar historial')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [requestId])

  if (loading) {
    return (
      <div className={`rounded-2xl border border-gray-200 bg-white ${compact ? 'p-4' : 'p-5'} animate-pulse`}>
        <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
        <div className="space-y-2">
          <div className="h-10 bg-gray-50 rounded-xl" />
          <div className="h-10 bg-gray-50 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`rounded-2xl border border-red-100 bg-red-50 ${compact ? 'p-4' : 'p-5'} text-sm text-red-700`}>
        {error}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`rounded-2xl border border-dashed border-gray-200 bg-gray-50 ${compact ? 'p-4' : 'p-5'} text-sm text-gray-500 text-center`}>
        Aún no hay eventos en el historial de este expediente.
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white ${compact ? 'p-4' : 'p-5 sm:p-6'} shadow-sm`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9962a] mb-4">
        Historial del expediente
      </p>
      <ol className="space-y-0">
        {items.map((item, idx) => (
          <li key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
            {idx < items.length - 1 && (
              <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200" aria-hidden />
            )}
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#fef9e8] border border-[#f0dfa0] text-sm">
              {item.icon}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formatWhen(item.date)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
