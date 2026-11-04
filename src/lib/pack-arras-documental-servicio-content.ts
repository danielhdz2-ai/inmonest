import { PACK_ARRAS_DOCUMENTAL_PRECIO } from '@/lib/pack-arras-documental-ciudad-data'

export type PackArrasDocumentalServicioBloque = {
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

const P = PACK_ARRAS_DOCUMENTAL_PRECIO

export const PACK_ARRAS_DOCUMENTAL_SERVICIO_BLOQUES: PackArrasDocumentalServicioBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Llamada con tu gestor: explicas la compra y el piso',
    intro:
      'En menos de 24 horas un gestor inmobiliario real — no un call center — entiende tu operación: precio con el vendedor particular, importe de señal, hipoteca, plazo a escritura y qué documentación te han pasado. Te orientamos antes de pagar el pack — online, WhatsApp o cita en Les Corts si estás en Barcelona.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos si conviene arras desde cero o corregir el borrador del vendedor.',
      'Detectamos riesgos: cargas, derramas, ITE, cédula Generalitat, licencias de reforma.',
      'Calendario orientativo: arras en 48 h e informe documental en 3–5 días laborables.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento solo para comprador (no defendemos al vendedor)',
      '100 % online · presencial en Les Corts sin suplemento',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor Pack Arras Plus comprador',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el Pack Arras Plus — ${P} € IVA incluido`,
    intro:
      'Pagas la tarifa plana y se abre tu expediente en el panel. Un único precio por arras penitenciales redactadas + revisión documental completa — sin comisión sobre el precio del piso ni honorarios de agencia.',
    pasos: [
      'Contratación en minutos desde la landing o tras la primera llamada.',
      'Confirmación de pago y acceso a mi-cuenta/contratos.',
      'Asignación de gestor y plan: datos → arras → auditoría → informe.',
      'Factura y contrato de prestación de servicios.',
    ],
    incluye: [
      `${P} € IVA incluido — precio cerrado`,
      'Panel de seguimiento desde el primer minuto',
      'Mismo gestor durante arras e informe documental',
      'Sin % sobre el importe de la compra',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online Pack Arras Plus Inmonest',
    invertido: true,
  },
  {
    id: 'documentacion',
    kicker: 'Paso 3',
    titulo: 'Centralizas la documentación del inmueble y las partes',
    intro:
      'Subes al panel (o envías al gestor) nota simple, actas de comunidad, certificados técnicos, IBI y borrador de arras. Checklist adaptado a Cataluña cuando compras en Barcelona: cédula, CEE, ITE si procede.',
    pasos: [
      'Datos de comprador, vendedor e inmueble (referencia catastral).',
      'Nota simple reciente y cargas registrales.',
      'Certificado de deudas de comunidad y actas (derramas).',
      'Documentación urbanística: cédula, licencias, CEE.',
    ],
    incluye: [
      'Checklist pre-arras en el panel',
      'Recordatorios de lo pendiente',
      'Canal directo WhatsApp con tu gestor',
      'Opción de entregar originales en despacho Les Corts',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Documentación compra vivienda Pack Arras Plus',
  },
  {
    id: 'arras-auditoria',
    kicker: 'Paso 4',
    titulo: 'Arras redactadas en paralelo con la auditoría documental',
    intro:
      'Redactamos o corregimos las arras penitenciales con cláusula de hipoteca, plazo a escritura y condiciones suspensivas mientras auditamos registros, comunidad y normativa autonómica. No firmes a ciegas.',
    pasos: [
      'Borrador de arras personalizado en 48 h laborables.',
      'Revisión de coherencia precio arras / precio total / cargas.',
      'Informe documental con hallazgos y semáforo de riesgos.',
      'Rondas de ajuste con el vendedor vía tu gestor.',
    ],
    incluye: [
      'Arras penitenciales equilibradas para comprador',
      'Informe PDF ejecutivo (3–5 días laborables)',
      'Asesoramiento cláusula a cláusula',
      'Orientación ITP Cataluña y provisión de fondos',
    ],
    imagen: '/contrato6.jpg',
    imagenAlt: 'Redacción arras y due diligence Pack Arras Plus',
    invertido: true,
  },
  {
    id: 'informe-seguimiento',
    kicker: 'Paso 5',
    titulo: 'Informe entregado y seguimiento hasta firmar arras con seguridad',
    intro:
      'Recibes informe escrito con recomendaciones: firmar, renegociar, incluir condiciones o desistir. Tu gestor sigue disponible por teléfono y WhatsApp para negociar con el vendedor y preparar el camino a notaría (escalable a compra completa 687 €).',
    pasos: [
      'Entrega del informe documental con riesgos priorizados.',
      'Propuesta de modificaciones al borrador de arras si hace falta.',
      'Soporte en la negociación de derramas, precio o plazos.',
      'Cierre del expediente en panel cuando arras e informe están listos.',
    ],
    incluye: [
      'Gestor no desaparece tras el PDF',
      'Enlace a compra completa 687 € si quieres gestor hasta escritura',
      'Firma digital FIRMACERT cuando proceda',
      'Cita presencial en Mejía Lequerica 44 para repaso final',
    ],
    imagen: '/gestoria-expertos-calle.jpg',
    imagenAlt: 'Seguimiento gestor Pack Arras Plus hasta firma de arras',
  },
]
