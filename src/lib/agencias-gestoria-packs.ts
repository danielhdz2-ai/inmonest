/** Packs de gestoría B2B para agencias y agentes independientes */

export const AGENCIA_CONTRATO_PRECIO_REF = 145
export const AGENCIA_SLA_HORAS = '4–5 h'
export const AGENCIA_SLA_LABEL = 'Entrega en 4–5 horas laborables'

export type AgenciaGestoriaPack = {
  id: string
  nombre: string
  subtitulo: string
  contratosAnuales: number
  precioUnitario: number
  precioTotal: number
  highlight?: boolean
  idealPara: string
  features: string[]
}

export const AGENCIA_GESTORIA_PACKS: AgenciaGestoriaPack[] = [
  {
    id: 'agente',
    nombre: 'Pack Agente',
    subtitulo: 'Agentes independientes',
    contratosAnuales: 12,
    precioUnitario: 113,
    precioTotal: 1356,
    idealPara: '1–2 operaciones al mes (arras, alquiler o reserva)',
    features: [
      '12 contratos profesionales al año',
      '113 €/contrato (IVA incl.)',
      AGENCIA_SLA_LABEL,
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Redacción por gestor inmobiliario',
      'Mismo panel y flujo que particulares',
      'Créditos válidos 12 meses',
    ],
  },
  {
    id: 'agencia',
    nombre: 'Pack Agencia',
    subtitulo: 'Inmobiliarias activas',
    contratosAnuales: 36,
    precioUnitario: 110,
    precioTotal: 3960,
    highlight: true,
    idealPara: '3–4 operaciones al mes entre venta y alquiler',
    features: [
      '36 contratos profesionales al año',
      '110 €/contrato (IVA incl.)',
      AGENCIA_SLA_LABEL,
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Prioridad en cola de redacción',
      'Hasta 3 usuarios en la cuenta',
      'Plantillas con datos recurrentes de tu agencia',
      'Créditos válidos 12 meses',
    ],
  },
  {
    id: 'agencia-plus',
    nombre: 'Pack Agencia Plus',
    subtitulo: 'Alto volumen',
    contratosAnuales: 60,
    precioUnitario: 110,
    precioTotal: 6600,
    idealPara: '5+ operaciones al mes o varias oficinas',
    features: [
      '60 contratos profesionales al año',
      '110 €/contrato (IVA incl.)',
      AGENCIA_SLA_LABEL,
      'Firma electrónica certificada FIRMACERT (eIDAS)',
      'Gestor de cuenta dedicado',
      'Usuarios ilimitados',
      'Recarga de créditos extra a 115 €/ud',
      'Créditos válidos 12 meses',
    ],
  },
]

/** Contratos estándar incluidos en 1 crédito del pack */
export const AGENCIA_CONTRATOS_INCLUIDOS = [
  'Contrato de arras penitenciales',
  'Contrato de arras confirmatorias',
  'Contrato de alquiler LAU (vivienda)',
  'Contrato de reserva de compra',
  'Contrato de reserva de alquiler',
  'Contrato de compraventa',
  'Contrato de alquiler de habitación',
  'Contrato de local comercial',
  'Contrato de garaje o trastero',
  'Revisión + corrección de contrato',
] as const

export const AGENCIA_GESTORIA_WORKFLOW = [
  {
    step: '01',
    titulo: 'Contrata el pack o un contrato',
    desc: 'La agencia elige el pack anual o solicita un contrato concreto al precio de pack (110–113 €). Pago online seguro.',
  },
  {
    step: '02',
    titulo: 'Envía la documentación',
    desc: 'Subes datos de las partes, inmueble y documentos en el panel de cliente — el mismo flujo que usan los particulares.',
  },
  {
    step: '03',
    titulo: 'Llega al panel del gestor',
    desc: 'Tras el pago, el pedido y la documentación aparecen en el panel de administración de Inmonest para asignación.',
  },
  {
    step: '04',
    titulo: 'Redacción profesional',
    desc: 'Un gestor inmobiliario redacta el contrato personalizado con cláusulas adaptadas a la operación.',
  },
  {
    step: '05',
    titulo: 'Entrega en 4–5 horas',
    desc: 'Recibes el PDF firmable con firma electrónica certificada FIRMACERT en tu panel y por email, listo para las partes.',
  },
] as const

export const AGENCIA_GESTORIA_FAQ = [
  {
    q: '¿Es el mismo proceso que para particulares?',
    a: 'Sí. Compras el servicio, subes la documentación en el panel y nuestro gestor redacta el contrato. La diferencia del pack B2B es el precio por volumen (110–113 €/contrato), la entrega prioritaria en 4–5 horas y la firma electrónica certificada incluida.',
  },
  {
    q: '¿Qué contratos puedo usar con un crédito?',
    a: 'Un crédito cubre un contrato estándar: arras, alquiler LAU, reservas, compraventa, habitación, local comercial, garaje/trastero o revisión + corrección. Servicios premium (Due Diligence, Pack Arras Plus, compra completa) tienen tarifa aparte con descuento para clientes pack.',
  },
  {
    q: '¿La firma electrónica está incluida?',
    a: 'Sí. Todos los contratos del pack incluyen firma electrónica avanzada certificada con FIRMACERT (eIDAS), sin coste adicional.',
  },
  {
    q: '¿Puedo contratar solo un contrato sin pack?',
    a: 'El precio de pack (110–113 €) aplica con pack activo. Sin pack, los contratos sueltos mantienen el precio público desde 145 € con entrega en 48 h.',
  },
  {
    q: '¿Caducan los créditos mes a mes?',
    a: 'No. Los créditos del pack son válidos 12 meses desde la activación. Puedes usarlos cuando los necesites.',
  },
  {
    q: '¿Sirve para agentes independientes sin CIF de agencia?',
    a: 'Sí. El Pack Agente está pensado para agentes autónomos o colaboradores que necesitan soporte jurídico recurrente sin montar gestoría propia.',
  },
] as const

export function agenciaDescuentoPct(precioUnitario: number): number {
  return Math.round((1 - precioUnitario / AGENCIA_CONTRATO_PRECIO_REF) * 100)
}
