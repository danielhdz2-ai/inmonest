import {
  CONTRATO_ARRAS_SERVICIO_BLOQUES,
  CONTRATO_ARRAS_SERVICIO_PRECIO,
  type ContratoArrasServicioBloque,
} from '@/lib/contrato-arras-servicio-content'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type ArrasContratoModuloVariant = 'penitenciales' | 'confirmatorias'

export type ArrasContratoServicioMeta = {
  variant: ArrasContratoModuloVariant
  precio: number
  bloques: ContratoArrasServicioBloque[]
  nav: { id: string; label: string }[]
  sectionId: string
  eyebrow: string
  heading: string
  introSuffix: string
  idPrefix: string
  overlayProductLabel: string
  ctaLabel: string
}

const CONFIRMATORIAS_PRECIO = getPrecioServicio('arras-confirmatorias') ?? 145

function mergeBlock(
  blocks: ContratoArrasServicioBloque[],
  id: string,
  patch: Partial<ContratoArrasServicioBloque>,
): ContratoArrasServicioBloque[] {
  return blocks.map((b) => (b.id === id ? { ...b, ...patch } : b))
}

function buildConfirmatoriasBlocks(): ContratoArrasServicioBloque[] {
  let blocks = structuredClone(CONTRATO_ARRAS_SERVICIO_BLOQUES)
  blocks = mergeBlock(blocks, 'llamada-gestor', {
    intro:
      'En menos de 24 horas un gestor entiende si vuestra operación requiere arras confirmatorias: obligación de cumplir el contrato definitivo, señal acordada, hipoteca y plazo a escritura.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos diferencias entre penitenciales y confirmatorias para tu caso.',
      'Detectamos riesgos registrales y condiciones suspensivas.',
      'Resolvemos dudas sobre precio cerrado y documentación.',
    ],
  })
  blocks = mergeBlock(blocks, 'redaccion', {
    titulo: 'El gestor redacta las arras confirmatorias a medida',
    intro:
      'Redactamos el contrato con obligación de celebrar la compraventa, señal, plazo de escritura y cláusulas de cumplimiento forzoso cuando proceda.',
    incluye: [
      'Contrato de arras confirmatorias',
      'Cláusulas revisadas por gestor inmobiliario',
      'Plazo y condiciones de escritura',
      'Seguimiento visible en el panel (“En elaboración”)',
    ],
  })
  blocks = mergeBlock(blocks, 'firma', {
    titulo: 'Firma, señal y obligación de ir a escritura',
    intro:
      'El contrato recoge la señal y las consecuencias de incumplimiento. Te orientamos sobre el compromiso de compraventa y la documentación previa a notaría.',
  })
  return blocks.map((b) => {
    let titulo = b.titulo
    if (b.id === 'contratacion') {
      titulo = `Contratas el servicio — ${CONFIRMATORIAS_PRECIO} € IVA incluido`
    }
    return { ...b, titulo }
  })
}

export function getArrasContratoServicioMeta(variant: ArrasContratoModuloVariant): ArrasContratoServicioMeta {
  if (variant === 'penitenciales') {
    const bloques = CONTRATO_ARRAS_SERVICIO_BLOQUES
    return {
      variant,
      precio: CONTRATO_ARRAS_SERVICIO_PRECIO,
      bloques,
      nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
      sectionId: 'como-funciona-arras-penitenciales',
      eyebrow: 'Qué incluye tu contrato de arras penitenciales',
      heading: 'Cómo funcionan las arras penitenciales con Inmonest, paso a paso',
      introSuffix:
        'gestor asignado, panel online, borrador personalizado, revisión de nota simple y firma FIRMACERT.',
      idPrefix: 'arras',
      overlayProductLabel: 'Arras penitenciales · Inmonest',
      ctaLabel: 'Pedir arras penitenciales',
    }
  }

  const bloques = buildConfirmatoriasBlocks()
  return {
    variant,
    precio: CONFIRMATORIAS_PRECIO,
    bloques,
    nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
    sectionId: 'como-funciona-arras-confirmatorias',
    eyebrow: 'Qué incluye tu contrato de arras confirmatorias',
    heading: 'Cómo funcionan las arras confirmatorias con Inmonest, paso a paso',
    introSuffix:
      'gestor asignado, panel online, borrador con obligación de compraventa y firma FIRMACERT.',
    idPrefix: 'arras-conf',
    overlayProductLabel: 'Arras confirmatorias · Inmonest',
    ctaLabel: 'Pedir arras confirmatorias',
  }
}

export function servicioSlugToArrasVariant(servicio: string): ArrasContratoModuloVariant | null {
  if (servicio === 'arras-penitenciales') return 'penitenciales'
  if (servicio === 'arras-confirmatorias') return 'confirmatorias'
  return null
}
