import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { withGestoriaIndexRobots } from './gestoria-indexacion-tier'
import { CASTELLON_DUE_DILIGENCE } from './ciudad-castellon-configs'

const BASE_URL = 'https://inmonest.com'
export const DUE_DILIGENCE_PRECIO = 350

export type DueDiligenceGestor = {
  nombre: string
  rol: string
  foto: string
  bio: string
  especialidades: string[]
}

export type DueDiligenceCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  gestor: DueDiligenceGestor
  docTecnicaTitulo: string
  docTecnicaItems: string[]
  zonasIntro: string
  zonas: string[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero?: {
    h1: string
    lead: string
    badge?: string
  }
  faqPrioritarias?: DueDiligenceFaqItem[]
}

export const DUE_DILIGENCE_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'castellon', nombre: 'Castellón' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'alicante', nombre: 'Alicante' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'pamplona', nombre: 'Pamplona' },
  { slug: 'salamanca', nombre: 'Salamanca' },
  { slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'mallorca', nombre: 'Mallorca' },
  { slug: 'asturias', nombre: 'Asturias' },
  { slug: 'santander', nombre: 'Santander' },
  { slug: 'vitoria', nombre: 'Vitoria-Gasteiz' },
  { slug: 'san-sebastian', nombre: 'San Sebastián' },
] as const

export const DUE_DILIGENCE_CIUDADES: Record<string, DueDiligenceCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'due-diligence-madrid',
    heroImage: getCiudadImage('madrid').src,
    precioEjemploPiso: 320_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: GESTOR_DANIEL_HERNANDEZ.rol,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventas de particular a particular en Madrid. Revisa documentación registral, cargas, comunidad y normativa madrileña antes de que firmes en notaría.',
      especialidades: ['Due diligence post-arras', 'Compras sin agencia', 'Revisión ITE y cédula'],
    },
    docTecnicaTitulo: 'Documentación Técnica y Ayuntamiento de Madrid',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y legalización de reformas',
    ],
    zonasIntro: 'Nuestros gestores conocen los requisitos del Ayuntamiento de Madrid y las particularidades de cada distrito.',
    zonas: [
      'Salamanca', 'Chamberí', 'Retiro', 'Moncloa', 'Chamartín',
      'Tetuán', 'Arganzuela', 'Carabanchel', 'Latina', 'Usera',
      'Móstoles', 'Alcalá de Henares', 'Getafe', 'Leganés',
    ],
    meta: {
      title: 'Due diligence precompra Madrid desde 350€',
      description:
        '¿Compras piso en Madrid de particular a particular? Gestor asignado revisa toda la documentación hasta escritura: cargas, deudas, hipotecas, ITE. Evita sorpresas. 350€ IVA incluido.',
      keywords:
        'comprar piso particular madrid, due diligence compra vivienda madrid, revisar documentacion compra piso madrid, gestor compra vivienda madrid, comprar de particular a particular madrid, evitar estafa compra piso madrid, verificar cargas antes de escritura madrid, comprar piso sin agencia madrid',
      ogTitle: 'Due Diligence Pre-Compra Madrid — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Madrid. Un gestor inmobiliario revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'due-diligence-barcelona',
    heroImage: getCiudadImage('barcelona').src,
    precioEjemploPiso: 350_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Cataluña',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Experto en compras entre particulares en Barcelona y área metropolitana. Domina la normativa de la Generalitat, cédula de habitabilidad, ITE y revisión de cargas ocultas.',
      especialidades: ['Cédula Generalitat', 'Compras sin inmobiliaria', 'Informe pre-escritura'],
    },
    docTecnicaTitulo: 'Documentación Técnica y Generalitat',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente (obligatorio Generalitat)',
      'Certificado energético actualizado',
      'ITE (Inspección Técnica del Edificio) en Barcelona',
      'Licencias de obra, reformas y ampliaciones',
    ],
    zonasIntro: 'Conocemos las particularidades de cada distrito y la normativa autonómica catalana.',
    zonas: [
      'Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Les Corts', 'Sants-Montjuïc',
      'Ciutat Vella', 'Sant Martí', 'Horta-Guinardó', 'Sant Andreu',
      "L'Hospitalet", 'Badalona', 'Sabadell',
    ],
    meta: {
      title: 'Revisar documentación compra piso Barcelona 350€',
      description:
        'Revisión documental antes de comprar piso en Barcelona. Gestor asignado verifica nota simple, cargas, cédula Generalitat, ITE y deudas de comunidad. 350€ IVA incluido. Sin comisión de agencia.',
      keywords:
        'revisar documentacion compra piso barcelona, revision compra de piso barcelona, que revisar antes de comprar piso barcelona, comprar piso particular barcelona, due diligence compra vivienda barcelona, gestor compra vivienda barcelona, comprar piso sin agencia barcelona, verificar cargas piso barcelona, cédula habitabilidad compra barcelona',
      ogTitle: 'Revisar documentación compra piso Barcelona — Gestor 350€',
      ogDescription:
        'Revisión documental de compra entre particulares en Barcelona. Gestor experto hasta escritura. 350€. Sin comisiones de agencia.',
    },
    hero: {
      badge: 'Revisión documental · Compra entre particulares',
      h1: 'Revisión documental antes de comprar piso en Barcelona',
      lead:
        '¿Compras de particular a particular? Un gestor asignado revisa nota simple, cargas registrales, cédula de la Generalitat, ITE y deudas de comunidad antes de la escritura. Evita sorpresas de 10.000€+ por 350€ fijos.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Barcelona?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad de la Generalitat, certificado energético, ITE si el edificio lo exige y licencias de obra si hubo reformas. Sin esta revisión puedes heredar cargas o bloquear la operación en notaría.',
      },
      {
        q: '¿Cuánto cuesta revisar la documentación de una compra en Barcelona?',
        a: '350€ IVA incluido por el pack Due Diligence Pre-Compra: gestor asignado, informe escrito y acompañamiento hasta escritura. Frente a 10.500–17.500€ de comisión de agencia en un piso medio de Barcelona.',
      },
      {
        q: '¿Puedo comprar piso de particular en Barcelona sin agencia?',
        a: 'Sí, pero necesitas revisión jurídica profesional. Inmonest no es agencia: somos gestoría. Revisamos la operación por ti sin cobrar porcentaje sobre el precio del piso.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'due-diligence-valencia',
    heroImage: getCiudadImage('valencia').src,
    precioEjemploPiso: 260_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Valencia y provincia. Revisa cédula de habitabilidad, cargas registrales, deudas de comunidad y documentación de la Generalitat.',
      especialidades: ['Compras post-arras', 'Normativa valenciana', 'Acompañamiento hasta notaría'],
    },
    docTecnicaTitulo: 'Documentación Técnica y Generalitat Valenciana',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente (obligatoria en Comunitat Valenciana)',
      'Certificado energético actualizado',
      'IEE en edificios de más de 50 años',
      'Licencias de obra y conformidad urbanística',
    ],
    zonasIntro: 'Servicio en Valencia capital, l\'Horta y área metropolitana con conocimiento de la normativa autonómica.',
    zonas: [
      'Ruzafa', 'Campanar', 'Benimaclet', 'El Carmen', 'Eixample',
      'Patraix', 'Mislata', 'Paterna', 'Torrent', 'Sagunto',
      'Ciutat Vella', 'Quatre Carreres', 'Algirós',
    ],
    meta: {
      title: 'Due diligence precompra Valencia desde 350€',
      description:
        '¿Compras piso en Valencia de particular a particular? Gestor asignado revisa toda la documentación hasta escritura: cargas, cédula, deudas comunidad. Evita sorpresas. 350€ IVA incluido.',
      keywords:
        'comprar piso particular valencia, due diligence compra vivienda valencia, revisar documentacion compra piso valencia, gestor compra vivienda valencia, comprar de particular a particular valencia, evitar estafa compra piso valencia, verificar cargas antes escritura valencia, comprar piso sin agencia valencia, cédula habitabilidad valencia',
      ogTitle: 'Due Diligence Pre-Compra Valencia — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Valencia. Un gestor revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'due-diligence-sevilla',
    heroImage: getCiudadImage('sevilla').src,
    precioEjemploPiso: 220_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Andalucía',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especializada en compras entre particulares en Sevilla y provincia. Revisa nota simple, IEE andaluz, deudas de comunidad y toda la documentación antes de que firmes las escrituras.',
      especialidades: ['Due diligence andaluza', 'Compras sin agencia', 'Revisión pre-escritura'],
    },
    docTecnicaTitulo: 'Documentación Técnica y normativa andaluza',
    docTecnicaItems: [
      'Cédula de habitabilidad o certificado equivalente',
      'Certificado energético vigente',
      'IEE (Informe de Evaluación del Edificio) si aplica',
      'Licencias de obra y legalización de reformas',
    ],
    zonasIntro: 'Cobertura en Sevilla capital, área metropolitana y normativa de la Junta de Andalucía.',
    zonas: [
      'Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Centro',
      'Santa Cruz', 'Este-Alcosa', 'Cerro-Amate', 'Bellavista',
      'Dos Hermanas', 'Alcalá de Guadaíra', 'Camas',
    ],
    meta: {
      title: 'Due diligence precompra Sevilla desde 350€',
      description:
        '¿Compras piso en Sevilla de particular a particular? Gestor asignado revisa documentación hasta escritura: cargas, IEE, deudas comunidad. Evita sorpresas. 350€ IVA incluido.',
      keywords:
        'comprar piso particular sevilla, due diligence compra vivienda sevilla, revisar documentacion compra piso sevilla, gestor compra vivienda sevilla, comprar de particular a particular sevilla, evitar estafa compra piso sevilla, verificar cargas piso sevilla, comprar piso sin agencia sevilla, IEE compra vivienda sevilla',
      ogTitle: 'Due Diligence Pre-Compra Sevilla — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Sevilla. Gestor experto revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía',
    testimoniosLanding: 'due-diligence-malaga',
    heroImage: getCiudadImage('malaga').src,
    precioEjemploPiso: 300_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Málaga y Costa del Sol',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Málaga capital y área metropolitana. Revisa IEE andaluz, cargas registrales, deudas de comunidad y toda la documentación exigida por la Junta antes de escriturar.',
      especialidades: ['Compras sin agencia', 'Normativa Junta de Andalucía', 'Acompañamiento hasta notaría'],
    },
    docTecnicaTitulo: 'Documentación Técnica y normativa andaluza',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente (obligatoria en Andalucía)',
      'Certificado energético actualizado',
      'IEE (Informe de Evaluación del Edificio) si aplica',
      'Licencias de obra y legalización de reformas',
    ],
    zonasIntro: 'Servicio en Málaga capital, Costa del Sol y área metropolitana. Conocemos los requisitos de la Junta de Andalucía y las particularidades de cada barrio.',
    zonas: [
      'Centro Histórico', 'Soho', 'Teatinos', 'El Palo-Pedregalejo', 'La Malagueta',
      'El Limonar', 'Huelin', 'Carretera de Cádiz', 'Benalmádena', 'Torremolinos',
      'Rincón de la Victoria', 'Mijas',
    ],
    meta: {
      title: 'Due diligence precompra Málaga desde 350€',
      description:
        '¿Compras piso en Málaga de particular a particular? Gestor especializado en derecho inmobiliario revisa documentación hasta escritura: cargas, IEE, deudas comunidad. Evita sorpresas. 350€ IVA incluido.',
      keywords:
        'comprar piso particular málaga, due diligence compra vivienda málaga, revisar documentacion compra piso málaga, gestor compra vivienda málaga, comprar de particular a particular málaga, evitar estafa compra piso málaga, verificar cargas piso málaga, comprar piso sin agencia málaga, IEE compra vivienda málaga, due diligence costa del sol',
      ogTitle: 'Due Diligence Pre-Compra Málaga — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Málaga. Un gestor experto en derecho inmobiliario revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    testimoniosLanding: 'due-diligence-bilbao',
    heroImage: getCiudadImage('bilbao').src,
    precioEjemploPiso: 280_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Bizkaia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventas de particular a particular en Bilbao y área metropolitana. Domina el derecho foral vasco, revisión de cargas, plusvalía de Bizkaia y documentación técnica antes de la firma en notaría.',
      especialidades: ['Due diligence post-arras', 'Normativa foral vasca', 'Informe pre-escritura'],
    },
    docTecnicaTitulo: 'Documentación Técnica y normativa foral vasca',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y conformidad urbanística del Ayuntamiento de Bilbao',
    ],
    zonasIntro: 'Cobertura en Bilbao, Gran Bilbao y normativa foral de Bizkaia. Conocemos las particularidades de cada distrito y los requisitos del mercado bilbaíno.',
    zonas: [
      'Indautxu', 'Abando', 'Deusto', 'Rekalde', 'Bilbao La Vieja',
      'Santutxu', 'Basurto', 'Zorrotza', 'Getxo', 'Barakaldo',
      'Portugalete', 'Leioa',
    ],
    meta: {
      title: 'Due diligence precompra Bilbao desde 350€',
      description:
        '¿Compras piso en Bilbao de particular a particular? Gestor especializado en derecho inmobiliario revisa documentación hasta escritura: cargas, plusvalía foral, deudas comunidad. 350€ IVA incluido.',
      keywords:
        'comprar piso particular bilbao, due diligence compra vivienda bilbao, revisar documentacion compra piso bilbao, gestor compra vivienda bilbao, comprar de particular a particular bilbao, evitar estafa compra piso bilbao, verificar cargas piso bilbao, comprar piso sin agencia bilbao, plusvalía foral bizkaia compra',
      ogTitle: 'Due Diligence Pre-Compra Bilbao — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Bilbao. Gestor experto en derecho inmobiliario revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    testimoniosLanding: 'due-diligence-zaragoza',
    heroImage: getCiudadImage('zaragoza').src,
    precioEjemploPiso: 185_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Aragón',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Zaragoza y provincia. Revisa nota simple, cargas registrales, deudas de comunidad y documentación técnica exigida en Aragón antes de la firma en notaría.',
      especialidades: ['Compras sin agencia', 'Normativa aragonesa', 'Informe pre-escritura'],
    },
    docTecnicaTitulo: 'Documentación Técnica y Gobierno de Aragón',
    docTecnicaItems: [
      'Cédula de habitabilidad o certificado equivalente',
      'Certificado energético actualizado',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y conformidad urbanística',
    ],
    zonasIntro: 'Servicio en Zaragoza capital, área metropolitana y principales municipios de la provincia.',
    zonas: [
      'Centro', 'Delicias', 'Las Fuentes', 'San José', 'Actur',
      'Montecanal', 'Valdespartera', 'La Almozara', 'Torre Ramona',
      'Utebo', 'Cuarte de Huerva', 'La Muela',
    ],
    meta: {
      title: 'Revisar documentación compra piso Zaragoza 350€',
      description:
        'Revisión documental antes de comprar piso en Zaragoza. Gestor asignado verifica nota simple, cargas, deudas de comunidad e ITE. 350€ IVA incluido. Compra entre particulares sin agencia.',
      keywords:
        'revisar documentacion compra piso zaragoza, revision compra de piso zaragoza, comprar piso particular zaragoza, due diligence compra vivienda zaragoza, gestor compra vivienda zaragoza, comprar piso sin agencia zaragoza, que revisar antes de comprar piso zaragoza, verificar cargas piso zaragoza',
      ogTitle: 'Revisar documentación compra piso Zaragoza — Gestor 350€',
      ogDescription:
        'Revisión documental de compra entre particulares en Zaragoza. Gestor experto hasta escritura. 350€. Sin comisiones de agencia.',
    },
    hero: {
      badge: 'Revisión documental · Aragón',
      h1: 'Revisión documental antes de comprar piso en Zaragoza',
      lead:
        'Compras de particular a particular en Zaragoza? Un gestor revisa nota simple, cargas, deudas de comunidad, IBI y documentación técnica antes de escriturar. Tarifa plana 350€, sin comisión sobre el precio del piso.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Zaragoza?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si aplica y licencias de reformas. En operaciones entre particulares nadie lo hace por ti si no contratas gestoría.',
      },
      {
        q: '¿Cuánto cuesta la revisión documental de una compra en Zaragoza?',
        a: '350€ IVA incluido con gestor asignado, informe completo y acompañamiento hasta escritura. Mucho menos que una comisión de agencia del 3-5% sobre el precio del piso.',
      },
    ],
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    testimoniosLanding: 'due-diligence-coruna',
    heroImage: getCiudadImage('coruna').src,
    precioEjemploPiso: 210_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Galicia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especializada en compras entre particulares en A Coruña, área metropolitana y costa gallega. Revisa cargas registrales, deudas de comunidad, documentación técnica y normativa autonómica antes de la escritura.',
      especialidades: ['Compras sin agencia', 'Normativa gallega', 'Acompañamiento hasta notaría'],
    },
    docTecnicaTitulo: 'Documentación Técnica y Xunta de Galicia',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y legalización de reformas',
    ],
    zonasIntro: 'Cobertura en A Coruña capital, Oleiros, Arteixo, Ferrol y área metropolitana.',
    zonas: [
      'Ciudad Vieja', 'Ensanche', 'Monte Alto', 'Los Rosales', 'Matadero',
      'Elviña', 'Mesoiro', 'Cuatro Caminos', 'Oleiros', 'Arteixo',
      'Cambre', 'Ferrol',
    ],
    meta: {
      title: 'Revisar documentación compra piso A Coruña 350€',
      description:
        'Revisión documental antes de comprar piso en A Coruña. Gestor asignado verifica nota simple, cargas, deudas de comunidad e ITE. 350€ IVA incluido. Compra entre particulares sin agencia.',
      keywords:
        'revisar documentacion compra piso coruña, revision compra de piso a coruña, comprar piso particular coruña, due diligence compra vivienda galicia, gestor compra vivienda coruña, comprar piso sin agencia coruña, que revisar antes de comprar piso coruña, verificar cargas piso a coruña',
      ogTitle: 'Revisar documentación compra piso A Coruña — Gestor 350€',
      ogDescription:
        'Revisión documental de compra entre particulares en A Coruña. Gestora experta hasta escritura. 350€. Sin comisiones de agencia.',
    },
    hero: {
      badge: 'Revisión documental · Galicia',
      h1: 'Revisión documental antes de comprar piso en A Coruña',
      lead:
        '¿Compras de particular a particular en A Coruña? Una gestora asignada revisa nota simple, cargas, deudas de comunidad, IBI y documentación técnica gallega antes de ir a notaría. 350€ fijos, sin comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en A Coruña?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio lo requiere y licencias de obra. En Galicia, la documentación incompleta puede paralizar la compraventa en notaría.',
      },
      {
        q: '¿Cuánto cuesta revisar la documentación de una compra en A Coruña?',
        a: '350€ IVA incluido por el pack Due Diligence Pre-Compra con gestora asignada, informe escrito y seguimiento hasta escritura.',
      },
    ],
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    region: 'Comunitat Valenciana · Costa Blanca',
    testimoniosLanding: 'due-diligence-alicante',
    heroImage: getCiudadImage('alicante').src,
    precioEjemploPiso: 240_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Alicante',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Revisa compras entre particulares en Alicante, Elche y costa. Cédula valenciana, compradores extranjeros y cargas registrales antes de escritura.',
      especialidades: ['Costa Blanca', 'Compras sin agencia', 'Cédula AVANT'],
    },
    docTecnicaTitulo: 'Documentación técnica y Generalitat Valenciana',
    docTecnicaItems: [
      'Cédula de habitabilidad valenciana vigente',
      'Certificado energético actualizado',
      'ITE / IEE en edificios antiguos',
      'Licencias de obra y uso turístico si aplica',
    ],
    zonasIntro: 'Alicante capital, Playa de San Juan, Elche y Costa Blanca.',
    zonas: ['Centro', 'Explanada', 'Playa San Juan', 'Carolinas', 'Elche', 'San Vicente', 'Benidorm'],
    meta: {
      title: 'Due diligence compra piso Alicante desde 350€',
      description:
        '¿Compras piso de particular en Alicante? Gestor revisa nota simple, cédula, cargas y comunidad. 350€ IVA incl. Sin comisión de agencia.',
      keywords:
        'due diligence compra piso alicante, revisar documentacion compra alicante, comprar piso particular alicante, gestor compra vivienda costa blanca',
      ogTitle: 'Due Diligence Pre-Compra Alicante — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Alicante.',
    },
    hero: {
      badge: 'Revisión documental · Costa Blanca',
      h1: 'Revisión documental antes de comprar piso en Alicante',
      lead:
        'Compras de particular a particular en Alicante o la costa? Un gestor revisa cédula valenciana, nota simple, deudas de comunidad e ITE antes de notaría. 350€ fijos.',
    },
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'due-diligence-murcia',
    heroImage: getCiudadImage('murcia').src,
    precioEjemploPiso: 175_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Murcia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras directas en Murcia, Cartagena y Lorca. Mercado accesible con mucha presión para firmar arras sin revisar documentación.',
      especialidades: ['Mercado accesible', 'Compras rápidas', 'Revisión comunidad'],
    },
    docTecnicaTitulo: 'Documentación técnica · Región de Murcia',
    docTecnicaItems: [
      'Cédula de habitabilidad regional',
      'Certificado energético',
      'ITE en edificios antiguos',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Murcia capital, Cartagena, Lorca y área metropolitana.',
    zonas: ['Centro', 'Vista Alegre', 'El Carmen', 'Cartagena', 'Lorca', 'Molina de Segura'],
    meta: {
      title: 'Due diligence compra piso Murcia desde 350€',
      description:
        'Revisión documental antes de comprar en Murcia. Nota simple, cargas, IBI y comunidad. 350€. Compra entre particulares sin agencia.',
      keywords:
        'due diligence compra piso murcia, revisar documentacion compra murcia, comprar piso particular murcia',
      ogTitle: 'Due Diligence Murcia — Gestor 350€',
      ogDescription: 'Compra segura de particular a particular en la Región de Murcia.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Murcia',
      lead:
        'En Murcia es habitual firmar arras en días. Tu gestor revisa documentación antes de entregar señal. 350€ IVA incluido.',
    },
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    testimoniosLanding: 'due-diligence-pamplona',
    heroImage: getCiudadImage('pamplona').src,
    precioEjemploPiso: 240_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Navarra',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Revisa compras entre particulares en Pamplona y Navarra. Normativa foral, ITE en casco antiguo y deudas de comunidad.',
      especialidades: ['Normativa navarra', 'Compras sin agencia', 'Due diligence post-arras'],
    },
    docTecnicaTitulo: 'Documentación técnica · Navarra',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético',
      'ITE en casco antiguo',
      'Licencias de obra',
    ],
    zonasIntro: 'Pamplona capital y Comarca.',
    zonas: ['Casco Antiguo', 'Iturrama', 'Rochapea', 'Burlada', 'Barañáin'],
    meta: {
      title: 'Due diligence compra piso Pamplona desde 350€',
      description:
        '¿Compras piso de particular en Pamplona? Revisión registral y documental. 350€ IVA incl. Sin comisión de agencia.',
      keywords:
        'due diligence compra piso pamplona, comprar piso particular pamplona, revisar documentacion compra navarra',
      ogTitle: 'Due Diligence Pamplona — 350€',
      ogDescription: 'Gestor asignado para compradores particulares en Navarra.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Pamplona',
      lead:
        'Compras de particular a particular en Navarra? Revisamos nota simple, cargas, IBI y documentación técnica antes de escritura. 350€ fijos.',
    },
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    testimoniosLanding: 'due-diligence-salamanca',
    heroImage: getCiudadImage('salamanca').src,
    precioEjemploPiso: 180_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Salamanca',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores de particular en Salamanca. Casco histórico, universidad y revisión documental castellanoleonesa.',
      especialidades: ['Casco histórico', 'Compras sin agencia', 'Revisión registral'],
    },
    docTecnicaTitulo: 'Documentación técnica · Salamanca',
    docTecnicaItems: [
      'Cédula de habitabilidad castellanoleonesa',
      'Certificado energético',
      'ITE en edificios antiguos del centro',
      'Licencias de reforma',
    ],
    zonasIntro: 'Salamanca capital y provincia.',
    zonas: ['Centro', 'Garrido', 'San Bernardo', 'Vista Hermosa', 'Alamedilla'],
    meta: {
      title: 'Due diligence compra piso Salamanca desde 350€',
      description:
        'Revisión documental antes de comprar en Salamanca. 350€ IVA incl. Compra entre particulares con gestor asignado.',
      keywords:
        'due diligence compra piso salamanca, comprar piso particular salamanca, gestor compra vivienda salamanca',
      ogTitle: 'Due Diligence Salamanca — 350€',
      ogDescription: 'Compra segura de particular a particular en Salamanca.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Salamanca',
      lead:
        '¿Compras de particular en Salamanca? Tu gestor revisa cargas, comunidad y cédula antes de notaría. 350€ sin comisión de agencia.',
    },
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'due-diligence-valladolid',
    heroImage: getCiudadImage('valladolid').src,
    precioEjemploPiso: 190_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Valladolid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Revisa compras entre particulares en Valladolid. Ideal si compras desde otra provincia: due diligence online hasta escritura.',
      especialidades: ['Compras a distancia', 'Revisión arras', 'Registro Valladolid'],
    },
    docTecnicaTitulo: 'Documentación técnica · Valladolid',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético',
      'ITE en centro histórico',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Valladolid capital y provincia.',
    zonas: ['Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria'],
    meta: {
      title: 'Due diligence compra piso Valladolid desde 350€',
      description:
        '¿Compras piso de particular en Valladolid? Gestor revisa documentación completa. 350€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'due diligence compra piso valladolid, comprar piso particular valladolid, revisar documentacion compra valladolid',
      ogTitle: 'Due Diligence Valladolid — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Valladolid.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Valladolid',
      lead:
        'Compras de particular a particular en Valladolid? Revisamos nota simple, deudas de comunidad e ITE antes de ir a notaría. 350€ fijos.',
    },
  },

  granada: {
    slug: 'granada',
    nombre: 'Granada',
    region: 'Andalucía',
    testimoniosLanding: 'due-diligence-granada',
    heroImage: getCiudadImage('granada').src,
    precioEjemploPiso: 195_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Granada',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Revisa compras entre particulares en Granada capital, Realejo, Zaidín y área metropolitana. Casco histórico, ITE en edificios antiguos y deudas de comunidad antes de la señal.',
      especialidades: ['Casco y Albaicín', 'Compras sin agencia', 'Due diligence pre-arras'],
    },
    docTecnicaTitulo: 'Documentación técnica · Junta de Andalucía',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra en zona protegida',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Granada capital, Realejo, Zaidín, Armilla y municipios del área metropolitana.',
    zonas: ['Centro / Reyes Católicos', 'Realejo', 'Zaidín', 'Albaicín', 'Ronda', 'Armilla', 'Churriana de la Vega'],
    meta: {
      title: 'Due diligence compra piso Granada desde 350€',
      description:
        'Revisión documental antes de comprar en Granada de particular. Nota simple, cargas, comunidad e ITE. 350€ IVA incl. Trámite 100 % online.',
      keywords:
        'due diligence compra piso granada, revisar documentacion compra granada, comprar piso particular granada, gestor compra vivienda granada',
      ogTitle: 'Due Diligence Granada — 350€',
      ogDescription: 'Compra segura entre particulares en Granada con gestor asignado.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Granada',
      lead:
        'Compras de particular a particular en Granada? Revisamos nota simple, cargas, deudas de comunidad e ITE en casco histórico antes de entregar señal. 350€ fijos. Sin desplazamientos hasta notaría.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Granada de particular?',
        a: 'Nota simple, certificado de deudas de comunidad, IBI, cédula andaluza, certificado energético e ITE si el edificio lo exige. En el centro y Albaicín conviene verificar licencias de obra.',
      },
      {
        q: '¿Cuánto cuesta el due diligence en Granada frente a una agencia?',
        a: '350 € IVA incluido con gestor e informe. En un piso de 195.000 € la comisión de agencia sería 5.850–9.750 €.',
      },
    ],
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Islas Baleares',
    testimoniosLanding: 'due-diligence-mallorca',
    heroImage: getCiudadImage('mallorca').src,
    precioEjemploPiso: 285_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Baleares',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores que adquieren en Palma, Calvià, Manacor e interior de Mallorca. Revisa cargas, derramas, uso turístico vs habitual y plazos realistas para no residentes.',
      especialidades: ['Palma y costa', 'Compradores peninsulares', 'Revisión pre-señal'],
    },
    docTecnicaTitulo: 'Documentación técnica · Govern Balear',
    docTecnicaItems: [
      'Cédula d\'habitabilitat vigente',
      'Certificado energético',
      'ITE en edificios antiguos de Palma',
      'Certificado de deudas de comunidad',
      'Verificación de licencias turísticas (ETV) si aplica',
    ],
    zonasIntro: 'Palma, Calvià, Inca, Manacor y municipios de la isla.',
    zonas: ['Palma — Centro', 'La Lonja', 'Pere Garau', 'Calvià', 'Palmanova', 'Inca', 'Manacor'],
    meta: {
      title: 'Due diligence compra piso Mallorca desde 350€',
      description:
        'Revisión documental antes de comprar en Mallorca de particular. Palma y resto de la isla. 350€ IVA incl. Gestoría 100 % online.',
      keywords:
        'due diligence compra piso mallorca, revisar documentacion compra palma, comprar piso particular mallorca, gestor compra vivienda baleares',
      ogTitle: 'Due Diligence Mallorca — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Mallorca.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Mallorca',
      lead:
        '¿Compras en Palma o en la isla de particular a particular? Revisamos nota simple, comunidad, cédula balear y cargas antes de la señal. 350 €. Trámite online sin desplazamientos hasta la notaría.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar en Mallorca sin agencia?',
        a: 'Nota simple, deudas de comunidad, IBI, cédula d\'habitabilitat, certificado energético y coherencia catastro-registro. Si hay uso turístico, verificar que no comprometa tu compra como vivienda habitual.',
      },
      {
        q: '¿Puedo hacer el due diligence desde la península?',
        a: 'Sí. Subes documentación al panel, videollamada con gestor asignado e informe antes de firmar arras. Solo te desplazas a notaría balear para la escritura.',
      },
    ],
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    region: 'Principado de Asturias',
    testimoniosLanding: 'due-diligence-asturias',
    heroImage: getCiudadImage('asturias').src,
    precioEjemploPiso: 185_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Asturias',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Revisa compras entre particulares en Oviedo, Gijón y Avilés. Nota simple, deudas de comunidad, ITE en edificios antiguos y coherencia documental antes de firmar arras.',
      especialidades: ['Compras sin agencia', 'Due diligence pre-arras', 'Oviedo y Gijón'],
    },
    docTecnicaTitulo: 'Documentación técnica · Principado de Asturias',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético',
      'ITE en edificios de más de 50 años',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Oviedo, Gijón, Avilés, Langreo y municipios del Principado.',
    zonas: ['Oviedo Centro', 'El Milán', 'Gijón Centro', 'Cimadevilla', 'Avilés', 'Langreo', 'Mieres'],
    meta: {
      title: 'Due diligence compra piso Asturias desde 350€',
      description:
        '¿Compras piso de particular en Oviedo o Gijón? Gestor revisa documentación completa antes de la señal. 350€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'due diligence compra piso asturias, comprar piso particular oviedo, revisar documentacion compra gijon, gestor compra vivienda aviles',
      ogTitle: 'Due Diligence Asturias — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Asturias.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Asturias',
      lead:
        'Compras de particular a particular en Oviedo, Gijón o la costa? Revisamos nota simple, cargas y comunidad antes de entregar señal. 350€ fijos.',
    },
  },

  santander: {
    slug: 'santander',
    nombre: 'Santander',
    region: 'Cantabria',
    testimoniosLanding: 'due-diligence-santander',
    heroImage: getCiudadImage('santander').src,
    precioEjemploPiso: 220_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Cantabria',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventas entre particulares en Santander, El Sardinero y área metropolitana. Revisa cargas, ITE y arras antes de notaría.',
      especialidades: ['Costa cantábrica', 'Compras sin agencia', 'Informe pre-escritura'],
    },
    docTecnicaTitulo: 'Documentación técnica · Cantabria',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético',
      'ITE en edificios antiguos',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Santander capital, El Sardinero, Camargo y resto de Cantabria.',
    zonas: ['Centro', 'El Sardinero', 'Cuatro Caminos', 'Cueto', 'Camargo', 'Torrelavega'],
    meta: {
      title: 'Due diligence compra piso Santander desde 350€',
      description:
        '¿Compras piso de particular en Santander? Gestor revisa documentación completa. 350€ IVA incl. Sin comisión de agencia.',
      keywords:
        'due diligence compra piso santander, comprar piso particular cantabria, revisar documentacion compra sardinero',
      ogTitle: 'Due Diligence Santander — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Cantabria.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Santander',
      lead:
        '¿Compras en el centro, El Sardinero o Camargo? Revisamos nota simple, deudas de comunidad e ITE antes de la señal. 350€ fijos.',
    },
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    region: 'País Vasco · Álava',
    testimoniosLanding: 'due-diligence-vitoria',
    heroImage: getCiudadImage('vitoria').src,
    precioEjemploPiso: 240_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Vitoria-Gasteiz',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores particulares en Vitoria-Gasteiz y Álava. Normativa foral vasca, revisión registral y documentación técnica antes de escritura.',
      especialidades: ['Normativa foral vasca', 'Due diligence post-arras', 'Ensanche y Lakua'],
    },
    docTecnicaTitulo: 'Documentación técnica y normativa foral vasca',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y conformidad urbanística',
    ],
    zonasIntro: 'Vitoria-Gasteiz, Ensanche, Lakua, Zabalgana y provincia de Álava.',
    zonas: ['Ensanche', 'Lakua', 'Zabalgana', 'Casco Medieval', 'Salburua', 'Armentia'],
    meta: {
      title: 'Due diligence compra piso Vitoria-Gasteiz desde 350€',
      description:
        '¿Compras piso de particular en Vitoria? Gestor revisa cargas, foral y comunidad. 350€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'due diligence compra piso vitoria, comprar piso particular alava, revisar documentacion compra vitoria gasteiz',
      ogTitle: 'Due Diligence Vitoria — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Álava.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en Vitoria-Gasteiz',
      lead:
        'Compras de particular a particular en el Ensanche o Lakua? Revisamos nota simple y documentación foral antes de firmar arras. 350€ fijos.',
    },
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebastián',
    region: 'País Vasco · Gipuzkoa',
    testimoniosLanding: 'due-diligence-san-sebastian',
    heroImage: getCiudadImage('san-sebastian').src,
    precioEjemploPiso: 380_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Donostia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventas entre particulares en San Sebastián y Gipuzkoa. Mercado tensionado: revisión rigurosa de cargas, foral y plazos antes de la señal.',
      especialidades: ['Donostia y Gros', 'Normativa foral vasca', 'Compras sin agencia'],
    },
    docTecnicaTitulo: 'Documentación técnica y normativa foral vasca',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente',
      'Certificado energético actualizado',
      'ITE en edificios del casco histórico',
      'Certificado de deudas de comunidad',
    ],
    zonasIntro: 'Donostia-San Sebastián, Gros, Amara, Antiguo e Irun.',
    zonas: ['Centro', 'Gros', 'Antiguo', 'Amara', 'Egia', 'Intxaurrondo', 'Irun'],
    meta: {
      title: 'Due diligence compra piso San Sebastián desde 350€',
      description:
        '¿Compras piso de particular en Donostia? Gestor revisa documentación foral y cargas. 350€ IVA incl. Sin comisión de agencia.',
      keywords:
        'due diligence compra piso san sebastian, comprar piso particular donostia, revisar documentacion compra gros',
      ogTitle: 'Due Diligence San Sebastián — 350€',
      ogDescription: 'Revisión documental para compradores particulares en Gipuzkoa.',
    },
    hero: {
      h1: 'Revisión documental antes de comprar piso en San Sebastián',
      lead:
        '¿Compras en Gros, Centro o Amara? Revisamos nota simple, comunidad y normativa vasca antes de entregar señal. 350€ fijos.',
    },
  },

  castellon: CASTELLON_DUE_DILIGENCE,
}

export function buildDueDiligenceMetadata(config: DueDiligenceCiudadConfig): Metadata {
  const path = `/gestoria/due-diligence-precompra/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/due-diligence-precompra/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/due-diligence-precompra/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Due Diligence Pre-Compra ${config.nombre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      images: [`${BASE_URL}${config.heroImage}`],
    },
  })
}

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}
