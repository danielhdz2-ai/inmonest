import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export type GestoriaServiceLandingData = {
  nombre: string
  precio: number
  categoria: string
  tagline: string
  descripcion: string
  image: string
  imageAlt: string
  paraQuien: string[]
  incluye: string[]
  pasos: Array<{ num: string; titulo: string; desc: string }>
  faq: Array<{ q: string; a: string }>
  relacionados: Array<{ slug: string; nombre: string; precio: number }>
}

const p = (slug: string, fallback: number) => getPrecioServicio(slug) ?? fallback

/** Landings genéricas /gestoria/[servicio] — servicios del catálogo aún no definidos en page.tsx */
export const GESTORIA_SERVICIOS_ADICIONALES: Record<string, GestoriaServiceLandingData> = {
  'reserva-compra': {
    nombre: 'Contrato de Reserva de Compra',
    precio: p('reserva-compra', 61),
    categoria: 'Compraventa',
    tagline: 'Bloquea el inmueble 48–72h mientras preparas las arras definitivas',
    descripcion:
      'La reserva de compra es el primer paso para asegurar un piso entre particulares sin firmar aún las arras. Fija un plazo breve, consigna una señal simbólica y establece condiciones claras de devolución si la operación no continúa. Es la herramienta ideal cuando necesitas tiempo para revisar documentación, solicitar la hipoteca o coordinar con el vendedor antes del compromiso firme.',
    image: '/contrato3.jpg',
    imageAlt: 'Contrato de reserva de compra de vivienda',
    paraQuien: [
      'Compradores que han encontrado piso y quieren apartarlo unos días',
      'Operaciones donde la hipoteca aún no está aprobada',
      'Quien negocia con el vendedor y necesita plazo para la due diligence',
      'Compradores que quieren evitar que entren otras ofertas mientras cierran detalles',
    ],
    incluye: [
      'Bloqueo jurídico del inmueble durante 48–72 horas',
      'Importe y condiciones de la señal de reserva',
      'Plazo máximo para firmar arras o desistir',
      'Condiciones de devolución de la señal para ambas partes',
      'PDF firmable en 24 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Indica los datos', desc: 'Comprador, vendedor, inmueble, precio acordado e importe de la señal de reserva.' },
      { num: '02', titulo: 'Redacción personalizada', desc: 'Tu gestor adapta plazos, condiciones resolutorias y cláusulas de devolución a tu operación.' },
      { num: '03', titulo: 'Firma y bloqueo', desc: 'Recibes el PDF en 24h. Al firmar, el inmueble queda reservado mientras preparas las arras.' },
    ],
    faq: [
      {
        q: '¿Reserva y arras son lo mismo?',
        a: 'No. La reserva es un paso previo más ligero: bloquea el inmueble unos días. Las arras implican un compromiso mayor y una señal más elevada, con penalizaciones si alguien se echa atrás.',
      },
      {
        q: '¿Qué pasa si no consigo la hipoteca en el plazo?',
        a: 'Si incluimos cláusula suspensiva por financiación, recuperas la señal sin penalización. Es la condición más habitual en reservas de compra.',
      },
      {
        q: '¿Cuánto suele ser la señal de reserva?',
        a: 'Habitualmente entre 500 € y 3.000 €, según el precio del inmueble y lo acordado con el vendedor. Debe quedar reflejado en el contrato.',
      },
      {
        q: '¿Puedo pasar de reserva a arras con vosotros?',
        a: 'Sí. Muchos clientes contratan primero la reserva y después las arras penitenciales o confirmatorias. Tu gestor mantiene coherencia entre ambos documentos.',
      },
    ],
    relacionados: [
      { slug: 'arras-penitenciales', nombre: 'Arras Penitenciales', precio: 145 },
      { slug: 'acompanamiento-reserva-arras', nombre: 'Acompañamiento Reserva-Arras', precio: 424 },
      { slug: 'revision-arras', nombre: 'Revisión de Arras', precio: 60 },
    ],
  },

  'alquiler-temporada': {
    nombre: 'Contrato de Alquiler por Temporada',
    precio: p('alquiler-temporada', 165),
    categoria: 'Alquiler',
    tagline: 'Alquiler temporal con causa justificada, fuera del régimen LAU de vivienda habitual',
    descripcion:
      'El alquiler por temporada aplica cuando el inquilino necesita la vivienda por un periodo determinado y por una causa concreta: trabajo temporal, estudios, reforma de su domicilio habitual o estancia profesional. A diferencia del alquiler LAU de vivienda habitual, no genera prórrogas automáticas ni la protección de permanencia del inquilino. Requiere redacción cuidadosa para que la causa de temporalidad quede acreditada y el contrato sea válido.',
    image: '/contrato6.jpg',
    imageAlt: 'Contrato de alquiler por temporada',
    paraQuien: [
      'Propietarios que alquilan por meses a trabajadores o estudiantes',
      'Inquilinos en estancia temporal por motivos laborales o académicos',
      'Arrendamientos de 3 a 11 meses con causa de temporalidad clara',
      'Quien quiere evitar las prórrogas obligatorias de la LAU',
    ],
    incluye: [
      'Duración del contrato y causa de temporalidad especificada',
      'Cláusulas exentas de prórroga automática LAU',
      'Renta, fianza y gastos de comunidad detallados',
      'Condiciones de entrega y devolución del inmueble',
      'PDF firmable en 48 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Describe tu caso', desc: 'Indica duración, motivo de la temporalidad, renta y datos de propietario e inquilino.' },
      { num: '02', titulo: 'Redacción especializada', desc: 'Tu gestor redacta el contrato con la causa de temporalidad y cláusulas válidas ante un posible conflicto LAU.' },
      { num: '03', titulo: 'Entrega en 48h', desc: 'Recibes el PDF listo para firmar con guía para ambas partes.' },
    ],
    faq: [
      {
        q: '¿Cuándo es válido un alquiler de temporada?',
        a: 'Cuando existe una causa real y temporal: traslado laboral, estudios, reforma del domicilio habitual, etc. No basta con poner "temporal" en el contrato sin motivo acreditado.',
      },
      {
        q: '¿Puede el inquilino quedarse después del plazo?',
        a: 'Si el contrato está bien redactado y la causa es válida, no hay prórroga automática. Si se demuestra que era un alquiler LAU disfrazado, el inquilino podría reclamar protección.',
      },
      {
        q: '¿Es lo mismo que alquiler de habitación?',
        a: 'No. La habitación se rige por el Código Civil. La temporada es alquiler de vivienda completa por periodo limitado con causa específica.',
      },
      {
        q: '¿Incluye inventario y fianza?',
        a: 'Sí, detallamos fianza, forma de pago, inventario de muebles si los hay y estado del inmueble en la entrega.',
      },
    ],
    relacionados: [
      { slug: 'contrato-alquiler', nombre: 'Contrato Alquiler LAU', precio: 145 },
      { slug: 'alquiler-habitaciones', nombre: 'Alquiler Habitación', precio: 145 },
      { slug: 'reserva-alquiler', nombre: 'Reserva de Alquiler', precio: 61 },
    ],
  },

  'reserva-alquiler': {
    nombre: 'Contrato de Reserva de Alquiler',
    precio: p('reserva-alquiler', 61),
    categoria: 'Alquiler',
    tagline: 'Apartar el piso con señal mientras se firma el contrato LAU definitivo',
    descripcion:
      'Has visitado el piso, te gusta y quieres asegurarlo antes de que entre otro candidato. El contrato de reserva de alquiler fija una señal, un plazo para firmar el arrendamiento definitivo y las condiciones de devolución si alguna parte desiste. Evita malentendidos sobre renta, fianza y fecha de entrada mientras el propietario prepara el contrato LAU o tú revisas el borrador.',
    image: '/contrato5.jpg',
    imageAlt: 'Reserva de alquiler de vivienda',
    paraQuien: [
      'Inquilinos que quieren bloquear un piso en mercados con mucha demanda',
      'Propietarios que han elegido inquilino y quieren compromiso antes del LAU',
      'Operaciones donde falta revisar el contrato definitivo o el aval',
      'Quien necesita unos días para entregar documentación al propietario',
    ],
    incluye: [
      'Importe de la señal y forma de pago',
      'Plazo máximo para firma del contrato de alquiler',
      'Condiciones de devolución si el inquilino o propietario desiste',
      'Datos del inmueble, renta acordada y fecha prevista de entrada',
      'PDF firmable en 24 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Datos de la reserva', desc: 'Propietario, inquilino, dirección, renta, fianza prevista e importe de la señal.' },
      { num: '02', titulo: 'Redacción del documento', desc: 'Plazos, condiciones de devolución y compromiso de firma del LAU en fechas concretas.' },
      { num: '03', titulo: 'Firma y entrega', desc: 'PDF en 24h. Tras firmar, el piso queda reservado hasta la fecha límite acordada.' },
    ],
    faq: [
      {
        q: '¿La señal de reserva se descuenta de la fianza?',
        a: 'Depende de lo que acordéis. Lo habitual es que la señal se impute al primer mes o a la fianza si se firma el contrato. Lo dejamos escrito con claridad.',
      },
      {
        q: '¿Puedo revisar el contrato LAU antes de firmar la reserva?',
        a: 'Recomendable. Si ya tienes borrador, combina reserva con nuestro pack revisión + alquiler o la revisión de contrato por separado.',
      },
      {
        q: '¿Qué pasa si el propietario encuentra otro inquilino?',
        a: 'Si firmáis reserva válida, el propietario debe devolver la señal y, según el contrato, puede haber penalización por incumplimiento.',
      },
      {
        q: '¿Incluye el contrato LAU definitivo?',
        a: 'No, este servicio es solo la reserva. El contrato LAU completo es un servicio aparte que puedes contratar después.',
      },
    ],
    relacionados: [
      { slug: 'contrato-alquiler', nombre: 'Contrato Alquiler LAU', precio: 145 },
      { slug: 'pack-revision-reserva-alquiler', nombre: 'Pack Reserva + Alquiler', precio: 169 },
      { slug: 'revision-alquiler', nombre: 'Revisión Alquiler', precio: 120 },
    ],
  },

  'liquidacion-fianza': {
    nombre: 'Liquidación de Fianza',
    precio: p('liquidacion-fianza', 120),
    categoria: 'Rescisión y fianzas',
    tagline: 'Documento claro para devolver la fianza sin conflictos entre propietario e inquilino',
    descripcion:
      'Al finalizar un alquiler, la devolución de la fianza es una de las mayores fuentes de conflicto. Propietarios e inquilinos discuten reparaciones, limpieza, pintura o meses pendientes. Un documento de liquidación de fianza desglosa cada concepto, valora los daños con criterios objetivos y fija el importe neto a devolver y el plazo. Reduce reclamaciones y deja constancia firmada de lo acordado.',
    image: '/gestoria6.jpg',
    imageAlt: 'Liquidación de fianza de alquiler',
    paraQuien: [
      'Propietarios que van a devolver la fianza al inquilino',
      'Inquilinos que quieren constancia escrita de lo descontado',
      'Operaciones con pequeños daños o reparaciones a valorar',
      'Quien cierra alquiler junto con acta de rescisión',
    ],
    incluye: [
      'Desglose de conceptos descontados de la fianza',
      'Valoración de daños con importes concretos',
      'Importe bruto de fianza, deducciones y neto a devolver',
      'Plazo de devolución y forma de pago',
      'PDF firmable en 24 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Indica importes', desc: 'Fianza depositada, reparaciones, limpieza, rentas pendientes u otros conceptos a descontar.' },
      { num: '02', titulo: 'Redacción del documento', desc: 'Tu gestor estructura la liquidación con criterios claros y lenguaje neutro para ambas partes.' },
      { num: '03', titulo: 'Firma y cierre', desc: 'PDF en 24h. Al firmar, queda constancia del acuerdo de devolución.' },
    ],
    faq: [
      {
        q: '¿Es obligatorio hacer liquidación por escrito?',
        a: 'No es obligatorio legalmente, pero es muy recomendable. Evita reclamaciones posteriores y acelera la devolución si ambos están de acuerdo.',
      },
      {
        q: '¿Puedo descontar pintura o limpieza?',
        a: 'Solo si hay daños más allá del desgaste normal por uso. La liquidación debe reflejar conceptos razonables; lo revisamos según la LAU.',
      },
      {
        q: '¿Incluye acta de entrega del piso?',
        a: 'Este servicio es la liquidación económica. Si necesitas acta de estado del inmueble, combínalo con rescisión de alquiler.',
      },
      {
        q: '¿Qué plazo hay para devolver la fianza?',
        a: 'La LAU da un mes desde la entrega de llaves si no hay discrepancia. Con liquidación firmada, el plazo acordado queda documentado.',
      },
    ],
    relacionados: [
      { slug: 'rescision-alquiler', nombre: 'Rescisión de Alquiler', precio: 120 },
      { slug: 'contrato-alquiler', nombre: 'Contrato Alquiler LAU', precio: 145 },
      { slug: 'revision-alquiler', nombre: 'Revisión Alquiler', precio: 120 },
    ],
  },

  'venta-completa-reserva-escritura': {
    nombre: 'Servicio Completo de Venta: Reserva a Escritura',
    precio: p('venta-completa-reserva-escritura', 687),
    categoria: 'Servicios Premium',
    tagline: 'Vende entre particulares con gestor asignado desde la reserva hasta notaría',
    descripcion:
      'Vender tu piso sin agencia no significa ir solo. Este servicio premium asigna un gestor inmobiliario que te acompaña en todo el proceso: redacta reserva y arras, te ayuda a recabar documentación, coordina con el comprador y con la notaría, y resuelve dudas hasta la escritura. Ahorras comisiones de agencia manteniendo la seguridad jurídica de una operación bien documentada.',
    image: '/keys.jpg',
    imageAlt: 'Venta de vivienda entre particulares con gestoría',
    paraQuien: [
      'Propietarios que venden sin inmobiliaria y quieren acompañamiento experto',
      'Vendedores que no dominan la documentación registral o urbanística',
      'Operaciones con hipoteca pendiente de cancelar en el vendedor',
      'Quien valora un interlocutor único por WhatsApp hasta la firma',
    ],
    incluye: [
      'Gestor personalizado asignado durante todo el proceso',
      'Estudio inicial de la operación y documentación disponible',
      'Redacción de contrato de reserva y contrato de arras',
      'Ayuda para recabar certificados, nota simple, IBI y comunidad',
      'Asesoramiento continuo hasta la firma de escritura',
      'Coordinación con notaría y compradores',
    ],
    pasos: [
      { num: '01', titulo: 'Contrata el servicio', desc: 'Cuéntanos tu caso: precio, comprador, estado de la documentación y plazos previstos.' },
      { num: '02', titulo: 'Documentación y contratos', desc: 'Tu gestor revisa la operación, redacta reserva y arras, y te guía para completar la documentación.' },
      { num: '03', titulo: 'Hasta escritura', desc: 'Seguimiento continuo con comprador y notaría hasta el día de la firma.' },
    ],
    faq: [
      {
        q: '¿Incluye encontrar comprador?',
        a: 'No. Inmonest no es una agencia inmobiliaria. Te acompañamos cuando ya tienes comprador o estás negociando con uno.',
      },
      {
        q: '¿Qué diferencia hay con asesoramiento arras-venta?',
        a: 'La venta completa empieza antes de las arras (reserva incluida). El asesoramiento arras-venta es para quien ya firmó arras y necesita ayuda hasta escritura.',
      },
      {
        q: '¿Cuánto dura el servicio?',
        a: 'Desde que lo contratas hasta la escritura. Habitualmente entre 1 y 3 meses según hipoteca del comprador y notaría.',
      },
      {
        q: '¿Puedo contratar si ya tengo comprador y solo necesito contratos?',
        a: 'Sí. Adaptamos el servicio a la fase en la que estés: reserva, arras o preparación de escritura.',
      },
    ],
    relacionados: [
      { slug: 'asesoramiento-arras-venta', nombre: 'Asesoramiento Arras-Venta', precio: 166 },
      { slug: 'arras-penitenciales', nombre: 'Arras Penitenciales', precio: 145 },
      { slug: 'reserva-compra', nombre: 'Reserva de Compra', precio: 61 },
    ],
  },

  'revision-correccion': {
    nombre: 'Revisión + Corrección de Contrato',
    precio: p('revision-correccion', 120),
    categoria: 'Revisiones',
    tagline: 'Análisis del borrador y versión corregida lista para negociar',
    descripcion:
      'Más allá de detectar problemas, este servicio entrega una versión corregida del contrato con las cláusulas ajustadas y argumentos legales para negociar con la otra parte. Ideal cuando ya tienes un borrador — de agencia, banco o la contraparte — y necesitas no solo un informe, sino un documento mejorado que puedas presentar en la mesa de negociación.',
    image: '/gestoria14.jpg',
    imageAlt: 'Revisión y corrección de contrato inmobiliario',
    paraQuien: [
      'Compradores o inquilinos con borrador que quieren proponer cambios concretos',
      'Propietarios que reciben contrato desequilibrado y necesitan contrapropuesta',
      'Operaciones donde hay poco margen de tiempo antes de firmar',
      'Quien ya contrató revisión simple y necesita la versión corregida',
    ],
    incluye: [
      'Análisis completo de cláusulas y riesgos legales',
      'Informe de puntos críticos a negociar',
      'Versión corregida del contrato en PDF',
      'Argumentos legales para defender los cambios',
      'Asesoramiento por email · Entrega en 48h',
    ],
    pasos: [
      { num: '01', titulo: 'Envía el borrador', desc: 'Sube el PDF del contrato que quieres revisar y corregir (arras, alquiler, compraventa, etc.).' },
      { num: '02', titulo: 'Análisis y redacción', desc: 'Tu gestor identifica cláusulas problemáticas y prepara la versión corregida.' },
      { num: '03', titulo: 'Entrega en 48h', desc: 'Recibes informe, contrato corregido y guía para negociar con la otra parte.' },
    ],
    faq: [
      {
        q: '¿Qué diferencia hay con la revisión simple?',
        a: 'La revisión simple (60€) entrega informe de riesgos. Esta incluye además la versión corregida del contrato y argumentos para negociar.',
      },
      {
        q: '¿Sirve para cualquier tipo de contrato?',
        a: 'Sí: arras, alquiler LAU, compraventa privada, préstamo entre particulares, etc. Si es muy específico, tu gestor te lo confirmará al recibir el borrador.',
      },
      {
        q: '¿La otra parte está obligada a aceptar los cambios?',
        a: 'No. Entregamos una propuesta jurídicamente sólida; la negociación final es entre las partes.',
      },
      {
        q: '¿Puedo pedir solo correcciones puntuales?',
        a: 'Sí. Indica en el formulario qué cláusulas te preocupan y priorizamos esas secciones en la corrección.',
      },
    ],
    relacionados: [
      { slug: 'revision-arras', nombre: 'Revisión Arras', precio: 60 },
      { slug: 'revision-alquiler', nombre: 'Revisión Alquiler', precio: 120 },
      { slug: 'revision-correccion-arras', nombre: 'Corrección Arras', precio: 120 },
    ],
  },

  'revision-correccion-arras': {
    nombre: 'Revisión + Corrección de Contrato de Arras',
    precio: p('revision-correccion-arras', 120),
    categoria: 'Revisiones',
    tagline: 'Revisión especializada de arras con versión corregida antes de entregar la señal',
    descripcion:
      'Las arras concentran el mayor riesgo económico de la compraventa: penitenciales, plazos, cargas ocultas y datos registrales incorrectos pueden costarte miles de euros. Este servicio combina revisión experta del borrador de arras con una versión corregida y argumentos para negociar con el vendedor o su agencia antes de firmar.',
    image: '/contratodearras.jpg',
    imageAlt: 'Revisión y corrección de contrato de arras',
    paraQuien: [
      'Compradores a punto de firmar arras con borrador del vendedor o agencia',
      'Quien detecta cláusulas confusas sobre penitenciales o plazos',
      'Operaciones con hipoteca pendiente que necesitan cláusula suspensiva clara',
      'Compradores que quieren proponer cambios concretos, no solo un informe',
    ],
    incluye: [
      'Análisis de cláusulas penitenciales vs confirmatorias',
      'Verificación de coherencia con nota simple registral',
      'Detección de cargas, plazos abusivos y condiciones resolutorias',
      'Versión corregida del contrato de arras',
      'Argumentos legales para negociar · Entrega en 48h',
    ],
    pasos: [
      { num: '01', titulo: 'Envía el borrador de arras', desc: 'PDF del contrato propuesto, precio acordado e importe de la señal si lo conoces.' },
      { num: '02', titulo: 'Auditoría y corrección', desc: 'Revisión registral, cláusulas críticas y redacción de la versión mejorada.' },
      { num: '03', titulo: 'Negocia con seguridad', desc: 'Informe, contrato corregido y guía para presentar cambios al vendedor.' },
    ],
    faq: [
      {
        q: '¿Necesito aportar la nota simple?',
        a: 'Recomendable. Si la aportas, verificamos que titular, cargas y descripción coinciden con el contrato.',
      },
      {
        q: '¿Qué pasa si el vendedor no acepta cambios?',
        a: 'Al menos sabrás qué riesgos asumes al firmar. Muchas cláusulas abusivas son impugnables, pero mejor negociar antes.',
      },
      {
        q: '¿Incluye redacción de arras desde cero?',
        a: 'No. Para redactar arras nuevas, contrata arras penitenciales o confirmatorias. Este servicio parte de un borrador existente.',
      },
      {
        q: '¿Cuánto tarda la entrega?',
        a: '48 horas laborables desde que recibimos el borrador completo.',
      },
    ],
    relacionados: [
      { slug: 'revision-arras', nombre: 'Revisión Arras', precio: 60 },
      { slug: 'arras-penitenciales', nombre: 'Arras Penitenciales', precio: 145 },
      { slug: 'pack-due-diligence-precompra', nombre: 'Due Diligence', precio: 350 },
    ],
  },

  'pack-due-diligence-precompra': {
    nombre: 'Pack Due Diligence Pre-Compra',
    precio: p('pack-due-diligence-precompra', 350),
    categoria: 'Servicios Premium',
    tagline: 'Verificación documental completa tras arras y antes de escriturar',
    descripcion:
      'Ya firmaste arras y ahora necesitas certeza antes de escriturar. El pack due diligence revisa actas de comunidad, derramas pendientes, ITE del edificio, nota registral actualizada e información urbanística. Detectamos problemas ocultos — deudas con la comunidad, obras ilegales, cargas no declaradas — antes de que sea tarde. Informe ejecutivo en PDF en 3–5 días laborables.',
    image: '/gestoria1.jpg',
    imageAlt: 'Due diligence pre-compra de vivienda',
    paraQuien: [
      'Compradores que ya firmaron arras y quieren verificar todo antes de escritura',
      'Operaciones en edificios antiguos o con comunidad de propietarios',
      'Quien sospecha derramas, obras sin licencia o cargas no reflejadas en arras',
      'Compradores que no quieren sorpresas a última hora en notaría',
    ],
    incluye: [
      'Revisión de actas de comunidad (últimos 2 años)',
      'Análisis de derramas pendientes o aprobadas',
      'Verificación del ITE del edificio si aplica',
      'Nota registral actualizada y coherencia con la operación',
      'Información urbanística y licencias cuando esté disponible',
      'Informe ejecutivo PDF en 3–5 días laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Contrata y envía docs', desc: 'Indica datos del inmueble y aporta arras, nota simple y documentación de comunidad si la tienes.' },
      { num: '02', titulo: 'Auditoría documental', desc: 'Tu gestor solicita y analiza actas, ITE, registros y urbanismo según el caso.' },
      { num: '03', titulo: 'Informe ejecutivo', desc: 'Recibes PDF con hallazgos, riesgos y recomendaciones antes de ir a notaría.' },
    ],
    faq: [
      {
        q: '¿Cuándo debo contratar due diligence?',
        a: 'Idealmente justo después de firmar arras y antes de escriturar. También sirve si estás a punto de arras y quieres verificar antes de la señal.',
      },
      {
        q: '¿Sustituye a un abogado?',
        a: 'Es un servicio de verificación documental especializado en compraventa entre particulares. Casos muy litigiosos pueden requerir abogado adicional.',
      },
      {
        q: '¿Qué pasa si encontráis problemas graves?',
        a: 'El informe detalla riesgos y opciones: negociar con vendedor, resolver antes de escritura o desistir si hay cláusula que lo permita.',
      },
      {
        q: '¿Incluye visita física al inmueble?',
        a: 'No incluye visita técnica in situ. Nos centramos en documentación legal, registral, comunidad e urbanística.',
      },
    ],
    relacionados: [
      { slug: 'revision-arras', nombre: 'Revisión Arras', precio: 60 },
      { slug: 'compra-completa-reserva-escritura', nombre: 'Compra Completa', precio: 687 },
      { slug: 'acompanamiento-reserva-arras', nombre: 'Reserva → Arras', precio: 424 },
    ],
  },

  'contrato-compraventa': {
    nombre: 'Contrato de Compraventa de Vivienda',
    precio: p('contrato-compraventa', 145),
    categoria: 'Compraventa',
    tagline: 'Documento privado de compraventa personalizado, listo para firmar',
    descripcion:
      'El contrato privado de compraventa formaliza la venta entre particulares antes o en lugar de ciertos pasos intermedios. Define precio, forma de pago, fecha de entrega, garantías y saneamiento por vicios ocultos. A diferencia de las arras, puede estructurarse como compraventa directa cuando las partes quieren un documento más completo sin esperar a la escritura notarial.',
    image: '/contrato4.jpg',
    imageAlt: 'Contrato privado de compraventa de vivienda',
    paraQuien: [
      'Compradores y vendedores que quieren un contrato privado completo',
      'Operaciones entre particulares sin agencia',
      'Casos donde se necesita documento de compraventa antes de escritura',
      'Quien busca cláusulas de protección equilibradas para ambas partes',
    ],
    incluye: [
      'Redacción personalizada con datos reales de las partes',
      'Precio, calendario de pagos y forma de entrega de llaves',
      'Garantías y saneamiento por vicios ocultos',
      'Condiciones suspensivas si aplican (hipoteca, licencias)',
      'PDF firmable en 48 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Datos de la operación', desc: 'Comprador, vendedor, inmueble, precio, pagos previstos y plazos de entrega.' },
      { num: '02', titulo: 'Redacción jurídica', desc: 'Cláusulas de protección, garantías y condiciones adaptadas a tu compraventa.' },
      { num: '03', titulo: 'Entrega en 48h', desc: 'PDF listo para firma privada con guía para ambas partes.' },
    ],
    faq: [
      {
        q: '¿Sustituye a la escritura notarial?',
        a: 'No. La escritura pública ante notario es obligatoria para inscribir la propiedad. El contrato privado complementa o anticipa compromisos entre particulares.',
      },
      {
        q: '¿Compraventa privada o arras?',
        a: 'Las arras son el estándar en España para operaciones inmobiliarias. La compraventa privada encaja en operaciones específicas; tu gestor te orienta según tu caso.',
      },
      {
        q: '¿Incluye revisión de nota simple?',
        a: 'Podemos incorporar verificación registral básica. Para auditoría completa, considera due diligence o compra completa.',
      },
      {
        q: '¿Válido para vivienda con hipoteca pendiente?',
        a: 'Sí, con cláusulas sobre cancelación de hipoteca del vendedor y aplazamiento de escritura hasta que quede libre de cargas.',
      },
    ],
    relacionados: [
      { slug: 'arras-penitenciales', nombre: 'Arras Penitenciales', precio: 145 },
      { slug: 'reserva-compra', nombre: 'Reserva de Compra', precio: 61 },
      { slug: 'revision-arras', nombre: 'Revisión Arras', precio: 60 },
    ],
  },

  'ayuda-propietarios': {
    nombre: 'Redacción LAU para Propietarios',
    precio: p('ayuda-propietarios', 73),
    categoria: 'Alquiler',
    tagline: 'Contrato LAU orientado a propietarios que alquilan por primera vez',
    descripcion:
      'Alquilar tu piso por primera vez implica riesgos: contratos desactualizados, fianzas mal calculadas, cláusulas nulas y conflictos con inquilinos. Este servicio redacta un contrato LAU adaptado a la Ley de Vivienda 2026 con cláusulas que protegen al propietario dentro de la legalidad: actualización de renta, inventario, garantías y resolución del contrato.',
    image: '/promo3.png',
    imageAlt: 'Contrato LAU para propietarios',
    paraQuien: [
      'Propietarios primerizos que van a alquilar su vivienda habitual',
      'Quien hereda un piso y quiere alquilarlo con seguridad jurídica',
      'Propietarios que usaron contratos genéricos de internet y quieren uno válido',
      'Arrendadores en zonas tensionadas que necesitan cumplir normativa autonómica',
    ],
    incluye: [
      'Contrato LAU conforme Ley de Vivienda 2026',
      'Cláusulas de protección del propietario dentro de la legalidad',
      'Inventario de bienes muebles si aplica',
      'Fianza, garantías adicionales y actualización IPC',
      'PDF firmable en 48 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Cuéntanos tu piso', desc: 'Dirección, renta, mobiliario, zona tensionada sí/no y perfil del inquilino previsto.' },
      { num: '02', titulo: 'Redacción LAU', desc: 'Contrato personalizado con cláusulas válidas y orientación para el propietario.' },
      { num: '03', titulo: 'Entrega y guía', desc: 'PDF en 48h con instrucciones de firma, fianza y depósito en organismo autonómico.' },
    ],
    faq: [
      {
        q: '¿Protege contra impagos?',
        a: 'Un contrato LAU bien redactado facilita reclamaciones legales, pero no sustituye seguros de impago o aval. Te orientamos sobre garantías adicionales permitidas.',
      },
      {
        q: '¿Diferencia con contrato alquiler LAU estándar?',
        a: 'El contenido base es similar; este servicio incluye explicaciones orientadas al propietario y cláusulas pensadas para quien alquila por primera vez.',
      },
      {
        q: '¿Incluye revisión del inquilino?',
        a: 'No. Nos centramos en el contrato. La solvencia del inquilino es responsabilidad del propietario.',
      },
      {
        q: '¿Válido en toda España?',
        a: 'Sí, adaptado a LAU estatal y Ley de Vivienda. Algunas CCAA tienen requisitos extra de depósito de fianza que te indicamos.',
      },
    ],
    relacionados: [
      { slug: 'contrato-alquiler', nombre: 'Contrato Alquiler LAU', precio: 145 },
      { slug: 'alquiler-habitaciones', nombre: 'Alquiler Habitación', precio: 145 },
      { slug: 'rescision-alquiler', nombre: 'Rescisión Alquiler', precio: 120 },
    ],
  },

  'contrato-ilegal': {
    nombre: 'Análisis de Fraude Inmobiliario',
    precio: p('contrato-ilegal', 145),
    categoria: 'Revisiones',
    tagline: 'Detecta estafas y contratos irregulares antes de transferir dinero',
    descripcion:
      'Operaciones con señales de alerta — precios demasiado bajos, prisas por transferir, documentación incompleta o vendedores evasivos — merecen una revisión urgente antes de pagar. Este análisis verifica documentación, nota simple y coherencia de la operación para detectar indicios de fraude. Entrega urgente en 12 horas laborables.',
    image: '/contrato2.jpg',
    imageAlt: 'Análisis de fraude inmobiliario',
    paraQuien: [
      'Compradores con dudas sobre la legitimidad de una operación',
      'Quien detecta inconsistencias en DNI, titularidad o contrato',
      'Operaciones por internet o con intermediarios desconocidos',
      'Inquilinos ante contratos o fianzas sospechosas',
    ],
    incluye: [
      'Verificación de coherencia documental básica',
      'Análisis de señales de fraude habituales en el mercado',
      'Revisión de nota simple si la aportas',
      'Informe de riesgos críticos con recomendación clara',
      'Entrega urgente en 12 horas laborables',
    ],
    pasos: [
      { num: '01', titulo: 'Describe la alerta', desc: 'Cuéntanos qué te preocupa y adjunta contrato, anuncio o documentación disponible.' },
      { num: '02', titulo: 'Análisis urgente', desc: 'Tu gestor revisa coherencia, titularidad y señales de estafa conocidas.' },
      { num: '03', titulo: 'Informe en 12h', desc: 'Recibes conclusión clara: continuar, exigir más documentación o no pagar.' },
    ],
    faq: [
      {
        q: '¿Sustituye a una denuncia policial?',
        a: 'No. Si confirmamos indicios graves de estafa, te recomendamos no pagar y acudir a las autoridades.',
      },
      {
        q: '¿Qué documentación necesito?',
        a: 'Cualquier cosa que tengas: contrato, capturas del anuncio, DNI del supuesto vendedor, nota simple. Cuanto más, mejor.',
      },
      {
        q: '¿Solo para compraventa?',
        a: 'Principalmente compraventa y alquiler, pero también señales de fraude en reservas o préstamos privados.',
      },
      {
        q: '¿Es confidencial?',
        a: 'Sí. Toda la documentación se trata con confidencialidad y solo se usa para el análisis.',
      },
    ],
    relacionados: [
      { slug: 'revision-arras', nombre: 'Revisión Arras', precio: 60 },
      { slug: 'revision-alquiler', nombre: 'Revisión Alquiler', precio: 120 },
      { slug: 'pack-due-diligence-precompra', nombre: 'Due Diligence', precio: 350 },
    ],
  },

  'asesoramiento-arras-venta': {
    nombre: 'Asesoramiento Arras hasta Escritura (Vendedores)',
    precio: p('asesoramiento-arras-venta', 166),
    categoria: 'Servicios Premium',
    tagline: 'Para vendedores que ya firmaron arras: documentación y camino hasta notaría',
    descripcion:
      'Ya vendiste en arras y ahora necesitas recabar certificados, coordinar con el comprador y llegar a escritura sin errores. Este servicio asigna un gestor experto que te guía en la documentación autonómica, plazos, cancelación de hipoteca si aplica y coordinación con notaría. No incluye redacción de arras (ya firmadas), sino acompañamiento operativo y jurídico hasta la firma.',
    image: '/gestoria12.jpg',
    imageAlt: 'Asesoramiento al vendedor desde arras hasta escritura',
    paraQuien: [
      'Propietarios vendedores que ya firmaron arras con comprador',
      'Quien no sabe qué certificados debe entregar según su CCAA',
      'Vendedores con hipoteca pendiente que deben cancelar antes de escritura',
      'Operaciones entre particulares sin agencia que necesitan guía',
    ],
    incluye: [
      'Gestor experto de Inmonest asignado',
      'Listado y ayuda para recabar documentación de venta',
      'Gestión orientativa de trámites y plazos',
      'Acompañamiento desde arras hasta escritura',
      'Coordinación con notaría y compradores',
      'No incluye redacción del contrato de arras',
    ],
    pasos: [
      { num: '01', titulo: 'Activa el servicio', desc: 'Indica datos de la operación, fecha de arras y documentación que ya tienes.' },
      { num: '02', titulo: 'Plan de documentación', desc: 'Tu gestor define qué falta: nota simple, IBI, certificado energético, comunidad, etc.' },
      { num: '03', titulo: 'Hasta escritura', desc: 'Seguimiento con comprador y notaría hasta el día de la firma.' },
    ],
    faq: [
      {
        q: '¿Redactáis las arras?',
        a: 'No. Este servicio es posterior a la firma de arras. Para redactar arras, contrata arras penitenciales o venta completa.',
      },
      {
        q: '¿Diferencia con venta completa?',
        a: 'La venta completa incluye reserva, arras y todo el proceso desde el inicio. Este servicio empieza cuando ya tienes arras firmadas.',
      },
      {
        q: '¿Cuánto dura?',
        a: 'Hasta la escritura, habitualmente 1–3 meses según hipoteca del comprador y trámites.',
      },
      {
        q: '¿Ayudáis a cancelar mi hipoteca?',
        a: 'Te orientamos en plazos y coordinación con el banco. La negociación con la entidad es responsabilidad del titular.',
      },
    ],
    relacionados: [
      { slug: 'venta-completa-reserva-escritura', nombre: 'Venta Completa', precio: 687 },
      { slug: 'arras-penitenciales', nombre: 'Arras Penitenciales', precio: 145 },
      { slug: 'reserva-compra', nombre: 'Reserva de Compra', precio: 61 },
    ],
  },
}
