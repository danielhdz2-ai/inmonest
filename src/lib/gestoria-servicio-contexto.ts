export type ServicioFamilia =
  | 'alquiler'
  | 'compraventa'
  | 'revision'
  | 'due-diligence'
  | 'premium-compra'
  | 'premium-venta'
  | 'financiacion'
  | 'general'

export type BlindajeParte = {
  rol: string
  titulo: string
  bullets: string[]
}

export type BlindajeContent = {
  eyebrow: string
  titulo: string
  intro: string
  partes?: BlindajeParte[]
  garantias: string[]
}

export type BeneficioItem = {
  titulo: string
  desc: string
}

const ALQUILER_SLUGS = new Set([
  'contrato-alquiler',
  'alquiler-habitaciones',
  'alquiler-temporada',
  'alquiler-local-comercial',
  'alquiler-garaje-trastero',
  'reserva-alquiler',
  'pack-revision-reserva-alquiler',
  'liquidacion-fianza',
  'rescision-alquiler',
])

const COMPRAVENTA_SLUGS = new Set([
  'arras-penitenciales',
  'arras-confirmatorias',
  'arras-parking-garage',
  'reserva-compra',
  'acompanamiento-reserva-arras',
  'pack-arras-revision-documental',
  'pack-arras-plus-vendedor',
  'alquiler-opcion-compra',
  'contrato-compraventa',
  'asesoramiento-arras-venta',
])

const REVISION_SLUGS = new Set([
  'revision-alquiler',
  'revision-correccion',
  'revision-correccion-arras',
  'contrato-ilegal',
])

const PREMIUM_COMPRA_SLUGS = new Set([
  'compra-completa-reserva-escritura',
  'compra-completa-parking-trastero',
])

const SLUG_OVERRIDES: Partial<Record<string, BlindajeContent>> = {
  'arras-penitenciales': {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Firma la señal sabiendo exactamente qué te protege y qué no',
    intro:
      'Las arras penitenciales son el momento más delicado de la compra: entregas dinero antes de la escritura. Nuestro contrato equilibra comprador y vendedor, fija plazos, penitenciales y condiciones suspensivas (hipoteca, cargas, licencias) para que ninguna parte se lleve sorpresas.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'Protección antes de entregar la señal',
        bullets: [
          'Cláusula suspensiva por hipoteca: recuperas la señal si el banco deniega el préstamo.',
          'Verificación de datos registrales y coherencia con la nota simple.',
          'Plazos claros para escritura y condiciones si el vendedor incumple.',
        ],
      },
      {
        rol: 'Vendedor',
        titulo: 'Compromiso real del comprador',
        bullets: [
          'Señal con penalización clara si el comprador se echa atrás sin causa.',
          'Bloqueo del inmueble mientras se prepara la venta definitiva.',
          'Condiciones de resolución redactadas con criterio jurídico, no genéricas.',
        ],
      },
    ],
    garantias: [
      'Redacción personalizada — no plantillas de internet',
      'Revisión de nota simple incluida en el servicio',
      'Gestor asignado que responde dudas antes de firmar',
      'PDF firmable y guía para ambas partes',
    ],
  },
  'arras-confirmatorias': {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Máximo compromiso legal cuando ambas partes van en serio',
    intro:
      'Las arras confirmatorias obligan al cumplimiento: no hay “pagar y marcharse”. Redactamos un contrato que fija obligaciones, plazos de escritura e indemnizaciones por incumplimiento, con la solidez jurídica que exige una operación sin margen de duda.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'El vendedor no puede echarse atrás sin consecuencias',
        bullets: [
          'Obligación de otorgar escritura en el plazo pactado.',
          'Indemnización por daños si el vendedor incumple o vende a terceros.',
          'Condiciones resolutorias solo cuando la ley las permite.',
        ],
      },
      {
        rol: 'Vendedor',
        titulo: 'Certeza de que el comprador cerrará la operación',
        bullets: [
          'Compromiso firme de compra sin cláusula de desistimiento penitencial.',
          'Protección ante impagos o retrasos injustificados del comprador.',
          'Coherencia entre precio, plazos y forma de pago en el contrato.',
        ],
      },
    ],
    garantias: [
      'Cláusulas de cumplimiento forzoso adaptadas a tu operación',
      'Revisión registral del inmueble',
      'Asesoramiento previo a la firma por WhatsApp o teléfono',
      'Entrega en 48h con instrucciones claras',
    ],
  },
  'contrato-alquiler': {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Alquila o alquílate con todas las garantías LAU y Ley de Vivienda 2026',
    intro:
      'Un contrato mal redactado genera conflictos de fianza, subidas ilegales de renta o cláusulas nulas. Redactamos un LAU equilibrado que protege al propietario dentro de la legalidad y deja al inquilino con derechos claros desde el primer día.',
    partes: [
      {
        rol: 'Propietario',
        titulo: 'Tu vivienda, tus reglas — dentro de la ley',
        bullets: [
          'Fianza, garantías adicionales y actualización de renta conforme a normativa.',
          'Cláusulas de resolución, obras y uso del inmueble válidas ante un juez.',
          'Inventario y depósito de fianza según CCAA cuando aplique.',
        ],
      },
      {
        rol: 'Inquilino',
        titulo: 'Sabes qué firmas antes de pagar',
        bullets: [
          'Duración, prórrogas y límites de subida según zona tensionada o no.',
          'Sin cláusulas abusivas de gastos, obras o rescisión unilateral.',
          'Condiciones de devolución de fianza y entrega del piso claras.',
        ],
      },
    ],
    garantias: [
      'Adaptado a Ley de Vivienda 2026 y LAU estatal',
      'Revisión de datos del inmueble y partes',
      'PDF firmable en 48h con guía de firma',
      'Soporte del gestor antes y después de entregar el contrato',
    ],
  },
  'alquiler-local-comercial': {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Local comercial con contrato LAU empresarial — no plantilla de vivienda',
    intro:
      'Los locales comerciales no tienen las prórrogas obligatorias del alquiler de vivienda. Sin un contrato del Título III LAU bien redactado, pierdes el derecho de tanteo, las obras quedan sin amortizar y el arrendatario puede traspasar el negocio sin tu consentimiento. Blindamos la operación para propietarios y empresarios particulares.',
    partes: [
      {
        rol: 'Propietario',
        titulo: 'Tu local protegido ante venta, obras y traspaso',
        bullets: [
          'Derecho de tanteo y retracto regulado con plazos y notificación.',
          'Obras iniciales y mejoras: quién paga, quién las conserva al terminar.',
          'Traspaso de negocio condicionado o prohibido según lo pactado.',
        ],
      },
      {
        rol: 'Arrendatario',
        titulo: 'Actividad, licencia y renta con reglas claras',
        bullets: [
          'Actividad permitida y compatibilidad con licencia municipal.',
          'Duración, actualización de renta (IPC o libre) y fianza detalladas.',
          'Condiciones de resolución e impago sin cláusulas abusivas.',
        ],
      },
    ],
    garantias: [
      'Contrato Título III LAU — uso distinto de vivienda',
      'Redacción personalizada, no plantilla genérica',
      'Gestor asignado en 24h · WhatsApp y teléfono',
      'PDF firmable en 48h · Orientación sobre registro si aplica',
    ],
  },
  'contrato-compraventa': {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Compraventa privada con cláusulas que aguantan ante notaría y registro',
    intro:
      'El contrato privado de compraventa fija precio, forma de pago, cargas, entrega de llaves y saneamiento. Lo redactamos para que comprador y vendedor sepan exactamente qué ocurre en cada fase hasta la escritura pública.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'Compra con documentación coherente',
        bullets: [
          'Condiciones de pago, aplazamientos y entrega del inmueble detallados.',
          'Garantías de saneamiento por vicios ocultos y cargas.',
          'Plazos para escritura e ITP con condiciones resolutorias si procede.',
        ],
      },
      {
        rol: 'Vendedor',
        titulo: 'Vende con obligaciones del comprador claras',
        bullets: [
          'Penalizaciones por retraso o incumplimiento del comprador.',
          'Reserva de dominio o garantías de pago cuando la operación lo exige.',
          'Coordinación con cancelación de hipoteca si aplica.',
        ],
      },
    ],
    garantias: [
      'Redacción a medida de la operación real',
      'Cláusulas de protección bilateral',
      'Revisión de coherencia con arras previas si las hubo',
      'Entrega en 48h laborables',
    ],
  },
  'pack-due-diligence-precompra': {
    eyebrow: 'Comprar con seguridad',
    titulo: 'Corroboramos cada paso antes de que firmes la escritura',
    intro:
      'Comprar entre particulares sin agencia significa que nadie revisa la operación por ti. El Pack Due Diligence analiza documentación registral, comunidad, ITE, cargas y coherencia urbanística para que sepas si el inmueble es seguro antes de comprometerte definitivamente.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'Decisiones con información completa',
        bullets: [
          'Actas de comunidad, derramas pendientes y deudas de IBI o suministros.',
          'Nota registral actualizada y concordancia con la realidad del piso.',
          'Informe ejecutivo con riesgos críticos y recomendación clara.',
        ],
      },
      {
        rol: 'Antes de arras o escritura',
        titulo: 'Detectamos lo que no se ve en una visita',
        bullets: [
          'ITE del edificio, licencias y posibles infracciones urbanísticas.',
          'Cargas, embargos o usufructos que afecten al valor o la venta.',
          'Señales de irregularidad que justifican renegociar o desistir.',
        ],
      },
    ],
    garantias: [
      'Informe PDF ejecutivo en 3–5 días laborables',
      'Gestor especializado en compraventa entre particulares',
      'Confidencialidad total de la documentación aportada',
      'Recomendaciones accionables, no informes genéricos',
    ],
  },
  'pack-arras-revision-documental': {
    eyebrow: 'Pack para compradores',
    titulo: 'Arras bien redactadas y documentación revisada antes de la señal',
    intro:
      'Si compras de particular, nadie revisa el piso por ti. El Pack Arras Plus Comprador combina la redacción de arras penitenciales con una revisión documental completa del inmueble: comunidad, derramas, ITE, registros y certificados. Un solo servicio para firmar con garantías y saber qué estás comprando.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'Arras + informe en un solo pack',
        bullets: [
          'Contrato de arras penitenciales con cláusulas suspensivas y plazos claros.',
          'Auditoría de actas, derramas, ITE y nota registral del inmueble.',
          'Informe documental con riesgos y recomendaciones antes de comprometerte.',
        ],
      },
      {
        rol: 'Sin agencia',
        titulo: 'La revisión que haría un gestor, no un portal',
        bullets: [
          'Verificación de deudas de comunidad y cargas no declaradas.',
          'Coherencia entre catastro, registro y documentación técnica.',
          'Orientación para renegociar o desistir si detectamos problemas graves.',
        ],
      },
    ],
    garantias: [
      'Arras en PDF en 48h + informe documental en 3–5 días',
      'Gestor especializado en compraventa entre particulares',
      'Tarifa plana 450 € — sin comisión sobre el precio del piso',
      'Firma electrónica FIRMACERT incluida en el servicio',
    ],
  },
  'pack-arras-plus-vendedor': {
    eyebrow: 'Pack para vendedores',
    titulo: 'Arras que te protegen y documentación lista para escriturar',
    intro:
      'Si vendes entre particulares, nadie te prepara las arras ni la documentación para notaría. El Pack Arras Plus Vendedor redacta tus arras penitenciales con cláusulas equilibradas a tu favor y te ayuda a recabar, ordenar y analizar toda la documentación del inmueble para llegar a escritura sin bloqueos.',
    partes: [
      {
        rol: 'Vendedor',
        titulo: 'Arras + checklist documental en un solo pack',
        bullets: [
          'Contrato de arras penitenciales con plazos, señal y penalizaciones claras.',
          'Ayuda para recabar escrituras, nota simple, certificado energético e ITE.',
          'Informe con lo que falta para escriturar y riesgos detectados en la documentación.',
        ],
      },
      {
        rol: 'Sin agencia',
        titulo: 'La preparación que haría un gestor, no un portal',
        bullets: [
          'Revisión de actas de comunidad, derramas y deudas pendientes.',
          'Coherencia entre registro, catastro y documentación técnica del inmueble.',
          'Orientación sobre qué pedir al comprador y qué aportar tú antes de notaría.',
        ],
      },
    ],
    garantias: [
      'Arras en PDF en 48h + informe documental en 3–5 días',
      'Gestor especializado en venta entre particulares',
      'Tarifa plana 450 € — sin comisión sobre el precio del piso',
      'Firma electrónica FIRMACERT incluida en el servicio',
    ],
  },
}

function familiaPorSlug(slug: string): ServicioFamilia {
  if (ALQUILER_SLUGS.has(slug)) return 'alquiler'
  if (COMPRAVENTA_SLUGS.has(slug)) return 'compraventa'
  if (REVISION_SLUGS.has(slug)) return 'revision'
  if (slug === 'pack-due-diligence-precompra') return 'due-diligence'
  if (PREMIUM_COMPRA_SLUGS.has(slug)) return 'premium-compra'
  if (slug === 'venta-completa-reserva-escritura') return 'premium-venta'
  if (slug === 'prestamo-particulares') return 'financiacion'
  return 'general'
}

const FAMILIA_BLINDAJE: Record<ServicioFamilia, BlindajeContent> = {
  alquiler: {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Propietario e inquilino con derechos y obligaciones claras desde el día uno',
    intro:
      'El alquiler bien formalizado evita pleitos de fianza, impagos y cláusulas nulas. Redactamos o revisamos tu documento para que cumpla LAU y Ley de Vivienda 2026, protegiendo a ambas partes con garantías jurídicas reales.',
    partes: [
      {
        rol: 'Propietario',
        titulo: 'Arrienda con respaldo legal',
        bullets: [
          'Fianza, renta, actualización IPC y resolución del contrato conforme a la ley.',
          'Cláusulas de protección válidas ante impago o incumplimiento.',
          'Orientación sobre depósito en organismo autonómico cuando corresponda.',
        ],
      },
      {
        rol: 'Inquilino',
        titulo: 'Firma sabiendo qué es legal y qué no',
        bullets: [
          'Límites de subida en zona tensionada o libre según normativa.',
          'Sin traslado abusivo de gastos de comunidad o reparaciones estructurales.',
          'Condiciones de devolución de fianza y entrega del inmueble definidas.',
        ],
      },
    ],
    garantias: [
      'Especialistas en derecho inmobiliario y arrendamientos',
      'Sin plantillas genéricas descargadas de internet',
      'Gestor disponible para dudas antes de firmar',
      'Entrega en PDF firmable con plazos garantizados',
    ],
  },
  compraventa: {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Comprador y vendedor con el mismo mapa legal antes de mover dinero',
    intro:
      'Reserva, arras o compraventa privada: cada euro que transfieres debe ir respaldado por un contrato que fije plazos, penalizaciones y condiciones suspensivas. Te ayudamos a blindar la operación para que ninguna parte actúe a ciegas.',
    partes: [
      {
        rol: 'Comprador',
        titulo: 'Protección en cada fase de la compra',
        bullets: [
          'Condiciones suspensivas por hipoteca, cargas o licencias.',
          'Coherencia entre señal, arras y precio final de compraventa.',
          'Argumentos legales si el vendedor incumple plazos o documentación.',
        ],
      },
      {
        rol: 'Vendedor',
        titulo: 'Compromiso serio del comprador',
        bullets: [
          'Penitenciales o indemnizaciones claras si el comprador desiste sin causa.',
          'Plazo de escritura y forma de pago detallados.',
          'Protección ante operaciones paralelas o incumplimientos.',
        ],
      },
    ],
    garantias: [
      'Revisión de nota simple cuando el servicio lo incluye',
      'Redacción adaptada a tu operación concreta',
      'Asesoramiento previo a la firma incluido',
      'Pago seguro Stripe y gestor asignado',
    ],
  },
  revision: {
    eyebrow: 'Blindaje de la operación',
    titulo: 'No firmes un borrador que te puede costar miles de euros',
    intro:
      'Cuando te entregan un contrato ya redactado — por la otra parte, una agencia o internet — la revisión legal es tu red de seguridad. Detectamos cláusulas abusivas, errores registrales e incoherencias antes de que entregues dinero o firmes.',
    garantias: [
      'Informe claro con riesgos y recomendaciones de negociación',
      'En servicios de corrección: versión del contrato lista para proponer cambios',
      'Plazos garantizados (24–48h según servicio)',
      'Confidencialidad total de la documentación',
    ],
  },
  'due-diligence': {
    eyebrow: 'Comprar con seguridad',
    titulo: 'Verificamos que la compra encaja con la legalidad y la realidad del inmueble',
    intro:
      'Antes de escriturar, necesitas saber si hay derramas ocultas, cargas registrales o problemas urbanísticos. El due diligence es la auditoría legal que te falta cuando compras sin agencia.',
    garantias: [
      'Análisis documental por gestoría especializada',
      'Informe ejecutivo con conclusiones accionables',
      'Detección de riesgos antes de comprometer capital',
      'Coordinación con otros servicios Inmonest si amplías la compra',
    ],
  },
  'premium-compra': {
    eyebrow: 'Acompañamiento integral',
    titulo: 'De la reserva a la escritura con un gestor que vigila cada paso',
    intro:
      'Comprar piso entre particulares sin comisión de agencia no significa ir solo. Te asignamos un gestor que coordina contratos, documentación, notaría e impuestos para que la operación sea legal, ordenada y sin sorpresas de última hora.',
    garantias: [
      'Gestor personalizado durante toda la operación',
      'Revisión de contratos de reserva, arras y condiciones suspensivas',
      'Coordinación con notaría e ITP',
      'Atención prioritaria por teléfono y WhatsApp',
    ],
  },
  'premium-venta': {
    eyebrow: 'Acompañamiento integral',
    titulo: 'Vende entre particulares con la misma seguridad que una gestoría profesional',
    intro:
      'Desde la reserva hasta la escritura, te guiamos en arras, documentación del comprador, cancelación de hipoteca si aplica y firma en notaría. Sin pagar comisión de inmobiliaria, pero con respaldo jurídico real.',
    garantias: [
      'Gestor asignado hasta inscripción registral',
      'Redacción y revisión de contratos de la operación',
      'Orientación en negociación y plazos con el comprador',
      'Tarifa plana sin sorpresas',
    ],
  },
  financiacion: {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Préstamo entre particulares con nota fiscal y protección legal bilateral',
    intro:
      'Formalizar dinero entre familiares o conocidos requiere contrato, intereses declarables y cláusulas de impago. Evita conflictos futuros y problemas con Hacienda con un documento redactado por especialistas.',
    garantias: [
      'Importe, plazos, intereses y cuotas detallados',
      'Nota fiscal orientativa ante AEAT',
      'Cláusulas de vencimiento anticipado y garantías',
      'PDF firmable en 48h',
    ],
  },
  general: {
    eyebrow: 'Blindaje de la operación',
    titulo: 'Tu operación inmobiliaria con respaldo jurídico de gestoría especializada',
    intro:
      'En Inmonest no vendemos PDFs genéricos: analizamos tu caso, redactamos o revisamos el documento y te acompañamos hasta que firmes con tranquilidad. Cada servicio está pensado para reducir riesgos legales y dar certeza a ambas partes.',
    garantias: [
      'Gestoría boutique — un interlocutor, Daniel Hernández',
      'Normativa vigente y redacción personalizada',
      'Soporte antes de firmar incluido en el precio',
      'Pago seguro con Stripe',
    ],
  },
}

const FAMILIA_BENEFICIOS: Record<ServicioFamilia, BeneficioItem[]> = {
  alquiler: [
    { titulo: 'Equilibrio propietario-inquilino', desc: 'Cláusulas válidas que protegen al arrendador sin vulnerar derechos del inquilino.' },
    { titulo: 'Ley de Vivienda 2026', desc: 'Actualización de renta, fianza y garantías según zona tensionada o libre.' },
    { titulo: 'Sin sorpresas en la fianza', desc: 'Depósito, inventario y devolución regulados desde el contrato.' },
    { titulo: 'Gestor antes de firmar', desc: 'Resolvemos dudas por teléfono o WhatsApp antes de que entregues las llaves o la fianza.' },
  ],
  compraventa: [
    { titulo: 'Señal con sentido jurídico', desc: 'Penitenciales, confirmatorias o reserva con plazos y penalizaciones claras.' },
    { titulo: 'Nota simple revisada', desc: 'Coherencia entre Registro, contrato y datos del inmueble cuando el servicio lo incluye.' },
    { titulo: 'Condiciones suspensivas', desc: 'Hipoteca, cargas y licencias contempladas antes de transferir la señal.' },
    { titulo: 'Comprador y vendedor informados', desc: 'Mismo documento, mismas reglas — menos conflictos después.' },
  ],
  revision: [
    { titulo: 'Detectamos lo que no ves', desc: 'Cláusulas abusivas, plazos trampa y errores registrales antes de firmar.' },
    { titulo: 'Informe accionable', desc: 'No solo te decimos el problema: te damos argumentos para negociar.' },
    { titulo: 'Urgencia cuando importa', desc: 'Plazos de 12–48h según servicio para no retrasar tu operación.' },
    { titulo: 'Confidencialidad total', desc: 'Tu contrato solo se usa para el análisis jurídico.' },
  ],
  'due-diligence': [
    { titulo: 'Auditoría pre-compra', desc: 'Comunidad, registral, urbanístico e ITE en un solo informe.' },
    { titulo: 'Decisiones con datos', desc: 'Sabes si conviene comprar, renegociar o desistir con base documental.' },
    { titulo: 'Sin agencia, con control', desc: 'La revisión que haría un departamento legal, a precio cerrado.' },
    { titulo: 'Informe ejecutivo', desc: 'Conclusión clara para ti y tu asesor hipotecario si lo necesitas.' },
  ],
  'premium-compra': [
    { titulo: 'Un gestor, toda la compra', desc: 'Desde reserva hasta registro sin perder el hilo de la operación.' },
    { titulo: 'Sin comisión del 3–5 %', desc: 'Acompañamiento profesional a tarifa plana frente a agencias tradicionales.' },
    { titulo: 'Coordinación notaría e ITP', desc: 'Te guiamos en impuestos, documentación y firma.' },
    { titulo: 'Prioridad de respuesta', desc: 'Atención directa cuando surgen imprevistos de última hora.' },
  ],
  'premium-venta': [
    { titulo: 'Venta ordenada', desc: 'Contratos, plazos y comprador coordinados por un gestor.' },
    { titulo: 'Menos riesgo de impago', desc: 'Documentación y arras redactadas para proteger al vendedor.' },
    { titulo: 'Hasta escritura', desc: 'No te quedas solo después de las arras.' },
    { titulo: 'Tarifa plana', desc: 'Precio cerrado sin porcentaje sobre el precio de venta.' },
  ],
  financiacion: [
    { titulo: 'Cumplimiento fiscal', desc: 'Intereses y formalización orientados a declaración ante AEAT.' },
    { titulo: 'Protección bilateral', desc: 'Prestamista y prestatario con derechos y obligaciones claros.' },
    { titulo: 'Impago previsto', desc: 'Cláusulas de vencimiento anticipado y reclamación.' },
    { titulo: 'Documento firmable', desc: 'PDF listo en 48h con cuadro de amortización.' },
  ],
  general: [
    { titulo: 'Seguridad jurídica', desc: 'Redacción por gestoría especializada en inmobiliario, no plantillas.' },
    { titulo: 'Precio cerrado', desc: 'Sabes lo que pagas antes de contratar — IVA incluido.' },
    { titulo: 'Plazos garantizados', desc: 'Entrega en 24–48h según servicio, con seguimiento.' },
    { titulo: 'Pago seguro Stripe', desc: 'Tus datos bancarios no pasan por nuestros servidores.' },
  ],
}

export function getServicioFamilia(slug: string): ServicioFamilia {
  return familiaPorSlug(slug)
}

export function getBlindajeContent(slug: string): BlindajeContent {
  return SLUG_OVERRIDES[slug] ?? FAMILIA_BLINDAJE[familiaPorSlug(slug)]
}

const SLUG_BENEFICIOS_OVERRIDES: Partial<Record<string, BeneficioItem[]>> = {
  'alquiler-local-comercial': [
    { titulo: 'LAU empresarial, no vivienda', desc: 'Contrato del Título III adaptado a locales, bajos comerciales y naves ligeras.' },
    { titulo: 'Tanteo, obras y traspaso', desc: 'Cláusulas críticas redactadas con precisión — no omitidas como en plantillas genéricas.' },
    { titulo: 'Sin comisión de agencia', desc: '145€ tarifa plana. No somos inmobiliaria: no cobramos porcentaje sobre la renta.' },
    { titulo: 'Gestor antes de firmar', desc: 'Resolvemos dudas por teléfono o WhatsApp antes de entregar las llaves o la fianza.' },
  ],
}

export function getBeneficiosServicio(slug: string): BeneficioItem[] {
  return SLUG_BENEFICIOS_OVERRIDES[slug] ?? FAMILIA_BENEFICIOS[familiaPorSlug(slug)]
}

export function getComoTrabajamosIntro(slug: string, nombre: string): string {
  if (slug === 'alquiler-local-comercial') {
    return `No enviamos plantillas por email y desaparecemos. Primero entendemos si eres propietario o arrendatario, revisamos actividad permitida, licencia, renta y obras del local — y solo después redactamos tu ${nombre.toLowerCase()}.`
  }
  const familia = familiaPorSlug(slug)
  switch (familia) {
    case 'alquiler':
      return `No enviamos plantillas por email y desaparecemos. Primero entendemos si eres propietario o inquilino, revisamos los datos del piso y solo después redactamos tu ${nombre.toLowerCase()}.`
    case 'compraventa':
      return `Antes de redactar tu ${nombre.toLowerCase()}, confirmamos datos de las partes, coherencia registral y condiciones de la operación. Hablas con un gestor real — luego decides si contratas.`
    case 'revision':
      return `Subes el borrador que te han dado, un gestor lo analiza cláusula a cláusula y recibes un informe claro antes de firmar o entregar dinero. Sin letra pequeña ni sorpresas.`
    case 'due-diligence':
      return `Recopilamos la documentación del inmueble, la contrastamos con registral y urbanística, y te entregamos un informe para decidir si compras con tranquilidad o renegocias.`
    case 'premium-compra':
    case 'premium-venta':
      return `Te asignamos un gestor desde el primer contacto. Coordina contratos, plazos, notaría e impuestos hasta cerrar la operación con todas las garantías.`
    default:
      return `En Inmonest hablas con un gestor antes de pagar. Resolvemos dudas sobre tu ${nombre.toLowerCase()}, te explicamos qué incluye el servicio y solo entonces solicitas la redacción o revisión.`
  }
}
