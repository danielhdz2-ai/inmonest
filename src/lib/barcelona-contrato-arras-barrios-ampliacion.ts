import type { BarcelonaArrasBarrioConfig } from '@/lib/barcelona-contrato-arras-barrios-types'

export const BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA = [
  'sarria',
  'horta',
  'sant-andreu',
  'ciutat-vella',
  'diagonal-mar',
] as const

export type BarcelonaArrasBarrioSlugExtra = (typeof BARCELONA_ARRAS_BARRIO_SLUGS_EXTRA)[number]

export const BARCELONA_ARRAS_BARRIOS_EXTRA: Record<
  BarcelonaArrasBarrioSlugExtra,
  BarcelonaArrasBarrioConfig
> = {
  sarria: {
    slug: 'sarria',
    nombre: 'Sarrià-Sant Gervasi',
    distrito: 'Sarrià-Sant Gervasi',
    meta: {
      title: 'Sarrià: arras de alto importe sin sorpresa en el garaje subterráneo',
      description:
        'Compraventa en Sarrià, Sant Gervasi y Bonanova: señal elevada, hipoteca exigente, anejos y fiscalidad Cataluña. Contrato a medida 48 h · 145 €.',
      keywords: [
        'contrato arras sarria',
        'arras sant gervasi barcelona',
        'señal compraventa sarria',
        'comprar piso sarria arras',
      ],
      ogTitle: 'Bonanova y Tibidabo: cuando la señal supera los 40.000 €',
      ogDescription: 'Arras penitenciales para compradores solventes: trazabilidad, anejos y plazos bancarios largos.',
    },
    hero: {
      badge: 'Sarrià · Alta valoración',
      h1: 'Sarrià-Sant Gervasi: arras pensadas para señales grandes y bancos exigentes',
      subtitulo:
        'Aquí la operación suele mover cifras altas y plazos de aprobación más lentos. Un PDF estándar no refleja parking doble, trasteros múltiples ni compradores que venden en otra comunidad autónoma.',
      anguloComprador:
        'Si compras cerca de Bonanova o Sant Gervasi, negocia suspensiva de hipoteca acorde a tasación premium y revisa cada anejo registral antes de transferir señal.',
      anguloVendedor:
        'Si vendes en Sarrià, las arras deben retener señal significativa y permitir exclusividad real mientras el comprador cierra financiación sin presión de escritura en 30 días.',
    },
    mercado: {
      titulo: 'Compraventa premium en el turó',
      intro:
        'Mercado de baja rotación y alta valoración: menos operaciones, más exigencia documental y compradores que combinan venta previa + hipoteca.',
      precioOrientativo:
        'Entre los tramos más altos de Barcelona capital; la señal puede superar con holgura el 5 % habitual en pisos de más de un millón.',
      perfilComprador:
        'Familias consolidadas, ejecutivos, compradores que unifican colegios privados y vivienda amplia con terraza.',
      particularidad:
        'Operaciones con varios anejos (garaje, trastero, cuota de elementos comunes) que deben enumerarse ya en arras.',
    },
    normativa: {
      titulo: 'Sarrià: fiscalidad y arras cuando el precio escala',
      intro:
        'El ITP en Cataluña pesa más en euros absolutos; un error en la base imponible o en el calendario de pagos duele. El contrato alinea precio total, entregas a cuenta y escritura.',
      bloques: [
        {
          titulo: 'ITP y coherencia de precio',
          contenido:
            'Discrepancias entre arras, precio en publicidad y escritura generan conflictos con Hacienda y entre partes. Fijamos cifras y revisiones permitidas (mobiliario, parking).',
          bullets: ['Desglose orientativo comprador/vendedor', 'Entregas a cuenta identificadas'],
        },
        {
          titulo: 'Arras penitenciales en operaciones de lujo moderado',
          contenido:
            'La doble devolución al vendedor incumplidor sigue siendo la regla; cuantificamos señal y consecuencias sin cláusulas creativas nulas.',
          bullets: ['Importe numérico y moneda', 'Cuenta de destino de la señal'],
        },
        {
          titulo: 'Hipoteca y tasación lenta',
          contenido:
            'Bancos pueden tardar más en tasar fincas singulares. La suspensiva contempla prórroga documentada, no solo “si el banco quiere”.',
          bullets: ['Prórroga por tasación', 'Prueba de denegación formal'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sarrià-Sant Gervasi',
      intro: 'Priorizamos precisión registral y calendario:',
      puntos: [
        { titulo: 'Anejos múltiples', texto: 'Garajes y trasteros con referencia registral o precio explícito si se excluyen.' },
        { titulo: 'Señal fraccionada', texto: 'Entrega inicial + completado tras aprobación hipotecaria, si las partes lo pactan.' },
        { titulo: 'Exclusividad', texto: 'El vendedor no comercializa en portales durante el plazo de arras.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Sarrià',
      intro: 'En operaciones de este nivel conviene:',
      bullets: [
        'Suspensiva hipotecaria con prórroga realista',
        'Revisión de estatutos y obras en fincas de pocos vecinos pero alto coste',
        'Inventario de calidades y mobiliario premium',
        'Penalización vendedor por incumplimiento de exclusividad',
      ],
    },
    paraVendedor: {
      titulo: 'Vendedor en Sarrià',
      intro: 'Protege cifras altas con:',
      bullets: [
        'Señal penitencial proporcional al precio',
        'Calendario de escritura negociado (no impuesto por prisa del comprador)',
        'Retención clara si el comprador desiste',
        'Obligación de mantener suministros y estado hasta entrega',
      ],
    },
    faqs: [
      {
        q: '¿Es habitual señal superior al 10 % en Sarrià?',
        a: 'Legalmente sí se puede pactar; lo importante es que el contrato cuantifique importe y consecuencias sin ambigüedad.',
      },
      {
        q: '¿Redactáis en catalán o castellano?',
        a: 'Según preferencia de las partes; ambos idiomas son válidos si el contenido es claro y simétrico.',
      },
    ],
    contenidoUnico: {
      tituloSeccion: 'Operación en Tres Torres: dos garajes, una señal, tres abogados',
      lead:
        'En Sarrià no es raro que intervengan asesores del comprador y del vendedor; el contrato de arras debe ser legible y cerrado, no un borrador eterno.',
      escenarioLocal:
        'Comprador exige 60.000 € de señal mientras aún no tiene aprobación; redactamos hitos: 15.000 € a la firma de arras y 45.000 € tras aprobación hipotecaria documentada.',
      erroresEvitados: [
        { titulo: 'Garaje “incluido” sin registro', detalle: 'Cada plaza identificada o excluida con ajuste de precio.' },
        { titulo: 'Escritura a 30 días con banco lento', detalle: 'Plazo mínimo 60-75 días o suspensiva bien calibrada.' },
        { titulo: 'Mobiliario de diseño verbal', detalle: 'Anexo fotográfico referenciado en el contrato de arras.' },
      ],
    },
  },

  horta: {
    slug: 'horta',
    nombre: 'Horta-Guinardó',
    distrito: 'Horta-Guinardó',
    meta: {
      title: 'Horta-Guinardó: arras en casas y pisos con pendiente (no es el Eixample)',
      description:
        'Señal de compravenda en Horta, Guinardó y El Carmel: vivienda unifamiliar adosada, vistas, accesos y condición de hipoteca. 145 € · 48 h.',
      keywords: ['contrato arras horta', 'arras guinardo barcelona', 'comprar piso horta arras'],
      ogTitle: 'Del Laberint al Carmel: contrato de arras con topografía y accesos',
      ogDescription: 'Compraventa en zona elevada: descripción del inmueble, accesos y cargas de comunidad.',
    },
    hero: {
      badge: 'Horta · Pendiente y casas',
      h1: 'Horta-Guinardó: las arras deben describir accesos, aparcamiento y tipo de edificio',
      subtitulo:
        'Mezcla de casas adosadas, bloques en pendiente y pisos con vistas. Un contrato de “Barcelona genérico” no recoge rampas, plazas inclinadas ni comunidades con piscina comunitaria.',
      anguloComprador:
        'Comprar en El Carmel o Horta implica verificar acceso rodado, estado de fachadas en ladera y si el parking es plaza fija o rotativa.',
      anguloVendedor:
        'Vender en zona residencial de montaña: arras que retengan señal si el comprador no cierra hipoteca tras tasación en finca con particularidades.',
    },
    mercado: {
      titulo: 'Compraventa en la ladera',
      intro: 'Demanda de familias que buscan metros y aire, con operaciones menos frenéticas que el centro.',
      precioOrientativo: 'Precio/m² variable según orientación y vistas; señal habitual 5-10 %.',
      perfilComprador: 'Familias con coche, teletrabajo y preferencia por terraza o jardín comunitario.',
      particularidad: 'Casas y bajos con jardín: lindes, muros y elementos comunes mal descritos en contratos estándar.',
    },
    normativa: {
      titulo: 'Horta-Guinardó: descripción del inmueble en arras',
      intro: 'El riesgo aquí es físico-arquitectónico tanto como legal: accesos, elementos comunes y obras en ladera.',
      bloques: [
        {
          titulo: 'Accesos y aparcamiento',
          contenido:
            'Plazas en rampa, garajes compartidos o aparcamiento en calle regulado deben reflejarse para evitar discusiones post-señal.',
          bullets: ['Descripción de plaza o alternativa', 'Gastos de comunidad por ascensor y zonas comunes'],
        },
        {
          titulo: 'Arras penitenciales y Código Civil',
          contenido: 'Penalizaciones simétricas y plazo hasta escritura acorde a hipoteca media en la zona.',
          bullets: ['Condición suspensiva', 'Resolución por incumplimiento documental'],
        },
        {
          titulo: 'ITP Cataluña',
          contenido: 'Precio coherente entre arras y escritura; orientación sobre autoliquidación en compraventa usada.',
          bullets: ['Base imponible alineada', 'Gastos notariales orientativos'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Horta-Guinardó',
      intro: 'Enfatizamos descripción física y calendario:',
      puntos: [
        { titulo: 'Linderos y terrazas', texto: 'Orientación, muros medianeros y uso de zonas comunes.' },
        { titulo: 'Hipoteca pausada', texto: 'Plazo acorde a tasación en fincas no estándar.' },
        { titulo: 'Comunidad con piscina', texto: 'Certificado de deudas y obras de conservación en ladera.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Horta',
      intro: 'Antes de la señal:',
      bullets: ['Visita técnica orientativa si hay dudas de humedades en bajos', 'Suspensiva hipotecaria', 'Plazo para certificado urbanístico en ampliaciones', 'Cláusula de resolución por cargas'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Horta',
      intro: 'Arras que amarran la operación:',
      bullets: ['Señal penitencial clara', 'Exclusividad temporal', 'Entrega de docs de comunidad', 'Estado de jardines y zonas comunes'],
    },
    faqs: [
      { q: '¿Diferencia arras en casa adosada vs piso?', a: 'Sí en descripción, anejos y a veces en plazos de hipoteca; el precio del servicio Inmonest es el mismo.' },
      { q: '¿Qué pasa si hay humedad no vista?', a: 'Se pueden pactar plazos de inspección técnica antes de que la señal quede firme.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Casa en Vall d’Hebron: la señal antes de comprobar el muro de contención',
      lead: 'En ladera, el comprador a veces descubre obras de contención costosas tras pagar señal — el contrato puede reservar días para informe de comunidad y estado de muros.',
      escenarioLocal:
        'Vendedor declara filtración histórica reparada; comprador exige plazo de 10 días para perito. Las arras suspenden la irreversibilidad de la señal hasta informe favorable o renegociación.',
      erroresEvitados: [
        { titulo: 'Parking “en la calle”', detalle: 'Distinción entre plaza de garaje registral y aparcamiento público.' },
        { titulo: 'Vistas como garantía', detalle: 'Las vistas no son cláusula contractual; sí orientación y elementos bloqueantes conocidos.' },
        { titulo: 'Obra en ladera sin acta', detalle: 'Plazo para acta de comunidad sobre obras de muro.' },
      ],
    },
  },

  'sant-andreu': {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    meta: {
      title: 'Sant Andreu: arras en el barrio que cambia más rápido del norte de BCN',
      description:
        'Compraventa en Sant Andreu de Palomar y La Sagrera: rehabilitaciones, familias y señal penitencial con hipoteca. Contrato propio · 145 € · 48 h.',
      keywords: ['contrato arras sant andreu', 'arras la sagrera', 'señal compraventa sant andreu'],
      ogTitle: 'La Sagrera y 22@ norte: arras cuando el piso aún huele a obra',
      ogDescription: 'Rehabilitaciones recientes, ITE y calendario bancario en un distrito en transformación.',
    },
    hero: {
      badge: 'Sant Andreu · Transformación',
      h1: 'Sant Andreu: arras para compraventas en edificios recién rehabilitados',
      subtitulo:
        'Entre La Sagrera y el eje fabril reconvertido, muchos pisos salen al mercado tras obra de rehabilitación. Las arras deben mencionar garantías, ITE reciente y comunidades en pleno proceso de actualización.',
      anguloComprador:
        'Comprar aquí suele ser apuesta por conectividad futura y precio/m² más contenido; revisa actas de rehabilitación antes de señal alta.',
      anguloVendedor:
        'Vender tras reforma: arras que protejan el margen si el comprador usa la hipoteca como excusa para regatear después de la señal.',
    },
    mercado: {
      titulo: 'Compraventa en el distrito en renovación',
      intro: 'Mezcla de stock clásico de barrio y pisos reformados para familias jóvenes.',
      precioOrientativo: 'Señal típica 5-10 %; operaciones más rápidas que en Sarrià.',
      perfilComprador: 'Familias locales, parejas que salen de alquiler y compradores ligados a La Sagrera.',
      particularidad: 'Edificios con rehabilitación de fachada reciente: reparto de costes ya ejecutados vs pendientes.',
    },
    normativa: {
      titulo: 'Sant Andreu: rehabilitación y arras',
      intro: 'El foco está en obras de conservación y certificados recientes, no solo en ITP.',
      bloques: [
        {
          titulo: 'ITE y obras de rehabilitación',
          contenido:
            'Tras intervenciones en fachada o estructura, conviene anexar certificados o actas que el comprador exigirá antes de escritura.',
          bullets: ['Plazo de entrega de ITE vigente', 'Listado de obras incluidas en el precio'],
        },
        {
          titulo: 'Arras y hipoteca estándar',
          contenido: 'Suspensiva con plazo típico 45-60 días en operaciones entre particulares.',
          bullets: ['Prueba de denegación', 'Penalizaciones simétricas'],
        },
        {
          titulo: 'ITP en Cataluña',
          contenido: 'Coherencia entre precio de arras y escritura en compraventa usada.',
          bullets: ['Entregas a cuenta', 'Gastos orientativos'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Sant Andreu',
      intro: 'Contrato orientado a obra reciente:',
      puntos: [
        { titulo: 'Garantías de reforma', texto: 'Plazo para certificados de instalaciones y obra.' },
        { titulo: 'Comunidad en obras', texto: 'Derramas aprobadas reflejadas o resolución.' },
        { titulo: 'Calendario', texto: 'Escritura alineada con aprobación hipotecaria.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Sant Andreu',
      intro: 'Checklist:',
      bullets: ['Revisión de licencias de reforma', 'Suspensiva hipotecaria', 'Certificado energético post-obra', 'Penalización por vendedor que vende a otro'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Sant Andreu',
      intro: 'Protección tras invertir en reforma:',
      bullets: ['Señal que compensa el tiempo fuera del mercado', 'Exclusividad', 'Retención ante desistimiento', 'Entrega de facturas de obra relevantes'],
    },
    faqs: [
      { q: '¿La Sagrera encarece las arras?', a: 'No el precio del contrato (145 €); puede encarecer el piso, no la redacción legal.' },
      { q: '¿Puedo firmar arras el mismo día de la reforma terminada?', a: 'Mejor esperar certificados mínimos; el contrato puede fijar plazo de entrega.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Piso reformado en Sant Andreu de Palomar: garantía de instalación eléctrica',
      lead: 'Tras reforma, el comprador teme instalaciones sin legalizar; las arras pueden condicionar señal a certificado de instalador autorizado.',
      escenarioLocal:
        'Vendedor entrega factura de reforma; comprador pide CIE. Plazo de 15 días en contrato: si no se aporta, renegociación o resolución sin penalización injusta.',
      erroresEvitados: [
        { titulo: 'Piso “a estrenar” sin papel', detalle: 'Lista de certificados mínimos antes de señal firme.' },
        { titulo: 'Comunidad en litigio por obra', detalle: 'Acta de junta sobre derrama controvertida.' },
        { titulo: 'Precio post-reforma inflado', detalle: 'Coherencia tasación banco vs precio arras.' },
      ],
    },
  },

  'ciutat-vella': {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'Ciutat Vella: arras en el Gòtic sin sorpresa turística ni legal',
      description:
        'Señal penitencial en el Gòtic, el Raval y el Born: locales reconvertidos, protección patrimonial, ruido y hipoteca. 145 € · 48 h · contrato propio.',
      keywords: [
        'contrato arras gothic quarter',
        'arras ciutat vella barcelona',
        'señal compraventa born barcelona',
      ],
      ogTitle: 'El Born vs Raval: mismas arras penitenciales, riesgos distintos',
      ogDescription: 'Compravenda en casco antiguo: patrimonio, cambio de uso y condición de hipoteca.',
    },
    hero: {
      badge: 'Casco antiguo · Patrimonio',
      h1: 'Ciutat Vella: arras cuando el piso mezcla vivienda, turismo y protección histórica',
      subtitulo:
        'Edificios estrechos, locales reconvertidos y normativa de protección. Las arras deben abordar uso real del inmueble, licencias y convivencia con actividad comercial en planta baja.',
      anguloComprador:
        'Comprar en el Gòtic o el Born exige verificar cambio de uso, ruidos y cargas en fincas centenarias antes de entregar señal.',
      anguloVendedor:
        'Vender en casco antiguo: arras que disuadan compradores turísticos que desisten al conocer restricciones de alquiler o reforma.',
    },
    mercado: {
      titulo: 'Compraventa en el casco histórico',
      intro: 'Alta demanda internacional y local, con stock antiguo y regulación urbanística estricta.',
      precioOrientativo: 'Precios/m² muy variables por calle; señal negociada con intensidad.',
      perfilComprador: 'Segunda residencia, inversor con asesor, familias locales en edificios señoriales.',
      particularidad: 'Riesgo de uso turístico no declarado y obras limitadas por patrimonio.',
    },
    normativa: {
      titulo: 'Ciutat Vella: patrimonio, licencias y arras',
      intro: 'Aquí el contrato debe nombrar restricciones urbanísticas y uso, no solo ITP.',
      bloques: [
        {
          titulo: 'Protección patrimonial y obras',
          contenido:
            'Reformas interiores pueden requerir autorizaciones especiales. Reservamos plazo para comprobar licencias o condicionar arras.',
          bullets: ['Plazo urbanístico', 'Resolución si uso no coincide con licencia'],
        },
        {
          titulo: 'Ruido y actividad en planta baja',
          contenido: 'Convivencia con bares o locales: mención de servidumbres acústicas conocidas cuando proceda.',
          bullets: ['Información de actividades vecinas', 'Sin garantías imposibles sobre silencio'],
        },
        {
          titulo: 'Arras penitenciales e ITP',
          contenido: 'Base civil estándar con precio alineado entre señal y escritura.',
          bullets: ['Condición suspensiva hipoteca', 'Penalizaciones'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Ciutat Vella',
      intro: 'Enfoque patrimonio + uso:',
      puntos: [
        { titulo: 'Licencias', texto: 'Plazo para certificado urbanístico o cambio de uso.' },
        { titulo: 'Descripción histórica', texto: 'Plantas, patios y elementos protegidos descritos.' },
        { titulo: 'Hipoteca exigente', texto: 'Bancos tasan con cautela; plazos amplios.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Ciutat Vella',
      intro: 'Imprescindible:',
      bullets: ['Verificar uso vivienda vs turístico', 'Plazo para licencias', 'Suspensiva hipotecaria', 'Cláusulas sobre ruido conocido'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Ciutat Vella',
      intro: 'Evita compradores frágiles:',
      bullets: ['Señal penitencial alta si hay demanda', 'Exclusividad corta pero firme', 'Entrega de licencias existentes', 'Transparencia sobre limitaciones de reforma'],
    },
    faqs: [
      { q: '¿Puedo usar arras para comprar y alquilar turístico?', a: 'El contrato de arras no sustituye licencia turística; debe reflejar uso legal previsto.' },
      { q: '¿El casco antiguo encarece el servicio?', a: 'No: 145 € IVA incluido igual que en el resto de Barcelona.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Raval: piso con antigua licencia de local',
      lead: 'Compradores descubren tras señal que el uso no es vivienda plena; las arras pueden suspenderse hasta certificado urbanístico favorable a vivienda habitual.',
      escenarioLocal:
        'Vendedor asegura que “siempre ha sido piso”; comprador exige certificado. Plazo contractual de 20 días: sin certificado, resolución o ajuste de precio documentado.',
      erroresEvitados: [
        { titulo: 'Promesa de licencia turística', detalle: 'No se garantiza licencia futura en arras.' },
        { titulo: 'Ruido del bar de la esquina', detalle: 'Información de actividades conocidas, sin prometer silencio.' },
        { titulo: 'Reforma libre', detalle: 'Mención de posibles restricciones patrimoniales.' },
      ],
    },
  },

  'diagonal-mar': {
    slug: 'diagonal-mar',
    nombre: 'Diagonal Mar',
    distrito: 'Sant Martí',
    meta: {
      title: 'Diagonal Mar: arras en promoción del 2004 y reventa con vistas al mar',
      description:
        'Señal penitencial en Diagonal Mar y Front Marítim: comunidades grandes, anejos, ITP y compradores internacionales. 145 €, redacción 48 h.',
      keywords: ['contrato arras diagonal mar', 'arras front maritim barcelona', 'comprar piso diagonal mar arras'],
      ogTitle: 'Torres junto al CC Diagonal Mar: arras con comunidad de 200 vecinos',
      ogDescription: 'Compraventa en gran bloque: certificado de deudas, piscina comunitaria y plazos bancarios.',
    },
    hero: {
      badge: 'Front Marítim · Torres',
      h1: 'Diagonal Mar: arras en supers comunidades donde el certificado de deudas tarda',
      subtitulo:
        'Edificios de gran escala, piscina comunitaria, conserjería y muchos anejos de parking. Las arras reservan plazo real para certificado de deudas y actas voluminosas.',
      anguloComprador:
        'Comprar con vistas al mar implica revisar cuotas de comunidad elevadas, fondos de reserva y obras de fachada marina.',
      anguloVendedor:
        'Vender en Diagonal Mar: arras con señal clara mientras el comprador internacional organiza hipoteca y transferencias.',
    },
    mercado: {
      titulo: 'Compraventa en el front marítim moderno',
      intro: 'Stock de promociones de finales de 90s y 2000s, con reventas frecuentes a perfiles internacionales.',
      precioOrientativo: 'Precios altos por m² y orientación mar; señal a menudo negociada en euros fijos.',
      perfilComprador: 'Expatriados, familias con hijos en escuelas internacionales, inversores residenciales.',
      particularidad: 'Comunidades grandes: certificados de deudas y actas tardan más en obtenerse.',
    },
    normativa: {
      titulo: 'Diagonal Mar: gran comunidad y arras',
      intro: 'El cuello de botella suele ser administrativo (comunidad), no civil.',
      bloques: [
        {
          titulo: 'Certificado de deudas y fondos',
          contenido:
            'Reservamos plazo amplio para certificado y revisión de actas de los últimos dos ejercicios en comunidades de cientos de viviendas.',
          bullets: ['Plazo mínimo 15-20 días hábiles', 'Resolución si aparecen derramas extraordinarias'],
        },
        {
          titulo: 'ITP y compraventa usada',
          contenido: 'Operación típicamente sujeta a ITP; coherencia de precio y entregas a cuenta.',
          bullets: ['Desglose parking', 'Mobiliario opcional'],
        },
        {
          titulo: 'Hipoteca internacional',
          contenido: 'Compradores no residentes: plazos más largos y prueba documental de fondos.',
          bullets: ['Prórroga por transferencia internacional', 'Suspensiva hipotecaria ampliada'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje Diagonal Mar',
      intro: 'Pensado para supers comunidades:',
      puntos: [
        { titulo: 'Plazo comunidad', texto: 'Calendario realista para certificados.' },
        { titulo: 'Parking numerado', texto: 'Plaza concreta en contrato.' },
        { titulo: 'Piscina y zonas comunes', texto: 'Cuotas y obras aprobadas reflejadas.' },
      ],
    },
    paraComprador: {
      titulo: 'Comprador en Diagonal Mar',
      intro: 'Negocia plazos para:',
      bullets: ['Certificado de deudas completo', 'Revisión de actas voluminosas', 'Suspensiva hipotecaria larga', 'Transferencia internacional trazada'],
    },
    paraVendedor: {
      titulo: 'Vendedor en Diagonal Mar',
      intro: 'Arras que filtran compradores serios:',
      bullets: ['Señal en euros con cuenta clara', 'Exclusividad durante trámite bancario', 'Cooperación con administrador de fincas', 'Penalización por desistimiento infundado'],
    },
    faqs: [
      { q: '¿Por qué tarda el certificado de deudas?', a: 'En comunidades grandes el administrador necesita más tiempo; el contrato debe preverlo.' },
      { q: '¿Obra nueva en Diagonal Mar?', a: 'Hay reventas mayoritarias; si es primera transmisión, el marco fiscal cambia — lo revisamos caso a caso.' },
    ],
    contenidoUnico: {
      tituloSeccion: 'Comprador suizo: señal en franco y escritura en 90 días',
      lead: 'Operaciones internacionales necesitan plazos de transferencia y cambio, no calendarios de compraventa local estándar.',
      escenarioLocal:
        'Arras fijan 90 días hasta escritura, prórroga automática de 30 si el banco suizo retrasa desembolso, con documentación de causas.',
      erroresEvitados: [
        { titulo: 'Plazo 45 días genérico', detalle: 'Calendario acorde a comprador no residente.' },
        { titulo: 'Comunidad sin leer actas', detalle: 'Plazo para actas de los últimos 24 meses.' },
        { titulo: 'Plaza de parking genérica', detalle: 'Número de plaza y registro si existe.' },
      ],
    },
  },
}
