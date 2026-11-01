import TestimoniosSection from '@/components/TestimoniosSection'
import { getTestimonioLandingForServicio } from '@/lib/gestoria-servicio-template'

/** Servicios con >500 imp. GSC (ago–oct 2026) — testimonios above the fold. */
export const GSC_TOP_TRAFFIC_SERVICIOS = [
  'contrato-alquiler',
  'compra-completa-reserva-escritura',
  'venta-completa-reserva-escritura',
  'revision-alquiler',
  'rescision-alquiler',
  'contrato-compraventa',
] as const

export function isGscTopTrafficServicio(servicio: string): boolean {
  return (GSC_TOP_TRAFFIC_SERVICIOS as readonly string[]).includes(servicio)
}

type Props = { servicio: string; className?: string }

export default function GestoriaGscTopTrafficTestimonios({ servicio, className }: Props) {
  if (!isGscTopTrafficServicio(servicio)) return null

  return (
    <TestimoniosSection
      landing={getTestimonioLandingForServicio(servicio)}
      layout="carousel"
      showGoogleReviews
      className={className ?? 'border-y border-gray-100 bg-gray-50 py-12 px-4'}
    />
  )
}
