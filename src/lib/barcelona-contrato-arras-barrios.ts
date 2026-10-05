/**
 * Landings SEO: contrato de arras penitenciales por barrio en Barcelona.
 * Contenido único por zona (mercado compraventa, fiscalidad catalana, perfiles comprador/vendedor).
 */

export type BarcelonaArrasBarrioConfig = {
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
    anguloComprador: string
    anguloVendedor: string
  }
  mercado: {
    titulo: string
    intro: string
    precioOrientativo: string
    perfilComprador: string
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
  paraComprador: {
    titulo: string
    intro: string
    bullets: string[]
  }
  paraVendedor: {
    titulo: string
    intro: string
    bullets: string[]
  }
  faqs: { q: string; a: string }[]
}

const NORMA_ARRAS_CATALUNA: BarcelonaArrasBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Arras penitenciales (Código Civil)',
    contenido:
      'Las arras penitenciales permiten desistir con penalización económica: si el comprador se echa atrás pierde la señal; si el vendedor incumple, devuelve el doble. En Barcelona conviene fijar importe, plazo hasta escritura, identificación del inmueble (referencia catastral) y consecuencias claras — no basta con un WhatsApp o un PDF de internet.',
    bullets: [
      'Importe de señal y forma de pago trazable',
      'Plazo para firma de escritura pública',
      'Penalizaciones simétricas y límites legales',
    ],
  },
  {
    titulo: 'ITP en Cataluña y gastos de compraventa',
    contenido:
      'La compraventa de vivienda en Cataluña tributa por Impuesto de Transmisiones Patrimoniales (ITP) en operaciones entre particulares. El contrato de arras debe ser coherente con el precio final, quién asume honorarios y cómo se documenta la entrega a notaría. Errores habituales: señal sin mencionar condición suspensiva de hipoteca o sin reservar plazo para revisar cargas.',
    bullets: [
      'Coherencia precio arras / precio total',
      'Condición suspensiva de financiación cuando aplica',
      'Reparto orientativo de gastos (notaría, registro, gestoría)',
    ],
  },
  {
    titulo: 'Cédula, ITE y cargas en edificios barceloneses',
    contenido:
      'En muchos edificios del Eixample o del Ensanche la compraventa exige cédula de habitabilidad, certificado energético o ITE según antigüedad y estado. Las arras deben permitir revisar nota simple, estatutos de comunidad y derramas antes de que la señal quede “ciega”. En Cataluña también conviene aclarar idioma del contrato y validez de cláusulas en castellano o catalán.',
    bullets: [
      'Plazo para aportar documentación urbanística',
      'Mención de cargas, hipotecas y usufructos',
      'Cláusulas de resolución si falla la documentación',
    ],
  },
]

export const BARCELONA_ARRAS_BARRIO_SLUGS = [
  'eixample',
  'gracia',
  'sants',
  'poblenou',
  'les-corts',
] as const

export type BarcelonaArrasBarrioSlug = (typeof BARCELONA_ARRAS_BARRIO_SLUGS)[number]

export const BARCELONA_ARRAS_BARRIOS: Record<BarcelonaArrasBarrioSlug, BarcelonaArrasBarrioConfig> = {
  eixample: {
    slug: 'eixample',
    nombre: 'Eixample',
    distrito: 'Eixample',
    meta: {
      title: 'Contrato arras Eixample Barcelona — penitenciales 145€',
      description:
        'Contrato de arras penitenciales en el Eixample: compraventa, ITP Cataluña, hipoteca y cargas. Redacción en 48h, 145€ IVA incluido. Sin plantillas genéricas.',
      keywords: [
        'contrato arras eixample',
        'arras penitenciales eixample barcelona',
        'señal compraventa eixample',
        'contrato arras barcelona eixample',
        'comprar piso eixample arras',
      ],
      ogTitle: 'Contrato de arras en el Eixample — señal blindada en 48h',
      ogDescription:
        'Compradores y vendedores del Eixample: arras penitenciales a medida, condición de hipoteca y revisión registral. 145€.',
    },
    hero: {
      badge: 'Eixample · Compraventa',
      h1: 'Contrato de arras en el Eixample: protege la señal en pisos de alta demanda',
      subtitulo:
        'En el Eixample las operaciones van rápido y compites con más compradores. Unas arras bien redactadas fijan plazo, penalizaciones y condiciones suspensivas antes de entregar miles de euros de señal.',
      anguloComprador:
        'Si reservas un piso en Dreta, Esquerra o Sant Antoni, necesitas cláusula de hipoteca, revisión de cargas en el edificio modernista y plazo realista hasta notaría.',
      anguloVendedor:
        'Si vendes en el Eixample, las arras deben disuadir desistimientos y permitir retener la señal si el comprador no cierra financiación o documentación en plazo.',
    },
    mercado: {
      titulo: 'Mercado de compraventa en el Eixample',
      intro:
        'El Eixample concentra gran parte del stock de vivienda de segunda mano en Barcelona capital: fincas regias, pisos reformados y operaciones con compradores nacionales e internacionales.',
      precioOrientativo:
        'Precios muy heterogéneos (desde ~4.500 €/m² en zonas consolidadas hasta más en fincas premium). La señal suele moverse entre el 5 % y el 10 % del precio pactado.',
      perfilComprador:
        'Familias, teletrabajadores y compradores con hipoteca en tramitación que compiten en visitas con mucha demanda.',
      particularidad:
        'Edificios con protección patrimonial, obras de comunidad costosas e ITE en fincas antiguas: conviene suspender o condicionar arras hasta revisar actas y certificados.',
    },
    normativa: {
      titulo: 'Normativa aplicable a las arras en el Eixample',
      intro: 'Compraventa en Cataluña con las mismas bases civiles que el resto de España, más matices locales de documentación urbanística.',
      bloques: NORMA_ARRAS_CATALUNA,
    },
    blindaje: {
      titulo: 'Qué blindamos en tu contrato (Eixample)',
      intro: 'Redacción personalizada, no plantilla:',
      puntos: [
        {
          titulo: 'Nota simple y cargas',
          texto: 'Revisión registral orientativa antes de cerrar el texto definitivo de arras.',
        },
        {
          titulo: 'Hipoteca y plazos',
          texto: 'Condición suspensiva de financiación con fechas concretas y consecuencias si el banco deniega.',
        },
        {
          titulo: 'Comunidad y derramas',
          texto: 'Cláusulas para conocer deudas de comunidad y obras aprobadas antes de la señal definitiva.',
        },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en el Eixample',
      intro: 'Tu contrato debe cubrir:',
      bullets: [
        'Recuperación de señal si falla hipoteca (cuando se pacte)',
        'Plazo para comprobar cédula, ITE o certificado energético',
        'Identificación exacta del inmueble y anejos (trastero, parking)',
        'Penalización del vendedor si retira el piso del mercado',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en el Eixample',
      intro: 'Protege tu operación con:',
      bullets: [
        'Señal proporcional al precio y calendario hasta escritura',
        'Retención de señal ante desistimiento del comprador',
        'Obligaciones de aportar documentación urbanística en plazo',
        'Cláusulas claras sobre mobiliario y estado del piso',
      ],
    },
    faqs: [
      {
        q: '¿Cuánto suele ser la señal en el Eixample?',
        a: 'Habitualmente entre el 5 % y el 10 % del precio. En pisos muy demandados a veces se pacta señal alta; el contrato debe cuantificarla sin ambigüedad.',
      },
      {
        q: '¿Precio del contrato de arras en el Eixample?',
        a: '145 € IVA incluido en Inmonest, mismo precio en todos los barrios de Barcelona: redacción personalizada y entrega en 48 h.',
      },
    ],
  },

  gracia: {
    slug: 'gracia',
    nombre: 'Gràcia',
    distrito: 'Gràcia',
    meta: {
      title: 'Contrato arras Gràcia Barcelona — penitenciales 145€',
      description:
        'Arras penitenciales en Gràcia (Barcelona): compraventa entre particulares, ITP, hipoteca y fincas con encanto. 145€, entrega 48h.',
      keywords: [
        'contrato arras gracia barcelona',
        'arras penitenciales gracia',
        'señal compraventa gracia',
        'comprar piso gracia arras',
      ],
      ogTitle: 'Contrato de arras en Gràcia — compraventa blindada',
      ogDescription: 'Arras a medida en Gràcia: plazos, hipoteca y cargas. 145€, 48h.',
    },
    hero: {
      badge: 'Gràcia · Compraventa',
      h1: 'Contrato de arras en Gràcia: señal segura en un mercado de pisos con carácter',
      subtitulo:
        'Gràcia mezcla fincas señoriales, pisos de planta baja y áticos con terraza. Las arras deben reflejar el inmueble real (licencias, terrazas, comunidades pequeñas) y no un modelo genérico de “Barcelona”.',
      anguloComprador:
        'Comprar en Vila de Gràcia o Camp d’En Grassot implica revisar terrazas no declaradas, obras de comunidad en edificios bajos y plazos de hipoteca realistas.',
      anguloVendedor:
        'Vender en Gràcia con arras penitenciales evita que el comprador bloquee el piso meses sin garantía económica clara.',
    },
    mercado: {
      titulo: 'Compraventa en Gràcia',
      intro:
        'Mercado muy residencial, con fuerte demanda local y compradores que buscan barrio de vida, no solo inversión.',
      precioOrientativo:
        'Suelen situarse por encima de la media de Barcelona en zonas céntricas del distrito; la señal depende del precio cerrado en visita.',
      perfilComprador:
        'Parejas jóvenes, familias que ya viven en el barrio y compradores que venden en otra zona para entrar en Gràcia.',
      particularidad:
        'Terrazas, reformas integrales y licencias de obra: las arras conviene condicionarlas a comprobar legalidad de ampliaciones.',
    },
    normativa: {
      titulo: 'Arras y fiscalidad en Gràcia (Cataluña)',
      intro: 'Misma base civil y tributaria que Barcelona capital, con énfasis en documentación del inmueble concreto.',
      bloques: NORMA_ARRAS_CATALUNA,
    },
    blindaje: {
      titulo: 'Blindaje del contrato en Gràcia',
      intro: 'Incluimos en la redacción:',
      puntos: [
        { titulo: 'Terrazas y anejos', texto: 'Descripción del inmueble acorde a catastro y registro.' },
        { titulo: 'Financiación', texto: 'Calendario bancario creíble para operaciones con hipoteca.' },
        { titulo: 'Resolución', texto: 'Causas de resolución si aparecen cargas ocultas o incumplimiento documental.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Gràcia',
      intro: 'Evita sorpresas después de la señal:',
      bullets: [
        'Condición suspensiva de hipoteca bien calendada',
        'Plazo para revisar comunidad y obras',
        'Cláusulas sobre estado y equipamiento',
        'Penalización clara si el vendedor vende a tercero',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Gràcia',
      intro: 'Arras que te protegen:',
      bullets: [
        'Importe de señal y calendario de escritura',
        'Retención si el comprador desiste sin causa',
        'Obligación de exclusividad durante el plazo pactado',
        'Entrega de docs urbanísticas en fechas concretas',
      ],
    },
    faqs: [
      {
        q: '¿Las arras en Gràcia requieren notario?',
        a: 'No para las arras: valen con firma privada. La escritura definitiva sí es ante notario.',
      },
      {
        q: '¿Mismo precio Inmonest en Gràcia?',
        a: 'Sí, 145 € IVA incluido, redacción personalizada y entrega en 48 h.',
      },
    ],
  },

  sants: {
    slug: 'sants',
    nombre: 'Sants',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Contrato arras Sants Barcelona — penitenciales 145€',
      description:
        'Contrato de arras en Sants (Barcelona): compraventa, señal penitencial, hipoteca e ITP. Gestoría online 145€, 48h.',
      keywords: ['contrato arras sants', 'arras sants barcelona', 'señal compraventa sants'],
      ogTitle: 'Arras penitenciales en Sants — contrato en 48h',
      ogDescription: 'Compraventa en Sants con arras personalizadas. 145€ IVA incluido.',
    },
    hero: {
      badge: 'Sants · Compraventa',
      h1: 'Contrato de arras en Sants: compraventa con plazos realistas cerca de la estación',
      subtitulo:
        'Sants combina vivienda de barrio, pisos para familias y operaciones con compradores que priorizan comunicaciones. Las arras deben cuadrar calendario de hipoteca y entrega de llaves con la realidad del trámite bancario.',
      anguloComprador:
        'Si compras cerca de Sants Estació o Hostafrancs, revisa cargas, ascensor y estado de fincas de los años 60-80 antes de entregar señal alta.',
      anguloVendedor:
        'Si vendes en Sants, fija señal y plazos que disuadan al comprador de “congelar” el piso sin compromiso económico.',
    },
    mercado: {
      titulo: 'Mercado en Sants',
      intro: 'Demanda estable de vivienda habitual, con mezcla de reformas y pisos para entrar a vivir.',
      precioOrientativo: 'Precios por m² generalmente por debajo del Eixample; señal habitual 5-10 %.',
      perfilComprador: 'Familias, compradores primera vivienda con hipoteca y traslados laborales.',
      particularidad: 'Fincas con comunidades activas en obras de eficiencia; conviene condicionar arras a ITE o certificados.',
    },
    normativa: { titulo: 'Base legal arras en Sants', intro: 'Código Civil + ITP Cataluña + documentación urbanística.', bloques: NORMA_ARRAS_CATALUNA },
    blindaje: {
      titulo: 'Qué incluye la redacción',
      intro: 'Contrato a medida para Sants:',
      puntos: [
        { titulo: 'Hipoteca', texto: 'Suspensiva con fechas y prueba de denegación bancaria.' },
        { titulo: 'Registro', texto: 'Coherencia con nota simple del inmueble.' },
        { titulo: 'Plazos', texto: 'Fecha límite de escritura y efectos del retraso.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Sants',
      intro: 'Protege tu señal:',
      bullets: ['Condición de financiación', 'Revisión de cargas', 'Descripción exacta del piso', 'Penalización por incumplimiento del vendedor'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Sants',
      intro: 'Arras que cierran la operación:',
      bullets: ['Señal penitencial clara', 'Calendario hasta notaría', 'Exclusividad temporal', 'Documentación en plazo'],
    },
    faqs: [
      { q: '¿Puedo firmar arras el mismo día de la visita en Sants?', a: 'Es habitual, pero conviene redactar antes de transferir la señal; nosotros entregamos en 48 h tras recibir datos.' },
      { q: '¿ITP en Sants?', a: 'Tributa como compraventa en Cataluña (ITP); el precio en arras debe coincidir con el de escritura salvo pactos válidos.' },
    ],
  },

  poblenou: {
    slug: 'poblenou',
    nombre: 'Poblenou',
    distrito: 'Sant Martí',
    meta: {
      title: 'Contrato arras Poblenou Barcelona — penitenciales 145€',
      description:
        'Arras penitenciales en Poblenou: compraventa, 22@, vivienda reformada e hipoteca. Contrato personalizado 145€, 48h.',
      keywords: ['contrato arras poblenou', 'arras poblenou barcelona', 'comprar piso poblenou arras'],
      ogTitle: 'Contrato de arras en Poblenou — señal en compraventa',
      ogDescription: 'Arras a medida en Poblenou y 22@. 145€, entrega 48h.',
    },
    hero: {
      badge: 'Poblenou · Compraventa',
      h1: 'Contrato de arras en Poblenou: señal blindada entre playa, 22@ y vivienda nueva',
      subtitulo:
        'Poblenou concentra lofts, pisos reformados y promociones recientes. Las arras deben distinguir obra nueva (IVA vs ITP), licencias de primera ocupación y arras en operaciones rápidas.',
      anguloComprador:
        'Comprar cerca del 22@ o la Vila Olímpica exige revisar titularidad, cargas y si la operación es obra nueva o segunda mano antes de la señal.',
      anguloVendedor:
        'Vender en Poblenou con demanda internacional: arras en castellano o catalán, plazos y señal que eviten compradores que desisten sin coste.',
    },
    mercado: {
      titulo: 'Compraventa en Poblenou',
      intro: 'Zona en transformación con mix de stock antiguo reconvertido y vivienda nueva.',
      precioOrientativo: 'Rango amplio según calidad de reforma y proximidad al mar; señal negociada caso a caso.',
      perfilComprador: 'Perfiles tech, familias y compradores que buscan vida junto al mar con buena conexión.',
      particularidad: 'Operaciones con inversores y compradores extranjeros: claridad en idioma, plazos y medios de pago de la señal.',
    },
    normativa: { titulo: 'Normativa arras Poblenou', intro: 'Civil, tributaria y urbanística en Cataluña.', bloques: NORMA_ARRAS_CATALUNA },
    blindaje: {
      titulo: 'Blindaje en Poblenou',
      intro: 'Adaptamos el contrato a:',
      puntos: [
        { titulo: 'Obra nueva vs usada', texto: 'Coherencia fiscal y documental según tipo de operación.' },
        { titulo: 'Hipoteca', texto: 'Plazos realistas para aprobación bancaria.' },
        { titulo: 'Pagos', texto: 'Trazabilidad de la señal (transferencia, plazos).' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Poblenou',
      intro: 'Checklist contractual:',
      bullets: ['Suspensiva hipoteca', 'Revisión registral', 'Plazo documentación urbanística', 'Penalizaciones simétricas'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Poblenou',
      intro: 'Tu operación amarrada:',
      bullets: ['Señal penitencial', 'Fecha escritura', 'Exclusividad', 'Entrega de certificados'],
    },
    faqs: [
      { q: '¿Arras en promoción nueva en Poblenou?', a: 'Sí, pero el marco fiscal y documental cambia; el contrato debe reflejar si es transmisión sujeta a IVA o compraventa usada.' },
      { q: '¿Entrega en 48 h?', a: 'Sí, tras recibir datos de partes e inmueble; precio 145 € IVA incluido.' },
    ],
  },

  'les-corts': {
    slug: 'les-corts',
    nombre: 'Les Corts',
    distrito: 'Les Corts',
    meta: {
      title: 'Contrato arras Les Corts Barcelona — penitenciales 145€',
      description:
        'Contrato de arras en Les Corts: compraventa residencial, Zona Universitaria, ITP e hipoteca. 145€, 48 horas.',
      keywords: ['contrato arras les corts', 'arras les corts barcelona', 'señal compraventa les corts'],
      ogTitle: 'Arras penitenciales Les Corts — Barcelona',
      ogDescription: 'Arras personalizadas en Les Corts. 145€, gestor asignado.',
    },
    hero: {
      badge: 'Les Corts · Compraventa',
      h1: 'Contrato de arras en Les Corts: compraventa estable junto a la Zona Universitaria',
      subtitulo:
        'Les Corts es un distrito residencial con fincas amplias y demanda familiar. Las arras deben contemplar plazos de hipoteca conservadores y revisión de comunidades con pocos vecinos pero obras costosas.',
      anguloComprador:
        'Comprar cerca de Pedralbes o la Zona Universitaria implica verificar cargas, parking y estado de fincas de los 70-90.',
      anguloVendedor:
        'Vender en Les Corts: arras que retengan señal si el comprador no cierra financiación en el plazo pactado.',
    },
    mercado: {
      titulo: 'Mercado en Les Corts',
      intro: 'Perfil mayoritariamente de vivienda habitual y familias, con menos rotación especulativa que el centro.',
      precioOrientativo: 'Precios sólidos en zonas como Pedralbes; señal típica 5-10 % del precio.',
      perfilComprador: 'Familias consolidadas, profesionales y compradores que buscan estabilidad barrial.',
      particularidad: 'Viviendas con trastero y plaza de garaje: describir anejos en arras y escritura futura.',
    },
    normativa: { titulo: 'Marco legal en Les Corts', intro: 'Arras penitenciales bajo Código Civil e impuestos catalanes.', bloques: NORMA_ARRAS_CATALUNA },
    blindaje: {
      titulo: 'Contrato blindado Les Corts',
      intro: 'Incluye:',
      puntos: [
        { titulo: 'Anejos', texto: 'Parking y trastero identificados en el contrato.' },
        { titulo: 'Hipoteca', texto: 'Suspensiva y prueba de gestión bancaria.' },
        { titulo: 'Comunidad', texto: 'Plazo para certificado de deudas y obras.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Les Corts',
      intro: 'Tu señal protegida si:',
      bullets: ['Fallo bancario documentado', 'Cargas ocultas aparecen en plazo', 'El vendedor incumple exclusividad', 'La documentación urbanística no cuadra'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Les Corts',
      intro: 'Arras serias para compradores solventes:',
      bullets: ['Señal proporcional', 'Plazo escritura', 'Penalización comprador', 'Entrega docs registrales'],
    },
    faqs: [
      { q: '¿Les Corts es distinto fiscalmente del resto de Barcelona?', a: 'No: misma autoliquidación ITP en Cataluña; cambia el inmueble, no el barrio.' },
      { q: '¿Precio Inmonest?', a: '145 € IVA incluido en todos los barrios, entrega en 48 h.' },
    ],
  },
}

export function getBarcelonaArrasBarrio(slug: string): BarcelonaArrasBarrioConfig | undefined {
  if (!(BARCELONA_ARRAS_BARRIO_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARCELONA_ARRAS_BARRIOS[slug as BarcelonaArrasBarrioSlug]
}

export function getBarcelonaArrasBarrioPaths(): string[] {
  return BARCELONA_ARRAS_BARRIO_SLUGS.map((b) => `/barcelona/contrato-arras/${b}`)
}

export function listBarcelonaArrasBarrios(): BarcelonaArrasBarrioConfig[] {
  return BARCELONA_ARRAS_BARRIO_SLUGS.map((s) => BARCELONA_ARRAS_BARRIOS[s])
}
