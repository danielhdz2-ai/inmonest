import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { PACK_ARRAS_VENDEDOR_PRECIO } from './pack-arras-vendedor-ciudad-data'

export function getPackArrasVendedorFaq(
  nombre: string,
  region: string,
  precioEjemplo: number,
  prioritarias: DueDiligenceFaqItem[] = [],
): DueDiligenceFaqItem[] {
  const comisionMin = Math.round(precioEjemplo * 0.03)
  const comisionMax = Math.round(precioEjemplo * 0.05)

  const base: DueDiligenceFaqItem[] = [
    {
      q: `¿Cuánto cuesta el Pack Arras Plus Vendedor en ${nombre}?`,
      a: `${PACK_ARRAS_VENDEDOR_PRECIO}€ IVA incluido: arras penitenciales redactadas + revisión documental para llegar a escritura. Frente a ${comisionMin.toLocaleString('es-ES')}–${comisionMax.toLocaleString('es-ES')}€ de comisión de agencia en un piso de ${precioEjemplo.toLocaleString('es-ES')}€.`,
    },
    {
      q: '¿Qué incluye el pack para vendedores?',
      a: 'Redacción de arras penitenciales a tu favor, checklist documental, revisión de nota simple, deudas de comunidad, certificados técnicos e informe de riesgos antes de notaría. Gestor asignado por WhatsApp.',
    },
    {
      q: '¿Ya tengo comprador particular, me sirve?',
      a: 'Sí. Es para propietarios que venden sin agencia y necesitan arras profesionales y documentación ordenada para notaría.',
    },
    {
      q: `¿Conocéis la documentación de venta en ${region}?`,
      a: `Sí. Adaptamos el pack a los requisitos de ${nombre}: cédula, certificado energético, ITE si aplica y normativa autonómica.`,
    },
    {
      q: '¿Puedo pasar después a venta completa (687€)?',
      a: 'Sí. Si quieres acompañamiento integral hasta escritura, puedes contratar venta completa; el pack es ideal si ya tienes arras casi listas y solo necesitas redacción + documentación.',
    },
  ]

  return prioritarias.length > 0 ? [...prioritarias, ...base] : base
}
