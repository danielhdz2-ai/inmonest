import type { Metadata } from 'next'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

const BASE_URL = 'https://inmonest.com'
export const PRESTAMO_PARTICULARES_PRECIO = 130

export type PrestamoParticularesGestor = {
  nombre: string
  rol: string
  foto: string
  bio: string
  especialidades: string[]
}

export type PrestamoParticularesCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  gestor: PrestamoParticularesGestor
  mercadoIntro: string
  fiscalIntro: string
  situacionesIntro: string
  situaciones: string[]
  zonasIntro: string
  zonas: string[]
  paraQuienExtra: string[]
  faqExtra: { q: string; a: string }[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const PRESTAMO_PARTICULARES_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
] as const

export const PRESTAMO_PARTICULARES_CIUDADES: Record<string, PrestamoParticularesCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'prestamo-particulares-madrid',
    heroImage: '/madrid2.jpg',
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Préstamos entre particulares en Madrid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a prestamistas y prestatarios que formalizan préstamos privados en Madrid y Comunidad de Madrid. Especialista en contratos entre familiares para entrada de vivienda, préstamos sin interés, Modelo 600 y protección ante reclamaciones de Hacienda.',
      especialidades: ['Préstamos familiares vivienda', 'Modelo 600 Comunidad de Madrid', 'Contratos sin interés (0 %)'],
    },
    mercadoIntro:
      'En Madrid es muy habitual que padres presten a hijos la entrada de un piso, que socios financien un negocio o que amigos se presten dinero para una reforma. Sin contrato escrito, Hacienda puede interpretar la transferencia como donación encubierta y liquidar el Impuesto de Donaciones. Un préstamo mal documentado también dificulta reclamar judicialmente si el prestatario deja de devolver el capital.',
    fiscalIntro:
      'En la Comunidad de Madrid el préstamo entre particulares debe declararse mediante el Modelo 600 (ITP). Si el préstamo es sin intereses, la cuota suele ser cero, pero la declaración es obligatoria para acreditar que no es una donación. Tu asesor te orienta sobre plazos, documentación y obligaciones de IRPF si devenga intereses.',
    situacionesIntro: 'Casos frecuentes de préstamos entre particulares que formalizamos en Madrid y área metropolitana:',
    situaciones: [
      'Préstamo de padres a hijos para entrada de piso',
      'Préstamo entre socios para abrir negocio',
      'Préstamo familiar para reforma de vivienda',
      'Préstamo entre amigos con devolución a plazos',
      'Préstamo sin interés (tipo 0 %) entre familiares',
      'Préstamo con aval personal de un tercero',
    ],
    zonasIntro: 'Servicio en Madrid capital, área metropolitana y municipios de la Comunidad de Madrid con cobertura online.',
    zonas: [
      'Centro', 'Salamanca', 'Chamberí', 'Retiro', 'Moncloa',
      'Chamartín', 'Las Rozas', 'Pozuelo de Alarcón', 'Getafe',
      'Móstoles', 'Alcobendas', 'San Sebastián de los Reyes',
    ],
    paraQuienExtra: [
      'Familiares en Madrid que prestan dinero para la compra de vivienda sin pasar por banco',
      'Particulares que recibieron una transferencia y quieren evitar una inspección de Hacienda',
      'Prestamistas que necesitan título ejecutivo para reclamar impago judicialmente',
    ],
    faqExtra: [
      {
        q: '¿Dónde se presenta el Modelo 600 en Madrid?',
        a: 'En la Comunidad de Madrid, el Modelo 600 de transmisiones patrimoniales onerosas se presenta ante la administración tributaria autonómica. Tu asesor te indica plazos y documentación necesaria junto con el contrato.',
      },
      {
        q: '¿Un préstamo entre padres e hijos en Madrid tributa como donación?',
        a: 'No, si existe contrato escrito y declaración correcta. Sin documentación, Hacienda puede presumir donación encubierta. Nuestro contrato de 130€ IVA incluido deja constancia del préstamo y la obligación de devolución.',
      },
      {
        q: '¿Puedo reclamar judicialmente en Madrid si no me devuelven el préstamo?',
        a: 'Sí. Con contrato firmado puedes iniciar un procedimiento monitorio ante los juzgados de Madrid. Es mucho más ágil que intentar probar un préstamo verbal solo con extractos bancarios.',
      },
    ],
    meta: {
      title: 'Contrato Préstamo entre Particulares Madrid | 130€ IVA incluido | Inmonest',
      description:
        '¿Prestas o recibes dinero entre particulares en Madrid? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares madrid, prestamo entre familiares madrid, prestamo privado madrid hacienda, modelo 600 prestamo madrid, prestamo padres hijos entrada piso madrid, prestamo sin intereses madrid, contrato prestamo privado madrid, formalizar prestamo familiar madrid, prestamo entre amigos madrid contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Madrid — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Madrid con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña',
    testimoniosLanding: 'prestamo-particulares-barcelona',
    heroImage: '/barcelona2.jpg',
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Préstamos entre particulares en Barcelona',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña a prestamistas y prestatarios en Barcelona y área metropolitana. Domina la redacción de contratos de préstamo privado, préstamos familiares para compra de vivienda, declaración ante la Generalitat y protección ante reclamaciones de la AEAT.',
      especialidades: ['Préstamos entre familiares', 'Modelo 600 Cataluña', 'Reclamación por impago'],
    },
    mercadoIntro:
      'En Barcelona y el área metropolitana es habitual que familiares presten capital para la entrada de un piso, que emprendedores reciban financiación privada o que particulares se presten dinero para reformas. Sin contrato, una transferencia bancaria puede ser cuestionada por Hacienda como donación encubierta, con consecuencias fiscales graves para ambas partes.',
    fiscalIntro:
      'En Cataluña el préstamo entre particulares debe formalizarse y declararse correctamente (Modelo 600, ITP). Si el préstamo es a tipo cero, la cuota puede ser nula, pero la obligación de declarar sigue existiendo. Tu gestor te explica el tratamiento fiscal y cómo documentar intereses si los hubiera.',
    situacionesIntro: 'Situaciones habituales de préstamos privados que gestionamos en Barcelona y Cataluña:',
    situaciones: [
      'Préstamo familiar para comprar piso en Barcelona',
      'Préstamo entre socios de startup o autónomos',
      'Préstamo para reforma integral del inmueble',
      'Préstamo entre conocidos con cuotas mensuales',
      'Préstamo sin intereses entre familiares directos',
      'Préstamo con garantía personal o aval',
    ],
    zonasIntro: 'Cobertura en Barcelona capital, área metropolitana y principales municipios de Cataluña. Servicio 100 % online.',
    zonas: [
      'Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Les Corts', 'Sants',
      "L'Hospitalet", 'Badalona', 'Sant Cugat del Vallès', 'Terrassa',
      'Sabadell', 'Castelldefels', 'Sitges',
    ],
    paraQuienExtra: [
      'Familias en Barcelona que prestan dinero para la entrada de vivienda sin hipoteca bancaria',
      'Particulares que quieren proteger un préstamo ya realizado por transferencia',
      'Prestamistas que necesitan cláusulas de impago y vencimiento anticipado',
    ],
    faqExtra: [
      {
        q: '¿El contrato de préstamo es válido en Barcelona y Cataluña?',
        a: 'Sí. El contrato privado entre particulares tiene plena validez jurídica en Barcelona, Badalona, Sant Cugat y resto de Cataluña. Debe complementarse con la declaración fiscal correspondiente (Modelo 600).',
      },
      {
        q: '¿Hace falta notario para un préstamo entre particulares en Barcelona?',
        a: 'No es obligatorio para importes habituales sin hipoteca como garantía. Para préstamos entre 5.000€ y 100.000€ el contrato privado firmado es suficiente y ejecutable judicialmente.',
      },
      {
        q: '¿Qué pasa si el prestatario deja de pagar en Barcelona?',
        a: 'El contrato incluye cláusulas de vencimiento anticipado e intereses de demora. Puedes reclamar mediante juicio monitorio en los juzgados de Barcelona con mayor solvencia que con un acuerdo verbal.',
      },
    ],
    meta: {
      title: 'Contrato Préstamo entre Particulares Barcelona | 130€ IVA incluido | Inmonest',
      description:
        '¿Prestas o recibes dinero entre particulares en Barcelona? Contrato profesional con asesor experto, nota fiscal y Modelo 600. Evita donación encubierta ante Hacienda. 130€ IVA incluido.',
      keywords:
        'contrato prestamo entre particulares barcelona, prestamo entre familiares barcelona, prestamo privado barcelona hacienda, modelo 600 prestamo catalunya, prestamo padres hijos entrada piso barcelona, prestamo sin intereses barcelona, contrato prestamo privado barcelona, formalizar prestamo familiar barcelona, prestamo entre amigos barcelona contrato',
      ogTitle: 'Contrato Préstamo entre Particulares Barcelona — 130€ con asesor experto',
      ogDescription:
        'Formaliza préstamos privados en Barcelona con contrato profesional, orientación fiscal y entrega en 48h. 130€ IVA incluido.',
    },
  },
}

export function buildPrestamoParticularesMetadata(config: PrestamoParticularesCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/prestamo-particulares/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/prestamo-particulares/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Contrato préstamo entre particulares ${config.nombre}`,
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
