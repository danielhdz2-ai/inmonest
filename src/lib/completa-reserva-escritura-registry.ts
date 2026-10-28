import {
  COMPRA_COMPLETA_SERVICIO_BLOQUES,
  COMPLETA_RESERVA_ESCRITURA_PRECIO,
  VENTA_COMPLETA_SERVICIO_BLOQUES,
  type CompletaServicioBloque,
  type CompletaServicioModo,
} from '@/lib/completa-reserva-escritura-pasos-content'

export type CompletaServicioMeta = {
  modo: CompletaServicioModo
  precio: number
  bloques: CompletaServicioBloque[]
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

export function getCompletaServicioMeta(modo: CompletaServicioModo): CompletaServicioMeta {
  const bloques = modo === 'venta' ? VENTA_COMPLETA_SERVICIO_BLOQUES : COMPRA_COMPLETA_SERVICIO_BLOQUES
  const precio = COMPLETA_RESERVA_ESCRITURA_PRECIO

  if (modo === 'venta') {
    return {
      modo,
      precio,
      bloques,
      nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
      sectionId: 'como-funciona-venta-completa',
      eyebrow: 'Qué incluye tu pack venta completa',
      heading: 'Cómo funciona la venta completa con Inmonest, paso a paso',
      introSuffix: 'gestor asignado, reserva y arras, documentación y coordinación hasta escritura',
      idPrefix: 'venta-completa-paso',
      overlayProductLabel: 'VENTA COMPLETA · INMONEST',
      ctaLabel: 'Contratar venta completa',
      ctaCierre: '¿Listo para vender con gestor hasta escritura en',
    }
  }

  return {
    modo,
    precio,
    bloques,
    nav: bloques.map((b) => ({ id: b.id, label: b.kicker })),
    sectionId: 'como-funciona-compra-completa',
    eyebrow: 'Qué incluye tu pack compra completa',
    heading: 'Cómo funciona la compra completa con Inmonest, paso a paso',
    introSuffix: 'due diligence, arras blindadas, seguimiento hipoteca y escritura con garantías',
    idPrefix: 'compra-completa-paso',
    overlayProductLabel: 'COMPRA COMPLETA · INMONEST',
    ctaLabel: 'Contratar compra completa',
    ctaCierre: '¿Listo para comprar con gestor hasta escritura en',
  }
}
