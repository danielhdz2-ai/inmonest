import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'

export function getAsesoriaCompraFaq(
  nombre: string,
  region: string,
  precioEjemplo: number,
  prioritarias: DueDiligenceFaqItem[] = []
): DueDiligenceFaqItem[] {
  const comisionMin = Math.round(precioEjemplo * 0.03)
  const comisionMax = Math.round(precioEjemplo * 0.05)

  const base: DueDiligenceFaqItem[] = [
    {
      q: `¿Cuánto cuesta comprar piso de particular en ${nombre} con gestoría?`,
      a: `687€ IVA incluido por acompañamiento completo desde reserva hasta escritura. Frente a ${comisionMin.toLocaleString('es-ES')}–${comisionMax.toLocaleString('es-ES')}€ de comisión de agencia (3-5%) en un piso de ${precioEjemplo.toLocaleString('es-ES')}€.`,
    },
    {
      q: '¿Qué incluye la asesoría de compra?',
      a: 'Gestor asignado, revisión de contrato de reserva y arras, análisis de nota simple, verificación de documentación técnica, coordinación con notaría y asesoramiento continuo hasta la firma de escritura.',
    },
    {
      q: '¿Puedo comprar sin agencia inmobiliaria?',
      a: 'Sí. Inmonest no es agencia: somos gestoría. No cobramos porcentaje sobre el precio del piso. Te acompañamos jurídicamente sin conflicto de interés con el vendedor.',
    },
    {
      q: `¿Conocéis la normativa de ${region}?`,
      a: `Sí. Revisamos la documentación exigida en ${nombre}: cédula de habitabilidad, certificado energético, inspecciones técnicas obligatorias y requisitos autonómicos que muchas operaciones entre particulares omiten.`,
    },
    {
      q: '¿Cuándo debo contratar el servicio?',
      a: 'Lo ideal es antes de firmar la reserva o inmediatamente después. Cuanto antes revisemos contratos y documentación, más margen tienes para renegociar o desistir sin pérdidas.',
    },
  ]

  return prioritarias.length > 0 ? [...prioritarias, ...base] : base
}
