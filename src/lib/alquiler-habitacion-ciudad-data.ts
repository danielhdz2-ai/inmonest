import type { Metadata } from 'next'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

const BASE_URL = 'https://inmonest.com'
export const ALQUILER_HABITACION_PRECIO = 120

export type AlquilerHabitacionGestor = {
  nombre: string
  rol: string
  foto: string
  bio: string
  especialidades: string[]
}

export type AlquilerHabitacionCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  gestor: AlquilerHabitacionGestor
  mercadoIntro: string
  zonasIntro: string
  zonas: string[]
  paraQuienExtra: string[]
  faqExtra: { q: string; a: string }[]
  enlaceContratoLau: string
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const ALQUILER_HABITACION_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
] as const

export const ALQUILER_HABITACION_CIUDADES: Record<string, AlquilerHabitacionCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'alquiler-habitacion-madrid',
    heroImage: '/madrid2.jpg',
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Alquiler de habitaciones en Madrid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Asesora a propietarios particulares que alquilan habitaciones en Madrid capital y área metropolitana. Conoce el mercado de pisos compartidos, la redacción conforme al Código Civil y los conflictos habituales en coliving urbano.',
      especialidades: ['Pisos compartidos y coliving', 'Normas de convivencia válidas', 'Asesoramiento hasta la firma'],
    },
    mercadoIntro:
      'Madrid concentra una de las mayores demandas de habitaciones en piso compartido de España: estudiantes en Moncloa y Ciudad Universitaria, jóvenes profesionales en Chamberí o Malasaña y trabajadores temporales. Muchos propietarios alquilan habitaciones sin contrato escrito y asumen riesgos evitables.',
    zonasIntro: 'Servicio en Madrid capital y área metropolitana. Conocemos la dinámica del alquiler por habitaciones en los barrios con mayor demanda.',
    zonas: [
      'Chamberí', 'Malasaña', 'Moncloa', 'Argüelles', 'Ciudad Universitaria',
      'Lavapiés', 'Tetuán', 'Vallecas', 'Getafe', 'Móstoles', 'Alcalá de Henares',
    ],
    paraQuienExtra: [
      'Propietarios en Chamberí, Moncloa o barrios universitarios con alta rotación de inquilinos',
      'Quien alquila varias habitaciones en el mismo piso y necesita un contrato por inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato de habitación sirve en toda la Comunidad de Madrid?',
        a: 'Sí. Redactamos contratos válidos en Madrid capital y municipios del área metropolitana, adaptados al Código Civil y a la práctica habitual del mercado madrileño de pisos compartidos.',
      },
      {
        q: '¿Es lo mismo que un contrato LAU de vivienda completa?',
        a: 'No. El alquiler de habitación no queda amparado por la LAU como vivienda íntegra. Si alquilas el piso completo, necesitas un contrato LAU distinto. Nosotros también lo redactamos por 120€.',
      },
    ],
    enlaceContratoLau: '/madrid/contrato-alquiler',
    meta: {
      title: 'Contrato Alquiler Habitación Madrid | 120€ IVA incluido | Inmonest',
      description:
        '¿Alquilas una habitación en Madrid? Contrato profesional para particulares con asesor experto. Código Civil, normas de convivencia y protección ante impagos. 120€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion madrid, alquilar habitacion madrid, contrato habitacion piso compartido madrid, coliving madrid contrato, arrendamiento habitacion madrid, gestoria alquiler habitacion madrid',
      ogTitle: 'Contrato Alquiler Habitación Madrid — 120€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Madrid. Contrato profesional, asesoramiento legal y entrega en 48h. 120€ IVA incluido.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña',
    testimoniosLanding: 'alquiler-habitacion-barcelona',
    heroImage: '/barcelona2.jpg',
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Alquiler de habitaciones en Barcelona',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña a propietarios que alquilan habitaciones en Barcelona y área metropolitana. Domina el régimen del Código Civil aplicable al alquiler por habitación, la convivencia en pisos compartidos y la normativa autonómica cuando afecta al inmueble.',
      especialidades: ['Coliving y pisos compartidos', 'Contratos por habitación', 'Asesoramiento pre y post firma'],
    },
    mercadoIntro:
      'Barcelona tiene una demanda muy alta de habitaciones en pisos compartidos: estudiantes en zona universitaria, profesionales en Eixample o Poblenou y perfiles internacionales. Sin contrato profesional, los conflictos por convivencia, fianza o impago se resuelven con mucha más dificultad.',
    zonasIntro: 'Cobertura en Barcelona capital, área metropolitana y conocimiento del mercado de alquiler por habitaciones en Cataluña.',
    zonas: [
      'Gràcia', 'Eixample', 'Poble Sec', 'Sants', 'Les Corts',
      'Sarrià-Sant Gervasi', 'Poblenou', 'El Raval', "L'Hospitalet", 'Badalona',
    ],
    paraQuienExtra: [
      'Propietarios en Gràcia, Eixample o Sants con pisos de 4-5 habitaciones para alquilar',
      'Inversores en coliving que necesitan un contrato independiente por cada inquilino',
    ],
    faqExtra: [
      {
        q: '¿El contrato es válido en Barcelona y el área metropolitana?',
        a: 'Sí. El contrato de habitación se rige por el Código Civil y es válido en Barcelona, L\'Hospitalet, Badalona y resto de Cataluña. Tu asesor adapta las cláusulas a tu situación concreta.',
      },
      {
        q: '¿Aplica la normativa de zonas tensionadas al alquiler de habitación?',
        a: 'El alquiler de una habitación dentro de una vivienda no se equipara al arrendamiento LAU de vivienda completa, por lo que las reglas de zona tensionada no se aplican igual. Tu asesor te explica las diferencias antes de fijar la renta.',
      },
    ],
    enlaceContratoLau: '/barcelona/contrato-alquiler',
    meta: {
      title: 'Contrato Alquiler Habitación Barcelona | 120€ IVA incluido | Inmonest',
      description:
        '¿Alquilas una habitación en Barcelona? Contrato profesional para particulares con asesor experto. Normas de convivencia, Código Civil y protección legal. 120€ IVA incluido.',
      keywords:
        'contrato alquiler habitacion barcelona, alquilar habitacion barcelona, contrato habitacion piso compartido barcelona, coliving barcelona contrato, arrendamiento habitacion barcelona, gestoria alquiler habitacion barcelona',
      ogTitle: 'Contrato Alquiler Habitación Barcelona — 120€ con asesor experto',
      ogDescription:
        'Particulares que alquilan habitaciones en Barcelona. Contrato profesional, asesoramiento legal y entrega en 48h. 120€ IVA incluido.',
    },
  },
}

export function buildAlquilerHabitacionMetadata(config: AlquilerHabitacionCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Contrato alquiler habitación ${config.nombre}`,
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
