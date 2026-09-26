import {
  DUE_DILIGENCE_SERVICIO_BLOQUES,
  DUE_DILIGENCE_SERVICIO_PRECIO,
} from '@/lib/due-diligence-servicio-content'
import type { AlquilerContratoServicioMeta } from '@/lib/alquiler-contrato-servicio-registry'

export function getDueDiligenceServicioMeta(): AlquilerContratoServicioMeta {
  const bloques = DUE_DILIGENCE_SERVICIO_BLOQUES
  return {
    variant: 'lau',
    precio: DUE_DILIGENCE_SERVICIO_PRECIO,
    bloques,
    nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
    sectionId: 'como-funciona-due-diligence',
    eyebrow: 'Qué incluye tu due diligence pre-compra',
    heading: 'Cómo funciona el due diligence con Inmonest, paso a paso',
    introSuffix:
      'gestor asignado, panel online, auditoría documental completa, informe ejecutivo y asesoramiento hasta escritura.',
    idPrefix: 'due-diligence',
    overlayProductLabel: 'Due diligence pre-compra · Inmonest',
    ctaLabel: 'Contratar due diligence',
  }
}

export function servicioSlugIsDueDiligencePack(servicio: string): boolean {
  return servicio === 'pack-due-diligence-precompra'
}
