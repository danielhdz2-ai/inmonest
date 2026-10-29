import type { CompletaServicioModo } from '@/lib/completa-reserva-escritura-pasos-content'

export type BarcelonaCompletaEditorial = {
  guiaTitulo: string
  intro: string[]
  trámiteLocal: { titulo: string; cuerpo: string }
  casos: { titulo: string; cuerpo: string }[]
  normativa: { titulo: string; items: string[] }
  caNota: string
}

type Hook = { venta: string[]; compra: string[] }

/** Ángulo único por slug — el resto del bloque se compone con nombre/distrito. */
const HOOKS: Record<string, Hook> = {
  eixample: {
    venta: [
      'En el Eixample (Dreta, Esquerra o Sant Antoni) el comprador suele pedir certificado de deudas de comunidad y coherencia entre precio en arras e ITP antes de transferir la señal. El pack 687 € cubre redacción de contratos y checklist hasta notaría sin comisión de captación.',
      'Muchas operaciones combinan herencia y piso vacío: revisamos titularidad en Registro y orientamos sobre plusvalía municipal (IIVTNU) en el Ayuntamiento de Barcelona.',
    ],
    compra: [
      'Comprar en el Eixample a particular implica competir por plazo: la due diligence registral y de comunidad debe cerrarse en días, no en semanas. Blindamos arras con cláusula de financiación realista.',
      'En fincas de finales del XIX conviene verificar ITE del edificio y derramas de fachada antes de entregar señal elevada.',
    ],
  },
  gracia: {
    venta: [
      'Gràcia mezcla ventas boca a boca y compradores que comparan varias opciones en el mismo distrito. Arras mal redactadas son la principal causa de conflicto; las adaptamos a plazos de hipoteca y penalizaciones equilibradas.',
      'Terrazas y locales integrados exigen coherencia catastral: lo revisamos antes de fijar fecha en notaría.',
    ],
    compra: [
      'En Gràcia los vendedores a veces entregan borrador de arras copiado de otra operación. Lo corregimos o redactamos uno nuevo con condiciones suspensivas a tu favor.',
      'Comunidades activas en obras: pedimos actas recientes y certificado de deudas en cada compra.',
    ],
  },
  sants: {
    venta: [
      'Sants-Montjuïc concentra fincas con ITE pendiente y compradores con hipoteca. Las arras deben prever prórroga si el banco tarda; lo incluimos en el pack venta completa.',
      'Operaciones entre familias: simplificamos checklist sin saltarnos certificados obligatorios de la Generalitat.',
    ],
    compra: [
      'Hostafrancs y Sants comparten edificios con inspección técnica: detectamos estado del edificio antes de arras.',
      'Si el precio parece bajo, suele haber derrama o cargo oculto — la nota simple no basta sin revisar actas.',
    ],
  },
  poblenou: {
    venta: [
      'Poblenou y 22@: compradores piden due diligence antes de señal alta. Entregamos expediente ordenado (nota simple, cédula, energético, comunidad) para no retrasar la venta.',
      'Lofts reformados: verificamos licencias de obra en operaciones de compraventa entre particulares.',
    ],
    compra: [
      'En Poblenou el stock rehabilitado exige revisar licencia de reforma y certificado final de obra cuando aplica.',
      'Plazos cortos: respondemos en horario laborable para no perder el piso frente a otra oferta.',
    ],
  },
  'les-corts': {
    venta: [
      'Les Corts es donde está nuestro despacho (Mejía Lequerica 44): puedes combinar panel online con entrega de originales el mismo día de la cita.',
      'Zona Universitària y Pedralbes frontera: operaciones con usufructo o herencia necesitan calendario realista en arras.',
    ],
    compra: [
      'Comprar cerca del despacho Inmonest facilita revisar documentación en mano antes de firmar arras.',
      'Compradores jóvenes y familias: explicamos ITP en Cataluña y provisión de fondos paso a paso.',
    ],
  },
  sarria: {
    venta: [
      'Sarrià-Sant Gervasi y Tres Torres: operaciones de valor alto con dos gestorías en la mesa. Coordinamos plazos sin ceder tu posición como vendedor.',
      'Herencias y segundas residencias: analizamos nuda propiedad y cargas antes de reserva.',
    ],
    compra: [
      'En Sarrià el vendedor suele traer asesor: alineamos arras, condiciones suspensivas y entrega documental.',
      'Precio elevado no implica menos riesgo registral — revisamos usufructo y servidumbres.',
    ],
  },
  'sant-andreu': {
    venta: [
      'Sant Andreu y La Sagrera: ventas familiares tras herencia. Te guiamos en adjudicación si aún no está inscrita y en calendario hasta escritura.',
      'Reformas recientes: comprobamos licencia y cédula antes de que el comprador exija descuento.',
    ],
    compra: [
      'Compradores primerizos en Sant Andreu: checklist en castellano claro y gestor por WhatsApp.',
      'Fincas de los 60–70: ITE y ascensor en actas de comunidad son puntos críticos.',
    ],
  },
  'horta-guinardo': {
    venta: [
      'Horta-Guinardó: edificios en revisión técnica y derramas de accesibilidad. Anticipamos actas para no sorprender al comprador en notaría.',
      'Venta con hipoteca pendiente del vendedor: plazos de cancelación registral en arras.',
    ],
    compra: [
      'El Carmel y Horta comparten riesgo de derrama: lo detectamos antes de señal.',
      'Vistas y terrazas: verificamos descripción registral vs. realidad urbanística.',
    ],
  },
  'ciutat-vella': {
    venta: [
      'Ciutat Vella (Gòtic, Born, Raval, Barceloneta): fincas históricas con licencias y protección patrimonial. Revisamos coherencia urbanística antes de arras.',
      'Compradores internacionales: orientamos sobre documentación y plazos de notaría en Barcelona.',
    ],
    compra: [
      'Comprar en el Gòtic exige máxima cautela: obras sin licencia pueden bloquear escritura.',
      'Turismo y cambio de uso previo: repasamos historial cuando el vendedor lo declare.',
    ],
  },
  'diagonal-mar': {
    venta: [
      'Diagonal Mar y Vila Olímpica: operaciones rápidas con compradores corporativos. Expediente impecable en 48–72 h cuando hace falta.',
      'Edificios con portería y cuotas altas: certificado de deudas imprescindible antes de señal.',
    ],
    compra: [
      'Front marítim: due diligence acelerada sin saltar ITE ni comunidad.',
      'Segundas residencias: cláusulas de financiación y plazo a escritura calibradas.',
    ],
  },
  'sant-antoni': {
    venta: [
      'Sant Antoni (Eixample izquierdo): rotación alta y plazos cortos. Revisión de borrador de arras en 48 h laborables cuando ya tienes comprador.',
      'Reformas integrales: licencia y certificado energético al día para notaría.',
    ],
    compra: [
      'Mercado competitivo en Sant Antoni: no firmes arras sin cláusula suspensiva de hipoteca bien redactada.',
      'ITP Cataluña: orientación sobre base imponible coherente con precio en contrato.',
    ],
  },
  'nou-barris': {
    venta: [
      'Nou Barris, Verdum o Roquetes: ventas entre familias con hipoteca del comprador. Arras comprensibles y en castellano o catalán.',
      'Checklist accesible: no retrasamos la venta por papeles mal preparados.',
    ],
    compra: [
      'Compra accesible no significa menos protección legal: misma due diligence que en zona premium.',
      'Primera compra: gestor asignado explica cada hito hasta notaría.',
    ],
  },
  pedralbes: {
    venta: [
      'Pedralbes: operaciones de alto importe con escrutinio registral del comprador. Preparamos nota simple, cargas y certificados sin fisuras.',
      'Plusvalía e IRPF orientativos incluidos en el acompañamiento al vendedor.',
    ],
    compra: [
      'Pedralbes: verificar usufructo, nuda propiedad y cargas antes de señal elevada.',
      'Coordinación con banca privada y plazos de tasación en arras.',
    ],
  },
  barceloneta: {
    venta: [
      'La Barceloneta: fincas con historial de uso turístico o locales en planta baja. Revisamos coherencia antes de comprometer señal.',
      'Comunidades del front marítim: derramas de fachada frecuentes en actas.',
    ],
    compra: [
      'Comprar en la Barceloneta: humedades y estado del edificio — preguntamos actas e ITE.',
      'Plazos veraniegos: calendario realista en arras si hay hipoteca.',
    ],
  },
  'el-born': {
    venta: [
      'El Born (La Ribera): edificios protegidos y reformas con licencia. El expediente notarial debe estar cerrado antes de fijar fecha.',
      'Compradores exigentes: respondemos dudas de su gestoría sin demora.',
    ],
    compra: [
      'El Born: operaciones en días. Due diligence paralela a negociación de precio.',
      'Arrendamiento vigente: analizamos contrato LAU y plazo a vacío si aplica.',
    ],
  },
  hostafrancs: {
    venta: [
      'Hostafrancs y entorno Plaça Espanya: mezcla de finca antigua y obra nueva. ITE y comunidad en checklist prioritario.',
      'Vendedor con hipoteca: cancelación registral reflejada en arras y plazo a escritura.',
    ],
    compra: [
      'Hostafrancs: buen equilibrio precio/riesgo si la due diligence es rigurosa.',
      'Cláusulas de arras equilibradas cuando el vendedor presiona para señal rápida.',
    ],
  },
  'el-carmel': {
    venta: [
      'El Carmel y Turó de la Rovira: derramas y obras en edificios en pendiente. Actas recientes antes de arras.',
      'Compradores con hipoteca: cláusula suspensiva clara para el vendedor.',
    ],
    compra: [
      'El Carmel: detectar derrama aprobada no pagada antes de transferir señal.',
      'Coherencia catastral en terrazas y ampliaciones: revisión orientativa incluida.',
    ],
  },
}

export function getBarcelonaCompletaEditorial(
  modo: CompletaServicioModo,
  slug: string,
  nombre: string,
  distrito: string,
): BarcelonaCompletaEditorial {
  const hook = HOOKS[slug]?.[modo] ?? [
    modo === 'venta'
      ? `Vender en ${nombre} (${distrito}) entre particulares con pack 687 €: gestor, arras y camino a notaría sin comisión de agencia.`
      : `Comprar en ${nombre} con due diligence, arras blindadas y seguimiento hasta escritura por tarifa plana 687 €.`,
  ]

  const guiaTitulo =
    modo === 'venta'
      ? `Guía práctica: vender piso en ${nombre} (Barcelona) sin inmobiliaria`
      : `Guía práctica: comprar piso en ${nombre} a un particular con gestoría`

  const trámiteLocal =
    modo === 'venta'
      ? {
          titulo: `Trámites habituales al vender en ${nombre}`,
          cuerpo: `En Cataluña la notaría suele exigir cédula de habitabilidad vigente, certificado de eficiencia energético, certificado de deudas de la comunidad, nota simple reciente e IBI al corriente. En ${nombre}, dentro del distrito ${distrito}, tu gestor adapta el calendario a la hipoteca del comprador y a la cancelación de tu hipoteca si la tienes. El trámite puede ser 100 % online desde el panel mi-cuenta/contratos o con cita en Carrer de Mejía Lequerica 44 (Les Corts), a minutos de muchas zonas de Barcelona.`,
        }
      : {
          titulo: `Qué revisamos antes de las arras en ${nombre}`,
          cuerpo: `Como comprador en ${nombre} (${distrito}) el riesgo principal es entregar señal alta sin conocer cargas del vendedor, derramas de comunidad o estado del edificio (ITE). El pack compra completa incluye análisis de nota simple, actas, certificados y borrador de arras con cláusula de financiación. Coordinamos con el banco y la notaría hasta la minuta de escritura. ITP en Cataluña se liquida aparte; te orientamos sobre plazos y base imponible.`,
        }

  const casos =
    modo === 'venta'
      ? [
          {
            titulo: `Ya tengo comprador en ${nombre}`,
            cuerpo:
              'Contratas online 687 € IVA incluido, gestor en 24 h, redacción o revisión de reserva y arras, checklist documental y seguimiento hasta firma en notaría. No pagamos anuncios ni captamos comprador.',
          },
          {
            titulo: 'Herencia o varios titulares',
            cuerpo:
              'Revisamos titularidad registral, poderes y si conviene esperar adjudicación antes de firmar reserva. Cada titular debe comparecer en escritura con documentación alineada.',
          },
          {
            titulo: 'El comprador trae gestoría',
            cuerpo:
              'Coordinamos plazos y condiciones suspensivas para que ambas partes lleguen a notaría sin rechazo de expediente.',
          },
        ]
      : [
          {
            titulo: `Comprador con hipoteca en ${nombre}`,
            cuerpo:
              'Cláusula suspensiva con plazo realista, documentación al banco y calendario compartido con el vendedor. Si el banco deniega, recuperas la señal según redacción acordada.',
          },
          {
            titulo: 'Piso visto en portal entre particulares',
            cuerpo:
              'Due diligence antes de señal elevada: nota simple, comunidad, ITE y cédula. Negociación de descuento si hay hallazgos documentados.',
          },
          {
            titulo: 'Quiero cita presencial',
            cuerpo:
              'Mismo precio 687 €: revisión de papeles en despacho Les Corts con cita previa, además del panel online.',
          },
        ]

  return {
    guiaTitulo,
    intro: hook,
    trámiteLocal,
    casos,
    normativa: {
      titulo: 'Normativa y fiscalidad (orientación incluida)',
      items:
        modo === 'venta'
          ? [
              'Compraventa entre particulares: contrato privado de arras válido; escritura pública ante notario.',
              'Plusvalía municipal (IIVTNU) en el Ayuntamiento de Barcelona — plazos y bonificaciones según caso.',
              'IRPF por ganancia patrimonial en la venta (orientación general; planificación fiscal compleja puede requerir asesor tributario).',
              'Documentación exigida en Cataluña: cédula de habitabilidad, certificado energético, certificado de deudas de comunidad.',
            ]
          : [
              'ITP (Impuesto de Transmisiones Patrimoniales) en Cataluña — liquidación por el comprador tras escritura.',
              'Arras penitenciales con condición suspensiva de hipoteca cuando financias.',
              'Provisión de fondos en notaría: precio, impuestos, notaría y registro.',
              'Due diligence recomendada antes de señal superior al 5–10 % del precio.',
            ],
    },
    caNota:
      'Atención también en catalán si lo prefieres. Contractes d’arras i reserva adaptats a la normativa catalana i espanyola.',
  }
}
