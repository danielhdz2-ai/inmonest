import type { LandingsCiudadPremiumSlug } from '@/lib/landings-ciudad-premium'

export type TemporadaCiudadEnriquecimiento = {
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: { h1: string; lead: string; badge?: string }
  mercadoIntro: string
  casosUso: string[]
  normativaBullets: string[]
  faqs: { q: string; a: string }[]
}

export const ALQUILER_TEMPORADA_ENRIQUECIMIENTO: Record<
  LandingsCiudadPremiumSlug,
  TemporadaCiudadEnriquecimiento
> = {
  madrid: {
    meta: {
      title: 'Contrato alquiler temporal Madrid — meses sin prórroga LAU',
      description:
        'Alquiler por meses en Madrid (mudanza, prácticas, expatriados). Contrato de temporada distinto al LAU habitual. Gestor online, 48h. Evita prórrogas obligatorias mal redactadas.',
      keywords:
        'contrato alquiler temporal madrid, alquiler por meses madrid, arrendamiento temporada madrid, alquiler corta duracion madrid particular',
      ogTitle: 'Alquiler temporal Madrid — contrato a medida',
      ogDescription: 'Estancias de meses en Madrid con contrato de temporada profesional, no plantilla LAU genérica.',
    },
    hero: {
      badge: 'Chamberí · Vallecas · transitorios',
      h1: 'Alquiler por meses en Madrid: contrato de temporada, no LAU de vivienda habitual',
      lead:
        'En Madrid es frecuente alquilar 3–11 meses por trabajo, máster o mudanza. Si usas un LAU estándar, puedes activar prórrogas y obligaciones que no encajan con una estancia acotada. Redactamos contrato de temporada con fechas, fianza y uso claros.',
    },
    mercadoIntro:
      'Madrid concentra alquileres transitorios en distritos céntricos y periferia bien comunicada: pisos amueblados para profesionales, habitaciones en piso compartido por temporadas y segundas residencias en proceso de venta. La presión del mercado empuja a firmar rápido; un contrato mal tipificado mezcla LAU y estancia corta.',
    casosUso: [
      'Profesional desplazado 6–9 meses con empresa en Madrid',
      'Propietario que alquila mientras vende el piso',
      'Estudiante de máster con fecha de fin de curso',
      'Expatriado en periodo de prueba antes de contrato LAU largo',
    ],
    normativaBullets: [
      'Duración estrictamente delimitada (fechas inicio/fin)',
      'Sin prórroga tácita de LAU si el objeto es temporada',
      'Fianza y devolución pactadas aparte del depósito LAU',
      'Inventario recomendable en amueblados de corta estancia',
    ],
    faqs: [
      {
        q: '¿Un alquiler de 11 meses en Madrid es LAU o temporada?',
        a: 'Depende del uso pactado y redacción. Si es vivienda habitual con prórroga, aplica LAU. Si es estancia temporal acotada, conviene contrato de temporada específico. Tu gestor te orienta según tu caso.',
      },
      {
        q: '¿Puedo alquilar sin depósito en la Comunidad de Madrid?',
        a: 'En LAU habitual hay fianza legal. En temporada se pacta libremente, pero debe quedar escrita la devolución y causas de retención.',
      },
      {
        q: '¿Entregáis en 48 horas?',
        a: 'Sí, con datos completos del inmueble y partes. Trámite 100 % online con gestor asignado.',
      },
    ],
  },

  barcelona: {
    meta: {
      title: 'Contrato alquiler temporada Barcelona — estancia acotada sin zona tensionada LAU',
      description:
        'Alquiler temporal en Barcelona (Eixample, Gràcia, periferia). Contrato distinto al LAU de larga duración e índice de referencia. Gestoría Inmonest online.',
      keywords:
        'contrato alquiler temporada barcelona, alquiler meses barcelona, arrendamiento temporal barcelona',
      ogTitle: 'Temporada Barcelona — no mezclar con LAU largo',
      ogDescription: 'Estancias de meses en Barcelona con cláusulas válidas en Cataluña.',
    },
    hero: {
      badge: 'Cataluña · INCASÒL si aplica LAU',
      h1: 'Alquiler temporal en Barcelona: delimita fechas antes de activar un LAU largo',
      lead:
        'En Barcelona muchos propietarios ofrecen “temporada” en pisos amueblados para nómadas o estudiantes Erasmus. Mezclar un contrato LAU genérico con estancia corta genera conflictos sobre prórroga, fianza INCASÒL y actualización de renta.',
    },
    mercadoIntro:
      'Barcelona mezcla demanda internacional, universidad y teletrabajo. Los alquileres de meses en Eixample, Poblenou o zona universitaria no son lo mismo que un LAU de vivienda habitual en área tensionada. El contrato debe reflejar uso temporal y calendario real de ocupación.',
    casosUso: [
      'Nómada digital 4–8 meses en piso amueblado',
      'Propietario entre inquilinos LAU que alquila transitoriamente',
      'Investigador o becario con fecha de regreso',
      'Familia en obra de reforma que alquila temporalmente',
    ],
    normativaBullets: [
      'Distinción clara temporada vs arrendamiento de vivienda habitual',
      'Fianza: INCASÒL solo si encaja régimen LAU',
      'Cláusulas en catalán o bilingües si las partes lo prefieren',
      'Prohibición de uso turístico sin licencia si aplica',
    ],
    faqs: [
      {
        q: '¿La temporada en Barcelona evita el índice de referencia?',
        a: 'No automáticamente. Si el arrendamiento es en realidad vivienda habitual, pueden aplicar normas de zona tensionada. El contrato debe reflejar el uso real.',
      },
      {
        q: '¿Es lo mismo temporada y Airbnb?',
        a: 'No. El alquiler turístico tiene licencia y normativa propia. La temporada es estancia temporal pero no necesariamente uso turístico.',
      },
      {
        q: '¿Redactáis contrato bilingüe?',
        a: 'Sí, podemos preparar versión en castellano y catalán para mayor claridad entre particulares.',
      },
    ],
  },

  valencia: {
    meta: {
      title: 'Contrato alquiler temporada Valencia — meses en Ruzafa sin prórroga LAU',
      description:
        'Alquiler por meses en Valencia y litoral. Contrato de temporada para estancias acotadas. AVANT y cédula si luego pasas a LAU. Gestor online 48h.',
      keywords:
        'contrato alquiler temporada valencia, alquiler meses valencia, arrendamiento temporal valencia',
      ogTitle: 'Alquiler temporada Valencia',
      ogDescription: 'Estancias cortas en capital y playa con contrato profesional.',
    },
    hero: {
      badge: 'Ruzafa · Benimaclet · playa',
      h1: 'Alquiler de temporada en Valencia: estancias de meses sin confundir con LAU playero',
      lead:
        'Valencia atrae estancias medias por trabajo remoto y vida en barrios como Ruzafa. En la playa muchos anuncios mezclan “temporada” con uso vacacional. Un contrato claro fija duración, renta y que no es arrendamiento LAU de larga duración.',
    },
    mercadoIntro:
      'La demanda de pisos por meses crece en Valencia capital y área metropolitana. Propietarios alternan inquilinos LAU con periodos transitorios entre reformas o venta. En zonas costeras conviene separar temporada de registro turístico autonómico.',
    casosUso: [
      'Teletrabajador 6 meses en Valencia',
      'Propietario en venta que alquila mientras cierra operación',
      'Estudiante internacional un curso completo',
      'Pareja en espera de entrega de vivienda nueva',
    ],
    normativaBullets: [
      'Fechas de ocupación inamovibles en contrato de temporada',
      'Cédula de habitabilidad si luego conviertes a LAU habitual',
      'Depósito AVANT solo en arrendamientos LAU',
      'Uso vacacional requiere registro aparte',
    ],
    faqs: [
      {
        q: '¿Temporada en Valencia evita depósito en AVANT?',
        a: 'En arrendamiento LAU sí hay obligaciones de fianza. En temporada bien redactada se pacta garantía distinta; tu gestor lo deja claro.',
      },
      {
        q: '¿Válido en Mislata o Torrent?',
        a: 'Sí, en municipios del área metropolitana. Adaptamos cláusulas al inmueble concreto.',
      },
      {
        q: '¿Puedo pasar de temporada a LAU después?',
        a: 'Sí, pero conviene nuevo contrato LAU y cumplir requisitos autonómicos. Podemos redactarlo cuando toque.',
      },
    ],
  },

  sevilla: {
    meta: {
      title: 'Contrato alquiler temporada Sevilla — estancia acotada en Triana o centro',
      description:
        'Alquiler temporal en Sevilla para meses (universidad, feria, mudanza). Contrato distinto al LAU. Precio cerrado, gestor online.',
      keywords: 'contrato alquiler temporada sevilla, alquiler meses sevilla, arrendamiento temporal sevilla',
      ogTitle: 'Temporada Sevilla — contrato profesional',
      ogDescription: 'Alquiler por meses en Sevilla sin plantilla LAU genérica.',
    },
    hero: {
      badge: 'Triana · Nervión · universidad',
      h1: 'Alquiler temporal en Sevilla: meses de estancia con contrato acotado',
      lead:
        'En Sevilla abundan alquileres de meses ligados a universidad, prácticas o estancia por feria y turismo residencial. Un LAU estándar no siempre encaja; el contrato de temporada fija calendario y evita prórrogas no deseadas.',
    },
    mercadoIntro:
      'Sevilla combina mercado accesible y alta rotación en casco histórico y Nervión. Propietarios particulares alquilan transitoriamente entre inquilinos estables o durante herencias en venta.',
    casosUso: [
      'Estudiante UNIA o US un curso',
      'Profesional en proyecto temporal en Andalucía',
      'Propietario en trámite de venta',
      'Familia en mudanza desde otra provincia',
    ],
    normativaBullets: [
      'Duración inferior al marco LAU habitual si es temporada',
      'Fianza y suministros detallados',
      'Cláusulas de salida y limpieza en amueblados',
      'ITP no aplica al alquiler; IVA solo si procede actividad',
    ],
    faqs: [
      {
        q: '¿La Feria de Abril implica contrato turístico?',
        a: 'No necesariamente. Si es vivienda por meses con uso residencial temporal, es distinto del alquiler turístico regulado.',
      },
      {
        q: '¿Cuánto suele durar un contrato temporada en Sevilla?',
        a: 'Habitualmente de 1 a 11 meses según necesidad. Lo importante es que el documento refleje ese calendario.',
      },
      {
        q: '¿Atendéis en Dos Hermanas o Alcalá?',
        a: 'Sí, en área metropolitana sevillana con el mismo servicio online.',
      },
    ],
  },

  malaga: {
    meta: {
      title: 'Contrato alquiler temporada Málaga — meses sin licencia VFT',
      description:
        'Alquiler temporal en Málaga capital y Costa del Sol. No confundir con vivienda turística VFT. Contrato de estancia acotada. Gestor andaluz online.',
      keywords:
        'contrato alquiler temporada malaga, alquiler meses malaga, arrendamiento temporal costa del sol',
      ogTitle: 'Temporada Málaga — distinto de turístico',
      ogDescription: 'Estancias de meses en Málaga con contrato claro.',
    },
    hero: {
      badge: 'Soho · Teatinos · costa',
      h1: 'Alquiler temporal en Málaga: estancia de meses sin mezclar con VFT turístico',
      lead:
        'Málaga mezcla teletrabajo, estudiantes y segundas residencias. La Junta regula viviendas con fines turísticos (VFT) aparte del alquiler por meses. Tu contrato debe dejar claro que no es LAU largo ni alquiler vacacional sin licencia.',
    },
    mercadoIntro:
      'El mercado malagueño tiene picos de demanda internacional. Propietarios alquilan transitoriamente en Soho o El Palo mientras buscan inquilino LAU o cierran venta.',
    casosUso: [
      'Trabajador remoto europeo un semestre',
      'Propietario entre inquilinos en piso amueblado',
      'Estudiante UMA o máster',
      'Comprador en espera de escritura',
    ],
    normativaBullets: [
      'Separar temporada de registro VFT turístico',
      'LAU habitual requiere otro documento si cambia el uso',
      'Certificado energético vigente en compraventa posterior',
      'Fianza LAU vs garantía de temporada',
    ],
    faqs: [
      {
        q: '¿Puedo alquilar 8 meses en Málaga con contrato LAU?',
        a: 'Si es vivienda habitual puede ser LAU. Si es estancia temporal acotada, mejor contrato de temporada específico.',
      },
      {
        q: '¿Qué pasa si el inquilino no se va al acabar?',
        a: 'El contrato de temporada debe prever penalizaciones y procedimiento claro; por eso conviene redacción profesional.',
      },
      {
        q: '¿Costa del Sol incluida?',
        a: 'Sí, redactamos para Málaga capital y municipios de la provincia.',
      },
    ],
  },

  bilbao: {
    meta: {
      title: 'Contrato alquiler temporada Bilbao — meses en Abando sin LAU largo',
      description:
        'Alquiler temporal en Bilbao y Bizkaia. Contrato de estancia acotada para profesionales y estudiantes. Gestoría online.',
      keywords: 'contrato alquiler temporada bilbao, alquiler meses bilbao, arrendamiento temporal bizkaia',
      ogTitle: 'Alquiler temporada Bilbao',
      ogDescription: 'Estancias de meses en Gran Bilbao con contrato a medida.',
    },
    hero: {
      badge: 'Abando · Deusto · industria',
      h1: 'Alquiler temporal en Bilbao: contrato por meses en mercado de rentas estables',
      lead:
        'Bilbao mueve alquileres transitorios ligados a industria, universidad y expatriados en Deusto. Un contrato de temporada bien redactado evita activar prórrogas LAU cuando solo buscas cubrir un periodo concreto.',
    },
    mercadoIntro:
      'En Bilbao el mercado es más estable que en costas, pero sigue habiendo demanda de pisos amueblados por meses para proyectos y estudios. Propietarios particulares prefieren contrato claro a oralidad.',
    casosUso: [
      'Ingeniero en proyecto 6 meses',
      'Estudiante de intercambio en Deusto',
      'Familia en espera de vivienda definitiva',
      'Propietario durante herencia o venta',
    ],
    normativaBullets: [
      'Régimen foral no cambia la necesidad de contrato escrito',
      'Fianza vasca en LAU; distinta en temporada',
      'Inventario en amueblados',
      'Suministros y comunidad detallados',
    ],
    faqs: [
      {
        q: '¿El contrato temporada es válido en Getxo o Barakaldo?',
        a: 'Sí, en municipios de Bizkaia con adaptación al inmueble.',
      },
      {
        q: '¿Necesito contrato en euskera?',
        a: 'No es obligatorio, pero podemos aclarar cláusulas críticas si las partes lo desean.',
      },
      {
        q: '¿Qué duración máxima recomendáis?',
        a: 'Depende del uso real. Lo definimos contigo para no mezclar con LAU de vivienda habitual.',
      },
    ],
  },

  zaragoza: {
    meta: {
      title: 'Contrato alquiler temporada Zaragoza — meses cerca del campus',
      description:
        'Alquiler temporal en Zaragoza para estancias de meses. Contrato acotado, precio cerrado. Ideal universidad y proyectos. Online 48h.',
      keywords: 'contrato alquiler temporada zaragoza, alquiler meses zaragoza',
      ogTitle: 'Temporada Zaragoza',
      ogDescription: 'Alquiler por meses en capital aragonesa.',
    },
    hero: {
      badge: 'Universidad · Delicias · ACTUR',
      h1: 'Alquiler temporal en Zaragoza: estancias de meses sin LAU de larga duración',
      lead:
        'Zaragoza concentra estancias medias por universidad, hospital y logística. Alquilar 4–10 meses con contrato de temporada protege a propietario e inquilino mejor que un LAU mal aplicado.',
    },
    mercadoIntro:
      'Precios accesibles y AVE atraen inquilinos de otras provincias por periodos definidos. Propietarios en Delicias o centro alquilan transitoriamente con frecuencia.',
    casosUso: [
      'Residente médico rotatorio',
      'Estudiante UNIZAR un curso',
      'Trabajador en planta industrial temporal',
      'Propietario en venta',
    ],
    normativaBullets: [
      'Calendario de ocupación explícito',
      'Fianza pactada por escrito',
      'Normas de convivencia en pisos compartidos',
      'Opción de contrato LAU posterior si cambia el uso',
    ],
    faqs: [
      {
        q: '¿Atendéis en Utebo o Cuarte?',
        a: 'Sí, área metropolitana incluida.',
      },
      {
        q: '¿Piso amueblado temporada?',
        a: 'Sí, con inventario recomendado en el contrato.',
      },
      {
        q: '¿Precio del servicio?',
        a: 'Honorario cerrado de gestoría; consulta tarifa actual en la página de solicitud.',
      },
    ],
  },

  alicante: {
    meta: {
      title: 'Contrato alquiler temporada Alicante — meses en San Juan sin turismo',
      description:
        'Alquiler temporal Alicante y Costa Blanca. Distinto de registro turístico y LAU largo. Gestor valenciano online.',
      keywords: 'contrato alquiler temporada alicante, alquiler meses alicante, temporada san juan',
      ogTitle: 'Temporada Alicante · Costa Blanca',
      ogDescription: 'Estancias de meses con contrato profesional.',
    },
    hero: {
      badge: 'Explanada · San Juan · UA',
      h1: 'Alquiler temporal en Alicante: meses en costa sin confundir con uso vacacional',
      lead:
        'Alicante mezcla residentes, estudiantes de la UA y perfiles internacionales en Playa de San Juan. “Temporada” no es sinónimo de turismo: el contrato debe delimitar estancia temporal y no LAU indefinido.',
    },
    mercadoIntro:
      'La costa alicantina tiene mucha segunda residencia. Propietarios alquilan meses entre temporadas turísticas reguladas o mientras venden.',
    casosUso: [
      'Jubilado europeo 6 meses en San Juan',
      'Estudiante San Vicente un curso',
      'Profesional del puerto temporal',
      'Propietario en reforma',
    ],
    normativaBullets: [
      'Registro turístico aparte de temporada residencial',
      'AVANT en LAU, no automático en temporada',
      'Cédula de habitabilidad en compraventa',
      'Cláusulas de salida en alta rotación costera',
    ],
    faqs: [
      {
        q: '¿Temporada en Elche o Torrevieja?',
        a: 'Sí, provincia de Alicante incluida.',
      },
      {
        q: '¿Puedo alquilar 3 meses en verano sin licencia turística?',
        a: 'Depende del uso real y normativa municipal/autonómica. Te orientamos para no mezclar regímenes.',
      },
      {
        q: '¿Contrato en inglés?',
        a: 'Podemos incluir glosario o versión bilingüe para inquilinos internacionales.',
      },
    ],
  },

  castellon: {
    meta: {
      title: 'Contrato alquiler temporada Castellón — Benicàssim y Grao por meses',
      description:
        'Alquiler temporal Castelló de la Plana, Grao y litoral. Estancia acotada distinta al LAU. UJI y cerámica. Gestor online 48h.',
      keywords:
        'contrato alquiler temporada castellon, alquiler meses castellon, temporada benicassim',
      ogTitle: 'Temporada Castellón · Grao y Plana',
      ogDescription: 'Alquiler por meses en Castellón y costa.',
    },
    hero: {
      badge: 'Grao · UJI · Benicàssim',
      h1: 'Alquiler temporal en Castellón: meses en Plana y litoral sin LAU mal aplicado',
      lead:
        'Castellón mueve estancias por universidad Jaume I, industria ceramicista y segundas residencias en Benicàssim. Firmar un LAU genérico para 5 meses puede generar prórrogas no deseadas; el contrato de temporada fija el calendario.',
    },
    mercadoIntro:
      'Entre Grao, capital y Vila-real hay demanda de alquiler transitorio entre operaciones de compraventa rápidas típicas de la provincia.',
    casosUso: [
      'Estudiante UJI un semestre',
      'Técnico en planta ceramicista',
      'Propietario vendiendo piso en Grao',
      'Familia en espera de entrega',
    ],
    normativaBullets: [
      'Comunitat Valenciana: distinguir temporada de turismo',
      'AVANT si el arrendamiento es LAU',
      'Fianza y renta actualizables solo si aplica LAU',
      'Cédula si luego vendes o alquilas habitual',
    ],
    faqs: [
      {
        q: '¿Válido en Vila-real y Burriana?',
        a: 'Sí, en toda la provincia de Castellón.',
      },
      {
        q: '¿Benicàssim verano es turístico?',
        a: 'Uso vacacional regulado es distinto de estancia temporal por meses; el contrato debe reflejarlo.',
      },
      {
        q: '¿Enlace con contrato LAU Castellón?',
        a: 'Si pasas a larga duración, redactamos LAU aparte desde 145€.',
      },
    ],
  },

  murcia: {
    meta: {
      title: 'Contrato alquiler temporada Murcia — meses en capital y Cartagena',
      description:
        'Alquiler temporal Murcia y Región. Estancias acotadas para universidad y mudanzas. Contrato profesional online.',
      keywords: 'contrato alquiler temporada murcia, alquiler meses murcia',
      ogTitle: 'Temporada Murcia',
      ogDescription: 'Alquiler por meses en Murcia y costa.',
    },
    hero: {
      badge: 'UMU · Cartagena · huerta',
      h1: 'Alquiler temporal en Murcia: contrato por meses en mercado accesible',
      lead:
        'Murcia capital y Cartagena tienen rotación universitaria y alquileres transitorios entre compraventas rápidas. Un contrato de temporada evita obligaciones LAU cuando solo necesitas cubrir un periodo.',
    },
    mercadoIntro:
      'Tickets moderados y muchas operaciones entre particulares hacen habitual alquilar el piso “un tiempo” mientras se vende o hereda.',
    casosUso: [
      'Estudiante UMU',
      'Militar o civil en destino temporal',
      'Propietario en venta sin agencia',
      'Familia en mudanza',
    ],
    normativaBullets: [
      'Duración y causa de estancia en el contrato',
      'Fianza detallada',
      'Suministros en pisos amueblados',
      'Posible LAU posterior',
    ],
    faqs: [
      {
        q: '¿Lorca o Molina incluidas?',
        a: 'Sí, Región de Murcia.',
      },
      {
        q: '¿Cuánto tarda la redacción?',
        a: 'Entrega habitual 48 h laborables online.',
      },
      {
        q: '¿Habitación o piso entero?',
        a: 'Piso entero en temporada; habitación usa contrato Código Civil distinto.',
      },
    ],
  },

  palma: {
    meta: {
      title: 'Contrato alquiler temporada Palma — meses sin licencia ETV',
      description:
        'Alquiler temporal Palma de Mallorca. No es alquiler turístico ETV. Estancia acotada, IBAVI solo si LAU. Gestor balear online.',
      keywords: 'contrato alquiler temporada palma, alquiler meses palma mallorca',
      ogTitle: 'Temporada Palma — no ETV',
      ogDescription: 'Estancias de meses en Palma con contrato claro.',
    },
    hero: {
      badge: 'IBAVI · zona tensionada',
      h1: 'Alquiler temporal en Palma: meses de estancia sin mezclar con turismo ETV',
      lead:
        'En Palma confundir temporada con alquiler turístico puede costar sanciones. Baleares es la comunidad más regulada: el contrato debe reflejar estancia temporal residencial, no LAU largo ni ETV.',
    },
    mercadoIntro:
      'Santa Catalina, Portixol y periferia mueven alquileres de meses para profesionales y propietarios entre inquilinos LAU.',
    casosUso: [
      'Profesional 6 meses en Palma',
      'Propietario en venta en Calvià',
      'Estudiante o becario',
      'Segunda residencia transitoria',
    ],
    normativaBullets: [
      'Licencia ETV es régimen aparte',
      'IBAVI en LAU de larga duración',
      'Índice referencia en zona tensionada',
      'Cédula d’habitabilitat en operaciones posteriores',
    ],
    faqs: [
      {
        q: '¿Temporada en Menorca o Ibiza?',
        a: 'Sí, Illes Balears con normativa autonómica.',
      },
      {
        q: '¿11 meses es LAU?',
        a: 'Depende del uso pactado; lo analizamos contigo.',
      },
      {
        q: '¿Contrato en catalán?',
        a: 'Podemos preparar versión bilingüe.',
      },
    ],
  },

  mallorca: {
    meta: {
      title: 'Contrato alquiler temporada Mallorca — estancia meses en la isla',
      description:
        'Alquiler temporal Mallorca (Palma, Calvià, Manacor). Distinto de ETV turístico y LAU largo. Gestoría Inmonest online.',
      keywords: 'contrato alquiler temporada mallorca, alquiler meses mallorca isla',
      ogTitle: 'Temporada Mallorca · isla',
      ogDescription: 'Alquiler por meses en Mallorca con contrato profesional.',
    },
    hero: {
      badge: 'Calvià · Manacor · Serra',
      h1: 'Alquiler temporal en Mallorca: contrato por meses en mercado insular regulado',
      lead:
        'Mallorca no es solo turismo: hay estancias de meses para trabajo, reforma o venta. Separar temporada de licencia turística y de LAU con IBAVI es esencial en la isla.',
    },
    mercadoIntro:
      'Operaciones entre particulares en fincas y pisos con compradores internacionales exigen documentación clara en estancias intermedias.',
    casosUso: [
      'Teletrabajador un semestre en la isla',
      'Propietario entre temporadas ETV y LAU',
      'Obras en vivienda: alquiler transitorio',
      'Comprador esperando escritura',
    ],
    normativaBullets: [
      'ETV turístico ≠ temporada residencial',
      'Depósito IBAVI en LAU',
      'Normativa balear de vivienda',
      'Inventario en amueblados de lujo',
    ],
    faqs: [
      {
        q: '¿Palma capital y pueblos?',
        a: 'Sí, cualquier municipio de Mallorca.',
      },
      {
        q: '¿Puedo usar mismo contrato que Palma?',
        a: 'Adaptamos al inmueble y municipio; comparten marco balear.',
      },
      {
        q: '¿Arras y temporada juntos?',
        a: 'Si compras y alquilas transitoriamente, también redactamos arras.',
      },
    ],
  },

  pamplona: {
    meta: {
      title: 'Contrato alquiler temporada Pamplona — meses San Fermín y universidad',
      description:
        'Alquiler temporal Pamplona y Navarra. Estancias acotadas UPNA y mudanzas. Contrato online.',
      keywords: 'contrato alquiler temporada pamplona, alquiler meses pamplona navarra',
      ogTitle: 'Temporada Pamplona',
      ogDescription: 'Alquiler por meses en Pamplona.',
    },
    hero: {
      badge: 'UPNA · Ensanche · San Fermín',
      h1: 'Alquiler temporal en Pamplona: meses de estancia en capital navarra',
      lead:
        'Pamplona combina universidad, industria y picos estacionales. Alquilar por meses con contrato de temporada evita prórrogas LAU no deseadas en estancias cortas.',
    },
    mercadoIntro:
      'Mercado estable con demanda universitaria y profesionales en proyectos. Propietarios particulares valoran contrato escrito.',
    casosUso: [
      'Estudiante UPNA',
      'Profesional en automoción temporal',
      'Propietario en venta',
      'Familia en traslado',
    ],
    normativaBullets: [
      'Foral navarro y contrato civil',
      'Fianza pactada',
      'Calendario estricto',
      'Amueblado con inventario',
    ],
    faqs: [
      {
        q: '¿Estella o Tudela?',
        a: 'Sí, Navarra.',
      },
      {
        q: '¿Alquiler San Fermín es turístico?',
        a: 'Uso distinto; el contrato debe reflejar estancia y no régimen incorrecto.',
      },
      {
        q: '¿Online desde fuera?',
        a: 'Sí, trámite 100 % online.',
      },
    ],
  },

  granada: {
    meta: {
      title: 'Contrato alquiler temporada Granada — meses en Realejo y campus',
      description:
        'Alquiler temporal Granada capital y provincia. Estudiantes UGR, turismo residencial vs temporada. Gestor online.',
      keywords: 'contrato alquiler temporada granada, alquiler meses granada',
      ogTitle: 'Temporada Granada · UGR',
      ogDescription: 'Alquiler por meses en Granada.',
    },
    hero: {
      badge: 'Albaicín · PTS · Motril',
      h1: 'Alquiler temporal en Granada: estancias de meses sin LAU de larga duración',
      lead:
        'Granada mezcla universidad, turismo residencial y alquileres transitorios en Realejo y PTS. El contrato de temporada delimita fechas en un mercado con mucha demanda de habitaciones y pisos amueblados.',
    },
    mercadoIntro:
      'Propietarios alquilan meses entre cursos o mientras venden en casco histórico con restricciones de uso.',
    casosUso: [
      'Estudiante UGR un cuatrimestre',
      'Investigador en PTS',
      'Propietario en venta',
      'Familia en mudanza',
    ],
    normativaBullets: [
      'Junta Andalucía: turístico aparte',
      'LAU si es vivienda habitual',
      'Fianza y depósito claros',
      'Normas convivencia en compartidos',
    ],
    faqs: [
      {
        q: '¿Motril o Costa Tropical?',
        a: 'Sí, provincia incluida.',
      },
      {
        q: '¿Habitación o piso?',
        a: 'Temporada piso entero; habitación es otro servicio.',
      },
      {
        q: '¿Entrega 48h?',
        a: 'Sí, con datos completos.',
      },
    ],
  },

  salamanca: {
    meta: {
      title: 'Contrato alquiler temporada Salamanca — curso universitario acotado',
      description:
        'Alquiler temporal Salamanca para curso universitario o estancia de meses. Contrato distinto al LAU largo. Online.',
      keywords: 'contrato alquiler temporada salamanca, alquiler meses salamanca universidad',
      ogTitle: 'Temporada Salamanca · USAL',
      ogDescription: 'Alquiler por meses en Salamanca.',
    },
    hero: {
      badge: 'Casco · Campus · Erasmus',
      h1: 'Alquiler temporal en Salamanca: un curso, un contrato acotado',
      lead:
        'Salamanca es sinónimo de estancia universitaria. Alquilar un curso completo con contrato de temporada protege mejor que un LAU genérico que activa prórrogas de cinco años.',
    },
    mercadoIntro:
      'Alto porcentaje de pisos para estudiantes. Propietarios alternan inquilinos por curso académico.',
    casosUso: [
      'Erasmus un semestre',
      'Profesor visitante',
      'Propietario en venta en casco',
      'Mudanza temporal',
    ],
    normativaBullets: [
      'Calendario ligado al curso',
      'Fianza devolución al final',
      'Inventario en amueblados',
      'Posible LAU si el inquilino se queda',
    ],
    faqs: [
      {
        q: '¿9 meses curso es temporada?',
        a: 'Suele encajar en estancia acotada; lo redactamos así si es el uso real.',
      },
      {
        q: '¿Valladolid cercana?',
        a: 'Servicio separado por ciudad; mismo equipo online.',
      },
      {
        q: '¿Precio cerrado?',
        a: 'Honorario gestoría fijo; ver tarifa en solicitud.',
      },
    ],
  },

  valladolid: {
    meta: {
      title: 'Contrato alquiler temporada Valladolid — meses campus y hospital',
      description:
        'Alquiler temporal Valladolid UVA y Rondilla. Contrato estancia acotada. Gestor Castilla y León online.',
      keywords: 'contrato alquiler temporada valladolid, alquiler meses valladolid',
      ogTitle: 'Temporada Valladolid',
      ogDescription: 'Alquiler por meses en Valladolid.',
    },
    hero: {
      badge: 'UVA · Rondilla · Laguna',
      h1: 'Alquiler temporal en Valladolid: meses de estancia en mercado castellano',
      lead:
        'Valladolid mueve alquileres por hospital, universidad y traslados desde Madrid. Contrato de temporada con fechas claras evita conflictos al terminar la estancia.',
    },
    mercadoIntro:
      'Mercado accesible con rotación en Delicias y centro. Propietarios particulares sin agencia.',
    casosUso: [
      'Residente médico',
      'Estudiante UVA',
      'Trabajador en proyecto',
      'Propietario en venta',
    ],
    normativaBullets: [
      'Estancia temporal documentada',
      'Fianza escrita',
      'Suministros',
      'LAU posterior si aplica',
    ],
    faqs: [
      {
        q: '¿Medina del Campo?',
        a: 'Sí, provincia de Valladolid.',
      },
      {
        q: '¿Piso compartido?',
        a: 'Temporada piso completo; habitaciones otro contrato.',
      },
      {
        q: '¿48h entrega?',
        a: 'Sí, online.',
      },
    ],
  },

  coruna: {
    meta: {
      title: 'Contrato alquiler temporada A Coruña — meses en Orzán y campus',
      description:
        'Alquiler temporal A Coruña y Galicia. Estancias acotadas marítimo y universidad. Contrato online.',
      keywords: 'contrato alquiler temporada coruna, alquiler meses a coruna',
      ogTitle: 'Temporada A Coruña',
      ogDescription: 'Alquiler por meses en Coruña.',
    },
    hero: {
      badge: 'Orzán · UDC · puerto',
      h1: 'Alquiler temporal en A Coruña: contrato por meses en ciudad portuaria',
      lead:
        'A Coruña concentra estancias por industria marítima, universidad y turismo residencial. Temporada bien redactada separa estancia acotada de LAU largo.',
    },
    mercadoIntro:
      'Barrios como Orzán y Ensanche mezclan residentes y estancias medias. Operaciones entre particulares habituales.',
    casosUso: [
      'Trabajador portuario temporal',
      'Estudiante UDC',
      'Propietario en venta',
      'Familia en mudanza',
    ],
    normativaBullets: [
      'Xunta: cédula y energético en compraventa',
      'Fianza temporada vs LAU',
      'Inventario',
      'Calendario de salida',
    ],
    faqs: [
      {
        q: '¿Santiago de Compostela?',
        a: 'Landings específicas por ciudad; Coruña capital y área.',
      },
      {
        q: '¿Ferrol?',
        a: 'Sí, área metropolitana.',
      },
      {
        q: '¿Online?',
        a: '100 % online con gestor.',
      },
    ],
  },

  asturias: {
    meta: {
      title: 'Contrato alquiler temporada Asturias — meses Oviedo, Gijón o Avilés',
      description:
        'Alquiler temporal Oviedo, Gijón y Avilés. Estancia acotada industria y universidad. Gestor online.',
      keywords: 'contrato alquiler temporada oviedo, alquiler meses gijon asturias',
      ogTitle: 'Temporada Asturias',
      ogDescription: 'Alquiler por meses en Asturias.',
    },
    hero: {
      badge: 'Oviedo · Gijón · industria',
      h1: 'Alquiler temporal en Asturias: meses en Oviedo, Gijón o Avilés',
      lead:
        'Asturias mueve alquileres transitorios ligados a industria, UNIOVI y migración desde otras CCAA. Contrato de temporada fija plazo en mercado de precios moderados.',
    },
    mercadoIntro:
      'Propietarios en Oviedo centro y Gijón marina alquilan entre inquilinos LAU o durante venta.',
    casosUso: [
      'Técnico en planta temporal',
      'Estudiante UNIOVI',
      'Propietario en venta',
      'Mudanza',
    ],
    normativaBullets: [
      'Principado: ITE en edificios antiguos',
      'Depósito fianza LAU autonómico si aplica',
      'Temporada con fechas',
      'Inventario amueblado',
    ],
    faqs: [
      {
        q: '¿Avilés incluido?',
        a: 'Sí, toda Asturias.',
      },
      {
        q: '¿Langreo?',
        a: 'Sí.',
      },
      {
        q: '¿LAU después?',
        a: 'Redactamos LAU cuando cambie el uso.',
      },
    ],
  },

  santander: {
    meta: {
      title: 'Contrato alquiler temporada Santander — meses UC y Sardinero',
      description:
        'Alquiler temporal Santander y Cantabria. Estancias acotadas universidad y veraneo residencial. Online.',
      keywords: 'contrato alquiler temporada santander, alquiler meses santander',
      ogTitle: 'Temporada Santander · UC',
      ogDescription: 'Alquiler por meses en Santander.',
    },
    hero: {
      badge: 'UC · Sardinero · bahía',
      h1: 'Alquiler temporal en Santander: estancia de meses en ciudad universitaria costera',
      lead:
        'Santander combina UC, turismo residencial y segunda vivienda. Alquilar meses con contrato de temporada evita mezclar con LAU largo en pisos del Sardinero o centro.',
    },
    mercadoIntro:
      'Mercado con estacionalidad pero también estancias medias para estudios y trabajo en banca.',
    casosUso: [
      'Estudiante UC',
      'Becario verano extendido',
      'Propietario en venta',
      'Profesional en proyecto',
    ],
    normativaBullets: [
      'Cantabria: certificado energético',
      'Temporada delimitada',
      'Fianza',
      'Turismo vs residencia temporal',
    ],
    faqs: [
      {
        q: '¿Torrelavega?',
        a: 'Sí, Cantabria.',
      },
      {
        q: '¿Verano 4 meses?',
        a: 'Encaja en temporada si el contrato lo refleja.',
      },
      {
        q: '¿Gestor online?',
        a: 'Sí, panel y gestor asignado.',
      },
    ],
  },

  vitoria: {
    meta: {
      title: 'Contrato alquiler temporada Vitoria — meses en Álava sin LAU largo',
      description:
        'Alquiler temporal Vitoria-Gasteiz y Álava. Estancias acotadas industria y administración. Contrato online.',
      keywords: 'contrato alquiler temporada vitoria, alquiler meses vitoria gasteiz',
      ogTitle: 'Temporada Vitoria-Gasteiz',
      ogDescription: 'Alquiler por meses en Álava.',
    },
    hero: {
      badge: 'Ensanche · Lakua · Álava',
      h1: 'Alquiler temporal en Vitoria-Gasteiz: contrato por meses en capital vasca',
      lead:
        'Vitoria combina administración, industria y calidad de vida. Alquileres transitorios requieren contrato acotado; el LAU genérico no siempre encaja en estancias de proyecto.',
    },
    mercadoIntro:
      'Mercado ordenado con operaciones entre particulares. Propietarios valoran claridad en fianza y salida.',
    casosUso: [
      'Funcionario en destino temporal',
      'Técnico industrial',
      'Propietario en venta',
      'Familia en mudanza',
    ],
    normativaBullets: [
      'Régimen foral y contrato escrito',
      'Fianza vasca en LAU',
      'Temporada con calendario',
      'Inventario',
    ],
    faqs: [
      {
        q: '¿Llodio o Amurrio?',
        a: 'Sí, Álava.',
      },
      {
        q: '¿Bilingüe?',
        a: 'Cláusulas claras en castellano; euskera si se pacta.',
      },
      {
        q: '¿48h?',
        a: 'Entrega habitual online.',
      },
    ],
  },

  'san-sebastian': {
    meta: {
      title: 'Contrato alquiler temporada San Sebastián — meses en Gros sin LAU largo',
      description:
        'Alquiler temporal Donostia / San Sebastián. Estancias acotadas turismo residencial y hostelería. Gestor online.',
      keywords:
        'contrato alquiler temporada san sebastian, alquiler meses donostia, temporada gros',
      ogTitle: 'Temporada San Sebastián · Gros',
      ogDescription: 'Alquiler por meses en Donostia.',
    },
    hero: {
      badge: 'Gros · Parte Vieja · turismo',
      h1: 'Alquiler temporal en San Sebastián: meses en mercado de rentas altas',
      lead:
        'Donostia tiene rentas elevadas y mucha presión turística. Un contrato de temporada delimita estancia temporal sin activar un LAU de larga duración en un mercado donde cada cláusula cuenta.',
    },
    mercadoIntro:
      'Gros y Centro concentran estancias medias para profesionales y estudios. Propietarios exigen garantías claras.',
    casosUso: [
      'Profesional hostelería temporada',
      'Estudiante master',
      'Propietario en venta',
      'Expatriado corto',
    ],
    normativaBullets: [
      'Gipuzkoa: fianza y contrato escrito',
      'No confundir turismo y temporada',
      'Inventario en amueblados premium',
      'Penalizaciones salida',
    ],
    faqs: [
      {
        q: '¿Irún o Hondarribia?',
        a: 'Sí, área donostiarra.',
      },
      {
        q: '¿Rentas altas y fianza?',
        a: 'Debe quedar pactada por escrito con devolución clara.',
      },
      {
        q: '¿Revisión arras si compro?',
        a: 'Sí, servicio revisión arras 120€ en Donostia.',
      },
    ],
  },
}
