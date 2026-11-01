import GestoriaServicioFaqAboveFold from '@/components/GestoriaServicioFaqAboveFold'

type FaqItem = { q: string; a: string }

type Props = {
  barrioNombre: string
  servicioLabel: string
  faqs: FaqItem[]
}

/** FAQ visible bajo el hero en barrios BCN (rich results + CTR). */
export default function GestoriaBarrioBarcelonaFaqAboveFold({
  barrioNombre,
  servicioLabel,
  faqs,
}: Props) {
  return (
    <GestoriaServicioFaqAboveFold
      title={`${servicioLabel} en ${barrioNombre} (Barcelona): preguntas frecuentes`}
      faqs={faqs}
      limit={3}
    />
  )
}
