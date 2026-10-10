import type { BarcelonaAlquilerBarrioConfig } from '@/lib/barcelona-contrato-alquiler-barrios'

const NORMA_REF = (): BarcelonaAlquilerBarrioConfig['normativa']['bloques'] => [
  {
    titulo: 'LAU y vivienda habitual de larga duración',
    contenido:
      'Alquiler de vivienda completa como hogar principal: duración mínima catalana (5/7 años), fianza, inventario y cláusulas de resolución conforme a LAU.',
    bullets: ['Prórroga y preaviso', 'Impago y entrega de llaves', 'Inventario vinculante'],
  },
  {
    titulo: 'Ley de Vivienda y actualización de renta',
    contenido:
      'Topes según gran tenedor y área tensionada; cláusulas de IPC o índice deben ser válidas en 2026.',
    bullets: ['Pequeño vs gran tenedor', 'Transparencia en subidas', 'Cláusulas nulas fuera de límite'],
  },
  {
    titulo: 'Cataluña: INCASÒL e IRAV',
    contenido:
      'Depósito de fianza ante INCASÒL cuando corresponda y mención de referencia de renta en mercado tensionado.',
    bullets: ['Plazo depósito fianza', 'Área tensionada si aplica', 'Garantías adicionales acotadas'],
  },
]

export const BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA = [
  'sarria',
  'horta',
  'ciutat-vella',
  'sant-andreu',
  'montjuic',
] as const

export type BarcelonaAlquilerBarrioSlugExtra = (typeof BARCELONA_ALQUILER_BARRIO_SLUGS_EXTRA)[number]

export const BARCELONA_ALQUILER_BARRIOS_EXTRA: Record<
  BarcelonaAlquilerBarrioSlugExtra,
  BarcelonaAlquilerBarrioConfig
> = {
  sarria: {
    slug: 'sarria',
    nombre: 'Sarrià-Sant Gervasi',
    distrito: 'Sarrià-Sant Gervasi',
    meta: {
      title: 'Alquiler LAU en Sarrià: contrato cuando la renta supera el “piso estándar”',
      description:
        'Arrendamiento larga duración en Sarrià y Sant Gervasi: fianza INCASÒL, IRAV y cláusulas premium. 145 € · 48 h.',
      keywords: ['contrato alquiler sarria', 'LAU sant gervasi', 'alquiler piso sarria contrato'],
      ogTitle: 'Bonanova: LAU con inventario de calidades y parking',
      ogDescription: 'Contrato LAU personalizado para alquiler alto en Sarrià-Sant Gervasi.',
    },
    hero: {
      badge: 'Sarrià · LAU premium',
      h1: 'Sarrià-Sant Gervasi: contrato LAU cuando el piso incluye parking doble y calidades altas',
      subtitulo:
        'Rentas elevadas, inventarios extensos y arrendadores exigentes. Un LAU genérico no describe trasteros, domótica ni uso de zonas comunes en fincas de pocos vecinos pero alto coste.',
      anguloPropietario:
        'Si alquilas en Sarrià, fija fianza, garantías y obras sin cláusulas que un juez declare abusivas pese a la renta alta.',
      anguloInquilino:
        'Si firmas en Sant Gervasi, verifica topes de subida, depósito INCASÒL y qué mobiliario de diseño está incluido en el anexo.',
    },
    mercado: {
      titulo: 'Alquiler estable en el turó',
      intro: 'Baja rotación, perfiles solventes y contratos de larga duración reales; menos “temporal disfrazado”.',
      rentaOrientativa: 'Entre las rentas más altas de Barcelona; coherencia con índice de referencia obligatoria en calles tensionadas.',
      perfilDemanda: 'Familias ejecutivas, expatriados en estancia larga, propietarios que desalojan segunda vivienda.',
      particularidad: 'Parking, trastero y terraza grande: deben listarse en inventario y contrato.',
    },
    normativa: {
      titulo: 'LAU en Sarrià: renta alta no exime de límites legales',
      intro: 'Aunque la renta sea elevada, LAU, Ley de Vivienda e INCASÒL aplican igual; personalizamos por dirección.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Inventario de calidades en viviendas premium',
          contenido:
            'Electrodomésticos de gama alta, suelos y carpintería deben constar para evitar disputas en devolución de fianza.',
          bullets: ['Anexo fotográfico', 'Mobiliario incluido vs excluido'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Sarrià',
      intro: 'Contrato equilibrado en rentas altas:',
      puntos: [
        { titulo: 'Renta e IRAV', texto: 'Mención de referencia si la calle está tensionada.' },
        { titulo: 'Fianza trazable', texto: 'INCASÒL y plazos de devolución claros.' },
        { titulo: 'PDF 48 h', texto: 'Gestor Inmonest online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sarrià',
      intro: 'Protege patrimonio alto con:',
      bullets: ['Garantías adicionales dentro del límite LAU', 'Cláusulas de obras en cocina de diseño', 'Uso exclusivo vivienda habitual', 'Seguro de impago si lo pactáis aparte'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sarrià',
      intro: 'Exige por escrito:',
      bullets: ['Duración mínima catalana', 'Fórmula de actualización válida', 'Estado de instalaciones premium', 'Criterios devolución fianza'],
    },
    faqs: [
      { q: '¿LAU distinto por ser Sarrià?', a: 'El marco es el mismo; cambian renta, inventario y si aplica IRAV en tu calle.' },
      { q: '¿Alquiler de habitación en Sarrià?', a: 'No: esta landing es vivienda completa LAU; habitación es otro servicio.' },
    ],
  },

  horta: {
    slug: 'horta',
    nombre: 'Horta-Guinardó',
    distrito: 'Horta-Guinardó',
    meta: {
      title: 'LAU en Horta-Guinardó: contrato con parking en rampa y casas adosadas',
      description:
        'Alquiler larga duración en Horta, Guinardó y Carmel: accesos, terraza y comunidad con piscina. Contrato 145 €.',
      keywords: ['contrato alquiler horta', 'LAU guinardo barcelona', 'alquiler el carmel contrato'],
      ogTitle: 'Horta: LAU que describe plaza inclinada y no “garaje genérico”',
      ogDescription: 'Arrendamiento en ladera: inventario, LAU e INCASÒL.',
    },
    hero: {
      badge: 'Horta · LAU en ladera',
      h1: 'Horta-Guinardó: contrato LAU que distingue plaza en rampa, casa adosada y piso en bloque',
      subtitulo:
        'En la ladera el inmueble cambia mucho calle a calle. El LAU debe describir acceso rodado, terraza no cerrada legalmente y cuotas de comunidad con piscina.',
      anguloPropietario:
        'Alquilas bajo en El Carmel con humedades históricas declaradas: el contrato fija estado y reparaciones del arrendador.',
      anguloInquilino:
        'Comprueba en el LAU si la plaza es fija o rotativa y si la renta incluye trastero en otro edificio.',
    },
    mercado: {
      titulo: 'Alquiler familiar en la montaña de Barcelona',
      intro: 'Demanda de familias que buscan metros y aceptan pendiente; contratos más estables que en zonas turísticas.',
      rentaOrientativa: 'Rangos medios-bajos respecto al centro; parte del distrito en tensión según calle.',
      perfilDemanda: 'Familias con coche, teletrabajo, parejas que dejan alquiler en Eixample por espacio.',
      particularidad: 'Casas adosadas con jardín comunitario: lindes y uso de zonas verdes en cláusulas.',
    },
    normativa: {
      titulo: 'LAU Horta-Guinardó: descripción física en el contrato',
      intro: 'Riesgo de conflicto por parking, humedades en bajos y obras de contención en comunidad.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Accesos y anejos',
          contenido: 'Plaza en rampa, garaje remoto o aparcamiento en calle regulado deben reflejarse en arrendamiento.',
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Horta',
      intro: 'Enfoque en inventario y comunidad:',
      puntos: [
        { titulo: 'Inventario ampliado', texto: 'Terraza, muros y orientación.' },
        { titulo: 'Obras en ladera', texto: 'Reparaciones estructurales del propietario.' },
        { titulo: 'Entrega 48 h', texto: 'PDF firmable online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Horta',
      intro: 'Incluye:',
      bullets: ['Estado de filtraciones conocidas', 'Cuotas comunidad y piscina', 'Prohibición subarrendo turístico', 'Fianza INCASÒL'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Horta',
      intro: 'Revisa:',
      bullets: ['Descripción parking real', 'Duración mínima 5 años', 'Reparaciones en bajos', 'Subida renta legal'],
    },
    faqs: [
      { q: '¿El Carmel es tensionado?', a: 'Depende de la calle; verificamos al redactar según tu dirección.' },
      { q: '¿Casa vs piso?', a: 'Mismo LAU base; cambia descripción, anejos e inventario.' },
    ],
  },

  'ciutat-vella': {
    slug: 'ciutat-vella',
    nombre: 'Ciutat Vella',
    distrito: 'Ciutat Vella',
    meta: {
      title: 'LAU Ciutat Vella: contrato cuando el piso convive con turismo y ruido',
      description:
        'Alquiler vivienda habitual en Gòtic, Raval o Born: uso LAU, estatutos comunidad y cláusulas anti-turismo. 145 €.',
      keywords: ['contrato alquiler ciutat vella', 'LAU gothic quarter', 'alquiler raval contrato lau'],
      ogTitle: 'Born: LAU con uso vivienda habitual y no alquiler turístico encubierto',
      ogDescription: 'Contrato larga duración en casco antiguo: LAU + Cataluña.',
    },
    hero: {
      badge: 'Ciutat Vella · LAU vs turismo',
      h1: 'Ciutat Vella: contrato LAU que deja claro que es vivienda habitual, no “apartamento turístico”',
      subtitulo:
        'En el Gòtic y el Raval la presión turística tensiona comunidades. El LAU debe prohibir usos ilegales, regular ruidos y describir ventilación en fincas estrechas.',
      anguloPropietario:
        'Protege tu licencia de alquiler LAU frente a usos turísticos del inquilino con cláusulas de resolución expresas.',
      anguloInquilino:
        'Asegura que el contrato no te obliga a convivir con subarrendas turísticas en el mismo piso.',
    },
    mercado: {
      titulo: 'Alquiler en el casco histórico',
      intro: 'Alta demanda pero fincas antiguas, humedades y cambios de uso conflictivos.',
      rentaOrientativa: 'Muy variable por calle; muchas calles en mercado tensionado.',
      perfilDemanda: 'Jóvenes profesionales, parejas, algunos estudiantes de larga estancia en LAU real.',
      particularidad: 'Confusión entre alquiler turístico ilegal y LAU: tipificación correcta imprescindible.',
    },
    normativa: {
      titulo: 'LAU en Ciutat Vella: uso de vivienda y normativa local',
      intro: 'Estatutos de comunidad, ordenanzas de convivencia y LAU deben alinearse.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Prohibición de uso turístico',
          contenido:
            'Cláusula expresa de vivienda habitual del arrendatario y prohibición de subarrendo turístico salvo lo permitido por ley y estatutos.',
          bullets: ['Resolución por cambio de uso', 'Cooperación con comunidad'],
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Ciutat Vella',
      intro: 'Uso, ruido e inventario:',
      puntos: [
        { titulo: 'Uso habitual', texto: 'Declaración expresa del arrendatario.' },
        { titulo: 'Ventilación y humedad', texto: 'Estado declarado en anexo.' },
        { titulo: 'IRAV en tensionada', texto: 'Renta inicial coherente.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Ciutat Vella',
      intro: 'Claves:',
      bullets: ['Cláusula anti-turismo', 'Inventario en piso antiguo', 'Obras en fachada protegida', 'INCASÒL'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Ciutat Vella',
      intro: 'Verifica:',
      bullets: ['No compartes piso con negocio sin consentimiento', 'Reparaciones de humedad', 'Duración mínima', 'Ruido nocturno: expectativas realistas'],
    },
    faqs: [
      { q: '¿Puedo alquilar LAU en el Gòtic?', a: 'Sí, vivienda habitual completa; no confundir con licencia turística.' },
      { q: '¿Habitación en piso del Raval?', a: 'Es contrato de habitación, no esta landing LAU de vivienda entera.' },
    ],
  },

  'sant-andreu': {
    slug: 'sant-andreu',
    nombre: 'Sant Andreu',
    distrito: 'Sant Andreu',
    meta: {
      title: 'LAU Sant Andreu: contrato en edificios rehabilitados y renta contenida',
      description:
        'Alquiler larga duración en Sant Andreu de Palomar y La Sagrera: obra reciente, INCASÒL e IRAV. 145 € · 48 h.',
      keywords: ['contrato alquiler sant andreu', 'LAU la sagrera', 'alquiler sant andreu barcelona'],
      ogTitle: 'La Sagrera: LAU tras reforma de fachada en comunidad',
      ogDescription: 'Arrendamiento estable en distrito en transformación.',
    },
    hero: {
      badge: 'Sant Andreu · LAU post-reforma',
      h1: 'Sant Andreu: contrato LAU para pisos recién reformados y familias que buscan estabilidad',
      subtitulo:
        'Muchos edificios salen al mercado de alquiler tras rehabilitación. El LAU debe reflejar obras recientes, ITE y cuotas de comunidad actualizadas.',
      anguloPropietario:
        'Tras reformar para alquilar, no reutilices el LAU de 2018: topes de subida y gran tenedor han cambiado.',
      anguloInquilino:
        'Si el piso “a estrenar” en Sant Andreu no tiene licencia de obra clara, exige mención en contrato o anexo.',
    },
    mercado: {
      titulo: 'Alquiler en distrito en renovación',
      intro: 'Renta más accesible que el centro, demanda de familias locales y migración desde alquileres caros.',
      rentaOrientativa: 'Contenida respecto a Eixample; IRAV aplica en amplias zonas tensionadas.',
      perfilDemanda: 'Familias jóvenes, parejas primer hogar, trabajadores ligados a La Sagrera.',
      particularidad: 'Pisos reformados en bloques de los 60-70 con ascensor nuevo: inventario detallado.',
    },
    normativa: {
      titulo: 'LAU Sant Andreu: reforma reciente y duración mínima',
      intro: 'Cataluña impone 5/7 años; Ley de Vivienda limita actualizaciones.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Reformas y garantías',
          contenido: 'Instalaciones nuevas (caldera, ventanas) deben reflejarse; reparaciones en periodo de garantía del propietario.',
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Sant Andreu',
      intro: 'Estabilidad y transparencia:',
      puntos: [
        { titulo: 'Renta inicial', texto: 'Coherencia con IRAV si tensionada.' },
        { titulo: 'Inventario post-reforma', texto: 'Electrodomésticos y acabados.' },
        { titulo: '48 h online', texto: 'Gestoría Inmonest.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Sant Andreu',
      intro: 'Incluye:',
      bullets: ['Cláusulas tras obra en finca', 'Fianza y INCASÒL', 'Impago y desahucio LAU', 'Mascotas y obras del inquilino'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Sant Andreu',
      intro: 'Revisa:',
      bullets: ['Duración mínima', 'Subida renta legal', 'Estado real tras reforma', 'Gastos comunidad'],
    },
    faqs: [
      { q: '¿Sant Andreu es buena zona LAU?', a: 'Sí, perfil residencial estable y conectividad creciente.' },
      { q: '¿Precio del contrato?', a: '145 € IVA incluido, mismo precio en todos los barrios Barcelona.' },
    ],
  },

  montjuic: {
    slug: 'montjuic',
    nombre: 'Montjuïc (Poble-sec)',
    distrito: 'Sants-Montjuïc',
    meta: {
      title: 'LAU Poble-sec: contrato con cláusula de entorno (ocio nocturno)',
      description:
        'Alquiler vivienda habitual en Poble-sec y Montjuïc: ruido, terrazas y LAU blindado. 145 € IVA incl.',
      keywords: ['contrato alquiler poble sec', 'LAU montjuic barcelona', 'alquiler paral lel contrato'],
      ogTitle: 'Carrer Blai: LAU que no promete silencio pero sí vivienda habitual',
      ogDescription: 'Arrendamiento larga duración junto a zona de ocio.',
    },
    hero: {
      badge: 'Poble-sec · LAU y ocio',
      h1: 'Poble-sec y Montjuïc: LAU honesto sobre ruido nocturno y vivienda sobre local',
      subtitulo:
        'Vives cerca de terrazas y teatros: el contrato puede registrar conocimiento del entorno sin prometer decibelios imposibles, y sí proteger uso habitual LAU.',
      anguloPropietario:
        'Alquilas entresuelo sobre bar: describe uso del bajo y responsabilidad acústica para evitar reclamaciones ficticias.',
      anguloInquilino:
        'Visita de noche antes de firmar; el LAU puede referir que conoces el ambiente del barrio.',
    },
    mercado: {
      titulo: 'Alquiler en la falda de Montjuïc',
      intro: 'Mezcla de vida cultural, precios más bajos que el Eixample y fincas con bajos comerciales.',
      rentaOrientativa: 'Intermedia; zonas tensionadas según calle y planta.',
      perfilDemanda: 'Creativos, familias que aceptan ocio cercano, estudiantes en LAU real de piso completo.',
      particularidad: 'Entresuelos y humedad: inventario y ventilación críticos.',
    },
    normativa: {
      titulo: 'LAU Poble-sec: finca mixta y convivencia',
      intro: 'LAU estándar más cláusulas de entorno y uso sobre local comercial en planta baja.',
      bloques: [
        ...NORMA_REF(),
        {
          titulo: 'Conocimiento del entorno',
          contenido:
            'Opcionalmente, declaración de visitas en horario nocturno y renuncia a reclamar por ruido de ocio previsible, sin perjuicio de derechos LAU.',
        },
      ],
    },
    blindaje: {
      titulo: 'Blindaje LAU Poble-sec',
      intro: 'Realismo y legalidad:',
      puntos: [
        { titulo: 'Inventario', texto: 'Humedad y ventilación.' },
        { titulo: 'Uso vivienda', texto: 'Prohibición turismo.' },
        { titulo: 'PDF 48 h', texto: 'Entrega online.' },
      ],
    },
    paraPropietario: {
      titulo: 'Propietario en Poble-sec',
      intro: 'Protege con:',
      bullets: ['Cláusula entorno nocturno', 'Local en bajo identificado', 'Fianza INCASÒL', 'Obras del inquilino reguladas'],
    },
    paraInquilino: {
      titulo: 'Inquilino en Poble-sec',
      intro: 'Asegura:',
      bullets: ['Duración mínima catalana', 'Reparaciones del propietario', 'No promesas de silencio falsas', 'Devolución fianza objetiva'],
    },
    faqs: [
      { q: '¿Montjuïc es lo mismo que Sants?', a: 'Esta landing cubre Poble-sec y falda; Sants Estació tiene su propia guía LAU.' },
      { q: '¿Piso sobre bar?', a: 'El LAU debe describir local en bajo y uso permitido del inmueble.' },
    ],
  },
}
