/** Landings B2B gestoría para agencias por ciudad */

import type { AgenciaCasoExito } from '@/lib/agencias-gestoria-trust'
import { getCiudadImage } from '@/lib/gestoria-images'

export type AgenciaGestoriaCiudadSlug =
  | 'madrid'
  | 'barcelona'
  | 'valencia'
  | 'sevilla'
  | 'malaga'
  | 'bilbao'
  | 'zaragoza'
  | 'alicante'
  | 'palma'

export type ContratoDestacadoCiudad = {
  nombre: string
  desc: string
  pct: string
}

export type AgenciaGestoriaCiudadConfig = {
  slug: AgenciaGestoriaCiudadSlug
  nombre: string
  region: string
  heroImage: string
  heroImageAlt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  /** H1 único por ciudad — evita plantillas duplicadas */
  heroH1: { prefix: string; highlight: string; suffix?: string }
  heroLead: string
  heroTags: string[]
  mercadoLocalTitle: string
  mercadoLocal: string
  desafioLocal: string
  perfilAgencia: string
  zonas: string[]
  operativaTipica: string
  contratosDestacados: ContratoDestacadoCiudad[]
  confianzaIds?: string[]
  casos: AgenciaCasoExito[]
  casosTitulo: string
  casosSubtitulo: string
  packsTitulo: string
  packsSubtitulo: string
  contratosSectionTitulo: string
  contratosSectionDesc: string
  contactoPlaceholder: string
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

const CASO_SEVILLA_TRIANA: AgenciaCasoExito = {
  id: 'sevilla-triana',
  agencia: 'Inmobiliaria Triana Centro',
  ciudad: 'Sevilla',
  tipo: 'Agencia',
  volumen: '5–7 contratos/mes',
  pack: 'Pack Agencia',
  cifra: '4–5 h',
  cifraLabel: 'entrega media en arras y LAU',
  quote:
    'En Triana y Nervión cerramos arras el mismo día de la visita. Antes esperábamos al abogado de turno; ahora subimos datos al panel y tenemos PDF con FirmaCert antes de cenar.',
  persona: 'Gerente de agencia',
  rol: 'Triana · Nervión',
}

const CASO_MALAGA_COSTA: AgenciaCasoExito = {
  id: 'malaga-costa',
  agencia: 'Costa Inmobiliaria Málaga',
  ciudad: 'Málaga',
  tipo: 'Agencia',
  volumen: '6–9 contratos/mes',
  pack: 'Pack Agencia Plus',
  cifra: '65 %',
  cifraLabel: 'de contratos son temporada o LAU corta',
  quote:
    'En la Costa del Sol mezclamos propietarios residentes y no residentes. Necesitábamos contratos de temporada con causa bien redactada — no plantillas de interior.',
  persona: 'Directora de operaciones',
  rol: 'Málaga capital · Torremolinos',
}

const CASO_BILBAO_GETXO: AgenciaCasoExito = {
  id: 'bilbao-getxo',
  agencia: 'Assessoria Getxo · Bilbao',
  ciudad: 'Bilbao',
  tipo: 'API',
  volumen: '3–5 contratos/mes',
  pack: 'Pack Agente',
  cifra: '110 €',
  cifraLabel: 'por LAU vs 145 € retail',
  quote:
    'Como API en Bizkaia priorizo LAU impecables para inquilinos corporativos. El panel B2B me evita reescribir cláusulas de fianza en cada operación de Abando o Getxo.',
  persona: 'Agente de la Propiedad Inmobiliaria',
  rol: 'Margen izquierda · Bilbao',
}

const CASO_ZARAGOZA_EIXO: AgenciaCasoExito = {
  id: 'zaragoza-eixo',
  agencia: 'Inmobiliaria Ebro · Zaragoza',
  ciudad: 'Zaragoza',
  tipo: 'Franquicia',
  volumen: '4–6 contratos/mes',
  pack: 'Pack Agencia',
  cifra: '14 h',
  cifraLabel: 'ahorradas al mes vs redacción interna',
  quote:
    'En Zaragoza movemos arras en compraventa entre particulares y alquiler LAU en Actur. Externalizar la redacción nos permite dedicar más tiempo a captación.',
  persona: 'Responsable comercial',
  rol: 'Actur · Centro',
}

const CASO_ALICANTE_COSTA: AgenciaCasoExito = {
  id: 'alicante-costa',
  agencia: 'Inmobiliaria Costa Blanca · Alicante',
  ciudad: 'Alicante',
  tipo: 'Agencia',
  volumen: '7–10 contratos/mes',
  pack: 'Pack Agencia Plus',
  cifra: '3 tipos',
  cifraLabel: 'LAU, temporada y arras en un solo panel',
  quote:
    'Entre Alicante, San Juan y Elche alternamos alquiler anual para residentes y temporada para teletrabajadores. Un solo gestor conoce nuestra operativa en la Costa Blanca.',
  persona: 'Socio director',
  rol: 'Alicante · San Juan',
}

const CASO_PALMA_TEMPORADA: AgenciaCasoExito = {
  id: 'palma-temporada',
  agencia: 'Mediterráneo Homes · Palma',
  ciudad: 'Palma',
  tipo: 'Agencia',
  volumen: '5–8 contratos/mes',
  cifra: '110 €',
  cifraLabel: 'contrato suelto hasta activar pack',
  quote:
    'En Palma y Calvià la temporada y el LAU conviven en la misma cartera. Empezamos con contratos sueltos en temporada alta y hoy tenemos pack anual con cola prioritaria.',
  persona: 'Gerente de alquileres',
  rol: 'Palma · Calvià',
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
    heroH1: {
      prefix: 'Contratos B2B para agencias en el mercado con más volumen de',
      highlight: 'Madrid',
      suffix: ' y área metropolitana',
    },
    heroLead:
      'Packs anuales y contratos sueltos para agencias, franquicias y autónomos que operan en Madrid y área metropolitana. Mismo panel, entrega en 4–5 h.',
    heroTags: [
      'Franquicias y multi-oficina',
      'LAU con zonas tensionadas',
      'Arras penitenciales express',
      '110 € tarifa agencia',
    ],
    mercadoLocalTitle: 'Por qué las agencias madrileñas externalizan la redacción',
    mercadoLocal:
      'Madrid concentra el mayor volumen de compraventa y alquiler LAU de España. Las agencias madrileñas necesitan contratos rápidos en arras penitenciales, arras confirmatorias y alquiler de vivienda con cláusulas adaptadas al mercado local.',
    desafioLocal:
      'En capital y corredor del Henares es habitual cerrar arras el mismo día que la visita. Si el contrato tarda 48 h, la operación se enfría o el comprador busca otra agencia.',
    perfilAgencia:
      'Franquicias con 8–12 contratos/mes, agencias de barrio en Chamberí o Salamanca y autónomos colaboradores API que reparten operaciones entre venta y alquiler LAU.',
    zonas: ['Salamanca', 'Chamberí', 'Las Rozas', 'Getafe', 'Móstoles', 'Alcobendas'],
    operativaTipica: '3–6 operaciones al mes entre venta y alquiler',
    contratosDestacados: [
      {
        nombre: 'Arras penitenciales',
        desc: 'Compraventa entre particulares con señal y penalización por desistimiento. Cláusulas adaptadas a operaciones en Madrid capital.',
        pct: '~45 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos con fianza, actualización de renta y referencia a zonas tensionadas cuando la vivienda lo exige.',
        pct: '~38 % del volumen B2B',
      },
      {
        nombre: 'Compraventa entre particulares',
        desc: 'Documento completo cuando la agencia media sin pack de arras previo.',
        pct: '~12 % del volumen B2B',
      },
    ],
    confianzaIds: ['tecnocasa', 'nueva-habitat', 'infopisos'],
    casos: [CASO_MADRID_TECNOCASA],
    casosTitulo: 'Franquicias y agencias de barrio en Madrid',
    casosSubtitulo:
      'Tecnocasa Las Rozas y otras oficinas del corredor norte ya operan con packs de volumen y contratos sueltos a tarifa B2B.',
    packsTitulo: 'Tarifas B2B para agencias en Madrid',
    packsSubtitulo:
      'El Pack Agencia Plus encaja con oficinas que mueven 8+ contratos al mes entre Las Rozas, Alcobendas y capital.',
    contratosSectionTitulo: 'Un crédito = un contrato adaptado al mercado madrileño',
    contratosSectionDesc:
      'Redactamos con referencia a la Ley de Vivienda 2026, cláusulas de arras habituales en Madrid y operativa de franquicias que exigen entrega en la misma jornada.',
    contactoPlaceholder: 'Ej: 6 arras y 4 alquileres LAU al mes en Las Rozas y Chamberí…',
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
    heroH1: {
      prefix: 'LAU, arras y habitación para agencias en',
      highlight: 'Barcelona',
      suffix: ' y área metropolitana',
    },
    heroLead:
      'Contratos profesionales para agencias y APIs en Barcelona, Sants, Eixample y área metropolitana. Pack anual o contrato suelto a tarifa B2B.',
    heroTags: [
      'APIs colegiados',
      'Alquiler de habitación',
      'Normativa catalana',
      'Entrega 4–5 h',
    ],
    mercadoLocalTitle: 'Operativa inmobiliaria B2B en el área metropolitana de Barcelona',
    mercadoLocal:
      'Barcelona combina alquiler residencial LAU, alquiler de habitación en pisos compartidos y compraventa entre particulares. Las agencias catalanas valoran contratos en castellano y catalán cuando la operación lo requiere.',
    desafioLocal:
      'En Eixample y Sants es frecuente alquilar habitación en pisos de 80–100 m² con varios inquilinos. Un LAU genérico genera conflictos de convivencia y reclamaciones meses después.',
    perfilAgencia:
      'Agencias de barrio en Sants o Gràcia, APIs colegiados que facturan por operación y franquicias en L\'Hospitalet con mix alquiler + venta.',
    zonas: ['Eixample', 'Sants', 'Gràcia', 'Sant Martí', 'L\'Hospitalet', 'Badalona'],
    operativaTipica: '4–8 operaciones al mes (alquiler + venta)',
    contratosDestacados: [
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos con cláusulas adaptadas a Catalunya: fianza, IPC, subrogación y referencias al Decret llei 1/2022 cuando aplica.',
        pct: '~42 % del volumen B2B',
      },
      {
        nombre: 'Alquiler de habitación',
        desc: 'Normas de convivencia, uso de zonas comunes y reparto de gastos en pisos compartidos — muy habitual en Sants y Poblenou.',
        pct: '~28 % del volumen B2B',
      },
      {
        nombre: 'Arras confirmatorias',
        desc: 'Compraventa con obligación de cumplimiento en operaciones entre particulares en área metropolitana.',
        pct: '~22 % del volumen B2B',
      },
    ],
    confianzaIds: ['inmosants', 'interhouse', 'fincas-jardin'],
    casos: [CASO_BCN_SANTS, CASO_BCN_INTERHOUSE],
    casosTitulo: 'Inmo Sants, Interhouse y agencias del Eixample',
    casosSubtitulo:
      'APIs colegiados y agencias de barrio que priorizan LAU impecable y contratos de habitación sin plantillas genéricas.',
    packsTitulo: 'Packs anuales para agencias barcelonesas',
    packsSubtitulo:
      'Desde contrato suelto a 110 € hasta Pack Agencia Plus para oficinas con cola prioritaria en Sants, Eixample y Badalona.',
    contratosSectionTitulo: 'Contratos pensados para la operativa catalana',
    contratosSectionDesc:
      'Cada crédito cubre redacción completa con PDF firmable y FirmaCert. Adaptamos cláusulas a la normativa autonómica y al tipo de inmueble — piso entero o habitación.',
    contactoPlaceholder: 'Ej: 5 LAU y 3 habitaciones al mes en Sants, operaciones también en castellano…',
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
    heroH1: {
      prefix: 'Alquiler LAU y temporada para agencias en',
      highlight: 'Valencia',
      suffix: ' — sin pack anual obligatorio',
    },
    heroLead:
      'Gestoría B2B para agencias y autónomos en Valencia, Ruzafa, Ciutat Vella y área metropolitana. Sin pack anual obligatorio: prueba con un contrato suelto a 110 €.',
    heroTags: [
      'Contrato suelto 110 €',
      'Alquiler por temporada',
      'Autónomos sin pack',
      'FirmaCert incluida',
    ],
    mercadoLocalTitle: 'Mercado valenciano: alquiler LAU, temporada y arras rápidas',
    mercadoLocal:
      'Valencia tiene un mercado dinámico de alquiler LAU, alquiler por temporada y compraventa entre particulares. Las agencias valencianas necesitan contratos ágiles para cerrar operaciones el mismo día.',
    desafioLocal:
      'En Ruzafa y Ciutat Vella muchos propietarios alternan alquiler LAU con estancias de temporada. Mezclar causas de temporalidad en un mismo contrato invalida cláusulas si no se redacta bien.',
    perfilAgencia:
      'Agencias de barrio en Ruzafa, autónomos colaboradores API con 2–3 operaciones/mes y oficinas en Campanar que combinan venta entre particulares y alquiler.',
    zonas: ['Ciutat Vella', 'Ruzafa', 'Campanar', 'Benimaclet', 'Mislata', 'Torrent'],
    operativaTipica: '3–7 operaciones al mes (alquiler + arras)',
    contratosDestacados: [
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos para vivienda habitual en Valencia capital y área metropolitana con cláusulas de la Comunitat Valenciana.',
        pct: '~40 % del volumen B2B',
      },
      {
        nombre: 'Alquiler por temporada',
        desc: 'Estancias por estudios, reformas o trabajo temporal — causa de temporalidad bien fundada para evitar prórrogas LAU.',
        pct: '~32 % del volumen B2B',
      },
      {
        nombre: 'Arras penitenciales',
        desc: 'Señal en compraventa entre particulares, habitual en operaciones de piso en Ruzafa y Benimaclet.',
        pct: '~20 % del volumen B2B',
      },
    ],
    confianzaIds: ['nueva-habitat', 'infopisos'],
    casos: [CASO_VALENCIA, CASO_VALENCIA_AUTONOMO],
    casosTitulo: 'Agencias de Ruzafa y autónomos valencianos',
    casosSubtitulo:
      'Operativa real en Ciutat Vella y área metropolitana: LAU, temporada y contratos sueltos sin compromiso anual.',
    packsTitulo: 'Empieza con un contrato suelto en Valencia',
    packsSubtitulo:
      'Muchos autónomos valencianos prueban con 110 €/contrato y activan pack cuando confirman 4+ operaciones mensuales.',
    contratosSectionTitulo: 'LAU, temporada y arras para la Comunitat Valenciana',
    contratosSectionDesc:
      'Distinguimos causa de temporalidad, alquiler de habitación en pisos compartidos y arras en compraventa entre particulares — sin reutilizar la misma plantilla de Madrid o Barcelona.',
    contactoPlaceholder: 'Ej: 3 LAU, 2 temporadas y 1 arras al mes en Ruzafa y Mislata…',
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
  {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    heroImage: getCiudadImage('sevilla').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Sevilla',
    metaTitle: 'Contratos para agencias inmobiliarias en Sevilla — 110€ · 4–5 h',
    metaDescription:
      'Arras y alquiler LAU B2B para agencias en Sevilla, Triana y Nervión. Contratos sueltos a 110 € o pack anual. Entrega 4–5 h. FirmaCert incluida.',
    keywords: [
      'contratos agencias inmobiliarias Sevilla',
      'gestoría B2B Sevilla arras',
      'contrato alquiler LAU agencia Sevilla',
      'arras penitenciales agencia Triana',
      'pack contratos agencia Andalucía',
      'autónomo inmobiliario Sevilla contratos',
    ],
    heroH1: {
      prefix: 'Arras y alquiler LAU para agencias en',
      highlight: 'Sevilla',
      suffix: ' — entrega el mismo día de la visita',
    },
    heroLead:
      'Gestoría B2B para agencias en Sevilla capital, Triana, Nervión y área metropolitana. Especialistas en arras entre particulares y LAU con normativa andaluza.',
    heroTags: [
      'Arras penitenciales express',
      'LAU Andalucía',
      'Triana · Nervión · Los Remedios',
      '110 € tarifa agencia',
    ],
    mercadoLocalTitle: 'Sevilla: compraventa entre particulares y alquiler LAU',
    mercadoLocal:
      'Sevilla mantiene un mercado muy activo de compraventa entre particulares mediada por agencias de barrio. En Triana, Nervión y Los Remedios es habitual formalizar arras en la misma semana de la visita, mientras el alquiler LAU crece en zonas bien comunicadas con metro.',
    desafioLocal:
      'Muchas agencias sevillanas pierden operaciones porque el abogado externo tarda 2–3 días en devolver el borrador de arras. El comprador visita otro piso y la señal nunca se firma.',
    perfilAgencia:
      'Agencias familiares en Triana con 5–7 operaciones/mes, autónomos en Nervión que combinan venta y alquiler, y franquicias en Sevilla Este con foco en arras penitenciales.',
    zonas: ['Triana', 'Nervión', 'Los Remedios', 'Sevilla Este', 'Macarena', 'Dos Hermanas'],
    operativaTipica: '4–7 operaciones al mes (arras + alquiler LAU)',
    contratosDestacados: [
      {
        nombre: 'Arras penitenciales',
        desc: 'Señal en compraventa entre particulares — operación estrella en Triana, Nervión y Los Remedios.',
        pct: '~48 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos para vivienda habitual con referencia a normativa andaluza y cláusulas de fianza habituales en Sevilla.',
        pct: '~35 % del volumen B2B',
      },
      {
        nombre: 'Compraventa entre particulares',
        desc: 'Documento completo cuando la agencia cierra venta sin arras previas.',
        pct: '~10 % del volumen B2B',
      },
    ],
    confianzaIds: ['nueva-habitat', 'infopisos'],
    casos: [CASO_SEVILLA_TRIANA],
    casosTitulo: 'Agencias de Triana que cierran arras el mismo día',
    casosSubtitulo:
      'Operativa real en barrios sevillanos donde la velocidad del contrato decide si la operación sigue adelante.',
    packsTitulo: 'Packs B2B para agencias sevillanas',
    packsSubtitulo:
      'Desde contrato suelto en arras hasta Pack Agencia para oficinas con 5+ operaciones mensuales en capital y área metropolitana.',
    contratosSectionTitulo: 'Arras andaluzas y LAU sin plantillas de otras comunidades',
    contratosSectionDesc:
      'Redactamos pensando en la operativa sevillana: arras rápidas entre particulares, LAU en zonas de alta demanda de alquiler y cláusulas adaptadas a Andalucía.',
    contactoPlaceholder: 'Ej: 4 arras y 3 LAU al mes en Triana y Nervión…',
    faqExtra: [
      {
        q: '¿Conocéis la normativa de alquiler en Andalucía?',
        a: 'Sí. Adaptamos contratos LAU a la Ley de Vivienda 2026 y a la operativa habitual en Sevilla capital y provincia, incluyendo fianza, actualización de renta y garantías adicionales cuando el propietario las exige.',
      },
      {
        q: '¿Podéis entregar arras penitenciales el mismo día en Sevilla?',
        a: 'Sí. Con el panel B2B y la documentación completa, la entrega media es 4–5 horas. Agencias en Triana y Nervión usan este SLA para no perder operaciones.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Sevilla — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'Arras penitenciales y alquiler LAU para agencias en Sevilla, Triana y Nervión. Packs anuales o contrato suelto a 110 €. Entrega 4–5 h. FirmaCert incluida.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Sevilla',
      'arras agencia inmobiliaria Sevilla',
      'contrato alquiler LAU agencia Sevilla',
      'gestoría agencias Triana',
      'pack contratos agencia Andalucía',
    ],
  },
  {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía · Costa del Sol',
    heroImage: getCiudadImage('malaga').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Málaga y Costa del Sol',
    metaTitle: 'Contratos para agencias inmobiliarias en Málaga — 110€ · 4–5 h',
    metaDescription:
      'Contratos B2B para agencias en Málaga, Torremolinos y Costa del Sol. LAU, temporada y arras desde 110 €. Propietarios residentes y no residentes. Entrega 4–5 h.',
    keywords: [
      'contratos agencias inmobiliarias Málaga',
      'gestoría B2B Costa del Sol',
      'contrato alquiler temporada agencia Málaga',
      'LAU agencia Torremolinos',
      'contratos arras Málaga agencia',
      'pack contratos agencia Costa del Sol',
    ],
    heroH1: {
      prefix: 'LAU y temporada para agencias en',
      highlight: 'Málaga',
      suffix: ' y la Costa del Sol',
    },
    heroLead:
      'Contratos B2B para agencias que operan con propietarios residentes y no residentes en Málaga capital, Torremolinos, Fuengirola y Costa del Sol.',
    heroTags: [
      'Alquiler por temporada',
      'Propietarios no residentes',
      'LAU vivienda habitual',
      'Costa del Sol',
    ],
    mercadoLocalTitle: 'Costa del Sol: residentes, teletrabajadores y segunda residencia',
    mercadoLocal:
      'Málaga y la Costa del Sol combinan alquiler LAU para residentes, contratos de temporada para teletrabajadores y operaciones con propietarios no residentes. Las agencias malagueñas necesitan distinguir bien cada causa de arrendamiento.',
    desafioLocal:
      'Confundir alquiler LAU con temporada en operaciones de 6–11 meses es uno de los errores más frecuentes en Torremolinos y Fuengirola — y genera reclamaciones costosas.',
    perfilAgencia:
      'Agencias en Málaga capital con cartera mixta, oficinas en Torremolinos orientadas a temporada y autónomos que gestionan segundas residencias de propietarios europeos.',
    zonas: ['Centro Málaga', 'Teatinos', 'Torremolinos', 'Fuengirola', 'Marbella', 'Estepona'],
    operativaTipica: '5–9 operaciones al mes (temporada + LAU + arras)',
    contratosDestacados: [
      {
        nombre: 'Alquiler por temporada',
        desc: 'Causa de temporalidad bien fundada para estancias de trabajo, reforma o estudios — clave en Costa del Sol.',
        pct: '~38 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Vivienda habitual para residentes en Málaga capital, Teatinos y zonas consolidadas.',
        pct: '~35 % del volumen B2B',
      },
      {
        nombre: 'Arras penitenciales',
        desc: 'Compraventa entre particulares con propietarios residentes y no residentes.',
        pct: '~18 % del volumen B2B',
      },
    ],
    casos: [CASO_MALAGA_COSTA],
    casosTitulo: 'Agencias de la Costa del Sol con cartera mixta',
    casosSubtitulo:
      'Temporada, LAU y arras en un solo panel — sin mezclar causas de arrendamiento entre operaciones.',
    packsTitulo: 'Tarifas B2B para agencias malagueñas',
    packsSubtitulo:
      'Pack Agencia Plus recomendado para oficinas con 6+ contratos/mes entre Málaga capital y primera línea de costa.',
    contratosSectionTitulo: 'Temporada y LAU diferenciados para la Costa del Sol',
    contratosSectionDesc:
      'No reutilizamos plantillas de interior: cada contrato refleja si el inquilino es residente, teletrabajador temporal o comprador entre particulares con domicilio fiscal fuera de España.',
    contactoPlaceholder: 'Ej: 4 temporadas y 3 LAU al mes en Torremolinos y Málaga capital…',
    faqExtra: [
      {
        q: '¿Redactáis contratos para propietarios no residentes en Málaga?',
        a: 'Sí. Adaptamos cláusulas de fianza, comunicación y representación cuando el propietario tiene domicilio fiscal fuera de España — operativa habitual en la Costa del Sol.',
      },
      {
        q: '¿Cuál es la diferencia entre LAU y temporada en operaciones malagueñas?',
        a: 'La causa de temporalidad debe estar bien fundada. Redactamos contratos de temporada para estancias cortas con causa real (trabajo, estudios, reforma) y LAU para vivienda habitual — sin mezclar figuras.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Málaga — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'LAU, temporada y arras B2B para agencias en Málaga y Costa del Sol. Propietarios residentes y no residentes. Desde 110 €. Entrega 4–5 h.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Málaga',
      'contrato temporada agencia Costa del Sol',
      'LAU agencia inmobiliaria Málaga',
      'gestoría B2B Torremolinos',
      'pack contratos agencia Málaga',
    ],
  },
  {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    heroImage: getCiudadImage('bilbao').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Bilbao',
    metaTitle: 'Contratos para agencias inmobiliarias en Bilbao — 110€ · 4–5 h',
    metaDescription:
      'LAU y arras B2B para agencias y APIs en Bilbao, Getxo y margen izquierda. Contratos desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    keywords: [
      'contratos agencias inmobiliarias Bilbao',
      'gestoría B2B Bizkaia',
      'contrato alquiler LAU agencia Bilbao',
      'API Bilbao contratos inmobiliarios',
      'arras agencia Getxo',
      'pack contratos agencia País Vasco',
    ],
    heroH1: {
      prefix: 'LAU y arras para agencias y APIs en',
      highlight: 'Bilbao',
      suffix: ' y margen izquierda',
    },
    heroLead:
      'Contratos B2B para agencias y agentes de la propiedad en Bilbao, Getxo, Leioa y área metropolitana. LAU para inquilinos corporativos y arras en compraventa entre particulares.',
    heroTags: [
      'APIs colegiados Bizkaia',
      'LAU inquilinos corporativos',
      'Abando · Getxo · Leioa',
      'FirmaCert eIDAS',
    ],
    mercadoLocalTitle: 'Bilbao y margen izquierda: LAU corporativo y compraventa local',
    mercadoLocal:
      'El mercado bilbaíno combina alquiler LAU en Abando y Indautxu — con demanda de inquilinos corporativos — y compraventa entre particulares en Getxo y Leioa. Las agencias vascas valoran contratos precisos en cláusulas de fianza y actualización.',
    desafioLocal:
      'Los inquilinos corporativos en Bilbao exigen contratos LAU con cláusulas de subrogación, garantías adicionales y plazos estrictos. Una plantilla genérica retrasa la entrada del inquilino.',
    perfilAgencia:
      'APIs en Getxo con 3–5 LAU/mes, agencias en Abando orientadas a alquiler corporativo y oficinas en margen derecha con mix venta + alquiler.',
    zonas: ['Abando', 'Indautxu', 'Getxo', 'Leioa', 'Barakaldo', 'Santurtzi'],
    operativaTipica: '3–6 operaciones al mes (LAU + arras)',
    contratosDestacados: [
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos para vivienda habitual con cláusulas de fianza y actualización adaptadas a operaciones en Bizkaia.',
        pct: '~50 % del volumen B2B',
      },
      {
        nombre: 'Arras confirmatorias',
        desc: 'Compraventa entre particulares en Getxo, Leioa y municipios de la margen izquierda.',
        pct: '~30 % del volumen B2B',
      },
      {
        nombre: 'Alquiler de habitación',
        desc: 'Pisos compartidos cerca de universidades y zonas de oficinas en Bilbao capital.',
        pct: '~12 % del volumen B2B',
      },
    ],
    casos: [CASO_BILBAO_GETXO],
    casosTitulo: 'APIs y agencias en Bizkaia',
    casosSubtitulo:
      'LAU para inquilinos corporativos y arras en compraventa local — operativa en Getxo y Bilbao capital.',
    packsTitulo: 'Packs B2B para agencias bilbaínas',
    packsSubtitulo:
      'Pack Agente (12 contratos/año) encaja con APIs de bajo volumen; Pack Agencia para oficinas con 4+ LAU mensuales.',
    contratosSectionTitulo: 'LAU y arras adaptados a la operativa vasca',
    contratosSectionDesc:
      'Cláusulas de fianza, garantías adicionales y arras en compraventa pensadas para el mercado de Bilbao y área metropolitana — no copiadas de Madrid o Barcelona.',
    contactoPlaceholder: 'Ej: 3 LAU corporativos y 2 arras al mes en Getxo y Abando…',
    faqExtra: [
      {
        q: '¿Trabajáis con APIs colegiados en Bizkaia?',
        a: 'Sí. Agentes de la propiedad en Getxo y Bilbao usan contratos sueltos a 110 € o Pack Agente con entrega en 4–5 h y FirmaCert eIDAS incluida.',
      },
      {
        q: '¿Adaptáis LAU para inquilinos corporativos en Bilbao?',
        a: 'Sí. Incluimos cláusulas de subrogación, garantías adicionales y plazos de entrada cuando la operación lo requiere — habitual en Abando e Indautxu.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Bilbao — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'LAU y arras B2B para agencias y APIs en Bilbao, Getxo y margen izquierda. Desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Bilbao',
      'LAU agencia inmobiliaria Bilbao',
      'API Bizkaia contratos inmobiliarios',
      'gestoría B2B Getxo',
      'pack contratos agencia País Vasco',
    ],
  },
  {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    heroImage: getCiudadImage('zaragoza').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Zaragoza',
    metaTitle: 'Contratos para agencias inmobiliarias en Zaragoza — 110€ · 4–5 h',
    metaDescription:
      'Arras y alquiler LAU B2B para agencias en Zaragoza, Actur y Delicias. Packs anuales o contrato suelto a 110 €. Entrega 4–5 h.',
    keywords: [
      'contratos agencias inmobiliarias Zaragoza',
      'gestoría B2B Zaragoza arras',
      'contrato alquiler LAU agencia Zaragoza',
      'pack contratos agencia Aragón',
      'arras penitenciales agencia Actur',
      'autónomo inmobiliario Zaragoza',
    ],
    heroH1: {
      prefix: 'Arras y LAU para agencias en',
      highlight: 'Zaragoza',
      suffix: ' — Actur, Delicias y centro',
    },
    heroLead:
      'Gestoría B2B para agencias y franquicias en Zaragoza capital. Arras en compraventa entre particulares y alquiler LAU con entrega en 4–5 h.',
    heroTags: [
      'Actur · Delicias · Centro',
      'Arras entre particulares',
      'Franquicias y agencias locales',
      '110 € sin pack anual',
    ],
    mercadoLocalTitle: 'Zaragoza: arras en venta y LAU en barrios en expansión',
    mercadoLocal:
      'Zaragoza combina compraventa entre particulares mediada por agencias en Actur y Delicias con alquiler LAU en barrios bien conectados. El mercado aragonés tiene volumen estable y agencias que buscan externalizar redacción para dedicar más tiempo a captación.',
    desafioLocal:
      'Las agencias zaragozanas suelen tener equipos comerciales pequeños. Redactar contratos internamente consume horas que deberían dedicarse a visitas y captación en Actur o el centro.',
    perfilAgencia:
      'Franquicias en Actur con 4–6 contratos/mes, agencias familiares en Delicias y autónomos que operan en Zaragoza capital y área metropolitana.',
    zonas: ['Actur', 'Delicias', 'Centro', 'Las Fuentes', 'Torre del Mar', 'Utebo'],
    operativaTipica: '3–6 operaciones al mes (arras + LAU)',
    contratosDestacados: [
      {
        nombre: 'Arras penitenciales',
        desc: 'Compraventa entre particulares — operación más habitual en Actur y barrios de expansión.',
        pct: '~44 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Contratos para vivienda habitual en Zaragoza capital con cláusulas adaptadas a Aragón.',
        pct: '~40 % del volumen B2B',
      },
      {
        nombre: 'Compraventa entre particulares',
        desc: 'Documento completo cuando la venta se cierra sin arras previas.',
        pct: '~11 % del volumen B2B',
      },
    ],
    confianzaIds: ['infopisos'],
    casos: [CASO_ZARAGOZA_EIXO],
    casosTitulo: 'Franquicias y agencias en Actur',
    casosSubtitulo:
      'Externalizar redacción para dedicar más horas a captación en Zaragoza capital y área metropolitana.',
    packsTitulo: 'Packs para agencias zaragozanas',
    packsSubtitulo:
      'Pack Agencia (36 contratos/año) encaja con oficinas de 4–6 operaciones mensuales en Actur y Delicias.',
    contratosSectionTitulo: 'Arras y LAU para el mercado aragonés',
    contratosSectionDesc:
      'Contratos redactados para la operativa zaragozana — arras en venta entre particulares y LAU en barrios de alta demanda de alquiler.',
    contactoPlaceholder: 'Ej: 3 arras y 2 LAU al mes en Actur y centro de Zaragoza…',
    faqExtra: [
      {
        q: '¿Trabajáis con franquicias inmobiliarias en Zaragoza?',
        a: 'Sí. Oficinas de franquicia en Actur y Delicias usan packs de volumen con entrega prioritaria en 4–5 horas y FirmaCert incluida en cada contrato.',
      },
      {
        q: '¿Puedo probar con un contrato suelto antes del pack anual?',
        a: 'Sí. Contrato suelto a 110 € (tarifa agencia) sin compromiso. Muchas agencias zaragozanas activan pack cuando confirman 3–4 operaciones mensuales.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Zaragoza — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'Arras y alquiler LAU B2B para agencias en Zaragoza, Actur y Delicias. Packs anuales o contrato suelto a 110 €. Entrega 4–5 h.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Zaragoza',
      'arras agencia inmobiliaria Zaragoza',
      'LAU agencia Actur',
      'gestoría B2B Aragón',
      'pack contratos agencia Zaragoza',
    ],
  },
  {
    slug: 'alicante',
    nombre: 'Alicante',
    region: 'Comunitat Valenciana · Costa Blanca',
    heroImage: getCiudadImage('alicante').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Alicante y Costa Blanca',
    metaTitle: 'Contratos para agencias inmobiliarias en Alicante — 110€ · 4–5 h',
    metaDescription:
      'LAU, temporada y arras B2B para agencias en Alicante, San Juan y Costa Blanca. Residentes y teletrabajadores. Desde 110 €. Entrega 4–5 h.',
    keywords: [
      'contratos agencias inmobiliarias Alicante',
      'gestoría B2B Costa Blanca',
      'contrato alquiler temporada agencia Alicante',
      'LAU agencia San Juan',
      'arras agencia Costa Blanca',
      'pack contratos agencia Alicante',
    ],
    heroH1: {
      prefix: 'LAU, temporada y arras para agencias en',
      highlight: 'Alicante',
      suffix: ' y Costa Blanca',
    },
    heroLead:
      'Contratos B2B para agencias en Alicante, San Juan, Elche y Costa Blanca. LAU para residentes, temporada para teletrabajadores y arras en compraventa local.',
    heroTags: [
      'Costa Blanca',
      'LAU + temporada',
      'San Juan · Elche',
      'Residentes y nómadas',
    ],
    mercadoLocalTitle: 'Alicante y Costa Blanca: residentes, turismo y teletrabajo',
    mercadoLocal:
      'Alicante y la Costa Blanca mezclan alquiler LAU para residentes en San Juan y Playa de San Juan, contratos de temporada para teletrabajadores y arras en compraventa entre particulares en Elche y área metropolitana.',
    desafioLocal:
      'En verano muchas agencias alicantinas duplican operaciones de temporada. Sin un panel B2B con cola prioritaria, los plazos de entrega se alargan y se pierden reservas.',
    perfilAgencia:
      'Agencias en Alicante capital con cartera en San Juan, oficinas en Elche orientadas a venta entre particulares y autónomos que gestionan pisos de teletrabajadores.',
    zonas: ['Centro Alicante', 'San Juan', 'Playa de San Juan', 'Elche', 'San Vicente', 'Benidorm'],
    operativaTipica: '5–10 operaciones al mes (temporada + LAU + arras)',
    contratosDestacados: [
      {
        nombre: 'Alquiler por temporada',
        desc: 'Teletrabajadores y estancias de 6–11 meses en San Juan y Playa de San Juan — causa de temporalidad bien redactada.',
        pct: '~36 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Vivienda habitual para residentes en Alicante capital y Elche.',
        pct: '~34 % del volumen B2B',
      },
      {
        nombre: 'Arras penitenciales',
        desc: 'Compraventa entre particulares en Elche y área metropolitana.',
        pct: '~22 % del volumen B2B',
      },
    ],
    confianzaIds: ['infopisos', 'nueva-habitat'],
    casos: [CASO_ALICANTE_COSTA],
    casosTitulo: 'Agencias de la Costa Blanca con triple operativa',
    casosSubtitulo:
      'LAU, temporada y arras en un solo panel — operativa en Alicante, San Juan y Elche.',
    packsTitulo: 'Packs B2B para agencias alicantinas',
    packsSubtitulo:
      'Pack Agencia Plus recomendado en temporada alta para oficinas con 7+ contratos/mes en Costa Blanca.',
    contratosSectionTitulo: 'Tres tipos de contrato, una operativa en Costa Blanca',
    contratosSectionDesc:
      'Distinguimos LAU para residentes, temporada para teletrabajadores y arras en venta local — cada uno con cláusulas propias de la Comunitat Valenciana.',
    contactoPlaceholder: 'Ej: 4 temporadas, 3 LAU y 2 arras al mes en San Juan y Elche…',
    faqExtra: [
      {
        q: '¿Gestionáis contratos de temporada en San Juan y Playa de San Juan?',
        a: 'Sí. Redactamos contratos de temporada con causa de temporalidad bien fundada para teletrabajadores y estancias de trabajo — operativa muy habitual en la Costa Blanca.',
      },
      {
        q: '¿Tenéis cola prioritaria en temporada alta en Alicante?',
        a: 'Sí. Las agencias con Pack Agencia Plus tienen cola prioritaria B2B con entrega en 4–5 h, incluso en meses de alta demanda en julio y agosto.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Alicante — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'LAU, temporada y arras B2B para agencias en Alicante y Costa Blanca. San Juan, Elche y Benidorm. Desde 110 €. Entrega 4–5 h.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Alicante',
      'contrato temporada agencia Costa Blanca',
      'LAU agencia San Juan',
      'gestoría B2B Alicante',
      'pack contratos agencia Costa Blanca',
    ],
  },
  {
    slug: 'palma',
    nombre: 'Palma',
    region: 'Illes Balears',
    heroImage: getCiudadImage('palma').src,
    heroImageAlt: 'Contratos para agencias inmobiliarias en Palma de Mallorca',
    metaTitle: 'Contratos para agencias inmobiliarias en Palma — 110€ · 4–5 h',
    metaDescription:
      'LAU y temporada B2B para agencias en Palma, Calvià y Mallorca. Contratos desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    keywords: [
      'contratos agencias inmobiliarias Palma',
      'gestoría B2B Mallorca',
      'contrato alquiler temporada agencia Palma',
      'LAU agencia Calvià',
      'contratos arras Mallorca agencia',
      'pack contratos agencia Baleares',
    ],
    heroH1: {
      prefix: 'Temporada y LAU para agencias en',
      highlight: 'Palma',
      suffix: ' y Calvià',
    },
    heroLead:
      'Contratos B2B para agencias en Palma de Mallorca, Calvià y municipios de la isla. LAU para residentes y temporada para estancias cortas — sin mezclar figuras jurídicas.',
    heroTags: [
      'Palma · Calvià · Mallorca',
      'Temporada + LAU',
      'Propietarios residentes',
      'Cola prioritaria B2B',
    ],
    mercadoLocalTitle: 'Palma y Mallorca: residentes, temporada y operaciones estacionales',
    mercadoLocal:
      'Palma de Mallorca y Calvià combinan alquiler LAU para residentes en la capital con contratos de temporada en zonas turísticas. Las agencias baleares necesitan distinguir bien cada figura — especialmente en meses de alta estacionalidad.',
    desafioLocal:
      'En temporada alta (abril–octubre) las agencias palmesanas triplican operaciones. Sin externalizar redacción, el cuello de botella legal frena cierres en Calvià y Playa de Palma.',
    perfilAgencia:
      'Agencias en Palma capital con cartera en Calvià, autónomos que gestionan pisos de residentes y oficinas orientadas a alquiler de temporada en primera línea.',
    zonas: ['Palma Centro', 'Calvià', 'Playa de Palma', 'Inca', 'Manacor', 'Pollença'],
    operativaTipica: '4–8 operaciones al mes (temporada + LAU)',
    contratosDestacados: [
      {
        nombre: 'Alquiler por temporada',
        desc: 'Estancias cortas en Calvià y Playa de Palma con causa de temporalidad adaptada a la operativa balear.',
        pct: '~42 % del volumen B2B',
      },
      {
        nombre: 'Alquiler LAU vivienda',
        desc: 'Vivienda habitual para residentes en Palma capital y municipios del interior.',
        pct: '~38 % del volumen B2B',
      },
      {
        nombre: 'Arras penitenciales',
        desc: 'Compraventa entre particulares en Palma y Manacor.',
        pct: '~15 % del volumen B2B',
      },
    ],
    casos: [CASO_PALMA_TEMPORADA],
    casosTitulo: 'Agencias palmesanas con picos estacionales',
    casosSubtitulo:
      'De contrato suelto en temporada alta a pack anual con cola prioritaria — operativa en Palma y Calvià.',
    packsTitulo: 'Packs B2B para agencias en Mallorca',
    packsSubtitulo:
      'Activa Pack Agencia Plus antes de temporada alta para cola prioritaria en abril–octubre.',
    contratosSectionTitulo: 'Temporada y LAU diferenciados en Baleares',
    contratosSectionDesc:
      'Cada contrato refleja si el arrendamiento es LAU de vivienda habitual o temporada con causa real — sin plantillas copiadas de la península.',
    contactoPlaceholder: 'Ej: 5 temporadas y 2 LAU al mes en Palma y Calvià…',
    faqExtra: [
      {
        q: '¿Redactáis contratos adaptados a la normativa balear?',
        a: 'Sí. Adaptamos cláusulas de alquiler LAU y temporada a la operativa en Illes Balears, incluyendo referencias a normativa autonómica cuando la operación lo requiere.',
      },
      {
        q: '¿Cómo gestionáis picos de demanda en temporada alta en Palma?',
        a: 'Las agencias con pack activo tienen cola prioritaria B2B con entrega en 4–5 h. Recomendamos activar pack antes de abril para cubrir la temporada alta en Calvià y Playa de Palma.',
      },
    ],
    gestoriaAgenciasTitle: 'Contratos para agencias inmobiliarias en Palma — 110€ · 4–5 h',
    gestoriaAgenciasDescription:
      'LAU y temporada B2B para agencias en Palma, Calvià y Mallorca. Desde 110 €. Entrega 4–5 h. FirmaCert incluida.',
    gestoriaAgenciasKeywords: [
      'contratos para agencias Palma',
      'contrato temporada agencia Mallorca',
      'LAU agencia Calvià',
      'gestoría B2B Baleares',
      'pack contratos agencia Palma',
    ],
  },
]

export const AGENCIAS_GESTORIA_CIUDAD_SLUGS = AGENCIAS_GESTORIA_CIUDADES.map(
  (c) => c.slug,
) as AgenciaGestoriaCiudadSlug[]

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
