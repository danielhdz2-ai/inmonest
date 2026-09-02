import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type ContratoServicioProfundo = {
  id: string
  kicker: string
  titulo: string
  intro: string
  beneficios: string[]
  extra: string
  imagen: string
  imagenAlt: string
  precio: number
  precioNota?: string
  ctaHref: string
  ctaLabel: string
  ctaSecundarioHref?: string
  ctaSecundarioLabel?: string
  invertido?: boolean
}

export const CONTRATOS_SERVICIOS_PROFUNDOS: ContratoServicioProfundo[] = [
  {
    id: 'arras',
    kicker: 'Contrato de arras',
    titulo: '¿Necesitáis un contrato de arras?',
    intro:
      'En Inmonest tenemos gestores especializados preparados para ayudarte a redactar unas arras seguras: con toda la seguridad jurídica, adaptadas a vuestra operación concreta y revisadas por profesionales que conocen la normativa de vuestra CCAA.',
    beneficios: [
      'Arras penitenciales o confirmatorias personalizadas con datos reales de las partes',
      'Revisión de nota simple registral antes de firmar la señal',
      'Cláusulas de desistimiento, penalización e incumplimiento bien definidas',
      'Protección frente a plantillas genéricas que generan conflictos costosos',
      'PDF firmable en 48 h con revisiones incluidas en los 7 días siguientes',
      'Gestor asignado con teléfono directo y seguimiento en vuestro panel',
    ],
    extra:
      'Comprar o vender entre particulares sin agencia no significa renunciar a seguridad. Al contrario: un contrato de arras bien redactado os protege a comprador y vendedor antes de la escritura, fija plazos, importes y consecuencias si alguien se echa atrás.',
    imagen: '/gestoria1.jpg',
    imagenAlt: 'Gestor inmobiliario redactando contrato de arras penitenciales',
    precio: getPrecioServicio('arras-penitenciales') ?? 145,
    precioNota: 'Arras penitenciales · IVA incluido',
    ctaHref: '/gestoria/solicitar/arras-penitenciales',
    ctaLabel: 'Solicitar contrato de arras',
    ctaSecundarioHref: '/gestoria/solicitar/pack-arras-revision-documental',
    ctaSecundarioLabel: 'Pack arras + revisión documental',
  },
  {
    id: 'alquiler',
    kicker: 'Alquiler LAU',
    titulo: '¿Tienes inquilino y necesitas un contrato de alquiler profesional?',
    intro:
      'En Inmonest te ayudamos a tramitar un expediente con la máxima profesionalidad y seguridad: contratos adaptados a la LAU y a la Ley de Vivienda 2026, con las cláusulas más importantes revisadas una a una y toda la seguridad jurídica que necesitas como propietario o arrendador.',
    beneficios: [
      'Contrato de arrendamiento de vivienda habitual actualizado a normativa 2026',
      'Fianza, garantías adicionales y actualización de renta (IPC) correctamente reguladas',
      'Cláusulas sobre mascotas, subarriendo, obras y resolución anticipada sin sorpresas',
      'Inventario profesional a tu medida incluido como anexo del contrato',
      'Estado del inmueble, mobiliario y entrega de llaves documentados por escrito',
      'Expediente trazable en panel: subes documentación y sigues cada hito con tu gestor',
    ],
    extra:
      'Un alquiler mal formalizado puede acabar en impago, fianza retenida o litigio por cláusulas nulas. Nosotros redactamos el contrato pensando en tu tranquilidad a largo plazo, no en rellenar un PDF genérico de internet.',
    imagen: '/gestoria7.jpg',
    imagenAlt: 'Contrato de alquiler LAU redactado por gestoría Inmonest',
    precio: getPrecioServicio('contrato-alquiler') ?? 145,
    precioNota: 'Alquiler LAU + inventario · IVA incluido',
    ctaHref: '/gestoria/solicitar/contrato-alquiler',
    ctaLabel: 'Solicitar contrato de alquiler',
    ctaSecundarioHref: '/gestoria/contrato-alquiler',
    ctaSecundarioLabel: 'Más sobre alquiler LAU',
    invertido: true,
  },
  {
    id: 'acompanamiento-compra',
    kicker: 'Acompañamiento de compra',
    titulo: '¿Compras como particular y necesitas ayuda en todo el proceso?',
    intro:
      'Tenemos un servicio adaptado a todas las necesidades del comprador entre particulares: te redactamos las arras, un asesor experto te acompaña en todo el trámite de compra hasta la escritura, por un precio fijo y sin comisiones de agencia sobre el piso.',
    beneficios: [
      'Tarifa plana 687 € — sin porcentaje sobre el precio del inmueble',
      'Gestor asignado en menos de 24 h con WhatsApp y teléfono directo',
      'Revisión de reserva, arras, nota simple, cargas y documentación de comunidad',
      'Trabajamos para ti como comprador, no para el vendedor ni la agencia',
      'Coordinación con notaría y checklist hasta el día de la firma',
      'Evitas errores de miles de euros: derramas ocultas, ITE pendiente o arras abusivas',
    ],
    extra:
      'Comprar piso sin agencia ahorra comisiones, pero no elimina el riesgo jurídico. Nuestro servicio completo cubre desde la reserva hasta las llaves con un profesional que conoce tu expediente de principio a fin.',
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Asesor Inmonest acompañando compra de vivienda entre particulares',
    precio: getPrecioServicio('compra-completa-reserva-escritura') ?? 687,
    precioNota: 'Reserva a escritura · IVA incluido · sin comisión',
    ctaHref: '/gestoria/solicitar/compra-completa-reserva-escritura',
    ctaLabel: 'Contratar acompañamiento de compra',
    ctaSecundarioHref: '/gestoria/asesoria-compra-piso',
    ctaSecundarioLabel: 'Ver servicio en detalle',
  },
]
