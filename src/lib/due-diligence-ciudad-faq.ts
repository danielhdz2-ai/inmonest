export type DueDiligenceFaqItem = { q: string; a: string }

export function getDueDiligenceFaq(nombre: string, region: string): DueDiligenceFaqItem[] {
  return [
    {
      q: '¿Qué incluye exactamente el informe de Due Diligence?',
      a: `Recibes un informe escrito con el resultado de la revisión documental: titularidad registral, cargas y gravámenes, deudas de comunidad, IBI y suministros, cédula de habitabilidad, certificado energético, ITE/IEE si aplica y licencias de obra. Tu gestor te explica cada hallazgo y qué implica antes de ir a notaría en ${nombre}.`,
    },
    {
      q: '¿Cuánto tarda el proceso completo?',
      a: 'Tras contratar, tu gestor te contacta en menos de 24 horas. La recopilación de documentación suele tardar entre 3 y 7 días laborables, según la rapidez del vendedor. El informe se entrega en cuanto tenemos toda la documentación verificada, normalmente en una o dos semanas desde el inicio.',
    },
    {
      q: '¿Qué pasa si encontráis un problema grave?',
      a: 'Te lo comunicamos de inmediato con detalle: derramas pendientes, cargas ocultas, deudas de comunidad o documentación incompleta. Tu gestor te asesora sobre las opciones: renegociar precio, exigir subsanación al vendedor, aplazar la escritura o, si el riesgo es alto, desistir de la compra antes de que sea demasiado tarde.',
    },
    {
      q: '¿Puedo contratar si ya he firmado las arras?',
      a: 'Sí, es uno de los momentos más habituales. Muchos compradores contratan el Due Diligence justo después de firmar arras para verificar que la vivienda está en regla antes de comprometerse con la escritura definitiva.',
    },
    {
      q: `¿Conocéis la normativa específica de ${region}?`,
      a: `Sí. Revisamos la documentación exigida en ${nombre} y ${region}: cédula de habitabilidad, certificado energético, inspecciones técnicas obligatorias y requisitos autonómicos que muchas agencias no comprueban en operaciones entre particulares.`,
    },
    {
      q: '¿Por qué 350€ y no una comisión de agencia del 3-5%?',
      a: 'Inmonest es gestoría, no agencia inmobiliaria. Cobramos tarifa plana por revisar la operación y protegerte jurídicamente. No llevamos comisión sobre el precio del piso ni tenemos conflicto de interés con el vendedor: trabajamos solo para ti.',
    },
    {
      q: '¿El gestor me acompaña hasta la escritura?',
      a: 'Sí. El mismo gestor que revisa la documentación resuelve tus dudas durante todo el proceso hasta el día de la firma en notaría. No te dejamos solo tras entregar el informe.',
    },
    {
      q: '¿Qué documentación necesito para empezar?',
      a: 'Con la referencia catastral, dirección del inmueble y copia del contrato de arras (si ya lo tienes) podemos iniciar. Tu gestor solicita al vendedor la nota simple, certificados de comunidad, IBI, cédula y el resto de documentación oficial.',
    },
  ]
}
