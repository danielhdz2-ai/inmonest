import type { Metadata } from 'next'
import { GESTOR_CARMEN_GUTIERREZ, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'

const BASE_URL = 'https://inmonest.com'

export type AlquilerLocalComercialCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  gestor: {
    nombre: string
    rol: string
    foto: string
    bio: string
  }
  mercadoIntro: string
  zonasIntro: string
  zonas: string[]
  rentaEjemploMensual: number
  localesGestionados: number
  paraQuienExtra: string[]
  faqExtra: { q: string; a: string }[]
  regulacionLocal: string[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const ALQUILER_LOCAL_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'alicante', nombre: 'Alicante' },
] as const

export const ALQUILER_LOCAL_COMERCIAL_CIUDADES: Record<string, AlquilerLocalComercialCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'alquiler-local-comercial-madrid',
    heroImage: getCiudadImage('madrid').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Madrid',
      bio: 'Asesora a propietarios particulares y autónomos en alquileres de local en Madrid capital y área metropolitana. Conoce licencias de actividad del Ayuntamiento, IAE, terrazas en vía pública y cláusulas habituales en barrios comerciales de alto tránsito.',
    },
    mercadoIntro:
      'Madrid concentra la mayor oferta de locales comerciales entre particulares de España: bajos en Malasaña y Chamberí, locales en Vallecas o Carabanchel y pequeñas oficinas en el centro. Muchos propietarios alquilan sin contrato LAU empresarial y asumen riesgos evitables: traspasos no regulados, obras sin amortizar o rentas mal actualizadas.',
    zonasIntro:
      'Servicio en Madrid capital y municipios del área metropolitana con demanda comercial activa.',
    zonas: [
      'Malasaña', 'Chamberí', 'Salamanca', 'Vallecas', 'Carabanchel',
      'Tetuán', 'Usera', 'Getafe', 'Móstoles', 'Alcorcón',
    ],
    rentaEjemploMensual: 1_800,
    localesGestionados: 28,
    paraQuienExtra: [
      'Propietarios de bajos comerciales en Malasaña, Chamberí o barrios de alta rotación',
      'Autónomos que abren tienda u oficina sin pagar comisión a inmobiliaria',
      'Quien alquila local con terraza y necesita regular uso de vía pública en el contrato',
    ],
    faqExtra: [
      {
        q: '¿Necesito licencia de actividad antes de firmar el contrato?',
        a: 'En Madrid es habitual condicionar el arrendamiento a la obtención de licencia municipal de apertura. Tu gestor incluye cláusulas suspensivas o resolutorias si la licencia no se concede en plazo.',
      },
      {
        q: '¿El contrato sirve para locales en toda la Comunidad de Madrid?',
        a: 'Sí. Redactamos contratos válidos en Madrid capital y municipios del área metropolitana, adaptados al Título III LAU y a la práctica del mercado madrileño.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad y apertura — Ayuntamiento de Madrid',
      'Terrazas y ocupación de vía pública — normativa municipal',
      'IAE según actividad y epígrafe del arrendatario',
      'Registro de contratos si la renta anual supera 9.000 €',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Madrid desde 145€',
      description:
        '¿Alquilas o arriendas un local en Madrid? Contrato LAU empresarial para particulares con gestor experto. Tanteo, obras, traspaso y renta. 145€ IVA incluido.',
      keywords:
        'contrato alquiler local comercial madrid, alquilar local madrid particular, contrato local comercial madrid, gestoria alquiler local madrid, arrendamiento local madrid LAU, alquiler bajo comercial madrid',
      ogTitle: 'Alquiler Local Comercial Madrid — 145€ con gestor experto',
      ogDescription:
        'Particulares que alquilan o arriendan locales en Madrid. Contrato LAU empresarial, gestor asignado y entrega en 48h.',
    },
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunidad Valenciana',
    testimoniosLanding: 'alquiler-local-comercial-valencia',
    heroImage: getCiudadImage('valencia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Valencia',
      bio: 'Acompaña a propietarios y empresarios en alquileres de local en Valencia capital y l\'Horta. Domina licencias de la Generalitat y Ayuntamiento, actividad turística en Ciutat Vella y cláusulas de traspaso en barrios como Ruzafa o Benimaclet.',
    },
    mercadoIntro:
      'Valencia ha vivido una fuerte reactivación comercial en Ruzafa, el centro histórico y barrios emergentes. Propietarios particulares alquilan bajos a hostelería, retail y servicios. Sin contrato LAU empresarial bien redactado, los conflictos por obras, terrazas o traspaso de negocio son frecuentes.',
    zonasIntro: 'Cobertura en Valencia capital, l\'Horta y municipios del área metropolitana con actividad comercial.',
    zonas: [
      'Ruzafa', 'Ciutat Vella', 'Benimaclet', 'Campanar', 'Patraix',
      'Mislata', 'Paterna', 'Alboraya', 'Sagunto', 'Torrent',
    ],
    rentaEjemploMensual: 1_200,
    localesGestionados: 19,
    paraQuienExtra: [
      'Propietarios en Ruzafa o Ciutat Vella con locales de hostelería o retail',
      'Empresarios valencianos que abren negocio sin intermediarios',
      'Quien alquila local con actividad turística y necesita cláusulas específicas',
    ],
    faqExtra: [
      {
        q: '¿Puedo incluir cláusulas sobre terraza o veladores?',
        a: 'Sí. En Valencia muchos locales de hostelería dependen de terraza. El contrato puede regular quién solicita licencia, quién paga tasas y qué ocurre si se retira la autorización municipal.',
      },
      {
        q: '¿El contrato es válido en toda la provincia de Valencia?',
        a: 'Sí, en Valencia capital y municipios del área metropolitana. Adaptamos cláusulas a la normativa autonómica valenciana cuando afecta al inmueble.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Valencia / Generalitat',
      'Terrazas hosteleras — ordenanza municipal',
      'IAE y alta en Hacienda del arrendatario',
      'Inscripción registral si renta anual > 9.000 €',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Valencia desde 145€',
      description:
        'Contrato de alquiler de local comercial en Valencia para particulares. LAU empresarial, gestor experto, tanteo y traspaso. 145€ IVA incluido. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial valencia, alquilar local valencia particular, arrendamiento local valencia, gestoria local comercial valencia, alquiler bajo comercial ruzafa',
      ogTitle: 'Alquiler Local Comercial Valencia — 145€',
      ogDescription: 'Locales comerciales en Valencia entre particulares. Contrato profesional y gestor asignado.',
    },
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco',
    testimoniosLanding: 'alquiler-local-comercial-bilbao',
    heroImage: getCiudadImage('bilbao').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Bilbao',
      bio: 'Asesora alquileres de local en Bilbao, Gran Bilbao y Bizkaia. Conoce el mercado de Casco Viejo, Indautxu y Deusto, normativa foral vasca aplicable y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Bilbao combina locales históricos en el Casco Viejo con oficinas y retail en Indautxu, Abando y Deusto. El mercado comercial tiene rentas estables y operaciones frecuentes entre particulares. Un contrato genérico de vivienda o una plantilla de internet no protege derechos de tanteo, obras ni traspaso en el régimen LAU empresarial.',
    zonasIntro: 'Servicio en Bilbao, Gran Bilbao y municipios de Bizkaia con demanda comercial.',
    zonas: [
      'Casco Viejo', 'Indautxu', 'Abando', 'Deusto', 'Basurto',
      'Santutxu', 'Barakaldo', 'Getxo', 'Portugalete', 'Erandio',
    ],
    rentaEjemploMensual: 1_400,
    localesGestionados: 14,
    paraQuienExtra: [
      'Propietarios de locales en Casco Viejo o Indautxu',
      'Autónomos y pymes vizcaínas que formalizan arrendamiento sin agencia',
      'Operaciones con local en edificio protegido o con restricciones urbanísticas',
    ],
    faqExtra: [
      {
        q: '¿Hay particularidades forales en el alquiler de local en Bizkaia?',
        a: 'El marco principal es la LAU estatal (Título III), pero pueden aplicarse normativas fiscales y urbanísticas autonómicas. Tu gestor adapta cláusulas y te orienta sobre IAE y licencias municipales.',
      },
      {
        q: '¿Regula el contrato el traspaso de negocio en hostelería?',
        a: 'Sí. En Bilbao la hostelería concentra muchos traspasos. El contrato puede limitar, condicionar o prohibir el traspaso y regular el derecho de tanteo del propietario.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Bilbao',
      'Normativa urbanística y patrimonio en Casco Viejo',
      'IAE — Hacienda Foral de Bizkaia',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Bilbao desde 145€',
      description:
        'Alquiler de local comercial en Bilbao entre particulares. Contrato LAU empresarial con gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial bilbao, alquilar local bilbao, arrendamiento local bilbao, gestoria local comercial bizkaia, alquiler bajo comercial bilbao',
      ogTitle: 'Alquiler Local Comercial Bilbao — 145€',
      ogDescription: 'Locales comerciales en Bilbao y Bizkaia. Contrato para particulares con gestoría especializada.',
    },
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'alquiler-local-comercial-sevilla',
    heroImage: getCiudadImage('sevilla').src,
    gestor: {
      nombre: GESTOR_CARMEN_GUTIERREZ.nombre,
      foto: GESTOR_CARMEN_GUTIERREZ.foto,
      rol: 'Gestora inmobiliaria · Locales comerciales en Sevilla',
      bio: 'Acompaña a propietarios y empresarios en alquileres de local en Sevilla capital y área metropolitana. Conoce licencias del Ayuntamiento, actividad en Triana y Nervión, y cláusulas habituales en operaciones entre particulares andaluces.',
    },
    mercadoIntro:
      'Sevilla tiene un tejido comercial muy activo en Triana, el centro histórico, Nervión y Los Remedios. Muchos propietarios alquilan locales a particulares sin contrato profesional. Los conflictos por fianza, obras de adecuación o traspaso de negocio se resuelven mucho mejor con un contrato LAU empresarial redactado por gestoría.',
    zonasIntro: 'Cobertura en Sevilla capital, área metropolitana y municipios con actividad comercial.',
    zonas: [
      'Triana', 'Nervión', 'Centro', 'Los Remedios', 'Macarena',
      'Bellavista', 'Dos Hermanas', 'Alcalá de Guadaíra', 'Camas', 'Tomares',
    ],
    rentaEjemploMensual: 950,
    localesGestionados: 16,
    paraQuienExtra: [
      'Propietarios en Triana, Nervión o centro histórico con bajos comerciales',
      'Autónomos andaluces que abren tienda o taller sin pagar comisión de agencia',
      'Quien alquila local en edificio con comunidad de propietarios y cuotas de IBI elevadas',
    ],
    faqExtra: [
      {
        q: '¿El contrato regula quién paga el IBI y la comunidad?',
        a: 'Sí. En locales comerciales es fundamental pactar IBI, basuras, comunidad y seguros. Tu gestor redacta la distribución de gastos con claridad para evitar pleitos.',
      },
      {
        q: '¿Atienden en toda la provincia de Sevilla?',
        a: 'Sí. Redactamos contratos válidos en Sevilla capital y municipios del área metropolitana, adaptados al mercado local y al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Sevilla',
      'Terrazas y hostelería en centro histórico',
      'IAE según epígrafe del arrendatario',
      'Inscripción registral si renta anual supera umbral legal',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Sevilla desde 145€',
      description:
        'Contrato alquiler local comercial en Sevilla para particulares. LAU empresarial, gestora experta en Andalucía. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial sevilla, alquilar local sevilla particular, arrendamiento local sevilla, gestoria local comercial sevilla, alquiler bajo comercial triana',
      ogTitle: 'Alquiler Local Comercial Sevilla — 145€',
      ogDescription: 'Locales comerciales en Sevilla entre particulares. Gestoría especializada sin comisión de agencia.',
    },
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña',
    testimoniosLanding: 'alquiler-local-comercial-barcelona',
    heroImage: getCiudadImage('barcelona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Barcelona',
      bio: 'Asesora a propietarios y autónomos en alquileres de local en Barcelona capital y área metropolitana. Conoce licencias de actividad del Ayuntamiento, normativa de terrazas, locales en planta baja del Eixample y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Barcelona concentra uno de los mercados comerciales más dinámicos de España: bajos en el Eixample y Gràcia, locales de hostelería en Poblenou y Sant Antoni, y pequeñas oficinas en el 22@. Muchos propietarios alquilan entre particulares con plantillas genéricas que no regulan tanteo, obras ni traspaso en el régimen LAU empresarial.',
    zonasIntro: 'Servicio en Barcelona capital, L\'Hospitalet, Badalona y municipios del área metropolitana con actividad comercial.',
    zonas: [
      'Eixample', 'Gràcia', 'Poblenou', 'Sant Antoni', 'Sants',
      'Sarrià-Sant Gervasi', 'El Raval', "L'Hospitalet", 'Badalona', 'Sant Cugat',
    ],
    rentaEjemploMensual: 1_650,
    localesGestionados: 22,
    paraQuienExtra: [
      'Propietarios de bajos comerciales en Eixample, Gràcia o Poblenou',
      'Autónomos y pymes que abren negocio en Barcelona sin pagar comisión de agencia',
      'Quien alquila local con terraza y necesita regular licencia y ocupación de vía pública',
    ],
    faqExtra: [
      {
        q: '¿El contrato es válido en Barcelona y el área metropolitana?',
        a: 'Sí. Redactamos contratos del Título III LAU válidos en Barcelona, L\'Hospitalet, Badalona y resto de Cataluña, adaptados a licencias municipales y práctica del mercado local.',
      },
      {
        q: '¿Puedo limitar el traspaso del negocio en hostelería?',
        a: 'Sí. En Barcelona el traspaso de bares y restaurantes es muy frecuente. El contrato puede condicionar, limitar o prohibir el traspaso y regular el derecho de tanteo del propietario.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad y apertura — Ayuntamiento de Barcelona',
      'Terrazas y ocupación de vía pública — ordenanza municipal',
      'IAE según actividad y epígrafe del arrendatario',
      'Inscripción registral si renta anual supera 9.000 €',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Barcelona desde 145€',
      description:
        'Contrato de alquiler de local comercial en Barcelona para particulares. LAU empresarial, gestor experto, tanteo y traspaso. 145€ IVA incluido. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial barcelona, alquilar local barcelona particular, arrendamiento local barcelona, gestoria local comercial barcelona, alquiler bajo comercial eixample, contrato local comercial cataluña',
      ogTitle: 'Alquiler Local Comercial Barcelona — 145€',
      ogDescription: 'Locales comerciales en Barcelona entre particulares. Contrato profesional y gestor asignado.',
    },
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía · Costa del Sol',
    testimoniosLanding: 'alquiler-local-comercial-malaga',
    heroImage: getCiudadImage('malaga').src,
    gestor: {
      nombre: GESTOR_CARMEN_GUTIERREZ.nombre,
      foto: GESTOR_CARMEN_GUTIERREZ.foto,
      rol: 'Gestora inmobiliaria · Locales comerciales en Málaga',
      bio: 'Acompaña a propietarios y empresarios en alquileres de local en Málaga capital y Costa del Sol. Conoce licencias del Ayuntamiento, actividad turística en el centro y cláusulas habituales en operaciones entre particulares andaluces.',
    },
    mercadoIntro:
      'Málaga ha experimentado un boom comercial en el centro histórico, Soho y zonas costeras. Propietarios particulares alquilan bajos a hostelería, retail y servicios vinculados al turismo. Sin contrato LAU empresarial bien redactado, los conflictos por obras, terrazas o traspaso de negocio son frecuentes.',
    zonasIntro: 'Cobertura en Málaga capital, Costa del Sol y municipios del área metropolitana con actividad comercial.',
    zonas: [
      'Centro Histórico', 'Soho', 'La Malagueta', 'Teatinos', 'El Palo',
      'Huelin', 'Carretera de Cádiz', 'Benalmádena', 'Torremolinos', 'Rincón de la Victoria',
    ],
    rentaEjemploMensual: 1_100,
    localesGestionados: 15,
    paraQuienExtra: [
      'Propietarios en el centro o Soho con locales de hostelería o retail',
      'Autónomos malagueños que abren negocio sin intermediarios',
      'Quien alquila local con actividad turística y necesita cláusulas específicas',
    ],
    faqExtra: [
      {
        q: '¿El contrato regula terrazas y hostelería en el centro?',
        a: 'Sí. En Málaga muchos locales dependen de terraza. El contrato puede regular licencia, tasas municipales y qué ocurre si se retira la autorización.',
      },
      {
        q: '¿Atienden en toda la provincia de Málaga?',
        a: 'Sí. Redactamos contratos válidos en Málaga capital, Costa del Sol y municipios del área metropolitana, adaptados al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Málaga',
      'Terrazas hosteleras — ordenanza municipal',
      'IAE según epígrafe del arrendatario',
      'Inscripción registral si renta anual supera umbral legal',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Málaga desde 145€',
      description:
        'Contrato alquiler local comercial en Málaga para particulares. LAU empresarial, gestora experta en Andalucía. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial malaga, alquilar local malaga particular, arrendamiento local malaga, gestoria local comercial malaga, alquiler bajo comercial costa del sol',
      ogTitle: 'Alquiler Local Comercial Málaga — 145€',
      ogDescription: 'Locales comerciales en Málaga y Costa del Sol. Gestoría especializada sin comisión de agencia.',
    },
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    testimoniosLanding: 'alquiler-local-comercial-zaragoza',
    heroImage: getCiudadImage('zaragoza').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Zaragoza',
      bio: 'Asesora alquileres de local en Zaragoza capital y área metropolitana. Conoce el mercado del centro, Delicias y Actur, licencias municipales y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Zaragoza ofrece rentas comerciales más accesibles que Madrid o Barcelona, con tejido retail activo en el centro, Delicias y nuevos desarrollos en Valdespartera. Propietarios particulares alquilan bajos y locales en polígonos sin contrato LAU empresarial y asumen riesgos evitables en tanteo, obras y traspaso.',
    zonasIntro: 'Servicio en Zaragoza capital, Valdespartera, Actur y municipios del área metropolitana.',
    zonas: [
      'Centro', 'Delicias', 'Actur', 'Valdespartera', 'Las Fuentes',
      'San José', 'La Almozara', 'Utebo', 'Cuarte de Huerva', 'Monzalbarba',
    ],
    rentaEjemploMensual: 850,
    localesGestionados: 11,
    paraQuienExtra: [
      'Propietarios de bajos comerciales en el centro o Delicias',
      'Autónomos aragoneses que formalizan arrendamiento sin agencia',
      'Quien alquila local en polígono o nave ligera entre particulares',
    ],
    faqExtra: [
      {
        q: '¿El contrato sirve para locales en polígonos industriales?',
        a: 'Sí. El Título III LAU cubre locales comerciales, bajos y naves ligeras. Adaptamos cláusulas según actividad, licencia y uso del inmueble.',
      },
      {
        q: '¿Es válido en toda la provincia de Zaragoza?',
        a: 'Sí. Redactamos contratos válidos en Zaragoza capital y municipios del área metropolitana, adaptados al mercado local aragonés.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Zaragoza',
      'Normativa urbanística y uso comercial',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Zaragoza desde 145€',
      description:
        'Alquiler de local comercial en Zaragoza entre particulares. Contrato LAU empresarial con gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial zaragoza, alquilar local zaragoza, arrendamiento local zaragoza, gestoria local comercial zaragoza, alquiler bajo comercial zaragoza',
      ogTitle: 'Alquiler Local Comercial Zaragoza — 145€',
      ogDescription: 'Locales comerciales en Zaragoza entre particulares. Contrato para particulares con gestoría especializada.',
    },
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    region: 'Comunitat Valenciana · Costa Blanca',
    testimoniosLanding: 'alquiler-local-comercial-alicante',
    heroImage: getCiudadImage('alicante').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Alicante y Costa Blanca',
      bio: 'Asesora alquileres de local en el centro de Alicante, zona portuaria, Mercado Central y polígonos de Elche. Conoce licencias del Ayuntamiento de Alicante, hostelería en Explanada, traspasos en la Rambla y cláusulas habituales en operaciones entre particulares sin agencia inmobiliaria.',
    },
    mercadoIntro:
      'Alicante mezcla comercio tradicional — Mercado Central, Rambla Méndez Núñez, barrio de Santa Cruz — con hostelería en la Explanada y retail en Playa de San Juan. En Elche y San Vicente hay naves ligeras y bajos en polígonos. Muchos propietarios alquilan locales entre particulares con plantillas de vivienda o PDFs genéricos que no regulan tanteo ante venta, amortización de obras ni traspaso de negocio en el Título III LAU.',
    zonasIntro:
      'Cobertura en Alicante capital, área metropolitana (Elche, San Vicente, Mutxamel), Campello y municipios de la Costa Blanca con actividad comercial.',
    zonas: [
      'Centro / Santa Cruz', 'Explanada de España', 'Mercado Central', 'Playa San Juan',
      'Carolinas Altas', 'Benalúa', 'Campello', 'Elche — Polígono', 'San Vicente del Raspeig',
    ],
    rentaEjemploMensual: 980,
    localesGestionados: 13,
    paraQuienExtra: [
      'Propietarios de bajos en Explanada o Mercado Central con hostelería o retail',
      'Autónomos que abren negocio en Alicante sin pagar comisión del 10% sobre renta anual',
      'Quien alquila local con terraza frente al puerto y necesita regular licencia y vía pública',
      'Operaciones en Elche o San Vicente con local en edificio plurifamiliar comercial',
    ],
    faqExtra: [
      {
        q: '¿Puedo alquilar un local en Explanada con contrato de vivienda?',
        a: 'No. Los locales comerciales se rigen por el Título III LAU (uso distinto de vivienda). Un contrato residencial no protege derecho de tanteo, obras ni traspaso. Tu gestor redacta el régimen empresarial adaptado a hostelería portuaria.',
      },
      {
        q: '¿El contrato regula terrazas en la Explanada de España?',
        a: 'Sí. En la zona portuaria muchos bares dependen de terraza en vía pública. El contrato puede regular quién solicita licencia municipal, quién paga tasas y qué ocurre si el Ayuntamiento de Alicante retira la autorización.',
      },
      {
        q: '¿Atienden en Elche, San Vicente y la Costa Blanca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en Alicante, Elche, San Vicente del Raspeig, Campello y municipios de la provincia, con adaptación a licencias locales y práctica del mercado alicantino.',
      },
      {
        q: '¿Qué pasa si el arrendatario quiere traspasar el negocio?',
        a: 'En hostelería alicantina el traspaso es frecuente. El contrato puede limitar, condicionar o prohibir el traspaso y regular el derecho de tanteo del propietario con plazos de notificación.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad y apertura — Ayuntamiento de Alicante / Elche',
      'Terrazas hosteleras — ordenanza municipal de ocupación de vía pública',
      'IAE según epígrafe del arrendatario (hostelería, comercio, servicios)',
      'Inscripción en Registro de la Propiedad si renta anual supera 9.000 €',
      'Normativa autonómica valenciana cuando afecta al inmueble comercial',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Alicante desde 145€',
      description:
        '¿Alquilas o arriendas un local en Alicante? Contrato LAU empresarial para particulares. Explanada, centro, Elche y Costa Blanca. Gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial alicante, alquilar local alicante particular, arrendamiento local explanada alicante, gestoria local comercial alicante, alquiler bajo comercial costa blanca, contrato local comercial elche, traspaso bar alicante',
      ogTitle: 'Alquiler Local Comercial Alicante — 145€ con gestor experto',
      ogDescription:
        'Locales comerciales en Alicante y Costa Blanca entre particulares. Tanteo, obras, traspaso y licencias. Sin comisión de agencia.',
    },
  },
}

export function buildAlquilerLocalComercialMetadata(
  config: AlquilerLocalComercialCiudadConfig,
): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/alquiler-local-comercial/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/alquiler-local-comercial/${config.slug}`,
      type: 'website',
      locale: 'es_ES',
      siteName: 'Inmonest',
      images: [{ url: `${BASE_URL}${config.heroImage}`, width: 1200, height: 630 }],
    },
  }
}
