export type CompletaPaso = { paso: string; titulo: string; desc: string }

export const VENTA_COMPLETA_CINCO_PASOS: CompletaPaso[] = [
  {
    paso: '1',
    titulo: 'Contratas el pack 687 €',
    desc: 'Cuéntanos que ya tienes comprador en Barcelona. Abres expediente en el panel y te asignamos gestor en 24 h.',
  },
  {
    paso: '2',
    titulo: 'Estudio de la operación',
    desc: 'Revisamos precio pactado, plazos, hipoteca del comprador, arras previas y documentación disponible del inmueble.',
  },
  {
    paso: '3',
    titulo: 'Reserva y arras profesionales',
    desc: 'Redactamos o corregimos contratos adaptados a Cataluña: señal, plazo a escritura, penalizaciones e ITP coherente.',
  },
  {
    paso: '4',
    titulo: 'Documentación para notaría',
    desc: 'Cédula, certificado energético, comunidad, IBI, nota simple y cancelación de hipoteca si procede — checklist cerrado.',
  },
  {
    paso: '5',
    titulo: 'Escritura y venta cerrada',
    desc: 'Coordinamos con notaría, verificamos minuta y te acompañamos el día de la firma. Sin comisión sobre el precio del piso.',
  },
]

export const COMPRA_COMPLETA_CINCO_PASOS: CompletaPaso[] = [
  {
    paso: '1',
    titulo: 'Contratas compra completa 687 €',
    desc: 'Indica barrio y estado de la negociación. Panel online + gestor Daniel Hernández (o equipo) en menos de 24 h.',
  },
  {
    paso: '2',
    titulo: 'Due diligence documental',
    desc: 'Nota simple, comunidad, derramas, ITE, cédula y coherencia catastral antes de entregar señal elevada.',
  },
  {
    paso: '3',
    titulo: 'Revisión o redacción de arras',
    desc: 'Cláusula de hipoteca, plazos realistas, cargas del vendedor y condiciones suspensivas a tu favor como comprador.',
  },
  {
    paso: '4',
    titulo: 'Seguimiento hasta pre-escritura',
    desc: 'Coordinación con banco, vendedor y notaría. Subes PDFs al panel; el gestor responde por WhatsApp y videollamada.',
  },
  {
    paso: '5',
    titulo: 'Escritura con garantías',
    desc: 'Llegas a notaría con expediente ordenado: ITP, provisión de fondos y minuta entendida. Sin pagar comisión de agencia.',
  },
]
