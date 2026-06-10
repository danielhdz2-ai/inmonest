import type { Metadata } from 'next'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

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
}

export const DUE_DILIGENCE_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
] as const

export const DUE_DILIGENCE_CIUDADES: Record<string, DueDiligenceCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'due-diligence-madrid',
    heroImage: '/madrid2.jpg',
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
      title: 'Due Diligence Pre-Compra Madrid | Comprar Piso de Particular con Gestor',
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
    heroImage: '/barcelona2.jpg',
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
      title: 'Due Diligence Pre-Compra Barcelona | Comprar Piso de Particular con Gestor',
      description:
        '¿Compras piso en Barcelona de particular a particular? Gestor asignado revisa documentación hasta escritura: cargas, cédula habitabilidad, ITE. Evita sorpresas de 10.000€+. 350€.',
      keywords:
        'comprar piso particular barcelona, due diligence compra vivienda barcelona, revisar documentacion compra piso barcelona, gestor compra vivienda barcelona, comprar de particular a particular barcelona, evitar estafa compra piso barcelona, verificar cargas piso barcelona, comprar piso sin agencia barcelona, cédula habitabilidad compra barcelona',
      ogTitle: 'Due Diligence Pre-Compra Barcelona — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Barcelona. Gestor experto revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'due-diligence-valencia',
    heroImage: '/valencia3.jpg',
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
      title: 'Due Diligence Pre-Compra Valencia | Comprar Piso de Particular con Gestor',
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
    heroImage: '/sevilla2.jpg',
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
      title: 'Due Diligence Pre-Compra Sevilla | Comprar Piso de Particular con Gestor',
      description:
        '¿Compras piso en Sevilla de particular a particular? Gestor asignado revisa documentación hasta escritura: cargas, IEE, deudas comunidad. Evita sorpresas. 350€ IVA incluido.',
      keywords:
        'comprar piso particular sevilla, due diligence compra vivienda sevilla, revisar documentacion compra piso sevilla, gestor compra vivienda sevilla, comprar de particular a particular sevilla, evitar estafa compra piso sevilla, verificar cargas piso sevilla, comprar piso sin agencia sevilla, IEE compra vivienda sevilla',
      ogTitle: 'Due Diligence Pre-Compra Sevilla — Gestor asignado revisa todo',
      ogDescription:
        'Compras de particular a particular en Sevilla. Gestor experto revisa toda la documentación hasta escritura. 350€. Sin comisiones de agencia.',
    },
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
