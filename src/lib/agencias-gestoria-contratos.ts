/** Contratos sueltos para agencias — tarifa B2B (110 €) con entrega 4–5 h */

import { AGENCIA_SLA_LABEL } from '@/lib/agencias-gestoria-packs'
import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export const AGENCIA_CONTRATO_PRECIO_B2B = 110

export type AgenciaContratoIndependiente = {
  slug: string
  nombre: string
  categoria: 'Compraventa' | 'Alquiler'
  descripcion: string
  image: string
  precioAgencia: number
  precioRetail: number
  incluye: string[]
  badge?: string
}

export const AGENCIA_CONTRATOS_INDEPENDIENTES: AgenciaContratoIndependiente[] = [
  {
    slug: 'arras-penitenciales',
    nombre: 'Contrato de Arras Penitenciales',
    categoria: 'Compraventa',
    descripcion:
      'Señal con derecho a desistir. Máxima seguridad para comprador y vendedor en operaciones entre particulares.',
    image: '/contrato1.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('arras-penitenciales') ?? 145,
    badge: 'Más solicitado',
    incluye: [
      'Redacción personalizada según partes',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Revisión de nota simple registral',
    ],
  },
  {
    slug: 'arras-confirmatorias',
    nombre: 'Contrato de Arras Confirmatorias',
    categoria: 'Compraventa',
    descripcion:
      'Obliga al cumplimiento de la compraventa. Ideal cuando ambas partes tienen certeza en la operación.',
    image: '/contrato2.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('arras-confirmatorias') ?? 145,
    incluye: [
      'Redacción personalizada según partes',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Cláusulas de obligación de cumplimiento',
    ],
  },
  {
    slug: 'contrato-alquiler',
    nombre: 'Contrato de Alquiler de Vivienda (LAU)',
    categoria: 'Alquiler',
    descripcion:
      'Adaptado a la Ley de Vivienda 2026. Para propietarios e inquilinos con cláusulas personalizadas.',
    image: '/gestoria4.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('contrato-alquiler') ?? 145,
    badge: 'Ley 2026',
    incluye: [
      'Adaptado a LAU y Ley de Vivienda 2026',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Cláusulas de fianza y actualización de renta',
    ],
  },
  {
    slug: 'alquiler-temporada',
    nombre: 'Contrato de Alquiler por Temporada',
    categoria: 'Alquiler',
    descripcion:
      'Duración y causa de temporalidad específica. Exento de prórrogas automáticas de la LAU.',
    image: '/gestoria5.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('alquiler-temporada') ?? 165,
    incluye: [
      'Redacción personalizada según partes',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Compatible con estancias cortas y estudiantes',
    ],
  },
  {
    slug: 'alquiler-habitaciones',
    nombre: 'Contrato de Alquiler de Habitación',
    categoria: 'Alquiler',
    descripcion:
      'Regulación de zonas comunes y normas de convivencia. Ideal para pisos compartidos o coliving.',
    image: '/gestoria10.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('alquiler-habitaciones') ?? 145,
    incluye: [
      'Normas de convivencia pactadas',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Fianza y condiciones de devolución',
    ],
  },
  {
    slug: 'contrato-compraventa',
    nombre: 'Contrato entre Particulares (Compraventa)',
    categoria: 'Compraventa',
    descripcion:
      'Documento privado de compraventa personalizado entre particulares, listo para firmar.',
    image: '/contrato4.jpg',
    precioAgencia: AGENCIA_CONTRATO_PRECIO_B2B,
    precioRetail: getPrecioServicio('contrato-compraventa') ?? 145,
    incluye: [
      'Redacción personalizada según partes',
      AGENCIA_SLA_LABEL,
      'PDF firmable digitalmente',
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Garantías y saneamiento incluidos',
    ],
  },
]

export function getAgenciaContratoBySlug(slug: string): AgenciaContratoIndependiente | undefined {
  return AGENCIA_CONTRATOS_INDEPENDIENTES.find((c) => c.slug === slug)
}

export function agenciaContratoAhorroPct(contrato: AgenciaContratoIndependiente): number {
  return Math.round((1 - contrato.precioAgencia / contrato.precioRetail) * 100)
}

export function agenciaContratoServiceKey(slug: string): string {
  return `agencia-contrato-${slug}`
}
