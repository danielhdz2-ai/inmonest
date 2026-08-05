import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'

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
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'coruna', nombre: 'A Coruña' },
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
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia',
      foto: GESTOR_CARMEN_VIDAL.foto,
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
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Andalucía',
      foto: GESTOR_CARMEN_VIDAL.foto,
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
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Málaga y Costa del Sol',
      foto: GESTOR_CARMEN_VIDAL.foto,
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
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Galicia',
      foto: GESTOR_CARMEN_VIDAL.foto,
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
}

export function buildDueDiligenceMetadata(config: DueDiligenceCiudadConfig): Metadata {
  return {
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
  }
}

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}
