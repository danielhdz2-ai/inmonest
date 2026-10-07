import type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios-types'

export const BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA_2 = [
  'nou-barris',
  'el-clot',
  'vila-olimpica',
  'montjuic',
  'la-marina',
] as const

export type BarcelonaArrasBarrioSlugExtra2 = (typeof BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA_2)[number]

export const BARCELONA_ARRAS_BARRIOS_EXTRA_2: Record<
  BarcelonaArrasBarrioSlugExtra2,
  BarcelonaArrasBarrioConfig
> = {
  'nou-barris': {
    slug: 'nou-barris',
    nombre: 'Nou Barris',
    distrito: 'Nou Barris',
    meta: {
      title: 'Nou Barris: arras cuando el piso cuesta menos pero la comunidad puede costar más',
      description:
        'Señal penitencial en Verdun, Roquetes o Trinitat Nova: derramas, rehabilitación de bloques y hipoteca en zona residencial densa. 145 € · 48 h.',
      keywords: [
        'contrato arras nou barris',
        'arras verdun barcelona',
        'señal compraventa trinitat nova',
        'comprar piso nou barris arras',
      ],
      ogTitle: 'Roquetes: arras con acta de comunidad antes de la transferencia',
      ogDescription: 'Compraventa en bloques de los 70: ITE, derramas y plazos bancarios realistas.',
    },
    hero: {
      badge: 'Nou Barris · Bloques y derramas',
      h1: 'Nou Barris: contrato de arras cuando la finca es asequible y la comunidad no',
      subtitulo:
        'Aquí el riesgo no suele ser el precio del piso, sino obras colectivas, ascensores pendientes y actas que el vendedor no ha leído. Las arras reservan días para certificado de deudas y revisión de derramas.',
      anguloComprador:
        'Si compras en Verdun o la Guineueta, negocia plazo para certificado de deudas y actas de los últimos ejercicios antes de que la señal quede firme.',
      anguloVendedor:
        'Vender en Nou Barris: arras con señal clara y cooperación obligatoria con el administrador para no retrasar la operación por papeles de comunidad.',
    },
    mercado: {
      titulo: 'Compraventa en el distrito más extenso',
      intro:
        'Alta proporción de vivienda pública rehabilitada y bloques en proceso de mejora energética; operaciones con compradores locales y familias que suben desde alquiler.',
      precioOrientativo: 'Precio/m² contenido respecto al centro; señal habitual 5-10 % del precio pactado.',
      perfilComprador: 'Primera vivienda, familias numerosas, compradores que priorizan metros sobre postal.',
      particularidad: 'Derramas por ascensor, fachada o ITE colectiva: pueden aparecer después de la visita.',
    },
    normativa: {
      titulo: 'Nou Barris: arras y deuda oculta de comunidad',
      intro: 'El contrato debe prever resolución si el certificado de deudas o las actas muestran cargas inasumibles.',
      bloques: [
        {
          titulo: 'Certificado de deudas y derramas',
          contenido:
            'Plazo mínimo para obtener certificado y revisar acuerdos de junta sobre obras no ejecutadas; cláusula de resolución con devolución de señal si supera umbral pactado.',
          bullets: ['Umbral de derrama aceptable', 'Plazo 10-15 días hábiles típico'],
        },
        {
          titulo: 'Arras penitenciales',
          contenido: 'Importe y cuenta de señal trazables; penalizaciones simétricas según Código Civil.',
          bullets: ['Condición suspensiva de hipoteca', 'Exclusividad del vendedor'],
        },
        {
          titulo: 'ITP Cataluña',
          contenido: 'Precio en arras alineado con escritura; orientación sobre autoliquidación en segunda mano.',
          bullets: ['Sin “sobre” en negro', 'Gastos notariales orientativos'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Nou Barris',
      intro: 'Priorizamos comunidad y calendario:',
      puntos: [
        { titulo: 'Actas recientes', texto: 'Obligación de aportar actas de los dos últimos años.' },
        { titulo: 'ITE y ascensor', texto: 'Mención de estado del ascensor y obras aprobadas.' },
        { titulo: 'Hipoteca estándar', texto: 'Plazo bancario acorde a tasación en zona no premium.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Nou Barris',
      intro: 'Antes de transferir señal:',
      bullets: [
        'Certificado de deudas sin sorpresas',
        'Revisión de derrama de ascensor o fachada',
        'Suspensiva hipotecaria documentada',
        'Resolución si la comunidad supera el límite pactado',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Nou Barris',
      intro: 'Arras que evitan meses de bloqueo:',
      bullets: [
        'Entrega rápida de docs de comunidad',
        'Señal penitencial proporcional',
        'Exclusividad mientras el comprador tramita hipoteca',
        'Transparencia sobre obras conocidas',
      ],
    },
    faqs: [
      {
        q: '¿Puedo desistir si aparece una derrama enorme?',
        a: 'Sí si el contrato reserva plazo y umbral; hay que redactarlo antes de firmar, no después.',
      },
      {
        q: '¿Cuánto tarda el certificado de deudas aquí?',
        a: 'Suele ser más ágil que en torres del front marítim, pero depende del administrador; el contrato fija plazo mínimo.',
      },
    ],
    contenidoUnico: {
      tituloSeccion: 'Trinitat Nova: señal firmada el viernes, derrama de ascensor el lunes',
      lead:
        'En Nou Barris hemos visto compradores que pierden negociación porque no reservaron días para actas entre arras y transferencia bancaria.',
      escenarioLocal:
        'Comprador exige 7 días tras recepción de actas para desistir sin penalización si la derrama aprobada supera 8.000 €; vendedor acepta porque ya conocía la junta pendiente.',
      erroresEvitados: [
        { titulo: '“Comunidad al día” verbal', detalle: 'Certificado de deudas y actas como condición previa a señal firme.' },
        { titulo: 'Plazo 30 días genérico', detalle: 'Calendario que incluye tiempo administrador + banco.' },
        { titulo: 'Parking sin número', detalle: 'Plaza identificada o exclusión explícita del precio.' },
      ],
    },
  },

  'el-clot': {
    slug: 'el-clot',
    nombre: 'El Clot',
    distrito: 'Sant Martí',
    meta: {
      title: 'El Clot: arras entre el Parc del Clot y Glòries (rehabilitación y reventa)',
      description:
        'Compraventa en El Clot y Camp de l’Arpa: pisos reformados, locales bajos y condición de hipoteca con Glòries en transformación. Contrato 145 € · 48 h.',
      keywords: ['contrato arras el clot', 'arras camp de l arpa', 'señal compraventa clot barcelona'],
      ogTitle: 'Clot–Glòries: arras cuando el vecino aún es obra',
      ogDescription: 'Ruido, ITE y calendario bancario en un barrio entre estación y parque.',
    },
    hero: {
      badge: 'El Clot · Estación y parque',
      h1: 'El Clot: arras para compraventas entre vía ferroviaria, parque y eje Glòries',
      subtitulo:
        'Mezcla de fincas pre-rehabilitación y pisos ya reformados para reventa. Las arras deben mencionar ruido ferroviario conocido, locales comerciales en planta baja y plazos realistas mientras el entorno urbano cambia.',
      anguloComprador:
        'Comprar cerca del Clot o Camp de l’Arpa: revisa cambio de uso en bajos, estado de fachada y si la reforma tiene licencia antes de la señal.',
      anguloVendedor:
        'Vender tras reforma express: arras que retengan señal si el comprador intenta rebajar precio tras la tasación por proximidad a vía.',
    },
    mercado: {
      titulo: 'Compraventa en conexión con Sagrera',
      intro: 'Demanda de parejas jóvenes y familias que buscan equilibrio precio/conectividad; rotación media-alta.',
      precioOrientativo: 'Señal 5-10 %; operaciones a menudo condicionadas a hipoteca estándar.',
      perfilComprador: 'Usuarios de Rodalies/Metro, teletrabajo parcial, upgrade desde alquiler en Sant Martí.',
      particularidad: 'Locales en bajos y viviendas sobre comercio: revisión urbanística imprescindible.',
    },
    normativa: {
      titulo: 'El Clot: arras y fincas mixtas',
      intro: 'Vivienda sobre local o bajos reconvertidos exigen descripción precisa en el contrato.',
      bloques: [
        {
          titulo: 'Uso y licencias',
          contenido:
            'Plazo para comprobar certificado de habitabilidad, licencia de obra menor o mayor en reformas recientes.',
          bullets: ['Descripción planta y anejos', 'Resolución si falta documentación urbanística'],
        },
        {
          titulo: 'Arras penitenciales',
          contenido: 'Señal trazable, plazo hasta escritura y penalizaciones simétricas.',
          bullets: ['Condición suspensiva hipoteca', 'Exclusividad vendedor'],
        },
        {
          titulo: 'ITP en Cataluña',
          contenido: 'Coherencia precio arras / total; mobiliario y parking desglosados si aplica.',
          bullets: ['Base imponible clara', 'Entregas a cuenta identificadas'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje El Clot',
      intro: 'Enfoque en reforma y entorno:',
      puntos: [
        { titulo: 'Reforma reciente', texto: 'Facturas o licencia referenciada en plazo de revisión.' },
        { titulo: 'Ruido y entorno', texto: 'Declaración de proximidad a vía si las partes lo pactan.' },
        { titulo: 'Comunidad pequeña', texto: 'Certificado de deudas en plazos cortos.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en El Clot',
      intro: 'Negocia en arras:',
      bullets: [
        'Plazo para licencia de reforma',
        'Suspensiva hipotecaria',
        'Revisión de estatutos si hay local en bajo',
        'Resolución por cargas ocultas',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en El Clot',
      intro: 'Protege la reventa post-reforma:',
      bullets: [
        'Señal penitencial clara',
        'Exclusividad durante trámite bancario',
        'Entrega de docs de obra si las hubo',
        'Penalización por desistimiento infundado',
      ],
    },
    faqs: [
      { q: '¿Influye Glòries en las arras?', a: 'No es cláusula mágica, pero conviene plazos flexibles si hay incertidumbre de tasación por entorno en obras.' },
      { q: '¿Piso reformado sin licencia?', a: 'El contrato puede reservar días para comprobar legalidad antes de señal firme.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Camp de l’Arpa: comprador exige silencio… y el contrato no promete decibelios',
      lead:
        'Las arras no sustituyen un informe acústico, pero sí pueden registrar que el comprador visitó con tren circulando y renunció a reclamar por ese motivo si se documenta.',
      escenarioLocal:
        'Vendedor aporta informe orientativo de ruido; comprador firma arras con cláusula de conocimiento de proximidad ferroviaria, reservando solo revisión de cargas y hipoteca.',
      erroresEvitados: [
        { titulo: '“Reformado a estrenar” sin papel', detalle: 'Plazo para licencia o resolución.' },
        { titulo: 'Local bajo sin mencionar', detalle: 'Descripción de planta y uso del bajo.' },
        { titulo: 'Escritura a 45 días fijos', detalle: 'Prórroga por tasación en zona en transformación.' },
      ],
    },
  },

  'vila-olimpica': {
    slug: 'vila-olimpica',
    nombre: 'Vila Olímpica',
    distrito: 'Sant Martí',
    meta: {
      title: 'Vila Olímpica: arras en torres olímpicas, turismo y segunda residencia',
      description:
        'Señal en Vila Olímpica y Port Olímpic: estatutos anti-turismo, comunidades con piscina y compradores nacionales e internacionales. 145 € · 48 h.',
      keywords: [
        'contrato arras vila olimpica',
        'arras port olimpic barcelona',
        'comprar piso vila olimpica arras',
      ],
      ogTitle: "Torres del '92: arras cuando el estatuto prohíbe alquiler turístico",
      ogDescription: 'Compraventa en promoción olímpica: uso de vivienda, comunidad y plazos bancarios.',
    },
    hero: {
      badge: 'Vila Olímpica · 1992',
      h1: 'Vila Olímpica: arras en fincas donde el estatuto manda más que el anuncio',
      subtitulo:
        'Compradores atraídos por mar y vida de barrio, pero las comunidades suelen limitar usos turísticos. Un contrato genérico no recoge prohibiciones estatutarias, piscina comunitaria ni orientación sur con brisa marina.',
      anguloComprador:
        'Antes de señal en Vila Olímpica, lee estatutos y actas sobre alquiler temporal; las arras pueden reservar plazo para confirmar uso permitido.',
      anguloVendedor:
        'Vender con vistas al Port: arras que eviten que el comprador use “sorpresa estatutaria” para romper operación tras meses de trámite.',
    },
    mercado: {
      titulo: 'Compraventa post-Juegos Olímpicos',
      intro: 'Stock homogéneo de torres, muchas reventas y perfil internacional en verano.',
      precioOrientativo: 'Precio/m² alto por ubicación; señal a menudo en importe fijo negociado.',
      perfilComprador: 'Segundas residencias, familias con vínculo marítimo, expatriados en Barcelona.',
      particularidad: 'Conflictos uso vivienda vs turismo: deben anticiparse en arras, no en escritura.',
    },
    normativa: {
      titulo: 'Vila Olímpica: uso de vivienda y arras',
      intro: 'El riesgo regulatorio del barrio se anticipa en el contrato de señal.',
      bloques: [
        {
          titulo: 'Estatutos y uso',
          contenido:
            'Plazo para aportar estatutos y actas sobre limitaciones de alquiler; resolución si el uso pretendido por el comprador es incompatible.',
          bullets: ['Declaración de uso previsto', 'Plazo 10 días para estatutos'],
        },
        {
          titulo: 'Arras penitenciales e ITP',
          contenido: 'ITP en reventa usada; precio coherente y señal penitencial simétrica.',
          bullets: ['Condición suspensiva financiación', 'Parking en anexo'],
        },
        {
          titulo: 'Comunidad con piscina',
          contenido: 'Certificado de deudas, cuotas de mantenimiento de zonas comunes y obras de fachada marina.',
          bullets: ['Fondos de reserva', 'Plazo certificado de deudas'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Vila Olímpica',
      intro: 'Uso, comunidad y calendario:',
      puntos: [
        { titulo: 'Uso compatible', texto: 'Confirmación estatutaria antes de señal firme.' },
        { titulo: 'Piscina y cuotas', texto: 'Deudas y obras reflejadas en plazo de revisión.' },
        { titulo: 'Comprador extranjero', texto: 'Plazos ampliados para transferencia y hipoteca.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Vila Olímpica',
      intro: 'Checklist en arras:',
      bullets: [
        'Estatutos sobre alquiler temporal',
        'Certificado de deudas',
        'Suspensiva hipotecaria o prueba de fondos',
        'Orientación sur y anejos de parking',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Vila Olímpica',
      intro: 'Arras sólidas:',
      bullets: [
        'Señal penitencial clara',
        'Entrega de estatutos al día',
        'Exclusividad durante trámite',
        'Cooperación con administrador de fincas',
      ],
    },
    faqs: [
      {
        q: '¿Puedo comprar para alquiler turístico?',
        a: 'Depende de estatutos y normativa; las arras pueden reservar plazo para confirmarlo antes de señal irreversible.',
      },
      { q: '¿Es lo mismo que Diagonal Mar?', a: 'No: Vila Olímpica es promoción olímpica con perfil estatutario distinto; el contrato se adapta a este barrio.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Port Olímpic: comprador belga y estatuto que prohíbe estancias inferiores a 30 días',
      lead:
        'Operaciones internacionales chocan con estatutos locales; las arras fijan plazo para asesoramiento y desistimiento documentado si el uso no encaja.',
      escenarioLocal:
        'Comprador declara uso residencial largo; tras leer estatutos confirma compatibilidad. Si no, resolución sin penalización en 5 días desde entrega de actas.',
      erroresEvitados: [
        { titulo: 'Promesa de rentabilidad turística', detalle: 'El contrato no garantiza uso no permitido por estatutos.' },
        { titulo: 'Comunidad sin leer', detalle: 'Plazo específico para estatutos y actas de alquiler.' },
        { titulo: 'Plazo bancario corto', detalle: 'Prórroga para compradores no residentes.' },
      ],
    },
  },

  montjuic: {
    slug: 'montjuic',
    nombre: 'Montjuïc',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'Montjuïc: arras en Poble-sec y la falda del parque (no confundir con Sants)',
      description:
        'Señal en Poble-sec, Font de la Guatlla y entorno Fira: fincas en pendiente, locales y condición de hipoteca. Arras a medida 145 € · 48 h.',
      keywords: ['contrato arras montjuic', 'arras poble sec', 'señal compraventa montjuic barcelona'],
      ogTitle: 'Poble-sec: arras bajo Montjuïc cuando el bajo comercial compite con la vivienda',
      ogDescription: 'Compraventa en falda del parque: descripción de planta, ruido de ocio y cargas.',
    },
    hero: {
      badge: 'Montjuïc · Poble-sec',
      h1: 'Montjuïc y Poble-sec: arras cuando la vida de barrio y el turismo comparten calle',
      subtitulo:
        'Fincas entre teatros, bares y parque. Las arras deben describir planta (bajo vs principal), posibles limitaciones acústicas nocturnas y accesos en calles estrechas con pendiente.',
      anguloComprador:
        'Comprar en Poble-sec: verifica si hay actividad comercial en planta baja, estado de fachada en calle con mucho paso y plazo hipotecario realista.',
      anguloVendedor:
        'Vender cerca de Avinguda del Paral·lel: arras con exclusividad y señal que filtre compradores que luego usan el ambiente nocturno como excusa para romper.',
    },
    mercado: {
      titulo: 'Compraventa en la falda del parque',
      intro: 'Mezcla de pisos señoriales en Poble-sec y vivienda más modesta hacia la Fira; demanda cultural y gastronómica.',
      precioOrientativo: 'Rango amplio según calle; señal 5-10 % habitual.',
      perfilComprador: 'Creativos, familias que buscan vida de barrio, compradores que valoran Montjuïc a pie.',
      particularidad: 'Bajos y entresuelos con humedad o ruido: deben mencionarse o reservar inspección.',
    },
    normativa: {
      titulo: 'Montjuïc: arras y finca en entorno mixto',
      intro: 'Descripción física y plazos de revisión pesan tanto como el ITP.',
      bloques: [
        {
          titulo: 'Planta y uso del inmueble',
          contenido:
            'Identificación de vivienda vs local, accesos independientes y estado declarado de reformas.',
          bullets: ['Plazo inspección técnica opcional', 'Resolución por incumplimiento documental'],
        },
        {
          titulo: 'Arras penitenciales',
          contenido: 'Señal, plazo hasta escritura y penalizaciones simétricas; condición suspensiva de hipoteca.',
          bullets: ['Cuenta de señal clara', 'Exclusividad'],
        },
        {
          titulo: 'ITP Cataluña',
          contenido: 'Precio total coherente; orientación gastos compraventa usada.',
          bullets: ['Parking en calle vs garaje', 'Mobiliario excluido explícito'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Montjuïc',
      intro: 'Barrio y finca:',
      puntos: [
        { titulo: 'Entorno nocturno', texto: 'Conocimiento declarado de zona de ocio si aplica.' },
        { titulo: 'Pendiente y acceso', texto: 'Descripción de accesos rodados y parking.' },
        { titulo: 'Comunidad pequeña', texto: 'Certificado de deudas en plazo corto.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Montjuïc',
      intro: 'Antes de señal:',
      bullets: [
        'Visita en horario nocturno si te preocupa ruido',
        'Suspensiva hipotecaria',
        'Plazo para certificado urbanístico en ampliaciones',
        'Revisión de cargas registrales',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Montjuïc',
      intro: 'Arras que cierran:',
      bullets: [
        'Señal penitencial',
        'Declaración honesta de estado',
        'Exclusividad temporal',
        'Entrega de docs comunidad',
      ],
    },
    faqs: [
      { q: '¿Montjuïc es lo mismo que Sants?', a: 'No: esta landing cubre Poble-sec y falda del parque; Sants Estació tiene otra guía específica.' },
      { q: '¿Puedo reservar días para perito?', a: 'Sí, es habitual pactar plazo de inspección antes de que la señal sea irreversible.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Carrer de Blai: entresuelo vendido como “silencioso” y el contrato no miente',
      lead:
        'En Poble-sec, el comprador debe conocer el entorno; las arras documentan visitas en distintos horarios y limitan reclamaciones por ruido de ocio si se aceptó expresamente.',
      escenarioLocal:
        'Comprador firma tras visita nocturna de viernes; cláusula de conocimiento de zona de terrazas sin garantía de silencio futuro, con foco en cargas e hipoteca.',
      erroresEvitados: [
        { titulo: '“Silencioso” en anuncio sin contrato', detalle: 'Conocimiento de entorno, no promesa acústica.' },
        { titulo: 'Bajo comercial ignorado', detalle: 'Descripción de planta y uso del local.' },
        { titulo: 'Humedad no mencionada', detalle: 'Plazo perito o resolución por informe desfavorable.' },
      ],
    },
  },

  'la-marina': {
    slug: 'la-marina',
    nombre: 'La Marina del Prat Vermell',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'La Marina: arras en el barrio que nace junto a la estación de alta velocidad',
      description:
        'Señal en Marina del Prat Vermell y entorno Sants-La Bordeta nueva: obra reciente, VPO y primera compra con hipoteca. 145 € · 48 h.',
      keywords: [
        'contrato arras la marina barcelona',
        'arras prat vermell',
        'comprar piso marina barcelona arras',
      ],
      ogTitle: 'Marina del Prat Vermell: arras en promoción nueva con hipoteca joven',
      ogDescription: 'Compraventa en suelo transformado: garantías, ITP o IVA según caso y plazos bancarios.',
    },
    hero: {
      badge: 'La Marina · Suelo nuevo',
      h1: 'La Marina del Prat Vermell: arras cuando el piso es nuevo pero la operación no lo es',
      subtitulo:
        'Barrio en construcción con vivienda protegida y libre, cerca de Sants. Las arras deben distinguir primera entrega vs reventa, garantías del promotor ya caducadas y comunidad aún joven.',
      anguloComprador:
        'Comprar en La Marina: confirma si es primera transmisión o reventa, estado de zonas comunes no terminadas y condición de hipoteca para vivienda nueva o seminueva.',
      anguloVendedor:
        'Reventa en zona emergente: arras que retengan señal si el comprador joven pierde aprobación hipotecaria tras cambio de criterios bancarios.',
    },
    mercado: {
      titulo: 'Compraventa en suelo transformado',
      intro: 'Alta presencia de primeras compras, ayudas y operaciones ligadas a estación Sants.',
      precioOrientativo: 'Precio/m² en evolución; señal negociada según si hay pendiente de licencia o comunidad.',
      perfilComprador: 'Primera vivienda, familias jóvenes, compradores que priorizan transporte sobre casco antiguo.',
      particularidad: 'Mezcla VPO y libre: requisitos distintos que no caben en plantilla de arras genérica.',
    },
    normativa: {
      titulo: 'La Marina: primera venta vs reventa',
      intro: 'El marco fiscal y documental cambia según etapa de la promoción; el contrato lo refleja.',
      bloques: [
        {
          titulo: 'Documentación según tramo',
          contenido:
            'Plazo para nota simple, licencia de primera ocupación en primera venta o certificado en reventa; resolución si falta documento esencial.',
          bullets: ['Identificación de vendedor (promotor vs particular)', 'Plazo revisión documental'],
        },
        {
          titulo: 'Arras penitenciales',
          contenido: 'Señal trazable y plazo hasta escritura acorde a hipoteca primera compra.',
          bullets: ['Condición suspensiva ampliada si hace falta', 'Penalizaciones simétricas'],
        },
        {
          titulo: 'ITP o tratamiento fiscal',
          contenido: 'Orientación según sea reventa (ITP habitual) u operación con tratamiento distinto; coherencia de precio en contrato.',
          bullets: ['Precio sin dobles lecturas', 'Entregas a cuenta'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje La Marina',
      intro: 'Obra reciente y calendario:',
      puntos: [
        { titulo: 'Garantías', texto: 'Estado de garantías decenal o postventa si aplica.' },
        { titulo: 'Comunidad joven', texto: 'Actas iniciales y derramas de zonas comunes pendientes.' },
        { titulo: 'Hipoteca joven', texto: 'Plazo realista para aprobación y tasación en zona nueva.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en La Marina',
      intro: 'En arras conviene:',
      bullets: [
        'Confirmar tipo de vivienda (VPO/libre) y requisitos',
        'Suspensiva hipotecaria documentada',
        'Plazo para licencia o certificado',
        'Revisión de anejos y parking subterráneo nuevo',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en La Marina',
      intro: 'Protege reventa en barrio nuevo:',
      bullets: [
        'Señal penitencial clara',
        'Entrega de docs de comunidad nascente',
        'Exclusividad durante trámite bancario',
        'Transparencia sobre obras comunes pendientes',
      ],
    },
    faqs: [
      { q: '¿Es lo mismo que Sants Estació?', a: 'No: La Marina es el desarrollo del Prat Vermell; Sants tiene landing propia para el núcleo clásico.' },
      { q: '¿Vivienda protegida en arras?', a: 'Si aplica VPO, pueden existir requisitos adicionales; lo revisamos en la solicitud del contrato.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Primera reventa en torre nueva: señal antes de que exista acta de comunidad “gorda”',
      lead:
        'Comunidades recién constituidas tienen pocas actas pero muchas decisiones pendientes; las arras reservan plazo para junta fundacional o informe del administrador.',
      escenarioLocal:
        'Comprador exige 12 días para informe del administrador sobre obras de zonas comunes no terminadas; vendedor acepta porque compró hace 18 meses y conoce el historial.',
      erroresEvitados: [
        { titulo: 'Tratar reventa como obra nueva', detalle: 'Documentación acorde a particular vendedor.' },
        { titulo: 'Plazo 30 días con hipoteca joven', detalle: 'Calendario 60-75 días o suspensiva clara.' },
        { titulo: 'Parking subterráneo sin plaza', detalle: 'Número de plaza y acceso en contrato.' },
      ],
    },
  },
}
