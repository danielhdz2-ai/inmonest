import type { Metadata } from 'next'
import type { PackArrasDocumentalFaqItem } from './pack-arras-documental-ciudad-faq'
import { GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'
import { getCiudadImage } from './gestoria-images'

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

export const PACK_ARRAS_DOCUMENTAL_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
] as const

export const PACK_ARRAS_DOCUMENTAL_CIUDADES: Record<string, PackArrasDocumentalCiudadConfig> = {
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
}

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
