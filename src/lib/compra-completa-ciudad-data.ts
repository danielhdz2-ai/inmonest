import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { withGestoriaIndexRobots } from './gestoria-indexacion-tier'
import { getPrecioServicio } from './gestoria-catalogo'

const BASE_URL = 'https://inmonest.com'

export const COMPRA_COMPLETA_PRECIO = getPrecioServicio('compra-completa-reserva-escritura') ?? 687

export type CompraCompletaCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  comprasAcompanadas: number
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

export const COMPRA_COMPLETA_CIUDADES: Record<string, CompraCompletaCiudadConfig> = {
  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'compra-completa-reserva-escritura',
    heroImage: getCiudadImage('barcelona').src,
    precioEjemploPiso: 350_000,
    comprasAcompanadas: 18,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Due diligence, arras y seguimiento hasta notaría en Barcelona. Cédula Generalitat, ITE en edificios y coordinación con entidades financieras.',
    },
    zonas: ['Eixample', 'Gràcia', 'Sants', 'Poblenou', 'Les Corts', 'Sarrià-Sant Gervasi'],
    meta: {
      title: 'Comprar piso particular Barcelona desde 687€',
      description:
        'Compra a particular en Barcelona con gestor: due diligence, arras blindadas, documentación catalana y notaría. 687€ sin comisión de agencia.',
      keywords:
        'comprar piso particular barcelona, gestoria compra vivienda barcelona, comprar sin agencia barcelona, gestor compra piso barcelona',
      ogTitle: 'Comprar piso a un particular en Barcelona — 687€ hasta escritura',
      ogDescription: 'Revisión registral, arras con hipoteca y coordinación notarial. Online o Les Corts.',
    },
    hero: {
      h1: 'Compra piso a particular en Barcelona con gestor hasta escritura',
      lead:
        'Ya tienes piso y precio con un vendedor particular. Revisamos nota simple, comunidad e ITE, redactamos o corregimos arras con cláusula de financiación y te acompañamos hasta notaría. 687 € fijos — 0 % comisión de captación.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisáis antes de las arras en Barcelona?',
        a: 'Nota simple, cargas, certificado de deudas de comunidad, actas (derramas, ITE del edificio), cédula de habitabilidad y coherencia del borrador de arras con tu hipoteca.',
      },
      {
        q: '¿Hay landings por barrio en Barcelona?',
        a: 'Sí. En /barcelona/compra-completa/[barrio] tienes mercado local, guía editorial y FAQ específica para Eixample, Gràcia, Sants, Poblenou y más de una docena de zonas.',
      },
    ],
  },

  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'compra-completa-reserva-escritura',
    heroImage: getCiudadImage('madrid').src,
    precioEjemploPiso: 320_000,
    comprasAcompanadas: 14,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Due diligence, arras con hipoteca y seguimiento hasta notaría en Madrid capital y área metropolitana. Documentación madrileña y coordinación con entidades.',
    },
    zonas: ['Salamanca', 'Chamberí', 'Retiro', 'Carabanchel', 'Vallecas', 'Getafe', 'Móstoles'],
    meta: {
      title: 'Comprar piso particular Madrid desde 687€',
      description:
        'Compra a particular en Madrid con gestor: due diligence, arras, documentación y notaría. 687€ IVA incl. Sin comisión de agencia.',
      keywords:
        'comprar piso particular madrid, gestoria compra vivienda madrid, comprar sin agencia madrid, gestor compra piso madrid',
      ogTitle: 'Comprar piso a un particular en Madrid — 687€ hasta escritura',
      ogDescription: 'Revisión registral, arras blindadas y coordinación notarial. 100 % online posible.',
    },
    hero: {
      h1: 'Compra piso a particular en Madrid con gestor hasta escritura',
      lead:
        'Ya tienes piso y precio con un vendedor particular. Revisamos cargas y comunidad, redactamos o corregimos arras con cláusula de financiación y te acompañamos hasta notaría. 687 € fijos — 0 % comisión de captación.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué documentación revisáis antes de las arras en Madrid?',
        a: 'Nota simple, cargas, certificado de deudas de comunidad, ITE si aplica, cédula de habitabilidad y coherencia del borrador de arras con tu hipoteca.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'compra-completa-reserva-escritura',
    heroImage: getCiudadImage('valencia').src,
    precioEjemploPiso: 260_000,
    comprasAcompanadas: 11,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores particulares en Valencia y provincia. Due diligence, arras y coordinación con notaría hasta escritura.',
    },
    zonas: ['Ruzafa', 'Benimaclet', 'Campanar', 'Ciutat Vella', 'Mislata', 'Paterna'],
    meta: {
      title: 'Comprar piso particular Valencia desde 687€',
      description:
        'Compra a particular en Valencia con gestor: due diligence, arras, cédula valenciana y notaría. 687€ sin comisión 3-5%.',
      keywords:
        'comprar piso particular valencia, gestoria compra vivienda valencia, comprar sin agencia valencia',
      ogTitle: 'Comprar piso a un particular en Valencia — gestor completo',
      ogDescription: '687€ fijos. Revisión documental, arras y notaría.',
    },
    hero: {
      h1: 'Compra de particular a particular en Valencia con tu gestor asignado',
      lead:
        'Has acordado precio con el vendedor. Revisamos documentación valenciana, blindamos las arras y te acompañamos hasta firmar en notaría. Tarifa plana 687 €.',
    },
  },
}

export function buildCompraCompletaMetadata(config: CompraCompletaCiudadConfig): Metadata {
  const path = `/gestoria/compra-completa-reserva-escritura/${config.slug}`
  return withGestoriaIndexRobots(path, {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}${path}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Compra piso particular ${config.nombre}`,
        },
      ],
    },
  })
}
