import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export const COMPLETA_RESERVA_ESCRITURA_PRECIO =
  getPrecioServicio('venta-completa-reserva-escritura') ?? 687

export type CompletaServicioBloque = {
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

export type CompletaServicioModo = 'venta' | 'compra'

const P = COMPLETA_RESERVA_ESCRITURA_PRECIO

export const VENTA_COMPLETA_SERVICIO_BLOQUES: CompletaServicioBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Llamada con tu gestor: le explicas la venta y al comprador',
    intro:
      'En menos de 24 h un gestor inmobiliario real entiende tu operación: precio pactado, estado de la documentación, hipoteca del comprador, plazos y si ya firmaste reserva. Te orientamos antes de comprometer la señal — online, por WhatsApp o con cita en Les Corts si estás en Barcelona.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges el canal.',
      'Repasamos si conviene empezar por reserva, arras o revisión de lo ya firmado.',
      'Detectamos riesgos: cargas registrales, ITE, derramas, herencia o hipoteca pendiente.',
      'Calendario orientativo hasta escritura y lista de documentos que faltan.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin letra pequeña oculta',
      'Asesoramiento sobre venta entre particulares (no captamos comprador)',
      '100 % online en España · presencial en Barcelona sin suplemento',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor para venta completa hasta escritura',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el pack venta completa — ${P} € IVA incluido`,
    intro:
      'Pagas la tarifa plana y se abre tu expediente en el panel. Un único precio por acompañamiento desde que tienes comprador hasta notaría — sin comisión sobre el precio del piso ni honorarios de agencia.',
    pasos: [
      'Contratación en minutos desde la landing o tras la primera llamada.',
      'Confirmación de pago y acceso a mi-cuenta/contratos.',
      'Asignación de gestor y plan: contratos → documentación → notaría → escritura.',
      'Factura y contrato de prestación de servicios premium.',
    ],
    incluye: [
      `${P} € IVA incluido — precio cerrado`,
      'Panel de seguimiento desde el primer minuto',
      'Mismo gestor durante todo el proceso de venta',
      'Sin % sobre el importe de la venta',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online pack venta completa Inmonest',
    invertido: true,
  },
  {
    id: 'reserva-arras',
    kicker: 'Paso 3',
    titulo: 'Reserva y arras redactadas o revisadas a medida',
    intro:
      'Redactamos contrato de reserva y arras penitenciales o confirmatorias (o corregimos el borrador del comprador) con plazo a escritura, señal, cláusula de financiación del comprador y penalizaciones equilibradas conforme a la normativa autonómica.',
    pasos: [
      'Recogida de datos de partes, inmueble y condiciones pactadas.',
      'Redacción personalizada — no plantilla genérica de internet.',
      'Revisión de coherencia con nota simple y precio de venta.',
      'Borrador en PDF con rondas de ajuste incluidas en el pack.',
    ],
    incluye: [
      'Contrato de reserva (si aún no lo firmaste)',
      'Contrato de arras adaptado a tu operación',
      'Asesoramiento cláusula a cláusula antes de firmar',
      'Orientación sobre ingreso de señal y orden práctico',
    ],
    imagen: '/contrato6.jpg',
    imagenAlt: 'Redacción de reserva y arras para vendedor particular',
  },
  {
    id: 'documentacion-notaria',
    kicker: 'Paso 4',
    titulo: 'Recogemos y verificamos toda la documentación para notaría',
    intro:
      'Te guiamos para conseguir nota simple, cédula de habitabilidad, certificado energético, certificado de deudas de comunidad, IBI, cancelación de hipoteca si procede y licencias de obra. Nada se queda pendiente el día de la firma.',
    pasos: [
      'Checklist por fases en el panel (subes PDFs o los envías al gestor).',
      'Verificación de titularidad, cargas y coherencia registral/catastral.',
      'Coordinación con el comprador y su gestoría si la hay.',
      'Envío ordenado del expediente a la notaría elegida.',
    ],
    incluye: [
      'Lista cerrada de documentos del vendedor',
      'Recordatorios hasta completar el 100 %',
      'Revisión antes de fijar fecha en notaría',
      'Orientación plusvalía municipal (IIVTNU) e IRPF del vendedor',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Documentación para escritura de venta de vivienda',
    invertido: true,
  },
  {
    id: 'escritura',
    kicker: 'Paso 5',
    titulo: 'Escritura pública: coordinación, minuta y día de la firma',
    intro:
      'Verificamos que el borrador de escritura coincide con arras y precio, que las cargas están canceladas o previstas y que llegas a notaría con tranquilidad. Tu gestor resuelve dudas de última hora por teléfono o WhatsApp.',
    pasos: [
      'Revisión orientativa de la minuta de compraventa.',
      'Confirmación de provisión de fondos y gastos de notaría/registro.',
      'Soporte el día de la firma: qué firmas y qué comprobar.',
      'Cierre del expediente en panel cuando la operación queda registrada.',
    ],
    incluye: [
      'Coordinación con notaría y comprador',
      'Asesoramiento hasta que el dinero está en tu cuenta',
      'Trámite online con opción presencial en Barcelona',
      'Venta cerrada sin haber pagado comisión de inmobiliaria',
    ],
    imagen: '/gestoria6.jpg',
    imagenAlt: 'Firma de escritura pública venta de vivienda',
  },
]

export const COMPRA_COMPLETA_SERVICIO_BLOQUES: CompletaServicioBloque[] = [
  {
    id: 'llamada-contratacion',
    kicker: 'Paso 1',
    titulo: 'Contratas y hablas con tu gestor: cuéntanos la compra',
    intro:
      'Indica barrio, precio negociado y en qué fase estás (visita, reserva, arras). En menos de 24 h tienes gestor con panel online y, si quieres, cita en despacho Les Corts (Barcelona) para revisar papeles en mano.',
    pasos: [
      'Formulario o llamada: comprador, vendedor, inmueble y plazos.',
      'Definimos si necesitas due diligence antes de señal o revisión de arras ya recibidas.',
      'Acceso al panel mi-cuenta/contratos y canal directo WhatsApp.',
      'Plan personalizado hasta escritura con hipoteca o al contado.',
    ],
    incluye: [
      `${P} € IVA incluido — tarifa plana comprador`,
      'Gestor asignado con teléfono directo',
      'Sin comisión sobre el precio del piso',
      'Online en toda España · presencial Barcelona sin extra',
    ],
    imagen: '/gestoria4.jpg',
    imagenAlt: 'Contratación pack compra completa hasta escritura',
  },
  {
    id: 'due-diligence',
    kicker: 'Paso 2',
    titulo: 'Due diligence documental antes de entregar señal alta',
    intro:
      'Analizamos nota simple, comunidad, derramas, ITE, cédula de habitabilidad, certificado energético y coherencia catastral. Detectamos riesgos que el vendedor no mencionó antes de que transfieras miles de euros en arras.',
    pasos: [
      'Solicitud y revisión de nota simple registral actualizada.',
      'Certificado de deudas de comunidad y actas recientes.',
      'Estado del edificio (ITE) y licencias de obra si hubo reforma.',
      'Informe claro de hallazgos y qué negociar con el vendedor.',
    ],
    incluye: [
      'Auditoría documental incluida en el pack 687 €',
      'Subida segura de PDFs al panel',
      'Recomendaciones antes de firmar arras',
      'Coordinación con vendedor y su gestoría',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Due diligence documental compra vivienda particular',
    invertido: true,
  },
  {
    id: 'arras-comprador',
    kicker: 'Paso 3',
    titulo: 'Revisión o redacción de arras a tu favor como comprador',
    intro:
      'Cláusula de financiación con plazo realista, condiciones suspensivas si el banco deniega, cargas que debe cancelar el vendedor y plazo a escritura. Redactamos o corregimos el borrador que te hayan pasado.',
    pasos: [
      'Análisis de borrador de arras del vendedor o agencia.',
      'Inclusión o mejora de cláusula suspensiva de hipoteca.',
      'Penalizaciones equilibradas y fecha límite de escritura.',
      'Borrador final en PDF con revisiones incluidas.',
    ],
    incluye: [
      'Arras penitenciales o confirmatorias según el caso',
      'Asesoramiento antes de entregar la señal',
      'Alineación con normativa autonómica (p. ej. Cataluña)',
      'Mismo gestor hasta notaría',
    ],
    imagen: '/contrato9.jpg',
    imagenAlt: 'Revisión contrato de arras comprador particular',
  },
  {
    id: 'seguimiento-pre-escritura',
    kicker: 'Paso 4',
    titulo: 'Seguimiento con banco, vendedor y notaría hasta pre-escritura',
    intro:
      'Coordinamos plazos de tasación hipotecaria, FEIN, documentación pendiente del vendedor y fecha tentativa en notaría. Subes PDFs al panel; el gestor responde por WhatsApp y videollamada.',
    pasos: [
      'Calendario compartido con hitos: hipoteca, documentos, notaría.',
      'Recordatorios al vendedor vía tu gestor cuando falte certificado.',
      'Verificación de cancelación de cargas antes de ir a firma.',
      'Orientación sobre ITP (Cataluña / resto CCAA) y provisión de fondos.',
    ],
    incluye: [
      'Coordinación operativa (no somos banco ni agencia)',
      'Panel con estado del expediente visible',
      'Respuesta ágil en horario laborable',
      'Cita presencial en Les Corts si lo necesitas',
    ],
    imagen: '/gestoria7.jpg',
    imagenAlt: 'Seguimiento compra vivienda hasta escritura',
    invertido: true,
  },
  {
    id: 'escritura-comprador',
    kicker: 'Paso 5',
    titulo: 'Escritura con garantías: minuta entendida y firma segura',
    intro:
      'Llegas a notaría con expediente ordenado: minuta revisada, ITP previsto, hipoteca alineada y documentación del vendedor completa. Sin haber pagado comisión de agencia por la parte jurídica del cierre.',
    pasos: [
      'Revisión orientativa de borrador de escritura pública.',
      'Checklist final el día anterior a la firma.',
      'Soporte por teléfono si surge duda en notaría.',
      'Cierre del expediente en panel tras la compra.',
    ],
    incluye: [
      'Acompañamiento hasta el acto de compraventa',
      'Coherencia arras → escritura',
      'Tranquilidad en compra entre particulares',
      '687 € fijos frente a miles en comisión inmobiliaria',
    ],
    imagen: '/inmobiliaria8.jpg',
    imagenAlt: 'Escritura pública compra vivienda entre particulares',
  },
]
