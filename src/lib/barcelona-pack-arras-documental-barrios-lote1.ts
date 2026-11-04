import type { BarcelonaPackArrasDocumentalBarrioConfig } from '@/lib/barcelona-pack-arras-documental-barrios-types'

type Seed = {
  slug: string
  nombre: string
  distrito: string
  precioEjemploPiso: number
  titleHook: string
  metaDesc: string
  keywords: string
  ogTitle: string
  h1: string
  lead: string
  badge: string
  mercadoIntro: string
  precioM2: string
  perfil: string
  riesgoDoc: string
  guiaP1: string
  guiaP2: string
  escenario: string
  error1: { t: string; d: string }
  error2: { t: string; d: string }
  riesgo1: { t: string; d: string }
  riesgo2: { t: string; d: string }
  casoTitulo: string
  casoSit: string
  casoRes: string
  faqQ: string
  faqA: string
  vecinos: Array<{ barrio: string; precioM2: string; perfil: string }>
}

function fromSeed(s: Seed): BarcelonaPackArrasDocumentalBarrioConfig {
  return {
    slug: s.slug,
    nombre: s.nombre,
    distrito: s.distrito,
    testimoniosLanding: `pack-arras-documental-barrio-${s.slug}`,
    precioEjemploPiso: s.precioEjemploPiso,
    meta: {
      title: s.titleHook,
      description: s.metaDesc,
      keywords: s.keywords,
      ogTitle: s.ogTitle,
      ogDescription: s.metaDesc.slice(0, 160),
    },
    hero: { badge: s.badge, h1: s.h1, lead: s.lead },
    mercado: {
      titulo: `Comprar de particular en ${s.nombre} (${s.distrito})`,
      intro: s.mercadoIntro,
      precioOrientativo: s.precioM2,
      perfilComprador: s.perfil,
      riesgoDocumental: s.riesgoDoc,
    },
    paraComprador: {
      titulo: `Pack Arras Plus comprador en ${s.nombre}`,
      intro: `En ${s.nombre} el vendedor particular suele presionar con plazos cortos. El pack combina arras penitenciales redactadas a tu favor e informe documental antes de la señal.`,
      bullets: [
        'Arras con condición suspensiva de hipoteca y plazo realista a notaría',
        'Nota simple, comunidad, ITE/cédula Generalitat según el edificio',
        'Informe PDF con hallazgos y opciones de negociación',
        'Gestor Daniel Hernández — online o despacho Les Corts',
        '450 € IVA incl. · sin comisión sobre el precio del piso',
      ],
    },
    guiaBarrio: {
      titulo: `Guía Pack Arras Plus en ${s.nombre}, Barcelona`,
      parrafos: [s.guiaP1, s.guiaP2],
    },
    contenidoUnico: {
      tituloSeccion: `Antes de la señal en ${s.nombre}: lo que no cubre un PDF genérico`,
      lead: `Cada operación en ${s.nombre} tiene matices de edificio, comunidad y normativa catalana que un modelo descargado no contempla.`,
      escenarioLocal: s.escenario,
      erroresEvitados: [
        { titulo: s.error1.t, detalle: s.error1.d },
        { titulo: s.error2.t, detalle: s.error2.d },
      ],
    },
    riesgosBarrio: [
      { titulo: s.riesgo1.t, desc: s.riesgo1.d },
      { titulo: s.riesgo2.t, desc: s.riesgo2.d },
    ],
    casosBarrio: [
      {
        titulo: s.casoTitulo,
        perfil: `Comprador particular · ${s.nombre}`,
        situacion: s.casoSit,
        resultado: s.casoRes,
        ahorro: 'Riesgo evitado antes de arras',
      },
    ],
    barriosPrecio: [
      { barrio: s.nombre, precioM2: s.precioM2, perfil: s.riesgoDoc.slice(0, 120) },
      ...s.vecinos,
    ],
    faqs: [
      { q: s.faqQ, a: s.faqA },
      {
        q: `¿El Pack Arras Plus en ${s.nombre} incluye revisión de comunidad y derramas?`,
        a: 'Sí. Solicitamos certificado de deudas, actas recientes y derramas aprobadas o en curso antes de recomendar firmar arras definitivas.',
      },
      {
        q: `¿Puedo contratar si ya tengo borrador de arras del vendedor en ${s.nombre}?`,
        a: 'Sí. Revisamos cláusulas desequilibradas, añadimos condiciones suspensivas y auditamos documentación en paralelo.',
      },
    ],
  }
}

const SEEDS: Seed[] = [
  {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    precioEjemploPiso: 385_000,
    titleHook: 'Pack Arras Plus Eixample — arras + due diligence 450€',
    metaDesc:
      'Comprar piso de particular en el Eixample: arras penitenciales redactadas y revisión documental (cédula, ITE, comunidad). Pack 450 € Inmonest Barcelona.',
    keywords:
      'pack arras eixample, comprar piso particular eixample, revision documentacion compra eixample barcelona, arras penitenciales eixample',
    ogTitle: 'Eixample: Pack Arras Plus comprador — 450 €',
    badge: 'Ensanche · Generalitat',
    h1: 'Eixample: no entregues señal en una finca modernista sin auditoría documental',
    lead:
      'En Dreta, Esquerra o Sant Antoni compites con varios compradores. Redactamos arras con hipoteca y revisamos derramas, ITE y licencias antes de transferir la señal.',
    mercadoIntro:
      'El Eixample concentra operaciones rápidas entre particulares en fincas regias y pisos reformados. Los vendedores entregan borradores de arras redactados por su abogado.',
    precioM2: '4.500 – 6.200 €/m² según manzana',
    perfil: 'Familias, compradores internacionales y operaciones con hipoteca en 3–4 semanas.',
    riesgoDoc: 'Derramas de fachada, protección patrimonial, obras sin licencia final y discrepancias catastrales.',
    guiaP1:
      'En el Eixample la Generalitat exige cédula de habitabilidad y, en muchos edificios, ITE vigente. Firmar arras sin revisar actas de una comunidad de 80 vecinos puede ocultar derramas de seis cifras.',
    guiaP2:
      'El Pack Arras Plus (450 €) sustituye la comisión de agencia en la fase crítica: arras personalizadas + informe documental con gestor que conoce operaciones en cuadrícula modernista.',
    escenario:
      'Comprador con financiación aprobada recibe borrador de arras sin cláusula suspensiva ni plazo para aportar certificado de deudas de comunidad en un edificio con obra de ascensor aprobada.',
    error1: {
      t: 'Señal sin condición de hipoteca',
      d: 'Si la hipoteca cae, pierdes la señal. Incluimos suspensiva con plazo y documentación exigible al banco.',
    },
    error2: {
      t: 'Ignorar derrama en curso',
      d: 'Revisamos actas y certificado de deudas antes de fijar importe de arras y precio final.',
    },
    riesgo1: {
      t: 'Reformas sin certificado final',
      d: 'Verificamos licencias en el Ayuntamiento y coherencia con el estado del piso en el Eixample.',
    },
    riesgo2: {
      t: 'Cédula desactualizada',
      d: 'Validamos cédula Generalitat y CEE antes de recomendar firma de arras.',
    },
    casoTitulo: 'Dreta: derrama oculta detectada pre-arras',
    casoSit: 'Iban a transferir 30.000 € de señal sin leer acta con derrama de rehabilitación aprobada.',
    casoRes: 'Informe documental + arras con retención hasta certificado de pago de derrama negociado.',
    faqQ: '¿Qué revisáis en un piso del Eixample antes de las arras?',
    faqA:
      'Nota simple, cargas, actas y derramas, ITE del edificio, cédula, licencias de reforma y coherencia del borrador de arras con tu hipoteca.',
    vecinos: [
      { barrio: 'Gràcia', precioM2: '4.000 – 4.800 €/m²', perfil: 'Edificios bajos, obras en patios' },
      { barrio: 'Sant Antoni', precioM2: '3.800 – 4.500 €/m²', perfil: 'Alta rotación entre particulares' },
    ],
  },
  {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    precioEjemploPiso: 340_000,
    titleHook: 'Pack Arras Plus Gràcia — compra particular con informe 450€',
    metaDesc:
      'Pack Arras Plus en Gràcia: arras penitenciales + revisión documental al comprar a un particular. Cédula, comunidad, ITE. 450 € Inmonest.',
    keywords:
      'pack arras gracia barcelona, comprar piso gracia particular, arras comprador gracia, gestor compra gracia',
    ogTitle: 'Gràcia: arras + documentación comprador — 450 €',
    badge: 'Gràcia · Comprador',
    h1: 'Gràcia: arras y due diligence cuando el piso “de particular” va con prisa',
    lead:
      'Camp d’en Grassot, Vila de Gràcia o Vallcarca: revisamos licencias de reforma, terrazas y comunidades pequeñas pero exigentes antes de tu señal.',
    mercadoIntro:
      'Gràcia mezcla propietarios históricos y pisos turísticos reconvertidos a vivienda. Las operaciones directas son frecuentes pero la documentación urbanística falla a menudo.',
    precioM2: '4.000 – 4.900 €/m²',
    perfil: 'Jóvenes profesionales, familias y compradores que evitan comisión de agencia.',
    riesgoDoc: 'Reformas en patios, locales convertidos, certificados de habitabilidad tras divisiones.',
    guiaP1:
      'En Gràcia muchos pisos han sufrido reformas integrales sin licencia final visible. El pack cruza estado registral, catastro y certificados exigidos en Cataluña.',
    guiaP2:
      '450 € cubren arras redactadas para comprador y auditoría completa — frente a 10.000 €+ de comisión de agencia en un piso de 340.000 €.',
    escenario:
      'Vendedor particular entrega arras en 24 h tras visita de fin de semana; el comprador no ha visto actas de una comunidad de 6 vecinos con obra de tejado pendiente.',
    error1: { t: 'Firmar sin actas', d: 'Pedimos actas y certificado de deudas aunque la comunidad sea pequeña.' },
    error2: { t: 'Terraza sin reflejar en escritura', d: 'Comprobamos concordancia catastro-registro y descripción en arras.' },
    riesgo1: { t: 'Uso turístico previo', d: 'Revisamos licencias y posibles sanciones urbanísticas heredables.' },
    riesgo2: { t: 'Arras copiadas de internet', d: 'Redactamos cláusulas válidas en Cataluña con plazos realistas.' },
    casoTitulo: 'Vila de Gràcia: licencia de reforma pendiente',
    casoSit: 'Señal de 18.000 € con cocina abierta sin certificado final de obra.',
    casoRes: 'Cláusula suspensiva hasta legalización; arras replanteadas con plazo de 45 días.',
    faqQ: '¿El pack sirve en edificios bajos de Gràcia sin ascensor?',
    faqA: 'Sí. Adaptamos checklist a edificios del siglo XX: ITE, estado de cubierta, derramas y cédula.',
    vecinos: [
      { barrio: 'Sant Gervasi (frontera)', precioM2: '4.800 – 5.500 €/m²', perfil: 'Ticket alto' },
      { barrio: 'El Camp d’en Grassot', precioM2: '3.900 – 4.400 €/m²', perfil: 'Reformas recientes' },
    ],
  },
  {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    precioEjemploPiso: 295_000,
    titleHook: 'Pack Arras Plus Sants — arras + revisión 450€ comprador',
    metaDesc:
      'Compra entre particulares en Sants: Pack Arras Plus con arras penitenciales e informe documental (comunidad, ITE, registral). 450 € Barcelona.',
    keywords:
      'pack arras sants, comprar piso sants particular, arras penitenciales sants barcelona, gestoria comprador sants',
    ogTitle: 'Sants: Pack Arras Plus — arras + documentación',
    badge: 'Sants · Montjuïc',
    h1: 'Sants: blinda la señal cuando compras cerca de la estación a un particular',
    lead:
      'Hostafrancs, la Bordeta o Sants proper: operaciones accesibles pero con edificios de los 70–80 con ITE y derramas recurrentes. Arras + auditoría por 450 €.',
    mercadoIntro:
      'Sants mueve mucho volumen entre particulares por precio más accesible que el Eixample. Los plazos para firmar arras suelen ser de 48–72 horas.',
    precioM2: '3.200 – 3.900 €/m²',
    perfil: 'Primera vivienda, familias y compradores con hipoteca estándar.',
    riesgoDoc: 'ITE municipal, ascensores, derramas de rehabilitación energética.',
    guiaP1:
      'En Sants es habitual heredar deudas de comunidad o derramas no reflejadas en el anuncio. El pack verifica certificados antes de recomendar la señal.',
    guiaP2:
      'Incluye arras con penalizaciones equilibradas y condición suspensiva de financiación — clave en operaciones bancarias desde 295.000 €.',
    escenario:
      'Comprador encuentra piso en portal; el vendedor exige 10 % de señal sin certificado de deudas ni nota simple actualizada.',
    error1: { t: 'Señal del 10 % sin negociar', d: 'Ajustamos importe y condiciones según riesgo documental detectado.' },
    error2: { t: 'No revisar ITE del bloque', d: 'Incorporamos estado del edificio en informe y arras.' },
    riesgo1: { t: 'Deuda de comunidad oculta', d: 'Certificado de deudas y actas de los últimos 24 meses.' },
    riesgo2: { t: 'Plazos irreales a notaría', d: 'Fijamos calendario coherente con hipoteca y documentación.' },
    casoTitulo: 'Sants: deuda de comunidad de 6.200 €',
    casoSit: 'Arras preparadas sin mencionar deuda del vendedor con la comunidad.',
    casoRes: 'Renegociación del reparto antes de firma; arras con mención expresa de liquidación.',
    faqQ: '¿450 € incluye arras e informe en Sants?',
    faqA: 'Sí. Arras en 48 h e informe documental en 3–5 días laborables con el mismo gestor.',
    vecinos: [
      { barrio: 'Hostafrancs', precioM2: '3.000 – 3.600 €/m²', perfil: 'Plaça Espanya' },
      { barrio: 'Montjuïc', precioM2: '2.900 – 3.400 €/m²', perfil: 'Vistas y bloques altos' },
    ],
  },
  {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    precioEjemploPiso: 360_000,
    titleHook: 'Pack Arras Plus Poblenou — comprador particular 450€',
    metaDesc:
      'Pack Arras Plus en Poblenou y 22@: arras redactadas + due diligence (licencias, comunidad, registral). Compra sin agencia. Inmonest 450 €.',
    keywords:
      'pack arras poblenou, comprar piso poblenou particular, arras comprador poblenou, revision documental 22 barcelona',
    ogTitle: 'Poblenou: Pack Arras Plus comprador',
    badge: 'Poblenou · 22@',
    h1: 'Poblenou: arras + documentación en un mercado de particulares muy dinámico',
    lead:
      'Entre el 22@ y la Vila Olímpica, muchos pisos llevan reformas recientes. Verificamos licencias, cambios de uso y arras antes de tu señal.',
    mercadoIntro:
      'Poblenou combina stock industrial reconvertido y vivienda familiar. Compradores tech y familias compiten en operaciones directas.',
    precioM2: '4.000 – 5.000 €/m² (22@ más alto)',
    perfil: 'Teletrabajo, familias y compradores internacionales.',
    riesgoDoc: 'Licencias de cambio de uso, obras en fachada porticada, comunidades post-rehabilitación.',
    guiaP1:
      'En Poblenou las reformas “llave en mano” no siempre tienen licencia final. El pack cruza Ayuntamiento, registro y comunidad.',
    guiaP2:
      '450 € fijos por arras + informe frente a comisiones de 10.800–18.000 € en un piso de 360.000 €.',
    escenario:
      'Loft reformado en edificio industrial: vendedor presiona con arras estándar sin mencionar licencia de primera ocupación actualizada.',
    error1: { t: 'Confundir superficie útil', d: 'Coherencia catastro, registro y contrato de arras.' },
    error2: { t: 'Subarriendo previo no declarado', d: 'Revisamos cargas y situación registral.' },
    riesgo1: { t: 'Obra en elementos comunes', d: 'Actas y certificado de deudas en comunidades grandes del 22@.' },
    riesgo2: { t: 'Arras sin idioma acordado', d: 'Redacción castellano/catalán según partes.' },
    casoTitulo: '22@: licencia de obra sin cerrar',
    casoSit: 'Señal alta en piso open-space sin certificado final.',
    casoRes: 'Suspensiva hasta legalización; plazo ampliado en arras.',
    faqQ: '¿Revisáis pisos nuevos y rehabilitados en Poblenou?',
    faqA: 'Sí. Priorizamos licencias, ITE del edificio y garantías de comunidad en promociones y rehabilitaciones.',
    vecinos: [
      { barrio: 'Diagonal Mar', precioM2: '4.500 – 5.200 €/m²', perfil: 'Frente marítim' },
      { barrio: 'Vila Olímpica', precioM2: '4.800 – 5.500 €/m²', perfil: 'Primera línea' },
    ],
  },
  {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    precioEjemploPiso: 370_000,
    titleHook: 'Pack Arras Plus Les Corts — arras + informe 450€',
    metaDesc:
      'Comprar en Les Corts o Pedralbes frontera: Pack Arras Plus con arras penitenciales y revisión documental. Despacho Inmonest en el distrito. 450 €.',
    keywords:
      'pack arras les corts, comprar piso les corts particular, arras penitenciales les corts, gestor inmobiliario les corts',
    ogTitle: 'Les Corts: Pack Arras Plus — Inmonest Les Corts',
    badge: 'Les Corts · Despacho Inmonest',
    h1: 'Les Corts: pack comprador con cita presencial en Mejía Lequerica 44',
    lead:
      'Zona universitaria, Pedralbes frontera y familias residenciales. Arras redactadas + due diligence; mismo equipo que el despacho del distrito.',
    mercadoIntro:
      'Les Corts concentra operaciones familiares y pisos señoriales cerca de Diagonal. Muchas ventas directas sin agencia pero con abogado del vendedor.',
    precioM2: '4.200 – 5.800 €/m² (Pedralbes más alto)',
    perfil: 'Familias, profesionales y compradores con ticket medio-alto.',
    riesgoDoc: 'Fincas señoriales, garajes y trasteros no incluidos en precio, comunidades exigentes.',
    guiaP1:
      'Nuestro despacho está en Les Corts: puedes revisar originales de comunidad y urbanismo con cita presencial sin suplemento.',
    guiaP2:
      'El pack 450 € incluye arras + informe; opcional ampliar a compra completa 687 € si quieres gestor hasta notaría.',
    escenario:
      'Comprador quiere entregar señal en un piso junto a Zona Universitària; el vendedor omite anejo de parking en nota simple.',
    error1: { t: 'Parking no incluido en arras', d: 'Verificamos concordancia de anejos y precio total.' },
    error2: { t: 'Fianza de arras sin trazabilidad', d: 'Recomendamos transferencia identificada y recibo.' },
    riesgo1: { t: 'Plusvalía e IBI', d: 'Orientación sobre cargas municipales del vendedor.' },
    riesgo2: { t: 'Comunidad de lujo con derramas', d: 'Actas detalladas en fincas de alta gama.' },
    casoTitulo: 'Les Corts: plaza de parking registral',
    casoSit: 'Precio pactado incluía plaza no inscrita junto al piso.',
    casoRes: 'Arras condicionadas a regularización registral del anejo.',
    faqQ: '¿Puedo acudir al despacho de Les Corts con el pack?',
    faqA: 'Sí. Trámite online o cita en Carrer de Mejía Lequerica 44 para revisar documentación física.',
    vecinos: [
      { barrio: 'Pedralbes', precioM2: '5.500 – 7.000 €/m²', perfil: 'Operaciones premium' },
      { barrio: 'Sarrià (frontera)', precioM2: '5.000 – 6.500 €/m²', perfil: 'Chalets y pisos altos' },
    ],
  },
  {
    slug: 'sarria',
    nombre: 'Sarrià',
    distrito: 'Sarrià-Sant Gervasi',
    precioEjemploPiso: 520_000,
    titleHook: 'Pack Arras Plus Sarrià — due diligence comprador 450€',
    metaDesc:
      'Pack Arras Plus en Sarrià: arras e informe documental exigente en compraventa entre particulares de ticket alto. Barcelona 450 €.',
    keywords:
      'pack arras sarria, comprar piso sarria particular, arras penitenciales sarria, gestoria compra sarria barcelona',
    ogTitle: 'Sarrià: Pack Arras Plus — operaciones exigentes',
    badge: 'Sarrià · Ticket alto',
    h1: 'Sarrià: due diligence de nivel alto antes de señales de cinco cifras',
    lead:
      'Fincas señoriales, anejos y operaciones con herencias. Arras personalizadas e informe registral/comunidad al detalle por 450 €.',
    mercadoIntro:
      'Sarrià mueve operaciones de mayor ticket con compradores exigentes. El vendedor suele tener asesor; tú necesitas gestor solo para el comprador.',
    precioM2: '5.000 – 7.500 €/m²',
    perfil: 'Familias, ejecutivos, compradores con patrimonio consolidado.',
    riesgoDoc: 'Herencias, usufructos, cargas en fincas antiguas, comunidades pequeñas con costes altos.',
    guiaP1:
      'En Sarrià una derrama o carga mal detectada puede superar el ahorro de no usar agencia. El pack audita antes de arras.',
    guiaP2:
      'En 520.000 € la agencia cobraría 15.600–26.000 €; el pack 450 € cubre la fase legal-documental crítica.',
    escenario:
      'Piso con usufructo vitalicio mencionado verbalmente pero no reflejado en borrador de arras del vendedor.',
    error1: { t: 'Ignorar usufructo o nuda propiedad', d: 'Nota simple y arras coherentes con titularidad real.' },
    error2: { t: 'Señal desproporcionada', d: 'Calibramos importe según riesgo y plazo a escritura.' },
    riesgo1: { t: 'Herencia sin liquidar', d: 'Verificamos titularidad y poderes de representación.' },
    riesgo2: { t: 'ITE en finca antigua', d: 'Estado del edificio en informe pre-arras.' },
    casoTitulo: 'Sarrià: carga registral no mencionada',
    casoSit: 'Borrador de arras silenciaba hipoteca pendiente de cancelar.',
    casoRes: 'Cláusula de cancelación con plazo y retención en notaría.',
    faqQ: '¿El pack escala a pisos de más de 500.000 € en Sarrià?',
    faqA: 'Sí. Mismo precio 450 €; profundizamos en cargas, anejos y fiscalidad ITP Cataluña.',
    vecinos: [
      { barrio: 'Sant Gervasi', precioM2: '4.800 – 6.000 €/m²', perfil: 'Residencial alto' },
      { barrio: 'Les Corts', precioM2: '4.200 – 5.000 €/m²', perfil: 'Universidad' },
    ],
  },
  {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    precioEjemploPiso: 275_000,
    titleHook: 'Pack Arras Plus Sant Andreu — arras + revisión 450€',
    metaDesc:
      'Comprar de particular en Sant Andreu: Pack Arras Plus con arras penitenciales e informe documental. La Sagrera, Bon Pastor. 450 €.',
    keywords:
      'pack arras sant andreu, comprar piso sant andreu particular, arras comprador sant andreu barcelona',
    ogTitle: 'Sant Andreu: Pack Arras Plus comprador',
    badge: 'Sant Andreu · Sagrera',
    h1: 'Sant Andreu: arras seguras en un mercado de particulares en expansión',
    lead:
      'La Sagrera, Fabra i Puig o el centro del distrito: revisamos comunidad, ITE y coherencia de precio antes de tu señal.',
    mercadoIntro:
      'Sant Andreu crece con familias que buscan precio vs Eixample. Operaciones directas con plazos cortos y documentación incompleta.',
    precioM2: '2.900 – 3.600 €/m²',
    perfil: 'Primera vivienda y familias.',
    riesgoDoc: 'Edificios en rehabilitación, efecto Sagrera, derramas de zonas en transformación.',
    guiaP1:
      'El efecto infraestructuras eleva precios; algunos vendedores minimizan deudas de comunidad. Auditamos antes de arras.',
    guiaP2:
      '450 € por arras + informe completo — alternativa realista a pagar comisión de agencia en 275.000 €.',
    escenario:
      'Comprador primerizo recibe arras del vendedor sin cláusula suspensiva pese a hipoteca en trámite.',
    error1: { t: 'Prisa post-visita', d: 'Reservamos plazo para informe documental paralelo.' },
    error2: { t: 'No leer estatutos', d: 'Estatutos y actas en pack estándar.' },
    riesgo1: { t: 'Obra en barrio en transformación', d: 'Derramas futuras en actas recientes.' },
    riesgo2: { t: 'Cédula no conforme', d: 'Validación Generalitat pre-firma.' },
    casoTitulo: 'Sagrera: hipoteca sin suspensiva',
    casoSit: 'Borrador del vendedor sin condición de financiación.',
    casoRes: 'Arras redactadas con suspensiva 45 días y penalización equilibrada.',
    faqQ: '¿Atendéis Sant Andreu con el mismo gestor que Barcelona capital?',
    faqA: 'Sí. 100 % online o despacho Les Corts; mismo pack 450 €.',
    vecinos: [
      { barrio: 'El Clot', precioM2: '3.200 – 3.800 €/m²', perfil: 'Buen comunicado' },
      { barrio: 'Nou Barris (frontera)', precioM2: '2.400 – 2.900 €/m²', perfil: 'Precio accesible' },
    ],
  },
  {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    precioEjemploPiso: 310_000,
    titleHook: 'Pack Arras Plus Ciutat Vella — Gòtic, Raval, Born 450€',
    metaDesc:
      'Pack Arras Plus en Ciutat Vella: arras + revisión en edificios históricos (cédula, ITE, protección patrimonial). Comprador particular.',
    keywords:
      'pack arras ciutat vella, comprar piso gothic quarter particular, arras born barcelona, revision documentacion raval',
    ogTitle: 'Ciutat Vella: Pack Arras Plus — finca histórica',
    badge: 'Gòtic · Raval · Born',
    h1: 'Ciutat Vella: no firmes arras en finca histórica sin revisar habitabilidad y cargas',
    lead:
      'Gòtic, Raval o Born: edificios protegidos, locales reconvertidos y comunidades complejas. Pack 450 € arras + auditoría.',
    mercadoIntro:
      'Ciutat Vella mezcla turismo, patrimonio y vivienda habitual. Compras entre particulares con riesgo urbanístico elevado.',
    precioM2: '3.500 – 4.800 €/m² según subzona',
    perfil: 'Inversores residenciales, nómadas y familias en subzonas consolidadas.',
    riesgoDoc: 'Protección patrimonial, locales sin cédula, humedades e ITE severas.',
    guiaP1:
      'La cédula y el estado constructivo son críticos en fincas del siglo XIX. El pack prioriza habitabilidad y cargas ocultas.',
    guiaP2:
      'Arras con plazo para subsanar documentación urbanística — imprescindible en Ciutat Vella.',
    escenario:
      'Piso en El Born con reforma estética; certificado final de obra inexistente y comunidad con contencioso de obras.',
    error1: { t: 'Subestimar protección patrimonial', d: 'Verificamos restricciones urbanísticas aplicables.' },
    error2: { t: 'Arras en castellano genérico', d: 'Cláusulas adaptadas a operación en Cataluña.' },
    riesgo1: { t: 'ITE desfavorable', d: 'Estado del edificio en informe.' },
    riesgo2: { t: 'Deudas de comunidad litigiosas', d: 'Actas y certificado de deudas imprescindibles.' },
    casoTitulo: 'El Born: contencioso en acta de comunidad',
    casoSit: 'Señal prevista sin leer acta con pleito de obras en patio.',
    casoRes: 'Retraso de arras hasta certificación de situación; cláusula de resolución.',
    faqQ: '¿Revisáis pisos en Raval y Gòtic con el mismo pack?',
    faqA: 'Sí. Intensificamos checklist urbanístico en Ciutat Vella.',
    vecinos: [
      { barrio: 'El Born', precioM2: '4.200 – 5.000 €/m²', perfil: 'Patrimonio' },
      { barrio: 'El Raval', precioM2: '3.200 – 4.000 €/m²', perfil: 'Mixto' },
    ],
  },
  {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar',
    distrito: 'Sant Martí',
    precioEjemploPiso: 395_000,
    titleHook: 'Pack Arras Plus Diagonal Mar — arras + informe 450€',
    metaDesc:
      'Pack Arras Plus Diagonal Mar y front marítim: arras penitenciales y revisión documental al comprar a particular. 450 € Inmonest.',
    keywords:
      'pack arras diagonal mar, comprar piso diagonal mar particular, arras comprador poblenou mar, gestoria compra front maritim',
    ogTitle: 'Diagonal Mar: Pack Arras Plus',
    badge: 'Front marítim · Sant Martí',
    h1: 'Diagonal Mar: due diligence en promociones y segundas manos frente al mar',
    lead:
      'Comunidades grandes, garajes subterráneos y operaciones rápidas. Arras redactadas + informe registral y de comunidad.',
    mercadoIntro:
      'Diagonal Mar atrae compradores por vistas y servicios. Muchas reventas entre particulares en edificios de los 2000.',
    precioM2: '4.500 – 5.500 €/m²',
    perfil: 'Familias y profesionales con alto poder adquisitivo.',
    riesgoDoc: 'Garajes, trasteros, derramas de mantenimiento de zonas comunes amplias.',
    guiaP1:
      'En edificios con piscina y garaje comunitario las derramas pueden ser elevadas. Revisamos actas antes de señal.',
    guiaP2:
      '450 € pack completo frente a comisiones de 11.850–19.750 € en 395.000 €.',
    escenario:
      'Comprador asume trastero “incluido” sin reflejo registral; arras del vendedor no lo menciona.',
    error1: { t: 'Anejos verbales', d: 'Cuadramos descripción registral con precio y arras.' },
    error2: { t: 'Fees de comunidad altas', d: 'Estatutos y presupuestos en informe.' },
    riesgo1: { t: 'Filtraciones en sótano', d: 'Actas de mantenimiento y seguros comunitarios.' },
    riesgo2: { t: 'Plazo corto por competencia', d: 'Arras con calendario realista pese a presión.' },
    casoTitulo: 'Diagonal Mar: trastero no inscrito',
    casoSit: 'Precio incluía trastero sin concordancia en nota simple.',
    casoRes: 'Arras modificadas hasta regularizar o descontar precio.',
    faqQ: '¿El pack cubre garaje y trastero en Diagonal Mar?',
    faqA: 'Sí. Verificamos inscripción registral de plazas y anejos vinculados al piso.',
    vecinos: [
      { barrio: 'Poblenou', precioM2: '4.000 – 5.000 €/m²', perfil: '22@' },
      { barrio: 'Vila Olímpica', precioM2: '4.800 – 5.500 €/m²', perfil: 'Primera línea' },
    ],
  },
  {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample',
    precioEjemploPiso: 325_000,
    titleHook: 'Pack Arras Plus Sant Antoni — arras comprador 450€',
    metaDesc:
      'Pack Arras Plus en Sant Antoni (Eixample): arras penitenciales + revisión documental entre particulares. Mercado en alza. 450 €.',
    keywords:
      'pack arras sant antoni, comprar piso sant antoni particular, arras penitenciales sant antoni barcelona',
    ogTitle: 'Sant Antoni: Pack Arras Plus — Eixample sur',
    badge: 'Sant Antoni · Mercat',
    h1: 'Sant Antoni: pack comprador cuando el mercado de particulares va sin agencia',
    lead:
      'Entorno del Mercat de Sant Antoni: pisos reformados, plazos cortos y borradores de arras del vendedor. Arras + informe 450 €.',
    mercadoIntro:
      'Sant Antoni vive un repunte de compras directas tras reformas de calidad. Competencia en visitas los fines de semana.',
    precioM2: '3.800 – 4.600 €/m²',
    perfil: 'Jóvenes parejas y compradores del Eixample “accesible”.',
    riesgoDoc: 'Reformas integrales, locales bajo vivienda, ruido y licencias de actividad.',
    guiaP1:
      'Muchos pisos combinan vivienda y restos de uso comercial en planta baja. Urbanismo y comunidad deben alinearse.',
    guiaP2:
      'Pack 450 €: arras con hipoteca + informe antes de señal en un mercado caliente.',
    escenario:
      'Piso reformado con cocina abierta; vendedor exige arras en 48 h sin certificado final de obra.',
    error1: { t: 'Reforma sin cerrar legalmente', d: 'Licencias y certificado final en checklist.' },
    error2: { t: 'Competir sin due diligence', d: 'Informe en paralelo aunque haya presión temporal.' },
    riesgo1: { t: 'Local comercial en edificio', d: 'Revisión de estatutos y usos.' },
    riesgo2: { t: 'Arras sin plazo post-hipoteca', d: 'Suspensiva estándar Inmonest.' },
    casoTitulo: 'Sant Antoni: obra sin licencia final',
    casoSit: 'Señal de 20.000 € con reforma reciente sin documentación urbanística.',
    casoRes: 'Arras con plazo 40 días y condición suspensiva urbanística.',
    faqQ: '¿Sant Antoni comparte gestor con el Eixample?',
    faqA: 'Sí. Mismo pack y despacho Les Corts; contenido SEO y checklist focalizados en Sant Antoni.',
    vecinos: [
      { barrio: 'Eixample (Dreta)', precioM2: '4.800 – 6.000 €/m²', perfil: 'Ensanche' },
      { barrio: 'El Raval (frontera)', precioM2: '3.200 – 4.000 €/m²', perfil: 'Ciutat Vella' },
    ],
  },
]

export const BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIO_SLUGS_LOTE1 = SEEDS.map((s) => s.slug) as readonly string[]

export const BARCELONA_PACK_ARRAS_DOCUMENTAL_BARRIOS_LOTE1: Record<
  string,
  BarcelonaPackArrasDocumentalBarrioConfig
> = Object.fromEntries(SEEDS.map((s) => [s.slug, fromSeed(s)]))
