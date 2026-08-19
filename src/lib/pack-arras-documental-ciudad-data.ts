import type { Metadata } from 'next'
import type { PackArrasDocumentalFaqItem } from './pack-arras-documental-ciudad-faq'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'
import { PACK_ARRAS_DOCUMENTAL_ENRIQUECIMIENTO } from './pack-arras-documental-enriquecimiento'

const BASE_URL = 'https://inmonest.com'
export const PACK_ARRAS_DOCUMENTAL_PRECIO = 450
export const PACK_ARRAS_SERVICIO_SLUG = 'pack-arras-revision-documental'

export type PackArrasCasoReal = {
  titulo: string
  perfil: string
  situacion: string
  resultado: string
  ahorro?: string
}

export type PackArrasBarrioPrecio = {
  barrio: string
  precioM2: string
  perfil: string
}

export type PackArrasDocumentalCiudadConfig = {
  slug: string
  nombre: string
  region: string
  testimoniosLanding: string
  heroImage: string
  precioEjemploPiso: number
  gestor: {
    nombre: string
    rol: string
    foto: string
    bio: string
    especialidades: string[]
  }
  docTecnicaTitulo: string
  docTecnicaItems: string[]
  zonasIntro: string
  zonas: string[]
  mercadoLocal: {
    titulo: string
    parrafos: string[]
    datos?: Array<{ label: string; valor: string }>
  }
  /** Precios orientativos €/m² por barrio — contenido único SEO local */
  barriosPrecio: PackArrasBarrioPrecio[]
  /** Impuestos y tasas propias de la comunidad autónoma / municipio */
  fiscalidadLocal: {
    itp: string
    plusvalia: string
    notas: string[]
  }
  /** Bloque editorial exclusivo por ciudad (evita contenido duplicado) */
  guiaComprador: {
    titulo: string
    parrafos: string[]
  }
  /** Pasos del proceso adaptados al mercado local */
  pasosLocales: Array<{ titulo: string; desc: string }>
  /** Checklist documental con referencias locales concretas */
  checklistPreArras: string[]
  riesgosLocales: Array<{ titulo: string; desc: string }>
  casosReales: PackArrasCasoReal[]
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    h1: string
    lead: string
    badge: string
  }
  faqPrioritarias: PackArrasDocumentalFaqItem[]
}

export type PackArrasDocumentalCiudadConfigBase = Omit<
  PackArrasDocumentalCiudadConfig,
  'barriosPrecio' | 'fiscalidadLocal' | 'guiaComprador' | 'pasosLocales' | 'checklistPreArras'
>

export const PACK_ARRAS_DOCUMENTAL_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'pamplona', nombre: 'Pamplona' },
] as const

export const PACK_ARRAS_DOCUMENTAL_CIUDADES_BASE: Record<string, PackArrasDocumentalCiudadConfigBase> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'pack-arras-documental-madrid',
    heroImage: getCiudadImage('madrid').src,
    precioEjemploPiso: 320_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Madrid',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Redacta arras penitenciales y audita documentación en operaciones de particular a particular en Madrid y área metropolitana. Conoce requisitos del Ayuntamiento, ITE en edificios antiguos y revisiones de comunidades con alto volumen de derramas.',
      especialidades: ['Arras penitenciales LAU/compraventa', 'Revisión actas y derramas', 'Compras sin agencia'],
    },
    docTecnicaTitulo: 'Documentación técnica y Ayuntamiento de Madrid',
    docTecnicaItems: [
      'Cédula de habitabilidad o certificado de primera ocupación vigente',
      'Certificado energético con etiqueta actualizada',
      'ITE / IEE en edificios con más de 50 años (muy frecuente en Chamberí o Centro)',
      'Licencias de obra, legalización de reformas y certificado final',
      'Certificado de eficiencia energética de la comunidad si aplica',
    ],
    zonasIntro:
      'Operamos en Madrid capital y municipios del área metropolitana donde la compraventa entre particulares crece sin revisión profesional.',
    zonas: [
      'Salamanca', 'Chamberí', 'Retiro', 'Moncloa', 'Chamartín', 'Tetuán',
      'Arganzuela', 'Carabanchel', 'Latina', 'Usera', 'Vallecas', 'Fuencarral',
      'Móstoles', 'Getafe', 'Leganés', 'Alcorcón', 'Alcalá de Henares',
    ],
    mercadoLocal: {
      titulo: 'Comprar de particular en Madrid en 2026',
      parrafos: [
        'Madrid concentra una de las mayores tasas de operaciones entre particulares de España: portales como Idealista o Fotocasa permiten contactar directo con el vendedor, pero nadie revisa por ti la documentación ni redacta arras equilibradas.',
        'En distritos céntricos (Chamberí, Salamanca, Retiro) el precio medio supera los 4.500 €/m². Una comisión de agencia del 3–5 % en un piso de 320.000 € supone entre 9.600 € y 16.000 €. El Pack Arras Plus cuesta 450 € fijos: arras penitenciales + auditoría documental completa.',
        'La Ley de Vivienda y las zonas tensionadas madrileñas exigen cláusulas concretas en arrendamientos; en compraventa, el riesgo principal sigue siendo la documentación oculta: derramas millonarias en comunidades grandes, ITE pendiente o cargas registrales no reflejadas en el anuncio.',
      ],
      datos: [
        { label: 'Precio medio piso centro', valor: '4.200 – 4.800 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '9.600 – 16.000 € en 320.000 €' },
        { label: 'Pack Arras Plus Inmonest', valor: '450 € IVA incl.' },
        { label: 'Plazo entrega arras', valor: '48 h laborables' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Derramas ocultas en comunidades grandes',
        desc: 'En edificios de Chamberí o Tetuán es habitual encontrar derramas de ascensor, ITE o rehabilitación de fachada no mencionadas en el anuncio. Revisamos actas de los últimos dos años antes de que firmes la señal.',
      },
      {
        titulo: 'ITE obligatoria en edificios antiguos',
        desc: 'Muchos pisos se venden sin ITE al día. El Ayuntamiento puede exigirla y el banco puede condicionar la hipoteca. Verificamos el estado del edificio y coherencia con la nota simple.',
      },
      {
        titulo: 'Arras redactadas solo por el vendedor',
        desc: 'En operaciones entre particulares el vendedor suele imponer un modelo de arras favorable a él: plazos cortos, señal alta, sin cláusula suspensiva por hipoteca. Redactamos arras equilibradas con condiciones legales válidas en Madrid.',
      },
      {
        titulo: 'Discrepancias catastro vs registro',
        desc: 'Metros cuadrados, anejos o trasteros mal descritos generan problemas en notaría y en el ITP. Cruzamos catastro, registro y escritura previa.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Chamberí entre particulares',
        perfil: 'Comprador primerizo, sin agencia',
        situacion:
          'Encontró piso en un portal. El vendedor le pasó un borrador de arras con plazo de 15 días para escriturar y sin cláusula suspensiva por financiación.',
        resultado:
          'Redactamos arras con plazo realista (45 días), cláusula hipotecaria y revisión de actas: deuda de comunidad de 4.500 € detectada. Renegoció antes de entregar la señal.',
        ahorro: '4.500 €',
      },
      {
        titulo: 'Piso en Tetuán con ITE pendiente',
        perfil: 'Pareja con hipoteca preconcedida',
        situacion:
          'Iban a firmar arras en un edificio de 1968. El anuncio no mencionaba el estado de la ITE del edificio.',
        resultado:
          'Informe documental detectó ITE desfavorable con obras obligatorias en 18 meses. Incluyeron condición suspensiva; el vendedor aportó presupuesto de obra y renegociaron 12.000 € de descuento.',
        ahorro: '12.000 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Madrid 450€ — Arras + revisión documental completa',
      description:
        'Compra piso de particular en Madrid con arras penitenciales redactadas y revisión documental integral: comunidad, ITE, nota simple, derramas. 450€ IVA incl. Sin comisión de agencia.',
      keywords:
        'contrato arras madrid particular, comprar piso particular madrid, revision documentacion compra piso madrid, arras penitenciales madrid, gestor compra vivienda madrid, comprar piso sin agencia madrid, verificar cargas piso madrid, pack arras madrid, revisar documentacion antes arras madrid',
      ogTitle: 'Pack Arras Plus Madrid — Arras + documentación completa por 450€',
      ogDescription:
        'Arras penitenciales y revisión documental para compradores entre particulares en Madrid. Gestor asignado. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Compra entre particulares',
      h1: 'Arras seguras y documentación revisada al comprar de particular en Madrid',
      lead:
        'Redactamos tu contrato de arras penitenciales y auditamos toda la documentación del inmueble — comunidad, ITE, nota simple, derramas — antes de que entregues la señal. 450 € fijos. Sin comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de firmar arras en Madrid?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio tiene más de 50 años y coherencia entre catastro y registro. El pack incluye arras redactadas y esta auditoría completa.',
      },
      {
        q: '¿Cuánto cuesta el pack arras + documentación en Madrid?',
        a: '450 € IVA incluido: arras penitenciales personalizadas en 48 h más informe documental en 3–5 días. Frente a 9.600–16.000 € de comisión de agencia en un piso de 320.000 €.',
      },
      {
        q: '¿Puedo comprar en Madrid sin inmobiliaria?',
        a: 'Sí, pero necesitas gestoría que redacte arras y verifique documentación. Inmonest no cobra porcentaje sobre el precio: tarifa plana de 450 € por el pack completo.',
      },
    ],
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'pack-arras-documental-barcelona',
    heroImage: getCiudadImage('barcelona').src,
    precioEjemploPiso: 350_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Barcelona y área metropolitana',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventa entre particulares en Barcelona. Domina la cédula de habitabilidad de la Generalitat, inspecciones técnicas municipales, licencias de obra en edificios del Eixample y revisión de cargas en operaciones sin agencia.',
      especialidades: ['Cédula Generalitat', 'Arras en catalán/castellano', 'Revisión pre-señal'],
    },
    docTecnicaTitulo: 'Documentación técnica y normativa catalana',
    docTecnicaItems: [
      'Cédula de habitabilidad de la Generalitat (obligatoria en compraventa)',
      'Certificado energético vigente (CEE)',
      'ITE / certificado de inspección técnica del edificio en Barcelona',
      'Licencias de obra mayor/menor y certificado final de obra',
      'Certificado de deudas con la comunidad y estatutos actualizados',
    ],
    zonasIntro:
      'Barcelona capital, área metropolitana y municipios del Vallès donde la compra entre particulares exige conocer la normativa autonómica catalana.',
    zonas: [
      'Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Les Corts', 'Sants-Montjuïc',
      'Ciutat Vella', 'Sant Martí', 'Horta-Guinardó', 'Sant Andreu', 'Poblenou',
      "L'Hospitalet", 'Badalona', 'Sabadell', 'Terrassa', 'Castelldefels',
    ],
    mercadoLocal: {
      titulo: 'Compraventa entre particulares en Barcelona',
      parrafos: [
        'Barcelona es uno de los mercados más competitivos de España: plazos cortos, múltiples ofertas y vendedores que entregan borradores de arras redactados por su abogado — siempre a su favor.',
        'La Generalitat exige cédula de habitabilidad y documentación técnica estricta. Comprar en el Eixample o Gràcia sin revisar ITE, licencias de reforma o deudas de comunidad es asumir riesgos de cinco cifras.',
        'En un piso de 350.000 €, la agencia cobraría entre 10.500 € y 17.500 €. El Pack Arras Plus (450 €) incluye arras penitenciales adaptadas a la operación y revisión documental completa antes de la señal.',
      ],
      datos: [
        { label: 'Precio medio Barcelona ciudad', valor: '3.800 – 4.500 €/m²' },
        { label: 'Comisión agencia estimada', valor: '10.500 – 17.500 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
        { label: 'Documentos clave Generalitat', valor: 'Cédula + CEE + ITE' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Reformas sin licencia en el Eixample',
        desc: 'Muchos pisos reformados no tienen licencia final de obra. Sin ella, puedes heredar responsabilidad urbanística. Verificamos licencias en el Ayuntamiento y coherencia con el estado real del inmueble.',
      },
      {
        titulo: 'Cédula de habitabilidad caducada',
        desc: 'Es requisito en Cataluña para la compraventa. Si está vencida o no coincide con la distribución real, la operación se paraliza en notaría. La solicitamos y validamos antes de arras.',
      },
      {
        titulo: 'Arras en castellano desactualizadas',
        desc: 'Algunos vendedores usan modelos genéricos sin cláusulas válidas bajo jurisprudencia catalana reciente. Redactamos arras personalizadas con plazos, penitenciales y condiciones suspensivas correctas.',
      },
      {
        titulo: 'Plusvalía y deudas municipales',
        desc: 'Revisamos situación de IBI, plusvalía municipal (IIVTNU) y cargas que el vendedor debe liquidar, evitando sorpresas el día de la firma.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Gràcia sin agencia',
        perfil: 'Comprador internacional residente en Barcelona',
        situacion:
          'El vendedor presionaba para firmar arras en 48 h. El borrador no incluía revisión de licencias de la reforma del baño y cocina.',
        resultado:
          'Pack Arras Plus: detectamos falta de certificado final de obra. Se negoció retención en arras hasta legalización. Arras redactadas con plazo de 60 días y cláusula suspensiva.',
        ahorro: 'Evitó responsabilidad urbanística',
      },
      {
        titulo: 'Piso en Sants con deuda de comunidad',
        perfil: 'Familia que vende su piso actual y compra otro',
        situacion:
          'Operación en cadena entre particulares. Iban a entregar 25.000 € de señal sin certificado de deudas de la comunidad.',
        resultado:
          'Informe documental: deuda de 7.800 € más derrama aprobada de 15.000 €. Renegociaron reparto con el vendedor antes de firmar las arras definitivas.',
        ahorro: '7.800 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Barcelona 450€ — Arras + revisión documental',
      description:
        'Arras penitenciales y revisión documental completa al comprar piso de particular en Barcelona. Cédula Generalitat, ITE, comunidad. 450€. Sin comisión de agencia.',
      keywords:
        'contrato arras barcelona particular, comprar piso particular barcelona, revision documentacion compra piso barcelona, arras penitenciales barcelona, gestor compra vivienda barcelona, comprar piso sin agencia barcelona, cédula habitabilidad compra barcelona, pack arras barcelona',
      ogTitle: 'Pack Arras Plus Barcelona — Arras + documentación por 450€',
      ogDescription:
        'Compra entre particulares en Barcelona con arras redactadas y auditoría documental. Gestor experto. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Generalitat',
      h1: 'Compra de particular en Barcelona con arras redactadas y documentación verificada',
      lead:
        'No firmes arras a ciegas. Redactamos el contrato de arras penitenciales y revisamos cédula de habitabilidad, ITE, actas de comunidad y nota registral según normativa catalana. 450 € todo incluido.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué documentos exige la Generalitat al comprar en Barcelona?',
        a: 'Cédula de habitabilidad, certificado energético, ITE cuando corresponda, licencias de obra legalizadas y certificado de deudas de la comunidad. El pack incluye arras y verificación de todos estos puntos.',
      },
      {
        q: '¿Cuánto ahorro frente a una agencia en Barcelona?',
        a: 'En un piso de 350.000 € la agencia cobra 10.500–17.500 €. El Pack Arras Plus cuesta 450 €: arras + informe documental completo.',
      },
      {
        q: '¿Redactáis arras en castellano y catalán?',
        a: 'Sí. Adaptamos el contrato al idioma acordado entre las partes y a la normativa aplicable en Cataluña, con cláusulas válidas para comprador y vendedor.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'pack-arras-documental-valencia',
    heroImage: getCiudadImage('valencia').src,
    precioEjemploPiso: 260_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia y l\'Horta',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Valencia, Ruzafa, Benimaclet o municipios del área metropolitana. Revisa cédula valenciana, cargas registrales, vivienda turística mal declarada y redacta arras equilibradas.',
      especialidades: ['Normativa valenciana', 'Arras + informe documental', 'Compras post-portales'],
    },
    docTecnicaTitulo: 'Documentación técnica y Generalitat Valenciana',
    docTecnicaItems: [
      'Cédula de habitabilidad de la Generalitat Valenciana',
      'Certificado de eficiencia energética (CEE)',
      'IEE en edificios de más de 50 años',
      'Licencias de obra y cédula de conformidad urbanística',
      'Situación registral de vivienda de uso turístico si aplica',
    ],
    zonasIntro:
      'Valencia capital, l\'Horta, litoral y área metropolitana (Mislata, Paterna, Torrent) con conocimiento de la normativa autonómica valenciana.',
    zonas: [
      'Ruzafa', 'Campanar', 'Benimaclet', 'Ciutat Vella', 'El Carmen', 'Eixample',
      'Patraix', 'Quatre Carreres', 'Algirós', 'Mislata', 'Paterna', 'Torrent',
      'Sagunto', 'Cullera', 'Gandía',
    ],
    mercadoLocal: {
      titulo: 'Mercado de particulares en Valencia en 2026',
      parrafos: [
        'Valencia combina precios más accesibles que Madrid o Barcelona con un volumen alto de operaciones entre particulares en Ruzafa, Benimaclet o la Ciutat Vella. La demanda de vivienda habitual y la presión turística conviven en el mismo mercado.',
        'La Generalitat Valenciana exige cédula de habitabilidad y documentación técnica específica. Comprar sin revisar actas de comunidad, derramas de rehabilitación de fachada o registros de vivienda turística puede costarte miles de euros después de firmar.',
        'En un piso de 260.000 €, una agencia cobraría entre 7.800 € y 13.000 €. El Pack Arras Plus por 450 € incluye arras penitenciales redactadas por gestoría y revisión documental integral adaptada a la normativa valenciana.',
      ],
      datos: [
        { label: 'Precio medio Valencia ciudad', valor: '2.400 – 3.200 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '7.800 – 13.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
        { label: 'Entrega arras + informe', valor: '48 h + 3–5 días' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Vivienda turística mal inscrita',
        desc: 'En zonas como Ruzafa o Ciutat Vella hay pisos con licencia turística o sin ella que afectan al uso y a la financiación. Verificamos Registro de Turisme y estatutos de comunidad que prohíban alquiler vacacional.',
      },
      {
        titulo: 'Derramas de rehabilitación en edificios costeros',
        desc: 'Fachadas, ascensores y eficiencia energética generan derramas elevadas. Revisamos actas recientes y cuotas pendientes antes de la señal.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'Vendedores valencianos suelen fijar 15–20 días para escritura. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos realistas.',
      },
      {
        titulo: 'Discrepancias en viviendas reformadas',
        desc: 'En Benimaclet o Patraix hay muchas reformas sin actualizar registro o cédula. Cruzamos documentación técnica, catastro y realidad del inmueble.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Ruzafa entre particulares',
        perfil: 'Compradora local, operación sin agencia',
        situacion:
          'Tras negociar en un portal, el vendedor exigía arras en 72 h con señal de 15.000 €. No había certificado de deudas de la comunidad.',
        resultado:
          'Pack Arras Plus: derrama pendiente de 6.200 € detectada en actas. Arras redactadas con plazo de 45 días y condición de liquidación de deudas antes de escritura. Renegoció 8.000 € de descuento.',
        ahorro: '8.000 €',
      },
      {
        titulo: 'Piso en Benimaclet con hipoteca en trámite',
        perfil: 'Joven pareja, primera compra',
        situacion:
          'El borrador de arras del vendedor no incluía cláusula suspensiva por denegación hipotecaria.',
        resultado:
          'Redacción de arras con protección LAU/compraventa y revisión de IEE del edificio de 1972. La hipoteca se aprobó a los 35 días; escritura sin sobresaltos.',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Valencia 450€ — Arras + revisión documental',
      description:
        'Compra piso de particular en Valencia: arras penitenciales redactadas + revisión documental completa (cédula, comunidad, ITE). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras valencia particular, comprar piso particular valencia, revision documentacion compra piso valencia, arras penitenciales valencia, gestor compra vivienda valencia, comprar piso sin agencia valencia, cédula habitabilidad valencia, pack arras valencia, comprar ruzafa particular',
      ogTitle: 'Pack Arras Plus Valencia — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en Valencia. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Comunitat Valenciana',
      h1: 'Compra piso de particular en Valencia con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula valenciana, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Gestor asignado para particulares.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar en Valencia de particular?',
        a: 'Cédula de habitabilidad, certificado energético, IEE si el edificio lo exige, certificado de deudas de comunidad, nota simple y situación de vivienda turística. El pack lo incluye junto con arras redactadas.',
      },
      {
        q: '¿Cuánto cuesta el pack en Valencia frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 260.000 € la agencia cobraría 7.800–13.000 € de comisión.',
      },
      {
        q: '¿Operáis en Ruzafa, Benimaclet y extrarradio?',
        a: 'Sí. Cubrimos Valencia capital, l\'Horta y municipios del área metropolitana con el mismo servicio online y gestor asignado.',
      },
    ],
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía · Junta de Andalucía',
    testimoniosLanding: 'pack-arras-documental-sevilla',
    heroImage: getCiudadImage('sevilla').src,
    precioEjemploPiso: 220_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Sevilla',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Redacta arras penitenciales y audita documentación en operaciones de particular a particular en Sevilla capital y área metropolitana. Conoce el IEE andaluz, licencias en edificios históricos del casco antiguo y la normativa de vivienda turística de la Junta.',
      especialidades: ['IEE edificios históricos', 'Arras penitenciales LAU/compraventa', 'Compras sin agencia en Triana y Nervión'],
    },
    docTecnicaTitulo: 'Documentación técnica y normativa andaluza (Junta)',
    docTecnicaItems: [
      'Cédula de habitabilidad o certificado de primera ocupación vigente',
      'Certificado energético con etiqueta actualizada',
      'IEE (Informe de Evaluación del Edificio) en edificios con más de 50 años — habitual en Santa Cruz, Triana o Macarena',
      'Licencias de obra y legalización de reformas en edificios protegidos del casco histórico',
      'Certificado de deudas con la comunidad y comprobación de estatutos sobre alquiler turístico',
    ],
    zonasIntro:
      'Sevilla capital, casco histórico UNESCO, barrios residenciales y municipios del área metropolitana donde la compraventa entre particulares crece sin revisión profesional previa.',
    zonas: [
      'Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Centro', 'Santa Cruz',
      'Este-Alcosa', 'Cerro-Amate', 'Bellavista-La Palmera', 'San Jerónimo',
      'Tomares', 'Dos Hermanas', 'Alcalá de Guadaíra', 'Camas', 'Mairena del Aljarafe',
    ],
    mercadoLocal: {
      titulo: 'Comprar de particular en Sevilla en 2026',
      parrafos: [
        'Sevilla combina un casco histórico de altísima demanda con barrios residenciales consolidados (Nervión, Los Remedios, Triana) donde cada vez más compradores contactan directamente con el vendedor en Idealista o Fotocasa. Nadie revisa por ti la documentación ni redacta arras equilibradas.',
        'En Nervión y Los Remedios el precio medio ronda los 2.800–3.200 €/m²; en el casco antiguo (Santa Cruz, Arenal) puede superar los 3.500 €/m². Una comisión de agencia del 3–5 % en un piso de 220.000 € supone entre 6.600 € y 11.000 €. El Pack Arras Plus cuesta 450 € fijos: arras penitenciales + auditoría documental completa adaptada a la normativa andaluza.',
        'La Junta de Andalucía exige IEE en edificios antiguos y regula con rigor la vivienda turística (VFT). En operaciones entre particulares el riesgo principal son derramas en comunidades del centro, IEE desfavorable no mencionado en el anuncio y arras redactadas solo por el vendedor con plazos imposibles para la hipoteca.',
      ],
      datos: [
        { label: 'Precio medio Nervión / Los Remedios', valor: '2.800 – 3.200 €/m²' },
        { label: 'Precio medio casco histórico', valor: '3.200 – 3.800 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '6.600 – 11.000 € en 220.000 €' },
        { label: 'Pack Arras Plus Inmonest', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'IEE desfavorable en edificios del casco antiguo',
        desc: 'En Santa Cruz, Triana o Macarena muchos edificios superan los 50 años y requieren IEE. Un informe negativo obliga a obras costosas en 18–24 meses. Verificamos el estado del edificio y coherencia con la nota simple antes de que entregues la señal.',
      },
      {
        titulo: 'Vivienda turística (VFT) mal declarada',
        desc: 'La Junta de Andalucía limita las licencias VFT en zonas saturadas. Comprar un piso con licencia turística oculta o sin ella en una comunidad que la prohíbe genera conflictos y problemas de financiación. Revisamos registro turístico y estatutos comunitarios.',
      },
      {
        titulo: 'Derramas en comunidades del centro histórico',
        desc: 'Rehabilitación de fachadas, ascensores y accesibilidad generan derramas elevadas en edificios señoriales. Revisamos actas de los últimos dos años en Triana, Macarena o el Arenal antes de firmar arras.',
      },
      {
        titulo: 'Arras con plazos cortos y sin cláusula hipotecaria',
        desc: 'En Sevilla es habitual que el vendedor imponga 15–20 días para escriturar. Si tu banco tarda más, pierdes la señal. Redactamos arras con plazos realistas (45–60 días), cláusula suspensiva por financiación y penitenciales equilibrados.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Triana entre particulares',
        perfil: 'Comprador sevillano, sin agencia',
        situacion:
          'Encontró piso en un portal. El vendedor le pasó arras con plazo de 20 días para escriturar y señal del 10 % sin revisión previa de actas de comunidad.',
        resultado:
          'Pack Arras Plus: derrama aprobada de 5.800 € detectada en actas del edificio del s. XIX. Arras redactadas con plazo de 50 días y condición de liquidación de deudas. Renegoció 6.500 € de descuento antes de entregar la señal.',
        ahorro: '6.500 €',
      },
      {
        titulo: 'Piso en Nervión con IEE pendiente',
        perfil: 'Pareja con hipoteca preconcedida',
        situacion:
          'Iban a firmar arras en un edificio de 1965. El anuncio no mencionaba el IEE ni las obras obligatorias del edificio.',
        resultado:
          'Informe documental detectó IEE con calificación deficiente y obras de fachada en 24 meses. Incluyeron condición suspensiva; el vendedor aportó presupuesto y renegociaron 9.000 € de descuento.',
        ahorro: '9.000 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Sevilla 450€ — Arras + revisión documental completa',
      description:
        'Compra piso de particular en Sevilla con arras penitenciales redactadas y revisión documental integral: IEE, comunidad, nota simple, VFT. 450€ IVA incl. Sin comisión de agencia.',
      keywords:
        'contrato arras sevilla particular, comprar piso particular sevilla, revision documentacion compra piso sevilla, arras penitenciales sevilla, gestor compra vivienda sevilla, comprar piso sin agencia sevilla, IEE compra vivienda sevilla, pack arras sevilla, revisar documentacion antes arras sevilla, comprar triana particular, comprar nervion particular',
      ogTitle: 'Pack Arras Plus Sevilla — Arras + documentación completa por 450€',
      ogDescription:
        'Arras penitenciales y revisión documental para compradores entre particulares en Sevilla. Gestor asignado. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Junta de Andalucía',
      h1: 'Arras seguras y documentación revisada al comprar de particular en Sevilla',
      lead:
        'Redactamos tu contrato de arras penitenciales y auditamos toda la documentación del inmueble — IEE, comunidad, nota simple, VFT — según normativa andaluza, antes de que entregues la señal. 450 € fijos. Sin comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de firmar arras en Sevilla?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad, certificado energético, IEE si el edificio tiene más de 50 años (muy habitual en el casco histórico), licencias de obra y situación de vivienda turística. El pack incluye arras redactadas y esta auditoría completa.',
      },
      {
        q: '¿Cuánto cuesta el pack arras + documentación en Sevilla?',
        a: '450 € IVA incluido: arras penitenciales personalizadas en 48 h más informe documental en 3–5 días. Frente a 6.600–11.000 € de comisión de agencia en un piso de 220.000 €.',
      },
      {
        q: '¿Puedo comprar en Triana o Nervión sin inmobiliaria?',
        a: 'Sí, pero necesitas gestoría que redacte arras y verifique documentación andaluza. Inmonest no cobra porcentaje sobre el precio: tarifa plana de 450 € por el pack completo en Sevilla y área metropolitana.',
      },
    ],
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía · Costa del Sol',
    testimoniosLanding: 'pack-arras-documental-malaga',
    heroImage: getCiudadImage('malaga').src,
    precioEjemploPiso: 300_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Málaga y Costa del Sol',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compraventa entre particulares en Málaga capital, Soho, Teatinos y municipios de la Costa del Sol. Domina la normativa VFT de la Junta, revisiones de comunidades con alto volumen turístico y redacción de arras para compradores nacionales e internacionales.',
      especialidades: ['Normativa VFT Junta', 'Arras compradores extranjeros', 'Revisión pre-señal Costa del Sol'],
    },
    docTecnicaTitulo: 'Documentación técnica en Málaga y Costa del Sol',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente (obligatoria en Andalucía)',
      'Certificado energético actualizado',
      'IEE en edificios de más de 50 años — frecuente en Centro Histórico y La Malagueta',
      'Licencias de obra y legalización de reformas (Soho, Muelle Uno, Teatinos)',
      'Registro de viviendas con fines turísticos (VFT) y compatibilidad con estatutos comunitarios',
    ],
    zonasIntro:
      'Málaga capital, barrios en transformación urbana, litoral malagueño y municipios costeros donde la compraventa entre particulares exige conocer VFT, IEE y dinámica internacional del mercado.',
    zonas: [
      'Centro Histórico', 'Soho', 'La Malagueta', 'El Limonar', 'Teatinos',
      'El Palo-Pedregalejo', 'Huelin', 'Carretera de Cádiz', 'Ciudad Jardín',
      'Benalmádena', 'Torremolinos', 'Rincón de la Victoria', 'Fuengirola', 'Mijas Costa',
    ],
    mercadoLocal: {
      titulo: 'Compraventa entre particulares en Málaga y Costa del Sol',
      parrafos: [
        'Málaga es uno de los mercados con mayor presencia de compradores internacionales y operaciones directas entre particulares. Soho, Teatinos y el Centro Histórico concentran anuncios sin agencia, pero los vendedores suelen entregar borradores de arras redactados a su favor — plazos cortos, señal alta, sin protección hipotecaria.',
        'En el centro y La Malagueta el precio medio supera los 3.500–4.200 €/m²; en Teatinos o Huelin ronda los 2.800–3.400 €/m². En un piso de 300.000 €, la agencia cobraría entre 9.000 € y 15.000 €. El Pack Arras Plus (450 €) incluye arras penitenciales adaptadas a la operación y revisión documental completa antes de la señal.',
        'La Junta de Andalucía ha reforzado la regulación de vivienda turística (VFT) en Málaga capital y la costa. Comprar sin revisar licencias VFT, IEE de edificios costeros o deudas de comunidades con conflictos turísticos puede costarte decenas de miles de euros después de firmar.',
      ],
      datos: [
        { label: 'Precio medio Centro / Malagueta', valor: '3.500 – 4.200 €/m²' },
        { label: 'Precio medio Teatinos / Huelin', valor: '2.800 – 3.400 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '9.000 – 15.000 € en 300.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Licencia VFT oculta o incompatible con la comunidad',
        desc: 'En Málaga capital y la costa muchos pisos tienen licencia turística o la han perdido por moratoria. Si la comunidad prohíbe alquiler vacacional y el piso la tiene, heredas conflictos legales. Verificamos registro VFT de la Junta y estatutos antes de arras.',
      },
      {
        titulo: 'Reformas sin licencia en Soho y Centro Histórico',
        desc: 'La regeneración urbana ha multiplicado reformas sin legalizar. Sin certificado final de obra puedes heredar responsabilidad urbanística. Verificamos licencias en el Ayuntamiento de Málaga y coherencia con el estado real del inmueble.',
      },
      {
        titulo: 'IEE en edificios costeros y del s. XX',
        desc: 'La humedad, salitre y antigüedad agravan el estado de edificios en La Malagueta, El Palo o Pedregalejo. Un IEE desfavorable implica obras obligatorias. Lo cruzamos con nota simple y actas de comunidad.',
      },
      {
        titulo: 'Arras redactadas en inglés o con cláusulas extranjeras',
        desc: 'Operaciones con compradores internacionales suelen usar modelos genéricos no adaptados al derecho español. Redactamos arras válidas en España con cláusulas suspensivas, penitenciales y plazos realistas para hipoteca en banco español.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Teatinos sin agencia',
        perfil: 'Familia que vende en otra ciudad y compra en Málaga',
        situacion:
          'Tras negociar en Idealista, el vendedor exigía arras en 72 h con señal de 30.000 €. No había certificado de deudas ni comprobación de VFT.',
        resultado:
          'Pack Arras Plus: licencia VFT caducada detectada y deuda de comunidad de 3.400 €. Arras redactadas con plazo de 55 días, cláusula hipotecaria y condición de regularización. Renegociaron 7.500 € de descuento.',
        ahorro: '7.500 €',
      },
      {
        titulo: 'Piso en La Malagueta con discrepancia registral',
        perfil: 'Comprador británico residente en Málaga',
        situacion:
          'El anuncio indicaba 95 m² pero el registro reflejaba 82 m² útiles. Iban a firmar arras sin cruzar catastro y escritura previa.',
        resultado:
          'Informe documental detectó discrepancia de 13 m² y terraza sin inscribir. Renegociaron precio por m² real y arras con condición de actualización registral antes de escritura.',
        ahorro: '11.000 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Málaga 450€ — Arras + revisión documental Costa del Sol',
      description:
        'Arras penitenciales y revisión documental completa al comprar piso de particular en Málaga. VFT, IEE, comunidad. 450€. Sin comisión de agencia. Costa del Sol.',
      keywords:
        'contrato arras malaga particular, comprar piso particular malaga, revision documentacion compra piso malaga, arras penitenciales malaga, gestor compra vivienda malaga, comprar piso sin agencia malaga, pack arras malaga, VFT compra vivienda malaga, comprar piso costa del sol particular, revisar documentacion antes arras malaga, comprar teatinos particular',
      ogTitle: 'Pack Arras Plus Málaga — Arras + documentación por 450€',
      ogDescription:
        'Compra entre particulares en Málaga y Costa del Sol con arras redactadas y auditoría documental. Gestor experto. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Costa del Sol',
      h1: 'Compra de particular en Málaga con arras redactadas y documentación verificada',
      lead:
        'No firmes arras a ciegas en la Costa del Sol. Redactamos el contrato de arras penitenciales y revisamos VFT, IEE, actas de comunidad y nota registral según normativa andaluza. 450 € todo incluido.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué documentos exige la Junta de Andalucía al comprar en Málaga?',
        a: 'Cédula de habitabilidad, certificado energético, IEE cuando corresponda, licencias de obra legalizadas, certificado de deudas de la comunidad y comprobación de vivienda turística (VFT). El pack incluye arras y verificación de todos estos puntos.',
      },
      {
        q: '¿Cuánto ahorro frente a una agencia en Málaga?',
        a: 'En un piso de 300.000 € la agencia cobra 9.000–15.000 €. El Pack Arras Plus cuesta 450 €: arras + informe documental completo.',
      },
      {
        q: '¿Operáis en Benalmádena, Torremolinos y la costa?',
        a: 'Sí. Cubrimos Málaga capital, Costa del Sol y área metropolitana con el mismo servicio online, gestor asignado y arras adaptadas a la normativa andaluza.',
      },
    ],
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón · Gobierno de Aragón',
    testimoniosLanding: 'pack-arras-documental-zaragoza',
    heroImage: getCiudadImage('zaragoza').src,
    precioEjemploPiso: 185_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Zaragoza',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Zaragoza capital, Actur, Valdespartera y área metropolitana. Revisa cargas registrales, ITE en edificios del Ensanche, derramas en comunidades y redacta arras equilibradas en un mercado de operaciones rápidas.',
      especialidades: ['Normativa aragonesa', 'Arras + informe documental', 'Compras en Actur y Valdespartera'],
    },
    docTecnicaTitulo: 'Documentación técnica y Gobierno de Aragón',
    docTecnicaItems: [
      'Cédula de habitabilidad o certificado equivalente aragonés',
      'Certificado de eficiencia energética (CEE)',
      'ITE / IEE en edificios de más de 50 años — habitual en el Ensanche y casco antiguo',
      'Licencias de obra y cédula de conformidad urbanística del Ayuntamiento de Zaragoza',
      'Certificado de deudas con la comunidad y revisión de derramas en urbanizaciones nuevas',
    ],
    zonasIntro:
      'Zaragoza capital, Ensanche histórico, barrios periféricos en crecimiento y municipios del área metropolitana (Utebo, Cuarte, La Muela) con conocimiento de la normativa aragonesa.',
    zonas: [
      'Centro', 'Delicias', 'Las Fuentes', 'San José', 'Actur', 'Montecanal',
      'Valdespartera', 'La Almozara', 'Torre Ramona', 'Oliver-Valdefierro',
      'Utebo', 'Cuarte de Huerva', 'La Muela', 'Villanueva de Gállego',
    ],
    mercadoLocal: {
      titulo: 'Mercado de particulares en Zaragoza en 2026',
      parrafos: [
        'Zaragoza ofrece uno de los mercados más accesibles de las grandes ciudades españolas, con alto volumen de operaciones entre particulares en Delicias, Actur, Las Fuentes o el Ensanche. Los plazos son cortos y los vendedores presionan para firmar arras en días — sin que nadie revise la documentación.',
        'En el centro y Delicias el precio medio ronda los 2.200–2.800 €/m²; en Actur, Valdespartera o Montecanal, entre 1.900 y 2.400 €/m². Una comisión de agencia del 3–5 % en un piso de 185.000 € supone entre 5.550 € y 9.250 €. El Pack Arras Plus por 450 € incluye arras penitenciales redactadas por gestoría y revisión documental integral adaptada a Aragón.',
        'En Zaragoza el riesgo no es solo el precio: son las operaciones rápidas sin due diligence, las derramas en urbanizaciones de los 2000 (Actur, Valdespartera) y las discrepancias entre metros registrales y catastrales en pisos reformados del Ensanche.',
      ],
      datos: [
        { label: 'Precio medio Centro / Delicias', valor: '2.200 – 2.800 €/m²' },
        { label: 'Precio medio Actur / Valdespartera', valor: '1.900 – 2.400 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '5.550 – 9.250 € en 185.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Derramas en urbanizaciones de Actur y Valdespartera',
        desc: 'Comunidades de propietarios de los años 2000 acumulan derramas de fachada, ascensor y eficiencia energética. Revisamos actas recientes y cuotas pendientes antes de la señal en operaciones entre particulares.',
      },
      {
        titulo: 'ITE pendiente en edificios del Ensanche',
        desc: 'El Ensanche zaragozano concentra edificios de principios del s. XX sin ITE al día. El Ayuntamiento y los bancos pueden exigirla. Verificamos el estado del edificio y coherencia con la nota simple.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'En Zaragoza los vendedores suelen fijar 10–15 días para escritura en un mercado muy dinámico. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
      {
        titulo: 'Discrepancias catastro vs registro en pisos reformados',
        desc: 'En Delicias o el Centro hay muchas reformas sin actualizar registro o cédula. Cruzamos documentación técnica, catastro y realidad del inmueble para evitar sorpresas en notaría y en el ITP.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Actur entre particulares',
        perfil: 'Pareja joven, primera compra',
        situacion:
          'Encontraron piso en un portal. El vendedor presionaba para firmar arras en 48 h con señal de 12.000 € sin certificado de deudas de la comunidad.',
        resultado:
          'Pack Arras Plus: derrama pendiente de 4.100 € y otra aprobada de 8.500 € detectadas en actas. Arras redactadas con plazo de 50 días y condición de información completa. Renegociaron 5.000 € de descuento.',
        ahorro: '5.000 €',
      },
      {
        titulo: 'Piso en Delicias con ITE del edificio',
        perfil: 'Comprador que vende su piso actual en Zaragoza',
        situacion:
          'Operación en cadena entre particulares. El borrador de arras no incluía cláusula suspensiva ni revisión del ITE del edificio de 1958.',
        resultado:
          'Redacción de arras con protección por financiación y revisión de ITE: obras menores pendientes en portal común. Negociaron retención en escrow hasta subsanación. Escritura sin sobresaltos a los 52 días.',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Zaragoza 450€ — Arras + revisión documental',
      description:
        'Compra piso de particular en Zaragoza: arras penitenciales redactadas + revisión documental completa (ITE, comunidad, nota simple). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras zaragoza particular, comprar piso particular zaragoza, revision documentacion compra piso zaragoza, arras penitenciales zaragoza, gestor compra vivienda zaragoza, comprar piso sin agencia zaragoza, pack arras zaragoza, revisar documentacion antes arras zaragoza, que revisar antes comprar piso zaragoza, comprar actur particular, comprar valdespartera particular',
      ogTitle: 'Pack Arras Plus Zaragoza — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en Zaragoza. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Aragón',
      h1: 'Compra piso de particular en Zaragoza con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula aragonesa, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Gestor asignado para particulares.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar en Zaragoza de particular?',
        a: 'Nota simple registral, certificado de deudas de comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio lo exige y licencias de reformas. El pack lo incluye junto con arras redactadas.',
      },
      {
        q: '¿Cuánto cuesta el pack en Zaragoza frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 185.000 € la agencia cobraría 5.550–9.250 € de comisión.',
      },
      {
        q: '¿Operáis en Actur, Valdespartera y extrarradio?',
        a: 'Sí. Cubrimos Zaragoza capital, Ensanche, barrios periféricos y municipios del área metropolitana con el mismo servicio online y gestor asignado.',
      },
    ],
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    testimoniosLanding: 'pack-arras-documental-bilbao',
    heroImage: getCiudadImage('bilbao').src,
    precioEjemploPiso: 280_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Bizkaia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Redacta arras penitenciales y audita documentación en operaciones de particular a particular en Bilbao y Gran Bilbao. Domina normativa foral vasca, plusvalía municipal de Bizkaia, ITE en edificios del Ensanche y revisiones de comunidades en edificios señoriales.',
      especialidades: ['Normativa foral vasca', 'Arras + informe documental', 'Compras en Indautxu y Deusto'],
    },
    docTecnicaTitulo: 'Documentación técnica y normativa foral vasca',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente según normativa vasca',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años — habitual en Abando, Indautxu y casco histórico',
      'Licencias de obra y conformidad urbanística del Ayuntamiento de Bilbao',
      'Certificado de deudas con la comunidad y revisión de derramas en edificios del Ensanche',
    ],
    zonasIntro:
      'Bilbao capital, Gran Bilbao y municipios del área metropolitana (Getxo, Barakaldo, Portugalete) con conocimiento de la normativa foral y del mercado bilbaíno entre particulares.',
    zonas: [
      'Indautxu', 'Abando', 'Deusto', 'Rekalde', 'Bilbao La Vieja',
      'Santutxu', 'Basurto', 'Zorrotza', 'Getxo', 'Barakaldo',
      'Portugalete', 'Leioa', 'Santurtzi',
    ],
    mercadoLocal: {
      titulo: 'Comprar de particular en Bilbao en 2026',
      parrafos: [
        'Bilbao concentra operaciones entre particulares en Indautxu, Deusto y el Ensanche, donde el precio medio supera los 3.500–4.500 €/m². Los vendedores suelen entregar borradores de arras redactados a su favor — plazos cortos, señal alta, sin cláusula hipotecaria ni revisión de cargas registrales.',
        'En un piso de 280.000 €, una comisión de agencia del 3–5 % supone entre 8.400 € y 14.000 €. El Pack Arras Plus cuesta 450 € fijos: arras penitenciales redactadas por gestoría y auditoría documental completa adaptada a la normativa foral vasca y al mercado de Bizkaia.',
        'En Bizkaia el riesgo no es solo el precio: son las operaciones sin due diligence en edificios del s. XX, la plusvalía municipal mal calculada, las derramas en comunidades del Ensanche y las arras con plazos imposibles para la concesión hipotecaria en bancos vascos.',
      ],
      datos: [
        { label: 'Precio medio Indautxu / Abando', valor: '3.800 – 4.500 €/m²' },
        { label: 'Precio medio Deusto / Rekalde', valor: '3.200 – 3.800 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '8.400 – 14.000 € en 280.000 €' },
        { label: 'Pack Arras Plus Inmonest', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Plusvalía municipal de Bizkaia mal calculada',
        desc: 'En operaciones entre particulares es habitual que nadie verifique la plusvalía foral antes de firmar arras. Un error en el cálculo puede costarte miles de euros en el cierre. Revisamos la situación urbanística y los plazos de transmisión.',
      },
      {
        titulo: 'ITE pendiente en edificios del Ensanche',
        desc: 'Indautxu, Abando y el casco histórico concentran edificios de principios del s. XX sin ITE al día. El Ayuntamiento y los bancos pueden exigirla antes de la hipoteca. Verificamos el estado del edificio y coherencia con la nota simple.',
      },
      {
        titulo: 'Derramas en comunidades señoriales',
        desc: 'Rehabilitación de fachadas, ascensores y eficiencia energética generan derramas elevadas en edificios del Ensanche bilbaíno. Revisamos actas de los últimos dos años antes de entregar la señal.',
      },
      {
        titulo: 'Arras con cláusulas desequilibradas',
        desc: 'En Bilbao los vendedores suelen imponer plazos de 15–20 días para escriturar. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Indautxu entre particulares',
        perfil: 'Pareja con hipoteca preconcedida',
        situacion:
          'Encontraron piso en un portal. El vendedor les pasó arras con plazo de 18 días y señal del 10 % sin revisión previa de actas de comunidad ni ITE del edificio.',
        resultado:
          'Pack Arras Plus: derrama aprobada de 7.200 € detectada en actas del edificio de 1925. Arras redactadas con plazo de 55 días y condición de liquidación de deudas. Renegociaron 9.500 € de descuento.',
        ahorro: '9.500 €',
      },
      {
        titulo: 'Piso en Deusto con discrepancia registral',
        perfil: 'Profesional que se muda a Bilbao',
        situacion:
          'El anuncio indicaba 90 m² pero el registro reflejaba 78 m² útiles. Iban a firmar arras sin cruzar catastro y escritura previa.',
        resultado:
          'Informe documental detectó discrepancia de 12 m² y trastero sin inscribir. Renegociaron precio por m² real y arras con condición de actualización registral antes de escritura.',
        ahorro: '8.000 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Bilbao 450€ — Arras + revisión documental Bizkaia',
      description:
        'Compra piso de particular en Bilbao con arras penitenciales redactadas y revisión documental integral: ITE, comunidad, nota simple, normativa foral. 450€ IVA incl. Sin comisión de agencia.',
      keywords:
        'contrato arras bilbao particular, comprar piso particular bilbao, revision documentacion compra piso bilbao, arras penitenciales bilbao, gestor compra vivienda bilbao, comprar piso sin agencia bilbao, pack arras bilbao, revisar documentacion antes arras bilbao, comprar indautxu particular, comprar deusto particular, plusvalia foral bizkaia compra',
      ogTitle: 'Pack Arras Plus Bilbao — Arras + documentación completa por 450€',
      ogDescription:
        'Arras penitenciales y revisión documental para compradores entre particulares en Bilbao y Bizkaia. Gestor asignado. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · País Vasco',
      h1: 'Arras seguras y documentación revisada al comprar de particular en Bilbao',
      lead:
        'Redactamos tu contrato de arras penitenciales y auditamos toda la documentación del inmueble — ITE, comunidad, nota simple, normativa foral — antes de que entregues la señal. 450 € fijos. Sin comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de firmar arras en Bilbao?',
        a: 'Nota simple registral, certificado de deudas de la comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio lo exige (muy habitual en el Ensanche), licencias de obra y plusvalía foral de Bizkaia. El pack incluye arras redactadas y esta auditoría completa.',
      },
      {
        q: '¿Cuánto cuesta el pack arras + documentación en Bilbao?',
        a: '450 € IVA incluido: arras penitenciales personalizadas en 48 h más informe documental en 3–5 días. Frente a 8.400–14.000 € de comisión de agencia en un piso de 280.000 €.',
      },
      {
        q: '¿Operáis en Getxo, Barakaldo y Gran Bilbao?',
        a: 'Sí. Cubrimos Bilbao capital, área metropolitana y municipios de Bizkaia con el mismo servicio online y gestor asignado.',
      },
    ],
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia · Xunta de Galicia',
    testimoniosLanding: 'pack-arras-documental-coruna',
    heroImage: getCiudadImage('coruna').src,
    precioEjemploPiso: 210_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Galicia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Redacta arras penitenciales y audita documentación en operaciones de particular a particular en A Coruña, área metropolitana y costa gallega. Conoce la normativa de la Xunta, ITE en edificios del Ensanche coruñés y revisiones de comunidades con alto volumen de derramas.',
      especialidades: ['Normativa gallega', 'Arras + informe documental', 'Compras en Ensanche y Oleiros'],
    },
    docTecnicaTitulo: 'Documentación técnica y Xunta de Galicia',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente según normativa gallega',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años — habitual en Ciudad Vieja y Ensanche',
      'Licencias de obra y legalización de reformas en edificios protegidos',
      'Certificado de deudas con la comunidad y revisión de derramas en edificios del s. XX',
    ],
    zonasIntro:
      'A Coruña capital, Ensanche, barrios residenciales y municipios del área metropolitana (Oleiros, Arteixo, Cambre, Ferrol) con conocimiento de la normativa autonómica gallega.',
    zonas: [
      'Ciudad Vieja', 'Ensanche', 'Monte Alto', 'Los Rosales', 'Matadero',
      'Elviña', 'Mesoiro', 'Cuatro Caminos', 'Oleiros', 'Arteixo',
      'Cambre', 'Ferrol', 'Culleredo',
    ],
    mercadoLocal: {
      titulo: 'Compraventa entre particulares en A Coruña en 2026',
      parrafos: [
        'A Coruña concentra operaciones directas entre comprador y vendedor en el Ensanche, Monte Alto y municipios como Oleiros o Arteixo. El mercado gallego es dinámico pero pocos compradores revisan la documentación antes de entregar la señal.',
        'En el Ensanche y Ciudad Vieja el precio medio ronda los 2.400–3.000 €/m²; en Elviña, Mesoiro u Oleiros, entre 1.900 y 2.500 €/m². Una comisión de agencia del 3–5 % en un piso de 210.000 € supone entre 6.300 € y 10.500 €. El Pack Arras Plus por 450 € incluye arras penitenciales y revisión documental integral adaptada a Galicia.',
        'En A Coruña el riesgo principal son las operaciones rápidas sin due diligence, las derramas en edificios del Ensanche coruñés, las discrepancias entre metros registrales y catastrales en pisos reformados y las arras redactadas solo por el vendedor.',
      ],
      datos: [
        { label: 'Precio medio Ensanche / Ciudad Vieja', valor: '2.400 – 3.000 €/m²' },
        { label: 'Precio medio Elviña / Oleiros', valor: '1.900 – 2.500 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '6.300 – 10.500 € en 210.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Derramas en edificios del Ensanche coruñés',
        desc: 'Comunidades de propietarios de principios del s. XX acumulan derramas de fachada, ascensor y eficiencia energética. Revisamos actas recientes y cuotas pendientes antes de la señal en operaciones entre particulares.',
      },
      {
        titulo: 'ITE pendiente en edificios antiguos',
        desc: 'Ciudad Vieja y el Ensanche concentran edificios de más de 50 años sin ITE al día. La Xunta y los bancos pueden exigirla. Verificamos el estado del edificio y coherencia con la nota simple.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'En A Coruña los vendedores suelen fijar 10–15 días para escritura. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
      {
        titulo: 'Discrepancias catastro vs registro en pisos reformados',
        desc: 'En el Ensanche hay muchas reformas sin actualizar registro o cédula. Cruzamos documentación técnica, catastro y realidad del inmueble para evitar sorpresas en notaría y en el ITP.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Ensanche entre particulares',
        perfil: 'Familia primer comprador',
        situacion:
          'Encontraron piso en un portal. El vendedor presionaba para firmar arras en 48 h con señal de 15.000 € sin certificado de deudas de la comunidad.',
        resultado:
          'Pack Arras Plus: derrama pendiente de 3.800 € y otra aprobada de 6.200 € detectadas en actas. Arras redactadas con plazo de 50 días y condición de información completa. Renegociaron 5.500 € de descuento.',
        ahorro: '5.500 €',
      },
      {
        titulo: 'Piso en Oleiros con discrepancia registral',
        perfil: 'Teletrabajador reubicado en Galicia',
        situacion:
          'El anuncio indicaba 85 m² pero el registro reflejaba 74 m² útiles. Iban a firmar arras sin cruzar catastro y escritura previa.',
        resultado:
          'Informe documental detectó discrepancia de 11 m². Renegociaron precio por m² real y arras con condición de actualización registral antes de escritura.',
        ahorro: '7.000 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus A Coruña 450€ — Arras + revisión documental Galicia',
      description:
        'Compra piso de particular en A Coruña: arras penitenciales redactadas + revisión documental completa (ITE, comunidad, nota simple). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras coruña particular, comprar piso particular a coruña, revision documentacion compra piso coruña, arras penitenciales coruña, gestor compra vivienda galicia, comprar piso sin agencia coruña, pack arras coruña, revisar documentacion antes arras coruña, comprar ensanche coruña particular, comprar oleiros particular',
      ogTitle: 'Pack Arras Plus A Coruña — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en A Coruña y Galicia. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Galicia',
      h1: 'Compra piso de particular en A Coruña con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula gallega, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Gestor asignado para particulares.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar en A Coruña de particular?',
        a: 'Nota simple registral, certificado de deudas de comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio lo exige y licencias de reformas. El pack lo incluye junto con arras redactadas.',
      },
      {
        q: '¿Cuánto cuesta el pack en A Coruña frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 210.000 € la agencia cobraría 6.300–10.500 € de comisión.',
      },
      {
        q: '¿Operáis en Oleiros, Arteixo y Ferrol?',
        a: 'Sí. Cubrimos A Coruña capital, área metropolitana y costa gallega con el mismo servicio online y gestor asignado.',
      },
    ],
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'pack-arras-documental-valladolid',
    heroImage: getCiudadImage('valladolid').src,
    precioEjemploPiso: 190_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Castilla y León',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Valladolid capital, Parquesol, Delicias y área metropolitana. Ideal si compras desde Madrid u otra provincia: arras redactadas y revisión documental a distancia antes de entregar la señal.',
      especialidades: ['Compras a distancia', 'Arras + informe documental', 'Normativa castellanoleonesa'],
    },
    docTecnicaTitulo: 'Documentación técnica y Junta de Castilla y León',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente según normativa autonómica',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años — habitual en el centro histórico',
      'Licencias de obra y legalización de reformas en edificios protegidos',
      'Certificado de deudas con la comunidad y revisión de derramas en urbanizaciones',
    ],
    zonasIntro:
      'Valladolid capital, casco histórico, barrios residenciales en crecimiento y municipios del área metropolitana (Laguna de Duero, Tudela de Duero, Boecillo).',
    zonas: [
      'Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria',
      'Pilarica', 'La Rubia', 'Covaresa', 'Laguna de Duero', 'Tudela de Duero',
      'Boecillo', 'Simancas',
    ],
    mercadoLocal: {
      titulo: 'Mercado de particulares en Valladolid en 2026',
      parrafos: [
        'Valladolid ofrece uno de los mercados más accesibles de Castilla y León, con alto volumen de operaciones entre particulares en Parquesol, Delicias y el centro. Muchos compradores llegan desde Madrid u otras provincias y firman arras sin revisar la documentación local.',
        'En el centro y Delicias el precio medio ronda los 2.000–2.600 €/m²; en Parquesol o La Rubia, entre 1.800 y 2.300 €/m². Una comisión de agencia del 3–5 % en un piso de 190.000 € supone entre 5.700 € y 9.500 €. El Pack Arras Plus por 450 € incluye arras penitenciales y revisión documental integral adaptada a Castilla y León.',
        'En Valladolid el riesgo principal son las operaciones a distancia sin due diligence, las derramas en urbanizaciones de Parquesol, las reformas sin licencia en el casco antiguo y las arras con plazos imposibles para la hipoteca.',
      ],
      datos: [
        { label: 'Precio medio Centro / Delicias', valor: '2.000 – 2.600 €/m²' },
        { label: 'Precio medio Parquesol / La Rubia', valor: '1.800 – 2.300 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '5.700 – 9.500 € en 190.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Derramas en urbanizaciones de Parquesol',
        desc: 'Comunidades de propietarios de los años 2000 acumulan derramas de fachada, ascensor y eficiencia energética. Revisamos actas recientes y cuotas pendientes antes de la señal.',
      },
      {
        titulo: 'Reformas sin licencia en el casco antiguo',
        desc: 'El centro histórico de Valladolid concentra reformas sin legalizar en edificios protegidos. Sin certificado final de obra puedes heredar responsabilidad urbanística. Verificamos licencias en el Ayuntamiento.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'En Valladolid los vendedores suelen fijar 10–15 días para escritura. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
      {
        titulo: 'Compras a distancia sin revisión previa',
        desc: 'Muchos compradores viven en Madrid u otra ciudad y firman arras sin haber visto la documentación. El pack incluye auditoría completa online antes de entregar la señal, con gestor asignado.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra desde Madrid a Valladolid',
        perfil: 'Profesional que se muda',
        situacion:
          'Encontró piso en Parquesol en un portal. El vendedor exigía arras en 72 h con señal de 14.000 € sin dar tiempo a revisar documentación.',
        resultado:
          'Pack Arras Plus: derrama pendiente de 3.200 € detectada en actas. Arras redactadas con plazo de 50 días y cláusula hipotecaria. Operación completada sin desplazamientos innecesarios.',
        ahorro: '6.500 €',
      },
      {
        titulo: 'Piso en Delicias con ITE del edificio',
        perfil: 'Pareja joven, primera compra',
        situacion:
          'Iban a firmar arras en un edificio de 1962. El anuncio no mencionaba el ITE ni las obras obligatorias del edificio.',
        resultado:
          'Informe documental detectó ITE con obras menores pendientes en portal común. Incluyeron condición suspensiva; el vendedor aportó presupuesto y renegociaron 4.500 € de descuento.',
        ahorro: '4.500 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Valladolid 450€ — Arras + revisión documental',
      description:
        'Compra piso de particular en Valladolid: arras penitenciales redactadas + revisión documental completa (ITE, comunidad, nota simple). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras valladolid particular, comprar piso particular valladolid, revision documentacion compra piso valladolid, arras penitenciales valladolid, gestor compra vivienda valladolid, comprar piso sin agencia valladolid, pack arras valladolid, revisar documentacion antes arras valladolid, comprar parquesol particular, comprar delicias valladolid',
      ogTitle: 'Pack Arras Plus Valladolid — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en Valladolid. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Castilla y León',
      h1: 'Compra piso de particular en Valladolid con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Ideal si compras desde otra provincia.',
    },
    faqPrioritarias: [
      {
        q: '¿Puedo comprar en Valladolid viviendo en Madrid u otra ciudad?',
        a: 'Sí. Trabajamos 100 % online: arras redactadas, revisión documental, videollamadas y coordinación con notaría en Valladolid. El pack incluye auditoría completa antes de entregar la señal.',
      },
      {
        q: '¿Cuánto cuesta el pack en Valladolid frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 190.000 € la agencia cobraría 5.700–9.500 € de comisión.',
      },
      {
        q: '¿Qué revisar en edificios históricos del centro de Valladolid?',
        a: 'Estado de conservación, licencias de reforma, protección patrimonial y deudas de comunidad. En el casco antiguo hay particularidades urbanísticas que verificamos en el pack.',
      },
    ],
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'pack-arras-documental-murcia',
    heroImage: getCiudadImage('murcia').src,
    precioEjemploPiso: 175_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en la Región de Murcia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Murcia capital, Cartagena, Lorca y área metropolitana. Revisa cargas registrales, derramas en comunidades y redacta arras equilibradas en un mercado accesible con muchas operaciones directas.',
      especialidades: ['Mercado accesible', 'Arras + informe documental', 'Compras en Vista Alegre y El Carmen'],
    },
    docTecnicaTitulo: 'Documentación técnica y Región de Murcia',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente según normativa regional',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años',
      'Licencias de obra y legalización de reformas',
      'Certificado de deudas con la comunidad y revisión de derramas en urbanizaciones',
    ],
    zonasIntro:
      'Murcia capital, barrios residenciales, Cartagena, Lorca y municipios del área metropolitana con conocimiento de la normativa regional murciana.',
    zonas: [
      'Centro', 'Vista Alegre', 'El Carmen', 'San Andrés', 'La Flota',
      'Churra', 'El Palmar', 'Santiago El Mayor', 'Cartagena', 'Lorca',
      'Alcantarilla', 'Molina de Segura',
    ],
    mercadoLocal: {
      titulo: 'Compraventa entre particulares en Murcia en 2026',
      parrafos: [
        'Murcia es uno de los mercados más accesibles de España, con alto volumen de operaciones entre particulares en Vista Alegre, El Carmen y barrios periféricos. Los vendedores suelen presionar para firmar arras en días — sin que nadie revise la documentación.',
        'En el centro y Vista Alegre el precio medio ronda los 1.600–2.200 €/m²; en barrios periféricos, entre 1.300 y 1.800 €/m². Una comisión de agencia del 3–5 % en un piso de 175.000 € supone entre 5.250 € y 8.750 €. El Pack Arras Plus por 450 € incluye arras penitenciales y revisión documental integral adaptada a la Región de Murcia.',
        'En Murcia el riesgo principal son las operaciones rápidas sin due diligence, las derramas en urbanizaciones nuevas, las arras redactadas solo por el vendedor y la presión para entregar señal el mismo día sin revisar actas de comunidad.',
      ],
      datos: [
        { label: 'Precio medio Centro / Vista Alegre', valor: '1.600 – 2.200 €/m²' },
        { label: 'Precio medio barrios periféricos', valor: '1.300 – 1.800 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '5.250 – 8.750 € en 175.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Presión para firmar arras sin revisión',
        desc: 'En Murcia es habitual que el vendedor exija señal el mismo día. Sin certificado de deudas ni nota simple revisada, heredas cargas ocultas. El pack incluye auditoría completa antes de entregar la señal.',
      },
      {
        titulo: 'Derramas en urbanizaciones nuevas',
        desc: 'Comunidades de los años 2000 en Churra, El Palmar o Molina de Segura acumulan derramas de fachada y zonas comunes. Revisamos actas recientes antes de la señal.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'Los vendedores suelen fijar 10–15 días para escritura. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
      {
        titulo: 'Discrepancias catastro vs registro',
        desc: 'En Murcia capital hay muchas reformas sin actualizar registro o cédula. Cruzamos documentación técnica, catastro y realidad del inmueble para evitar sorpresas en notaría.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Vista Alegre entre particulares',
        perfil: 'Pareja joven, primer piso',
        situacion:
          'Encontraron anuncio en portal sin intermediarios. El vendedor quería señal el mismo día sin dar tiempo a revisar documentación.',
        resultado:
          'Pack Arras Plus: deuda de comunidad de 2.800 € detectada y derrama aprobada de 4.500 €. Arras redactadas con plazo de 48 h para revisión y 50 días para escritura. Renegociaron 4.000 € de descuento.',
        ahorro: '4.000 €',
      },
      {
        titulo: 'Piso en Cartagena con discrepancia registral',
        perfil: 'Inversor que compra segunda vivienda',
        situacion:
          'Operación con plazos cortos. El anuncio indicaba 80 m² pero el registro reflejaba 72 m² útiles.',
        resultado:
          'Informe documental detectó discrepancia de 8 m². Renegociaron precio por m² real y arras con condición de actualización registral antes de escritura.',
        ahorro: '5.500 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Murcia 450€ — Arras + revisión documental',
      description:
        'Compra piso de particular en Murcia: arras penitenciales redactadas + revisión documental completa (ITE, comunidad, nota simple). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras murcia particular, comprar piso particular murcia, revision documentacion compra piso murcia, arras penitenciales murcia, gestor compra vivienda murcia, comprar piso sin agencia murcia, pack arras murcia, revisar documentacion antes arras murcia, comprar vista alegre particular, comprar cartagena particular',
      ogTitle: 'Pack Arras Plus Murcia — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en Murcia y Región. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Región de Murcia',
      h1: 'Compra piso de particular en Murcia con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Gestor asignado para particulares.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Murcia de particular?',
        a: 'Nota simple registral, certificado de deudas de comunidad, IBI al corriente, cédula de habitabilidad, certificado energético e ITE si el edificio lo exige. El pack lo incluye junto con arras redactadas.',
      },
      {
        q: '¿Cuánto cuesta el pack en Murcia frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 175.000 € la agencia cobraría 5.250–8.750 € de comisión.',
      },
      {
        q: '¿Operáis en Cartagena y Lorca?',
        a: 'Sí. Cubrimos Murcia capital, Cartagena, Lorca y principales municipios de la región con el mismo servicio online y gestor asignado.',
      },
    ],
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra · Gobierno de Navarra',
    testimoniosLanding: 'pack-arras-documental-pamplona',
    heroImage: getCiudadImage('pamplona').src,
    precioEjemploPiso: 240_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras entre particulares en Navarra',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña a compradores que adquieren vivienda de particular en Pamplona, barrios residenciales y área metropolitana. Conoce la normativa foral navarra, revisiones de comunidades y redacción de arras equilibradas en un mercado dinámico.',
      especialidades: ['Normativa foral navarra', 'Arras + informe documental', 'Compras en Iturrama y Rochapea'],
    },
    docTecnicaTitulo: 'Documentación técnica y Gobierno de Navarra',
    docTecnicaItems: [
      'Cédula de habitabilidad vigente según normativa navarra',
      'Certificado energético actualizado (obligatorio)',
      'ITE / IEE en edificios de más de 50 años — habitual en el casco antiguo',
      'Licencias de obra y conformidad urbanística del Ayuntamiento de Pamplona',
      'Certificado de deudas con la comunidad y revisión de derramas en urbanizaciones',
    ],
    zonasIntro:
      'Pamplona capital, casco antiguo, barrios residenciales y municipios del área metropolitana (Burlada, Villava, Ansoáin, Cizur) con conocimiento de la normativa foral navarra.',
    zonas: [
      'Casco Antiguo', 'Iturrama', 'Rochapea', 'San Juan', 'Ermitagaña',
      'Mendillorri', 'Lezkairu', 'Burlada', 'Villava', 'Ansoáin',
      'Cizur Menor', 'Berriozar',
    ],
    mercadoLocal: {
      titulo: 'Compraventa entre particulares en Pamplona en 2026',
      parrafos: [
        'Pamplona concentra operaciones entre particulares en Iturrama, Ermitagaña y barrios periféricos en crecimiento. El mercado navarro es dinámico, con precios en alza, y los vendedores suelen entregar borradores de arras redactados a su favor sin revisión previa de documentación.',
        'En el casco antiguo y Ermitagaña el precio medio ronda los 2.800–3.400 €/m²; en Iturrama, Mendillorri o Lezkairu, entre 2.400 y 3.000 €/m². Una comisión de agencia del 3–5 % en un piso de 240.000 € supone entre 7.200 € y 12.000 €. El Pack Arras Plus por 450 € incluye arras penitenciales y revisión documental integral adaptada a Navarra.',
        'En Pamplona el riesgo principal son las operaciones sin due diligence, las derramas en urbanizaciones de los 2000, las particularidades del derecho foral navarro y las arras con plazos imposibles para la concesión hipotecaria.',
      ],
      datos: [
        { label: 'Precio medio Casco / Ermitagaña', valor: '2.800 – 3.400 €/m²' },
        { label: 'Precio medio Iturrama / Mendillorri', valor: '2.400 – 3.000 €/m²' },
        { label: 'Comisión agencia (3–5 %)', valor: '7.200 – 12.000 € en 240.000 €' },
        { label: 'Pack Arras Plus', valor: '450 € IVA incl.' },
      ],
    },
    riesgosLocales: [
      {
        titulo: 'Particularidades del derecho foral navarro',
        desc: 'Navarra tiene normativa propia en materia urbanística y fiscal. En operaciones entre particulares conviene verificar documentación exigida por el Gobierno de Navarra antes de firmar arras. El pack incluye revisión adaptada a la normativa local.',
      },
      {
        titulo: 'Derramas en urbanizaciones de Iturrama y Mendillorri',
        desc: 'Comunidades de propietarios de los años 2000 acumulan derramas de fachada, ascensor y eficiencia energética. Revisamos actas recientes y cuotas pendientes antes de la señal.',
      },
      {
        titulo: 'ITE pendiente en edificios del casco antiguo',
        desc: 'El casco antiguo de Pamplona concentra edificios de más de 50 años sin ITE al día. El Ayuntamiento y los bancos pueden exigirla. Verificamos el estado del edificio y coherencia con la nota simple.',
      },
      {
        titulo: 'Arras con plazos imposibles para hipoteca',
        desc: 'En Pamplona los vendedores suelen fijar 10–15 días para escritura. Si tu banco tarda más, pierdes la señal. Redactamos arras con cláusula suspensiva por financiación y plazos de 45–60 días.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Iturrama entre particulares',
        perfil: 'Pareja con hipoteca preconcedida',
        situacion:
          'Encontraron piso en un portal. El vendedor les pasó arras con plazo de 15 días y señal del 10 % sin revisión previa de actas de comunidad.',
        resultado:
          'Pack Arras Plus: derrama aprobada de 5.400 € detectada en actas. Arras redactadas con plazo de 55 días y condición de liquidación de deudas. Renegociaron 6.000 € de descuento.',
        ahorro: '6.000 €',
      },
      {
        titulo: 'Piso en Ermitagaña con discrepancia registral',
        perfil: 'Profesional que se muda a Pamplona',
        situacion:
          'El anuncio indicaba 95 m² pero el registro reflejaba 86 m² útiles. Iban a firmar arras sin cruzar catastro y escritura previa.',
        resultado:
          'Informe documental detectó discrepancia de 9 m². Renegociaron precio por m² real y arras con condición de actualización registral antes de escritura.',
        ahorro: '7.500 €',
      },
    ],
    meta: {
      title: 'Pack Arras Plus Pamplona 450€ — Arras + revisión documental Navarra',
      description:
        'Compra piso de particular en Pamplona: arras penitenciales redactadas + revisión documental completa (ITE, comunidad, nota simple). 450€ IVA incl. Sin agencia.',
      keywords:
        'contrato arras pamplona particular, comprar piso particular pamplona, revision documentacion compra piso pamplona, arras penitenciales pamplona, gestor compra vivienda navarra, comprar piso sin agencia pamplona, pack arras pamplona, revisar documentacion antes arras pamplona, comprar iturrama particular, comprar ermitagana particular',
      ogTitle: 'Pack Arras Plus Pamplona — Arras + documentación por 450€',
      ogDescription:
        'Arras penitenciales y auditoría documental para compradores entre particulares en Pamplona y Navarra. 450€ fijos.',
    },
    hero: {
      badge: 'Pack Arras Plus · Navarra',
      h1: 'Compra piso de particular en Pamplona con arras y documentación revisada',
      lead:
        'Redactamos tus arras penitenciales y verificamos cédula navarra, actas de comunidad, derramas, nota simple e ITE antes de entregar la señal. 450 €. Gestor asignado para particulares.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar en Pamplona de particular?',
        a: 'Nota simple registral, certificado de deudas de comunidad, IBI al día, cédula de habitabilidad, certificado energético, ITE si el edificio lo exige y licencias de reformas. El pack lo incluye junto con arras redactadas adaptadas a la normativa navarra.',
      },
      {
        q: '¿Cuánto cuesta el pack en Pamplona frente a una agencia?',
        a: '450 € IVA incluido por arras + informe documental. En un piso de 240.000 € la agencia cobraría 7.200–12.000 € de comisión.',
      },
      {
        q: '¿Operáis en Burlada, Villava y área metropolitana?',
        a: 'Sí. Cubrimos Pamplona capital, barrios periféricos y municipios del área metropolitana con el mismo servicio online y gestor asignado.',
      },
    ],
  },
}

/** Config completa con contenido SEO local único por ciudad */
export const PACK_ARRAS_DOCUMENTAL_CIUDADES: Record<string, PackArrasDocumentalCiudadConfig> =
  Object.fromEntries(
    Object.entries(PACK_ARRAS_DOCUMENTAL_CIUDADES_BASE).map(([slug, base]) => [
      slug,
      { ...base, ...PACK_ARRAS_DOCUMENTAL_ENRIQUECIMIENTO[slug]! },
    ]),
  ) as Record<string, PackArrasDocumentalCiudadConfig>

export function buildPackArrasDocumentalMetadata(config: PackArrasDocumentalCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/pack-arras-revision-documental/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/pack-arras-revision-documental/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Pack Arras Plus ${config.nombre}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      images: [`${BASE_URL}${config.heroImage}`],
    },
  }
}

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}

export function getPackArrasDocumentalHref(slug: string): string {
  return `/gestoria/pack-arras-revision-documental/${slug}`
}
