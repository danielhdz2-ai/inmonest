import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export const CONTRATO_ARRAS_SERVICIO_PRECIO = getPrecioServicio('arras-penitenciales') ?? 145

export type ContratoArrasServicioBloque = {
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

export const CONTRATO_ARRAS_SERVICIO_BLOQUES: ContratoArrasServicioBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Llamada con tu gestor: le explicas la compraventa',
    intro:
      'En menos de 24 horas un gestor inmobiliario real entiende tu operación: ¿comprador o vendedor?, precio, señal acordada, hipoteca, plazo a escritura y si el inmueble tiene cargas. Te orientamos antes de pagar.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos si necesitas arras penitenciales u otro documento previo.',
      'Detectamos riesgos: financiación, usufructo, derramas, ITE o herencias.',
      'Resolvemos dudas sobre precio cerrado, plazos y documentación inicial.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento sobre arras y compraventa entre particulares',
      '100 % online — válido en toda España',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor para contrato de arras penitenciales',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el servicio — ${CONTRATO_ARRAS_SERVICIO_PRECIO} € IVA incluido`,
    intro:
      'Pagas la tarifa plana online y se abre tu expediente en el panel. Un único precio por la redacción profesional de las arras — sin comisión sobre el precio del piso.',
    pasos: [
      'Contratación en minutos desde la landing o tras la primera llamada.',
      'Confirmación de pago y apertura de mi-cuenta/contratos.',
      'Asignación de gestor y plazo orientativo de entrega (48 h laborables).',
      'Plan claro: documentación → redacción → borrador → entrega firmable.',
    ],
    incluye: [
      `${CONTRATO_ARRAS_SERVICIO_PRECIO} € IVA incluido — precio cerrado`,
      'Panel de seguimiento desde el primer minuto',
      'Factura y contrato de prestación de servicios',
      'Mismo gestor hasta la entrega del PDF',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online del contrato de arras Inmonest',
    invertido: true,
  },
  {
    id: 'documentacion',
    kicker: 'Paso 3',
    titulo: 'Subes la documentación al panel o se la envías al gestor',
    intro:
      'Centralizamos datos de comprador, vendedor e inmueble. Adjuntas nota simple, DNI, precio pactado y condiciones en el panel o por WhatsApp; el gestor te indica qué falta.',
    pasos: [
      'Datos de las partes (DNI/CIF, domicilio, contacto).',
      'Dirección registral, precio de venta, importe de señal y plazo a escritura.',
      'Nota simple registral o datos para solicitarla.',
      'Condiciones suspensivas acordadas (hipoteca, licencias, etc.).',
    ],
    incluye: [
      'Checklist arras en el panel (comprador / vendedor / inmueble)',
      'Subida segura de documentos o envío al gestor',
      'Recordatorios hasta completar el 100 %',
      'Sin desplazamientos a ninguna oficina',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Documentación para contrato de arras en panel online',
  },
  {
    id: 'redaccion',
    kicker: 'Paso 4',
    titulo: 'El gestor redacta las arras penitenciales a medida',
    intro:
      'Con la documentación completa, redactamos el contrato de arras con cláusulas de penalización, desistimiento, financiación, plazo de escritura y objeto del inmueble conforme a la operación real.',
    pasos: [
      'Redacción personalizada — no plantilla genérica.',
      'Revisión de coherencia con nota simple y datos de las partes.',
      'Cláusulas suspensivas de hipoteca u otras condiciones pactadas.',
      'Expedientes separados si también contratas alquiler u otro servicio.',
    ],
    incluye: [
      'Contrato de arras penitenciales',
      'Cláusulas revisadas por gestor inmobiliario',
      'Mención de plazo y condiciones de escritura',
      'Seguimiento visible en el panel (“En elaboración”)',
    ],
    imagen: '/contrato6.jpg',
    imagenAlt: 'Redacción jurídica del contrato de arras penitenciales',
    invertido: true,
  },
  {
    id: 'borrador',
    kicker: 'Paso 5',
    titulo: 'Te enviamos borrador para revisar con calma',
    intro:
      'Recibes el PDF borrador por panel y email. Tu gestor explica señal, penalizaciones, hipoteca y plazo a escritura — y ajusta el texto hasta que comprador y vendedor estén conformes.',
    pasos: [
      'Envío del borrador de arras en PDF.',
      'Revisión cláusula a cláusula por WhatsApp, llamada o videollamada.',
      'Rondas de ajuste incluidas en el precio cerrado.',
      'Orientación sobre firma digital FIRMACERT (eIDAS) si lo preferís.',
    ],
    incluye: [
      'Revisiones del borrador antes de la firma',
      'Asesoramiento en cláusulas no estándar',
      'PDF firmable digitalmente',
      'Respuesta ágil en horario laborable',
    ],
    imagen: '/gestoria7.jpg',
    imagenAlt: 'Revisión del borrador de arras con el gestor',
  },
  {
    id: 'firma',
    kicker: 'Paso 6',
    titulo: 'Firma, señal y camino a la escritura',
    intro:
      'El contrato recoge el importe de la señal, consecuencias del desistimiento y fecha orientativa de escritura. Te orientamos sobre el orden práctico: firma de arras, ingreso de señal y documentación pendiente antes de notaría.',
    pasos: [
      'Cláusulas de señal y penalización redactadas con claridad.',
      'Recordatorio de condiciones suspensivas antes de entregar la señal.',
      'Coordinación de dudas de última hora entre las partes.',
      'Orientación sobre el siguiente paso hacia la escritura pública.',
    ],
    incluye: [
      'Texto alineado con compraventa entre particulares',
      'Orientación práctica sobre señal e ingreso',
      'Contrato listo para firmar entre las partes',
      'Soporte post-entrega breve para dudas de ejecución',
    ],
    imagen: '/gestoria6.jpg',
    imagenAlt: 'Firma de arras penitenciales y señal',
    invertido: true,
  },
  {
    id: 'siempre-online',
    kicker: 'Siempre contigo',
    titulo: 'Gestor asignado, 100 % online y seguimiento en el panel',
    intro:
      'No enviamos un Word y desaparecemos. Tu gestor acompaña todo el trámite por teléfono, WhatsApp y panel: documentos, mensajes, estado del expediente y entrega del contrato firmable.',
    pasos: [
      'Canal directo con tu gestor: teléfono, WhatsApp y email.',
      'Panel en mi-cuenta/contratos: progreso, documentos y descargas.',
      'Videollamada cuando hace falta revisar el borrador en detalle.',
      'Firma electrónica FIRMACERT incluida en el servicio.',
    ],
    incluye: [
      'Trámite 100 % online en toda España',
      'Un solo gestor conoce tu operación al detalle',
      'Asesoramiento personalizado, no plantillas genéricas',
      'Disponibilidad para dudas en cada fase',
    ],
    imagen: '/gestora6.jpg',
    imagenAlt: 'Gestor Inmonest — contrato de arras online',
  },
]
