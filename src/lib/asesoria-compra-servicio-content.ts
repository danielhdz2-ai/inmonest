import { ASESORIA_COMPRA_PRECIO } from './asesoria-compra-ciudad-data'

export type AsesoriaCompraServicioBloque = {
  id: string
  kicker: string
  titulo: string
  intro: string
  pasos: string[]
  incluye: string[]
  imagen: string
  imagenAlt: string
  invertido?: boolean
}

/** Contenido idéntico en todas las landings /gestoria/asesoria-compra-piso/[ciudad] */
export const ASESORIA_COMPRA_SERVICIO_BLOQUES: AsesoriaCompraServicioBloque[] = [
  {
    id: 'primera-llamada',
    kicker: 'Paso 1',
    titulo: 'Primera llamada con tu gestor inmobiliario',
    intro:
      'En menos de 24 horas un gestor experto — no un call center — analiza tu operación: precio pactado, plazos del vendedor, hipoteca en trámite, barrio del inmueble y documentación que ya tienes o falta por recabar.',
    pasos: [
      'Videollamada, llamada telefónica o WhatsApp: tú eliges el canal.',
      'Repasamos reserva firmada, borrador de arras del vendedor o situación previa a la señal.',
      'Detectamos riesgos inmediatos: plazos imposibles, cláusulas desequilibradas o documentación ausente.',
      'Te explicamos qué incluyen los 687 € y el calendario realista hasta escritura.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Análisis de la operación sin compromiso antes de contratar',
      'Asesoramiento jurídico inicial sobre tu caso concreto',
      '100 % online — ideal si compras desde otra provincia',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Primera llamada con gestor inmobiliario Inmonest para comprar piso',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el servicio — ${ASESORIA_COMPRA_PRECIO} € IVA incluido`,
    intro:
      'Tarifa plana sin comisión sobre el precio del piso. En un piso de 300.000 € una agencia cobraría 9.000–15.000 €; con Inmonest pagas 687 € fijos y empezamos a trabajar de inmediato en tu expediente.',
    pasos: [
      'Contratación online en minutos o confirmación tras la primera llamada.',
      'Asignación formal de tu gestor y apertura del panel de seguimiento.',
      'Plan de trabajo con hitos: reserva, arras, documentación, notaría y escritura.',
      'Sin letra pequeña: un único precio por todo el acompañamiento hasta las llaves.',
    ],
    incluye: [
      `${ASESORIA_COMPRA_PRECIO} € IVA incluido — sin % sobre el inmueble`,
      'Panel online para subir documentos y ver el estado del expediente',
      'Factura y contrato de prestación de servicios',
      'Mismo gestor de principio a fin',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación del servicio de asesoría compra Inmonest',
    invertido: true,
  },
  {
    id: 'reserva-arras',
    kicker: 'Paso 3',
    titulo: 'Reserva, arras penitenciales y firma electrónica',
    intro:
      'Redactamos o revisamos los contratos intermedios pensando en tu interés como comprador. Si hace falta, enviamos firma electrónica para que comprador y vendedor firmen cómodamente, con validez legal y trazabilidad.',
    pasos: [
      'Revisión de reserva de compra y contrato de arras del vendedor.',
      'Redacción de arras equilibradas: plazos, señal, cláusula suspensiva de hipoteca y penalizaciones.',
      'Envío por firma electrónica cuando las partes lo prefieren — sin desplazamientos innecesarios.',
      'Explicación cláusula a cláusula antes de que entregues un euro de señal.',
    ],
    incluye: [
      'Arras penitenciales o confirmatorias adaptadas a la CCAA',
      'Condición suspensiva de financiación con plazos realistas',
      'Firma electrónica opcional para comprador y vendedor',
      'Revisiones del borrador hasta que estés seguro de firmar',
    ],
    imagen: '/contratodearras.jpg',
    imagenAlt: 'Redacción de contrato de arras para comprador particular',
  },
  {
    id: 'documentacion-vendedor',
    kicker: 'Paso 4',
    titulo: 'Revisión integral de la documentación del vendedor',
    intro:
      'Auditamos toda la documentación que el vendedor debe aportar antes de escritura. Trabajamos para ti, no para quien paga la comisión: detectamos cargas, derramas, ITE pendiente o incoherencias catastro-registro antes de que sea tarde.',
    pasos: [
      'Nota simple registral: titularidad, cargas, hipotecas y usufructos.',
      'Actas de comunidad, certificado de deudas y derramas pendientes.',
      'Cédula de habitabilidad, certificado energético e ITE/IEE si aplica.',
      'IBI al corriente, licencias de obra en reformas y coherencia catastro-registro.',
      'Informe claro con hallazgos y opciones: renegociar, condicionar o desistir.',
    ],
    incluye: [
      'Due diligence documental orientada al comprador',
      'Checklist completo exigido en notaría',
      'Detección de derramas ocultas y cargas registrales',
      'Asesoramiento jurídico sobre cada hallazgo',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Revisión documental de compraventa entre particulares',
    invertido: true,
  },
  {
    id: 'notaria',
    kicker: 'Paso 5',
    titulo: 'Coordinación con notaría: presupuestos, trámites y oficial',
    intro:
      'Somos el hilo conductor con el oficial de la notaría: preparamos el expediente, pedimos presupuestos si lo necesitas, te ayudamos a elegir notaría y verificamos que nada falte antes del día de firma.',
    pasos: [
      'Recopilación y validación de toda la documentación para el notario.',
      'Solicitud de presupuestos notariales y comparativa cuando lo pidas.',
      'Búsqueda y recomendación de notarías según ubicación y disponibilidad.',
      'Coordinación directa con el oficial: envío de expediente y resolución de requerimientos.',
      'Verificación final previa a la firma: sabes qué firmar y cuánto pagarás.',
    ],
    incluye: [
      'Contacto con el oficial de la notaría en tu nombre',
      'Orientación sobre ITP, gastos de notaría y registro',
      'Expediente completo sin sorpresas el día de escritura',
      'Acompañamiento remoto el día de la firma si lo necesitas',
    ],
    imagen: '/gestoria17.jpg',
    imagenAlt: 'Coordinación con notaría para escritura pública de compraventa',
  },
  {
    id: 'escritura',
    kicker: 'Paso 6',
    titulo: 'Escritura pública y entrega de llaves',
    intro:
      'Te acompañamos hasta la firma en notaría y confirmamos que la operación se cierra correctamente: hipoteca desembolsada, precio en manos del vendedor y llaves en las tuyas, con la tranquilidad de haber revisado todo antes.',
    pasos: [
      'Repaso final de condiciones y importes antes de ir a notaría.',
      'Soporte el día de la firma: dudas de última hora resueltas por tu gestor.',
      'Verificación de que el desembolso hipotecario y pagos encajan con lo acordado.',
      'Confirmación de cierre: operación completada y llaves entregadas.',
    ],
    incluye: [
      'Acompañamiento hasta escritura pública',
      'Resolución de incidencias de última hora',
      'Seguimiento post-firma si surge alguna gestión pendiente',
      'Tranquilidad de haber comprado con revisión profesional',
    ],
    imagen: '/gestoria12.jpg',
    imagenAlt: 'Escritura pública de compraventa de vivienda',
    invertido: true,
  },
  {
    id: 'gestor-siempre',
    kicker: 'Siempre contigo',
    titulo: 'Gestor asignado, 100 % online y asesoramiento jurídico continuo',
    intro:
      'No desaparecemos tras enviar un PDF. Tu gestor responde por llamada, WhatsApp y correo cuando lo necesites — asesoramiento personalizado y jurídico en cada fase, de la primera llamada a las llaves.',
    pasos: [
      'Canal directo con tu gestor: teléfono, WhatsApp y email.',
      'Respuesta ágil en horario laboral y seguimiento proactivo del expediente.',
      'Panel online para documentos, mensajes y estado de cada hito.',
      'Videollamadas cuando la operación lo requiera — sin citas presenciales obligatorias.',
    ],
    incluye: [
      'Servicio 100 % online en toda España',
      'Un solo gestor conoce tu operación al detalle',
      'Asesoramiento jurídico personalizado, no plantillas genéricas',
      'Disponibilidad para dudas en cualquier momento del proceso',
    ],
    imagen: '/gestora6.jpg',
    imagenAlt: 'Gestor inmobiliario Inmonest disponible por WhatsApp y teléfono',
  },
]

export const ASESORIA_COMPRA_SERVICIO_NAV = ASESORIA_COMPRA_SERVICIO_BLOQUES.map((b) => ({
  id: b.id,
  label: b.kicker,
}))
