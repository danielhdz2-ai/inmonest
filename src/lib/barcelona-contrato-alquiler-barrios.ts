/**
 * Landings SEO: contrato LAU larga duración por barrio en Barcelona.
 * Contenido único por zona (mercado, normativa, perfiles propietario/inquilino).
 */

import {
  BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA,
  BARCELONA_ALQUILER_BARRIOS_EXTRA,
} from '@/lib/barcelona-contrato-alquiler-barrios-ampliacion'

export type BarcelonaAlquilerBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }
  hero: {
    badge: string
    h1: string
    subtitulo: string
    anguloPropietario: string
    anguloInquilino: string
  }
  mercado: {
    titulo: string
    intro: string
    rentaOrientativa: string
    perfilDemanda: string
    particularidad: string
  }
  normativa: {
    titulo: string
    intro: string
    bloques: { titulo: string; contenido: string; bullets?: string[] }[]
  }
  blindaje: {
    titulo: string
    intro: string
    puntos: { titulo: string; texto: string }[]
  }
  paraPropietario: {
    titulo: string
    intro: string
    bullets: string[]
  }
  paraInquilino: {
    titulo: string
    intro: string
    bullets: string[]
  }
  faqs: { q: string; a: string }[]
}

const NORMA_CATALUNA_BASE: BarcelonaAlquilerBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'LAU y vivienda habitual de larga duración',
    contenido:
      'El alquiler de vivienda completa como hogar principal se rige por la Ley de Arrendamientos Urbanos (LAU). En Cataluña, la duración mínima obligatoria para el arrendador es de cinco años si el arrendatario es persona física (siete si el arrendador es persona jurídica), salvo pactos posteriores conformes a la ley. Un contrato LAU bien redactado fija renta, fianza, actualización, obras, mascotas, subarrendamiento y entrega de llaves sin lagunas.',
    bullets: [
      'Prórroga y preaviso según LAU vigente',
      'Cláusulas de resolución por impago o incumplimiento',
      'Inventario y estado del inmueble como anexo vinculante',
    ],
  },
  {
    titulo: 'Ley estatal de Vivienda y límites de actualización',
    contenido:
      'La Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, modifica la LAU en materia de actualización de renta, grandes tenedores y zonas tensionadas. En la práctica, propietario e inquilino necesitan un contrato que distinga si el arrendador es gran tenedor, si la vivienda está en área de mercado tensionado y qué índice o tope aplica cada año — no basta con copiar una cláusula genérica de “IPC”.',
    bullets: [
      'Pequeño tenedor vs gran tenedor: topes distintos',
      'Cláusulas nulas si superan límites legales',
      'Comunicación y transparencia en subidas de renta',
    ],
  },
  {
    titulo: 'Normativa catalana: fianza INCASÒL e índice de referencia',
    contenido:
      'En Cataluña, la fianza legal de una mensualidad debe depositarse ante INCASÒL en los supuestos legalmente exigibles. Además, en áreas declaradas de mercado tensionado puede ser obligatorio respetar el índice de referencia de precios de alquiler (IRAV / mecanismo de referencia) al fijar la renta inicial o en ciertas prórrogas. El contrato debe reflejar importes, plazos de depósito y referencias normativas aplicables al inmueble concreto.',
    bullets: [
      'Depósito de fianza y plazos INCASÒL',
      'Mención de área tensionada cuando proceda',
      'Garantías adicionales solo dentro de los límites LAU',
    ],
  },
]

export const BARCELONA_ALQUILER_BARRIO_SLUGS = [
  'eixample',
  'gracia',
  'sants',
  'poblenou',
  'les-corts',
  ...BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA,
] as const

export type BarcelonaAlquilerBarrioSlug = (typeof BARCELONA_ALQUILER_BARRIO_SLUGS)[number]

const BARCELONA_ALQUILER_BARRIOS_BASE: Record<
  'eixample' | 'gracia' | 'sants' | 'poblenou' | 'les-corts',
  BarcelonaAlquilerBarrioConfig
> = {
  eixample: {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    meta: {
      title: 'Contrato alquiler Eixample Barcelona — LAU blindado 145€',
      description:
        'Contrato de alquiler larga duración en el Eixample: LAU, zona tensionada e INCASÒL. Personalizado para propietarios e inquilinos. Entrega 48h, 145€ IVA incluido.',
      keywords: [
        'contrato alquiler eixample',
        'contrato arrendamiento eixample barcelona',
        'LAU eixample',
        'alquiler piso eixample contrato',
        'zona tensionada eixample alquiler',
        'contrato alquiler propietario barcelona',
      ],
      ogTitle: 'Contrato de alquiler en el Eixample — personalizado y jurídicamente blindado',
      ogDescription:
        'Propietarios e inquilinos del Eixample: contrato LAU a medida, normativa catalana e índice de referencia. 145€, 48h.',
    },
    hero: {
      badge: 'Eixample · LAU larga duración',
      h1: 'Contrato de alquiler en el Eixample: blindado para propietarios e inquilinos exigentes',
      subtitulo:
        'En el Eixample, un PDF genérico no cubre zona tensionada, fianza INCASÒL ni actualización de renta. Redactamos tu contrato LAU personalizado con seguridad jurídica completa.',
      anguloPropietario:
        '¿Alquilas un piso en el Dreta, l’Esquerra o Sant Antoni? Protege renta, fianza e inventario con cláusulas válidas en Cataluña.',
      anguloInquilino:
        '¿Firmas un alquiler en el Eixample? Revisa que la renta inicial, el índice de referencia y las subidas futuras estén bien acotadas antes de pagar la fianza.',
    },
    mercado: {
      titulo: 'Alquiler en el Eixample: mercado y perfiles',
      intro:
        'El Eixample concentra parte de la mayor demanda de alquiler estable de Barcelona: familias en fincas regias, profesionales en pisos reformados y hogares que buscan centralidad y transporte. Es también uno de los distritos donde más se aplica la regulación de mercado tensionado, por lo que el contrato no puede ignorar el marco de referencia de precios.',
      rentaOrientativa:
        'Orientativamente (2026), un piso de 2-3 habitaciones suele moverse en rangos amplios según planta, ascensor y estado — a menudo por encima de la media de la ciudad. La renta pactada debe ser coherente con el índice cuando la vivienda esté en área tensionada.',
      perfilDemanda:
        'Inquilinos de larga duración, parejas profesionales y familias que priorizan colegios y metro. Alta rotación en pisos pequeños amueblados; más estabilidad en viviendas de 3-4 habitaciones.',
      particularidad:
        'Edificios con régimen de propiedad horizontal complejo, obras en fachadas y licencias turísticas en la zona exigen cláusulas claras sobre uso de la vivienda, obras y subarrendamiento.',
    },
    normativa: {
      titulo: 'Qué leyes afectan a tu alquiler en el Eixample',
      intro:
        'En el Eixample suele aplicarse el paquete completo de protección de vivienda habitual: LAU estatal, Ley de Vivienda y normativa catalana de fianza e índice de referencia. Adaptamos cada contrato al caso concreto (tipo de arrendador, año de construcción, gran tenedor).',
      bloques: [
        ...NORMA_CATALUNA_BASE,
        {
          titulo: 'Eixample y área de mercado tensionado',
          contenido:
            'Gran parte del Eixample está incluida en el mapa de áreas de mercado tensionado de Barcelona. Eso implica controles sobre la renta inicial en muchos supuestos y obligaciones de información al inquilino. Un contrato “de internet” que no menciona el IRAV o el mecanismo de referencia expone a ambas partes a reclamaciones y cláusulas nulas.',
          bullets: [
            'Verificación de renta de referencia cuando legalmente proceda',
            'Transparencia en conceptos incluidos (garaje, trastero, comunidad)',
            'Documentación de entrega compatible con futuras prórrogas',
          ],
        },
      ],
    },
    blindaje: {
      titulo: 'Contrato personalizado y blindado: qué redactamos para ti',
      intro:
        'No vendemos plantillas. Cada contrato del Eixample se redacta a partir de tus datos (propietario, inquilino, vivienda, renta, mobiliario) y se revisa para cumplir LAU, Ley de Vivienda 2026 y normativa catalana. El objetivo es un documento firmable con mínimo riesgo de nulidad parcial.',
      puntos: [
        {
          titulo: 'Cláusulas a medida, no rellenables',
          texto: 'Duración, renta, fianza INCASÒL, actualización anual, obras, mascotas, desistimiento y entrega de llaves redactados para tu operación.',
        },
        {
          titulo: 'Anexo de inventario vinculante',
          texto: 'Estado de instalaciones, electrodomésticos y mobiliario para evitar disputas al final del arrendamiento.',
        },
        {
          titulo: 'Revisión jurídica antes de firmar',
          texto: 'Gestor inmobiliario asignado; entrega en PDF firmable digitalmente en un plazo orientativo de 48 horas.',
        },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en el Eixample: evita errores caros en el contrato',
      intro:
        'Alquilar en el Eixample sin contrato LAU sólido es asumir riesgo en fianza, impagos y actualizaciones. Esto es lo que cubrimos en la redacción personalizada:',
      bullets: [
        'Fianza legal y depósito INCASÒL correctamente reflejados',
        'Actualización de renta conforme a tu tipo de tenedor (pequeño o gran tenedor)',
        'Cláusulas de impago, resolución y recuperación de la vivienda',
        'Inventario para pisos amueblados o semi-amueblados de valor alto',
        'Menciones de zona tensionada e índice cuando correspondan al inmueble',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en el Eixample: firma con los ojos abiertos',
      intro:
        'Antes de entregar mes adelantado y fianza en un piso del Eixample, conviene un contrato que deje claro qué puedes y qué no puedes pactar. Te ayudamos a partir de un documento equilibrado y legal:',
      bullets: [
        'Renta inicial y conceptos incluidos sin letra pequeña abusiva',
        'Subidas anuales con fórmula legal (no cláusulas IPC libres inválidas)',
        'Obras en la vivienda y en la finca (comunidad)',
        'Mascotas, subarrendamiento y cesión del contrato',
        'Plazos de devolución de fianza y estado de salida',
      ],
    },
    faqs: [
      {
        q: '¿Cuánto cuesta un contrato de alquiler LAU en el Eixample?',
        a: 'En Inmonest el servicio cuesta 145€ IVA incluido, con contrato personalizado y entrega orientativa en 48 horas. Incluye revisión adaptada a normativa catalana y, si aplica, mercado tensionado.',
      },
      {
        q: '¿Es obligatorio usar el índice de referencia en el Eixample?',
        a: 'En muchas calles del Eixample la vivienda está en área de mercado tensionado. En esos supuestos la renta inicial y ciertas actualizaciones deben respetar el marco legal de referencia. El contrato debe reflejarlo; nosotros lo incorporamos según los datos que nos facilites.',
      },
      {
        q: '¿Sirve para alquilar solo una habitación en el Eixample?',
        a: 'No. Esta landing es para alquiler de vivienda completa (LAU). Si alquilas una habitación en piso compartido, necesitas contrato de habitación bajo Código Civil: /gestoria/contrato-alquiler-habitacion/barcelona.',
      },
      {
        q: '¿Puedo usar el mismo contrato en l’Esquerra y el Dreta?',
        a: 'El marco legal es común, pero la renta de referencia, el estado del inmueble y el perfil del arrendador cambian. Por eso redactamos un documento personalizado por operación, no un modelo único del distrito.',
      },
    ],
  },

  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    meta: {
      title: 'Contrato alquiler Gràcia Barcelona — LAU personalizado 145€',
      description:
        'Alquiler larga duración en Gràcia: contrato LAU blindado, INCASÒL y Ley de Vivienda. Para propietarios e inquilinos. 145€, entrega 48h.',
      keywords: [
        'contrato alquiler gracia barcelona',
        'contrato alquiler gràcia',
        'LAU gracia',
        'alquiler piso gracia contrato',
        'arrendamiento vivienda gracia',
      ],
      ogTitle: 'Contrato de alquiler en Gràcia — seguridad jurídica para particulares',
      ogDescription: 'Gràcia: contrato LAU a medida, normativa catalana y cláusulas equilibradas. 145€ IVA incluido.',
    },
    hero: {
      badge: 'Gràcia · LAU larga duración',
      h1: 'Alquiler en Gràcia con contrato LAU personalizado: protección real para propietario e inquilino',
      subtitulo:
        'En Gràcia mezclan familias de barrio, pisos señoriales y alta presión de alquiler. Un contrato blindado evita conflictos por fianza, convivencia en finca y actualizaciones ilegales.',
      anguloPropietario:
        '¿Pones en alquiler en Camp d’en Grassot o la Vila de Gràcia? Asegura duración mínima, fianza y obras con cláusulas LAU válidas en Cataluña.',
      anguloInquilino:
        '¿Te ofrecen un piso en Gràcia entre particulares? Comprueba que el contrato respeta topes de renta y no incluye cláusulas abusivas antes de firmar.',
    },
    mercado: {
      titulo: 'Gràcia: un barrio de identidad fuerte y alquiler estable',
      intro:
        'Gràcia combina plazas de barrio, edificios de principios de siglo y demanda constante de quien quiere vivir en Barcelona sin abandonar la vida de proximidad. Muchos alquileres son de larga duración entre particulares, pero la falta de contrato escrito sigue siendo un problema en pisos compartidos mal tipificados como “vivienda completa”.',
      rentaOrientativa:
        'La renta en Gràcia suele situarse por encima de la media en calles céntricas del distrito y algo más contenida en periferia del mismo (Vallcarca, penya). El contrato debe describir con precisión si el alquiler incluye trastero, terraza o plaza de parking.',
      perfilDemanda:
        'Familias, parejas jóvenes y profesionales creativos. Menor rotación que en zonas universitarias puras, pero conflicto frecuente por obras en edificios antiguos.',
      particularidad:
        'Finques con escaleras estrechas, sin ascensor y reformas parciales: el inventario y el estado de instalaciones son críticos en el anexo.',
    },
    normativa: {
      titulo: 'Legislación aplicable al alquiler en Gràcia',
      intro:
        'Gràcia comparte el marco legal de Barcelona capital. Parte del distrito está en área tensionada; otras zonas pueden tener matices distintos en referencia de renta. Personalizamos el contrato según la dirección exacta y el arrendador.',
      bloques: [
        ...NORMA_CATALUNA_BASE,
        {
          titulo: 'Gràcia, zona tensionada y convivencia en finca',
          contenido:
            'En calles de Gràcia incluidas en el mapa tensionado, la renta inicial debe ajustarse al marco de referencia cuando la ley lo exija. Paralelamente, muchos edificios tienen varios pisos en alquiler: conviene cláusulas claras sobre ruidos, obras, mascotas y uso de elementos comunes para reducir conflictos vecinales.',
        },
      ],
    },
    blindaje: {
      titulo: 'Tu contrato en Gràcia, redactado y blindado por gestoría',
      intro:
        'Blindado significa que las cláusulas sensibles (renta, fianza, subidas, resolución, inventario) están pensadas para resistir un conflicto ante consumo o vía civil — no para “quedar bien” en una plantilla.',
      puntos: [
        {
          titulo: 'Personalización completa',
          texto: 'Datos de las partes, descripción del inmueble, renta, cargos y duración mínima legal en Cataluña.',
        },
        {
          titulo: 'Equilibrio propietario-inquilino',
          texto: 'Cláusulas exigibles sin caer en abusos que puedan declararse nulas.',
        },
        {
          titulo: 'Entrega digital en 48h',
          texto: 'PDF listo para firma electrónica avanzada, con gestor asignado durante el proceso.',
        },
      ],
    },
    paraPropietario: {
      titulo: '¿Alquilas en Gràcia? El contrato es tu mejor seguro',
      intro: 'Propietarios particulares en Gràcia suelen subestimar inventario y depósito de fianza. Incluimos:',
      bullets: [
        'Depósito INCASÒL y garantías adicionales dentro del límite legal',
        'Cláusulas de impago y procedimiento de reclamación',
        'Obras: quién autoriza reformas y con qué límites',
        'Prohibición o regulación de uso turístico si procede',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en Gràcia: derechos que deben constar por escrito',
      intro: 'Si buscas estabilidad en Gràcia, el contrato debe garantizar transparencia en:',
      bullets: [
        'Duración mínima y condiciones de prórroga',
        'Fórmula de actualización de renta válida',
        'Repairs: qué reparaciones son del propietario',
        'Devolución de fianza al finalizar el contrato',
      ],
    },
    faqs: [
      {
        q: '¿Gràcia es zona tensionada para alquileres?',
        a: 'Gran parte de Gràcia está dentro del área de mercado tensionado de Barcelona, pero la aplicación concreta depende de la vivienda y del arrendador. Revisamos tu caso al redactar el contrato.',
      },
      {
        q: '¿Cuánto tarda el contrato LAU para Gràcia?',
        a: 'Tras completar el formulario y el pago, la redacción personalizada suele entregarse en un plazo orientativo de 48 horas laborables.',
      },
      {
        q: '¿Hacéis contratos para pisos amueblados en Gràcia?',
        a: 'Sí. Incluimos anexo de inventario detallado, especialmente recomendable en pisos amueblados de alquiler de larga duración.',
      },
    ],
  },

  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Contrato alquiler Sants Barcelona — LAU a medida 145€',
      description:
        'Contrato de alquiler en Sants y Sants-Montjuïc: LAU blindado, fianza INCASÒL, familias e inquilinos. Personalizado 145€, 48h.',
      keywords: [
        'contrato alquiler sants barcelona',
        'LAU sants montjuic',
        'contrato arrendamiento sants',
        'alquiler vivienda sants contrato',
      ],
      ogTitle: 'Contrato LAU en Sants — larga duración con seguridad jurídica',
      ogDescription: 'Propietarios e inquilinos de Sants: contrato personalizado, Ley de Vivienda e INCASÒL. 145€.',
    },
    hero: {
      badge: 'Sants · LAU larga duración',
      h1: 'Contrato de alquiler en Sants: LAU personalizado para familias y alquileres estables',
      subtitulo:
        'Sants combina barrio obrero renovado, buena comunicación y alquiler de vivienda habitual de larga duración. Te redactamos un contrato blindado, no una plantilla reutilizada.',
      anguloPropietario:
        '¿Alquilas cerca de la estación de Sants o en Hostafrancs? Formaliza renta, fianza e inventario con un LAU adaptado a Cataluña.',
      anguloInquilino:
        '¿Te mudas a Sants por trabajo o familia? Exige un contrato que respete duración mínima y topes de subida de renta.',
    },
    mercado: {
      titulo: 'Sants-Montjuïc: alquiler residencial y diversidad de vivienda',
      intro:
        'El distrito Sants-Montjuïc incluye Sants propiamente dicho, Hostafrancs, la Bordeta y zonas de Montjuïc. Hay mezcla de pisos para familias, viviendas reformadas y demanda ligada al hub ferroviario. Es un mercado de alquiler estable con sensibilidad al precio respecto al Eixample.',
      rentaOrientativa:
        'Orientativamente, alquileres de 2-3 habitaciones suelen ser más accesibles que en distritos céntricos premium, con variación fuerte entre Sants centro y Montjuïc.',
      perfilDemanda:
        'Familias, trabajadores con movilidad por AVE/ Rodalies y parejas que buscan equilibrio precio-centralidad.',
      particularidad:
        'Algunas fincas tienen actividad comercial en planta baja; conviene delimitar uso exclusivo de vivienda y ruidos.',
    },
    normativa: {
      titulo: 'Normativa del alquiler en Sants (Barcelona)',
      intro:
        'Aplica LAU + Ley de Vivienda + normativa catalana de fianza. Partes del distrito están en área tensionada; verificamos implicaciones según la dirección del inmueble.',
      bloques: [
        ...NORMA_CATALUNA_BASE,
        {
          titulo: 'Alquiler familiar de larga duración en Sants',
          contenido:
            'En Sants predominan contratos de vivienda habitual de 5+ años. Es fundamental acotar prórroga, preaviso de recuperación para uso propio (cuando legalmente proceda) y actualización de renta sin cláusulas inválidas.',
        },
      ],
    },
    blindaje: {
      titulo: 'Contratos blindados para alquileres en Sants',
      intro:
        'Personalizamos cada contrato con los datos reales de la vivienda en Sants-Montjuïc. Blindaje jurídico = cláusulas exigibles + cumplimiento normativo + anexo de inventario.',
      puntos: [
        {
          titulo: 'LAU + Cataluña',
          texto: 'Duración mínima catalana, fianza INCASÒL y actualización legalmente válida.',
        },
        {
          titulo: 'Gestor inmobiliario',
          texto: 'Revisión humana antes de entrega; no es automatización sin control.',
        },
        {
          titulo: '145€ precio cerrado',
          texto: 'IVA incluido, sin comisión sobre la renta mensual.',
        },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sants: formaliza antes de entregar llaves',
      intro: 'Evita alquileres verbales o contratos obsoletos de 2015:',
      bullets: [
        'Contrato actualizado a Ley de Vivienda 2026',
        'Inventario en pisos con reformas recientes',
        'Cláusulas de impago y resolución',
        'Coherencia entre anuncio (Idealista, etc.) y contrato firmado',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sants: qué revisar antes de firmar',
      intro: 'Tu contrato debe dejar claro:',
      bullets: [
        'Si la vivienda es habitual y no temporada disfrazada',
        'Importe de comunidad y IBI (si se repercuten)',
        'Estado de calderas, aire acondicionado y electrodomésticos',
        'Condiciones para recuperación del propietario al final de prórrogas',
      ],
    },
    faqs: [
      {
        q: '¿El contrato vale para Hostafrancs y la Bordeta?',
        a: 'Sí, en todo Sants-Montjuïc con la misma validez LAU, personalizando referencias de renta si la vivienda está en área tensionada.',
      },
      {
        q: '¿Puedo alquilar temporalmente un piso en Sants con este servicio?',
        a: 'Este servicio es para vivienda habitual de larga duración. Para temporada hay un producto específico: alquiler por temporada / estancia temporal.',
      },
    ],
  },

  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato alquiler Poblenou Barcelona — LAU blindado 145€',
      description:
        'Alquiler larga duración en Poblenou y 22@: contrato LAU personalizado, INCASÒL, propietarios e inquilinos tech. 145€, 48h.',
      keywords: [
        'contrato alquiler poblenou',
        'contrato alquiler sant marti barcelona',
        'LAU poblenou 22@',
        'alquiler piso poblenou contrato',
      ],
      ogTitle: 'Contrato de alquiler en Poblenou — LAU a medida con gestoría',
      ogDescription: 'Poblenou: contrato blindado, normativa catalana y cláusulas para alquiler estable. 145€.',
    },
    hero: {
      badge: 'Poblenou · Sant Martí · LAU',
      h1: 'Poblenou: contrato LAU personalizado para el nuevo alquiler barcelonés',
      subtitulo:
        'Entre 22@, la Vila Olímpica y el Poblenou tradicional, el alquiler mezcla profesionales internacionales y familias de barrio. Necesitas un contrato LAU blindado, adaptado a tu piso concreto.',
      anguloPropietario:
        '¿Alquilas en Diagonal Mar o en el Poblenou clásico? Protege tu inversión con cláusulas LAU válidas y inventario completo.',
      anguloInquilino:
        '¿Firmas en Poblenou por trabajo en tech o remoto? Verifica renta, fianza INCASÒL y subidas futuras en un contrato equilibrado.',
    },
    mercado: {
      titulo: 'Poblenou y Sant Martí: transformación urbana y demanda de calidad',
      intro:
        'Poblenou ha pasado de tejido industrial a uno de los epicentros de vivienda y oficinas de Barcelona. Conviven lofts, pisos nuevos y fincas del siglo XX. El alquiler de larga duración compite con presión de segunda residencia y uso temporal mal tipificado.',
      rentaOrientativa:
        'Zonas cercanas al mar y 22@ suelen tener rentas superiores a la media; el Poblenou interior mantiene perfiles mixtos. El contrato debe describir metros útiles, certificado energético y anejos.',
      perfilDemanda:
        'Profesionales tech, familias en vivienda nueva y expatriados en estancias largas (que deben ser LAU, no turismo).',
      particularidad:
        'Riesgo de confundir alquiler habitual con temporada en pisos amueblados de alta rotación — tipificación correcta en el contrato es esencial.',
    },
    normativa: {
      titulo: 'Leyes del alquiler en Poblenou (Sant Martí)',
      intro:
        'Sant Martí incluye tramos en área tensionada, especialmente en Poblenou-Diagonal Mar. Combinamos LAU estatal, Ley de Vivienda y obligaciones catalanas en un solo documento personalizado.',
      bloques: [
        ...NORMA_CATALUNA_BASE,
        {
          titulo: 'Poblenou: evitar el “falso temporal”',
          contenido:
            'Un contrato de temporada exige causa real y temporal. Si la ocupación es vivienda habitual, debe ser LAU con duración mínima y prórrogas legales. Redactamos el tipo correcto para evitar nulidad o reclasificación.',
        },
      ],
    },
    blindaje: {
      titulo: 'Contrato blindado en Poblenou: personalización real',
      intro:
        'Cada operación en Poblenou es distinta (obra nueva vs finca rehabilitada). Blindamos cláusulas de renta, fianza, equipamiento y resolución.',
      puntos: [
        {
          titulo: 'Tipificación LAU correcta',
          texto: 'Vivienda habitual de larga duración, no plantilla de temporada genérica.',
        },
        {
          titulo: 'Referencia de renta',
          texto: 'Incorporación de menciones legales cuando la vivienda está en mercado tensionado.',
        },
        {
          titulo: 'Seguridad jurídica',
          texto: 'Documento revisado por gestoría inmobiliaria antes de firma entre particulares.',
        },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Poblenou: contrato a la altura de tu activo',
      intro: 'Pisos de alta demanda merecen contrato profesional:',
      bullets: [
        'Inventario de calidades en viviendas nuevas o reformadas',
        'Cláusulas sobre domótica, parking y trasteros',
        'Control de subarrendamiento y cesiones',
        'Actualización de renta conforme a normativa vigente',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en Poblenou: contrato claro en barrio en transformación',
      intro: 'Antes de firmar en Sant Martí, asegura:',
      bullets: [
        'Que el uso declarado es vivienda habitual',
        'Límites legales en garantías adicionales',
        'Obras futuras en el edificio (comunes en zona 22@)',
        'Condiciones de salida y preaviso',
      ],
    },
    faqs: [
      {
        q: '¿Poblenou está en zona tensionada?',
        a: 'Partes de Sant Martí, incluido Poblenou-Diagonal Mar, están en el mapa de mercado tensionado. Aplicamos las menciones pertinentes según tu dirección.',
      },
      {
        q: '¿Sirve para pisos en la Vila Olímpica?',
        a: 'Sí, misma lógica LAU en Sant Martí, personalizando renta e inventario según el inmueble.',
      },
    ],
  },

  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    meta: {
      title: 'Contrato alquiler Les Corts Barcelona — LAU 145€',
      description:
        'Contrato LAU en Les Corts: alquiler familiar, normativa catalana, INCASÒL. Personalizado y blindado para propietarios e inquilinos. 48h.',
      keywords: [
        'contrato alquiler les corts barcelona',
        'LAU les corts',
        'contrato arrendamiento les corts',
        'alquiler vivienda les corts',
      ],
      ogTitle: 'Contrato de alquiler en Les Corts — LAU personalizado',
      ogDescription: 'Les Corts: contrato a medida, Ley de Vivienda e INCASÒL. 145€ IVA incluido.',
    },
    hero: {
      badge: 'Les Corts · LAU larga duración',
      h1: 'Les Corts: contrato de alquiler LAU blindado para vivienda familiar estable',
      subtitulo:
        'Les Corts es uno de los distritos más residenciales de Barcelona. El alquiler de larga duración exige contratos LAU personalizados con fianza INCASÒL y cláusulas válidas en Cataluña.',
      anguloPropietario:
        '¿Alquilas en Pedralbes, Les Corts o la Zona Universitària? Protege tu patrimonio con un contrato redactado por gestoría, no con un Word genérico.',
      anguloInquilino:
        '¿Buscas piso familiar en Les Corts? Firma un contrato que respete duración mínima catalana y límites de subida de renta.',
    },
    mercado: {
      titulo: 'Les Corts: perfil residencial y universitario',
      intro:
        'Les Corts combina zonas premium (Pedralbes), barrio de Les Corts propiamente dicho y área universitaria. Hay demanda familiar de larga duración y también pisos vinculados a la UB. El contrato debe diferenciar vivienda habitual estable de coliving mal estructurado.',
      rentaOrientativa:
        'Pedralbes y entornos se sitúan en rangos altos; Les Corts centro ofrece opciones intermedias. La coherencia entre renta pactada e índice de referencia es clave en calles tensionadas.',
      perfilDemanda:
        'Familias, profesores y estudiantes de grado/postgrado en estancias largas (LAU), y perfiles corporativos.',
      particularidad:
        'Viviendas grandes con varias habitaciones — riesgo de alquiler por habitaciones sin contrato LAU de piso completo cuando corresponde.',
    },
    normativa: {
      titulo: 'Marco legal del alquiler en Les Corts',
      intro:
        'Les Corts aplica el mismo stack normativo que Barcelona: LAU, Ley de Vivienda, duración mínima catalana e INCASÒL. Pedralbes y partes del distrito pueden estar en área tensionada.',
      bloques: [
        ...NORMA_CATALUNA_BASE,
        {
          titulo: 'Duración mínima en Cataluña (5 / 7 años)',
          contenido:
            'Para arrendamientos de vivienda habitual en Cataluña, el arrendador no puede fijar una duración inferior a cinco años (persona física) o siete (persona jurídica) en el primer periodo, salvo reglas específicas posteriores. El contrato debe reflejar prórrogas obligatorias y preavisos sin atajos inválidos.',
        },
      ],
    },
    blindaje: {
      titulo: 'Personalizado, revisado y blindado jurídicamente',
      intro:
        'En Les Corts, donde los alquileres suelen ser de largo plazo, un error en la cláusula de actualización o en la fianza puede costar miles de euros en un litigio. Redactamos contratos completos y equilibrados.',
      puntos: [
        {
          titulo: 'Datos reales de tu vivienda',
          texto: 'Metros, anejos, mobiliario, renta, fecha de entrada y depósitos.',
        },
        {
          titulo: 'Cláusulas anti-conflicto',
          texto: 'Obras, mascotas, comunidad, impago y entrega de llaves.',
        },
        {
          titulo: 'PDF firmable en 48h',
          texto: 'Tramitación online con gestor asignado en Inmonest.',
        },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Les Corts',
      intro: 'Ideal si alquilas vivienda habitual de larga duración:',
      bullets: [
        'Grandes tenedores vs particulares: fórmula de actualización correcta',
        'Fianza INCASÒL documentada',
        'Anexo de inventario en viviendas de alto valor',
        'Cláusulas sobre uso de trasteros y plazas de parking',
      ],
    },
    paraInquilino: {
      titulo: 'Inquilino en Les Corts',
      intro: 'Tu contrato LAU debe garantizar:',
      bullets: [
        'Estabilidad en vivienda familiar',
        'Transparencia en gastos repercutidos',
        'Límites en garantías adicionales',
        'Criterios objetivos de devolución de fianza',
      ],
    },
    faqs: [
      {
        q: '¿Les Corts es buena zona para alquiler LAU de larga duración?',
        a: 'Sí. Es un distrito predominantemente residencial donde los contratos de 5+ años son la norma. Un LAU bien redactado encaja con ese perfil.',
      },
      {
        q: '¿Cuánto cuesta el contrato en Les Corts?',
        a: '145€ IVA incluido en Inmonest, mismo precio que el resto de Barcelona: personalización incluida, sin coste por barrio.',
      },
    ],
  },
}

export const BARCELONA_ALQUILER_BARRIOS = {
  ...BARCELONA_ALQUILER_BARRIOS_BASE,
  ...BARCELONA_ALQUILER_BARRIOS_EXTRA,
} as Record<BarcelonaAlquilerBarrioSlug, BarcelonaAlquilerBarrioConfig>

export function getBarcelonaAlquilerBarrio(slug: string): BarcelonaAlquilerBarrioConfig | undefined {
  if (!(BARCELONA_ALQUILER_BARRIO_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARCELONA_ALQUILER_BARRIOS[slug as BarcelonaAlquilerBarrioSlug]
}

export function getBarcelonaAlquilerBarrioPaths(): string[] {
  return BARCELONA_ALQUILER_BARRIO_SLUGS.map((b) => `/barcelona/contrato-alquiler/${b}`)
}

export function listBarcelonaAlquilerBarrios(): BarcelonaAlquilerBarrioConfig[] {
  return BARCELONA_ALQUILER_BARRIO_SLUGS.map((s) => BARCELONA_ALQUILER_BARRIOS[s])
}
