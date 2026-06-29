/** Config for the Bilbao-style premium landing (/[ciudad]/contrato-alquiler). */
export type ContratoAlquilerPremiumAreaType = 'City' | 'State' | 'AdministrativeArea'

export type ContratoAlquilerPremiumConfig = {
  slug: string
  nombre: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    ogImageAlt: string
    twitterTitle?: string
    twitterDescription?: string
  }
  particularidadesRegionales?: {
    titulo: string
    secciones: { titulo: string; contenido: string; bullets?: string[] }[]
  }
  schema: {
    serviceName: string
    serviceDescription: string
    areaType: ContratoAlquilerPremiumAreaType
    areaName: string
  }
  heroImageAlt: string
  breadcrumbFinal: string
  badgeLine: string
  ctaStickyLabel: string
  introLargo: string
  alertaTitulo: string
  paraQuienTitulo: string
  paraQuien: [string, string, string, string]
  faqs: { q: string; a: string }[]
}

const PRECIO = '120'

const INCLUYE = [
  'Adaptado a la Ley de Vivienda 2026 y LAU vigente',
  'Cláusulas de actualización de renta (IPC limitado)',
  'Fianza legal y garantías adicionales opcionales',
  'Anexo de inventario de mobiliario y estado del inmueble',
  'Régimen de obras, mascotas y subarrendamiento',
  'Entrega en PDF firmable digitalmente en 48h',
] as const

const PASOS = [
  { num: '01', titulo: 'Solicita el contrato', desc: 'Facilita los datos del propietario, inquilino, piso y condiciones económicas. El formulario es guiado y claro.' },
  { num: '02', titulo: 'Redacción personalizada', desc: 'Nuestro equipo de gestoría redacta un contrato a medida, verificando que todas las cláusulas cumplen la legislación vigente.' },
  { num: '03', titulo: 'Listo para firmar', desc: 'Recibes el contrato PDF en 48h, firmable digitalmente. El inventario de mobiliario se incluye como anexo.' },
] as const

export const CONTRATO_ALQUILER_PREMIUM_INCLUDES = INCLUYE
export const CONTRATO_ALQUILER_PREMIUM_PASOS = PASOS
export const CONTRATO_ALQUILER_PREMIUM_PRECIO = PRECIO

const rentaAnswer =
  'Desde 2024, los grandes tenedores están limitados al IPC negociado (máx. 3%). Para pequeños propietarios, el límite es el IPC + 2%. Nuestro contrato incorpora la fórmula correcta según tu caso.'

const duracionFaq = {
  q: '¿Cuánto tiempo dura el contrato de alquiler mínimo?',
  a: 'La LAU establece una duración mínima de 5 años para personas físicas y 7 para personas jurídicas, con prórrogas tácitas anuales. Puedes acordar duraciones superiores pero no inferiores.',
}

const zonaFaq = {
  q: '¿El contrato sirve si el piso está en zona tensionada?',
  a: 'Sí. Adaptamos el contrato a la regulación específica de zonas tensionadas donde aplican límites adicionales de precio. Consultamos caso por caso.',
}

function faqPack(ciudad: string, fianzaQ: string, fianzaA: string, coberturaQ: string, coberturaA: string) {
  return [
    { q: `¿Cuánto puede actualizarse el alquiler cada año en ${ciudad}?`, a: rentaAnswer },
    duracionFaq,
    { q: fianzaQ, a: fianzaA },
    { q: coberturaQ, a: coberturaA },
    zonaFaq,
  ]
}

export const CONTRATO_ALQUILER_PREMIUM: Record<string, ContratoAlquilerPremiumConfig> = {
  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    meta: {
      title: 'Contrato de Alquiler Bilbao 120€ | LAU · Entrega 48h | Inmonest',
      description:
        'Contrato de alquiler LAU en Bilbao por 120€. Entrega 48h, Ley Vivienda 2026. Válido en Bizkaia, Getxo, Barakaldo y País Vasco. Redactado por abogados, no plantilla.',
      keywords: [
        'contratar contrato alquiler Bilbao',
        'comprar contrato alquiler Bilbao',
        'solicitar contrato alquiler LAU País Vasco',
        'precio contrato alquiler Bilbao',
        'gestoría contrato alquiler Bizkaia',
      ],
      ogTitle: '¿Redactar contrato de alquiler en Bilbao? 120 €, entrega 48 h | Inmonest',
      ogDescription:
        '¿Necesitas redactar el contrato? Te lo dejamos listo en 48h por 120€. LAU y Ley Vivienda 2026, sin letra pequeña.',
      ogImageAlt: 'Contrato de alquiler Bilbao',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Bilbao',
      serviceDescription:
        'Redacción de contrato de alquiler de vivienda en Bilbao y País Vasco. Adaptado a LAU y Ley de Vivienda 2026. Gestoría inmobiliaria experta.',
      areaType: 'City',
      areaName: 'Bilbao',
    },
    heroImageAlt: 'Contrato de alquiler en Bilbao',
    breadcrumbFinal: 'Contrato de Alquiler Bilbao',
    badgeLine: 'Alquiler · Bilbao',
    ctaStickyLabel: 'Alquiler · Bilbao',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la Ley de Arrendamientos Urbanos (LAU) y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En Bilbao y el País Vasco (Getxo, Barakaldo, Portugalete, San Sebastián, Vitoria), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley.',
    alertaTitulo: 'Vas a firmar un alquiler en Bilbao: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Bilbao?',
    paraQuien: [
      'Propietarios en Bilbao que van a alquilar su piso por primera vez',
      'Arrendadores que tienen contratos antiguos y quieren actualizarlos',
      'Inquilinos que quieren revisar las condiciones antes de firmar',
      'Cualquier alquiler de vivienda habitual de larga duración en el País Vasco',
    ],
    faqs: [
      {
        q: '¿Cuánto puede actualizarse el alquiler cada año en Bilbao?',
        a: 'Desde 2024, los grandes tenedores están limitados al IPC negociado (máx. 3%). Para pequeños propietarios en Bilbao y Bizkaia, el límite es el IPC + 2%. Nuestro contrato incorpora la fórmula correcta según tu caso.',
      },
      duracionFaq,
      {
        q: '¿Qué fianza es obligatoria en el País Vasco?',
        a: 'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico del País Vasco. Adicionalmente, propietario e inquilino pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
      },
      {
        q: '¿El contrato es válido en todo el País Vasco?',
        a: 'Sí, el contrato de alquiler LAU es válido en todo el País Vasco (Bilbao, Getxo, Barakaldo, Portugalete, San Sebastián, Vitoria). Se adapta a la legislación estatal y autonómica vigente.',
      },
      zonaFaq,
    ],
  },

  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Madrid? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en Madrid? LAU + Ley Vivienda 2026, 48h, precio cerrado 120€. Madrid capital y Comunidad de Madrid.',
      keywords: ['contrato alquiler Madrid', 'LAU Madrid', 'contrato arrendamiento Madrid', 'gestoría alquiler Madrid', 'alquiler vivienda Madrid 2026'],
      ogTitle: '¿Redactar contrato de alquiler en Madrid? 120 €, 48 h | Inmonest',
      ogDescription: 'Contrato LAU en Madrid. 120 €, entrega 48 h, sin plantillas genéricas.',
      ogImageAlt: 'Contrato de alquiler Madrid',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Madrid',
      serviceDescription: 'Redacción de contrato de alquiler de vivienda en Madrid y Comunidad de Madrid. LAU y Ley de Vivienda 2026.',
      areaType: 'City',
      areaName: 'Madrid',
    },
    heroImageAlt: 'Contrato de alquiler en Madrid',
    breadcrumbFinal: 'Contrato de Alquiler Madrid',
    badgeLine: 'Alquiler · Madrid',
    ctaStickyLabel: 'Alquiler · Madrid',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la LAU y la Ley de Vivienda con actualizaciones de 2026. En Madrid y la Comunidad de Madrid, un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, disputas por la fianza o problemas al recuperar la vivienda. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen los derechos del inquilino.',
    alertaTitulo: 'Vas a firmar un alquiler en Madrid: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Madrid?',
    paraQuien: [
      'Propietarios en Madrid que van a alquilar su piso por primera vez',
      'Arrendadores con contratos antiguos que quieren actualizarlos',
      'Inquilinos que quieren condiciones claras antes de firmar',
      'Alquileres de vivienda habitual de larga duración en Madrid y alrededores',
    ],
    faqs: faqPack(
      'Madrid',
      '¿Dónde se deposita la fianza en la Comunidad de Madrid?',
      'La fianza legal (una mensualidad) debe depositarse en el organismo público que corresponda según la normativa de la Comunidad de Madrid. El contrato puede incluir garantías adicionales hasta el límite legal.',
      '¿El contrato sirve en toda la Comunidad de Madrid?',
      'Sí. El contrato LAU es válido en Madrid capital y municipios de la Comunidad de Madrid, adaptado a la legislación estatal y autonómica vigente.',
    ),
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Barcelona? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en Barcelona? LAU, zonas tensionadas e índice de referencia. 48h, 120€. Barcelona y área metropolitana.',
      keywords: ['contrato alquiler Barcelona', 'LAU Barcelona', 'zona tensionada alquiler', 'INCASOL fianza', 'contrato arrendamiento Barcelona'],
      ogTitle: 'Contrato alquiler Barcelona — 120 €, 48 h | Inmonest',
      ogDescription: 'LAU + Ley Vivienda 2026. Adaptado a normativa catalana y zonas tensionadas cuando aplique.',
      ogImageAlt: 'Contrato de alquiler Barcelona',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Barcelona',
      serviceDescription: 'Redacción de contrato de alquiler en Barcelona y Cataluña. LAU, Ley de Vivienda 2026 e Índice de Referencia de Precios cuando proceda.',
      areaType: 'City',
      areaName: 'Barcelona',
    },
    heroImageAlt: 'Contrato de alquiler en Barcelona',
    breadcrumbFinal: 'Contrato de Alquiler Barcelona',
    badgeLine: 'Alquiler · Barcelona',
    ctaStickyLabel: 'Alquiler · Barcelona',
    introLargo:
      'En Barcelona y el área metropolitana, además de la LAU y la Ley de Vivienda 2026, pueden aplicarse reglas de zonas tensionadas y el índice de referencia de precios. Un contrato genérico no cubre estos matices. Nosotros redactamos un documento personalizado que refleja la normativa vigente y reduce riesgos para propietario e inquilino.',
    alertaTitulo: 'Vas a firmar un alquiler en Barcelona: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Barcelona?',
    paraQuien: [
      'Propietarios en Barcelona que alquilan por primera vez o renovaron la normativa',
      'Inquilinos que negocian en zona tensionada o con gran tenedor',
      'Quien necesita cláusulas de actualización de renta conformes a la ley',
      'Alquileres de vivienda habitual de larga duración en Barcelona y cinturón',
    ],
    faqs: faqPack(
      'Barcelona',
      '¿Qué fianza es obligatoria en Cataluña?',
      'La fianza legal es de una mensualidad y debe depositarse según la normativa catalana (por ejemplo INCASÒL en los casos aplicables). Además se pueden pactar garantías adicionales dentro de los límites legales.',
      '¿El contrato es válido en Cataluña?',
      'Sí, en Barcelona y resto de Cataluña, incorporando cuando toque las menciones propias de zonas tensionadas o índice de referencia.',
    ),
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Valencia? 120 € · 48 h | Inmonest',
      description:
        'Contrato de alquiler LAU en Valencia y Comunitat Valenciana. 48h, precio cerrado 120€. Ley de Vivienda 2026.',
      keywords: ['contrato alquiler Valencia', 'LAU Valencia', 'IVIMA fianza', 'arrendamiento Valencia'],
      ogTitle: 'Contrato alquiler Valencia — 120 € | Inmonest',
      ogDescription: 'Redacción LAU en Valencia. 48 h, PDF firmable.',
      ogImageAlt: 'Contrato de alquiler Valencia',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Valencia',
      serviceDescription: 'Contrato de alquiler en Valencia y Comunitat Valenciana conforme a LAU y Ley de Vivienda 2026.',
      areaType: 'City',
      areaName: 'Valencia',
    },
    heroImageAlt: 'Contrato de alquiler en Valencia',
    breadcrumbFinal: 'Contrato de Alquiler Valencia',
    badgeLine: 'Alquiler · Valencia',
    ctaStickyLabel: 'Alquiler · Valencia',
    introLargo:
      'El arrendamiento de vivienda habitual en Valencia y la Comunitat Valenciana se rige por la LAU y la Ley de Vivienda. La fianza y la actualización de renta deben constar correctamente para evitar reclamaciones. Redactamos tu contrato a medida con las cláusulas que exige la normativa estatal y el marco autonómico.',
    alertaTitulo: 'Vas a firmar un alquiler en Valencia: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Valencia?',
    paraQuien: [
      'Propietarios en Valencia que alquilan su vivienda',
      'Arrendadores que actualizan un contrato antiguo a la Ley de Vivienda 2026',
      'Inquilinos que quieren seguridad antes de firmar',
      'Alquileres de larga duración en Valencia y provincia',
    ],
    faqs: faqPack(
      'Valencia',
      '¿Dónde va la fianza en la Comunitat Valenciana?',
      'La fianza legal de una mensualidad debe ingresarse en el organismo autonómico de la Generalitat Valenciana según la normativa vigente. Las garantías adicionales deben respetar los límites legales.',
      '¿Sirve en toda la Comunitat Valenciana?',
      'Sí. El contrato LAU es válido en Valencia capital y resto de la Comunitat Valenciana, con las adaptaciones que correspondan.',
    ),
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Sevilla? 120 € · 48 h | Inmonest',
      description: 'Contrato LAU en Sevilla y Andalucía. 120€, entrega 48h. Ley de Vivienda 2026.',
      keywords: ['contrato alquiler Sevilla', 'LAU Sevilla', 'AVRA fianza', 'arrendamiento Sevilla'],
      ogTitle: 'Contrato alquiler Sevilla — 120 € | Inmonest',
      ogDescription: 'Redacción profesional de contrato de alquiler en Sevilla. LAU actualizada.',
      ogImageAlt: 'Contrato de alquiler Sevilla',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Sevilla',
      serviceDescription: 'Contrato de alquiler en Sevilla y Andalucía. AVRA y normativa autonómica cuando aplique.',
      areaType: 'City',
      areaName: 'Sevilla',
    },
    heroImageAlt: 'Contrato de alquiler en Sevilla',
    breadcrumbFinal: 'Contrato de Alquiler Sevilla',
    badgeLine: 'Alquiler · Sevilla',
    ctaStickyLabel: 'Alquiler · Sevilla',
    introLargo:
      'En Sevilla y Andalucía, la LAU y la Ley de Vivienda marcan duración mínima, actualización de renta y fianza. Un contrato improvisado genera litigios costosos. Te entregamos un documento personalizado, con cláusulas de fianza, IPC/índices aplicables y régimen de la vivienda conforme a la ley.',
    alertaTitulo: 'Vas a firmar un alquiler en Sevilla: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Sevilla?',
    paraQuien: [
      'Propietarios en Sevilla que van a alquilar por primera vez',
      'Quien renueva contrato y necesita ajustarlo a 2026',
      'Inquilinos que quieren blindar condiciones antes de la firma',
      'Alquileres de vivienda habitual en Sevilla y Andalucía',
    ],
    faqs: faqPack(
      'Sevilla',
      '¿Qué fianza es obligatoria en Andalucía?',
      'Una mensualidad como fianza legal mínima, con ingreso en el organismo autonómico (AVRA) según la normativa aplicable. Hasta dos mensualidades adicionales en garantías si la ley lo permite en tu supuesto.',
      '¿El contrato vale en toda Andalucía?',
      'Sí. Es válido en Sevilla y resto de Andalucía con la legislación estatal y las particularidades autonómicas.',
    ),
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    meta: {
      title: 'Contrato de Alquiler Málaga 120€ | LAU · Entrega 48h | Inmonest',
      description:
        'Contrato de alquiler LAU en Málaga por 120€. Entrega 48h, Ley Vivienda 2026. Para propietarios e inquilinos en Málaga, Costa del Sol y provincia. Sin plantillas genéricas.',
      keywords: ['contrato alquiler Málaga', 'LAU Málaga', 'alquiler piso Málaga', 'contrato arrendamiento'],
      ogTitle: 'Contrato alquiler Málaga — 120 € | Inmonest',
      ogDescription: 'Contrato de alquiler personalizado en Málaga. LAU + 2026.',
      ogImageAlt: 'Contrato de alquiler Málaga',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Málaga',
      serviceDescription: 'Redacción de contrato de alquiler en Málaga y Andalucía.',
      areaType: 'City',
      areaName: 'Málaga',
    },
    heroImageAlt: 'Contrato de alquiler en Málaga',
    breadcrumbFinal: 'Contrato de Alquiler Málaga',
    badgeLine: 'Alquiler · Málaga',
    ctaStickyLabel: 'Alquiler · Málaga',
    introLargo:
      'Málaga y la Costa del Sol mueven mucho alquiler residencial. La LAU y la Ley de Vivienda exigen cláusulas precisas sobre renta, duración y fianza. Redactamos tu contrato con foco en propietario e inquilino, sin sorpresas legales.',
    alertaTitulo: 'Vas a firmar un alquiler en Málaga: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Málaga?',
    paraQuien: [
      'Propietarios en Málaga que alquilan vivienda habitual',
      'Inversores o segundas residencias que arriendan con LAU',
      'Inquilinos que negocian condiciones claras',
      'Alquileres de larga duración en Málaga y provincia',
    ],
    faqs: faqPack(
      'Málaga',
      '¿Qué fianza es obligatoria en Andalucía?',
      'Una mensualidad como fianza legal mínima, con ingreso en AVRA cuando proceda, y garantías adicionales dentro del límite legal.',
      '¿Vale en toda Andalucía?',
      'Sí, en Málaga y el resto de Andalucía según legislación vigente.',
    ),
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Zaragoza? 120 € · 48 h | Inmonest',
      description: 'Contrato LAU en Zaragoza y Aragón. 120€ fijos, entrega 48h.',
      keywords: ['contrato alquiler Zaragoza', 'LAU Zaragoza', 'arrendamiento vivienda Zaragoza'],
      ogTitle: 'Contrato alquiler Zaragoza — 120 € | Inmonest',
      ogDescription: 'Contrato personalizado LAU en Zaragoza.',
      ogImageAlt: 'Contrato de alquiler Zaragoza',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Zaragoza',
      serviceDescription: 'Redacción de contrato de alquiler en Zaragoza y Aragón.',
      areaType: 'City',
      areaName: 'Zaragoza',
    },
    heroImageAlt: 'Contrato de alquiler en Zaragoza',
    breadcrumbFinal: 'Contrato de Alquiler Zaragoza',
    badgeLine: 'Alquiler · Zaragoza',
    ctaStickyLabel: 'Alquiler · Zaragoza',
    introLargo:
      'En Zaragoza y Aragón, el alquiler de vivienda habitual sigue la LAU y la Ley de Vivienda. Te ayudamos con un contrato que cubra fianza, actualización de renta, duración y entrega del piso sin lagunas legales.',
    alertaTitulo: 'Vas a firmar un alquiler en Zaragoza: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Zaragoza?',
    paraQuien: [
      'Propietarios en Zaragoza capital y provincia',
      'Arrendadores que modernizan contrato a la normativa 2026',
      'Inquilinos que piden un documento serio antes de firmar',
      'Alquileres LAU de larga duración en Aragón',
    ],
    faqs: faqPack(
      'Zaragoza',
      '¿Dónde se deposita la fianza en Aragón?',
      'La fianza legal de una mensualidad debe ingresarse en el organismo autonómico aragonés según la normativa vigente.',
      '¿El contrato sirve en toda Aragón?',
      'Sí, en Zaragoza y el resto de Aragón, con adaptación a normativa estatal y autonómica.',
    ),
  },

  alicante: {
    slug: 'alicante',
    nombre: 'Alicante',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Alicante? 120 € · 48 h | Inmonest',
      description: 'Contrato LAU en Alicante y Comunitat Valenciana. 120€, 48h.',
      keywords: ['contrato alquiler Alicante', 'LAU Alicante', 'arrendamiento Alicante', 'torrevieja alquiler contrato'],
      ogTitle: 'Contrato alquiler Alicante — 120 € | Inmonest',
      ogDescription: 'Redacción LAU profesional en Alicante.',
      ogImageAlt: 'Contrato de alquiler Alicante',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Alicante',
      serviceDescription: 'Contrato de alquiler en Alicante y Comunitat Valenciana.',
      areaType: 'City',
      areaName: 'Alicante',
    },
    heroImageAlt: 'Contrato de alquiler en Alicante',
    breadcrumbFinal: 'Contrato de Alquiler Alicante',
    badgeLine: 'Alquiler · Alicante',
    ctaStickyLabel: 'Alquiler · Alicante',
    introLargo:
      'Alicante y la provincia concentran mucho alquiler turístico residencial mezclado con vivienda habitual. El contrato LAU debe dejar claro el uso, la renta, la fianza y la actualización conforme a la Ley de Vivienda 2026. Lo redactamos a tu medida.',
    alertaTitulo: 'Vas a firmar un alquiler en Alicante: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Alicante?',
    paraQuien: [
      'Propietarios en Alicante ciudad y provincia',
      'Alquiler de vivienda habitual (no confundir con uso turístico)',
      'Inquilinos que necesitan claridad legal',
      'Operaciones LAU de larga duración en la Comunitat Valenciana',
    ],
    faqs: faqPack(
      'Alicante',
      '¿Dónde va la fianza en la Comunitat Valenciana?',
      'La fianza de una mensualidad debe ingresarse en el organismo autonómico valenciano según la normativa aplicable.',
      '¿Sirve en toda la Comunitat Valenciana?',
      'Sí, incluida Alicante, Elche, Benidorm y resto de municipios bajo el mismo marco autonómico.',
    ),
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Murcia? 120 € · 48 h | Inmonest',
      description: 'Contrato LAU en Murcia y Región de Murcia. 120€, entrega 48h. Ley de Vivienda 2026.',
      keywords: ['contrato alquiler Murcia', 'LAU Murcia', 'arrendamiento Cartagena', 'alquiler vivienda Región Murcia'],
      ogTitle: 'Contrato alquiler Murcia — 120 € | Inmonest',
      ogDescription: 'Contrato LAU personalizado en Murcia y la región.',
      ogImageAlt: 'Contrato de alquiler Murcia',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Murcia',
      serviceDescription: 'Contrato de alquiler en Murcia y Región de Murcia.',
      areaType: 'City',
      areaName: 'Murcia',
    },
    heroImageAlt: 'Contrato de alquiler en Murcia',
    breadcrumbFinal: 'Contrato de Alquiler Murcia',
    badgeLine: 'Alquiler · Murcia',
    ctaStickyLabel: 'Alquiler · Murcia',
    introLargo:
      'Murcia y la Región concentran mucho alquiler residencial y estudiantil. La LAU y la Ley de Vivienda marcan los límites de renta, duración y fianza. Te entregamos un contrato que cuadra con la normativa estatal y autonómica, sin lagunas que acaben en pleito.',
    alertaTitulo: 'Vas a firmar un alquiler en Murcia: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Murcia?',
    paraQuien: [
      'Propietarios en Murcia capital y municipios de la región',
      'Quien alquila en Cartagena, Lorca o áreas metropolitanas',
      'Inquilinos que piden condiciones claras y legales',
      'Alquileres de vivienda habitual de larga duración',
    ],
    faqs: faqPack(
      'Murcia',
      '¿Dónde se deposita la fianza en la Región de Murcia?',
      'La fianza legal de una mensualidad debe ingresarse en el organismo público competente de la Comunidad Autónoma según la normativa vigente.',
      '¿El contrato vale en toda la Región de Murcia?',
      'Sí, en Murcia capital y municipios de la región, con la legislación estatal y las particularidades autonómicas.',
    ),
  },

  palma: {
    slug: 'palma',
    nombre: 'Palma',
    meta: {
      title: 'Contrato de Alquiler en Palma y Baleares | LAU 2026 desde 120€',
      description:
        'Contrato de alquiler LAU en Palma e Illes Balears. 120€ IVA incluido, entrega en 48h. Adaptado a Ley de Vivienda 2026, normativa balear de fianzas y zonas tensionadas. Válido en Mallorca, Menorca, Ibiza y Formentera.',
      keywords: ['contrato alquiler Palma', 'LAU Mallorca', 'arrendamiento Baleares', 'contrato alquiler Ibiza'],
      ogTitle: 'Contrato de Alquiler en Palma y Baleares | LAU 2026 desde 120€ | Inmonest',
      ogDescription:
        'Contrato de alquiler LAU para Palma y las Illes Balears. Adaptado a la Ley de Vivienda 2026, regulación balear de fianzas y zonas tensionadas. 120€ IVA incluido. Entrega en 48h.',
      ogImageAlt: 'Contrato de alquiler Palma y Baleares',
      twitterTitle: 'Contrato de Alquiler en Palma y Baleares | 120€ | Inmonest',
      twitterDescription:
        'Contrato LAU personalizado para Mallorca, Menorca, Ibiza y Formentera. Adaptado a normativa balear, fianza y zonas tensionadas. Entrega 48h.',
    },
    schema: {
      serviceName: 'Contrato de Alquiler LAU Palma y Baleares',
      serviceDescription: 'Contrato de alquiler LAU para Palma y las Illes Balears.',
      areaType: 'State',
      areaName: 'Illes Balears',
    },
    heroImageAlt: 'Contrato de alquiler en Palma',
    breadcrumbFinal: 'Contrato de Alquiler Palma',
    badgeLine: 'Alquiler · Palma',
    ctaStickyLabel: 'Alquiler · Palma',
    introLargo:
      'En Palma y las Illes Balears el alquiler de vivienda habitual sigue la LAU y la Ley de Vivienda, con matices autonómicos en fianza y publicidad de precios. Un modelo descargado no refleja siempre esos requisitos. Redactamos el contrato con cláusulas de renta, duración y garantías conforme a 2026.',
    alertaTitulo: 'Vas a firmar un alquiler en Palma: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Palma?',
    paraQuien: [
      'Propietarios en Palma, Calvià, Manacor y resto de Mallorca',
      'Alquiler en Menorca, Eivissa o Formentera con marco LAU',
      'Inquilinos que negocian temporada larga o vivienda habitual',
      'Arrendamientos de larga duración en Balears',
    ],
    faqs: faqPack(
      'Palma',
      '¿Dónde se deposita la fianza en las Illes Balears?',
      "En las Illes Balears la fianza legal de una mensualidad debe depositarse en el Institut Balear de l'Habitatge (IBAVI). El propietario tiene 30 días desde la firma del contrato para realizar el depósito. El incumplimiento puede acarrear sanciones. Nuestros contratos incluyen las cláusulas correctas de depósito y referencia al IBAVI.",
      '¿El contrato es válido en todas las islas?',
      'Sí, en Mallorca, Menorca, Ibiza y Formentera, con adaptación a normativa estatal y autonómica.',
    ),
    particularidadesRegionales: {
      titulo: 'Particularidades del alquiler en Baleares (2026)',
      secciones: [
        {
          titulo: 'Regulación de zonas tensionadas en Baleares',
          contenido:
            'Palma de Mallorca está declarada zona tensionada. Los contratos de alquiler en Palma deben respetar el índice de referencia de precios del Govern Balear. Los propietarios considerados grandes tenedores (más de 10 inmuebles) tienen limitaciones adicionales de precio. Nuestros contratos ya incluyen las cláusulas obligatorias para zonas tensionadas.',
        },
        {
          titulo: 'Alquiler habitual vs alquiler turístico en Baleares',
          contenido:
            'Baleares tiene la regulación de vivienda turística más restrictiva de España. Desde 2017 existe una moratoria de nuevas licencias de alquiler turístico (ETV) en Mallorca e Ibiza. Un contrato de alquiler habitual (LAU) y uno de alquiler turístico son documentos completamente distintos — el LAU no sirve para alquilar a turistas ni en plataformas como Airbnb. Si tienes dudas sobre qué tipo de contrato necesitas, consúltanos antes de firmar.',
        },
        {
          titulo: 'Diferencias por isla',
          contenido: 'Cada isla tiene matices distintos en demanda y normativa:',
          bullets: [
            'Mallorca: Mayor regulación, muchas zonas tensionadas, moratoria ETV activa.',
            'Menorca: Mercado más pequeño, normativa LAU estándar con matices insulares.',
            'Ibiza y Formentera: Alta demanda de alquiler temporal. Los contratos de temporada (no LAU) son muy frecuentes — tienen normativa diferente y plazos distintos.',
          ],
        },
      ],
    },
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Pamplona? 120 € · 48 h | Inmonest',
      description: 'Contrato LAU en Pamplona y Navarra. 120€, 48h. Ley de Vivienda 2026.',
      keywords: ['contrato alquiler Pamplona', 'LAU Navarra', 'arrendamiento Iruña'],
      ogTitle: 'Contrato alquiler Pamplona — 120 € | Inmonest',
      ogDescription: 'Contrato LAU en Navarra.',
      ogImageAlt: 'Contrato de alquiler Pamplona',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Pamplona',
      serviceDescription: 'Contrato de alquiler en Pamplona y Navarra.',
      areaType: 'City',
      areaName: 'Pamplona',
    },
    heroImageAlt: 'Contrato de alquiler en Pamplona',
    breadcrumbFinal: 'Contrato de Alquiler Pamplona',
    badgeLine: 'Alquiler · Pamplona',
    ctaStickyLabel: 'Alquiler · Pamplona',
    introLargo:
      'Pamplona y Navarra suman demanda de alquiler estable. El contrato LAU debe recoger correctamente fianza, revisión de renta y obligaciones de ambas partes. Redactamos el tuyo conforme a la legislación estatal y particularidades forales que afecten a la práctica del arrendamiento.',
    alertaTitulo: 'Vas a firmar un alquiler en Pamplona: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Pamplona?',
    paraQuien: [
      'Propietarios en Pamplona-Iruña y cuenca',
      'Arrendadores en Tudela y resto de Navarra',
      'Inquilinos que negocian contrato largo',
      'Alquileres de vivienda habitual',
    ],
    faqs: faqPack(
      'Pamplona',
      '¿Dónde se deposita la fianza en Navarra?',
      'La fianza legal de una mensualidad debe gestionarse según la normativa aplicable en Navarra y el régimen foral cuando incida en el supuesto.',
      '¿El contrato es válido en toda Navarra?',
      'Sí, en Pamplona y municipios navarros, adaptando el contrato al marco legal estatal y foral pertinente.',
    ),
  },

  asturias: {
    slug: 'asturias',
    nombre: 'Asturias',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Asturias? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en Asturias? LAU + Ley Vivienda 2026, 48h, 120€. Oviedo, Gijón, Avilés.',
      keywords: ['contratar contrato alquiler Asturias', 'comprar contrato alquiler Oviedo', 'solicitar contrato alquiler LAU Gijón', 'precio contrato alquiler Asturias', 'gestoría contrato alquiler Avilés'],
      ogTitle: '¿Redactar contrato de alquiler en Asturias? 120 €, entrega 48 h | Inmonest',
      ogDescription:
        '¿Necesitas redactar el contrato? Te lo dejamos listo en 48h por 120€. LAU y Ley Vivienda 2026, sin letra pequeña.',
      ogImageAlt: 'Contrato de alquiler Asturias',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Asturias',
      serviceDescription:
        'Redacción de contrato de alquiler de vivienda en Asturias. Adaptado a LAU y Ley de Vivienda 2026.',
      areaType: 'State',
      areaName: 'Asturias',
    },
    heroImageAlt: 'Contrato de alquiler en Asturias',
    breadcrumbFinal: 'Contrato de Alquiler Asturias',
    badgeLine: 'Alquiler · Asturias',
    ctaStickyLabel: 'Alquiler · Asturias',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la LAU y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En Asturias (Oviedo, Gijón, Avilés, Langreo, Mieres), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley.',
    alertaTitulo: 'Vas a firmar un alquiler en Asturias: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Asturias?',
    paraQuien: [
      'Propietarios en Asturias que van a alquilar su piso por primera vez',
      'Arrendadores que tienen contratos antiguos y quieren actualizarlos',
      'Inquilinos que quieren revisar las condiciones antes de firmar',
      'Cualquier alquiler de vivienda habitual de larga duración en Asturias',
    ],
    faqs: faqPack(
      'Asturias',
      '¿Qué fianza es obligatoria en Asturias?',
      'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de Asturias. Adicionalmente se pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
      '¿El contrato es válido en todo el Principado de Asturias?',
      'Sí, el contrato de alquiler LAU es válido en toda Asturias (Oviedo, Gijón, Avilés, Langreo, Mieres). Se adapta a la legislación estatal y autonómica vigente.',
    ),
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en A Coruña? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en A Coruña? LAU + Ley Vivienda 2026, 48h, 120€. Coruña, Santiago, Ferrol.',
      keywords: ['contratar contrato alquiler A Coruña', 'comprar contrato alquiler Galicia', 'solicitar contrato alquiler LAU Santiago', 'precio contrato alquiler A Coruña', 'gestoría contrato alquiler Ferrol'],
      ogTitle: '¿Redactar contrato de alquiler en A Coruña? 120 €, entrega 48 h | Inmonest',
      ogDescription:
        '¿Necesitas redactar el contrato? Te lo dejamos listo en 48h por 120€. LAU y Ley Vivienda 2026, sin letra pequeña.',
      ogImageAlt: 'Contrato de alquiler A Coruña',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en A Coruña',
      serviceDescription: 'Redacción de contrato de alquiler de vivienda en A Coruña y Galicia.',
      areaType: 'City',
      areaName: 'A Coruña',
    },
    heroImageAlt: 'Contrato de alquiler en A Coruña',
    breadcrumbFinal: 'Contrato de Alquiler A Coruña',
    badgeLine: 'Alquiler · A Coruña',
    ctaStickyLabel: 'Alquiler · A Coruña',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la LAU y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En A Coruña y Galicia (Santiago de Compostela, Ferrol, Vigo, Pontevedra, Lugo, Ourense), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley.',
    alertaTitulo: 'Vas a firmar un alquiler en A Coruña: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en A Coruña?',
    paraQuien: [
      'Propietarios en A Coruña que van a alquilar su piso por primera vez',
      'Arrendadores que tienen contratos antiguos y quieren actualizarlos',
      'Inquilinos que quieren revisar las condiciones antes de firmar',
      'Cualquier alquiler de vivienda habitual de larga duración en Galicia',
    ],
    faqs: faqPack(
      'A Coruña',
      '¿Qué fianza es obligatoria en Galicia?',
      'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de Galicia. Adicionalmente se pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
      '¿El contrato es válido en toda Galicia?',
      'Sí, el contrato de alquiler LAU es válido en toda Galicia (A Coruña, Santiago de Compostela, Ferrol, Vigo, Pontevedra, Lugo, Ourense). Se adapta a la legislación estatal y autonómica vigente.',
    ),
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Mallorca? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en Mallorca? LAU + Ley Vivienda 2026, 48h, precio cerrado 120€. Palma, Calvià, Manacor, Inca.',
      keywords: [
        'contrato alquiler Mallorca',
        'LAU Mallorca',
        'contrato arrendamiento Palma',
        'gestoría alquiler Baleares',
        'alquiler vivienda Mallorca 2026',
      ],
      ogTitle: '¿Redactar contrato de alquiler en Mallorca? 120 €, 48 h | Inmonest',
      ogDescription: 'Contrato LAU en Mallorca. 120 €, entrega 48 h, sin plantillas genéricas. Adaptado a Baleares.',
      ogImageAlt: 'Contrato de alquiler Mallorca',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Mallorca',
      serviceDescription:
        'Redacción de contrato de alquiler de vivienda en Mallorca y Baleares. Adaptado a LAU, Ley de Vivienda 2026 y normativa autonómica balear.',
      areaType: 'City',
      areaName: 'Mallorca',
    },
    heroImageAlt: 'Contrato de alquiler en Mallorca',
    breadcrumbFinal: 'Contrato de Alquiler Mallorca',
    badgeLine: 'Alquiler · Mallorca',
    ctaStickyLabel: 'Alquiler · Mallorca',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la Ley de Arrendamientos Urbanos (LAU) y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En Mallorca y las Islas Baleares (Palma, Calvià, Manacor, Inca, Alcúdia, Pollença), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Además, la regulación del alquiler turístico y estacional en Baleares requiere especial atención para diferenciar claramente el alquiler de vivienda habitual. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley.',
    alertaTitulo: 'Vas a firmar un alquiler en Mallorca: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Mallorca?',
    paraQuien: [
      'Propietarios en Mallorca que van a alquilar su piso de vivienda habitual por primera vez',
      'Arrendadores que tienen contratos antiguos y quieren actualizarlos a la normativa vigente',
      'Inquilinos que quieren revisar las condiciones antes de firmar',
      'Cualquier alquiler de vivienda habitual de larga duración en Baleares (NO turístico)',
    ],
    faqs: faqPack(
      'Mallorca',
      '¿Qué fianza es obligatoria en Baleares?',
      'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de las Islas Baleares (IBAVI). Adicionalmente, propietario e inquilino pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
      '¿El contrato es válido en toda Baleares?',
      'Sí, el contrato de alquiler LAU es válido en todas las Islas Baleares (Mallorca, Menorca, Ibiza, Formentera). Se adapta a la legislación estatal y autonómica vigente. Este contrato es exclusivamente para vivienda habitual de larga duración, NO para alquiler turístico o estacional.',
    ),
  },

  castellon: {
    slug: 'castellon',
    nombre: 'Castellón',
    meta: {
      title: '¿Necesitas redactar el contrato de alquiler en Castellón? 120 € · 48 h | Inmonest',
      description:
        '¿Necesitas redactar un contrato de alquiler en Castellón? LAU + Ley Vivienda 2026, 48h, precio cerrado 120€. Castellón ciudad, Benicàssim, Vila-real.',
      keywords: [
        'contrato alquiler Castellón',
        'LAU Castellón',
        'contrato arrendamiento Castelló',
        'gestoría alquiler Comunidad Valenciana',
        'alquiler vivienda Castellón 2026',
      ],
      ogTitle: '¿Redactar contrato de alquiler en Castellón? 120 €, 48 h | Inmonest',
      ogDescription: 'Contrato LAU en Castellón. 120 €, entrega 48 h, sin plantillas genéricas. Adaptado a la Comunidad Valenciana.',
      ogImageAlt: 'Contrato de alquiler Castellón',
    },
    schema: {
      serviceName: 'Contrato de Alquiler de Vivienda (LAU) en Castellón',
      serviceDescription:
        'Redacción de contrato de alquiler de vivienda en Castellón y Comunidad Valenciana. Adaptado a LAU, Ley de Vivienda 2026 y normativa autonómica valenciana.',
      areaType: 'City',
      areaName: 'Castellón',
    },
    heroImageAlt: 'Contrato de alquiler en Castellón',
    breadcrumbFinal: 'Contrato de Alquiler Castellón',
    badgeLine: 'Alquiler · Castellón',
    ctaStickyLabel: 'Alquiler · Castellón',
    introLargo:
      'El contrato de alquiler de vivienda habitual está regulado por la Ley de Arrendamientos Urbanos (LAU) y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En Castellón y la provincia de Castelló (Castellón de la Plana, Benicàssim, Vila-real, Burriana, Vinaròs, Peñíscola), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley, adaptados a la normativa de la Comunidad Valenciana.',
    alertaTitulo: 'Vas a firmar un alquiler en Castellón: ¿vas a hacerlo con un PDF "genérico"?',
    paraQuienTitulo: '¿Para quién es este contrato en Castellón?',
    paraQuien: [
      'Propietarios en Castellón que van a alquilar su piso por primera vez',
      'Arrendadores que tienen contratos antiguos y quieren actualizarlos a la normativa vigente',
      'Inquilinos que quieren revisar las condiciones antes de firmar',
      'Cualquier alquiler de vivienda habitual de larga duración en la provincia de Castellón',
    ],
    faqs: faqPack(
      'Castellón',
      '¿Qué fianza es obligatoria en la Comunidad Valenciana?',
      'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de la Comunidad Valenciana (AVANT). Adicionalmente, propietario e inquilino pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
      '¿El contrato es válido en toda la provincia de Castellón?',
      'Sí, el contrato de alquiler LAU es válido en toda la provincia de Castellón y la Comunidad Valenciana (Valencia, Alicante, Castellón). Se adapta a la legislación estatal y autonómica vigente.',
    ),
  },
}

export function getContratoAlquilerPremiumConfig(slug: string): ContratoAlquilerPremiumConfig | undefined {
  return CONTRATO_ALQUILER_PREMIUM[slug]
}
