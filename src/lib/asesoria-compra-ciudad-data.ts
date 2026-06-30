import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

const BASE_URL = 'https://inmonest.com'
export const ASESORIA_COMPRA_PRECIO = 687

export type AsesoriaCompraCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  gestor: {
    nombre: string
    rol: string
    foto: string
    bio: string
  }
  zonas: string[]
  zonasIntro: string
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

export const ASESORIA_COMPRA_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
] as const

export const ASESORIA_COMPRA_CIUDADES: Record<string, AsesoriaCompraCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'asesoria-compra-madrid',
    heroImage: '/madrid2.jpg',
    precioEjemploPiso: 320_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: GESTOR_DANIEL_HERNANDEZ.rol,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras entre particulares en Madrid. Revisa reserva, arras, nota simple, IEE/ITE y te acompaña hasta escritura sin comisión de agencia.',
    },
    zonasIntro: 'Servicio en Madrid capital y área metropolitana.',
    zonas: ['Salamanca', 'Chamberí', 'Retiro', 'Carabanchel', 'Vallecas', 'Móstoles', 'Getafe'],
    meta: {
      title: 'Asesoría Compra Piso Madrid | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Madrid con gestor asignado. Desde reserva hasta escritura. 687€ IVA incl. Sin comisión del 3-5%. Respuesta en 24h.',
      keywords:
        'asesoria compra piso madrid, comprar piso particular madrid, comprar piso sin agencia madrid, gestor compra vivienda madrid, gestoria compra piso madrid',
      ogTitle: 'Asesoría compra piso Madrid — 687€ sin comisión de agencia',
      ogDescription: 'Gestor asignado desde reserva hasta escritura en Madrid. 687€ fijos.',
    },
    hero: {
      h1: 'Compra piso de particular en Madrid sin pagar comisión de agencia',
      lead:
        'Gestor inmobiliario asignado desde la reserva hasta la escritura. Revisamos contratos, documentación registral y normativa madrileña. 687€ fijos, sin % sobre el precio del piso.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Madrid?',
        a: 'Nota simple, deudas de comunidad, IBI, IEE/ITE en edificios de +50 años, cédula de habitabilidad y contrato de reserva. En Madrid las operaciones van rápido: no firmes sin revisión profesional.',
      },
    ],
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'asesoria-compra-barcelona',
    heroImage: '/barcelona2.jpg',
    precioEjemploPiso: 350_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Cataluña',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Experto en compras entre particulares en Barcelona. Domina cédula de la Generalitat, ITE y revisión de cargas antes de ir a notaría.',
    },
    zonasIntro: 'Barcelona capital y área metropolitana.',
    zonas: ['Eixample', 'Gràcia', 'Sants', 'Sant Martí', "L'Hospitalet", 'Badalona'],
    meta: {
      title: 'Asesoría Compra Piso Barcelona | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Barcelona con gestor asignado. 687€ IVA incl. Revisión documental y acompañamiento hasta escritura. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso barcelona, comprar piso particular barcelona, comprar piso sin agencia barcelona, gestor compra vivienda barcelona',
      ogTitle: 'Asesoría compra piso Barcelona — 687€ sin comisión',
      ogDescription: 'Gestor experto hasta escritura en Barcelona. Tarifa plana 687€.',
    },
    hero: {
      h1: 'Compra piso de particular en Barcelona con gestor asignado',
      lead:
        '¿Compras sin inmobiliaria? Revisamos reserva, arras, cédula de la Generalitat, ITE y cargas registrales. 687€ fijos frente a miles de euros de comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Es obligatoria la cédula de habitabilidad al comprar en Barcelona?',
        a: 'Sí en la Comunitat. Sin cédula vigente la operación puede bloquearse en notaría. La verificamos como parte del servicio.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'asesoria-compra-valencia',
    heroImage: '/valencia3.jpg',
    precioEjemploPiso: 260_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña compradores de particular en Valencia y provincia. Revisa documentación valenciana, cargas y deudas de comunidad hasta la escritura.',
    },
    zonasIntro: 'Valencia capital y l\'Horta.',
    zonas: ['Ruzafa', 'Benimaclet', 'Campanar', 'Ciutat Vella', 'Mislata', 'Paterna'],
    meta: {
      title: 'Asesoría Compra Piso Valencia | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Valencia con gestora asignada. 687€ IVA incl. Desde reserva hasta escritura. Sin comisión de agencia.',
      keywords:
        'asesoria compra piso valencia, comprar piso particular valencia, comprar piso sin agencia valencia, gestor compra vivienda valencia',
      ogTitle: 'Asesoría compra piso Valencia — 687€ fijos',
      ogDescription: 'Gestora hasta escritura en Valencia. Sin comisiones abusivas.',
    },
    hero: {
      h1: 'Compra piso de particular en Valencia sin comisión de agencia',
      lead:
        'Gestora asignada que revisa contratos, cédula valenciana, nota simple y deudas de comunidad. 687€ por todo el proceso hasta notaría.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'asesoria-compra-sevilla',
    heroImage: '/sevilla2.jpg',
    precioEjemploPiso: 220_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Andalucía',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Especializada en compras entre particulares en Sevilla. Revisa normativa andaluza, IEE y documentación antes de la firma en notaría.',
    },
    zonasIntro: 'Sevilla capital y área metropolitana.',
    zonas: ['Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Este-Alcosa', 'Dos Hermanas'],
    meta: {
      title: 'Asesoría Compra Piso Sevilla | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Sevilla con gestora asignada. 687€ IVA incl. Acompañamiento completo hasta escritura.',
      keywords:
        'asesoria compra piso sevilla, comprar piso particular sevilla, comprar piso sin agencia sevilla, gestor compra vivienda sevilla',
      ogTitle: 'Asesoría compra piso Sevilla — 687€',
      ogDescription: 'Compra entre particulares en Sevilla con gestora experta. Tarifa plana.',
    },
    hero: {
      h1: 'Compra piso de particular en Sevilla con asesoramiento legal completo',
      lead:
        'Sin agencia, pero con gestoría profesional. Revisamos arras, documentación andaluza y te acompañamos hasta escritura por 687€ fijos.',
    },
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía',
    testimoniosLanding: 'asesoria-compra-malaga',
    heroImage: '/gestoria5.jpg',
    precioEjemploPiso: 300_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Málaga y Costa del Sol',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña compradores en Málaga capital y costa. Revisa documentación, cargas y normativa andaluza en operaciones entre particulares.',
    },
    zonasIntro: 'Málaga capital y Costa del Sol.',
    zonas: ['Centro', 'Teatinos', 'El Palo', 'La Malagueta', 'Benalmádena', 'Torremolinos'],
    meta: {
      title: 'Asesoría Compra Piso Málaga | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Málaga con gestora asignada. 687€ IVA incl. Desde reserva hasta escritura en la Costa del Sol.',
      keywords:
        'asesoria compra piso malaga, comprar piso particular malaga, comprar piso sin agencia malaga, gestor compra vivienda malaga, comprar piso costa del sol',
      ogTitle: 'Asesoría compra piso Málaga — 687€',
      ogDescription: 'Gestora hasta escritura en Málaga. Sin comisión de agencia.',
    },
    hero: {
      h1: 'Compra piso de particular en Málaga sin comisión de agencia',
      lead:
        'Gestora asignada para compradores que no quieren pagar el 3-5% a una inmobiliaria. 687€ por acompañamiento completo hasta notaría.',
    },
  },
}

export function buildAsesoriaCompraMetadata(config: AsesoriaCompraCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/asesoria-compra-piso/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/asesoria-compra-piso/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Asesoría compra piso ${config.nombre}`,
        },
      ],
    },
  }
}

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}
