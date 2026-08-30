import type { AgenciaGestoriaCiudadSlug } from './agencias-gestoria-ciudades'

export type AgenciaCiudadContenidoLocal = {
  zonasDetalle: { nombre: string; contexto: string }[]
  perfilesLocales: { tipo: string; titulo: string; desc: string }[]
  ayudaLocal: {
    titulo: string
    intro: string
    items: { titulo: string; desc: string }[]
  }
  faqExtraExtra?: { q: string; a: string }[]
}

/** Contenido local único por ciudad — complementa la config base y reduce duplicidad SEO */
export const AGENCIA_CIUDAD_CONTENIDO_LOCAL: Partial<
  Record<AgenciaGestoriaCiudadSlug, AgenciaCiudadContenidoLocal>
> = {
  granada: {
    zonasDetalle: [
      {
        nombre: 'Realejo',
        contexto:
          'Barrio universitario histórico: alta rotación de habitaciones en pisos del siglo XIX. Las agencias cierran reservas en julio–agosto para el curso siguiente.',
      },
      {
        nombre: 'Zaidín',
        contexto:
          'Campus PTS y vivienda familiar: mezcla LAU estable con pisos compartidos para estudiantes de medicina e ingeniería.',
      },
      {
        nombre: 'Centro · Albaicín',
        contexto:
          'Operaciones con propietarios particulares y segundas viviendas. Arras en venta entre particulares sin agencia intermediaria.',
      },
      {
        nombre: 'Chana · Cartuja',
        contexto:
          'Expansión residencial: LAU para familias jóvenes que migran desde el centro por precio.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia de barrio',
        titulo: 'Inmobiliaria con escaparate en Gran Vía o Reyes Católicos',
        desc: 'Cartera de 20–40 pisos entre habitación y LAU. Pack Agencia para 5+ contratos/mes. Prioridad en agosto antes del curso.',
      },
      {
        tipo: 'Autónomo / colaborador',
        titulo: 'Agente autónomo que captura en Zaidín y Realejo',
        desc: 'Contrato suelto a 110 € sin pack anual. Ideal si haces 2–4 operaciones al mes entre alquiler de habitación y arras.',
      },
      {
        tipo: 'Freelance inmobiliario',
        titulo: 'Particular que gestiona pisos de familiares o herencias',
        desc: 'No eres agencia pero alquilas 2–3 habitaciones legalmente. Te redactamos habitación + reglamento de convivencia sin plantilla genérica.',
      },
      {
        tipo: 'API',
        titulo: 'Agente de la Propiedad Inmobiliaria en Granada capital',
        desc: 'LAU impecables para operaciones donde tu nombre profesional está en juego. Panel B2B con historial por operación.',
      },
    ],
    ayudaLocal: {
      titulo: 'Cómo ayudamos a agencias y autónomos en Granada',
      intro:
        'En Granada el calendario universitario marca la operativa. No es lo mismo redactar una habitación en Realejo en septiembre que un LAU familiar en PTS en enero.',
      items: [
        {
          titulo: 'Distinguimos habitación vs LAU vs temporada',
          desc: 'Evitas mezclar figuras jurídicas en pisos compartidos — el error más caro en barrios de campus.',
        },
        {
          titulo: 'Arras el mismo día de la visita',
          desc: 'Entrega en 4–5 h para no perder al comprador que también visita con otra agencia del centro.',
        },
        {
          titulo: 'Gestor que conoce la operativa granadina',
          desc: 'No reutilizamos textos de Salamanca o Sevilla: cada cláusula refleja barrio y tipo de inquilino.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Ayudáis a autónomos que no tienen escaparate de agencia?',
        a: 'Sí. Muchos colaboradores en Granada trabajan sin marca propia: contrato suelto a 110 €, subes datos al panel y recibes PDF con FirmaCert. Sin pack anual obligatorio.',
      },
    ],
  },

  murcia: {
    zonasDetalle: [
      {
        nombre: 'Centro · Trapería',
        contexto:
          'Compraventa entre particulares y LAU en edificios del casco. Arras rápidas cuando comprador y vendedor se conocen por Idealista.',
      },
      {
        nombre: 'El Palmar · La Alberca',
        contexto:
          'Familias en expansión urbana: LAU de vivienda habitual con garaje y trastero. Operativa estable todo el año.',
      },
      {
        nombre: 'Espinardo · Campus',
        contexto:
          'Universidad de Murcia: habitación y LAU para docentes. Menor volumen que Granada pero mismos riesgos legales.',
      },
      {
        nombre: 'Cartagena · costa',
        contexto:
          'Segunda residencia y venta entre particulares en zona portuaria. Arras con plazos ampliados para compradores de fuera.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia familiar',
        titulo: 'Inmobiliaria de barrio en Murcia capital',
        desc: '2–3 personas, cartera mixta venta-alquiler en El Palmar y centro. Pack Agencia cuando superas 4 contratos/mes.',
      },
      {
        tipo: 'Autónomo captador',
        titulo: 'Agente autónomo en Huerta y pedanías',
        desc: 'Captas en municipios del área metropolitana y necesitas arras en 4–5 h porque el vendedor no espera.',
      },
      {
        tipo: 'Particular vendedor',
        titulo: 'Propietario que vende sin agencia pero quiere arras seguras',
        desc: 'No somos tu agencia de captación: redactamos arras penitenciales para que firmes con el comprador encontrado en portal.',
      },
      {
        tipo: 'Franquicia',
        titulo: 'Oficina de franquicia en Murcia o Molina',
        desc: 'Volumen 4–7 contratos/mes. Externalizas redacción y dedicas comerciales a captación en Región de Murcia.',
      },
    ],
    ayudaLocal: {
      titulo: 'Apoyo B2B en la Región de Murcia',
      intro:
        'Murcia no es un mercado de temporada masiva como Málaga: aquí gana quien cierra arras entre particulares rápido y redacta LAU familiares sin errores de fianza.',
      items: [
        {
          titulo: 'Arras penitenciales en compraventa local',
          desc: 'Cláusulas de penalización equilibradas cuando no hay agencia que medie — operación habitual en El Palmar.',
        },
        {
          titulo: 'LAU con deudas de comunidad verificadas',
          desc: 'Te indicamos qué pedir al vendedor antes de redactar cuando el piso lleva años en alquiler.',
        },
        {
          titulo: 'Contrato suelto o pack según volumen',
          desc: 'Empiezas a 110 € por operación; activas pack anual cuando la Huerta te da flujo constante.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Redactáis arras si el comprador y vendedor son particulares sin agencia?',
        a: 'Sí. Es operativa frecuente en Murcia: uno de los dos os contrata la redacción y entregamos PDF neutral para ambas partes en 4–5 h.',
      },
    ],
  },

  valladolid: {
    zonasDetalle: [
      {
        nombre: 'Delicias · Campo Grande',
        contexto:
          'Barrios residenciales de alta demanda: arras en venta entre particulares y LAU para familias. Franquicias con mayor volumen.',
      },
      {
        nombre: 'Parquesol · Rondilla',
        contexto:
          'Expansión de los 90–2000: LAU estable, garajes vinculados y arras en segundas transmisiones.',
      },
      {
        nombre: 'Centro · La Victoria',
        contexto:
          'Edificios históricos rehabilitados: operaciones con ascensor pendiente, ITE y derramas — revisión documental recomendada.',
      },
      {
        nombre: 'La Cistérniga · Laguna',
        contexto:
          'Chalets y unifamiliares: arras con plazo ampliado para hipoteca y compraventa entre particulares del extrarradio.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Franquicia nacional',
        titulo: 'Oficina Tecnocasa, Century o similar en Delicias',
        desc: 'Pack Agencia Plus si superas 6 contratos/mes. Mismo gestor conoce tu operativa en Campo Grande y Parquesol.',
      },
      {
        tipo: 'Agencia independiente',
        titulo: 'Inmobiliaria pucelana de barrio',
        desc: 'Equipo pequeño, 3–5 contratos/mes. Externalizas redacción y liberas 12 h/mes que antes iban a plantillas Word.',
      },
      {
        tipo: 'Autónomo API',
        titulo: 'Agente de la Propiedad en Castilla y León',
        desc: 'Contrato suelto a 110 € con tu nombre en la operación. LAU y arras con cláusulas correctas para CYL.',
      },
      {
        tipo: 'Freelance',
        titulo: 'Captador freelance para varias agencias',
        desc: 'Gestionas operaciones para terceros: subes documentación al panel y el PDF sale a nombre de la operación, no de plantilla.',
      },
    ],
    ayudaLocal: {
      titulo: 'Gestoría B2B adaptada a Valladolid capital',
      intro:
        'En Valladolid las franquicias compiten por velocidad en arras. El comprador pucelano suele tener financiación preaprobada y quiere firmar señal en 48 h.',
      items: [
        {
          titulo: 'Arras penitenciales express',
          desc: 'Cláusula suspensiva por hipoteca incluida por defecto — estándar en operaciones Delicias–Campo Grande.',
        },
        {
          titulo: 'LAU sin copiar Madrid',
          desc: 'Actualización de renta y fianza según operativa castellanoleonesa, no plantilla genérica de capital.',
        },
        {
          titulo: 'Pack escalable',
          desc: 'De 2 contratos sueltos/mes a Pack Agencia cuando la franquicia confirma volumen anual.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Trabajáis con captadores freelance que no tienen CIF de agencia?',
        a: 'Sí. Pueden contratar contrato suelto a 110 €. Indica en el panel la agencia mandante si la operación va a nombre de tercero.',
      },
    ],
  },

  coruna: {
    zonasDetalle: [
      {
        nombre: 'Ensanche · Orzán',
        contexto:
          'Corazón comercial: LAU en pisos señoriales y arras en venta entre particulares con hipoteca pendiente.',
      },
      {
        nombre: 'Matadero · Cuatro Caminos',
        contexto:
          'Rehabilitación urbana: operaciones con ITE, derramas y certificado energético — checklist antes de arras.',
      },
      {
        nombre: 'Elviña · campus',
        contexto:
          'Universidad y familias: habitación puntual y LAU para profesorado. Volumen menor que Santiago pero estable.',
      },
      {
        nombre: 'Oleiros · coruñesa',
        contexto:
          'Chalets adosados y LAU familiar. Compradores que trabajan en A Coruña y viven en municipio limítrofe.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'API gallego',
        titulo: 'Agente de la Propiedad en A Coruña',
        desc: 'Operaciones donde tu responsabilidad profesional exige LAU impecables. Pack Agente para 3–5 contratos/mes.',
      },
      {
        tipo: 'Agencia local',
        titulo: 'Inmobiliaria del Ensanche con cartera de alquiler',
        desc: 'LAU recurrentes en Orzán y Cuatro Caminos. Un gestor conoce tus cláusulas de fianza habituales.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Autónomo inmobiliario en área metropolitana',
        desc: 'Sin pack anual: pagas 110 € por arras o LAU cuando cierras operación. Comunicación 100 % online.',
      },
      {
        tipo: 'Particular',
        titulo: 'Propietario que alquila sin agencia en Oleiros',
        desc: 'Redactamos LAU y te orientamos en documentación de entrada — sin comisión sobre el alquiler.',
      },
    ],
    ayudaLocal: {
      titulo: 'Ayuda a inmobiliarias coruñesas y autónomos gallegos',
      intro:
        'Galicia tiene operativa más pausada que Madrid pero igual de exigente en documentación. El error típico es arras sin revisar deuda de comunidad en edificios del Ensanche.',
      items: [
        {
          titulo: 'Revisión de nota simple antes de arras',
          desc: 'Te indicamos qué cargas invalidan la operación en Orzán y Matadero.',
        },
        {
          titulo: 'LAU con cláusulas de suministros',
          desc: 'Adaptadas a edificios con calefacción central — frecuente en Ensanche.',
        },
        {
          titulo: 'Sin desplazamientos',
          desc: 'Todo el flujo B2B es online: ideal para API con operaciones en Coruña y Oleiros.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Atendéis agencias solo en A Coruña capital o también Ferrol y Santiago?',
        a: 'El servicio es online para toda Galicia. La landing de A Coruña refleja operativa en capital y coruñesa; el panel y tarifas B2B son las mismas.',
      },
    ],
  },

  pamplona: {
    zonasDetalle: [
      {
        nombre: 'Rochapea · Iturrama',
        contexto:
          'Barrios residenciales: LAU familiar y alquiler para familias con empleo en industria y servicios. Estabilidad anual.',
      },
      {
        nombre: 'Centro · San Nicolás',
        contexto:
          'Pisos señoriales reconvertidos: arras entre particulares con compradores locales con financiación aprobada.',
      },
      {
        nombre: 'Buztintxuri · San Juan',
        contexto:
          'Expansión urbana: LAU en promociones recientes y arras en primera venta de particulares.',
      },
      {
        nombre: 'Barañáin · área metropolitana',
        contexto:
          'Familias que buscan más metros: LAU con garaje y trastero incluidos en cláusula.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'API Navarra',
        titulo: 'Agente de la Propiedad en Pamplona',
        desc: 'LAU para inquilinos corporativos (industria, hostelería) y familias. Cláusulas de duración y fianza revisadas.',
      },
      {
        tipo: 'Agencia de barrio',
        titulo: 'Inmobiliaria en Rochapea o Iturrama',
        desc: '3–5 contratos/mes entre LAU y arras. Pack Agente o contrato suelto según temporada.',
      },
      {
        tipo: 'Autónomo colaborador',
        titulo: 'Colaborador de franquicia sin oficina propia',
        desc: 'Cierras operaciones en campo y necesitas contrato en 4–5 h antes de que el cliente visite otra inmobiliaria.',
      },
      {
        tipo: 'Freelance',
        titulo: 'Mediador entre particulares en Navarra',
        desc: 'No tienes licencia de agencia pero acompañas la venta: redactamos arras neutras para comprador y vendedor.',
      },
    ],
    ayudaLocal: {
      titulo: 'Soporte B2B en Pamplona y Comarca',
      intro:
        'Navarra tiene mercado estable sin picos turísticos extremos. La exigencia está en LAU bien redactados para inquilinos que se quedan 3–5 años.',
      items: [
        {
          titulo: 'LAU corporativo y familiar',
          desc: 'Cláusulas distintas si el inquilino es empresa o familia numerosa en Iturrama.',
        },
        {
          titulo: 'Arras con plazo realista',
          desc: 'Plazos de escritura adaptados a cancelación hipoteca en Banco de Navarra y cajas locales.',
        },
        {
          titulo: 'Gestor asignado',
          desc: 'Mismo interlocutor en operaciones sucesivas en Rochapea — no rotación anónima.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Redactáis contratos en euskera?',
        a: 'Los contratos se redactan en castellano, idioma habitual en operaciones inmobiliarias en Pamplona. Comunicación con el gestor también en español.',
      },
    ],
  },

  salamanca: {
    zonasDetalle: [
      {
        nombre: 'Calle Toro · San Bernardo',
        contexto:
          'Epicentro ERASMUS: habitación y temporada en septiembre. Agencias con colas de reserva en agosto.',
      },
      {
        nombre: 'Centro histórico',
        contexto:
          'Pisos con protección patrimonial: LAU con limitaciones de obra y arras en venta entre particulares locales.',
      },
      {
        nombre: 'Garrido · Vista Alegre',
        contexto:
          'Familias salmantinas: LAU estable lejos del ruido universitario del centro.',
      },
      {
        nombre: 'Tejado · Hospedería',
        contexto:
          'Estudiantes españoles de otras CCAA: habitación curso completo vs ERASMUS 1 semestre — figuras distintas.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia universitaria',
        titulo: 'Inmobiliaria especializada en Calle Toro',
        desc: '7–10 contratos/mes en pico. Pack Agencia Plus obligatorio en práctica antes de agosto.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Agente autónomo con cartera de habitaciones',
        desc: 'Gestionas 15–30 habitaciones entre varios propietarios: contrato suelto o pack según curso.',
      },
      {
        tipo: 'Particular propietario',
        titulo: 'Propietario salmantino con piso en San Bernardo',
        desc: 'Alquilas habitaciones legalmente: habitación + reglamento convivencia, no LAU de vivienda completa mal aplicado.',
      },
      {
        tipo: 'Franquicia',
        titulo: 'Franquicia con oficina en Gran Vía',
        desc: 'Ventas entre particulares + alquiler ERASMUS. Dos operativas, un panel B2B.',
      },
    ],
    ayudaLocal: {
      titulo: 'Ayuda en pico universitario salmantino',
      intro:
        'Salamanca no se puede tratar como Granada: el pico ERASMUS es más corto e intenso (3–4 semanas en agosto). Sin cola prioritaria pierdes 30 % de reservas.',
      items: [
        {
          titulo: 'Habitación vs LAU vs temporada ERASMUS',
          desc: 'Tres figuras distintas para Calle Toro — las distinguimos en cada PDF.',
        },
        {
          titulo: 'Cola prioritaria Pack Plus',
          desc: 'Activa antes del 1 de agosto para entrega 4–5 h en semana de máxima demanda.',
        },
        {
          titulo: 'Arras fuera de temporada',
          desc: 'En enero–junio venta entre particulares en Garrido con arras penitenciales estándar.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Gestionáis alquiler a estudiantes ERASMUS de un solo semestre?',
        a: 'Sí. Redactamos temporada o habitación según duración real — no forzamos LAU anual cuando la estancia es de 5 meses.',
      },
    ],
  },

  santander: {
    zonasDetalle: [
      {
        nombre: 'Centro · Pereda',
        contexto:
          'Oficinas bancarias y LAU para profesionales. Arras en venta de pisos señoriales entre particulares.',
      },
      {
        nombre: 'El Sardinero · Cueto',
        contexto:
          'Segunda residencia y alquiler temporal veraniego — distinguir temporada de LAU anual en primera línea.',
      },
      {
        nombre: 'Peñacastillo · Nueva Montaña',
        contexto:
          'Familias: LAU estable en barrios residenciales alejados del turismo costero.',
      },
      {
        nombre: 'Camargo · área metropolitana',
        contexto:
          'Chalets adosados: arras con hipoteca y compraventa entre particulares del extrarradio cántabro.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia costera',
        titulo: 'Inmobiliaria en El Sardinero o centro',
        desc: 'Mezclas venta, LAU anual y operaciones veranieas. Pack Agencia para 4+ contratos/mes.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Agente autónomo en Cantabria',
        desc: 'Operaciones en Santander y Torrelavega: contrato suelto 110 € sin compromiso anual.',
      },
      {
        tipo: 'Particular',
        titulo: 'Propietario con segunda residencia en Sardinero',
        desc: 'Quieres alquilar en verano sin convertirlo en LAU mal redactado: temporada con causa real.',
      },
      {
        tipo: 'API',
        titulo: 'Agente de la Propiedad en Cantabria',
        desc: 'Responsabilidad profesional en LAU del Ensanche: cláusulas revisadas por gestor inmobiliario.',
      },
    ],
    ayudaLocal: {
      titulo: 'Gestoría B2B en Santander y Cantabria',
      intro:
        'Cantabria combina mercado local estable con pico veraniego en Sardinero. El error legal típico es tratar un alquiler de julio–agosto como LAU de vivienda habitual.',
      items: [
        {
          titulo: 'Temporada veraniega vs LAU',
          desc: 'En Sardinero redactamos causa de temporalidad real — no copiamos contrato anual de interior.',
        },
        {
          titulo: 'Arras entre particulares cántabros',
          desc: 'Compradores con hipoteca local: cláusulas suspensivas estándar en 4–5 h.',
        },
        {
          titulo: 'Panel online',
          desc: 'Sin visitas a despacho: subes docs desde Santander o Camargo.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Cubrís operaciones en Torrelavega y Castro Urdiales?',
        a: 'Sí, servicio online para toda Cantabria. Contenido local de esta página describe operativa santanderina y costera.',
      },
    ],
  },

  'san-sebastian': {
    zonasDetalle: [
      {
        nombre: 'Gros · Amara',
        contexto:
          'Barrios vibrantes: LAU para familias y jóvenes profesionales. Alta demanda, plazos de cierre cortos.',
      },
      {
        nombre: 'Centro · Parte Vieja',
        contexto:
          'Edificios históricos: arras entre particulares con compradores locales e inversores del País Vasco francés.',
      },
      {
        nombre: 'Antiguo · Aiete',
        contexto:
          'Zona residencial premium: LAU con rentas altas y garantías adicionales frecuentes.',
      },
      {
        nombre: 'Donostialdea · Miramon',
        contexto:
          'Tecnología e industria: alquiler para trabajadores corporativos — cláusulas de duración negociadas.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'API Donostia',
        titulo: 'Agente de la Propiedad en San Sebastián',
        desc: 'Mercado de precios altos: un LAU mal redactado cuesta caro. Pack Agente para volumen recurrente.',
      },
      {
        tipo: 'Agencia boutique',
        titulo: 'Inmobiliaria boutique en Gros o Centro',
        desc: 'Pocos contratos pero ticket alto. Contrato suelto 110 € con redacción personalizada por operación.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Colaborador autónomo en Gipuzkoa',
        desc: 'Captas en Donostia y operas sin estructura de agencia: panel B2B y entrega 4–5 h.',
      },
      {
        tipo: 'Freelance',
        titulo: 'Consultor inmobiliario independiente',
        desc: 'Acompañas compradores premium: revisión de arras antes de señal en Parte Vieja.',
      },
    ],
    ayudaLocal: {
      titulo: 'Contratos B2B en el mercado donostiarra',
      intro:
        'San Sebastián tiene uno de los mercados más tensionados del norte. La velocidad importa tanto como la calidad jurídica.',
      items: [
        {
          titulo: 'LAU en mercado de renta alta',
          desc: 'Garantías adicionales, avalista y actualización de renta bien redactados para Gros y Amara.',
        },
        {
          titulo: 'Arras con compradores transfronterizos',
          desc: 'Plazos ampliados cuando el comprador viene de Iparralde o Madrid — sin plantilla estándar.',
        },
        {
          titulo: 'Gestor fijo por cartera',
          desc: 'Ideal para agencias boutique con 3–5 LAU/mes recurrentes en mismos barrios.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Trabajáis con agencias que operan en euskera con clientes?',
        a: 'Contratos y comunicación con gestor en castellano. Muchas agencias donostiarras operan bilingüe pero documentan en español ante notaría.',
      },
    ],
  },

  vitoria: {
    zonasDetalle: [
      {
        nombre: 'Centro · Casco Medieval',
        contexto:
          'Rehabilitación y venta entre particulares. Arras con checklist de licencias en edificios históricos.',
      },
      {
        nombre: 'Lakua · Zaramaga',
        contexto:
          'Familias en expansión: LAU en promociones de los 80–90 con garaje comunitario.',
      },
      {
        nombre: 'Salburua · expansión',
        contexto:
          'Barrio moderno: LAU en vivienda nueva y arras en primeras reventas de particulares.',
      },
      {
        nombre: 'Armentia · extrarradio',
        contexto:
          'Unifamiliares y adosados: arras con plazo para hipoteca y tasación.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia álavesa',
        titulo: 'Inmobiliaria en Vitoria-Gasteiz capital',
        desc: '4–6 contratos/mes LAU + arras. Pack Agencia cuando confirmas volumen en Lakua y Salburua.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Agente autónomo en Álava',
        desc: 'Operaciones en capital y Llodio: 110 €/contrato, sin pack hasta que estabilices flujo.',
      },
      {
        tipo: 'Particular',
        titulo: 'Vendedor particular en Salburua',
        desc: 'Vendes sin agencia: arras penitenciales neutras para comprador encontrado en portal.',
      },
      {
        tipo: 'API',
        titulo: 'API con operaciones industriales',
        desc: 'LAU para trabajadores de polígonos y familias en Zaramaga — duración y fianza revisadas.',
      },
    ],
    ayudaLocal: {
      titulo: 'Ayuda a agencias y autónomos en Vitoria-Gasteiz',
      intro:
        'Vitoria es mercado de estabilidad, no de temporada. Gana la agencia que redacta LAU correctos en Lakua y cierra arras en el día en Salburua.',
      items: [
        {
          titulo: 'Arras mismo día',
          desc: 'Compradores locales con financiación: entrega 4–5 h para no perder operación.',
        },
        {
          titulo: 'LAU en comunidades con derramas',
          desc: 'Checklist de actas antes de firmar alquiler en edificios del centro.',
        },
        {
          titulo: 'Escalado B2B',
          desc: 'De contrato suelto a pack cuando duplicas operaciones en Armentia y Salburua.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Atendéis también agencias en Álava rural y Llodio?',
        a: 'Sí, el servicio es 100 % online para toda la provincia. El contenido local describe operativa en capital y periferia.',
      },
    ],
  },

  asturias: {
    zonasDetalle: [
      {
        nombre: 'Gijón · Centro · Cimadevilla',
        contexto:
          'Rehabilitación y LAU en casco. Habitación para estudiantes del campus de El Molinón.',
      },
      {
        nombre: 'Oviedo · Uría · Los Prados',
        contexto:
          'Capital administrativa: LAU familiar estable y arras en venta entre particulares.',
      },
      {
        nombre: 'Avilés · centro',
        contexto:
          'Industria y servicios: LAU para familias con empleo en Arcelor y empresas auxiliares.',
      },
      {
        nombre: 'Langreo · Polígono',
        contexto:
          'Alquiler accesible: LAU con rentas moderadas y arras en compraventa local.',
      },
    ],
    perfilesLocales: [
      {
        tipo: 'Agencia gijonesa',
        titulo: 'Inmobiliaria en Gijón con cartera mixta',
        desc: 'Habitación + LAU + arras en Gijón y carreño. Pack Agencia para 5+ contratos/mes.',
      },
      {
        tipo: 'Autónomo',
        titulo: 'Autónomo inmobiliario en Asturias',
        desc: 'Operas en Gijón y Oviedo sin oficina: contrato suelto y panel online.',
      },
      {
        tipo: 'Particular',
        titulo: 'Propietario con piso en Oviedo',
        desc: 'Alquilas habitación a estudiantes: contrato correcto bajo Código Civil, no LAU mal aplicado.',
      },
      {
        tipo: 'Freelance',
        titulo: 'Captador freelance para varias carteras',
        desc: 'Cierras operaciones en Langreo y Avilés: subes docs y recibes PDF en 4–5 h.',
      },
    ],
    ayudaLocal: {
      titulo: 'Gestoría B2B en Gijón, Oviedo y Asturias',
      intro:
        'Asturias no es mercado turístico masivo: aquí destacan habitación universitaria en Gijón, LAU industrial en Avilés y arras entre particulares en Oviedo.',
      items: [
        {
          titulo: 'Habitación en Gijón vs LAU en Oviedo',
          desc: 'Operativas distintas en la misma comunidad autónoma — no usamos un solo template.',
        },
        {
          titulo: 'Arras con hipoteca regional',
          desc: 'Cláusulas suspensivas adaptadas a cajas asturianas y plazos de tasación.',
        },
        {
          titulo: 'Precio fijo B2B',
          desc: '110 €/contrato suelto o pack anual — sin comisión sobre precio del piso.',
        },
      ],
    },
    faqExtraExtra: [
      {
        q: '¿Tenéis landing separada para Gijón y Oviedo?',
        a: 'Esta página cubre operativa asturiana en conjunto. El panel B2B sirve para cualquier municipio; el gestor adapta cláusulas al municipio que indiques.',
      },
    ],
  },
}
