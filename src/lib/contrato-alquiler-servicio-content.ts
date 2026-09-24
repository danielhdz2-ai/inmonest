import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export const CONTRATO_ALQUILER_SERVICIO_PRECIO =
  getPrecioServicio('contrato-alquiler') ?? 145

export type ContratoAlquilerServicioBloque = {
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

export const CONTRATO_ALQUILER_SERVICIO_BLOQUES: ContratoAlquilerServicioBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Llamada con tu gestor: le explicas la situación',
    intro:
      'En menos de 24 horas un gestor inmobiliario real — no un call center — entiende tu caso: ¿eres propietario o inquilino?, ¿piso amueblado?, ¿renta y fianza acordadas?, ¿mascotas u obras? Te orientamos antes de que pagues nada.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos si el inmueble es vivienda habitual LAU o necesitas otro documento.',
      'Detectamos cláusulas sensibles: actualización de renta, garantías, inventario, depósito de fianza.',
      'Resolvemos dudas sobre plazos, precio cerrado y qué documentación hará falta.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento sobre LAU y Ley de Vivienda 2026',
      '100 % online — válido aunque el piso esté en otra provincia',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor inmobiliario para contrato de alquiler LAU',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el servicio — ${CONTRATO_ALQUILER_SERVICIO_PRECIO} € IVA incluido`,
    intro:
      'Pagas la tarifa plana online y se abre tu expediente en el panel. Sin comisión sobre la renta mensual ni costes ocultos: un único precio por la redacción profesional del LAU y el inventario.',
    pasos: [
      'Contratación en minutos desde la landing o tras la primera llamada.',
      'Confirmación de pago y apertura de mi-cuenta/contratos.',
      'Asignación de gestor y plazo orientativo de entrega (48 h laborables).',
      'Plan claro: documentación → redacción → borrador → entrega firmable.',
    ],
    incluye: [
      `${CONTRATO_ALQUILER_SERVICIO_PRECIO} € IVA incluido — precio cerrado`,
      'Panel de seguimiento desde el primer minuto',
      'Factura y contrato de prestación de servicios',
      'Mismo gestor hasta la entrega del PDF',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online del contrato de alquiler Inmonest',
    invertido: true,
  },
  {
    id: 'documentacion',
    kicker: 'Paso 3',
    titulo: 'Subes la documentación al panel o se la envías al gestor',
    intro:
      'Centralizamos datos del arrendador, inquilino e inmueble. Puedes adjuntar todo en el panel de cliente o enviarlo por email/WhatsApp; el gestor te indica qué falta en un checklist LAU.',
    pasos: [
      'Datos de las partes (DNI/CIF, domicilio, contacto).',
      'Dirección del inmueble, renta, fianza y fecha de inicio.',
      'Inventario de mobiliario (fotos o listado) si el piso va amueblado.',
      'Certificado energético y documentación de comunidad si aplica.',
      'Si también contrataste arras u otro servicio, cada expediente tiene su carpeta.',
    ],
    incluye: [
      'Checklist LAU en el panel (arrendador / inquilino / inmueble)',
      'Subida segura de documentos o envío al gestor por canal directo',
      'Recordatorios de lo pendiente hasta completar el 100 %',
      'Sin desplazamientos a ninguna oficina',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Subida de documentación para contrato de alquiler en panel online',
  },
  {
    id: 'redaccion',
    kicker: 'Paso 4',
    titulo: 'El gestor redacta el LAU y el anexo de inventario',
    intro:
      'Con la documentación completa, el gestor trabaja el borrador del contrato de arrendamiento (LAU) y el inventario como anexo. Cláusulas de actualización de renta, fianza, obras, impago y duración conforme a la normativa vigente.',
    pasos: [
      'Redacción personalizada — no plantilla genérica descargada.',
      'Adaptación a Ley de Vivienda 2026 (IPC, gran tenedor, garantías).',
      'Anexo de inventario y estado del inmueble cuando procede.',
      'Si tienes otro encargo (p. ej. arras), se gestiona en expedientes separados con el mismo gestor.',
    ],
    incluye: [
      'Contrato LAU de vivienda habitual',
      'Inventario detallado como anexo',
      'Cláusulas revisadas por gestor inmobiliario',
      'Seguimiento visible en el panel (“En elaboración”)',
    ],
    imagen: '/contratodealquiler.jpg',
    imagenAlt: 'Redacción jurídica del contrato de alquiler LAU',
    invertido: true,
  },
  {
    id: 'borrador',
    kicker: 'Paso 5',
    titulo: 'Te enviamos borrador e inventario para revisar',
    intro:
      'Recibes el PDF borrador por panel y email. Tu gestor explica cláusulas críticas (fianza, subida de renta, rescisión, mascotas) y ajusta el texto hasta que ambas partes estén conformes antes de firmar.',
    pasos: [
      'Envío del borrador LAU + inventario en PDF.',
      'Revisión cláusula a cláusula por WhatsApp, llamada o videollamada.',
      'Rondas de ajuste incluidas en el precio cerrado.',
      'Orientación sobre firma digital FIRMACERT (eIDAS) si lo preferís.',
    ],
    incluye: [
      'Revisiones del borrador antes de la firma definitiva',
      'Asesoramiento en cláusulas no estándar',
      'PDF firmable digitalmente',
      'Respuesta ágil en horario laborable',
    ],
    imagen: '/gestoria7.jpg',
    imagenAlt: 'Revisión del borrador de contrato de alquiler con el gestor',
  },
  {
    id: 'fianza',
    kicker: 'Paso 6',
    titulo: 'Te ayudamos a tramitar la fianza',
    intro:
      'El contrato recoge el importe de la fianza legal y las garantías adicionales dentro de los límites LAU. Te orientamos sobre el depósito ante el organismo autonómico correspondiente y los plazos que tiene el arrendador para ingresarla.',
    pasos: [
      'Cláusula de fianza y depósito redactada con claridad.',
      'Indicaciones según tu comunidad autónoma (dónde y cuándo ingresar).',
      'Distinción entre fianza legal y garantías adicionales permitidas.',
      'Dudas de última hora resueltas antes de entregar las llaves.',
    ],
    incluye: [
      'Texto LAU alineado con depósito autonómico',
      'Orientación práctica (no sustituye gestoría presencial de depósito si la exige la CCAA)',
      'Contrato listo para firmar entre las partes',
      'Soporte post-entrega breve para dudas de fianza',
    ],
    imagen: '/gestoria6.jpg',
    imagenAlt: 'Tramitación de fianza de alquiler conforme a LAU',
    invertido: true,
  },
  {
    id: 'siempre-online',
    kicker: 'Siempre contigo',
    titulo: 'Gestor asignado, 100 % online y seguimiento en el panel',
    intro:
      'No enviamos un Word y desaparecemos. Tu gestor acompaña todo el trámite por teléfono, WhatsApp y panel: documentos, mensajes, estado del expediente y entrega del LAU firmable — sin citas presenciales obligatorias.',
    pasos: [
      'Canal directo con tu gestor: teléfono, WhatsApp y email.',
      'Panel en mi-cuenta/contratos: progreso, documentos y descargas.',
      'Videollamada cuando hace falta revisar el borrador en detalle.',
      'Firma electrónica FIRMACERT incluida en el servicio.',
    ],
    incluye: [
      'Trámite 100 % online en toda España',
      'Un solo gestor conoce tu alquiler al detalle',
      'Asesoramiento personalizado, no plantillas genéricas',
      'Disponibilidad para dudas en cada fase',
    ],
    imagen: '/gestora6.jpg',
    imagenAlt: 'Gestor inmobiliario Inmonest — servicio online de alquiler LAU',
  },
]

export const CONTRATO_ALQUILER_SERVICIO_NAV = CONTRATO_ALQUILER_SERVICIO_BLOQUES.map((b) => ({
  id: b.id,
  label: b.kicker,
}))
