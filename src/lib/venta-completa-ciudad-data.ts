import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

const BASE_URL = 'https://inmonest.com'
export const VENTA_COMPLETA_PRECIO = 687

export type VentaCompletaCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  ventasAcompanadas: number
  gestor: {
    nombre: string
    rol: string
    foto: string
    bio: string
  }
  zonas: string[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    h1: string
    lead: string
  }
  faqPrioritarias?: DueDiligenceFaqItem[]
}

export const VENTA_COMPLETA_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'salamanca', nombre: 'Salamanca' },
  { slug: 'valladolid', nombre: 'Valladolid' },
] as const

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}

export const VENTA_COMPLETA_CIUDADES: Record<string, VentaCompletaCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'venta-completa-madrid',
    heroImage: '/madrid2.jpg',
    precioEjemploPiso: 320_000,
    ventasAcompanadas: 34,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Ventas entre particulares',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en ventas de particular a particular en Madrid. Redacta contratos, recaba documentación madrileña y coordina con notarías de toda la capital hasta escritura.',
    },
    zonas: ['Salamanca', 'Chamberí', 'Retiro', 'Carabanchel', 'Vallecas', 'Móstoles', 'Getafe'],
    meta: {
      title: 'Vender piso particular Madrid desde 687€',
      description:
        '¿Ya tienes comprador en Madrid? Gestor inmobiliario te acompaña: contratos, documentación, notaría y escritura. 687€ IVA incl. Sin comisión de agencia.',
      keywords:
        'vender piso particular madrid, gestoria venta vivienda madrid, vender sin agencia madrid, acompañamiento venta piso madrid, gestor venta inmueble madrid',
      ogTitle: 'Vender piso a particular en Madrid — gestor hasta escritura',
      ogDescription: 'Ya tienes comprador. Nosotros gestionamos contratos, documentación y notaría. 687€ fijos.',
    },
    hero: {
      h1: '¿Ya tienes comprador en Madrid? Tu gestor se encarga de todo hasta escritura',
      lead:
        'Vendes de particular a particular y has llegado a un acuerdo de precio. Un gestor inmobiliario especializado redacta contratos, recaba toda la documentación madrileña y coordina con notaría. 687€ fijos, sin comisión del 3-5%.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué documentación necesito para vender en Madrid?',
        a: 'DNI, escrituras, nota simple, cédula de habitabilidad, certificado energético, IBI, certificado de deudas de comunidad y, en edificios de +50 años, IEE/ITE si aplica. Tu gestor te da el checklist completo.',
      },
    ],
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'venta-completa-barcelona',
    heroImage: '/barcelona2.jpg',
    precioEjemploPiso: 350_000,
    ventasAcompanadas: 22,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Ventas en Cataluña',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Experto en ventas entre particulares en Barcelona. Domina la cédula de la Generalitat, ITE y coordinación con notarías del área metropolitana.',
    },
    zonas: ['Eixample', 'Gràcia', 'Sants', 'Sant Martí', "L'Hospitalet", 'Badalona'],
    meta: {
      title: 'Vender piso particular Barcelona desde 687€',
      description:
        'Vende tu piso a particular en Barcelona con gestor asignado. Contratos, cédula Generalitat, documentación y notaría. 687€ sin comisión de agencia.',
      keywords:
        'vender piso particular barcelona, gestoria venta vivienda barcelona, vender sin agencia barcelona, gestor venta piso barcelona',
      ogTitle: 'Vender piso a particular en Barcelona — 687€ hasta escritura',
      ogDescription: 'Gestor experto en ventas entre particulares. Documentación catalana y coordinación notarial.',
    },
    hero: {
      h1: 'Vende tu piso a particular en Barcelona con gestor hasta escritura',
      lead:
        'Ya tienes comprador y precio acordado. Redactamos reserva y arras, verificamos cédula de la Generalitat, ITE y cargas registrales, y coordinamos con notaría. 687€ frente a miles en comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Es obligatoria la cédula de habitabilidad para vender en Barcelona?',
        a: 'Sí en Cataluña. Sin cédula vigente la operación puede bloquearse en notaría. Te ayudamos a obtenerla o verificar que la tuya es válida.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'venta-completa-valencia',
    heroImage: '/valencia3.jpg',
    precioEjemploPiso: 260_000,
    ventasAcompanadas: 19,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Ventas en Valencia',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña vendedores particulares en Valencia y provincia. Gestiona documentación valenciana, deudas de comunidad y coordinación con notaría hasta escritura.',
    },
    zonas: ['Ruzafa', 'Benimaclet', 'Campanar', 'Ciutat Vella', 'Mislata', 'Paterna'],
    meta: {
      title: 'Vender piso particular Valencia desde 687€',
      description:
        '¿Comprador particular en Valencia? Gestor asignado: contratos, cédula valenciana, documentación y notaría. 687€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'vender piso particular valencia, gestoria venta vivienda valencia, vender sin agencia valencia, gestor venta piso valencia',
      ogTitle: 'Vender piso a particular en Valencia — gestor completo',
      ogDescription: '687€ fijos. Contratos, documentación Comunitat Valenciana y notaría.',
    },
    hero: {
      h1: 'Vende de particular a particular en Valencia con tu gestor asignado',
      lead:
        'Has llegado a un acuerdo con tu comprador. Nosotros redactamos contratos, recabamos cédula valenciana, certificado energético y deudas de comunidad, y te acompañamos hasta firmar en notaría.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'venta-completa-sevilla',
    heroImage: '/sevilla2.jpg',
    precioEjemploPiso: 220_000,
    ventasAcompanadas: 28,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Ventas en Andalucía',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en ventas entre particulares en Sevilla. Conoce normativa andaluza, notarías de todos los barrios y documentación exigida en la Comunidad.',
    },
    zonas: ['Triana', 'Nervión', 'Macarena', 'Los Remedios', 'Centro', 'Este-Alcosa'],
    meta: {
      title: 'Vender piso particular Sevilla desde 687€',
      description:
        '¿Ya tienes comprador en Sevilla? Gestor inmobiliario: contratos, documentación andaluza y coordinación notarial. 687€ sin comisión de agencia.',
      keywords:
        'vender piso particular sevilla, gestoria venta vivienda sevilla, vender sin agencia sevilla, gestor venta piso sevilla',
      ogTitle: 'Vender piso a particular en Sevilla — 687€ hasta escritura',
      ogDescription: 'Gestor en Sevilla. Contratos, documentación andaluza y notaría incluidos.',
    },
    hero: {
      h1: '¿Ya encontraste comprador en Sevilla? Te ayudamos con todos los trámites',
      lead:
        'Vendes de particular a particular y tienes comprador. Un gestor inmobiliario redacta contratos, recaba documentación andaluza y coordina con notarías de Triana, Nervión, Macarena y toda la ciudad. 687€, sin comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué pasa con la plusvalía al vender en Sevilla?',
        a: 'El IIVTNU (plusvalía municipal) es responsabilidad del vendedor. Tu gestor te orienta sobre el cálculo y plazos. También te informamos sobre IRPF por ganancia patrimonial.',
      },
    ],
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía',
    testimoniosLanding: 'venta-completa-malaga',
    heroImage: '/gestoria5.jpg',
    precioEjemploPiso: 280_000,
    ventasAcompanadas: 16,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Ventas en Málaga',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña vendedores particulares en Málaga y Costa del Sol. Gestiona documentación, contratos y coordinación notarial en operaciones entre particulares.',
    },
    zonas: ['Centro', 'Teatinos', 'El Palo', 'Huelin', 'Torremolinos', 'Rincón de la Victoria'],
    meta: {
      title: 'Vender piso particular Málaga desde 687€',
      description:
        'Vende a particular en Málaga con gestor asignado. Contratos, documentación andaluza, notaría. 687€ IVA incl. Ahorra comisión de agencia.',
      keywords:
        'vender piso particular malaga, gestoria venta vivienda malaga, vender sin agencia malaga, gestor venta piso malaga',
      ogTitle: 'Vender piso a particular en Málaga — gestor completo',
      ogDescription: '687€ fijos. Documentación, contratos y notaría en Málaga.',
    },
    hero: {
      h1: 'Vende tu piso a particular en Málaga con gestor hasta escritura',
      lead:
        'Ya tienes comprador y precio pactado. Redactamos reserva y arras, verificamos documentación andaluza y coordinamos con notaría. 687€ frente a 8.400–14.000€ de comisión de agencia.',
    },
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    testimoniosLanding: 'venta-completa-salamanca',
    heroImage: '/keys.jpg',
    precioEjemploPiso: 180_000,
    ventasAcompanadas: 11,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Ventas en Castilla y León',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña ventas entre particulares en Salamanca. Gestiona contratos, documentación autonómica y coordinación con notaría local.',
    },
    zonas: ['Centro', 'Garrido', 'San Bernardo', 'Vista Hermosa', 'Alamedilla'],
    meta: {
      title: 'Vender piso particular Salamanca desde 687€',
      description:
        'Vende tu piso a particular en Salamanca. Gestor asignado, contratos, documentación y notaría. 687€ sin comisión de agencia.',
      keywords:
        'vender piso particular salamanca, gestoria venta vivienda salamanca, vender sin agencia salamanca',
      ogTitle: 'Vender piso a particular en Salamanca — 687€',
      ogDescription: 'Gestor experto en ventas entre particulares en Salamanca.',
    },
    hero: {
      h1: 'Vende tu piso a particular en Salamanca con gestor especializado',
      lead:
        'Has llegado a un acuerdo con tu comprador. Tu gestor redacta contratos, recaba documentación y coordina con notaría hasta escritura. 687€ fijos, sin comisión de agencia.',
    },
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'venta-completa-valladolid',
    heroImage: '/keys.jpg',
    precioEjemploPiso: 190_000,
    ventasAcompanadas: 9,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Ventas en Castilla y León',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en ventas de particular a particular en Valladolid. Contratos, documentación y coordinación notarial hasta el cierre de la operación.',
    },
    zonas: ['Centro', 'Delicias', 'Parquesol', 'Rondilla', 'La Victoria'],
    meta: {
      title: 'Vender piso particular Valladolid desde 687€',
      description:
        '¿Comprador particular en Valladolid? Gestor inmobiliario: contratos, documentación y notaría. 687€ IVA incl.',
      keywords:
        'vender piso particular valladolid, gestoria venta vivienda valladolid, vender sin agencia valladolid',
      ogTitle: 'Vender piso a particular en Valladolid — 687€',
      ogDescription: 'Acompañamiento completo hasta escritura en Valladolid.',
    },
    hero: {
      h1: 'Vende de particular a particular en Valladolid con tu gestor asignado',
      lead:
        'Ya tienes comprador. Un gestor inmobiliario se encarga de contratos, documentación castellano-leonesa y coordinación con notaría. 687€, sin pagar comisión de agencia.',
    },
  },
}

export function buildVentaCompletaMetadata(config: VentaCompletaCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [{ url: `${BASE_URL}${config.heroImage}`, width: 1200, height: 630, alt: `Venta piso ${config.nombre}` }],
    },
  }
}
