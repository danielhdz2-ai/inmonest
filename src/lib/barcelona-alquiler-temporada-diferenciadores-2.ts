import type { BarcelonaTemporadaBarrioDiferenciador } from '@/lib/barcelona-alquiler-temporada-barrios'

/** Contenido SEO único · barrios diagonal-mar → pedralbes (10). */
export const TEMPORADA_DIFERENCIADORES_2: Record<
  | 'diagonal-mar'
  | 'nou-barris'
  | 'el-clot'
  | 'vila-olimpica'
  | 'la-marina'
  | 'el-raval'
  | 'sant-antoni'
  | 'la-barceloneta'
  | 'hostafrancs'
  | 'pedralbes',
  BarcelonaTemporadaBarrioDiferenciador
> = {
  'diagonal-mar': {
    meta: {
      title: 'Temporada Diagonal Mar — marina y oficinas 5–10 meses · 165€',
      description:
        'Alquiler temporal Diagonal Mar: contrato meses cerca CC Diagonal Mar y playa, perfiles corporativos. No turismo noches. 165 € · 48 h.',
      keywords: ['alquiler temporada diagonal mar', 'contrato temporal marina barcelona', 'piso meses diagonal'],
      ogTitle: 'Diagonal Mar: temporal corporativo y familiar',
      ogDescription: 'Estancias medias frente al mar sin LAU mal tipificado.',
    },
    hero: {
      badge: 'Diagonal Mar · CC · playa',
      h1: 'Diagonal Mar: alquiler temporal con vistas al mar para proyecto corporativo — no LAU de promoción nueva ni apartamento turístico',
      subtitulo:
        'Promociones recientes con piscina comunitaria: expatriados y familias en traslado suelen firmar LAU cuando necesitan solo un ejercicio fiscal o curso escolar.',
      anguloPropietario:
        'Alquilas piso con terraza marina entre venta y comprador: temporada delimitada y normas piscina verano en anexo.',
      anguloInquilino:
        'Proyecto 8 meses oficinas Diagonal: verifica parking subterráneo, comunidad obra nueva y fin de contrato.',
    },
    mercado: {
      titulo: 'Temporada en Diagonal Mar',
      intro: 'Perfil corporativo y familia joven; alta calidad constructiva y cuotas comunidad relevantes en contrato.',
      rentaOrientativa: '2–3 hab. temporal marina: orientativo 1.800–2.600 €/mes (2026).',
      perfilDemanda: 'Consultores waterfront, familias traslado, propietarios inversión en venta.',
      particularidad: 'Piscina comunitaria y playa: uso seasonal en cláusula temporal.',
    },
    normativaLocal: {
      titulo: 'Diagonal Mar: promoción nueva',
      contenido: 'Primeras ocupaciones: certificados y comunidad al día antes de temporada. Uso turístico por noches exige licencia aparte.',
      bullets: ['Cédula y ITE si aplica', 'Piscina comunitaria', 'Parking anexo'],
    },
    destacados: {
      titulo: 'Claves temporada Diagonal Mar',
      etiquetas: ['Corporativo', 'Piscina', '5–10 meses', 'Promoción 2000s'],
      casos: ['Consultor 9 meses CC Diagonal', 'Familia esperando entrega obra propia', 'Inversor entre inquilinos'],
      riesgos: [
        { titulo: 'Turismo playa', texto: 'Semanas sueltas ilegales sin HUT.' },
        { titulo: 'Comunidad impaga', texto: 'Deudas bloquean acceso servicios.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Diagonal Mar',
      intro: 'Promoción con servicios:',
      puntos: [
        { titulo: 'Parking y trastero', texto: 'Números en contrato.' },
        { titulo: 'Piscina', texto: 'Horario temporada alta.' },
        { titulo: '165 €', texto: 'Inmonest 48 h.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Diagonal Mar',
      intro: 'Incluye:',
      bullets: ['Causa corporativa o venta', 'Piscina y parking', 'Fianza mobiliario', 'Prohibición Airbnb'],
    },
    paraInquilino: {
      titulo: 'Inquilino Diagonal Mar',
      intro: 'Revisa:',
      bullets: ['Cuota comunidad', 'Vistas y ruido obra', 'Fin contrato', 'Acceso playa'],
    },
    faqs: [
      { q: '¿Es lo mismo que Vila Olímpica?', a: 'Barrios distintos; Vila Olímpica tiene landing propia (olímpico/post-92).' },
      { q: '¿6 meses corporativo?', a: 'Temporada típica.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'nou-barris': {
    meta: {
      title: 'Temporada Nou Barris — transito familiar meses · 165€',
      description:
        'Alquiler temporal Nou Barris: contrato 4–9 meses en zona residencial accesible. Temporada vs LAU. 165 € · 48 h.',
      keywords: ['alquiler temporada nou barris', 'contrato temporal vernou', 'piso meses nou barris'],
      ogTitle: 'Nou Barris: temporal accesible y familiar',
      ogDescription: 'Estancias por espera vivienda o trabajo en periferia.',
    },
    hero: {
      badge: 'Nou Barris · Verneda · Turó de la Peira',
      h1: 'Nou Barris: contrato de temporada para familia en lista de espera — no LAU indefinido por costumbre',
      subtitulo:
        'Zona de acceso más contenido: estancias medias mientras llega VPO o termina reforma en piso propio en el mismo distrito.',
      anguloPropietario:
        'Alquilas sin pretender LAU largo: calendario y fianza proporcional al estado del piso años 70–90.',
      anguloInquilino:
        'Espera vivienda protegida: exige fecha fin y estado real de ascensor y calefacción.',
    },
    mercado: {
      titulo: 'Temporada Nou Barris',
      intro: 'Mercado predominantemente LAU; temporadas por transito social y laboral en periferia.',
      rentaOrientativa: '3 hab. temporal: orientativo 1.100–1.600 €/mes (2026).',
      perfilDemanda: 'Familias VPO, trabajadores obra larga, herencias en trámite.',
      particularidad: 'Edificios sin ascensor: accesibilidad en inventario.',
    },
    normativaLocal: {
      titulo: 'Nou Barris: transito social',
      contenido: 'Causa “ adjudicación VPO pendiente” con comunicación orientativa refuerza temporalidad.',
      bullets: ['Duración acotada', 'No subarriendo', 'Inventario instalaciones antiguas'],
    },
    destacados: {
      titulo: 'Temporada en Nou Barris',
      etiquetas: ['VPO', 'Familia', 'Accesible', '4–9 meses'],
      casos: ['Familia 7 meses hasta adjudicación', 'Obra larga en mismo barrio', 'Herencia 3 hermanos'],
      riesgos: [
        { titulo: 'LAU por inercia', texto: 'Plantillas del centro no encajan.' },
        { titulo: 'Instalaciones', texto: 'Gas y ascensor sin revisar.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Nou Barris',
      intro: 'Fincas corrientes:',
      puntos: [
        { titulo: 'Ascensor', texto: 'Estado o planta sin ascensor firmado.' },
        { titulo: 'Fianza', texto: 'Acorde a estado real.' },
        { titulo: '165 €', texto: 'Online Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Nou Barris',
      intro: 'Incluye:',
      bullets: ['Causa VPO u obra', 'Fianza clara', 'Prohibición turismo', 'Inventario básico'],
    },
    paraInquilino: {
      titulo: 'Inquilino Nou Barris',
      intro: 'Revisa:',
      bullets: ['Metro y bus', 'Ascensor', 'Fin contrato', 'Calefacción'],
    },
    faqs: [
      { q: '¿Verneda incluida?', a: 'Sí, mismo distrito Nou Barris.' },
      { q: '¿5 meses VPO?', a: 'Causa habitual.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'el-clot': {
    meta: {
      title: 'Temporada El Clot — Estació del Nord y familias · 165€',
      description:
        'Alquiler temporal El Clot: contrato meses cerca mercado y transporte. Temporada laboral y familiar. 165 € · 48 h.',
      keywords: ['alquiler temporada el clot', 'contrato temporal estacio nord', 'piso meses clot'],
      ogTitle: 'El Clot: temporal bien conectado',
      ogDescription: 'Meses por trabajo en zona ferroviaria y mercado.',
    },
    hero: {
      badge: 'El Clot · Estació del Nord',
      h1: 'El Clot: alquiler temporal para quien trabaja en entorno Estació del Nord — fechas fin, no LAU copiado',
      subtitulo:
        'Barrio en transformación con mercado y vivienda mixta: estancias de montaje, comercio temporal o familia en transito.',
      anguloPropietario:
        'Alquilas entre inquilinos LAU durante reforma local comercial en planta baja: delimita uso solo vivienda.',
      anguloInquilino:
        'Trabajo 6 meses zona Clot: confirma ruido mercado y fin de contrato post-proyecto.',
    },
    mercado: {
      titulo: 'Temporada El Clot',
      intro: 'Conectividad RENFE y metro; pisos familiares con estancias medias por empleo y espera vivienda.',
      rentaOrientativa: '2–3 hab. temporal: orientativo 1.300–1.850 €/mes (2026).',
      perfilDemanda: 'Comerciantes temporales, familias, técnicos instalación.',
      particularidad: 'Mercado y eventos calle: cláusula ruido domingo/madrugada.',
    },
    normativaLocal: {
      titulo: 'El Clot: uso vivienda vs local',
      contenido: 'Si hay local en finca, confirmar que arrendamiento es solo vivienda superior sin actividad incompatible.',
      bullets: ['Uso exclusivo vivienda', 'Horarios mercado conocidos', 'Duración proyecto'],
    },
    destacados: {
      titulo: 'Temporada El Clot',
      etiquetas: ['Estació Nord', 'Mercado', '6 meses', 'Transito'],
      casos: ['Montaje tienda 4 meses vive arriba', 'Familia esperando piso Sant Martí', 'Técnico ferroviario'],
      riesgos: [
        { titulo: 'Ruido mercado', texto: 'Sin cláusula = conflictos.' },
        { titulo: 'Local bajo', texto: 'Actividad no declarada.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · El Clot',
      intro: 'Barrio mixto:',
      puntos: [
        { titulo: 'Entorno mercado', texto: 'Conocimiento horarios.' },
        { titulo: 'Calendario', texto: 'Fin post-proyecto.' },
        { titulo: '165 €', texto: 'PDF 48 h.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario El Clot',
      intro: 'Incluye:',
      bullets: ['Causa laboral', 'Ruido mercado', 'Fianza', 'No turismo'],
    },
    paraInquilino: {
      titulo: 'Inquilino El Clot',
      intro: 'Revisa:',
      bullets: ['Renfe/metro', 'Mercado domingo', 'Fin contrato', 'Comunidad'],
    },
    faqs: [
      { q: '¿Sant Martí?', a: 'El Clot es barrio Sant Martí; contrato igual lógica temporada.' },
      { q: '¿4 meses montaje?', a: 'Válido con anexo fechas.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'vila-olimpica': {
    meta: {
      title: 'Temporada Vila Olímpica — post-92 meses sin turismo · 165€',
      description:
        'Alquiler temporal Vila Olímpica: contrato estancia media residencial, playa y empresas. Distinto HUT. 165 € · 48 h.',
      keywords: ['alquiler temporada vila olimpica', 'contrato temporal olympic village barcelona', 'meses vila olimpica'],
      ogTitle: 'Vila Olímpica: meses residenciales ≠ noches playa',
      ogDescription: 'Teletrabajo y familias verano largo con fecha fin.',
    },
    hero: {
      badge: 'Vila Olímpica · Port Olímpic',
      h1: 'Vila Olímpica: temporada de meses en parcela olímpica — separar turismo de verano y LAU de terraza marina',
      subtitulo:
        'Edificios del 92 con mucha presión turística en plantas bajas: estancia 5–8 meses para residente exige contrato claro y prohibición de subarriendo por noches.',
      anguloPropietario:
        'Alquilas amueblado con vistas puerto: temporada con inventario y normas terraza verano.',
      anguloInquilino:
        'Verano largo antes de LAU septiembre: confirma que no es licencia turística compartida.',
    },
    mercado: {
      titulo: 'Temporada Vila Olímpica',
      intro: 'Alta presión estacional; contratos de meses para perfiles que rechazan hotelería ilegal.',
      rentaOrientativa: '2 hab. temporal mar: orientativo 1.700–2.400 €/mes (2026).',
      perfilDemanda: 'Nómadas verano largo, deportistas preparación, familias pre-colegio.',
      particularidad: 'Port Olímpic ocio: ruido nocturno en cláusula.',
    },
    normativaLocal: {
      titulo: 'Vila Olímpica: HUT vs meses',
      contenido: 'Licencia turística no se sustituye por título “temporada” si el uso son noches sueltas a turistas.',
      bullets: ['Meses habitacional', 'Terraza y piscina comunitaria', 'Prohibición plataformas noches'],
    },
    destacados: {
      titulo: 'Temporada olímpica',
      etiquetas: ['Verano largo', 'Puerto', 'No HUT', '5–8 meses'],
      casos: ['Deportista 6 meses entrenamiento', 'Familia julio–enero escolar', 'Propietario sanción previa regularizando meses'],
      riesgos: [
        { titulo: 'Turismo', texto: 'Inspección HUT.' },
        { titulo: 'Ruido puerto', texto: 'Terrazas hasta tarde.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Vila Olímpica',
      intro: 'Parcela olímpica:',
      puntos: [
        { titulo: 'Vistas y terraza', texto: 'Inventario exterior.' },
        { titulo: 'Anti-turismo', texto: 'Cláusula subarriendo.' },
        { titulo: '165 €', texto: 'Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Vila Olímpica',
      intro: 'Incluye:',
      bullets: ['Prohibición Airbnb', 'Fianza alta mobiliario', 'Piscina comunitaria', 'Causa temporal'],
    },
    paraInquilino: {
      titulo: 'Inquilino Vila Olímpica',
      intro: 'Revisa:',
      bullets: ['Licencia edificio', 'Ruido ocio', 'Fin contrato', 'Parking'],
    },
    faqs: [
      { q: '¿Diagonal Mar diferente?', a: 'Sí, barrio y perfil distintos; landings separadas.' },
      { q: '¿8 meses deportista?', a: 'Temporada con causa deportiva.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'la-marina': {
    meta: {
      title: 'Temporada La Marina / Prat Vermell — Fira y vivienda 4–9 meses · 165€',
      description:
        'Alquiler temporal La Marina del Prat Vermell: contrato meses zona Fira y transformación urbanística. 165 € · 48 h.',
      keywords: ['alquiler temporada la marina barcelona', 'contrato temporal prat vermell', 'piso meses fira sur'],
      ogTitle: 'La Marina: temporal en zona en transformación',
      ogDescription: 'Estancias ligadas a Fira sur y espera vivienda.',
    },
    hero: {
      badge: 'La Marina · Prat Vermell · Fira',
      h1: 'La Marina del Prat Vermell: alquiler temporal mientras la zona cambia — contrato acotado, no LAU sin fin en entorno de obras',
      subtitulo:
        'Barrio en reconversión con Fira y nuevas promociones: técnicos y familias en transito necesitan fechas fin y cláusula de obras en entorno.',
      anguloPropietario:
        'Alquilas piso existente mientras esperas requalificación o venta: temporada protege calendario.',
      anguloInquilino:
        'Proyecto urbanístico o Fira sur: pide conocimiento de obras y fin al terminar contrato laboral.',
    },
    mercado: {
      titulo: 'Temporada La Marina',
      intro: 'Mix social y grandes proyectos; estancias medias por empleo en recinto y espera vivienda nueva.',
      rentaOrientativa: '2–3 hab. temporal: orientativo 1.200–1.700 €/mes (2026).',
      perfilDemanda: 'Personal Fira, familias reubicación, operarios obra larga.',
      particularidad: 'Obras entorno: cláusula polvo, ruido y accesos.',
    },
    normativaLocal: {
      titulo: 'Entorno Fira sur y obras',
      contenido: 'Anexo conocimiento plan urbanístico evita reclamaciones por ruido previsible.',
      bullets: ['Fechas Fira anexas', 'Obras municipales', 'No turismo'],
    },
    destacados: {
      titulo: 'Temporada La Marina',
      etiquetas: ['Fira sur', 'Obras', 'Reubicación', '4–9 meses'],
      casos: ['Técnico 7 meses recinto', 'Familia esperando promoción', 'Propietario pre-requalificación'],
      riesgos: [
        { titulo: 'Obras', texto: 'Sin cláusula = resolución conflictiva.' },
        { titulo: 'Transito largo', texto: 'Indefinición debilita temporada.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · La Marina',
      intro: 'Zona transformación:',
      puntos: [
        { titulo: 'Obras entorno', texto: 'Conocimiento firmado.' },
        { titulo: 'Fira fechas', texto: 'Anexo opcional.' },
        { titulo: '165 €', texto: '48 h online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario La Marina',
      intro: 'Incluye:',
      bullets: ['Causa Fira o reubicación', 'Obras entorno', 'Fianza', 'Inventario'],
    },
    paraInquilino: {
      titulo: 'Inquilino La Marina',
      intro: 'Revisa:',
      bullets: ['Transporte Fira', 'Ruido obra', 'Fin contrato', 'Estado piso'],
    },
    faqs: [
      { q: '¿Prat Vermell mismo barrio?', a: 'Sí, La Marina del Prat Vermell es el nombre oficial.' },
      { q: '¿6 meses Fira?', a: 'Temporada típica.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'el-raval': {
    meta: {
      title: 'Temporada El Raval — estancia media sin turismo noches · 165€',
      description:
        'Alquiler temporal El Raval: contrato meses residencial en barrio denso, MACBA entorno. No LAU encubierto. 165 € · 48 h.',
      keywords: ['alquiler temporada el raval', 'contrato temporal raval barcelona', 'meses macba'],
      ogTitle: 'El Raval: meses habitacionales ≠ hostel',
      ogDescription: 'Creativos y estudios larga estancia con fin de contrato.',
    },
    hero: {
      badge: 'El Raval · MACBA · Ciutat Vella',
      h1: 'El Raval: contrato de temporada para estancia media en barrio denso — no habitación turística ni LAU de piso “compartido” mal definido',
      subtitulo:
        'Mezcla de hostels, habitaciones y pisos enteros por meses: si alquilas vivienda completa temporal, el contrato debe prohibir subarriendo por noches y fijar fin.',
      anguloPropietario:
        'Piso completo entre inquilinos LAU: temporada con inventario en fincas patrimoniales y humedades visibles.',
      anguloInquilino:
        'Artista residencia 8 meses: confirma ventilación patios y que no hay inquilinos turísticos ilegales en la finca.',
    },
    mercado: {
      titulo: 'Temporada El Raval',
      intro: 'Alta rotación; estancias medias para creativos y estudiantes avanzados que rechazan coliving sin contrato.',
      rentaOrientativa: '2 hab. temporal: orientativo 1.350–2.000 €/mes (2026).',
      perfilDemanda: 'Artistas, investigadores, propietarios en venta lenta.',
      particularidad: 'Patrimonio y turismo ilegal en finca: cláusula uso exclusivo temporal.',
    },
    normativaLocal: {
      titulo: 'Raval: densidad y uso',
      contenido: 'Prohibición expresa de cambio a alquiler por habitaciones turísticas durante temporada.',
      bullets: ['Piso entero temporal', 'Subarriendo prohibido', 'Patrimonio en anexo'],
    },
    destacados: {
      titulo: 'Temporada en El Raval',
      etiquetas: ['MACBA', 'Creativo', 'No hostel', '5–9 meses'],
      casos: ['Residencia artística 7 meses', 'Investigador extranjero', 'Propietario post-LAU vacío'],
      riesgos: [
        { titulo: 'Turismo finca', texto: 'Vecinos denuncian.' },
        { titulo: 'Humedad', texto: 'Inventario patios.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · El Raval',
      intro: 'Finca densa:',
      puntos: [
        { titulo: 'Inventario humedad', texto: 'Fotos patios.' },
        { titulo: 'Anti-subarriendo', texto: 'Cláusula fuerte.' },
        { titulo: '165 €', texto: 'Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario El Raval',
      intro: 'Incluye:',
      bullets: ['Prohibición turismo', 'Patrimonio', 'Fianza', 'Causa temporal'],
    },
    paraInquilino: {
      titulo: 'Inquilino El Raval',
      intro: 'Revisa:',
      bullets: ['Ventilación', 'Situación finca turística', 'Fin contrato', 'Ruido calle'],
    },
    faqs: [
      { q: '¿LAU en Raval?', a: 'Si es habitual largo, usa /barcelona/contrato-alquiler/el-raval; esta landing es temporada meses.' },
      { q: '¿7 meses artista?', a: 'Encaja con causa artística.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'sant-antoni': {
    meta: {
      title: 'Temporada Sant Antoni — mercado y Eixample frontera · 165€',
      description:
        'Alquiler temporal Sant Antoni: contrato 4–10 meses en barrio de moda, pisos reformados. Temporada vs LAU IRAV. 165 € · 48 h.',
      keywords: ['alquiler temporada sant antoni', 'contrato temporal mercat sant antoni', 'meses eixample frontera'],
      ogTitle: 'Sant Antoni: temporal en barrio reformado',
      ogDescription: 'Estancias medias antes de LAU estable o venta.',
    },
    hero: {
      badge: 'Sant Antoni · Mercat · Eixample',
      h1: 'Sant Antoni: alquiler por meses en finca del Eixample frontera — no LAU con IRAV si solo necesitas un curso o reforma',
      subtitulo:
        'Pisos reformados con terraza interior: parejas y familias en transito suelen firmar LAU tensionado cuando buscan 6–9 meses.',
      anguloPropietario:
        'Alquilas post-reforma mientras vendes: temporada con inventario de calidades y terraza.',
      anguloInquilino:
        'Teletrabajo 8 meses Sant Antoni: verifica IRAV no aplica si es temporal legítimo y fin de contrato.',
    },
    mercado: {
      titulo: 'Temporada Sant Antoni',
      intro: 'Demanda joven profesional; estancias medias por reforma en otro piso o curso.',
      rentaOrientativa: '2–3 hab. temporal reformado: orientativo 1.600–2.300 €/mes (2026).',
      perfilDemanda: 'Parejas pre-LAU, propietarios en venta, expatriados cortos.',
      particularidad: 'Reformas recientes: anexo calidades imprescindible.',
    },
    normativaLocal: {
      titulo: 'Sant Antoni: IRAV y temporal',
      contenido: 'Zona tensionada Eixample frontera: temporal legítima no elude IRAV si el uso es habitual de hecho.',
      bullets: ['Causa y fin claros', 'Calidades en inventario', 'Terraza comunitaria'],
    },
    destacados: {
      titulo: 'Temporada Sant Antoni',
      etiquetas: ['Reforma', 'Terraza', '6–9 meses', 'Mercat'],
      casos: ['Pareja 7 meses pre-compra', 'Propietario venta exclusiva', 'Expatriado corto'],
      riesgos: [
        { titulo: 'IRAV', texto: 'Reclasificación a habitual.' },
        { titulo: 'Calidades', texto: 'Sin inventario = disputas.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Sant Antoni',
      intro: 'Reformado:',
      puntos: [
        { titulo: 'Calidades cocina', texto: 'Anexo fotos.' },
        { titulo: 'Terraza', texto: 'Uso horario.' },
        { titulo: '165 €', texto: '48 h.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Sant Antoni',
      intro: 'Incluye:',
      bullets: ['Inventario reforma', 'Causa venta u obra', 'Fianza', 'Prohibición turismo'],
    },
    paraInquilino: {
      titulo: 'Inquilino Sant Antoni',
      intro: 'Revisa:',
      bullets: ['IRAV si te quedas', 'Terraza', 'Fin contrato', 'Mercado ruido'],
    },
    faqs: [
      { q: '¿LAU Sant Antoni?', a: 'Larga duración en /barcelona/contrato-alquiler/sant-antoni.' },
      { q: '¿8 meses?', a: 'Temporada si causa real.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  'la-barceloneta': {
    meta: {
      title: 'Temporada La Barceloneta — playa meses sin piso turístico · 165€',
      description:
        'Alquiler temporal La Barceloneta: estancia media residencial, no apartamento turístico. Contrato 165 € · 48 h.',
      keywords: ['alquiler temporada barceloneta', 'contrato temporal playa barcelona', 'meses barceloneta'],
      ogTitle: 'Barceloneta: meses ≠ noches playa',
      ogDescription: 'Residente temporal vs HUT en primera línea.',
    },
    hero: {
      badge: 'Barceloneta · playa · pescadores',
      h1: 'La Barceloneta: alquiler temporal de meses en primera línea — alejar licencia turística y LAU imposible en piso de 45 m²',
      subtitulo:
        'Pisos pequeños con altísima presión turística: estancia 4–7 meses para trabajador portuario o familia verano largo requiere contrato específico y prohibición de noches sueltas.',
      anguloPropietario:
        'Regularizas de turismo ilegal a meses legales: contrato temporal con inspección inventario y causa.',
      anguloInquilino:
        'Verano largo residencial: confirma edificio no está mayoritariamente turístico sin aviso.',
    },
    mercado: {
      titulo: 'Temporada Barceloneta',
      intro: 'Conflicto turismo vs residencia; contratos de meses para excepciones habitacionales.',
      rentaOrientativa: '1–2 hab. temporal: orientativo 1.400–2.100 €/mes (2026).',
      perfilDemanda: 'Trabajadores puerto, familias verano, propietarios regularizando.',
      particularidad: 'Humedad salitre y tamaño mínimo: inventario riguroso.',
    },
    normativaLocal: {
      titulo: 'Barceloneta: HUT y salitre',
      contenido: 'Inspección turística activa; meses habitacionales exigen coherencia total anuncio-contrato-uso.',
      bullets: ['No subarriendo noches', 'Ventilación salitre', 'Duración meses'],
    },
    destacados: {
      titulo: 'Temporada en Barceloneta',
      etiquetas: ['Playa', 'Anti-HUT', 'Verano largo', '4–7 meses'],
      casos: ['Trabajador port 6 meses', 'Familia julio–diciembre', 'Propietario post-multa regulariza'],
      riesgos: [
        { titulo: 'Multas turismo', texto: 'Uso real controlado.' },
        { titulo: 'Humedad', texto: 'Salitre en anexo.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Barceloneta',
      intro: 'Piso pequeño mar:',
      puntos: [
        { titulo: 'Salitre', texto: 'Estado paredes fotos.' },
        { titulo: 'Anti-turismo', texto: 'Cláusula penal.' },
        { titulo: '165 €', texto: 'Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Barceloneta',
      intro: 'Incluye:',
      bullets: ['Cumplimiento uso meses', 'Inventario salitre', 'Fianza', 'Prohibición plataformas'],
    },
    paraInquilino: {
      titulo: 'Inquilino Barceloneta',
      intro: 'Revisa:',
      bullets: ['Licencia edificio', 'Ruido ocio', 'Fin contrato', 'Metraje real'],
    },
    faqs: [
      { q: '¿Airbnb legal aquí?', a: 'Turismo noches requiere HUT; meses habitacionales es otro supuesto.' },
      { q: '¿5 meses verano?', a: 'Temporada con fin claro.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  hostafrancs: {
    meta: {
      title: 'Temporada Hostafrancs — Sants Estació frontera meses · 165€',
      description:
        'Alquiler temporal Hostafrancs: contrato 4–9 meses cerca Plaça Espanya y Fira. Temporada laboral. 165 € · 48 h.',
      keywords: ['alquiler temporada hostafrancs', 'contract temporal plaça espanya', 'piso meses hostafrancs'],
      ogTitle: 'Hostafrancs: temporal bien comunicado',
      ogDescription: 'Estancias por Fira y transito laboral.',
    },
    hero: {
      badge: 'Hostafrancs · Plaça Espanya',
      h1: 'Hostafrancs: alquiler temporal para trabajador de Fira o familia en transito — no LAU estándar del Eixample',
      subtitulo:
        'Barrio obrero en transición junto a montaña de montjuïc: estancias medias frecuentes por eventos y obra en vivienda propia.',
      anguloPropietario:
        'Alquilas mientras heredas o vendes piso familiar: calendario acotado.',
      anguloInquilino:
        'Proyecto 6 meses Espanya: confirma fin y estado ascensor fincas años 60.',
    },
    mercado: {
      titulo: 'Temporada Hostafrancs',
      intro: 'Acceso Fira y metro; precios más contenidos que centro con mismos riesgos tipificación.',
      rentaOrientativa: '2–3 hab. temporal: orientativo 1.250–1.750 €/mes (2026).',
      perfilDemanda: 'Técnicos Fira, familias espera vivienda, operarios.',
      particularidad: 'Coexistencia obra urbanística entorno Espanya.',
    },
    normativaLocal: {
      titulo: 'Hostafrancs: Fira y transito',
      contenido: 'Causa evento o espera vivienda en anexo refuerza temporalidad.',
      bullets: ['Fechas evento', 'Obra entorno', 'No turismo'],
    },
    destacados: {
      titulo: 'Temporada Hostafrancs',
      etiquetas: ['Plaça Espanya', 'Fira', 'Transito', '4–9 meses'],
      casos: ['Montaje 5 meses', 'Familia espera adjudicación', 'Herencia en venta'],
      riesgos: [
        { titulo: 'LAU copiado', texto: 'No refleja transito.' },
        { titulo: 'Obra Espanya', texto: 'Ruido previsible.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Hostafrancs',
      intro: 'Barrio tradicional:',
      puntos: [
        { titulo: 'Obra entorno', texto: 'Conocimiento.' },
        { titulo: 'Fianza', texto: 'Estado finca.' },
        { titulo: '165 €', texto: 'Online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Hostafrancs',
      intro: 'Incluye:',
      bullets: ['Causa Fira o venta', 'Fianza', 'Inventario', 'Prohibición subarriendo'],
    },
    paraInquilino: {
      titulo: 'Inquilino Hostafrancs',
      intro: 'Revisa:',
      bullets: ['Metro Espanya', 'Fin contrato', 'Ascensor', 'Comunidad'],
    },
    faqs: [
      { q: '¿Sants mismo distrito?', a: 'Hostafrancs es barrio Sants-Montjuïc; landing propia por SEO.' },
      { q: '¿4 meses Fira?', a: 'Sí.' },
      { q: '¿Precio?', a: '165 € IVA incluido.' },
    ],
  },

  pedralbes: {
    meta: {
      title: 'Temporada Pedralbes — diplomático y académico meses · 165€',
      description:
        'Alquiler temporal Pedralbes: contrato estancia acotada zona alta, embajadas y IESE entorno. 165 € · 48 h.',
      keywords: ['alquiler temporada pedralbes', 'contrato temporal zona alta barcelona', 'expatriado pedralbes meses'],
      ogTitle: 'Pedralbes: temporal premium acotado',
      ogDescription: 'Familias diplomáticas y académicos con fecha regreso.',
    },
    hero: {
      badge: 'Pedralbes · zona alta · embajadas',
      h1: 'Pedralbes: alquiler temporal para familia diplomática o académico visitante — contrato con fin, no LAU de mansión por inercia',
      subtitulo:
        'Viviendas unifamiliares y pisos grandes: estancias de un curso o misión diplomática son temporada si se redacta causa y entrega.',
      anguloPropietario:
        'Alquilas vivienda alta mientras negocias venta internacional: temporada con inventario de valor y jardín.',
      anguloInquilino:
        'Misión 10 meses: exige seguridad, parking múltiple y cláusula confidencialidad vecinal si aplica.',
    },
    mercado: {
      titulo: 'Temporada Pedralbes',
      intro: 'Máximo standing Barcelona; temporadas cortas premium con inventario exhaustivo.',
      rentaOrientativa: 'Temporal premium: orientativo 3.000–6.000+ €/mes según vivienda (2026).',
      perfilDemanda: 'Diplomáticos, profesores IESE, ejecutivos misión corta.',
      particularidad: 'Jardín, seguridad y personal servicio: delimitar en contrato qué incluye.',
    },
    normativaLocal: {
      titulo: 'Pedralbes: misión diplomática',
      contenido: 'Carta misión o invitación académica como anexo opcional de causa temporal.',
      bullets: ['Fin misión', 'Inventario alto valor', 'Jardín y parking'],
    },
    destacados: {
      titulo: 'Temporada en Pedralbes',
      etiquetas: ['Diplomático', 'IESE', 'Premium', '6–12 meses'],
      casos: ['Agregado embajada 11 meses', 'Profesor visitante IESE', 'Venta internacional en curso'],
      riesgos: [
        { titulo: 'LAU premium', texto: 'Abogados copian LAU largo por defecto.' },
        { titulo: 'Inventario', texto: 'Arte y antigüedades sin anexo.' },
      ],
    },
    blindaje: {
      titulo: 'Blindaje · Pedralbes',
      intro: 'Alto valor:',
      puntos: [
        { titulo: 'Inventario designer', texto: 'Fotos detalladas.' },
        { titulo: 'Jardín/parking', texto: 'Anexos separados.' },
        { titulo: '165 €', texto: 'Redacción Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario Pedralbes',
      intro: 'Incluye:',
      bullets: ['Causa misión o venta', 'Fianza reforzada', 'Jardín', 'Seguridad acceso'],
    },
    paraInquilino: {
      titulo: 'Inquilino Pedralbes',
      intro: 'Revisa:',
      bullets: ['Parking múltiple', 'Fin misión', 'Servicios incluidos', 'Comunidad exclusiva'],
    },
    faqs: [
      { q: '¿Les Corts frontera?', a: 'Pedralbes es barrio propio; Les Corts tiene landing LAU/temporada aparte.' },
      { q: '¿11 meses diplomático?', a: 'Temporada con anexo misión.' },
      { q: '¿Precio contrato?', a: '165 € IVA incluido (servicio redacción, no renta).' },
    ],
  },
}
