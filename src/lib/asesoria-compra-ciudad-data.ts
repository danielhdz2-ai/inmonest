import type { Metadata } from 'next'
import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'
import { GESTOR_CARMEN_VIDAL, GESTOR_DANIEL_HERNANDEZ } from './gestores-inmonest'

const BASE_URL = 'https://inmonest.com'
export const ASESORIA_COMPRA_PRECIO = 687

export type CasoRealCompra = {
  titulo: string
  perfil: string
  situacion: string
  resultado: string
  ahorro?: string
}

export type AsesoriaCompraCiudadConfig = {
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
  }
  zonas: string[]
  zonasIntro: string
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
  }
  faqPrioritarias?: DueDiligenceFaqItem[]
  casosReales: CasoRealCompra[]
}

export const ASESORIA_COMPRA_CIUDADES_LIST = [
  { slug: 'madrid', nombre: 'Madrid' },
  { slug: 'barcelona', nombre: 'Barcelona' },
  { slug: 'valencia', nombre: 'Valencia' },
  { slug: 'sevilla', nombre: 'Sevilla' },
  { slug: 'malaga', nombre: 'Málaga' },
  { slug: 'zaragoza', nombre: 'Zaragoza' },
  { slug: 'valladolid', nombre: 'Valladolid' },
  { slug: 'mallorca', nombre: 'Mallorca' },
  { slug: 'bilbao', nombre: 'Bilbao' },
  { slug: 'coruna', nombre: 'A Coruña' },
  { slug: 'murcia', nombre: 'Murcia' },
  { slug: 'pamplona', nombre: 'Pamplona' },
] as const

export const ASESORIA_COMPRA_TRAMITES = [
  'Revisión del contrato de reserva antes de firmar',
  'Análisis y redacción de contrato de arras penitenciales o confirmatorias',
  'Solicitud y estudio de nota simple registral (cargas, hipotecas, embargos)',
  'Verificación de deudas de comunidad, derramas e IBI',
  'Comprobación de cédula de habitabilidad y certificado energético',
  'Coordinación con notaría y preparación de documentación para escritura',
  'Asesoramiento sobre ITP, gastos de compra y plazos de la operación',
  'Seguimiento por WhatsApp y teléfono con tu gestor hasta las llaves',
] as const

export const ASESORIA_COMPRA_CIUDADES: Record<string, AsesoriaCompraCiudadConfig> = {
  madrid: {
    slug: 'madrid',
    nombre: 'Madrid',
    region: 'Comunidad de Madrid',
    testimoniosLanding: 'asesoria-compra-madrid',
    heroImage: '/madrid2.jpg',
    precioEjemploPiso: 320_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: GESTOR_DANIEL_HERNANDEZ.rol,
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras entre particulares en Madrid. Revisa reserva, arras, nota simple, IEE/ITE y te acompaña hasta escritura sin comisión de agencia.',
    },
    zonasIntro: 'Servicio en Madrid capital y área metropolitana.',
    zonas: ['Salamanca', 'Chamberí', 'Retiro', 'Carabanchel', 'Vallecas', 'Móstoles', 'Getafe'],
    meta: {
      title: 'Asesoría Compra Piso Madrid | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Madrid con gestor asignado. Desde reserva hasta escritura. 687€ IVA incl. Sin comisión del 3-5%. Respuesta en 24h.',
      keywords:
        'asesoria compra piso madrid, comprar piso particular madrid, comprar piso sin agencia madrid, gestor compra vivienda madrid, gestoria compra piso madrid',
      ogTitle: 'Asesoría compra piso Madrid — 687€ sin comisión de agencia',
      ogDescription: 'Gestor asignado desde reserva hasta escritura en Madrid. 687€ fijos.',
    },
    hero: {
      h1: 'Compra piso de particular en Madrid sin pagar comisión de agencia',
      lead:
        'Gestor inmobiliario asignado desde la reserva hasta la escritura. Revisamos contratos, documentación registral y normativa madrileña. 687€ fijos, sin % sobre el precio del piso.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Madrid?',
        a: 'Nota simple, deudas de comunidad, IBI, IEE/ITE en edificios de +50 años, cédula de habitabilidad y contrato de reserva. En Madrid las operaciones van rápido: no firmes sin revisión profesional.',
      },
      {
        q: '¿Puedo comprar en Idealista o Fotocasa sin pagar comisión de agencia?',
        a: 'Sí. Si el anuncio es de particular, no debes pagar comisión al vendedor. Inmonest te acompaña jurídicamente por 687€ fijos: revisamos contratos y documentación mientras tú negocias el precio directamente.',
      },
      {
        q: '¿Cuánto me ahorro frente a una inmobiliaria en Madrid?',
        a: 'En un piso de 320.000€, una agencia cobraría 9.600–16.000€ (3-5%). Con Inmonest pagas 687€ IVA incluido por todo el acompañamiento hasta escritura.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Chamberí sin agencia',
        perfil: 'Pareja joven, primer piso',
        situacion:
          'Encontraron piso de particular en Idealista. El vendedor les pasó un contrato de reserva con penalización del 20% si desistían.',
        resultado:
          'Revisamos la reserva, negociamos cláusulas más equilibradas y verificamos la nota simple antes de entregar la señal. Llegaron a escritura sin sorpresas.',
        ahorro: '14.000€ vs comisión de agencia',
      },
      {
        titulo: 'Comprador desde fuera de Madrid',
        perfil: 'Profesional que se muda por trabajo',
        situacion:
          'Tenía 48h para firmar arras en Carabanchel. No conocía la normativa madrileña ni qué documentos pedir al vendedor.',
        resultado:
          'Gestor asignado en 24h, checklist documental completo y coordinación con notaría. Operación cerrada en 6 semanas.',
      },
    ],
  },

  barcelona: {
    slug: 'barcelona',
    nombre: 'Barcelona',
    region: 'Cataluña · Generalitat',
    testimoniosLanding: 'asesoria-compra-barcelona',
    heroImage: '/barcelona2.jpg',
    precioEjemploPiso: 350_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Cataluña',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Experto en compras entre particulares en Barcelona. Domina cédula de la Generalitat, ITE y revisión de cargas antes de ir a notaría.',
    },
    zonasIntro: 'Barcelona capital y área metropolitana.',
    zonas: ['Eixample', 'Gràcia', 'Sants', 'Sant Martí', "L'Hospitalet", 'Badalona'],
    meta: {
      title: 'Asesoría Compra Piso Barcelona | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Barcelona con gestor asignado. 687€ IVA incl. Revisión documental y acompañamiento hasta escritura. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso barcelona, comprar piso particular barcelona, comprar piso sin agencia barcelona, gestor compra vivienda barcelona',
      ogTitle: 'Asesoría compra piso Barcelona — 687€ sin comisión',
      ogDescription: 'Gestor experto hasta escritura en Barcelona. Tarifa plana 687€.',
    },
    hero: {
      h1: 'Compra piso de particular en Barcelona con gestor asignado',
      lead:
        '¿Compras sin inmobiliaria? Revisamos reserva, arras, cédula de la Generalitat, ITE y cargas registrales. 687€ fijos frente a miles de euros de comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Es obligatoria la cédula de habitabilidad al comprar en Barcelona?',
        a: 'Sí en la Comunitat. Sin cédula vigente la operación puede bloquearse en notaría. La verificamos como parte del servicio.',
      },
      {
        q: '¿Comprar piso de particular en Barcelona es seguro?',
        a: 'Sí, si revisas documentación antes de firmar. Muchos compradores encuentran piso en portales y contactan directo con el propietario. Nosotros cubrimos la parte legal que la agencia haría, sin cobrar % sobre el precio.',
      },
      {
        q: '¿Qué pasa con las zonas tensionadas al comprar?',
        a: 'Si compras para alquilar en zona tensionada, hay límites de renta. Si es vivienda habitual para ti, te informamos de las implicaciones en estatutos de comunidad y normativa catalana.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Gràcia de particular',
        perfil: 'Compradora extranjera con NIE',
        situacion:
          'Compraba en el Eixample a un particular. El contrato de arras no mencionaba la ITE obligatoria del edificio.',
        resultado:
          'Detectamos la ITE pendiente, el vendedor la tramitó antes de escritura y evitamos un bloqueo en notaría.',
        ahorro: '12.000€ vs comisión inmobiliaria',
      },
      {
        titulo: 'Reserva bajo presión en Sants',
        perfil: 'Familia con hipoteca aprobada',
        situacion:
          'Tres familias pujaban por el mismo piso. El vendedor exigía firmar reserva en 24h con señal de 10.000€.',
        resultado:
          'Revisión express del borrador, cláusulas de devolución si fallaba la hipoteca y verificación registral previa a la señal.',
      },
    ],
  },

  valencia: {
    slug: 'valencia',
    nombre: 'Valencia',
    region: 'Comunitat Valenciana',
    testimoniosLanding: 'asesoria-compra-valencia',
    heroImage: '/valencia3.jpg',
    precioEjemploPiso: 260_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Valencia',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña compradores de particular en Valencia y provincia. Revisa documentación valenciana, cargas y deudas de comunidad hasta la escritura.',
    },
    zonasIntro: 'Valencia capital y l\'Horta.',
    zonas: ['Ruzafa', 'Benimaclet', 'Campanar', 'Ciutat Vella', 'Mislata', 'Paterna'],
    meta: {
      title: 'Asesoría Compra Piso Valencia | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Valencia con gestora asignada. 687€ IVA incl. Desde reserva hasta escritura. Sin comisión de agencia.',
      keywords:
        'asesoria compra piso valencia, comprar piso particular valencia, comprar piso sin agencia valencia, gestor compra vivienda valencia',
      ogTitle: 'Asesoría compra piso Valencia — 687€ fijos',
      ogDescription: 'Gestora hasta escritura en Valencia. Sin comisiones abusivas.',
    },
    hero: {
      h1: 'Compra piso de particular en Valencia sin comisión de agencia',
      lead:
        'Gestora asignada que revisa contratos, cédula valenciana, nota simple y deudas de comunidad. 687€ por todo el proceso hasta notaría.',
    },
    faqPrioritarias: [
      {
        q: '¿Cómo comprar piso de particular en Valencia sin riesgos?',
        a: 'Pide nota simple, certificado de deudas de comunidad y cédula de habitabilidad antes de entregar señal. Nosotros verificamos todo y te explicamos cada documento en lenguaje claro.',
      },
      {
        q: '¿Qué documentos exige la Comunitat Valenciana?',
        a: 'Cédula de habitabilidad, certificado energético, IEE en edificios antiguos y, en muchos casos, certificado de eficiencia energética de la comunidad.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Benimaclet entre particulares',
        perfil: 'Compradores locales, sin agencia',
        situacion:
          'Ya tenían acuerdo de precio con el propietario. El contrato de arras tenía plazos imposibles para obtener la hipoteca.',
        resultado:
          'Renegociamos plazos, revisamos cargas registrales y acompañamiento hasta escritura. Ahorro total frente a agencia: más de 11.000€.',
        ahorro: '11.000€',
      },
    ],
  },

  sevilla: {
    slug: 'sevilla',
    nombre: 'Sevilla',
    region: 'Andalucía',
    testimoniosLanding: 'asesoria-compra-sevilla',
    heroImage: '/sevilla2.jpg',
    precioEjemploPiso: 220_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Andalucía',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Especializada en compras entre particulares en Sevilla. Revisa normativa andaluza, IEE y documentación antes de la firma en notaría.',
    },
    zonasIntro: 'Sevilla capital y área metropolitana.',
    zonas: ['Triana', 'Nervión', 'Los Remedios', 'Macarena', 'Este-Alcosa', 'Dos Hermanas'],
    meta: {
      title: 'Asesoría Compra Piso Sevilla | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Sevilla con gestora asignada. 687€ IVA incl. Acompañamiento completo hasta escritura.',
      keywords:
        'asesoria compra piso sevilla, comprar piso particular sevilla, comprar piso sin agencia sevilla, gestor compra vivienda sevilla',
      ogTitle: 'Asesoría compra piso Sevilla — 687€',
      ogDescription: 'Compra entre particulares en Sevilla con gestora experta. Tarifa plana.',
    },
    hero: {
      h1: 'Compra piso de particular en Sevilla con asesoramiento legal completo',
      lead:
        'Sin agencia, pero con gestoría profesional. Revisamos arras, documentación andaluza y te acompañamos hasta escritura por 687€ fijos.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué particularidades tiene comprar en Sevilla entre particulares?',
        a: 'Verificamos IEE en edificios antiguos del centro, licencias de obra en reformas y situación de viviendas con uso turístico mal declarado.',
      },
      {
        q: '¿El vendedor puede exigirme una comisión si compro de particular?',
        a: 'No. La comisión la cobra quien contrata la agencia (normalmente el vendedor). Tú solo pagas el precio acordado más gastos legales e impuestos.',
      },
    ],
    casosReales: [
      {
        titulo: 'Primer piso en Triana',
        perfil: 'Joven profesional, compra sin agencia',
        situacion:
          'Encontró piso en un portal de particulares. Iba a firmar arras sin revisar la nota simple ni las actas de la comunidad.',
        resultado:
          'Detectamos derrama pendiente de 4.200€. Renegoció con el vendedor antes de firmar. Gestor disponible por WhatsApp durante todo el proceso.',
      },
    ],
  },

  malaga: {
    slug: 'malaga',
    nombre: 'Málaga',
    region: 'Andalucía',
    testimoniosLanding: 'asesoria-compra-malaga',
    heroImage: '/gestoria5.jpg',
    precioEjemploPiso: 300_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Málaga y Costa del Sol',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Acompaña compradores en Málaga capital y costa. Revisa documentación, cargas y normativa andaluza en operaciones entre particulares.',
    },
    zonasIntro: 'Málaga capital y Costa del Sol.',
    zonas: ['Centro', 'Teatinos', 'El Palo', 'La Malagueta', 'Benalmádena', 'Torremolinos'],
    meta: {
      title: 'Asesoría Compra Piso Málaga | Sin comisión agencia desde 687€',
      description:
        'Compra piso de particular en Málaga con gestora asignada. 687€ IVA incl. Desde reserva hasta escritura en la Costa del Sol.',
      keywords:
        'asesoria compra piso malaga, comprar piso particular malaga, comprar piso sin agencia malaga, gestor compra vivienda malaga, comprar piso costa del sol',
      ogTitle: 'Asesoría compra piso Málaga — 687€',
      ogDescription: 'Gestora hasta escritura en Málaga. Sin comisión de agencia.',
    },
    hero: {
      h1: 'Compra piso de particular en Málaga sin comisión de agencia',
      lead:
        'Gestora asignada para compradores que no quieren pagar el 3-5% a una inmobiliaria. 687€ por acompañamiento completo hasta notaría.',
    },
    faqPrioritarias: [
      {
        q: '¿Comprar en la Costa del Sol sin agencia es habitual?',
        a: 'Cada vez más. Muchos vendedores publican en portales y negocian directo. Lo crítico es la revisión legal: VFT, cargas y documentación andaluza.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Teatinos con due diligence',
        perfil: 'Familia que compra vivienda habitual',
        situacion:
          'Tras firmar arras detectaron discrepancias en los metros cuadrados registrales vs el anuncio.',
        resultado:
          'Due diligence documental, renegociación del precio y cierre en notaría con pleno conocimiento de la situación.',
        ahorro: '8.000€',
      },
    ],
  },

  zaragoza: {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    region: 'Aragón',
    testimoniosLanding: 'asesoria-compra-zaragoza',
    heroImage: '/gestoria2.jpg',
    precioEjemploPiso: 185_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Aragón',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras entre particulares en Zaragoza. Mercado en crecimiento, operaciones rápidas y revisión de documentación aragonesa hasta escritura.',
    },
    zonasIntro: 'Zaragoza capital y área metropolitana.',
    zonas: ['Centro', 'Delicias', 'Actur', 'Las Fuentes', 'San José', 'Utebo'],
    meta: {
      title: 'Asesoría Compra Piso Zaragoza | Particular sin comisión desde 687€',
      description:
        'Compra piso de particular en Zaragoza con gestor asignado. Revisión de arras, nota simple y normativa aragonesa. 687€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso zaragoza, comprar piso particular zaragoza, comprar piso sin agencia zaragoza, gestor compra vivienda zaragoza, gestoria compra piso zaragoza',
      ogTitle: 'Compra piso particular Zaragoza — 687€ sin comisión',
      ogDescription: 'Gestor asignado desde reserva hasta escritura en Zaragoza.',
    },
    hero: {
      h1: 'Compra piso de particular en Zaragoza con gestor profesional a tu lado',
      lead:
        '¿Has encontrado piso en un portal de particulares? Te acompañamos en reserva, arras, documentación registral y firma en notaría. 687€ fijos — sin pagar comisión de agencia sobre el precio del piso.',
    },
    faqPrioritarias: [
      {
        q: '¿Es seguro comprar piso de particular en Zaragoza?',
        a: 'Sí, si revisas documentación antes de entregar señal. En Zaragoza el mercado crece y muchas operaciones son entre particulares. Nosotros verificamos nota simple, comunidad e impuestos pendientes.',
      },
      {
        q: '¿Qué documentación necesito pedir al vendedor en Aragón?',
        a: 'Nota simple registral, cédula de habitabilidad, certificado energético, certificado de deudas de comunidad e IBI al corriente. Si el edificio es antiguo, puede exigirse ITE.',
      },
      {
        q: '¿Cuánto ahorro respecto a una inmobiliaria en Zaragoza?',
        a: 'En un piso de 185.000€, una agencia cobraría unos 5.550–9.250€. Con Inmonest pagas 687€ por acompañamiento completo hasta escritura.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Delicias de particular',
        perfil: 'Pareja primer comprador',
        situacion:
          'Encontraron anuncio en portal sin agencia. El vendedor les presionó para firmar reserva el mismo fin de semana.',
        resultado:
          'Revisión del borrador en 24h, checklist documental y arras con plazos realistas para la hipoteca. Compra cerrada sin comisión de intermediario.',
        ahorro: '7.500€ vs agencia',
      },
      {
        titulo: 'Comprador que venía de Madrid',
        perfil: 'Teletrabajador reubicado en Zaragoza',
        situacion:
          'No conocía plazos ni impuestos en Aragón. Tenía miedo de firmar arras sin entender las cláusulas.',
        resultado:
          'Gestor explicó cada paso, coordinó con notaría zaragozana y verificó que la vivienda no tenía cargas ocultas.',
      },
    ],
  },

  valladolid: {
    slug: 'valladolid',
    nombre: 'Valladolid',
    region: 'Castilla y León',
    testimoniosLanding: 'asesoria-compra-valladolid',
    heroImage: '/keys.jpg',
    precioEjemploPiso: 190_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Castilla y León',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores de particular en Valladolid y provincia. Ideal si compras desde Madrid u otra ciudad: revisión documental y coordinación notarial a distancia.',
    },
    zonasIntro: 'Valladolid capital y provincia.',
    zonas: ['Centro', 'Parquesol', 'Delicias', 'Rondilla', 'La Victoria', 'Laguna de Duero'],
    meta: {
      title: 'Asesoría Compra Piso Valladolid | Particular sin comisión 687€',
      description:
        'Compra piso de particular en Valladolid con gestor asignado. Revisión arras, Registro y normativa castellanoleonesa. 687€ IVA incl. Sin comisión de agencia.',
      keywords:
        'asesoria compra piso valladolid, comprar piso particular valladolid, comprar piso sin agencia valladolid, gestor compra vivienda valladolid',
      ogTitle: 'Compra piso particular Valladolid — 687€ fijos',
      ogDescription: 'Gestor hasta escritura en Valladolid. Compra sin comisión de agencia.',
    },
    hero: {
      h1: 'Compra piso de particular en Valladolid sin pagar comisión de agencia',
      lead:
        'Muchos compradores llegan desde Madrid u otras provincias. Tu gestor revisa contratos, documentación del Registro y te acompaña hasta la escritura por 687€ IVA incluido.',
    },
    faqPrioritarias: [
      {
        q: '¿Puedo comprar en Valladolid viviendo en otra ciudad?',
        a: 'Sí. Trabajamos 100% online: revisión documental, videollamadas y coordinación con notaría en Valladolid. No necesitas gestoría presencial.',
      },
      {
        q: '¿Qué revisar en edificios históricos del centro de Valladolid?',
        a: 'Estado de conservación, licencias de reforma, protección patrimonial y deudas de comunidad. En el casco antiguo hay particularidades urbanísticas que verificamos.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra desde Madrid a Valladolid',
        perfil: 'Profesional que se muda',
        situacion:
          'Compró en Valladolid sin conocer el proceso local ni qué documentos exigir al vendedor particular.',
        resultado:
          'Revisión de arras, documentación registral y coordinación de firma. Operación completada sin desplazamientos innecesarios.',
      },
      {
        titulo: 'Piso en Parquesol entre particulares',
        perfil: 'Familia con hipoteca',
        situacion:
          'El banco pedía plazos ajustados para la escritura. El contrato de arras del vendedor no encajaba con la hipoteca.',
        resultado:
          'Renegociación de plazos, verificación de cargas y acompañamiento hasta notaría en 5 semanas.',
        ahorro: '6.500€ vs comisión inmobiliaria',
      },
    ],
  },

  mallorca: {
    slug: 'mallorca',
    nombre: 'Mallorca',
    region: 'Illes Balears · Normativa balear',
    testimoniosLanding: 'asesoria-compra-mallorca',
    heroImage: '/gestoria5.jpg',
    precioEjemploPiso: 320_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Baleares',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Experta en compras entre particulares en Mallorca. Conoce normativa balear, IBAVI, zonas tensionadas y operaciones con compradores nacionales e internacionales.',
    },
    zonasIntro: 'Palma, cala y municipios de la isla.',
    zonas: ['Palma', 'Calvià', 'Inca', 'Manacor', 'Llucmajor', 'Pollença'],
    meta: {
      title: 'Asesoría Compra Piso Mallorca | Particular sin comisión desde 687€',
      description:
        'Compra piso de particular en Mallorca con gestora asignada. Normativa balear, IBAVI, arras y escritura. 687€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso mallorca, comprar piso particular mallorca, comprar piso sin agencia palma, gestor compra vivienda baleares, gestoria compra piso mallorca',
      ogTitle: 'Compra piso particular Mallorca — 687€ sin comisión',
      ogDescription: 'Gestora experta en Baleares. De reserva a escritura.',
    },
    hero: {
      h1: 'Compra piso de particular en Mallorca con gestoría profesional',
      lead:
        'Comprar en Baleares tiene normativa propia (IBAVI, zonas tensionadas, turismo). Te acompañamos desde la reserva hasta escritura por 687€ — sin comisión de agencia sobre el precio.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué es el depósito IBAVI al comprar en Mallorca?',
        a: 'En muchas operaciones en Baleares interviene el Instituto Balear de la Vivienda. Verificamos si aplica a tu compra y qué implicaciones tiene en contrato y escritura.',
      },
      {
        q: '¿Puedo comprar piso turístico de particular en Mallorca?',
        a: 'Depende de la licencia turística y estatutos de comunidad. Revisamos si la vivienda puede usarse como pretendes y si hay sanciones o limitaciones pendientes.',
      },
      {
        q: '¿Compradores extranjeros pueden usar Inmonest?',
        a: 'Sí. Acompañamos compradores con NIE, residentes y no residentes. Revisamos documentación bancaria y requisitos notariales en operaciones internacionales.',
      },
    ],
    casosReales: [
      {
        titulo: 'Compra en Palma de particular',
        perfil: 'Comprador peninsular',
        situacion:
          'Encontró piso en portal sin agencia. No conocía la normativa balear ni las cláusulas de zona tensionada.',
        resultado:
          'Contrato adaptado a Ley de Vivienda y normativa autonómica. Verificación de cédula, energético y situación registral antes de arras.',
      },
      {
        titulo: 'Piso en Calvià con comprador británico',
        perfil: 'Familia que compra segunda residencia',
        situacion:
          'Operación entre particulares con plazos cortos. Documentación en castellano e inglés y dudas sobre impuestos.',
        resultado:
          'Coordinación documental, revisión de arras y acompañamiento hasta escritura. Ahorro frente a agencia local de lujo.',
        ahorro: '12.000€',
      },
    ],
  },

  bilbao: {
    slug: 'bilbao',
    nombre: 'Bilbao',
    region: 'País Vasco · Bizkaia',
    testimoniosLanding: 'asesoria-compra-bilbao',
    heroImage: '/gestoria7.jpg',
    precioEjemploPiso: 280_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Bizkaia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras entre particulares en Bilbao y Gran Bilbao. Conoce normativa foral vasca, plusvalía de Bizkaia y revisión documental hasta escritura sin comisión de agencia.',
    },
    zonasIntro: 'Bilbao capital, Gran Bilbao y área metropolitana.',
    zonas: ['Indautxu', 'Abando', 'Deusto', 'Rekalde', 'Getxo', 'Barakaldo', 'Portugalete'],
    meta: {
      title: 'Asesoría Compra Piso Bilbao | Particular sin comisión desde 687€',
      description:
        'Compra piso de particular en Bilbao con gestor asignado. Normativa foral, arras, nota simple y escritura. 687€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso bilbao, comprar piso particular bilbao, comprar piso sin agencia bilbao, gestor compra vivienda bilbao, gestoria compra piso bizkaia',
      ogTitle: 'Compra piso particular Bilbao — 687€ sin comisión',
      ogDescription: 'Gestor experto en Bizkaia. De reserva a escritura.',
    },
    hero: {
      h1: 'Compra piso de particular en Bilbao sin pagar comisión de agencia',
      lead:
        '¿Has encontrado piso en un portal de particulares en Bilbao? Tu gestor revisa contratos, normativa foral y documentación registral. 687€ fijos — sin el 3-5% de una inmobiliaria.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué particularidades tiene comprar piso en Bizkaia?',
        a: 'En el País Vasco conviene verificar normativa foral, plusvalía municipal de Bizkaia e ITE en edificios antiguos del casco. Revisamos todo antes de que firmes arras o entregues señal.',
      },
      {
        q: '¿Puedo comprar en Bilbao sin pagar comisión al vendedor?',
        a: 'Sí, si el anuncio es de particular. Inmonest te acompaña jurídicamente por 687€ fijos mientras tú negocias el precio directamente con el propietario.',
      },
      {
        q: '¿Cuánto ahorro frente a una agencia en Bilbao?',
        a: 'En un piso de 280.000€, una inmobiliaria cobraría unos 8.400–14.000€. Con Inmonest pagas 687€ por acompañamiento completo hasta escritura.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Indautxu de particular',
        perfil: 'Pareja con hipoteca aprobada',
        situacion:
          'Encontraron anuncio sin agencia. El contrato de arras incluía plazos imposibles para el banco y penalización del 15%.',
        resultado:
          'Renegociación de cláusulas, verificación de nota simple y coordinación con notaría bilbaína. Compra cerrada en 6 semanas.',
        ahorro: '10.500€ vs comisión inmobiliaria',
      },
      {
        titulo: 'Compra en Deusto entre particulares',
        perfil: 'Profesional que se muda a Bilbao',
        situacion:
          'No conocía la documentación exigida en Bizkaia ni qué revisar en un edificio de más de 50 años.',
        resultado:
          'Checklist documental completo, revisión de ITE y acompañamiento hasta escritura sin sorpresas registrales.',
      },
    ],
  },

  coruna: {
    slug: 'coruna',
    nombre: 'A Coruña',
    region: 'Galicia',
    testimoniosLanding: 'asesoria-compra-coruna',
    heroImage: '/gestoria2.jpg',
    precioEjemploPiso: 210_000,
    gestor: {
      nombre: GESTOR_CARMEN_VIDAL.nombre,
      rol: 'Gestora inmobiliaria · Compras en Galicia',
      foto: GESTOR_CARMEN_VIDAL.foto,
      bio: 'Especializada en compras entre particulares en A Coruña, área metropolitana y costa gallega. Revisa cargas, deudas de comunidad y documentación de la Xunta hasta la escritura.',
    },
    zonasIntro: 'A Coruña capital, Oleiros, Arteixo y área metropolitana.',
    zonas: ['Ciudad Vieja', 'Ensanche', 'Monte Alto', 'Elviña', 'Mesoiro', 'Oleiros', 'Arteixo'],
    meta: {
      title: 'Asesoría Compra Piso A Coruña | Particular sin comisión 687€',
      description:
        'Compra piso de particular en A Coruña con gestora asignada. Revisión arras, nota simple y normativa gallega. 687€ IVA incl. Sin comisión de agencia.',
      keywords:
        'asesoria compra piso coruña, comprar piso particular a coruña, comprar piso sin agencia coruña, gestor compra vivienda galicia, gestoria compra piso coruña',
      ogTitle: 'Compra piso particular A Coruña — 687€ fijos',
      ogDescription: 'Gestora experta en Galicia. De reserva a escritura.',
    },
    hero: {
      h1: 'Compra piso de particular en A Coruña con gestoría profesional',
      lead:
        'Muchos pisos en Galicia se venden entre particulares. Te acompañamos en reserva, arras, documentación de la Xunta y firma en notaría por 687€ — sin pagar comisión de agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Es seguro comprar piso de particular en A Coruña?',
        a: 'Sí, si revisas documentación antes de entregar señal. Verificamos nota simple, deudas de comunidad, cédula de habitabilidad gallega e ITE si el edificio lo exige.',
      },
      {
        q: '¿Puedo comprar en A Coruña viviendo en otra ciudad?',
        a: 'Sí. Trabajamos 100% online: revisión documental, videollamadas y coordinación con notaría en A Coruña. Ideal si vienes de Madrid, Santiago u otra provincia.',
      },
      {
        q: '¿Cuánto ahorro respecto a una inmobiliaria en A Coruña?',
        a: 'En un piso de 210.000€, una agencia cobraría unos 6.300–10.500€. Con Inmonest pagas 687€ por acompañamiento completo hasta escritura.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Ensanche de particular',
        perfil: 'Familia primer comprador',
        situacion:
          'Encontraron piso en portal sin agencia. El vendedor les pasó un contrato de reserva con cláusulas confusas sobre la hipoteca.',
        resultado:
          'Revisión del borrador en 24h, arras con plazos realistas y verificación de cargas antes de la señal. Escritura sin incidencias.',
        ahorro: '7.800€ vs agencia',
      },
      {
        titulo: 'Compra en Oleiros entre particulares',
        perfil: 'Teletrabajador reubicado en Galicia',
        situacion:
          'No conocía qué documentación pedir al vendedor ni los plazos del Registro de la Propiedad en Galicia.',
        resultado:
          'Gestora coordinó documentación, revisó deudas de comunidad y acompañó hasta notaría con pleno conocimiento de la operación.',
      },
    ],
  },

  murcia: {
    slug: 'murcia',
    nombre: 'Murcia',
    region: 'Región de Murcia',
    testimoniosLanding: 'asesoria-compra-murcia',
    heroImage: '/gestoria3.jpg',
    precioEjemploPiso: 175_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Región de Murcia',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Acompaña compradores de particular en Murcia capital y Región. Mercado accesible, muchas operaciones directas y revisión documental hasta escritura sin comisión de agencia.',
    },
    zonasIntro: 'Murcia capital, Cartagena, Lorca y área metropolitana.',
    zonas: ['Centro', 'Vista Alegre', 'El Carmen', 'San Andrés', 'La Flota', 'Cartagena', 'Lorca'],
    meta: {
      title: 'Asesoría Compra Piso Murcia | Particular sin comisión desde 687€',
      description:
        'Compra piso de particular en Murcia con gestor asignado. Revisión arras, nota simple y normativa regional. 687€ IVA incl. Sin comisión 3-5%.',
      keywords:
        'asesoria compra piso murcia, comprar piso particular murcia, comprar piso sin agencia murcia, gestor compra vivienda murcia, gestoria compra piso cartagena',
      ogTitle: 'Compra piso particular Murcia — 687€ sin comisión',
      ogDescription: 'Gestor asignado desde reserva hasta escritura en Murcia.',
    },
    hero: {
      h1: 'Compra piso de particular en Murcia sin pagar comisión de agencia',
      lead:
        'En Murcia muchos compradores encuentran piso directamente con el propietario. Tu gestor revisa contratos, documentación registral y te acompaña hasta la escritura por 687€ IVA incluido.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué revisar antes de comprar un piso en Murcia?',
        a: 'Nota simple registral, certificado de deudas de comunidad, IBI al corriente, cédula de habitabilidad y certificado energético. En la Región de Murcia las operaciones entre particulares son habituales pero pocos revisan la documentación.',
      },
      {
        q: '¿Sirve el servicio en Cartagena y Lorca?',
        a: 'Sí. Cubrimos Murcia capital y principales municipios de la región. La coordinación con notaría local se hace online.',
      },
      {
        q: '¿Cuánto ahorro frente a una inmobiliaria en Murcia?',
        a: 'En un piso de 175.000€, una agencia cobraría unos 5.250–8.750€. Con Inmonest pagas 687€ fijos por todo el acompañamiento.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Vista Alegre de particular',
        perfil: 'Pareja joven, primer piso',
        situacion:
          'Encontraron anuncio en portal sin intermediarios. El vendedor quería señal el mismo día sin dar tiempo a revisar documentación.',
        resultado:
          'Negociamos plazo de 48h para revisión, verificamos nota simple y arras equilibradas. Compra cerrada sin comisión de agencia.',
        ahorro: '6.500€ vs inmobiliaria',
      },
      {
        titulo: 'Compra en Cartagena entre particulares',
        perfil: 'Inversor que compra segunda vivienda',
        situacion:
          'Operación con plazos cortos y dudas sobre plusvalía municipal e impuestos de transmisión en la región.',
        resultado:
          'Revisión documental completa, asesoramiento sobre ITP y acompañamiento hasta escritura en 4 semanas.',
      },
    ],
  },

  pamplona: {
    slug: 'pamplona',
    nombre: 'Pamplona',
    region: 'Navarra',
    testimoniosLanding: 'asesoria-compra-pamplona',
    heroImage: '/keys.jpg',
    precioEjemploPiso: 240_000,
    gestor: {
      nombre: GESTOR_DANIEL_HERNANDEZ.nombre,
      rol: 'Gestor inmobiliario · Compras en Navarra',
      foto: GESTOR_DANIEL_HERNANDEZ.foto,
      bio: 'Especialista en compras entre particulares en Pamplona y Navarra. Revisa arras, documentación registral y normativa foral navarra hasta la escritura.',
    },
    zonasIntro: 'Pamplona capital, Comarca de Pamplona y Navarra.',
    zonas: ['Casco Antiguo', 'Iturrama', 'San Juan', 'Rochapea', 'Burlada', 'Barañáin', 'Tudela'],
    meta: {
      title: 'Asesoría Compra Piso Pamplona | Particular sin comisión 687€',
      description:
        'Compra piso de particular en Pamplona con gestor asignado. Normativa navarra, arras, nota simple y escritura. 687€ IVA incl. Sin comisión de agencia.',
      keywords:
        'asesoria compra piso pamplona, comprar piso particular pamplona, comprar piso sin agencia pamplona, gestor compra vivienda navarra, gestoria compra piso pamplona',
      ogTitle: 'Compra piso particular Pamplona — 687€ fijos',
      ogDescription: 'Gestor experto en Navarra. De reserva a escritura.',
    },
    hero: {
      h1: 'Compra piso de particular en Pamplona con gestor profesional a tu lado',
      lead:
        '¿Has encontrado piso en un portal de particulares en Pamplona? Te acompañamos en reserva, arras, documentación y firma en notaría. 687€ fijos — sin el porcentaje de una agencia.',
    },
    faqPrioritarias: [
      {
        q: '¿Qué particularidades tiene comprar piso en Navarra?',
        a: 'Navarra tiene normativa foral propia en materia fiscal y registral. Verificamos documentación técnica, plusvalía municipal e ITP antes de que firmes arras.',
      },
      {
        q: '¿Puedo comprar en Pamplona sin agencia inmobiliaria?',
        a: 'Sí. Si el vendedor es particular, no pagas comisión. Inmonest cubre la parte legal y de trámites por 687€ mientras tú negocias el precio directamente.',
      },
      {
        q: '¿Cuánto ahorro respecto a una inmobiliaria en Pamplona?',
        a: 'En un piso de 240.000€, una agencia cobraría unos 7.200–12.000€. Con Inmonest pagas 687€ por acompañamiento completo hasta escritura.',
      },
    ],
    casosReales: [
      {
        titulo: 'Piso en Iturrama de particular',
        perfil: 'Familia con hipoteca',
        situacion:
          'Contrato de arras del vendedor no encajaba con los plazos del banco. Presión para firmar antes de revisar la nota simple.',
        resultado:
          'Renegociación de plazos, verificación de cargas registrales y coordinación con notaría pamplonesa. Operación completada en 5 semanas.',
        ahorro: '9.000€ vs comisión inmobiliaria',
      },
      {
        titulo: 'Compra en Burlada entre particulares',
        perfil: 'Profesional que se muda a Pamplona',
        situacion:
          'Primera compra en Navarra. No sabía qué documentos exigir ni cómo funciona el ITP foral.',
        resultado:
          'Gestor explicó cada trámite, revisó documentación y acompañó hasta escritura con informe previo de la situación registral.',
      },
    ],
  },
}

export function buildAsesoriaCompraMetadata(config: AsesoriaCompraCiudadConfig): Metadata {
  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/gestoria/asesoria-compra-piso/${config.slug}`,
    },
    openGraph: {
      title: config.meta.ogTitle,
      description: config.meta.ogDescription,
      url: `${BASE_URL}/gestoria/asesoria-compra-piso/${config.slug}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${config.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Asesoría compra piso ${config.nombre}`,
        },
      ],
    },
  }
}

export function comisionAgenciaMin(precio: number) {
  return Math.round(precio * 0.03)
}

export function comisionAgenciaMax(precio: number) {
  return Math.round(precio * 0.05)
}
