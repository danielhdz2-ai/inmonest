import type { Metadata } from 'next'
import { GESTOR_CARMEN_GUTIERREZ, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { CASTELLON_LOCAL_COMERCIAL } from './ciudad-castellon-configs'

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
  { slug: 'castellon', nombre: 'Castellón' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'alicante', nombre: 'Alicante' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'granada', nombre: 'Granada' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'pamplona', nombre: 'Pamplona' },
  { slug: 'mallorca', nombre: 'Mallorca' },
  { slug: 'salamanca', nombre: 'Salamanca' },
  { slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'asturias', nombre: 'Asturias' },
  { slug: 'santander', nombre: 'Santander' },
  { slug: 'vitoria', nombre: 'Vitoria-Gasteiz' },
  { slug: 'san-sebastian', nombre: 'San Sebastián' },
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

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'alquiler-local-comercial-murcia',
    heroImage: getCiudadImage('murcia').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Murcia',
      bio: 'Asesora alquileres de local en el centro murciano, Mercado de Verónicas, Gran Vía y polígonos de Churra y El Puntal. Conoce licencias del Ayuntamiento de Murcia, hostelería en Trapería y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Murcia combina comercio de barrio en Trapería y Platería con retail en Nueva Condomina y locales en pedanías. En Cartagena y Lorca hay bajos portuarios y hostelería turística. Muchos propietarios usan contratos de vivienda o PDF genéricos que no cubren tanteo, obras ni traspaso en el Título III LAU.',
    zonasIntro: 'Cobertura en Murcia capital, área metropolitana, Cartagena, Lorca y municipios de la Región.',
    zonas: [
      'Centro / Trapería', 'Gran Vía', 'Verónicas', 'La Fama', 'Vistabella',
      'Churra', 'El Puntal', 'Alcantarilla', 'Cartagena', 'Lorca',
    ],
    rentaEjemploMensual: 750,
    localesGestionados: 12,
    paraQuienExtra: [
      'Propietarios de bajos en el centro histórico o Gran Vía',
      'Autónomos que abren negocio en Murcia sin pagar comisión del 10% sobre renta anual',
      'Quien alquila local en polígono o nave ligera entre particulares',
    ],
    faqExtra: [
      {
        q: '¿Puedo alquilar un local en el centro con contrato de vivienda?',
        a: 'No. Los locales comerciales se rigen por el Título III LAU. Un contrato residencial no protege tanteo, obras ni traspaso. Tu gestor redacta el régimen empresarial adaptado a retail o hostelería murciana.',
      },
      {
        q: '¿El contrato es válido en Cartagena y Lorca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en Murcia capital y municipios de la Región, con adaptación a licencias locales y práctica del mercado.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Murcia',
      'Normativa urbanística y uso comercial',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Murcia desde 145€',
      description:
        '¿Alquilas o arriendas un local en Murcia? Contrato LAU empresarial para particulares. Centro, Gran Vía y área metropolitana. Gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial murcia, alquilar local murcia particular, arrendamiento local murcia, gestoria local comercial murcia, alquiler bajo comercial murcia centro',
      ogTitle: 'Alquiler Local Comercial Murcia — 145€ con gestor experto',
      ogDescription:
        'Locales comerciales en Murcia entre particulares. Tanteo, obras, traspaso y licencias. Sin comisión de agencia.',
    },
  },

  granada: {
    slug: 'granada',
    nombre: 'Granada',
    region: 'Andalucía',
    testimoniosLanding: 'alquiler-local-comercial-granada',
    heroImage: getCiudadImage('granada').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Granada',
      bio: 'Asesora alquileres de local en el centro granadino, Realejo, Zaidín y polígonos de Armilla. Conoce licencias del Ayuntamiento de Granada, hostelería en Plaza Nueva y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Granada mezcla turismo en Albaicín y hostelería en Reyes Católicos con comercio en Zaidín y Chana. En Motril y la costa hay locales estacionales. Propietarios particulares alquilan bajos sin contrato LAU empresarial y asumen riesgos en traspaso de bares y amortización de obras.',
    zonasIntro: 'Servicio en Granada capital, área metropolitana, Motril y municipios de la provincia.',
    zonas: [
      'Centro / Reyes Católicos', 'Realejo', 'Albaicín', 'Zaidín', 'Chana',
      'Armilla', 'Maracena', 'Albolote', 'Motril', 'Baza',
    ],
    rentaEjemploMensual: 820,
    localesGestionados: 10,
    paraQuienExtra: [
      'Propietarios de bajos en Plaza Nueva o Realejo con hostelería',
      'Autónomos granadinos que formalizan arrendamiento sin agencia',
      'Quien alquila local con actividad turística en el centro histórico',
    ],
    faqExtra: [
      {
        q: '¿Regula el traspaso de bares en el centro de Granada?',
        a: 'Sí. El traspaso es frecuente en hostelería granadina. El contrato puede limitar, condicionar o prohibir el traspaso y regular el derecho de tanteo del propietario.',
      },
      {
        q: '¿Atienden en Armilla, Motril y la provincia?',
        a: 'Sí. Redactamos contratos válidos en Granada capital y municipios de la provincia, adaptados al Título III LAU y licencias municipales.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Granada',
      'Terrazas y ocupación de vía pública en hostelería',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Granada desde 145€',
      description:
        'Alquiler de local comercial en Granada entre particulares. Centro, Realejo y Zaidín. Contrato LAU con gestor experto. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial granada, alquilar local granada, arrendamiento local granada, gestoria local comercial granada, alquiler bajo comercial granada centro',
      ogTitle: 'Alquiler Local Comercial Granada — 145€',
      ogDescription: 'Locales comerciales en Granada entre particulares. Gestoría especializada sin comisión de agencia.',
    },
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    testimoniosLanding: 'alquiler-local-comercial-coruna',
    heroImage: getCiudadImage('coruna').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en A Coruña',
      bio: 'Asesora alquileres de local en la Ciudad Vieja, Orzán, Cuatro Caminos y polígonos de Arteixo. Conoce licencias del Ayuntamiento de A Coruña, hostelería en Marina y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'A Coruña concentra comercio en la Ciudad Vieja y Gran Vía con hostelería en Orzán y Matogrande. En Ferrol y Oleiros hay bajos en edificios mixtos. Sin contrato LAU empresarial, el propietario asume riesgos en tanteo ante venta y obras del inquilino.',
    zonasIntro: 'Cobertura en A Coruña capital, Ferrol, Oleiros, Arteixo y área metropolitana.',
    zonas: [
      'Ciudad Vieja', 'Orzán / Riazor', 'Cuatro Caminos', 'Elviña', 'Matogrande',
      'Sada', 'Ferrol', 'Oleiros', 'Arteixo', 'Carballo',
    ],
    rentaEjemploMensual: 900,
    localesGestionados: 9,
    paraQuienExtra: [
      'Propietarios de bajos en Ciudad Vieja o Gran Vía',
      'Autónomos gallegos que arriendan local sin comisión inmobiliaria',
      'Quien alquila nave ligera en polígono de Arteixo entre particulares',
    ],
    faqExtra: [
      {
        q: '¿El contrato cubre locales en edificios mixtos vivienda-comercio?',
        a: 'Sí. En A Coruña es habitual el bajo comercial en edificio residencial. Adaptamos cláusulas de uso, licencia y comunidad de propietarios.',
      },
      {
        q: '¿Es válido en Ferrol y municipios de la comarca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en la provincia de A Coruña, con adaptación a licencias locales.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de A Coruña',
      'Normativa urbanística gallega y uso comercial',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial A Coruña desde 145€',
      description:
        'Contrato alquiler local comercial en A Coruña para particulares. Ciudad Vieja, Orzán y área metropolitana. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial coruna, alquilar local a coruña particular, arrendamiento local coruña, gestoria local comercial galicia',
      ogTitle: 'Alquiler Local Comercial A Coruña — 145€',
      ogDescription: 'Locales comerciales en A Coruña entre particulares. Contrato LAU con gestoría Inmonest.',
    },
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    testimoniosLanding: 'alquiler-local-comercial-pamplona',
    heroImage: getCiudadImage('pamplona').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Pamplona',
      bio: 'Asesora alquileres de local en el Casco Antiguo, Ensanche y polígonos de Mutilva. Conoce licencias del Ayuntamiento de Pamplona, hostelería en Estafeta y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Pamplona combina retail en el Ensanche con hostelería en el Casco Antiguo y comercio en Rochapea. En Burlada y Ansoáin hay bajos en edificios recientes. Propietarios particulares necesitan contrato LAU empresarial para regular tanteo, obras y traspaso sin depender de plantillas de vivienda.',
    zonasIntro: 'Servicio en Pamplona, área metropolitana, Tudela y Comunidad Foral de Navarra.',
    zonas: [
      'Casco Antiguo', 'Ensanche', 'Iturrama', 'San Juan', 'Rochapea',
      'Burlada', 'Tudela', 'Barañáin', 'Mutilva', 'Ansoáin',
    ],
    rentaEjemploMensual: 950,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos en Ensanche o Casco Antiguo',
      'Autónomos navarros que formalizan arrendamiento sin agencia',
      'Quien alquila local con actividad hostelería en Estafeta o plaza',
    ],
    faqExtra: [
      {
        q: '¿El contrato regula terrazas en hostelería pamplonesa?',
        a: 'Sí. Podemos incluir quién tramita licencia municipal, tasas de vía pública y qué ocurre si se retira la autorización.',
      },
      {
        q: '¿Atienden en Tudela y municipios de Navarra?',
        a: 'Sí. Redactamos contratos válidos en Pamplona y resto de la Comunidad Foral, adaptados al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Pamplona',
      'Normativa foral y ordenanzas municipales',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Pamplona desde 145€',
      description:
        'Alquiler de local comercial en Pamplona entre particulares. Casco Antiguo, Ensanche y área metropolitana. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial pamplona, alquilar local pamplona, arrendamiento local navarra, gestoria local comercial pamplona',
      ogTitle: 'Alquiler Local Comercial Pamplona — 145€',
      ogDescription: 'Locales comerciales en Pamplona entre particulares. Gestoría Inmonest sin comisión de agencia.',
    },
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Islas Baleares',
    testimoniosLanding: 'alquiler-local-comercial-mallorca',
    heroImage: getCiudadImage('mallorca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Mallorca',
      bio: 'Asesora alquileres de local en Palma centro, Paseo Marítimo, polígonos de Son Castelló y municipios turísticos. Conoce licencias del Ajuntament de Palma, hostelería en Puerto y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Palma concentra retail en Jaime III y hostelería en La Lonja y Puerto. En Calvià, Manacor y Inca hay locales estacionales y traspasos frecuentes. Sin contrato LAU empresarial, propietarios e inquilinos asumen riesgos en temporada alta, obras y traspaso de negocio.',
    zonasIntro: 'Cobertura en Palma, Calvià, Manacor, Inca y municipios de Mallorca con actividad comercial.',
    zonas: [
      'Palma — Centro', 'La Lonja', 'Paseo Marítimo', 'Son Castelló', 'Pere Garau',
      'Calvià', 'Magaluf / Palmanova', 'Manacor', 'Inca', 'Pollença',
    ],
    rentaEjemploMensual: 1100,
    localesGestionados: 14,
    paraQuienExtra: [
      'Propietarios de locales en Palma o zona turística costera',
      'Autónomos baleares que arriendan sin comisión del 10% anual',
      'Quien alquila local con traspaso de hostelería en Puerto o Paseo Marítimo',
    ],
    faqExtra: [
      {
        q: '¿El contrato contempla estacionalidad turística?',
        a: 'Sí. Podemos adaptar cláusulas de renta, apertura y garantías cuando la actividad depende de temporada en zona costera.',
      },
      {
        q: '¿Es válido en Calvià, Manacor e Inca?',
        a: 'Sí. Redactamos contratos LAU empresariales válidos en Mallorca, con adaptación a licencias del municipio correspondiente.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ajuntament de Palma / municipios',
      'Terrazas y ocupación de vía pública en hostelería',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Mallorca desde 145€',
      description:
        'Alquiler de local comercial en Mallorca entre particulares. Palma, Calvià y costa. Contrato LAU con gestor. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial mallorca, alquilar local palma particular, arrendamiento local baleares, gestoria local comercial palma',
      ogTitle: 'Alquiler Local Comercial Mallorca — 145€',
      ogDescription: 'Locales comerciales en Mallorca entre particulares. Tanteo, traspaso y licencias con Inmonest.',
    },
  },

  salamanca: {
    slug: 'salamanca',
    nombre: 'Salamanca',
    region: 'Castilla y León',
    testimoniosLanding: 'alquiler-local-comercial-salamanca',
    heroImage: getCiudadImage('salamanca').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Salamanca',
      bio: 'Asesora alquileres de local en el centro universitario, Gran Vía y polígonos de Villamayor. Conoce licencias del Ayuntamiento de Salamanca, hostelería en Plaza Mayor y cláusulas habituales en operaciones entre particulares sin agencia.',
    },
    mercadoIntro:
      'Salamanca vive del comercio en el centro histórico y hostelería en torno a la Plaza Mayor, con demanda universitaria en Calle Toro. En Villamayor y Carbajosa hay naves y bajos en polígonos. Propietarios particulares alquilan locales sin contrato LAU empresarial y asumen riesgos en tanteo y obras.',
    zonasIntro: 'Servicio en Salamanca capital, Villamayor, Laguna de Duero y municipios de la provincia.',
    zonas: [
      'Centro / Plaza Mayor', 'Gran Vía', 'San Bernardo', 'Garrido', 'Delicias',
      'Villamayor', 'Laguna de Duero', 'Carbajosa', 'Peñaranda', 'Béjar',
    ],
    rentaEjemploMensual: 700,
    localesGestionados: 7,
    paraQuienExtra: [
      'Propietarios de bajos en el centro histórico o Gran Vía',
      'Autónomos salmantinos que formalizan arrendamiento sin agencia',
      'Quien alquila local en polígono de Villamayor entre particulares',
    ],
    faqExtra: [
      {
        q: '¿El contrato sirve para locales en el centro patrimonial?',
        a: 'Sí. Adaptamos cláusulas de uso, licencia y posibles restricciones urbanísticas en edificios protegidos del casco histórico.',
      },
      {
        q: '¿Atienden en Villamayor y Laguna de Duero?',
        a: 'Sí. Redactamos contratos válidos en Salamanca capital y área metropolitana, conforme al Título III LAU.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Salamanca',
      'Normativa urbanística en casco histórico',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Salamanca desde 145€',
      description:
        'Alquiler de local comercial en Salamanca entre particulares. Centro, Gran Vía y Villamayor. 145€ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial salamanca, alquilar local salamanca, arrendamiento local salamanca, gestoria local comercial castilla y leon',
      ogTitle: 'Alquiler Local Comercial Salamanca — 145€',
      ogDescription: 'Locales comerciales en Salamanca entre particulares. Gestoría Inmonest sin comisión de agencia.',
    },
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'alquiler-local-comercial-valladolid',
    heroImage: getCiudadImage('valladolid').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario · Locales comerciales en Valladolid',
      bio: 'Asesora alquileres de local en Paseo Zorrilla, Arenal, polígonos de Argales y San Cristóbal, y bajos en Delicias. Conoce licencias del Ayuntamiento de Valladolid, hostelería en la Acera de Recoletos y operaciones entre particulares sin comisión anual de agencia.',
    },
    mercadoIntro:
      'Valladolid combina retail en el Arenal y Paseo Zorrilla con hostelería en Recoletos y cadenas en Parquesol. En polígonos como Argales hay naves y oficinas técnicas; muchos propietarios alquilan bajos entre particulares sin contrato LAU empresarial y descubren tarde problemas de obras, IAE o tanteo si venden el inmueble.',
    zonasIntro: 'Cobertura en Valladolid capital, Laguna de Duero, Arroyo de la Encomienda y municipios con actividad comercial en la provincia.',
    zonas: [
      'Arenal / Acera de Recoletos', 'Paseo Zorrilla', 'Campo Grande', 'Delicias', 'Parquesol',
      'La Victoria / Rondilla', 'Polígono Argales', 'San Cristóbal', 'Laguna de Duero', 'Medina del Campo',
    ],
    rentaEjemploMensual: 750,
    localesGestionados: 9,
    paraQuienExtra: [
      'Propietarios de bajos en el Arenal o Paseo Zorrilla que alquilan sin inmobiliaria',
      'Autónomos vallisoletanos que abren local y quieren arrendamiento LAU claro',
      'Inversores con local en polígono que formalizan renta con empresa arrendataria',
    ],
    faqExtra: [
      {
        q: '¿El contrato cubre locales en polígonos como Argales?',
        a: 'Sí. Redactamos arrendamiento LAU de local de negocio con cláusulas de uso industrial/comercial, obras y devolución adaptadas a nave o bajo en polígono.',
      },
      {
        q: '¿Puedo gestionar el alquiler del local estando en Madrid?',
        a: 'Sí. Trabajamos 100 % online: datos del inmueble, arrendatario, renta y garantías. El PDF firmable es válido en Valladolid y provincia.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad — Ayuntamiento de Valladolid',
      'Normativa de terrazas en hostelería (Recoletos / centro)',
      'IAE según epígrafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Local comercial Valladolid — Arenal y polígonos desde 145€',
      description:
        'Contrato de alquiler de local comercial en Valladolid entre particulares. Paseo Zorrilla, Delicias, Argales. LAU empresarial, 145€ IVA incl., 48h.',
      keywords:
        'contrato alquiler local comercial valladolid, alquilar local valladolid particular, arrendamiento local paseo zorrilla, gestoria local comercial castilla y leon',
      ogTitle: 'Alquiler local comercial Valladolid — 145€',
      ogDescription: 'Locales en Valladolid con contrato LAU, tanteo y licencias. Sin comisión de agencia.',
    },
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    region: 'Principado de Asturias',
    testimoniosLanding: 'alquiler-local-comercial-asturias',
    heroImage: getCiudadImage('asturias').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario ┬À Locales comerciales en Asturias',
      bio: 'Asesora alquileres de local entre particulares en Asturias. Licencias del Ayuntamiento de Oviedo / Gij├│n, cl├íusulas LAU empresarial y tanteo ante venta.',
    },
    mercadoIntro:
      'Propietarios particulares alquilan bajos comerciales en Asturias sin contrato LAU empresarial y asumen riesgos en obras, IAE y devoluci├│n de local.',
    zonasIntro: 'Servicio en Asturias capital y ├írea metropolitana.',
    zonas: ['Centro', 'Ensanche', 'Pol├¡gono comercial', 'Zona residencial-comercial'],
    rentaEjemploMensual: 850,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos comerciales sin agencia',
      'Aut├│nomos que formalizan arrendamiento de local',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato cubre locales entre particulares en Asturias?',
        a: 'S├¡. Redactamos contrato LAU de local conforme al T├¡tulo III, con cl├íusulas de renta, obras y devoluci├│n.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad ÔÇö Ayuntamiento de Oviedo / Gij├│n',
      'IAE seg├║n ep├¡grafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Asturias desde 145Ôé¼',
      description:
        'Alquiler de local comercial en Asturias entre particulares. 145Ôé¼ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial asturias, alquilar local asturias, arrendamiento local asturias',
      ogTitle: 'Alquiler Local Comercial Asturias ÔÇö 145Ôé¼',
      ogDescription: 'Locales comerciales en Asturias entre particulares. Gestor├¡a Inmonest.',
    },
  },

  santander: {
    slug: 'santander',
    nombre: 'Santander',
    region: 'Cantabria',
    testimoniosLanding: 'alquiler-local-comercial-santander',
    heroImage: getCiudadImage('santander').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario ┬À Locales comerciales en Santander',
      bio: 'Asesora alquileres de local entre particulares en Santander. Licencias del Ayuntamiento de Santander, cl├íusulas LAU empresarial y tanteo ante venta.',
    },
    mercadoIntro:
      'Propietarios particulares alquilan bajos comerciales en Santander sin contrato LAU empresarial y asumen riesgos en obras, IAE y devoluci├│n de local.',
    zonasIntro: 'Servicio en Santander capital y ├írea metropolitana.',
    zonas: ['Centro', 'Ensanche', 'Pol├¡gono comercial', 'Zona residencial-comercial'],
    rentaEjemploMensual: 850,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos comerciales sin agencia',
      'Aut├│nomos que formalizan arrendamiento de local',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato cubre locales entre particulares en Santander?',
        a: 'S├¡. Redactamos contrato LAU de local conforme al T├¡tulo III, con cl├íusulas de renta, obras y devoluci├│n.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad ÔÇö Ayuntamiento de Santander',
      'IAE seg├║n ep├¡grafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Santander desde 145Ôé¼',
      description:
        'Alquiler de local comercial en Santander entre particulares. 145Ôé¼ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial santander, alquilar local santander, arrendamiento local santander',
      ogTitle: 'Alquiler Local Comercial Santander ÔÇö 145Ôé¼',
      ogDescription: 'Locales comerciales en Santander entre particulares. Gestor├¡a Inmonest.',
    },
  },

  vitoria: {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    region: 'Pa├¡s Vasco',
    testimoniosLanding: 'alquiler-local-comercial-vitoria',
    heroImage: getCiudadImage('vitoria').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario ┬À Locales comerciales en Vitoria-Gasteiz',
      bio: 'Asesora alquileres de local entre particulares en Vitoria-Gasteiz. Licencias del Ayuntamiento de Vitoria-Gasteiz, cl├íusulas LAU empresarial y tanteo ante venta.',
    },
    mercadoIntro:
      'Propietarios particulares alquilan bajos comerciales en Vitoria-Gasteiz sin contrato LAU empresarial y asumen riesgos en obras, IAE y devoluci├│n de local.',
    zonasIntro: 'Servicio en Vitoria-Gasteiz capital y ├írea metropolitana.',
    zonas: ['Centro', 'Ensanche', 'Pol├¡gono comercial', 'Zona residencial-comercial'],
    rentaEjemploMensual: 850,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos comerciales sin agencia',
      'Aut├│nomos que formalizan arrendamiento de local',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato cubre locales entre particulares en Vitoria-Gasteiz?',
        a: 'S├¡. Redactamos contrato LAU de local conforme al T├¡tulo III, con cl├íusulas de renta, obras y devoluci├│n.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad ÔÇö Ayuntamiento de Vitoria-Gasteiz',
      'IAE seg├║n ep├¡grafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial Vitoria-Gasteiz desde 145Ôé¼',
      description:
        'Alquiler de local comercial en Vitoria-Gasteiz entre particulares. 145Ôé¼ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial vitoria, alquilar local vitoria, arrendamiento local vitoria',
      ogTitle: 'Alquiler Local Comercial Vitoria-Gasteiz ÔÇö 145Ôé¼',
      ogDescription: 'Locales comerciales en Vitoria-Gasteiz entre particulares. Gestor├¡a Inmonest.',
    },
  },

  'san-sebastian': {
    slug: 'san-sebastian',
    nombre: 'San Sebasti├ín',
    region: 'Pa├¡s Vasco',
    testimoniosLanding: 'alquiler-local-comercial-san-sebastian',
    heroImage: getCiudadImage('san-sebastian').src,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      rol: 'Gestor inmobiliario ┬À Locales comerciales en San Sebasti├ín',
      bio: 'Asesora alquileres de local entre particulares en San Sebasti├ín. Licencias del Ayuntamiento de San Sebasti├ín, cl├íusulas LAU empresarial y tanteo ante venta.',
    },
    mercadoIntro:
      'Propietarios particulares alquilan bajos comerciales en San Sebasti├ín sin contrato LAU empresarial y asumen riesgos en obras, IAE y devoluci├│n de local.',
    zonasIntro: 'Servicio en San Sebasti├ín capital y ├írea metropolitana.',
    zonas: ['Centro', 'Ensanche', 'Pol├¡gono comercial', 'Zona residencial-comercial'],
    rentaEjemploMensual: 850,
    localesGestionados: 8,
    paraQuienExtra: [
      'Propietarios de bajos comerciales sin agencia',
      'Aut├│nomos que formalizan arrendamiento de local',
    ],
    faqExtra: [
      {
        q: '┬┐El contrato cubre locales entre particulares en San Sebasti├ín?',
        a: 'S├¡. Redactamos contrato LAU de local conforme al T├¡tulo III, con cl├íusulas de renta, obras y devoluci├│n.',
      },
    ],
    regulacionLocal: [
      'Licencia de actividad ÔÇö Ayuntamiento de San Sebasti├ín',
      'IAE seg├║n ep├¡grafe del arrendatario',
      'Registro de la Propiedad si aplica por renta anual',
    ],
    meta: {
      title: 'Contrato alquiler local comercial San Sebasti├ín desde 145Ôé¼',
      description:
        'Alquiler de local comercial en San Sebasti├ín entre particulares. 145Ôé¼ IVA incl. Entrega 48h.',
      keywords:
        'contrato alquiler local comercial san-sebastian, alquilar local san-sebastian, arrendamiento local san-sebastian',
      ogTitle: 'Alquiler Local Comercial San Sebasti├ín ÔÇö 145Ôé¼',
      ogDescription: 'Locales comerciales en San Sebasti├ín entre particulares. Gestor├¡a Inmonest.',
    },
  },

  castellon: CASTELLON_LOCAL_COMERCIAL,
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
