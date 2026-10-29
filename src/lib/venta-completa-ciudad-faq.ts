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
    {
      q: '¿687 € incluye notaría, registro o plusvalía?',
      a: 'No. Es la tarifa de gestoría Inmonest (contratos, documentación, coordinación y asesoramiento). Notaría, registro, plusvalía municipal (IIVTNU) e IRPF del vendedor se liquidan aparte según tarifas oficiales.',
    },
    {
      q: '¿Puedo hacer todo online desde casa?',
      a: 'Sí. Contratación, subida de PDFs, borradores y videollamadas con tu gestor. Si estás en Barcelona y prefieres presencial, cita en nuestro despacho de Les Corts sin coste adicional.',
    },
    {
      q: '¿Redactáis reserva y arras o solo revisáis?',
      a: 'Ambas: redacción personalizada desde cero o revisión y corrección de borradores que te haya pasado el comprador o una agencia, adaptados a tu operación y a la normativa autonómica.',
    },
    {
      q: '¿Qué pasa si el comprador no obtiene la hipoteca?',
      a: 'Las arras deben incluir cláusula suspensiva de financiación con plazo y documentación exigible. La redactamos o corregimos para que puedas recuperar la señal si el banco deniega.',
    },
    {
      q: '¿Gestionáis la cancelación de mi hipoteca como vendedor?',
      a: 'Te orientamos sobre cancelación registral y plazos con el banco; el coste de cancelación va aparte. En arras fijamos fechas realistas para levantar la carga antes de escritura.',
    },
    {
      q: '¿Incluye encontrar comprador o hacer fotos del piso?',
      a: 'No. No somos agencia inmobiliaria: no captamos compradores ni marketing. El servicio empieza cuando ya tienes comprador o negociación avanzada con un particular.',
    },
    {
      q: '¿Cuánto ahorro respecto a una agencia en ' + nombre + '?',
      a: `En un piso de ${precioEjemplo.toLocaleString('es-ES')} € una agencia al 3–5 % cobraría ${comisionMin.toLocaleString('es-ES')}–${comisionMax.toLocaleString('es-ES')} €. Frente a 687 € de gestoría el ahorro en honorarios de intermediación suele ser muy superior.`,
    },
    {
      q: '¿Trabajáis con compradores que traen gestoría propia?',
      a: 'Sí, es habitual. Coordinamos plazos, condiciones suspensivas y entrega documental para que notaría no rechace el expediente el día de la firma.',
    },
    {
      q: '¿Qué documentos suele pedir notaría en ' + region + '?',
      a: 'Entre otros: DNI/NIE, escrituras, nota simple reciente, certificado energético, cédula de habitabilidad, certificado de deudas de comunidad, IBI al corriente y licencias si hubo obras. Te guiamos paso a paso.',
    },
    {
      q: '¿Emitís factura?',
      a: 'Sí, factura con IVA incluido y contrato de prestación de servicios con alcance claro del pack premium.',
    },
    {
      q: '¿Puedo contratar si ya firmé arras?',
      a: 'Sí, en fase arras-escritura. Revisamos lo firmado y te acompañamos en documentación y notaría; lo ideal es contratar antes de entregar señal alta.',
    },
    {
      q: '¿Hay gestor asignado con nombre y teléfono?',
      a: 'Sí. En menos de 24 h laborables tras el pago tienes gestor con WhatsApp, llamada y email directos, además del panel mi-cuenta/contratos.',
    },
    {
      q: '¿Qué diferencia hay con asesoramiento arras-venta (350 €)?',
      a: 'El asesoramiento arras-venta se centra sobre todo después de firmar arras. La venta completa cubre desde reserva (si aplica), arras, documentación integral y coordinación hasta escritura.',
    },
    {
      q: '¿Vendéis también en barrios concretos de Barcelona?',
      a: 'Sí. Tenemos landings por barrio en Barcelona (17 zonas: Eixample, Gràcia, Sants, Poblenou, Les Corts, Sarrià, Pedralbes, Sant Andreu, Horta-Guinardó, El Carmel, Ciutat Vella, El Born, La Barceloneta, Diagonal Mar, Sant Antoni, Hostafrancs, Nou Barris) con el mismo pack 687 €.',
    },
  ]

  const seen = new Set<string>()
  const merged: DueDiligenceFaqItem[] = []
  for (const item of [...prioritarias, ...base]) {
    const key = item.q.trim()
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }
  return merged
}
