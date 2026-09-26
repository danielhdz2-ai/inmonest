import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { GESTORIA_LANDING_CONTENT_REVISED } from '@/lib/gestoria-ciudad-schema'
import { GESTORIA_GOOGLE_AGGREGATE } from '@/lib/gestoria-reviews-schema'

type GestoriaLandingTrustStripProps = {
  servicio?: string
  ciudad?: string
}

function formatRevised(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

export default function GestoriaLandingTrustStrip({ servicio, ciudad }: GestoriaLandingTrustStripProps) {
  const scope =
    servicio && ciudad ? `${servicio} · ${ciudad}` : servicio ?? 'Gestoría inmobiliaria online'

  return (
    <div
      className="border-b border-gray-100 bg-slate-50/90"
      aria-label="Señales de confianza del servicio"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
        <span>
          <strong className="text-gray-800 font-semibold">{GESTOR_DANIEL_HERNANDEZ.nombre}</strong>
          {' · gestor asignado'}
        </span>
        <span className="hidden sm:inline text-gray-300" aria-hidden>
          |
        </span>
        <span>100 % online · toda España</span>
        <span className="hidden sm:inline text-gray-300" aria-hidden>
          |
        </span>
        <span>
          {GESTORIA_GOOGLE_AGGREGATE.ratingValue} · {GESTORIA_GOOGLE_AGGREGATE.reviewCount} reseñas Google
        </span>
        <span className="hidden sm:inline text-gray-300" aria-hidden>
          |
        </span>
        <span>
          Contenido revisado {formatRevised(GESTORIA_LANDING_CONTENT_REVISED)} · {scope}
        </span>
      </div>
    </div>
  )
}
