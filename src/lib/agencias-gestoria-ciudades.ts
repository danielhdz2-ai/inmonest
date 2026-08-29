/** Landings B2B gestoría para agencias por ciudad */

import type { AgenciaCasoExito } from '@/lib/agencias-gestoria-trust'

export type AgenciaGestoriaCiudadSlug = 'madrid' | 'barcelona' | 'valencia'

export type AgenciaGestoriaCiudadConfig = {
  slug: AgenciaGestoriaCiudadSlug
  nombre: string
  region: string
  heroImage: string
  heroImageAlt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroLead: string
  mercadoLocal: string
  zonas: string[]
  operativaTipica: string
  confianzaIds?: string[]
  casos: AgenciaCasoExito[]
  faqExtra: { q: string; a: string }[]
  /** Meta SEO para ruta /gestoria/{slug}/agencias */
  gestoriaAgenciasTitle: string
  gestoriaAgenciasDescription: string
  gestoriaAgenciasKeywords: string[]
}

const CASO_MADRID_TECNOCASA: AgenciaCasoExito = {
  id: 'tecnocasa-rozas',
  agencia: 'Tecnocasa Las Rozas',
  ciudad: 'Madrid',
  tipo: 'Franquicia',
  volumen: '8–12 contratos/mes',
  pack: 'Pack Agencia Plus',
  cifra: '18 h',
  cifraLabel: 'ahorradas al mes en redacción',
  quote:
    'Antes derivábamos a un despacho externo y tardábamos días. Ahora el contrato de arras o alquiler sale en la misma tarde con FirmaCert incluida.',
  persona: 'Responsable de operaciones',
  rol: 'Oficina Las Rozas',
}

const CASO_BCN_SANTS: AgenciaCasoExito = {
  id: 'inmosants',
  agencia: 'Inmo Sants',
  ciudad: 'Barcelona',
  tipo: 'Agencia',
  volumen: '4–6 contratos/mes',
  pack: 'Pack Agencia',
  cifra: '110 €',
  cifraLabel: 'por contrato vs 145 € retail',
  quote:
    'El panel nos permite subir la documentación del piso y del inquilino en un solo sitio. El gestor conoce nuestra operativa en Sants y Eixample.',
  persona: 'Director comercial',
  rol: 'Inmobiliaria de barrio',
}

const CASO_BCN_INTERHOUSE: AgenciaCasoExito = {
  id: 'interhouse',
  agencia: 'Interhouse BCN',
  ciudad: 'Barcelona',
  tipo: 'API',
  volumen: 'Contratos sueltos + pack',
  cifra: '4–5 h',
  cifraLabel: 'de entrega media B2B',
  quote:
    'Como API necesitamos contratos LAU impecables y rápidos. Probamos con contratos sueltos y al ver el volumen activamos el pack anual.',
  persona: 'Agente de la Propiedad Inmobiliaria',
  rol: 'Serveis immobiliaris',
}

const CASO_VALENCIA: AgenciaCasoExito = {
  id: 'valencia-agencia',
  agencia: 'Agencia Ruzafa · Valencia',
  ciudad: 'Valencia',
  tipo: 'Agencia',
  volumen: '5–8 contratos/mes',
  pack: 'Pack Agencia',
  cifra: '12 h',
  cifraLabel: 'ahorradas a la semana en gestión',
  quote:
    'En Valencia movemos mucho alquiler LAU y arras en compraventa entre particulares. Tener el contrato en 4–5 h nos permite cerrar operaciones el mismo día.',
  persona: 'Gerente de agencia',
  rol: 'Distrito Ruzafa · Ciutat Vella',
}

const CASO_VALENCIA_AUTONOMO: AgenciaCasoExito = {
  id: 'valencia-autonomo',
  agencia: 'Agente independiente · Valencia',
  ciudad: 'Valencia',
  tipo: 'Autónomo',
  volumen: '2–3 contratos/mes',
  cifra: '110 €',
  cifraLabel: 'contrato suelto sin pack anual',
  quote:
    'Empecé con contratos sueltos a 110 €. Sin compromiso anual — ideal cuando estás empezando como autónomo inmobiliario en la Comunitat Valenciana.',
  persona: 'Agente independiente',
  rol: 'Colaborador API',
}

export const AGENCIAS_GESTORIA_CIUDADES: AgenciaGestoriaCiudadConfig[] = [
  {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    heroImage: '/gestoria3.jpg',
    heroImageAlt: 'Gestoría inmobiliaria para agencias en Madrid',
    metaTitle: 'Gestoría inmobiliaria para agencias en Madrid — 110€ · 4–5 h',
    metaDescription:
      'Packs y contratos sueltos B2B para agencias, APIs y autónomos inmobiliarios en Madrid. Arras, alquiler LAU y compraventa desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    keywords: [
      'gestoría inmobiliaria agencias Madrid',
      'contratos arras agencia Madrid',
      'contrato alquiler LAU agencia Madrid',
      'gestoría B2B Madrid inmobiliaria',
      'agente autónomo inmobiliario Madrid contratos',
      'API Madrid contratos inmobiliarios',
      'pack contratos agencia Madrid',
      'Tecnocasa gestoría contratos',
    ],
    heroLead:
      'Packs anuales y contratos sueltos para agencias, franquicias y autónomos que operan en Madrid y área metropolitana. Mismo panel, entrega en 4–5 h.',
    mercadoLocal:
      'Madrid concentra el mayor volumen de compraventa y alquiler LAU de España. Las agencias madrileñas necesitan contratos rápidos en arras penitenciales, arras confirmatorias y alquiler de vivienda con cláusulas adaptadas al mercado local.',
    zonas: ['Salamanca', 'Chamberí', 'Las Rozas', 'Getafe', 'Móstoles', 'Alcobendas'],
    operativaTipica: '3–6 operaciones al mes entre venta y alquiler',
    confianzaIds: ['tecnocasa', 'nueva-habitat', 'infopisos'],
    casos: [CASO_MADRID_TECNOCASA],
    faqExtra: [
      {
        q: '¿Conocéis la normativa de alquiler en Madrid?',
        a: 'Sí. Redactamos contratos LAU adaptados a la Ley de Vivienda 2026 y a la operativa habitual en Madrid capital y área metropolitana, incluyendo cláusulas de fianza, actualización de renta y zonas tensionadas cuando aplique.',
      },
      {
        q: '¿Trabajáis con franquicias en Madrid como Tecnocasa?',
        a: 'Sí. Oficinas de franquicia en Madrid y Las Rozas usan nuestros packs de volumen con entrega prioritaria en 4–5 horas y FirmaCert incluida en cada contrato.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Madrid — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'Contratos de arras, alquiler LAU y compraventa para agencias, APIs y autónomos inmobiliarios en Madrid. Packs anuales o suelto a 110 €. Entrega 4–5 h. FirmaCert incluida.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Madrid',
      'contratos inmobiliarios agencia Madrid',
      'gestoría agencias inmobiliarias Madrid',
      'pack contratos arras Madrid agencia',
      'contrato alquiler LAU agencia Madrid',
    ],
  },
  {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Catalunya',
    heroImage: '/gestoria2.jpg',
    heroImageAlt: 'Gestoría inmobiliaria para agencias en Barcelona',
    metaTitle: 'Gestoría inmobiliaria para agencias en Barcelona — 110€ · 4–5 h',
    metaDescription:
      'Gestoría B2B para agencias, APIs y autónomos en Barcelona y área metropolitana. Contratos LAU, arras y compraventa desde 110 €. Inmo Sants e Interhouse ya operan con nosotros.',
    keywords: [
      'gestoría inmobiliaria agencias Barcelona',
      'contrato alquiler LAU agencia Barcelona',
      'gestoría B2B Barcelona inmobiliaria',
      'API Barcelona contratos inmobiliarios',
      'agente autónomo inmobiliario Barcelona',
      'contratos arras Barcelona agencia',
      'Inmo Sants gestoría',
      'Interhouse BCN contratos',
    ],
    heroLead:
      'Contratos profesionales para agencias y APIs en Barcelona, Sants, Eixample y área metropolitana. Pack anual o contrato suelto a tarifa B2B.',
    mercadoLocal:
      'Barcelona combina alquiler residencial LAU, alquiler de habitación en pisos compartidos y compraventa entre particulares. Las agencias catalanas valoran contratos en castellano y catalán cuando la operación lo requiere.',
    zonas: ['Eixample', 'Sants', 'Gràcia', 'Sant Martí', 'L\'Hospitalet', 'Badalona'],
    operativaTipica: '4–8 operaciones al mes (alquiler + venta)',
    confianzaIds: ['inmosants', 'interhouse', 'fincas-jardin'],
    casos: [CASO_BCN_SANTS, CASO_BCN_INTERHOUSE],
    faqExtra: [
      {
        q: '¿Podéis redactar contratos adaptados a Catalunya?',
        a: 'Sí. Nuestros gestores conocen la normativa autonómica catalana y adaptan cláusulas de alquiler LAU, arras y compraventa a la operación concreta en Barcelona y área metropolitana.',
      },
      {
        q: '¿Trabajáis con APIs colegiados en Barcelona?',
        a: 'Sí. Interhouse BCN y otros agentes de la propiedad usan nuestro servicio para contratos LAU con entrega en 4–5 h y firma electrónica certificada FIRMACERT (eIDAS).',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Barcelona — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'Contratos para agencias, APIs y autónomos inmobiliarios en Barcelona y área metropolitana. Arras, alquiler LAU y compraventa desde 110 €. Inmo Sants e Interhouse operan con nosotros.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Barcelona',
      'contratos inmobiliarios agencia Barcelona',
      'gestoría agencias inmobiliarias Barcelona',
      'contrato alquiler LAU agencia Barcelona',
      'API Barcelona contratos inmobiliarios',
    ],
  },
  {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    heroImage: '/gestoria5.jpg',
    heroImageAlt: 'Gestoría inmobiliaria para agencias en Valencia',
    metaTitle: 'Gestoría inmobiliaria para agencias en Valencia — 110€ · 4–5 h',
    metaDescription:
      'Packs y contratos sueltos para agencias y autónomos inmobiliarios en Valencia. Arras, alquiler LAU y temporada desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    keywords: [
      'gestoría inmobiliaria agencias Valencia',
      'contrato alquiler LAU agencia Valencia',
      'gestoría B2B Valencia inmobiliaria',
      'contratos arras Valencia agencia',
      'agente autónomo inmobiliario Valencia',
      'pack contratos agencia Valencia',
      'contrato alquiler temporada Valencia agencia',
      'infoPISOS gestoría Valencia',
    ],
    heroLead:
      'Gestoría B2B para agencias y autónomos en Valencia, Ruzafa, Ciutat Vella y área metropolitana. Sin pack anual obligatorio: prueba con un contrato suelto a 110 €.',
    mercadoLocal:
      'Valencia tiene un mercado dinámico de alquiler LAU, alquiler por temporada y compraventa entre particulares. Las agencias valencianas necesitan contratos ágiles para cerrar operaciones el mismo día.',
    zonas: ['Ciutat Vella', 'Ruzafa', 'Campanar', 'Benimaclet', 'Mislata', 'Torrent'],
    operativaTipica: '3–7 operaciones al mes (alquiler + arras)',
    confianzaIds: ['nueva-habitat', 'infopisos'],
    casos: [CASO_VALENCIA, CASO_VALENCIA_AUTONOMO],
    faqExtra: [
      {
        q: '¿Hacéis contratos de alquiler por temporada en Valencia?',
        a: 'Sí. Incluimos alquiler LAU, alquiler por temporada y alquiler de habitación. Cada contrato se adapta a la causa de temporalidad y a la normativa aplicable en la Comunitat Valenciana.',
      },
      {
        q: '¿Puedo empezar sin pack anual en Valencia?',
        a: 'Sí. Muchos autónomos valencianos empiezan con contratos sueltos a 110 € (tarifa agencia) y activan el pack cuando confirman su volumen mensual.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Valencia — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'Contratos para agencias y autónomos inmobiliarios en Valencia. Arras, alquiler LAU y temporada desde 110 €. Packs anuales o contrato suelto. Entrega 4–5 h.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Valencia',
      'contratos inmobiliarios agencia Valencia',
      'gestoría agencias inmobiliarias Valencia',
      'contrato alquiler LAU agencia Valencia',
      'pack contratos agencia Valencia',
    ],
  },
]

export function getAgenciaGestoriaCiudad(slug: string): AgenciaGestoriaCiudadConfig | undefined {
  return AGENCIAS_GESTORIA_CIUDADES.find((c) => c.slug === slug)
}

export function isAgenciaGestoriaCiudadSlug(slug: string): slug is AgenciaGestoriaCiudadSlug {
  return AGENCIAS_GESTORIA_CIUDADES.some((c) => c.slug === slug)
}

export function gestoriaAgenciasCiudadPath(slug: AgenciaGestoriaCiudadSlug): string {
  return `/gestoria/${slug}/agencias`
}

export function gestoriaAgenciasCiudadUrl(slug: AgenciaGestoriaCiudadSlug): string {
  return `https://inmonest.com${gestoriaAgenciasCiudadPath(slug)}`
}
