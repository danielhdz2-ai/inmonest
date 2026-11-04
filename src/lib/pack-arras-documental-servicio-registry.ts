import {
  PACK_ARRAS_DOCUMENTAL_SERVICIO_BLOQUES,
  type PackArrasDocumentalServicioBloque,
} from '@/lib/pack-arras-documental-servicio-content'
import { PACK_ARRAS_DOCUMENTAL_PRECIO } from '@/lib/pack-arras-documental-ciudad-data'

export type PackArrasDocumentalServicioMeta = {
  precio: number
  bloques: PackArrasDocumentalServicioBloque[]
  nav: { id: string; label: string }[]
  sectionId: string
  eyebrow: string
  heading: string
  introSuffix: string
  idPrefix: string
  overlayProductLabel: string
  ctaLabel: string
  ctaCierre: string
}

export function getPackArrasDocumentalServicioMeta(): PackArrasDocumentalServicioMeta {
  const bloques = PACK_ARRAS_DOCUMENTAL_SERVICIO_BLOQUES
  const precio = PACK_ARRAS_DOCUMENTAL_PRECIO

  return {
    precio,
    bloques,
    nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
    sectionId: 'como-funciona-pack-arras-plus',
    eyebrow: 'Qué incluye el Pack Arras Plus comprador',
    heading: 'Cómo funciona el Pack Arras Plus, paso a paso',
    introSuffix: 'gestor asignado, arras redactadas, auditoría documental e informe antes de la señal',
    idPrefix: 'pack-arras-paso',
    overlayProductLabel: 'PACK ARRAS PLUS · INMONEST',
    ctaLabel: 'Contratar pack',
    ctaCierre: '¿Listo para comprar con arras e informe documental en',
  }
}
