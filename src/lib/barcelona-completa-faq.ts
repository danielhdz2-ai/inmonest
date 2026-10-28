export type FaqItem = { q: string; a: string }

const PRECO = 687

/** FAQ extensa venta completa Barcelona — se combina con preguntas locales del barrio */
export function getBarcelonaVentaCompletaFaq(barrioNombre: string, local: FaqItem[] = []): FaqItem[] {
  const b = barrioNombre
  const base: FaqItem[] = [
    {
      q: `¿Cuánto cuesta la venta completa en ${b}?`,
      a: `${PRECO} € IVA incluido, tarifa plana. No cobramos porcentaje sobre el precio del piso ni comisión de agencia. Un único pago por acompañamiento desde que tienes comprador hasta escritura.`,
    },
    {
      q: '¿Inmonest busca comprador por mí?',
      a: 'No. Somos gestoría inmobiliaria, no agencia de captación. El servicio empieza cuando ya tienes comprador particular o estás negociando precio y condiciones con uno.',
    },
    {
      q: '¿Qué incluye exactamente el pack venta completa?',
      a: 'Gestor inmobiliario asignado, estudio de la operación, redacción o revisión de reserva y arras, checklist documental (nota simple, cédula, ITE, comunidad, IBI…), coordinación con notaría, orientación sobre plusvalía (IIVTNU) e IRPF del vendedor, y seguimiento por panel, WhatsApp y teléfono hasta la firma.',
    },
    {
      q: '¿Puedo hacer el trámite 100 % online desde Barcelona?',
      a: 'Sí. Contratación, subida de documentos, borradores y revisiones se gestionan en el panel mi-cuenta/contratos y con tu gestor por videollamada. Válido en todo el municipio y en Cataluña.',
    },
    {
      q: '¿Hay atención presencial en Barcelona?',
      a: 'Sí, sin suplemento. Despacho en Carrer de Mejía Lequerica, 44, Les Corts (08028). Cita previa para entregar originales, firmar autorizaciones o revisar expediente en persona.',
    },
    {
      q: '¿Redactáis arras penitenciales y confirmatorias?',
      a: 'Sí. Adaptamos el tipo de arras a vuestra operación (desistimiento con penalización o compromiso firme de ir a escritura), con cláusula de financiación del comprador cuando hay hipoteca.',
    },
    {
      q: 'Ya firmé la reserva con el comprador, ¿llego tarde?',
      a: 'No necesariamente. Revisamos lo firmado, detectamos cláusulas desfavorables y te guiamos en arras y documentación. Lo ideal es contratar antes de entregar señal alta.',
    },
    {
      q: '¿Incluye cancelar mi hipoteca como vendedor?',
      a: 'Te orientamos sobre cancelación registral y coordinación con el banco; el coste de cancelación y provisión bancaria va aparte. En las arras fijamos plazos realistas para levantar la carga antes de escritura.',
    },
    {
      q: '¿Cuánto tarda la venta hasta notaría en Barcelona?',
      a: 'Habitualmente entre 6 y 12 semanas: depende de la hipoteca del comprador, certificados (cédula, ITE), derramas de comunidad y agenda notarial. Tu gestor te da calendario desde la primera llamada.',
    },
    {
      q: '¿Qué documentos pide la notaría en Cataluña?',
      a: 'Entre otros: DNI/NIE de titulares, escrituras, nota simple reciente, certificado de eficiencia energética, cédula de habitabilidad, certificado de deudas de comunidad, IBI al corriente y, si aplica, licencias de obra. Te guiamos en cada trámite.',
    },
    {
      q: '¿El comprador tiene gestoría propia, os coordináis?',
      a: 'Sí. Es habitual en ventas entre particulares. Alineamos plazos de arras, condiciones suspensivas y entrega documental para que notaría no rechace el expediente.',
    },
    {
      q: '¿687 € incluye honorarios de notaría o impuestos?',
      a: 'No. Notaría, registro e impuestos del vendedor (plusvalía municipal, etc.) se pagan aparte según tarifas oficiales. Nuestro precio es solo la gestoría Inmonest hasta coordinación y asesoramiento en la minuta.',
    },
    {
      q: '¿Qué es la plusvalía (IIVTNU) al vender en Barcelona?',
      a: 'Impuesto municipal sobre el incremento del valor del suelo. Te orientamos sobre quién lo liquida, plazos y bonificaciones que puedan aplicar en el Ayuntamiento de Barcelona según tu caso.',
    },
    {
      q: '¿Debo declarar la venta en el IRPF?',
      a: 'Si hay ganancia patrimonial puede haber tributación estatal. Te damos orientación general; para planificación fiscal compleja recomendamos asesor fiscal colaborador si lo necesitas.',
    },
    {
      q: '¿Sirve si vendo a extranjero no residente?',
      a: 'Sí, con matices de retención y documentación. Tu gestor repasa requisitos de notaría y posibles certificados adicionales antes de fijar fecha de escritura.',
    },
    {
      q: '¿Puedo vender si hay usufructo o herencia pendiente?',
      a: 'Depende del título registral. Analizamos nota simple y te indicamos si conviene esperar adjudication o incluir cláusulas específicas. Operaciones hereditarias suelen necesitar más plazo.',
    },
    {
      q: '¿Qué pasa si el comprador no consigue la hipoteca?',
      a: 'Las arras deben incluir cláusula suspensiva bien redactada: plazo, documentación exigible y consecuencias si el banco deniega. Lo redactamos o corregimos en el pack.',
    },
    {
      q: '¿Hay ITE obligatoria en mi edificio?',
      a: 'En Barcelona muchos edificios tienen inspección técnica periódica. Verificamos si afecta a tu venta y si la comunidad tiene ITE favorable o plan de obras pendiente.',
    },
    {
      q: '¿Gestionáis la baja de suministros y cambio de titularidad?',
      a: 'Te indicamos lecturas finales y pasos con luz, agua y gas; la baja contractual suele hacerse tras escritura. No somos comercializadora, pero el checklist evita sorpresas el día del cierre.',
    },
    {
      q: '¿Cuánto ahorro frente a una agencia en Barcelona?',
      a: 'En un piso de 350.000 € una agencia al 3–5 % cobraría 10.500–17.500 €. Frente a 687 € de gestoría el ahorro en honorarios de intermediación es muy superior; tú sigues encontrando al comprador.',
    },
    {
      q: '¿Cómo funciona el panel de cliente?',
      a: 'Tras contratar ves el estado del expediente, subes PDFs, descargas borradores y hablas con tu gestor. Mismo acceso en móvil y ordenador.',
    },
    {
      q: '¿Puedo contratar solo arras y luego ampliar a venta completa?',
      a: 'Contacta con tu gestor. Si ya pagaste arras con Inmonest, valoramos crédito o upgrade hacia el pack completo según la fase en la que estés.',
    },
    {
      q: `¿Tenéis experiencia vendiendo en ${b}?`,
      a: `Trabajamos ventas entre particulares en todo Barcelona: ${b} incluido. Conocemos dinámica de mercado local, documentación de la Generalitat y práctica notarial habitual en la zona.`,
    },
    {
      q: '¿Qué diferencia hay con el asesoramiento arras-venta (350 €)?',
      a: 'El asesoramiento arras-venta cubre sobre todo la fase posterior a arras firmadas. La venta completa empieza antes (reserva, arras, documentación integral y coordinación hasta escritura).',
    },
    {
      q: '¿Emitís factura y contrato de prestación de servicios?',
      a: 'Sí. Factura con IVA incluido y condiciones claras de alcance del servicio premium.',
    },
  ]

  const seen = new Set<string>()
  const merged: FaqItem[] = []
  for (const item of [...local, ...base]) {
    const key = item.q.trim()
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }
  return merged
}

/** FAQ extensa compra completa Barcelona */
export function getBarcelonaCompraCompletaFaq(barrioNombre: string, local: FaqItem[] = []): FaqItem[] {
  const b = barrioNombre
  const base: FaqItem[] = [
    {
      q: `¿Cuánto cuesta la compra completa en ${b}?`,
      a: `${PRECO} € IVA incluido por acompañamiento integral como comprador particular: due diligence, arras, seguimiento hipoteca y coordinación hasta escritura.`,
    },
    {
      q: '¿Revisáis la nota simple antes de las arras?',
      a: 'Sí. Analizamos titularidad, cargas, hipotecas, embargos, usufructos y anotaciones. Te explicamos riesgos antes de entregar señal elevada.',
    },
    {
      q: '¿Redactáis cláusula de financiación en las arras?',
      a: 'Sí. Plazo para obtener hipoteca, documentación al banco y consecuencias si deniegan o aprueban en condiciones distintas.',
    },
    {
      q: '¿Incluye negociar con el vendedor?',
      a: 'Te asesoramos sobre cláusulas y documentación pendiente; la negociación comercial del precio sigue siendo tuya. Podemos indicar argumentos jurídicos cuando hay incumplimientos.',
    },
    {
      q: '¿Trámite online o presencial en Barcelona?',
      a: 'Online por defecto con panel y gestor. Presencial en Mejía Lequerica 44 (Les Corts) con cita si quieres revisar papeles en mano.',
    },
    {
      q: '¿Qué pasa con derramas de la comunidad?',
      a: 'Solicitamos certificado de deudas y revisamos actas recientes. Derramas aprobadas no pagadas pueden ser motivo de renegociación antes de arras.',
    },
    {
      q: '¿Verificáis cédula de habitabilidad e ITE?',
      a: 'Sí en el pack completo. En Cataluña son puntos críticos; detectar caducidad o obras sin licencia evita bloqueos en notaría.',
    },
    {
      q: '¿Coordináis con mi banco hipotecario?',
      a: 'Te guiamos en plazos de tasación, FEIN y provisión de fondos. No somos intermediarios financieros, pero alineamos fechas con el vendedor y notaría.',
    },
    {
      q: '¿687 € incluye ITP y notaría?',
      a: 'No. El Impuesto de Transmisiones Patrimoniales (ITP) en Cataluña y gastos de notaría/registro los abona el comprador aparte. Incluye gestoría Inmonest.',
    },
    {
      q: '¿Puedo contratar si ya firmé arras?',
      a: 'Sí. Incorporamos en la fase actual: revisión de lo firmado, documentación pendiente y camino a escritura.',
    },
    {
      q: '¿Due diligence y compra completa son lo mismo?',
      a: 'El pack compra completa incluye revisión documental profunda más acompañamiento continuo hasta firma. El due diligence puntual (350 €) se centra en informe tras arras.',
    },
    {
      q: '¿Compráis en nombre de sociedad o solo particulares?',
      a: 'Principalmente particulares y autónomos. Si compra una SL, indícalo al contratar para adaptar checklist.',
    },
    {
      q: `¿Conocéis el mercado de ${b} para compradores?`,
      a: `Sí. Conocemos operaciones en ${b} y Barcelona: plazos habituales, exigencias de comunidades de propietarios y documentación típica en la zona.`,
    },
    {
      q: '¿Revisáis la minuta de escritura antes de ir a notaría?',
      a: 'Sí. Verificamos coherencia con arras, precio, cargas canceladas y descripción registral.',
    },
    {
      q: '¿Qué documentos debo preparar yo como comprador?',
      a: 'DNI/NIE, justificante de origen de fondos si el banco lo exige, seguros si aplican y coordinación de firma de hipoteca. Tu gestor te envía lista personalizada.',
    },
    {
      q: '¿Hay límite de precio del piso?',
      a: 'No. La tarifa es plana independientemente del precio de compra.',
    },
    {
      q: '¿Cómo empiezo?',
      a: 'Contratas online en 3 minutos, pago seguro, y en menos de 24 h laborables te asignamos gestor con teléfono directo.',
    },
  ]

  const seen = new Set<string>()
  const merged: FaqItem[] = []
  for (const item of [...local, ...base]) {
    const key = item.q.trim()
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }
  return merged
}

export function barrioCompletaTestimoniosLanding(modo: 'venta' | 'compra', slug: string): string {
  return `${modo}-completa-bcn-${slug}`
}
