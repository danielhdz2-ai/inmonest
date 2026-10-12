import type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios-types'

const BLOQUES_ARRAS_BASE: BarcelonaArrasBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Arras penitenciales',
    contenido:
      'Señal trazable, plazo hasta escritura y penalizaciones simétricas; condición suspensiva de hipoteca cuando el comprador financia.',
    bullets: ['Importe y forma de pago', 'Exclusividad vendedor', 'Resolución por cargas ocultas'],
  },
  {
    titulo: 'ITP en Cataluña',
    contenido:
      'Coherencia entre señal y precio total; mobiliario, parking y trastero desglosados si forman parte del precio.',
    bullets: ['Base imponible clara', 'Gastos orientativos notaría/registro'],
  },
  {
    titulo: 'Documentación urbanística',
    contenido:
      'Plazo para cédula, certificado energético, ITE o licencias de reforma antes de que la señal quede firme.',
    bullets: ['Nota simple y cargas', 'Estatutos comunidad'],
  },
]

export const BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA_3 = [
  'el-raval',
  'sant-antoni',
  'la-barceloneta',
  'hostafrancs',
  'pedralbes',
] as const

export type BarcelonaArrasBarrioSlugExtra3 = (typeof BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA_3)[number]

export const BARCELONA_ARRAS_BARRIOS_EXTRA_3: Record<
  BarcelonaArrasBarrioSlugExtra3,
  BarcelonaArrasBarrioConfig
> = {
  'el-raval': {
    slug: 'el-raval',
    nombre: 'El Raval',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Arras penitenciales El Raval (Barcelona) — finca protegida · 145€',
      description:
        'Contrato de arras penitenciales en El Raval: edificios antiguos, ITE, hipoteca y señal trazable. 145 € · 48 h · ITP Cataluña.',
      keywords: ['contrato arras el raval', 'arras raval barcelona', 'señal compraventa raval'],
      ogTitle: 'El Raval: arras penitenciales (no Ciutat Vella genérico)',
      ogDescription: 'Compraventa entre particulares en uno de los barrios más dinámicos de Barcelona.',
    },
    hero: {
      badge: 'El Raval · Compraventa',
      h1: 'El Raval: arras cuando el piso tiene historia, protección patrimonial y prisa por cerrar',
      subtitulo:
        'Operaciones con compradores internacionales, familias del barrio y pisos en fincas centenarias. Las arras deben permitir revisar cargas, obras ilegales y estado real antes de perder la señal.',
      anguloComprador:
        'Reserva con condición suspensiva de hipoteca y plazo para ITE o cédula en edificios antiguos.',
      anguloVendedor:
        'Fija exclusividad y penitencial clara si el comprador intenta rebajar tras visitar la comunidad.',
    },
    mercado: {
      titulo: 'Compraventa en El Raval',
      intro: 'Mezcla de revalorización por rehabilitación y pisos que aún necesitan inversión; plazos bancarios estándar.',
      precioOrientativo: 'Señal habitual 5-10 %; importes moderados frente a Eixample pero conflictos frecuentes por estado.',
      perfilComprador: 'Familias arraigadas, inversores en rehabilitación, compradores que buscan centro urbano.',
      particularidad: 'Patios y plantas bajas comerciales: descripción registral precisa en arras.',
    },
    normativa: {
      titulo: 'Arras El Raval: patrimonio y cargas',
      intro: 'El contrato debe alinear descripción del inmueble con realidad urbanística.',
      bloques: BLOQUES_ARRAS_BASE,
    },
    blindaje: {
      titulo: 'Blindaje arras El Raval',
      intro: 'Finca antigua:',
      puntos: [
        { titulo: 'ITE / cédula', texto: 'Plazo de aportación documentada.' },
        { titulo: 'Hipoteca', texto: 'Suspensiva con devolución de señal si procede.' },
        { titulo: 'Nota simple', texto: 'Revisión Inmonest incluida.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en El Raval',
      intro: 'Negocia:',
      bullets: ['Plazo revisión cargas', 'Suspensiva financiación', 'Estado comunidad y derramas', 'Resolución si falla documentación'],
    },
    paraVendedor: {
      titulo: 'Vendedor en El Raval',
      intro: 'Protege:',
      bullets: ['Señal penitencial', 'Exclusividad', 'Entrega docs urbanísticas', 'Penalización desistimiento'],
    },
    faqs: [
      { q: '¿Hay ITP distinto en El Raval?', a: 'No: misma autoliquidación en Cataluña; importa el precio y el inmueble.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido, entrega 48 h.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Carrer de la Cera: arras firmadas con prisa y sin visitar el patio',
      lead:
        'En El Raval muchas operaciones se cierran en días; las arras deben reservar tiempo para comprobar humedades en patio y cargas de comunidad.',
      escenarioLocal:
        'Comprador visita solo el piso; arras con plazo de 10 días para certificado de deudas de comunidad y visto bueno de estado del patio interior.',
      erroresEvitados: [
        { titulo: 'Señal sin plazo documental', detalle: 'Ventana para cédula e ITE.' },
        { titulo: 'Planta baja comercial omitida', detalle: 'Descripción de uso en contrato.' },
        { titulo: 'Escritura imposible a 30 días', detalle: 'Calendario bancario realista.' },
      ],
    },
  },

  'sant-antoni': {
    slug: 'sant-antoni',
    nombre: 'Sant Antoni',
    distrito: 'Eixample',
    meta: {
      title: 'Arras Sant Antoni Barcelona — supermanzana y licencia de obra · 145€',
      description:
        'Señal penitencial en Sant Antoni: reformas recientes, terrazas interiores e hipoteca. Contrato arras 145 € · 48 h.',
      keywords: ['contrato arras sant antoni', 'arras eixample sant antoni', 'señal compraventa sant antoni'],
      ogTitle: 'Sant Antoni: arras con licencia de obra en el anexo',
      ogDescription: 'Compraventa en barrio del Eixample en plena revalorización.',
    },
    hero: {
      badge: 'Sant Antoni · Eixample',
      h1: 'Sant Antoni: arras para compradores que compiten por pisos reformados a dos pasos del mercado',
      subtitulo:
        'Ticket medio-alto, muchas reformas integrales y compradores que vienen de alquiler. Las arras deben mencionar licencias de obra y no prometer terrazas no registradas.',
      anguloComprador:
        'Condición sobre licencia de reforma y estado de instalaciones antes de señal firme.',
      anguloVendedor:
        'Retén señal si el comprador usa la tasación para rebajar tras aceptar precio en visita.',
    },
    mercado: {
      titulo: 'Compraventa Sant Antoni',
      intro: 'Alta demanda de parejas jóvenes; operaciones con hipoteca en 45-60 días.',
      precioOrientativo: 'Señal 5-10 % sobre precios en subida.',
      perfilComprador: 'Profesionales que buscan Eixample sin pagar Dreta completa.',
      particularidad: 'Reformas: facturas o licencia en plazo de revisión.',
    },
    normativa: {
      titulo: 'Arras Sant Antoni',
      intro: 'ITP Cataluña y arras penitenciales estándar con foco en obra reciente.',
      bloques: BLOQUES_ARRAS_BASE,
    },
    blindaje: {
      titulo: 'Blindaje Sant Antoni',
      intro: 'Post-reforma:',
      puntos: [
        { titulo: 'Licencia obra', texto: 'Plazo de comprobación.' },
        { titulo: 'Terraza', texto: 'Coherencia descripción / registro.' },
        { titulo: 'Hipoteca', texto: 'Suspensiva clara.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador Sant Antoni',
      intro: 'Incluye en arras:',
      bullets: ['Revisión licencia reforma', 'Suspensiva hipoteca', 'Certificado deudas', 'Plazo escritura flexible'],
    },
    paraVendedor: {
      titulo: 'Vendedor Sant Antoni',
      intro: 'Asegura:',
      bullets: ['Señal penitencial', 'Exclusividad', 'Entrega docs obra', 'Penalización simétrica'],
    },
    faqs: [
      { q: '¿Influye la supermanzana en las arras?', a: 'No es cláusula automática, pero conviene plazos realistas si hay incertidumbre de tasación.' },
      { q: '¿Precio?', a: '145 € IVA incluido.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Comte Borrell: vendedor “reformado a estrenar” sin papeles',
      lead: 'En Sant Antoni muchas señales se pierden por licencias de obra pendientes descubiertas tarde.',
      escenarioLocal:
        'Arras con 15 días para aportar licencia o cédula coherente con la reforma anunciada; si no, resolución sin penalizar al comprador.',
      erroresEvitados: [
        { titulo: 'Reforma sin licencia', detalle: 'Plazo y resolución.' },
        { titulo: 'Terraza sin mencionar', detalle: 'Metros en contrato.' },
        { titulo: 'Señal al 3 %', detalle: 'Importe disuasorio acordado.' },
      ],
    },
  },

  'la-barceloneta': {
    slug: 'la-barceloneta',
    nombre: 'La Barceloneta',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Arras La Barceloneta — vivienda junto al mar, no apartamento turístico · 145€',
      description:
        'Contrato arras en La Barceloneta: humedad, normas comunitarias y compraventa entre particulares. 145 € · 48 h.',
      keywords: ['contrato arras barceloneta', 'arras barceloneta barcelona', 'señal compraventa playa barcelona'],
      ogTitle: 'Barceloneta: arras que conocen límites estatutarios',
      ogDescription: 'Señal penitencial en fincas marineras y bloques reformados.',
    },
    hero: {
      badge: 'La Barceloneta · Mar',
      h1: 'La Barceloneta: arras cuando la comunidad limita usos y el comprador busca vivir, no especular',
      subtitulo:
        'Pisos pequeños con salitre, estatutos restrictivos y compradores atraídos por el mar. El contrato debe reflejar uso residencial y cargas de comunidad.',
      anguloComprador:
        'Plazo para leer estatutos y certificado de deudas antes de entregar señal definitiva.',
      anguloVendedor:
        'Arras que impidan al comprador renegociar por humedad si ya visitó con olor a salitre.',
    },
    mercado: {
      titulo: 'Compraventa Barceloneta',
      intro: 'Menos volumen que Eixample pero operaciones rápidas; precios altos por m².',
      precioOrientativo: 'Señal 5-10 %; ticket elevado en euros pese a metros pequeños.',
      perfilComprador: 'Quien quiere vivir junto al mar todo el año; segundas residencias ocasionales.',
      particularidad: 'Normas comunitarias: lectura obligatoria pre-señal.',
    },
    normativa: {
      titulo: 'Arras Barceloneta',
      intro: 'Coherencia entre uso residencial pactado y estatutos de la finca.',
      bloques: BLOQUES_ARRAS_BASE,
    },
    blindaje: {
      titulo: 'Blindaje Barceloneta',
      intro: 'Mar + comunidad:',
      puntos: [
        { titulo: 'Estatutos', texto: 'Plazo de entrega y conocimiento.' },
        { titulo: 'Estado humedades', texto: 'Visita documentada si se pacta.' },
        { titulo: 'ITP', texto: 'Precio total alineado.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador Barceloneta',
      intro: 'Negocia:',
      bullets: ['Estatutos comunidad', 'Deudas y derramas', 'Suspensiva hipoteca', 'Plazo escritura'],
    },
    paraVendedor: {
      titulo: 'Vendedor Barceloneta',
      intro: 'Protege:',
      bullets: ['Señal clara', 'Uso residencial en contrato', 'Exclusividad', 'Penalización desistimiento'],
    },
    faqs: [
      { q: '¿Puedo comprar para alquiler turístico?', a: 'Las arras deben reflejar el uso pactado; muchas comunidades lo prohíben — revísalo antes de la señal.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Passeig Joan de Borbó: comprador enamorado de la vista',
      lead: 'La vista no figura en el registro; las arras sí deben describir metros, orientación y estado.',
      escenarioLocal:
        'Contrato menciona visita a la finca con conocimiento de ruido de ocio nocturno en verano, reservando revisión solo para cargas e hipoteca.',
      erroresEvitados: [
        { titulo: 'Promesa de “silencio total”', detalle: 'Cláusula de entorno realista.' },
        { titulo: 'Sin estatutos', detalle: 'Plazo de entrega.' },
        { titulo: 'Escritura a 21 días', detalle: 'Calendario bancario amplio.' },
      ],
    },
  },

  hostafrancs: {
    slug: 'hostafrancs',
    nombre: 'Hostafrancs',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Arras Hostafrancs Barcelona — barrio residencial (no Poble-sec) · 145€',
      description:
        'Señal penitencial en Hostafrancs: familias, bloques años 70 e hipoteca. Arras 145 € · 48 h · Cataluña.',
      keywords: ['contrato arras hostafrancs', 'arras hostafrancs barcelona', 'señal compraventa hostafrancs'],
      ogTitle: 'Hostafrancs: arras en barrio residencial bien conectado',
      ogDescription: 'Compraventa entre particulares sin PDF genérico.',
    },
    hero: {
      badge: 'Hostafrancs · Sants-Montjuïc',
      h1: 'Hostafrancs: arras para operaciones familiares cuando comprador y vendedor comparten vecindario',
      subtitulo:
        'Muchas ventas son entre vecinos o familias que se mudan dentro del distrito. Aun así, hace falta señal trazable, ITP coherente y plazo a notaría.',
      anguloComprador:
        'Ideal si compras en Hostafrancs mientras vendes en Sants: alinea calendarios en una sola redacción.',
      anguloVendedor:
        'Evita acuerdos verbales en el bar: arras con penitencial y exclusividad.',
    },
    mercado: {
      titulo: 'Compraventa Hostafrancs',
      intro: 'Precios más accesibles que Pedralbes o Dreta; demanda estable de familias.',
      precioOrientativo: 'Señal 5-10 %; hipotecas estándar.',
      perfilComprador: 'Familias locales, upgrade desde alquiler en el mismo distrito.',
      particularidad: 'Bloques grandes: certificado de deudas imprescindible.',
    },
    normativa: {
      titulo: 'Arras Hostafrancs',
      intro: 'Misma fiscalidad ITP Cataluña que resto de Barcelona ciudad.',
      bloques: BLOQUES_ARRAS_BASE,
    },
    blindaje: {
      titulo: 'Blindaje Hostafrancs',
      intro: 'Finca horizontal:',
      puntos: [
        { titulo: 'Comunidad', texto: 'Deudas en plazo corto.' },
        { titulo: 'Parking', texto: 'Si hay plaza, en descripción.' },
        { titulo: 'Hipoteca', texto: 'Suspensiva estándar.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador Hostafrancs',
      intro: 'Pide en arras:',
      bullets: ['Certificado deudas', 'Suspensiva financiación', 'Plazo escritura', 'Resolución por cargas'],
    },
    paraVendedor: {
      titulo: 'Vendedor Hostafrancs',
      intro: 'Incluye:',
      bullets: ['Señal penitencial', 'Exclusividad', 'Calendario notaría', 'Penalización clara'],
    },
    faqs: [
      { q: '¿Hostafrancs tributa distinto?', a: 'No: ITP Cataluña como el resto de Barcelona capital.' },
      { q: '¿Precio?', a: '145 € IVA incluido.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Creu Coberta: venta entre vecinos sin contrato escrito',
      lead: 'La confianza del barrio no sustituye arras penitenciales con plazo y penalización.',
      escenarioLocal:
        'Familia vende a vecino: arras con señal moderada, plazo 60 días a escritura y condición suspensiva de hipoteca del comprador.',
      erroresEvitados: [
        { titulo: 'Solo WhatsApp', detalle: 'PDF firmable con penitencial.' },
        { titulo: 'Sin exclusividad', detalle: 'Vendedor no puede aceptar otra oferta.' },
        { titulo: 'Precio en mano sin trazabilidad', detalle: 'Transferencia identificada.' },
      ],
    },
  },

  pedralbes: {
    slug: 'pedralbes',
    nombre: 'Pedralbes',
    distrito: 'Les Corts',
    meta: {
      title: 'Arras Pedralbes Barcelona — plaza, trastero y ticket alto · 145€',
      description:
        'Contrato arras en Pedralbes: señal elevada, hipoteca exigente, parking y trastero. 145 € · 48 h.',
      keywords: ['contrato arras pedralbes', 'arras pedralbes barcelona', 'señal compraventa pedralbes'],
      ogTitle: 'Pedralbes: arras cuando la señal son miles de euros',
      ogDescription: 'Compraventa premium en Les Corts con revisión registral.',
    },
    hero: {
      badge: 'Pedralbes · Les Corts',
      h1: 'Pedralbes: arras para operaciones de ticket alto donde el garaje vale casi como una habitación',
      subtitulo:
        'Compradores exigentes, tasaciones estrictas y anejos múltiples. Un contrato genérico no describe plaza doble, trastero o portería.',
      anguloComprador:
        'Suspensiva de hipoteca con importe de señal proporcional al precio total; plazo amplio para tasación premium.',
      anguloVendedor:
        'Señal significativa con penitencial simétrica si el comprador abandona tras tasación favorable.',
    },
    mercado: {
      titulo: 'Compraventa Pedralbes',
      intro: 'Pocas operaciones pero señales altas; plazos bancarios 60-90 días frecuentes.',
      precioOrientativo: 'Señal 5-10 % sobre precios muy elevados.',
      perfilComprador: 'Familias alta renta, expatriados, upgrade desde Sarrià o Eixample alto.',
      particularidad: 'Anejos: coherencia registral y contractual obligatoria.',
    },
    normativa: {
      titulo: 'Arras Pedralbes',
      intro: 'ITP Cataluña sobre base elevada; detalle de anejos en precio.',
      bloques: BLOQUES_ARRAS_BASE,
    },
    blindaje: {
      titulo: 'Blindaje Pedralbes',
      intro: 'Ticket alto:',
      puntos: [
        { titulo: 'Anejos', texto: 'Parking y trastero identificados.' },
        { titulo: 'Hipoteca', texto: 'Plazo tasación realista.' },
        { titulo: 'Nota simple', texto: 'Revisión cargas incluida.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador Pedralbes',
      intro: 'Negocia:',
      bullets: ['Suspensiva hipoteca amplia', 'Revisión anejos en registro', 'Plazo escritura', 'Resolución documental'],
    },
    paraVendedor: {
      titulo: 'Vendedor Pedralbes',
      intro: 'Protege:',
      bullets: ['Señal elevada penitencial', 'Exclusividad', 'Descripción anejos', 'Penalización simétrica'],
    },
    faqs: [
      { q: '¿La señal debe ser mayor en Pedralbes?', a: 'El porcentaje legal no cambia, pero en euros es mayor: conviene redacción precisa del importe.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido en todos los barrios.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Avinguda Diagonal alta: plaza doble no incluida en arras genérica',
      lead: 'En Pedralbes las disputas post-señal suelen ser por anejos no descritos.',
      escenarioLocal:
        'Arras listan referencia catastral del piso, plaza PK-12 y trastero TR-4 con precio desglosado; plazo 75 días a escritura.',
      erroresEvitados: [
        { titulo: 'Garaje omitido', detalle: 'Anejo en contrato y precio.' },
        { titulo: 'Señal simbólica', detalle: 'Importe acorde al mercado.' },
        { titulo: 'Plazo 30 días fijo', detalle: 'Margen tasación premium.' },
      ],
    },
  },
}
