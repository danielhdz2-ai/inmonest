import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'

export function getVentaCompletaFaq(
  nombre: string,
  region: string,
  precioEjemplo: number,
  prioritarias: DueDiligenceFaqItem[] = []
): DueDiligenceFaqItem[] {
  const comisionMin = Math.round(precioEjemplo * 0.03)
  const comisionMax = Math.round(precioEjemplo * 0.05)

  const base: DueDiligenceFaqItem[] = [
    {
      q: `¿Cuánto cuesta vender mi piso en ${nombre} con gestoría?`,
      a: `687€ IVA incluido por acompañamiento completo desde que tienes comprador hasta escritura. Frente a ${comisionMin.toLocaleString('es-ES')}–${comisionMax.toLocaleString('es-ES')}€ de comisión de agencia (3-5%) en un piso de ${precioEjemplo.toLocaleString('es-ES')}€.`,
    },
    {
      q: '¿Qué incluye el servicio de venta completa?',
      a: 'Gestor inmobiliario asignado, redacción o revisión de contrato de reserva y arras, recogida y verificación de toda la documentación, coordinación con notaría, asesoramiento fiscal básico (plusvalía, IRPF) y acompañamiento hasta que firmas la escritura.',
    },
    {
      q: '¿Ya tengo comprador particular, me sirve?',
      a: 'Sí, es exactamente para eso. No buscamos comprador ni hacemos de agencia. Te ayudamos cuando ya has llegado a un acuerdo de precio con un particular y necesitas cerrar la venta con todas las garantías.',
    },
    {
      q: `¿Conocéis la documentación exigida en ${region}?`,
      a: `Sí. Conocemos los requisitos autonómicos de ${nombre}: cédula de habitabilidad, certificado energético, inspecciones técnicas obligatorias y particularidades del Registro de la Propiedad local.`,
    },
    {
      q: '¿Cuándo debo contratar el servicio?',
      a: 'Lo ideal es en cuanto tengas comprador o antes de firmar reserva/arras. Si ya firmaste contratos, también podemos revisarlos y ayudarte con la documentación y notaría.',
    },
    {
      q: '¿Cuánto tarda el proceso hasta escritura?',
      a: 'Normalmente entre 1 y 3 meses, según si el comprador necesita hipoteca, la disponibilidad de notaría y el tiempo en conseguir documentación. Tu gestor te da un calendario realista desde el primer día.',
    },
  ]

  return prioritarias.length > 0 ? [...prioritarias, ...base] : base
}
